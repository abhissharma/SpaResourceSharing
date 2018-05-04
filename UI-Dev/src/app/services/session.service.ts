import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from '../model/session.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Constants } from '../utils/constants';
import { UserType } from '../model/userType.model';

@Injectable()
export class SessionService {

  sessionChanged = new Subject<Session[]>();

  private sessions: any = new Object();

  constructor (private http: HttpClient , private loginService : LoginService) { 
    // this.setSessions();
    
    
  }

   setSessions () {
   
    return new Promise( ( resolve , reject ) => {
      let requestJson : any = {};
      requestJson.email = localStorage.getItem('email');
      requestJson.usertype = localStorage.getItem('userType');

      this.http.post<any>( Constants.BASE_URL + 'sessions' , requestJson , { params : new HttpParams().set('token',localStorage.getItem('token')) } )
        .subscribe((data) => {
          this.sessions = data.payload;
          this.sessionChanged.next( this.sessions );
          resolve();
      }, (err) => {
        console.log(err);
      });
    })

    
   }

   getSessions() {
    return this.sessions;
   }

   getSession ( index: number , role : string ) {
    let list : Session[];
    if( role === UserType.HOST )
      list = this.sessions['ForHost'];
    if( role === UserType.INITIATOR )
      list = this.sessions['ForInitiator'];
    if( role === UserType.RECEPTIONIST )
      list = this.sessions['ForReceptionist'];
    var session = list.filter( (session: Session) => { return session.id === index })[0]
    if( !session )
      return null;
    return JSON.parse(JSON.stringify(session));
   }

   createSession(newSession) { 
     return new Promise((resolve, reject) => {
       this.http.post(Constants.BASE_URL + 'session', newSession , { params : new HttpParams().set('token',localStorage.getItem('token')) })
       .subscribe((data) => {
          this.setSessions();
          console.log(data);
          resolve();
       }, (err) => {
         console.log(err);
         reject();
      });
   })
  }

  updateSession( updatedSession ) {
    return new Promise( (resolve,reject) => {
      this.http.put(Constants.BASE_URL + 'session/' + updatedSession.id , updatedSession , { params : new HttpParams().set('token',localStorage.getItem('token')) })
       .subscribe((data) => {
          this.setSessions();
          console.log(data);
          resolve();
       }, (err) => {
         console.log(err);
         reject();
      });
    } );
  }
}
