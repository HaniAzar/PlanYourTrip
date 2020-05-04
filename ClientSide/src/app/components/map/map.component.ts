import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY } from '@angular/material/progress-spinner';
import { __importDefault } from 'tslib';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { AgmCoreModule, MapsAPILoader } from "@agm/core";
import { GeocodingService } from 'src/app/shared/geocoding.service';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';

declare const google: any;
interface Location { lat: number; lng: number; }
interface Marker { lat: number; lng: number; label: string }

@Component({
  selector: 'app-map',
  //template: '<p>child</p>',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  @Input() public set attractions(attractions: TouristAttractions[]) {
    this.myattractions = attractions;
    this.initMapZoom();
    this.initMapLocation();
    if (typeof google === 'object' && typeof google.maps === 'object') {
      this.setNewLocations(this.myattractions);
    }
  }
  attraction: TouristAttractions;
  categories: string[] = [];
  myattractions: TouristAttractions[] = [];
  geocoder: any;
  zoom: number = 10;
  mapLoading = false;
  selectedAttractionName: string;


  @Output() eventInChild: EventEmitter<any> = new EventEmitter();

  public location: Location = {
    lat: 32.610627,
    lng: 35.286393,
  }
  public northLocation: Location = {
    lat: 32.915167,
    lng: 35.291093,
  }
  public centeralLocation: Location = {
    lat: 32.232150,
    lng: 35.252656,
  }
  public jerusalemLocation: Location = {
    lat: 31.769742,
    lng: 35.214166,
  }
  public southLocation: Location = {
    lat: 31.526335,
    lng: 35.103026,
  }

  constructor(private attractionService: TouristAttractionsService) { }

  ngOnInit() {}

  mapReady() {
    this.mapLoading = true;
    if (!this.geocoder)
      this.geocoder = new google.maps.Geocoder();
  }

  setNewLocations(myattractions: TouristAttractions[]) {
    if (myattractions && myattractions.length > 0) {
      myattractions.forEach(element => {
        if (element.latitude == '0' || element.longitude == '0') {
          this.findLocation(element);
        }
      });
    }
  }

  findLocation(attraction: TouristAttractions) {
    if (!attraction)
      return;
    this.geocoder.geocode({
      'address': attraction.attractionName
    }, (results, status) => {
      if (status == 'OK') {
        let location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
        if (location) {
          attraction.latitude = location.lat;
          attraction.longitude = location.lng;
          this.attractionService.updateAttractionLocation(attraction).subscribe();
        }
      }
    });
  }

  initMapZoom() {
    if (this.myattractions) {
      if (this.myattractions.length > 0 && this.myattractions.length < 5)
        this.zoom = 6;
      else
        if (this.myattractions.length < 10)
          this.zoom = 8;
        else
          if (this.myattractions.length < 15)
            this.zoom = 9;
          else
            this.zoom = 10;
    }
  }

  initMapLocation() {
    let north = 0, centeral = 0, jerusalem = 0, south = 0;
    if (this.myattractions)
      if (this.myattractions.length > 0) {
        this.myattractions.forEach(element => {
          switch (element.area) {
            case "צפון":
              north++;
              break;
            case "מרכז":
              centeral++;
              break;
            case "ירושלים והסביבה":
              jerusalem++;
              break;
            case "ים המלח":
              south++;
              break;
            case "דרום":
              south++;
              break;
            default:
              break;
          }
        });
        if (north > centeral && north > south && north > jerusalem)
          this.location = this.northLocation;
        else
          if (centeral > south && centeral > north && centeral > jerusalem)
            this.location = this.centeralLocation
          else
            if (jerusalem > north && jerusalem > centeral && jerusalem > south)
              this.location = this.jerusalemLocation;
            else
              this.location = this.southLocation;
      }
  }

  openSidebar(attractionNameSelect: string) {
    this.attraction = this.myattractions.find(x => x.attractionName == attractionNameSelect);
    if (this.attraction != null) {
      this.attractionService.getCategoriesByAttractionId(this.attraction.id).subscribe(data => this.categories = data);
    }
  }

  emitEvent(id: number) {
    this.eventInChild.emit(id);
  }
}
