import {
  Component,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
  AfterViewInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SubSubItem {
  label: string;
  route: string;
  desc: string;
}

export interface SubItem {
  label: string;
  route: string;
  desc: string;
  subSubItems?: SubSubItem[];
}

export interface MenuItem {
  label: string;
  route: string;
  image: string;
  desc: string;
  subItems?: SubItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, AfterViewInit {

  menuOpen = false;
  scrolled = false;
  activeItem: MenuItem | null = null;
  activeSubItem: SubItem | null = null;

  private isBrowser: boolean;

  menuItems: MenuItem[] = [
    {
      label: 'Nos formations',
      route: '/formations',
      image: 'assets/menu/formations.jpg',
      desc: '',
      subItems: [
        {
          label: 'Actions de formation',
          route: '/formations/actions',
          desc: '',
          subSubItems: [
            {
              label: 'Maîtrise des stratégies de communication',
              route: '/formations/strategies-communication',
              desc: '',
            },
            {
              label: 'Stratégies des techniques de vente',
              route: '/formations/bureautique-outils-numeriques',
              desc: '',
            },
            {
              label: 'Bureautique et outils numériques',
              route: '/formations/bureautique-outils-numeriques',
              desc: '',
            },
            {
              label: 'Amélioration des techniques daccueil client',
              route: '/formations/accueil-client',
              desc: '',
            },
            {
              label: 'Amélioration du vocabulaire professionnel',
              route: '/formations/vocabulaire-professionnel',
              desc: '',
            },
            {
              label: 'Marketing digital, logiciel métiers',
              route: '/formations/marketing-digital',
              desc: '',
            },
            {
              label: 'Remise à niveau en langues étrangères',
              route: '/formations/langues-etrangeres',
              desc: '',
            },

          ],
        },
        {
          label: 'Validation des Acquis de l\'Expérience (VAE)',
          route: '/formations/vae',
          desc: '',
          subSubItems: [
            {
              label: 'Accompagnement VAE',
              route: '/formations/vae',
              desc: '',
            },
          ],
        },
        {
          label: 'Bilan de compétences',
          route: '/formations/bilan-competences',
          desc: '',
          subSubItems: [
            {
              label: 'Bilan de compétences',
              route: '/formations/bilan-competences',
              desc: '',
            },
          ],
        },
        {
          label: 'Accompagnement & conseil',
          route: '/formations/accompagnement-conseil',
          desc: '',
          subSubItems: [
            {
              label: 'Accompagnement Qualiopi',
              route: '/formations/accompagnement-qualiopi',
              desc: '',
            },
          ],
        },
      ],
    },
    {
      label: 'La dirigeante',
      route: '/la-dirigeante',
      image: 'assets/menu/dirigeante.jpg',
      desc: "Master Niveau 7 · Auditrice Qualiopi · +10 ans d'expérience.",
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
      desc: "La qualité n'est pas une contrainte, c'est une conviction.",
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
      desc: "Un premier entretien d'orientation gratuit, sans engagement.",
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.scrolled = window.scrollY > 60;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen) this.closeMenu();
  }

  openMenu(): void {
    this.menuOpen = true;
    this.activeItem = null;
    this.activeSubItem = null;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
      this.animateMenu(true);
    }
  }

  closeMenu(): void {
    if (this.isBrowser) {
      this.animateMenu(false);
    } else {
      this.menuOpen = false;
      this.activeItem = null;
      this.activeSubItem = null;
    }
  }

  onItemClick(item: MenuItem, event: Event): void {
    if (item.subItems) {
      event.preventDefault();
      if (this.activeItem === item) {
        this.activeItem = null;
        this.activeSubItem = null;
      } else {
        this.activeItem = item;
        this.activeSubItem = null;
      }
    } else {
      this.closeMenu();
    }
  }

  onSubItemClick(sub: SubItem, event: Event): void {
    if (sub.subSubItems && sub.subSubItems.length > 0) {
      event.preventDefault();
      this.activeSubItem = this.activeSubItem === sub ? null : sub;
    } else {
      this.closeMenu();
    }
  }

  private animateMenu(open: boolean): void {
    const gsap = (window as any).gsap;
    if (!gsap) {
      this.menuOpen = open;
      if (!open) {
        document.body.style.overflow = '';
        this.activeItem = null;
        this.activeSubItem = null;
      }
      return;
    }

    if (open) {
      this.menuOpen = true;
      gsap.fromTo('.nav-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo('.nav-menu-link',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      gsap.to('.nav-overlay', {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          this.menuOpen = false;
          this.activeItem = null;
          this.activeSubItem = null;
          document.body.style.overflow = '';
        },
      });
    }
  }
}