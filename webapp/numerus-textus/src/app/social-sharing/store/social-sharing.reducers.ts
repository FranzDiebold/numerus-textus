import { environment } from '../../../environments/environment';
import {
  SocialSharingState, initialSocialSharingState,
} from './social-sharing.state';
import {
  SocialSharingAction, SocialSharingActions,
} from './social-sharing.actions';


export function socialSharingReducer(
  state: SocialSharingState = initialSocialSharingState,
  action: SocialSharingAction
): SocialSharingState {
  switch (action.type) {
    case SocialSharingActions.SHOW_SOCIAL_SHARING_MODAL:
      return {
        showSocialSharingModal: true,
        socialSharingData: {
          ...action.payload,
          via: action.payload.via || environment.twitterAccount,
        },
      };
    case SocialSharingActions.HIDE_SOCIAL_SHARING_MODAL:
      return {
        showSocialSharingModal: false,
        socialSharingData: undefined,
      };

    default: {
      return state;
    }
  }
}
