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
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface FormationOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',  // ← Changé de contact.component.html à contact.html
  styleUrls: ['./contact.css']     // ← Changé de contact.component.css à contact.css
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroLine1') heroLine1!: ElementRef<HTMLElement>;
  @ViewChild('heroSub') heroSub!: ElementRef<HTMLElement>;
  @ViewChild('railLine') railLine!: ElementRef<HTMLElement>;

  private scrollObserver!: IntersectionObserver;
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  /* Liste des situations */
  situations: string[] = ['Salarié', 'Demandeur d\'emploi', 'Indépendant', 'Entreprise'];

  /* Liste des formations */
  formations: FormationOption[] = [
    { value: '', label: 'Je ne sais pas encore' },
    { value: 'strategies-communication', label: 'Maîtrise des stratégies de communication' },
    { value: 'techniques-vente', label: 'Stratégies des techniques de vente' },
    { value: 'bureautique-outils-numeriques', label: 'Bureautique et outils numériques' },
    { value: 'accueil-client', label: 'Amélioration des techniques d\'accueil client' },
    { value: 'vocabulaire-professionnel', label: 'Amélioration du vocabulaire professionnel' },
    { value: 'marketing-digital', label: 'Marketing digital et réseaux sociaux' },
    { value: 'langues-etrangeres', label: 'Remise à niveau en langues étrangères' },
    { value: 'accompagnement-qualiopi', label: 'Accompagnement Qualiopi' },
    { value: 'vae', label: 'Accompagnement VAE' },
    { value: 'bilan-competences', label: 'Bilan de compétences' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\s]{10,}$/)]],
      situation: ['', Validators.required],
      formation: [''],
      message: ['', [Validators.required, Validators.minLength(20)]],
      rgpd: [false, Validators.requiredTrue],
    });
  }

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

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData = this.contactForm.value;
    const formationLabel = this.getFormationLabel(formData.formation);

    // Simulation d'envoi (à remplacer par votre API)
    setTimeout(() => {
      console.log('Form data:', {
        ...formData,
        formationLabel: formationLabel
      });
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      this.contactForm.patchValue({
        formation: '',
        situation: ''
      });
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);
  }

  getFormationLabel(value: string): string {
    const formation = this.formations.find(f => f.value === value);
    return formation ? formation.label : 'Demande générale / Je ne sais pas encore';
  }

  get f() { return this.contactForm.controls; }

  ngOnDestroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
}
