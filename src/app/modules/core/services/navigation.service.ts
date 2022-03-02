import { Injectable } from '@angular/core';
import { Audio } from '@app/modules/book/models/audio';

import { Book } from '@app/modules/book/models/book';
import { Chapter } from '@app/modules/book/models/chapter';
import {Content} from '@app/modules/book/models/content';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  book: Book;

  chapter: Chapter;

  audio: Audio;

  content: Content;

  constructor() { }

}
