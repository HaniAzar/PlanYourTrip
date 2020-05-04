import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/shared/general.service';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { TripService } from 'src/app/shared/trip.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameUser: string;
  nameGuide: string;
  nameManager: string;
  IsExist: boolean = false;
  trip = false;

  constructor(private router: Router, public dialog: MatDialog, private tripService: TripService, private generalService: GeneralService) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('guide')) && localStorage['guide'] != null) {
      this.nameGuide = JSON.parse(localStorage.getItem('guide'));
      this.IsExist = true;
    }
    if (JSON.parse(localStorage.getItem('user')) && localStorage['user'] != null) {
      this.nameUser = JSON.parse(localStorage.getItem('user'));
      this.IsExist = true;
    }
    if (JSON.parse(localStorage.getItem('manager')) && localStorage['manager'] != null) {
      this.nameManager = JSON.parse(localStorage.getItem('manager'));
      this.IsExist = true;
    }
    if (this.tripService.getTripList().length > 0)
      this.trip = true;
  }

  breakAway() {
    this.IsExist = false;
    this.generalService.clearStorage();
    window.location.href = 'planYourTrip/tripPlanning';
  }

  scrollHeader() {
    document.querySelector('.navbar').scrollIntoView({ behavior: "smooth" });
  }

  planNewTrip() {
    if (this.tripService.getTripList().length > 0)
      this.dialog.open(DialogComponent, { data: { component: "header", header: "תכנון טיול מחדש", text: "האם אתה בטוח שברצונך למחוק לגמרי את הטיול שתכננת?", buttonTextOk: "ביטול", buttonTextCancel: "מחיקה" } });
    else
      alert("אין לך אתרים בטיול, התחל לתכנן את הטיול שלך כעת.")
  }
  addGuideToTrip() {
    this.router.navigate(["planYourTrip/addGuideToTrip"]);
  }
  showMyTrip() {
    if (this.tripService.getTripList().length > 0)
      this.router.navigate(["planYourTrip/endPlanning"])
    else
      alert("אין לך אתרים בטיול, התחל לתכנן את הטיול שלך כעת.")
  }
}



