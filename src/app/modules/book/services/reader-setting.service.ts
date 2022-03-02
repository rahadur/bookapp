import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ReaderSetting} from '../models/reader-setting';

@Injectable()
export class ReaderSettingService {

  readerSettings$: BehaviorSubject<ReaderSetting>;

  constructor() {
    const catchSettings = localStorage.getItem('READER_SETTINGS');
    if (catchSettings) {
      this.readerSettings$ = new BehaviorSubject<ReaderSetting>(JSON.parse(catchSettings));
    } else {
      this.readerSettings$ = new BehaviorSubject<ReaderSetting>({
        font: 'contemporary',
        fontSize: 20,
        alignment: 'justify',
        lineSpace: 'medium',
        scrollDirection: 'topDown',
        theme: 'white',
        autoBright: false,
        brightness: 50
      });
    }

    this.settings.subscribe((change) => {
      localStorage.setItem('READER_SETTINGS', JSON.stringify(change));
    });
  }

  get settings(): BehaviorSubject<ReaderSetting> {
    return this.readerSettings$;
  }
}
