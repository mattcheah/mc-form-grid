import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'mc-form-divider',
  templateUrl: './form-divider.component.html',
  styleUrls: ['./form-divider.component.scss'],
})
export class FormDividerComponent implements OnInit {
  @Input('label') label = '';
  @Input('width') width = '100%';
  @Input('margin') margin = '10px';

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.element.nativeElement.style.setProperty('--lineWidth', this.width);
    this.element.nativeElement.style.setProperty('--margin', this.margin);
  }
}
