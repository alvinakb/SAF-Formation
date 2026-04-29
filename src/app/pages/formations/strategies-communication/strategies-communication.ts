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
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-strategies-communication',
  templateUrl: './strategies-communication.html',
  styleUrls: ['./strategies-communication.css'],
})
export class StrategiesCommunication
  implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "Niv. 7", label: "expertise pédagogique" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {

    titre: "Maîtrise des stratégies de communication",

    accroche:
      "Bien communiquer, ce n'est pas parler davantage. "
      + "C'est choisir le bon message, le bon canal, au bon moment. "
      + "Cette formation donne aux professionnels les outils "
      + "pour construire une communication structurée, cohérente et percutante.",

    objectifs: [
      "Identifier les composantes d'une stratégie de communication efficace.",
      "Maîtriser les outils de communication interne et externe.",
      "Adapter son discours en fonction de l'interlocuteur et du contexte.",
      "Construire et défendre un message clair en situation professionnelle.",
      "Utiliser les supports de communication adaptés à chaque objectif.",
    ],

    publicVise:
      "Tout professionnel souhaitant améliorer sa communication en milieu de travail : "
      + "managers, chargés de communication, assistants, commerciaux, indépendants.",

    prerequis:
      "Aucun prérequis spécifique. "
      + "Une expérience professionnelle de 6 mois minimum est conseillée.",

    duree: "21 heures (3 jours) — Présentiel ou distanciel",

    programme: [
      {
        tag: "Jour 1",
        title: "Fondamentaux de la communication professionnelle",
        desc:
          "Modèles de communication, communication verbale et non verbale, écoute active. "
          + "Comprendre les mécanismes de base pour bâtir des échanges efficaces et lisibles.",
      },
      {
        tag: "Jour 2",
        title: "Stratégie et canaux",
        desc:
          "Définir une stratégie, sélectionner les outils, rédiger pour être lu, "
          + "maîtriser l'email professionnel et la prise de parole en public.",
      },
      {
        tag: "Jour 3",
        title: "Mises en situation et cas pratiques",
        desc:
          "Présentations, réunions, gestion de situations conflictuelles. "
          + "Consolidation des acquis sur des cas concrets issus du terrain.",
      },
    ],

    evaluation: [
      "Exercices pratiques tout au long de la formation",
      "Mise en situation finale avec feedback personnalisé",
      "Questionnaire d'évaluation des acquis en fin de parcours",
    ],

    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO",
      "Plan de développement des compétences",
    ],
  };

  /* ════════════════════════════════════════
     DONNÉES — AUTRES FORMATIONS
  ════════════════════════════════════════ */
  autresFormations: AutreFormation[] = [
    {
      title: "Bilan de compétences",
      meta: "VAE · 24h · CPF",
      route: "/formations/bilan-de-competences",
    },
    {
      title: "Management et leadership",
      meta: "Action de formation · 14h · OPCO",
      route: "/formations/management-leadership",
    },
    {
      title: "Accompagnement VAE",
      meta: "VAE · Sur mesure · CPF",
      route: "/formations/accompagnement-vae",
    },
  ];

  /* ════════════════════════════════════════
     CONSTRUCTOR
  ════════════════════════════════════════ */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /* ════════════════════════════════════════
     LIFECYCLE — OnInit
  ════════════════════════════════════════ */
  ngOnInit(): void {
    // Données initialisées inline.
    // Remplacez par un service HTTP si les données sont dynamiques.
  }

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