import { Injectable } from '@angular/core';
import { Location }   from '@angular/common';
import { Http, Response, Headers, Request ,RequestOptions ,RequestMethod } from '@angular/http';

@Injectable()
export class MainService {

	constructor(
		private http : Http, 
		private location: Location,
	) { 
		this.account_local = JSON.parse(localStorage.getItem('account'))
		console.log(this.account_local)
	}

	public url_http = "http://localhost:8000/api/";

	public account_local : any

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	public updateProfile(data) : Promise<any> {
		console.log(data)
		let url = this.url_http + 'update-profile'
		let fd = new FormData()
		fd.append('token', this.account_local.token)
		fd.append('fullname', data.fullname)
		fd.append('gender', data.gender)
		fd.append('phone', data.phone)
		fd.append('city', data.city)
		fd.append('avatar', data.avatar)

		return this.http.post(url, fd).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public history() : Promise<any> {
		let url = this.url_http + 'history'
		let fd = new FormData()
		fd.append('token', this.account_local.token)

		return this.http.post(url, fd).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public getAccount(id) : Promise<any> {
		let url = this.url_http + 'get-profile?id=' + id;
		return this.http.get(url).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public getUser() : Promise<any> {
		let url = this.url_http + 'get-account';
		let fd = new FormData()
		fd.append('token', this.account_local.token)
		return this.http.post(url, fd).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public getTopScore() : Promise<any> {
		let url = this.url_http + 'top-score';
		return this.http.get(url).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public answerTrue(id, answer_question, event_play) : Promise<any> {
		let token = this.account_local.token
		console.log('token = ' + token)
		let url = this.url_http + 'answer';
		let fd = new FormData()
		fd.append('token', token)
		fd.append('id', id)
		fd.append('answer_question', answer_question)
		fd.append('event_play', event_play)
		return this.http.post(url, fd).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public register(data) : Promise<any>{
		let url = this.url_http + "register";
		let fd = new FormData();
		fd.append('username', data.username)
		fd.append('password', data.password)
		fd.append('full_name', data.full_name)
		fd.append('gender', data.gender)
		fd.append('phone', data.phone)
		fd.append('email', data.email)
		return this.http.post(url, fd).toPromise().then(res =>  res.json()).catch(this.handleError)
	}

	public login(data) : Promise<any> {
		let url = this.url_http + 'login';
		let fd = new FormData();
		fd.append('username', data.username)
		fd.append('password', data.password)

		return this.http.post(url, fd).toPromise().then(res => res.json()).catch(this.handleError)
	}

	public getListQuestion() : Promise<any> {
		let url = this.url_http + 'get-question';
		return this.http.get(url).toPromise().then(res => res.json()).catch(this.handleError)
	}

}
