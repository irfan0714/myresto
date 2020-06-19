webpackJsonp([4],{

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitBillPageModule", function() { return SplitBillPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__split_bill__ = __webpack_require__(704);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SplitBillPageModule = (function () {
    function SplitBillPageModule() {
    }
    SplitBillPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__split_bill__["a" /* SplitBillPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__split_bill__["a" /* SplitBillPage */]),
            ],
        })
    ], SplitBillPageModule);
    return SplitBillPageModule;
}());

//# sourceMappingURL=split-bill.module.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitBillPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(347);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SplitBillPage = (function () {
    function SplitBillPage(navCtrl, toastCtrl, navParams, loadingCtrl, postPvdr, alertCtrl, storage, sqlite) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.sqlite = sqlite;
        this.Localside = 'N';
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
        this.time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
        this.nows = this.date + ' ' + this.time;
        this.getCurrentData(navParams.get("waiter"), navParams.get("id"));
    }
    SplitBillPage.prototype.ionViewDidLoad = function () {
        //comment
        this.ipserver();
        this.getTableLocalSide();
    };
    SplitBillPage.prototype.ipserver = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                //get data update from server
                _this.getUpdateTabelFromServer(_this.ip_api);
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillPage.prototype.getCurrentData = function (waiter, id) {
        this.waiter = waiter;
        this.id = id;
    };
    SplitBillPage.prototype.getTableLocalSide = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM trans_order_header WHERE Status=? AND Tanggal=?', ['4', _this.date])
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
    SplitBillPage.prototype.getUpdateTabelFromServer = function (ip_api) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please Waiting..."
        });
        loader.present();
        var body = {
            action: 'getTable'
        };
        this.postPvdr.postData(ip_api, body, 'Read').subscribe(function (data) {
            if (data.success) {
                //if success
                _this.storage.set('table_storage', data.tables);
                loader.dismiss();
                _this.getTable();
            }
            else {
                //if not success not connectes to server
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
    };
    SplitBillPage.prototype.split_bills = function (table, waiter, pax, sticker) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Split',
                    handler: function (data) {
                        _this.navCtrl.push('SplitBillDetailsPage', { table: table, num_split: data.num_split, waiters: waiter, guest: pax, no_sticker: sticker });
                    }
                }
            ]
        });
        prompt.present();
    };
    SplitBillPage.prototype.getTable = function () {
        var _this = this;
        this.storage.get('table_storage').then(function (res) {
            _this.listTable = res;
            _this.tables = [];
            for (var i = 0; i < _this.listTable.length; i++) {
                if (_this.listTable[i]['kosong'] == '1') {
                    _this.tables.push({
                        table_id: _this.listTable[i]['KdMeja'],
                        waiters: _this.listTable[i]['Kasir'],
                        pax: _this.listTable[i]['TotalGuest'],
                        nosticker: _this.listTable[i]['KdAgent'],
                        table_color: _this.listTable[i]['warna'],
                        table_isEmpty: _this.listTable[i]['kosong'],
                        table_trans: _this.listTable[i]['NoTrans']
                    });
                }
            }
        });
    };
    SplitBillPage.prototype.sendingOrderSplit = function (no_trans_order, tbl_id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Split Order?',
            message: 'Do you want to sending this split order?',
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
                        _this.sendingDataKeServer(no_trans_order, tbl_id);
                    }
                }
            ]
        });
        confirm.present();
    };
    SplitBillPage.prototype.sendingDataKeServer = function (no_order_temp, tbl_id) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please Waiting..."
        });
        loader.present();
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                db.executeSql('SELECT * FROM trans_order_header WHERE NoTrans=?', [no_order_temp])
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
                        action: 'insertHeaderSplit'
                    };
                    _this.postPvdr.postData(_this.ip_api, body, 'Insert').subscribe(function (data) {
                        if (data.success) {
                            //comment is succeess
                            console.log(data);
                            db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [no_order_temp])
                                .then(function (res) {
                                _this.detail_order = [];
                                for (var i = 0; i < res.rows.length; i++) {
                                    var print;
                                    var trans = res.rows.item(i).KdContact;
                                    if (i + 1 == res.rows.length) {
                                        print = "N";
                                        loader.dismiss();
                                        _this.ionViewDidLoad();
                                    }
                                    var body_1 = {
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
                                        cetak: print,
                                        action: 'insertDetailSplit'
                                    };
                                    _this.postPvdr.postData(_this.ip_api, body_1, 'Insert').subscribe(function (data) {
                                        if (data.success) {
                                            //comment is succeess
                                            var body_2 = {
                                                NoTransSemula: trans.substring(0, 3),
                                                action: 'voidReferensOrderSplit'
                                            };
                                            _this.postPvdr.postData(_this.ip_api, body_2, 'Update').subscribe(function (datax) {
                                                if (datax.success) {
                                                    console.log('Oke berhasil update split order yang asli');
                                                    db.executeSql('UPDATE trans_order_header SET Status=? WHERE NoTrans=?', ['0', no_order_temp])
                                                        .then(function (resr) {
                                                        console.log('Oke berhasil update split order yang split');
                                                    }).catch(function (e) {
                                                        console.log(e);
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            //comment is not succeess
                                        }
                                    });
                                }
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
                        db.executeSql('UPDATE trans_order_header SET Status=? WHERE  NoTrans=?', ['4', no_order_temp])
                            .then(function (res) {
                            //
                        }).catch(function (e) {
                            console.log(e);
                        });
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
    SplitBillPage.prototype.refresh_pages = function () {
        this.ionViewDidLoad();
    };
    SplitBillPage.prototype.TimeWatch = function (time) {
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
    SplitBillPage.prototype.DateWatch = function (dates) {
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
    SplitBillPage.prototype.benarMonth = function (m) {
        if (m * 1 < 10) {
            m = '0' + m;
        }
        else {
            m = m;
        }
        return m;
    };
    SplitBillPage.prototype.benarDate = function (d) {
        if (d * 1 < 10) {
            d = '0' + d;
        }
        else {
            d = d;
        }
        return d;
    };
    SplitBillPage.prototype.benarHours = function (h) {
        if (h * 1 < 10) {
            h = '0' + h;
        }
        else {
            h = h;
        }
        return h;
    };
    SplitBillPage.prototype.benarMinutes = function (i) {
        if (i * 1 < 10) {
            i = '0' + i;
        }
        else {
            i = i;
        }
        return i;
    };
    SplitBillPage.prototype.benarSecond = function (s) {
        if (s * 1 < 10) {
            s = '0' + s;
        }
        else {
            s = s;
        }
        return s;
    };
    SplitBillPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-split-bill',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\split-bill\split-bill.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-title>Choose Tables To Split Bill</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="getstart">\n  <div *ngIf="Localside==\'Y\'">\n    <ion-card>\n      <ion-item color="light2">\n        <p color="dark" style="text-align:center"><b><span>Local Side</span></b></p>\n      </ion-item>\n    </ion-card>\n  </div>\n  <ion-grid *ngIf="Localside==\'Y\'">\n    <ion-row style="text-align: center">\n      <ion-col col-2 *ngFor="let table of tablesLocalSide">\n        <div><button color="orange_" ion-button large (click)="sendingOrderSplit(table.no_trans_order,table.table_id)">\n            <span style="font-size:12pt">{{table.table_id}}</span>\n          </button>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <div *ngIf="Localside==\'Y\'">\n    <ion-card>\n      <ion-item color="light2">\n        <p color="dark" style="text-align:center"><b><span>Server Side</span></b></p>\n      </ion-item>\n    </ion-card>\n  </div>\n  <ion-grid style="width: auto">\n    <ion-row>\n      <ion-col col-2 *ngFor="let table of tables">\n        <div><button color="primary" ion-button large (click)="split_bills(table.table_id,table.waiters,table.pax,table.nosticker)">{{\n            table.table_id }}</button></div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-fab bottom right>\n    <button large ion-fab color="grey_" (click)="refresh_pages()">\n      <ion-icon name=\'refresh\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\split-bill\split-bill.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], SplitBillPage);
    return SplitBillPage;
}());

//# sourceMappingURL=split-bill.js.map

/***/ })

});
//# sourceMappingURL=4.js.map