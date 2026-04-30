/* ================================================================
   SAF FORMATION — home.ts
   Composant Angular standalone
   ================================================================ */

import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {

  // ────────────────────────────────────────────────────────────────
  // VIEW REF
  // ────────────────────────────────────────────────────────────────
  @ViewChild('dirPhoto') dirPhoto!: ElementRef<HTMLImageElement>;

  // ────────────────────────────────────────────────────────────────
  // ÉTAT DE LA NAVBAR
  // ────────────────────────────────────────────────────────────────

  /** Devient true dès que le scroll dépasse 60px → nav devient solide */
  isScrolled = false;

  /** Contrôle l'ouverture du menu burger mobile */
  menuOpen = false;

  // ────────────────────────────────────────────────────────────────
  // DONNÉES
  // ────────────────────────────────────────────────────────────────

  stats = [
    { number: '+10 ans', label: "d'expertise terrain" },
    { number: '3', label: 'dispositifs certifiés Qualiopi' },
    { number: '100%', label: 'ancrage réalité professionnelle' },
  ];

  financements = ['CPF', 'OPCO', 'France Travail', 'FAFCEA'];

  tickerItems = [
    'CPF', 'OPCO', 'France Travail', 'Qualiopi',
    'VAE', 'Bilan de compétences', 'Action de formation', 'FAFCEA',
  ];

  dirigeanteBadges = ['Master Niveau 7', 'Auditrice Qualiopi', "+10 ans d'expérience"];

  // ────────────────────────────────────────────────────────────────
  // FORMATIONS
  // ────────────────────────────────────────────────────────────────

  formations: Formation[] = [
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Maîtrise des stratégies de communication',
      desc: 'Construire une communication structurée, cohérente et percutante.',
      badge: 'Éligible CPF',
      route: '/formations/strategies-communication',
      image: '../../../assets/images/Communication.png',
      location: 'Paris · Distanciel',
      duration: '3 jours (21h)',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Stratégies des techniques de vente',
      desc: "Structurer un entretien de vente de la prise de contact à la conclusion.",
      badge: 'Éligible CPF',
      route: '/formations/techniques-vente',
      image: '../../../assets/images/Vente.png',
      location: 'Paris · Distanciel',
      duration: '4 jours (28h)',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Bureautique et outils numériques',
      desc: 'Gagner en autonomie et efficacité sur les outils du quotidien.',
      badge: 'Éligible CPF',
      route: '/formations/bureautique-outils-numeriques',
      image: '../../../assets/images/Bureautique.png',
      location: 'Paris · Distanciel',
      duration: '2 jours (14h)',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Accueil client professionnel',
      desc: 'Les réflexes, les mots et la posture pour un accueil systématiquement positif.',
      badge: 'Éligible CPF',
      route: '/formations/accueil-client',
      image: '../../../assets/images/Acceuil.png',
      location: 'Paris · Distanciel',
      duration: '2 jours (14h)',
    },
    {
      category: 'BILAN DE COMPÉTENCES',
      categoryLabel: 'Bilan de compétences',
      title: 'Bilan de compétences',
      desc: 'Clarifier vos compétences, aptitudes et motivations pour construire votre projet.',
      badge: 'CPF · France Travail',
      route: '/formations/bilan-competences',
      image: '../../../assets/images/Bilan.png',
      location: 'Paris · Distanciel',
      duration: '24h individualisé',
    },
    {
      category: 'VAE',
      categoryLabel: 'VAE',
      title: 'Accompagnement VAE',
      desc: "Obtenez une certification reconnue à partir de votre expérience professionnelle.",
      badge: 'Prise en charge OPCO',
      route: '/formations/vae',
      image: '../../../assets/images/Vae.png',
      location: 'Paris · Distanciel',
      duration: 'Accompagnement individualisé',
    },
  ];

  categories: Category[] = [
    { id: 'all', label: 'Tous' },
    { id: 'ACTION DE FORMATION · CPF', label: 'Action de formation' },
    { id: 'BILAN DE COMPÉTENCES', label: 'Bilan de compétences' },
    { id: 'VAE', label: 'VAE' },
  ];

  activeCategory = 'all';
  filteredFormations: Formation[] = [];

  // ────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.updateFilteredFormations();
  }

  ngOnDestroy(): void {
    /* Nettoyage si nécessaire (abonnements RxJS, etc.) */
  }

  // ────────────────────────────────────────────────────────────────
  // SCROLL LISTENER — nav transparente → solide
  // ────────────────────────────────────────────────────────────────

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 60;
    /* Referme le menu mobile au scroll */
    if (this.menuOpen) this.menuOpen = false;
  }

  // ────────────────────────────────────────────────────────────────
  // MENU BURGER MOBILE
  // ────────────────────────────────────────────────────────────────

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // ────────────────────────────────────────────────────────────────
  // FILTRES FORMATIONS
  // ────────────────────────────────────────────────────────────────

  filterCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.updateFilteredFormations();
  }

  private updateFilteredFormations(): void {
    this.filteredFormations =
      this.activeCategory === 'all'
        ? [...this.formations]
        : this.formations.filter(f => f.category === this.activeCategory);
  }
}

// ────────────────────────────────────────────────────────────────
// INTERFACES
// ────────────────────────────────────────────────────────────────

interface Formation {
  category: string;
  categoryLabel: string;
  title: string;
  desc: string;
  badge?: string;
  route: string;
  image: string;
  location: string;
  duration: string;
}

interface Category {
  id: string;
  label: string;
}