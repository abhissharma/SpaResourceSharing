import { Topic } from "./topic.model";
import { DigilabHost } from "./digilabHost.model";

export class Digilab {
    
    public id : number;
    public name : string;
    public receptionEmail : string;
    public locationLat : number;
    public locationLong : number;
    
    public isEmailNotificationEnabled : boolean;
    public isPushNotificationEnabled : boolean;
    public isOpenForBusiness : boolean;
    public feedBackDelayTime : number;
    public preBookExpiryTime : number;
    public receptionistMailDeliveryHours : number;

    public monday : boolean;
    public tuesday : boolean;
    public wednesday : boolean;
    public thursday : boolean;
    public friday : boolean;
    
    public startTime : Date;
    public endTime : Date;
    public question1 : string;
    public question2 : string;
    public email : string;
    public timezone : string;
    public timezoneId : string;

    public Topics : Topic[];
    public DigilabHosts : DigilabHost[];

    constructor(   )
    {
        this.Topics = [];
        this.DigilabHosts = [];
        this.isEmailNotificationEnabled = false;
        this.isPushNotificationEnabled = false;
        this.isOpenForBusiness = false;
    }

}