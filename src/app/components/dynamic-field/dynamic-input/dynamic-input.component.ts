import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { BaseField, TextField } from '../../../model/form-control.config';


@Component({
  selector: 'app-dynamic-input',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.css'
})
export class DynamicInputComponent {
  @Input()
  field!: TextField;
  formGroup! : FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formGroup = formgroupDirective.control;
  }
}
