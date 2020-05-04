import { Injectable } from '@angular/core';
import { GuidesForJoiningToSite } from '../classes/guides-for-joining-to-site';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripsForJoining } from '../classes/trips-for-joining';

@Injectable({
  providedIn: 'root'
})
export class WaitingGuidesService {

  constructor(private httpClient:HttpClient) { }

  AddGuideForSite(newGuide: GuidesForJoiningToSite): Observable<GuidesForJoiningToSite> {
    debugger;
    return this.httpClient.post<GuidesForJoiningToSite>('http://localhost:57698/api/GuidesForJoiningToSite/AddGuideForSite', newGuide);
  }
  getAllJoiningGuide(): Observable<GuidesForJoiningToSite[]> {
    return this.httpClient.get<GuidesForJoiningToSite[]>(`http://localhost:57698/api/GuidesForJoiningToSite/GetAllGuide`);
  }
  deleteGuideForJoiningToSite(id: number): Observable<GuidesForJoiningToSite> {
    return this.httpClient.delete<GuidesForJoiningToSite>(`http://localhost:57698/api/GuidesForJoiningToSite/DeleteGuide/${id}`);
  }
  getGuideForJoiningToSiteById(id: number): Observable<GuidesForJoiningToSite> {
    return this.httpClient.get<GuidesForJoiningToSite>(`http://localhost:57698/api/GuidesForJoiningToSite/GetGuidesById/${id}`);
  }
  sendEmailToGuide(email:string,IsOk:boolean):Observable<string>{
    return this.httpClient.get<string>(`http://localhost:57698/api/Guides/sendEmail/${email}/${IsOk}`);
  }
}