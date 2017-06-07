import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ValidateExist(inputList: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // // true
    // return null;
    // // false
    // return {'fieldName': 'error status'}
    console.log(control.value);
    console.log(inputList);
    if (inputList==null){
      return null;
    }

    if (inputList.filter((name)=>name===control.value).length > 0){
      return null;
    } else {
      return {
        'validateExist': true,
        'validateExist_errormsg': 'name is not exist!'
      }
    }
  }
}
