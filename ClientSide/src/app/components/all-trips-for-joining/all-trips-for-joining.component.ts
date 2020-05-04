import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GuidesService } from 'src/app/shared/guides.service';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { TripsForJoining } from 'src/app/classes/trips-for-joining';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { JoiningToTripComponent } from '../joining-to-trip/joining-to-trip.component';
import { TripsForJoiningService } from 'src/app/shared/trips-for-joining.service';
import { TourGuides } from 'src/app/classes/tour-guides';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { ShareTripComponent } from '../share-trip/share-trip.component';
import { GeneralService } from 'src/app/shared/general.service';
import { ImagesService } from 'src/app/shared/images.service';
@Component({
  selector: 'app-all-trips-for-joining',
  templateUrl: './all-trips-for-joining.component.html',
  styleUrls: ['./all-trips-for-joining.component.scss']
})
export class AllTripsForJoiningComponent implements OnInit {
  @Output() tripOutput: EventEmitter<any> = new EventEmitter();
  attractionsToTrip: string[][];
  tripsForJoining: TripsForJoining[] = [];
  tripId: number;
  guides: TourGuides[] = [];
  attractionsDateOver: TripsForJoining[] = [];
  imagesToTrip: any[][];
  isGuide = false;

  constructor(private tripForJoiningSrevice: TripsForJoiningService, private router: Router, private imagesService: ImagesService,
    private dialog: MatDialog, private guideService: GuidesService, private generalService: GeneralService) {
    this.attractionsToTrip = [];
    this.imagesToTrip = [];
  }
  ngOnInit() {
    this.tripForJoiningSrevice.getAllTripForJoining().subscribe(y => {
      if (y) {
        this.deleteTrip(y);
      }
      this.tripForJoiningSrevice.getAllTripForJoining().subscribe(data => {
        if (data) {
          this.tripsForJoining = data,
            data.forEach(element => {
              this.attractionsToTrip[element.id] = [];
              this.imagesToTrip[element.id] = [];
              this.tripForJoiningSrevice.getAttractionsIdByTripId(element.id).subscribe(attractions => {
                if (attractions) {
                  attractions.forEach(attraction => {
                    this.imagesToTrip[element.id][attraction] = [];
                    this.imagesService.getImagesByAttractionId(attraction).subscribe(images => {
                      if (images)
                        this.imagesToTrip[element.id][attraction] = images;
                    })
                  });
                }
              });
              this.tripForJoiningSrevice.getAttractionsGuideById(element.id).subscribe(z => { this.attractionsToTrip[element.id] = z });
              this.guideService.getGuideById(element.guideId).subscribe(x => { this.guides[element.id] = x; });
            });
        }
      });
    });
    if (JSON.parse(localStorage.getItem('guide')))
      this.isGuide = true;
  }
  signToTrip(tripId: number) {
    this.tripId = tripId;
    if (JSON.parse(localStorage.getItem('user')) == null)
      this.openDialog();
    else
      this.dialog.open(JoiningToTripComponent);
  }
  openDialog() {
    if (this.isGuide)
      this.dialog.open(DialogComponent, { data: { component: "allTripsForJoining", header: "אינך רשאי להצטרף לטיול מאורגן", text: "ההרשמה לטיולים מאורגנים מאופשרת למשתמשים בלבד! באפשרותך להרשם לאתר כמשתמש ולהצטרף לטיול.", buttonTextOk: "הרשם / התחבר", buttonTextCancel: "לא כעת" } });
    else {
      const dialogRef = this.dialog.open(DialogComponent, { data: { component: "allTripsForJoining", header: "אינך מטייל רשום", text: " ההרשמה לטיולים מאורגנים מאופשרת למטיילים רשומים בלבד. אם נרשמת בעבר, התחבר כעת", buttonTextOk: "הרשם / התחבר", buttonTextCancel: "לא כעת" } });
      dialogRef.disableClose=true;
    }
  }


  lastDays(trip: TripsForJoining): boolean {
    if (Number(new Date(trip.tripDate)) - Date.now() > (89186943 * 4))
      return false;
    return true;
  }

  dayOver(trip: TripsForJoining): boolean {
    if (Date.now() < Number(new Date(trip.tripDate)))
      return false;
    return true;
  }
  deleteTrip(TripsForJoining: TripsForJoining[]) {
    TripsForJoining.forEach(element => {
      if (Date.now() > (Number(new Date(element.tripDate)))) {
        this.attractionsDateOver.push(element);
      }
    });
    this.tripForJoiningSrevice.deleteTripForJoiningById(this.attractionsDateOver).subscribe(x => { if (x) console.log("delete!!") });
  }
  share(trip: TripsForJoining) {
    this.tripOutput.emit(trip);
    this.generalService.addToStorage('tripByIdToShare', trip);
    this.dialog.open(ShareTripComponent);
  }


}
