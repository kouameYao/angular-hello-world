import { FormGroup } from "@angular/forms";

export class GlobalGenericValidator {
    constructor(
        private validatorMessage : {[key : string] : {[key : string ] : string }}
    ){}

    public createErrorMessage(container : FormGroup) : {[key : string] : string} {
      const errorMessages = {}

      for (const controlName in container.controls) {
        if (container.controls.hasOwnProperty(controlName)) {
          
          const selectedControl = container.controls[controlName];

          if (this.validatorMessage[controlName]) {
            //errorMessages[controlName] = ''

            if ((selectedControl.dirty || selectedControl.touched) && selectedControl.errors) {
              Object.keys(selectedControl.errors).map((errorMessageKey : string) => {
                if(this.validatorMessage[controlName][errorMessageKey]){
                  //errorMessages[controlName] += this.validatorMessage[controlName][errorMessageKey] + ''
                }
              })
            }
          }
        }
      }
      return errorMessages
    }

}