export class Guest{
    public id : number;
    public name : string;
    public email : string;
    public contact : string;
    public company: string;
    public sessionId : number;

    constructor() {
        this.name = '';
        this.email = '';
        this.contact = '';
        this.company = '';
    }

}