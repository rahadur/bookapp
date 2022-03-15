import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CORE_SERVICES} from '@core/services';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage-angular';
import {SwiperModule} from 'swiper/angular';
import {CORE_COMPONENTS} from './components';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [...CORE_COMPONENTS],
  imports: [
    IonicModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SwiperModule
  ],
  exports: [
    ...CORE_COMPONENTS
  ],
  providers: [
    ...CORE_SERVICES
  ]
})
export class CoreModule { }
