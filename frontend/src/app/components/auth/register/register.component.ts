import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authService: AuthService,
    private fb : FormBuilder,
    private router: Router,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  register() {
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value)
    .pipe(first())
    .subscribe({
      next: (res) => {
        console.log(res);
        this.notification.success('You are now registered');
        this.router.navigate(['login']);
      }, error: error=> {
        console.log(error);
      }});

      this.registerForm.reset();
  }
}
