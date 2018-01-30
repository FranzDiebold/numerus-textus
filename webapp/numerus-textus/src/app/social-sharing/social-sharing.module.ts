import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialSharingStoreModule } from './store/social-sharing-store.module';
import { SocialSharingStoreService } from './store/social-sharing-store.service';
import { SocialSharingComponent } from './components/social-sharing/social-sharing.component';
import { SocialSharingModalComponent } from './containers/social-sharing-modal/social-sharing-modal.component';


@NgModule({
    imports: [
        CommonModule,

        SocialSharingStoreModule,
    ],
    declarations: [
        SocialSharingComponent,
        SocialSharingModalComponent,
    ],
    exports: [
        SocialSharingModalComponent,
    ],
})
export class SocialSharingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SocialSharingModule,
            providers: [
                SocialSharingStoreService,
            ],
        };
    }
}
