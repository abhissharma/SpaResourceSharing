import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SessionService } from '../services/session.service';
import { DigilabService } from '../services/digilab.service';
import { Session } from '../model/session.model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css'] ,
  providers : [SessionService , DigilabService]
})
export class ReceptionComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  dataLoaded : boolean;

  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,
        private digilabService : DigilabService,
        private sessionService : SessionService,
        private loginService : LoginService ,
        private router : Router ) { 
  
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit(  ) {
  }

  onLogOut(){
    localStorage.removeItem( 'isAuthenticated' );
    this.router.navigate( ['/base'] ) ;
  }

}
