import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-split-bill-details',
  templateUrl: 'split-bill-details.html',
})
export class SplitBillDetailsPage {

  split: any;
  menus: any;
  Order_Asli: any;

  table: any;
  table_split: any;
  table_split_sending: any;
  num_split: any;
  waiter: any;
  guest: any;
  sticker: any;
  splitdetail: any;
  ip_api: any;
  listing_menu: any;
  checking_listing_menu: any;
  detail_order: any;

  Localside = 'N';
  tablesLocalSide: any;

  value_tambah: number = 0;
  value_kurang: number = 0;
  val_kirim: number = 0;

  open_menu = 'Y';
  close_menu = 'N';
  checking_list_menu = 'N';
  notrans: any;

  today = new Date();
  date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
  time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
  nows = this.date + ' ' + this.time;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toastCtrl: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider) {
    this.getCurrentData(navParams.get("table"), navParams.get("num_split"), navParams.get("waiters"), navParams.get("guest"), navParams.get("no_sticker"));
    this.new_order();
    this.loadserver();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplitBillDetailPage');
  }

  getCurrentData(table, num_split, waiters, pax, sticker) {
    this.table = table;
    this.num_split = num_split;
    this.waiter = waiters;
    this.guest = pax;
    this.sticker = sticker;
  }

  new_order(): void {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      for (let i = 0; i < parseInt(this.num_split); i++) {
        var abjad = this.getAbjad(i);
        this.table_split = this.table + '' + abjad;
        this.notrans = '99' + i + '' + this.today.getFullYear() + '' + this.benarMonth(this.today.getMonth() + 1) + '' + this.benarDate(this.today.getDate()) + '' + this.benarHours(this.today.getHours()) + '' + this.benarMinutes(this.today.getMinutes()) + '' + this.benarSecond(this.today.getSeconds());
        this.datanya(this.table_split, this.notrans)
      }

    }).catch(e => {
      console.log(e);
    });
  }

  datanya(tablez, notranz) {
    this.splitdetail = [];
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      //delete header
      db.executeSql('DELETE FROM trans_order_header WHERE Tanggal=? AND KdMeja=?', [this.date, tablez])
        .then(res1 => {
          console.log('delete trans_order_header', tablez);
          //delete detail
          db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal=? AND KdMeja=?', [this.date, tablez])
            .then(res2 => {
              console.log('delete trans_order_detail', tablez);

              //get next insert
              db.executeSql('INSERT INTO trans_order_header (NoTrans,Tanggal,Waktu,Kasir,KdMeja, Status, TotalGuest, KdAgent) VALUES(?,?,?,?,?,?,?,?)', [notranz, this.date, this.TimeWatch(this.time), this.waiter, tablez, '0', this.guest, this.sticker])
                .then(res3 => {
                  console.log('sukses new table', notranz, tablez, this.waiter)

                  this.splitdetail.push(
                    {
                      table_id: tablez,
                      order_id: notranz
                    });

                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });

        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
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
            this.getMenu(this.ip_api, this.table)
          }

        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  getAbjad(a) {
    var hrf;
    if (a == 0) {
      hrf = "a";
    } else if (a == 1) {
      hrf = "b";
    } else if (a == 2) {
      hrf = "c";
    } else if (a == 3) {
      hrf = "d";
    } else if (a == 4) {
      hrf = "e";
    } else if (a == 5) {
      hrf = "f";
    } else if (a == 6) {
      hrf = "g";
    } else if (a == 7) {
      hrf = "h";
    } else if (a == 8) {
      hrf = "i";
    } else if (a == 9) {
      hrf = "j";
    }

    return hrf;
  }

  getMenu(ip_api, no_table) {

    const loader = this.loadingCtrl.create({
      content: "Please Waiting ..."
    });
    loader.present();

    //start sending to API
    let body = {
      table: no_table,
      action: 'getListOrderDetailForSplitTry'
    };

    this.postPvdr.postData(ip_api, body, 'Read').subscribe((data) => {

      if (data.success) {

        this.sqlite.create({
          name: 'resto.db',
          location: 'default'
        }).then((db: SQLiteObject) => {

          db.executeSql('DELETE FROM trans_order_header WHERE Tanggal=? AND Status=? AND KdMeja=?', [this.date, '0', no_table])
            .then(res => {
              db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal=? AND KdMeja=?', [this.date, no_table])
                .then(res => {
                  loader.dismiss();
                  this.storage.set('table_trans_header_storage', data.dataListOrderHeader);
                  this.storage.set('table_trans_detail_storage', data.dataListOrderDetail);
                  this.storage.get('table_trans_header_storage').then((rez) => {
                    for (let i = 0; i < rez.length; i++) {
                      db.executeSql('INSERT INTO trans_order_header (NoTrans,NoKassa,Tanggal,Waktu,Kasir,TotalItem,TotalQty,TotalServe,Status,KdMeja,TotalGuest,KdAgent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [rez[i]['NoTrans'], rez[i]['NoKassa'], rez[i]['Tanggal'], rez[i]['Waktu'], rez[i]['Kasir'], rez[i]['TotalItem'], rez[i]['TotalQty'], rez[i]['TotalServe'], rez[i]['Status'], rez[i]['KdMeja'], rez[i]['TotalGuest'], rez[i]['KdAgent']])
                        .then(rex => {
                          if (i + 1 == rez.length) {
                            this.Order_Asli = rez[i]['NoTrans'];
                            this.storage.get('table_trans_detail_storage').then((val) => {
                              for (let j = 0; j < val.length; j++) {
                                db.executeSql('INSERT INTO trans_order_detail (NoTrans,NoUrut,NoKassa,Tanggal,Waktu,Kasir,PCode,Name,Qty,Berat,Keterangan,Status,KdMeja,MenuBaru,Tambahan,QtyCheckSplit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [val[j]['NoTrans'], val[j]['NoUrut'], val[j]['NoKassa'], val[j]['Tanggal'], val[j]['Waktu'], val[j]['Kasir'], val[j]['PCode'], val[j]['NamaLengkap'], val[j]['Qty'], val[j]['Berat'], val[j]['Keterangan'], val[j]['Status'], val[j]['KdMeja'], val[j]['MenuBaru'], val[j]['Tambahan'], '0'])
                                  .then(rek => {
                                    if (j + 1 == val.length) {
                                      db.executeSql('SELECT * FROM trans_order_detail WHERE Tanggal=? AND KdMeja=?', [this.date, no_table])
                                        .then(keys => {
                                          this.listing_menu = [];
                                          this.checking_listing_menu = [];

                                          for (var x = 0; x < keys.rows.length; x++) {
                                            this.listing_menu.push(
                                              {
                                                Nm: keys.rows.item(x).Name,
                                                PCode: keys.rows.item(x).PCode,
                                                Sts: keys.rows.item(x).Status,
                                                Quty: 0,
                                                Wght: keys.rows.item(x).Berat,
                                                Nt: keys.rows.item(x).Keterangan
                                              })
                                          }

                                          for (var y = 0; y < keys.rows.length; y++) {
                                            this.checking_listing_menu.push(
                                              {
                                                name: keys.rows.item(y).Name,
                                                quantity: keys.rows.item(y).Qty
                                              })
                                          }
                                        }).catch(e => console.log(e));
                                    }
                                  }).catch(e => console.log(e));
                              }
                            });
                          }
                        }).catch(e => console.log(e));
                    }
                  });
                }).catch(e => console.log(e));
            }).catch(e => console.log(e));

        }).catch(e => {
          console.log(e);
        });

      } else {
        loader.dismiss();

      }
    });

  }

  open(table, i) {
    var gab = table + '' + i;
    document.getElementById(gab).style.display = "";
    document.getElementById('open' + gab).style.display = "none";
    document.getElementById('close' + gab).style.display = "";
  }

  close(table, i) {
    var gab = table + '' + i;
    document.getElementById(gab).style.display = "none";
    document.getElementById('open' + gab).style.display = "";
    document.getElementById('close' + gab).style.display = "none";
  }

  btn_menu_open() {
    this.open_menu = 'N';
    this.close_menu = 'Y';
    this.checking_list_menu = 'Y';
  }

  btn_menu_close() {
    this.open_menu = 'Y';
    this.close_menu = 'N';
    this.checking_list_menu = 'N';
  }

  tambah(id, table, pcode, table_asal, trans, names) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [this.date, table_asal, pcode])
        .then(res => {

          console.log('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal =', this.date, ' AND KdMeja =', table_asal, ' AND PCode =', pcode, ' GROUP BY PCode');
          console.log('QtySplit', res.rows.item(0).QtyCheckSplit);
          console.log('Qty', res.rows.item(0).Qty);
          if (parseInt(res.rows.item(0).QtyCheckSplit) == parseInt(res.rows.item(0).Qty)) {

            const toast = this.toastCtrl.create({
              message: 'Opps Sorry... Quantity exceeds order.',
              position: 'top',
              showCloseButton: true,
              closeButtonText: 'Ok'
            });
            toast.present();

          } else {

            var gab = 'det_' + table + '' + id;
            let a: number = parseFloat((document.getElementById(gab) as HTMLInputElement).innerHTML);
            this.value_tambah = a + 1;
            document.getElementById(gab).innerHTML = this.value_tambah + '';
            //find QtyCekSplit SQLite
            db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [this.date, table_asal, pcode])
              .then(reis => {
                console.log('QtySplit New', reis.rows.item(0).QtyCheckSplit);
                var AddQtySplit = parseInt(reis.rows.item(0).QtyCheckSplit) + 1;
                //next update QtyCheckSplit
                db.executeSql('UPDATE trans_order_detail SET QtyCheckSplit=? WHERE Tanggal=? AND KdMeja=? AND PCode=?', [AddQtySplit, this.date, table_asal, pcode])
                  .then(vals => {
                    console.log('sukses ', AddQtySplit);

                    //the first ckeck is empty
                    db.executeSql('SELECT * FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=?', [this.date, table, pcode])
                      .then(ress => {

                        console.log('SELECT * FROM trans_order_detail WHERE Tanggal=', this.date, ' AND KdMeja=', table, 'AND PCode=', pcode);
                        if (ress.rows.length > 0) {
                          //update to new table
                          db.executeSql('UPDATE trans_order_detail SET Qty=? WHERE NoTrans=? AND PCode=?', [trans, this.value_tambah])
                            .then(resy => {
                              //console.log(res);
                              console.log('berhasil update transaksi detail ');
                            })
                            .catch(e => {
                              console.log(e);
                            });
                        } else {
                          //insert to new table
                          db.executeSql('INSERT INTO trans_order_detail (NoTrans,NoUrut,Tanggal,Waktu,Kasir,PCode,Name,Qty,Status,KdMeja,KdContact,MenuBaru,Tambahan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [trans, id, this.date, this.time, this.waiter, pcode, names, this.value_tambah, '1', table, this.Order_Asli, '0', 'T'])
                            .then(resx => {
                              //console.log(res);
                              console.log('berhasil insert transaksi detail ');
                            })
                            .catch(e => {
                              console.log(e);
                            });
                        }
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  }).catch(e => console.log(e));
              }).catch(e => console.log(e));
          }
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });

  }

  kurang(id, table, pcode, table_asal) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [this.date, table_asal, pcode])
        .then(res => {

          console.log('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal =', this.date, ' AND KdMeja =', table_asal, ' AND PCode =', pcode, ' GROUP BY PCode');
          console.log('QtySplit', res.rows.item(0).QtyCheckSplit);
          console.log('Qty', res.rows.item(0).Qty);
          if (parseInt(res.rows.item(0).QtyCheckSplit) == 0) {

            const toast = this.toastCtrl.create({
              message: 'Opps Sorry... Quantity less than zero.',
              position: 'top',
              showCloseButton: true,
              closeButtonText: 'Ok',
            });

            toast.onDidDismiss((data, role) => {
              if (role == 'close') {
                const toast = this.toastCtrl.create({
                  message: 'Thank You...',
                  position: 'top',
                  duration: 3000
                });
                toast.present();
              }
            });

            toast.present();

          } else {

            var gab = 'det_' + table + '' + id;
            let a: number = parseFloat((document.getElementById(gab) as HTMLInputElement).innerHTML);
            this.value_kurang = a - 1;
            document.getElementById(gab).innerHTML = this.value_kurang + '';

            db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [this.date, table_asal, pcode])
              .then(reis => {
                var MinusQtySplit = parseInt(reis.rows.item(0).QtyCheckSplit) - 1;
                db.executeSql('UPDATE trans_order_detail SET QtyCheckSplit=? WHERE Tanggal=? AND KdMeja=? AND PCode=?', [MinusQtySplit, this.date, table_asal, pcode])
                  .then(vals => {
                    //comment 
                  }).catch(e => console.log(e));
              }).catch(e => console.log(e));



          }
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });

  }

  remove_split(order_temp, tbl, i) {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM trans_order_detail WHERE NoTrans=?', [order_temp])
        .then(res => {
          if (res.rows.length > 0) {

            for (let i = 0; i < res.rows.length; i++) {
              var Qty_Split, p_code;
              p_code = res.rows.item(i).PCode;
              Qty_Split = parseInt(res.rows.item(i).Qty);
              db.executeSql('SELECT * FROM trans_order_detail WHERE NoTrans=? AND Tanggal=? AND KdMeja=? AND PCode=?', [this.Order_Asli, this.date, this.table, p_code])
                .then(resk => {
                  if (resk.rows.length > 0) {
                    var Qty_Split_a;
                    Qty_Split_a = parseInt(resk.rows.item(0).QtyCheckSplit);

                    db.executeSql('UPDATE trans_order_detail SET QtyCheckSplit=? WHERE NoTrans=? AND Tanggal=? AND KdMeja=? AND PCode=?', [Qty_Split_a - Qty_Split, this.Order_Asli, this.date, this.table, p_code])
                      .then(rest => {

                        if (i + 1 == res.rows.length) {
                          db.executeSql('DELETE FROM trans_order_header WHERE NoTrans=?', [order_temp])
                            .then(rese => {

                              db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                                .then(resi => {

                                  const toast = this.toastCtrl.create({
                                    message: 'Delete successfully',
                                    position: 'top',
                                    duration: 3000
                                  });
                                  toast.present();

                                  document.getElementById(order_temp).style.display = "none";
                                  document.getElementById(tbl + '' + i).style.display = "none";

                                })
                                .catch(e => {
                                  console.log(e);
                                });
                            })
                            .catch(e => {
                              console.log(e);
                            });
                        }
                      })
                      .catch(e => {
                        console.log(e);
                      });

                  } else {
                    db.executeSql('DELETE FROM trans_order_header WHERE NoTrans=?', [order_temp])
                      .then(rese => {

                        db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                          .then(resi => {

                            const toast = this.toastCtrl.create({
                              message: 'Delete successfully',
                              position: 'top',
                              duration: 3000
                            });
                            toast.present();

                            document.getElementById(order_temp).style.display = "none";
                            document.getElementById(tbl + '' + i).style.display = "none";
                          })
                          .catch(e => {
                            console.log(e);
                          });
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  }
                })
                .catch(e => {
                  console.log(e);
                });
            }

          } else {
            db.executeSql('DELETE FROM trans_order_header WHERE NoTrans=?', [order_temp])
              .then(rese => {

                db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                  .then(resi => {

                    const toast = this.toastCtrl.create({
                      message: 'Delete successfully',
                      position: 'top',
                      duration: 3000
                    });
                    toast.present();

                    document.getElementById(order_temp).style.display = "none";
                    document.getElementById(tbl + '' + i).style.display = "none";
                  })
                  .catch(e => {
                    console.log(e);
                  });
              })
              .catch(e => {
                console.log(e);
              });
          }

        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
  }

  sendingData() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM trans_order_detail WHERE NoTrans=?', [this.Order_Asli])
        .then(res => {
          this.val_kirim = 0;
          for (let i = 0; i < res.rows.length; i++) {
            var QtyRujukan = parseInt(res.rows.item(i).Qty);
            var QtySplitRujukan = parseInt(res.rows.item(i).QtyCheckSplit);
            var NameRujukan = res.rows.item(i).Name;
            if (QtyRujukan != QtySplitRujukan) {

              const toast = this.toastCtrl.create({
                message: 'Opps Sorry, ' + NameRujukan + ' Not Valid. still not enough.',
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Ok',
              });

              toast.onDidDismiss((data, role) => {
                if (role == 'close') {
                  const toast = this.toastCtrl.create({
                    message: 'Thank You...',
                    position: 'top',
                    duration: 3000
                  });
                  toast.present();
                }
              });

              toast.present();
              this.val_kirim--;
            } else {
              this.val_kirim++;
            }
          }

          if (this.val_kirim == res.rows.length) {
            console.log('kirim cuys...');
            for (let i = 0; i < parseInt(this.num_split); i++) {
              var abjad = this.getAbjad(i);
              this.table_split_sending = this.table + '' + abjad;
              db.executeSql('SELECT * FROM trans_order_header WHERE Tanggal=? AND KdMeja=? AND TotalGuest=? AND KdAgent=?', [this.date, this.table_split_sending, this.guest, this.sticker])
                .then(resf => {
                  this.sendingDataKeServer(resf.rows.item(0).NoTrans, i)
                }).catch(e => {
                  console.log(e);
                });
            }
          } else {
            console.log('gagal kirim cuys...');
          }


        }).catch(e => {
          console.log(e);
        });

    }).catch(e => {
      console.log(e);
    });
  }

  sendingDataKeServer(no_order_temp, ke) {

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

                  db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [no_order_temp])
                    .then(res => {
                      this.detail_order = [];
                      for (var i = 0; i < res.rows.length; i++) {

                        var print;
                        if (i + 1 == res.rows.length) {
                          print = "Y";
                          loader.dismiss();
                          this.navCtrl.setRoot(HomePage);
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
                              NoTransSemula: this.Order_Asli,
                              action: 'voidReferensOrderSplit'
                            };

                            //sending process
                            this.postPvdr.postData(this.ip_api, body, 'Update').subscribe((datax) => {
                              if (datax.success) {
                                console.log('Oke berhasil update split order yang asli')
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
                    if (ke + 1 == parseInt(this.num_split)) {
                      loader.dismiss();
                      this.navCtrl.push('SplitBillPage');
                    }

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
