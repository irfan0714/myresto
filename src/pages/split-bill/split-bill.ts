import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-split-bill',
  templateUrl: 'split-bill.html',
})
export class SplitBillPage {

  tables;
  waiter: any;
  id: any;
  notrans: any;
  ip_api: any;
  listTable: any;
  detail_order: any;

  Localside = 'N';
  tablesLocalSide: any;

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
    public alertCtrl: AlertController,
    private storage: Storage,
    private sqlite: SQLite) {
    this.getCurrentData(navParams.get("waiter"), navParams.get("id"));
  }

  ionViewDidLoad() {
    //comment
    this.ipserver();
    this.getTableLocalSide();
  }

  ipserver() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;
          //get data update from server
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

  getTableLocalSide() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM trans_order_header WHERE Status=? AND Tanggal=?', ['4', this.date])
        .then(res => {
          if (res.rows.length > 0) {
            this.tablesLocalSide = [];
            for (let i = 0; i < res.rows.length; i++) {
              this.tablesLocalSide.push(
                {
                  table_id: res.rows.item(i).KdMeja,
                  no_trans_order: res.rows.item(i).NoTrans,
                  table_time: res.rows.item(i).Waktu
                });
            }

            this.Localside = 'Y';

          }
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
        //if success
        this.storage.set('table_storage', data.tables);
        loader.dismiss();
        this.getTable();
      } else {
        //if not success not connectes to server
      }
    }, error => {

      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Opps Sorry, Make sure it is connected with local wifi or Make sure Server Is Not Down. This Order uses local storage.',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

      return;
    });
  }

  split_bills(table, waiter, pax, sticker): void {
    const prompt = this.alertCtrl.create({
      title: 'Number of splits',
      message: "Please input number of splits.",
      inputs: [
        {
          name: 'num_split',
          type: 'number',
          placeholder: '3 Split'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Split',
          handler: data => {
            this.navCtrl.push('SplitBillDetailsPage', { table: table, num_split: data.num_split, waiters: waiter, guest: pax, no_sticker: sticker });
          }
        }
      ]
    });
    prompt.present();
  }

  getTable() {
    this.storage.get('table_storage').then((res) => {
      this.listTable = res;
      this.tables = [];
      for (let i = 0; i < this.listTable.length; i++) {

        if (this.listTable[i]['kosong'] == '1') {

          this.tables.push(
            {
              table_id: this.listTable[i]['KdMeja'],
              waiters: this.listTable[i]['Kasir'],
              pax: this.listTable[i]['TotalGuest'],
              nosticker: this.listTable[i]['KdAgent'],
              table_color: this.listTable[i]['warna'],
              table_isEmpty: this.listTable[i]['kosong'],
              table_trans: this.listTable[i]['NoTrans']
            });
        }
      }
    });
  }

  sendingOrderSplit(no_trans_order, tbl_id) {
    const confirm = this.alertCtrl.create({
      title: 'Split Order?',
      message: 'Do you want to sending this split order?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Agree clicked');
            this.sendingDataKeServer(no_trans_order, tbl_id);

          }
        }
      ]
    });
    confirm.present();

  }

  sendingDataKeServer(no_order_temp, tbl_id) {

    const loader = this.loadingCtrl.create({
      content: "Please Waiting..."
    });
    loader.present();

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;


          db.executeSql('SELECT * FROM trans_order_header WHERE NoTrans=?', [no_order_temp])
            .then(res => {


              let body = {
                NoTrans: res.rows.item(0).NoTrans,
                NoKassa: res.rows.item(0).NoKassa,
                Tanggal: this.DateWatch(res.rows.item(0).Tanggal),
                Waktu: this.TimeWatch(res.rows.item(0).Waktu),
                Kasir: res.rows.item(0).Kasir,
                KdStore: res.rows.item(0).KdStore,
                TotalItem: res.rows.item(0).TotalItem,
                TotalQty: res.rows.item(0).TotalQty,
                TotalServe: res.rows.item(0).TotalServe,
                Status: res.rows.item(0).Status,
                KdPersonal: res.rows.item(0).KdPersonal,
                KdMeja: res.rows.item(0).KdMeja,
                KdContact: res.rows.item(0).KdContact,
                nostruk: res.rows.item(0).nostruk,
                TotalGuest: res.rows.item(0).TotalGuest,
                AddDate: res.rows.item(0).AddDate,
                keterangan: res.rows.item(0).keterangan,
                KdAgent: res.rows.item(0).KdAgent,
                IsCommit: res.rows.item(0).IsCommit,
                action: 'insertHeaderSplit'
              };


              this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {

                if (data.success) {
                  //comment is succeess
                  console.log(data);

                  db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [no_order_temp])
                    .then(res => {
                      this.detail_order = [];

                      for (var i = 0; i < res.rows.length; i++) {

                        var print;
                        var trans = res.rows.item(i).KdContact;
                        if (i + 1 == res.rows.length) {
                          print = "N";
                          loader.dismiss();
                          this.ionViewDidLoad();
                        }

                        let body = {
                          NoTrans: data.no_order,
                          NoUrut: res.rows.item(i).NoUrut,
                          NoKassa: res.rows.item(i).NoKassa,
                          Tanggal: this.DateWatch(res.rows.item(i).Tanggal),
                          Waktu: this.TimeWatch(res.rows.item(i).Waktu),
                          Kasir: res.rows.item(i).Kasir,
                          KdStore: res.rows.item(i).KdStore,
                          PCode: res.rows.item(i).PCode,
                          Name: res.rows.item(i).Name,
                          Qty: res.rows.item(i).Qty,
                          Berat: res.rows.item(i).Berat,
                          Satuan: res.rows.item(i).Satuan,
                          Keterangan: res.rows.item(i).Keterangan,
                          Note_split: res.rows.item(i).Note_split,
                          Status: res.rows.item(i).Status,
                          KdPersonal: res.rows.item(i).KdPersonal,
                          KdMeja: res.rows.item(i).KdMeja,
                          KdContact: res.rows.item(i).KdContact,
                          MenuBaru: res.rows.item(i).MenuBaru,
                          Tambahan: res.rows.item(i).Tambahan,
                          cetak: print,
                          action: 'insertDetailSplit'
                        };


                        this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {

                          if (data.success) {
                            //comment is succeess
                            let body = {
                              NoTransSemula: trans.substring(0, 3),
                              action: 'voidReferensOrderSplit'
                            };

                            this.postPvdr.postData(this.ip_api, body, 'Update').subscribe((datax) => {
                              if (datax.success) {
                                console.log('Oke berhasil update split order yang asli');

                                db.executeSql('UPDATE trans_order_header SET Status=? WHERE NoTrans=?', ['0', no_order_temp])
                                  .then(resr => {
                                    console.log('Oke berhasil update split order yang split');
                                  }).catch(e => {
                                    console.log(e);
                                  });
                              }
                            });



                          } else {
                            //comment is not succeess
                          }
                        });

                      }
                    }).catch(e => console.log(e));

                } else {
                  //comment is not succeess
                }
              }, error => {

                loader.dismiss();
                const toast = this.toastCtrl.create({
                  message: 'Opps Sorry, Make sure it is connected with local wifi or Make sure Server Is Not Down. This Order uses local storage.',
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: 'Ok'
                });
                toast.present();

                db.executeSql('UPDATE trans_order_header SET Status=? WHERE  NoTrans=?', ['4', no_order_temp])
                  .then(res => {
                    //
                  }).catch(e => {
                    console.log(e);
                  });

                return;
              });


            })
            .catch(e => {
              console.log(e);
            });
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });



  }

  refresh_pages() {
    this.ionViewDidLoad();
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
