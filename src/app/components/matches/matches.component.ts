import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent {
  private httpService = inject(HttpService);

  public matches: any = [];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
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
}
