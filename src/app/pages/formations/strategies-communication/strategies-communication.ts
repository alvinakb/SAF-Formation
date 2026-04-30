import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  Inject,
  ChangeDetectorRef,
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
  modules: string[];
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
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  @ViewChild('objSlider') objSlider!: ElementRef<HTMLElement>;
  @ViewChild('progTrack') progTrack!: ElementRef<HTMLElement>;

  /* ── Etat slider objectifs ── */
  activeObjSlide = 0;
  private objAutoplay: ReturnType<typeof setInterval> | null = null;

  /* ── Etat carousel programme ── */
  activeDay = 0;

  /* ── IntersectionObserver ── */
  private scrollObserver!: IntersectionObserver;

  /* ════════════════════════════════════════
     DONNEES - STATS BAR
  ════════════════════════════════════════ */
  stats: Stat[] = [
    { value: "21h", label: "de formation" },
    { value: "3", label: "jours intensifs" },
    { value: "100%", label: "financable" },
    { value: "Niv. 7", label: "expertise pedagogique" },
  ];

  /* ════════════════════════════════════════
     DONNEES - FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {

    titre: "Maitrise des strategies de communication",

    accroche:
      "Bien communiquer, ce n\u2019est pas parler davantage. " +
      "C\u2019est choisir le bon message, le bon canal, au bon moment. " +
      "Cette formation donne aux professionnels les outils " +
      "pour construire une communication structuree, coherente et percutante.",

    objectifs: [
      "Identifier les composantes d\u2019une strategie de communication efficace.",
      "Maitriser les outils de communication interne et externe.",
      "Adapter son discours en fonction de l\u2019interlocuteur et du contexte.",
      "Construire et defendre un message clair en situation professionnelle.",
      "Utiliser les supports de communication adaptes a chaque objectif.",
    ],

    publicVise:
      "Tout professionnel souhaitant ameliorer sa communication en milieu de travail : " +
      "managers, charges de communication, assistants, commerciaux, independants.",

    prerequis:
      "Aucun prerequis specifique. " +
      "Une experience professionnelle de 6 mois minimum est conseillee.",

    duree: "21 heures (3 jours) \u2014 Presentiel ou distanciel",

    programme: [
      {
        tag: "Jour 1",
        title: "Fondamentaux de la communication professionnelle",
        desc:
          "Modeles de communication, communication verbale et non verbale, ecoute active. " +
          "Comprendre les mecanismes de base pour batir des echanges efficaces et lisibles.",
        modules: [
          "Modeles de communication",
          "Communication non verbale",
          "Ecoute active",
          "Gestion des biais",
        ],
      },
      {
        tag: "Jour 2",
        title: "Strategie et canaux de communication",
        desc:
          "Definir une strategie, selectionner les outils, rediger pour etre lu, " +
          "maitriser l\u2019email professionnel et la prise de parole en public.",
        modules: [
          "Plan de communication",
          "Email & messagerie",
          "Prise de parole",
          "Outils digitaux",
        ],
      },
      {
        tag: "Jour 3",
        title: "Mises en situation et cas pratiques",
        desc:
          "Presentations, reunions, gestion de situations conflictuelles. " +
          "Consolidation des acquis sur des cas concrets issus du terrain.",
        modules: [
          "Jeux de role",
          "Gestion du conflit",
          "Feedback personnalise",
          "Plan d\u2019action",
        ],
      },
    ],

    evaluation: [
      "Exercices pratiques tout au long de la formation",
      "Mise en situation finale avec feedback personnalise",
      "Questionnaire d\u2019evaluation des acquis en fin de parcours",
    ],

    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO",
      "Plan de developpement des competences",
    ],
  };

  /* ════════════════════════════════════════
     DONNEES - AUTRES FORMATIONS
  ════════════════════════════════════════ */
  autresFormations: AutreFormation[] = [
    {
      title: "Strategies des techniques de vente",
      meta: "Action de formation \u00b7 21h \u00b7 CPF",
      route: "/formations/techniques-vente",
    },
    {
      title: "Bureautique et outils numeriques",
      meta: "Action de formation \u00b7 14-28h \u00b7 TOSA",
      route: "/formations/bureautique-outils-numeriques",
    },
    {
      title: "Accompagnement VAE",
      meta: "VAE \u00b7 Sur mesure \u00b7 CPF",
      route: "/formations/vae",
    },
  ];

  /* ════════════════════════════════════════
     CONSTRUCTOR
  ════════════════════════════════════════ */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
  ) { }

  /* ════════════════════════════════════════
     LIFECYCLE - OnInit
  ════════════════════════════════════════ */
  ngOnInit(): void { }

  /* ════════════════════════════════════════
     LIFECYCLE - AfterViewInit
  ════════════════════════════════════════ */
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
    this.startObjAutoplay();
  }

  /* ════════════════════════════════════════
     LIFECYCLE - OnDestroy
  ════════════════════════════════════════ */
  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
    this.stopObjAutoplay();
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL
  ════════════════════════════════════════ */
  private initScrollReveal(): void {
    const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            this.scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    targets.forEach((el) => this.scrollObserver.observe(el));
  }

  /* ════════════════════════════════════════
     SLIDER OBJECTIFS
  ════════════════════════════════════════ */

  prevObj(): void {
    if (this.activeObjSlide > 0) {
      this.activeObjSlide--;
      this.resetAutoplay();
    }
  }

  nextObj(): void {
    if (this.activeObjSlide < this.formation.objectifs.length - 1) {
      this.activeObjSlide++;
      this.resetAutoplay();
    }
  }

  goToObj(index: number): void {
    this.activeObjSlide = index;
    this.resetAutoplay();
  }

  private startObjAutoplay(): void {
    this.objAutoplay = setInterval(() => {
      this.activeObjSlide =
        (this.activeObjSlide + 1) % this.formation.objectifs.length;
      this.cdr.markForCheck();
    }, 5000);
  }

  private stopObjAutoplay(): void {
    if (this.objAutoplay !== null) {
      clearInterval(this.objAutoplay);
      this.objAutoplay = null;
    }
  }

  private resetAutoplay(): void {
    this.stopObjAutoplay();
    this.startObjAutoplay();
  }

  /* ════════════════════════════════════════
     CAROUSEL PROGRAMME
  ════════════════════════════════════════ */

  setActiveDay(index: number): void {
    this.activeDay = this.activeDay === index ? -1 : index;
  }
}