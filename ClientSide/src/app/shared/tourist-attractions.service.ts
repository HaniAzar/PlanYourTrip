import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristAttractions } from '../classes/tourist-attractions';
import { Categories } from '../classes/categories';
import { Search } from '../classes/search';
import { ImagesUrl } from '../classes/images-url';
import { AttractionsToCategories } from '../classes/attractions-to-categories';

@Injectable({
  providedIn: 'root'
})
export class TouristAttractionsService {
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.httpClient.get<Categories[]>(`http://localhost:57698/api/categories/GetCategories`);
  }
  getAllAttraction(): Observable<TouristAttractions[]> {
    return this.httpClient.get<TouristAttractions[]>(`http://localhost:57698/api/attractions/GetAllAttractions`);
  }
  addAttraction(newAttraction: TouristAttractions): Observable<TouristAttractions> {
    return this.httpClient.post<TouristAttractions>(`http://localhost:57698/api/attractions/addAttraction`, newAttraction);
  }
  getAttractionById(id: number): Observable<TouristAttractions> {
    return this.httpClient.get<TouristAttractions>(`http://localhost:57698/api/attractions/GetAttractionById/${id}`);
  }
  getCategoriesByAttractionId(id: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`http://localhost:57698/api/attractions/GetCategoriesByAttractionId/${id}`);
  }
  getAttractionByName(name: string): Observable<TouristAttractions> {
    return this.httpClient.get<TouristAttractions>(`http://localhost:57698/api/attractions/GetAttractionByName/${name}`);
  }
  getAttractionsBySearch(search: Search): Observable<TouristAttractions[]> {
    return this.httpClient.post<TouristAttractions[]>(`http://localhost:57698/api/attractions/searchAttractions`, search);
  }
  addAttractionsToCategories(attractionTocategory:AttractionsToCategories[]): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/attractions/addAttractionsToCategories`, attractionTocategory);
  }
  isExistAttraction(name: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:57698/api/attractions/IsExistAttraction/${name}`);
  }
  getImagesByAttractionId(id: number): Observable<ImagesUrl[]> {
    return this.httpClient.get<ImagesUrl[]>(`http://localhost:57698/api/attractions/GetUrlByAttractionId/${id}`);
  }
  updateAttractionLocation(attraction: TouristAttractions): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:57698/api/attractions/UpdateAttraction`, attraction);
  }
  GetAttractionIdByName(name: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:57698/api/attractions/GetAttractionIdByName/${name}`);
  }
  GetCategoriesIdByCategoriesName(categories:string[]):Observable<number[]>{
    return this.httpClient.post<number[]>(`http://localhost:57698/api/attractions/GetCategoriesIdByCategoriesName`,categories);
  }
  getAttractionIfExist(attractionName:string):Observable<TouristAttractions>{
    return this.httpClient.get<TouristAttractions>(`http://localhost:57698/api/attractions/getAttractionIfExist/${attractionName}`);
  }
}