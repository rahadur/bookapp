import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CORE_SERVICES} from '@core/services';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage-angular';
import {SwiperModule} from 'swiper/angular';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SwiperModule
  ],
  providers: [
    ...CORE_SERVICES
  ]
})
export class CoreModule { }
