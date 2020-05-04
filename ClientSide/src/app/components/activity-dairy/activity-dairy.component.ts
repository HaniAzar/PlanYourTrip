import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { GuidesService } from 'src/app/shared/guides.service';
import { TourGuides } from 'src/app/classes/tour-guides';
import { GuideActivityDiary } from 'src/app/classes/guide-activity-diary';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-dairy',
  templateUrl: './activity-dairy.component.html',
  styleUrls: ['./activity-dairy.component.scss']
})
export class ActivityDairyComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  defaultView: 'dayGridMonth';

  currentGuide: TourGuides;
  trips: GuideActivityDiary[] = [];
  calendarEvents = [
    { title: 'event 1', date: '2019-09-22' }

  ];
  constructor(private guideService: GuidesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.currentGuide = JSON.parse(localStorage.getItem('guide'));
    this.guideService.getAllTripForActivityDairyById(this.currentGuide.id).subscribe(data => {
      if (data) {
        this.trips = data;
        this.trips.forEach(element => {
          let dateString = element.activityDate.toString();
          this.addEvent("טיול  עם לקוח", dateString);
        });
      }
    });
  }
  addEvent(titelTrip: string, dateTrip: string) {
    this.calendarEvents.push({ title: titelTrip, date: dateTrip });
  }

  // modifyTitle(eventIndex, newTitle) {
  //   this.calendarEvents[2].title = 'newTitle';
  // }
  toolData: any;
  details: any;
  isHidden: boolean = false;

  ClickTitle(event) {
    this.isHidden = true;
    // const dialogRef = this.dialog.open(ActivityDairyComponent, {
    //   width: '600px',
    //   height: '900px',
    //   data: event.event.extendedProps
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    this.details = event;
  }
}
