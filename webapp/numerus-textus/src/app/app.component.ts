import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/platform-browser';

import { LayoutStoreService } from './layout/store/layout-store.service';
import { SocialSharingStoreService } from './social-sharing/store/social-sharing-store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMobileNavbar$: Observable<boolean>;

  constructor(
    private layoutStoreService: LayoutStoreService,
    private socialSharingStoreService: SocialSharingStoreService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.showMobileNavbar$ = this.layoutStoreService.getShowMobileNavbar();

    this.router.events.subscribe((routerEvent: RouterEvent) => {
        if (!(routerEvent instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });
  }

  toggleMobileNavbar(): void {
    this.layoutStoreService.dispatchToggleMobileNavbarAction();
  }

  hideMobileNavbar(): void {
    this.layoutStoreService.dispatchHideMobileNavbarAction();
  }

  showSocialSharingModal(): void {
    this.socialSharingStoreService.dispatchShowSocialSharingModalAction({
      url: this.document.location.origin,
      title: 'numerus textus',
      description: 'numerus textus is all about numbers and its corresponding texts',
    });
  }
}
