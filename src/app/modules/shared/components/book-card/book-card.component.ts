import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../book/models/book';

@Component({
  selector: 'app-book-card',
  template: `
    <ion-card [routerLink]="href">
      <ion-img [src]="book.thumbnail"></ion-img>
      <ion-card-content>
        <div class="card-title">
          <h3 class="title">{{ book.title }}</h3>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input() book: Book;

  @Input() href: string;

  constructor() { }

  ngOnInit() {}

}
