import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { LoginService } from "../services/login.service";
import { UserType } from "../model/userType.model";

@Injectable()
export class InitiatorGuard implements CanActivate {
    
    constructor( private router : Router , private loginService : LoginService ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        var userType = this.loginService.userType;

        if( userType === UserType.INITIATOR || userType === UserType.HOST || userType === UserType.ADMIN )
            return true;
        else if( userType === UserType.RECEPTIONIST ) {
            this.router.navigate( ['/reception'] );
            return false;
        }
        else{
            this.router.navigate( ['/abc'] );
            return false;
        }

    } 
}
