import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


/** Validator function for file size */
export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files = control.value instanceof FileList ? Array.from(control.value) : [control.value];
    console.log('Validating file:', files);
    for (const file of files) {
      console.log('Validating file size:', file);
      if (file instanceof File && file.size > maxSize) {
        console.log('INVALID FILE SIZE:', file);
        return {
          maxSize: {
            actualSize: file.size,
            allowedSize: maxSize,
            message: '** File size exceeds ' + maxSize,
            invalid:true
          },
        };
      }
    }
    
    return null; // Validation passes
  };
}

@Directive({
  selector: '[appFileSize]', // Usage in templates
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FileSizeValidatorDirective,
      multi: true,
    },
  ],
})
export class FileSizeValidatorDirective implements Validator {
  @Input('appFileSize') maxSize!: number; // Max size in bytes (input)

  validate(control: AbstractControl): ValidationErrors | null {
    return this.maxSize
      ? fileSizeValidator(this.maxSize)(control)
      : null;
  }
}