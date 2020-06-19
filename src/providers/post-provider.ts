//provider api
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {
	server: any;
	constructor(public http: Http) {
	}

	postData(ip, body, file) {

		console.log(JSON.stringify(body));
		let type = "application/json; charset=UTF-8";
		let headers = new Headers({ 'Content-Type': type });
		let options = new RequestOptions({ headers: headers });
		this.server = "http://" + ip + "/general_api/index.php/myresto/";
		return this.http.post(this.server + file, JSON.stringify(body), options)
			.map(res => res.json());
	}








}