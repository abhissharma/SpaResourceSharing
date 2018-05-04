import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../../model/session.model';
import { Route, Router } from '@angular/router';
import { UserType } from '../../../model/userType.model';
import { SessionState } from '../../../model/sessionState.model';

@Component({
  selector: 'app-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.css']
})
export class SessionItemComponent implements OnInit {

  @Input()
  session : Session;

  @Input()
  sessionFor : String;

  @Input()
  showStatus : boolean = true;

  sessionColor : string;

  private monthNames : string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  private weekDays : string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday" ,
    "Friday", "Saturday"
  ];

  day : string = '------';
  month : string = '------';
  date : string = '--';


  constructor( private router : Router ) { }

  ngOnInit() {
    if( this.session.startDateTime ) {
      var sessiondate =  new Date( this.session.startDateTime.toString() ); 
      this.month = this.monthNames[sessiondate.getMonth()];
      this.day = this.weekDays[sessiondate.getDay()];
      this.date = sessiondate.getDate().toString();
    }

    this.sessionColor = 'rgb(199, 47, 47)';

  }

  onClick(){
    var sessionState = this.session.stateId;
    if( this.sessionFor === UserType.RECEPTIONIST ){
      this.router.navigate( ['reception', 'detail' , this.session.id ] , { queryParams : { forUserType : this.sessionFor } } )
    }
    else if( this.sessionFor === UserType.INITIATOR 
      && ( sessionState === SessionState.DRAFT 
        || sessionState === SessionState.REJECTED  ) ) {
      this.router.navigate( ['main','session','edit',this.session.id] );
    }
    else {
      this.router.navigate( ['main','session','detail',this.session.id] , { queryParams : { forUserType : this.sessionFor } } );
    }

  }

  getColor(){
    var sessionState = this.session.stateId
    switch( sessionState ) {
      case SessionState.REJECTED : return 'rgb(199, 47, 47)'; 
      case SessionState.CONFIRMED : return 'rgb(0, 121, 0)';
      // case SessionState.SUBMITTED : return 'rgb(226, 88, 34)';
      case SessionState.SUBMITTED : return 'rgb(0, 132, 255)'
      default : return 'rgb(128, 128, 128)'
    }
  }

}
