import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'nav' = 'primary';
  @Input() text: string = 'Ok';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'normal' |'big' = 'normal'; 
}
