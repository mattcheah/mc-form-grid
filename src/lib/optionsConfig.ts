import { InjectionToken } from "@angular/core";
import { FormControl } from "@angular/forms";

export const FORM_GRID_OPTIONS = new InjectionToken<string>('FORM_GRID_OPTIONS');
export const FORM_INPUT_OPTIONS = new InjectionToken<string>('FORM_INPUT_OPTIONS');
export const FORM_CUSTOM_OPTIONS = new InjectionToken<string>('FORM_CUSTOM_OPTIONS');
export const COLOR_OPTIONS = new InjectionToken<string>('COLOR_OPTIONS');

export interface FormGridOptions {
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
export const defaultFormGridOptions: FormGridOptions = {
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

export interface FormInputOptions {
  label: string;
  columnSpan: string;
  rowSpan: string;
  labelWidth: string;
  missingInputText: string | string[];
  multiInput: boolean;
  startingCol: string;
  questionText: string;
  questionTitle: string;
  questionPlacement: 'top' | 'left' | 'right' | 'bottom';
  containerBody: boolean;
  errorMsg: string;
  invalidInput: boolean;
  control: FormControl;
  validationMessages: { [x: string]: string };
  alignVertical:boolean;
}
export const defaultFormInputOptions: FormInputOptions = {
  label: undefined,
  columnSpan: "1",
  rowSpan: "1",
  labelWidth: undefined,
  missingInputText: undefined,
  multiInput: false,
  startingCol: undefined,
  questionText: undefined,
  questionTitle: undefined,
  questionPlacement: undefined,
  containerBody: true,
  errorMsg: undefined,
  invalidInput: false,
  control: undefined,
  validationMessages: undefined,
  alignVertical: false
}

export interface FormCustomOptions {
  label: string;
  noLabel: boolean;
  columnSpan: string;
  labelWidth: string;
  missingInputText: string | string[];
  startingCol: string | number;
}

export const defaultFormCustomOptions: FormCustomOptions = {
  label: undefined,
  noLabel: undefined,
  columnSpan: undefined,
  labelWidth: undefined,
  missingInputText: undefined,
  startingCol: 'auto'
}

export interface ColorOptions {
  primaryColor:string;
  errorColor:string;
}
