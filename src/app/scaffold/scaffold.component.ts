import { Component } from '@angular/core';
import { LeaderboardTableComponent } from '../leaderboard-table/leaderboard-table.component';

@Component({
  selector: 'app-scaffold',
  standalone: true,
  imports: [LeaderboardTableComponent],
  templateUrl: './scaffold.component.html',
  styleUrl: './scaffold.component.scss'
})
export class ScaffoldComponent {

}
