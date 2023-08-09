import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Insurance } from '../models/insurance';
import { Facility } from '../models/facility';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private readonly facilityUrl = 'http://localhost:8083/facilities/';

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

  public getAllFacilities(): Observable<Facility[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<Facility[]>(this.facilityUrl, {headers: reqHeaders});
  }

  public addFacility(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.facilityUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateFacility(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.facilityUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
         return res;
    }));
  }

  public deleteFacility(facilityid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.facilityUrl + facilityid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
