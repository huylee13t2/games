import { Component, OnInit } from '@angular/core';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { MainService } from './../main.service';

@Component({
	selector: 'app-score',
	templateUrl: './score.component.html',
	styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

	constructor(
		private _main : MainService,
		private _noti: NotificationsService,
	) { }

	ngOnInit() {
		this.getHistory()
	}

	public history : any = []

	getHistory(){
		this._main.history().then(res => {
			if(res.result > 0){
				this.history = res.data
			}
		})
	}

}
