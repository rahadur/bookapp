import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {ReaderSettingComponent} from '../../components/reader-setting/reader-setting.component';
import {ReaderSettingService} from '../../services/reader-setting.service';
import {ReaderSetting} from '../../models/reader-setting';
import {NavigationService} from '@core/services/navigation.service';
import {Content} from '@app/modules/book/models/content';
import {ActivatedRoute} from '@angular/router';
import {MoreMenuComponent} from '@core/components/more-menu/more-menu.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AdService} from '@core/services/ad.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {

  settings: ReaderSetting;

  content: Content;

  constructor(
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private readerSetting: ReaderSettingService,
    private navigation: NavigationService,
    private sanitizer: DomSanitizer,
    private ad: AdService
  ) { }

  get html(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.content.content);
  }

  async ngOnInit() {
    this.readerSetting.settings.subscribe((settings: ReaderSetting) => {
      this.settings = settings;
    });
    this.content = this.navigation.content;
    await this.ad.loadInterstitial();
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

}
