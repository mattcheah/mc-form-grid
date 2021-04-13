import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: '[app-form-input], app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * The string that will be displayed along side the input, to note what goes inside the input.
   */
  @Input() label: string;
  /**
   * The number of columns that the input will take up. Defaults to auto.
   * Setting this to a value will also make the input start on a new line in the first column of the grid.
   */
  @Input() columnSpan: string;
  @Input() rowSpan: string;

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

  /**
   * A boolean directive that determines if the input container will hold multiple inputs on the same line.
   * Setting this to true will turn .col-b into a flex container, which will automatically display inputs on the same lines.
   * NOTE: Using this with missingInputText will only work on first contained input, unless you pass in an array of missingInputTexts, which will be applied in order.
   */
  @Input() multiInput: boolean;

  /**
   * A number string of the starting column. If the grid has 3 columns and you want it to start at 2, you put 2 here.
   */
  @Input() startingCol: string;

  /**
   * A provided string that populates a ? icon with a popover at the end of the input. If a string is provided the icon will be created automatically.
   */
  @Input() questionText: string | TemplateRef<any>;
  @Input() questionTitle: string;
  @Input() questionPlacement: 'top' | 'left' | 'right' | 'bottom' = 'top';
  @Input() containerBody = true;

  /** A message that shows only if the input is invalid */
  @Input() errorMsg: string | string[];
  @Input() invalidInput: boolean | boolean[] = false;

  /** If control and validationMessages are provided, validation messages will be shown for each error on control.  */
  @Input() control: FormControl;
  @Input() validationMessages: { [x: string]: string };

  @Input() alignVertical = false;

  inputElements: Element[];

  calculatedColumnSpan: number;

  childContentLoaded = false;

  /**
   * Only used if we have a control, an input-group, and error messages.
   * Need to subscribe to control status changes so that we can add/remove .ng-invalid
   * from the input-group container when necessary.
   */
  controlStatusSubscription: Subscription;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    if (!this.columnSpan) {
      this.columnSpan = 'auto';
    } else {
      this.calculatedColumnSpan = +this.columnSpan * 2 - 1;
    }

    this.rowSpan = this.rowSpan || 'auto';

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
    this.element.nativeElement.style.setProperty('--rowSpan', this.rowSpan);
    this.element.nativeElement.style.setProperty(
      '--startingCol',
      this.startingCol
    );

    if (this.validationMessages && !this.control) {
      console.warn(
        'Warning: Validation Messages set in app-form-input will not be show unless the formControl is also passed in as `this.control`'
      );
    }
  }

  ngAfterViewInit() {
    if (this.multiInput) {
      this.inputElements = this.element.nativeElement.getElementsByClassName(
        'multi-input'
      )[0].children;
    }
    if (this.questionText) {
      try {
        const inputElement =
          this.element.nativeElement.getElementsByTagName('input')[0] ||
          this.element.nativeElement.getElementsByTagName('select')[0];
        const inputGroup = document.createElement('div');
        const inputGroupAppend = this.element.nativeElement.getElementsByClassName(
          'input-group-append'
        )[0];
        inputElement.parentNode.insertBefore(inputGroup, inputElement);

        inputGroup.classList.add('input-group');
        if (this.control) {
          inputGroup.classList.add(this.control.invalid ? 'ng-invalid' : null);
          this.controlStatusSubscription = this.control.statusChanges.subscribe(
            (status) => {
              // console.log('New Status' + status);
              if (status == 'VALID') {
                inputGroup.classList.remove('ng-invalid');
              } else if (status == 'INVALID') {
                inputGroup.classList.add('ng-invalid');
              }
            }
          );
        }
        inputGroup.appendChild(inputElement);
        inputGroup.appendChild(inputGroupAppend);
      } catch (e) {
        console.error(
          'Error: The questionText Input() directive must be used with a input[text] or select element inside app-form-input!'
        );
      }
    }
    this.childContentLoaded = true;
  }

  ngOnDestroy() {
    this.controlStatusSubscription?.unsubscribe();
  }

  /**
   * Used to determine if missing input text needs to be shown
   * Only if multi-input is true */
  showValidation(stringIndex: number): boolean {
    return (
      this.missingInputText &&
      typeof this.missingInputText === 'object' &&
      this.inputElements &&
      this.inputElements[stringIndex].classList.contains('ng-invalid') &&
      this.inputElements[stringIndex].classList.contains('ng-touched')
    );
  }

  objectKeys(obj: any): any[] {
    return Object.keys(obj);
  }
}
