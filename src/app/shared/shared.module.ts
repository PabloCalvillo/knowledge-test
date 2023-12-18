import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { SelectComponent } from './components/select/select.component';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent,
    SelectComponent
  ]
})
export class SharedModule { }
