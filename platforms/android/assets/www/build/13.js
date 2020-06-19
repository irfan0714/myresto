webpackJsonp([13],{

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddmenuPageModule", function() { return AddmenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addmenu__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AddmenuPageModule = (function () {
    function AddmenuPageModule() {
    }
    AddmenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__addmenu__["a" /* AddmenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["a" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__addmenu__["a" /* AddmenuPage */]),
            ],
        })
    ], AddmenuPageModule);
    return AddmenuPageModule;
}());

//# sourceMappingURL=addmenu.module.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddmenuPage; });
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



var Port = (function () {
    function Port() {
    }
    return Port;
}());
var AddmenuPage = (function () {
    function AddmenuPage(navCtrl, sqlite, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.items = [];
        this.ports = [
            { id: 1, name: 'Tokai' },
            { id: 2, name: 'Vladivostok' },
            { id: 3, name: 'Navlakhi' }
        ];
        this.initializeItems();
        this.getCurrentData(navParams.get("order_id"));
    }
    AddmenuPage.prototype.getCurrentData = function (order_id) {
        this.order_id = parseInt(order_id) + 1;
    };
    AddmenuPage.prototype.initializeItems = function () {
        this.getMenus();
    };
    AddmenuPage.prototype.getMenus = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM menu WHERE name LIKE ? OR name LIKE ? OR name LIKE ? OR name LIKE ? OR name LIKE ? ORDER BY name ASC LIMIT 0,20', ["%nasi%", "%bebek%", "%ayam%", "%crab%", "%lobster%"])
                .then(function (res) {
                _this.items = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.items.push({
                        pcode: res.rows.item(i).pcode,
                        name: res.rows.item(i).name,
                        price: res.rows.item(i).price
                    });
                }
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) { return console.log(e); });
    };
    AddmenuPage.prototype.search = function (request) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT pcode, name, price FROM menu WHERE name LIKE ? LIMIT 0,20', ["%" + request + "%"])
                .then(function (res) {
                if (res.rows.length > 0) {
                    _this.items = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        _this.items.push({
                            pcode: res.rows.item(i).pcode,
                            name: res.rows.item(i).name,
                            price: res.rows.item(i).price
                        });
                    }
                }
                else {
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    AddmenuPage.prototype.getItems = function (ev) {
        this.initializeItems();
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                console.log(item.name.indexOf(val));
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    AddmenuPage.prototype.chooseMenu = function (pcode, name, price, order_id) {
        this.closeModal(pcode, name, price, order_id);
    };
    AddmenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddmenuPage');
    };
    AddmenuPage.prototype.closeModal = function (pcode, name, price, order_id) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM kurs', [])
                .then(function (res) {
                console.log(pcode, name, price, res.rows.item(0).RMB, res.rows.item(0).USD, order_id);
                _this.viewCtrl.dismiss({ pcode: pcode, name: name, price: price, RMB: res.rows.item(0).RMB, USD: res.rows.item(0).USD, order_id: order_id });
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    AddmenuPage.prototype.portChange = function (event) {
        console.log('port:', event.value);
    };
    AddmenuPage.prototype.openSearchPage = function () {
        this.navCtrl.push('SearchPage');
    };
    AddmenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addmenu',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\addmenu\addmenu.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-title>List Menu Order</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="closeModal()">Close</button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar>\n    <ion-searchbar placeholder="Search Menu By Unique Or Specific Name" (ionInput)="search($event.target.value)">\n    </ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n<ion-content padding>\n  <ion-list radio-group>\n    <ion-item *ngFor="let item of items">\n      <ion-label>{{ item.name }}</ion-label>\n      <ion-radio checked="false" value="{{ item.pcode }}"\n        (click)="chooseMenu(item.pcode,item.name,item.price,order_id)">\n      </ion-radio>\n    </ion-item>\n  </ion-list>\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\addmenu\addmenu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
    ], AddmenuPage);
    return AddmenuPage;
}());

//# sourceMappingURL=addmenu.js.map

/***/ })

});
//# sourceMappingURL=13.js.map