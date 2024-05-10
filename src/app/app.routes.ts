import { Routes } from '@angular/router';
import { LeaderboardTableComponent } from './leaderboard-table/leaderboard-table.component';
import { ScaffoldComponent } from './scaffold/scaffold.component';

export const routes: Routes = [
  // { path: 'test', component: LeaderboardTableComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'test' },
  { path: '', component: ScaffoldComponent },

];
