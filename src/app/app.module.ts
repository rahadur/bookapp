import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '@core/core.module';
import {BookService} from '@core/services/book.service';
import {StorageKey} from '@core/services/storage.service';

const appInitializer = (bookService: BookService) => {
  return () => new Promise((resolve) => {
    // const appInfo = localStorage.getItem(StorageKey.AppInfo);
    // if (appInfo) {
    //   return resolve(appInfo);
    // }
    bookService.fetchAppInfo().subscribe((info: any) => {
      localStorage.setItem(StorageKey.AppInfo, JSON.stringify(info));
      return resolve(info);
    });
  });
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), CoreModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [BookService],
      multi: true
    },
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
