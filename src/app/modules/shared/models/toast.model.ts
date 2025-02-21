import { TemplateRef } from '@angular/core';

export type ToastType = 'warning' | 'info' | 'success';
export type ToastAnimationState = 'default' | 'closing';

export class ToastData {
  type: ToastType = 'info';
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: object;
}

export interface ToastConfig {
  position?: {
    top: number,
    right: number,
  },
  animation?: {
    fadeIn: number,
    fadeOut: number,
  },
}