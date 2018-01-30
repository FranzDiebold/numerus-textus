import { NgRxAction } from '../../app-store/ngrx-action';

import { SocialSharingData } from './social-sharing.payloads';


export enum SocialSharingActions {
    SHOW_SOCIAL_SHARING_MODAL = '[Social Sharing] Show Modal',
    HIDE_SOCIAL_SHARING_MODAL = '[Social Sharing] Hide Modal',
}

export class ShowSocialSharingModalAction extends NgRxAction<SocialSharingData> {
    readonly type = SocialSharingActions.SHOW_SOCIAL_SHARING_MODAL;
}

export class HideSocialSharingModalAction extends NgRxAction<undefined> {
    readonly type = SocialSharingActions.HIDE_SOCIAL_SHARING_MODAL;
}

export type SocialSharingAction = ShowSocialSharingModalAction | HideSocialSharingModalAction;
