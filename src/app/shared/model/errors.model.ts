export const enum ValidatorErrorKey {
  MIN = 'min',
  MAX = 'max',
  MIN_LENGTH = 'minlength',
  REQUIRED = 'required'
}

export const ErrorMessageMap = {
  [ValidatorErrorKey.MIN]: 'Minimum value is ',
  [ValidatorErrorKey.MAX]: 'Maximum value is ',
  [ValidatorErrorKey.MIN_LENGTH]: 'Minimum length is ',
  [ValidatorErrorKey.REQUIRED]: 'Required',
}
