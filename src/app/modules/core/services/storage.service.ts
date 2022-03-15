import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';


export enum StorageKey {
  AppInfo = 'APP_INFO',
  UnlockedBooks = 'UNLOCKED_BOOKS',
  InterstitialAdTimer = 'INTERSTITIAL_AD_TIMER',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  set(key: StorageKey, value: any): void {
    // eslint-disable-next-line no-underscore-dangle
    this._storage?.set(key, value);
  }

  get(key: string): any {
    // eslint-disable-next-line no-underscore-dangle
    return this._storage?.get(key);
  }

  async addUnlockedBook(id: string, date: Date): Promise<void> {
    let books = await this._storage.get(StorageKey.UnlockedBooks);
    if(books) {
      books = books.filter((book) => book.id !== id);
      books.push({ id, date });
      await this._storage.set(StorageKey.UnlockedBooks, books);
    } else  {
      await this._storage.set(StorageKey.UnlockedBooks, [{ id, date}]);
    }
  }

  async getUnlockedBook(id: string): Promise<Date> {
    const books = await this._storage.get(StorageKey.UnlockedBooks);
    if(books) {
      const book = books.find((item) => item.id === String(id));
      if(book) {
        return book.date;
      }
      return null;
    }

    return null;

  }

  async addInterstitialTime(): Promise<void> {
      await this._storage.set(StorageKey.InterstitialAdTimer, new Date());
  }

  async getInterstitialTime(): Promise<number> {
    const date = await this._storage.get(StorageKey.InterstitialAdTimer);
    if(date) {
      return new Date(date).getTime();
    }
    return 0;
  }

}
