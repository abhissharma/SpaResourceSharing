import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Session } from '../../../model/session.model';
import { SessionService } from '../../../services/session.service';
import { LoginService } from '../../../services/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'] ,
  encapsulation : ViewEncapsulation.None
})
export class SessionListComponent implements OnInit , OnDestroy {

  subscription : Subscription;

  sessions : any;
  activeList : Session[]; 
  displayedList : Session[];
  selectedIndex : number;
  selectedUserMode : number;

  isHost : boolean = false;

  constructor( 
    private sessionService : SessionService , 
    private loginService : LoginService , 
    private route : ActivatedRoute,
    private router : Router ) { }

  ngOnInit() { 

    var userType = this.loginService.userType;
    if( userType === 'Host' || userType === 'Admin' )
      this.isHost = true;

    this.subscription = this.sessionService.sessionChanged.subscribe( (sessions) => {
      this.sessions = sessions;
      this.initList();
    } );

    this.sessions = this.sessionService.getSessions();

    if( !this.sessions ) {
      this.activeList = new Array();
    } else {
      this.initList();
    }


  }

  initList()  {

    this.activeList = new Array();  

    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);

    var listTypeIndex = queryParams['listTypeIndex'];
    var userTypeIndex = queryParams['userTypeIndex'];

    this.selectedUserMode = 0

    if( userTypeIndex ){
      if( this.isHost && userTypeIndex == 1 ){
        this.selectedUserMode = 1;
      }else{
        this.selectedUserMode = 0;
      }
    }

    if( listTypeIndex ){
      this.selectedIndex = listTypeIndex;
    } else{
      this.selectedIndex = 1;
    }

    this.onUserTabChange( this.selectedUserMode );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSessionsTabsChange( index ){

    if( index == 0 ){
      this.displayedList = this.activeList.filter( (session) => session.stateId === 'Confirmed' )
    }
    if( index == 1 ){
      this.displayedList = this.activeList.filter( (session) => session.stateId === 'Draft' || session.stateId === 'Submitted' || session.stateId === 'Rejected' )
    }
    if( index == 2 ){
      this.displayedList = this.activeList.filter( (session) => session.stateId === 'Past Date' || session.stateId === 'Cancelled' )
    }

    this.updateUrl( index , this.selectedUserMode );
    
  }

  onUserTabChange(index){
    if( index == 0 )
      this.activeList = this.sessions['ForInitiator'];
    if( index == 1 )
      this.activeList = this.sessions['ForHost'];
    
    this.onSessionsTabsChange(this.selectedIndex);
    this.updateUrl( this.selectedIndex , index );
  }

  updateUrl( listTypeIndex , userTypeIndex ){

    this.router.navigate( ['.'] , { 
      relativeTo : this.route,
      queryParams  : { listTypeIndex , userTypeIndex } , 
      replaceUrl : true } );

  }

}
