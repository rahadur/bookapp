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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

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
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.bookService.fetchBooks().subscribe(((books: Book[]) => {
      this.books = books;
      event.target.complete();
    }));
  }

  async navigateTo(book: Book): Promise<void> {
    this.navigation.book = book;
    await this.router.navigate([`book/details/${book.id}`]);
  }

  async showMoreMenu(ev: any): Promise<void> {
    console.log('Show More');
    const popover = await this.popoverCtrl.create({
      component: MoreMenuComponent,
      cssClass: 'more-menu-popover popover-content',
      event: ev,
      translucent: true,
      showBackdrop: false
    });
    await popover.present();
  }

  async presentActionSheet(): Promise<void> {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Rate This App',
        icon: 'star-half-outline',
        handler: () => {
          window.open('https://play.google.com/store/apps/details?id=app.xplatform.grevocabulary', '_blank');
          console.log('Delete clicked');
        }
      }, {
        text: 'Privacy Policy',
        icon: 'lock-open-outline',
        handler: () => {
          this.router.navigate(['privacy-policy']);
        }
      }]
    });

    await actionSheet.present();
  }

  private async fetchBooks(): Promise<void> {
    const appInfo = JSON.parse(localStorage.getItem('APP_INFO'));

    const ids = appInfo.books.map((book) => book.book );
    const relatedBookIds = appInfo.related_books.map((book) => book.book );

    this.bookService.fetchBook(appInfo.book).subscribe((book: Book) => {
      this.primaryBook = book;
    });

    this.bookService.fetchBooksIds(relatedBookIds).subscribe((books) => {
      this.loading = false;
      this.relatedBooks = books;
    });

    this.bookService.fetchBooksIds(ids).subscribe((books) => {
      this.loading = false;
      this.books = books;
    });
  }

}
