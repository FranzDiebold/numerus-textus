import { Observable } from 'rxjs';

import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { LayoutStoreService } from './layout/store/layout-store.service';
import { SocialSharingStoreService } from './social-sharing/store/social-sharing-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMobileNavbar$: Observable<boolean>;
  languages = [
    {
      id: 'en',
      name: 'english',
    },
    {
      id: 'de',
      name: 'deutsch',
    },
  ];

  constructor(
    private layoutStoreService: LayoutStoreService,
    private socialSharingStoreService: SocialSharingStoreService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private locale: string,
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

  get languageIdentifier(): string {
    return (this.locale || '').substring(0, 2);
  }
}
