import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
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
          this.route
            .navigateByUrl('/login', { skipLocationChange: true })
            .then(() => {
              this.route.navigate(['/home']), this.form.reset();
            });
      },
      (err) => {
        console.log(err), (this.error = err.error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  collapseProperty() {
    this.isCollapsed = true;
  }
}
