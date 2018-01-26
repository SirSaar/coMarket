import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import 'rxjs/add/observable/of';
import {map,tap} from "rxjs/operators";

@Injectable()
export class AuthService {
  private userApi = '/api/user/';
  private httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
  };

  constructor(private http:HttpClient) { }
  isLoggedIn:boolean = false;
  userProfile:Observable<any>;
  
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  getUserProfile(): Observable<any> {    //should change the isLoggedIn & the user information
    //example: return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
     return this.http.get(this.userApi+'profile').pipe(
        tap(profile => {console.log("Got user profile from API: ",profile);
          this.userProfile=profile;
        })
      );
  }

  checkLogIn(): Observable<boolean> {
    return this.getUserProfile().pipe(
      tap(profile => { this.isLoggedIn= profile ? true : false;}),
      map(profile => this.isLoggedIn) )  
    }
  



  //todo: login() and logout() with redirect
  login() {
    window.location.href='/api/user/auth/facebook';
  }

  logout() {
    window.location.href='/api/user/logout';
  }
}