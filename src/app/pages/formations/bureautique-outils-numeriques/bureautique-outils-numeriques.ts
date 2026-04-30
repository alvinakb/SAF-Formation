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

interface ProgrammeModule {
  tag: string;
  title: string;
  subtitle: string;
  desc: string[];
}

interface Formation {
  titre: string;
  accroche: string;
  objectifs: string[];
  publicVise: string;
  prerequis: string;
  duree: string;
  programme: ProgrammeModule[];
  evaluation: string[];
  financement: string[];
  niveaux: { niveau: string; titre: string; duree: string; desc: string }[];
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-bureautique-outils-numeriques',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bureautique-outils-numeriques.html',
  styleUrls: ['./bureautique-outils-numeriques.css'],
})
export class BureautiqueOutilsNumeriques implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "14-28h", label: "de formation" },
    { value: "4", label: "modules" },
    { value: "100%", label: "finançable" },
    { value: "TOSA", label: "certifiable" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Bureautique et outils numériques",
    accroche:
      "La maîtrise des outils bureautiques conditionne directement la productivité quotidienne. " +
      "Cette formation outille les participants pour gagner en autonomie et en efficacité sur " +
      "les logiciels qu'ils utilisent chaque jour, sans détours inutiles.",
    objectifs: [
      "Maîtriser les fonctionnalités essentielles et avancées de la suite bureautique (traitement de texte, tableur, présentation).",
      "Organiser et gérer sa messagerie professionnelle de façon efficace.",
      "Utiliser les outils collaboratifs en ligne.",
      "Produire des documents professionnels de qualité.",
      "Gagner en autonomie numérique dans un environnement de travail moderne.",
    ],
    publicVise:
      "Tout salarié ou demandeur d'emploi souhaitant renforcer ses compétences numériques bureautiques, quel que soit son secteur d'activité.",
    prerequis:
      "Savoir utiliser un ordinateur et naviguer sur internet. Aucun niveau avancé requis.",
    duree: "14 à 28 heures selon le niveau de départ (2 à 4 jours) — Présentiel ou distanciel",
    programme: [
      {
        tag: "Module 1",
        title: "Traitement de texte",
        subtitle: "Word / Google Docs / LibreOffice",
        desc: [
          "Maîtrise de l'interface et des paramètres de base",
          "Mise en forme avancée : polices, paragraphes, listes, tableaux",
          "Utilisation des styles et des modèles de documents",
          "Insertion d'images, formes, graphiques et objets",
          "Réalisation de publipostage (fusion de courriers, étiquettes)",
          "Création de documents longs (rapports, mémoires, brochures)",
          "Atelier : création d'un document professionnel complet",
        ],
      },
      {
        tag: "Module 2",
        title: "Tableur",
        subtitle: "Excel / Google Sheets / LibreOffice Calc",
        desc: [
          "Structure et organisation d'un tableau de données",
          "Formules essentielles (SOMME, MOYENNE, SI, RECHERCHEV)",
          "Références absolues et relatives",
          "Création de graphiques professionnels",
          "Tableaux croisés dynamiques (TCD)",
          "Filtres, tris et mise en forme conditionnelle",
          "Atelier : création d'un tableau de bord de suivi",
        ],
      },
      {
        tag: "Module 3",
        title: "Présentation",
        subtitle: "PowerPoint / Google Slides / Prezi",
        desc: [
          "Structurer une présentation percutante",
          "Choix des templates, couleurs et typographies",
          "Animations sobres et transitions efficaces",
          "Insertion de médias (images, vidéos, audios)",
          "Création de masques et de modèles personnalisés",
          "Préparer une présentation pour différents supports",
          "Atelier : création d'une présentation impactante",
        ],
      },
      {
        tag: "Module 4",
        title: "Outils collaboratifs et messagerie",
        subtitle: "Outlook, Gmail, Teams, Zoom, Drive, SharePoint",
        desc: [
          "Organisation de sa messagerie (dossiers, règles, signatures)",
          "Gestion des contacts et des listes de diffusion",
          "Calendrier partagé et planification de réunions",
          "Stockage cloud et partage de fichiers (Drive, OneDrive)",
          "Outils de réunion en ligne (Teams, Zoom, Meet)",
          "Collaboration en temps réel sur documents",
          "Atelier : organisation d'un projet collaboratif",
        ],
      },
    ],
    evaluation: [
      "Exercices pratiques sur logiciels",
      "Production d'un document final (dossier complet)",
      "Auto-évaluation des compétences",
      "Certification TOSA possible (optionnelle)",
    ],
    financement: [
      "CPF (Compte Personnel de Formation) — Éligible TOSA",
      "OPCO (Opérateur de Compétences)",
      "France Travail (AIF, PTP)",
      "Plan de développement des compétences",
    ],
    niveaux: [
      {
        niveau: "Initiation",
        titre: "Niveau Initiation",
        duree: "14 heures (2 jours)",
        desc: "Pour les débutants et personnes souhaitant acquérir les bases essentielles.",
      },
      {
        niveau: "Perfectionnement",
        titre: "Niveau Perfectionnement",
        duree: "21 heures (3 jours)",
        desc: "Pour les utilisateurs réguliers souhaitant gagner en efficacité.",
      },
      {
        niveau: "Avancé",
        titre: "Niveau Avancé",
        duree: "28 heures (4 jours)",
        desc: "Pour les utilisateurs confirmés visant la maîtrise complète.",
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
      title: "Maîtrise des stratégies de communication",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/strategies-communication",
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