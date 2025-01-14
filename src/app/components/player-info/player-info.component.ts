import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css',
})
export class PlayerInfoComponent {
  user: any | null = null;
  userMatches: any[] | null[] = [];

  private httpService = inject(HttpService);

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const subscription = this.httpService.getOnePlayer(id).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load user data', err);
        alert('Unable to load user data. Please try again later.');
      },
    });
    this.subscriptions.push(subscription);

    const subscription2 = this.httpService.getAllMatches().subscribe({
      next: (data) => {
        console.log(data);
        // filter data...
        if (Array.isArray(data)) {
          // Define the player_id you want to filter by

          // Filter the data to only include matches with the specified player_id
          this.userMatches = data.filter(
            (match) => match.player1.id === id || match.player2.id === id
          );
        }
      },
      error: (err) => {
        console.error('Failed to load matches data', err);
        alert('Unable to load matches data. Please try again later.');
      },
    });
    this.subscriptions.push(subscription2);
  }
}
