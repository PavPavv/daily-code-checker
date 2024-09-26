import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {
  @Input() isFull: boolean = false;
}
