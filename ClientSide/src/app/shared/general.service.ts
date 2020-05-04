import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristAttractions } from '../classes/tourist-attractions';
import { TourGuides } from '../classes/tour-guides';
import { TripsForJoining } from '../classes/trips-for-joining';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private httpClient: HttpClient) { }

  TripForJoiningToUpdate: TripsForJoining;

  addToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    JSON.parse(localStorage.getItem(key));
  }
  clearStorage() {
    if (JSON.parse(localStorage.getItem('user')))
      localStorage.removeItem('user');
    if (JSON.parse(localStorage.getItem('guide')))
      localStorage.removeItem('guide');
    if (JSON.parse(localStorage.getItem('manager')))
      localStorage.removeItem('manager');
  }
  sendEmail(email: string, trips: TouristAttractions[], num: number): Observable<any> {
    if (trips != null)
      trips[0].address = email;
    return this.httpClient.post<any>(`http://localhost:57698/api/attractions/sendEmail/${num}`, trips);
  }
  setTripForJoiningToUpdate(tripforJoining: TripsForJoining) {
    this.TripForJoiningToUpdate = tripforJoining;
  }
  getTripForJoiningToUpdate() {
    return this.TripForJoiningToUpdate;
  }
}
