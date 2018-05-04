export class SessionState{

    public static DRAFT : string = 'Draft';
    public static CANCELLED : string = 'Cancelled';
    public static CONFIRMED : string = 'Confirmed';
    public static REJECTED : string = 'Rejected';
    public static SUBMITTED : string = 'Submitted';
    public static PAST_DATE : string = 'Past Date';

    public id: number;
    public state: string;

    constructor() {  }

}