import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReaderPage} from './pages/reader/reader.page';
import {DetailsPage} from './pages/details/details.page';
import {TextbookPage} from '@app/modules/book/pages/textbook/textbook.page';
import {ChaptersPage} from '@app/modules/book/pages/chapters/chapters.page';
import {AudioPage} from '@app/modules/book/pages/audio/audio.page';

const routes: Routes = [
  {
    path: 'details/:bookId',
    component: DetailsPage
  },
  {
    path: 'reader/:chapterOrSectionId',
    component: ReaderPage
  },
  {
    path: 'audio/:chapterOrSectionId',
    component: AudioPage
  },
  {
    path: ':bookId/textbook',
    component: TextbookPage
  },
  {
    path: ':bookId/chapters',
    component: ChaptersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
