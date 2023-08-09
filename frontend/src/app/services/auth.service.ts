import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginUrl = 'http://localhost:8083/api/auth/signin';
    private readonly registerUrl = 'http://localhost:8083/api/auth/signup';
    private readonly currentUserUrl = 'http://localhost:8083/api/auth/currentUser';
    isLoggedIn = new Subject();

    constructor(private http : HttpClient) {
    }

    login(credentials : any) {
        return this.http.post(this.loginUrl, credentials)
        .pipe(map(res => {
            localStorage.setItem('token', JSON.stringify(res));
            return res;
        }))
    }

    public logout() {
        localStorage.removeItem('token');
    }

    public register(credentials: any) {
        return this.http.post(this.registerUrl, credentials);
    }

    getCurrentUser() {
        let getToken = JSON.parse(localStorage.getItem('token') as any);
        let token = Object.values(getToken);
        let reqHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.currentUserUrl, { headers: reqHeaders});
    }
}