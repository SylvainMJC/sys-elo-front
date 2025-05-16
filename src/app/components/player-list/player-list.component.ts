import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent implements OnInit {
  private httpService = inject(HttpService);

  public players: any = [];

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const subscription = this.httpService.getAllPlayers().subscribe((data) => {
      this.players = data;
      this.sortPlayersByElo();
      // console.log(data);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  private sortPlayersByElo(): void {
    this.players.sort((a: any, b: any) => b.elo - a.elo);
  }
}
