import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserType } from '../../model/userType.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAdmin : boolean;
  name = null;

  constructor( private router : Router , private loginService : LoginService ) { 
    if(loginService.name !== 'null' )
      this.name = loginService.name;
   }

  ngOnInit() {
    var userType = this.loginService.userType;
    if( userType === UserType.ADMIN )
      this.isAdmin = true;
    else
      this.isAdmin = false;

  }

  onLogOut() {
    this.loginService.logOut();
    this.router.navigate( ['/'] );
  }

}
