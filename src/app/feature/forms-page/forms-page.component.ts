import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe
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
    text: this.fb.control(''),
    number: this.fb.control(1)
  })

  // #todo do more with reactive forms

}
