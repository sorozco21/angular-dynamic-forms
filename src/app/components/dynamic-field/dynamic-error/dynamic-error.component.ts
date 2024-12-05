import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FieldType, FormFieldTypes } from '../../../model/form-control.config';

@Component({
  selector: 'app-dynamic-error',
  imports: [CommonModule],
  templateUrl: './dynamic-error.component.html',
  styleUrl: './dynamic-error.component.css'
})
export class DynamicErrorComponent implements OnInit {
  formGroup!: FormGroup;
  @Input() field!: any;

  constructor(private formgroupDirective: FormGroupDirective) {
    // this.formGroup = this.formgroupDirective.control;
  }

  ngOnInit() {
    this.formGroup = this.formgroupDirective.control;
  }
  get errorKeys(): string[] {
    const control = this.control;
    return control && control.errors ? Object.keys(control.errors) : [];
  }

  get control(){
    return this.formGroup.get(this.field?.name);
  }
}
