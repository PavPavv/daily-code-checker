import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { SharedComponentsModule } from '../shared/ui/shared-components.module';



@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  exports: [AuthFormComponent]
})
export class AuthModule { }
