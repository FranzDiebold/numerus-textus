import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './app-store/app-store.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    AppRoutingModule,
    SharedModule,
    AppStoreModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
