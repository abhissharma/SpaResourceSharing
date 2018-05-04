import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { COMMA } from '@angular/cdk/keycodes';
import { MatDialog, MatChipInputEvent, MatAutocompleteSelectedEvent, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Route, Router, Params } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { DigilabService } from '../../../services/digilab.service';
import { Session } from '../../../model/session.model';
import { Guest } from '../../../model/guest.model';
import { Topic } from '../../../model/topic.model';
import { BackNavigationService } from '../../../services/backbutton.service';
import { Digilab } from '../../../model/digilab.model';
import { SessionTopic } from '../../../model/sessionTopic.model';
import { LoginService } from '../../../services/login.service';
import { SessionState } from '../../../model/sessionState.model';

@Component({
  selector: 'app-book-session',
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.css']
})

export class BookSessionComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;

  topics: SessionTopic[];
  session: Session;
  sessionForm : FormGroup; 

  visible: boolean = true;
  selected: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  separatorKeysCodes = [ENTER, COMMA];

  diglabs: Digilab[];
  options: Topic[];
  guest: Guest[];

  isReasonAvailable : boolean = false;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private digilabService: DigilabService,
    private loginService: LoginService,
    public snackBar: MatSnackBar,
    private backNavService: BackNavigationService) { }

  ngOnInit() {
    this.backNavService.setBackOption();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.initForm();
  }

  ngOnDestroy() {
    this.backNavService.removeBackOption();
  }

  initForm() {

    this.session = new Session();

    if ( this.editMode ){
      this.session = this.sessionService.getSession( Number( this.id ) , 'Initiator' );
      if( !this.session ) {
        this.router.navigate( ['pagenotfound'] );
        return;
      }
      if( this.session.stateId === SessionState.REJECTED )
        this.isReasonAvailable = true;
    }

    this.diglabs = this.digilabService.getDigilabs().filter( (digilab : Digilab) => digilab.isOpenForBusiness );
    this.options = [];

    this.diglabs.forEach(digilab => {
      this.options = this.options.concat( digilab.Topics );
    });


    this.topics = [];

    this.sessionForm = new FormGroup( {
      'name' : new FormControl( this.session.name , [Validators.required] ) ,
      'digilabId' : new FormControl( this.session.digilabId , [Validators.required] ) ,
      'duration' : new FormControl( this.session.duration , [Validators.required] ) ,
      'startDateTime' : new FormControl( this.session.startDateTime , [Validators.required] ) ,
      'description' : new FormControl( this.session.description ) ,
      'Topics' : new FormControl( this.session.SessionTopics )
    });

  }

  onSubmit( state : string ){
    console.log(this.sessionForm.value);
    
    this.session.name = this.sessionForm.value['name'];
    this.session.digilabId = this.sessionForm.value['digilabId'];
    this.session.duration = this.sessionForm.value['duration'];
    this.session.startDateTime = this.sessionForm.value['startDateTime'];
    this.session.initiatorEmail = this.loginService.email;
    this.session.stateId = state;

    if( this.sessionForm.valid )
    {
      if( this.editMode ) {
        this.sessionService.updateSession( this.session ).
        then( () => this.showMessage('Session was updated successfully') ,
              () => this.showMessage('Could not update. Please try again') );
      }
      else{
        this.sessionService.createSession( this.session ).
        then( () => this.showMessage('Session was created successfully') ,
              () => this.showMessage('Could not create. Please try again') );
      }
    }
    else{  
      this.showMessage('Please enter all the required fields');
    }
  }

  onAddTopic(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.session.SessionTopics.push( new SessionTopic( value , null )  );
    }
    if (input) {
      input.value = '';
    }
  }

  onRemoveTopic(topic: any): void {
    let index = this.session.SessionTopics.indexOf(topic);
    if ( index >= 0) {
      if( topic.digilabId )
        this.options.push( topic );
      this.session.SessionTopics.splice(index, 1);
    }
  }

  topicSelected( event: MatAutocompleteSelectedEvent ){
    let topic = event.option.value;
    this.session.SessionTopics.push( new SessionTopic( topic.name , topic.digilabId ) );
    console.log(this.options.indexOf(event.option.value));
    this.options.splice(0,1);
  }

  onAddGuest(){
    let dialogRef = this.dialog.open(GuestDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(guest => {
      if( guest )
        this.session.Guests.push( guest );
    });
  }

  onDeleteGuest(i){
    this.session.Guests.splice(i,1);
  }

  showMessage( message ){
    this.snackBar.open( message , 'Dismiss'  , {
      duration: 2500,
    });
  }
  
}

@Component({
  selector: 'app-guest-dialog',
  templateUrl: './guest-dialog.component.html'
})
export class GuestDialogComponent implements OnInit {

  guest : Guest;

  constructor( public dialogRef: MatDialogRef<GuestDialogComponent> ) { }

  ngOnInit() {
    this.guest = new Guest();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
