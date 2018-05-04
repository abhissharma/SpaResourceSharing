import { Topic } from './topic.model';
import { Initiator } from './initiator.model';
import { SessionHost } from './sessionHost.model';
import { SessionState } from './sessionState.model';
import { SessionTopic } from './sessionTopic.model';
import { Digilab } from './digilab.model';

export class Session{

    public id: number;
    public name: string;
    public startDateTime: Date;
    public endDateTime: Date;
    public stateId: string;
    public duration: number;
    public companyId: number;
    public reason: string;
    public description: string;

    public initiatorName: string;
    public initiatorEmail: string;
    
    public digilabId: number;
    public digilabSpaceId: number;

    public mailToReceptionistSent: boolean;
    public mailToGuestSent: boolean;
    public modifiedOn: Date;
    public preBookExpiryTime: number;
    public reminderMailSent: boolean;

    public Guests = [];
    public SessionTopics = [];

    public SessionHost : SessionHost;

    constructor() {  }

}