import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddGuideToTripComponent } from '../add-guide-to-trip/add-guide-to-trip.component';

@Component({
    selector: 'app-trip-planning',
    templateUrl: './trip-planning.component.html',
    styleUrls: ['./trip-planning.component.scss']
})
export class TripPlanningComponent implements OnInit {

    constructor(public router: Router, private dialog: MatDialog) { }
    // isGuide: boolean = false;
    ngOnInit() {
        // if (localStorage['guide'] != null)
        //     this.isGuide = true;
        // else
        //     this.isGuide = false;
    }
    // addGuide() {
        // this.dialog.open(AddGuideToTripComponent);
        // this.router.navigate(["planYourTrip/tripPlanning/addGuideToTrip"]);
    // }
}