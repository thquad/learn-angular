import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NAVIGATION } from '../../../shared/model/path.model';
import { RouterLink, RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [RouterModule, MatDivider, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  @Output() navigationEvent = new EventEmitter();

  public NAVIGATION = NAVIGATION;
}
