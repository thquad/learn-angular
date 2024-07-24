import { Pipe } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ErrorMessageMap, ValidatorErrorKey } from "@shared/model/errors.model";

@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe {
  transform(errors: ValidationErrors | null | undefined){
    let message = '';
    if(errors){
      const [errorKey, errorValue] = Object.entries(errors)[0];

      Object.entries(ErrorMessageMap).forEach(([key, val]) => {
        if(key === errorKey){
          message = val;

          switch(key){
            case ValidatorErrorKey.MIN: 
              message = message + errorValue.min;
              break;
            case ValidatorErrorKey.MAX: 
              message = message + errorValue.max;
              break;
            case ValidatorErrorKey.MIN_LENGTH: 
              message = message + errorValue.requiredLength;
              break;
          }
        }
      });
    }
    return message;
  }
}