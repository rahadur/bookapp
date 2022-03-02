import {Component, OnInit} from '@angular/core';
import {Alignment, LineSpace, ReaderSetting, ScrollDirection, Theme} from '../../models/reader-setting';
import {ReaderSettingService} from '@app/modules/book/services/reader-setting.service';


@Component({
  selector: 'app-reader-setting',
  templateUrl: './reader-setting.component.html',
  styleUrls: ['./reader-setting.component.scss'],
})
export class ReaderSettingComponent implements OnInit {

  settings: ReaderSetting;

  customPopoverOptions: any = {
    showBackdrop: false
  };

  constructor(
    private readerSetting: ReaderSettingService
  ) {
    this.readerSetting.settings.subscribe((settings) => {
      this.settings = settings;
    });
  }

  ngOnInit() {
  }

  selectFont(ev: any): void {
    this.readerSetting.settings.next({...this.settings, font: ev.detail.value});
  }

  changeAlign(alignment: Alignment): void {
    this.readerSetting.settings.next({...this.settings, alignment});
  }

  changeLineSpace(lineSpace: LineSpace): void {
    this.readerSetting.settings.next({...this.settings, lineSpace});
  }

  selectScrollDirection(scrollDirection: ScrollDirection): void {
    this.readerSetting.settings.next({...this.settings, scrollDirection});
  }

  changeFont(ev: any): void {
    this.readerSetting.settings.next({...this.settings, fontSize: ev.detail.value});
  }

  selectTheme(theme: Theme): void {
    this.readerSetting.settings.next({...this.settings, theme});
  }

  autoBrightness(): void {
    this.readerSetting.settings.next({...this.settings, autoBright: !this.settings.autoBright});
  }

  changeBrightness(ev: any): void {
    this.readerSetting.settings.next({...this.settings, brightness: ev.detail.value});
  }

}
