export class GuidesForJoiningToSite {

    id: number;
    guideName: string;
    eMail: string;
    phoneNumber: string;
    languages: string;
    workingDays: string;
    password: string;
    details:string;
    profile:string;

    constructor(guideName, eMail, phoneNumber, languages, workingDays, password,details?,profile?) {
        this.guideName = guideName;
        this.eMail = eMail;
        this.phoneNumber = phoneNumber;
        this.languages = languages;
        this.workingDays = workingDays;
        this.password = password;
        this.details=details;
        this.profile=profile;
    }
}

