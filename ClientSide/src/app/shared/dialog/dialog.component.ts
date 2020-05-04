import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TripService } from '../trip.service';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  headerLogin: string;
  textLogin: string;
  buttonLoginOk: string;
  buttonLoginCancel: string;
  isLogin = false;
  noRedirect = false;
  endPlanning = false;
  isHeader = false;
  addGuide = false;

  constructor(private router: Router, private general: GeneralService, private tripService: TripService, @Inject(MAT_DIALOG_DATA) data) {

    this.headerLogin = data.header;
    this.textLogin = data.text;
    this.buttonLoginOk = data.buttonTextOk;
    this.buttonLoginCancel = data.buttonTextCancel;
    if (data.component == "filtering" || data.component == "endPlanning" || data.component == "header")
      this.noRedirect = true;
    if (data.component == "login")
      this.isLogin = true;
    if (data.value == "end")
      this.endPlanning = true;
    if (data.component == "header")
      this.isHeader = true;
    debugger;
    if (data.component == "guide")
      this.addGuide = true;
  }

  ngOnInit() {
  }

  deleteTrip() {
    debugger;
    if (this.isHeader) {
      this.tripService.deleteTripList();
      this.tripService.deleteGuideToTrip();
      window.location.href = 'planYourTrip/tripPlanning';
    }
    if (this.addGuide)
      this.router.navigate(["planYourTrip/endPlanning"]);
  }

  IsSignIn() {
    if (!this.noRedirect)
      this.router.navigate(["planYourTrip/login"]);
    if (this.endPlanning)
      this.router.navigate(["planYourTrip/tripPlanning"]);
    if (this.addGuide||this.isLogin)
      this.router.navigate(["planYourTrip/tripPlanning"]);
  }
}