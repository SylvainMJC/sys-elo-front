import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  private httpService = inject(HttpService);
  private subscriptions: Subscription[] = [];

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Registering user:', this.username, this.email, this.password);
    const subscription = this.httpService
      .registerUser({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
          // Optionally navigate or display a success message here
          this.router.navigate(['/login']); // Redirect to login page
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
          // Handle errors such as displaying a message to the user
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
