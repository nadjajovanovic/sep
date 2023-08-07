import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ifLoggedIn: any;

  constructor(private router: Router,
    private auth: AuthService,
    private notification: NotificationService) {
      auth.isLoggedIn.subscribe(res => {
        this.ifLoggedIn = res;
      });
      
      if(localStorage.getItem('token')) {
        this.ifLoggedIn = true;
      }
    }

  ngOnInit(): void {
    
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['home']);
    this.notification.success('You are logged out');
    this.ifLoggedIn = false;
  }
}
