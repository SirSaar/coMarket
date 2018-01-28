import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  userApi = '/api/user/';
  constructor(private http:HttpClient) { }

  getUserByID(id): Observable<any> {
    return this.http.get<any>(this.userApi+id);
  }

}
