import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  login(){
    localStorage.setItem('token', 'gsdguvdjdssttgej4');
    this.router.navigate(['dashboard', 'courses']);
  }

  /*Promesas y Observables */
}
