import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './routing.module';
import { MainService } from './main.service';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayComponent } from './play/play.component';
import { ScoreComponent } from './score/score.component';
import { FooterComponent } from './layouts/footer/app.component';
import { HeaderComponent } from './layouts/header/app.component';
import { DashboardComponent } from './dashboard/app.component';


@NgModule({
	declarations: [
		MainComponent,
		LoginComponent,
		RegisterComponent,
		MainComponent,
		ProfileComponent,
		PlayComponent,
		ScoreComponent,
		FooterComponent,
		HeaderComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
	    FormsModule,
	    AppRoutingModule,
	    HttpModule,
	    BrowserAnimationsModule,
	    SimpleNotificationsModule.forRoot(),
	],
	providers: [
		MainService,
	],
	bootstrap: [MainComponent]
})
export class AppModule { }
