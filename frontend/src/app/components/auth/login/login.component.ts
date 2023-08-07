import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading=false;
  submitted=false

  constructor(private authService: AuthService,
    private router: Router,
    private notification: NotificationService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  username: any;

  login() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value)
    .pipe(first())
    .subscribe({ next: (res) => {
      this.notification.success('You are now logged in');
      this.authService.isLoggedIn.next(true);
      this.router.navigate(['home']);
    }, error: error => {
      console.log(error)
    }});

    this.loginForm.reset();
  }
}
