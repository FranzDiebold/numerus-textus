import { NgModule, ModuleWithProviders } from '@angular/core';

import { LayoutStoreModule } from './store/layout-store.module';
import { LayoutStoreService } from './store/layout-store.service';

@NgModule({
    imports: [
        LayoutStoreModule,
    ],
})
export class LayoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LayoutModule,
            providers: [
                LayoutStoreService,
            ],
        };
    }
}
