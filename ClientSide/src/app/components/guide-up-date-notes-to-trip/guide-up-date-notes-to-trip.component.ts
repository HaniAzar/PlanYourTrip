import { Component, OnInit } from '@angular/core';
import { TripsForJoiningService } from 'src/app/shared/trips-for-joining.service';
import { TripsForJoining } from 'src/app/classes/trips-for-joining';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/shared/general.service';
import { Router } from '@angular/router';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { GuidesService } from 'src/app/shared/guides.service';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-guide-up-date-notes-to-trip',
  templateUrl: './guide-up-date-notes-to-trip.component.html',
  styleUrls: ['./guide-up-date-notes-to-trip.component.scss']
})
export class GuideUpDateNotesToTripComponent implements OnInit {
  updateTrip: FormGroup;
  tripsJoining: TripsForJoining;
  attractions: TouristAttractions[] = [];
  addAttraction: TouristAttractions;
  isExistAttraction: boolean = false;
  AskIfAddAtraction: boolean = false;
  isChange = false;
  constructor(private formBuilder: FormBuilder, private tripsForJoiningService: TripsForJoiningService,
    private generalService: GeneralService, private route: Router, private guideService: GuidesService,
    private attractionsService: TouristAttractionsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.tripsJoining = this.generalService.getTripForJoiningToUpdate();
    this.guideService.getallAttractionToGuideByTripId(this.tripsJoining.id).subscribe(data => {
      if (data) {
        data.forEach(element => {
          this.attractionsService.getAttractionById(element.attractionId).subscribe(x => {
            if (x)
              this.attractions.push(x);
          });
        });
      }
    });

    this.updateTrip = this.formBuilder.group({
      notes: ['', [Validators.maxLength(100)]],
      leavingTime: ['',],
      maxOfTourists: ['', [Validators.minLength(this.tripsJoining.maxOfTourists)]],//////////////////
    });
  }
  get maxOfTourists() {
    return this.updateTrip.get('maxOfTourists');
  }
  cencelAttrctionFromTrip(attr: TouristAttractions) {
    let del = this.attractions.find(x => x.id == attr.id);
    const index = this.attractions.indexOf(del, 0);
    if (index > -1) {
      this.attractions.splice(index, 1);
    }
    this.guideService.deleteAttractionFromAttractionToGuideById(attr.id).subscribe();
  }
  addAttractionToTrip(attractionName) {
    this.AskIfAddAtraction = false;
    this.attractionsService.getAttractionIfExist(attractionName).subscribe(data => {
      if (data) {
        this.isExistAttraction = true;
        this.addAttraction = data;
      }
      if (this.isExistAttraction == false) {//אם לא קיים כזה אתר במערכת
        this.AskIfAddAtraction = true;//להוספת אתר
        // this.dialog.closeAll();
      }
    });
  }
  yesThisIsAttraction() {
    this.isChange = true;
    this.tripsForJoiningService.addAttractionToGuideTrip(this.tripsJoining.id, this.addAttraction).subscribe(data => {
      if (data) {
        this.isExistAttraction = false;
        this.attractions = [];
        this.guideService.getallAttractionToGuideByTripId(this.tripsJoining.id).subscribe(y => {
          if (y) {
            y.forEach(element => {
              this.attractionsService.getAttractionById(element.attractionId).subscribe(x => {
                if (x)
                  this.attractions.push(x);
              });
            });
          }
        });
      }
      if (!data) {
        this.isExistAttraction = false;
        alert("האתר קיים במסלולך");
      }
    });
  }
  onSubmit(tripGuide: TripsForJoining) {
    //saveChanges
    // if (this.AskIfAddAtraction == false && tripGuide.leavingTime == "" && tripGuide.notes == "" && this.updateTrip.controls.maxOfTourists.value == "" && this.isChange == false)

    // else {
    if (tripGuide.leavingTime != "")
      this.tripsJoining.leavingTime = this.updateTrip.controls.leavingTime.value;
    if (tripGuide.notes != "")
      this.tripsJoining.notes = this.updateTrip.controls.notes.value;
    if (this.updateTrip.controls.maxOfTourists.value != "")
      this.tripsJoining.maxOfTourists = this.updateTrip.controls.maxOfTourists.value;

    this.tripsForJoiningService.updateTripForJoining(this.tripsJoining).subscribe(x => {
      if (x) {
        alert("עודכן בהצלחה");
        this.tripsForJoiningService.getAllUsersByTripId(this.tripsJoining.id).subscribe(data => {
          if (data) {
            data.forEach(user => {
              this.tripsForJoiningService.sendEmailToUpdate(user).subscribe(send => {
                if (send) {
                  alert("המייל נשלח בהצלחה");
                  // this.dialog.closeAll();
                }
              });
            });
          }
        });
      }
    });
    this.dialog.closeAll();
    window.location.href = 'planYourTrip/tripsForGuide';
    // }

  }
  cencelChanges() {
    this.dialog.closeAll();
    // this.route.navigate(['planYourTrip/tripsForJoining']);
  }
  cencelTrip() {
    debugger;
    this.tripsForJoiningService.getAllUsersByTripId(this.tripsJoining.id).subscribe(data => {
      if (data) {
        data.forEach(user => {
          this.tripsForJoiningService.sendEmailToUsersCanceledTrip(user).subscribe(x => {
            if (x) {
              
              window.location.href = 'planYourTrip/tripsForJoining';
            }
          })
        });
        debugger;
        alert("ההודעה על ביטול הטיול נשלחה לכל הנרשמים");
        this.tripsForJoiningService.deleteTripForJoiningGuideById(this.tripsJoining.id).subscribe(del=>{if(del){debugger;}});
      }
      if (data.length == 0) {
        alert("לא נמצאו משתתפים הרשומים לטיול זה");
      }
    });
  }
}
