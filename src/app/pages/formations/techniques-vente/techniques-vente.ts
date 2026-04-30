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

interface ProgrammeDay {
  tag: string;
  title: string;
  desc: string;
}

interface Formation {
  titre: string;
  accroche: string;
  objectifs: string[];
  publicVise: string;
  prerequis: string;
  duree: string;
  programme: ProgrammeDay[];
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
  selector: 'app-techniques-vente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './techniques-vente.html',
  styleUrls: ['./techniques-vente.css'],
})
export class TechniquesVente implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "21h", label: "de formation" },
    { value: "3", label: "jours intensifs" },
    { value: "100%", label: "finançable" },
    { value: "98%", label: "satisfaction" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Stratégies des techniques de vente",
    accroche:
      "Vendre, c'est résoudre un problème que le client n'a pas encore nommé. " +
      "Cette formation transforme l'approche commerciale en une démarche structurée, " +
      "basée sur l'écoute, la découverte des besoins et la construction d'une argumentation qui convainc.",
    objectifs: [
      "Structurer un entretien de vente de la prise de contact à la conclusion.",
      "Maîtriser les techniques de questionnement et de découverte des besoins.",
      "Construire une argumentation adaptée au profil de chaque client.",
      "Traiter les objections avec méthode et confiance.",
      "Développer sa posture commerciale et sa résistance au refus.",
    ],
    publicVise:
      "Commerciaux, technico-commerciaux, indépendants, dirigeants de TPE/PME, " +
      "toute personne ayant une activité de vente ou de conseil.",
    prerequis:
      "Aucun prérequis requis. La formation s'adapte aux débutants comme aux vendeurs en activité souhaitant se perfectionner.",
    duree: "21 heures (3 jours) — Présentiel ou distanciel",
    programme: [
      {
        tag: "Jour 1",
        title: "Psychologie de l'acheteur et posture commerciale",
        desc:
          "Les motivations d'achat, les profils client, construire la confiance dès les premières secondes. " +
          "La communication non verbale en situation de vente et atelier d'analyse des pratiques commerciales.",
      },
      {
        tag: "Jour 2",
        title: "Méthodes de vente et découverte des besoins",
        desc:
          "Méthodes SPANCO et CAP SONCAS, entretien de découverte, techniques de questionnement, " +
          "écoute active, argumentation personnalisée et traitement des objections.",
      },
      {
        tag: "Jour 3",
        title: "Négociation, conclusion et fidélisation",
        desc:
          "Techniques de closing, négociation sans brader, gestion des fins d'entretien, " +
          "suivi client, fidélisation et mise en situation complète.",
      },
    ],
    evaluation: [
      "Jeux de rôle enregistrés avec débriefing personnalisé",
      "Grille d'évaluation des compétences commerciales",
      "Mise en situation finale",
      "Attestation de fin de formation",
    ],
    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO (Opérateur de Compétences)",
      "Plan de développement des compétences",
      "France Travail (sous conditions)",
    ],
    avantages: [
      "Méthodes éprouvées (SPANCO, CAP SONCAS)",
      "Jeux de rôle filmés et débriefés",
      "Cas pratiques personnalisés par secteur",
      "Plan d'action commercial personnalisé",
    ],
  };

  /* ════════════════════════════════════════
     DONNÉES — AUTRES FORMATIONS
  ════════════════════════════════════════ */
  autresFormations: AutreFormation[] = [
    {
      title: "Maîtrise des stratégies de communication",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/strategies-communication",
    },
    {
      title: "Bureautique et outils numériques",
      meta: "Action de formation · 14-28h · TOSA",
      route: "/formations/bureautique-outils-numeriques",
    },
    {
      title: "Accompagnement VAE",
      meta: "VAE · Sur mesure · CPF",
      route: "/formations/vae",
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