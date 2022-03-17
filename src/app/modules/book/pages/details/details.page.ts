import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '@core/services/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '@app/modules/book/models/book';
import {BookService} from '@core/services/book.service';
import {AlertController} from '@ionic/angular';
import {StorageService} from '@core/services/storage.service';
import {Capacitor} from '@capacitor/core';
import {AdService} from '@core/services/ad.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  book: Book;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private navigation: NavigationService,
    private bookService: BookService,
    private storage: StorageService,
    private ad: AdService
  ) {
    this.bookInitialize();
  }

  get html(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.book.description);
  }

  async ngOnInit() {
    await this.ad.hideBanner();
  }

  async ngOnDestroy() {
    await this.ad.showBanner();
  }

  async ionViewDidEnter(): Promise<void> {

    this.ad.onInterstitialLoad(async () => {
      await this.ad.showInterstitial();
    });

    this.ad.onRewardedLoad(async () => {
      await this.ad.showRewarded();
      await this.storage.addInterstitialTime();
    });

    this.ad.onRewarded(async () => {
      await this.storage.addUnlockedBook(String(this.book.id), new Date());
    });

    this.ad.onRewardedClose(async () => {
      await this.storage.addInterstitialTime();
      await this.openBook();
    });

  }

  async readBook(): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      const isUnlocked = await this.isBookUnlocked(this.book.id);
      if (this.book.locked && !isUnlocked) {
        await this.showRewardedAlert(this.book.id);
      } else {
        await this.openBook();
      }
    } else {
      await this.openBook();
    }
  }

  async openBook(): Promise<void> {
    if (this.book.audible) {
      await this.router.navigate([`book/details/${this.book.id}`]);
    } else {
      await this.router.navigate([`book/${this.book.id}/textbook`]);
    }
  }

  async isBookUnlocked(bookId: string): Promise<boolean> {
    let date = await this.storage.getUnlockedBook(bookId);
    const today = new Date();
    if (date) {
      date = new Date(date);
      return (date.getMonth() + date.getDate()) - (today.getMonth() + today.getDate()) < 2;
    }
    return false;
  }

  async showRewardedAlert(bookId: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: `Open Book`,
      message: 'To unlock this book you have to watch 5 second video.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Unlock',
          handler: () => {
            this.ad.loadRewarded();
          }
        }
      ]
    });

    await alert.present();
  }

  private bookInitialize(): void {
    if (!this.navigation.book) {
      const bookId = this.route.snapshot.params.bookId;
      this.bookService.fetchBook(bookId).subscribe((book) => {
        this.book = book;
      });
    } else {
      this.book = this.navigation.book;
    }
  }

}
