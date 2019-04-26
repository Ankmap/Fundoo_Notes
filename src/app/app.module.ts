import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @Purpose : Configure animations
 **/ 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { Login1Component } from './component/login1/login1.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { Login2Component } from './component/login2/login2.component';

import { from } from 'rxjs';
/**
 * @Purpose : Material Required file
 **/
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material'; 
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

/** Form Validation **/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    Login1Component,
    Login2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
