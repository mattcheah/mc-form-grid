import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'mc-form-custom',
  templateUrl: './form-custom.component.html',
  styleUrls: ['./form-custom.component.scss'],
})
export class FormCustomComponent implements OnInit, AfterViewInit {
  /**
   * The string that will be displayed along side the input, to note what goes inside the input.
   */
  @Input() label: string;
  /**
   * display col-a and col-b as one column without the label.
   */
  @Input() noLabel: boolean;
  /**
   * The number of columns that the input will take up. Defaults to auto.
   * Setting this to a value will also make the input start on a new line in the first column of the grid.
   */
  @Input() columnSpan: string;
  /**
   * Sets the width of the label (in the current column). Setting it to be smaller than the space the text currently takes up will wrap the label text.
   * Can be set in units of px, em, rem, vw, and vh. (eg. labelWidth="100px", labelWidth="2rem", labelWidth="20vh")
   */
  @Input() labelWidth: string;
  /**
   * A string that will appear when the contained input has an ngModel, has been touched (has class 'ng-touched'), and is INVALID (has class 'ng-invalid')
   * This is used to instruct the user what they need to fix when they are filling out their form.
   */
  @Input() missingInputText: string | string[];

  @Input() startingCol: string | number = 'auto';

  calculatedColumnSpan: number | 'auto';

  childContentLoaded = false;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.noLabel = this.noLabel ?? !this.label;

    // if theres a label and a startingCol, but no column span, then we set both of them and we should set grid-end: -1.
    // if there's a label and no startingCol, then grid-start should be 1 and grid-end should be -1.
    // if there's no label and no startingCol, then _______________
    // If there's a columnSpan, we want to set it it to columnSpan * 2 minus 1.
    if (!this.columnSpan && this.noLabel) {
      this.calculatedColumnSpan = 2;
    } else if (!this.columnSpan) {
      this.calculatedColumnSpan = 'auto';
    } else {
      this.calculatedColumnSpan = this.noLabel
        ? +this.columnSpan * 2
        : +this.columnSpan * 2 - 1;
    }

    if (this.labelWidth) {
      this.element.nativeElement.style.setProperty(
        '--individualLabelWidth',
        this.labelWidth
      );
    }

    this.element.nativeElement.style.setProperty(
      '--columnSpan',
      this.calculatedColumnSpan
    );

    if (this.startingCol !== 'auto') {
      this.startingCol = +this.startingCol * 2;
      if (this.noLabel) {
        this.startingCol--;
      }
    }

    this.element.nativeElement.style.setProperty(
      '--startingCol',
      this.startingCol
    );
  }

  ngAfterViewInit() {
    this.childContentLoaded = true;
  }

  getType(item: any): string {
    return typeof item;
  }
}
