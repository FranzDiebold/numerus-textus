import { NgRxAction } from '../../app-store/ngrx-action';


export enum LayoutActions {
    TOGGLE_MOBILE_NAVBAR = '[Layout] Toggle Mobile Navbar',
    HIDE_MOBILE_NAVBAR = '[Layout] Hide Mobile Navbar',
}

export class ToggleMobileNavbarAction extends NgRxAction<undefined> {
    readonly type = LayoutActions.TOGGLE_MOBILE_NAVBAR;
}

export class HideMobileNavbarAction extends NgRxAction<undefined> {
    readonly type = LayoutActions.HIDE_MOBILE_NAVBAR;
}

export type LayoutAction = ToggleMobileNavbarAction | HideMobileNavbarAction;
