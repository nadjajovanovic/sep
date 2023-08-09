import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamType } from '../models/exam-type';
import { Insurance } from '../models/insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private readonly insuranceUrl = 'http://localhost:8083/insurances/';

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

  public getAllInsurances(): Observable<Insurance[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<Insurance[]>(this.insuranceUrl, {headers: reqHeaders});
  }

  public addInsurance(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.insuranceUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateInsurance(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.insuranceUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
         return res;
    }));
  }

  public deleteInsurance(insuranceid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.insuranceUrl + insuranceid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
