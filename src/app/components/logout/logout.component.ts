import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private router: Router) {}
  private httpService = inject(HttpService);

  ngOnInit() {
    // Handle logout logic here
    console.log('Logging out user');
    // Redirect to home or login page
    this.router.navigate(['/']);
  }
}
