import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  AfterContentChecked,
  ContentChildren,
  Inject,
} from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { FormCustomComponent } from './form-custom/form-custom.component';
import { FormInputComponent } from './form-input/form-input.component';
import { Options, OPTIONS } from './mc-form-grid.module';

/**
 * A component that creates a grid within it, with the number of columns specified by the `columns` Input.
 * Label options can be set, including:
 *  - Making all labels bold automatically
 *  - Adding padding to each label
 *  - Choosing the text-alignment of the labels.
 *  - Appending a Colon after each label
 *
 * Also provides an option for displaying error messages from reactive forms -
 * Required fields can show a red highlight and error message either:
 *  - After a field has been touched (and it's invalid) or
 *  - Whenever `errorHighlight` is true (and fields are invalid)
 * Error messages are set in each app-form-input OR are pulled from a FormControl if a FormControls is passed to the [control] directive of the child <app-form-input>.
 *
 * MUST only accept <app-form-input>, <app-form-custom>, or <app-form-divider> elements within itself.
 * @example
 * // Good:
 * <app-form-grid columns="2" boldLabel="true">
 *    <app-form-input columnSpan="1" label="My First Input">
 *        <input type="text" value="abcde">
 *    </app-form-input>
 * </app-form-width>
 *
 * // Bad:
 * <app-form-grid columns="2" appendColon="false">
 *    <div class="d-flex justify-content-between">
 *        <div class="w-50">
 *            <input type="text" value="don't do this!">
 *        </div>
 *        <div class="w-50">
 *            <input type="text" value="don't do this!">
 *        </div>
 *    </div>
 * </app-form-grid>
 */
@Component({
  selector: 'mc-form-grid',
  templateUrl: './form-grid.component.html',
  styleUrls: ['./form-grid.component.scss'],
})
export class FormGridComponent implements OnInit, AfterViewInit {
  /**
   * Choose how many columns this grid has. Defaults to 1.
   * A single column as defined here consists of 1 area for a label and 1 area for an input (if using <app-form-input>)
   * or other elements (if using <app-form-custom>).
   * App-form-grid will create sub-columns from this number to make these label and input areas, so the actual number of columns in the grid will be `columns * 2`
   * For all intents and purposes though, this piece of information can be ignored.
   */
  @Input() columns:string;
  /** Specify a hard width for all labels. Not recommended to use this.  */
  @Input() labelWidth:string;
  @Input() labelPadding:string;
  /** Automatically makes the label bold. */
  @Input() boldLabel:boolean;
  /** Appends a colon to every form-input and form-custom label. Labels with asterisks as their last character will have it moved to the outside of the colon.*/
  @Input() appendColon:boolean;
  /** Defaults to aligning label text to the left, but if true the label is aligned right. */
  @Input() textAlignLeft:boolean;
  /** If label width exceeds this length, wrap the label. */
  @Input() maxLabelWidth:string;
  /**
   * Toggles whether error highlights show on invalid form inputs after they've been touched.
   * False means no error highlights show unless `errorHighlight` is true */
  @Input() errorHighlightOnTouched:boolean;
  /**
   * Toggles error highlights on/off for invalid form inputs.
   * Automatically and always false if `errorHighlightOnTouched` is true. Otherwise, can be toggled on and off by parent component.
   *
   * This is set to true by default even though it will be set to false on NgOnInit(). This is a fallback just in case `errorHighlightOnTouched` is false.
   * In that case, the errors will show up immediately (as opposed to never showing up if `errorHighlight` is not set.)
   *
   * @example <app-form-grid [errorHighlight]="formHasBeenSubmitted"> - only displays errors after a form has been submitted and not before.
   * */
  @Input() errorHighlight:boolean;

  @ContentChildren(FormInputComponent)
  formInputs: QueryList<FormInputComponent>;
  @ContentChildren(FormCustomComponent)
  formCustoms: QueryList<FormCustomComponent>;

  childFormChangesSubscription: Subscription;

  constructor(private element: ElementRef, @Inject(OPTIONS) private options: Options) {
    this.columns ??= this.options.formGrid.columns;
    this.labelPadding ??= this.options.formGrid.labelPadding;
    this.labelWidth ??= this.options.formGrid.labelWidth;
    this.maxLabelWidth ??= this.options.formGrid.maxLabelWidth;
    this.boldLabel ??= this.options.formGrid.boldLabel;
    this.errorHighlight ??= this.options.formGrid.errorHighlight;
    this.errorHighlightOnTouched ??= this.options.formGrid.errorHighlightOnTouched;
    this.appendColon ??= this.options.formGrid.appendColon;
    this.textAlignLeft ??= this.options.formGrid.textAlignLeft;
  }

  ngOnInit(): void {
    this.element.nativeElement.style.setProperty(
      '--labelPadding',
      this.labelPadding
    );
    this.element.nativeElement.style.setProperty(
      '--labelWidth',
      this.labelWidth
    );
    this.element.nativeElement.style.setProperty(
      '--maxLabelWidth',
      this.maxLabelWidth
    );
    this.element.nativeElement.style.setProperty(
      '--gridColumns',
      +this.columns
    );

    if (this.errorHighlightOnTouched) {
      this.errorHighlight = false;
    }
  }

  ngAfterViewInit() {
    const appendColonToComp = (
      comp: FormInputComponent | FormCustomComponent
    ) => {
      if (!comp.label || comp.label.replace(/\s/g, '').length == 0) {
        return;
      }
      let newLabel = comp.label;
      const lastChar = comp.label[comp.label.length - 1];
      const secondLastChar = comp.label[comp.label.length - 2] ?? '';
      // If we have an asterisk at the end, we want it to go after the colon.
      if (lastChar == '*') {
        // If we already have a colon behind the asterisk, do nothing.
        if (secondLastChar !== ':') {
          // Otherwise, our new label be the current label without the asterisk, and add the colon/asterisk afterward.
          newLabel = comp.label.substring(0, comp.label.length - 1) + ':*';
        }
        // If we already have a colon at the end, we don't want to do anything.
      } else if (lastChar != ':') {
        newLabel = comp.label + ':';
      }
      // To prevent ExpressionChangedAfterChecked Error
      setTimeout(() => (comp.label = newLabel));
    };

    if (this.appendColon) {
      [...this.formCustoms, ...this.formInputs].forEach(appendColonToComp);

      this.childFormChangesSubscription = combineLatest([
        this.formCustoms.changes,
        this.formInputs.changes,
      ]).subscribe((changes) => {
        const formItems = [...changes[0], ...changes[1]];

        formItems.forEach(appendColonToComp);
      });
    }
  }

  ngOnDestroy() {
    this.childFormChangesSubscription?.unsubscribe();
  }
}
