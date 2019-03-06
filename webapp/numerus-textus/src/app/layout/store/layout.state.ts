export interface LayoutState {
    showMobileNavbar: boolean;
}

export const initialLayoutState: LayoutState = {
    showMobileNavbar: false,
};

export const layoutFeatureName = 'layout';

export const selectShowMobileNavbar = (state: LayoutState) => state.showMobileNavbar;
