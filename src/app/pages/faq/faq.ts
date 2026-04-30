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

interface Question {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css'],
})
export class Faq implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroLine1') heroLine1!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('railLine') railLine!: ElementRef<HTMLElement>;

  private scrollObserver!: IntersectionObserver;

  questions: Question[] = [
    {
      id: 1,
      question: "Qu'est-ce que la certification Qualiopi et pourquoi est-ce important ?",
      answer: "La certification Qualiopi est délivrée par l'État français aux organismes de formation dont les pratiques répondent aux exigences du Référentiel National Qualité. Elle est obligatoire pour accéder aux financements publics (CPF, OPCO, France Travail). SAF Formation est certifié Qualiopi au titre des catégories : action de formation, VAE et bilan de compétences.",
      isOpen: false
    },
    {
      id: 2,
      question: "Mes formations sont-elles finançables à 100% ?",
      answer: "Dans de nombreux cas, oui. Le financement dépend de votre situation (salarié, demandeur d'emploi, travailleur indépendant) et du dispositif activé. Contactez-nous : nous analysons votre situation et identifions le mode de financement le plus adapté, sans frais.",
      isOpen: false
    },
    {
      id: 3,
      question: "Les formations se déroulent-elles en présentiel ou en distanciel ?",
      answer: "SAF Formation propose les deux modalités selon les programmes et les besoins des apprenants. Les conditions de chaque formation (présentiel, distanciel ou mixte) sont précisées sur chaque fiche programme.",
      isOpen: false
    },
    {
      id: 4,
      question: "Quelle est la durée d'une formation ?",
      answer: "La durée varie selon le programme. Elle est indiquée sur chaque fiche formation. Pour les bilans de compétences et les VAE, des durées légales encadrent le dispositif.",
      isOpen: false
    },
    {
      id: 5,
      question: "Comment se déroule un bilan de compétences ?",
      answer: "Le bilan de compétences se déroule en 3 phases réglementaires : une phase préliminaire d'analyse de la demande, une phase d'investigation pour explorer vos compétences, aptitudes et motivations, et une phase de conclusion avec remise d'un document de synthèse. Il dure au maximum 24 heures sur une période ne pouvant excéder 6 mois.",
      isOpen: false
    },
    {
      id: 6,
      question: "Qu'est-ce que la VAE ?",
      answer: "La Validation des Acquis de l'Expérience permet d'obtenir une certification professionnelle reconnue sur la base de votre expérience, sans passer par un cursus de formation classique. SAF Formation vous accompagne à toutes les étapes du parcours VAE.",
      isOpen: false
    },
    {
      id: 7,
      question: "Comment démarrer ?",
      answer: "Remplissez le formulaire de contact ou envoyez-nous un email à contact@saf-formation.fr. Nous vous répondons dans les 48 heures avec un premier entretien d'orientation gratuit.",
      isOpen: false
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

  toggleQuestion(question: Question): void {
    question.isOpen = !question.isOpen;
  }

  ngOnDestroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
}
