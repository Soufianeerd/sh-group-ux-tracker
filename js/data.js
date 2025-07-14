// Simulation statistique de profils clients anonymisés
const clients = [
    // Exemple de profils, à compléter dynamiquement
    { id: 1, type: 'étudiant', age: 22, sexe: 'F', parcours: [], profil: 'auto' },
    { id: 2, type: 'famille', age: 38, sexe: 'M', parcours: [], profil: 'habitation' },
    { id: 3, type: 'retraité', age: 67, sexe: 'F', parcours: [], profil: 'sante' },
    // ... Génération JS à compléter pour l'échantillon de clients
];

// Types de clients et de parcours simulés
const clientTypes = ['étudiant', 'famille', 'retraité', 'jeune actif', 'indépendant'];
const parcoursTypes = [
    { code: 'auto', label: 'Assurance Auto', steps: ['Devis', 'Profil', 'Véhicule', 'Garanties', 'Paiement', 'Confirmation'] },
    { code: 'sante', label: 'Assurance Santé', steps: ['Devis', 'Profil', 'Choix couverture', 'Documents', 'Paiement', 'Confirmation'] },
    { code: 'vie', label: 'Assurance Vie', steps: ['Devis', 'Profil', 'Bénéficiaires', 'Garanties', 'Paiement', 'Confirmation'] },
    { code: 'habitation', label: 'Assurance Habitation', steps: ['Devis', 'Profil', 'Bien', 'Garanties', 'Paiement', 'Confirmation'] },
    { code: 'patrimoine', label: 'Gestion de Patrimoine', steps: ['Demande', 'Profil', 'Simulation', 'Conseil', 'Confirmation'] },
];

// Fonction pour générer 100 clients simulés
function genererClients() {
    const generated = [];
    // Répartition réaliste par type de client
    const repartition = [
        { type: 'étudiant', count: 18 },
        { type: 'famille', count: 32 },
        { type: 'retraité', count: 18 },
        { type: 'jeune actif', count: 22 },
        { type: 'indépendant', count: 10 }
    ];
    let id = 1;
    repartition.forEach(grp => {
        for (let j = 0; j < grp.count; j++) {
            const type = grp.type;
            const age = type === 'étudiant' ? 18 + Math.floor(Math.random() * 8)
                : type === 'famille' ? 28 + Math.floor(Math.random() * 20)
                : type === 'retraité' ? 60 + Math.floor(Math.random() * 25)
                : type === 'jeune actif' ? 24 + Math.floor(Math.random() * 10)
                : 30 + Math.floor(Math.random() * 30);
            const sexe = Math.random() > 0.5 ? 'F' : 'M';
            // Répartition produits selon profil
            let produitProb = [0.2, 0.2, 0.2, 0.2, 0.2]; // auto, sante, vie, habitation, patrimoine
            if (type === 'étudiant') produitProb = [0.5, 0.15, 0.05, 0.25, 0.05];
            if (type === 'famille') produitProb = [0.22, 0.25, 0.12, 0.28, 0.13];
            if (type === 'retraité') produitProb = [0.12, 0.22, 0.28, 0.18, 0.2];
            if (type === 'jeune actif') produitProb = [0.28, 0.20, 0.12, 0.28, 0.12];
            if (type === 'indépendant') produitProb = [0.10, 0.18, 0.10, 0.22, 0.4];
            const rand = Math.random();
            let sum = 0, parcoursIdx = 0;
            for (let k = 0; k < produitProb.length; k++) {
                sum += produitProb[k];
                if (rand < sum) { parcoursIdx = k; break; }
            }
            const parcoursCode = parcoursTypes[parcoursIdx].code;
            // Simulation réaliste conversion/abandon/durée
            const steps = parcoursTypes[parcoursIdx].steps.length;
            let tauxConv = 0.7, tauxAbandon = 0.3, dureeMin = 2, dureeMax = 8;
            if (parcoursCode === 'auto') { tauxConv = 0.78; dureeMin = 2; dureeMax = 5; }
            if (parcoursCode === 'sante') { tauxConv = 0.62; dureeMin = 3; dureeMax = 9; }
            if (parcoursCode === 'vie') { tauxConv = 0.55; dureeMin = 4; dureeMax = 12; }
            if (parcoursCode === 'habitation') { tauxConv = 0.7; dureeMin = 2.5; dureeMax = 7; }
            if (parcoursCode === 'patrimoine') { tauxConv = 0.48; dureeMin = 6; dureeMax = 15; }
            const conversion = Math.random() < tauxConv;
            const etapesParcourues = conversion ? steps : Math.floor(Math.random() * steps);
            const parcours = Array.from({length: etapesParcourues}, (_,i) => i);
            generated.push({
                id: id++,
                type,
                age,
                sexe,
                parcours,
                profil: parcoursCode,
                conversion,
                duree: (dureeMin + Math.random() * (dureeMax-dureeMin)).toFixed(2)
            });
        }
    });
    return generated;
}

// Réinitialisation des states à chaque chargement
function resetStates() {
    window.clients = genererClients();
    window.parcoursTypes = parcoursTypes;
    window.clientTypes = clientTypes;
}

resetStates();
