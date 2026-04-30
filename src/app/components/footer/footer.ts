import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {

  /** Année dynamique pour le copyright */
  currentYear: number = new Date().getFullYear();

  /** Numéro de déclaration d'activité */
  ndaNumber: string = 'XXXXXXXXX';

  /** Email de contact */
  contactEmail: string = 'contact@saf-formation.fr';

  /** Téléphone (optionnel – laisser vide pour ne pas l'afficher) */
  contactPhone: string = '';

  /** Chemin vers le logo Qualiopi */
  qualiopiLogo: string = 'assets/images/LOGO SAF Officiel.png';

  ngOnInit(): void {
    // Mise à jour de l'année (utile si le composant reste monté longtemps)
    this.currentYear = new Date().getFullYear();
  }

  /**
   * Gère l'erreur de chargement du logo Qualiopi.
   * Remplace l'image cassée par un placeholder SVG inline.
   */
  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // SVG placeholder stylisé si le fichier image est introuvable
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="60" viewBox="0 0 140 60">
        <rect width="140" height="60" rx="6" fill="none" stroke="rgba(166,126,114,0.4)" stroke-width="1"/>
        <text x="70" y="24" text-anchor="middle" font-family="sans-serif" font-size="11"
              font-weight="600" fill="rgba(199,155,141,0.9)" letter-spacing="2">QUALIOPI</text>
        <text x="70" y="42" text-anchor="middle" font-family="sans-serif" font-size="9"
              fill="rgba(255,255,255,0.4)" letter-spacing="1">Certification qualité</text>
      </svg>
    `)}`;
    img.style.filter = 'none';
    img.style.opacity = '0.8';
  }
}