import { Component, OnInit, HostListener, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  activeMenuImage = 'assets/menu/formations.jpg';
  activeMenuLabel = 'Nos formations';
  activeMenuDesc = 'Des parcours certifiés ancrés dans la réalité du terrain.';

  private isBrowser: boolean;

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

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
    }
  }

  onMenuHover(item: any): void {
    this.activeMenuImage = item.image;
    this.activeMenuLabel = item.label;
    this.activeMenuDesc = item.desc;
  }

  onLinkClick(): void {
    this.closeMenu();
  }

  private animateMenu(open: boolean): void {
    const gsap = (window as any).gsap;
    if (!gsap) {
      this.menuOpen = open;
      if (!open) document.body.style.overflow = '';
      return;
    }

    if (open) {
      this.menuOpen = true;
      gsap.fromTo('.nav-overlay', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo('.nav-image-panel', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('.nav-menu-link', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.15 });
    } else {
      gsap.to('.nav-overlay', {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          this.menuOpen = false;
          document.body.style.overflow = '';
        },
      });
    }
  }
}