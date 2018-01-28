import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from '../../item.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  items: Observable<any[]>;   //array got from rest api
  title: string;
  constructor(private router: Router,private route: ActivatedRoute,
  private itemService:ItemService, private userService:UserService) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.items=this.itemService.getItems();   
  }


}
