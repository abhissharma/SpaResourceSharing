import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class BackNavigationService{

    id: boolean;

    stateChanged = new Subject<boolean> ();
    
    setBackOption(){
        this.id = true;
        this.stateChanged.next(true);
    }
    
    removeBackOption(){
        this.id = false;
        this.stateChanged.next(false);
    }

}