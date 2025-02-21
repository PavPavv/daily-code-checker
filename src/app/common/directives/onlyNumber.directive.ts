import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filterNumbers } from '../utils';
import { REG_EX_FLOAT_NUMBERS_ALLOWED } from '../../constants';

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
  ) {}

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const filteredText = filterNumbers(pastedText);
    this._updateTextInput(filteredText, this.value !== filteredText);
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const filteredValue: string = filterNumbers(value);
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
