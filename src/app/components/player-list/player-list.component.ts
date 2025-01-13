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
      // this.players = data.map((player: any) => ({
      //   ...player,
      //   elo: Math.floor(this.generateRandomElo(100, 2500)),
      // }));
      // this.sortPlayersByElo();
      console.log(data);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  // private generateRandomElo(min: number, max: number): number {
  //   const mean = 1000; // Most people start around 1000 Elo
  //   const stddev = 400; // Standard deviation to ensure most players are around 800-1200 Elo
  //   let randomElo = this.generateGaussian(mean, stddev);

  //   // Clamp Elo to be within min and max bounds.
  //   randomElo = Math.max(min, Math.min(randomElo, max));
  //   return randomElo;
  // }

  // Function to generate a random number based on a Gaussian (normal) distribution.
  // private generateGaussian(mean: number, stddev: number): number {
  //   let u1 = Math.random();
  //   let u2 = Math.random();
  //   let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  //   return mean + z0 * stddev; // Return the value based on the Gaussian distribution.
  // }

  private sortPlayersByElo(): void {
    this.players.sort((a: any, b: any) => b.elo - a.elo);
  }
}
