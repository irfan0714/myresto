import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';
import 'rxjs/add/observable/interval';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-list-order',
  templateUrl: 'list-order.html',
})
export class ListOrderPage {

  tables;
  timerVar1;
  timerVar2;
  timerVal;
  views: any;
  color: any;
  ip_api: any;
  NoOrder: any;
  TimeLastOrder: any;
  Localside = 'N';
  tablesLocalSide: any;
  detail_order: any;
  public press: number = 0;
  public timer = 0;
  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  nows = this.date + ' ' + this.time;

  constructor(
    private toastCtrl: ToastController,
    private storage: Storage,
    private postPvdr: PostProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private sqlite: SQLite) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderPage');
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
      content: "Sedang menghubungkan ke database. Mohon Menunggu beberapa saat, jika sinyal terganggu akan ada alert. dan silahkan coba lagi."
    });
    loader.present();

    let body = {
      action: 'getTableListOrderLite'
    };

    this.postPvdr.postData(ip_api, body, 'Read').subscribe((data) => {

      if (data.success) {
        this.storage.set('tableListOrder_storage', data.tableListOrder);
        loader.dismiss();
        this.getTable();
        this.getTableLocalSide();
      } else {
        loader.dismiss();
      }
    }, error => {

      loader.dismiss();
      this.getTableLocalSide();
      const alert = this.alertCtrl.create({
        title: 'Lost Connection',
        subTitle: 'Opps, i am sorry, signal blank spot, please wait a few moment and try again',
        buttons: ['OK']
      });
      alert.present();
      return;
    });
  }

  getTable() {
    this.storage.get('tableListOrder_storage').then((res) => {
      this.tables = [];
      for (let i = 0; i < res.length; i++) {

        this.tables.push(
          {
            table_id: res[i]['KdMeja'],
            table_color: '#e4e2e2',
            no_trans_order: res[i]['NoTrans']
          });
      }
    });
  }

  getTableLocalSide() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM trans_order_header WHERE Status=? AND Tanggal=?', ['3', this.DateWatch(this.date)])
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

  detail_list_order(NoTrans, Table) {
    this.navCtrl.push('DetailListOrderPage', { notrans: NoTrans, table: Table });
  }

  btn_refresh() {
    this.ionViewDidLoad();
  }

  pressEvent(e, tbl, order_id) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;

          let body = {
            table: tbl,
            action: 'NoOrderInTheTable'
          };

          this.postPvdr.postData(this.ip_api, body, 'Read').subscribe((data) => {

            if (data.success) {
              //comment is succeess
              this.NoOrder = [];
              for (let i = 0; i < data.dataNoTransInTheTable.length; i++) {

                this.NoOrder.push(
                  {
                    text: 'No.Order ' + data.dataNoTransInTheTable[i]['NoTrans'] + ' ' + data.dataNoTransInTheTable[i]['Waktu'],
                    role: 'destructive',
                    handler: () => {
                      this.showChoosePrint(tbl, data.dataNoTransInTheTable[i]['NoTrans']);
                    }
                  }
                  , {
                    text: 'Void Order',
                    role: 'cancel',
                    handler: () => {
                      const prompt = this.alertCtrl.create({
                        title: 'Authorization',
                        message: "Enter a name your supervisor.",
                        inputs: [
                          {
                            name: 'username',
                            type: 'text',
                            placeholder: 'Username'
                          }, {
                            name: 'password',
                            type: 'password',
                            placeholder: 'Password'
                          },
                        ],
                        buttons: [
                          {
                            text: 'Cancel',
                            handler: data => {
                              console.log('Cancel clicked');
                            }
                          },
                          {
                            text: 'Approve',
                            handler: data => {
                              console.log('Saved clicked');

                              this.sqlite.create({
                                name: 'resto.db',
                                location: 'default'
                              }).then((db: SQLiteObject) => {

                                db.executeSql('SELECT * FROM user WHERE name=? AND password=? AND authorization=?', [data.username, data.password, 'Y'])
                                  .then(res => {
                                    if (res.rows.length > 0) {

                                      let body = {
                                        table: tbl,
                                        action: 'voidOrder'
                                      };

                                      this.postPvdr.postData(this.ip_api, body, 'Update').subscribe((data) => {

                                        if (data.success) {
                                          this.ionViewDidLoad();
                                        } else {
                                          const toast = this.toastCtrl.create({
                                            message: 'Failed Delete, Please Try Again.',
                                            position: 'top',
                                            duration: 3000
                                          });
                                          toast.present();
                                        }
                                      }, error => {

                                        const toast = this.toastCtrl.create({
                                          message: 'Lost Connection',
                                          position: 'top',
                                          showCloseButton: true,
                                          closeButtonText: 'Ok'
                                        });
                                        toast.present();

                                      });

                                    } else {
                                      let toast = this.toastCtrl.create({
                                        message: 'Opps, Sorry. Please Try Again.',
                                        duration: 3000
                                      });
                                      toast.present();
                                    }
                                  })
                                  .catch(e => console.log(e));

                              }).catch(e => console.log(e));
                            }
                          }
                        ]
                      });
                      prompt.present();

                    }
                  });
              }

              const actionSheet = this.actionSheetCtrl.create({
                title: 'Tabel ' + tbl,
                buttons: this.NoOrder
              });
              actionSheet.present();


            } else {
              //comment is not succeess
            }
          }, error => {

            const toast = this.toastCtrl.create({
              message: 'Lost Connection',
              position: 'top',
              showCloseButton: true,
              closeButtonText: 'Ok'
            });
            toast.present();

            return;
          });
          //end sending data to API

        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  showChoosePrint(table, notrans) {
    let alert = this.alertCtrl.create();
    alert.setTitle('No.Order ' + notrans + ' (' + table + ')');

    alert.addInput({
      type: 'radio',
      label: 'Print To All',
      value: 'toAll',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Print To Table Control',
      value: 'toTableControl'
    });

    alert.addInput({
      type: 'radio',
      label: 'Print To Kitchen',
      value: 'toKitchen'
    });

    alert.addInput({
      type: 'radio',
      label: 'Print To Livecooking',
      value: 'toLivecooking'
    });

    alert.addInput({
      type: 'radio',
      label: 'Print To Grill',
      value: 'toGrill'
    });

    alert.addInput({
      type: 'radio',
      label: 'Print To Bar',
      value: 'toBar'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.sqlite.create({
          name: 'resto.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('SELECT ip_api FROM setting', [])
            .then(res => {

              let body = {
                notrans: notrans,
                table: table,
                tipe: data,
                action: 'cetakUlang'
              };

              this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {

                if (data.success) {
                  //comment is succeess
                } else {
                  //comment is not succeess
                }
              }, error => {

                //error messages if not connected to server

              });

            }).catch(e => console.log(e));
        }).catch(e => {
          console.log(e);
        });
      }
    });
    alert.present();
  }

  sendingOrder(no_trans_order, table_id) {
    const confirm = this.alertCtrl.create({
      title: 'Sending Order?',
      message: 'Do you want to sending this pending order?',
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
            this.sendingData(no_trans_order, table_id);

          }
        }
      ]
    });
    confirm.present();

  }

  sendingData(no_trans_order, table_id) {

    const loader = this.loadingCtrl.create({
      content: "Please Waiting..."
    });
    loader.present();

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


      db.executeSql('UPDATE trans_order_header SET Status=? WHERE  NoTrans=?', ['0', no_trans_order])
        .then(res => {
          loader.dismiss();
        }).catch(e => {
          console.log(e);
        });

      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;

          db.executeSql('SELECT * FROM trans_order_header WHERE NoTrans=?', [no_trans_order])
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
                action: 'insertHeader'
              };


              this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {
                if (data.success) {
                  db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [no_trans_order])
                    .then(res => {
                      this.detail_order = [];
                      for (var i = 0; i < res.rows.length; i++) {

                        var print;
                        if (i + 1 == res.rows.length) {
                          print = "Y";
                        } else {
                          print = "N";
                        }

                        this.detail_order.push(
                          {
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
                            cetak: print
                          });

                      }

                      let body = {
                        data_order: this.detail_order,
                        action: 'insertDetail'
                      };

                      this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {

                        if (data.success) {
                          //comment is succeess
                        } else {
                          //comment is not succeess
                        }
                      }, error => {

                        const toast = this.toastCtrl.create({
                          message: 'Lost Connection',
                          position: 'top',
                          showCloseButton: true,
                          closeButtonText: 'Ok'
                        });
                        toast.present();

                        return;
                      });

                      this.Localside = 'N';
                      this.ionViewDidLoad();
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

}
