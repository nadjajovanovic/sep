import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { City } from '../models/city';
import { Appoitment } from '../models/appoitment';

@Injectable({
  providedIn: 'root'
})
export class AppoitmentService {

  private readonly appoitmentUrl = 'http://localhost:8083/appoitments/';
  
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

  public getAllAppoitments(): Observable<Appoitment[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<Appoitment[]>(this.appoitmentUrl, {headers: reqHeaders});
  }
  
  public addAppoitment(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.appoitmentUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateAppoitment(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.appoitmentUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public deleteAppoitment(appoitmentid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.appoitmentUrl + appoitmentid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
