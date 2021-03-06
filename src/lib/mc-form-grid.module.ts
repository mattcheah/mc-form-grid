import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCustomComponent } from './form-custom/form-custom.component';
import { FormDividerComponent } from './form-divider/form-divider.component';
import { FormGridComponent } from './form-grid.component';
import { FormInputComponent } from './form-input/form-input.component';

import {
  COLOR_OPTIONS,
  defaultColorOptions,
  defaultFormCustomOptions,
  defaultFormGridOptions,
  defaultFormInputOptions,
  FORM_CUSTOM_OPTIONS,
  FORM_GRID_OPTIONS,
  FORM_INPUT_OPTIONS,
} from './optionsConfig';

@NgModule({
  declarations: [FormGridComponent, FormInputComponent, FormCustomComponent, FormDividerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormGridComponent, FormInputComponent, FormCustomComponent, FormDividerComponent],
  providers: [
    { provide: FORM_GRID_OPTIONS, useValue: defaultFormGridOptions },
    { provide: FORM_INPUT_OPTIONS, useValue: defaultFormInputOptions },
    { provide: FORM_CUSTOM_OPTIONS, useValue: defaultFormCustomOptions },
    { provide: COLOR_OPTIONS, useValue: defaultColorOptions },
  ],
})
export class McFormGridModule {}
