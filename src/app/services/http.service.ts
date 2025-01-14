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

  getAllMatches(): Observable<Object> {
    return this.client.get<any[]>(this.url + '/matches');
  }

  getOneMatch(matchId: any): Observable<Object> {
    return this.client.get(this.url + '/matches/' + matchId);
  }

  deleteMatch(matchId: any): Observable<Object> {
    return this.client.delete(this.url + '/matches/' + matchId);
  }

  updateMatch(matchId: any, body: any): Observable<Object> {
    console.log(body);
    return this.client.patch(this.url + '/matches/' + matchId, body);
  }

  createMatch(body: any): Observable<Object> {
    console.log(body);
    return this.client.post(this.url + '/matches/', body);
  }

  registerUser(body: any): Observable<Object> {
    console.log(body);
    return this.client.post(this.url + '/register', body);
  }

  login(body: any): Observable<Object> {
    return this.client.post(this.url + '/login', body);
  }

  logout(body: any): Observable<Object> {
    return this.client.post(this.url + '/logout', body);
  }
}
