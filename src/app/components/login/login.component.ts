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
      minlength: { value: 5, message: 'Username must be at least 5 characters' },
      
    }),
    new PasswordField('password', 'Password', '', 'Password',{
      required: { value: true, message: 'Password is required' },
      pattern: { value: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', message: 'Password should be atleast 8 characters long and should contain one number,one character and one special character' },
    }),
  ];

  // Custom submit handler defined in the parent component
  onFormSubmit(formData: any) {
    console.log('Form submitted with data:', formData);
    // Process the data (e.g., send to an API)
  }
  

}
