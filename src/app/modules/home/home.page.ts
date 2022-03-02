import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActionSheetController, AlertController} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';


import {BookService} from '@core/services/book.service';
import {NavigationService} from '@core/services/navigation.service';
import {AdService} from '@core/services/ad.service';

import {StorageService} from '@core/services/storage.service';
import {Book} from '@app/modules/book/models/book';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading = true;
  books: Book[];
  selectedBook: Book;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    private bookService: BookService,
    private navigation: NavigationService,
    private storage: StorageService,
    private ad: AdService) {
  }

  async ngOnInit() {
    this.bookService.fetchBooks().subscribe((books) => {
      this.loading = false;
      this.books = books;
    });

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

}
