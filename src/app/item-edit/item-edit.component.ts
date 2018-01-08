import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  item:any;
  title:any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.item={};
    this.title=this.route.snapshot.data.title;
    this.getItem(this.route.snapshot.params['id']);
  }

  getItem(id) {
    this.http.get('/api/item/'+id).subscribe(data => {
      this.item = data;
    });
  }

  updateItem(id, data) {
    this.http.put('/api/item/'+id, data)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/my-store']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  deleteItem(id) {
    this.http.delete('/api/item/'+id)
      .subscribe(res => {
          this.router.navigate(['/my-store']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
