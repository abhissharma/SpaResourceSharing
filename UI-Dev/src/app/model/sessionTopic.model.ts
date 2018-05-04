import { Session } from "./session.model";
import { Digilab } from "./digilab.model";

export class SessionTopic{

    public id: number;
    public digiSessionId: number;
    public name: string;
    public digilabId: number;

    constructor( name : string , digilabId : number ) {
        this.name = name;
        if( digilabId )
            this.digilabId = digilabId;
    }


}