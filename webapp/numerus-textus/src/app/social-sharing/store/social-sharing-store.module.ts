import { StoreModule } from '@ngrx/store';

import { NgModule } from '@angular/core';

import { socialSharingFeatureName } from './social-sharing.state';
import { socialSharingReducer } from './social-sharing.reducers';
import { SocialSharingStoreService } from './social-sharing-store.service';

@NgModule({
  imports: [
    StoreModule.forFeature(socialSharingFeatureName, socialSharingReducer),
  ],
  exports: [
    StoreModule,
  ],
  providers: [
    SocialSharingStoreService,
  ],
})
export class SocialSharingStoreModule { }
