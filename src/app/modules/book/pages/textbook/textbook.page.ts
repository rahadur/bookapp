import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class TextbookPage implements OnInit, OnDestroy {

  loading = false;
  skeletons  =  Array(10).fill(1);

  book: Book = null;
  chapters: Chapter[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookApi: BookService,
    private navigation: NavigationService,
    private ad: AdService
  ) { }

  async ngOnInit() {
    const { bookId } = this.route.snapshot.params;
    this.book = this.navigation.book;
    this.fetchData(bookId);
    await this.ad.showBanner();
    await this.ad.loadInterstitial();
  }

  async ngOnDestroy(): Promise<void> {
    await this.ad.hideBanner();
  }


  readChapter(chapter: Chapter) {
    this.navigation.content = { title: chapter.title, content: chapter.content };
    this.router.navigate([`book/reader/${chapter.id}`]);
  }

  readSection(section: Content, chapter: Chapter): void {
    this.navigation.content = section;
    this.router.navigate([`/book/reader/${chapter.id}`]);
  }

  private fetchData(bookId): void {
    this.loading = true;
    if(!this.navigation.book) {
      this.bookApi.fetchBook(bookId).subscribe((book: Book) => {
        this.book = book;
        this.navigation.book = book;
      });
    } else {
      this.book = this.navigation.book;
    }

    this.bookApi.fetchChapters(bookId).subscribe((chapters) => {
      this.loading = false;
      this.chapters = chapters;
    });
  }


}
