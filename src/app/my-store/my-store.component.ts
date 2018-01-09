import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit {
  items: any[];   //array got from rest api
  title: string;
  constructor(private router: Router,private route: ActivatedRoute,
  private itemService:ItemService) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.items=[];
    
    this.getItems();
  }

  getItems():void {
    this.itemService.getItems().
    subscribe(items => this.items = items);
  }


}
