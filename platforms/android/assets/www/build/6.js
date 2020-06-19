webpackJsonp([6],{

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingPageModule", function() { return SettingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting__ = __webpack_require__(701);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingPageModule = (function () {
    function SettingPageModule() {
    }
    SettingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__setting__["a" /* SettingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__setting__["a" /* SettingPage */]),
            ],
        })
    ], SettingPageModule);
    return SettingPageModule;
}());

//# sourceMappingURL=setting.module.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingPage = (function () {
    function SettingPage(toastCtrl, loadingCtrl, postPvdr, sqlite, alertCtrl, navCtrl, viewCtrl, navParams) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.developer_access = 'N';
        this.press = 0;
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
        this.time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
        this.nows = this.date + ' ' + this.time;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM setting', [])
                .then(function (res) {
                console.log(res);
                if (res.rows.item(0).ip_api != '') {
                    _this.ip_api = res.rows.item(0).ip_api;
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        this.getSetting();
    };
    SettingPage.prototype.getSetting = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM setting', [])
                .then(function (res) {
                _this.api_server = res.rows.item(0).ip_api;
                if (res.rows.item(0).regist_status == "N") {
                    _this.regist_status = "Is Not Regited";
                }
                else {
                    _this.regist_status = "Is Regited";
                }
                _this.ip_device = res.rows.item(0).ip_devices;
                _this.set_timer = parseInt(res.rows.item(0).set_timer) / 1000;
                _this.refresh_page_limit = res.rows.item(0).refresh_timer;
                _this.last_date_synchronize = res.rows.item(0).dateUpdate;
                _this.resto = res.rows.item(0).nameresto;
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) { return console.log(e); });
    };
    SettingPage.prototype.apiserver = function () {
        this.settingIpApi();
    };
    SettingPage.prototype.settingIpApi = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('UPDATE setting SET ip_api=?', [data.ip])
                                .then(function (res) {
                                //ip api
                                _this.ip_api = data.ip;
                                var loading = _this.loadingCtrl.create({
                                    content: "try to ping the server ..."
                                });
                                loading.present();
                                //ping to API
                                var body = {
                                    action: 'ping'
                                };
                                //ping process
                                _this.postPvdr.postData(data.ip, body, 'Ping').subscribe(function (data) {
                                    if (data.success) {
                                        for (var y = 0; y < data.result.length; y++) {
                                            var kdstore = data.result[y]['KodeStore'];
                                            var nmstore = data.result[y]['NamaStore'];
                                            //insert resto
                                            db.executeSql('INSERT INTO store (kodestore,namastore) VALUES (?,?)', [kdstore, nmstore])
                                                .then(function (res) {
                                                //comment
                                            })
                                                .catch(function (e) {
                                                console.log(e);
                                            });
                                        }
                                        //save IP Devices and status registed in this setting
                                        db.executeSql('UPDATE setting SET ip_devices=?,regist_status=?', [data.ip, data.statusRegisted])
                                            .then(function (res) {
                                            //hide loading
                                            loading.dismiss();
                                            _this.synchronizeNow();
                                        })
                                            .catch(function (e) {
                                            console.log(e);
                                        });
                                    }
                                    else {
                                        var alert_1 = _this.alertCtrl.create({
                                            title: 'Failed',
                                            subTitle: 'Failed ping to server',
                                            buttons: ['OK']
                                        });
                                        alert_1.present();
                                        loading.dismiss();
                                    }
                                }, function (error) {
                                    loading.dismiss();
                                    var toast = _this.toastCtrl.create({
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
                                .catch(function (e) {
                                console.log(e);
                            });
                        }).catch(function (e) { return console.log(e); });
                    }
                }
            ]
        });
        prompt.present();
    };
    SettingPage.prototype.synchronizeNow = function () {
        //before synchronize choose resto
        this.getResto();
    };
    SettingPage.prototype.getResto = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM trans_order_header WHERE Tanggal<>?', [_this.date])
                .then(function (val) {
                db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal<>?', [_this.date])
                    .then(function (key) {
                    db.executeSql('SELECT * FROM store', [])
                        .then(function (respon) {
                        _this.resto = [];
                        if (respon.rows.item(0).namastore == '') {
                            db.executeSql('SELECT * FROM store', [])
                                .then(function (res) {
                                _this.resto = [];
                                for (var i = 0; i < res.rows.length; i++) {
                                    _this.resto.push({
                                        type: 'radio',
                                        label: res.rows.item(i).namastore,
                                        value: res.rows.item(i).kodestore + '#' + res.rows.item(i).namastore,
                                        name: 'resto'
                                    });
                                }
                                var alert = _this.alertCtrl.create({
                                    title: 'Choose Resto',
                                    inputs: _this.resto,
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: function (data) {
                                                console.log('Cancel clicked');
                                            }
                                        },
                                        {
                                            text: 'OK',
                                            handler: function (data) {
                                                //console.log('OK clicked: ', data);
                                                var res = data.split("#");
                                                var kdresto;
                                                var nmresto;
                                                kdresto = res[0];
                                                nmresto = res[1];
                                                //the first update resto in setting
                                                db.executeSql('UPDATE setting SET idresto=?, nameresto=?', [kdresto, nmresto])
                                                    .then(function (res) {
                                                    //processing sync data from server
                                                    _this.syncData(kdresto);
                                                })
                                                    .catch(function (e) {
                                                    console.log(e);
                                                });
                                            }
                                        }
                                    ]
                                });
                                alert.present();
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }
                        else {
                            _this.syncData(respon.rows.item(0).idresto);
                        }
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                })
                    .catch(function (e) {
                    console.log(e);
                });
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) { return console.log(e); });
    };
    SettingPage.prototype.syncData = function (kdresto) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "synchronize proccess ..."
        });
        loading.present();
        //ping to API
        var body = {
            kdresto: kdresto,
            action: 'sync'
        };
        //sync process
        this.postPvdr.postData(this.ip_api, body, 'Ping').subscribe(function (data) {
            console.log(data);
            loading.dismiss();
            if (data.success) {
                _this.sqlite.create({
                    name: 'resto.db',
                    location: 'default'
                }).then(function (db) {
                    //tables
                    db.executeSql('DELETE FROM table_location', [])
                        .then(function (res) {
                        //insert to sqlite
                        for (var j = 0; j < data.meja.length; j++) {
                            var KdLokasi = data.meja[j]['KdLokasi'];
                            var KdTipeLokasi = data.meja[j]['KdTipeLokasi'];
                            //insert menu
                            db.executeSql('INSERT INTO table_location (table_id, table_name,type_location, table_color,type_isEmpty, AddDate) VALUES (?,?,?,?,?,?)', [KdLokasi, KdLokasi, KdTipeLokasi, 'light2', '0', ''])
                                .then(function (res) {
                                //comment
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                    //menus
                    db.executeSql('DELETE FROM menu', [])
                        .then(function (res) {
                        //insert to sqlite
                        for (var y = 0; y < data.menu.length; y++) {
                            var PCode = data.menu[y]['PCode'];
                            var NamaLengkap = data.menu[y]['NamaLengkap'];
                            var Price = data.menu[y]['Harga'];
                            var GroupMenu = data.menu[y]['GroupMenu'];
                            var KdGroupBarang = data.menu[y]['KdGroupBarang'];
                            //insert menu
                            db.executeSql('INSERT INTO menu (pcode, name , price, menucollection, typefood) VALUES (?,?,?,?,?)', [PCode, NamaLengkap, Price, GroupMenu, KdGroupBarang])
                                .then(function (res) {
                                //comment
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                    //kurs
                    db.executeSql('DELETE FROM kurs', [])
                        .then(function (res) {
                        //insert to sqlite
                        for (var p = 0; p < data.kurs.length; p++) {
                            var RMB = data.kurs[p]['RMB'];
                            var USD = data.kurs[p]['USD'];
                            //insert kurs
                            db.executeSql('INSERT INTO kurs (RMB,USD) VALUES (?,?)', [RMB, USD])
                                .then(function (res) {
                                //comment
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                    //user
                    db.executeSql('DELETE FROM user', [])
                        .then(function (res) {
                        //insert to sqlite
                        for (var x = 0; x < data.user.length; x++) {
                            var Id = data.user[x]['Id'];
                            var UserName = data.user[x]['UserName'];
                            var Password = data.user[x]['Password'];
                            var otorisasi = data.user[x]['otorisasi'];
                            //insert user
                            db.executeSql('INSERT INTO user (id , name , password , authorization) VALUES (?,?,?,?)', [Id, UserName, Password, otorisasi])
                                .then(function (res) {
                                //comment
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                    //update date sycn
                    db.executeSql('UPDATE setting SET statusUpdate=?, dateUpdate=?, slider_opening=?', ['Y', _this.nows, 'N'])
                        .then(function (res) {
                        //comment
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                    var alert = _this.alertCtrl.create({
                        title: 'Successfully',
                        subTitle: 'Success synchronize data from server.',
                        buttons: ['OK']
                    });
                    alert.present();
                }).catch(function (e) { return console.log(e); });
            }
        }, function (error) {
            loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Opps Sorry, Make sure it is connected with local wifi or Make sure Server Is Not Down. Please Try Again...',
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        });
        //end ping to API
    };
    SettingPage.prototype.clearlocal = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM trans_order_header WHERE Tanggal=?', [_this.date])
                .then(function (val) {
                db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal=?', [_this.date])
                    .then(function (key) {
                    var toast = _this.toastCtrl.create({
                        message: 'Clear successfully',
                        position: 'top',
                        duration: 3000
                    });
                    toast.present();
                })
                    .catch(function (e) {
                    console.log(e);
                });
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) { return console.log(e); });
    };
    SettingPage.prototype.TimeWatch = function (time) {
        var res = time.split(":");
        var jam;
        var menit;
        var detik;
        if (parseInt(res[0]) < 10) {
            jam = '0' + res[0];
        }
        else {
            jam = res[0];
        }
        if (parseInt(res[1]) < 10) {
            menit = '0' + res[1];
        }
        else {
            menit = res[1];
        }
        if (parseInt(res[2]) < 10) {
            detik = '0' + res[2];
        }
        else {
            detik = res[2];
        }
        var waktu = jam + ':' + menit + ':' + detik;
        return waktu;
    };
    SettingPage.prototype.DateWatch = function (dates) {
        var res = dates.split("-");
        var tahun;
        var bulan;
        var harian;
        tahun = res[0];
        if (parseInt(res[1]) < 10) {
            bulan = '0' + res[1];
        }
        else {
            bulan = res[1];
        }
        if (parseInt(res[2]) < 10) {
            harian = '0' + res[2];
        }
        else {
            harian = res[2];
        }
        var tanggal = tahun + '-' + bulan + '-' + harian;
        return tanggal;
    };
    SettingPage.prototype.developer_option = function (e) {
        var _this = this;
        var a = this.press++;
        if (a == 3) {
            var prompt_1 = this.alertCtrl.create({
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
                        handler: function (data) {
                            //console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Access',
                        handler: function (data) {
                            if (data.developerid == '120187') {
                                _this.developer_access = "Y";
                            }
                            else {
                                var toast = _this.toastCtrl.create({
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
            prompt_1.present();
        }
    };
    SettingPage.prototype.benarMonth = function (m) {
        if (m * 1 < 10) {
            m = '0' + m;
        }
        else {
            m = m;
        }
        return m;
    };
    SettingPage.prototype.benarDate = function (d) {
        if (d * 1 < 10) {
            d = '0' + d;
        }
        else {
            d = d;
        }
        return d;
    };
    SettingPage.prototype.benarHours = function (h) {
        if (h * 1 < 10) {
            h = '0' + h;
        }
        else {
            h = h;
        }
        return h;
    };
    SettingPage.prototype.benarMinutes = function (i) {
        if (i * 1 < 10) {
            i = '0' + i;
        }
        else {
            i = i;
        }
        return i;
    };
    SettingPage.prototype.benarSecond = function (s) {
        if (s * 1 < 10) {
            s = '0' + s;
        }
        else {
            s = s;
        }
        return s;
    };
    SettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\setting\setting.html"*/`<ion-header>\n\n  <ion-navbar color="grey_">\n    <ion-title>Setting</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="getstart">\n  <ion-list no-border style="background-color: transparant;">\n    <ion-item (tap)="developer_option($event)">\n      <!-- <ion-toggle checked="false" ></ion-toggle> -->\n      <ion-label>\n        Developer Option\n      </ion-label>\n      <ion-icon name=\'construct\' item-start></ion-icon>\n    </ion-item>\n\n    <ion-item *ngIf="developer_access==\'Y\'" (click)="apiserver()">\n      <ion-icon name=\'desktop\' item-start></ion-icon>\n      API Server\n      <ion-note item-end>\n        {{api_server}}\n      </ion-note>\n    </ion-item>\n\n    <ion-item *ngIf="developer_access==\'Y\'">\n      <ion-icon name=\'print\' item-start></ion-icon>\n      Printer\n      <ion-note item-end>\n        Conventional\n      </ion-note>\n    </ion-item>\n\n    <ion-item *ngIf="developer_access==\'Y\'">\n      <ion-icon name=\'laptop\' item-start></ion-icon>\n      IP Printer\n      <ion-note item-end>\n        {{api_server}}\n      </ion-note>\n    </ion-item>\n\n    <ion-item *ngIf="developer_access==\'Y\'" (click)="registDevices()">\n      <ion-icon name=\'phone-portrait\' item-start></ion-icon>\n      This Device {{regist_status}}\n      <ion-note item-end>\n        {{ip_device}}\n      </ion-note>\n    </ion-item>\n\n    <!-- <ion-item *ngIf="developer_access==\'Y\'">\n      <ion-toggle checked="true"></ion-toggle>\n      <ion-label>\n        Mode Auto Refresh\n      </ion-label>\n      <ion-icon name=\'refresh-circle\' item-start></ion-icon>\n    </ion-item>\n\n    <ion-item *ngIf="developer_access==\'Y\'">\n      <ion-icon name=\'stopwatch\' item-start></ion-icon>\n      Refresh Page Timer\n      <ion-note item-end>\n        {{set_timer}} Second\n      </ion-note>\n    </ion-item> -->\n\n    <ion-item *ngIf="developer_access==\'Y\'">\n      <ion-icon name=\'photos\' item-start></ion-icon>\n      Change Color Limit\n      <ion-note item-end>\n        {{refresh_page_limit}} Minutes\n      </ion-note>\n    </ion-item>\n\n    <ion-item (click)="clearlocal()">\n      <ion-icon name=\'trash\' item-start></ion-icon>\n      Clear Local\n      <ion-note item-end>\n        <ion-icon name="trash"></ion-icon>\n      </ion-note>\n    </ion-item>\n\n    <ion-item (click)="synchronizeNow()">\n      <ion-icon name=\'cloud-download\' item-start></ion-icon>\n      Last Synchronize\n      <ion-note item-end>\n        {{last_date_synchronize}}\n      </ion-note>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name=\'restaurant\' item-start></ion-icon>\n      Resto\n      <ion-note item-end>\n        {{resto}}\n      </ion-note>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name=\'happy\' item-start></ion-icon>\n      Release\n      <ion-note item-end>\n        15.03.2019\n      </ion-note>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name=\'phone-portrait\' item-start></ion-icon>\n      About Me\n      <ion-note item-end>\n        MyResto V.120719\n      </ion-note>\n    </ion-item>\n\n    <ion-item>\n      <ion-note item-start>\n        <br>\n        <h2>V.290419</h2>\n        <p>- Fix Bugs SUM Currency</p>\n        <p>- Print Font Chinesses In BFM</p>\n        <br>\n        <h2>V.270419</h2>\n        <p>- IDR convertion currency to USD and RMB</p>\n        <p>- Kurs USD and RMB Localstorage</p>\n        <p>- Add Filed Harga In trans_order_header Localstorage</p>\n        <br>\n        <h2>V.260419</h2>\n        <p>- Fix Bugs Delete Menu In LIsting Order</p>\n        <p>- Long Space Button In Order Page</p>\n        <p>- Void Order With Authorization Listing Order</p>\n        <br>\n        <h2>V.12072019</h2>\n        <p>- Auto Sycn Every Day When MyResto Ready</p>\n        <p>- Lite Version</p>\n        <br>\n      </ion-note>\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\setting\setting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], SettingPage);
    return SettingPage;
}());

//# sourceMappingURL=setting.js.map

/***/ })

});
//# sourceMappingURL=6.js.map