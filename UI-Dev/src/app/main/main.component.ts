import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { BackNavigationService } from '../services/backbutton.service';
import { Digilab } from '../model/digilab.model';
import { SessionService } from '../services/session.service';
import { DigilabService } from '../services/digilab.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'] ,
  providers : []
})
export class MainComponent implements OnInit {

  dataLoaded : boolean;
  backBtn: boolean = false;

  id: number = 0;

  subscription : Subscription;
  displayStatus = 'none';
  backNavSubscription : Subscription;
  tabTitle = '';

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher , 
      private route : ActivatedRoute , private router: Router ,
      private backNavService : BackNavigationService ,
      private location: Location , 
      private digilabService : DigilabService ,
      private sessionService : SessionService ) 
  { 
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.backNavSubscription =  backNavService.stateChanged.subscribe( ( isActive : boolean ) => {
      if(isActive)
        this.displayStatus = 'inline';
      else
        this.displayStatus = 'none';
    } );

  }

  ngOnInit() {

    this.subscription = this.router.events.subscribe( ( data ) => {
      this.setTitle();
    } );

    this.setTitle();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
    this.backNavSubscription.unsubscribe();
  }

  setTitle(){
    if( this.router.url.search('digilab') > 0 ){
      this.tabTitle = 'Digilabs';
      this.id = 1;
    }
    if( this.router.url.search('session') > 0 ){
      this.tabTitle = 'My Sessions';
      this.id = 2;
    }
    if( this.router.url.search('about') > 0 ){
      this.tabTitle = 'About';
      this.id = 0;
    }
  }

  goBack(){
    this.location.back();
  }

}
