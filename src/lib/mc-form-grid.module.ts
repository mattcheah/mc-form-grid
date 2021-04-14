import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCustomComponent } from './form-custom/form-custom.component';
import { FormDividerComponent } from './form-divider/form-divider.component';
import { FormGridComponent } from './form-grid.component';
import { FormInputComponent } from './form-input/form-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { defaultOptions, OPTIONS } from './optionsConfig';

@NgModule({
  declarations: [FormGridComponent, FormInputComponent, FormCustomComponent, FormDividerComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [FormGridComponent, FormInputComponent, FormCustomComponent, FormDividerComponent],
  providers: [
    {provide: OPTIONS, useValue: defaultOptions}
  ]
})
export class McFormGridModule { }
