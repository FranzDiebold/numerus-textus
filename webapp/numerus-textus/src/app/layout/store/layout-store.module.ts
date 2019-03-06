import { StoreModule } from '@ngrx/store';

import { NgModule } from '@angular/core';

import { layoutFeatureName } from './layout.state';
import { layoutReducer } from './layout.reducers';
import { LayoutStoreService } from './layout-store.service';

@NgModule({
  imports: [
    StoreModule.forFeature(layoutFeatureName, layoutReducer),
  ],
  exports: [
    StoreModule,
  ],
  providers: [
    LayoutStoreService,
  ],
})
export class LayoutStoreModule { }
