import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { GetFilesService } from '../get-files.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() allImage: any;
  constructor(config: NgbCarouselConfig, private sanitizer: DomSanitizer, public fileUploadService: GetFilesService) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  transform(img: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64, " + img);
  }

  removeImage(removeId: any) {

    this.fileUploadService.removeImage(removeId).subscribe((val) => {

      console.log("--removed", val);
      if (val.yo == "its deleted") {
        this.fileUploadService.getImages().subscribe((res) => {
          this.allImage = res['images'];
        })
      }


    })
  }

  ngOnInit() {
  }

} 