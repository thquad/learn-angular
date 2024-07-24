import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessagePipe } from '@shared/pipe/error-message.pipe';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe,
    ErrorMessagePipe
  ],
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.scss'
})
export class FormsPageComponent {
  private fb = inject(FormBuilder);

  // template driven
  public templateDrivenNumber!: number;

  // reactive form
  public form = this.fb.group({
    text: this.fb.control('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    number: this.fb.control(1, [
      Validators.required,
      Validators.min(0),
      Validators.max(10),
    ])
  })

  // #todo do more with reactive forms

}
