import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.http.get('/api/user/profile').subscribe(data => {
      this.user = data;
      console.log("got user:",this.user);
    });
  }
}
