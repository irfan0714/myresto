import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-change-table',
  templateUrl: 'change-table.html',
})
export class ChangeTablePage {
  tables;
  total_table_empty: any;
  total_table_active: any;
  notrans: any;
  table_active: any;
  ip_api: any;
  listTable: any;

  constructor(public viewCtrl: ViewController,
    private sqlite: SQLite,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController,
    private storage: Storage) {
    this.getCurrentData(navParams.get("notrans"), navParams.get("table_active"));
    this.ipserver();
  }

  ipserver() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;
          this.getUpdateTabelFromServer(this.ip_api);
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  getUpdateTabelFromServer(ip_api) {

    const loader = this.loadingCtrl.create({
      content: "Please Waiting..."
    });
    loader.present();

    let body = {
      action: 'getTable'
    };


    this.postPvdr.postData(ip_api, body, 'Read').subscribe((data) => {
      if (data.success) {

        this.storage.set('table_storage', data.tables);
        loader.dismiss();
        this.getTable();
      } else {
        //coding...
      }
    }, error => {

      const toast = this.toastCtrl.create({
        message: 'Taking too much time for response. Please check your connection or try again.',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

      return;
    });
  }

  ionViewDidLoad() {
    //this.getTable();
  }

  getCurrentData(notrans, table_active) {
    this.notrans = notrans;
    this.table_active = table_active;
  }

  getTable() {
    this.storage.get('table_storage').then((res) => {
      this.listTable = res;
      this.tables = [];
      let count_table_active = 0;
      for (let i = 0; i < this.listTable.length; i++) {

        this.tables.push(
          {
            table_id: this.listTable[i]['KdMeja'],
            table_color: this.listTable[i]['warna'],
            table_isEmpty: this.listTable[i]['kosong'],
            table_trans: this.listTable[i]['NoTrans']
          });

        if (this.listTable[i]['kosong'] == '1') {
          count_table_active++;
        }
      }

      this.total_table_empty = this.listTable.length - count_table_active;
      this.total_table_active = count_table_active;
    });
  }

  changetable(table): void {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;

          let body = {
            notrans: this.notrans,
            table: table,
            action: 'changeTable'
          };


          this.postPvdr.postData(this.ip_api, body, 'Update').subscribe((data) => {
            if (data.success) {

              this.closeModal(table);
            } else {

              //coding...
            }
          }, error => {

            const toast = this.toastCtrl.create({
              message: 'Taking too much time for response. Please check your connection or try again.',
              position: 'top',
              showCloseButton: true,
              closeButtonText: 'Ok'
            });
            toast.present();

            return;
          });
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  closeModal(table) {
    this.viewCtrl.dismiss({ table_new: table });
  }

}
