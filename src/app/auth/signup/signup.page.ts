import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;
  completed = undefined;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signUp(this.form.value).subscribe(
      (data) => {
        console.log(data),
          (this.error = undefined),
          this.route.navigate(['/login']);
      },
      (err) => {
        console.log(err), (this.error = err.error);
      }
    );
  }
}
