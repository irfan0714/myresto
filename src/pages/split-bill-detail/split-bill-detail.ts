import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';

@IonicPage()
@Component({
  selector: 'page-split-bill-detail',
  templateUrl: 'split-bill-detail.html',
})
export class SplitBillDetailPage {

  table: any;
  num_split: any;
  splitdetail: any;
  ip_api: any;
  listing_menu: any;
  checking_listing_menu: any;

  value_tambah: number = 0;
  value_kurang: number = 0;

  open_menu = 'Y';
  close_menu = 'N';
  checking_list_menu = 'N';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    public loadingCtrl: LoadingController,
    private postPvdr: PostProvider) {
    this.getCurrentData(navParams.get("table"), navParams.get("num_split"));
    this.getSplitDetail();
    this.loadserver();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplitBillDetailPage');
  }

  getCurrentData(table, num_split) {
    this.table = table;
    this.num_split = num_split;
  }

  loadserver() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('disini');

      db.executeSql('SELECT * FROM setting', [])
        .then(res => {
          console.log(res);
          if (res.rows.item(0).ip_api != '') {
            this.ip_api = res.rows.item(0).ip_api;
            this.getMenu(this.ip_api, this.table)
          }

        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  getSplitDetail() {
    this.splitdetail = [];
    for (let i = 0; i < parseInt(this.num_split); i++) {
      var abjad = this.getAbjad(i);
      this.splitdetail.push(
        {
          table_id: this.table + '' + abjad,
        });
    }
  }

  getAbjad(a) {
    var hrf;
    if (a == 0) {
      hrf = "a";
    } else if (a == 1) {
      hrf = "b";
    } else if (a == 2) {
      hrf = "c";
    } else if (a == 3) {
      hrf = "d";
    } else if (a == 4) {
      hrf = "e";
    } else if (a == 5) {
      hrf = "f";
    }

    return hrf;
  }

  getMenu(ip_api, no_table) {

    const loader = this.loadingCtrl.create({
      content: "Please Waiting..."
    });
    loader.present();

    //start sending to API
    let body = {
      table: no_table,
      action: 'getListOrderDetailForSplit'
    };

    //get process
    this.postPvdr.postData(ip_api, body, 'Read').subscribe((data) => {

      if (data.success) {
        loader.dismiss();

        //detail
        console.log(data.dataListOrderDetail);
        this.listing_menu = [];
        this.checking_listing_menu = [];

        for (var i = 0; i < data.dataListOrderDetail.length; i++) {
          this.listing_menu.push(
            {
              Nm: data.dataListOrderDetail[i]['NamaLengkap'],
              PCode: data.dataListOrderDetail[i]['PCode'],
              Sts: data.dataListOrderDetail[i]['Status'],
              Quty: 0,
              Wght: data.dataListOrderDetail[i]['Berat'],
              Nt: data.dataListOrderDetail[i]['Keterangan']
            })
        }

        for (var j = 0; j < data.dataListOrderDetail.length; j++) {
          this.checking_listing_menu.push(
            {
              name: data.dataListOrderDetail[j]['NamaLengkap'],
              quantity: data.dataListOrderDetail[j]['Qty']
            })
        }

      } else {
        loader.dismiss();

      }
    });

  }

  btn_menu_open() {
    this.open_menu = 'N';
    this.close_menu = 'Y';
    this.checking_list_menu = 'Y';
  }

  btn_menu_close() {
    this.open_menu = 'Y';
    this.close_menu = 'N';
    this.checking_list_menu = 'N';
  }

  tambah(id, table) {
    var gab = table + '' + id;
    console.log(id, table);
    console.log(gab);
    this.value_tambah++;
    document.getElementById(gab).innerHTML = this.value_tambah + " Pcs";
  }

  kurang(id, table) {
    console.log(id, table);
    var gab = table + '' + id;
    console.log(id, table);
    console.log(gab);
    this.value_kurang--;
    document.getElementById(gab).innerHTML = this.value_kurang + " Pcs";
  }

}
