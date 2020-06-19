import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-table',
  templateUrl: 'table.html',
})
export class TablePage {

  tables;
  waiter: any;
  id: any;
  notrans: any;
  ip_api: any;
  listTable: any;


  total_table_empty: any;
  total_table_active: any;

  today = new Date();
  date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
  time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
  nows = this.date + ' ' + this.time;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    private storage: Storage,
    private sqlite: SQLite) {
    this.getCurrentData(navParams.get("waiter"), navParams.get("id"));
    this.ipserver();

  }

  ionViewDidLoad() {
    //comment
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

  getCurrentData(waiter, id) {
    this.waiter = waiter;
    this.id = id;
  }

  getUpdateTabelFromServer(ip_api) {

    const loader = this.loadingCtrl.create({
      content: "Mohon Tunggu, sedang memindai meja."
    });
    loader.present();

    let body = {
      action: 'getTableTakingOrder'
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

      loader.dismiss();
      this.getTableLocal();
      const toast = this.toastCtrl.create({
        message: 'Lost Connection. This Order uses local storage.',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
      return;

    });
  }

  order(table, waiter, id, isEmpty, notrans): void {

    const loader = this.loadingCtrl.create({
      content: " Mohon Tunggu, sedang menyiapkan transaksi."
    });
    loader.present();

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      this.notrans = id + '' + this.today.getFullYear() + '' + this.benarMonth(this.today.getMonth() + 1) + '' + this.benarDate(this.today.getDate()) + '' + this.benarHours(this.today.getHours()) + '' + this.benarMinutes(this.today.getMinutes()) + '' + this.benarSecond(this.today.getSeconds());
      db.executeSql('INSERT INTO trans_order_header (NoTrans,Tanggal,Waktu,Kasir,KdMeja, Status) VALUES(?,?,?,?,?,?)', [this.notrans, this.date, this.TimeWatch(this.time), waiter, table, '0'])
        .then(res => {
          if (isEmpty == '0' || isEmpty == 0 || isEmpty == '' || notrans == '') {
            loader.dismiss();
            this.navCtrl.push('OrderPage', { notrans: this.notrans, table: table, waiter: waiter, id: id, new_order: 'Y', old_order: notrans });
            // this.navCtrl.push('TakingorderPage');
          } else {
            loader.dismiss();
            this.navCtrl.push('OrderPage', { notrans: this.notrans, table: table, waiter: waiter, id: id, new_order: 'T', old_order: notrans });
            // this.navCtrl.push('TakingorderPage');
          }
        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
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

  getTableLocal() {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM table_location', [])
        .then(res => {
          this.tables = [];
          let count_table_active = 0;
          for (let i = 0; i < res.rows.length; i++) {

            this.tables.push(
              {
                table_id: res.rows.item(i).table_id,
                table_color: 'light2',
                table_isEmpty: '0',
                table_trans: ''
              });

            if (res.rows.item(i).table_isEmpty == '1') {
              count_table_active++;
            }
          }

          this.total_table_empty = this.listTable.length - count_table_active;
          this.total_table_active = count_table_active;

        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });

  }

  TimeWatch(time) {
    var res = time.split(":");
    var jam;
    var menit;
    var detik;
    if (parseInt(res[0]) < 10) {
      jam = '0' + res[0];
    } else {
      jam = res[0];
    }

    if (parseInt(res[1]) < 10) {
      menit = '0' + res[1];
    } else {
      menit = res[1];
    }

    if (parseInt(res[2]) < 10) {
      detik = '0' + res[2];
    } else {
      detik = res[2];
    }

    var waktu = jam + ':' + menit + ':' + detik;
    return waktu;
  }

  DateWatch(dates) {
    var res = dates.split("-");
    var tahun;
    var bulan;
    var harian;

    tahun = res[0];

    if (parseInt(res[1]) < 10) {
      bulan = '0' + res[1];
    } else {
      bulan = res[1];
    }

    if (parseInt(res[2]) < 10) {
      harian = '0' + res[2];
    } else {
      harian = res[2];
    }

    var tanggal = tahun + '-' + bulan + '-' + harian;
    return tanggal;
  }

  benarMonth(m) {
    if (m * 1 < 10) {
      m = '0' + m;
    } else {
      m = m;
    }

    return m;
  }

  benarDate(d) {
    if (d * 1 < 10) {
      d = '0' + d;
    } else {
      d = d;
    }

    return d;
  }

  benarHours(h) {
    if (h * 1 < 10) {
      h = '0' + h;
    } else {
      h = h;
    }

    return h;
  }

  benarMinutes(i) {
    if (i * 1 < 10) {
      i = '0' + i;
    } else {
      i = i;
    }

    return i;
  }

  benarSecond(s) {
    if (s * 1 < 10) {
      s = '0' + s;
    } else {
      s = s;
    }

    return s;
  }
}
