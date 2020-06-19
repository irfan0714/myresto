import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {
  resto;
  ip_api: any;
  today = new Date();
  date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
  time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
  nows = this.date + ' ' + this.time;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toastCtrl: ToastController,
    private postPvdr: PostProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesPage');
  }

  slides = [
    {
      title: "Welcome to MyResto Apps!",
      description: "<b>MyResto Apps</b> is an android based application for taking order services in professional restaurants. Our motto is our best service is our satisfaction.",
      image: "assets/imgs/ica-slidebox-img-1.png",
      buttonIpApi: "N",
      buttonSynchronize: "N",
    },
    {
      title: "Setting IP API Server",
      description: "<b>MyResto Apps</b> needs to be connected with the Server API so that it can be used properly and smoothly. Make sure these devices are connected to your local wifi.",
      image: "assets/imgs/ica-slidebox-img-2.png",
      buttonIpApi: "Y",
      buttonSynchronize: "N",
    },
    {
      title: "Synchronize supporting data",
      description: "<b>MyResto Apps</b> needs supporting data to be used properly. such as data menus, user access and tables. Please Synchronize and make sure connect with your local wifi.",
      image: "assets/imgs/ica-slidebox-img-3.png",
      buttonIpApi: "N",
      buttonSynchronize: "Y",
    }
  ];

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
                  //ping server

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

                      const alert = this.alertCtrl.create({
                        title: 'Successfully',
                        subTitle: 'Success ping to server.' + data.registed,
                        buttons: ['OK']
                      });
                      alert.present();

                      //save IP Devices and status registed in this setting
                      db.executeSql('UPDATE setting SET ip_devices=?,regist_status=?', [data.ip, data.statusRegisted])
                        .then(res => {
                          //hide loading
                          loading.dismiss();
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
                      message: 'Opps Sorry, Make sure it is connected with local wifi or Make sure Server Is Not Down. Please Try Again...',
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
                      this.syncData();
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
    }).catch(e => console.log(e));
  }

  syncData() {

    let loading = this.loadingCtrl.create({
      content: "synchronize proccess ..."
    })
    loading.present();

    //ping to API
    let body = {
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

          //insert to sqlite
          for (var p = 0; p < data.kurs.length; p++) {

            var RMB = data.kurs[p]['RMB'];
            var USD = data.kurs[p]['USD'];

            //insert menu
            db.executeSql('INSERT INTO kurs (RMB, USD) VALUES (?,?)', [RMB, USD])
              .then(res => {
                //comment
              })
              .catch(e => {
                console.log(e);
              });

          }

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
        message: 'Opps Sorry,Please Try Again...',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();

      return;
    });
    //end ping to API

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

  homeScreen() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      db.executeSql('UPDATE setting SET slider_opening=?', ['N'])
        .then(res => {
          //comment
          this.navCtrl.setRoot(HomePage);
        })
        .catch(e => {
          console.log(e);
        });

    }).catch(e => console.log(e));

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
