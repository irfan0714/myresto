import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HomePage } from '../pages/home/home';
import { SlidesPage } from '../pages/slides/slides';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any;

	constructor(platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private sqlite: SQLite) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.prepareTable();
		});
	}

	rootigPages() {
		this.sqlite.create({
			name: 'resto.db',
			location: 'default'
		}).then((db: SQLiteObject) => {

			db.executeSql('SELECT slider_opening FROM setting', [])
				.then(res => {

					if (res.rows.item(0).slider_opening == 'N') {
						this.rootPage = HomePage;
					} else {
						this.rootPage = SlidesPage;
					}

				}).catch(e => console.log(e));

		}).catch(e => {
			console.log(e);
		});
	}

	prepareTable() {

		this.sqlite.create({
			name: 'resto.db',
			location: 'default'
		}).then((db: SQLiteObject) => {

			//header order		
			db.executeSql('CREATE TABLE IF NOT EXISTS trans_order_header (NoTrans TEXT,NoKassa TEXT,Tanggal TEXT,Waktu TEXT,Kasir TEXT,KdStore TEXT, TotalItem TEXT, TotalQty TEXT,TotalServe TEXT, Status TEXT,KdPersonal TEXT,KdMeja TEXT,KdContact TEXT,nostruk TEXT,TotalGuest TEXT,AddDate TEXT,keterangan TEXT,KdAgent TEXT,IsCommit TEXT)', [])
				.then(res => console.log('Successfully Create Table order header'))
				.catch(e => console.log(e));

			//detail order
			db.executeSql('CREATE TABLE IF NOT EXISTS trans_order_detail (NoTrans TEXT,NoUrut TEXT,NoKassa TEXT,Tanggal TEXT ,Waktu TEXT ,Kasir TEXT,KdStore TEXT,PCode TEXT,Name TEXT,Qty TEXT,Berat TEXT,Satuan TEXT,Keterangan TEXT,Note_split TEXT,Status TEXT,KdPersonal TEXT,KdMeja TEXT,KdContact TEXT,MenuBaru TEXT,Tambahan TEXT, QtyCheckSplit TEXT,Harga TEXT)', [])
				.then(res => console.log('Successfully Create Table order detail'))
				.catch(e => console.log(e));

			//table location
			db.executeSql('CREATE TABLE IF NOT EXISTS table_location (table_id TEXT, table_name TEXT ,type_location TEXT, table_color TEXT ,type_isEmpty TEXT, AddDate TEXT)', [])
				.then(res => console.log('Successfully Create Table table_location'))
				.catch(e => console.log(e));

			//table user
			db.executeSql('CREATE TABLE IF NOT EXISTS user (id TEXT, name TEXT, password TEXT, authorization TEXT)', [])
				.then(res => console.log('Successfully Create Table user'))
				.catch(e => console.log(e));

			//table menu
			db.executeSql('CREATE TABLE IF NOT EXISTS menu (pcode TEXT, name TEXT, price TEXT, menucollection TEXT, typefood TEXT)', [])
				.then(res => console.log('Successfully Create Table menu'))
				.catch(e => console.log(e));

			//table kurs
			db.executeSql('CREATE TABLE IF NOT EXISTS kurs (RMB TEXT, USD TEXT)', [])
				.then(res => console.log('Successfully Create Table kurs'))
				.catch(e => console.log(e));

			//table store
			db.executeSql('CREATE TABLE IF NOT EXISTS store (kodestore TEXT, namastore TEXT)', [])
				.then(res => console.log('Successfully Create Table store'))
				.catch(e => console.log(e));

			//table totalorder
			db.executeSql('CREATE TABLE IF NOT EXISTS totalorder (IDR TEXT, USD TEXT, RMB TEXT)', [])
				.then(res => console.log('Successfully Create Table totalorder'))
				.catch(e => console.log(e));


			//table setting
			db.executeSql('CREATE TABLE IF NOT EXISTS setting (firstTime TEXT, idresto TEXT, nameresto TEXT, ip_api TEXT, type_printer TEXT, ip_printer TEXT,set_timer TEXT, refresh_timer TEXT, statusUpdate TEXT, dateUpdate TEXT, regist_status TEXT, ip_devices TEXT,slider_opening TEXT)', [])
				.then(res => console.log('Successfully Create Table setting'))
				.catch(e => console.log(e));

			//insert setting if not exists
			db.executeSql('INSERT INTO setting(firstTime,idresto, nameresto, ip_api, type_printer, ip_printer, set_timer, refresh_timer, statusUpdate, dateUpdate, regist_status, ip_devices,slider_opening) \
						SELECT * FROM(SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS tmp\
						WHERE NOT EXISTS(\
							SELECT firstTime FROM setting WHERE firstTime = ?\
						) LIMIT 1', ['myresto', '', '', '', '', '', '15000', '10', 'N', '', 'N', '', 'Y', 'myresto'])
				.then(res => {
					console.log('Successfully Insert Table setting');
					this.rootigPages();
				})
				.catch(e => console.log(e));

		}).catch(e => console.log(e));

	}

}

