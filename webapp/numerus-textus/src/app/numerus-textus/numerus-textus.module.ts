import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { NumerusTextusRoutingModule } from './numerus-textus-routing.module';
import { NumerusTextusStoreModule } from './store/numerus-textus-store.module';

import { TextToNumberComponent } from './containers/text-to-number/text-to-number.component';
import { NumberToTextComponent } from './containers/number-to-text/number-to-text.component';
import { AboutComponent } from './containers/about/about.component';
import { LegalComponent } from './containers/legal/legal.component';
import { NumberToTextService } from './services/number-to-text/number-to-text.service';
import { TextToNumberService } from './services/text-to-number/text-to-number.service';
import { PossibleWordsComponent } from './components/possible-words/possible-words.component';
import { NumberOutputComponent } from './components/number-output/number-output.component';
import { PrivacyStatementComponent } from './containers/privacy-statement/privacy-statement.component';


@NgModule({
  imports: [
    CommonModule,

    SharedModule,

    NumerusTextusRoutingModule,
    NumerusTextusStoreModule,
  ],
  declarations: [
    TextToNumberComponent,
    NumberToTextComponent,
    AboutComponent,
    LegalComponent,

    PossibleWordsComponent,
    NumberOutputComponent,
    PrivacyStatementComponent,
  ],
  providers: [
    NumberToTextService,
    TextToNumberService,
  ],
})
export class NumerusTextusModule { }
