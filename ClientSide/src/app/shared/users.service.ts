import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../classes/users';
import { Observable } from 'rxjs';
import { usersTrips } from '../classes/usersTrips';
import { AttractionsToUsersTrips } from '../classes/attractions-to-users-trips';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  AddUser(newUser: Users):Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/Users/addUser`, newUser)
  }
  IsExistUser(email: string, password: string): Observable<Users> {
    return this.httpClient.get<Users>(`http://localhost:57698/api/Users/IsExistUser/${email}/${password}`);
  }
  getIfExistUser(email: string,password:string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/Users/getIfExistUser/${email}/${password}`);
  }
  getIfExistGuide(email:string,password:string):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:57698/api/Users/getIfExistGuide/${email}/${password}`); 
  }
  IsPasswordError(email: string, password: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(`http://localhost:57698/api/Users/IsPasswordError/${email}/${password}`);
  }
  addUserTrip(userTrip: usersTrips): Observable<usersTrips> {
    debugger;
    return this.httpClient.post<usersTrips>(`http://localhost:57698/api/Users/addUserTrip`, userTrip);
  }
  addAttractionToUserTrip(attractionUserTrip: AttractionsToUsersTrips): Observable<AttractionsToUsersTrips> {
    return this.httpClient.post<AttractionsToUsersTrips>(`http://localhost:57698/api/Users/addAttractionToUserTrip`, attractionUserTrip);
  }
  getUserTripIdByUserId(userId: number): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:57698/api/Users/getUserTripIdByUserId/${userId}`);
  }
  getUserById(userId: number): Observable<Users> {
    return this.httpClient.get<Users>(`http://localhost:57698/api/Users/getUserById/${userId}`);
  }
  getIfMatchPasswordGuide(emailUser: string, passworsUser: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/Users/getIfMatchPasswordGuide/${emailUser}/${passworsUser}`);
  }
  getIfMatchPasswordUser(emailGuide: string, passworsGuide: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:57698/api/Users/getIfMatchPasswordUser/${emailGuide}/${passworsGuide}`);
  }
  deleteUserTripById(userTripid:number):Observable<usersTrips>{
    return this.httpClient.delete<usersTrips>(`http://localhost:57698/api/Users/deleteUserTripById/${userTripid}`);
  }
  getIfExistPassword(mailUser:string,user:string):Observable<boolean>{
    return this.httpClient.get<boolean>(`http://localhost:57698/api/Users/getIfExistPassword/${mailUser}/${user}`);
  }
  getUserIfMatchPasswordUser(mailUser:string,passwordUser:string):Observable<Users>{
    return this.httpClient.get<Users>(`http://localhost:57698/api/Users/getUserIfMatchPasswordUser/${mailUser}/${passwordUser}`);
  }


}
