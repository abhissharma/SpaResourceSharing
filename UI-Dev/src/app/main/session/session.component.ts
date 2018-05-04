import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'] ,
  providers : []
})
export class SessionComponent implements OnInit {

  constructor( private sessionService : SessionService ) { }

  ngOnInit() {
  }

}
