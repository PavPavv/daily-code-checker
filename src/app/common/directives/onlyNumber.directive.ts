import { Directive, ElementRef, forwardRef, HostListener, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filterNumbers } from '../utils';

@Directive({
  selector: 'input[onlyNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OnlyNumberDirective),
      multi: true,
    }
  ],
})
export class OnlyNumberDirective implements ControlValueAccessor {
  private onChange!: (val: string) => void;
  private onTouched!: () => void;
  private value: string = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    console.log('AAAAAAAAAAA!');
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (allowedKeys.includes(event.key)) {
      return; // Allow navigation and deletion keys
    }
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault(); // Block non-numeric keys
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent the default paste behavior
    const pastedText = event.clipboardData?.getData('text') || '';
    const filteredText = filterNumbers(pastedText); // Filter non-numeric characters
    this._updateTextInput(filteredText, this.value !== filteredText); // Update the input value
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    console.log('Input event triggered');
    const value = (event.target as HTMLInputElement).value;
    const filteredValue: string = filterNumbers(value);
    console.log('VALUE: ', value);
    this._updateTextInput(filteredValue, this.value !== filteredValue);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  writeValue(val: any): void {
    const preparedVal = val ? String(val) : '';
    this._updateTextInput(preparedVal, false);
  }

  private _updateTextInput(val: string, propagateChange: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', val);
    if (propagateChange) {
      this.onChange(val);
    }
    this.value = val;
  }
}
