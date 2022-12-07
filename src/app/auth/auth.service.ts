import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { User } from './user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Team } from '../_models/team.interface';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    teams?: [];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: AuthData | null = null;
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private route: Router) {
    this.restore();
  }

  restore() {
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin) {
      let userLoggedIn = JSON.parse(userLogin);
      if (!this.helper.isTokenExpired(userLoggedIn.accessToken)) {
        this.isLogged = userLoggedIn;
      }
    } else {
      this.isLogged = null;
    }
  }

  signUp(obj: User) {
    return this.http.post('http://localhost:3000/register', obj);
  }

  signIn(obj: User) {
    return this.http.post<AuthData>('http://localhost:3000/login', obj).pipe(
      tap((data) => {
        console.log(data);
        this.isLogged = data;
      })
    );
  }

  getUser() {
    return this.http.get<User>('');
  }

  logout() {
    this.isLogged = null;
    localStorage.removeItem('userLogin');
    this.route
      .navigateByUrl('/login', { skipLocationChange: true })
      .then(() => {
        this.route.navigate(['/home']);
      });
  }

  getIsLogged() {
    return this.isLogged;
  }

  updateUser(data: Partial<User>, id: number | undefined) {
    return this.http.patch<Team>('http://localhost:3000/users' + id, data);
  }

  getTeams() {
    return this.http.get<Team[]>('http://localhost:3000/teams');
  }

  addTeam(obj: Team) {
    return this.http.post<Team>('http://localhost:3000/teams', obj);
  }

  updateTeam(data: Partial<Team>, id: number | undefined) {
    return this.http.patch<Team>('http://localhost:3000/teams/' + id, data);
  }

  removeTeam(id: number) {
    console.log('remove - 2');
    return this.http.delete('http://localhost:3000/teams/' + id);
  }
}
