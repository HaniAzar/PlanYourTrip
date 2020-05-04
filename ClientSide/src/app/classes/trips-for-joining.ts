export class TripsForJoining {
      id: number; //מספור אוטומטי
      guideId: number;
      maxOfTourists: number;
      numOfSavedTourists: number;
      tripDate: Date;
      leavingTime: string;
      price: number;
      notes: string;
      constructor(guideId?, maxOfTourists?, date?, leavingTime?, price?, notes?) {
            this.guideId = guideId;
            this.maxOfTourists = maxOfTourists;
            this.tripDate = date;
            this.leavingTime = leavingTime;
            this.price = price;
            this.notes = notes;
      }
}