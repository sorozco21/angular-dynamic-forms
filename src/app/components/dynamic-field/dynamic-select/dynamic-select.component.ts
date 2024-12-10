import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { RadioField } from '../../../model/form-control.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-select.component.html',
  styleUrl: './dynamic-select.component.css'
})
export class DynamicSelectComponent {
  changedValue(value: string) {
    console.log('selected: ', value)
  }
  @Input() field!: RadioField;
  formGroup: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formGroup = formgroupDirective.control;
  }
}
