import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { Constants } from '../utils/constants';
import * as moment from "moment";


@Injectable()
export class LoginService {
  
  email;
  userType;
  name;
  token;

  constructor(private http: HttpClient) { 
     this.email = localStorage.getItem('email');
     this.userType = localStorage.getItem('userType');
     this.name = localStorage.getItem('name');
     this.token = localStorage.getItem('token');
  }
    

  storeUserDetails(userDetails) {
    this.email = userDetails.email;
  }

  validateCredentials (email, password){
    
    return new Promise( ( resolve , reject ) => {

      var requestJson = {"email": email,
                      "password": password};
    
      this.http.post( Constants.BASE_URL + 'login', requestJson)
        .subscribe( (responseJson : any)  => {
      
          var success = responseJson.success;
          
          if( success ) {
            
            this.userType = responseJson.payload.user_type;
            this.email = responseJson.payload.email;
            this.name = responseJson.payload.name;
            this.token = responseJson.payload.token;

            const expiresAt = moment().add( 24 ,'hours');

            // console.log( JSON.stringify(moment().valueOf()) );
            // console.log(JSON.stringify(expiresAt.valueOf()));
            
            localStorage.setItem( 'email' , this.email  );
            localStorage.setItem( 'userType' , this.userType  );
            localStorage.setItem( 'name' , this.name );
            localStorage.setItem( 'token' , this.token );
            localStorage.setItem( 'expires_at' , JSON.stringify(expiresAt.valueOf()) );

            resolve();
          } else {
            reject ( responseJson.error.error_message );
          }
            
        }
      );

    } );  
    
  }

  getUserDetails(): string{
    return this.email;
  }

  logOut() {
    localStorage.removeItem( 'expires_at' );
    localStorage.removeItem( 'userType' );
    localStorage.removeItem( 'email' );
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'name' );
  }

}
