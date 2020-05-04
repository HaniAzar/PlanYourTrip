import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripsForJoining } from '../classes/trips-for-joining';
import { Observable } from 'rxjs';
import { TouristAttractions } from '../classes/tourist-attractions';
import { WrittenDownUsers } from '../classes/written-down-users';
import { Users } from '../classes/users';

@Injectable({
  providedIn: 'root'
})
export class TripsForJoiningService {

  constructor(private httpClient: HttpClient) { }

  AddTripForJoining(newPlaningGuideTrip: TripsForJoining): Observable<TripsForJoining> {
    return this.httpClient.post<TripsForJoining>('http://localhost:57698/api/tripForJoining/addTripForJoining', newPlaningGuideTrip);
  }
  addAttractionToGuideTrip(id: number, attraction: TouristAttractions): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/Guides/addAttractionToGuideTrip/${id}`, attraction);
  }
  getAttractionsGuideById(tripId: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/tripForJoining/getAttractionsByTripId/${tripId}`);
  }
  getAllTripForJoining(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:57698/api/tripForJoining/GetAllTripsForJoining`);
  }
  getAllTripForJoiningById(guideId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:57698/api/tripForJoining/getAllTripForJoiningById/${guideId}`);
  }
  signUserToTrip(obj: WrittenDownUsers): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/tripForJoining/signUserToTrip`, obj);
  }
  updateNumOfTourists(wd: WrittenDownUsers) {
    return this.httpClient.put<TripsForJoining>(`http://localhost:57698/api/tripForJoining/UpdateNumOfSavedTourists`, wd);
  }
  deleteTripForJoiningById(tripsforjoining: TripsForJoining[]): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/tripForJoining/deleteTripForJoiningById`, tripsforjoining);
  }
  SignUpTripSendEmail(currentUser: Users): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/tripForJoining/SignUpTripSendEmail`, currentUser);
  }
  getAllUsersByTripId(tripId: number): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`http://localhost:57698/api/tripForJoining/getAllUsersByTripId/${tripId}`);
  }
  updateTripForJoining(tripForJoining: TripsForJoining): Observable<TripsForJoining> {
    return this.httpClient.put<TripsForJoining>(`http://localhost:57698/api/tripForJoining/updateTripForJoining`, tripForJoining);
  }
  sendEmailToUpdate(user: Users): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/tripForJoining/sendEmailToUpdate`, user);
  }
  sendEmailToUsersCanceledTrip(user: Users): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/tripForJoining/sendEmailToUsersCanceledTrip`, user);
  }
  deleteTripForJoiningByTripId(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/tripForJoining/deleteTripForJoiningByTripId/${id}`);
  }
  deleteTripForJoiningGuideById(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/tripForJoining/deleteTripForJoiningGuideById/${id}`);
  }
  
  getAttractionsIdByTripId(tripId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:57698/api/tripForJoining/getAttractionsIdByTripId/${tripId}`);
  }
}