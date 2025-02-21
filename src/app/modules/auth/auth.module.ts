import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LoaderComponent } from '../shared/ui/loader/loader.component';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';

@NgModule({
  declarations: [
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    SharedComponentsModule
  ],
  exports: [AuthFormComponent]
})
export class AuthModule { }
