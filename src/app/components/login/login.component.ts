import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private httpService = inject(HttpService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private subscriptions: Subscription[] = [];

  onSubmit() {
    console.log('Logging in user:', this.email);
    // Call login API here
    const subscription = this.httpService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          this.authService.login(response.token);
          // sessionStorage.setItem('user', JSON.stringify(response.user)); // Optionally save user data
          this.router.navigate(['/']); // Redirect to home or dashboard
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
