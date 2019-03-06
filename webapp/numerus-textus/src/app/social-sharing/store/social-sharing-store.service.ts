import { Observable } from 'rxjs';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

import { Injectable } from '@angular/core';

import { StoreService } from '../../app-store/app-store.service';

import { AppState } from '../../app-store/app.reducers';
import {
  socialSharingFeatureName,
  SocialSharingState,
  selectShowSocialSharingModal, selectSocialSharingData,
} from './social-sharing.state';
import {
  ShowSocialSharingModalAction, HideSocialSharingModalAction,
} from './social-sharing.actions';
import { SocialSharingData } from './social-sharing.payloads';

@Injectable()
export class SocialSharingStoreService extends StoreService {
  private socialSharingState = createFeatureSelector<SocialSharingState>(socialSharingFeatureName);

  private showSocialSharingModal = createSelector(this.socialSharingState, selectShowSocialSharingModal);
  private socialSharingData = createSelector(this.socialSharingState, selectSocialSharingData);

  constructor(protected store: Store<AppState>) {
    super();
  }

  dispatchShowSocialSharingModalAction(socialSharingData: SocialSharingData): void {
    this.dispatchAction(new ShowSocialSharingModalAction(socialSharingData));
  }

  dispatchHideSocialSharingModalAction(): void {
    this.dispatchAction(new HideSocialSharingModalAction());
  }

  getShowSocialSharingModal(): Observable<boolean> {
    return this.store.select<boolean>(this.showSocialSharingModal);
  }

  getSocialSharingData(): Observable<SocialSharingData> {
      return this.store.select<SocialSharingData>(this.socialSharingData);
  }
}
