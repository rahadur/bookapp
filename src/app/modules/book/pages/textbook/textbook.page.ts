import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Book} from '@app/modules/book/models/book';
import {Chapter} from '@app/modules/book/models/chapter';
import {BookService} from '@core/services/book.service';
import {NavigationService} from '@core/services/navigation.service';
import {AdService} from '@core/services/ad.service';
import {Content} from '@app/modules/book/models/content';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.page.html',
  styleUrls: ['./textbook.page.scss'],
})
export class TextbookPage implements OnInit {

  book: Book;
  chapters: Chapter[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookApi: BookService,
    private navigation: NavigationService,
    private ad: AdService
  ) { }

  ngOnInit() {
    const { bookId } = this.route.snapshot.params;
    this.book = this.navigation.book;
    this.bookApi.fetchChapters(bookId).subscribe((chapters) => {
      this.chapters = chapters;
    });
  }

  async ionViewDidEnter(): Promise<void> {
    await this.ad.loadInterstitial();
  }

  readChapter(chapter: Chapter) {
    this.navigation.content = { title: chapter.title, content: chapter.content };
    this.router.navigate([`book/reader/${chapter.id}`]);
  }

  readSection(section: Content, chapter: Chapter): void {
    this.navigation.content = section;
    this.router.navigate([`/book/reader/${chapter.id}`]);
  }


}
