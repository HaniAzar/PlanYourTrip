export class TouristAttractions {
    id: number;
    attractionName: string;
    address: string;
    area: string;
    phoneNumber: string;
    payment: boolean;
    seasson: string;
    openningHour: string;
    closingHour: string;
    accessibility: string;
    hardnessLevel: string;
    link: string;
    notes: string;
    entranceToWater: boolean;
    isMatchGroups: boolean;
    isMatchChildren: boolean;
    isMatchFamilies: boolean;
    latitude: string;
    longitude: string;
    estimatedTime: string;

    constructor(attractionName?, address?, area?, phoneNumber?, payment?, seasson?
        , openningHour?, closingHour?, accessibility?, hardnessLevel?, link?, notes?, entranceToWater?,
        isMatchGroups?, isMatchChildren?, isMatchFamilies?, estimatedTime?) {
        this.attractionName = attractionName;
        this.address = address;
        this.area = area;
        this.phoneNumber = phoneNumber;
        this.payment = payment;
        this.seasson = seasson;
        this.openningHour = openningHour;
        this.closingHour = closingHour;
        this.accessibility = accessibility;
        this.hardnessLevel = hardnessLevel;
        this.link = link;
        this.notes = notes;
        this.entranceToWater = entranceToWater;
        this.isMatchFamilies = isMatchGroups;
        this.isMatchChildren = isMatchChildren;
        this.isMatchFamilies = isMatchFamilies;
        this.estimatedTime = estimatedTime;

    }
}





