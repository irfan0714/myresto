webpackJsonp([0],{

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitBillDetailPageModule", function() { return SplitBillDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__split_bill_detail__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_accordion_accordion__ = __webpack_require__(707);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SplitBillDetailPageModule = (function () {
    function SplitBillDetailPageModule() {
    }
    SplitBillDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__split_bill_detail__["a" /* SplitBillDetailPage */],
                __WEBPACK_IMPORTED_MODULE_3__components_accordion_accordion__["a" /* AccordionComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__split_bill_detail__["a" /* SplitBillDetailPage */]),
            ],
        })
    ], SplitBillDetailPageModule);
    return SplitBillDetailPageModule;
}());

//# sourceMappingURL=split-bill-detail.module.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitBillDetailPage; });
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




var SplitBillDetailPage = (function () {
    function SplitBillDetailPage(navCtrl, navParams, sqlite, loadingCtrl, postPvdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.value_tambah = 0;
        this.value_kurang = 0;
        this.open_menu = 'Y';
        this.close_menu = 'N';
        this.checking_list_menu = 'N';
        this.getCurrentData(navParams.get("table"), navParams.get("num_split"));
        this.getSplitDetail();
        this.loadserver();
    }
    SplitBillDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SplitBillDetailPage');
    };
    SplitBillDetailPage.prototype.getCurrentData = function (table, num_split) {
        this.table = table;
        this.num_split = num_split;
    };
    SplitBillDetailPage.prototype.loadserver = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            console.log('disini');
            db.executeSql('SELECT * FROM setting', [])
                .then(function (res) {
                console.log(res);
                if (res.rows.item(0).ip_api != '') {
                    _this.ip_api = res.rows.item(0).ip_api;
                    _this.getMenu(_this.ip_api, _this.table);
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailPage.prototype.getSplitDetail = function () {
        this.splitdetail = [];
        for (var i = 0; i < parseInt(this.num_split); i++) {
            var abjad = this.getAbjad(i);
            this.splitdetail.push({
                table_id: this.table + '' + abjad,
            });
        }
    };
    SplitBillDetailPage.prototype.getAbjad = function (a) {
        var hrf;
        if (a == 0) {
            hrf = "a";
        }
        else if (a == 1) {
            hrf = "b";
        }
        else if (a == 2) {
            hrf = "c";
        }
        else if (a == 3) {
            hrf = "d";
        }
        else if (a == 4) {
            hrf = "e";
        }
        else if (a == 5) {
            hrf = "f";
        }
        return hrf;
    };
    SplitBillDetailPage.prototype.getMenu = function (ip_api, no_table) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please Waiting..."
        });
        loader.present();
        //start sending to API
        var body = {
            table: no_table,
            action: 'getListOrderDetailForSplit'
        };
        //get process
        this.postPvdr.postData(ip_api, body, 'Read').subscribe(function (data) {
            if (data.success) {
                loader.dismiss();
                //detail
                console.log(data.dataListOrderDetail);
                _this.listing_menu = [];
                _this.checking_listing_menu = [];
                for (var i = 0; i < data.dataListOrderDetail.length; i++) {
                    _this.listing_menu.push({
                        Nm: data.dataListOrderDetail[i]['NamaLengkap'],
                        PCode: data.dataListOrderDetail[i]['PCode'],
                        Sts: data.dataListOrderDetail[i]['Status'],
                        Quty: 0,
                        Wght: data.dataListOrderDetail[i]['Berat'],
                        Nt: data.dataListOrderDetail[i]['Keterangan']
                    });
                }
                for (var j = 0; j < data.dataListOrderDetail.length; j++) {
                    _this.checking_listing_menu.push({
                        name: data.dataListOrderDetail[j]['NamaLengkap'],
                        quantity: data.dataListOrderDetail[j]['Qty']
                    });
                }
            }
            else {
                loader.dismiss();
            }
        });
    };
    SplitBillDetailPage.prototype.btn_menu_open = function () {
        this.open_menu = 'N';
        this.close_menu = 'Y';
        this.checking_list_menu = 'Y';
    };
    SplitBillDetailPage.prototype.btn_menu_close = function () {
        this.open_menu = 'Y';
        this.close_menu = 'N';
        this.checking_list_menu = 'N';
    };
    SplitBillDetailPage.prototype.tambah = function (id, table) {
        var gab = table + '' + id;
        console.log(id, table);
        console.log(gab);
        this.value_tambah++;
        document.getElementById(gab).innerHTML = this.value_tambah + " Pcs";
    };
    SplitBillDetailPage.prototype.kurang = function (id, table) {
        console.log(id, table);
        var gab = table + '' + id;
        console.log(id, table);
        console.log(gab);
        this.value_kurang--;
        document.getElementById(gab).innerHTML = this.value_kurang + " Pcs";
    };
    SplitBillDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-split-bill-detail',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\split-bill-detail\split-bill-detail.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-buttons start>\n      <button *ngIf="open_menu==\'Y\'" ion-button icon-only (click)="btn_menu_open(NoSticker)">\n        <ion-icon name="eye"></ion-icon>\n      </button>\n      <button *ngIf="close_menu==\'Y\'" ion-button icon-only (click)="btn_menu_close(NoSticker)">\n        <ion-icon name="eye-off"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Split Bill {{table}}</ion-title>\n  </ion-navbar>\n\n  <ion-navbar color="light2" *ngIf="checking_list_menu==\'Y\'">\n    <div>\n      <ion-list no-border padding>\n        <ion-item *ngFor="let key of checking_listing_menu">\n          <ion-icon name=\'checkbox-outline\' item-start></ion-icon>\n          {{key.name}}\n          <ion-note item-end>\n            {{key.quantity}}\n          </ion-note>\n        </ion-item>\n      </ion-list>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="getstart">\n  <accordion *ngFor="let val of splitdetail" [title]="val.table_id">\n\n\n    <ion-list>\n      <span *ngFor="let listMenu of listing_menu; let i = index;">\n        <ion-item>\n          <ion-label><b><span>{{listMenu.Nm}}</span></b><br><span style="font-size:9pt;"><span id="{{val.table_id+\'\'+i}}">{{listMenu.Quty}}\n                Pcs.</span></span></ion-label>\n          <h3 item-end>\n            <ion-icon style="font-size: 20px" color="dark" name="add-circle" (click)="tambah(i,val.table_id)"></ion-icon>\n            <ion-icon color="dark" name="listing"></ion-icon>\n            <ion-icon color="dark" name="listing"></ion-icon>\n            <ion-icon style="font-size: 20px" color="dark" name="remove-circle" (click)="kurang(i,val.table_id)"></ion-icon>\n            <ion-icon color="dark" name="listing"></ion-icon>\n          </h3>\n        </ion-item>\n      </span>\n    </ion-list>\n\n  </accordion>\n\n  <ion-fab bottom right>\n    <button ion-fab color="grey_" (click)="sendingData()">\n      <ion-icon name=\'paper-plane\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\split-bill-detail\split-bill-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */]])
    ], SplitBillDetailPage);
    return SplitBillDetailPage;
}());

//# sourceMappingURL=split-bill-detail.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccordionComponent = (function () {
    function AccordionComponent(renderer) {
        this.renderer = renderer;
        this.accordionExapanded = false;
        this.icon = "arrow-forward";
    }
    AccordionComponent.prototype.ngOnInit = function () {
        console.log(this.cardContent.nativeElement);
        this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
    };
    AccordionComponent.prototype.toggleAccordion = function () {
        if (this.accordionExapanded) {
            this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
            this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");
        }
        else {
            this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
            this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");
        }
        this.accordionExapanded = !this.accordionExapanded;
        this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("cc"),
        __metadata("design:type", Object)
    ], AccordionComponent.prototype, "cardContent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('title'),
        __metadata("design:type", String)
    ], AccordionComponent.prototype, "title", void 0);
    AccordionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'accordion',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\components\accordion\accordion.html"*/`<ion-card>\n  <ion-card-header (click)="toggleAccordion()">\n    <ion-list>\n      <ion-item color="primary">\n        <button ion-button clear small icon-only item-right>\n          <ion-icon color="light" [name]="icon"></ion-icon>\n        </button>\n        <b>{{ title }}</b>\n      </ion-item>\n    </ion-list>\n  </ion-card-header>\n  <ion-card-content #cc>\n    <ng-content></ng-content>\n  </ion-card-content>\n</ion-card>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\components\accordion\accordion.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], AccordionComponent);
    return AccordionComponent;
}());

//# sourceMappingURL=accordion.js.map

/***/ })

});
//# sourceMappingURL=0.js.map