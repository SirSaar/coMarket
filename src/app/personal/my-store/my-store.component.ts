import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ItemService } from '../../item.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit {
  items: Observable<any[]>;   //array got from rest api
  title: string;
  constructor(private router: Router,private route: ActivatedRoute,
  private itemService:ItemService, private authService:AuthService) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.items=this.itemService.getMyItems();
    
  }


  deleteItem(id) {
    this.itemService.deleteItem(id)
      .subscribe(res => {
        //delete from this.items
        this.items.subscribe();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
