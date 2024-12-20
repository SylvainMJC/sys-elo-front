import { Component } from '@angular/core';
import { PlayerListComponent } from '../player-list/player-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlayerListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
