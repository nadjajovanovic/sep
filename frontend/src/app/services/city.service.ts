import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Patient } from '../models/patient';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly cityUrl = 'http://localhost:8083/cities/';
  
  constructor (private httpClient : HttpClient) {}
    
  public getToken() {
    let getToken = JSON.parse(localStorage.getItem('token') as any);
    let token = Object.values(getToken);
    return token;
  }

  public getHttpHeaders(token: any) {
    let reqHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return reqHeaders;
  }

  public getAllCities(): Observable<City[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<City[]>(this.cityUrl, {headers: reqHeaders});
  }

  public addCity(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.cityUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateCity(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.cityUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public deleteCity(cityid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.cityUrl + cityid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
