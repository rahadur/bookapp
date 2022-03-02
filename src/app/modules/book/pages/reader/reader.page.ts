import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {ReaderSettingComponent} from '../../components/reader-setting/reader-setting.component';
import {ReaderSettingService} from '../../services/reader-setting.service';
import {ReaderSetting} from '../../models/reader-setting';
import {NavigationService} from '@core/services/navigation.service';
import {Content} from '@app/modules/book/models/content';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {

  settings: ReaderSetting;

  content: Content;

  constructor(
    private popoverCtrl: PopoverController,
    private readerSetting: ReaderSettingService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.readerSetting.settings.subscribe((settings: ReaderSetting) => {
      this.settings = settings;
    });
    this.content = this.navigation.content;
  }

  async openReaderSetting(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: ReaderSettingComponent,
      cssClass: 'reader-setting-popover popover-content',
      event: ev,
      translucent: true,
      showBackdrop: false
    });
    await popover.present();
  }

}
