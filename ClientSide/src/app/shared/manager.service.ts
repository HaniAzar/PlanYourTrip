import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private httpClient:HttpClient) { }

  checkManager(email:string,password:string):Observable<boolean>{
    return this.httpClient.get<boolean>(`http://localhost:57698/api/manager/IsManager//${email}/${password}`);
  }
  IsPasswordError(email: string, password: string):Observable<Boolean>{
    return this.httpClient.get<Boolean>(`http://localhost:57698/api/manager/IsPasswordError/${email}/${password}`);
  }


}
