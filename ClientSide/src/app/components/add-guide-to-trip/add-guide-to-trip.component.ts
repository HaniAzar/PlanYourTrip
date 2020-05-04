import { Component, OnInit } from '@angular/core';
import { TourGuides } from 'src/app/classes/tour-guides';
import { GuidesService } from 'src/app/shared/guides.service';
import { GuideActivityDiary } from 'src/app/classes/guide-activity-diary';
import { GeneralService } from 'src/app/shared/general.service';
import { wrapDate } from 'src/app/classes/BarData';
import { ArraysService } from 'src/app/shared/arrays.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripService } from 'src/app/shared/trip.service';

@Component({
    selector: 'app-add-guide-to-trip',
    templateUrl: './add-guide-to-trip.component.html',
    styleUrls: ['./add-guide-to-trip.component.scss']
})
export class AddGuideToTripComponent implements OnInit {
    tourGuides: TourGuides[] = [];
    selectGuide: TourGuides;
    daysGuide: string[] = [];
    daysGuideString: string;
    days: string[] = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    flag: boolean = false;
    wrapdateTrip: wrapDate;
    isGuidesForChoose = true;

    constructor(private guideService: GuidesService, private generalService: GeneralService, private router: Router,
        private dialog: MatDialog, private _snackBar: MatSnackBar, private tripService: TripService) {

    }
    ngOnInit() {
        this.getAllGuides();
        if (this.router.url == '/planYourTrip/allTourGuides')
            this.isGuidesForChoose = false;
        else
            this.isGuidesForChoose = true;
    }

    getAllGuides() {
        this.guideService.getAllGuides().subscribe(data => { this.tourGuides = data; });
    }

    addGuideToTrip(guide: TourGuides, dateChoose: Date) {
        if (dateChoose == null) {
            this.openSnackBar("חובה לבחור תאריך לטיול", "על מנת לחפש מדריך פנוי");
            return;
        }
        var day = dateChoose.getDay();
        this.daysGuideString = guide.workingDays;
        this.daysGuide = this.daysGuideString.split(',');
        for (var i = 0; i < this.daysGuide.length; i++) {
            for (var j = 0; j < this.days.length; j++) {
                if (this.daysGuide[i] == this.days[j])
                    if (j == day) {
                        this.generalService.addToStorage('tripDate', dateChoose);
                        let g = this.tripService.setGuideToTrip(guide);
                        this.dialog.open(DialogComponent, { data: { component: "guide", header: "המדריך נבחר בהצלחה!", text: "בסיום התכנון תשלח בקשה למדריך", buttonTextCancel: "סיום ועריכת המסלול", buttonTextOk: "המשך בתכנון הטיול" }});
                        this.flag = true;
                        break;
                    }
            }
            if (this.flag == true)
                break;
        }
        if (this.flag == false)
            this.dialog.open(DialogComponent, { data: { header: "מדריך זה לא עובד ביום שנבחר", text: "בחר מדריך או תאריך אחר", buttonTextCancel: "אישור" } });
       
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }
    searchGuideByDate(filterDate: Date) {
        this.wrapdateTrip = new wrapDate(filterDate);
        this.guideService.getAllFreeGuideByDate(this.wrapdateTrip).subscribe(data => {
            if (data) {
                this.tourGuides = data;
            }
            else alert("בחירת תאריך שגוי");
        });
    }
    backToPlanning() {
        this.router.navigate(["planYourTrip/tripPlanning"]);
    }
    editTrip() {
        this.router.navigate(["planYourTrip/endPlanning"]);
    }
}





