import { Injectable } from '@angular/core';
import { WaitingAttractions } from '../classes/waiting-attractions';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WaitingAttractionsService {

  constructor(private httpClient: HttpClient) { }

  getAllWaitingAttractions(): Observable<WaitingAttractions[]> {
    return this.httpClient.get<WaitingAttractions[]>(`http://localhost:57698/api/attractionsForAgree/GetAllWaitingAttractions`);
  }
  addWaitingAttraction(attraction: WaitingAttractions): Observable<WaitingAttractions> {
    return this.httpClient.post<WaitingAttractions>(`http://localhost:57698/api/attractionsForAgree/PostAddAttraction`, attraction);
  }
  deleteAttraction(id): Observable<any> {//WaitingAttractions
    return this.httpClient.delete(`http://localhost:57698/api/attractionsForAgree/DeleteWaitingAttraction/${id}`);
  }
  getWaitingAttractionIdByName(name: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:57698/api/attractionsForAgree/GetWaitingAttractionIdByName/${name}`);
  }
  IsExistAttraction(name: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:57698/api/attractionsForAgree/IsExistAttraction/${name}`);
  }
}





