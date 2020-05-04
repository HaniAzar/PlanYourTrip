import { Component, OnInit } from '@angular/core';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { GeneralService } from 'src/app/shared/general.service';
import { Users } from 'src/app/classes/users';
import { TourGuides } from 'src/app/classes/tour-guides';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Polyline } from '@agm/core/services/google-maps-types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GuidePlaningTripComponent } from '../guide-planing-trip/guide-planing-trip.component';
import { UsersService } from 'src/app/shared/users.service';
import { TripService } from 'src/app/shared/trip.service';
import { usersTrips } from 'src/app/classes/usersTrips';
import { AttractionsToUsersTrips } from 'src/app/classes/attractions-to-users-trips';



declare const google: any;
interface Location { lat: any; lng: any; }
interface marker{location:Location,name:string}

@Component({
  selector: 'app-end-planning',
  templateUrl: './end-planning.component.html',
  styleUrls: ['./end-planning.component.scss']
})

export class EndPlanningComponent implements OnInit {
  trip: TouristAttractions[] = [];
  userEmail: string;
  guide: TourGuides;
  user: Users;
  attractionString: TouristAttractions[] = [];
  geocoder: any;
  tripPoints: marker[] = [];
  polyline: any;
  endOk = false;
  usersTrips: usersTrips;
  userTripId: number;
  attractionToUserTrip: AttractionsToUsersTrips;
  guideToTrip: TourGuides;
  distanceList: string[] = [];
  removeAttraction = false;
  edit = false;

  constructor(private generalService: GeneralService, private tripService: TripService, private route: Router, private dialog: MatDialog, private userService: UsersService) { }

  ngOnInit() {
    this.guideToTrip = this.tripService.getGuideToTrip();

    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userEmail = this.user.eMail;
    }
    if (JSON.parse(localStorage.getItem('guide')))
      this.guide = JSON.parse(localStorage.getItem('guide'));

    if (JSON.parse(localStorage.getItem('distance'))) {
      this.distanceList = JSON.parse(localStorage.getItem('distance'));
      console.log(this.distanceList);
    }
    this.trip = this.tripService.getTripList();
    this.setTripPoints();
    if (typeof google === 'object' && typeof google.maps === 'object') {
      this.polyline = {
        path: this.tripPoints,
        color: 'blue',
      }
    }
  }
  setTripPoints() {
    this.tripPoints=[];
    this.trip.forEach(element => {
      let location: Location = {
        lat: parseFloat(element.latitude),
        lng: parseFloat(element.longitude),
      }
      let point:marker={
        location: location,
        name:element.attractionName
      }
      this.tripPoints.push(point);
    });
  }

  editTrip() {
    if (!this.edit)
      this.edit = true;
    if (this.removeAttraction)
      this.removeAttraction = false;
  }

  openRemoveAttraction() {
    if (!this.removeAttraction)
      this.removeAttraction = true;
    if (this.edit)
      this.edit = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.distanceList = [];
    let location1, location2;
    moveItemInArray(this.trip, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.trip.length - 1; i++) {
      location1 = new google.maps.LatLng(this.trip[i].latitude, this.trip[i].longitude);
      location2 = new google.maps.LatLng(this.trip[i + 1].latitude, this.trip[i + 1].longitude);
      this.distanceList.push(this.calculateDistance(location1, location2));
      this.tripService.setDistanceList(this.distanceList);
    }
    this.setTripPoints();
  }
  print() {
    window.print();
  }
  deleteAttractionFromTrip(attractionId: number) {
    this.trip = this.tripService.getTripList();
    this.updateDistance(attractionId);
    this.trip = this.tripService.deleteAttractionFromTripList(attractionId);
    this.tripService.updateTripList(this.trip);
    if (this.trip.length == 0)
      alert("שים לב! הסרת את כל האתרים מהמסלול שלך");
      // this.dialog.open(DialogComponent, { data: { text: "שים לב! הסרת את כל האתרים מהמסלול שלך ", buttonTextCencel: "אישור" } });
    let attraction = this.trip.find(x => x.id == attractionId);
    const index = this.trip.indexOf(attraction, 0);
    this.tripPoints.splice(index, 1);
  }
  calculateDistance(location1, location2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(location1, location2) / 1000).toFixed(2);
  }
  updateDistance(attractionId: number) {
    let attraction = this.trip.find(x => x.id == attractionId);
    const index = this.trip.indexOf(attraction, 0);
    if (index == 0) {
      this.distanceList.splice(0, 1);
      this.tripService.setDistanceList(this.distanceList);
    }
    else
      if (index == this.distanceList.length) {
        this.distanceList.splice(this.distanceList.length - 1, 1);
        this.tripService.setDistanceList(this.distanceList);
      }
      else {
        let location1 = new google.maps.LatLng(this.trip[index - 1].latitude, this.trip[index - 1].longitude);
        let location2 = new google.maps.LatLng(this.trip[index + 1].latitude, this.trip[index + 1].longitude);
        this.tripService.updateDistanceList(index, this.calculateDistance(location1, location2));
      }
  }
  sendEmail() {
    this.trip.forEach(element => {
      this.attractionString.push(element);
    });
    if (this.userEmail)
      this.generalService.sendEmail(this.userEmail, this.attractionString, 1).subscribe(data => {
        const dialogRef = this.dialog.open(DialogComponent, { data: { component: "endPlanning", header: "פרטי הטיול שלך נשלחו לכתובת המייל הרשומה במערכת", text: "בהנאה! תודה שתכננת עם Plan Your Trip", buttonTextOk: "אישור" } });
        dialogRef.afterClosed().subscribe(result => {
          this.tripService.deleteTripList();
          this.route.navigate(["planYourTrip/tripPlanning"]);
        });
      });
    else {
      this.openDialog();
      this.generalService.addToStorage('trip', this.trip);
    }
  }
  back() {
    this.route.navigateByUrl('planYourTrip/tripPlanning');
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { data: { header: "מצטערים, לא ניתן לשלוח מייל", text: "עדיין לא רשום ל - Plan Your Trip? נרשמת ואינך מחובר?", buttonTextOk: "התחבר או הרשם כעת", buttonTextCancel: "לא כעת, תודה" } });
  }
  finalEnd() {
    this.endOk = !this.endOk;
    if (this.user) {
      if (this.tripService.getGuideToTrip() != null) {
        this.guideToTrip = this.tripService.getGuideToTrip();
        this.generalService.sendEmail(this.guideToTrip.eMail, this.tripService.getTripList(), 2).subscribe(data => { alert("הבקשה נשלחה למדריך בהצלחה") });
        this.usersTrips = new usersTrips(this.user.id, this.guideToTrip.id, true, JSON.parse(localStorage.getItem('tripDate')));
      }
      else
        this.usersTrips = new usersTrips(this.user.id, 0, false, JSON.parse(localStorage.getItem('tripDate')));
      this.userService.addUserTrip(this.usersTrips).subscribe(data => {
        if (data) {
          this.userTripId = data.id;
          this.trip.forEach(attraction => {
            this.attractionToUserTrip = new AttractionsToUsersTrips();
            this.attractionToUserTrip.tripId = this.userTripId;
            this.attractionToUserTrip.attractionId = attraction.id;
            this.userService.addAttractionToUserTrip(this.attractionToUserTrip).subscribe();
          });
          this.tripService.deleteTripList();
          localStorage.removeItem('distance');
        }
        if (this.guide) {
          const dialogRef = this.dialog.open(GuidePlaningTripComponent, { hasBackdrop: false, width: '100px' });
          dialogRef.disableClose = true;
        }
      });
    }
    if (this.guide)
      this.dialog.open(GuidePlaningTripComponent);

  }
  mapReady() {
    if (!this.geocoder)
      this.geocoder = new google.maps.Geocoder();
  }
  cencelGuideFromTrip() {
      this.tripService.deleteGuideToTrip();
      alert("המדריך נמחק מהטיול בהצלחה!");
  }
  addGuideToTrip() {
    this.route.navigate(["planYourTrip/addGuideToTrip"]);
  }
}
