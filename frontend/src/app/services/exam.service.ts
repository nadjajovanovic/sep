import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExamType } from '../models/exam-type';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private readonly examUrl = 'http://localhost:8083/exams/';

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

  public getAllExams(): Observable<Exam[]> {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.get<Exam[]>(this.examUrl, {headers: reqHeaders});
  }

  public addExam(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.post<any>(this.examUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }

  public updateExam(data: any) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.put(this.examUrl, data, {headers: reqHeaders})
      .pipe(map((res: any) => {
         return res;
    }));
  }

  public deleteExam(examid: number) {
    let token = this.getToken();
    let reqHeaders = this.getHttpHeaders(token);
    return this.httpClient.delete(this.examUrl + examid, {headers: reqHeaders})
      .pipe(map((res: any) => {
        return res;
    }));
  }
}
