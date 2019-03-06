import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './app-store/app-store.module';
import { LayoutModule } from './layout/layout.module';
import { SocialSharingModule } from './social-sharing/social-sharing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    SharedModule,
    AppStoreModule,
    LayoutModule.forRoot(),
    SocialSharingModule.forRoot(),
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
