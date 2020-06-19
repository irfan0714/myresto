import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items: Array<any>;
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search(request) {

    this.sqlite.create({
      name: 'resto.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT pcode, name FROM menu WHERE name LIKE ? LIMIT 0,20', ["%" + request + "%"])
        .then(res => {

          if (res.rows.length > 0) {
            this.items = [];
            for (let i = 0; i < res.rows.length; i++) {

              this.items.push(
                {
                  pcode: res.rows.item(i).pcode,
                  name: res.rows.item(i).name
                });
            }
          } else {

          }
        }).catch(e => console.log(e));

    }).catch(e => {
      console.log(e);
    });

  }

}
