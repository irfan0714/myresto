webpackJsonp([15],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SlidesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SlidesPage = (function () {
    function SlidesPage(navCtrl, navParams, loadingCtrl, alertCtrl, sqlite, toastCtrl, postPvdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.postPvdr = postPvdr;
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
        this.time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
        this.nows = this.date + ' ' + this.time;
        this.slides = [
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
    }
    SlidesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SlidesPage');
    };
    SlidesPage.prototype.settingIpApi = function () {
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
                                //ping server
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
                                        var alert_1 = _this.alertCtrl.create({
                                            title: 'Successfully',
                                            subTitle: 'Success ping to server.' + data.registed,
                                            buttons: ['OK']
                                        });
                                        alert_1.present();
                                        //save IP Devices and status registed in this setting
                                        db.executeSql('UPDATE setting SET ip_devices=?,regist_status=?', [data.ip, data.statusRegisted])
                                            .then(function (res) {
                                            //hide loading
                                            loading.dismiss();
                                        })
                                            .catch(function (e) {
                                            console.log(e);
                                        });
                                    }
                                    else {
                                        var alert_2 = _this.alertCtrl.create({
                                            title: 'Failed',
                                            subTitle: 'Failed ping to server',
                                            buttons: ['OK']
                                        });
                                        alert_2.present();
                                        loading.dismiss();
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
    SlidesPage.prototype.synchronizeNow = function () {
        //before synchronize choose resto
        this.getResto();
    };
    SlidesPage.prototype.getResto = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
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
                                    _this.syncData();
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
        }).catch(function (e) { return console.log(e); });
    };
    SlidesPage.prototype.syncData = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "synchronize proccess ..."
        });
        loading.present();
        //ping to API
        var body = {
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
                    //insert to sqlite
                    for (var p = 0; p < data.kurs.length; p++) {
                        var RMB = data.kurs[p]['RMB'];
                        var USD = data.kurs[p]['USD'];
                        //insert menu
                        db.executeSql('INSERT INTO kurs (RMB, USD) VALUES (?,?)', [RMB, USD])
                            .then(function (res) {
                            //comment
                        })
                            .catch(function (e) {
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
                            .then(function (res) {
                            //comment
                        })
                            .catch(function (e) {
                            console.log(e);
                        });
                    }
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
                message: 'Opps Sorry,Please Try Again...',
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
            return;
        });
        //end ping to API
    };
    SlidesPage.prototype.TimeWatch = function (time) {
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
    SlidesPage.prototype.DateWatch = function (dates) {
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
    SlidesPage.prototype.homeScreen = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE setting SET slider_opening=?', ['N'])
                .then(function (res) {
                //comment
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) { return console.log(e); });
    };
    SlidesPage.prototype.benarMonth = function (m) {
        if (m * 1 < 10) {
            m = '0' + m;
        }
        else {
            m = m;
        }
        return m;
    };
    SlidesPage.prototype.benarDate = function (d) {
        if (d * 1 < 10) {
            d = '0' + d;
        }
        else {
            d = d;
        }
        return d;
    };
    SlidesPage.prototype.benarHours = function (h) {
        if (h * 1 < 10) {
            h = '0' + h;
        }
        else {
            h = h;
        }
        return h;
    };
    SlidesPage.prototype.benarMinutes = function (i) {
        if (i * 1 < 10) {
            i = '0' + i;
        }
        else {
            i = i;
        }
        return i;
    };
    SlidesPage.prototype.benarSecond = function (s) {
        if (s * 1 < 10) {
            s = '0' + s;
        }
        else {
            s = s;
        }
        return s;
    };
    SlidesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-slides',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\slides\slides.html"*/`<ion-content class="tutorial-page">\n\n  <ion-slides pager>\n    <ion-slide *ngFor="let slide of slides">\n      <ion-toolbar>\n        <ion-buttons end>\n          <!-- <button ion-button color="primary">Next</button> -->\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="slide.image" class="slide-image" />\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description"></p>\n      <div *ngIf="slide.buttonIpApi==\'Y\'"><button ion-button (click)="settingIpApi()">Setting IP API SERVER</button></div>\n      <div *ngIf="slide.buttonSynchronize==\'Y\'"><button ion-button (click)="synchronizeNow()">Synchronize now</button></div>\n    </ion-slide>\n    <ion-slide>\n      <ion-toolbar>\n      </ion-toolbar>\n      <img src="assets/imgs/ica-slidebox-img-4.png" class="slide-image" />\n      <h2 class="slide-title">Ready to Use?</h2>\n      <button ion-button large clear icon-end color="primary" (click)="homeScreen()">\n        Continue\n        <!-- <ion-icon name="arrow-forward"></ion-icon> -->\n      </button>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\slides\slides.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */]])
    ], SlidesPage);
    return SlidesPage;
}());

//# sourceMappingURL=slides.js.map

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 164;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/addmenu/addmenu.module": [
		681,
		13
	],
	"../pages/change-table/change-table.module": [
		679,
		12
	],
	"../pages/detail-list-order/detail-list-order.module": [
		680,
		11
	],
	"../pages/duplicate-menu/duplicate-menu.module": [
		685,
		10
	],
	"../pages/list-order/list-order.module": [
		683,
		9
	],
	"../pages/order/order.module": [
		682,
		8
	],
	"../pages/search/search.module": [
		684,
		7
	],
	"../pages/setting/setting.module": [
		686,
		6
	],
	"../pages/slides/slides.module": [
		687,
		14
	],
	"../pages/split-bill-detail/split-bill-detail.module": [
		692,
		0
	],
	"../pages/split-bill-details/split-bill-details.module": [
		688,
		5
	],
	"../pages/split-bill/split-bill.module": [
		690,
		4
	],
	"../pages/table/table.module": [
		693,
		3
	],
	"../pages/takingorder/takingorder.module": [
		689,
		2
	],
	"../pages/testing/testing.module": [
		691,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 209;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(355);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_post_provider__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_selectable__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_slides_slides__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_Storage__ = __webpack_require__(347);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_slides_slides__["a" /* SlidesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8_ionic_selectable__["a" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_Storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/change-table/change-table.module#ChangeTablePageModule', name: 'ChangeTablePage', segment: 'change-table', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/detail-list-order/detail-list-order.module#DetailListOrderPageModule', name: 'DetailListOrderPage', segment: 'detail-list-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/addmenu/addmenu.module#AddmenuPageModule', name: 'AddmenuPage', segment: 'addmenu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order/order.module#OrderPageModule', name: 'OrderPage', segment: 'order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list-order/list-order.module#ListOrderPageModule', name: 'ListOrderPage', segment: 'list-order', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/duplicate-menu/duplicate-menu.module#DuplicateMenuPageModule', name: 'DuplicateMenuPage', segment: 'duplicate-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/slides/slides.module#SlidesPageModule', name: 'SlidesPage', segment: 'slides', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/split-bill-details/split-bill-details.module#SplitBillDetailsPageModule', name: 'SplitBillDetailsPage', segment: 'split-bill-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/takingorder/takingorder.module#TakingorderPageModule', name: 'TakingorderPage', segment: 'takingorder', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/split-bill/split-bill.module#SplitBillPageModule', name: 'SplitBillPage', segment: 'split-bill', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/testing/testing.module#TestingPageModule', name: 'TestingPage', segment: 'testing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/split-bill-detail/split-bill-detail.module#SplitBillDetailPageModule', name: 'SplitBillDetailPage', segment: 'split-bill-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/table/table.module#TablePageModule', name: 'TablePage', segment: 'table', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_slides_slides__["a" /* SlidesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_5__providers_post_provider__["a" /* PostProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_slides_slides__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, sqlite) {
        var _this = this;
        this.sqlite = sqlite;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            _this.prepareTable();
        });
    }
    MyApp.prototype.rootigPages = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT slider_opening FROM setting', [])
                .then(function (res) {
                if (res.rows.item(0).slider_opening == 'N') {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_slides_slides__["a" /* SlidesPage */];
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    MyApp.prototype.prepareTable = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            //header order		
            db.executeSql('CREATE TABLE IF NOT EXISTS trans_order_header (NoTrans TEXT,NoKassa TEXT,Tanggal TEXT,Waktu TEXT,Kasir TEXT,KdStore TEXT, TotalItem TEXT, TotalQty TEXT,TotalServe TEXT, Status TEXT,KdPersonal TEXT,KdMeja TEXT,KdContact TEXT,nostruk TEXT,TotalGuest TEXT,AddDate TEXT,keterangan TEXT,KdAgent TEXT,IsCommit TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table order header'); })
                .catch(function (e) { return console.log(e); });
            //detail order
            db.executeSql('CREATE TABLE IF NOT EXISTS trans_order_detail (NoTrans TEXT,NoUrut TEXT,NoKassa TEXT,Tanggal TEXT ,Waktu TEXT ,Kasir TEXT,KdStore TEXT,PCode TEXT,Name TEXT,Qty TEXT,Berat TEXT,Satuan TEXT,Keterangan TEXT,Note_split TEXT,Status TEXT,KdPersonal TEXT,KdMeja TEXT,KdContact TEXT,MenuBaru TEXT,Tambahan TEXT, QtyCheckSplit TEXT,Harga TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table order detail'); })
                .catch(function (e) { return console.log(e); });
            //table location
            db.executeSql('CREATE TABLE IF NOT EXISTS table_location (table_id TEXT, table_name TEXT ,type_location TEXT, table_color TEXT ,type_isEmpty TEXT, AddDate TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table table_location'); })
                .catch(function (e) { return console.log(e); });
            //table user
            db.executeSql('CREATE TABLE IF NOT EXISTS user (id TEXT, name TEXT, password TEXT, authorization TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table user'); })
                .catch(function (e) { return console.log(e); });
            //table menu
            db.executeSql('CREATE TABLE IF NOT EXISTS menu (pcode TEXT, name TEXT, price TEXT, menucollection TEXT, typefood TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table menu'); })
                .catch(function (e) { return console.log(e); });
            //table kurs
            db.executeSql('CREATE TABLE IF NOT EXISTS kurs (RMB TEXT, USD TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table kurs'); })
                .catch(function (e) { return console.log(e); });
            //table store
            db.executeSql('CREATE TABLE IF NOT EXISTS store (kodestore TEXT, namastore TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table store'); })
                .catch(function (e) { return console.log(e); });
            //table totalorder
            db.executeSql('CREATE TABLE IF NOT EXISTS totalorder (IDR TEXT, USD TEXT, RMB TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table totalorder'); })
                .catch(function (e) { return console.log(e); });
            //table setting
            db.executeSql('CREATE TABLE IF NOT EXISTS setting (firstTime TEXT, idresto TEXT, nameresto TEXT, ip_api TEXT, type_printer TEXT, ip_printer TEXT,set_timer TEXT, refresh_timer TEXT, statusUpdate TEXT, dateUpdate TEXT, regist_status TEXT, ip_devices TEXT,slider_opening TEXT)', [])
                .then(function (res) { return console.log('Successfully Create Table setting'); })
                .catch(function (e) { return console.log(e); });
            //insert setting if not exists
            db.executeSql('INSERT INTO setting(firstTime,idresto, nameresto, ip_api, type_printer, ip_printer, set_timer, refresh_timer, statusUpdate, dateUpdate, regist_status, ip_devices,slider_opening) \
						SELECT * FROM(SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS tmp\
						WHERE NOT EXISTS(\
							SELECT firstTime FROM setting WHERE firstTime = ?\
						) LIMIT 1', ['myresto', '', '', '', '', '', '15000', '10', 'N', '', 'N', '', 'Y', 'myresto'])
                .then(function (res) {
                console.log('Successfully Insert Table setting');
                _this.rootigPages();
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\app\app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//provider api



var PostProvider = (function () {
    function PostProvider(http) {
        this.http = http;
    }
    PostProvider.prototype.postData = function (ip, body, file) {
        console.log(JSON.stringify(body));
        var type = "application/json; charset=UTF-8";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': type });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.server = "http://" + ip + "/general_api/index.php/myresto/";
        return this.http.post(this.server + file, JSON.stringify(body), options)
            .map(function (res) { return res.json(); });
    };
    PostProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], PostProvider);
    return PostProvider;
}());

//# sourceMappingURL=post-provider.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
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





var HomePage = (function () {
    function HomePage(navCtrl, sqlite, platform, modalCtrl, toastCtrl, alertCtrl, postPvdr) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.postPvdr = postPvdr;
        this.pin = '';
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
        this.time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
        this.nows = this.date + ' ' + this.time;
        this.cek_data();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.cek_data();
    };
    HomePage.prototype.table_pages = function (waiter, id) {
        //console.log(waiter, id);
        this.navCtrl.push('TablePage', { waiter: waiter, id: id });
    };
    HomePage.prototype.setting_pages = function () {
        this.navCtrl.push('SettingPage');
    };
    HomePage.prototype.split_bill = function () {
        this.navCtrl.push('SplitBillPage');
    };
    HomePage.prototype.checkin = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Login Waiter',
            message: "Enter Your ID Waiter for adding order",
            inputs: [
                {
                    name: 'waiterid',
                    type: 'number',
                    placeholder: 'ID Waiter'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Login',
                    handler: function (data) {
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            var a = data.waiterid + "#";
                            var b = a.split("123");
                            var usr = b[0];
                            db.executeSql('SELECT * FROM user WHERE id=? AND password=?', [usr, '123'])
                                .then(function (res) {
                                if (res.rows.length > 0) {
                                    //masuk ke table
                                    _this.table_pages(res.rows.item(0).name, res.rows.item(0).id);
                                }
                                else {
                                    var toast = _this.toastCtrl.create({
                                        message: 'Opps, Sorry. Please Try Again.',
                                        duration: 3000,
                                        position: 'top'
                                    });
                                    toast.present();
                                }
                            })
                                .catch(function (e) { return console.log(e); });
                        })
                            .catch(function (e) { return console.log(e); });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.list_order = function () {
        this.navCtrl.push('ListOrderPage');
    };
    HomePage.prototype.benarMonth = function (m) {
        if (m * 1 < 10) {
            m = '0' + m;
        }
        else {
            m = m;
        }
        return m;
    };
    HomePage.prototype.benarDate = function (d) {
        if (d * 1 < 10) {
            d = '0' + d;
        }
        else {
            d = d;
        }
        return d;
    };
    HomePage.prototype.benarHours = function (h) {
        if (h * 1 < 10) {
            h = '0' + h;
        }
        else {
            h = h;
        }
        return h;
    };
    HomePage.prototype.benarMinutes = function (i) {
        if (i * 1 < 10) {
            i = '0' + i;
        }
        else {
            i = i;
        }
        return i;
    };
    HomePage.prototype.benarSecond = function (s) {
        if (s * 1 < 10) {
            s = '0' + s;
        }
        else {
            s = s;
        }
        return s;
    };
    HomePage.prototype.TimeWatch = function (time) {
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
    HomePage.prototype.DateWatch = function (dates) {
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
    HomePage.prototype.cek_data = function () {
        var _this = this;
        //cek apakah tanggal berbeda, jika berbeda maka di update masterbarang dan user
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM setting', [])
                .then(function (res) {
                if (_this.date != res.rows.item(0).dateUpdate.substr(0, 10)) {
                    _this.sync_data(res.rows.item(0).idresto);
                }
            });
        }).catch(function (e) { return console.log(e); });
    };
    HomePage.prototype.sync_data = function (kdresto) {
        var _this = this;
        var body = {
            kdresto: kdresto,
            action: 'sync'
        };
        this.postPvdr.postData(this.ip_api, body, 'Ping').subscribe(function (data) {
            console.log(data);
            if (data.success) {
                _this.sqlite.create({
                    name: 'resto.db',
                    location: 'default'
                }).then(function (db) {
                    //menus
                    db.executeSql('DELETE FROM menu', [])
                        .then(function (res) {
                        for (var y = 0; y < data.menu.length; y++) {
                            var PCode = data.menu[y]['PCode'];
                            var NamaLengkap = data.menu[y]['NamaLengkap'];
                            var Price = data.menu[y]['Harga'];
                            var GroupMenu = data.menu[y]['GroupMenu'];
                            var KdGroupBarang = data.menu[y]['KdGroupBarang'];
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
                    db.executeSql('DELETE FROM kurs', [])
                        .then(function (res) {
                        for (var p = 0; p < data.kurs.length; p++) {
                            var RMB = data.kurs[p]['RMB'];
                            var USD = data.kurs[p]['USD'];
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
                        for (var x = 0; x < data.user.length; x++) {
                            var Id = data.user[x]['Id'];
                            var UserName = data.user[x]['UserName'];
                            var Password = data.user[x]['Password'];
                            var otorisasi = data.user[x]['otorisasi'];
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
                }).catch(function (e) { return console.log(e); });
                console.log('suskses sync');
            }
        }, function (error) {
            //jika putus ya ndak kenapa napa...
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\home\home.html"*/`<ion-content class="content-login">\n  <img src="assets/imgs/bg.png" alt="">\n  <div class="wrapper-login">\n    <div style="width: 60%;">\n      <div style="text-align: center;padding-bottom: -10px">\n        <img src="assets/imgs/mylogo.png" alt="" width="200" height="200">\n      </div>\n      <ion-row class="form-login">\n        <ion-grid>\n          <ion-row>\n            <ion-col (click)="checkin()">\n              <ion-card style=" background: transparent">\n                <img src="assets/imgs/taking_order.png" width="100" height="100" />\n              </ion-card>\n            </ion-col>\n            <ion-col (click)="list_order()">\n              <ion-card style=" background: transparent">\n                <img id="cards" src="assets/imgs/list_order.png" width="100" height="100" />\n              </ion-card>\n            </ion-col>\n            <ion-col (click)="split_bill()">\n              <ion-card style=" background: transparent">\n                <img src="assets/imgs/split_bill.png" width="100" height="100" />\n              </ion-card>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-row>\n    </div>\n  </div>\n  <ion-fab bottom right>\n    <button large ion-fab color="grey_" (click)="setting_pages()">\n      <ion-icon name=\'settings\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[350]);
//# sourceMappingURL=main.js.map