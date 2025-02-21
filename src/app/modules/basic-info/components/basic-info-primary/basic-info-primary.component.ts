import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IGitUser } from '../../models';
import * as fromBasicInfo from '../../store';

@Component({
  selector: 'app-primary-info',
  templateUrl: './basic-info-primary.component.html',
  styleUrl: './basic-info-primary.component.scss'
})
export class BasicInfoPrimaryComponent implements OnInit {
  user: IGitUser | null = null;
  isLoading: boolean = false;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.initDispatch();
    this.getStoredData();
  }

  initDispatch(): void {
    this.store.dispatch(fromBasicInfo.getUserInfo());
  }

  getStoredData(): void {
    this.store.pipe(select(fromBasicInfo.selectBasicInfo)).subscribe((data) => {
      this.user = data;
    });
    this.store.pipe(select(fromBasicInfo.selectBasicInfoIsLoading)).subscribe((data) => {
      this.isLoading = data;
    });
  }
}
