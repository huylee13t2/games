import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	constructor(
		private router: Router,
	) {
		
	}

	ngOnInit() {
		this.account_local = localStorage.getItem('account')
		console.log(this.account_local)
		if(this.account_local == null){
			this.router.navigate(['/login']);
		}
	}

	public account_local : any = {}

	public options = {
		position: ["bottom", "right"],
		timeOut: 1000,
		lastOnBottom: true
	}
}
