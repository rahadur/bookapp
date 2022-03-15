import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '@app/modules/book/models/book';
import {Chapter} from '@app/modules/book/models/chapter';
import {Audio} from '@app/modules/book/models/audio';
import {BookService} from '@core/services/book.service';
import {NavigationService} from '@core/services/navigation.service';
import {AdService} from '@core/services/ad.service';
import {Content} from '@app/modules/book/models/content';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.page.html',
  styleUrls: ['./chapters.page.scss'],
})
export class ChaptersPage implements OnInit {

  loading = true;
  skeletons  =  Array(10).fill(1);

  selectedSegment = 'reading';

  book: Book;
  chapters: Chapter[];
  audios: Audio[];

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

    const book = this.bookApi.fetchBook(bookId);
    const chapters = this.bookApi.fetchChapters(bookId);
    const audios = this.bookApi.fetchAudios(bookId);

    forkJoin([book, chapters, audios]).subscribe((res) => {
      this.loading = false;
      this.book = res[0];
      this.chapters = res[1];
      this.audios = res[2];
    });

    /*this.bookApi.fetchChapters(bookId).subscribe((chapters) => {
      this.loading = false;
      this.chapters = chapters;
    });
    this.bookApi.fetchAudios(bookId).subscribe((audios) => {
      this.loading = false;
      this.audios = audios;
    });*/
  }

  async ionViewDidEnter(): Promise<void> {
    await this.ad.loadInterstitial();
  }

  openChapter(chapter: Chapter): void {
    this.navigation.content = { title: chapter.title, content: chapter.content };
    this.router.navigate([`/book/reading/${chapter.id}`]);
  }

  readSection(section: Content, chapter: Chapter): void {
    this.navigation.content = section;
    this.router.navigate([`/book/reading/${chapter.id}`]);
  }

  listenChapter(audio: Audio): void {
    this.navigation.audio = audio;
    this.router.navigate([`/book/audio/${audio.id}`]);
  }
}
