import { Component } from '@angular/core';
import { PlayerListComponent } from '../player-list/player-list.component';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PlayerListComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent {}
