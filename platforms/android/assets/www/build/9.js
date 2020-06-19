webpackJsonp([9],{

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListOrderPageModule", function() { return ListOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_order__ = __webpack_require__(698);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ListOrderPageModule = (function () {
    function ListOrderPageModule() {
    }
    ListOrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__list_order__["a" /* ListOrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__list_order__["a" /* ListOrderPage */]),
            ],
        })
    ], ListOrderPageModule);
    return ListOrderPageModule;
}());

//# sourceMappingURL=list-order.module.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_interval__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_Storage__ = __webpack_require__(347);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ListOrderPage = (function () {
    function ListOrderPage(toastCtrl, storage, postPvdr, alertCtrl, actionSheetCtrl, navCtrl, loadingCtrl, modalCtrl, navParams, viewCtrl, sqlite) {
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.postPvdr = postPvdr;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sqlite = sqlite;
        this.Localside = 'N';
        this.press = 0;
        this.timer = 0;
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
        this.time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
        this.nows = this.date + ' ' + this.time;
    }
    ListOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListOrderPage');
        this.ipserver();
    };
    ListOrderPage.prototype.ipserver = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                _this.getUpdateTabelFromServer(_this.ip_api);
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ListOrderPage.prototype.getUpdateTabelFromServer = function (ip_api) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Sedang menghubungkan ke database. Mohon Menunggu beberapa saat, jika sinyal terganggu akan ada alert. dan silahkan coba lagi."
        });
        loader.present();
        var body = {
            action: 'getTableListOrderLite'
        };
        this.postPvdr.postData(ip_api, body, 'Read').subscribe(function (data) {
            if (data.success) {
                _this.storage.set('tableListOrder_storage', data.tableListOrder);
                loader.dismiss();
                _this.getTable();
                _this.getTableLocalSide();
            }
            else {
                loader.dismiss();
            }
        }, function (error) {
            loader.dismiss();
            _this.getTableLocalSide();
            var alert = _this.alertCtrl.create({
                title: 'Lost Connection',
                subTitle: 'Opps, i am sorry, signal blank spot, please wait a few moment and try again',
                buttons: ['OK']
            });
            alert.present();
            return;
        });
    };
    ListOrderPage.prototype.getTable = function () {
        var _this = this;
        this.storage.get('tableListOrder_storage').then(function (res) {
            _this.tables = [];
            for (var i = 0; i < res.length; i++) {
                _this.tables.push({
                    table_id: res[i]['KdMeja'],
                    table_color: '#e4e2e2',
                    no_trans_order: res[i]['NoTrans']
                });
            }
        });
    };
    ListOrderPage.prototype.getTableLocalSide = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM trans_order_header WHERE Status=? AND Tanggal=?', ['3', _this.DateWatch(_this.date)])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.tablesLocalSide = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        _this.tablesLocalSide.push({
                            table_id: res.rows.item(i).KdMeja,
                            no_trans_order: res.rows.item(i).NoTrans,
                            table_time: res.rows.item(i).Waktu
                        });
                    }
                    _this.Localside = 'Y';
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ListOrderPage.prototype.detail_list_order = function (NoTrans, Table) {
        this.navCtrl.push('DetailListOrderPage', { notrans: NoTrans, table: Table });
    };
    ListOrderPage.prototype.btn_refresh = function () {
        this.ionViewDidLoad();
    };
    ListOrderPage.prototype.pressEvent = function (e, tbl, order_id) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                var body = {
                    table: tbl,
                    action: 'NoOrderInTheTable'
                };
                _this.postPvdr.postData(_this.ip_api, body, 'Read').subscribe(function (data) {
                    if (data.success) {
                        //comment is succeess
                        _this.NoOrder = [];
                        var _loop_1 = function (i) {
                            _this.NoOrder.push({
                                text: 'No.Order ' + data.dataNoTransInTheTable[i]['NoTrans'] + ' ' + data.dataNoTransInTheTable[i]['Waktu'],
                                role: 'destructive',
                                handler: function () {
                                    _this.showChoosePrint(tbl, data.dataNoTransInTheTable[i]['NoTrans']);
                                }
                            }, {
                                text: 'Void Order',
                                role: 'cancel',
                                handler: function () {
                                    var prompt = _this.alertCtrl.create({
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
                                                handler: function (data) {
                                                    console.log('Cancel clicked');
                                                }
                                            },
                                            {
                                                text: 'Approve',
                                                handler: function (data) {
                                                    console.log('Saved clicked');
                                                    _this.sqlite.create({
                                                        name: 'resto.db',
                                                        location: 'default'
                                                    }).then(function (db) {
                                                        db.executeSql('SELECT * FROM user WHERE name=? AND password=? AND authorization=?', [data.username, data.password, 'Y'])
                                                            .then(function (res) {
                                                            if (res.rows.length > 0) {
                                                                var body_1 = {
                                                                    table: tbl,
                                                                    action: 'voidOrder'
                                                                };
                                                                _this.postPvdr.postData(_this.ip_api, body_1, 'Update').subscribe(function (data) {
                                                                    if (data.success) {
                                                                        _this.ionViewDidLoad();
                                                                    }
                                                                    else {
                                                                        var toast = _this.toastCtrl.create({
                                                                            message: 'Failed Delete, Please Try Again.',
                                                                            position: 'top',
                                                                            duration: 3000
                                                                        });
                                                                        toast.present();
                                                                    }
                                                                }, function (error) {
                                                                    var toast = _this.toastCtrl.create({
                                                                        message: 'Lost Connection',
                                                                        position: 'top',
                                                                        showCloseButton: true,
                                                                        closeButtonText: 'Ok'
                                                                    });
                                                                    toast.present();
                                                                });
                                                            }
                                                            else {
                                                                var toast = _this.toastCtrl.create({
                                                                    message: 'Opps, Sorry. Please Try Again.',
                                                                    duration: 3000
                                                                });
                                                                toast.present();
                                                            }
                                                        })
                                                            .catch(function (e) { return console.log(e); });
                                                    }).catch(function (e) { return console.log(e); });
                                                }
                                            }
                                        ]
                                    });
                                    prompt.present();
                                }
                            });
                        };
                        for (var i = 0; i < data.dataNoTransInTheTable.length; i++) {
                            _loop_1(i);
                        }
                        var actionSheet = _this.actionSheetCtrl.create({
                            title: 'Tabel ' + tbl,
                            buttons: _this.NoOrder
                        });
                        actionSheet.present();
                    }
                    else {
                        //comment is not succeess
                    }
                }, function (error) {
                    var toast = _this.toastCtrl.create({
                        message: 'Lost Connection',
                        position: 'top',
                        showCloseButton: true,
                        closeButtonText: 'Ok'
                    });
                    toast.present();
                    return;
                });
                //end sending data to API
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ListOrderPage.prototype.showChoosePrint = function (table, notrans) {
        var _this = this;
        var alert = this.alertCtrl.create();
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
            handler: function (data) {
                _this.sqlite.create({
                    name: 'resto.db',
                    location: 'default'
                }).then(function (db) {
                    db.executeSql('SELECT ip_api FROM setting', [])
                        .then(function (res) {
                        var body = {
                            notrans: notrans,
                            table: table,
                            tipe: data,
                            action: 'cetakUlang'
                        };
                        _this.postPvdr.postData(_this.ip_api, body, 'Insert').subscribe(function (data) {
                            if (data.success) {
                                //comment is succeess
                            }
                            else {
                                //comment is not succeess
                            }
                        }, function (error) {
                            //error messages if not connected to server
                        });
                    }).catch(function (e) { return console.log(e); });
                }).catch(function (e) {
                    console.log(e);
                });
            }
        });
        alert.present();
    };
    ListOrderPage.prototype.sendingOrder = function (no_trans_order, table_id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Sending Order?',
            message: 'Do you want to sending this pending order?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        //console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        //console.log('Agree clicked');
                        _this.sendingData(no_trans_order, table_id);
                    }
                }
            ]
        });
        confirm.present();
    };
    ListOrderPage.prototype.sendingData = function (no_trans_order, table_id) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please Waiting..."
        });
        loader.present();
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE trans_order_header SET Status=? WHERE  NoTrans=?', ['0', no_trans_order])
                .then(function (res) {
                loader.dismiss();
            }).catch(function (e) {
                console.log(e);
            });
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                db.executeSql('SELECT * FROM trans_order_header WHERE NoTrans=?', [no_trans_order])
                    .then(function (res) {
                    var body = {
                        NoTrans: res.rows.item(0).NoTrans,
                        NoKassa: res.rows.item(0).NoKassa,
                        Tanggal: _this.DateWatch(res.rows.item(0).Tanggal),
                        Waktu: _this.TimeWatch(res.rows.item(0).Waktu),
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
                    _this.postPvdr.postData(_this.ip_api, body, 'Insert').subscribe(function (data) {
                        if (data.success) {
                            db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [no_trans_order])
                                .then(function (res) {
                                _this.detail_order = [];
                                for (var i = 0; i < res.rows.length; i++) {
                                    var print;
                                    if (i + 1 == res.rows.length) {
                                        print = "Y";
                                    }
                                    else {
                                        print = "N";
                                    }
                                    _this.detail_order.push({
                                        NoTrans: data.no_order,
                                        NoUrut: res.rows.item(i).NoUrut,
                                        NoKassa: res.rows.item(i).NoKassa,
                                        Tanggal: _this.DateWatch(res.rows.item(i).Tanggal),
                                        Waktu: _this.TimeWatch(res.rows.item(i).Waktu),
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
                                var body = {
                                    data_order: _this.detail_order,
                                    action: 'insertDetail'
                                };
                                _this.postPvdr.postData(_this.ip_api, body, 'Insert').subscribe(function (data) {
                                    if (data.success) {
                                        //comment is succeess
                                    }
                                    else {
                                        //comment is not succeess
                                    }
                                }, function (error) {
                                    var toast = _this.toastCtrl.create({
                                        message: 'Lost Connection',
                                        position: 'top',
                                        showCloseButton: true,
                                        closeButtonText: 'Ok'
                                    });
                                    toast.present();
                                    return;
                                });
                                _this.Localside = 'N';
                                _this.ionViewDidLoad();
                            }).catch(function (e) { return console.log(e); });
                        }
                        else {
                            //comment is not succeess
                        }
                    }, function (error) {
                        loader.dismiss();
                        var toast = _this.toastCtrl.create({
                            message: 'Opps Sorry, Make sure it is connected with local wifi or Make sure Server Is Not Down. This Order uses local storage.',
                            position: 'top',
                            showCloseButton: true,
                            closeButtonText: 'Ok'
                        });
                        toast.present();
                        return;
                    });
                })
                    .catch(function (e) {
                    console.log(e);
                });
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ListOrderPage.prototype.TimeWatch = function (time) {
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
    ListOrderPage.prototype.DateWatch = function (dates) {
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
    ListOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-order',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\list-order\list-order.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-title>List Order</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="getstart">\n  <div *ngIf="Localside==\'Y\'">\n    <ion-card>\n      <ion-item color="light2">\n        <p color="dark" style="text-align:center"><b><span>Local Side</span></b></p>\n      </ion-item>\n    </ion-card>\n  </div>\n  <ion-grid *ngIf="Localside==\'Y\'">\n    <ion-row style="text-align: center">\n      <ion-col col-2 *ngFor="let table of tablesLocalSide">\n        <div><button color="orange_" ion-button large (click)="sendingOrder(table.no_trans_order,table.table_id)">\n            <span style="font-size:12pt">{{table.table_id}}<br><span\n                style="font-size:7pt">{{table.table_time}}</span></span>\n          </button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <div *ngIf="Localside==\'Y\'">\n    <ion-card>\n      <ion-item color="light2">\n        <p color="dark" style="text-align:center"><b><span>Server Side</span></b></p>\n      </ion-item>\n    </ion-card>\n  </div>\n  <ion-grid>\n    <ion-row style="text-align: center">\n      <ion-col col-2 *ngFor="let table of tables">\n        <div (press)="pressEvent($event,table.table_id,table.no_trans_orde)"><button color="{{table.table_color}}"\n            ion-button large (click)="detail_list_order(table.no_trans_order,table.table_id)">\n            <span style="font-size:12pt">{{table.table_id}}</span>\n          </button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-fab bottom right>\n    <button large ion-fab color="grey_" (click)="btn_refresh()">\n      <ion-icon name=\'refresh\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n<ion-footer>\n  <!-- <ion-navbar color="grey_">\n    <div>\n      <ion-grid>\n        <ion-row>\n          <ion-col nopadding>\n            <button large ion-button block color="green_">10 min</button>\n          </ion-col>\n          <ion-col nopadding>\n            <button large ion-button block color="yellow">20 Min</button>\n          </ion-col>\n          <ion-col nopadding>\n            <button large ion-button block color="danger">30 Min</button>\n          </ion-col>\n          <ion-col nopadding>\n            <button large ion-button block color="primary">Done</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-navbar> -->\n</ion-footer>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\list-order\list-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_Storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], ListOrderPage);
    return ListOrderPage;
}());

//# sourceMappingURL=list-order.js.map

/***/ })

});
//# sourceMappingURL=9.js.map