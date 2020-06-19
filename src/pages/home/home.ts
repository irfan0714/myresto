import { Component } from '@angular/core';
import { NavController, Platform, ToastController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PostProvider } from '../../providers/post-provider';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	desk: any;
	pin: any = '';
	pelayan: any;
	pelayan_nama: any;
	user_name: string;
	password: any;
	ip_api: any;
	today = new Date();
	date = this.today.getFullYear() + '-' + this.benarMonth((this.today.getMonth() + 1)) + '-' + this.benarDate(this.today.getDate());
	time = this.benarHours(this.today.getHours()) + ":" + this.benarMinutes(this.today.getMinutes()) + ":" + this.benarSecond(this.today.getSeconds());
	nows = this.date + ' ' + this.time;

	constructor(
		public navCtrl: NavController,
		private sqlite: SQLite,
		public platform: Platform,
		public modalCtrl: ModalController,
		private toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public postPvdr: PostProvider) {
		this.cek_data();
	}

	ionViewDidLoad() {
		this.cek_data();
	}


	table_pages(waiter, id) {
		//console.log(waiter, id);
		this.navCtrl.push('TablePage', { waiter: waiter, id: id });
	}

	setting_pages() {
		this.navCtrl.push('SettingPage');
	}

	split_bill() {
		this.navCtrl.push('SplitBillPage');
	}

	checkin() {
		const prompt = this.alertCtrl.create({
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
					handler: data => {
					}
				},
				{
					text: 'Login',
					handler: data => {
						this.sqlite.create({
							name: 'resto.db',
							location: 'default'
						}).then((db: SQLiteObject) => {
							var a = data.waiterid + "#";
							var b = a.split("123");
							var usr = b[0];

							db.executeSql('SELECT * FROM user WHERE id=? AND password=?', [usr, '123'])
								.then(res => {
									if (res.rows.length > 0) {
										//masuk ke table
										this.table_pages(res.rows.item(0).name, res.rows.item(0).id);
									} else {
										let toast = this.toastCtrl.create({
											message: 'Opps, Sorry. Please Try Again.',
											duration: 3000,
											position: 'top'
										});
										toast.present();
									}
								})
								.catch(e => console.log(e));

						})
							.catch(e => console.log(e));
					}
				}
			]
		});
		prompt.present();
	}

	list_order() {
		this.navCtrl.push('ListOrderPage');
	}

	benarMonth(m) {
		if (m * 1 < 10) {
			m = '0' + m;
		} else {
			m = m;
		}
		return m;
	}

	benarDate(d) {
		if (d * 1 < 10) {
			d = '0' + d;
		} else {
			d = d;
		}
		return d;
	}

	benarHours(h) {
		if (h * 1 < 10) {
			h = '0' + h;
		} else {
			h = h;
		}
		return h;
	}

	benarMinutes(i) {
		if (i * 1 < 10) {
			i = '0' + i;
		} else {
			i = i;
		}
		return i;
	}

	benarSecond(s) {
		if (s * 1 < 10) {
			s = '0' + s;
		} else {
			s = s;
		}
		return s;
	}

	TimeWatch(time) {
		var res = time.split(":");
		var jam;
		var menit;
		var detik;
		if (parseInt(res[0]) < 10) {
			jam = '0' + res[0];
		} else {
			jam = res[0];
		}

		if (parseInt(res[1]) < 10) {
			menit = '0' + res[1];
		} else {
			menit = res[1];
		}

		if (parseInt(res[2]) < 10) {
			detik = '0' + res[2];
		} else {
			detik = res[2];
		}

		var waktu = jam + ':' + menit + ':' + detik;
		return waktu;
	}

	DateWatch(dates) {
		var res = dates.split("-");
		var tahun;
		var bulan;
		var harian;
		tahun = res[0];

		if (parseInt(res[1]) < 10) {
			bulan = '0' + res[1];
		} else {
			bulan = res[1];
		}

		if (parseInt(res[2]) < 10) {
			harian = '0' + res[2];
		} else {
			harian = res[2];
		}

		var tanggal = tahun + '-' + bulan + '-' + harian;
		return tanggal;
	}

	cek_data() {
		//cek apakah tanggal berbeda, jika berbeda maka di update masterbarang dan user
		this.sqlite.create({
			name: 'resto.db',
			location: 'default'
		}).then((db: SQLiteObject) => {
			db.executeSql('SELECT * FROM setting', [])
				.then(res => {
					if (this.date != res.rows.item(0).dateUpdate.substr(0, 10)) {
						this.sync_data(res.rows.item(0).idresto);
					}
				});
		}).catch(e => console.log(e));
	}

	sync_data(kdresto) {

		let body = {
			kdresto: kdresto,
			action: 'sync'
		};

		this.postPvdr.postData(this.ip_api, body, 'Ping').subscribe((data) => {
			console.log(data);
			if (data.success) {

				this.sqlite.create({
					name: 'resto.db',
					location: 'default'
				}).then((db: SQLiteObject) => {

					//menus
					db.executeSql('DELETE FROM menu', [])
						.then(res => {
							for (var y = 0; y < data.menu.length; y++) {

								var PCode = data.menu[y]['PCode'];
								var NamaLengkap = data.menu[y]['NamaLengkap'];
								var Price = data.menu[y]['Harga'];
								var GroupMenu = data.menu[y]['GroupMenu'];
								var KdGroupBarang = data.menu[y]['KdGroupBarang'];

								db.executeSql('INSERT INTO menu (pcode, name , price, menucollection, typefood) VALUES (?,?,?,?,?)', [PCode, NamaLengkap, Price, GroupMenu, KdGroupBarang])
									.then(res => {
										//comment
									})
									.catch(e => {
										console.log(e);
									});
							}
						})
						.catch(e => {
							console.log(e);
						});

					db.executeSql('DELETE FROM kurs', [])
						.then(res => {
							for (var p = 0; p < data.kurs.length; p++) {
								var RMB = data.kurs[p]['RMB'];
								var USD = data.kurs[p]['USD'];

								db.executeSql('INSERT INTO kurs (RMB,USD) VALUES (?,?)', [RMB, USD])
									.then(res => {
										//comment
									})
									.catch(e => {
										console.log(e);
									});
							}
						})
						.catch(e => {
							console.log(e);
						});

					//user
					db.executeSql('DELETE FROM user', [])
						.then(res => {
							for (var x = 0; x < data.user.length; x++) {
								var Id = data.user[x]['Id'];
								var UserName = data.user[x]['UserName'];
								var Password = data.user[x]['Password'];
								var otorisasi = data.user[x]['otorisasi'];

								db.executeSql('INSERT INTO user (id , name , password , authorization) VALUES (?,?,?,?)', [Id, UserName, Password, otorisasi])
									.then(res => {
										//comment
									})
									.catch(e => {
										console.log(e);
									});
							}
						})
						.catch(e => {
							console.log(e);
						});

					//update date sycn
					db.executeSql('UPDATE setting SET statusUpdate=?, dateUpdate=?, slider_opening=?', ['Y', this.nows, 'N'])
						.then(res => {
							//comment
						})
						.catch(e => {
							console.log(e);
						});

				}).catch(e => console.log(e));
				console.log('suskses sync');
			}
		}, error => {
			//jika putus ya ndak kenapa napa...
		});

	}

}
