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
  desc: string[];
}

interface TimelineStep {
  number: number;
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
  timeline: TimelineStep[];
  certificationsExemples: string[];
  noteFinancement: string;
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-vae',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vae.html',
  styleUrls: ['./vae.css'],
})
export class Vae implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "24h", label: "d'accompagnement" },
    { value: "6", label: "mois max" },
    { value: "100%", label: "finançable" },
    { value: "RNCP", label: "certifiable" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Accompagnement VAE",
    accroche:
      "L'expérience a de la valeur. La VAE permet de la faire reconnaître officiellement, en obtenant tout ou partie " +
      "d'une certification professionnelle sans reprendre un cursus de formation classique. SAF Formation accompagne " +
      "chaque candidat à toutes les étapes de ce parcours souvent sous-estimé.",
    objectifs: [
      "Comprendre le dispositif VAE et identifier la certification visée.",
      "Analyser son expérience professionnelle et personnelle au regard du référentiel de la certification.",
      "Rédiger un dossier de recevabilité (livret 1) solide et convaincant.",
      "Construire le dossier de preuves (livret 2) démontrant la maîtrise des compétences requises.",
      "Se préparer à l'entretien avec le jury de validation.",
    ],
    publicVise:
      "Toute personne justifiant d'au moins un an d'expérience professionnelle, bénévole ou associative en rapport avec la certification visée, souhaitant faire valider ses acquis.",
    prerequis:
      "Aucun prérequis de formation. L'éligibilité à la VAE nécessite 12 mois d'expérience dans le domaine de la certification visée (continus ou discontinus).",
    duree: "24 heures maximum sur une période de 6 mois maximum (durée légale encadrant le dispositif). Distanciel principalement, points de suivi en présentiel.",
    phases: [
      {
        number: "01",
        title: "Phase préliminaire",
        desc: [
          "Entretien d'orientation et d'information sur la VAE",
          "Identification de la certification adaptée à votre profil",
          "Vérification de l'éligibilité (12 mois d'expérience minimum)",
          "Choix du certificateur et du référentiel de certification",
          "Dépôt du dossier de recevabilité (livret 1)",
          "Accompagnement à la rédaction du livret 1",
        ],
      },
      {
        number: "02",
        title: "Phase d'investigation",
        desc: [
          "Analyse approfondie de votre expérience professionnelle",
          "Mise en correspondance avec les compétences du référentiel",
          "Identification des preuves à apporter (réalisations, documents, attestations)",
          "Construction progressive du livret 2 (dossier de preuves)",
          "Relecture et correction des premières versions",
          "Validation des compétences acquises et des axes de progression",
        ],
      },
      {
        number: "03",
        title: "Phase de conclusion",
        desc: [
          "Finalisation et relecture finale du livret 2",
          "Préparation à l'entretien avec le jury",
          "Simulation d'entretien jury enregistrée et débriefée",
          "Techniques de présentation et de défense de son dossier",
          "Remise du document de synthèse",
          "Suivi post-jury et accompagnement en cas de validation partielle",
        ],
      },
    ],
    evaluation: [
      "Suivi de l'avancement à chaque étape",
      "Relecture et correction du livret 2",
      "Simulation d'entretien jury enregistrée et débriefée",
      "Attestation d'accompagnement VAE",
    ],
    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO (Opérateur de Compétences) — Plan de développement",
      "France Travail (AIF, PTP, aide individuelle)",
      "Auto-financement (possibilité de paiement échelonné)",
    ],
    avantages: [
      "Relecture et correction du livret 2 incluse",
      "Simulation d'entretien jury enregistrée",
      "Suivi personnalisé tout au long du parcours",
      "Aide à la recherche de documentation et de preuves",
    ],
    timeline: [
      { number: 1, title: "Information et orientation", desc: "Comprendre le dispositif et choisir la bonne certification" },
      { number: 2, title: "Dépôt de la demande de recevabilité (livret 1)", desc: "Présenter son parcours et justifier de son expérience" },
      { number: 3, title: "Accompagnement à la construction du livret 2", desc: "Démontrer la maîtrise des compétences du référentiel" },
      { number: 4, title: "Entretien avec le jury", desc: "Présenter son dossier et répondre aux questions" },
      { number: 5, title: "Validation totale ou partielle", desc: "Obtention du diplôme ou des blocs de compétences" },
    ],
    certificationsExemples: ["Management", "RH", "Comptabilité", "Commerce", "Social", "Santé", "Bâtiment"],
    noteFinancement: "⚠️ Les frais d'inscription au certificateur (dépôt de dossier, passage devant le jury) ne sont pas inclus dans nos honoraires d'accompagnement.",
  };

  /* ════════════════════════════════════════
     DONNÉES — AUTRES FORMATIONS
  ════════════════════════════════════════ */
  autresFormations: AutreFormation[] = [
    {
      title: "Bilan de compétences",
      meta: "Bilan · 24h · CPF",
      route: "/formations/bilan-competences",
    },
    {
      title: "Stratégies des techniques de vente",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/techniques-vente",
    },
    {
      title: "Marketing digital et réseaux sociaux",
      meta: "Action de formation · 14h · CPF",
      route: "/formations/marketing-digital",
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