import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  item:any;
  title:any;

  constructor(private itemService:ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.item = {};
  }

  saveItem(){
    this.itemService.saveItem(this.item).subscribe(
      res => {    //res is the object that returns
        let id =res['_id'];
        this.router.navigate(['../my-store'], { relativeTo: this.route });
      }, (err) => {
        console.log(err);
      }
    );
  }
}
