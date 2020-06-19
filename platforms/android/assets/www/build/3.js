webpackJsonp([3],{

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablePageModule", function() { return TablePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__table__ = __webpack_require__(708);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TablePageModule = (function () {
    function TablePageModule() {
    }
    TablePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__table__["a" /* TablePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__table__["a" /* TablePage */]),
            ],
        })
    ], TablePageModule);
    return TablePageModule;
}());

//# sourceMappingURL=table.module.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TablePage; });
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





var TablePage = (function () {
    function TablePage(navCtrl, toastCtrl, navParams, loadingCtrl, postPvdr, storage, sqlite) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.sqlite = sqlite;
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
        this.time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
        this.nows = this.date + ' ' + this.time;
        this.getCurrentData(navParams.get("waiter"), navParams.get("id"));
        this.ipserver();
    }
    TablePage.prototype.ionViewDidLoad = function () {
        //comment
    };
    TablePage.prototype.ipserver = function () {
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
    TablePage.prototype.getCurrentData = function (waiter, id) {
        this.waiter = waiter;
        this.id = id;
    };
    TablePage.prototype.getUpdateTabelFromServer = function (ip_api) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Mohon Tunggu, sedang memindai meja."
        });
        loader.present();
        var body = {
            action: 'getTableTakingOrder'
        };
        this.postPvdr.postData(ip_api, body, 'Read').subscribe(function (data) {
            if (data.success) {
                _this.storage.set('table_storage', data.tables);
                loader.dismiss();
                _this.getTable();
            }
            else {
                //coding...
            }
        }, function (error) {
            loader.dismiss();
            _this.getTableLocal();
            var toast = _this.toastCtrl.create({
                message: 'Lost Connection. This Order uses local storage.',
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        });
    };
    TablePage.prototype.order = function (table, waiter, id, isEmpty, notrans) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: " Mohon Tunggu, sedang menyiapkan transaksi."
        });
        loader.present();
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            _this.notrans = id + '' + _this.today.getFullYear() + '' + _this.benarMonth(_this.today.getMonth() + 1) + '' + _this.benarDate(_this.today.getDate()) + '' + _this.benarHours(_this.today.getHours()) + '' + _this.benarMinutes(_this.today.getMinutes()) + '' + _this.benarSecond(_this.today.getSeconds());
            db.executeSql('INSERT INTO trans_order_header (NoTrans,Tanggal,Waktu,Kasir,KdMeja, Status) VALUES(?,?,?,?,?,?)', [_this.notrans, _this.date, _this.TimeWatch(_this.time), waiter, table, '0'])
                .then(function (res) {
                if (isEmpty == '0' || isEmpty == 0 || isEmpty == '' || notrans == '') {
                    loader.dismiss();
                    _this.navCtrl.push('OrderPage', { notrans: _this.notrans, table: table, waiter: waiter, id: id, new_order: 'Y', old_order: notrans });
                    // this.navCtrl.push('TakingorderPage');
                }
                else {
                    loader.dismiss();
                    _this.navCtrl.push('OrderPage', { notrans: _this.notrans, table: table, waiter: waiter, id: id, new_order: 'T', old_order: notrans });
                    // this.navCtrl.push('TakingorderPage');
                }
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    TablePage.prototype.getTable = function () {
        var _this = this;
        this.storage.get('table_storage').then(function (res) {
            _this.listTable = res;
            _this.tables = [];
            var count_table_active = 0;
            for (var i = 0; i < _this.listTable.length; i++) {
                _this.tables.push({
                    table_id: _this.listTable[i]['KdMeja'],
                    table_color: _this.listTable[i]['warna'],
                    table_isEmpty: _this.listTable[i]['kosong'],
                    table_trans: _this.listTable[i]['NoTrans']
                });
                if (_this.listTable[i]['kosong'] == '1') {
                    count_table_active++;
                }
            }
            _this.total_table_empty = _this.listTable.length - count_table_active;
            _this.total_table_active = count_table_active;
        });
    };
    TablePage.prototype.getTableLocal = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM table_location', [])
                .then(function (res) {
                _this.tables = [];
                var count_table_active = 0;
                for (var i = 0; i < res.rows.length; i++) {
                    _this.tables.push({
                        table_id: res.rows.item(i).table_id,
                        table_color: 'light2',
                        table_isEmpty: '0',
                        table_trans: ''
                    });
                    if (res.rows.item(i).table_isEmpty == '1') {
                        count_table_active++;
                    }
                }
                _this.total_table_empty = _this.listTable.length - count_table_active;
                _this.total_table_active = count_table_active;
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    TablePage.prototype.TimeWatch = function (time) {
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
    TablePage.prototype.DateWatch = function (dates) {
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
    TablePage.prototype.benarMonth = function (m) {
        if (m * 1 < 10) {
            m = '0' + m;
        }
        else {
            m = m;
        }
        return m;
    };
    TablePage.prototype.benarDate = function (d) {
        if (d * 1 < 10) {
            d = '0' + d;
        }
        else {
            d = d;
        }
        return d;
    };
    TablePage.prototype.benarHours = function (h) {
        if (h * 1 < 10) {
            h = '0' + h;
        }
        else {
            h = h;
        }
        return h;
    };
    TablePage.prototype.benarMinutes = function (i) {
        if (i * 1 < 10) {
            i = '0' + i;
        }
        else {
            i = i;
        }
        return i;
    };
    TablePage.prototype.benarSecond = function (s) {
        if (s * 1 < 10) {
            s = '0' + s;
        }
        else {
            s = s;
        }
        return s;
    };
    TablePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-table',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\table\table.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-title>Choose Tables</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start>\n        <ion-icon name="contact" color="light"></ion-icon>{{waiter}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="getstart">\n  <ion-grid style="width: auto">\n    <ion-row>\n      <ion-col col-2 *ngFor="let table of tables">\n        <div><button color="{{table.table_color}}" ion-button large (click)="order(table.table_id,waiter,id,table.table_isEmpty,table.table_trans)">{{\n            table.table_id }}</button></div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n<ion-footer>\n  <ion-toolbar color="grey_">\n    <ion-title>\n      <ion-icon name="square" color="light2"></ion-icon> Table Empty : {{total_table_empty}}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start>\n        <ion-icon name="square" color="danger"></ion-icon> Table Active : {{total_table_active}}\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\table\table.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], TablePage);
    return TablePage;
}());

//# sourceMappingURL=table.js.map

/***/ })

});
//# sourceMappingURL=3.js.map