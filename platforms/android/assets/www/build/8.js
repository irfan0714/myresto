webpackJsonp([8],{

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPageModule", function() { return OrderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OrderPageModule = (function () {
    function OrderPageModule() {
    }
    OrderPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__order__["a" /* OrderPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_selectable__["a" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__order__["a" /* OrderPage */]),
            ],
        })
    ], OrderPageModule);
    return OrderPageModule;
}());

//# sourceMappingURL=order.module.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_post_provider__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrderPage = (function () {
    function OrderPage(navCtrl, navParams, loadingCtrl, modalCtrl, actionSheetCtrl, platform, sqlite, postPvdr, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.sqlite = sqlite;
        this.postPvdr = postPvdr;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.listOrder = [];
        this.sumItem = 0;
        this.total_pax = '';
        this.no_sticker = '';
        this.show_order_history = 'N';
        this.edit_qty01 = 1;
        this.edit_qty02 = 1;
        this.edit_qty03 = 1;
        this.edit_qty04 = 1;
        this.edit_qty05 = 1;
        this.edit_qty06 = 1;
        this.edit_qty07 = 1;
        this.edit_qty08 = 1;
        this.edit_qty09 = 1;
        this.edit_qty10 = 1;
        this.edit_qty11 = 1;
        this.edit_qty12 = 1;
        this.edit_qty13 = 1;
        this.edit_qty14 = 1;
        this.edit_qty15 = 1;
        this.edit_qty16 = 1;
        this.edit_qty17 = 1;
        this.edit_qty18 = 1;
        this.edit_qty19 = 1;
        this.edit_qty20 = 1;
        this.edit_qty21 = 1;
        this.edit_qty22 = 1;
        this.edit_qty23 = 1;
        this.edit_qty24 = 1;
        this.edit_qty25 = 1;
        this.edit_qty26 = 1;
        this.edit_qty27 = 1;
        this.edit_qty28 = 1;
        this.edit_qty29 = 1;
        this.edit_qty30 = 1;
        this.noted01 = 'N';
        this.noted02 = 'N';
        this.noted03 = 'N';
        this.noted04 = 'N';
        this.noted05 = 'N';
        this.noted06 = 'N';
        this.noted07 = 'N';
        this.noted08 = 'N';
        this.noted09 = 'N';
        this.noted10 = 'N';
        this.noted11 = 'N';
        this.noted12 = 'N';
        this.noted13 = 'N';
        this.noted14 = 'N';
        this.noted15 = 'N';
        this.noted16 = 'N';
        this.noted17 = 'N';
        this.noted18 = 'N';
        this.noted19 = 'N';
        this.noted20 = 'N';
        this.noted21 = 'N';
        this.noted22 = 'N';
        this.noted23 = 'N';
        this.noted24 = 'N';
        this.noted25 = 'N';
        this.noted26 = 'N';
        this.noted27 = 'N';
        this.noted28 = 'N';
        this.noted29 = 'N';
        this.noted30 = 'N';
        this.weight01 = 0;
        this.weight02 = 0;
        this.weight03 = 0;
        this.weight04 = 0;
        this.weight05 = 0;
        this.weight06 = 0;
        this.weight07 = 0;
        this.weight08 = 0;
        this.weight09 = 0;
        this.weight10 = 0;
        this.weight11 = 0;
        this.weight12 = 0;
        this.weight13 = 0;
        this.weight14 = 0;
        this.weight15 = 0;
        this.weight16 = 0;
        this.weight17 = 0;
        this.weight18 = 0;
        this.weight19 = 0;
        this.weight20 = 0;
        this.weight21 = 0;
        this.weight22 = 0;
        this.weight23 = 0;
        this.weight24 = 0;
        this.weight25 = 0;
        this.weight26 = 0;
        this.weight27 = 0;
        this.weight28 = 0;
        this.weight29 = 0;
        this.weight30 = 0;
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
        this.time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
        this.nows = this.date + ' ' + this.time;
        //set up awal
        this.totalitem = 10;
        //data lemparan
        this.getCurrentData(navParams.get("notrans"), navParams.get("table"), navParams.get("waiter"), navParams.get("id"), navParams.get("new_order"), navParams.get("old_order"));
        //the first load
        this.initializeItems();
    }
    OrderPage.prototype.initializeItems = function () {
        this.listOrder = [
            {
                'myorder': ''
            }
        ];
    };
    OrderPage.prototype.getCurrentData = function (notrans, table, waiter, id, new_order, old_order) {
        this.notrans = notrans;
        this.table = table;
        this.waiter = waiter;
        this.new_order = new_order;
        this.old_order = old_order;
        this.id = id;
    };
    OrderPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.new_order == 'Y') {
            var prompt_1 = this.alertCtrl.create({
                title: 'Form Customer',
                message: "Input Total Pax and No. Sticker.",
                inputs: [
                    {
                        name: 'pax',
                        type: 'number',
                        placeholder: 'Pax'
                    }, {
                        name: 'nosticker',
                        type: 'number',
                        placeholder: 'No.Sticker'
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) {
                        }
                    },
                    {
                        text: 'Save',
                        handler: function (data) {
                            if (parseInt(data.pax.length) > 3) {
                                var toast = _this.toastCtrl.create({
                                    message: 'Total pax may not exceed 3 digits',
                                    position: 'top',
                                    duration: 3000
                                });
                                toast.present();
                                return;
                            }
                            if (parseInt(data.nosticker.length) > 4) {
                                var toast = _this.toastCtrl.create({
                                    message: 'No Sticker may not exceed 4 digits',
                                    position: 'top',
                                    duration: 3000
                                });
                                toast.present();
                                return;
                            }
                            _this.save_form_customer(data.pax, data.nosticker, _this.notrans);
                        }
                    }
                ]
            });
            prompt_1.present();
        }
        else {
            this.sqlite.create({
                name: 'resto.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql('SELECT ip_api FROM setting', [])
                    .then(function (res) {
                    _this.ip_api = res.rows.item(0).ip_api;
                    if (_this.old_order != '') {
                        var loader_1 = _this.loadingCtrl.create({
                            content: ""
                        });
                        loader_1.present();
                        var body = {
                            noTrans: _this.old_order,
                            action: 'getMenuLastOrder'
                        };
                        _this.postPvdr.postData(_this.ip_api, body, 'Read').subscribe(function (data) {
                            if (data.success) {
                                db.executeSql('UPDATE trans_order_header SET TotalGuest=?,KdAgent=? WHERE NoTrans=?', [data.pax, data.sticker, _this.notrans])
                                    .then(function (resd) {
                                    loader_1.dismiss();
                                    _this.total_pax = data.pax;
                                    _this.no_sticker = data.sticker;
                                }).catch(function (e) {
                                    console.log(e);
                                });
                            }
                            else {
                                loader_1.dismiss();
                            }
                        }, function (error) {
                            loader_1.dismiss();
                            var toast = _this.toastCtrl.create({
                                message: 'Lost Connection. This Order uses local storage.',
                                position: 'top',
                                showCloseButton: true,
                                closeButtonText: 'Ok'
                            });
                            toast.present();
                            var prompt2 = _this.alertCtrl.create({
                                title: 'Form Customer',
                                message: "Please Input Again Total Pax and No. Sticker. Because Lost Connection.",
                                inputs: [
                                    {
                                        name: 'pax',
                                        type: 'number',
                                        placeholder: 'Pax'
                                    }, {
                                        name: 'nosticker',
                                        type: 'number',
                                        placeholder: 'No.Sticker'
                                    },
                                ],
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        handler: function (data) {
                                            //comment
                                        }
                                    },
                                    {
                                        text: 'Save',
                                        handler: function (data) {
                                            if (parseInt(data.pax.length) > 3) {
                                                var toast_1 = _this.toastCtrl.create({
                                                    message: 'Total pax may not exceed 3 digits',
                                                    position: 'top',
                                                    duration: 3000
                                                });
                                                toast_1.present();
                                                return;
                                            }
                                            if (parseInt(data.nosticker.length) > 4) {
                                                var toast_2 = _this.toastCtrl.create({
                                                    message: 'No Sticker may not exceed 4 digits',
                                                    position: 'top',
                                                    duration: 3000
                                                });
                                                toast_2.present();
                                                return;
                                            }
                                            _this.save_form_customer(data.pax, data.nosticker, _this.notrans);
                                        }
                                    }
                                ]
                            });
                            prompt2.present();
                            return;
                        });
                    }
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) {
                console.log(e);
            });
        }
    };
    OrderPage.prototype.addMenu = function () {
        var _this = this;
        var myModal = this.modalCtrl.create('AddmenuPage', { order_id: this.sumItem });
        myModal.present();
        myModal.onDidDismiss(function (data) {
            if (data.pcode) {
                _this.cloneItem(data.pcode, data.name, data.order_id);
                _this.insert_menu(data.pcode, data.name, data.price, data.order_id);
            }
        });
    };
    OrderPage.prototype.insert_menu = function (pcode, name, price, order_id) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            if (_this.new_order == 'Y') {
                _this.menu_tambahan = 'T';
            }
            else {
                _this.menu_tambahan = 'Y';
            }
            db.executeSql('INSERT INTO trans_order_detail (NoTrans,NoUrut,Tanggal,Waktu,Kasir,PCode,Name,Qty,Berat,Keterangan,Status,KdMeja,MenuBaru,Tambahan,Harga) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [_this.notrans, order_id, _this.DateWatch(_this.date), _this.TimeWatch(_this.time), _this.waiter, pcode, name, '1', '0', '', '0', _this.table, '0', _this.menu_tambahan, price])
                .then(function (res) {
                console.log('berhasil transaksi detail ', _this.notrans, _this.DateWatch(_this.date), pcode, name, order_id, price);
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    OrderPage.prototype.save_form_customer = function (pax, nosticker, notrans) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE trans_order_header SET TotalGuest=?,KdAgent=? WHERE NoTrans=? ', [pax, nosticker, notrans])
                .then(function (res) {
                _this.total_pax = pax;
                _this.no_sticker = nosticker;
                console.log('berhasil transaksi header ', notrans);
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    OrderPage.prototype.save_form_customer_edit = function (pax, nosticker, notrans) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE trans_order_header SET TotalGuest=?,KdAgent=? WHERE NoTrans=? ', [pax, nosticker, notrans])
                .then(function (res) {
                _this.total_pax = pax;
                _this.no_sticker = nosticker;
                console.log('berhasil edit transaksi header ', notrans);
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    OrderPage.prototype.view_customer = function (ttl_pax, stckr, notrans) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Form Customer',
            message: "Total Pax and No. Sticker.",
            inputs: [
                {
                    name: 'pax',
                    type: 'number',
                    value: ttl_pax,
                    placeholder: 'Pax'
                }, {
                    name: 'nosticker',
                    type: 'number',
                    value: stckr,
                    placeholder: 'No.Sticker'
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
                    text: 'Save Edit',
                    handler: function (data) {
                        if (parseInt(data.pax.length) > 3) {
                            var toast = _this.toastCtrl.create({
                                message: 'Total pax may not exceed 3 digits',
                                position: 'top',
                                duration: 3000
                            });
                            toast.present();
                            return;
                        }
                        if (parseInt(data.nosticker.length) != 4) {
                            var toast = _this.toastCtrl.create({
                                message: 'No Sticker must be 4 digits',
                                position: 'top',
                                duration: 3000
                            });
                            toast.present();
                            return;
                        }
                        _this.save_form_customer_edit(data.pax, data.nosticker, notrans);
                    }
                }
            ]
        });
        prompt.present();
    };
    OrderPage.prototype.quantity = function (param, food) {
        var _this = this;
        this.id_order = param;
        this.name_menu = food;
        var prompt = this.alertCtrl.create({
            title: 'Edit Quantity',
            //message: "For " + this.name_menu + ' menu',
            inputs: [
                {
                    name: 'edit_quantity',
                    type: 'number',
                    placeholder: 'Quantity'
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
                        //console.log('Saved clicked');
                        if (parseInt((_this.id_order)) == 1) {
                            _this.edit_qty01 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 2) {
                            _this.edit_qty02 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 3) {
                            _this.edit_qty03 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 4) {
                            _this.edit_qty04 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 5) {
                            _this.edit_qty05 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 6) {
                            _this.edit_qty06 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 7) {
                            _this.edit_qty07 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 8) {
                            _this.edit_qty08 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 9) {
                            _this.edit_qty09 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 10) {
                            _this.edit_qty10 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 11) {
                            _this.edit_qty11 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 12) {
                            _this.edit_qty12 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 13) {
                            _this.edit_qty13 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 14) {
                            _this.edit_qty14 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 15) {
                            _this.edit_qty15 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 16) {
                            _this.edit_qty16 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 17) {
                            _this.edit_qty17 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 18) {
                            _this.edit_qty18 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 19) {
                            _this.edit_qty19 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 20) {
                            _this.edit_qty20 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 21) {
                            _this.edit_qty21 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 22) {
                            _this.edit_qty22 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 23) {
                            _this.edit_qty23 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 24) {
                            _this.edit_qty24 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 25) {
                            _this.edit_qty25 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 26) {
                            _this.edit_qty26 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 27) {
                            _this.edit_qty27 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 28) {
                            _this.edit_qty28 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 29) {
                            _this.edit_qty29 = data.edit_quantity;
                        }
                        else if (parseInt((_this.id_order)) == 30) {
                            _this.edit_qty30 = data.edit_quantity;
                        }
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            if (_this.new_order == 'Y') {
                                _this.menu_tambahan = 'T';
                            }
                            else {
                                _this.menu_tambahan = 'Y';
                            }
                            db.executeSql('UPDATE trans_order_detail SET Qty=? WHERE NoTrans=? AND NoUrut=? AND Tambahan=?', [data.edit_quantity, _this.notrans, _this.id_order, _this.menu_tambahan])
                                .then(function (res) {
                                console.log('berhasil edit transaksi detail quantity ', data.edit_quantity, _this.notrans, _this.id_order, _this.new_order, _this.menu_tambahan);
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
    OrderPage.prototype.notes = function (param, food) {
        var _this = this;
        this.id_order = param;
        this.name_menu = food;
        var prompt = this.alertCtrl.create({
            title: 'Add Notes',
            //message: "For " + this.name_menu + ' menu',
            inputs: [
                {
                    name: 'notes_menu',
                    type: 'text',
                    placeholder: 'Notes'
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
                        //console.log('Saved clicked');
                        if (data.notes_menu == '') {
                            if (parseInt((_this.id_order)) == 1) {
                                _this.noted01 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 2) {
                                _this.noted02 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 3) {
                                _this.noted03 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 4) {
                                _this.noted04 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 5) {
                                _this.noted05 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 6) {
                                _this.noted06 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 7) {
                                _this.noted07 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 8) {
                                _this.noted08 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 9) {
                                _this.noted09 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 10) {
                                _this.noted10 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 11) {
                                _this.noted11 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 12) {
                                _this.noted12 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 13) {
                                _this.noted13 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 14) {
                                _this.noted14 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 15) {
                                _this.noted15 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 16) {
                                _this.noted16 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 17) {
                                _this.noted17 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 18) {
                                _this.noted18 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 19) {
                                _this.noted19 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 20) {
                                _this.noted10 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 21) {
                                _this.noted21 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 22) {
                                _this.noted22 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 23) {
                                _this.noted23 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 24) {
                                _this.noted24 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 25) {
                                _this.noted25 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 26) {
                                _this.noted26 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 27) {
                                _this.noted27 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 28) {
                                _this.noted28 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 29) {
                                _this.noted29 = 'N';
                            }
                            else if (parseInt((_this.id_order)) == 30) {
                                _this.noted30 = 'N';
                            }
                            if (parseInt((_this.id_order)) == 1) {
                                _this.note_menu01 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 2) {
                                _this.note_menu02 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 3) {
                                _this.note_menu03 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 4) {
                                _this.note_menu04 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 5) {
                                _this.note_menu05 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 6) {
                                _this.note_menu06 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 7) {
                                _this.note_menu07 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 8) {
                                _this.note_menu08 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 9) {
                                _this.note_menu09 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 10) {
                                _this.note_menu10 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 11) {
                                _this.note_menu11 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 12) {
                                _this.note_menu12 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 13) {
                                _this.note_menu13 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 14) {
                                _this.note_menu14 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 15) {
                                _this.note_menu15 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 16) {
                                _this.note_menu16 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 17) {
                                _this.note_menu17 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 18) {
                                _this.note_menu18 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 19) {
                                _this.note_menu19 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 20) {
                                _this.note_menu20 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 21) {
                                _this.note_menu21 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 22) {
                                _this.note_menu22 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 23) {
                                _this.note_menu23 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 24) {
                                _this.note_menu24 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 25) {
                                _this.note_menu25 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 26) {
                                _this.note_menu26 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 27) {
                                _this.note_menu27 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 28) {
                                _this.note_menu28 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 29) {
                                _this.note_menu29 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 30) {
                                _this.note_menu30 = data.notes_menu;
                            }
                        }
                        else {
                            if (parseInt((_this.id_order)) == 1) {
                                _this.noted01 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 2) {
                                _this.noted02 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 3) {
                                _this.noted03 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 4) {
                                _this.noted04 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 5) {
                                _this.noted05 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 6) {
                                _this.noted06 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 7) {
                                _this.noted07 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 8) {
                                _this.noted08 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 9) {
                                _this.noted09 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 10) {
                                _this.noted10 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 11) {
                                _this.noted11 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 12) {
                                _this.noted12 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 13) {
                                _this.noted13 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 14) {
                                _this.noted14 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 15) {
                                _this.noted15 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 16) {
                                _this.noted16 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 17) {
                                _this.noted17 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 18) {
                                _this.noted18 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 19) {
                                _this.noted19 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 20) {
                                _this.noted10 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 21) {
                                _this.noted21 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 22) {
                                _this.noted22 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 23) {
                                _this.noted23 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 24) {
                                _this.noted24 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 25) {
                                _this.noted25 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 26) {
                                _this.noted26 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 27) {
                                _this.noted27 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 28) {
                                _this.noted28 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 29) {
                                _this.noted29 = 'Y';
                            }
                            else if (parseInt((_this.id_order)) == 30) {
                                _this.noted30 = 'Y';
                            }
                            if (parseInt((_this.id_order)) == 1) {
                                _this.note_menu01 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 2) {
                                _this.note_menu02 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 3) {
                                _this.note_menu03 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 4) {
                                _this.note_menu04 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 5) {
                                _this.note_menu05 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 6) {
                                _this.note_menu06 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 7) {
                                _this.note_menu07 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 8) {
                                _this.note_menu08 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 9) {
                                _this.note_menu09 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 10) {
                                _this.note_menu10 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 11) {
                                _this.note_menu11 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 12) {
                                _this.note_menu12 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 13) {
                                _this.note_menu13 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 14) {
                                _this.note_menu14 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 15) {
                                _this.note_menu15 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 16) {
                                _this.note_menu16 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 17) {
                                _this.note_menu17 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 18) {
                                _this.note_menu18 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 19) {
                                _this.note_menu19 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 20) {
                                _this.note_menu20 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 21) {
                                _this.note_menu21 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 22) {
                                _this.note_menu22 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 23) {
                                _this.note_menu23 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 24) {
                                _this.note_menu24 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 25) {
                                _this.note_menu25 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 26) {
                                _this.note_menu26 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 27) {
                                _this.note_menu27 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 28) {
                                _this.note_menu28 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 29) {
                                _this.note_menu29 = data.notes_menu;
                            }
                            else if (parseInt((_this.id_order)) == 30) {
                                _this.note_menu30 = data.notes_menu;
                            }
                        }
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            if (_this.new_order == 'Y') {
                                _this.menu_tambahan = 'T';
                            }
                            else {
                                _this.menu_tambahan = 'Y';
                            }
                            db.executeSql('UPDATE trans_order_detail SET Keterangan=? WHERE NoTrans=? AND NoUrut=? AND Tambahan=? ', [data.notes_menu, _this.notrans, _this.id_order, _this.menu_tambahan])
                                .then(function (res) {
                                console.log('berhasil edit transaksi detail notes ', data.notes_menu, _this.notrans, _this.id_order);
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
    OrderPage.prototype.weight = function (param, food) {
        var _this = this;
        this.id_order = parseInt(param);
        this.name_menu = food;
        var prompt = this.alertCtrl.create({
            title: 'Input Weight',
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
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        //console.log('Saved clicked');
                        if (parseInt((_this.id_order)) == 1) {
                            _this.weight01 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 2) {
                            _this.weight02 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 3) {
                            _this.weight03 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 4) {
                            _this.weight04 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 5) {
                            _this.weight05 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 6) {
                            _this.weight06 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 7) {
                            _this.weight07 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 8) {
                            _this.weight08 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 9) {
                            _this.weight09 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 10) {
                            _this.weight10 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 11) {
                            _this.weight11 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 12) {
                            _this.weight12 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 13) {
                            _this.weight13 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 14) {
                            _this.weight14 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 15) {
                            _this.weight15 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 16) {
                            _this.weight16 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 17) {
                            _this.weight17 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 18) {
                            _this.weight18 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 19) {
                            _this.weight19 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 20) {
                            _this.weight20 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 21) {
                            _this.weight21 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 22) {
                            _this.weight22 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 23) {
                            _this.weight23 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 24) {
                            _this.weight24 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 25) {
                            _this.weight25 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 26) {
                            _this.weight26 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 27) {
                            _this.weight27 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 28) {
                            _this.weight28 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 29) {
                            _this.weight29 = data.input_weight;
                        }
                        else if (parseInt((_this.id_order)) == 30) {
                            _this.weight30 = data.input_weight;
                        }
                        _this.sqlite.create({
                            name: 'resto.db',
                            location: 'default'
                        }).then(function (db) {
                            if (_this.new_order == 'Y') {
                                _this.menu_tambahan = 'T';
                            }
                            else {
                                _this.menu_tambahan = 'Y';
                            }
                            db.executeSql('UPDATE trans_order_detail SET Berat=? WHERE NoTrans=? AND NoUrut=? AND Tambahan=?', [data.input_weight, _this.notrans, _this.id_order, _this.menu_tambahan])
                                .then(function (res) {
                                console.log('berhasil edit transaksi detail weight ', data.input_weight, _this.notrans, _this.id_order);
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
    OrderPage.prototype.weightOrder = function (param, food) {
        this.id_order = param;
        this.name_menu = food;
        this.weight(this.id_order, this.name_menu);
    };
    OrderPage.prototype.deleteOrder = function (param, food) {
        var _this = this;
        this.id_order = param;
        this.name_menu = food;
        document.getElementById('myorder' + this.id_order).style.display = "none";
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            if (_this.new_order == 'Y') {
                _this.menu_tambahan = 'T';
            }
            else {
                _this.menu_tambahan = 'Y';
            }
            db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=? AND NoUrut=? AND Tambahan=?', [_this.notrans, _this.id_order, _this.menu_tambahan])
                .then(function (res) {
                console.log('berhasil delete transaksi detail weight ', _this.notrans, _this.id_order);
            })
                .catch(function (e) {
                console.log(e);
            });
            db.executeSql('DELETE FROM trans_order_detail WHERE PCode=?', [''])
                .then(function (res) {
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    OrderPage.prototype.cloneItem = function (pcode, name, order_id) {
        var _this = this;
        console.log(pcode);
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM totalorder', [])
                .then(function (res) {
                var itemToClone = {
                    'myOrder': ''
                };
                _this.listOrder.push(itemToClone);
                _this.sumItem = _this.sumItem + 1;
                if (parseInt(order_id) == 1) {
                    _this.name_menu01 = name;
                }
                else if (parseInt(order_id) == 2) {
                    _this.name_menu02 = name;
                }
                else if (parseInt(order_id) == 3) {
                    _this.name_menu03 = name;
                }
                else if (parseInt(order_id) == 4) {
                    _this.name_menu04 = name;
                }
                else if (parseInt(order_id) == 5) {
                    _this.name_menu05 = name;
                }
                else if (parseInt(order_id) == 6) {
                    _this.name_menu06 = name;
                }
                else if (parseInt(order_id) == 7) {
                    _this.name_menu07 = name;
                }
                else if (parseInt(order_id) == 8) {
                    _this.name_menu08 = name;
                }
                else if (parseInt(order_id) == 9) {
                    _this.name_menu09 = name;
                }
                else if (parseInt(order_id) == 10) {
                    _this.name_menu10 = name;
                }
                else if (parseInt(order_id) == 11) {
                    _this.name_menu11 = name;
                }
                else if (parseInt(order_id) == 12) {
                    _this.name_menu12 = name;
                }
                else if (parseInt(order_id) == 13) {
                    _this.name_menu13 = name;
                }
                else if (parseInt(order_id) == 14) {
                    _this.name_menu14 = name;
                }
                else if (parseInt(order_id) == 15) {
                    _this.name_menu15 = name;
                }
                else if (parseInt(order_id) == 16) {
                    _this.name_menu16 = name;
                }
                else if (parseInt(order_id) == 17) {
                    _this.name_menu17 = name;
                }
                else if (parseInt(order_id) == 18) {
                    _this.name_menu18 = name;
                }
                else if (parseInt(order_id) == 19) {
                    _this.name_menu19 = name;
                }
                else if (parseInt(order_id) == 20) {
                    _this.name_menu20 = name;
                }
                else if (parseInt(order_id) == 21) {
                    _this.name_menu21 = name;
                }
                else if (parseInt(order_id) == 22) {
                    _this.name_menu22 = name;
                }
                else if (parseInt(order_id) == 23) {
                    _this.name_menu23 = name;
                }
                else if (parseInt(order_id) == 24) {
                    _this.name_menu24 = name;
                }
                else if (parseInt(order_id) == 25) {
                    _this.name_menu25 = name;
                }
                else if (parseInt(order_id) == 26) {
                    _this.name_menu26 = name;
                }
                else if (parseInt(order_id) == 27) {
                    _this.name_menu27 = name;
                }
                else if (parseInt(order_id) == 28) {
                    _this.name_menu28 = name;
                }
                else if (parseInt(order_id) == 29) {
                    _this.name_menu29 = name;
                }
                else if (parseInt(order_id) == 30) {
                    _this.name_menu30 = name;
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    OrderPage.prototype.finish_order = function () {
        var _this = this;
        if (this.total_pax == '') {
            var confirm_1 = this.alertCtrl.create({
                title: 'Danger!',
                message: 'Pax Or No.Sticker Is Empty.',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            //coding...
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.view_customer(_this.total_pax, _this.no_sticker, _this.notrans);
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else if (this.no_sticker == '') {
            var confirm_2 = this.alertCtrl.create({
                title: 'Danger!',
                message: 'Pax Or No.Sticker Is Empty.',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            //coding...
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.view_customer(_this.total_pax, _this.no_sticker, _this.notrans);
                        }
                    }
                ]
            });
            confirm_2.present();
        }
        else {
            var confirm_3 = this.alertCtrl.create({
                title: 'Finish Order',
                message: 'Are you sure order finish?',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            //coding...
                        }
                    },
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.sendingData();
                        }
                    }
                ]
            });
            confirm_3.present();
        }
    };
    OrderPage.prototype.sendingData = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: ""
        });
        loader.present();
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ip_api FROM setting', [])
                .then(function (res) {
                _this.ip_api = res.rows.item(0).ip_api;
                db.executeSql('SELECT * FROM trans_order_header WHERE NoTrans=?', [_this.notrans])
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
                    //di bundle jadi satu JSon
                    _this.postPvdr.postData(_this.ip_api, body, 'Insert').subscribe(function (data) {
                        if (data.success) {
                            db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [_this.notrans])
                                .then(function (has) {
                                _this.detail_order = [];
                                for (var i = 0; i < has.rows.length; i++) {
                                    var print;
                                    if (i + 1 == has.rows.length) {
                                        print = "Y";
                                    }
                                    else {
                                        print = "N";
                                    }
                                    _this.detail_order.push({
                                        NoTrans: data.no_order,
                                        NoUrut: has.rows.item(i).NoUrut,
                                        NoKassa: has.rows.item(i).NoKassa,
                                        Tanggal: _this.DateWatch(has.rows.item(i).Tanggal),
                                        Waktu: _this.TimeWatch(has.rows.item(i).Waktu),
                                        Kasir: has.rows.item(i).Kasir,
                                        KdStore: has.rows.item(i).KdStore,
                                        PCode: has.rows.item(i).PCode,
                                        Name: has.rows.item(i).Name,
                                        Qty: has.rows.item(i).Qty,
                                        Berat: has.rows.item(i).Berat,
                                        Satuan: has.rows.item(i).Satuan,
                                        Keterangan: has.rows.item(i).Keterangan,
                                        Note_split: has.rows.item(i).Note_split,
                                        Status: has.rows.item(i).Status,
                                        KdPersonal: has.rows.item(i).KdPersonal,
                                        KdMeja: res.rows.item(0).KdMeja,
                                        KdContact: has.rows.item(i).KdContact,
                                        MenuBaru: has.rows.item(i).MenuBaru,
                                        Tambahan: has.rows.item(i).Tambahan,
                                        cetak: print
                                    });
                                }
                                var body = {
                                    data_order: _this.detail_order,
                                    action: 'insertDetail'
                                };
                                _this.postPvdr.postData(_this.ip_api, body, 'Insert').subscribe(function (data) {
                                    if (data.success) {
                                        //coding...
                                    }
                                    else {
                                        //coding...
                                    }
                                });
                            }).catch(function (e) { return console.log(e); });
                        }
                        else {
                            //coding...
                        }
                    }, function (error) {
                        loader.dismiss();
                        var toast = _this.toastCtrl.create({
                            message: 'Lost Connection. This Order uses local storage.',
                            position: 'top',
                            showCloseButton: true,
                            closeButtonText: 'Ok'
                        });
                        toast.present();
                        db.executeSql('UPDATE trans_order_header SET Status=? WHERE  NoTrans=?', ['3', _this.notrans])
                            .then(function (res) {
                            //coding...
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
        loader.dismiss();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    OrderPage.prototype.TimeWatch = function (time) {
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
    OrderPage.prototype.DateWatch = function (dates) {
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
    OrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\order\order.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-title>List Order</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start>\n        <ion-icon name="contact" color="light"></ion-icon> {{waiter}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="getstart">\n  <div *ngIf="new_order!=\'Y\'">\n    <ion-card>\n      <ion-item color="light2">\n        <p color="dark" style="text-align:center"><b><span>Additional Menu</span></b></p>\n      </ion-item>\n    </ion-card>\n  </div>\n  <br>\n  <ion-item-group>\n    <ion-list>\n      <span *ngFor="let order of listOrder; let i = index">\n        <ion-item-sliding id="myorder{{i}}" *ngIf="i != 0">\n          <ion-item>\n            <ion-label><b><span *ngIf="i == 1">{{name_menu01}} </span>\n                <span *ngIf="i == 2">{{name_menu02}} </span>\n                <span *ngIf="i == 3">{{name_menu03}} </span>\n                <span *ngIf="i == 4">{{name_menu04}} </span>\n                <span *ngIf="i == 5">{{name_menu05}} </span>\n                <span *ngIf="i == 6">{{name_menu06}} </span>\n                <span *ngIf="i == 7">{{name_menu07}} </span>\n                <span *ngIf="i == 8">{{name_menu08}} </span>\n                <span *ngIf="i == 9">{{name_menu09}} </span>\n                <span *ngIf="i == 10">{{name_menu10}} </span>\n                <span *ngIf="i == 11">{{name_menu11}} </span>\n                <span *ngIf="i == 12">{{name_menu12}} </span>\n                <span *ngIf="i == 13">{{name_menu13}} </span>\n                <span *ngIf="i == 14">{{name_menu14}} </span>\n                <span *ngIf="i == 15">{{name_menu15}} </span>\n                <span *ngIf="i == 16">{{name_menu16}} </span>\n                <span *ngIf="i == 17">{{name_menu17}} </span>\n                <span *ngIf="i == 18">{{name_menu18}} </span>\n                <span *ngIf="i == 19">{{name_menu19}} </span>\n                <span *ngIf="i == 20">{{name_menu20}} </span>\n                <span *ngIf="i == 21">{{name_menu21}} </span>\n                <span *ngIf="i == 22">{{name_menu22}} </span>\n                <span *ngIf="i == 23">{{name_menu23}} </span>\n                <span *ngIf="i == 24">{{name_menu24}} </span>\n                <span *ngIf="i == 25">{{name_menu25}} </span>\n                <span *ngIf="i == 26">{{name_menu26}} </span>\n                <span *ngIf="i == 27">{{name_menu27}} </span>\n                <span *ngIf="i == 28">{{name_menu28}} </span>\n                <span *ngIf="i == 29">{{name_menu29}} </span>\n                <span *ngIf="i == 30">{{name_menu30}} </span></b>\n\n              <!-- baris ket-->\n              <br><span><span>\n                  <span *ngIf="i == 1">{{edit_qty01}} Pcs.</span> <span *ngIf="weight01 != 0 && i == 1">{{weight01}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted01 == \'Y\' && i == 1">Note : </span> <span *ngIf="i == 1">{{note_menu01}}</span>\n                  <span *ngIf="i == 2">{{edit_qty02}} Pcs.</span> <span *ngIf="weight02 != 0 && i == 2">{{weight02}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted02 == \'Y\' && i == 2">Note : </span> <span *ngIf="i == 2">{{note_menu02}}</span>\n                  <span *ngIf="i == 3">{{edit_qty03}} Pcs.</span> <span *ngIf="weight03 != 0 && i == 3">{{weight03}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted03 == \'Y\' && i == 3">Note : </span> <span *ngIf="i == 3">{{note_menu03}}</span>\n                  <span *ngIf="i == 4">{{edit_qty04}} Pcs.</span> <span *ngIf="weight04 != 0 && i == 4">{{weight04}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted04 == \'Y\' && i == 4">Note : </span> <span *ngIf="i == 4">{{note_menu04}}</span>\n                  <span *ngIf="i == 5">{{edit_qty05}} Pcs.</span> <span *ngIf="weight05 != 0 && i == 5">{{weight05}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted05 == \'Y\' && i == 5">Note : </span> <span *ngIf="i == 5">{{note_menu05}}</span>\n                  <span *ngIf="i == 6">{{edit_qty06}} Pcs.</span> <span *ngIf="weight06 != 0 && i == 6">{{weight06}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted06 == \'Y\' && i == 6">Note : </span> <span *ngIf="i == 6">{{note_menu06}}</span>\n                  <span *ngIf="i == 7">{{edit_qty07}} Pcs.</span> <span *ngIf="weight07 != 0 && i == 7">{{weight07}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted07 == \'Y\' && i == 7">Note : </span> <span *ngIf="i == 7">{{note_menu07}}</span>\n                  <span *ngIf="i == 8">{{edit_qty08}} Pcs.</span> <span *ngIf="weight08 != 0 && i == 8">{{weight08}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted08 == \'Y\' && i == 8">Note : </span> <span *ngIf="i == 8">{{note_menu08}}</span>\n                  <span *ngIf="i == 9">{{edit_qty09}} Pcs.</span> <span *ngIf="weight09 != 0 && i == 1">{{weight09}}\n                    gr.\n                  </span>\n                  <span *ngIf="noted09 == \'Y\' && i == 9">Note : </span> <span *ngIf="i == 9">{{note_menu09}}</span>\n                  <span *ngIf="i == 10">{{edit_qty10}} Pcs.</span> <span *ngIf="weight10 != 0 && i == 10">{{weight10}}\n                    gr.\n                  </span> <span *ngIf="noted10 == \'Y\' && i == 10">Note : </span> <span\n                    *ngIf="i == 10">{{note_menu10}}</span>\n\n\n                  <span *ngIf="i == 11">{{edit_qty11}} Pcs.</span> <span *ngIf="weight11 != 0 && i == 11">{{weight11}}\n                    gr.\n                  </span> <span *ngIf="noted11 == \'Y\' && i == 11">Note : </span> <span\n                    *ngIf="i == 11">{{note_menu11}}</span>\n                  <span *ngIf="i == 12">{{edit_qty12}} Pcs.</span> <span *ngIf="weight12 != 0 && i == 12">{{weight12}}\n                    gr.\n                  </span> <span *ngIf="noted12 == \'Y\' && i == 12">Note : </span> <span\n                    *ngIf="i == 12">{{note_menu12}}</span>\n                  <span *ngIf="i == 13">{{edit_qty13}} Pcs.</span> <span *ngIf="weight13 != 0 && i == 13">{{weight13}}\n                    gr.\n                  </span> <span *ngIf="noted13 == \'Y\' && i == 13">Note : </span> <span\n                    *ngIf="i == 13">{{note_menu13}}</span>\n                  <span *ngIf="i == 14">{{edit_qty14}} Pcs.</span> <span *ngIf="weight14 != 0 && i == 14">{{weight14}}\n                    gr.\n                  </span> <span *ngIf="noted14 == \'Y\' && i == 14">Note : </span> <span\n                    *ngIf="i == 14">{{note_menu14}}</span>\n                  <span *ngIf="i == 15">{{edit_qty15}} Pcs.</span> <span *ngIf="weight15 != 0 && i == 15">{{weight15}}\n                    gr.\n                  </span> <span *ngIf="noted15 == \'Y\' && i == 15">Note : </span> <span\n                    *ngIf="i == 15">{{note_menu15}}</span>\n                  <span *ngIf="i == 16">{{edit_qty16}} Pcs.</span> <span *ngIf="weight16 != 0 && i == 16">{{weight16}}\n                    gr.\n                  </span> <span *ngIf="noted16 == \'Y\' && i == 16">Note : </span> <span\n                    *ngIf="i == 16">{{note_menu16}}</span>\n                  <span *ngIf="i == 17">{{edit_qty17}} Pcs.</span> <span *ngIf="weight17 != 0 && i == 17">{{weight17}}\n                    gr.\n                  </span> <span *ngIf="noted17 == \'Y\' && i == 17">Note : </span> <span\n                    *ngIf="i == 17">{{note_menu17}}</span>\n                  <span *ngIf="i == 18">{{edit_qty18}} Pcs.</span> <span *ngIf="weight18 != 0 && i == 18">{{weight18}}\n                    gr.\n                  </span> <span *ngIf="noted18 == \'Y\' && i == 18">Note : </span> <span\n                    *ngIf="i == 18">{{note_menu18}}</span>\n                  <span *ngIf="i == 19">{{edit_qty19}} Pcs.</span> <span *ngIf="weight19 != 0 && i == 19">{{weight19}}\n                    gr.\n                  </span> <span *ngIf="noted19 == \'Y\' && i == 19">Note : </span> <span\n                    *ngIf="i == 19">{{note_menu19}}</span>\n                  <span *ngIf="i == 20">{{edit_qty20}} Pcs.</span> <span *ngIf="weight20 != 0 && i == 20">{{weight20}}\n                    gr.\n                  </span> <span *ngIf="noted20 == \'Y\' && i == 20">Note : </span> <span\n                    *ngIf="i == 20">{{note_menu20}}</span>\n\n\n                  <span *ngIf="i == 21">{{edit_qty21}} Pcs.</span> <span *ngIf="weight21 != 0 && i == 21">{{weight21}}\n                    gr.\n                  </span> <span *ngIf="noted21 == \'Y\' && i == 21">Note : </span> <span\n                    *ngIf="i == 21">{{note_menu21}}</span>\n                  <span *ngIf="i == 22">{{edit_qty22}} Pcs.</span> <span *ngIf="weight22 != 0 && i == 22">{{weight22}}\n                    gr.\n                  </span> <span *ngIf="noted22 == \'Y\' && i == 22">Note : </span> <span\n                    *ngIf="i == 22">{{note_menu22}}</span>\n                  <span *ngIf="i == 23">{{edit_qty23}} Pcs.</span> <span *ngIf="weight23 != 0 && i == 23">{{weight23}}\n                    gr.\n                  </span> <span *ngIf="noted23 == \'Y\' && i == 23">Note : </span> <span\n                    *ngIf="i == 23">{{note_menu23}}</span>\n                  <span *ngIf="i == 24">{{edit_qty24}} Pcs.</span> <span *ngIf="weight24 != 0 && i == 24">{{weight24}}\n                    gr.\n                  </span> <span *ngIf="noted24 == \'Y\' && i == 24">Note : </span> <span\n                    *ngIf="i == 24">{{note_menu24}}</span>\n                  <span *ngIf="i == 25">{{edit_qty25}} Pcs.</span> <span *ngIf="weight25 != 0 && i == 25">{{weight25}}\n                    gr.\n                  </span> <span *ngIf="noted25 == \'Y\' && i == 25">Note : </span> <span\n                    *ngIf="i == 25">{{note_menu25}}</span>\n                  <span *ngIf="i == 26">{{edit_qty26}} Pcs.</span> <span *ngIf="weight26 != 0 && i == 26">{{weight26}}\n                    gr.\n                  </span> <span *ngIf="noted26 == \'Y\' && i == 26">Note : </span> <span\n                    *ngIf="i == 26">{{note_menu26}}</span>\n                  <span *ngIf="i == 27">{{edit_qty27}} Pcs.</span> <span *ngIf="weight27 != 0 && i == 27">{{weight27}}\n                    gr.\n                  </span> <span *ngIf="noted27 == \'Y\' && i == 27">Note : </span> <span\n                    *ngIf="i == 27">{{note_menu27}}</span>\n                  <span *ngIf="i == 28">{{edit_qty28}} Pcs.</span> <span *ngIf="weight28 != 0 && i == 28">{{weight28}}\n                    gr.\n                  </span> <span *ngIf="noted28 == \'Y\' && i == 28">Note : </span> <span\n                    *ngIf="i == 28">{{note_menu28}}</span>\n                  <span *ngIf="i == 29">{{edit_qty29}} Pcs.</span> <span *ngIf="weight29 != 0 && i == 29">{{weight29}}\n                    gr.\n                  </span> <span *ngIf="noted29 == \'Y\' && i == 29">Note : </span> <span\n                    *ngIf="i == 29">{{note_menu29}}</span>\n                  <span *ngIf="i == 30">{{edit_qty30}} Pcs.</span> <span *ngIf="weight30 != 0 && i == 30">{{weight30}}\n                    gr.\n                  </span> <span *ngIf="noted30 == \'Y\' && i == 30">Note : </span> <span\n                    *ngIf="i == 30">{{note_menu30}}</span>\n                </span></span></ion-label>\n            <h3 item-end>\n              <ion-icon style="font-size: 30px" color="dark" name="add-circle" (click)="quantity(i,\'...\')"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon style="font-size: 30px" color="dark" name="create" (click)="notes(i,\'...\')"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n            </h3>\n          </ion-item>\n          <ion-item-options side="right">\n            <button ion-button color="natura" (click)="weightOrder(i,\'...\')">\n              <ion-icon style="font-size: 30px" name="pizza"></ion-icon>\n            </button>\n            <button ion-button color="danger" (click)="deleteOrder(i,\'...\')">\n              <ion-icon style="font-size: 30px" name="trash"></ion-icon>\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </span>\n    </ion-list>\n  </ion-item-group>\n\n  <ion-fab bottom right>\n    <button ion-fab color="grey_" (click)="addMenu()">\n      <ion-icon name=\'create\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n\n\n<ion-footer>\n  <ion-navbar color="grey_">\n\n    <ion-row>\n      <ion-col col-3>\n        <ion-buttons style="padding-left: 30px">\n          <button ion-button icon-only (click)="view_customer(total_pax,no_sticker,notrans)">\n            <ion-icon name="contacts"></ion-icon>\n            <div>{{total_pax}}</div>\n          </button>\n        </ion-buttons>\n      </ion-col>\n      <ion-col col-3>\n        <ion-buttons style="padding-left: 30px">\n          <button ion-button icon-only (click)="view_customer(total_pax,no_sticker,notrans)">\n            <ion-icon name="happy"></ion-icon>\n            <div>{{no_sticker}}</div>\n          </button>\n        </ion-buttons>\n      </ion-col>\n      <ion-col col-3 style="padding-left: 30px">\n        <ion-buttons>\n          <button ion-button icon-only>\n            <ion-icon name="clipboard"></ion-icon>\n            <div>{{table}}</div>\n          </button>\n        </ion-buttons>\n      </ion-col>\n      <ion-col col-3 style="padding-left: 30px">\n        <ion-buttons>\n          <button ion-button icon-only (click)="finish_order()">\n            <ion-icon name="log-out"></ion-icon>\n            <!-- <div>{{sumItem}}</div> -->\n          </button>\n        </ion-buttons>\n\n\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-footer>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\order\order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_4__providers_post_provider__["a" /* PostProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], OrderPage);
    return OrderPage;
}());

//# sourceMappingURL=order.js.map

/***/ })

});
//# sourceMappingURL=8.js.map