import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  item:any;
  title:any;

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.item={};
    this.title=this.route.snapshot.data.title;
    this.getItem(this.route.snapshot.params['id']);
  }

  goBack() {
    this.router.navigate(['../../my-store'], { relativeTo: this.route });
  }

  getItem(id) {
    this.itemService.getItem(id).subscribe(data => {
      this.item = data;
    }, (err) => {
      this.goBack();
    });
  }

  updateItem(id) {
    this.itemService.updateItem(id,this.item)
      .subscribe(res => {
          let id = res['_id'];
          this.goBack();
        }, (err) => {
          console.log(err);
        }
      );
  }

  deleteItem(id) {
    this.itemService.deleteItem(id)
      .subscribe(res => {
          this.goBack();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
