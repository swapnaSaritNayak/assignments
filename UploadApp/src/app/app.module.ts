import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';

import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    CarouselComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
