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
    // console.log(body);
    return this.client.patch(this.url + '/matches/' + matchId, body);
  }

  createMatch(body: any): Observable<Object> {
    // console.log(body);
    return this.client.post(this.url + '/matches/', body);
  }

  registerUser(body: any): Observable<Object> {
    // console.log(body);
    return this.client.post(this.url + '/register', body);
  }

  login(body: any): Observable<Object> {
    return this.client.post(this.url + '/login', body);
  }

  logout(body: any): Observable<Object> {
    return this.client.post(this.url + '/logout', body);
  }

  deletePlayer(userId:any): Observable<Object> {
    return this.client.delete(this.url + '/users/' + userId);
  }

  updatePlayer(userId: any, body: any): Observable<Object> {
    return this.client.put(this.url + '/users/' + userId, body);
  }

  getStatus(statusId: any): Observable<Object> {
    return this.client.get(this.url + '/statuses/' + statusId);
  }

  // ===== Méthodes Redis pour gestion des matchs en temps réel =====
  
  startMatch(matchId: any, body: any): Observable<Object> {
    return this.client.post(this.url + '/matches/' + matchId + '/start', body);
  }
  updateLiveScore(matchId: any, body: any): Observable<Object> {
    return this.client.patch(this.url + '/matches/' + matchId + '/score', body);
  }

  getLiveMatchData(matchId: any): Observable<Object> {
    return this.client.get(this.url + '/matches/' + matchId + '/live');
  }

  endMatch(matchId: any): Observable<Object> {
    return this.client.post(this.url + '/matches/' + matchId + '/end', {});
  }

  // ===== Nouvelles méthodes Discord pour tests manuels =====

  /**
   * Test la connexion Discord - NOUVELLE VERSION UNIFIÉE
   */
  testDiscordConnection(): Observable<any> {
    return this.client.get<any>(this.url + '/matches/discord/test');
  }

  /**
   * Obtient le statut des services Discord
   */
  getDiscordStatus(): Observable<any> {
    return this.client.get<any>(this.url + '/matches/discord/status');
  }

  /**
   * Simule une notification Discord
   */
  simulateDiscordNotification(): Observable<any> {
    return this.client.post<any>(this.url + '/matches/discord/simulate', {});
  }

  /**
   * Teste les statistiques quotidiennes Discord
   */
  testDailyStatistics(): Observable<any> {
    return this.client.post<any>(this.url + '/matches/discord/daily-stats', {});
  }
}
