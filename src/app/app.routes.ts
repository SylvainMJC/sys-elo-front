import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { MatchComponent } from './components/match/match.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayersComponent } from './components/players/players.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'players', pathMatch: 'full', component: PlayersComponent },
  { path: 'players/:id', pathMatch: 'full', component: PlayerInfoComponent },
  { path: 'matches', pathMatch: 'full', component: MatchesComponent },
  { path: 'matches/:id', pathMatch: 'full', component: MatchComponent },
  { path: 'create-match', pathMatch: 'full', component: MatchFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];
