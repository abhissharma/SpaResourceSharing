import { Component, OnInit } from '@angular/core';
import { Session } from '../../model/session.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-reception-list',
  templateUrl: './reception-list.component.html',
  styleUrls: ['./reception-list.component.css']
})
export class ReceptionListComponent implements OnInit {

  sessions : { ForReceptionist : Session[] }

  constructor(  private sessionService : SessionService ) { }

  ngOnInit() {
    
    this.sessionService.sessionChanged.subscribe( (sessions : any) => {
      this.sessions = sessions;
    } )
    
    this.sessions = this.sessionService.getSessions();

  }

}
