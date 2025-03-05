import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AddStatDialogData } from '../../models/add-stat-dialog.model';
import * as fromDailyStats from '../../store';
import { FakeAuthService } from '../../../auth/services/fake-auth.service';

@Component({
  selector: 'app-add-stat-dialog',
  templateUrl: './add-stat-dialog.component.html',
  styleUrl: './add-stat-dialog.component.scss'
})
export class AddStatDialogComponent implements OnInit {
  readonly data = inject<AddStatDialogData>(MAT_DIALOG_DATA);
  addStatForm: FormGroup;
  isAuth: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private dialogRef: MatDialogRef<AddStatDialogComponent>,
    private cdr: ChangeDetectorRef,
    private fakeAuthService: FakeAuthService,
  ) {
    this.addStatForm = this.fb.group({
      date: new FormControl(null),
      totalRowHours: 
        new FormControl(null, [Validators.min(0), Validators.max(16), Validators.maxLength(3)]),
      totalCleanHours: 
        new FormControl(null, [Validators.min(0), Validators.max(16), Validators.maxLength(3)]),
      stack: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.addStatForm.patchValue({
      date: this.data.date,
      totalRowHours: this.data.totalRowHours,
      totalCleanHours: this.data.totalCleanHours,
      stack: this.data.stack ? this.data.stack.join(', ') : '',
    });

    this.fakeAuthService.isLoggedIn()
      .then((isLoggedIn) => {
        this.isAuth = isLoggedIn;
        this.cdr.markForCheck();
      });
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  onSave(): void {
    if (this.data.id) {
      this.store.dispatch(fromDailyStats.editDailyStats({
        id: this.data.id,
        date: this.data.date,
        hours: this.addStatForm.get('totalRowHours')?.value,
        codingHours: this.addStatForm.get('totalCleanHours')?.value,
        stack: this.addStatForm.get('stack')?.value
          ? this.addStatForm.get('stack')?.value?.split(',').map((item: string) => item.trim())
          : [],
      }));
    } else {
      this.store.dispatch(fromDailyStats.addNewDailyStats({
        date: this.data.date,
        hours: this.addStatForm.get('totalRowHours')?.value,
        codingHours: this.addStatForm.get('totalCleanHours')?.value,
        stack: this.addStatForm.get('stack')?.value
          ? this.addStatForm.get('stack')?.value?.split(',').map((item: string) => item.trim())
          : [],
      }));
    }
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
