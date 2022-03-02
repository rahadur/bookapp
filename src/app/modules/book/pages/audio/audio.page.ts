import { Component, OnDestroy, OnInit } from '@angular/core';
import {Book} from '@app/modules/book/models/book';
import {Audio} from '@app/modules/book/models/audio';
import {NavigationService} from '@core/services/navigation.service';
import {MediaObject, Media} from '@ionic-native/media/ngx';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit, OnDestroy {
  book: Book;
  audio: Audio;

  isPlaying = false;
  duration = 0;
  currentPosition = 0;
  hhmmss = '00:00';
  mediaTimer: any;

  mediaObj: MediaObject;

  constructor(private navigation: NavigationService, private media: Media) {}

  get audioDuration() {
    return this.audio.duration;
  }

  ngOnInit() {
    this.book = this.navigation.book;
    this.audio = this.navigation.audio;

    this.mediaObj = this.media.create(this.audio.external_url);
    this.mediaObj.setVolume(0.7);
    this.duration = this.audio.duration * 60;

    // Update media position every second

    this.mediaObj.onSuccess.subscribe(() => {
      clearInterval(this.mediaTimer);
    });
    this.mediaObj.onError.subscribe((error) => console.log('Error!', error));
  }

  ngOnDestroy(): void {
    this.mediaObj.stop();
    this.mediaObj.release();
    clearInterval(this.mediaTimer);
  }

  play(): void {
    if (!this.isPlaying) {
      this.mediaObj.play();
      this.isPlaying = true;
      this.mediaTimer = setInterval(async () => {
        const position = await this.mediaObj.getCurrentPosition();
        this.currentPosition = Math.floor(position);
        if(this.currentPosition >= this.duration) {
          this.isPlaying = false;
          this.mediaObj.stop();
          this.currentPosition = 0;
          this.hhmmss = '00:00';
          clearInterval(this.mediaTimer);
        } else {
          this.hhmmss = this.toHHMMSS(position);
        }
      }, 1000);

    } else {
      this.mediaObj.pause();
      this.isPlaying = false;
      clearInterval(this.mediaTimer);
    }
  }

  fastForward(): void {
    this.mediaObj.pause();
    const millisecond = (this.currentPosition * 1000) + 10000;
    this.mediaObj.seekTo(millisecond);
    this.mediaObj.play();
  }

  fastBackward(): void {
    this.mediaObj.pause();
    const millisecond = (this.currentPosition * 1000) - 10000;
    this.mediaObj.seekTo(millisecond);
    this.mediaObj.play();
  }

  changeVolume(ev: any) {
    const volume = ev.detail.value;
    this.mediaObj.setVolume(volume);
  }

  toHHMMSS(secs) {
   const secNum = parseInt(secs, 10);
   const hours = Math.floor(secNum / 3600);
   const minutes = Math.floor(secNum / 60) % 60;
   const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };
}
