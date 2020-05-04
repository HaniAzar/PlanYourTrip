import { Component, OnInit } from '@angular/core';
import { GuidesForJoiningToSite } from 'src/app/classes/guides-for-joining-to-site';
import { GuidesService } from 'src/app/shared/guides.service';
import { TourGuides } from 'src/app/classes/tour-guides';
import { WaitingGuidesService } from 'src/app/shared/waiting-guides.service';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';

@Component({
  selector: 'app-waiting-guides',
  templateUrl: './waiting-guides.component.html',
  styleUrls: ['./waiting-guides.component.scss']
})
export class WaitingGuidesComponent implements OnInit {
  guidesList: GuidesForJoiningToSite[];
  guideFromSite: GuidesForJoiningToSite;
  guideToAdd: TourGuides = new TourGuides();
  guideToSendEmail: TourGuides;
  constructor(private guideService: GuidesService, private waitingGuidesService: WaitingGuidesService) { }

  ngOnInit() {
    this.getAllWaitingGuide();
  }
  getAllWaitingGuide() {
    this.waitingGuidesService.getAllJoiningGuide().subscribe(data => {
      if (data)
        this.guidesList = data;
    });
  }
  deleteGuideForJoiningToSite(id: number) {
    this.guideToSendEmail = this.guidesList.filter(x => x.id == id)[0];
    this.waitingGuidesService.deleteGuideForJoiningToSite(id).subscribe(a => {
      alert("נמחק בהצלחה"), this.getAllWaitingGuide()
    });
    this.waitingGuidesService.sendEmailToGuide(this.guideToSendEmail.eMail, false).subscribe(a => console.log("המייל נשלח בהצלחה"));
  }
  AddGuideById(id: number) {
    this.guideFromSite = this.guidesList.filter(x => x.id == id)[0];
    this.guideToAdd.id = this.guideFromSite.id;
    this.guideToAdd.eMail = this.guideFromSite.eMail;
    this.guideToAdd.guideName = this.guideFromSite.guideName;
    this.guideToAdd.languages = this.guideFromSite.languages;
    this.guideToAdd.details = this.guideFromSite.details;
    this.guideToAdd.profile = this.guideFromSite.profile;
    this.guideToAdd.phoneNumber = this.guideFromSite.phoneNumber;
    this.guideToAdd.workingDays = this.guideFromSite.workingDays;
    this.guideToAdd.password = this.guideFromSite.password;
    this.guideService.addGuide(this.guideToAdd).subscribe(a => {
      if (a) {
        alert("התווסף בהצלחה");
        this.waitingGuidesService.sendEmailToGuide(this.guideFromSite.eMail, true).subscribe();
        this.waitingGuidesService.deleteGuideForJoiningToSite(id).subscribe(a => this.getAllWaitingGuide());
      }
    });
  };
}
