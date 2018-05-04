import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { BaseComponent } from './base/base.component';


import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './main/about/about.component';
import { DigilabComponent } from './main/digilab/digilab.component';
import { SidenavComponent } from './main/sidenav/sidenav.component';
import { AppMaterialModule } from './app-material.module';
import { DigilabEditComponent } from './main/digilab/digilab-edit/digilab-edit.component';
import { DigilabListComponent } from './main/digilab/digilab-list/digilab-list.component';
import { DigilabItemComponent } from './main/digilab/digilab-item/digilab-item.component';
import { DigilabService } from './services/digilab.service';
import { SessionComponent } from './main/session/session.component';
import { BookSessionComponent, GuestDialogComponent } from './main/session/book-session/book-session.component';
import { PastSessionsComponent, ReasonDialogComponent } from './main/session/past-sessions/past-sessions.component';
import { SessionItemComponent } from './main/session/session-item/session-item.component';
import { SessionListComponent } from './main/session/session-list/session-list.component';
import { SessionService } from './services/session.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { BackNavigationService } from './services/backbutton.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { LoginService } from './services/login.service';
import { DataResolve } from './services/data-resolve.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReceptionComponent } from './reception/reception.component';
import { ReceptionListComponent } from './reception/reception-list/reception-list.component';
import { InitiatorGuard } from './services/initiator-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    MainComponent,
    AboutComponent,
    DigilabComponent,
    SidenavComponent,
    DigilabEditComponent,
    DigilabListComponent,
    DigilabItemComponent,
    SessionComponent,
    BookSessionComponent,
    PastSessionsComponent,
    SessionItemComponent,
    SessionListComponent,
    GuestDialogComponent,
    ReasonDialogComponent,
    PageNotFoundComponent,
    ReceptionComponent,
    ReceptionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    AmazingTimePickerModule
  ],
  entryComponents : [GuestDialogComponent,ReasonDialogComponent],
  providers: [ 
    AuthGuard,
    AdminGuard,
    LoginService , 
    DigilabService , 
    BackNavigationService,
    DataResolve,
    SessionService,
    InitiatorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
