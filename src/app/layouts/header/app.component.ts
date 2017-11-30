import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'layout-header',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(
		private router: Router,
	) { }

	ngOnInit() {
	}

	public logout(){
		localStorage.clear()
		this.router.navigate(['/login']);
	}

}
