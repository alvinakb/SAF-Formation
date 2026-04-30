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

interface Phase {
  number: string;
  title: string;
  duration: string;
  desc: string[];
}

interface Garantie {
  icon: string;
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
  phases: Phase[];
  evaluation: string[];
  financement: string[];
  avantages: string[];
  garanties: Garantie[];
  pourquoi: string[];
  noteFinancement: string;
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-bilan-competences',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bilan-competences.html',
  styleUrls: ['./bilan-competences.css'],
})
export class BilanCompetences implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "24h", label: "maximum" },
    { value: "3-6", label: "mois" },
    { value: "100%", label: "finançable" },
    { value: "Confidentiel", label: "document personnel" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Bilan de compétences",
    accroche:
      "Le bilan de compétences n'est pas une thérapie, ni un simple inventaire de CV. C'est un outil professionnel rigoureux " +
      "qui permet de faire le point, de comprendre ce qu'on veut vraiment, et de tracer un chemin réaliste vers un projet professionnel solide.",
    objectifs: [
      "Analyser ses compétences professionnelles, personnelles et ses aptitudes.",
      "Identifier ses motivations profondes et ses valeurs professionnelles.",
      "Explorer des pistes d'évolution ou de reconversion compatibles avec son profil.",
      "Valider la faisabilité du projet professionnel envisagé.",
      "Construire un plan d'action concret pour la suite.",
    ],
    publicVise:
      "Tout actif (salarié, indépendant, demandeur d'emploi) souhaitant faire le point sur sa situation professionnelle, " +
      "envisager une évolution ou une reconversion, ou préparer la suite de sa carrière.",
    prerequis:
      "Aucun prérequis. Le bilan est accessible à tout actif, quel que soit son secteur ou son niveau de qualification.",
    duree: "24 heures maximum (durée légale) sur une période de 3 à 6 mois. Présentiel et distanciel.",
    phases: [
      {
        number: "01",
        title: "Phase préliminaire",
        duration: "2 heures",
        desc: [
          "Entretien d'analyse de la demande et des besoins",
          "Confirmation de l'engagement et signature de la convention",
          "Présentation détaillée de la méthode et des outils utilisés",
          "Définition des attentes et du cadre du bilan",
        ],
      },
      {
        number: "02",
        title: "Phase d'investigation",
        duration: "18 heures environ",
        desc: [
          "Exploration des compétences professionnelles et personnelles",
          "Identification des valeurs, motivations et centres d'intérêt",
          "Analyse des aptitudes et des talents cachés",
          "Exploration des pistes d'évolution ou de reconversion",
          "Entretiens individuels et outils d'auto-positionnement",
          "Tests et questionnaires professionnels",
          "Recherche documentaire sur les métiers et formations",
        ],
      },
      {
        number: "03",
        title: "Phase de conclusion",
        duration: "4 heures environ",
        desc: [
          "Synthèse des résultats et des apprentissages du bilan",
          "Formalisation du projet professionnel",
          "Construction d'un plan d'action réaliste et chiffré",
          "Identification des formations ou certifications nécessaires",
          "Remise du document de synthèse (confidentiel et personnel)",
          "Entretien de suivi à 6 mois",
        ],
      },
    ],
    evaluation: [
      "Évaluation qualitative à chaque étape par le consultant",
      "Entretien de synthèse à 6 mois",
      "Document de synthèse confidentiel",
    ],
    financement: [
      "CPF (Compte Personnel de Formation) — Code NSF selon certification",
      "OPCO (Opérateur de Compétences) — Plan de développement",
      "France Travail (sous conditions)",
      "Auto-financement (possibilité de paiement échelonné)",
    ],
    avantages: [
      "Tests professionnels et outils validés scientifiquement",
      "Document de synthèse détaillé et opérationnel",
      "Mise en relation avec des formations certifiantes",
      "Aide à la constitution des dossiers de financement",
    ],
    garanties: [
      { icon: "", title: "Confidentialité totale", desc: "Le document de synthèse est remis uniquement au bénéficiaire." },
      { icon: "", title: "Méthodologie éprouvée", desc: "Notre approche est reconnue et respecte le cadre légal du bilan de compétences." },
      { icon: "", title: "Accompagnement personnalisé", desc: "Un consultant dédié tout au long de votre bilan." },
      { icon: "", title: "Suivi à 6 mois", desc: "Un entretien gratuit pour faire le point sur la mise en œuvre de votre plan d'action." },
    ],
    pourquoi: [
      "Faire le point sur son parcours et ses compétences",
      "Envisager une évolution ou une reconversion",
      "Préparer un projet de création d'entreprise",
      "Retrouver du sens dans son travail",
      "Reprendre confiance en ses capacités",
      "Préparer la suite de sa carrière",
    ],
    noteFinancement: "⚠️ Le bilan de compétences ne peut être imposé par l'employeur : il relève de l'initiative du salarié.",
  };

  /* ════════════════════════════════════════
     DONNÉES — AUTRES FORMATIONS
  ════════════════════════════════════════ */
  autresFormations: AutreFormation[] = [
    {
      title: "Accompagnement VAE",
      meta: "VAE · 24h · CPF",
      route: "/formations/vae",
    },
    {
      title: "Stratégies des techniques de vente",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/techniques-vente",
    },
    {
      title: "Maîtrise des stratégies de communication",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/strategies-communication",
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