import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GetFilesService } from './get-files.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  Images: any = [];
  simething: any;
  constructor(
    public fb: FormBuilder,
    public fileUploadService: GetFilesService,
  ) {
    // Reactive Form
    this.form = this.fb.group({
      randImage: [null]
    })
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      randImage: file
    });
    this.form.get('randImage').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  uploadDirectory(event){
    const multiplefiles = (event.target as HTMLInputElement).files;
    console.log("file=====>",multiplefiles.length)
    if(multiplefiles.length>0){
      
    }
    // this.form.patchValue({
    //   randImage: file
    // });
    // this.form.get('randImage').updateValueAndValidity()

    // // File Preview
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.preview = reader.result as string;
    // }
    // reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addImage(
      this.form.value.randImage
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          //
          this.fileUploadService.getImages().subscribe((res) => {
            this.Images = res['images'];
          })
          //
          break;
        case HttpEventType.Response:
          console.log('File successfully uploaded!', event.body);
          this.percentDone = false;
      }
    })
  }

  title = 'upload-app';
  ngOnInit() {
    this.fileUploadService.getImages().subscribe((res) => {
      this.Images = res['images'];
    })
  }
}
