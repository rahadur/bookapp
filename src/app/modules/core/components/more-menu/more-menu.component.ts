import { Component, OnInit } from '@angular/core';
import {environment} from '@env/environment';
import {Router} from '@angular/router';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss'],
})
export class MoreMenuComponent implements OnInit {

  appInfo: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.appInfo = JSON.parse(localStorage.getItem('APP_INFO'));
  }

  appRating(): void {
    window.open(this.appInfo.playsotre_rating_url, '_blank');
  }

  async shareApp(): Promise<void> {
    await Share.share({
      title: this.appInfo.title,
      text: this.appInfo.description,
      url: this.appInfo.playstore_url,
      dialogTitle: 'Share with friends',
    });
  }

  moreApps(): void {
    window.open(this.appInfo.playstore_url, '_blank');
  }

  privacyPolicy(): void {
    window.open(environment.privacyUrl, '_blank');
  }

  reportApps(): void {
    window.open(environment.reportUrl, '_blank');
  }

}
