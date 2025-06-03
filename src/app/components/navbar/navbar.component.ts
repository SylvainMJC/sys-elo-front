import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // authService = inject(AuthService); // Inject AuthService to use in the template
  showDiscordMenu = false;

  constructor(
    public authService: AuthService,
    private httpService: HttpService
  ) {}

  // 🔧 Fermer le menu Discord quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.discord-menu')) {
      this.showDiscordMenu = false;
    }
  }

  // 🎮 Méthodes Discord pour tests manuels

  /**
   * Toggle du menu dropdown Discord
   */
  toggleDiscordMenu() {
    this.showDiscordMenu = !this.showDiscordMenu;
  }

  /**
   * Fermer le menu Discord quand on clique ailleurs
   */
  closeDiscordMenu() {
    this.showDiscordMenu = false;
  }

  /**
   * Test de connexion Discord
   */
  async testDiscordConnection() {
    try {
      console.log('🧪 Test connexion Discord...');
      const result = await this.httpService.testDiscordConnection().toPromise();
      console.log('✅ Test Discord:', result);
      alert(`✅ Test Discord: ${result.success ? 'SUCCÈS' : 'ÉCHEC'}\n\nBot: ${result.details.bot.success ? '✅' : '❌'}\nWebhook: ${result.details.webhook.success ? '✅' : '❌'}`);
    } catch (error: any) {
      console.error('❌ Erreur test Discord:', error);
      alert(`❌ Erreur test Discord:\n${error.error?.error || error.message}`);
    }
    this.closeDiscordMenu();
  }

  /**
   * Obtenir le statut Discord
   */
  async getDiscordStatus() {
    try {
      console.log('📊 Récupération statut Discord...');
      const result = await this.httpService.getDiscordStatus().toPromise();
      console.log('📊 Statut Discord:', result);
      alert(`📊 Statut Discord:\n\n🤖 Bot: ${result.bot.enabled ? (result.bot.connected ? '✅ Connecté' : '⚠️ Configuré mais déconnecté') : '❌ Non configuré'}\n🔗 Webhook: ${result.webhook.enabled ? '✅ Configuré' : '❌ Non configuré'}\n\n🔧 Version: ${result.version}`);
    } catch (error: any) {
      console.error('❌ Erreur statut Discord:', error);
      alert(`❌ Erreur statut Discord:\n${error.error?.error || error.message}`);
    }
    this.closeDiscordMenu();
  }

  /**
   * Simuler une notification Discord
   */
  async simulateDiscordNotification() {
    try {
      console.log('🎭 Simulation notification Discord...');
      const result = await this.httpService.simulateDiscordNotification().toPromise();
      console.log('🎭 Simulation Discord:', result);
      alert(`🎭 Simulation Discord: ${result.success ? '✅ ENVOYÉE' : '❌ ÉCHEC'}\n\n${result.message}`);
    } catch (error: any) {
      console.error('❌ Erreur simulation Discord:', error);
      alert(`❌ Erreur simulation Discord:\n${error.error?.error || error.message}`);
    }
    this.closeDiscordMenu();
  }

  /**
   * Tester les statistiques quotidiennes Discord
   */
  async testDailyStatistics() {
    try {
      console.log('📊 Test statistiques quotidiennes...');
      const result = await this.httpService.testDailyStatistics().toPromise();
      console.log('📊 Stats quotidiennes:', result);
      alert(`📊 Stats quotidiennes: ${result.success ? '✅ ENVOYÉES' : '❌ ÉCHEC'}\n\nBot: ${result.result.methods.bot ? '✅' : '❌'}\nWebhook: ${result.result.methods.webhook ? '✅' : '❌'}\n\n📋 Données:\n• Matchs aujourd'hui: ${result.data.matchesToday}\n• Joueurs actifs: ${result.data.activePlayers}\n• ELO moyen: ${result.data.averageElo}`);
    } catch (error: any) {
      console.error('❌ Erreur stats quotidiennes:', error);
      alert(`❌ Erreur stats quotidiennes:\n${error.error?.error || error.message}`);
    }
    this.closeDiscordMenu();
  }
}
