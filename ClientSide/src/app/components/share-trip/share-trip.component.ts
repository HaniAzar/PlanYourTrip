import { Component, OnInit, Input } from '@angular/core';
import { TripsForJoining } from 'src/app/classes/trips-for-joining';
import { GeneralService } from 'src/app/shared/general.service';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { AttractionsToGuidesTrips } from 'src/app/classes/attractions-to-guides-trips';
import { GuidesService } from 'src/app/shared/guides.service';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-share-trip',
  templateUrl: './share-trip.component.html',
  styleUrls: ['./share-trip.component.scss']
})
export class ShareTripComponent implements OnInit {
  trip: TripsForJoining;
  attractionTrip: TouristAttractions[] = [];
  @Input()
  public set sharedTrip(trip: TripsForJoining) {
    this.trip = trip;
  }
  share: FormGroup;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private generalService: GeneralService, private guideService: GuidesService, private attractionService: TouristAttractionsService) { }

  ngOnInit() {
    this.share = this.fb.group({
      email: ['', [Validators.email]],
    });

    this.trip = JSON.parse(localStorage.getItem('tripByIdToShare'));
    this.guideService.getallAttractionToGuideByTripId(this.trip.id).subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.attractionService.getAttractionById(element.attractionId).subscribe(x => { if (x) { debugger; this.attractionTrip.push(x); } })
        });
      }
    })
  }
  get emeil() {
    return this.share.get('email');
  }
  send() {
    if (this.trip)
      this.generalService.sendEmail(this.share.controls.email.value, this.attractionTrip, 4).subscribe(data => {
        this.dialog.closeAll();
        alert("פרטי הטיול נשלחו במייל!");
      });
  }

}
