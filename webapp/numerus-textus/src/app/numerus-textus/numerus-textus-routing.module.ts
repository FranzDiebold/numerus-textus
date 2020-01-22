import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NumberToTextComponent } from './containers/number-to-text/number-to-text.component';
import { TextToNumberComponent } from './containers/text-to-number/text-to-number.component';
import { AboutComponent } from './containers/about/about.component';
import { LegalComponent } from './containers/legal/legal.component';
import { PrivacyStatementComponent } from './containers/privacy-statement/privacy-statement.component';

const routes: Routes = [
  {
    path: 'number-to-text/:number',
    component: NumberToTextComponent,
  },
  {
    path: 'number-to-text',
    component: NumberToTextComponent,
  },
  {
    path: 'text-to-number/:text',
    component: TextToNumberComponent,
  },
  {
    path: 'text-to-number',
    component: TextToNumberComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'privacy',
    component: PrivacyStatementComponent,
  },
  {
    path: '**',
    redirectTo: 'number-to-text',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NumerusTextusRoutingModule { }
