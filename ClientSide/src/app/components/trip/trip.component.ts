import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { Router } from '@angular/router';
import { TripPlanningComponent } from '../trip-planning/trip-planning.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilteringAttractionsComponent } from '../filtering-attractions/filtering-attractions.component';
import { GuidePlaningTripComponent } from '../guide-planing-trip/guide-planing-trip.component';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { last } from '@angular/router/src/utils/collection';
import { Users } from 'src/app/classes/users';
import { UsersService } from 'src/app/shared/users.service';
import { FloatLabelType } from '@angular/material/core';
import { GeneralService } from 'src/app/shared/general.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TourGuides } from 'src/app/classes/tour-guides';
import { TripService } from 'src/app/shared/trip.service';
declare const google: any;
interface Location { lat: number; lng: number; }
declare const location2: Location;

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})

export class TripComponent implements OnInit {
  trip: TouristAttractions[] = [];
  isGuide: boolean;
  currentUser: Users;
  currentAttraction: TouristAttractions;
  far: number;
  distance: string;
  prevDistance: string[] = [];
  distanceList: string[] = [];
  place: number;
  geocoder: any;
  tripDate: string;

  constructor(private router: Router, public dialog: MatDialog, private generalService: GeneralService, private tripService: TripService) { }

  ngOnInit() {
    if (this.tripService.getTripList() != null) {
      this.trip = this.tripService.getTripList();
      let location1;
      let location2;
      location1 = new google.maps.LatLng(this.trip[this.trip.length - 1].latitude, this.trip[this.trip.length - 1].longitude);
      if (this.trip.length == 1) {
        this.tripService.cloneDistanceList();
      }
      if (this.trip.length > 1) {
        if (localStorage['distance'])
          this.distanceList = JSON.parse(localStorage.getItem('distance'));
        location2 = new google.maps.LatLng(this.trip[this.trip.length - 2].latitude, this.trip[this.trip.length - 2].longitude);
        this.distance = this.calculateDistance(location1, location2);
        if (this.distance)
          this.distanceList.push(this.distance);
        this.generalService.addToStorage('distance', this.distanceList);
        this.tripService.setDistanceList(this.distanceList);
      }
    }
    if (localStorage['guide'] != null)
      this.isGuide = true;
    if (localStorage['user'] != null)
      this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  editTrip() {
    this.router.navigate(["planYourTrip/endPlanning"]);
  }

  mapReady() {
    if (!this.geocoder)
      this.geocoder = new google.maps.Geocoder();
  }

  calculateDistance(location1, location2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(location1, location2) / 1000).toFixed(2);
  }

  findLocation(address: string): Location {
    let location = { lat: 0, lng: 0 };
    if (!address)
      return;
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(status);
      if (status == 'OK') {
        location.lat = results[0].geometry.location.lat();
        location.lng = results[0].geometry.location.lng();
        return location;
      }
    });
    return location;
  }

  deleteAttractionFromTrip(attractionId: number) {
    this.trip = this.tripService.getTripList();
    this.updateDistance(attractionId);
    this.trip = this.tripService.deleteAttractionFromTripList(attractionId);
    this.tripService.updateTripList(this.trip);
    if (this.trip.length == 0) {
      this.dialog.closeAll();
    }
  }

  updateDistance(attractionId: number) {
    debugger
    let attraction = this.trip.find(x => x.id == attractionId);
    const index = this.trip.indexOf(attraction, 0);
    if (index == 0) {
      this.distanceList.splice(0, 1);
      this.tripService.setDistanceList(this.distanceList);
    }
    else
      if (index == this.distanceList.length) {
        this.distanceList.splice(this.distanceList.length-1, 1);
        this.tripService.setDistanceList(this.distanceList);
        
      }
      else {
        let location1 = new google.maps.LatLng(this.trip[index - 1].latitude, this.trip[index - 1].longitude);
        let location2 = new google.maps.LatLng(this.trip[index + 1].latitude, this.trip[index + 1].longitude);
        this.tripService.updateDistanceList(index, this.calculateDistance(location1, location2));
      }
  }

  addGuide() {
    this.router.navigate(["planYourTrip/addGuideToTrip"]);
    this.dialog.closeAll();
  }

}
