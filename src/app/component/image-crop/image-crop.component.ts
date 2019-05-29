import { Component, OnInit, Inject } from '@angular/core';
import { UserserviceService } from 'src/app/core/service/user/user-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private apiImage;
  private croppedImage;

  constructor(
    private userService: UserserviceService,
    private dialogRef: MatDialogRef<ImageCropComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
  }
  imageCropped(event) {
    this.croppedImage = event
  }

  uploadpic() {
    this.apiImage = this.croppedImage.file
    //Upload file here send a Form data
    const uploadData = new FormData();
    uploadData.append('file', this.apiImage, this.apiImage.name);
    this.userService.uploadProfileImage(uploadData).pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        console.log('Img res ===>',res);
        this.dialogRef.close();
        localStorage.setItem("userImage",res['status'].imageUrl);
      }, error => {
        console.log("Img err ===>",error); 
      })
  }
}
