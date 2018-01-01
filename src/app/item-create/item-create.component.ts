import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  item = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
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
