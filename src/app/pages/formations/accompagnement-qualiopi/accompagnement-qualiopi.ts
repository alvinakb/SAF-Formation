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

interface Service {
  number: string;
  title: string;
  description: string[];
}

interface Formation {
  titre: string;
  accroche: string;
  publicConcerne: string[];
  services: Service[];
  avantages: string[];
  prerequis: string;
  duree: string;
  modalite: string;
  financement: string;
  pourquoi: string;
}

interface AutreFormation {
  title: string;
  meta: string;
  route: string;
}

@Component({
  selector: 'app-accompagnement-qualiopi',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accompagnement-qualiopi.html',
  styleUrls: ['./accompagnement-qualiopi.css'],
})
export class AccompagnementQualiopi implements OnInit, AfterViewInit, OnDestroy {
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
    { value: "Qualiopi", label: "certifiée" },
    { value: "100%", label: "terrain" },
    { value: "Sur-mesure", label: "accompagnement" },
    { value: "32", label: "indicateurs RNQ" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — FORMATION
  ════════════════════════════════════════ */
  formation: Formation = {
    titre: "Accompagnement Qualiopi",
    accroche:
      "Créer un organisme de formation, obtenir la certification Qualiopi, déclarer son activité, mettre en place les bons outils : ces démarches sont complexes quand on les fait pour la première fois. SAF Formation les a toutes traversées. Elle vous accompagne avec une connaissance terrain que les consultants théoriques n'ont pas.",
    publicConcerne: [
      "Organismes de formation en cours de création souhaitant être certifiés Qualiopi dès le départ",
      "Organismes de formation existants souhaitant obtenir ou renouveler leur certification",
      "Structures souhaitant déclarer leur activité auprès de la DREETS (obtention du NDA)",
      "Organismes voulant créer ou mettre aux normes leur site internet",
      "Structures souhaitant déployer Digiforma ou un logiciel de gestion des formations",
    ],
    services: [
      {
        number: "01",
        title: "Site internet Qualiopi",
        description: [
          "Création d'un site conforme aux exigences du RNQ",
          "Mentions obligatoires et pages formations structurées",
          "Accessibilité PSH et conformité RGPD",
        ],
      },
      {
        number: "02",
        title: "NDA : Déclaration d'activité DREETS",
        description: [
          "Constitution et dépôt du dossier auprès de la DREETS de votre région",
          "Suivi jusqu'à l'obtention du numéro de déclaration d'activité",
        ],
      },
      {
        number: "03",
        title: "Mise en place Digiforma",
        description: [
          "Paramétrage complet du logiciel",
          "Formation à la prise en main",
          "Organisation des dossiers stagiaires et des documents réglementaires",
        ],
      },
      {
        number: "04",
        title: "Documents réglementaires",
        description: [
          "Rédaction de l'ensemble des documents requis par Qualiopi",
          "Livret d'accueil, règlement intérieur de la formation",
          "Conventions, attestations de présence et de fin de formation",
          "Livret PSH",
        ],
      },
      {
        number: "05",
        title: "Audit et préparation Qualiopi",
        description: [
          "Audit à blanc complet sur les 32 indicateurs du RNQ",
          "Identification des écarts",
          "Constitution du dossier de preuves",
          "Préparation à l'entretien auditeur",
        ],
      },
      {
        number: "06",
        title: "Personnalisation sur mesure",
        description: [
          "Chaque accompagnement est conçu selon votre secteur",
          "Adapté à votre structure juridique et l'état d'avancement de votre projet",
          "Aucun pack standard",
        ],
      },
    ],
    avantages: [
      "SAF Formation est elle-même certifiée Qualiopi",
      "Expérience directe des exigences réelles des auditeurs",
      "Connaissance des délais administratifs et des pièges courants à éviter",
      "Accompagnement personnalisé sans pack standard",
    ],
    prerequis: "Aucun. L'accompagnement s'adapte à votre situation, que vous partiez de zéro ou que vous soyez déjà en activité.",
    duree: "Sur devis, selon le périmètre retenu. Une réunion de cadrage gratuite est organisée avant toute proposition commerciale.",
    modalite: "Distanciel ou présentiel selon les besoins et la localisation.",
    financement: "Accompagnement facturé sur devis. Selon votre statut, une prise en charge OPCO peut être envisagée. À étudier lors du cadrage.",
    pourquoi: "SAF Formation est elle-même certifiée Qualiopi. Cet accompagnement ne repose pas sur des grilles théoriques mais sur une expérience directe des exigences réelles des auditeurs, des délais administratifs et des pièges courants à éviter.",
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
      title: "Accompagnement VAE",
      meta: "VAE · 24h · CPF",
      route: "/formations/vae",
    },
    {
      title: "Stratégies des techniques de vente",
      meta: "Action de formation · 21h · CPF",
      route: "/formations/techniques-vente",
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
