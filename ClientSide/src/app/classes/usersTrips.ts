export class usersTrips {
    id: number;
    userId: number;
    guideId: number;
    tripDate: string;
    isSentRequest: boolean;
    disagreeTrip: boolean;

    constructor(userId?, guideId?, isSentRequest?, tripDate?, disagreeTrip?) {
        this.userId = userId;
        this.guideId = guideId;
        this.tripDate = tripDate;
        this.isSentRequest = isSentRequest;
        this.disagreeTrip = disagreeTrip;
    }
}
