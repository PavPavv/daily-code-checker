import { Inject, Injectable, Injector } from '@angular/core';
import { ToastConfig, ToastData, ToastRef } from '../../models';
import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { TOAST_CONFIG_TOKEN, ToastComponent } from '../../ui/toast/toast.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _lastToast: ToastRef | undefined;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig
  ) {}

  getPosition(): string {
    const _lastToastIsVisible = this._lastToast && this._lastToast.isVisible();
    const position = _lastToastIsVisible
      ? this._lastToast?.getPosition().bottom
      : this.toastConfig.position
        ? this.toastConfig.position.top
        : 0;

    return position + 'px';
  }

  getPositionStrategy(): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .top(this.getPosition())
      .right(this.toastConfig.position ? this.toastConfig.position.right + 'px' : '0px');
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }

  show(data: ToastData): ToastRef {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });
    const toastRef = new ToastRef(overlayRef);
    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    this._lastToast = toastRef;
    overlayRef.attach(toastPortal);

    return toastRef;
  }
}