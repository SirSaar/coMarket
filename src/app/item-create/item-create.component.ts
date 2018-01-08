import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  item:any;
  title:any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.item = {};
  }

  saveItem() {
    //todo: add trader name and id
    this.http.post('/api/item', this.item)
      .subscribe(res => {
        let id =res['_id'];
        this.router.navigate(['/my-store']);
      }), (err) => {
        console.log(err);
      }
  }
}
