import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgModule } from '@angular/core';

import { numerusTextusFeatureName } from './numerus-textus.state';
import { numerusTextusReducer } from './numerus-textus.reducers';
import { NumerusTextusEffects } from './numerus-textus.effects';
import { NumerusTextusStoreService } from './numerus-textus-store.service';

@NgModule({
  imports: [
    StoreModule.forFeature(numerusTextusFeatureName, numerusTextusReducer),
    EffectsModule.forFeature([NumerusTextusEffects]),
  ],
  exports: [
    StoreModule,
    EffectsModule,
  ],
  providers: [
    NumerusTextusStoreService,
  ],
})
export class NumerusTextusStoreModule { }
