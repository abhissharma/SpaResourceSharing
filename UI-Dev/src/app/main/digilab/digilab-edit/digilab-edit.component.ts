import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DigilabService } from '../../../services/digilab.service';
import { Digilab } from '../../../model/digilab.model';
import { Topic } from '../../../model/topic.model';
import { BackNavigationService } from '../../../services/backbutton.service';

@Component({
  selector: 'app-digilab-edit',
  templateUrl: './digilab-edit.component.html',
  styleUrls: ['./digilab-edit.component.css']
})
export class DigilabEditComponent implements OnInit , OnDestroy{

  id: number;
  editMode = false;

  visible: boolean = true;
  selected: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  separatorKeysCodes = [ENTER, COMMA];

  digilabForm : FormGroup; 
  digilab : Digilab;

  constructor( private route : ActivatedRoute ,  
    private router : Router , 
    private digilabService : DigilabService , 
    public snackBar: MatSnackBar , 
    private backNavService : BackNavigationService ) { }

  ngOnInit() {
    
    this.backNavService.setBackOption();
    this.route.params.subscribe ( (params : Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    } );
  }

  ngOnDestroy(){
    this.backNavService.removeBackOption();
  }

  initForm(){
    
    this.digilab = new Digilab();
    if ( this.editMode ){
      this.digilab = this.digilabService.getDigilab( Number( this.id ) );
      if( !this.digilab ) {
        this.router.navigate( ['pagenotfound'] );
        return;
      }
    }

    let hosts = new FormArray([]);
    for( let host of this.digilab.DigilabHosts )
    {
      hosts.push( new FormGroup({'email' : new FormControl( host.email , [ Validators.required ] ) }) )
    }  
    
    this.digilabForm = new FormGroup({
      'name' : new FormControl( this.digilab.name , [ Validators.required ] ) ,
      'Topics' : new FormControl( this.digilab.Topics  ) ,
      'locationLat' : new FormControl( this.digilab.locationLat , [ Validators.required ] ) , 
      'locationLong' : new FormControl( this.digilab.locationLong , [ Validators.required ] ) ,
      'email' : new FormControl( this.digilab.email ) ,
      'DigilabHosts' : hosts ,
      'receptionEmail' : new FormControl( this.digilab.receptionEmail , [ Validators.required ] ) ,
      'startTime' : new FormControl( this.digilab.startTime ) ,
      'endTime' : new FormControl( this.digilab.endTime ) ,
      'feedBackDelayTime' : new FormControl( this.digilab.feedBackDelayTime , [ Validators.required ] ) ,
      'preBookExpiryTime' : new FormControl( this.digilab.preBookExpiryTime , [ Validators.required ] ) ,
      'question1' : new FormControl( this.digilab.question1 ) ,
      'question2' : new FormControl( this.digilab.question2 ) ,
      'receptionistMailDeliveryHours' : new FormControl( this.digilab.receptionistMailDeliveryHours ) ,
      'isEmailNotificationEnabled' : new FormControl( this.digilab.isEmailNotificationEnabled ) ,
      'isPushNotificationEnabled' : new FormControl( this.digilab.isPushNotificationEnabled ) ,
      'isOpenForBusiness' : new FormControl( this.digilab.isOpenForBusiness ) ,
    })

  }

  onSubmit(){
    console.log(this.digilabForm.value);
    if( this.digilabForm.valid )
    {
      if( this.editMode ) {
        this.digilabService.updateDigilab( this.id , this.digilabForm.value )
          .then( () => this.showMessage('Digilab was updated successfully') ,
                () => this.showMessage('Could not update. Please try again') );
      }
      else{
        this.digilabService.createDigilab( this.digilabForm.value )
        .then( () => this.showMessage('Digilab was created successfully') ,
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
      this.digilab.Topics.push( new Topic( value.trim() ) );
    }
    if (input) {
      input.value = '';
    }
  }

  onRemoveTopic(topic: any): void {
    let index = this.digilab.Topics.indexOf(topic);
    if (index >= 0) {
      this.digilab.Topics.splice(index, 1);
    }
  }

  onAddHost(){
    (<FormArray>this.digilabForm.get('DigilabHosts')).push( new FormGroup({
      'email' : new FormControl( null , [ Validators.required ] )
    }) );
  }

  onRemoveHost( index : number ){
    (<FormArray>this.digilabForm.get('DigilabHosts')).removeAt(index);
  } 

  showMessage( message ){
    this.snackBar.open( message , 'Dismiss'  , {
      duration: 2500,
    });
  }

}
