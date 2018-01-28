import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../item.service';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemCreateComponent implements OnInit {
  item:any;   //item to upload
  title:any;
  photoToUpload: File;

  constructor(private itemService:ItemService, private authService:AuthService,
     private router: Router, private route: ActivatedRoute, private location:Location) { }

  ngOnInit() {
    this.title=this.route.snapshot.data.title;
    this.item = {};
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.photoToUpload = files[0];
    console.log(this.photoToUpload);
  }
  
  uploadItemPhoto(itemID) {
    const formData: any = new FormData;
    console.log("The photo to upload is:",this.photoToUpload);
    formData.append("itemPhoto", this.photoToUpload, itemID);  //(name of file,data,name of file)
    this.itemService.uploadItemPhoto(formData)
    .subscribe(files => console.log(files[0]), (err) => console.log(err));
  }

  saveItem(){   //todo: add item to user
    //this.item.user=this.authService.userProfile['_id'];
    //this.item.qrCode="random";
    this.itemService.saveItem(this.item).subscribe(
      res => {    //res is the object that returns
        this.uploadItemPhoto(res['_id']);
        this.router.navigate(['../my-store'], { relativeTo: this.route });
      }, (err) => {
        console.log(err);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
