import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as $ from 'jquery';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { MainService } from './../main.service';

@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

	constructor(
		private _main : MainService,
		private _noti: NotificationsService,
		) { 
	}

	public data : any ={}
	public list_question : any =[]
	public list_answer : any =[]
	public num_random : number
	public list_length : number
	public question : any = {}
	public active_question : boolean = false
	public show_input : any = []
	public show_input_index :any =[]
	public ket_qua : string = ''
	public answer_question : boolean = false
	public event_play : string = 'new_play'
	public score : number = 0
	public end_game : boolean = false
	public list_top_score : any = []
	public show_question : any = []
	public time_out : number = 19
	public ticks =0;

	public timer = Observable.timer(2000,1000)
	public subscription : any

	ngOnInit() {
		this.getListQuestion()
		this.getTopScore()
		
	}

	changeIndex(e){
		
	}

	delayTime(){
		// let timer = Observable.timer(2000,1000);
		
		this.subscription = this.timer.subscribe(t=>{
			if(this.ticks < 29){
				this.ticks = t
			} else{
				console.log('===> False')
				this.answer()
				this.getTopScore()
				this.subscription.unsubscribe()
			}
		});
	}

	play_again(){
		this.ticks=0
		this.subscription.unsubscribe()
		this.end_game = false
		this.event_play = 'new_play'
		this.active_question = false
		this.data.answer=''
		this.getTopScore()
		this.getListQuestion()
		setTimeout(() => {
			this.showQuestion()
		}, 400)
	}

	getTopScore(){
		this._main.getTopScore().then(res => {
			if(res.result > 0){
				this.list_top_score = res.data
			}
		})
	}

	answer(){
		// $('.title_question').removeClass('zoomIn')
		
		if(this.ket_qua.toLowerCase() === this.data.answer){
			this._noti.success('Notofication', 'True')
			this.answer_question = true
		} else{
			this._noti.error('Notification', 'False')
			this.answer_question = false
		}

		setTimeout(() => {
			this._main.answerTrue(this.question.id, this.answer_question, this.event_play).then(res => {

				if(res.result > 0){

					this.score = res.data.score

					this.event_play = 'next_play'

					let index = 0;
					for (var i = 0; i < this.list_question.length; ++i) {
						if(this.list_question[i].id == this.question.id){
							index = i
						} else{
						}
					}

					this.list_question.splice(index, 1)
					console.log(this.list_question)


					setTimeout(() => {
						this.list_length = this.list_question.length;
						this.ticks = 0
						this.subscription.unsubscribe()
						this.nextQuestion()
					}, 500)
				} else{
					this.end_game = true
					this.getTopScore()
				}
			})
		},500)
	}

	nextQuestion(){
		this.ticks=0
		this.subscription.unsubscribe()
		this.data.answer = ''
		this.showQuestion()
		// $('.title_question').addClass('zoomIn')
	}

	startGame(){
		this.active_question = true
		this.showQuestion()
		this.ticks =0
	}

	changeResult(data){
		console.log('changeResult')
		let array = []
		array = data.toLowerCase().split(" ")
		console.log(array)
		console.log(array[0])

		// this.changeIndexString(array[0])

		for (var i = 0; i < array.length; ++i) {
			console.log('--------------')
			console.log(array[i])
			array[i] = this.changeIndexString(array[i])
			console.log(array[i])
		}


		console.log(array)
		return array
	}

	changeIndexString(str){
		let number = str.length
		let index = 0
		let array = []
		let arr_index = []
		let arr_result = []
		array = str.split("")

		for (var i = 0; i < number; ) {
			index = Math.floor(Math.random() * number)
			if(arr_index.indexOf(index) < 0 || arr_index.length == 0){
				arr_result.push(array[index])
				arr_index.push(index)
				i = i +1;
			}
		}

		
		let text : string = arr_result.toString()
		for (var i = 0; i < text.length; ++i) {
			text = text.replace(',', '')
		}

		return text
	}

	showQuestion(){
		this.delayTime()

		this.num_random = Math.floor(Math.random() * this.list_length);
		if(this.list_answer.length == 0){
			this.list_answer.push(this.num_random)

		} else{
			let check = true;
			while(check){
				if(this.list_answer.indexOf(this.num_random) > 0 ){
					this.num_random = Math.floor(Math.random() * this.list_length);
				} else{
					this.list_answer.push(this.num_random)
					check = false
				}
			}
		}

		this.question = this.list_question[this.list_answer[this.list_answer.length-1]]
		this.ket_qua = this.question.ket_qua.toLowerCase()
		this.show_input = this.changeResult(this.question.ket_qua)
	}

	getListQuestion(){
		this._main.getListQuestion().then(res => {
			if(res.result > 0){
				this.list_question = res.data;
				this.list_length = this.list_question.length;
			}
		})
	}

}
