import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  onSubmit() {
    console.log('Registering user:', this.username, this.email);
    // Call  registration API here
  }
}
