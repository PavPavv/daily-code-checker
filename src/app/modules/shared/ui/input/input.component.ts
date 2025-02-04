import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() ctrl!: FormControl;
  @Input() title: string | undefined;
  @Input() placeholder: string | undefined = '';
  @Input() isDisabled: boolean = false;
}
