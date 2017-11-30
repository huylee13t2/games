import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { MainService } from './../main.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	constructor(
		public _main : MainService,
		private _noti: NotificationsService,
		private router: Router,
		) { }

	public account_local : any = {}

	ngOnInit() {
		
	}

	public account : any={
		gender : 'male'
	}

	public register(){
		this._main.register(this.account).then(res => {
			console.log(res)
			if(res.result > 0){
				this._noti.success("Notification", "Register success!")

				setTimeout(() => {
					this.router.navigate(['login']);
				}, 1000)
				
			} else{
				this._noti.warn('Notification', 'Error!')
			}
		})
	}

}
