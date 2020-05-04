import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourGuides } from '../classes/tour-guides';
import { Observable } from 'rxjs';
import { GuidesForJoiningToSite } from '../classes/guides-for-joining-to-site';
import { TripsForJoining } from '../classes/trips-for-joining';
import { TouristAttractions } from '../classes/tourist-attractions';
import { GuideActivityDiary } from '../classes/guide-activity-diary';
import { wrapDate } from '../classes/BarData';
import { AttractionsToUsersTrips } from '../classes/attractions-to-users-trips';
import { usersTrips } from '../classes/usersTrips';


@Injectable({
  providedIn: 'root'
})
export class GuidesService {

  constructor(private httpClient: HttpClient) { }

  addGuide(newGuide: TourGuides): Observable<TourGuides> {
    return this.httpClient.post<TourGuides>(`http://localhost:57698/api/Guides/PostAddGuide`, newGuide);
  }
  deleteGuideById(id: number): Observable<TourGuides> {
    return this.httpClient.delete<TourGuides>(`http://localhost:57698/api/Guides/deleteGuideById/${id}`);
  }
  getAllGuides(): Observable<TourGuides[]> {
    return this.httpClient.get<TourGuides[]>(`http://localhost:57698/api/Guides/GetAllGuides`);
  }
  getGuideById(id: number): Observable<TourGuides> {
    return this.httpClient.get<TourGuides>(`http://localhost:57698/api/Guides/getGuideById/${id}`);
  }
  getTourGuideByName(guideName: string): Observable<TourGuides> {
    return this.httpClient.get<TourGuides>(`http://localhost:57698/api/Guides/searchGuidByName/${guideName}`);
  }
  IsExistGuide(email: string, password: string): Observable<TourGuides> {
    return this.httpClient.get<TourGuides>(`http://localhost:57698/api/Guides/IsExistGuide/${email}/${password}`);
  }
  IsPasswordError(email: string, password: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(`http://localhost:57698/api/Guides/IsPasswordError/${email}/${password}`);
  }
  getallAttractionToGuideByTripId(id:number):Observable<any>{
    return this.httpClient.get<Boolean>(`http://localhost:57698/api/Guides/getallAttractionToGuideByTripId/${id}`);
  }
  //////Activity Dairy///////
  addGuideToActivityDiary(guideActivityDiary: GuideActivityDiary): Observable<GuideActivityDiary> {
    return this.httpClient.post<GuideActivityDiary>(`http://localhost:57698/api/Guides/addGuideToActivityDiary`, guideActivityDiary);
  }
  getAllFreeGuideByDate(dateTrip: wrapDate): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/Guides/getAllFreeGuideByDate `, dateTrip);
  }
  getAllTripForActivityDairyById(guideId: number): Observable<GuideActivityDiary[]> {
    return this.httpClient.get<GuideActivityDiary[]>(`http://localhost:57698/api/Guides/getAllTripForActivityDairyById/${guideId}`);
  }

  ///////////////////////////
  getRequestFromGuide(guideId: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/Guides/getRequestFromGuide/${guideId}`);
  }
  getAttractionToUserTripByTripId(tripId: number): Observable<any> {
    return this.httpClient.get<AttractionsToUsersTrips>(`http://localhost:57698/api/Guides/getAttractionToUserTripByTripId/${tripId}`);
  }
  upDateGuideDetailes(guide: TourGuides): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/Guides/upDateGuideDetailes`, guide);
  }
  checkTripsForGuide(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:57698/api/Guides/checkTripsForGuide/${id}`);
  }
  sendEmailAgreeRequest(userId:number,userTrip: usersTrips ): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/Guides/sendEmailAgreeRequest/${userId}`,userTrip);
  }
  sendEmailDisAgreeRequest(email: string, id: number, cause: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/Guides/sendEmailDisAgreeRequest/${email}/${id}/${cause}`);
  }
  deleteAttractionFromAttractionToGuideById(attractionId:number):Observable<any>{
    return this.httpClient.delete<any>(`http://localhost:57698/api/Guides/deleteAttractionFromAttractionToGuideById/${attractionId}`);
  }
}


