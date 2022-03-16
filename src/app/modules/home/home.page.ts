import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionSheetController, PopoverController} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';

import {BookService} from '@core/services/book.service';
import {NavigationService} from '@core/services/navigation.service';
import {AdService} from '@core/services/ad.service';

import {StorageKey, StorageService} from '@core/services/storage.service';
import {Book} from '@app/modules/book/models/book';
import {MoreMenuComponent} from '@core/components/more-menu/more-menu.component';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  skeletons = new Array(6);

  loading = true;
  primaryBook: Book;
  relatedBooks: Book[];
  books: Book[];
  selectedBook: Book;

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private actionCtrl: ActionSheetController,
    private bookService: BookService,
    private navigation: NavigationService,
    private storage: StorageService,
    private ad: AdService) {
  }

  async ngOnInit() {
    await this.fetchBooks();
    console.log('onLine', navigator.onLine);
  }

  async doRefresh(event): Promise<void> {
    await this.fetchBooks();
    event.target.complete();
  }

  async navigateTo(book: Book): Promise<void> {
    this.navigation.book = book;
    await this.router.navigate([`book/details/${book.id}`]);
  }

  async showMoreMenu(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: MoreMenuComponent,
      cssClass: 'more-menu-popover popover-content',
      event: ev,
      translucent: true,
      showBackdrop: false
    });
    await popover.present();
  }

  private async fetchBooks(): Promise<void> {
    const appInfo = JSON.parse(localStorage.getItem('APP_INFO'));

    const relatedBookIds = appInfo.related_books.map((book) => book.book );
    const ids = appInfo.books.map((book) => book.book );

    const primaryBook = this.bookService.fetchBook(appInfo.book);
    const relatedBooks = this.bookService.fetchBooksIds(relatedBookIds);
    const moreBooks = this.bookService.fetchBooksIds(ids);

    forkJoin([primaryBook, relatedBooks, moreBooks])
      .subscribe(([pBook, rBooks, mBooks])  => {
        this.primaryBook = pBook;
        this.relatedBooks = rBooks;
        this.books = mBooks;
        this.loading = false;
    });
  }

}
