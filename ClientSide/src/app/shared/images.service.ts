import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ImagesUrl } from '../classes/images-url';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {


  constructor(private httpClient: HttpClient) {
  }

  addImageUrl(newImg: ImagesUrl): Observable<ImagesUrl> {
    debugger
    return this.httpClient.post<ImagesUrl>(`http://localhost:57698/api/attractions/AddImgUrl`,newImg);
  }
  getImagesByAttractionId(id: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`http://localhost:57698/api/attractions/GetUrlByAttractionId/${id}`);
  }
  addWaitingAttractionImage(id: number, img: string[]): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/attractionsForAgree/addWaitingAttractionImg/${id}`, img);
  }
  getImagesByWaitingAttractionId(id: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`http://localhost:57698/api/attractionsForAgree/GetImagesByWaitingAttractionId/${id}`);
  }
}
