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

interface Valeur {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-nos-valeurs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nos-valeurs.html',
  styleUrls: ['./nos-valeurs.css'],
})
export class NosValeurs implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroLine1') heroLine1!: ElementRef<HTMLElement>;
  @ViewChild('heroLine2') heroLine2!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('railLine') railLine!: ElementRef<HTMLElement>;

  private scrollObserver!: IntersectionObserver;

  valeurs: Valeur[] = [
    {
      id: 1,
      icon: "",
      title: "L'ancrage dans le réel",
      description: "Aucune formation chez SAF Formation ne part d'un contenu théorique standardisé. Chaque programme démarre d'une analyse des situations professionnelles concrètes que rencontrent nos apprenants. La montée en compétences n'a de sens que si elle s'applique dès le lendemain de la formation."
    },
    {
      id: 2,
      icon: "",
      title: "L'exigence sans compromis",
      description: "Être auditrice Qualiopi, c'est connaître les exigences de l'intérieur. Nous appliquons à nos propres formations les standards que nous évaluons chez d'autres organismes. Résultat : des programmes documentés, évalués et améliorés en continu."
    },
    {
      id: 3,
      icon: "",
      title: "L'accessibilité réelle",
      description: "Nous croyons que la formation professionnelle ne doit pas être un privilège. C'est pourquoi nous travaillons à rendre nos programmes accessibles via tous les dispositifs de financement disponibles, y compris pour les publics les plus éloignés de l'emploi."
    },
    {
      id: 4,
      icon: "",
      title: "La relation humaine",
      description: "Un apprenant n'est pas un dossier. Chaque parcours commence par un entretien approfondi pour comprendre la situation, les freins et les ambitions. Cette relation se prolonge pendant et après la formation."
    },
    {
      id: 5,
      icon: "",
      title: "La transparence",
      description: "Nos tarifs, nos modalités, nos objectifs pédagogiques et nos résultats sont communiqués clairement. Aucune information n'est dissimulée pour déclencher une décision."
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
