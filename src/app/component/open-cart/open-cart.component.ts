import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-open-cart',
  templateUrl: './open-cart.component.html',
  styleUrls: ['./open-cart.component.scss']
})
export class OpenCartComponent implements OnInit {

  constructor(
    private router : Router,
    public dialogRef: MatDialogRef<OpenCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  cartGo(): void {
    this.router.navigateByUrl('/mainCart');
    this.dialogRef.close();
  }
  cartBack(): void {
    this.dialogRef.close();
  }
}
