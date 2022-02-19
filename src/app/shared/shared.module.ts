import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IMaskModule} from 'angular-imask';
import { TipoPipe } from './pipes';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { DataPipe } from './pipes/data.pipe';

@NgModule({
  imports: [
    CommonModule,
    IMaskModule
  ],
  declarations: [
  TipoPipe,
  DataPipe],
  exports: [
    IMaskModule,
    TipoPipe,
    DataPipe
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
