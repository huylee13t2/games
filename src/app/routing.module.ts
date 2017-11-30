import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayComponent } from './play/play.component';
import { ScoreComponent } from './score/score.component';
import { DashboardComponent } from './dashboard/app.component';

const routes: Routes = [
	{ path: '', redirectTo: '/play', pathMatch: 'full' },
	{ path: 'main', component: DashboardComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'view-profile/:id', component: ProfileComponent },
	{ path: 'history', component: ScoreComponent },
	{ path: 'play', component: PlayComponent },
	// { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
	imports: [ 
		RouterModule.forRoot(routes, { useHash: true }) 
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}