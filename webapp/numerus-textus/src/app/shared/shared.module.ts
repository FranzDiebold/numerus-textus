import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class SharedModule { }
