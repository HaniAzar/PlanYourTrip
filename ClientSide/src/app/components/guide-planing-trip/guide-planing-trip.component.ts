import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TripsForJoining } from '../../classes/trips-for-joining';
import { TourGuides } from '../../classes/tour-guides';
import { GuidesService } from '../../shared/guides.service';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { TripsForJoiningService } from 'src/app/shared/trips-for-joining.service';
import { GeneralService } from 'src/app/shared/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TripService } from 'src/app/shared/trip.service';
@Component({
  selector: 'app-guide-planing-trip',
  templateUrl: './guide-planing-trip.component.html',
  styleUrls: ['./guide-planing-trip.component.scss']
})
export class GuidePlaningTripComponent implements OnInit {
  planingGuideForm: FormGroup;
  tripForJoining: TripsForJoining = new TripsForJoining();
  guideStorage: TourGuides;
  anoutherDate: boolean = false;

  trips: TouristAttractions[] = [];
  tripForJoiningnew: TripsForJoining;
  constructor(private formBuilder: FormBuilder, private generalService: GeneralService, private tripService: TripService,
    private tripsForJoiningService: TripsForJoiningService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }
  ngOnInit() {
    this.planingGuideForm = this.formBuilder.group({
      maxTourist: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(3)]],
      tripDate: ['', [Validators.required]],
      leavingTime: ['', [Validators.required]],
      priceTrip: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      notes: ['',],
    });
  }
  get maxTourist() {
    return this.planingGuideForm.get('maxTourist');
  }
  onSubmit() {
    this.guideStorage = JSON.parse(localStorage.getItem('guide'));
    this.tripForJoining = new TripsForJoining(this.guideStorage.id, this.planingGuideForm.controls.maxTourist.value as number,
      this.planingGuideForm.controls.tripDate.value, this.planingGuideForm.controls.leavingTime.value,
      this.planingGuideForm.controls.priceTrip.value, this.planingGuideForm.controls.notes.value);
    this.tripsForJoiningService.AddTripForJoining(this.tripForJoining).subscribe(data => {
      if (data) {
        this.tripForJoiningnew = data;
        this.addAttractionsToGuides();
        this.openSnackBar('הטיול נשמר בהצלחה', 'ויוצג בטיולים מאורגנים');
        this.dialog.closeAll();
      }
    });
    this.trips = this.tripService.getTripList();
  }
  addAttractionsToGuides() {
    this.trips.forEach(element => {
      this.tripsForJoiningService.addAttractionToGuideTrip(this.tripForJoiningnew.id, element).subscribe(data => console.log(data));
    });
  }
  checkedDate() {
    if (this.planingGuideForm.controls.tripDate.value > Date.now() || this.planingGuideForm.controls.tripDate.value == "")
      this.anoutherDate = true;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}



