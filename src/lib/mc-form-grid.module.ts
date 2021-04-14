import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCustomComponent } from './form-custom/form-custom.component';
import { FormDividerComponent } from './form-divider/form-divider.component';
import { FormGridComponent } from './form-grid.component';
import { FormInputComponent } from './form-input/form-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InjectionToken } from '@angular/core'

export const OPTIONS = new InjectionToken<string>('OPTIONS');
export interface Options {
  formGrid: {
    columns: string;
    labelWidth: string;
    labelPadding: string;
    boldLabel: boolean;
    appendColon:boolean;
    textAlignLeft: boolean;
    maxLabelWidth: string;
    errorHighlightOnTouched: boolean;
    errorHighlight:boolean;
  }
}

const defaultOptions: Options = {
  formGrid: {
    columns: '1',
    labelWidth: 'auto',
    labelPadding: '0px',
    boldLabel: false,
    appendColon: false,
    textAlignLeft: false,
    maxLabelWidth: 'auto',
    errorHighlightOnTouched: true,
    errorHighlight: false
  }
}

@NgModule({
  declarations: [FormGridComponent, FormInputComponent, FormCustomComponent, FormDividerComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [FormGridComponent, FormInputComponent, FormCustomComponent, FormDividerComponent],
  providers: [
    {provide: OPTIONS, useValue: defaultOptions}
  ]
})
export class McFormGridModule { }
