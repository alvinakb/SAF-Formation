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
  selector: 'app-vocabulaire-professionnel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vocabulaire-professionnel.html',
  styleUrls: ['./vocabulaire-professionnel.css'],
})
export class VocabulaireProfessionnel implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "Oral/Écrit", label: "compétences clés" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Amélioration du vocabulaire professionnel",
    accroche:
      "Le vocabulaire est un marqueur de positionnement professionnel. Un lexique précis, " +
      "une expression orale soignée et une rédaction fluide ouvrent des portes que les " +
      "compétences techniques seules ne suffisent pas à franchir. Cette formation s'attaque " +
      "à l'essentiel : parler et écrire avec aisance dans tous les contextes professionnels.",
    objectifs: [
      "Enrichir son vocabulaire professionnel dans son secteur d'activité.",
      "Structurer sa prise de parole en réunion ou en entretien.",
      "Produire des écrits professionnels corrects et adaptés (emails, comptes rendus, notes).",
      "Réduire les approximations et les anglicismes inappropriés.",
      "Gagner en aisance et en légitimité lors des prises de parole formelles.",
    ],
    publicVise:
      "Tout professionnel souhaitant améliorer son expression orale et écrite : " +
      "personnes en reconversion, salariés en évolution de poste, managers juniors, demandeurs d'emploi.",
    prerequis:
      "Niveau de base en français écrit et oral requis. Formation non adaptée aux publics FLE (Français Langue Étrangère).",
    duree: "14 heures (2 jours) — Présentiel ou distanciel",
    programme: [
      {
        tag: "Jour 1",
        title: "Expression écrite professionnelle",
        desc: [
          "L'email professionnel : objet percutant, formule d'appel, structure, signature",
          "Le compte rendu : objectif, destinataire, synthèse des informations, plans d'action",
          "La note interne : style direct, informations clés, destinataires et diffusion",
          "Orthographe fonctionnelle : les 20 règles essentielles, accords, homophones, conjugaison",
          "Syntaxe claire : phrases courtes, ponctuation, connecteurs logiques",
          "Formules adaptées aux contextes : formuler une demande, un refus, une critique constructive",
          "Chasse aux anglicismes : remplacer 'deadline', 'emailer', 'reporting' par des termes français",
          "Atelier : rédaction et correction collective de documents professionnels",
        ],
      },
      {
        tag: "Jour 2",
        title: "Expression orale et prise de parole",
        desc: [
          "Structure d'un discours : introduction, développement, conclusion percutante",
          "Gestion du stress : techniques de respiration, préparation mentale, ancrage",
          "La reformulation : dire la même chose différemment, clarifier sa pensée",
          "Langage corporel : posture, regard, gestuelle, voix et débit",
          "Le vocabulaire de la nuance : atténuer, renforcer, argumenter sans agresser",
          "S'adapter à son auditoire : hiérarchie, collègues, partenaires, clients",
          "Exercices d'improvisation guidée : pitch, réunion, entretien, réponse à l'improviste",
          "Atelier : exposé oral enregistré et débriefé en groupe",
        ],
      },
    ],
    evaluation: [
      "Exercices écrits corrigés",
      "Exposé oral enregistré et débriefé",
      "Questionnaire de satisfaction des acquis",
      "Attestation de fin de formation",
    ],
    financement: [
      "CPF (Compte Personnel de Formation)",
      "OPCO (Opérateur de Compétences)",
      "Plan de développement des compétences",
      "France Travail (sous conditions)",
    ],
    avantages: [
      "Exercices écrits personnalisés et corrigés individuellement",
      "Exposé oral enregistré avec débriefing personnalisé",
      'Kit "100 mots pour briller en entreprise" offert',
      "Cas pratiques basés sur votre secteur et vos situations réelles",
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