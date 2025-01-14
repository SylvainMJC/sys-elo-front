import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent {
  match: any | null = null;

  private httpService = inject(HttpService);

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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

  changeStatus(match: any, newStatus: string) {
    const updatedData = {
      id: match.id,
      status: newStatus,
    };

    const subscription = this.httpService
      .updateMatch(match.id, {
        statusName: newStatus,
      })
      .subscribe({
        next: (response) => {},
        error: (error) => {
          console.error('Match status update failed:', error);
          alert('Failed match status update. Please try again.');
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    // edit ?
  }

  onDelete() {
    const matchId = this.route.snapshot.paramMap.get('id');
    if (matchId) {
      const subscription = this.httpService.deleteMatch(matchId).subscribe({
        next: (response) => {
          alert('Match deleted successfully!');
          this.router.navigate(['/matches']);
        },
        error: (error) => {
          console.error('Error deleting match:', error);
          alert('Failed to delete the match. Please try again later.');
        },
      });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
