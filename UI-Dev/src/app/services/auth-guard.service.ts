import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import * as moment from "moment";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor( public router : Router ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        var expiresAt  = JSON.parse( localStorage.getItem('expires_at') );
    
        if( expiresAt ){
            
            if( moment().isBefore( moment(expiresAt) ) ){
                return true;
            } else {
                this.router.navigate( ['/'] );
                return false;
            }

        } else {
            this.router.navigate( ['/'] );
            return false;
        }

    }
}
