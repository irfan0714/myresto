import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, ToastController, AlertController, NavParams, ViewController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  api_server: any;
  ip_device: any;
  set_timer: any;
  refresh_page_limit: any;
  last_date_synchronize: any;
  resto: any;
  regist_status: any;
  ip_api: any;

  developer_access = 'N';
  public press: number = 0;

  today = new Date();
  date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
  time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
  nows = this.date + ' ' + this.time;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider,
    private sqlite: SQLite,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('SELECT * FROM setting', [])
        .then(res => {
          console.log(res);
          if (res.rows.item(0).ip_api != '') {
            this.ip_api = res.rows.item(0).ip_api;
          }
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  ionViewDidLoad() {
    this.getSetting();
  }

  getSetting() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM setting', [])
        .then(res => {

          this.api_server = res.rows.item(0).ip_api;
          if (res.rows.item(0).regist_status == "N") {
            this.regist_status = "Is Not Regited";
          } else {
            this.regist_status = "Is Regited";
          }

          this.ip_device = res.rows.item(0).ip_devices;
          this.set_timer = parseInt(res.rows.item(0).set_timer) / 1000;
          this.refresh_page_limit = res.rows.item(0).refresh_timer;
          this.last_date_synchronize = res.rows.item(0).dateUpdate;
          this.resto = res.rows.item(0).nameresto;
        })
        .catch(e => {
          console.log(e);
        });
    }).catch(e => console.log(e));
  }

  apiserver() {
    this.settingIpApi();
  }

  settingIpApi() {
    const prompt = this.alertCtrl.create({
      title: 'API Server',
      message: "Please, Enter IP API Server",
      inputs: [
        {
          name: 'ip',
          type: 'text',
          placeholder: '127.0.0.1'
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

            this.sqlite.create({
              name: 'resto.db',
              location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('UPDATE setting SET ip_api=?', [data.ip])
                .then(res => {

                  //ip api
                  this.ip_api = data.ip;

                  let loading = this.loadingCtrl.create({
                    content: "try to ping the server ..."
                  })
                  loading.present();

                  //ping to API
                  let body = {
                    action: 'ping'
                  };

                  //ping process
                  this.postPvdr.postData(data.ip, body, 'Ping').subscribe((data) => {

                    if (data.success) {

                      for (var y = 0; y < data.result.length; y++) {
                        var kdstore = data.result[y]['KodeStore'];
                        var nmstore = data.result[y]['NamaStore'];

                        //insert resto
                        db.executeSql('INSERT INTO store (kodestore,namastore) VALUES (?,?)', [kdstore, nmstore])
                          .then(res => {
                            //comment
                          })
                          .catch(e => {
                            console.log(e);
                          });

                      }

                      //save IP Devices and status registed in this setting
                      db.executeSql('UPDATE setting SET ip_devices=?,regist_status=?', [data.ip, data.statusRegisted])
                        .then(res => {
                          //hide loading
                          loading.dismiss();
                          this.synchronizeNow();
                        })
                        .catch(e => {
                          console.log(e);
                        });

                    } else {
                      const alert = this.alertCtrl.create({
                        title: 'Failed',
                        subTitle: 'Failed ping to server',
                        buttons: ['OK']
                      });
                      alert.present();
                      loading.dismiss();
                    }
                  }, error => {

                    loading.dismiss();
                    const toast = this.toastCtrl.create({
                      message: 'Taking too much time for response. Please check your connection or try again.',
                      position: 'top',
                      showCloseButton: true,
                      closeButtonText: 'Ok'
                    });
                    toast.present();

                    return;
                  });
                  //end ping to API

                })
                .catch(e => {
                  console.log(e);
                });

            }).catch(e => console.log(e));

          }
        }
      ]
    });
    prompt.present();
  }

  synchronizeNow() {
    //before synchronize choose resto
    this.getResto();
  }

  getResto() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('DELETE FROM trans_order_header WHERE Tanggal<>?', [this.date])
        .then(val => {

          db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal<>?', [this.date])
            .then(key => {

              db.executeSql('SELECT * FROM store', [])
                .then(respon => {
                  this.resto = [];

                  if (respon.rows.item(0).namastore == '') {
                    db.executeSql('SELECT * FROM store', [])
                      .then(res => {
                        this.resto = [];
                        for (let i = 0; i < res.rows.length; i++) {

                          this.resto.push(
                            {
                              type: 'radio',
                              label: res.rows.item(i).namastore,
                              value: res.rows.item(i).kodestore + '#' + res.rows.item(i).namastore,
                              name: 'resto'
                            });
                        }

                        let alert = this.alertCtrl.create({
                          title: 'Choose Resto',
                          inputs: this.resto,
                          buttons: [
                            {
                              text: 'Cancel',
                              role: 'cancel',
                              handler: data => {
                                console.log('Cancel clicked');
                              }
                            },
                            {
                              text: 'OK',
                              handler: (data: string) => {
                                //console.log('OK clicked: ', data);
                                var res = data.split("#");
                                var kdresto;
                                var nmresto;

                                kdresto = res[0];
                                nmresto = res[1];

                                //the first update resto in setting
                                db.executeSql('UPDATE setting SET idresto=?, nameresto=?', [kdresto, nmresto])
                                  .then(res => {
                                    //processing sync data from server
                                    this.syncData(kdresto);
                                  })
                                  .catch(e => {
                                    console.log(e);
                                  });

                              }
                            }
                          ]
                        });
                        alert.present();


                      })
                      .catch(e => {
                        console.log(e);
                      });

                  } else {
                    this.syncData(respon.rows.item(0).idresto);
                  }

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


    }).catch(e => console.log(e));
  }

  syncData(kdresto) {

    let loading = this.loadingCtrl.create({
      content: "synchronize proccess ..."
    })
    loading.present();

    //ping to API
    let body = {
      kdresto: kdresto,
      action: 'sync'
    };

    //sync process
    this.postPvdr.postData(this.ip_api, body, 'Ping').subscribe((data) => {
      console.log(data);
      loading.dismiss();
      if (data.success) {

        this.sqlite.create({
          name: 'resto.db',
          location: 'default'
        }).then((db: SQLiteObject) => {

          //tables
          db.executeSql('DELETE FROM table_location', [])
            .then(res => {
              //insert to sqlite
              for (var j = 0; j < data.meja.length; j++) {

                var KdLokasi = data.meja[j]['KdLokasi'];
                var KdTipeLokasi = data.meja[j]['KdTipeLokasi'];

                //insert menu
                db.executeSql('INSERT INTO table_location (table_id, table_name,type_location, table_color,type_isEmpty, AddDate) VALUES (?,?,?,?,?,?)', [KdLokasi, KdLokasi, KdTipeLokasi, 'light2', '0', ''])
                  .then(res => {
                    //comment
                  })
                  .catch(e => {
                    console.log(e);
                  });

              }
            })
            .catch(e => {
              console.log(e);
            });


          //menus
          db.executeSql('DELETE FROM menu', [])
            .then(res => {
              //insert to sqlite
              for (var y = 0; y < data.menu.length; y++) {

                var PCode = data.menu[y]['PCode'];
                var NamaLengkap = data.menu[y]['NamaLengkap'];
                var Price = data.menu[y]['Harga'];
                var GroupMenu = data.menu[y]['GroupMenu'];
                var KdGroupBarang = data.menu[y]['KdGroupBarang'];

                //insert menu
                db.executeSql('INSERT INTO menu (pcode, name , price, menucollection, typefood) VALUES (?,?,?,?,?)', [PCode, NamaLengkap, Price, GroupMenu, KdGroupBarang])
                  .then(res => {
                    //comment
                  })
                  .catch(e => {
                    console.log(e);
                  });

              }
            })
            .catch(e => {
              console.log(e);
            });

          //kurs
          db.executeSql('DELETE FROM kurs', [])
            .then(res => {
              //insert to sqlite
              for (var p = 0; p < data.kurs.length; p++) {

                var RMB = data.kurs[p]['RMB'];
                var USD = data.kurs[p]['USD'];

                //insert kurs
                db.executeSql('INSERT INTO kurs (RMB,USD) VALUES (?,?)', [RMB, USD])
                  .then(res => {
                    //comment
                  })
                  .catch(e => {
                    console.log(e);
                  });

              }
            })
            .catch(e => {
              console.log(e);
            });



          //user
          db.executeSql('DELETE FROM user', [])
            .then(res => {
              //insert to sqlite
              for (var x = 0; x < data.user.length; x++) {

                var Id = data.user[x]['Id'];
                var UserName = data.user[x]['UserName'];
                var Password = data.user[x]['Password'];
                var otorisasi = data.user[x]['otorisasi'];

                //insert user
                db.executeSql('INSERT INTO user (id , name , password , authorization) VALUES (?,?,?,?)', [Id, UserName, Password, otorisasi])
                  .then(res => {
                    //comment
                  })
                  .catch(e => {
                    console.log(e);
                  });

              }
            })
            .catch(e => {
              console.log(e);
            });


          //update date sycn
          db.executeSql('UPDATE setting SET statusUpdate=?, dateUpdate=?, slider_opening=?', ['Y', this.nows, 'N'])
            .then(res => {
              //comment
            })
            .catch(e => {
              console.log(e);
            });

          const alert = this.alertCtrl.create({
            title: 'Successfully',
            subTitle: 'Success synchronize data from server.',
            buttons: ['OK']
          });
          alert.present();

        }).catch(e => console.log(e));

      }
    }, error => {

      loading.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Opps Sorry, Make sure it is connected with local wifi or Make sure Server Is Not Down. Please Try Again...',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

      return;
    });
    //end ping to API

  }

  clearlocal() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('DELETE FROM trans_order_header WHERE Tanggal=?', [this.date])
        .then(val => {

          db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal=?', [this.date])
            .then(key => {

              const toast = this.toastCtrl.create({
                message: 'Clear successfully',
                position: 'top',
                duration: 3000
              });
              toast.present();

            })
            .catch(e => {
              console.log(e);
            });

        })
        .catch(e => {
          console.log(e);
        });


    }).catch(e => console.log(e));
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


  developer_option(e) {

    var a = this.press++;

    if (a == 3) {
      const prompt = this.alertCtrl.create({
        title: 'Developer Access',
        message: "Enter Your PIN Access Developer",
        inputs: [
          {
            name: 'developerid',
            type: 'number',
            placeholder: 'ID Developer'
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
            text: 'Access',
            handler: data => {
              if (data.developerid == '120187') {
                this.developer_access = "Y";
              } else {
                const toast = this.toastCtrl.create({
                  message: 'Opps Sorry, you do not have access.',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              }
            }
          }
        ]
      });
      prompt.present();

    }
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
