import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private client: HttpClient = inject(HttpClient);

  private readonly url: string = 'https://jsonplaceholder.typicode.com';

  constructor() {}

  getAllPlayers(): Observable<Object> {
    return this.client.get(this.url + '/users');
  }

  getOnePlayer(userId: any): Observable<Object> {
    return this.client.get(this.url + '/users/' + userId);
  }
}
