import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldTypes } from '../../model/form-control.config';
import { CommonModule } from '@angular/common';
import { DynamicErrorComponent } from "../dynamic-field/dynamic-error/dynamic-error.component";
import { DynamicFieldComponent } from "../dynamic-field/dynamic-field.component";

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, CommonModule, DynamicErrorComponent, DynamicFieldComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {

  @Input() model: FormFieldTypes[] = [];
  @Input() submit!: (formData: any) => void;

  public dynamicFormGroup!: FormGroup;
  public fields: any[] = [];

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    const dynamicFormGroupFields = this.getFormControlsFields();
    this.dynamicFormGroup = new FormGroup(dynamicFormGroupFields);
  }

  private getFormControlsFields() {
    const formControls: { [key: string]: FormControl } = {};

    this.model.forEach((field) => {
      // Dynamically create FormControl for each field
      formControls[field.name] = field.toFormControl();
      this.fields.push( field );
    });
    return formControls;
  }

  onSubmit() {
    if (this.dynamicFormGroup.valid) {
      // Capture form values
      const formData = this.dynamicFormGroup.value;
      // Pass the form data to the parent's custom submit handler
      this.submit(formData);
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.dynamicFormGroup.reset()
  }

}
