import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleButtonComponent } from './theme/theme-toggle-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ThemeToggleButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NesTetrisLeaderboard';
}
