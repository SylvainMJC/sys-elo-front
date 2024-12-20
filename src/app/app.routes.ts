import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MatchesComponent } from '../components/matches/matches.component';
import { PlayersComponent } from '../components/players/players.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'players', pathMatch: 'full', component: PlayersComponent },
  { path: 'matches', pathMatch: 'full', component: MatchesComponent },
];
