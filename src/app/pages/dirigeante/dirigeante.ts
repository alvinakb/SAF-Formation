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

interface Expertise {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-dirigeante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dirigeante.html',
  styleUrls: ['./dirigeante.css'],
})
export class Dirigeante implements OnInit, AfterViewInit, OnDestroy {
  /* ── ViewChild refs ── */
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroEyebrow') heroEyebrow!: ElementRef<HTMLElement>;
  @ViewChild('heroLine1') heroLine1!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('heroScroll') heroScroll!: ElementRef<HTMLElement>;
  @ViewChild('railLine') railLine!: ElementRef<HTMLElement>;
  @ViewChild('statsBar') statsBar!: ElementRef<HTMLElement>;

  /* ── Observer ── */
  private scrollObserver!: IntersectionObserver;

  /* ════════════════════════════════════════
     DONNÉES — STATS BAR
  ════════════════════════════════════════ */
  stats: Stat[] = [
    { value: "Niv. 7", label: "Master ingénierie formation" },
    { value: "Qualiopi", label: "Auditrice certifiée" },
    { value: "10+", label: "ans d'expérience" },
    { value: "100%", label: "sur-mesure" },
  ];

  /* ════════════════════════════════════════
     DONNÉES — EXPERTISE
  ════════════════════════════════════════ */
  expertises: Expertise[] = [
    {
      icon: "",
      title: "Master en ingénierie de la formation",
      description: "Diplôme de niveau 7. Expertise en conception et pilotage de dispositifs de formation professionnelle.",
    },
    {
      icon: "",
      title: "Auditrice Qualiopi certifiée",
      description: "Maîtrise complète du Référentiel National Qualité. Garantie d'une démarche qualité rigoureuse et conforme.",
    },
    {
      icon: "",
      title: "Plus de 10 ans d'expérience",
      description: "Accompagnement  de stagiaires et d'entreprises dans le développement de leurs compétences clés.",
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