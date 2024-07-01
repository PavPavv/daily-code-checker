import { Component, OnInit } from '@angular/core';
import { PrimaryInfoService } from '../../services/primary-info.service';

import { IGitUser } from '../../models';

@Component({
  selector: 'app-primary-info',
  templateUrl: './basic-info-primary.component.html',
  styleUrl: './basic-info-primary.component.scss'
})
export class BasicInfoPrimaryComponent implements OnInit {
  user: IGitUser | null = null
  constructor(private readonly primaryInfoService: PrimaryInfoService) {}

  ngOnInit(): void {
    this.primaryInfoService.getUserInfo().subscribe((data: IGitUser) => {
      this.user = data;
    });
  }
}
