import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Doctor } from '../models/doctor';
import { ExamType } from '../models/exam-type';

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  private readonly examTypeUrl = 'http://localhost:8083/exam-type/';

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

  public getAllExamTypes(): Observable<ExamType[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<ExamType[]>(this.examTypeUrl, {headers: reqHeaders});
  }

  public addExamType(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.examTypeUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateExamType(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.examTypeUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
         return res;
    }));
  }

  public deleteExamType(examtypeid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.examTypeUrl + examtypeid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
