[index.md](../index.md) > forms.md

# Forms

See [here](../../src/app/feature/forms-page/forms-page.component.html) for implementation examples.

using form control

src/app/shared/component/todo-list/todo-list.component.html

using no angular forms but handling data with events

#todo form with multiple inputs, reactive form

## Template driven forms

https://angular.dev/guide/forms/template-driven-forms

Template driven forms pretty much just consist of:
- NgForm
- NgModel
- NgModelGroup

### NgForm

https://angular.dev/api/forms/NgForm?tab=description

The NgForm will automatically be applied to any form element, defined by the selectors of the directive:

`form:not([ngNoForm]):not([formGroup])`

NgForm is a directive that binds a FormGroup to an element.

### NgModel

https://angular.dev/api/forms/NgModel?tab=description

NgModel is a directive that binds a FormControl to an element.
NgModel also has an `@Input()` for assigning a variable for the value.
E.g. `[(ngModel)]="templateDrivenNumber"` will write the value into `templateDrivenNumber`.

## Reactive forms

https://angular.dev/guide/forms/reactive-forms

A reactive form is a form defined in typescript and then accessed by the form elements in the template.

I think reactive forms always make sense if the page requires an actual form to be filled out.
For individual or small amount of input fields, a template driven form should suffice, like in [todo-list component](../../src/app/shared/component/todo-list/todo-list.component.html).
