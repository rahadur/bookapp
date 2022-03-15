import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../book/models/book';

@Component({
  selector: 'app-book-card',
  template: `
    <ion-card >
      <ion-img [src]="book.thumbnail"></ion-img>
      <ion-card-content>
        <div class="card-title">
        <h4 class="title">{{ book.title | truncate:[18, '...'] }}</h4>
        <p  *ngIf="book.author" class="author">{{ book.author.name | truncate:[22, '...']}}</p>
      </div>
      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input() book: Book;

  constructor() { }

  ngOnInit() {}

}
