import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ------------------------------------------------------------------
// GSAP types (install: npm install gsap)
// ------------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // View refs
  // ----------------------------------------------------------------
  @ViewChild('siteHeader')    headerEl!: ElementRef<HTMLElement>;
  @ViewChild('heroSection')   heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroEyebrow')   heroEyebrow!: ElementRef<HTMLElement>;
  @ViewChild('heroTitle')     heroTitle!: ElementRef<HTMLElement>;
  @ViewChild('heroSubtitle')  heroSubtitle!: ElementRef<HTMLElement>;
  @ViewChild('heroCtas')      heroCtas!: ElementRef<HTMLElement>;
  @ViewChild('heroScroll')    heroScroll!: ElementRef<HTMLElement>;
  @ViewChild('statsSection')  statsSection!: ElementRef<HTMLElement>;
  @ViewChild('profilsSection')profilsSection!: ElementRef<HTMLElement>;
  @ViewChild('profilsTitle')  profilsTitle!: ElementRef<HTMLElement>;
  @ViewChild('formationsSection') formationsSection!: ElementRef<HTMLElement>;
  @ViewChild('formationsTitle')   formationsTitle!: ElementRef<HTMLElement>;
  @ViewChild('qualiopiSection')   qualiopiSection!: ElementRef<HTMLElement>;
  @ViewChild('dirigeanteSection') dirigeanteSection!: ElementRef<HTMLElement>;
  @ViewChild('dirigeanteTitle')   dirigeanteTitle!: ElementRef<HTMLElement>;
  @ViewChild('dirigeanteVisual')  dirigeanteVisual!: ElementRef<HTMLElement>;
  @ViewChild('menuOverlay')       menuOverlay!: ElementRef<HTMLElement>;

  // ----------------------------------------------------------------
  // Menu state
  // ----------------------------------------------------------------
  menuOpen = false;
  activeMenuImage = 'assets/menu/formations.jpg';
  activeMenuLabel = 'Nos formations';
  activeMenuDesc  = 'Des parcours certifiés ancrés dans la réalité du terrain.';

  menuItems = [
    {
      label: 'Nos formations',
      route: '/formations',
      image: 'assets/menu/formations.jpg',
      desc: 'Des parcours certifiés ancrés dans la réalité du terrain.',
    },
    {
      label: 'La dirigeante',
      route: '/la-dirigeante',
      image: 'assets/menu/dirigeante.jpg',
      desc: 'Master Niveau 7 · Auditrice Qualiopi · +10 ans d\'expérience.',
    },
    {
      label: 'Financement',
      route: '/financement',
      image: 'assets/menu/financement.jpg',
      desc: 'CPF, OPCO, France Travail, FAFCEA — on vous guide.',
    },
    {
      label: 'Nos valeurs',
      route: '/nos-valeurs',
      image: 'assets/menu/valeurs.jpg',
      desc: 'La qualité n\'est pas une contrainte, c\'est une conviction.',
    },
    {
      label: 'FAQ',
      route: '/faq',
      image: 'assets/menu/faq.jpg',
      desc: 'Toutes les réponses avant même les questions.',
    },
    {
      label: 'Contact',
      route: '/contact',
      image: 'assets/menu/contact.jpg',
      desc: 'Un premier entretien d\'orientation gratuit, sans engagement.',
    },
  ];

  // ----------------------------------------------------------------
  // Stats
  // ----------------------------------------------------------------
  stats = [
    { number: '+10 ans',   label: 'd\'expertise terrain' },
    { number: '3',         label: 'dispositifs certifiés Qualiopi' },
    { number: '100%',      label: 'ancrage réalité professionnelle' },
    { number: 'CPF · OPCO · France Travail', label: 'financements disponibles' },
  ];

  // ----------------------------------------------------------------
  // Profils visiteurs
  // ----------------------------------------------------------------
  profils = [
    {
      icon: '👤',
      name: 'Je suis particulier',
      desc: 'Financer ma formation avec le CPF',
      route: '/financement#cpf',
    },
    {
      icon: '💼',
      name: 'Je suis salarié',
      desc: 'Mon employeur ou l\'OPCO finance ma formation',
      route: '/financement#opco',
    },
    {
      icon: '🔍',
      name: 'Je suis demandeur d\'emploi',
      desc: 'France Travail et FAFCEA',
      route: '/financement#francetravail',
    },
    {
      icon: '🏢',
      name: 'Je suis une entreprise',
      desc: 'Financer la montée en compétences de mes équipes',
      route: '/financement#entreprise',
    },
  ];

  // ----------------------------------------------------------------
  // Formations (catalogue — extrait)
  // ----------------------------------------------------------------
  formations = [
    {
      category: 'ACTION DE FORMATION · CPF',
      title: 'Maîtrise des stratégies de communication',
      desc: 'Construire une communication structurée, cohérente et percutante.',
      badge: 'Éligible CPF',
      route: '/formations/strategies-communication',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      title: 'Stratégies des techniques de vente',
      desc: 'Structurer un entretien de vente de la prise de contact à la conclusion.',
      badge: 'Éligible CPF',
      route: '/formations/techniques-vente',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      title: 'Bureautique et outils numériques',
      desc: 'Gagner en autonomie et efficacité sur les outils du quotidien.',
      badge: 'TOSA · CPF',
      route: '/formations/bureautique-outils-numeriques',
    },
    {
      category: 'ACTION DE FORMATION · CPF',
      title: 'Accueil client professionnel',
      desc: 'Les réflexes, les mots et la posture pour un accueil systématiquement positif.',
      badge: 'Éligible CPF',
      route: '/formations/accueil-client',
    },
    {
      category: 'BILAN DE COMPÉTENCES',
      title: 'Bilan de compétences',
      desc: 'Clarifier vos compétences, aptitudes et motivations pour construire votre projet.',
      badge: 'CPF · France Travail',
      route: '/formations/bilan-competences',
    },
    {
      category: 'VAE',
      title: 'Accompagnement VAE',
      desc: 'Obtenez une certification reconnue à partir de votre expérience professionnelle.',
      badge: 'Prise en charge OPCO',
      route: '/formations/vae',
    },
  ];

  // ----------------------------------------------------------------
  // Dirigeante badges
  // ----------------------------------------------------------------
  dirigeanteBadges = ['Master Niveau 7', 'Auditrice Qualiopi', '+10 ans d\'expérience'];

  // ----------------------------------------------------------------
  // Internal
  // ----------------------------------------------------------------
  private scrollTriggers: any[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Dynamically load GSAP + ScrollTrigger from CDN
    this.loadGSAP().then(() => {
      this.initAnimations();
    });
  }

  ngOnDestroy(): void {
    // Kill all ScrollTrigger instances created by this component
    this.scrollTriggers.forEach(st => st.kill());
  }

  // ----------------------------------------------------------------
  // Menu
  // ----------------------------------------------------------------
  openMenu(): void {
    this.menuOpen = true;
    document.body.style.overflow = 'hidden';
    if (this.isBrowser && typeof gsap !== 'undefined') {
      const overlay = this.menuOverlay.nativeElement;
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo('.menu-link', { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.15,
      });
      gsap.fromTo('.menu-image-panel', { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1,
      });
    }
  }

  closeMenu(): void {
    if (this.isBrowser && typeof gsap !== 'undefined') {
      gsap.to(this.menuOverlay.nativeElement, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          this.menuOpen = false;
          document.body.style.overflow = '';
        },
      });
    } else {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }

  onMenuHover(item: any): void {
    this.activeMenuImage = item.image;
    this.activeMenuLabel = item.label;
    this.activeMenuDesc  = item.desc;
  }

  // ----------------------------------------------------------------
  // Header scroll behaviour
  // ----------------------------------------------------------------
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser || !this.headerEl) return;
    const header = this.headerEl.nativeElement;
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
  }

  // ----------------------------------------------------------------
  // GSAP dynamic loader
  // ----------------------------------------------------------------
  private loadGSAP(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof gsap !== 'undefined') { resolve(); return; }

      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        script2.onload = () => {
          (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
          resolve();
        };
        document.head.appendChild(script2);
      };
      document.head.appendChild(script1);
    });
  }

  // ----------------------------------------------------------------
  // Animations
  // ----------------------------------------------------------------
  private initAnimations(): void {
    this.animateHero();
    this.animateStats();
    this.animateProfils();
    this.animateFormations();
    this.animateQualiopi();
    this.animateDirigeante();
  }

  private animateHero(): void {
    // Split title into lines for staggered entrance
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(this.heroEyebrow.nativeElement,
      { opacity: 0, y: 20, letterSpacing: '8px' },
      { opacity: 1, y: 0, letterSpacing: '4px', duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(this.heroTitle.nativeElement,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
      '-=0.4'
    )
    .fromTo(this.heroSubtitle.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(this.heroCtas.nativeElement,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(this.heroScroll.nativeElement,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    );

    // Floating scroll line animation
    gsap.to('.scroll-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: false,
      delay: 2,
    });
  }

  private animateStats(): void {
    const st = ScrollTrigger.create({
      trigger: this.statsSection.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.stat-item',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
        );
        // Animate numbers counting up (visual only)
        gsap.fromTo('.stat-number',
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)' }
        );
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }

  private animateProfils(): void {
    const st = ScrollTrigger.create({
      trigger: this.profilsSection.nativeElement,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(this.profilsTitle.nativeElement,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
        );
        gsap.fromTo('.profil-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }

  private animateFormations(): void {
    const st = ScrollTrigger.create({
      trigger: this.formationsSection.nativeElement,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(this.formationsTitle.nativeElement,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo('.formation-card',
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.7,
            stagger: { each: 0.1, grid: 'auto', from: 'start' },
            ease: 'power3.out', delay: 0.25,
          }
        );
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }

  private animateQualiopi(): void {
    const st = ScrollTrigger.create({
      trigger: this.qualiopiSection.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.qualiopi-inner',
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
        );
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }

  private animateDirigeante(): void {
    const st = ScrollTrigger.create({
      trigger: this.dirigeanteSection.nativeElement,
      start: 'top 70%',
      onEnter: () => {
        gsap.fromTo(this.dirigeanteTitle.nativeElement,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power4.out' }
        );
        gsap.fromTo('.dirigeante-body, .dirigeante-badges, .dirigeante-section .btn',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
        );
        gsap.fromTo(this.dirigeanteVisual.nativeElement,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, ease: 'power4.out', delay: 0.2 }
        );
      },
      once: true,
    });
    this.scrollTriggers.push(st);

    // Parallax on the visual
    const stParallax = ScrollTrigger.create({
      trigger: this.dirigeanteSection.nativeElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(this.dirigeanteVisual?.nativeElement, { y: -40 }),
    });
    this.scrollTriggers.push(stParallax);
  }
}