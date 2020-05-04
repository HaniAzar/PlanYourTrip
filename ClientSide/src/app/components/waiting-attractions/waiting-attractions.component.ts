import { Component, OnInit } from '@angular/core';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { WaitingAttractionsService } from 'src/app/shared/waiting-attractions.service';
import { WaitingAttractions } from 'src/app/classes/waiting-attractions';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { ImagesService } from 'src/app/shared/images.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ImagesUrl } from 'src/app/classes/images-url';
import { Categories } from 'src/app/classes/categories';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttractionsToCategories } from 'src/app/classes/attractions-to-categories';

@Component({
  selector: 'app-waiting-attractions',
  templateUrl: './waiting-attractions.component.html',
  styleUrls: ['./waiting-attractions.component.scss']
})
export class WaitingAttractionsComponent implements OnInit {
  attraction: TouristAttractions = new TouristAttractions();
  waitingAttractions: WaitingAttractions[] = [];
  imagesUrl: string[] = [];
  attractionId: number;
  newImg: ImagesUrl;
  categories: Categories[] = [];
  editAttractionForm: FormGroup;
  attractionToCategories:AttractionsToCategories[]=[];
  constructor(private waitingAttractionsService: WaitingAttractionsService, private attractionsService: TouristAttractionsService,
    private imagesService: ImagesService, private fb: FormBuilder) { }

  ngOnInit() {
    this.attractionsService.getCategories().subscribe(category => { if (category) this.categories = category; });
    this.getAllAttractions();
  }
  getAllAttractions() {
    this.waitingAttractionsService.getAllWaitingAttractions().subscribe(data => {
      if (data)
        this.waitingAttractions = data;
    });
  }
  addAttractionToSite(id: number) {
    let attraction = this.waitingAttractions.filter(x => x.id == id)[0];
    this.attraction = new TouristAttractions(attraction.attractionName, attraction.address, attraction.area, attraction.phoneNumber,
      attraction.payment, attraction.seasson, attraction.openningHour, attraction.closingHour, attraction.accessibility,
      attraction.hardnessLevel, attraction.link, attraction.notes, attraction.entranceToWater, attraction.isMatchGroups,
      attraction.isMatchChildren, attraction.isMatchFamilies);
    this.attractionsService.getAttractionByName(this.attraction.attractionName).subscribe(isExist => {
      if (!isExist) {
        this.attractionsService.addAttraction(this.attraction).subscribe(
          data => {
            if (data) {
              alert("האתר נוסף בהצלחה!");
              debugger;
              let categoriesName = attraction.categories.split(',');
              this.attractionsService.GetCategoriesIdByCategoriesName(categoriesName).subscribe(categoriesId => {
                debugger;
                if (categoriesId) {
                  debugger
                  categoriesId.forEach(element => {
                    let attractionToCategories = new AttractionsToCategories(data.id, element);
                    this.attractionToCategories.push(attractionToCategories);
                  });
                }
                this.attractionsService.addAttractionsToCategories(this.attractionToCategories).subscribe();
              });

              this.removeAttraction(id);
              this.imagesService.getImagesByWaitingAttractionId(id).subscribe(listImg => {
                if (listImg) {
                  this.imagesUrl = listImg;
                  this.removeAttraction(id);
                  listImg.forEach(element => {
                    this.newImg = new ImagesUrl(data["id"], element);
                    this.imagesService.addImageUrl(this.newImg).subscribe(x => { this.newImg = x, this.removeAttraction(id); });
                  });
                }
              });
            }
          }
        );
      }
      else {
        alert("האתר קיים במערכת");
        this.waitingAttractionsService.deleteAttraction(id).subscribe(deleteAttraction => {
          if (deleteAttraction) {
            alert("נמחק בהצלחה ");
          }
        });
      }
    });
  };
  removeAttraction(id: number) {
    this.waitingAttractionsService.deleteAttraction(id).subscribe(data => { if (data) { debugger; this.getAllAttractions(); console.log("נמחק") } });
    //אמור למחוק גם את התמונות של האתר
  }
}