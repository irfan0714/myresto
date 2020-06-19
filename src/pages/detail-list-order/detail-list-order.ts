import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController, ActionSheetController } from 'ionic-angular';
import { ModalController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';


@IonicPage()
@Component({
  selector: 'page-detail-list-order',
  templateUrl: 'detail-list-order.html',
})
export class DetailListOrderPage {
  notrans: any;
  noTranz: any;
  table: any;
  Date_order: any;
  Waiter: any;
  Pax: any;
  NoSticker: any;
  no_sticker: any;
  Table_order: any;
  selectedAll = false;
  showCheckBoxes = true;
  pc: any;
  total_item: any;
  total_qty: any;
  Quanty: any;
  total_serve = 0;
  show_order_header = 'Y';
  listing_menu;
  testRadioOpen = false;
  testRadioResult: any;
  meja: any;
  ip_api: any;
  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  nows = this.date + ' ' + this.time;

  constructor(
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private sqlite: SQLite) {
    this.getCurrentData(navParams.get("notrans"), navParams.get("table"));
  }

  ionViewDidLoad() {
    this.loadserver();
  }

  loadserver() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM setting', [])
        .then(res => {
          console.log(res);
          if (res.rows.item(0).ip_api != '') {
            this.ip_api = res.rows.item(0).ip_api;
            this.getDatailListOrder(this.ip_api, this.notrans, this.table)
          }

        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  getCurrentData(notrans, table) {
    this.notrans = notrans;
    this.table = table;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getDatailListOrder(ip_api, notrans, table) {

    const loader = this.loadingCtrl.create({
      content: "Sedang menghubungkan ke database. Mohon Menunggu beberapa saat, jika sinyal terganggu akan ada alert. dan silahkan coba lagi."
    });
    loader.present();

    let body = {
      notrans: notrans,
      table: table,
      action: 'getTableListOrderDetailLite'
    };

    this.postPvdr.postData(ip_api, body, 'Read').subscribe((data) => {

      if (data.success) {
        console.log(data.dataListOrderHeader);
        loader.dismiss();
        //header
        this.NoSticker = data.dataListOrderHeader.Sticker;
        this.Table_order = data.dataListOrderHeader.KdMeja;

        //detail
        console.log(data.dataListOrderDetail);
        this.listing_menu = [];
        for (var i = 0; i < data.dataListOrderDetail.length; i++) {
          this.listing_menu.push(
            {
              noOrder: data.dataListOrderDetail[i]['NoTrans'],
              Nm: data.dataListOrderDetail[i]['NamaLengkap'],
              PCode: data.dataListOrderDetail[i]['PCode'],
              Sts: data.dataListOrderDetail[i]['Status'],
              Quty: data.dataListOrderDetail[i]['Qty'],
              Wght: data.dataListOrderDetail[i]['Berat'],
              Nt: data.dataListOrderDetail[i]['Keterangan']
            })
        }

      } else {
        loader.dismiss();

      }
    }, error => {
      loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Lost Connection',
        subTitle: 'Opps, i am sorry, signal blank spot, please wait a few moment and try again',
        buttons: ['OK']
      });
      alert.present();
    });

  }

  doneOrder() {

    const confirm = this.alertCtrl.create({
      title: 'Are You Sure?',
      message: 'sure this menu is done?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //comment
          }
        },
        {
          text: 'Yes',
          handler: () => {

            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {

              db.executeSql('SELECT * FROM setting', [])
                .then(res => {
                  for (var i = 0; i < this.listing_menu.length; i++) {

                    if (this.listing_menu[i]['chk']) {

                      this.pc = this.listing_menu[i]['PCode'];
                      this.noTranz = this.listing_menu[i]['noOrder'];
                      this.Quanty = parseInt(this.listing_menu[i]['Quty']);

                      var stus = (document.getElementById('ls_' + this.pc + '' + this.noTranz) as HTMLInputElement).innerHTML;

                      if (stus == '0') {
                        console.log('ini yang di checklist', i, this.listing_menu[i]['chk']);
                        document.getElementById('oke' + i).style.display = "";
                        document.getElementById('showCheckBoxes' + i).style.display = "none";

                        document.getElementById('weightOrder' + i).style.display = "none";
                        document.getElementById('unlockOrder' + i).style.display = "";
                        document.getElementById('deleteOrder' + i).style.display = "none";

                        if (res.rows.item(0).ip_api != '') {
                          this.ip_api = res.rows.item(0).ip_api;

                          document.getElementById('ls_' + this.pc + '' + this.noTranz).innerHTML = '1';
                          this.checkListMenu(this.ip_api, this.noTranz, this.pc, this.Quanty)
                        }

                      }

                    }
                  }

                }).catch(e => console.log(e));

            }).catch(e => {
              console.log(e);
            });




          }
        }
      ]
    });
    confirm.present();
  }

  checkListMenu(ip_api, notrans, pcode, qty) {

    let body = {
      notrans: notrans,
      pcode: pcode,
      qty: qty,
      action: 'checkListMenuOut'
    };

    this.postPvdr.postData(ip_api, body, 'Update').subscribe((data) => {

      if (data.success) {
        this.total_serve = parseInt(data.totalserve) * 1;
      } else {


      }
    });
  }

  CheckAll() {
    this.selectedAll = true;
    document.getElementById('chackedAll').style.display = "none";
    document.getElementById('unchackedAll').style.display = "";
    console.log(this.listing_menu);
  }

  UnCheckAll() {
    this.selectedAll = false;
    document.getElementById('chackedAll').style.display = "";
    document.getElementById('unchackedAll').style.display = "none";
    console.log(this.listing_menu);
  }

  weightOrder(ke, sts, pcode, kuan, trns) {

    const prompt = this.alertCtrl.create({
      title: 'Edit Weight',
      //message: "For " + this.name_menu + ' menu',
      inputs: [
        {
          name: 'input_weight',
          type: 'number',
          placeholder: 'Weight'
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
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');

            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {

              db.executeSql('UPDATE trans_order_detail SET Berat=? WHERE NoTrans=? AND PCode=? AND Qty=?', [data.input_weight, trns, pcode, kuan])
                .then(res => {
                  console.log(res);
                  console.log('berhasil edit transaksi detail weight ', data.input_weight, trns);
                  this.sendingUpdateDetail(pcode, '0', data.input_weight, trns);
                })
                .catch(e => {
                  console.log(e);
                });

            }).catch(e => {
              console.log(e);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  unlockOrder(ke, sts, pcode, kuan, trns) {

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

                    document.getElementById('showCheckBoxes' + ke).style.display = "";
                    document.getElementById('oke' + ke).style.display = "none";

                    if (sts == '1') {
                      document.getElementById('weightOrderDone' + ke).style.display = "";
                      document.getElementById('unlockOrderDone' + ke).style.display = "none";
                      document.getElementById('deleteOrderDone' + ke).style.display = "";
                    } else if (sts == '0') {
                      document.getElementById('weightOrder' + ke).style.display = "";
                      document.getElementById('unlockOrder' + ke).style.display = "none";
                      document.getElementById('deleteOrder' + ke).style.display = "";
                    }

                    this.sendingUpdateDetail(pcode, '0', '', trns);

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

  deleteOrder(ke, sts, pcode, kuan, trns) {
    const confirm = this.alertCtrl.create({
      title: 'Are You Sure?',
      message: 'sure this menu will be deleted?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');

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
                      db.executeSql('SELECT * FROM user WHERE name=? AND password=?', [data.username, data.password])
                        .then(res => {
                          if (res.rows.length > 0) {

                            document.getElementById('viewDetail' + ke).style.display = "none";
                            this.sendingUpdateDetail(pcode, '2', '', trns);

                          } else {
                            const toast = this.toastCtrl.create({
                              message: 'You do not have authorization',
                              position: 'top',
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


            for (var i = 0; i < this.listing_menu.length; i++) {
              if (this.listing_menu[i]['chk']) {
                console.log('ini yang di checklist');
                document.getElementById('oke' + i).style.display = "";
                document.getElementById('showCheckBoxes' + i).style.display = "none";

                document.getElementById('weightOrder' + i).style.display = "none";
                document.getElementById('unlockOrder' + i).style.display = "";
                document.getElementById('deleteOrder' + i).style.display = "none";

                this.pc = this.listing_menu[i]['PCode'];
                this.Quanty = parseInt(this.listing_menu[i]['Quty']);

                this.sqlite.create({
                  name: 'resto.db',
                  location: 'default'
                }).then((db: SQLiteObject) => {

                  db.executeSql('UPDATE trans_order_detail SET Status = ? WHERE NoTrans = ? AND PCode = ? ', ['1', this.notrans, this.pc])
                    .then(res => {
                      //comment
                    })
                    .catch(e => {
                      console.log(e);
                    });

                }).catch(e => {
                  console.log(e);
                });

              }
            }
          }
        }
      ]
    });
    confirm.present();
  }

  changeSticker(nosti_cker) {
    const prompt = this.alertCtrl.create({
      title: 'Form Customer',
      message: "Total Pax and No. Sticker.",
      inputs: [
        {
          name: 'nosticker',
          type: 'number',
          value: nosti_cker,
          placeholder: 'No.Sticker'
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
          text: 'Save Edit',
          handler: data => {
            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {

              if (data.nosticker.length == 4) {

                db.executeSql('UPDATE trans_order_header SET KdAgent=? WHERE NoTrans=? AND KdAgent=?', [data.nosticker, this.notrans, nosti_cker])
                  .then(res => {
                    console.log(res);
                    this.no_sticker = data.nosticker;
                    document.getElementById('stickerpure').style.display = "none";
                    document.getElementById('stickernotpure').style.display = "";
                    console.log('berhasil edit transaksi header ', this.notrans);

                    //sending data header
                    this.sendingUpdateHeader('', data.nosticker);
                  })
                  .catch(e => {
                    console.log(e);
                  });

              } else {
                const toast = this.toastCtrl.create({
                  message: 'No Sticker must be 4 digits',
                  position: 'top',
                  duration: 3000
                });
                toast.present();
                return;
              }

            }).catch(e => {
              console.log(e);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  changeTable() {
    const myModal = this.modalCtrl.create('ChangeTablePage', { notrans: this.notrans, table_active: this.Table_order });
    myModal.present();
    myModal.onDidDismiss(data => {
      if (data.table_new) {
        this.Table_order = data.table_new;
        this.sendingUpdateHeader(data.table_new, '');
      }

    });
  }

  duplicateMenu() {
    const myModal = this.modalCtrl.create('DuplicateMenuPage', { notrans: this.notrans, table_active: this.Table_order });
    myModal.present();
    myModal.onDidDismiss(data => {
      //tidak ada lemparan data dari modal
    });
  }

  sendingUpdateHeader(table, sticker) {

    let body = {
      notrans: this.notrans,
      meja: table,
      nosticker: sticker,
      action: 'updateHeader'
    };


    this.postPvdr.postData(this.ip_api, body, 'Update').subscribe((data) => {

      if (data.success) {
        const toast = this.toastCtrl.create({
          message: 'Update Successful',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      } else {
        const toast = this.toastCtrl.create({
          message: 'Update Unsuccessfully',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  sendingUpdateDetail(pcode, sts, weight, trns) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;

          let body = {
            notrans: trns,
            pcode: pcode,
            status: sts,
            berat: weight,
            action: 'updateDetail'
          };

          this.postPvdr.postData(this.ip_api, body, 'Update').subscribe((data) => {

            if (data.success) {
              this.total_serve = parseInt(data.totalserve) * 1;
              const toast = this.toastCtrl.create({
                message: 'Update Successful',
                duration: 1000,
                position: 'top'
              });
              toast.present();
              this.ionViewDidLoad();
            } else {
              const toast = this.toastCtrl.create({
                message: 'Update Unsuccessfully',
                duration: 1000,
                position: 'top'
              });
              toast.present();
            }
          });

        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  optional_menu(nosticker) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Optional Menu',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Change Table',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'clipboard' : null,
          handler: () => {
            this.changeTable();
          }
        },
        {
          text: 'Change No.Sticker',
          icon: !this.platform.is('ios') ? 'happy' : null,
          handler: () => {
            this.changeSticker(nosticker);
          }
        },
        /*{
          text: 'Duplicate Menu',
          icon: !this.platform.is('ios') ? 'list' : null,
          handler: () => {
            this.duplicateMenu();
          }
        }*/
      ]
    });
    actionSheet.present();
  }

  btn_refresh() {
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


}
