import { ValidatorFn, FormControl, Validators } from "@angular/forms";

// Base Class
export abstract class BaseField<T = any> {
    // type: FieldType;        // Field type
    // name: string;
    // label: string;          // Field label
    // value: T;               // Field value
    // rules?: FieldRules;     // Validation rules (optional)

    constructor(
        public type: FieldType,
        public name: string,
        public label: string,
        public value: T,
        public rules?: FieldRules
      ) {}

    // Validate the field based on rules
    validate(): string[] {
        const errors: string[] = [];
        if (!this.rules) return errors;

        for (const [key, rule] of Object.entries(this.rules)) {
            const validationRule = rule as ValidationRule<any>;
            if (validationRule && !validationRule.value) {
                errors.push(validationRule.message);
            }
        }

        return errors;
    }

    // Convert to Angular FormControl for reactive forms
    toFormControl(): FormControl {
        return new FormControl(this.value, this.getValidators());
    }

    // Convert rules to Angular ValidatorFns
    private getValidators(): ValidatorFn[] {
        const validators: ValidatorFn[] = [];

        // Map between rule keys and Angular Validators
        const ruleToValidatorMap: Record<string, (value: any) => ValidatorFn> = {
            required: () => Validators.required,
            min: (value: number) => Validators.min(value),
            max: (value: number) => Validators.max(value),
            minLength: (value: number) => Validators.minLength(value),
            maxLength: (value: number) => Validators.maxLength(value),
            pattern: (value: string) => Validators.pattern(value),
        };

        // Iterate over each rule and add corresponding validators
        if (this.rules) {
            for (const [key, rule] of Object.entries(this.rules)) {
                const validatorFn = ruleToValidatorMap[key];
                if (validatorFn && rule?.value !== undefined) {
                    validators.push(validatorFn(rule.value));
                }
            }
        }
        return validators;
    }

}


// Field Types
export class TextField extends BaseField<string> {
    placeholder?: string;

    constructor(name:string, label: string, value: string, placeholder?: string, rules?: TextFieldRules) {
        super('text', name, label, value, rules);
        this.placeholder = placeholder;
    }
}

export class PasswordField extends BaseField<string> {
    placeholder?: string;
    constructor(
        name: string,
        label: string,
        value: string,
        rules?: TextFieldRules,
        placeholder?: string
    ) {
        super('password', name, label, value, rules);
        this.placeholder = placeholder;
    }
}

export class NumberField extends BaseField<number> {
    placeholder?: string;
    constructor(name:string, label: string, value: number, placeholder?: string, rules?: NumberFieldRules) {
        super('number', name, label, value, rules);
        this.placeholder = placeholder;
    }
}

export class DateField extends BaseField<string> {
    constructor(name:string, label: string, value: string, rules?: DateFieldRules) {
        super('date',name, label, value, rules);
    }
}

export class SelectField extends BaseField<string> {
    options: Option[];

    constructor(
        name:string,
        label: string,
        value: string,
        options: Option[],
        rules?: SelectFieldRules
    ) {
        super('select',name, label, value, rules);
        this.options = options;
    }
}

export class CheckboxField extends BaseField<boolean> {
    constructor(name: string, label: string, value: boolean, rules?: CheckboxFieldRules) {
        super('checkbox', name, label, value, rules);
    }
}

export class RadioField extends BaseField<string> {
    options: Option[];

    constructor(
        name: string,
        label: string,
        value: string,
        options: Option[],
        rules?: RadioFieldRules
    ) {
        super('radio',name, label, value, rules);
        this.options = options;
    }
}

export class TextAreaField extends BaseField<string> {
    rows?: number;
    cols?: number;

    constructor(name: string, label: string, value: string, rules?: TextFieldRules, rows?: number, cols?: number) {
        super('textarea',name, label, value, rules);
        this.rows = rows;
        this.cols = cols;
    }
}

//validation
export interface ValidationRule<T> {
    value: T;
    message: string;
}

export interface BaseFieldRules {
    required?: ValidationRule<boolean>; // Ensures the field is filled out or selected
}

export interface TextFieldRules extends BaseFieldRules {
    minLength?: ValidationRule<number>;  // Text fields can have minLength and maxLength
    maxLength?: ValidationRule<number>;
    pattern?: ValidationRule<string>;    // Regex pattern for validation
}

export interface NumberFieldRules extends BaseFieldRules {
    min?: ValidationRule<number>;        // Minimum value
    max?: ValidationRule<number>;        // Maximum value
}

export interface DateFieldRules extends BaseFieldRules {
    minDate?: ValidationRule<string>;    // Minimum valid date
    maxDate?: ValidationRule<string>;    // Maximum valid date
}

export interface SelectFieldRules extends BaseFieldRules {
    validSelection?: ValidationRule<boolean>; // Ensures a valid option is selected
}

export interface CheckboxFieldRules extends BaseFieldRules {
    checked?: ValidationRule<boolean>;   // Ensures the checkbox is checked
}

export interface RadioFieldRules extends BaseFieldRules {
    validSelection?: ValidationRule<boolean>; // Ensures a valid radio option is selected
}

export interface Option {
    label: string;
    value: string;
}


// Supporting Types
export type FieldType =
    | 'text'
    | 'number'
    | 'email'
    | 'date'
    | 'radio'
    | 'checkbox'
    | 'select'
    | 'textarea'
    | 'password';


export type FieldRules =
    | TextFieldRules
    | NumberFieldRules
    | DateFieldRules
    | SelectFieldRules
    | CheckboxFieldRules
    | RadioFieldRules;

export type FormFieldTypes = TextField | PasswordField | RadioField | CheckboxField | SelectField | TextAreaField;

export interface FormFieldDefinition {
    [key: string]: TextField | RadioField | CheckboxField | SelectField | TextAreaField;
}


