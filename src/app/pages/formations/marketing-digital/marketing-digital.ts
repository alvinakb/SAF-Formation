import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* ── Interfaces ── */
interface Stat {
  value: string;
  label: string;
}

interface ProgrammeJour {
  tag: string;
  title: string;
  desc: string[];
}

interface Formation {
  titre: string;
  accroche: string;
  objectifs: string[];
  publicVise: string;
  prerequis: string;
  duree: string;
  programme: ProgrammeJour[];
  evaluation: string[];
  financement: string[];
  avantages: string[];
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-marketing-digital',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './marketing-digital.html',
  styleUrls: ['./marketing-digital.css'],
})
export class MarketingDigital implements OnInit, AfterViewInit, OnDestroy {
  /* ── ViewChild refs ── */
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroEyebrow') heroEyebrow!: ElementRef<HTMLElement>;
  @ViewChild('heroLine1') heroLine1!: ElementRef<HTMLElement>;
  @ViewChild('heroLine2') heroLine2!: ElementRef<HTMLElement>;
  @ViewChild('heroLine3') heroLine3!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('heroPills') heroPills!: ElementRef<HTMLElement>;
  @ViewChild('heroActions') heroActions!: ElementRef<HTMLElement>;
  @ViewChild('heroScroll') heroScroll!: ElementRef<HTMLElement>;
  @ViewChild('railLine') railLine!: ElementRef<HTMLElement>;
  @ViewChild('statsBar') statsBar!: ElementRef<HTMLElement>;
  @ViewChild('sidebarEl') sidebarEl!: ElementRef<HTMLElement>;

  /* ── Observer ── */
  private scrollObserver!: IntersectionObserver;

  /* ════════════════════════════════════════
     DONNÉES — STATS BAR
  ════════════════════════════════════════ */
  stats: Stat[] = [
    { value: "14h", label: "de formation" },
    { value: "2", label: "jours" },
    { value: "100%", label: "finançable" },
    { value: "LinkedIn", label: "Instagram · Facebook" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Marketing digital et réseaux sociaux",
    accroche:
      "Les réseaux sociaux ne sont plus une option pour les professionnels et les entreprises : ils sont devenus un levier de visibilité, de recrutement et de développement commercial. Cette formation donne les clés pour passer d'une présence subie à une stratégie choisie.",
    objectifs: [
      "Comprendre les mécaniques et les algorithmes des principales plateformes (LinkedIn, Instagram, Facebook).",
      "Définir une stratégie de contenu cohérente avec ses objectifs.",
      "Créer et programmer des contenus engageants sans y consacrer un temps excessif.",
      "Développer sa communauté et son réseau de façon organique.",
      "Mesurer et ajuster sa performance grâce aux indicateurs clés.",
    ],
    publicVise:
      "Indépendants, dirigeants de TPE/PME, commerciaux, communicants, chargés de marketing souhaitant structurer leur présence digitale.",
    prerequis:
      "Avoir un compte actif sur au moins une plateforme sociale. Maîtriser les fonctions de base d'un smartphone ou d'un ordinateur.",
    duree: "14 heures (2 jours) — Présentiel ou distanciel",
    programme: [
      {
        tag: "Jour 1",
        title: "Stratégie et positionnement",
        desc: [
          "Audit de l'existant : analyser sa présence actuelle sur les réseaux",
          "Définir ses cibles et objectifs (visibilité, leads, recrutement, vente)",
          "Créer son identité éditoriale : ton, style, lignes directrices",
          "Choisir ses plateformes : LinkedIn, Instagram, Facebook, TikTok",
          "LinkedIn en profondeur : profil optimisé, stratégie de contenu B2B, réseautage",
          "Atelier : audit personnalisé de votre profil",
        ],
      },
      {
        tag: "Jour 2",
        title: "Création de contenu et performance",
        desc: [
          "Formats efficaces : texte, image, vidéo courte (Reels, Shorts)",
          "Outils de création gratuits : Canva, CapCut, Meta Business Suite",
          "Planification et programmation des contenus",
          "Analyse des statistiques : portée, engagement, clics, conversion",
          "Ajustement de la stratégie selon les données",
          "Atelier : création d'un plan de contenu sur 4 semaines",
        ],
      },
    ],
    evaluation: [
      "Audit de profil en début de formation",
      "Production d'un plan de contenu sur 4 semaines",
      "Présentation des résultats attendus",
      "Attestation de fin de formation",
    ],
    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO (Opérateur de Compétences)",
      "Plan de développement des compétences",
      "France Travail (sous conditions)",
    ],
    avantages: [
      "Audit personnalisé de votre présence digitale",
      "Outils et templates prêts à l'emploi",
      "Plan de contenu sur 4 semaines inclus",
      "Accès à la communauté des anciens stagiaires",
    ],
  };

  /* ════════════════════════════════════════
     DONNÉES — AUTRES FORMATIONS
  ════════════════════════════════════════ */
  autresFormations: AutreFormation[] = [
    {
      title: "Stratégies des techniques de vente",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/techniques-vente",
    },
    {
      title: "Bureautique et outils numériques",
      meta: "Action de formation · 14-28h · TOSA",
      route: "/formations/bureautique-outils-numeriques",
    },
    {
      title: "Amélioration des techniques d'accueil client",
      meta: "Action de formation · 14h · CPF",
      route: "/formations/accueil-client",
    },
  ];

  /* ════════════════════════════════════════
     CONSTRUCTOR
  ════════════════════════════════════════ */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /* ════════════════════════════════════════
     LIFECYCLE — OnInit
  ════════════════════════════════════════ */
  ngOnInit(): void { }

  /* ════════════════════════════════════════
     LIFECYCLE — AfterViewInit
  ════════════════════════════════════════ */
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL — IntersectionObserver
  ════════════════════════════════════════ */
  private initScrollReveal(): void {
    const targets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger');

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    targets.forEach((el) => this.scrollObserver.observe(el));
  }

  /* ════════════════════════════════════════
     LIFECYCLE — OnDestroy
  ════════════════════════════════════════ */
  ngOnDestroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
}