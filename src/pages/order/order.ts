import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../home/home';
import { PostProvider } from '../../providers/post-provider';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  totalitem: any;
  table: any;
  waiter: any;
  new_order: any;
  old_order: any;
  id: any;
  id_order: any;
  name_menu: any;
  listOrder = [];
  sumItem = 0;
  total_pax = '';
  no_sticker = '';
  notrans: any;
  listing_menu;
  menu_tambahan: any;
  show_order_history = 'N';
  header_order: any;
  detail_order: any;
  ip_api: any;

  edit_qty01 = 1;
  edit_qty02 = 1;
  edit_qty03 = 1;
  edit_qty04 = 1;
  edit_qty05 = 1;
  edit_qty06 = 1;
  edit_qty07 = 1;
  edit_qty08 = 1;
  edit_qty09 = 1;
  edit_qty10 = 1;
  edit_qty11 = 1;
  edit_qty12 = 1;
  edit_qty13 = 1;
  edit_qty14 = 1;
  edit_qty15 = 1;
  edit_qty16 = 1;
  edit_qty17 = 1;
  edit_qty18 = 1;
  edit_qty19 = 1;
  edit_qty20 = 1;
  edit_qty21 = 1;
  edit_qty22 = 1;
  edit_qty23 = 1;
  edit_qty24 = 1;
  edit_qty25 = 1;
  edit_qty26 = 1;
  edit_qty27 = 1;
  edit_qty28 = 1;
  edit_qty29 = 1;
  edit_qty30 = 1;

  note_menu01: any;
  note_menu02: any;
  note_menu03: any;
  note_menu04: any;
  note_menu05: any;
  note_menu06: any;
  note_menu07: any;
  note_menu08: any;
  note_menu09: any;
  note_menu10: any;
  note_menu11: any;
  note_menu12: any;
  note_menu13: any;
  note_menu14: any;
  note_menu15: any;
  note_menu16: any;
  note_menu17: any;
  note_menu18: any;
  note_menu19: any;
  note_menu20: any;
  note_menu21: any;
  note_menu22: any;
  note_menu23: any;
  note_menu24: any;
  note_menu25: any;
  note_menu26: any;
  note_menu27: any;
  note_menu28: any;
  note_menu29: any;
  note_menu30: any;

  name_menu01: any;
  name_menu02: any;
  name_menu03: any;
  name_menu04: any;
  name_menu05: any;
  name_menu06: any;
  name_menu07: any;
  name_menu08: any;
  name_menu09: any;
  name_menu10: any;
  name_menu11: any;
  name_menu12: any;
  name_menu13: any;
  name_menu14: any;
  name_menu15: any;
  name_menu16: any;
  name_menu17: any;
  name_menu18: any;
  name_menu19: any;
  name_menu20: any;
  name_menu21: any;
  name_menu22: any;
  name_menu23: any;
  name_menu24: any;
  name_menu25: any;
  name_menu26: any;
  name_menu27: any;
  name_menu28: any;
  name_menu29: any;
  name_menu30: any;

  noted01 = 'N';
  noted02 = 'N';
  noted03 = 'N';
  noted04 = 'N';
  noted05 = 'N';
  noted06 = 'N';
  noted07 = 'N';
  noted08 = 'N';
  noted09 = 'N';
  noted10 = 'N';
  noted11 = 'N';
  noted12 = 'N';
  noted13 = 'N';
  noted14 = 'N';
  noted15 = 'N';
  noted16 = 'N';
  noted17 = 'N';
  noted18 = 'N';
  noted19 = 'N';
  noted20 = 'N';
  noted21 = 'N';
  noted22 = 'N';
  noted23 = 'N';
  noted24 = 'N';
  noted25 = 'N';
  noted26 = 'N';
  noted27 = 'N';
  noted28 = 'N';
  noted29 = 'N';
  noted30 = 'N';

  weight01 = 0;
  weight02 = 0;
  weight03 = 0;
  weight04 = 0;
  weight05 = 0;
  weight06 = 0;
  weight07 = 0;
  weight08 = 0;
  weight09 = 0;
  weight10 = 0;
  weight11 = 0;
  weight12 = 0;
  weight13 = 0;
  weight14 = 0;
  weight15 = 0;
  weight16 = 0;
  weight17 = 0;
  weight18 = 0;
  weight19 = 0;
  weight20 = 0;
  weight21 = 0;
  weight22 = 0;
  weight23 = 0;
  weight24 = 0;
  weight25 = 0;
  weight26 = 0;
  weight27 = 0;
  weight28 = 0;
  weight29 = 0;
  weight30 = 0;

  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  nows = this.date + ' ' + this.time;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private sqlite: SQLite,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController) {

    //set up awal
    this.totalitem = 10;

    //data lemparan
    this.getCurrentData(navParams.get("notrans"), navParams.get("table"), navParams.get("waiter"), navParams.get("id"), navParams.get("new_order"), navParams.get("old_order"));

    //the first load
    this.initializeItems();

  }

  initializeItems() {
    this.listOrder = [
      {
        'myorder': ''
      }
    ]
  }

  getCurrentData(notrans, table, waiter, id, new_order, old_order) {
    this.notrans = notrans;
    this.table = table;
    this.waiter = waiter;
    this.new_order = new_order;
    this.old_order = old_order;
    this.id = id;
  }

  ionViewDidLoad() {

    if (this.new_order == 'Y') {
      const prompt = this.alertCtrl.create({
        title: 'Form Customer',
        message: "Input Total Pax and No. Sticker.",
        inputs: [
          {
            name: 'pax',
            type: 'number',
            placeholder: 'Pax'
          }, {
            name: 'nosticker',
            type: 'number',
            placeholder: 'No.Sticker'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
            }
          },
          {
            text: 'Save',
            handler: data => {

              if (parseInt(data.pax.length) > 3) {
                const toast = this.toastCtrl.create({
                  message: 'Total pax may not exceed 3 digits',
                  position: 'top',
                  duration: 3000
                });
                toast.present();
                return;
              }

              if (parseInt(data.nosticker.length) > 4) {
                const toast = this.toastCtrl.create({
                  message: 'No Sticker may not exceed 4 digits',
                  position: 'top',
                  duration: 3000
                });
                toast.present();
                return;
              }

              this.save_form_customer(data.pax, data.nosticker, this.notrans);
            }
          }
        ]
      });
      prompt.present();
    } else {

      this.sqlite.create({
        name: 'resto.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT ip_api FROM setting', [])
          .then(res => {

            this.ip_api = res.rows.item(0).ip_api;

            if (this.old_order != '') {

              const loader = this.loadingCtrl.create({
                content: ""
              });
              loader.present();

              let body = {
                noTrans: this.old_order,
                action: 'getMenuLastOrder'
              };

              this.postPvdr.postData(this.ip_api, body, 'Read').subscribe((data) => {
                if (data.success) {
                  db.executeSql('UPDATE trans_order_header SET TotalGuest=?,KdAgent=? WHERE NoTrans=?', [data.pax, data.sticker, this.notrans])
                    .then(resd => {
                      loader.dismiss();
                      this.total_pax = data.pax;
                      this.no_sticker = data.sticker;
                    }).catch(e => {
                      console.log(e);
                    });
                } else {
                  loader.dismiss();
                }
              }, error => {

                loader.dismiss();
                const toast = this.toastCtrl.create({
                  message: 'Lost Connection. This Order uses local storage.',
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: 'Ok'
                });
                toast.present();

                const prompt2 = this.alertCtrl.create({
                  title: 'Form Customer',
                  message: "Please Input Again Total Pax and No. Sticker. Because Lost Connection.",
                  inputs: [
                    {
                      name: 'pax',
                      type: 'number',
                      placeholder: 'Pax'
                    }, {
                      name: 'nosticker',
                      type: 'number',
                      placeholder: 'No.Sticker'
                    },
                  ],
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: data => {
                        //comment
                      }
                    },
                    {
                      text: 'Save',
                      handler: data => {

                        if (parseInt(data.pax.length) > 3) {
                          const toast = this.toastCtrl.create({
                            message: 'Total pax may not exceed 3 digits',
                            position: 'top',
                            duration: 3000
                          });
                          toast.present();

                          return;
                        }

                        if (parseInt(data.nosticker.length) > 4) {
                          const toast = this.toastCtrl.create({
                            message: 'No Sticker may not exceed 4 digits',
                            position: 'top',
                            duration: 3000
                          });
                          toast.present();

                          return;
                        }

                        this.save_form_customer(data.pax, data.nosticker, this.notrans);
                      }
                    }
                  ]
                });
                prompt2.present();

                return;
              });
            }

          }).catch(e => console.log(e));

      }).catch(e => {
        console.log(e);
      });

    }

  }

  addMenu() {

    const myModal = this.modalCtrl.create('AddmenuPage', { order_id: this.sumItem });
    myModal.present();
    myModal.onDidDismiss(data => {
      if (data.pcode) {
        this.cloneItem(data.pcode, data.name, data.order_id);
        this.insert_menu(data.pcode, data.name, data.price, data.order_id);
      }

    });
  }

  insert_menu(pcode, name, price, order_id) {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      if (this.new_order == 'Y') {
        this.menu_tambahan = 'T';
      } else {
        this.menu_tambahan = 'Y';
      }

      db.executeSql('INSERT INTO trans_order_detail (NoTrans,NoUrut,Tanggal,Waktu,Kasir,PCode,Name,Qty,Berat,Keterangan,Status,KdMeja,MenuBaru,Tambahan,Harga) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [this.notrans, order_id, this.DateWatch(this.date), this.TimeWatch(this.time), this.waiter, pcode, name, '1', '0', '', '0', this.table, '0', this.menu_tambahan, price])
        .then(res => {
          console.log('berhasil transaksi detail ', this.notrans, this.DateWatch(this.date), pcode, name, order_id, price);
        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
  }

  save_form_customer(pax, nosticker, notrans) {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('UPDATE trans_order_header SET TotalGuest=?,KdAgent=? WHERE NoTrans=? ', [pax, nosticker, notrans])
        .then(res => {
          this.total_pax = pax;
          this.no_sticker = nosticker;
          console.log('berhasil transaksi header ', notrans);
        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
  }

  save_form_customer_edit(pax, nosticker, notrans) {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE trans_order_header SET TotalGuest=?,KdAgent=? WHERE NoTrans=? ', [pax, nosticker, notrans])
        .then(res => {
          this.total_pax = pax;
          this.no_sticker = nosticker;
          console.log('berhasil edit transaksi header ', notrans);
        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
  }

  view_customer(ttl_pax, stckr, notrans) {
    const prompt = this.alertCtrl.create({
      title: 'Form Customer',
      message: "Total Pax and No. Sticker.",
      inputs: [
        {
          name: 'pax',
          type: 'number',
          value: ttl_pax,
          placeholder: 'Pax'
        }, {
          name: 'nosticker',
          type: 'number',
          value: stckr,
          placeholder: 'No.Sticker'
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
          text: 'Save Edit',
          handler: data => {

            if (parseInt(data.pax.length) > 3) {
              const toast = this.toastCtrl.create({
                message: 'Total pax may not exceed 3 digits',
                position: 'top',
                duration: 3000
              });
              toast.present();
              return;
            }

            if (parseInt(data.nosticker.length) != 4) {
              const toast = this.toastCtrl.create({
                message: 'No Sticker must be 4 digits',
                position: 'top',
                duration: 3000
              });
              toast.present();
              return;
            }

            this.save_form_customer_edit(data.pax, data.nosticker, notrans);
          }
        }
      ]
    });
    prompt.present();
  }

  quantity(param, food) {
    this.id_order = param;
    this.name_menu = food;


    const prompt = this.alertCtrl.create({
      title: 'Edit Quantity',
      //message: "For " + this.name_menu + ' menu',
      inputs: [
        {
          name: 'edit_quantity',
          type: 'number',
          placeholder: 'Quantity'
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
          text: 'Save',
          handler: data => {
            //console.log('Saved clicked');
            if (parseInt((this.id_order)) == 1) { this.edit_qty01 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 2) { this.edit_qty02 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 3) { this.edit_qty03 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 4) { this.edit_qty04 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 5) { this.edit_qty05 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 6) { this.edit_qty06 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 7) { this.edit_qty07 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 8) { this.edit_qty08 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 9) { this.edit_qty09 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 10) { this.edit_qty10 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 11) { this.edit_qty11 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 12) { this.edit_qty12 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 13) { this.edit_qty13 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 14) { this.edit_qty14 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 15) { this.edit_qty15 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 16) { this.edit_qty16 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 17) { this.edit_qty17 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 18) { this.edit_qty18 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 19) { this.edit_qty19 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 20) { this.edit_qty20 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 21) { this.edit_qty21 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 22) { this.edit_qty22 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 23) { this.edit_qty23 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 24) { this.edit_qty24 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 25) { this.edit_qty25 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 26) { this.edit_qty26 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 27) { this.edit_qty27 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 28) { this.edit_qty28 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 29) { this.edit_qty29 = data.edit_quantity; }
            else if (parseInt((this.id_order)) == 30) { this.edit_qty30 = data.edit_quantity; }

            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {

              if (this.new_order == 'Y') {
                this.menu_tambahan = 'T';
              } else {
                this.menu_tambahan = 'Y';
              }
              db.executeSql('UPDATE trans_order_detail SET Qty=? WHERE NoTrans=? AND NoUrut=? AND Tambahan=?', [data.edit_quantity, this.notrans, this.id_order, this.menu_tambahan])
                .then(res => {
                  console.log('berhasil edit transaksi detail quantity ', data.edit_quantity, this.notrans, this.id_order, this.new_order, this.menu_tambahan);
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

  notes(param, food) {
    this.id_order = param;
    this.name_menu = food;
    const prompt = this.alertCtrl.create({
      title: 'Add Notes',
      //message: "For " + this.name_menu + ' menu',
      inputs: [
        {
          name: 'notes_menu',
          type: 'text',
          placeholder: 'Notes'
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
          text: 'Save',
          handler: data => {
            //console.log('Saved clicked');
            if (data.notes_menu == '') {

              if (parseInt((this.id_order)) == 1) { this.noted01 = 'N'; }
              else if (parseInt((this.id_order)) == 2) { this.noted02 = 'N'; }
              else if (parseInt((this.id_order)) == 3) { this.noted03 = 'N'; }
              else if (parseInt((this.id_order)) == 4) { this.noted04 = 'N'; }
              else if (parseInt((this.id_order)) == 5) { this.noted05 = 'N'; }
              else if (parseInt((this.id_order)) == 6) { this.noted06 = 'N'; }
              else if (parseInt((this.id_order)) == 7) { this.noted07 = 'N'; }
              else if (parseInt((this.id_order)) == 8) { this.noted08 = 'N'; }
              else if (parseInt((this.id_order)) == 9) { this.noted09 = 'N'; }
              else if (parseInt((this.id_order)) == 10) { this.noted10 = 'N'; }
              else if (parseInt((this.id_order)) == 11) { this.noted11 = 'N'; }
              else if (parseInt((this.id_order)) == 12) { this.noted12 = 'N'; }
              else if (parseInt((this.id_order)) == 13) { this.noted13 = 'N'; }
              else if (parseInt((this.id_order)) == 14) { this.noted14 = 'N'; }
              else if (parseInt((this.id_order)) == 15) { this.noted15 = 'N'; }
              else if (parseInt((this.id_order)) == 16) { this.noted16 = 'N'; }
              else if (parseInt((this.id_order)) == 17) { this.noted17 = 'N'; }
              else if (parseInt((this.id_order)) == 18) { this.noted18 = 'N'; }
              else if (parseInt((this.id_order)) == 19) { this.noted19 = 'N'; }
              else if (parseInt((this.id_order)) == 20) { this.noted10 = 'N'; }
              else if (parseInt((this.id_order)) == 21) { this.noted21 = 'N'; }
              else if (parseInt((this.id_order)) == 22) { this.noted22 = 'N'; }
              else if (parseInt((this.id_order)) == 23) { this.noted23 = 'N'; }
              else if (parseInt((this.id_order)) == 24) { this.noted24 = 'N'; }
              else if (parseInt((this.id_order)) == 25) { this.noted25 = 'N'; }
              else if (parseInt((this.id_order)) == 26) { this.noted26 = 'N'; }
              else if (parseInt((this.id_order)) == 27) { this.noted27 = 'N'; }
              else if (parseInt((this.id_order)) == 28) { this.noted28 = 'N'; }
              else if (parseInt((this.id_order)) == 29) { this.noted29 = 'N'; }
              else if (parseInt((this.id_order)) == 30) { this.noted30 = 'N'; }

              if (parseInt((this.id_order)) == 1) { this.note_menu01 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 2) { this.note_menu02 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 3) { this.note_menu03 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 4) { this.note_menu04 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 5) { this.note_menu05 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 6) { this.note_menu06 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 7) { this.note_menu07 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 8) { this.note_menu08 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 9) { this.note_menu09 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 10) { this.note_menu10 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 11) { this.note_menu11 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 12) { this.note_menu12 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 13) { this.note_menu13 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 14) { this.note_menu14 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 15) { this.note_menu15 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 16) { this.note_menu16 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 17) { this.note_menu17 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 18) { this.note_menu18 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 19) { this.note_menu19 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 20) { this.note_menu20 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 21) { this.note_menu21 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 22) { this.note_menu22 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 23) { this.note_menu23 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 24) { this.note_menu24 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 25) { this.note_menu25 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 26) { this.note_menu26 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 27) { this.note_menu27 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 28) { this.note_menu28 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 29) { this.note_menu29 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 30) { this.note_menu30 = data.notes_menu; }
            } else {

              if (parseInt((this.id_order)) == 1) { this.noted01 = 'Y'; }
              else if (parseInt((this.id_order)) == 2) { this.noted02 = 'Y'; }
              else if (parseInt((this.id_order)) == 3) { this.noted03 = 'Y'; }
              else if (parseInt((this.id_order)) == 4) { this.noted04 = 'Y'; }
              else if (parseInt((this.id_order)) == 5) { this.noted05 = 'Y'; }
              else if (parseInt((this.id_order)) == 6) { this.noted06 = 'Y'; }
              else if (parseInt((this.id_order)) == 7) { this.noted07 = 'Y'; }
              else if (parseInt((this.id_order)) == 8) { this.noted08 = 'Y'; }
              else if (parseInt((this.id_order)) == 9) { this.noted09 = 'Y'; }
              else if (parseInt((this.id_order)) == 10) { this.noted10 = 'Y'; }
              else if (parseInt((this.id_order)) == 11) { this.noted11 = 'Y'; }
              else if (parseInt((this.id_order)) == 12) { this.noted12 = 'Y'; }
              else if (parseInt((this.id_order)) == 13) { this.noted13 = 'Y'; }
              else if (parseInt((this.id_order)) == 14) { this.noted14 = 'Y'; }
              else if (parseInt((this.id_order)) == 15) { this.noted15 = 'Y'; }
              else if (parseInt((this.id_order)) == 16) { this.noted16 = 'Y'; }
              else if (parseInt((this.id_order)) == 17) { this.noted17 = 'Y'; }
              else if (parseInt((this.id_order)) == 18) { this.noted18 = 'Y'; }
              else if (parseInt((this.id_order)) == 19) { this.noted19 = 'Y'; }
              else if (parseInt((this.id_order)) == 20) { this.noted10 = 'Y'; }
              else if (parseInt((this.id_order)) == 21) { this.noted21 = 'Y'; }
              else if (parseInt((this.id_order)) == 22) { this.noted22 = 'Y'; }
              else if (parseInt((this.id_order)) == 23) { this.noted23 = 'Y'; }
              else if (parseInt((this.id_order)) == 24) { this.noted24 = 'Y'; }
              else if (parseInt((this.id_order)) == 25) { this.noted25 = 'Y'; }
              else if (parseInt((this.id_order)) == 26) { this.noted26 = 'Y'; }
              else if (parseInt((this.id_order)) == 27) { this.noted27 = 'Y'; }
              else if (parseInt((this.id_order)) == 28) { this.noted28 = 'Y'; }
              else if (parseInt((this.id_order)) == 29) { this.noted29 = 'Y'; }
              else if (parseInt((this.id_order)) == 30) { this.noted30 = 'Y'; }

              if (parseInt((this.id_order)) == 1) { this.note_menu01 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 2) { this.note_menu02 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 3) { this.note_menu03 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 4) { this.note_menu04 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 5) { this.note_menu05 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 6) { this.note_menu06 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 7) { this.note_menu07 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 8) { this.note_menu08 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 9) { this.note_menu09 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 10) { this.note_menu10 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 11) { this.note_menu11 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 12) { this.note_menu12 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 13) { this.note_menu13 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 14) { this.note_menu14 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 15) { this.note_menu15 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 16) { this.note_menu16 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 17) { this.note_menu17 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 18) { this.note_menu18 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 19) { this.note_menu19 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 20) { this.note_menu20 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 21) { this.note_menu21 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 22) { this.note_menu22 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 23) { this.note_menu23 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 24) { this.note_menu24 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 25) { this.note_menu25 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 26) { this.note_menu26 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 27) { this.note_menu27 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 28) { this.note_menu28 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 29) { this.note_menu29 = data.notes_menu; }
              else if (parseInt((this.id_order)) == 30) { this.note_menu30 = data.notes_menu; }
            }

            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {

              if (this.new_order == 'Y') {
                this.menu_tambahan = 'T';
              } else {
                this.menu_tambahan = 'Y';
              }

              db.executeSql('UPDATE trans_order_detail SET Keterangan=? WHERE NoTrans=? AND NoUrut=? AND Tambahan=? ', [data.notes_menu, this.notrans, this.id_order, this.menu_tambahan])
                .then(res => {
                  console.log('berhasil edit transaksi detail notes ', data.notes_menu, this.notrans, this.id_order);
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

  weight(param, food) {
    this.id_order = parseInt(param);
    this.name_menu = food;
    const prompt = this.alertCtrl.create({
      title: 'Input Weight',
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
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            //console.log('Saved clicked');
            if (parseInt((this.id_order)) == 1) { this.weight01 = data.input_weight; }
            else if (parseInt((this.id_order)) == 2) { this.weight02 = data.input_weight; }
            else if (parseInt((this.id_order)) == 3) { this.weight03 = data.input_weight; }
            else if (parseInt((this.id_order)) == 4) { this.weight04 = data.input_weight; }
            else if (parseInt((this.id_order)) == 5) { this.weight05 = data.input_weight; }
            else if (parseInt((this.id_order)) == 6) { this.weight06 = data.input_weight; }
            else if (parseInt((this.id_order)) == 7) { this.weight07 = data.input_weight; }
            else if (parseInt((this.id_order)) == 8) { this.weight08 = data.input_weight; }
            else if (parseInt((this.id_order)) == 9) { this.weight09 = data.input_weight; }
            else if (parseInt((this.id_order)) == 10) { this.weight10 = data.input_weight; }
            else if (parseInt((this.id_order)) == 11) { this.weight11 = data.input_weight; }
            else if (parseInt((this.id_order)) == 12) { this.weight12 = data.input_weight; }
            else if (parseInt((this.id_order)) == 13) { this.weight13 = data.input_weight; }
            else if (parseInt((this.id_order)) == 14) { this.weight14 = data.input_weight; }
            else if (parseInt((this.id_order)) == 15) { this.weight15 = data.input_weight; }
            else if (parseInt((this.id_order)) == 16) { this.weight16 = data.input_weight; }
            else if (parseInt((this.id_order)) == 17) { this.weight17 = data.input_weight; }
            else if (parseInt((this.id_order)) == 18) { this.weight18 = data.input_weight; }
            else if (parseInt((this.id_order)) == 19) { this.weight19 = data.input_weight; }
            else if (parseInt((this.id_order)) == 20) { this.weight20 = data.input_weight; }
            else if (parseInt((this.id_order)) == 21) { this.weight21 = data.input_weight; }
            else if (parseInt((this.id_order)) == 22) { this.weight22 = data.input_weight; }
            else if (parseInt((this.id_order)) == 23) { this.weight23 = data.input_weight; }
            else if (parseInt((this.id_order)) == 24) { this.weight24 = data.input_weight; }
            else if (parseInt((this.id_order)) == 25) { this.weight25 = data.input_weight; }
            else if (parseInt((this.id_order)) == 26) { this.weight26 = data.input_weight; }
            else if (parseInt((this.id_order)) == 27) { this.weight27 = data.input_weight; }
            else if (parseInt((this.id_order)) == 28) { this.weight28 = data.input_weight; }
            else if (parseInt((this.id_order)) == 29) { this.weight29 = data.input_weight; }
            else if (parseInt((this.id_order)) == 30) { this.weight30 = data.input_weight; }

            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {
              if (this.new_order == 'Y') {
                this.menu_tambahan = 'T';
              } else {
                this.menu_tambahan = 'Y';
              }
              db.executeSql('UPDATE trans_order_detail SET Berat=? WHERE NoTrans=? AND NoUrut=? AND Tambahan=?', [data.input_weight, this.notrans, this.id_order, this.menu_tambahan])
                .then(res => {
                  console.log('berhasil edit transaksi detail weight ', data.input_weight, this.notrans, this.id_order);
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

  weightOrder(param, food) {
    this.id_order = param;
    this.name_menu = food;
    this.weight(this.id_order, this.name_menu);
  }

  deleteOrder(param, food) {
    this.id_order = param;
    this.name_menu = food;
    document.getElementById('myorder' + this.id_order).style.display = "none";

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      if (this.new_order == 'Y') {
        this.menu_tambahan = 'T';
      } else {
        this.menu_tambahan = 'Y';
      }

      db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=? AND NoUrut=? AND Tambahan=?', [this.notrans, this.id_order, this.menu_tambahan])
        .then(res => {
          console.log('berhasil delete transaksi detail weight ', this.notrans, this.id_order);

        })
        .catch(e => {
          console.log(e);
        });

      db.executeSql('DELETE FROM trans_order_detail WHERE PCode=?', [''])
        .then(res => {
        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
  }

  cloneItem(pcode, name, order_id) {

    console.log(pcode);

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM totalorder', [])
        .then(res => {

          var itemToClone = {
            'myOrder': ''
          };

          this.listOrder.push(itemToClone);
          this.sumItem = this.sumItem + 1;
          if (parseInt(order_id) == 1) {
            this.name_menu01 = name;
          } else if (parseInt(order_id) == 2) {
            this.name_menu02 = name;
          } else if (parseInt(order_id) == 3) {
            this.name_menu03 = name;
          } else if (parseInt(order_id) == 4) {
            this.name_menu04 = name;
          } else if (parseInt(order_id) == 5) {
            this.name_menu05 = name;
          } else if (parseInt(order_id) == 6) {
            this.name_menu06 = name;
          } else if (parseInt(order_id) == 7) {
            this.name_menu07 = name;
          } else if (parseInt(order_id) == 8) {
            this.name_menu08 = name;
          } else if (parseInt(order_id) == 9) {
            this.name_menu09 = name;
          } else if (parseInt(order_id) == 10) {
            this.name_menu10 = name;
          } else if (parseInt(order_id) == 11) {
            this.name_menu11 = name;
          } else if (parseInt(order_id) == 12) {
            this.name_menu12 = name;
          } else if (parseInt(order_id) == 13) {
            this.name_menu13 = name;
          } else if (parseInt(order_id) == 14) {
            this.name_menu14 = name;
          } else if (parseInt(order_id) == 15) {
            this.name_menu15 = name;
          } else if (parseInt(order_id) == 16) {
            this.name_menu16 = name;
          } else if (parseInt(order_id) == 17) {
            this.name_menu17 = name;
          } else if (parseInt(order_id) == 18) {
            this.name_menu18 = name;
          } else if (parseInt(order_id) == 19) {
            this.name_menu19 = name;
          } else if (parseInt(order_id) == 20) {
            this.name_menu20 = name;
          } else if (parseInt(order_id) == 21) {
            this.name_menu21 = name;
          } else if (parseInt(order_id) == 22) {
            this.name_menu22 = name;
          } else if (parseInt(order_id) == 23) {
            this.name_menu23 = name;
          } else if (parseInt(order_id) == 24) {
            this.name_menu24 = name;
          } else if (parseInt(order_id) == 25) {
            this.name_menu25 = name;
          } else if (parseInt(order_id) == 26) {
            this.name_menu26 = name;
          } else if (parseInt(order_id) == 27) {
            this.name_menu27 = name;
          } else if (parseInt(order_id) == 28) {
            this.name_menu28 = name;
          } else if (parseInt(order_id) == 29) {
            this.name_menu29 = name;
          } else if (parseInt(order_id) == 30) {
            this.name_menu30 = name;
          }

        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });

  }

  finish_order(): void {

    if (this.total_pax == '') {
      const confirm = this.alertCtrl.create({
        title: 'Danger!',
        message: 'Pax Or No.Sticker Is Empty.',
        buttons: [
          {
            text: 'No',
            handler: () => {
              //coding...
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.view_customer(this.total_pax, this.no_sticker, this.notrans)
            }
          }
        ]
      });
      confirm.present();
    } else if (this.no_sticker == '') {
      const confirm = this.alertCtrl.create({
        title: 'Danger!',
        message: 'Pax Or No.Sticker Is Empty.',
        buttons: [
          {
            text: 'No',
            handler: () => {
              //coding...
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.view_customer(this.total_pax, this.no_sticker, this.notrans)
            }
          }
        ]
      });
      confirm.present();
    } else {

      const confirm = this.alertCtrl.create({
        title: 'Finish Order',
        message: 'Are you sure order finish?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              //coding...
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.sendingData();
            }
          }
        ]
      });
      confirm.present();

    }
  }

  sendingData() {

    const loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT ip_api FROM setting', [])
        .then(res => {
          this.ip_api = res.rows.item(0).ip_api;
          db.executeSql('SELECT * FROM trans_order_header WHERE NoTrans=?', [this.notrans])
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

              //di bundle jadi satu JSon
              this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {
                if (data.success) {
                  db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [this.notrans])
                    .then(has => {
                      this.detail_order = [];
                      for (var i = 0; i < has.rows.length; i++) {

                        var print;
                        if (i + 1 == has.rows.length) {
                          print = "Y";
                        } else {
                          print = "N";
                        }

                        this.detail_order.push(
                          {
                            NoTrans: data.no_order,
                            NoUrut: has.rows.item(i).NoUrut,
                            NoKassa: has.rows.item(i).NoKassa,
                            Tanggal: this.DateWatch(has.rows.item(i).Tanggal),
                            Waktu: this.TimeWatch(has.rows.item(i).Waktu),
                            Kasir: has.rows.item(i).Kasir,
                            KdStore: has.rows.item(i).KdStore,
                            PCode: has.rows.item(i).PCode,
                            Name: has.rows.item(i).Name,
                            Qty: has.rows.item(i).Qty,
                            Berat: has.rows.item(i).Berat,
                            Satuan: has.rows.item(i).Satuan,
                            Keterangan: has.rows.item(i).Keterangan,
                            Note_split: has.rows.item(i).Note_split,
                            Status: has.rows.item(i).Status,
                            KdPersonal: has.rows.item(i).KdPersonal,
                            KdMeja: res.rows.item(0).KdMeja,
                            KdContact: has.rows.item(i).KdContact,
                            MenuBaru: has.rows.item(i).MenuBaru,
                            Tambahan: has.rows.item(i).Tambahan,
                            cetak: print
                          });

                      }

                      let body = {
                        data_order: this.detail_order,
                        action: 'insertDetail'
                      };

                      this.postPvdr.postData(this.ip_api, body, 'Insert').subscribe((data) => {

                        if (data.success) {
                          //coding...
                        } else {
                          //coding...
                        }
                      });

                    }).catch(e => console.log(e));

                } else {
                  //coding...
                }
              }, error => {

                loader.dismiss();
                const toast = this.toastCtrl.create({
                  message: 'Lost Connection. This Order uses local storage.',
                  position: 'top',
                  showCloseButton: true,
                  closeButtonText: 'Ok'
                });
                toast.present();

                db.executeSql('UPDATE trans_order_header SET Status=? WHERE  NoTrans=?', ['3', this.notrans])
                  .then(res => {
                    //coding...
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

    loader.dismiss();
    this.navCtrl.setRoot(HomePage);

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
