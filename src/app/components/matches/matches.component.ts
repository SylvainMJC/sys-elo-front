import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent {
  players: any[] = []; // This will be populated from an API call
  filteredPlayers: any[] = [];
  selectedPlayer1: number | null = null;
  selectedPlayer2: number | null = null;

  private httpService = inject(HttpService);

  public matches: any = [];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const subscription2 = this.httpService.getAllPlayers().subscribe((data) => {
      this.players = data;
    });
    this.subscriptions.push(subscription2);

    this.filteredPlayers = [...this.players];

    const subscription = this.httpService.getAllMatches().subscribe((data) => {
      this.matches = data;
      console.log(data);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  updatePlayer2Options(): void {
    if (this.selectedPlayer1) {
      this.filteredPlayers = this.players.filter(
        (player) => player !== this.selectedPlayer1
      );
    } else {
      this.filteredPlayers = [...this.players];
    }
  }

  onSubmit() {
    if (this.selectedPlayer1 && this.selectedPlayer2) {
      console.error('this.selectedPlayer1 :' + this.selectedPlayer1);
      console.error('this.selectedPlayer2 :' + this.selectedPlayer2);
      const subscription = this.httpService
        .createMatch({
          player1: this.selectedPlayer1,
          player2: this.selectedPlayer2,
        })
        .subscribe({
          next: (response) => {
            // Optionally navigate or display a success message here
            this.router.navigate(['/matches']); // Redirect to matches page
          },
          error: (error) => {
            console.error('Match creation failed:', error);
            alert('Failed match creation. Please try again.');
            // Handle errors such as displaying a message to the user
          },
        });
      this.subscriptions.push(subscription);
    }
  }
}
