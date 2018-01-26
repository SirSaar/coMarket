import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../item.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  item:any;   //item to upload
  title:any;
  photoToUpload$: Array<File>;

  constructor(private itemService:ItemService, private authService:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.photoToUpload$ = [];
    this.item = {};
 
  }
  
  uploadItemPhoto() {
    const formData: any = new FormData;
    console.log("The photo to upload is:",this.photoToUpload$[0]);
    formData.append("itemImage", this.photoToUpload$[0], this.item.user);  //(name of file,data,name of file)
    this.itemService.uploadItemPhoto(this.authService.userProfile['_id'],formData)
    .subscribe(files => console.log(files[0]), (err) => console.log(err));
  }

  saveItem(){
    this.item.user=this.authService.userProfile['_id'];
    this.item.qrCode="random";
    this.uploadItemPhoto();
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
