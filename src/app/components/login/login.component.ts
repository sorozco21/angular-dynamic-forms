import { Component } from '@angular/core';
import { CheckboxField, DateField, FileInputField, NumberField, PasswordField, RadioField, SelectField, TextField } from '../../model/form-control.config';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-login',
  imports: [DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginModel = [
    // new TextField('username', 'Username', '', 'Username', {
    //   required: { value: true, message: 'Username is required' },
    //   minlength: { value: 5, message: 'Username must be at least 5 characters' },
    // }),
    // new PasswordField('password', 'Password', '', 'Password', {
    //   required: { value: true, message: 'Password is required' },
    //   maxlength: { value: 16, message: 'Maximum characters of 16' },
    //   pattern: { value: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}", message: 'Password should be atleast 8 characters long and should contain one number,one character and one special character' },
    // }),
    // new DateField('birthDate', 'Birthdate', '',),
    // new NumberField('age', 'Age', undefined, 'Age', {
    //   min: { value: 18, message: 'Minimum age should be 18' },
    //   max: { value: 100, message: 'Maximum age should be 100' }
    // }),
    // new NumberField('salary', 'Salary', undefined, 'Salary', {
    //   min: { value: 100000, message: 'Minimum salary should be 100000' },
    //   max: { value: 1000000, message: 'Maximum salary should be 100000' }
    // }),
    // new TextField('email', 'Email', '', 'Email', {
    //   required: { value: true, message: 'Email is required' },
    //   email: { value: true, message: 'Invalid email' }
    // }),
    // new CheckboxField('newsletter', 'Subscibe to newsletter', true),
    // new RadioField('businessType', 'Business Type', 'personal',
    //   [{
    //     value: 'personal',
    //     label: 'Personal'
    //   }, {
    //     value: 'enterprise',
    //     label: 'Enterprise'
    //   }, {
    //     value: 'corporation',
    //     label: 'Corporation'
    //   },{
    //     value: 'partnership',
    //     label: 'Partnership'
    //   },]),
    // new SelectField('country', 'Country', '', [{
    //   label: 'Philiphines',
    //   value: 'ph'
    // }, {
    //   label: 'USA',
    //   value: 'usa'
    // },],{
    //   required: {value: true, message:'This field is required'}
    // }),
    new FileInputField('profile', 'Profile', null, {
      maxSize: {value: 5 * 1024 * 1024, message: 'File size should be under 5mb.'},
      required: {value: true, message:'This field is required.'}
    }, 'image/*', false)
  ];

  // Custom submit handler defined in the parent component
  onFormSubmit(formData: any) {
    console.log('Form submitted with data:', formData);
    // Process the data (e.g., send to an API)
  }


}
