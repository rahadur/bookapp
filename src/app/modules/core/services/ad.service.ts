import { Injectable } from '@angular/core';
import {AdMobPlus, BannerAd, InterstitialAd, RewardedInterstitialAd} from '@admob-plus/capacitor';
import {environment} from '@env/environment.prod';
import {StorageService} from '@app/modules/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  banner: BannerAd = null;
  interstitial: InterstitialAd = null;
  rewardedI: RewardedInterstitialAd = null;

  constructor(
    private storage: StorageService
  ) {
    if(!this.banner) {
      this.banner = new BannerAd({ adUnitId: environment.admob.android.banner});
    }

    if(!this.interstitial) {
      this.interstitial = new InterstitialAd({ adUnitId: environment.admob.android.interstitial });
    }

    if(!this.rewardedI) {
      this.rewardedI = new RewardedInterstitialAd({ adUnitId: environment.admob.android.interstitialVideo });
    }

  }

  async showBanner(): Promise<void> {
    await this.banner.show();
  }

  async hideBanner(): Promise<void> {
    await this.banner.hide();
  }

  onBannerLoad(callback): void {
    AdMobPlus.addListener('banner.load', async () => await callback());
  }

  onBannerFail(callback): void {
    AdMobPlus.addListener('banner.loadfail', async () => await callback());
  }

  onBannerComplete(callback): void {
    AdMobPlus.addListener('banner.impression', async () => await callback());
  }


  // Interstitial Ad

  async loadInterstitial(): Promise<void> {
    const previous = await this.storage.getInterstitialTime();
    const now = new Date().getTime();
    const time = Math.floor(((now - previous) / 1000) / 60);
    if(time >= 2) {
      await this.interstitial.load();
    }
  }

  async showInterstitial(): Promise<void> {
    await this.interstitial.show();
    await this.storage.addInterstitialTime();
  }

  onInterstitialLoad(callback): void {
    AdMobPlus.addListener('interstitial.load', async () => await callback());
  }

  onInterstitialFail(callback): void {
    AdMobPlus.addListener('interstitial.loadfail', async () => await callback());
  }

  onInterstitialShow(callback): void {
    AdMobPlus.addListener('interstitial.show', async () => await callback());
  }

  onInterstitialShowFail(callback): void {
    AdMobPlus.addListener('interstitial.showfail', async () => await callback());
  }

  onInterstitialCancel(callback): void {
    AdMobPlus.addListener('interstitial.dismiss', async () => await callback());
  }

  onInterstitialInit(callback): void {
    AdMobPlus.addListener('interstitial.impression', async () => await callback());
  }

  // Rewarded Interstitial Ad

  async loadRewarded(): Promise<void> {
    await this.rewardedI.load();
  }

  async showRewarded(): Promise<void> {
    await this.rewardedI.show();
  }

  onRewardedLoad(callback): void {
    AdMobPlus.addListener('rewardedi.load', async () => await callback());
  }

  onRewardedLoadFail(callback): void {
    AdMobPlus.addListener('rewardedi.loadfail', async () => await callback());
  }

  onRewardedShow(callback): void {
    AdMobPlus.addListener('rewardedi.show', async () => await callback());
  }

  onRewardedShowFail(callback): void {
    AdMobPlus.addListener('rewardedi.showfail', async () => await callback());
  }

  onRewardedClose(callback): void {
    AdMobPlus.addListener('rewardedi.dismiss', async () => await callback());
  }

  onRewarded(callback): void {
    AdMobPlus.addListener('rewardedi.reward', async (value) => await callback(value));
  }

  onRewardedComplete(callback): void {
    AdMobPlus.addListener('rewardedi.impression', async () => await callback());
  }

}
