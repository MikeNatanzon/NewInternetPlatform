import { FormGroup } from '@angular/forms';

/**
 * Match two input values
 * @param controlName
 * @param matchingControlName
 * @constructor
 */
export function MustMatchValidation(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.notMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ notMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
