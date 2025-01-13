import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private client: HttpClient = inject(HttpClient);

  private readonly url: string = environment.apiUrl;

  constructor() {}

  getAllPlayers(): Observable<any[]> {
    return this.client.get<any[]>(this.url + '/users');
  }

  getOnePlayer(userId: any): Observable<Object> {
    return this.client.get(this.url + '/users/' + userId);
  }

  registerUser(body: any): Observable<Object> {
    return this.client.post(this.url + '/users/', body);
  }
}
