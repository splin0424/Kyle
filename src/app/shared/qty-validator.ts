import { AbstractControl } from "@angular/forms";

export function ValidateQty(control: AbstractControl) {
  // // 驗證成功
  // return null;
  // // 驗證失敗
  // return { 'fieldName': 'error status'};
  //console.log(control.parent.value['fpre_qty']);
  // if(typeof control.value!=='number') {
  //   return {
  //     'qty_error': true,
  //     'qty_errormsg': '請填入數字'
  //   };
  // }

  // console.log(control.parent.value.fpre_qty);
  if(typeof control.value==='number') {
    // console.log(control.parent.value.fpn_hide +' , ' +control.parent.value.fvendor
    //   +','+control.parent.value.fpre_pn_hide+','+control.parent.value.fpre_vendor_hide);
      if((control.parent.value.fpn_hide != null)&&(control.parent.value.fvendor != null)
        &&(control.parent.value.fpre_pn_hide != null)&&(control.parent.value.fpre_vendor_hide != null)
        &&(control.parent.value.fpre_qty != null)){

            if((control.parent.value.fpn_hide == control.parent.value.fpre_pn_hide)
              &&(control.parent.value.fvendor == control.parent.value.fpre_vendor_hide)){
              if(control.value < control.parent.value.fpre_qty) {
                return {
                  'qty_error': true,
                  'errormsg': '您所修正之數值，小於前一天資訊，請確認是否為Key In錯誤；若為更換新靶或新Mask，請同時更新Vendor 、 PN 、 BP/Mask No.之資訊。'
                };
              }
              if(control.value > (control.parent.value.fpre_qty + 400))
              {
                return {
                  'qty_error': true,
                  'errormsg': '您所修正之數值，大於每天之MAX值，請確認是否為Key In錯誤。'
                };
              }
            }else{

              if(control.value > 400)
              {
                return {
                  'qty_error': true,
                  'errormsg': '您所修正之數值，大於每天之MAX值，請確認是否為Key In錯誤。'
                };
              }
            }

      }else{

            if(control.value > 400)
            {
              return {
                'qty_error': true,
                'errormsg': '您所修正之數值，大於每天之MAX值，請確認是否為Key In錯誤。'
              };
            }

      }
  }

  return null;
}
