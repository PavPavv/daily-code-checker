import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-info-badge',
  templateUrl: './basic-info-badge.component.html',
  styleUrl: './basic-info-badge.component.scss'
})
export class BasicInfoBadgeComponent {
  @Input({ required: true }) name: string = '';
  @Input() title: string = '';
  @Input() size: 'sm' | 'lg' = 'sm';
  @Input() isShadowed: boolean = false;
  
  private _img_name = './assets/img/';

  getBadgePath(): string {
    return this._img_name + this.name + '.png';
  }
}
