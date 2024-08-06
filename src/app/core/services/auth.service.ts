import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { User } from '../../modules/dashboard/users/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(
    private httpCliente: HttpClient, 
    private router: Router, 
    private notifier: NotifierService
  ) { }

  login(data: { email: string; password: string }) {
    this.httpCliente
      .get<User[]>(environment.apiUrl + '/users', {
        params: {
          email: data.email,
          password: data.password,
        },
      })
      .subscribe({
        next: (response) => {
          if (!response.length) {
            alert('Usuario o password invalido');
          } else {
            const authUser = response[0];
            localStorage.setItem('token', authUser.token);
            this._authUser$.next(authUser);
            this.router.navigate(['dashboard', 'home']);
          }
        },
        error: (err) => {
          this.notifier.sendNotification('Error al iniciar sesion');
        },
      });
  }

  logout(){
    localStorage.removeItem('token');
    this._authUser$.next(null);
    this.router.navigate(['auth', 'login']);
  }

  

  verifyToken(): Observable<boolean> {
    if (typeof localStorage === 'undefined') {
      return of(false);
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.httpCliente
      .get<User[]>(environment.apiUrl + '/users', {
        params: {
          token,
        },
      })
      .pipe(
        map((response) => {
          if (!response.length) {
            return false;
          } else {
            const authUser = response[0];
            localStorage.setItem('token', authUser.token);
            this._authUser$.next(authUser);
            return true;
          }
        })
      );
  }

  /*Promesas y Observables */
}
