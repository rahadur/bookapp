import {NgModule} from '@angular/core';

import {BookRoutingModule} from './book-routing.module';
import {ReaderPage} from './pages/reader/reader.page';
import {ReaderSettingComponent} from './components/reader-setting/reader-setting.component';
import {ReaderSettingService} from '@app/modules/book/services/reader-setting.service';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '@app/modules/shared/shared.module';
import {DetailsPage} from '@app/modules/book/pages/details/details.page';
import {TextbookPage} from '@app/modules/book/pages/textbook/textbook.page';
import {ChaptersPage} from '@app/modules/book/pages/chapters/chapters.page';
import {AccordionComponent} from './components/accordion/accordion.component';
import {AudioPage} from '@app/modules/book/pages/audio/audio.page';


@NgModule({
  declarations: [
    ReaderPage,
    DetailsPage,
    TextbookPage,
    ChaptersPage,
    AudioPage,
    ReaderSettingComponent,
    AccordionComponent
  ],
  entryComponents: [
    ReaderSettingComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule
  ],
  providers: [
    ReaderSettingService
  ]
})
export class BookModule {
}
