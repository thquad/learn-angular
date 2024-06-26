import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [MatInputModule, MatLabel, ReactiveFormsModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoInputComponent {
  @Input() form!: FormControl<string | null>;
}
