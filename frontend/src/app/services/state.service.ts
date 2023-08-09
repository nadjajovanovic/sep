import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamType } from '../models/exam-type';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private readonly stateUrl = 'http://localhost:8083/states/';

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

  public getAllStates(): Observable<State[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<State[]>(this.stateUrl, {headers: reqHeaders});
  }

  public addState(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.stateUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateState(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.stateUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
         return res;
    }));
  }

  public deleteState(stateid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.stateUrl + stateid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
