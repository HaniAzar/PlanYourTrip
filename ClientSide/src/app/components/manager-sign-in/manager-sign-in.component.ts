import { Component, OnInit } from '@angular/core';
import { WaitingGuidesService } from 'src/app/shared/waiting-guides.service';
import { WaitingAttractionsService } from 'src/app/shared/waiting-attractions.service';

@Component({
  selector: 'app-manager-sign-in',
  templateUrl: './manager-sign-in.component.html',
  styleUrls: ['./manager-sign-in.component.scss']
})
export class ManagerSignInComponent implements OnInit {
  countOfGuides: number;
  countOfAttractions: number;

  constructor(private waitingGuideService: WaitingGuidesService, private waitingAttractionService: WaitingAttractionsService) { }

  ngOnInit() {
    this.waitingGuideService.getAllJoiningGuide().subscribe(data => { if (data) this.countOfGuides=data.length})
    this.waitingAttractionService.getAllWaitingAttractions().subscribe(data=>{if(data)this.countOfAttractions=data.length})
  }

}