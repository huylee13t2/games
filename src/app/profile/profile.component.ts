import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import * as $ from 'jquery';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { MainService } from './../main.service'


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	constructor(
		private _main : MainService,
		private _noti: NotificationsService,
		private activatedRoute: ActivatedRoute
		) {
		this.account_local = JSON.parse(localStorage.getItem('account'))
		console.log(this.account_local)
		if(this.account_local != null){
			this.user_id = this.account_local.id
		}
	}

	ngOnInit() {
		
		this.activatedRoute.params.subscribe((params: Params) => {
			this.userId = params['id'];
		});


		setTimeout(() => {
			console.log(this.userId)
			console.log(this.user_id)
			if(this.userId == this.user_id || this.userId == undefined){
				this.getUser()
				this.profile = false
			} else{
				this.getAccount()
				this.profile = true
			}	
		}, 500)
	}

	public my_acocunt : any = {
		avatar : File
	}
	public profile : boolean = false
	public account_local : any = {}
	public user_id : number
	public userId : number
	public files : File

	update_profile(){
		console.log('==> update_profile')
		this._main.updateProfile(this.my_acocunt).then(res => {
			if(res.result > 0){
				this._noti.success('Notification', 'Updated success!')
				this.my_acocunt = res.data
				setTimeout(() => {
					$('#myModal').css('display', 'none');
					$('#myModal').removeClass('in');
					$('.modal-backdrop').removeClass('in');
					$('.modal-backdrop').css('display', 'none');
					this.getUser()
				},1000)
			}
		})
	}

	onChange(e){
		this.files = e.srcElement.files[0];
		this.my_acocunt.avatar = e.srcElement.files[0];
		console.log(this.files)
	}

	getAccount(){
		this._main.getAccount(this.userId).then(res => {
			if(res.result > 0){
				this.my_acocunt = res.data
			}
		})
	}

	getUser(){
		this._main.getUser().then(res => {
			if(res.result > 0){
				this.my_acocunt = res.data
			}
		})
	}
}
