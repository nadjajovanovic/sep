import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Municipality } from '../models/municipality';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  private readonly municipalityUrl = 'http://localhost:8083/municipalities/';
  
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

  public getAllMunicipalities(): Observable<Municipality[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<Municipality[]>(this.municipalityUrl, {headers: reqHeaders});
  }

  public addMunicipality(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.municipalityUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateMunicipality(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.municipalityUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public deleteMunicipality(municipalityid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.municipalityUrl + municipalityid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
