import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Digilab } from "../model/digilab.model";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from "../utils/constants";

@Injectable()
export class DigilabService{

    digilabChanged;
    private digilabs : Digilab[];

    constructor(private http: HttpClient){
        
        this.digilabs = [];
        this.digilabChanged = new Subject<Digilab[]>();
        this.setDigilabs();
    
    }

    setDigilabs(){
        
        return new Promise( ( resolve , reject ) => {
            this.http
            .get<any>( Constants.BASE_URL + `digilab` , { params : new HttpParams().set('token',localStorage.getItem('token')) } )
            .subscribe( (data) => {
                this.digilabs = data.payload;
                this.digilabChanged.next( data.payload.slice() );
                resolve();
            } );
        })

    }

    getDigilabs() {   
        
        if(this.digilabs === null)
            this.setDigilabs();

        return this.digilabs.slice();
        
    }

    getDigilab( index : number ) {
        var digilab = this.digilabs.filter( (digilab : Digilab) => digilab.id === index )[0]
        if(!digilab )
            return null;
        return digilab;
    }

    updateDigilab( index , updatedDigilab  ){
        
        return new Promise( ( resolve , reject ) => {
            this.http.put( Constants.BASE_URL +  'digilab/' + index , updatedDigilab ,  { params : new HttpParams().set('token',localStorage.getItem('token')) }  )
            .subscribe( (data) => {
                this.setDigilabs();
                resolve();
            } , (err) => {
                console.log(err);
                reject();
            } );
        })
        
    }

    createDigilab( newDigilab ){
        return new Promise( ( resolve , reject ) => {
            this.http.post( Constants.BASE_URL + 'digilab'  , newDigilab ,  { params : new HttpParams().set('token',localStorage.getItem('token')) } )
                .subscribe( (data) => {
                    this.setDigilabs();
                    resolve();
                } , (err) => {
                    console.log(err);
                    reject();
                } );
        })
    }

}