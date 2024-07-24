import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-signals-page',
  standalone: true,
  imports: [MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signals-page.component.html',
  styleUrl: './signals-page.component.scss'
})
export class SignalsPageComponent {
  public count = signal(0);

  increment() {
    this.count.set(this.count()+1);
  }
}
