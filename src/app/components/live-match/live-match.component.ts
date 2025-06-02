import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-live-match',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './live-match.component.html',
  styleUrl: './live-match.component.css'
})
export class LiveMatchComponent implements OnInit, OnDestroy {
  match: any | null = null;
  liveData: any | null = null;
  isLive: boolean = false;
  
  private httpService = inject(HttpService);
  private subscriptions: Subscription[] = [];
  private liveUpdateSubscription: Subscription | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchMatchData(id);
      this.checkIfLive(id);
    }
  }

  fetchMatchData(id: string): void {
    const subscription = this.httpService.getOneMatch(id).subscribe({
      next: (data) => {
        this.match = data;
      },
      error: (err) => {
        console.error('Failed to load match data', err);
        alert('Unable to load match data. Please try again later.');
      },
    });
    this.subscriptions.push(subscription);
  }

  checkIfLive(id: string): void {
    const subscription = this.httpService.getLiveMatchData(id).subscribe({
      next: (data) => {
        this.liveData = data;
        this.isLive = true;
        this.startLiveUpdates(id);
      },
      error: (err) => {
        // Match n'est pas en live
        this.isLive = false;
        console.log('Match not live:', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  startMatch(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const subscription = this.httpService.startMatch(id, {
        result_player1: 0,
        result_player2: 0
      }).subscribe({
        next: (data) => {
          console.log('Match started:', data);
          this.isLive = true;
          this.liveData = { result_player1: 0, result_player2: 0 };
          this.startLiveUpdates(id);
        },
        error: (err) => {
          console.error('Failed to start match', err);
          alert('Unable to start match. Please try again.');
        },
      });
      this.subscriptions.push(subscription);
    }
  }

  addPoint(player: 'player1' | 'player2'): void {
    if (!this.liveData) return;
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const newScore = {
        result_player1: player === 'player1' 
          ? (this.liveData.result_player1 || 0) + 1 
          : (this.liveData.result_player1 || 0),
        result_player2: player === 'player2' 
          ? (this.liveData.result_player2 || 0) + 1 
          : (this.liveData.result_player2 || 0)
      };

      const subscription = this.httpService.updateLiveScore(id, newScore).subscribe({
        next: (data) => {
          this.liveData = newScore;
          console.log('Score updated:', data);
        },
        error: (err) => {
          console.error('Failed to update score', err);
          alert('Unable to update score. Please try again.');
        },
      });
      this.subscriptions.push(subscription);
    }
  }

  endMatch(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const subscription = this.httpService.endMatch(id).subscribe({
        next: (data) => {
          console.log('Match ended:', data);
          this.isLive = false;
          this.stopLiveUpdates();
          // Retourner à la page du match
          this.router.navigate(['/matches', id]);
        },
        error: (err) => {
          console.error('Failed to end match', err);
          alert('Unable to end match. Please try again.');
        },
      });
      this.subscriptions.push(subscription);
    }
  }

  private startLiveUpdates(id: string): void {
    // Mise à jour automatique toutes les 2 secondes
    this.liveUpdateSubscription = interval(2000).subscribe(() => {
      this.httpService.getLiveMatchData(id).subscribe({
        next: (data) => {
          this.liveData = data;
        },
        error: (err) => {
          console.log('Live update failed, match might have ended');
          this.isLive = false;
          this.stopLiveUpdates();
        },
      });
    });
  }

  private stopLiveUpdates(): void {
    if (this.liveUpdateSubscription) {
      this.liveUpdateSubscription.unsubscribe();
      this.liveUpdateSubscription = null;
    }
  }

  ngOnDestroy(): void {
    this.stopLiveUpdates();
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
