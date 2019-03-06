import { LayoutState, initialLayoutState } from './layout.state';
import { LayoutAction, LayoutActions } from './layout.actions';

export function layoutReducer(
    state: LayoutState = initialLayoutState,
    action: LayoutAction
): LayoutState {
    switch (action.type) {
        case LayoutActions.TOGGLE_MOBILE_NAVBAR:
            return {
                showMobileNavbar: !state.showMobileNavbar,
            };
        case LayoutActions.HIDE_MOBILE_NAVBAR:
            return {
                showMobileNavbar: false,
            };

        default: {
            return state;
        }
    }
}
