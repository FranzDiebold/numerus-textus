import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { SocialSharingData } from '../../store/social-sharing.payloads';
import { SocialSharingStoreService } from '../../store/social-sharing-store.service';

@Component({
  selector: 'app-social-sharing-modal',
  templateUrl: './social-sharing-modal.component.html',
  styleUrls: ['./social-sharing-modal.component.scss']
})
export class SocialSharingModalComponent implements OnInit {
  showSocialSharingModal$: Observable<boolean>;
  socialSharingData$: Observable<SocialSharingData>;

  constructor(private socialSharingStoreService: SocialSharingStoreService) { }

  ngOnInit() {
    this.showSocialSharingModal$ = this.socialSharingStoreService.getShowSocialSharingModal();
    this.socialSharingData$ = this.socialSharingStoreService.getSocialSharingData();
  }

  hideSocialSharingModal(): void {
    this.socialSharingStoreService.dispatchHideSocialSharingModalAction();
  }
}
