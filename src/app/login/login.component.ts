import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { MainService } from './../main.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		public _main : MainService,
		private _noti: NotificationsService,
		private router: Router,
	) { }

	ngOnInit() {
	}

	public account : any = {}

	public login(){
		this._main.login(this.account).then(res => {
			if(res.result > 0){
				this._noti.success('Notification', 'Login success!')

				localStorage.setItem('account', JSON.stringify(res.data))

				setTimeout(() => {
					window.location.reload();
					this.router.navigate(['/']);
				}, 1000)
			} else{
				this._noti.warn('Notification', 'Error!')
			}
		})
	}

}
