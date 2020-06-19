webpackJsonp([10],{

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DuplicateMenuPageModule", function() { return DuplicateMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__duplicate_menu__ = __webpack_require__(700);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DuplicateMenuPageModule = (function () {
    function DuplicateMenuPageModule() {
    }
    DuplicateMenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__duplicate_menu__["a" /* DuplicateMenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__duplicate_menu__["a" /* DuplicateMenuPage */]),
            ],
        })
    ], DuplicateMenuPageModule);
    return DuplicateMenuPageModule;
}());

//# sourceMappingURL=duplicate-menu.module.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DuplicateMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DuplicateMenuPage = (function () {
    function DuplicateMenuPage(alertCtrl, viewCtrl, sqlite, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.sqlite = sqlite;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getCurrentData(navParams.get("notrans"), navParams.get("table_active"));
    }
    DuplicateMenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChangeTablePage');
        this.getTable();
    };
    DuplicateMenuPage.prototype.getCurrentData = function (notrans, table_active) {
        this.notrans = notrans;
        this.table_active = table_active;
    };
    DuplicateMenuPage.prototype.getTable = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            //table	
            db.executeSql('SELECT * FROM table_location ', [])
                .then(function (res) {
                _this.tables = [];
                for (var i = 0; i <= res.rows.length; i++) {
                    console.log(res.rows.item(i).table_id, res.rows.item(i).table_color, res.rows.item(i).type_isEmpty);
                    _this.tables.push({
                        table_id: res.rows.item(i).table_id,
                        table_color: res.rows.item(i).table_color,
                        table_isEmpty: res.rows.item(i).type_isEmpty
                    });
                }
            })
                .catch(function (e) { return console.log(e); });
            //table	
            db.executeSql('SELECT * FROM table_location ', [])
                .then(function (res) {
                _this.tables = [];
                for (var i = 0; i <= res.rows.length; i++) {
                    console.log(res.rows.item(i).table_id, res.rows.item(i).table_color, res.rows.item(i).type_isEmpty);
                    _this.tables.push({
                        table_id: res.rows.item(i).table_id,
                        table_color: res.rows.item(i).table_color,
                        table_isEmpty: res.rows.item(i).type_isEmpty
                    });
                }
            })
                .catch(function (e) { return console.log(e); });
            db.executeSql('SELECT COUNT(table_id) AS TotalEmpty FROM table_location WHERE type_isEmpty=?', ['0'])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.total_table_empty = parseInt(res.rows.item(0).TotalEmpty);
                }
            }).catch(function (e) { return console.log(e); });
            db.executeSql('SELECT COUNT(table_id) AS TotalActive FROM table_location WHERE type_isEmpty=?', ['1'])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.total_table_active = parseInt(res.rows.item(0).TotalActive);
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    DuplicateMenuPage.prototype.duplicatemenu = function (table) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            _this.notrans_new = _this.notrans + '123';
            //duplicate header
            db.executeSql('INSERT INTO trans_order_header (NoTrans ,NoKassa ,Tanggal ,Waktu ,Kasir ,KdStore , TotalItem , TotalQty ,TotalServe , Status ,KdPersonal ,KdMeja ,KdContact ,nostruk ,TotalGuest ,AddDate ,keterangan ,KdAgent ,IsCommit ) SELECT ? , NoKassa, Tanggal, Waktu, Kasir, KdStore, TotalItem, TotalQty, ?, Status, KdPersonal, ? , KdContact, nostruk, TotalGuest, AddDate, keterangan, KdAgent, IsCommit FROM trans_order_header WHERE NoTrans=?', [_this.notrans_new, '0', table, _this.notrans])
                .then(function (res) {
                //comment
                console.log('Successfully Duplicate Header Menu', table);
                //lock new table
                db.executeSql('UPDATE table_location SET table_color=?,type_isEmpty=?  WHERE table_id=?', ['danger', '1', table])
                    .then(function (res) {
                    console.log(res);
                    //comment
                })
                    .catch(function (e) {
                    console.log(e);
                });
            })
                .catch(function (e) { return console.log(e); });
            //duplicate detail
            db.executeSql('INSERT INTO trans_order_detail (NoTrans ,NoUrut ,NoKassa ,Tanggal  ,Waktu  ,Kasir ,KdStore ,PCode ,Name ,Qty ,Berat ,Satuan ,Keterangan ,Note_split ,Status ,KdPersonal ,KdMeja ,KdContact ,MenuBaru ,Tambahan )  SELECT ? ,NoUrut ,NoKassa ,Tanggal  ,Waktu  ,Kasir ,KdStore ,PCode ,Name ,Qty ,Berat ,Satuan ,?,Note_split ,? ,KdPersonal ,?,KdContact ,MenuBaru ,Tambahan FROM trans_order_detail WHERE NoTrans=?', [_this.notrans_new, '', '0', table, _this.notrans])
                .then(function (res) {
                //comment
                var confirm = _this.alertCtrl.create({
                    title: 'Successfully Duplicate Menu',
                    message: 'Do you want to print this menu?',
                    buttons: [
                        {
                            text: 'No',
                            handler: function () {
                                //close modal
                                _this.closeModal();
                            }
                        },
                        {
                            text: 'Yes',
                            handler: function () {
                                var alert = _this.alertCtrl.create({
                                    title: 'Succeess Print.',
                                    subTitle: 'Print Menu From Docket.',
                                    buttons: ['OK']
                                });
                                alert.present();
                            }
                        }
                    ]
                });
                confirm.present();
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    DuplicateMenuPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    DuplicateMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-duplicate-menu',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\duplicate-menu\duplicate-menu.html"*/`<ion-header>\n\n  <ion-navbar color="grey_">\n    <ion-title>Duplicate Menu </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="closeModal()">Close</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="getstart">\n  <ion-grid>\n\n    <ion-row justify-content>\n      <ion-col col-2 *ngFor="let table of tables">\n        <div><button color="{{table.table_color}}" ion-button large (click)="duplicatemenu(table.table_id)">{{\n            table.table_id }}</button></div>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color="grey_">\n    <ion-title>\n      <ion-icon name="square" color="light2"></ion-icon> Table Empty : {{total_table_empty}}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start>\n        <ion-icon name="square" color="danger"></ion-icon> Table Active : {{total_table_active}}\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\duplicate-menu\duplicate-menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], DuplicateMenuPage);
    return DuplicateMenuPage;
}());

//# sourceMappingURL=duplicate-menu.js.map

/***/ })

});
//# sourceMappingURL=10.js.map