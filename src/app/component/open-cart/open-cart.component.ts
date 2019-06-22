import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-open-cart',
  templateUrl: './open-cart.component.html',
  styleUrls: ['./open-cart.component.scss']
})
export class OpenCartComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  cartData: [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<OpenCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.cartData = this.data["data"]
    console.log('Cart Data in dialog box=====>', this.cartData);
  }

  cartGo(name): void {
    this.router.navigateByUrl('/registration/' + name);
    this.dialogRef.close();
  }
  cartBack(): void {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
