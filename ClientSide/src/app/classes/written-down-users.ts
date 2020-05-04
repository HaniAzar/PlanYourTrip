export class WrittenDownUsers {
      Id: number;
      TripForJoiningId: number;
      UserId: number;
      numOfTourists: number;

      constructor(TripForJoiningId?, UserId?,numOfTourists?) {
            this.TripForJoiningId = TripForJoiningId;
            this.UserId = UserId;
            this.numOfTourists=numOfTourists;
      }

}