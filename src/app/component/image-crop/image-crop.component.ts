/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - icon.componet.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit, Inject } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/core/service/user/user.service';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {


  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    private UserService: UserService,
    private dialogRef: MatDialogRef<ImageCropComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: any
  ) { }

  /* Image Crop */
  private apiImage;
  private croppedImage;

  ngOnInit() {
  }

  /* Image Crop */
  imageCropped(event) {
    this.croppedImage = event
  }

  /**
   * 
   * @description uploading the image to profile
   */

  uploadpic() {
    this.apiImage = this.croppedImage.file
    const uploadData = new FormData();
    uploadData.append('file', this.apiImage, this.apiImage.name);
    this.UserService.uploadProfileImage(uploadData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.dialogRef.close();
        localStorage.setItem("userImage", res['status'].imageUrl);
      }, error => {
        console.log(" Upload Image Error ====>", error);
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
