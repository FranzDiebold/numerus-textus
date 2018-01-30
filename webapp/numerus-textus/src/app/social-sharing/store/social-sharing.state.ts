import { createSelector } from '@ngrx/store';

import { SocialSharingData } from './social-sharing.payloads';


export interface SocialSharingState {
    showSocialSharingModal: boolean;
    socialSharingData?: SocialSharingData;
}

export const initialSocialSharingState: SocialSharingState = {
    showSocialSharingModal: false,
    socialSharingData: undefined,
};


export const socialSharingFeatureName = 'social-sharing';


export const selectShowSocialSharingModal = (state: SocialSharingState) => state.showSocialSharingModal;

export const selectSocialSharingData = (state: SocialSharingState) => state.socialSharingData;
