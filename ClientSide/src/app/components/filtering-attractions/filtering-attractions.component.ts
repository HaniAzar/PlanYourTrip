import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Categories } from 'src/app/classes/categories';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { Search } from 'src/app/classes/search';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { MapComponent } from '../map/map.component';
import { ArraysService } from 'src/app/shared/arrays.service';
import { AttractionsArrays } from 'src/app/classes/attractions-arrays';
import { ImagesService } from 'src/app/shared/images.service';
import { GeneralService } from 'src/app/shared/general.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { TripComponent } from '../trip/trip.component';
import { TripService } from 'src/app/shared/trip.service';

@Component({
  selector: 'app-filtering-attractions',
  //template:'<app-map #child></app-map>',
  templateUrl: './filtering-attractions.component.html',
  styleUrls: ['./filtering-attractions.component.scss']
})
export class FilteringAttractionsComponent implements OnInit {
  //@ViewChild(MapComponent) map:MapComponent;

  allCategories: Categories[];
  search: Search;
  categoriesForAttractions: string[][];
  seasson: string;
  attractions: TouristAttractions[] = [];
  attractionIndex: number;
  changePage = false;
  areas = AttractionsArrays.areas;
  seasons = AttractionsArrays.seasons;
  properties = AttractionsArrays.properties;
  imagesSrcList: string[][];
  trip: TouristAttractions[] = [];
  isSearch = false;

  selectedAreas: string[] = [];
  selectedCategories: string[] = [];
  selectedSeasons: string[] = [];
  selectedProperties: string[] = [];

  divStatus = true;
  //#region pagination
  attractionsLength: number;
  itemsPerPage = 7;
  currentPage = 0;
  pageSize: number;
  numOfPages: number;
  //#endregion

  constructor(private form: FormBuilder, private attractionService: TouristAttractionsService, private arraysService: ArraysService,
    private images: ImagesService, private generalService: GeneralService, private router: Router, public dialog: MatDialog,
    private tripService: TripService) {
    this.categoriesForAttractions = [];
    this.imagesSrcList = [];
    this.attractionService.getCategories().subscribe(data => {
      this.allCategories = data;
    });
  }
  ngOnInit() {
    this.searchAttractions();

  }
  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
    if (!this.attractionIndex && this.changePage)
      document.querySelector('#target').scrollIntoView();
  }
  Areas(area: string) {
    this.arraysService.addStringToArray(area, this.selectedAreas);
  }
  Categories(category: string) {
    this.arraysService.addStringToArray(category, this.selectedCategories);
  }
  Seasons(season: string) {
    this.arraysService.addStringToArray(season, this.selectedSeasons);
  }
  Props(property: string) {
    this.arraysService.addStringToArray(property, this.selectedProperties);
  }
  isPayment(pay: Boolean) {
    if (pay == true)
      return true;
    return false;
  }
  season(seasson: string) {
    if (seasson == "כל השנה")
      return this.seasson = "פתוח כל השנה";
    return this.seasson = "עונה מומלצת:   " + seasson;
  }
  getCategoriesByAttractionId(attractionId: number) {
    this.categoriesForAttractions[attractionId] = [];
    this.attractionService.getCategoriesByAttractionId(attractionId).subscribe(data => this.categoriesForAttractions[attractionId] = data);
  }
  clearCategories() {
    ///////////////
  }
  searchAttractions() {
    this.search = new Search(this.selectedAreas, this.selectedCategories, this.selectedSeasons, this.selectedProperties);
    this.attractionService.getAttractionsBySearch(this.search)
      .subscribe(data => {
        if (data) {
          this.attractions = data;
          if (this.attractions.length == 0) {
            this.openDialog();
          }
          this.attractions.forEach(element => {
            this.getImages(element.id);
            this.getCategoriesByAttractionId(element.id);
          });
          this.attractionsLength = this.attractions.length;
          this.currentPage = 1;
          this.numOfPages = Math.round(this.attractionsLength / this.itemsPerPage) + 1;
        }
      });
    this.divStatus = false;
    this.currentPage = 1;
    this.onPageChange(1);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { data: { component: "filtering", header: "לא נמצאו תוצאות לחיפוש שלך", text: "נסה שוב בתנאים אחרים ", buttonTextOk: "אוקיי, הבנתי" } });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedAreas = [];
      this.selectedCategories = [];
      this.selectedProperties = [];
      this.selectedSeasons = [];
      this.isSearch = false;
      this.searchAttractions();
    });
  }

  addToTrip(attraction: TouristAttractions) {
    this.trip = this.tripService.getTripList();
    if (this.trip.find(x => x.id == attraction.id))
      // this.dialog.open(DialogComponent, { data: { header: attraction.attractionName, text: "כבר נמצא בטיול שלך ", buttonTextCancel: "אישור" } });
    alert(attraction.attractionName + " כבר נמצא בטיול שלך");
    else {
      this.tripService.setAttractionToTripList(attraction);
      if (this.tripService.getTripList()) {
        const dialogRef = this.dialog.open(TripComponent);
        dialogRef.afterClosed().subscribe(result => {
          this.trip = this.tripService.getTripList();
        });
      }
    }
  }

  getImages(attractionId: number) {
    this.images.getImagesByAttractionId(attractionId).subscribe(data => {
      if (data) {
        this.imagesSrcList[attractionId] = data;
      };
    });
  }

  scroll(event) {
    if (event) {
      let attraction = this.attractions.filter(x => x.id == event)[0];
      this.attractionIndex = this.attractions.indexOf(attraction);
      let page = Math.ceil(this.attractionIndex / this.itemsPerPage);
      if (this.attractionIndex % this.itemsPerPage == 0)
        page++;
      this.onPageChange(page);
      this.currentPage = page;
      setTimeout(() => document.querySelector('#attraction' + event).scrollIntoView({ behavior: "smooth" }), 500);
    }
  }

  animate() {
    this.divStatus = !this.divStatus;
  }
}
