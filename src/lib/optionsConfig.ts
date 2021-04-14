import { InjectionToken } from "@angular/core";

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

export const defaultOptions: Options = {
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
