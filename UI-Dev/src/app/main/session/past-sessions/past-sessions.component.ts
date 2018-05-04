import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '../../../model/session.model';
import { SessionService } from '../../../services/session.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { DigilabService } from '../../../services/digilab.service';
import { Digilab } from '../../../model/digilab.model';
import { SessionState } from '../../../model/sessionState.model';
import { UserType } from '../../../model/userType.model';
import { BackNavigationService } from '../../../services/backbutton.service';
import { LoginService } from '../../../services/login.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { SessionHost } from '../../../model/sessionHost.model';

@Component({
  selector: 'app-past-sessions',
  templateUrl: './past-sessions.component.html',
  styleUrls: ['./past-sessions.component.css']
})
export class PastSessionsComponent implements OnInit , OnDestroy {

  session : Session;
  digilab : Digilab;
  userType : string;
  id : number;

  date : String;

  isCancellable : boolean = false;
  isOptionsAvailable : boolean = false;

  constructor( public dialog: MatDialog,
      private sessionService : SessionService , 
      private route : ActivatedRoute , 
      private digilabService : DigilabService , 
      private backNavService : BackNavigationService,
      private loginService : LoginService,
      public snackBar: MatSnackBar,
      private router : Router ) {
    
  }

  ngOnInit() {
    
    this.userType = this.route.snapshot.queryParams['forUserType'];
    this.id = this.route.snapshot.params['id'];
    console.log( 'this.userType' )
    this.session = this.sessionService.getSession( Number(this.id) , this.userType  );
    
    if( !this.session ) {
      this.router.navigate( ['pagenotfound'] );
      return;
    }

    this.digilab = this.digilabService.getDigilab( this.session.digilabId );
    
    this.date =  new Date( this.session.startDateTime.toString() ).toDateString();


    if( this.userType !== UserType.RECEPTIONIST ){
      this.backNavService.setBackOption();
      var sessionState = this.session.stateId;
      if( sessionState === SessionState.CANCELLED || sessionState === SessionState.PAST_DATE ){
        this.isOptionsAvailable = false;
      } 
      else {
        this.isOptionsAvailable = true;
        this.isCancellable = true;
        if( sessionState === SessionState.SUBMITTED && this.userType === UserType.HOST )
          this.isCancellable = false;
      } 
    }
    
  }

  ngOnDestroy() {
    this.backNavService.removeBackOption();
  }

  onOptionSelected( option : string , reason : string ){
    if( option === 'Accept' ){
      this.session.SessionHost = new SessionHost();
      this.session.SessionHost.email = this.loginService.email;
      this.session.stateId = SessionState.CONFIRMED;
    } 
    if( option === 'Cancel' ){
      if( !this.session.SessionHost && this.userType === UserType.HOST ){
        this.session.SessionHost = new SessionHost();
        this.session.SessionHost.email = this.loginService.email;
      }
      this.session.stateId = SessionState.CANCELLED;
    }
    if( option === 'Decline' ){
      this.session.reason = reason;
      this.session.SessionHost = new SessionHost();
      this.session.SessionHost.email = this.loginService.email;
      this.session.stateId = SessionState.REJECTED;
    }
    this.sessionService.updateSession( this.session )
      .then( () => {
        this.showMessage('Session was updated successfully')
        this.isOptionsAvailable = false;
      } , () => this.showMessage('Could not update. Please try again') );
      
  }

  onDeclineClicked(){
    let dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(reason => {
      if( reason )
        this.onOptionSelected( 'Decline' , reason );
    });
  }

  showMessage( message ){
    this.snackBar.open( message , 'Dismiss'  , {
      duration: 2500,
    });
  }

}

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html'
})
export class ReasonDialogComponent implements OnInit {

  reason : string;

  constructor( public dialogRef: MatDialogRef<ReasonDialogComponent> ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

