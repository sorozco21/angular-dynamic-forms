import { AfterViewInit, ChangeDetectorRef, Component, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldTypes, TextField } from '../../model/form-control.config';
import { CommonModule } from '@angular/common';
import { DynamicInputComponent } from "./dynamic-input/dynamic-input.component";

@Component({
  selector: 'app-dynamic-field',
  imports: [],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.css'
})
export class DynamicFieldComponent implements AfterViewInit{
  
  @ViewChild('dynamicInputContainer', { read: ViewContainerRef}) dynamicInputContainer!: ViewContainerRef;
  @Input() field!: FormFieldTypes;
  formGroup!: FormGroup;
  cd = inject(ChangeDetectorRef);

  supportedDynamicComponents = [
    {
      name: 'text',
      component: DynamicInputComponent
    },
    {
      name: 'number',
      component: DynamicInputComponent
    },
    {
      name: 'date',
      component: DynamicInputComponent
    }
  ]

  ngAfterViewInit(): void {
    this.registerDynamicField();
  }

  private registerDynamicField() {
    
    this.dynamicInputContainer.clear();
    const componentInstance = this.getComponentByType(this.field.type)
    const dynamicComponent = this.dynamicInputContainer.createComponent(componentInstance)
    dynamicComponent.setInput('field', this.field);
    this.cd.detectChanges();
  }

  getComponentByType(type: string): any {
    let componentDynamic = this.supportedDynamicComponents.find(c => c.name === type);
    return componentDynamic?.component || DynamicInputComponent;
  }
}
