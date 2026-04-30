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
  modalite: string;
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-accueil-client',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil-client.html',
  styleUrls: ['./accueil-client.css'],
})
export class AccueilClient implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "Présentiel", label: "recommandé" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Amélioration des techniques d'accueil client",
    accroche:
      "L'accueil est le premier moment de vérité d'une relation client. En quelques secondes, " +
      "le visiteur ou l'interlocuteur décide de son niveau de confiance. Cette formation donne " +
      "aux équipes les réflexes, les mots et la posture pour que cet instant soit systématiquement positif.",
    objectifs: [
      "Comprendre les enjeux de l'accueil dans la satisfaction et la fidélisation client.",
      "Maîtriser les codes de l'accueil physique et téléphonique.",
      "Adapter sa communication à la diversité des publics accueillis.",
      "Gérer les situations délicates et les clients insatisfaits avec professionnalisme.",
      "Construire une image professionnelle cohérente à chaque point de contact.",
    ],
    publicVise:
      "Agents d'accueil, hôtesses, standardistes, assistants, réceptionnistes, " +
      "toute personne en contact direct avec la clientèle ou le public.",
    prerequis:
      "Aucun prérequis. La formation est accessible aux débutants dans une fonction d'accueil.",
    duree: "14 heures (2 jours) — Présentiel recommandé",
    programme: [
      {
        tag: "Jour 1",
        title: "Les fondamentaux de l'accueil",
        desc: [
          "Image professionnelle : tenue, gestuelle, sourire, regard — l'impact des 7 premières secondes",
          "Communication verbale : formules de politesse, vocabulaire positif, tonalité",
          "Communication non verbale : posture, distance, gestes, expressions faciales",
          "L'écoute active : reformulation, questionnement, prise de notes",
          "Formules clés de l'accueil : dire bonjour, remercier, prendre congé",
          "Accueil physique : premier contact, orientation, prise en charge du visiteur",
          "Accueil téléphonique : art du décroché, filtrage des appels, gestion de l'attente, transfert d'appel",
          "Atelier pratique : jeux de rôle sur l'accueil en présentiel et téléphonique",
        ],
      },
      {
        tag: "Jour 2",
        title: "Situations complexes",
        desc: [
          "Gestion des files d'attente : fluidité, information, gestion de l'impatience",
          "Traitement des réclamations : accueillir la plainte, s'excuser, proposer des solutions",
          "Gestion du stress et des émotions : rester calme face à un interlocuteur agressif",
          "Diversité culturelle : adapter son accueil aux différences culturelles",
          "Accessibilité : accueillir une personne en situation de handicap",
          "Les clients difficiles : typologies et stratégies d'adaptation",
          "Désamorcer les conflits : techniques de communication non violente (CNV)",
          "Mises en situation : ateliers intensifs filmés et débriefés",
        ],
      },
    ],
    evaluation: [
      "Jeux de rôle filmés",
      "Débriefing formatif personnalisé",
      "Grille d'évaluation des attitudes professionnelles",
      "Attestation de fin de formation",
    ],
    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO (Opérateur de Compétences)",
      "Plan de développement des compétences",
      "France Travail (sous conditions)",
    ],
    avantages: [
      "Jeux de rôle filmés avec débriefing personnalisé",
      "Grille d'évaluation des attitudes professionnelles",
      "Cas pratiques basés sur vos situations réelles",
      'Guide "Les 100 phrases gagnantes de l\'accueil" offert',
    ],
    modalite:
      "L'accueil client repose essentiellement sur des compétences comportementales (posture, gestuelle, regard, ton de voix) qui nécessitent des mises en situation réalistes et un feedback immédiat.",
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
      title: "Amélioration du vocabulaire professionnel",
      meta: "Action de formation · 14h · CPF",
      route: "/formations/vocabulaire-professionnel",
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