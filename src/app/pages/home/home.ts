import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ElementRef, ViewChild, Inject, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare const gsap: any;
declare const ScrollTrigger: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {

  // ────────────────────────────────────────────────────────────────
  // VIEW REFS
  // ────────────────────────────────────────────────────────────────
  @ViewChild('heroSection')       heroSection!:       ElementRef<HTMLElement>;
  @ViewChild('grainCanvas')       grainCanvas!:       ElementRef<HTMLCanvasElement>;
  @ViewChild('railLine')          railLine!:          ElementRef<HTMLElement>;
  @ViewChild('railYear')          railYear!:          ElementRef<HTMLElement>;
  @ViewChild('heroKicker')        heroKicker!:        ElementRef<HTMLElement>;
  @ViewChild('heroLine1')         heroLine1!:         ElementRef<HTMLElement>;
  @ViewChild('heroLine2')         heroLine2!:         ElementRef<HTMLElement>;
  @ViewChild('heroLine3')         heroLine3!:         ElementRef<HTMLElement>;
  @ViewChild('heroSub')           heroSub!:           ElementRef<HTMLElement>;
  @ViewChild('heroActions')       heroActions!:       ElementRef<HTMLElement>;
  @ViewChild('heroMetrics')       heroMetrics!:       ElementRef<HTMLElement>;
  @ViewChild('heroScroll')        heroScrollEl!:      ElementRef<HTMLElement>;
  @ViewChild('heroTicker')        heroTicker!:        ElementRef<HTMLElement>;

  @ViewChild('formationsSection') formationsSection!: ElementRef<HTMLElement>;
  @ViewChild('formationsHeader')  formationsHeader!:  ElementRef<HTMLElement>;
  @ViewChild('formationsEyebrow') formationsEyebrow!: ElementRef<HTMLElement>;
  @ViewChild('formationsTitle')   formationsTitle!:   ElementRef<HTMLElement>;
  @ViewChild('formationsLead')    formationsLead!:    ElementRef<HTMLElement>;
  @ViewChild('filtersContainer')  filtersContainer!:  ElementRef<HTMLElement>;
  @ViewChild('activeBar')         activeBar!:         ElementRef<HTMLElement>;
  @ViewChild('sliderContainer')   sliderContainer!:   ElementRef<HTMLElement>;
  @ViewChild('sliderWrapper')     sliderWrapper!:     ElementRef<HTMLElement>;
  @ViewChild('sliderTrack')       sliderTrack!:       ElementRef<HTMLElement>;
  @ViewChild('progressBar')       progressBar!:       ElementRef<HTMLElement>;

  @ViewChild('qualiopiSection')   qualiopiSection!:   ElementRef<HTMLElement>;

  @ViewChild('dirigeanteSection') dirigeanteSection!: ElementRef<HTMLElement>;
  @ViewChild('dirVisual')         dirVisual!:         ElementRef<HTMLElement>;
  @ViewChild('dirPhoto')          dirPhoto!:          ElementRef<HTMLImageElement>;
  @ViewChild('dirCredsCard')      dirCredsCard!:      ElementRef<HTMLElement>;
  @ViewChild('dirEyebrow')        dirEyebrow!:        ElementRef<HTMLElement>;
  @ViewChild('dirTitle')          dirTitle!:          ElementRef<HTMLElement>;
  @ViewChild('dirQuote')          dirQuote!:          ElementRef<HTMLElement>;
  @ViewChild('dirBody')           dirBody!:           ElementRef<HTMLElement>;
  @ViewChild('dirCta')            dirCta!:            ElementRef<HTMLElement>;

  // ────────────────────────────────────────────────────────────────
  // DATA
  // ────────────────────────────────────────────────────────────────
  stats = [
    { number: '+10 ans',          label: "d'expertise terrain" },
    { number: '3',                label: 'dispositifs certifiés Qualiopi' },
    { number: '100%',             label: 'ancrage réalité pro' },
    { number: 'CPF · OPCO · FT', label: 'financements disponibles' },
  ];

  formations = [
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Maîtrise des stratégies de communication',
      desc: 'Construire une communication structurée, cohérente et percutante.',
      badge: 'Éligible CPF',
      route: '/formations/strategies-communication',
      image: '../../../assets/images/Communication.png',
      location: 'Paris · Distanciel',
      duration: '3 jours (21h)',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Stratégies des techniques de vente',
      desc: "Structurer un entretien de vente de la prise de contact à la conclusion.",
      badge: 'Éligible CPF',
      route: '/formations/techniques-vente',
      image: '../../../assets/images/Vente.png',
      location: 'Paris · Distanciel',
      duration: '4 jours (28h)',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Bureautique et outils numériques',
      desc: 'Gagner en autonomie et efficacité sur les outils du quotidien.',
      route: '/formations/bureautique-outils-numeriques',
      image: '../../../assets/images/Bureautique.png',
      location: 'Paris · Distanciel',
      duration: '2 jours (14h)',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      categoryLabel: 'Action de formation',
      title: 'Accueil client professionnel',
      desc: 'Les réflexes, les mots et la posture pour un accueil systématiquement positif.',
      badge: 'Éligible CPF',
      route: '/formations/accueil-client',
      image: '../../../assets/images/Acceuil.png',
      location: 'Paris · Distanciel',
      duration: '2 jours (14h)',
    },
    {
      category: 'BILAN DE COMPÉTENCES',
      categoryLabel: 'Bilan de compétences',
      title: 'Bilan de compétences',
      desc: 'Clarifier vos compétences, aptitudes et motivations pour construire votre projet.',
      badge: 'CPF · France Travail',
      route: '/formations/bilan-competences',
      image: '../../../assets/images/Bilan.png',
      location: 'Paris · Distanciel',
      duration: '24h individualisé',
    },
    {
      category: 'VAE',
      categoryLabel: 'VAE',
      title: 'Accompagnement VAE',
      desc: "Obtenez une certification reconnue à partir de votre expérience professionnelle.",
      badge: 'Prise en charge OPCO',
      route: '/formations/vae',
      image: '../../../assets/images/Vae.png',
      location: 'Paris · Distanciel',
      duration: 'Accompagnement individualisé',
    },
  ];

  categories = [
    { id: 'all',                    label: 'TOUS' },
    { id: 'ACTION DE FORMATION · CPF', label: 'ACTION DE FORMATION' },
    { id: 'BILAN DE COMPÉTENCES',   label: 'BILAN' },
    { id: 'VAE',                    label: 'VAE' },
  ];

  dirigeanteBadges = ['Master Niveau 7', 'Auditrice Qualiopi', "+10 ans d'expérience"];

  tickerItems = [
    'CPF', 'OPCO', 'France Travail', 'Qualiopi',
    'VAE', 'Bilan de compétences', 'Action de formation', 'FAFCEA',
  ];

  // ────────────────────────────────────────────────────────────────
  // SLIDER STATE
  // ────────────────────────────────────────────────────────────────
  activeCategory    = 'all';
  filteredFormations: any[] = [];
  currentSlide      = 0;
  maxVisibleSlides  = 0;
  cardWidth         = 0;
  gap               = 30;

  // ────────────────────────────────────────────────────────────────
  // PRIVATE
  // ────────────────────────────────────────────────────────────────
  private isBrowser: boolean;
  private triggers:       any[] = [];
  private gsapAnimations: any[] = [];
  private resizeObserver: ResizeObserver | null = null;

  constructor(@Inject(PLATFORM_ID) pid: object) {
    this.isBrowser = isPlatformBrowser(pid);
  }

  // ────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.updateFilteredFormations();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.drawGrain();
    this.loadGSAP().then(() => {
      this.initAll();
      this.initSlider();
      this.initFormationsAnimations();
    });
    this.initPhotoReveal();
  }

  ngOnDestroy(): void {
    this.triggers.forEach(t => t?.kill?.());
    this.gsapAnimations.forEach(a => a?.kill?.());
    this.resizeObserver?.disconnect();
  }

  // ────────────────────────────────────────────────────────────────
  // FILTER
  // ────────────────────────────────────────────────────────────────
  filterCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.updateFilteredFormations();
    this.currentSlide = 0;
    this.updateSliderUI();
    this.updateActiveBarPosition();
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.formation-card',
        { opacity: 0.5, y: 20 },
        { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power2.out' });
    }
  }

  private updateFilteredFormations(): void {
    this.filteredFormations = this.activeCategory === 'all'
      ? [...this.formations]
      : this.formations.filter(f => f.category === this.activeCategory);
    this.maxVisibleSlides = this.filteredFormations.length;
    setTimeout(() => this.calculateDimensions(), 100);
  }

  // ────────────────────────────────────────────────────────────────
  // SLIDER
  // ────────────────────────────────────────────────────────────────
  private initSlider(): void {
    this.calculateDimensions();
    this.updateSliderUI();
    this.updateActiveBarPosition();
    this.setupResizeObserver();
  }

  private calculateDimensions(): void {
    if (!this.sliderTrack) return;
    const first = this.sliderTrack.nativeElement.querySelector('.formation-card') as HTMLElement;
    if (first) this.cardWidth = first.offsetWidth;
    const container = this.sliderWrapper?.nativeElement;
    if (container) {
      const vis = container.offsetWidth;
      this.maxVisibleSlides = Math.min(
        this.filteredFormations.length,
        Math.max(1, Math.ceil(vis / (this.cardWidth + this.gap))),
      );
    }
  }

  nextSlide(): void {
    if (this.currentSlide >= this.maxVisibleSlides - 1) return;
    this.currentSlide++;
    this.updateSliderUI();
    gsap.to(this.sliderTrack.nativeElement, {
      x: -this.currentSlide * (this.cardWidth + this.gap),
      duration: .6, ease: 'power2.inOut',
    });
  }

  prevSlide(): void {
    if (this.currentSlide <= 0) return;
    this.currentSlide--;
    this.updateSliderUI();
    gsap.to(this.sliderTrack.nativeElement, {
      x: -this.currentSlide * (this.cardWidth + this.gap),
      duration: .6, ease: 'power2.inOut',
    });
  }

  private updateSliderUI(): void {
    if (!this.progressBar) return;
    const pct = ((this.currentSlide + 1) / this.maxVisibleSlides) * 100;
    gsap.to(this.progressBar.nativeElement, { width: `${pct}%`, duration: .4, ease: 'power2.out' });
  }

  private updateActiveBarPosition(): void {
    if (!this.filtersContainer || !this.activeBar) return;
    const idx = this.categories.findIndex(c => c.id === this.activeCategory);
    const btns = this.filtersContainer.nativeElement.querySelectorAll('.filter-btn');
    const btn  = btns[idx] as HTMLElement;
    if (btn) {
      gsap.to(this.activeBar.nativeElement, {
        x: btn.offsetLeft, width: btn.offsetWidth, duration: .3, ease: 'power2.out',
      });
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined' || !this.sliderWrapper) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateDimensions();
      this.updateSliderUI();
    });
    this.resizeObserver.observe(this.sliderWrapper.nativeElement);
  }

  // ────────────────────────────────────────────────────────────────
  // FORMATIONS ANIMATIONS
  // ────────────────────────────────────────────────────────────────
  private initFormationsAnimations(): void {
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.formationsSection.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    headerTl
      .fromTo(this.formationsEyebrow.nativeElement, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' })
      .fromTo(this.formationsTitle.nativeElement,   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, '-=.3')
      .fromTo(this.formationsLead.nativeElement,    { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, '-=.2');
    this.gsapAnimations.push(headerTl);

    ScrollTrigger.batch('.formation-card', {
      start: 'top 85%',
      onEnter: (elements: Element[]) => {
        gsap.fromTo(elements,
          { opacity: 0, y: 50, scale: .95 },
          { opacity: 1, y: 0, scale: 1, duration: .8, stagger: .1, ease: 'power3.out', clearProps: 'all' });
      },
      once: true,
    });
  }

  // ────────────────────────────────────────────────────────────────
  // HERO GRAIN CANVAS
  // ────────────────────────────────────────────────────────────────
  private drawGrain(): void {
    const canvas = this.grainCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 256;
    canvas.width = canvas.height = size;
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 20;
    }
    ctx.putImageData(img, 0, 0);
  }

  // ────────────────────────────────────────────────────────────────
  // PHOTO REVEAL
  // ────────────────────────────────────────────────────────────────
  private initPhotoReveal(): void {
    const img = this.dirPhoto?.nativeElement;
    if (!img) return;
    const reveal = () => { img.style.opacity = '1'; };
    if (img.complete) reveal();
    else img.addEventListener('load', reveal);
  }

  // ────────────────────────────────────────────────────────────────
  // GSAP LOADER
  // ────────────────────────────────────────────────────────────────
  private loadGSAP(): Promise<void> {
    return new Promise(resolve => {
      if ((window as any).gsap?.registerPlugin) { resolve(); return; }
      const s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        s2.onload = () => {
          (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
          resolve();
        };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    });
  }

  // ────────────────────────────────────────────────────────────────
  // INIT ALL
  // ────────────────────────────────────────────────────────────────
  private initAll(): void {
    this.animHero();
    this.animQualiopi();
    this.animDirigeante();
  }

  // ────────────────────────────────────────────────────────────────
  // HERO ANIMATION
  // ────────────────────────────────────────────────────────────────
  private animHero(): void {
    const tl = gsap.timeline({ delay: .2 });

    tl.to(this.railLine.nativeElement, { scaleY: 1, duration: 1.2, ease: 'power4.out' }, 0)
      .to(this.railYear.nativeElement, { opacity: 1, duration: .6 }, .5)
      .fromTo(this.heroKicker.nativeElement,
        { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, .4);

    [this.heroLine1, this.heroLine2, this.heroLine3].forEach((ref, i) => {
      const inner = ref?.nativeElement?.querySelector('.line-inner');
      if (inner) tl.to(inner, { y: '0%', duration: .9, ease: 'power4.out' }, .55 + i * .12);
    });

    tl.fromTo(this.heroSub.nativeElement,
        { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, .9)
      .fromTo(this.heroActions.nativeElement,
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, 1.05)
      .fromTo(this.heroMetrics.nativeElement,
        { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .8, ease: 'power3.out' }, .75)
      .fromTo(this.heroScrollEl.nativeElement,
        { opacity: 0 }, { opacity: 1, duration: .5 }, 1.3)
      .fromTo(this.heroTicker.nativeElement,
        { opacity: 0 }, { opacity: 1, duration: .5 }, 1.4);
  }

  // ────────────────────────────────────────────────────────────────
  // QUALIOPI ANIMATION
  // ────────────────────────────────────────────────────────────────
  private animQualiopi(): void {
    const st = ScrollTrigger.create({
      trigger: this.qualiopiSection.nativeElement,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(this.qualiopiSection.nativeElement, { opacity: 1, duration: .8, ease: 'power2.out' });
      },
      once: true,
    });
    this.triggers.push(st);
  }

  // ────────────────────────────────────────────────────────────────
  // DIRIGEANTE ANIMATION — Cinématique
  // ────────────────────────────────────────────────────────────────
  private animDirigeante(): void {
    const st = ScrollTrigger.create({
      trigger: this.dirigeanteSection.nativeElement,
      start: 'top 70%',
      onEnter: () => {

        // 1. Photo : clip-path reveal de gauche à droite
        gsap.fromTo(this.dirVisual.nativeElement,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out' });

        // 2. Carte crédentials flottante
        gsap.to(this.dirCredsCard.nativeElement, {
          opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: .7,
        });

        // 3. Eyebrow row
        gsap.fromTo(this.dirEyebrow.nativeElement,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: .7, ease: 'power3.out', delay: .4 });

        // 4. Headline lignes
        const lines = this.dirTitle.nativeElement.querySelectorAll('.dh-line');
        gsap.to(lines, { y: '0%', duration: .9, stagger: .1, ease: 'power4.out', delay: .55 });

        // 5. Citation, corps, CTA
        gsap.fromTo(
          [this.dirQuote.nativeElement, this.dirBody.nativeElement, this.dirCta.nativeElement],
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out', delay: .9 },
        );
      },
      once: true,
    });
    this.triggers.push(st);

    // Parallax subtil sur la photo
    const stPar = ScrollTrigger.create({
      trigger: this.dirigeanteSection.nativeElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      animation: gsap.to(this.dirPhoto?.nativeElement ?? '.dir-stage-img', {
        y: -70, ease: 'none',
      }),
    });
    this.triggers.push(stPar);
  }
}