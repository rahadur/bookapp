import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {BookCardComponent} from './components/book-card/book-card.component';
import {HorizontalScrollComponent} from './components/horizontal-scroll/horizontal-scroll.component';
import {DescriptionComponent} from './components/description/description.component';

export const SHARED_MODULES = [
  IonicModule,
  CommonModule,
  RouterModule,
  FormsModule,
];

@NgModule({
  declarations: [
    BookCardComponent,
    HorizontalScrollComponent,
    DescriptionComponent
  ],
  imports: [...SHARED_MODULES],
  exports: [
    ...SHARED_MODULES,
    BookCardComponent,
    HorizontalScrollComponent,
    DescriptionComponent
  ]
})
export class SharedModule { }
