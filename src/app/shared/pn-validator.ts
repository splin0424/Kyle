import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function ValidatePNExist(pnList: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // // true
    // return null;
    // // false
    // return {'fieldName': 'error status'}
    // console.log(control.value+','+typeof control.value);
    // console.log(pnList);
    if ((pnList==null)||(control.value==null)){
      return null;
    }
    //console.log(control.parent.value['ftest']);

    var value = typeof control.value==='object'? control.value.PN : control.value;

    if (pnList.filter((pn)=>pn===value).length > 0){
      return null;
    } else {
      return {
        'PNisNotExist': true,
        'errormsg': 'PN is not exist! PN不存在'
      }
    }
  }
}
