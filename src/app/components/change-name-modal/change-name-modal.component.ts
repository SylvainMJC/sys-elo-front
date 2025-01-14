import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-name-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-name-modal.component.html',
  styleUrls: ['./change-name-modal.component.css']
})
export class ChangeNameModalComponent {
  @Input() playerId!: number;
  @Output() nameChanged = new EventEmitter<string>();
  newName: string = '';
  subscriptions: any[] = [];

  constructor(private httpService: HttpService, private router: Router) {}

  submitChange(): void {
    const body = { username: this.newName };
    const subscription = this.httpService.updatePlayer(this.playerId, body).subscribe({
      next: () => {
        this.nameChanged.emit(this.newName);
        this.router.navigate(['/players']);
      },
      
      error: (err) => {
        console.error('Error updating name:', err);
      }
    });
    this.subscriptions.push(subscription);
  }
  closeModal() {
    this.nameChanged.emit();

  }
}