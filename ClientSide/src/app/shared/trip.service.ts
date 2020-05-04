import { Injectable } from '@angular/core';
import { TouristAttractions } from '../classes/tourist-attractions';
import { TourGuides } from '../classes/tour-guides';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripList: TouristAttractions[] = [];
  guideToTrip: TourGuides;
  distanceList: string[] = [];

  constructor(private genearalService: GeneralService) {
    this.distanceList = JSON.parse(localStorage.getItem('distance'));
  }

  setGuideToTrip(guide: TourGuides) {
    this.guideToTrip = guide;
    return this.guideToTrip;
  }
  getGuideToTrip() {
    return this.guideToTrip;
  }
  deleteGuideToTrip() {
    this.guideToTrip = null;
  }
  getDistanceList() {
    return this.distanceList;
  }
  setDistanceList(list: string[]) {
    this.distanceList = list;
    localStorage.removeItem('distance');
    this.genearalService.addToStorage('distance', this.distanceList);
  }
  updateDistanceList(attractionIndex: number, newDistance: string) {
    this.distanceList[attractionIndex - 1] = newDistance;
    if (attractionIndex < this.distanceList.length)
      this.distanceList.splice(attractionIndex, 1);
    localStorage.removeItem('distance');
    this.genearalService.addToStorage('distance', this.distanceList);
  }
  // updateDistanceAfterDrop(attractionIndex: number, newDistance: string) {
  //   if (attractionIndex > 0)
  //     this.distanceList[attractionIndex - 1] = newDistance;
  //   else
  //     this.distanceList[0] = newDistance;
  //   localStorage.removeItem('distance');
  //   this.genearalService.addToStorage('distance', this.distanceList);
  // }
  cloneDistanceList() {
    localStorage.removeItem('distance');
    //this.distanceList=[];
    // return this.distanceList;
  }
  getTripList() {
    return this.tripList;
  }
  setAttractionToTripList(attraction: TouristAttractions) {
    return this.tripList.push(attraction);
  }
  deleteAttractionFromTripList(attractionid: number) {
    let attraction = this.tripList.find(x => x.id == attractionid);
    const index = this.tripList.indexOf(attraction, 0);
    if (index > -1) {
      this.tripList.splice(index, 1);
    }
    return this.tripList;
  }
  updateTripList(trip: TouristAttractions[]) {
    this.tripList = trip;
  }
  deleteTripList() {
    return this.tripList = [];
  }
  setTripList(trip: TouristAttractions[]) {
    this.tripList = trip;
    return this.tripList;
  }
}
