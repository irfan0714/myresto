webpackJsonp([12],{

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeTablePageModule", function() { return ChangeTablePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_table__ = __webpack_require__(694);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangeTablePageModule = (function () {
    function ChangeTablePageModule() {
    }
    ChangeTablePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__change_table__["a" /* ChangeTablePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__change_table__["a" /* ChangeTablePage */]),
            ],
        })
    ], ChangeTablePageModule);
    return ChangeTablePageModule;
}());

//# sourceMappingURL=change-table.module.js.map

/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeTablePage; });
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





var ChangeTablePage = (function () {
    function ChangeTablePage(viewCtrl, sqlite, navCtrl, navParams, loadingCtrl, postPvdr, toastCtrl, storage) {
        this.viewCtrl = viewCtrl;
        this.sqlite = sqlite;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.getCurrentData(navParams.get("notrans"), navParams.get("table_active"));
        this.ipserver();
    }
    ChangeTablePage.prototype.ipserver = function () {
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
    ChangeTablePage.prototype.getUpdateTabelFromServer = function (ip_api) {
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
                _this.storage.set('table_storage', data.tables);
                loader.dismiss();
                _this.getTable();
            }
            else {
                //coding...
            }
        }, function (error) {
            var toast = _this.toastCtrl.create({
                message: 'Taking too much time for response. Please check your connection or try again.',
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        });
    };
    ChangeTablePage.prototype.ionViewDidLoad = function () {
        //this.getTable();
    };
    ChangeTablePage.prototype.getCurrentData = function (notrans, table_active) {
        this.notrans = notrans;
        this.table_active = table_active;
    };
    ChangeTablePage.prototype.getTable = function () {
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
    ChangeTablePage.prototype.changetable = function (table) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                var body = {
                    notrans: _this.notrans,
                    table: table,
                    action: 'changeTable'
                };
                _this.postPvdr.postData(_this.ip_api, body, 'Update').subscribe(function (data) {
                    if (data.success) {
                        _this.closeModal(table);
                    }
                    else {
                        //coding...
                    }
                }, function (error) {
                    var toast = _this.toastCtrl.create({
                        message: 'Taking too much time for response. Please check your connection or try again.',
                        position: 'top',
                        showCloseButton: true,
                        closeButtonText: 'Ok'
                    });
                    toast.present();
                    return;
                });
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    ChangeTablePage.prototype.closeModal = function (table) {
        this.viewCtrl.dismiss({ table_new: table });
    };
    ChangeTablePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-change-table',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\change-table\change-table.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-title>Change Table</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="closeModal(table_active)">Close</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content class="getstart">\n  <ion-grid style="width: auto">\n\n    <ion-row justify-content>\n      <ion-col *ngFor="let table of tables">\n        <div><button color="{{table.table_color}}" ion-button large (click)="changetable(table.table_id)">{{\n            table.table_id }}</button></div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n<ion-footer>\n  <ion-toolbar color="grey_">\n    <ion-title>\n      <ion-icon name="square" color="light2"></ion-icon> Table Empty : {{total_table_empty}}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start>\n        <ion-icon name="square" color="danger"></ion-icon> Table Active : {{total_table_active}}\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\change-table\change-table.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */]])
    ], ChangeTablePage);
    return ChangeTablePage;
}());

//# sourceMappingURL=change-table.js.map

/***/ })

});
//# sourceMappingURL=12.js.map