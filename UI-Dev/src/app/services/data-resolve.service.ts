import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DigilabService } from "./digilab.service";
import { SessionService } from "./session.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataResolve implements Resolve<Boolean> {
    
    constructor( private sessionService : SessionService , private digilabService : DigilabService ){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Boolean | Observable<Boolean> | Promise<Boolean> {

        var promises = new Array();
        promises.push( this.digilabService.setDigilabs() );
        // promises.push( this.sessionService.setSessions() );
        

        return Promise.all( promises )
            .then( () => {
                return true;
            } , () => {
                return false;
            } );
    
    }
    

}