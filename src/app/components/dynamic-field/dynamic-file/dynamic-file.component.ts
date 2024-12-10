import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FileInputField } from '../../../model/form-control.config';
import { FileSizeValidatorDirective } from '../../../directive/file-size-validator.directive';

@Component({
  selector: 'app-dynamic-file',
  imports: [ReactiveFormsModule, FileSizeValidatorDirective],
  templateUrl: './dynamic-file.component.html',
  styleUrl: './dynamic-file.component.css'
})
export class DynamicFileComponent {
  @Input() field!: FileInputField;
  formGroup: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formGroup = formgroupDirective.control;
  }

  onFileChange(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files); // Array of selected files
      console.log('Selected files:', files);
      console.log('File(s) in form before update:', this.formGroup.get(fieldName)?.value);
  
      // Update the FormControl manually with the `File` object(s)
      this.formGroup.get(fieldName)?.setValue(files.length === 1 ? files[0] : files);
      this.formGroup.get(fieldName)?.updateValueAndValidity();
      console.log('File(s) in form after update:', this.formGroup.get(fieldName)?.value.name);
      console.log('errors in file: ',this.formGroup.get(fieldName)?.errors);
    } else {
      // Clear the FormControl value if no file is selected
      this.formGroup.get(fieldName)?.setValue(null);
    }
  }
  
}

