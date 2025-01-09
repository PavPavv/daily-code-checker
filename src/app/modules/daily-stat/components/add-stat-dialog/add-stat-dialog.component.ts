import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'cypress/types/jquery';

@Component({
  selector: 'app-add-stat-dialog',
  templateUrl: './add-stat-dialog.component.html',
  styleUrl: './add-stat-dialog.component.scss'
})
export class AddStatDialogComponent {
  addStatForm: FormGroup;

  constructor() {
    this.addStatForm = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      totalRowHours: new FormControl(null),
      totalCleanHours: new FormControl(null),
      stack: new FormControl(null),
    });
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }
}
