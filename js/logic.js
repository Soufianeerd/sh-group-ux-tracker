// logiques de simulation de parcours et tracking comportemental
// Utilise window.clients, window.parcoursTypes

function demarrerParcours(typeCode) {
    const parcours = window.parcoursTypes.find(p => p.code === typeCode);
    if (!parcours) return;
    // Génère dynamiquement les étapes dans index.html
    const section = document.getElementById('parcours-simulation');
    section.innerHTML = `<h2>Parcours ${parcours.label}</h2>`;
    let stepsHtml = '<ol class="parcours-steps">';
    parcours.steps.forEach((step, idx) => {
        stepsHtml += `<li data-step="${idx}">${step}</li>`;
    });
    stepsHtml += '</ol>';
    section.innerHTML += stepsHtml;
    section.style.display = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // Sélection parcours
    document.querySelectorAll('.parcours-types button').forEach(btn => {
        btn.addEventListener('click', e => {
            demarrerParcours(btn.getAttribute('data-type'));
        });
    });
    // Nouveau Kanban dynamique propre
    const tasks = [
        {
            id: 'gen-clients',
            label: 'Créer la génération des clients simulés',
            action: () => { resetStates(); alert('Clients simulés générés !'); },
        },
        {
            id: 'sim-auto',
            label: 'Simuler le parcours auto',
            action: () => { demarrerParcours('auto'); document.getElementById('parcours-simulation').scrollIntoView({behavior:'smooth'}); },
        },
        {
            id: 'kpi',
            label: 'Calcul KPI conversion',
            action: () => {
                const stats = window.getKpiData ? window.getKpiData() : (window.stats || {});
                const auto = stats['auto'] ? stats['auto'].conversion : 'N/A';
                alert('Conversions auto actuelles : ' + auto);
            },
        },
        {
            id: 'ui',
            label: 'UI inspirée foyer.lu',
            action: () => { alert('UI conforme à la charte SH Group !'); },
        }
    ];
    // On conserve l'état des tâches faites en localStorage (clé: shgrp_kanban_done)
    let done = [];
    try {
        done = JSON.parse(localStorage.getItem('shgrp_kanban_done') || '[]');
    } catch(e) { done = []; }
    function markDone(taskId) {
        if (!done.includes(taskId)) {
            done.push(taskId);
            localStorage.setItem('shgrp_kanban_done', JSON.stringify(done));
            renderKanban();
        }
    }
    function renderKanban() {
        const todoCol = document.getElementById('kanban-todo');
        const doneCol = document.getElementById('kanban-done');
        if (!todoCol || !doneCol) return;
        // Tâches à faire
        todoCol.innerHTML = '<h3>Tâches à faire</h3>';
        tasks.filter(t => !done.includes(t.id)).forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'kanban-task';
            btn.textContent = t.label;
            btn.onclick = () => { t.action(); markDone(t.id); };
            todoCol.appendChild(btn);
        });
        if (todoCol.childElementCount === 1) {
            const p = document.createElement('div');
            p.textContent = 'Aucune tâche à faire.';
            p.style.color = '#888';
            p.style.margin = '1.5em 0';
            todoCol.appendChild(p);
        }
        // Tâches faites
        doneCol.innerHTML = '<h3>Tâches réalisées</h3>';
        tasks.filter(t => done.includes(t.id)).forEach(t => {
            const div = document.createElement('div');
            div.className = 'kanban-task done';
            div.textContent = t.label + ' ✓';
            doneCol.appendChild(div);
        });
        if (doneCol.childElementCount === 1) {
            const p = document.createElement('div');
            p.textContent = 'Aucune tâche réalisée.';
            p.style.color = '#888';
            p.style.margin = '1.5em 0';
            doneCol.appendChild(p);
        }
    }
    renderKanban();
    // Bouton flottant bas droite pour aller au Dashboard (uniquement sur index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        const dashBtn = document.createElement('button');
        dashBtn.textContent = 'Aller au Dashboard';
        dashBtn.style.position = 'fixed';
        dashBtn.style.bottom = '32px';
        dashBtn.style.right = '32px';
        dashBtn.style.background = '#2266aa';
        dashBtn.style.color = '#fff';
        dashBtn.style.padding = '1em 2em';
        dashBtn.style.border = 'none';
        dashBtn.style.borderRadius = '8px';
        dashBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
        dashBtn.style.fontSize = '1.1em';
        dashBtn.style.fontWeight = 'bold';
        dashBtn.style.cursor = 'pointer';
        dashBtn.style.zIndex = '9999';
        dashBtn.onmouseenter = () => dashBtn.style.background = '#185089';
        dashBtn.onmouseleave = () => dashBtn.style.background = '#2266aa';
        dashBtn.onclick = () => { location.href = 'dashboard.html'; };
        document.body.appendChild(dashBtn);
    }

});

// À compléter : simulation automatique des 100 clients, tracking, etc.
