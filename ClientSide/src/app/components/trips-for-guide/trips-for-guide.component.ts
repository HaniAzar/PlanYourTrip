import { Component, OnInit } from '@angular/core';
import { TourGuides } from 'src/app/classes/tour-guides';
import { GuidesService } from 'src/app/shared/guides.service';
import { TripsForJoining } from 'src/app/classes/trips-for-joining';
import { TripsForJoiningService } from 'src/app/shared/trips-for-joining.service';
import { MatDialog } from '@angular/material/dialog';
import { GuideUpDateNotesToTripComponent } from '../guide-up-date-notes-to-trip/guide-up-date-notes-to-trip.component';
import { GeneralService } from 'src/app/shared/general.service';
import { ImagesService } from 'src/app/shared/images.service';

@Component({
  selector: 'app-trips-for-guide',
  templateUrl: './trips-for-guide.component.html',
  styleUrls: ['./trips-for-guide.component.scss']
})
export class TripsForGuideComponent implements OnInit {
  currentGuide: TourGuides;
  tripsForJoining: TripsForJoining[] = [];
  attractionsToTrip: string[][];
  imagesToTrip: any[][];

  constructor(private guideService: GuidesService, private tripsForJoiningService: TripsForJoiningService, private dialog: MatDialog,
    private generalService: GeneralService, private imagesService: ImagesService) {
    this.attractionsToTrip = [];
    this.imagesToTrip = [];
  }
  ngOnInit() {
    this.currentGuide = JSON.parse(localStorage.getItem('guide'));
    this.tripsForJoiningService.getAllTripForJoiningById(this.currentGuide.id).subscribe(data => {
      if (data) {
        this.tripsForJoining = data;
        data.forEach(element => {
          this.attractionsToTrip[element.id] = [];
          this.imagesToTrip[element.id] = [];
          this.tripsForJoiningService.getAttractionsIdByTripId(element.id).subscribe(attractions => {
            if (attractions) {
              attractions.forEach(attraction => {
                this.imagesToTrip[element.id][attraction] = [];
                this.imagesService.getImagesByAttractionId(attraction).subscribe(images => {
                  if (images)
                    this.imagesToTrip[element.id][attraction] = images;
                })
              });
            }
          });
          this.tripsForJoiningService.getAttractionsGuideById(element.id).subscribe(y => {
            if (y)
              this.attractionsToTrip[element.id] = y
          });
        });
      }
    });
  }

  upDate(tripGuide: TripsForJoining) {
    this.generalService.setTripForJoiningToUpdate(tripGuide);
    this.dialog.open(GuideUpDateNotesToTripComponent);
  }
}