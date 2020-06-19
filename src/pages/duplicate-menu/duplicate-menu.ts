import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-duplicate-menu',
  templateUrl: 'duplicate-menu.html',
})
export class DuplicateMenuPage {

  tables;
  total_table_empty: any;
  total_table_active: any;
  notrans: any;
  table_active: any;
  notrans_new: any;
  constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, private sqlite: SQLite, public navCtrl: NavController, public navParams: NavParams) {
    this.getCurrentData(navParams.get("notrans"), navParams.get("table_active"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeTablePage');
    this.getTable();
  }

  getCurrentData(notrans, table_active) {
    this.notrans = notrans;
    this.table_active = table_active;
  }

  getTable() {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      //table	
      db.executeSql('SELECT * FROM table_location ', [])
        .then(res => {
          this.tables = [];
          for (let i = 0; i <= res.rows.length; i++) {
            console.log(res.rows.item(i).table_id, res.rows.item(i).table_color, res.rows.item(i).type_isEmpty)
            this.tables.push(
              {
                table_id: res.rows.item(i).table_id,
                table_color: res.rows.item(i).table_color,
                table_isEmpty: res.rows.item(i).type_isEmpty
              });
          }
        })
        .catch(e => console.log(e));

      //table	
      db.executeSql('SELECT * FROM table_location ', [])
        .then(res => {
          this.tables = [];
          for (let i = 0; i <= res.rows.length; i++) {
            console.log(res.rows.item(i).table_id, res.rows.item(i).table_color, res.rows.item(i).type_isEmpty)
            this.tables.push(
              {
                table_id: res.rows.item(i).table_id,
                table_color: res.rows.item(i).table_color,
                table_isEmpty: res.rows.item(i).type_isEmpty
              });
          }
        })
        .catch(e => console.log(e));

      db.executeSql('SELECT COUNT(table_id) AS TotalEmpty FROM table_location WHERE type_isEmpty=?', ['0'])
        .then(res => {
          if (res.rows.length > 0) {
            this.total_table_empty = parseInt(res.rows.item(0).TotalEmpty);
          }
        }).catch(e => console.log(e));

      db.executeSql('SELECT COUNT(table_id) AS TotalActive FROM table_location WHERE type_isEmpty=?', ['1'])
        .then(res => {
          if (res.rows.length > 0) {
            this.total_table_active = parseInt(res.rows.item(0).TotalActive);
          }
        }).catch(e => console.log(e));

    }).catch(e => console.log(e));
  }

  duplicatemenu(table): void {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.notrans_new = this.notrans + '123';
      //duplicate header
      db.executeSql('INSERT INTO trans_order_header (NoTrans ,NoKassa ,Tanggal ,Waktu ,Kasir ,KdStore , TotalItem , TotalQty ,TotalServe , Status ,KdPersonal ,KdMeja ,KdContact ,nostruk ,TotalGuest ,AddDate ,keterangan ,KdAgent ,IsCommit ) SELECT ? , NoKassa, Tanggal, Waktu, Kasir, KdStore, TotalItem, TotalQty, ?, Status, KdPersonal, ? , KdContact, nostruk, TotalGuest, AddDate, keterangan, KdAgent, IsCommit FROM trans_order_header WHERE NoTrans=?', [this.notrans_new, '0', table, this.notrans])
        .then(res => {
          //comment
          console.log('Successfully Duplicate Header Menu', table);
          //lock new table
          db.executeSql('UPDATE table_location SET table_color=?,type_isEmpty=?  WHERE table_id=?', ['danger', '1', table])
            .then(res => {
              console.log(res);
              //comment
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => console.log(e));


      //duplicate detail
      db.executeSql('INSERT INTO trans_order_detail (NoTrans ,NoUrut ,NoKassa ,Tanggal  ,Waktu  ,Kasir ,KdStore ,PCode ,Name ,Qty ,Berat ,Satuan ,Keterangan ,Note_split ,Status ,KdPersonal ,KdMeja ,KdContact ,MenuBaru ,Tambahan )  SELECT ? ,NoUrut ,NoKassa ,Tanggal  ,Waktu  ,Kasir ,KdStore ,PCode ,Name ,Qty ,Berat ,Satuan ,?,Note_split ,? ,KdPersonal ,?,KdContact ,MenuBaru ,Tambahan FROM trans_order_detail WHERE NoTrans=?', [this.notrans_new, '', '0', table, this.notrans])
        .then(res => {
          //comment
          const confirm = this.alertCtrl.create({
            title: 'Successfully Duplicate Menu',
            message: 'Do you want to print this menu?',
            buttons: [
              {
                text: 'No',
                handler: () => {
                  //close modal
                  this.closeModal();
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  const alert = this.alertCtrl.create({
                    title: 'Succeess Print.',
                    subTitle: 'Print Menu From Docket.',
                    buttons: ['OK']
                  });
                  alert.present();
                }
              }
            ]
          });
          confirm.present();

        })
        .catch(e => console.log(e));

    }).catch(e => console.log(e));
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
