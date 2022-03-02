import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chapter} from '@app/modules/book/models/chapter';
import {Content} from '@app/modules/book/models/content';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  @Input()
  chapter: Chapter;

  @Output() onClick = new EventEmitter<Content>();


  isMenuOpen = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}


  toggleAccordion(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  readSection(section: { title: string, content: string }): void {
    this.onClick.next(section);
  }

}
