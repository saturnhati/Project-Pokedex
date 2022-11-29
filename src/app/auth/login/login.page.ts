import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  error = undefined;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signIn(this.form.value).subscribe(
      (data) => {
        console.log(data),
          (this.error = undefined),
          localStorage.setItem('userLogin', JSON.stringify(data)),
          this.route.navigate(['/home']);
      },
      (err) => {
        console.log(err), (this.error = err.error);
      }
    );
  }
}
