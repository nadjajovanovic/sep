import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginUrl = 'http://localhost:8083/api/auth/signin';
    private readonly registerUrl = 'http://localhost:8083/api/auth/signup';
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

    logout() {
        localStorage.removeItem('token');
    }

    register(credentials: any) {
        return this.http.post(this.registerUrl, credentials);
    }
}