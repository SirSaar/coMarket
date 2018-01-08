import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit {
  items: any;   //array got from rest api

  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    //let title=this.route.snapshot.data.title;
    this.items=[];
    this.http.get('/api/item').subscribe(data => {
      this.items = data;
      console.log("got items:",this.items)
    });
  }


}
