[index.md](../index.md) > forms.md

# Forms

/Users/thomasquandt/evoila/projects/angular/learn-angular/src/app/shared/component/todo-widget/todo-widget.component.ts

using form control

src/app/shared/component/todo-list/todo-list.component.html

using no angular forms but handling data with events

#todo formgroup
#todo template form
#todo form with multiple inputs, reactive form

## NgForm

https://angular.dev/api/forms/NgForm?tab=description

The NgForm will automatically be applied to any form element, defined by the selectors of the directive:

`form:not([ngNoForm]):not([formGroup])`

NgForm is a directive that binds a FormGroup to an element.

## NgModel

https://angular.dev/api/forms/NgModel?tab=description

See [here](../../src/app/feature/forms-page/forms-page.component.html) for implementation example.

NgModel is a directive that binds a FormControl to an element.
NgModel also has an `@Input()` for assigning a variable for the value.
E.g. `[(ngModel)]="templateDrivenNumber"` will write the value into `templateDrivenNumber`.
