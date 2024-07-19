import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';

export function numberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (isNaN(value)) {
    return { notANumber: true };
  }
  return null;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      address: this.formBuilder.group({
        apartment: [null, [numberValidator]],
        house: [''],
        street: [''],
        city: [''],
      }),
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  updateProfile() {
    this.userForm.patchValue({
      firstName: 'Oleh',
      lastName: 'Ternov',
      address: {
        city: 'Kyiv',
        street: 'New Street',
        house: '32a',
        apartment: 2,
      },
    });
  }

  onSubmit() {
    of(this.userForm.value)
      .pipe(
        switchMap((formValue) => {
          console.log('Form submitted: ', formValue);
          return of(null);
        }),
        catchError((err) => {
          console.error('Failed to submit form: ', err);
          return of(null);
        })
      )
      .subscribe(() => {
        alert(JSON.stringify(this.userForm.value));
        this.userForm.reset();
      });
  }
}
