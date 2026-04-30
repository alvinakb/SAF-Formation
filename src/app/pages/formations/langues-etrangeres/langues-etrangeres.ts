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

interface ProgrammePhase {
  tag: string;
  title: string;
  desc: string[];
}

interface Niveau {
  badge: string;
  title: string;
  duree: string;
  desc: string;
}

interface Certification {
  name: string;
  description: string;
  icon: string;
}

interface Formation {
  titre: string;
  accroche: string;
  objectifs: string[];
  publicVise: string;
  prerequis: string;
  duree: string;
  programme: ProgrammePhase[];
  evaluation: string[];
  financement: string[];
  avantages: string[];
  langues: string[];
  niveaux: Niveau[];
  certifications: Certification[];
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-langues-etrangeres',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './langues-etrangeres.html',
  styleUrls: ['./langues-etrangeres.css'],
})
export class LanguesEtrangeres implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "21-35h", label: "de formation" },
    { value: "3-5", label: "jours" },
    { value: "A2→C1", label: "niveaux" },
    { value: "TOEIC", label: "certifiable" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Remise à niveau en langues étrangères",
    accroche:
      "Les compétences linguistiques rouillées freinent les carrières et ferment des marchés. " +
      "Cette formation remet en mouvement les acquis dormants pour retrouver une aisance opérationnelle : " +
      "comprendre, se faire comprendre et rédiger en contexte professionnel.",
    objectifs: [
      "Réactiver les bases grammaticales et lexicales de la langue cible.",
      "Comprendre et produire des documents professionnels courants.",
      "Communiquer à l'oral en situation de travail (réunions, appels, emails).",
      "Acquérir un vocabulaire métier adapté au secteur de l'apprenant.",
      "Gagner en confiance pour utiliser la langue en contexte réel.",
    ],
    publicVise:
      "Salariés et demandeurs d'emploi dont la langue étrangère a été peu pratiquée et qui ont besoin de la remettre à niveau dans un contexte professionnel.",
    prerequis:
      "Avoir étudié la langue cible (au moins 2 ans d'apprentissage antérieur). Cette formation n'est pas un cours pour grands débutants.",
    duree: "21 à 35 heures selon le niveau et les objectifs (3 à 5 jours) — Présentiel ou distanciel",
    programme: [
      {
        tag: "Phase 1",
        title: "Test de positionnement et diagnostic individualisé",
        desc: [
          "Évaluation initiale des compétences (écoute, lecture, production écrite et orale)",
          "Identification des lacunes prioritaires (grammaire, vocabulaire, prononciation)",
          "Définition d'un parcours personnalisé et d'objectifs mesurables",
          "Entretien individuel avec le formateur",
        ],
      },
      {
        tag: "Phase 2",
        title: "Remise à niveau grammaticale et lexicale",
        desc: [
          "Révision ciblée sur les lacunes identifiées (temps, structures, prépositions...)",
          "Enrichissement lexical : les 500 mots et expressions indispensables",
          "Pièges à éviter et faux-amis",
          "Exercices interactifs et auto-évaluations",
        ],
      },
      {
        tag: "Phase 3",
        title: "Communication professionnelle",
        desc: [
          "Rédaction d'emails professionnels : formules, structure, ton",
          "Compréhension de documents : articles, rapports, fiches techniques",
          "Expression orale en réunion : prise de parole, argumentation, reformulation",
          "Gestion des appels téléphoniques et des visioconférences",
        ],
      },
      {
        tag: "Phase 4",
        title: "Pratique intensive en contexte métier",
        desc: [
          "Simulations de situations réelles (présentation, négociation, entretien)",
          "Jeux de rôle avec retour personnalisé",
          "Mises en situation spécifiques à votre secteur",
          "Préparation à la certification (TOEIC, Bright Language, etc.)",
        ],
      },
    ],
    evaluation: [
      "Test initial et test final de positionnement",
      "Production écrite et orale évaluées",
      "Auto-évaluation des progrès",
      "Attestation de fin de formation",
    ],
    financement: [
      "CPF (Compte Personnel de Formation) — Éligible TOEIC/Bright Language",
      "OPCO (Opérateur de Compétences)",
      "Plan de développement des compétences",
      "France Travail (sous conditions)",
    ],
    avantages: [
      "Parcours 100% personnalisé après test de positionnement",
      "Vocabulaire métier spécifique à votre secteur",
      "Mises en situation professionnelles filmées",
      "Certification possible (TOEIC, Bright Language)",
    ],
    langues: ["🇬🇧 Anglais", "🇪🇸 Espagnol", "🇩🇪 Allemand", "🇮🇹 Italien", "🇵🇹 Portugais"],
    niveaux: [
      {
        badge: "A2 → B1",
        title: "Remise à niveau élémentaire",
        duree: "21h (3 jours)",
        desc: "Pour ceux qui comprennent des phrases simples mais peinent à s'exprimer couramment.",
      },
      {
        badge: "B1 → B2",
        title: "Perfectionnement opérationnel",
        duree: "28h (4 jours)",
        desc: "Pour passer à l'aisance en réunion et email professionnel.",
      },
      {
        badge: "B2 → C1",
        title: "Maîtrise avancée",
        duree: "35h (5 jours)",
        desc: "Pour atteindre l'autonomie et la fluidité en contexte complexe.",
      },
    ],
    certifications: [
      {
        name: "TOEIC (Listening & Reading)",
        description: "Certification reconnue internationalement pour l'anglais professionnel. Score de 10 à 990 points.",
        icon: "",
      },
      {
        name: "Bright Language",
        description: "Certification pour l'anglais, l'espagnol, l'allemand, l'italien, le portugais. Niveaux A1 à C1.",
        icon: "",
      },
      {
        name: "LinguaSkill / CLES",
        description: "Certifications complémentaires possibles selon vos objectifs.",
        icon: "",
      },
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
      title: "Marketing digital et réseaux sociaux",
      meta: "Action de formation · 14h · CPF",
      route: "/formations/marketing-digital",
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