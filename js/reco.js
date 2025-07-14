// Génération de recommandations UX selon les KPI
// Utilise getKpiData()

function genererRecommandations() {
    const stats = getKpiData();
    const reco = [];
    Object.values(stats).forEach(s => {
        if (s.abandon/s.total > 0.3) {
            reco.push(`⚠️ Taux d’abandon élevé sur ${s.label} : simplifier les étapes ou améliorer la clarté.`);
        }
        if (s.duree > 6) {
            reco.push(`⏱️ Durée moyenne élevée sur ${s.label} : réduire le nombre d’informations demandées.`);
        }
    });
    return reco;
}

document.addEventListener('DOMContentLoaded', () => {
    const recoList = document.getElementById('reco-list');
    if (recoList) {
        const recos = genererRecommandations();
        recoList.innerHTML = recos.length ? recos.map(r=>`<li>${r}</li>`).join('') : '<li>👍 Aucun point de friction majeur détecté.</li>';
    }
    // Ticket Jira exemple
    const ticket = `
En tant que Business Analyst,
Je veux visualiser le taux d’abandon par étape
Afin de prioriser les optimisations UX sur les parcours critiques.
Critères d’acceptation :
- Le taux d’abandon est affiché par produit et profil
- Les recommandations UX sont générées automatiquement
- Les données sont exportables pour Power BI
`;
    const jira = document.getElementById('jira-ticket');
    if (jira) jira.textContent = ticket;
    // Export CSV/JSON
    document.getElementById('export-csv')?.addEventListener('click', () => exportData('csv'));
    document.getElementById('export-json')?.addEventListener('click', () => exportData('json'));
});

function exportData(format) {
    const stats = getKpiData();
    if (format === 'csv') {
        let csv = 'Produit,Conversions,Abandons,Durée moyenne\n';
        Object.values(stats).forEach(s => {
            csv += `${s.label},${s.conversion},${s.abandon},${s.duree}\n`;
        });
        downloadFile(csv, 'Kpi_ShGrp.csv', 'text/csv');
    } else {
        downloadFile(JSON.stringify(stats, null, 2), 'Kpi_ShGrp.json', 'application/json');
    }
}

function downloadFile(data, filename, type) {
    const blob = new Blob([data], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}
