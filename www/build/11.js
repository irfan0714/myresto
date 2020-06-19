webpackJsonp([11],{

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailListOrderPageModule", function() { return DetailListOrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_list_order__ = __webpack_require__(695);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DetailListOrderPageModule = (function () {
    function DetailListOrderPageModule() {
    }
    DetailListOrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__detail_list_order__["a" /* DetailListOrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__detail_list_order__["a" /* DetailListOrderPage */]),
            ],
        })
    ], DetailListOrderPageModule);
    return DetailListOrderPageModule;
}());

//# sourceMappingURL=detail-list-order.module.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailListOrderPage; });
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





var DetailListOrderPage = (function () {
    function DetailListOrderPage(platform, actionsheetCtrl, loadingCtrl, postPvdr, modalCtrl, toastCtrl, alertCtrl, navCtrl, viewCtrl, navParams, sqlite) {
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.selectedAll = false;
        this.showCheckBoxes = true;
        this.total_serve = 0;
        this.show_order_header = 'Y';
        this.testRadioOpen = false;
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
        this.time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
        this.nows = this.date + ' ' + this.time;
        this.getCurrentData(navParams.get("notrans"), navParams.get("table"));
    }
    DetailListOrderPage.prototype.ionViewDidLoad = function () {
        this.loadserver();
    };
    DetailListOrderPage.prototype.loadserver = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM setting', [])
                .then(function (res) {
                console.log(res);
                if (res.rows.item(0).ip_api != '') {
                    _this.ip_api = res.rows.item(0).ip_api;
                    _this.getDatailListOrder(_this.ip_api, _this.notrans, _this.table);
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    DetailListOrderPage.prototype.getCurrentData = function (notrans, table) {
        this.notrans = notrans;
        this.table = table;
    };
    DetailListOrderPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    DetailListOrderPage.prototype.getDatailListOrder = function (ip_api, notrans, table) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Sedang menghubungkan ke database. Mohon Menunggu beberapa saat, jika sinyal terganggu akan ada alert. dan silahkan coba lagi."
        });
        loader.present();
        var body = {
            notrans: notrans,
            table: table,
            action: 'getTableListOrderDetailLite'
        };
        this.postPvdr.postData(ip_api, body, 'Read').subscribe(function (data) {
            if (data.success) {
                console.log(data.dataListOrderHeader);
                loader.dismiss();
                //header
                _this.NoSticker = data.dataListOrderHeader.Sticker;
                _this.Table_order = data.dataListOrderHeader.KdMeja;
                //detail
                console.log(data.dataListOrderDetail);
                _this.listing_menu = [];
                for (var i = 0; i < data.dataListOrderDetail.length; i++) {
                    _this.listing_menu.push({
                        noOrder: data.dataListOrderDetail[i]['NoTrans'],
                        Nm: data.dataListOrderDetail[i]['NamaLengkap'],
                        PCode: data.dataListOrderDetail[i]['PCode'],
                        Sts: data.dataListOrderDetail[i]['Status'],
                        Quty: data.dataListOrderDetail[i]['Qty'],
                        Wght: data.dataListOrderDetail[i]['Berat'],
                        Nt: data.dataListOrderDetail[i]['Keterangan']
                    });
                }
            }
            else {
                loader.dismiss();
            }
        }, function (error) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Lost Connection',
                subTitle: 'Opps, i am sorry, signal blank spot, please wait a few moment and try again',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    DetailListOrderPage.prototype.doneOrder = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are You Sure?',
            message: 'sure this menu is done?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        //comment
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('SELECT * FROM setting', [])
                                .then(function (res) {
                                for (var i = 0; i < _this.listing_menu.length; i++) {
                                    if (_this.listing_menu[i]['chk']) {
                                        _this.pc = _this.listing_menu[i]['PCode'];
                                        _this.noTranz = _this.listing_menu[i]['noOrder'];
                                        _this.Quanty = parseInt(_this.listing_menu[i]['Quty']);
                                        var stus = document.getElementById('ls_' + _this.pc + '' + _this.noTranz).innerHTML;
                                        if (stus == '0') {
                                            console.log('ini yang di checklist', i, _this.listing_menu[i]['chk']);
                                            document.getElementById('oke' + i).style.display = "";
                                            document.getElementById('showCheckBoxes' + i).style.display = "none";
                                            document.getElementById('weightOrder' + i).style.display = "none";
                                            document.getElementById('unlockOrder' + i).style.display = "";
                                            document.getElementById('deleteOrder' + i).style.display = "none";
                                            if (res.rows.item(0).ip_api != '') {
                                                _this.ip_api = res.rows.item(0).ip_api;
                                                document.getElementById('ls_' + _this.pc + '' + _this.noTranz).innerHTML = '1';
                                                _this.checkListMenu(_this.ip_api, _this.noTranz, _this.pc, _this.Quanty);
                                            }
                                        }
                                    }
                                }
                            }).catch(function (e) { return console.log(e); });
                        }).catch(function (e) {
                            console.log(e);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    DetailListOrderPage.prototype.checkListMenu = function (ip_api, notrans, pcode, qty) {
        var _this = this;
        var body = {
            notrans: notrans,
            pcode: pcode,
            qty: qty,
            action: 'checkListMenuOut'
        };
        this.postPvdr.postData(ip_api, body, 'Update').subscribe(function (data) {
            if (data.success) {
                _this.total_serve = parseInt(data.totalserve) * 1;
            }
            else {
            }
        });
    };
    DetailListOrderPage.prototype.CheckAll = function () {
        this.selectedAll = true;
        document.getElementById('chackedAll').style.display = "none";
        document.getElementById('unchackedAll').style.display = "";
        console.log(this.listing_menu);
    };
    DetailListOrderPage.prototype.UnCheckAll = function () {
        this.selectedAll = false;
        document.getElementById('chackedAll').style.display = "";
        document.getElementById('unchackedAll').style.display = "none";
        console.log(this.listing_menu);
    };
    DetailListOrderPage.prototype.weightOrder = function (ke, sts, pcode, kuan, trns) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Edit Weight',
            //message: "For " + this.name_menu + ' menu',
            inputs: [
                {
                    name: 'input_weight',
                    type: 'number',
                    placeholder: 'Weight'
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
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql('UPDATE trans_order_detail SET Berat=? WHERE NoTrans=? AND PCode=? AND Qty=?', [data.input_weight, trns, pcode, kuan])
                                .then(function (res) {
                                console.log(res);
                                console.log('berhasil edit transaksi detail weight ', data.input_weight, trns);
                                _this.sendingUpdateDetail(pcode, '0', data.input_weight, trns);
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }).catch(function (e) {
                            console.log(e);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    DetailListOrderPage.prototype.unlockOrder = function (ke, sts, pcode, kuan, trns) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                                    document.getElementById('showCheckBoxes' + ke).style.display = "";
                                    document.getElementById('oke' + ke).style.display = "none";
                                    if (sts == '1') {
                                        document.getElementById('weightOrderDone' + ke).style.display = "";
                                        document.getElementById('unlockOrderDone' + ke).style.display = "none";
                                        document.getElementById('deleteOrderDone' + ke).style.display = "";
                                    }
                                    else if (sts == '0') {
                                        document.getElementById('weightOrder' + ke).style.display = "";
                                        document.getElementById('unlockOrder' + ke).style.display = "none";
                                        document.getElementById('deleteOrder' + ke).style.display = "";
                                    }
                                    _this.sendingUpdateDetail(pcode, '0', '', trns);
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
    };
    DetailListOrderPage.prototype.deleteOrder = function (ke, sts, pcode, kuan, trns) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are You Sure?',
            message: 'sure this menu will be deleted?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Agree clicked');
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
                                            db.executeSql('SELECT * FROM user WHERE name=? AND password=?', [data.username, data.password])
                                                .then(function (res) {
                                                if (res.rows.length > 0) {
                                                    document.getElementById('viewDetail' + ke).style.display = "none";
                                                    _this.sendingUpdateDetail(pcode, '2', '', trns);
                                                }
                                                else {
                                                    var toast = _this.toastCtrl.create({
                                                        message: 'You do not have authorization',
                                                        position: 'top',
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
                        for (var i = 0; i < _this.listing_menu.length; i++) {
                            if (_this.listing_menu[i]['chk']) {
                                console.log('ini yang di checklist');
                                document.getElementById('oke' + i).style.display = "";
                                document.getElementById('showCheckBoxes' + i).style.display = "none";
                                document.getElementById('weightOrder' + i).style.display = "none";
                                document.getElementById('unlockOrder' + i).style.display = "";
                                document.getElementById('deleteOrder' + i).style.display = "none";
                                _this.pc = _this.listing_menu[i]['PCode'];
                                _this.Quanty = parseInt(_this.listing_menu[i]['Quty']);
                                _this.sqlite.create({
                                    name: 'resto.db',
                                    location: 'default'
                                }).then(function (db) {
                                    db.executeSql('UPDATE trans_order_detail SET Status = ? WHERE NoTrans = ? AND PCode = ? ', ['1', _this.notrans, _this.pc])
                                        .then(function (res) {
                                        //comment
                                    })
                                        .catch(function (e) {
                                        console.log(e);
                                    });
                                }).catch(function (e) {
                                    console.log(e);
                                });
                            }
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    DetailListOrderPage.prototype.changeSticker = function (nosti_cker) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Form Customer',
            message: "Total Pax and No. Sticker.",
            inputs: [
                {
                    name: 'nosticker',
                    type: 'number',
                    value: nosti_cker,
                    placeholder: 'No.Sticker'
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
                    text: 'Save Edit',
                    handler: function (data) {
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            if (data.nosticker.length == 4) {
                                db.executeSql('UPDATE trans_order_header SET KdAgent=? WHERE NoTrans=? AND KdAgent=?', [data.nosticker, _this.notrans, nosti_cker])
                                    .then(function (res) {
                                    console.log(res);
                                    _this.no_sticker = data.nosticker;
                                    document.getElementById('stickerpure').style.display = "none";
                                    document.getElementById('stickernotpure').style.display = "";
                                    console.log('berhasil edit transaksi header ', _this.notrans);
                                    //sending data header
                                    _this.sendingUpdateHeader('', data.nosticker);
                                })
                                    .catch(function (e) {
                                    console.log(e);
                                });
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'No Sticker must be 4 digits',
                                    position: 'top',
                                    duration: 3000
                                });
                                toast.present();
                                return;
                            }
                        }).catch(function (e) {
                            console.log(e);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    DetailListOrderPage.prototype.changeTable = function () {
        var _this = this;
        var myModal = this.modalCtrl.create('ChangeTablePage', { notrans: this.notrans, table_active: this.Table_order });
        myModal.present();
        myModal.onDidDismiss(function (data) {
            if (data.table_new) {
                _this.Table_order = data.table_new;
                _this.sendingUpdateHeader(data.table_new, '');
            }
        });
    };
    DetailListOrderPage.prototype.duplicateMenu = function () {
        var myModal = this.modalCtrl.create('DuplicateMenuPage', { notrans: this.notrans, table_active: this.Table_order });
        myModal.present();
        myModal.onDidDismiss(function (data) {
            //tidak ada lemparan data dari modal
        });
    };
    DetailListOrderPage.prototype.sendingUpdateHeader = function (table, sticker) {
        var _this = this;
        var body = {
            notrans: this.notrans,
            meja: table,
            nosticker: sticker,
            action: 'updateHeader'
        };
        this.postPvdr.postData(this.ip_api, body, 'Update').subscribe(function (data) {
            if (data.success) {
                var toast = _this.toastCtrl.create({
                    message: 'Update Successful',
                    duration: 1000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Update Unsuccessfully',
                    duration: 1000,
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    DetailListOrderPage.prototype.sendingUpdateDetail = function (pcode, sts, weight, trns) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                var body = {
                    notrans: trns,
                    pcode: pcode,
                    status: sts,
                    berat: weight,
                    action: 'updateDetail'
                };
                _this.postPvdr.postData(_this.ip_api, body, 'Update').subscribe(function (data) {
                    if (data.success) {
                        _this.total_serve = parseInt(data.totalserve) * 1;
                        var toast = _this.toastCtrl.create({
                            message: 'Update Successful',
                            duration: 1000,
                            position: 'top'
                        });
                        toast.present();
                        _this.ionViewDidLoad();
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'Update Unsuccessfully',
                            duration: 1000,
                            position: 'top'
                        });
                        toast.present();
                    }
                });
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    DetailListOrderPage.prototype.optional_menu = function (nosticker) {
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            title: 'Optional Menu',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Change Table',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'clipboard' : null,
                    handler: function () {
                        _this.changeTable();
                    }
                },
                {
                    text: 'Change No.Sticker',
                    icon: !this.platform.is('ios') ? 'happy' : null,
                    handler: function () {
                        _this.changeSticker(nosticker);
                    }
                },
            ]
        });
        actionSheet.present();
    };
    DetailListOrderPage.prototype.btn_refresh = function () {
        this.ionViewDidLoad();
    };
    DetailListOrderPage.prototype.TimeWatch = function (time) {
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
    DetailListOrderPage.prototype.DateWatch = function (dates) {
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
    DetailListOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail-list-order',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\detail-list-order\detail-list-order.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-buttons start>\n      <button ion-button icon-only (click)="optional_menu(NoSticker)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Detail List Order {{Table_order}} / <span id="stickerpure">{{NoSticker}}</span> <span id="stickernotpure"\n        style="display:none">{{no_sticker}}</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="getstart">\n  <br>\n  <ion-item-group>\n    <ion-list>\n      <span *ngFor="let listMenu of listing_menu; let i = index;">\n        <ion-item-sliding id="viewDetail{{i}}" *ngIf="listMenu.Sts!=\'2\'">\n          <ion-item>\n            <ion-label><b><span>{{listMenu.Nm}}</span></b><span style="display:none;"\n                id="{{\'ls_\'+listMenu.PCode+\'\'+listMenu.noOrder}}">{{listMenu.Sts}}</span><br><span\n                style="font-size:9pt;"><span>{{listMenu.Quty}}\n                  Pcs.</span>\n                <span *ngIf="listMenu.Wght!=\'0\'"><span>{{listMenu.Wght}} gr.</span></span>\n                <span *ngIf="listMenu.Nt!=\'\'">Note\n                  : </span>\n                <span>{{listMenu.Nt}}</span></span></ion-label>\n            <!-- <ion-checkbox color="dark" name="checklist[]" id="checklist{{i}}" checked="false"></ion-checkbox> -->\n            <ion-checkbox *ngIf="listMenu.Sts==\'0\'" id="showCheckBoxes{{i}}" [(ngModel)]="listMenu.chk" color="dark"\n              [checked]="selectedAll"></ion-checkbox>\n            <ion-checkbox style="font-size: 30px" *ngIf="listMenu.Sts==\'1\'" id="showCheckBoxes{{i}}"\n              [(ngModel)]="listMenu.chk" color="dark" [checked]="selectedAll" style="display:none"></ion-checkbox>\n            <h3 item-end>\n              <ion-icon style="font-size: 30px" *ngIf="listMenu.Sts==\'0\'" id="oke{{i}}" color="dark"\n                name="checkmark-circle-outline" style="display:none"></ion-icon>\n              <ion-icon style="font-size: 30px" *ngIf="listMenu.Sts==\'1\'" id="oke{{i}}" color="dark"\n                name="checkmark-circle-outline"></ion-icon>\n            </h3>\n          </ion-item>\n          <ion-item-options side="right">\n            <button id="weightOrder{{i}}" *ngIf="listMenu.Sts==\'0\'" ion-button color="natura"\n              (click)="weightOrder(i,listMenu.Sts,listMenu.PCode,listMenu.Quty,listMenu.noOrder)">\n              <ion-icon style="font-size: 30px" name="pizza"></ion-icon>\n            </button>\n            <button id="weightOrderDone{{i}}" style="display:none" *ngIf="listMenu.Sts==\'1\'" ion-button color="natura"\n              (click)="weightOrder(i,listMenu.Sts,listMenu.PCode,listMenu.Quty,listMenu.noOrder)">\n              <ion-icon style="font-size: 30px" name="pizza"></ion-icon>\n            </button>\n\n\n            <button id="unlockOrder{{i}}" style="display:none" *ngIf="listMenu.Sts==\'0\'" ion-button color="secret"\n              (click)="unlockOrder(i,listMenu.Sts,listMenu.PCode,listMenu.Quty,listMenu.noOrder)">\n              <ion-icon style="font-size: 30px" name="unlock"></ion-icon>\n            </button>\n            <button id="unlockOrderDone{{i}}" *ngIf="listMenu.Sts==\'1\'" ion-button color="secret"\n              (click)="unlockOrder(i,listMenu.Sts,listMenu.PCode,listMenu.Quty,listMenu.noOrder)">\n              <ion-icon style="font-size: 30px" name="unlock"></ion-icon>\n            </button>\n\n\n            <button id="deleteOrder{{i}}" *ngIf="listMenu.Sts==\'0\'" ion-button color="danger"\n              (click)="deleteOrder(i,listMenu.Sts,listMenu.PCode,listMenu.Quty,listMenu.noOrder)">\n              <ion-icon style="font-size: 30px" name="trash"></ion-icon>\n            </button>\n            <button id="deleteOrderDone{{i}}" style="display:none" *ngIf="listMenu.Sts==\'1\'" ion-button color="danger"\n              (click)="deleteOrder(i,listMenu.Sts,listMenu.PCode,listMenu.Quty,listMenu.noOrder)">\n              <ion-icon style="font-size: 30px" name="trash"></ion-icon>\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </span>\n    </ion-list>\n\n  </ion-item-group>\n\n\n  <ion-fab bottom right>\n    <button large ion-fab color="grey_" (click)="btn_refresh()">\n      <ion-icon name=\'refresh\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n\n<ion-footer>\n  <ion-navbar color="grey_">\n    <div>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-6 id="chackedAll">\n            <button ion-button large block color="green_" id="chkall" (click)="CheckAll()">Select\n              All</button>\n          </ion-col>\n          <ion-col col-6 id="unchackedAll" style="display:none;">\n            <button large ion-button block color="danger" id="chkall" (click)="UnCheckAll()">Unselect\n              All</button>\n          </ion-col>\n          <ion-col col-6>\n            <button large ion-button block color="primary" (click)="doneOrder()">Done</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-navbar>\n</ion-footer>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\detail-list-order\detail-list-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], DetailListOrderPage);
    return DetailListOrderPage;
}());

//# sourceMappingURL=detail-list-order.js.map

/***/ })

});
//# sourceMappingURL=11.js.map