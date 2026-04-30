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

interface Dispositif {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaExternal: boolean;
  icon: string;
}

@Component({
  selector: 'app-financement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './financement.html',
  styleUrls: ['./financement.css'],
})
export class Financement implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroLine1') heroLine1!: ElementRef<HTMLElement>;
  @ViewChild('heroLine2') heroLine2!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('railLine') railLine!: ElementRef<HTMLElement>;

  private scrollObserver!: IntersectionObserver;

  dispositifs: Dispositif[] = [
    {
      id: "cpf",
      title: "Le Compte Personnel de Formation",
      description: "Chaque salarié et demandeur d'emploi accumule des droits à la formation tout au long de sa carrière professionnelle. Ces droits sont mobilisables sur Mon Compte Formation pour financer une formation certifiante ou qualifiante. Plusieurs de nos programmes sont directement référencés sur la plateforme.",
      ctaText: "Vérifier mes droits CPF",
      ctaLink: "https://www.moncompteformation.gouv.fr",
      ctaExternal: true,
      icon: ""
    },
    {
      id: "opco",
      title: "Le financement via votre OPCO",
      description: "Si vous êtes salarié, votre entreprise cotise à un Opérateur de Compétences (OPCO) selon son secteur d'activité. Cet organisme peut financer tout ou partie de votre formation dans le cadre du plan de développement des compétences. SAF Formation vous accompagne dans les démarches de prise en charge.",
      ctaText: "Nous contacter pour un accompagnement OPCO",
      ctaLink: "/contact",
      ctaExternal: false,
      icon: ""
    },
    {
      id: "francetravail",
      title: "France Travail et FAFCEA",
      description: "Les demandeurs d'emploi indemnisés peuvent bénéficier d'un financement de France Travail sous réserve d'éligibilité. Les travailleurs indépendants peuvent quant à eux solliciter le FAFCEA pour financer leur parcours de formation. SAF Formation peut vous orienter vers le dispositif adapté à votre statut.",
      ctaText: "Nous contacter pour être orienté",
      ctaLink: "/contact",
      ctaExternal: false,
      icon: ""
    },
    {
      id: "entreprise",
      title: "Financement entreprise — Plan de développement des compétences",
      description: "Les entreprises peuvent financer les formations de leurs collaborateurs via le plan de développement des compétences, en lien avec leur OPCO. SAF Formation établit devis, conventions et documents de suivi conformes aux exigences des financeurs.",
      ctaText: "Demander un devis entreprise",
      ctaLink: "/contact",
      ctaExternal: false,
      icon: ""
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initScrollReveal();
  }

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

  ngOnDestroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
}