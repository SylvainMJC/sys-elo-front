import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
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
      console.log(data);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
