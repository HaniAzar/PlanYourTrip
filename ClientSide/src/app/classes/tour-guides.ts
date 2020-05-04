export class TourGuides {
    id: number;
    guideName: string;
    eMail: string;
    phoneNumber: string;
    languages: string;
    workingDays: string;
    password: string;
    details: string;
    profile: string;

    constructor(guideName?, eMail?, phoneNumber?, workingDays?, password?, languages?, details?, profile?) {
        this.guideName = guideName;
        this.eMail = eMail;
        this.phoneNumber = phoneNumber;
        this.workingDays = workingDays;
        this.password = password;
        this.languages = languages;
        this.details = details;
        this.profile = profile;
    }

}
