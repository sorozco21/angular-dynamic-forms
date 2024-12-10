import { Component, Input } from '@angular/core';
import { RadioField } from '../../../model/form-control.config';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-radio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-radio.component.html',
  styleUrl: './dynamic-radio.component.css'
})
export class DynamicRadioComponent {
  @Input() field!: RadioField;
  formGroup: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formGroup = formgroupDirective.control;
  }
}
