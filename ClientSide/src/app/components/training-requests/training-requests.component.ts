import { Component, OnInit } from '@angular/core';
import { GuidesService } from 'src/app/shared/guides.service';
import { TourGuides } from 'src/app/classes/tour-guides';
import { AttractionsToUsersTrips } from 'src/app/classes/attractions-to-users-trips';
import { usersTrips } from 'src/app/classes/usersTrips';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { UsersService } from 'src/app/shared/users.service';
import { Users } from 'src/app/classes/users';
import { GeneralService } from 'src/app/shared/general.service';
import { GuideActivityDiary } from 'src/app/classes/guide-activity-diary';

@Component({
  selector: 'app-training-requests',
  templateUrl: './training-requests.component.html',
  styleUrls: ['./training-requests.component.scss']
})
export class TrainingRequestsComponent implements OnInit {
  currentGuide: TourGuides;
  attractionsForTrip: TouristAttractions[][];
  requests: usersTrips[] = [];
  users: Users[] = [];
  cause: string;
  guideActivity: GuideActivityDiary;
  firstClick: boolean = false;
  constructor(private guideService: GuidesService, private attractionService: TouristAttractionsService,
    private userService: UsersService, private generalService: GeneralService) {
    this.attractionsForTrip = [];
  }

  ngOnInit() {
    this.currentGuide = JSON.parse(localStorage.getItem('guide'));
    this.initRequests();
  }

  initRequests() {

    this.guideService.getRequestFromGuide(this.currentGuide.id).subscribe(requests => {
      if (requests) {
        this.requests = requests;
        this.requests.forEach(request => {
          this.userService.getUserById(request.userId).subscribe(user => { if (user) this.users[request.id] = user; });
          this.attractionsForTrip[request.id] = [];
          this.guideService.getAttractionToUserTripByTripId(request.id).subscribe(attractionsToRequest => {
            if (attractionsToRequest) {
              let attractions: TouristAttractions[] = [];
              attractionsToRequest.forEach(attractionToRequest => {
                this.attractionService.getAttractionById(attractionToRequest.attractionId).subscribe(attraction => {
                  if (attraction) {
                    attractions.push(attraction);
                  }
                });
              });
              this.attractionsForTrip[request.id] = attractions;
            }
          });
        });
      }
    })
  }
  GuideAgree(trip: usersTrips) {
    this.guideActivity = new GuideActivityDiary(trip.guideId, trip.tripDate);
    this.guideService.addGuideToActivityDiary(this.guideActivity).subscribe(addToDiary => {
      if (addToDiary) {
        this.userService.getUserById(trip.userId).subscribe(data => {
          if (data) {
            this.guideService.sendEmailAgreeRequest(data.id, trip).subscribe(email => {
              if (email) {
                alert(email);
                this.userService.deleteUserTripById(trip.id).subscribe(x => {
                  if (x)
                    this.guideService.getRequestFromGuide(this.currentGuide.id).subscribe(g => { if (g) this.requests = g; });
                });
              }
            });
          }
        });
      }
    });
  }

  GuideDisagree(trip: usersTrips) {
    debugger;
    // this.guideService.changeEditStatus(trip.id).subscribe();
    //שלח =false
    //לשנות לtrue
    this.firstClick = !this.firstClick;
    this.userService.getUserById(trip.userId).subscribe(data => {
      if (data) {
        this.guideService.sendEmailDisAgreeRequest(data.eMail, trip.id, this.cause).subscribe(email => {
          if (email) {
            alert(email);
            this.userService.deleteUserTripById(trip.id).subscribe(x => {
              if (x) {
                alert("נמחק בהצלחה");
                this.guideService.getRequestFromGuide(this.currentGuide.id).subscribe(g => { if (g) this.requests = g; });
              }
            });
          }
        });
      }
    });
  }
}
