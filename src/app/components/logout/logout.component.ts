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
    sessionStorage.removeItem('token'); // Clear the token
    sessionStorage.removeItem('user'); // Clear user data
    this.router.navigate(['/login']); // Redirect to login page
  }
}
