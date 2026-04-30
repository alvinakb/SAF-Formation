import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AccompagnementQualiopi } from './pages/formations/accompagnement-qualiopi/accompagnement-qualiopi';
import { AccueilClient } from './pages/formations/accueil-client/accueil-client';
import { BilanCompetences } from './pages/formations/bilan-competences/bilan-competences';
import { BureautiqueOutilsNumeriques } from './pages/formations/bureautique-outils-numeriques/bureautique-outils-numeriques';
import { LanguesEtrangeres } from './pages/formations/langues-etrangeres/langues-etrangeres';
import { MarketingDigital } from './pages/formations/marketing-digital/marketing-digital';
import { StrategiesCommunication } from './pages/formations/strategies-communication/strategies-communication';
import { TechniquesVente } from './pages/formations/techniques-vente/techniques-vente';
import { Vae } from './pages/formations/vae/vae';
import { VocabulaireProfessionnel } from './pages/formations/vocabulaire-professionnel/vocabulaire-professionnel';
import { Dirigeante } from './pages/dirigeante/dirigeante';
import { Contact } from './pages/contact/contact';
import { NosValeurs } from './pages/nos-valeurs/nos-valeurs';
import { Faq } from './pages/faq/faq';
import { Financement } from './pages/financement/financement';

export const routes: Routes = [
    // Accueil
    { path: '', component: Home },

    // Routes des formations
    { path: 'formations/strategies-communication', component: StrategiesCommunication },
    { path: 'formations/techniques-vente', component: TechniquesVente },
    { path: 'formations/bureautique-outils-numeriques', component: BureautiqueOutilsNumeriques },
    { path: 'formations/accueil-client', component: AccueilClient },
    { path: 'formations/vocabulaire-professionnel', component: VocabulaireProfessionnel },
    { path: 'formations/marketing-digital', component: MarketingDigital },
    { path: 'formations/langues-etrangeres', component: LanguesEtrangeres },
    { path: 'formations/accompagnement-qualiopi', component: AccompagnementQualiopi },
    { path: 'formations/vae', component: Vae },
    { path: 'formations/bilan-competences', component: BilanCompetences },
    { path: 'la-dirigeante', component: Dirigeante },
    { path: 'contact', component: Contact },
    { path: 'nos-valeurs', component: NosValeurs },
    { path: 'faq', component: Faq },
    { path: 'financement', component: Financement },

    // Redirection pour les routes non trouvées
    { path: '**', redirectTo: '' }
];