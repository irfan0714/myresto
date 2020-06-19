import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

class Port {
  public id: number;
  public name: string;
}

@IonicPage()
@Component({
  selector: 'page-addmenu',
  templateUrl: 'addmenu.html',
})
export class AddmenuPage {

  ports: Port[];
  port: Port;

  items = [];
  order_id: any;
  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];

    this.initializeItems();
    this.getCurrentData(navParams.get("order_id"));
  }

  getCurrentData(order_id) {
    this.order_id = parseInt(order_id) + 1;
  }

  initializeItems() {
    this.getMenus();
  }

  getMenus() {
    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM menu WHERE name LIKE ? OR name LIKE ? OR name LIKE ? OR name LIKE ? OR name LIKE ? ORDER BY name ASC LIMIT 0,20', ["%nasi%", "%bebek%", "%ayam%", "%crab%", "%lobster%"])
        .then(res => {
          this.items = [];
          for (let i = 0; i < res.rows.length; i++) {

            this.items.push(
              {
                pcode: res.rows.item(i).pcode,
                name: res.rows.item(i).name,
                price: res.rows.item(i).price
              });
          }

        })
        .catch(e => {
          console.log(e);
        });
    }).catch(e => console.log(e));
  }

  search(request) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT pcode, name, price FROM menu WHERE name LIKE ? LIMIT 0,20', ["%" + request + "%"])
        .then(res => {

          if (res.rows.length > 0) {
            this.items = [];
            for (let i = 0; i < res.rows.length; i++) {

              this.items.push(
                {
                  pcode: res.rows.item(i).pcode,
                  name: res.rows.item(i).name,
                  price: res.rows.item(i).price
                });
            }
          } else {

          }
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(item.name.indexOf(val));
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
    }
  }

  chooseMenu(pcode, name, price, order_id) {
    this.closeModal(pcode, name, price, order_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmenuPage');
  }

  closeModal(pcode, name, price, order_id) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM kurs', [])
        .then(res => {
          console.log(pcode, name, price, res.rows.item(0).RMB, res.rows.item(0).USD, order_id);
          this.viewCtrl.dismiss({ pcode: pcode, name: name, price: price, RMB: res.rows.item(0).RMB, USD: res.rows.item(0).USD, order_id: order_id });
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  openSearchPage() {

    this.navCtrl.push('SearchPage');
  }

}

