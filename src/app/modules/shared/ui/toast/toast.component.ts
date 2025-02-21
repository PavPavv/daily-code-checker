import { Component, OnInit, OnDestroy, Inject, InjectionToken } from '@angular/core';
import { AnimationEvent, animate, state, style, transition, trigger } from '@angular/animations';

import { ToastAnimationState, ToastConfig, ToastData } from '../../models';
import { ToastRef } from '../../models/toast-ref.model';

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
export const defaultToastConfig: ToastConfig = {
  position: {
    top: 20,
    right: 20,
  },
  animation: {
    fadeIn: 300,
    fadeOut: 2500,
  }
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('fadeAnimation', [
      state('default', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate('{{ fadeIn }}ms')]),
      transition('default => closing', animate('{{ fadeOut }}ms', style({ opacity: 0 })))
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  private _intervalId: NodeJS.Timeout | undefined;
  animationState: ToastAnimationState = 'default';

  constructor(
    readonly toastData: ToastData,
    readonly toastRef: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {}

  ngOnInit(): void {
    this._intervalId = setTimeout(() => (this.animationState = 'closing'), 5000);
  }

  onFadeFinished(event: AnimationEvent): void {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const isFinished = this.animationState === 'closing';

    if (isFadeOut && isFinished) {
      this.close();
    }
  }

  close(): void {
    this.toastRef.close();
  }

  ngOnDestroy(): void {
    clearTimeout(this._intervalId);
  }
}
