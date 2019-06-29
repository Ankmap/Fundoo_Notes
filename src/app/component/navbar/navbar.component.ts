/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - navbar.component.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NotesService } from '../../core/service/notes/notes.service';
import { DataService } from '../../core/service/data/data.service'
import { MatDialog } from '@angular/material';
import { LabelComponent } from '../../component/label/label.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Label } from 'src/app/core/model/label/label';
import { ImageCropComponent } from '../image-crop/image-crop.component';
import { environment } from 'src/environments/environment';
import { UserService } from '../../core/service/user/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();


  /* Get from localStorage */
  firstName = localStorage.getItem("firstname");
  lastName = localStorage.getItem("lastname");
  email = localStorage.getItem("email");
  image = localStorage.getItem("userImage");
  productCartId = localStorage.getItem("productCartId");

  // image = 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  // image = 'http://34.213.106.173/'+this.imageUrl;

  /* label */
  private label: Label[] = [];
  private labelList = [];

  /* signOut */
  private signoutCard: boolean = false;

  /* search the note */
  private searchValue: any;

  /* Grid */
  list: boolean = true;
  grid: boolean = false;
  view: any;
  direction: string;

  /* Show Name */
  appName: String;
  private labelShow: boolean = false;
  private labelValue = '';

  /* Profile img uploader */
  private img;
  private width;
  private message: string

  /**
  * @Purpose : Inject the UserserviceService, Router, NotesService, 
  *            MatDialog, DataService in the constructor
  **/

  constructor(
    private UserService: UserService,
    private router: Router,
    private noteService: NotesService,
    private dialog: MatDialog,
    private data: DataService,
    private route: ActivatedRoute
  ) { }
  private addCartId = '';

  ngOnInit() {
    /* Show Name */
    this.appName = "Fundoo";

    /* For Show Label*/
    this.showLabel();

    /* For gridView and ListView */
    this.data.getView()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.view = response;
        this.direction = this.view.data;
      });

    /* Image upload */
    // this.img = 'http://34.213.106.173/' + this.image;
    this.img = environment.url + this.image;
    this.isLargeScreen();

    /* On Click Label show all note with that label */
    this.data.currentMessageLabel
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.message = message;
        if (this.message != "default") {
          this.router.navigateByUrl('/getlabel/' + this.message);
          this.navbarName(this.message)
        }
      });

    /**
     * @Purpose : Take id thrugh param
     **/
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.addCartId = params['id'];
        console.log('check param id in home i.e dashboard====>', this.addCartId);
      });
  }

  /* Image upload */
  isLargeScreen() {
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  // addShoppingCart(productCartId) {
  //   console.log("product cart id ==>" + productCartId);
  //   let value = localStorage.getItem("productCartId");
  //   console.log("-------" + value);
  //   if (value == undefined) {
  //     value == 'Cart is not there';
  //     console.log('check ==>', value);

  //   }
  //   else {
  //     this.router.navigateByUrl('/mainCart');
  //   }
  // }
  // private viewHide=false;
  addShoppingCart() {
    // this.viewHide=false;
    this.router.navigateByUrl('/mainCart');
  }
  /**
   * @Purpose : Logout
   **/
  logout() {
    this.UserService.userLogout()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log("response ====>", response);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("email");
        // localStorage.removeItem("userImage");
        localStorage.removeItem("productCartId")
        this.router.navigateByUrl('/cart');
      });
  }

  /**
   * @Purpose : Account for Logout
   **/
  account() {
    this.signoutCard = !(this.signoutCard);
  }

  /**
   * @Purpose : createLabel method for popup and go to the LabelComponnent
   **/
  createLabel() {
    this.appName = "Label";
    const dialogRef = this.dialog.open(LabelComponent, {
      width: '350px',
      height: ''
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.showLabel();
        this.data.changeMessage('')
      })
  }

  /**
   * @Purpose : For ShowLabel
   **/
  showLabel() {
    this.noteService.showNoteLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.label = response["data"].details;
        this.labelList = [];
        for (let i = 0; i < this.label.length; i++) {
          this.labelList.push(this.label[i].label);
        }
      });
  }

  /**
   * @Purpose : Search
   **/
  search() {
    this.router.navigateByUrl('/search');
  }
  newMessage() {
    this.data.changeMessageSearch(this.searchValue)
  }

  /**
    * @Purpose : refresh
  **/
  refresh() {
    this.router.navigateByUrl('/home');
    this.labelShow = false
  }

  /**
   * @Purpose : Note Click show all label
   **/
  displayNote() {
    this.appName = "Notes";
    this.router.navigateByUrl('/home')
    this.data.allNote
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log("response ====>", response);
      });
  }

  /**
   * @Purpose : Grid view List View
   **/
  changeView() {
    /* Toggle the grid and list button */
    if (this.list) {
      this.grid = true;
      this.list = false;
    } else {
      this.list = true;
      this.grid = false;
    }
    this.data.gridView();
  }

  /**
   * @Purpose : Reminder 
   * 
   **/
  reminders() {
    this.appName = "Reminders";
    this.router.navigateByUrl('/reminder');
  }

  /**
   * @Purpose : Archive 
   **/
  archive() {
    this.appName = "Archive";
    this.router.navigateByUrl('/archive');
  }

  /**
   * @Purpose : Trash 
   **/
  trash() {
    this.appName = "Trash";
    this.router.navigateByUrl('/trash');
  }

  /**
   * @Purpose : Profile Image Upload 
   **/
  profileImage(event): void {
    const dialogRef = this.dialog.open(ImageCropComponent, {
      width: '400px',
      data: event
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.img = environment.url + localStorage.getItem("userImage")
      });
  }

  /* Show label Name */
  navbarName(aa) {
    this.labelShow = true
    this.labelValue = aa
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}