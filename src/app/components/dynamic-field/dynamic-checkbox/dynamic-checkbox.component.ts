import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { CheckboxField } from '../../../model/form-control.config';

@Component({
  selector: 'app-dynamic-checkbox',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-checkbox.component.html',
  styleUrl: './dynamic-checkbox.component.css'
})
export class DynamicCheckboxComponent {
  @Input() field!: CheckboxField;
  formGroup: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formGroup = formgroupDirective.control;
  }
}
