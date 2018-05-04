import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  showSpinner : boolean = false;

  constructor(private loginService: LoginService,
              private router: Router ,
              public snackBar: MatSnackBar  ) { }


  ngOnInit() {
  }


  onSubmit() {

    this.showSpinner = true;

    var details = this.loginForm.value;
    
    this.loginService
      .validateCredentials( details.email, details.password )
      .then( ( ) => {
        this.showSpinner = false;
        localStorage.setItem( 'isAuthenticated' , 'true' );
        this.router.navigateByUrl('/main/about');
      } , ( message ) => {
        this.showSpinner = false;
        this.snackBar.open( message , 'Dismiss'  , {
          duration: 2500,
        });
      } ); 

  }

}
