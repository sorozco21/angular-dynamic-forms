import { Component } from '@angular/core';
import { PasswordField, TextField } from '../../model/form-control.config';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-login',
  imports: [DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginModel = [
    new TextField( 'username', 'Username','', 'Username',{
      required: { value: true, message: 'Username is required' },
      minLength: { value: 3, message: 'Username must be at least 3 characters' },
    }),
    new PasswordField('password', 'Password', '',{
      required: { value: true, message: 'Password is required' },
      minLength: { value: 3, message: 'Password must be at least 3 characters' },
    }, 'Password'),
  ];

  // Custom submit handler defined in the parent component
  onFormSubmit(formData: any) {
    console.log('Form submitted with data:', formData);
    // Process the data (e.g., send to an API)
  }
  

}
