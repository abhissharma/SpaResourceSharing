import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';
import { MainComponent } from './main/main.component';
import { DigilabComponent } from './main/digilab/digilab.component';
import { AboutComponent } from './main/about/about.component';
import { DigilabListComponent } from './main/digilab/digilab-list/digilab-list.component';
import { DigilabEditComponent } from './main/digilab/digilab-edit/digilab-edit.component';
import { SessionListComponent } from './main/session/session-list/session-list.component';
import { PastSessionsComponent } from './main/session/past-sessions/past-sessions.component';
import { BookSessionComponent } from './main/session/book-session/book-session.component';
import { SessionComponent } from './main/session/session.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { DataResolve } from './services/data-resolve.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReceptionComponent } from './reception/reception.component';
import { ReceptionListComponent } from './reception/reception-list/reception-list.component';
import { InitiatorGuard } from './services/initiator-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/base', pathMatch: 'full' } ,
  { path: 'login', component: LoginComponent },
  { path: 'base', component: BaseComponent },
  { path: 'main', 
    component: MainComponent , 
    canActivate : [AuthGuard , InitiatorGuard] , 
    resolve : {
      dataLoaded : DataResolve
    },
    children : [
    { path : ''  , redirectTo : "about" ,  pathMatch : 'full' },
    { path : 'digilab' , component : DigilabComponent , canActivate : [AdminGuard] , data : { title : 'Digilab' } ,  children : [
        { path : '' , component : DigilabListComponent } ,
        { path : 'new' , component : DigilabEditComponent } , 
        { path : 'edit/:id' , component : DigilabEditComponent }
    ]  },
    // { path: 'session', component: SessionComponent, children: [
    //     { path: '', component: SessionListComponent },
    //     { path: 'book', component: BookSessionComponent } , 
    //     { path: 'detail/:id', component: PastSessionsComponent },
    //     { path: 'edit/:id', component: BookSessionComponent },
    // ] },
    { path : 'about' , component : AboutComponent } ,
  ] },
  { path : 'reception' , component : ReceptionComponent , resolve : { dataLoaded : DataResolve } , children : [
    { path : '' , component : ReceptionListComponent } ,
    { path: 'detail/:id', component: PastSessionsComponent },
  ]  },
  { path : '**' , component : PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { 

  

}