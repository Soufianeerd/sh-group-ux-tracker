// Visualisation des KPI et tableaux décisionnels
// Utilise window.clients, window.parcoursTypes

function getKpiData() {
    // Exemples de KPI calculés à partir de window.clients
    const parcoursStats = {};
    window.parcoursTypes.forEach(p => {
        parcoursStats[p.code] = {
            label: p.label,
            total: 0,
            conversion: 0,
            abandon: 0,
            duree: 0,
            parTypeClient: {},
        };
    });
    window.clients.forEach(client => {
        const stats = parcoursStats[client.profil];
        if (!stats) return;
        stats.total++;
        // Simuler conversion/abandon/durée pour la démo
        const etapes = window.parcoursTypes.find(p => p.code === client.profil).steps.length;
        const etapesParcourues = Math.floor(Math.random() * (etapes + 1));
        client.parcours = Array.from({length: etapesParcourues}, (_,i) => i);
        if (etapesParcourues === etapes) {
            stats.conversion++;
            stats.duree += 2 + Math.random() * 8; // minutes
        } else {
            stats.abandon++;
            stats.duree += 1 + Math.random() * 3;
        }
        // Par type de client
        if (!stats.parTypeClient[client.type]) stats.parTypeClient[client.type] = {total:0, abandon:0, conversion:0};
        stats.parTypeClient[client.type].total++;
        if (etapesParcourues === etapes) stats.parTypeClient[client.type].conversion++;
        else stats.parTypeClient[client.type].abandon++;
    });
    // Moyenne durée
    Object.values(parcoursStats).forEach(s => { s.duree = s.total ? (s.duree/s.total).toFixed(2) : 0; });
    return parcoursStats;
}

function renderCharts() {
    const stats = getKpiData();
    // Conversion par produit (donut)
    const ctx1 = document.getElementById('conversionChart').getContext('2d');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: Object.values(stats).map(s=>s.label),
            datasets: [{
                label: 'Conversions',
                data: Object.values(stats).map(s=>s.conversion),
                backgroundColor: [
                    '#003366', '#2266aa', '#2d9cdb', '#e9ecef', '#337ab7'
                ],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 8
            }]
        },
        options: {
            responsive:true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {color: '#003366', font: {weight: 'bold'}},
                    onClick: (e, legendItem, legend) => {
                        const ci = legend.chart;
                        const index = legendItem.index;
                        ci.toggleDataVisibility(index);
                        ci.update();
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#003366',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.formattedValue} conversions`;
                        }
                    }
                },
                animation: {animateScale: true, duration: 1200, easing: 'easeOutQuart'}
            },
            hover: {mode: 'nearest', intersect: true}
        }
    });
    // Abandon par produit (line/area)
    const ctx2 = document.getElementById('abandonChart').getContext('2d');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Object.values(stats).map(s=>s.label),
            datasets: [{
                label: 'Abandons',
                data: Object.values(stats).map(s=>s.abandon),
                fill: true,
                backgroundColor: 'rgba(45,156,219,0.10)',
                borderColor: '#2266aa',
                tension: 0.4,
                pointBackgroundColor: '#003366',
                pointRadius: 4
            }]
        },
        options: {
            responsive:true,
            plugins: {
                legend: {display: false},
                tooltip: {
                    enabled: true,
                    backgroundColor: '#003366',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.formattedValue} abandons`;
                        }
                    }
                },
                animation: {duration: 1200, easing: 'easeOutQuart'}
            },
            scales: {
                y: {grid:{color:'#e9ecef'}, ticks:{color:'#003366'}},
                x: {grid:{color:'#e9ecef'}, ticks:{color:'#003366'}}
            },
            hover: {mode: 'nearest', intersect: true}
        }
    });
    // Engagement par type client (radar)
    const ctx3 = document.getElementById('engagementChart').getContext('2d');
    const typeLabels = window.clientTypes;
    const engagementData = typeLabels.map(type => {
        let total = 0, conv = 0;
        Object.values(stats).forEach(s => {
            if (s.parTypeClient[type]) {
                total += s.parTypeClient[type].total;
                conv += s.parTypeClient[type].conversion;
            }
        });
        return total ? (100*conv/total).toFixed(1) : 0;
    });
    new Chart(ctx3, {
        type: 'radar',
        data: {
            labels: typeLabels,
            datasets: [{
                label: 'Engagement (%)',
                data: engagementData,
                backgroundColor: 'rgba(34,102,170,0.15)',
                borderColor: '#2266aa',
                pointBackgroundColor: '#003366',
                pointBorderColor: '#fff',
                pointRadius: 5
            }]
        },
        options: {
            responsive:true,
            plugins: {
                legend: {display: false},
                tooltip: {
                    enabled: true,
                    backgroundColor: '#003366',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.formattedValue} % engagement`;
                        }
                    }
                },
                animation: {duration: 1200, easing: 'easeOutCubic'}
            },
            scales: {
                r: {
                    angleLines: {color: '#e9ecef'},
                    grid: {color: '#e9ecef'},
                    pointLabels: {color: '#003366'},
                    ticks: {color: '#2266aa', backdropColor: 'transparent'}
                }
            },
            hover: {mode: 'nearest', intersect: true}
        }
    });
    // Tableaux décisionnels côte à côte, chiffres réalistes, base 437 500 clients
    const tablesDiv = document.getElementById('decision-tables');
    const totalClients = 437500;
    // Répartition réaliste (engagement élevé, abandon faible)
    let html = `<div><h3>Taux d’engagement par produit</h3><table><tr><th>Produit</th><th>Engagement (%)</th><th>Nb clients</th></tr>`;
    Object.values(stats).forEach(s => {
        // Engagement entre 72% et 89% selon produit
        let taux = s.total ? (72 + Math.random()*17).toFixed(1) : 0;
        let nb = Math.round((taux/100)*totalClients/5); // réparti sur 5 produits
        html += `<tr><td>${s.label}</td><td>${taux}</td><td>${nb.toLocaleString()}</td></tr>`;
    });
    html += '</table></div>';
    let html2 = `<div><h3>Abandon moyen par profil</h3><table><tr><th>Profil</th><th>Abandon (%)</th><th>Nb clients</th></tr>`;
    typeLabels.forEach(type => {
        // Abandon moyen entre 7% et 18% selon profil
        let taux = (7 + Math.random()*11).toFixed(1);
        let nb = Math.round((taux/100)*totalClients/5);
        html2 += `<tr><td>${type}</td><td>${taux}</td><td>${nb.toLocaleString()}</td></tr>`;
    });
    html2 += '</table></div>';
    tablesDiv.innerHTML = html + html2;
}

document.addEventListener('DOMContentLoaded', renderCharts);
