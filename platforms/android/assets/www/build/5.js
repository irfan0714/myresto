webpackJsonp([5],{

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitBillDetailsPageModule", function() { return SplitBillDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__split_bill_details__ = __webpack_require__(702);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SplitBillDetailsPageModule = (function () {
    function SplitBillDetailsPageModule() {
    }
    SplitBillDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__split_bill_details__["a" /* SplitBillDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__split_bill_details__["a" /* SplitBillDetailsPage */]),
            ],
        })
    ], SplitBillDetailsPageModule);
    return SplitBillDetailsPageModule;
}());

//# sourceMappingURL=split-bill-details.module.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplitBillDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SplitBillDetailsPage = (function () {
    function SplitBillDetailsPage(navCtrl, navParams, sqlite, toastCtrl, storage, loadingCtrl, postPvdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.postPvdr = postPvdr;
        this.Localside = 'N';
        this.value_tambah = 0;
        this.value_kurang = 0;
        this.val_kirim = 0;
        this.open_menu = 'Y';
        this.close_menu = 'N';
        this.checking_list_menu = 'N';
        this.today = new Date();
        this.date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
        this.time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
        this.nows = this.date + ' ' + this.time;
        this.getCurrentData(navParams.get("table"), navParams.get("num_split"), navParams.get("waiters"), navParams.get("guest"), navParams.get("no_sticker"));
        this.new_order();
        this.loadserver();
    }
    SplitBillDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SplitBillDetailPage');
    };
    SplitBillDetailsPage.prototype.getCurrentData = function (table, num_split, waiters, pax, sticker) {
        this.table = table;
        this.num_split = num_split;
        this.waiter = waiters;
        this.guest = pax;
        this.sticker = sticker;
    };
    SplitBillDetailsPage.prototype.new_order = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            for (var i = 0; i < parseInt(_this.num_split); i++) {
                var abjad = _this.getAbjad(i);
                _this.table_split = _this.table + '' + abjad;
                _this.notrans = '99' + i + '' + _this.today.getFullYear() + '' + _this.benarMonth(_this.today.getMonth() + 1) + '' + _this.benarDate(_this.today.getDate()) + '' + _this.benarHours(_this.today.getHours()) + '' + _this.benarMinutes(_this.today.getMinutes()) + '' + _this.benarSecond(_this.today.getSeconds());
                _this.datanya(_this.table_split, _this.notrans);
            }
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.datanya = function (tablez, notranz) {
        var _this = this;
        this.splitdetail = [];
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            //delete header
            db.executeSql('DELETE FROM trans_order_header WHERE Tanggal=? AND KdMeja=?', [_this.date, tablez])
                .then(function (res1) {
                console.log('delete trans_order_header', tablez);
                //delete detail
                db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal=? AND KdMeja=?', [_this.date, tablez])
                    .then(function (res2) {
                    console.log('delete trans_order_detail', tablez);
                    //get next insert
                    db.executeSql('INSERT INTO trans_order_header (NoTrans,Tanggal,Waktu,Kasir,KdMeja, Status, TotalGuest, KdAgent) VALUES(?,?,?,?,?,?,?,?)', [notranz, _this.date, _this.TimeWatch(_this.time), _this.waiter, tablez, '0', _this.guest, _this.sticker])
                        .then(function (res3) {
                        console.log('sukses new table', notranz, tablez, _this.waiter);
                        _this.splitdetail.push({
                            table_id: tablez,
                            order_id: notranz
                        });
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                })
                    .catch(function (e) {
                    console.log(e);
                });
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.loadserver = function () {
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
                    _this.getMenu(_this.ip_api, _this.table);
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.getAbjad = function (a) {
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
        else if (a == 6) {
            hrf = "g";
        }
        else if (a == 7) {
            hrf = "h";
        }
        else if (a == 8) {
            hrf = "i";
        }
        else if (a == 9) {
            hrf = "j";
        }
        return hrf;
    };
    SplitBillDetailsPage.prototype.getMenu = function (ip_api, no_table) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please Waiting ..."
        });
        loader.present();
        //start sending to API
        var body = {
            table: no_table,
            action: 'getListOrderDetailForSplitTry'
        };
        this.postPvdr.postData(ip_api, body, 'Read').subscribe(function (data) {
            if (data.success) {
                _this.sqlite.create({
                    name: 'resto.db',
                    location: 'default'
                }).then(function (db) {
                    db.executeSql('DELETE FROM trans_order_header WHERE Tanggal=? AND Status=? AND KdMeja=?', [_this.date, '0', no_table])
                        .then(function (res) {
                        db.executeSql('DELETE FROM trans_order_detail WHERE Tanggal=? AND KdMeja=?', [_this.date, no_table])
                            .then(function (res) {
                            loader.dismiss();
                            _this.storage.set('table_trans_header_storage', data.dataListOrderHeader);
                            _this.storage.set('table_trans_detail_storage', data.dataListOrderDetail);
                            _this.storage.get('table_trans_header_storage').then(function (rez) {
                                var _loop_1 = function (i) {
                                    db.executeSql('INSERT INTO trans_order_header (NoTrans,NoKassa,Tanggal,Waktu,Kasir,TotalItem,TotalQty,TotalServe,Status,KdMeja,TotalGuest,KdAgent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [rez[i]['NoTrans'], rez[i]['NoKassa'], rez[i]['Tanggal'], rez[i]['Waktu'], rez[i]['Kasir'], rez[i]['TotalItem'], rez[i]['TotalQty'], rez[i]['TotalServe'], rez[i]['Status'], rez[i]['KdMeja'], rez[i]['TotalGuest'], rez[i]['KdAgent']])
                                        .then(function (rex) {
                                        if (i + 1 == rez.length) {
                                            _this.Order_Asli = rez[i]['NoTrans'];
                                            _this.storage.get('table_trans_detail_storage').then(function (val) {
                                                var _loop_2 = function (j) {
                                                    db.executeSql('INSERT INTO trans_order_detail (NoTrans,NoUrut,NoKassa,Tanggal,Waktu,Kasir,PCode,Name,Qty,Berat,Keterangan,Status,KdMeja,MenuBaru,Tambahan,QtyCheckSplit) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [val[j]['NoTrans'], val[j]['NoUrut'], val[j]['NoKassa'], val[j]['Tanggal'], val[j]['Waktu'], val[j]['Kasir'], val[j]['PCode'], val[j]['NamaLengkap'], val[j]['Qty'], val[j]['Berat'], val[j]['Keterangan'], val[j]['Status'], val[j]['KdMeja'], val[j]['MenuBaru'], val[j]['Tambahan'], '0'])
                                                        .then(function (rek) {
                                                        if (j + 1 == val.length) {
                                                            db.executeSql('SELECT * FROM trans_order_detail WHERE Tanggal=? AND KdMeja=?', [_this.date, no_table])
                                                                .then(function (keys) {
                                                                _this.listing_menu = [];
                                                                _this.checking_listing_menu = [];
                                                                for (var x = 0; x < keys.rows.length; x++) {
                                                                    _this.listing_menu.push({
                                                                        Nm: keys.rows.item(x).Name,
                                                                        PCode: keys.rows.item(x).PCode,
                                                                        Sts: keys.rows.item(x).Status,
                                                                        Quty: 0,
                                                                        Wght: keys.rows.item(x).Berat,
                                                                        Nt: keys.rows.item(x).Keterangan
                                                                    });
                                                                }
                                                                for (var y = 0; y < keys.rows.length; y++) {
                                                                    _this.checking_listing_menu.push({
                                                                        name: keys.rows.item(y).Name,
                                                                        quantity: keys.rows.item(y).Qty
                                                                    });
                                                                }
                                                            }).catch(function (e) { return console.log(e); });
                                                        }
                                                    }).catch(function (e) { return console.log(e); });
                                                };
                                                for (var j = 0; j < val.length; j++) {
                                                    _loop_2(j);
                                                }
                                            });
                                        }
                                    }).catch(function (e) { return console.log(e); });
                                };
                                for (var i = 0; i < rez.length; i++) {
                                    _loop_1(i);
                                }
                            });
                        }).catch(function (e) { return console.log(e); });
                    }).catch(function (e) { return console.log(e); });
                }).catch(function (e) {
                    console.log(e);
                });
            }
            else {
                loader.dismiss();
            }
        });
    };
    SplitBillDetailsPage.prototype.open = function (table, i) {
        var gab = table + '' + i;
        document.getElementById(gab).style.display = "";
        document.getElementById('open' + gab).style.display = "none";
        document.getElementById('close' + gab).style.display = "";
    };
    SplitBillDetailsPage.prototype.close = function (table, i) {
        var gab = table + '' + i;
        document.getElementById(gab).style.display = "none";
        document.getElementById('open' + gab).style.display = "";
        document.getElementById('close' + gab).style.display = "none";
    };
    SplitBillDetailsPage.prototype.btn_menu_open = function () {
        this.open_menu = 'N';
        this.close_menu = 'Y';
        this.checking_list_menu = 'Y';
    };
    SplitBillDetailsPage.prototype.btn_menu_close = function () {
        this.open_menu = 'Y';
        this.close_menu = 'N';
        this.checking_list_menu = 'N';
    };
    SplitBillDetailsPage.prototype.tambah = function (id, table, pcode, table_asal, trans, names) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [_this.date, table_asal, pcode])
                .then(function (res) {
                console.log('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal =', _this.date, ' AND KdMeja =', table_asal, ' AND PCode =', pcode, ' GROUP BY PCode');
                console.log('QtySplit', res.rows.item(0).QtyCheckSplit);
                console.log('Qty', res.rows.item(0).Qty);
                if (parseInt(res.rows.item(0).QtyCheckSplit) == parseInt(res.rows.item(0).Qty)) {
                    var toast = _this.toastCtrl.create({
                        message: 'Opps Sorry... Quantity exceeds order.',
                        position: 'top',
                        showCloseButton: true,
                        closeButtonText: 'Ok'
                    });
                    toast.present();
                }
                else {
                    var gab = 'det_' + table + '' + id;
                    var a = parseFloat(document.getElementById(gab).innerHTML);
                    _this.value_tambah = a + 1;
                    document.getElementById(gab).innerHTML = _this.value_tambah + '';
                    //find QtyCekSplit SQLite
                    db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [_this.date, table_asal, pcode])
                        .then(function (reis) {
                        console.log('QtySplit New', reis.rows.item(0).QtyCheckSplit);
                        var AddQtySplit = parseInt(reis.rows.item(0).QtyCheckSplit) + 1;
                        //next update QtyCheckSplit
                        db.executeSql('UPDATE trans_order_detail SET QtyCheckSplit=? WHERE Tanggal=? AND KdMeja=? AND PCode=?', [AddQtySplit, _this.date, table_asal, pcode])
                            .then(function (vals) {
                            console.log('sukses ', AddQtySplit);
                            //the first ckeck is empty
                            db.executeSql('SELECT * FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=?', [_this.date, table, pcode])
                                .then(function (ress) {
                                console.log('SELECT * FROM trans_order_detail WHERE Tanggal=', _this.date, ' AND KdMeja=', table, 'AND PCode=', pcode);
                                if (ress.rows.length > 0) {
                                    //update to new table
                                    db.executeSql('UPDATE trans_order_detail SET Qty=? WHERE NoTrans=? AND PCode=?', [trans, _this.value_tambah])
                                        .then(function (resy) {
                                        //console.log(res);
                                        console.log('berhasil update transaksi detail ');
                                    })
                                        .catch(function (e) {
                                        console.log(e);
                                    });
                                }
                                else {
                                    //insert to new table
                                    db.executeSql('INSERT INTO trans_order_detail (NoTrans,NoUrut,Tanggal,Waktu,Kasir,PCode,Name,Qty,Status,KdMeja,KdContact,MenuBaru,Tambahan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [trans, id, _this.date, _this.time, _this.waiter, pcode, names, _this.value_tambah, '1', table, _this.Order_Asli, '0', 'T'])
                                        .then(function (resx) {
                                        //console.log(res);
                                        console.log('berhasil insert transaksi detail ');
                                    })
                                        .catch(function (e) {
                                        console.log(e);
                                    });
                                }
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }).catch(function (e) { return console.log(e); });
                    }).catch(function (e) { return console.log(e); });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.kurang = function (id, table, pcode, table_asal) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [_this.date, table_asal, pcode])
                .then(function (res) {
                console.log('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal =', _this.date, ' AND KdMeja =', table_asal, ' AND PCode =', pcode, ' GROUP BY PCode');
                console.log('QtySplit', res.rows.item(0).QtyCheckSplit);
                console.log('Qty', res.rows.item(0).Qty);
                if (parseInt(res.rows.item(0).QtyCheckSplit) == 0) {
                    var toast = _this.toastCtrl.create({
                        message: 'Opps Sorry... Quantity less than zero.',
                        position: 'top',
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                    });
                    toast.onDidDismiss(function (data, role) {
                        if (role == 'close') {
                            var toast_1 = _this.toastCtrl.create({
                                message: 'Thank You...',
                                position: 'top',
                                duration: 3000
                            });
                            toast_1.present();
                        }
                    });
                    toast.present();
                }
                else {
                    var gab = 'det_' + table + '' + id;
                    var a = parseFloat(document.getElementById(gab).innerHTML);
                    _this.value_kurang = a - 1;
                    document.getElementById(gab).innerHTML = _this.value_kurang + '';
                    db.executeSql('SELECT PCode, SUM(Qty) AS Qty, SUM(QtyCheckSplit) AS QtyCheckSplit FROM trans_order_detail WHERE Tanggal=? AND KdMeja=? AND PCode=? GROUP BY PCode', [_this.date, table_asal, pcode])
                        .then(function (reis) {
                        var MinusQtySplit = parseInt(reis.rows.item(0).QtyCheckSplit) - 1;
                        db.executeSql('UPDATE trans_order_detail SET QtyCheckSplit=? WHERE Tanggal=? AND KdMeja=? AND PCode=?', [MinusQtySplit, _this.date, table_asal, pcode])
                            .then(function (vals) {
                            //comment 
                        }).catch(function (e) { return console.log(e); });
                    }).catch(function (e) { return console.log(e); });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.remove_split = function (order_temp, tbl, i) {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                .then(function (res) {
                if (res.rows.length > 0) {
                    var _loop_3 = function (i_1) {
                        p_code = res.rows.item(i_1).PCode;
                        Qty_Split = parseInt(res.rows.item(i_1).Qty);
                        db.executeSql('SELECT * FROM trans_order_detail WHERE NoTrans=? AND Tanggal=? AND KdMeja=? AND PCode=?', [_this.Order_Asli, _this.date, _this.table, p_code])
                            .then(function (resk) {
                            if (resk.rows.length > 0) {
                                var Qty_Split_a;
                                Qty_Split_a = parseInt(resk.rows.item(0).QtyCheckSplit);
                                db.executeSql('UPDATE trans_order_detail SET QtyCheckSplit=? WHERE NoTrans=? AND Tanggal=? AND KdMeja=? AND PCode=?', [Qty_Split_a - Qty_Split, _this.Order_Asli, _this.date, _this.table, p_code])
                                    .then(function (rest) {
                                    if (i_1 + 1 == res.rows.length) {
                                        db.executeSql('DELETE FROM trans_order_header WHERE NoTrans=?', [order_temp])
                                            .then(function (rese) {
                                            db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                                                .then(function (resi) {
                                                var toast = _this.toastCtrl.create({
                                                    message: 'Delete successfully',
                                                    position: 'top',
                                                    duration: 3000
                                                });
                                                toast.present();
                                                document.getElementById(order_temp).style.display = "none";
                                                document.getElementById(tbl + '' + i_1).style.display = "none";
                                            })
                                                .catch(function (e) {
                                                console.log(e);
                                            });
                                        })
                                            .catch(function (e) {
                                            console.log(e);
                                        });
                                    }
                                })
                                    .catch(function (e) {
                                    console.log(e);
                                });
                            }
                            else {
                                db.executeSql('DELETE FROM trans_order_header WHERE NoTrans=?', [order_temp])
                                    .then(function (rese) {
                                    db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                                        .then(function (resi) {
                                        var toast = _this.toastCtrl.create({
                                            message: 'Delete successfully',
                                            position: 'top',
                                            duration: 3000
                                        });
                                        toast.present();
                                        document.getElementById(order_temp).style.display = "none";
                                        document.getElementById(tbl + '' + i_1).style.display = "none";
                                    })
                                        .catch(function (e) {
                                        console.log(e);
                                    });
                                })
                                    .catch(function (e) {
                                    console.log(e);
                                });
                            }
                        })
                            .catch(function (e) {
                            console.log(e);
                        });
                    };
                    var Qty_Split, p_code;
                    for (var i_1 = 0; i_1 < res.rows.length; i_1++) {
                        _loop_3(i_1);
                    }
                }
                else {
                    db.executeSql('DELETE FROM trans_order_header WHERE NoTrans=?', [order_temp])
                        .then(function (rese) {
                        db.executeSql('DELETE FROM trans_order_detail WHERE NoTrans=?', [order_temp])
                            .then(function (resi) {
                            var toast = _this.toastCtrl.create({
                                message: 'Delete successfully',
                                position: 'top',
                                duration: 3000
                            });
                            toast.present();
                            document.getElementById(order_temp).style.display = "none";
                            document.getElementById(tbl + '' + i).style.display = "none";
                        })
                            .catch(function (e) {
                            console.log(e);
                        });
                    })
                        .catch(function (e) {
                        console.log(e);
                    });
                }
            })
                .catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.sendingData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'resto.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT * FROM trans_order_detail WHERE NoTrans=?', [_this.Order_Asli])
                .then(function (res) {
                _this.val_kirim = 0;
                for (var i = 0; i < res.rows.length; i++) {
                    var QtyRujukan = parseInt(res.rows.item(i).Qty);
                    var QtySplitRujukan = parseInt(res.rows.item(i).QtyCheckSplit);
                    var NameRujukan = res.rows.item(i).Name;
                    if (QtyRujukan != QtySplitRujukan) {
                        var toast = _this.toastCtrl.create({
                            message: 'Opps Sorry, ' + NameRujukan + ' Not Valid. still not enough.',
                            position: 'top',
                            showCloseButton: true,
                            closeButtonText: 'Ok',
                        });
                        toast.onDidDismiss(function (data, role) {
                            if (role == 'close') {
                                var toast_2 = _this.toastCtrl.create({
                                    message: 'Thank You...',
                                    position: 'top',
                                    duration: 3000
                                });
                                toast_2.present();
                            }
                        });
                        toast.present();
                        _this.val_kirim--;
                    }
                    else {
                        _this.val_kirim++;
                    }
                }
                if (_this.val_kirim == res.rows.length) {
                    console.log('kirim cuys...');
                    var _loop_4 = function (i) {
                        abjad = _this.getAbjad(i);
                        _this.table_split_sending = _this.table + '' + abjad;
                        db.executeSql('SELECT * FROM trans_order_header WHERE Tanggal=? AND KdMeja=? AND TotalGuest=? AND KdAgent=?', [_this.date, _this.table_split_sending, _this.guest, _this.sticker])
                            .then(function (resf) {
                            _this.sendingDataKeServer(resf.rows.item(0).NoTrans, i);
                        }).catch(function (e) {
                            console.log(e);
                        });
                    };
                    var abjad;
                    for (var i = 0; i < parseInt(_this.num_split); i++) {
                        _loop_4(i);
                    }
                }
                else {
                    console.log('gagal kirim cuys...');
                }
            }).catch(function (e) {
                console.log(e);
            });
        }).catch(function (e) {
            console.log(e);
        });
    };
    SplitBillDetailsPage.prototype.sendingDataKeServer = function (no_order_temp, ke) {
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
                            db.executeSql('SELECT * FROM trans_order_detail a WHERE a.NoTrans=?', [no_order_temp])
                                .then(function (res) {
                                _this.detail_order = [];
                                for (var i = 0; i < res.rows.length; i++) {
                                    var print;
                                    if (i + 1 == res.rows.length) {
                                        print = "Y";
                                        loader.dismiss();
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
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
                                                NoTransSemula: _this.Order_Asli,
                                                action: 'voidReferensOrderSplit'
                                            };
                                            //sending process
                                            _this.postPvdr.postData(_this.ip_api, body_2, 'Update').subscribe(function (datax) {
                                                if (datax.success) {
                                                    console.log('Oke berhasil update split order yang asli');
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
                            if (ke + 1 == parseInt(_this.num_split)) {
                                loader.dismiss();
                                _this.navCtrl.push('SplitBillPage');
                            }
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
    SplitBillDetailsPage.prototype.TimeWatch = function (time) {
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
    SplitBillDetailsPage.prototype.DateWatch = function (dates) {
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
    SplitBillDetailsPage.prototype.benarMonth = function (m) {
        if (m * 1 < 10) {
            m = '0' + m;
        }
        else {
            m = m;
        }
        return m;
    };
    SplitBillDetailsPage.prototype.benarDate = function (d) {
        if (d * 1 < 10) {
            d = '0' + d;
        }
        else {
            d = d;
        }
        return d;
    };
    SplitBillDetailsPage.prototype.benarHours = function (h) {
        if (h * 1 < 10) {
            h = '0' + h;
        }
        else {
            h = h;
        }
        return h;
    };
    SplitBillDetailsPage.prototype.benarMinutes = function (i) {
        if (i * 1 < 10) {
            i = '0' + i;
        }
        else {
            i = i;
        }
        return i;
    };
    SplitBillDetailsPage.prototype.benarSecond = function (s) {
        if (s * 1 < 10) {
            s = '0' + s;
        }
        else {
            s = s;
        }
        return s;
    };
    SplitBillDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-split-bill-details',template:/*ion-inline-start:"D:\ionic\Project\orderlite\src\pages\split-bill-details\split-bill-details.html"*/`<ion-header>\n  <ion-navbar color="grey_">\n    <ion-buttons start>\n      <button *ngIf="open_menu==\'Y\'" ion-button icon-only (click)="btn_menu_open(NoSticker)">\n        <ion-icon name="eye"></ion-icon>\n      </button>\n      <button *ngIf="open_menu==\'N\'" ion-button icon-only (click)="btn_menu_close(NoSticker)">\n        <ion-icon name="eye-off"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Split Bill {{table}}</ion-title>\n  </ion-navbar>\n\n  <ion-navbar color="light2" *ngIf="checking_list_menu==\'Y\'">\n    <div>\n      <ion-list no-border padding>\n        <ion-item *ngFor="let key of checking_listing_menu">\n          <ion-icon name=\'checkbox-outline\' item-start></ion-icon>\n          {{key.name}}\n          <ion-note item-end>\n            {{key.quantity}}\n          </ion-note>\n        </ion-item>\n      </ion-list>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="getstart">\n  <ion-list>\n\n    <span *ngFor="let val of splitdetail;let i = index;">\n      <ion-item-sliding id="{{val.order_id}}">\n        <ion-item>\n          <ion-avatar item-start>\n            <img src="assets/imgs/ica-slidebox-img-1.png">\n          </ion-avatar>\n          <h2><b>{{val.table_id}}</b></h2>\n          <p>Split Bill {{i+1}} / No.Temp Order : {{val.order_id}}</p>\n          <button color="dark" ion-button clear item-end id="{{\'open\'+val.table_id+\'\'+i}}" (click)="open(val.table_id,i)">\n            <ion-icon style="font-size: 30px" name="arrow-dropright"></ion-icon>\n          </button>\n          <button color="dark" style="display:none;" ion-button clear item-end id="{{\'close\'+val.table_id+\'\'+i}}"\n            (click)="close(val.table_id,i)">\n            <ion-icon style="font-size: 30px" name="arrow-dropdown"></ion-icon>\n          </button>\n        </ion-item>\n        <!-- <ion-item-options side="left">\n          <button ion-button color="primary">\n            <ion-icon name="trash"></ion-icon>\n            DEL\n          </button>\n          <button ion-button color="secondary">\n            <ion-icon name="trash"></ion-icon>\n            DEL\n          </button>\n        </ion-item-options> -->\n        <ion-item-options side="right">\n          <button ion-button color="danger" (click)="remove_split(val.order_id, val.table_id, i)">\n            <ion-icon style="font-size: 30px" name="trash"></ion-icon>\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n\n      <div style="display:none" id="{{val.table_id+\'\'+i}}">\n        <span *ngFor="let key of listing_menu;let j = index;">\n          <ion-item><b>{{key.Nm}}</b> / <span id="{{\'det_\'+val.table_id+\'\'+j}}"> {{key.Quty}} </span> Pcs\n            <h3 item-end>\n              <ion-icon style="font-size: 30px" color="dark" name="add-circle" (click)="tambah(j,val.table_id,key.PCode,table,val.order_id,key.Nm)"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n              <ion-icon style="font-size: 30px" color="dark" name="remove-circle" (click)="kurang(j,val.table_id,key.PCode,table)"></ion-icon>\n              <ion-icon color="dark" name="listing"></ion-icon>\n            </h3>\n          </ion-item>\n        </span>\n      </div>\n    </span>\n\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="grey_" (click)="sendingData()">\n      <ion-icon name=\'paper-plane\'></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n`/*ion-inline-end:"D:\ionic\Project\orderlite\src\pages\split-bill-details\split-bill-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_Storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_post_provider__["a" /* PostProvider */]])
    ], SplitBillDetailsPage);
    return SplitBillDetailsPage;
}());

//# sourceMappingURL=split-bill-details.js.map

/***/ })

});
//# sourceMappingURL=5.js.map