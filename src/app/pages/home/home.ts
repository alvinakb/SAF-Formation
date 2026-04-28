import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ElementRef, ViewChild, Inject, PLATFORM_ID
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

  // ──────────────────────────────────────────────────────────────
  // VIEWCHILDS
  // ──────────────────────────────────────────────────────────────
  @ViewChild('heroSection')         heroSection!:    ElementRef<HTMLElement>;
  @ViewChild('grainCanvas')         grainCanvas!:    ElementRef<HTMLCanvasElement>;
  @ViewChild('railLine')            railLine!:       ElementRef<HTMLElement>;
  @ViewChild('railYear')            railYear!:       ElementRef<HTMLElement>;
  @ViewChild('heroKicker')          heroKicker!:     ElementRef<HTMLElement>;
  @ViewChild('heroLine1')           heroLine1!:      ElementRef<HTMLElement>;
  @ViewChild('heroLine2')           heroLine2!:      ElementRef<HTMLElement>;
  @ViewChild('heroLine3')           heroLine3!:      ElementRef<HTMLElement>;
  @ViewChild('heroSub')             heroSub!:        ElementRef<HTMLElement>;
  @ViewChild('heroActions')         heroActions!:    ElementRef<HTMLElement>;
  @ViewChild('heroMetrics')         heroMetrics!:    ElementRef<HTMLElement>;
  @ViewChild('heroScroll')          heroScrollEl!:   ElementRef<HTMLElement>;
  @ViewChild('heroTicker')          heroTicker!:     ElementRef<HTMLElement>;
  @ViewChild('profilsSection')      profilsSection!: ElementRef<HTMLElement>;
  @ViewChild('profilsEyebrow')      profilsEyebrow!: ElementRef<HTMLElement>;
  @ViewChild('profilsTitle')        profilsTitle!:   ElementRef<HTMLElement>;
  @ViewChild('formationsSection')   formationsSection!: ElementRef<HTMLElement>;
  @ViewChild('formationsHeader')    formationsHeader!: ElementRef<HTMLElement>;
  @ViewChild('formationsEyebrow')   formationsEyebrow!: ElementRef<HTMLElement>;
  @ViewChild('formationsTitle')     formationsTitle!: ElementRef<HTMLElement>;
  @ViewChild('formationsLead')      formationsLead!: ElementRef<HTMLElement>;
  @ViewChild('filtersContainer')    filtersContainer!: ElementRef<HTMLElement>;
  @ViewChild('activeBar')           activeBar!:      ElementRef<HTMLElement>;
  @ViewChild('sliderContainer')     sliderContainer!: ElementRef<HTMLElement>;
  @ViewChild('sliderWrapper')       sliderWrapper!:  ElementRef<HTMLElement>;
  @ViewChild('sliderTrack')         sliderTrack!:    ElementRef<HTMLElement>;
  @ViewChild('progressBar')         progressBar!:    ElementRef<HTMLElement>;
  @ViewChild('qualiopiSection')     qualiopiSection!: ElementRef<HTMLElement>;
  @ViewChild('dirigeanteSection')   dirigeanteSection!: ElementRef<HTMLElement>;
  @ViewChild('dirVisual')           dirVisual!:      ElementRef<HTMLElement>;
  @ViewChild('dirEyebrow')          dirEyebrow!:     ElementRef<HTMLElement>;
  @ViewChild('dirTitle')            dirTitle!:       ElementRef<HTMLElement>;
  @ViewChild('dirQuote')            dirQuote!:       ElementRef<HTMLElement>;
  @ViewChild('dirBody')             dirBody!:        ElementRef<HTMLElement>;
  @ViewChild('dirTags')             dirTags!:        ElementRef<HTMLElement>;
  @ViewChild('dirCta')              dirCta!:         ElementRef<HTMLElement>;

  // ──────────────────────────────────────────────────────────────
  // DATA
  // ──────────────────────────────────────────────────────────────
  stats = [
    { number: '+10 ans',               label: "d'expertise terrain" },
    { number: '3',                     label: 'dispositifs certifiés Qualiopi' },
    { number: '100%',                  label: 'ancrage réalité pro' },
    { number: 'CPF · OPCO · FT',       label: 'financements disponibles' },
  ];

  profils = [
    { name: 'Je suis particulier',        desc: 'Financer ma formation avec le CPF',                  route: '/financement#cpf' },
    { name: 'Je suis salarié',            desc: "Mon employeur ou l'OPCO finance ma formation",       route: '/financement#opco' },
    { name: "Je suis demandeur d'emploi", desc: 'France Travail et FAFCEA',                           route: '/financement#francetravail' },
    { name: 'Je suis une entreprise',     desc: 'Financer la montée en compétences de mes équipes',  route: '/financement#entreprise' },
  ];

  formations = [
    { 
      category: 'ACTION DE FORMATION · CPF', 
      categoryLabel: 'Action de formation',
      title: 'Maîtrise des stratégies de communication',  
      desc: 'Construire une communication structurée, cohérente et percutante.',                   
      badge: 'Éligible CPF',  
      route: '/formations/strategies-communication',
      image: '../../../assets/images/formation-communication.jpg',
      location: 'Paris · Distanciel',
      duration: '3 jours (21h)'
    },
    { 
      category: 'ACTION DE FORMATION · CPF', 
      categoryLabel: 'Action de formation',
      title: 'Stratégies des techniques de vente',         
      desc: "Structurer un entretien de vente de la prise de contact à la conclusion.",            
      badge: 'Éligible CPF',  
      route: '/formations/techniques-vente',
      image: '../../../assets/images/formation-vente.jpg',
      location: 'Paris · Distanciel',
      duration: '4 jours (28h)'
    },
    { 
      category: 'ACTION DE FORMATION · CPF', 
      categoryLabel: 'Action de formation',
      title: 'Bureautique et outils numériques',           
      desc: 'Gagner en autonomie et efficacité sur les outils du quotidien.',                     
      badge: 'TOSA · CPF',    
      route: '/formations/bureautique-outils-numeriques',
      image: '../../../assets/images/formation-bureautique.jpg',
      location: 'Paris · Distanciel',
      duration: '2 jours (14h)'
    },
    { 
      category: 'ACTION DE FORMATION · CPF', 
      categoryLabel: 'Action de formation',
      title: 'Accueil client professionnel',               
      desc: 'Les réflexes, les mots et la posture pour un accueil systématiquement positif.',      
      badge: 'Éligible CPF',  
      route: '/formations/accueil-client',
      image: '../../../assets/images/formation-accueil.jpg',
      location: 'Paris · Distanciel',
      duration: '2 jours (14h)'
    },
    { 
      category: 'BILAN DE COMPÉTENCES',      
      categoryLabel: 'Bilan de compétences',
      title: 'Bilan de compétences',                       
      desc: 'Clarifier vos compétences, aptitudes et motivations pour construire votre projet.',   
      badge: 'CPF · France Travail', 
      route: '/formations/bilan-competences',
      image: '../../../assets/images/formation-bilan.jpg',
      location: 'Paris · Distanciel',
      duration: '24h individualisé'
    },
    { 
      category: 'VAE',                        
      categoryLabel: 'VAE',
      title: 'Accompagnement VAE',                         
      desc: "Obtenez une certification reconnue à partir de votre expérience professionnelle.",    
      badge: 'Prise en charge OPCO', 
      route: '/formations/vae',
      image: '../../../assets/images/formation-vae.jpg',
      location: 'Paris · Distanciel',
      duration: 'Accompagnement individualisé'
    },
  ];

  categories = [
    { id: 'all', label: 'TOUS' },
    { id: 'ACTION DE FORMATION · CPF', label: 'ACTION DE FORMATION' },
    { id: 'BILAN DE COMPÉTENCES', label: 'BILAN' },
    { id: 'VAE', label: 'VAE' }
  ];

  dirigeanteBadges = ['Master Niveau 7', 'Auditrice Qualiopi', "+10 ans d'expérience"];
  tickerItems = ['CPF', 'OPCO', 'France Travail', 'Qualiopi', 'VAE', 'Bilan de compétences', 'Action de formation', 'FAFCEA'];

  // ──────────────────────────────────────────────────────────────
  // SLIDER PROPERTIES
  // ──────────────────────────────────────────────────────────────
  activeCategory: string = 'all';
  filteredFormations: any[] = [];
  currentSlide: number = 0;
  maxVisibleSlides: number = 0;
  cardWidth: number = 0;
  gap: number = 30;

  // ──────────────────────────────────────────────────────────────
  // PRIVATE PROPERTIES
  // ──────────────────────────────────────────────────────────────
  private isBrowser: boolean;
  private triggers: any[] = [];
  private gsapAnimations: any[] = [];
  private scrollTriggerInstance: any;
  private resizeObserver: ResizeObserver | null = null;

  constructor(@Inject(PLATFORM_ID) pid: object) {
    this.isBrowser = isPlatformBrowser(pid);
  }

  // ──────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ──────────────────────────────────────────────────────────────
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
  }

  ngOnDestroy(): void {
    this.triggers.forEach(t => t?.kill?.());
    this.gsapAnimations.forEach(anim => {
      if (anim && anim.kill) anim.kill();
    });
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // ──────────────────────────────────────────────────────────────
  // FILTER METHODS
  // ──────────────────────────────────────────────────────────────
  filterCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.updateFilteredFormations();
    this.currentSlide = 0;
    this.updateSliderUI();
    this.updateActiveBarPosition();
    
    // Animation GSAP lors du changement de catégorie
    gsap.fromTo('.formation-card',
      { opacity: 0.5, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  }

  private updateFilteredFormations(): void {
    if (this.activeCategory === 'all') {
      this.filteredFormations = [...this.formations];
    } else {
      this.filteredFormations = this.formations.filter(
        f => f.category === this.activeCategory
      );
    }
    this.maxVisibleSlides = this.filteredFormations.length;
    setTimeout(() => this.calculateDimensions(), 100);
  }

  // ──────────────────────────────────────────────────────────────
  // SLIDER METHODS
  // ──────────────────────────────────────────────────────────────
  private initSlider(): void {
    this.calculateDimensions();
    this.updateSliderUI();
    this.updateActiveBarPosition();
    this.setupResizeObserver();
  }

  private calculateDimensions(): void {
    if (!this.sliderTrack) return;
    
    const firstCard = this.sliderTrack.nativeElement.querySelector('.formation-card') as HTMLElement;
    if (firstCard) {
      this.cardWidth = firstCard.offsetWidth;
    }
    
    const container = this.sliderWrapper?.nativeElement;
    if (container) {
      const visibleWidth = container.offsetWidth;
      this.maxVisibleSlides = Math.min(
        this.filteredFormations.length,
        Math.max(1, Math.ceil(visibleWidth / (this.cardWidth + this.gap)))
      );
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxVisibleSlides - 1) {
      this.currentSlide++;
      this.updateSliderUI();
      
      gsap.to(this.sliderTrack.nativeElement, {
        x: -this.currentSlide * (this.cardWidth + this.gap),
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSliderUI();
      
      gsap.to(this.sliderTrack.nativeElement, {
        x: -this.currentSlide * (this.cardWidth + this.gap),
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  }

  private updateSliderUI(): void {
    if (!this.progressBar) return;
    
    const progress = ((this.currentSlide + 1) / this.maxVisibleSlides) * 100;
    gsap.to(this.progressBar.nativeElement, {
      width: `${progress}%`,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  private updateActiveBarPosition(): void {
    if (!this.filtersContainer || !this.activeBar) return;
    
    const activeIndex = this.categories.findIndex(c => c.id === this.activeCategory);
    const buttons = this.filtersContainer.nativeElement.querySelectorAll('.filter-btn');
    const activeButton = buttons[activeIndex] as HTMLElement;
    
    if (activeButton) {
      gsap.to(this.activeBar.nativeElement, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') return;
    
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateDimensions();
      this.updateSliderUI();
    });
    
    if (this.sliderWrapper) {
      this.resizeObserver.observe(this.sliderWrapper.nativeElement);
    }
  }

  // ──────────────────────────────────────────────────────────────
  // ANIMATIONS GSAP
  // ──────────────────────────────────────────────────────────────
  private initFormationsAnimations(): void {
    // Animation header au scroll
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.formationsSection.nativeElement,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    headerTl
      .fromTo(this.formationsEyebrow.nativeElement, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(this.formationsTitle.nativeElement, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(this.formationsLead.nativeElement, 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

    this.gsapAnimations.push(headerTl);

    // Animation des cartes au scroll
    this.scrollTriggerInstance = ScrollTrigger.batch('.formation-card', {
      start: 'top 85%',
      onEnter: (elements: Element[]) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 50, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );
      },
      once: true
    });
  }

  // ──────────────────────────────────────────────────────────────
  // GRAIN CANVAS
  // ──────────────────────────────────────────────────────────────
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
      img.data[i] = img.data[i+1] = img.data[i+2] = v;
      img.data[i+3] = 20;
    }
    ctx.putImageData(img, 0, 0);
  }

  // ──────────────────────────────────────────────────────────────
  // GSAP LOADER
  // ──────────────────────────────────────────────────────────────
  private loadGSAP(): Promise<void> {
    return new Promise(resolve => {
      if ((window as any).gsap?.registerPlugin) { 
        resolve(); 
        return; 
      }
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

  // ──────────────────────────────────────────────────────────────
  // INIT ALL ANIMATIONS
  // ──────────────────────────────────────────────────────────────
  private initAll(): void {
    this.animHero();
    this.animProfils();
    this.animQualiopi();
    this.animDirigeante();
    
    const photo = document.querySelector('.dir-photo') as HTMLImageElement;
    if (photo) { 
      photo.onload = () => { photo.style.opacity = '1'; }; 
      if (photo.complete) photo.style.opacity = '1'; 
    }
  }

  private animHero(): void {
    const tl = gsap.timeline({ delay: .2 });

    tl.to(this.railLine.nativeElement, { scaleY: 1, duration: 1.2, ease: 'power4.out' }, 0)
      .to(this.railYear.nativeElement, { opacity: 1, duration: .6 }, .5)
      .fromTo(this.heroKicker.nativeElement, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, .4);

    [this.heroLine1, this.heroLine2, this.heroLine3].forEach((ref, i) => {
      if (ref?.nativeElement?.querySelector('.line-inner')) {
        tl.to(ref.nativeElement.querySelector('.line-inner'), { y: '0%', duration: .9, ease: 'power4.out' }, .55 + i * .12);
      }
    });

    tl.fromTo(this.heroSub.nativeElement, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, .9)
      .fromTo(this.heroActions.nativeElement, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, 1.05)
      .fromTo(this.heroMetrics.nativeElement, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .8, ease: 'power3.out' }, .75)
      .fromTo(this.heroScrollEl.nativeElement, { opacity: 0 }, { opacity: 1, duration: .5 }, 1.3)
      .fromTo(this.heroTicker.nativeElement, { opacity: 0 }, { opacity: 1, duration: .5 }, 1.4);
  }

  private animProfils(): void {
    const st = ScrollTrigger.create({
      trigger: this.profilsSection.nativeElement,
      start: 'top 78%',
      onEnter: () => {
        gsap.fromTo([this.profilsEyebrow.nativeElement, this.profilsTitle.nativeElement],
          { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out' });
        gsap.fromTo('.profil-item',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: .65, stagger: .1, ease: 'power3.out', delay: .2 });
      },
      once: true,
    });
    this.triggers.push(st);
  }

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

  private animDirigeante(): void {
    const st = ScrollTrigger.create({
      trigger: this.dirigeanteSection.nativeElement,
      start: 'top 72%',
      onEnter: () => {
        if (this.dirVisual) {
          gsap.fromTo(this.dirVisual.nativeElement,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.out' });
        }

        gsap.fromTo([this.dirEyebrow.nativeElement, this.dirTitle.nativeElement],
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: .8, stagger: .12, ease: 'power3.out', delay: .3 });
        gsap.fromTo([
          this.dirQuote.nativeElement, this.dirBody.nativeElement,
          this.dirTags.nativeElement, this.dirCta.nativeElement,
        ],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: .65, stagger: .1, ease: 'power3.out', delay: .55 });
      },
      once: true,
    });
    this.triggers.push(st);

    const stPar = ScrollTrigger.create({
      trigger: this.dirigeanteSection.nativeElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to('.dir-photo', { y: -60, ease: 'none' }),
    });
    this.triggers.push(stPar);
  }
}