import {Component, OnInit} from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
  }
}
