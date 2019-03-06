import { Observable } from 'rxjs';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

import { Injectable } from '@angular/core';

import { StoreService } from '../../app-store/app-store.service';

import { AppState } from '../../app-store/app.reducers';
import {
    LayoutState, layoutFeatureName,
    selectShowMobileNavbar,
} from './layout.state';
import {
  ToggleMobileNavbarAction, HideMobileNavbarAction,
} from './layout.actions';

@Injectable()
export class LayoutStoreService extends StoreService {
  private layoutState = createFeatureSelector<LayoutState>(layoutFeatureName);

  private showMobileNavbar = createSelector(this.layoutState, selectShowMobileNavbar);

  constructor(protected store: Store<AppState>) {
    super();
  }

  dispatchToggleMobileNavbarAction(): void {
    this.dispatchAction(new ToggleMobileNavbarAction());
  }

  dispatchHideMobileNavbarAction(): void {
    this.dispatchAction(new HideMobileNavbarAction());
  }

  getShowMobileNavbar(): Observable<boolean> {
    return this.store.select<boolean>(this.showMobileNavbar);
  }
}
