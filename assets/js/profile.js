(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const slug = document.body.dataset.coach;
    const data = window.BRASF_DATA || {};
    const images = window.BRASF_IMAGES || {};
    const coach = (data.coaches || []).find(item => item.slug === slug);
    if (!coach) return;

    document.title = `${coach.name} | Padre Eloy Foot News`;

    const el = {
      name: document.querySelector('[data-profile-name]'),
      badge: document.querySelector('[data-profile-badge]'),
      headline: document.querySelector('[data-profile-headline]'),
      summary: document.querySelector('[data-profile-summary]'),
      coachImage: document.querySelector('[data-profile-coach-image]'),
      teamImage: document.querySelector('[data-profile-team-image]'),
      kpis: document.querySelector('[data-profile-kpis]'),
      trajectory: document.querySelector('[data-profile-trajectory]'),
      additional: document.querySelector('[data-profile-additional]'),
      narrative: document.querySelector('[data-profile-narrative]'),
      quotes: document.querySelector('[data-profile-quotes]'),
      results: document.querySelector('[data-profile-results]'),
      related: document.querySelector('[data-profile-related]'),
    };

    if (el.name) el.name.textContent = coach.name;
    if (el.badge) el.badge.textContent = `${coach.team} • ${coach.currentDivision}`;
    if (el.headline) el.headline.textContent = coach.headline;
    if (el.summary) el.summary.textContent = coach.tagline;
    if (el.coachImage) { el.coachImage.src = images.coaches?.[coach.slug] || ''; el.coachImage.alt = `Imagem de ${coach.name}`; }
    if (el.teamImage) { el.teamImage.src = images.teams?.[coach.slug] || ''; el.teamImage.alt = `Imagem de ${coach.team}`; }

    if (el.kpis) {
      const points = coach.points === null || coach.points === undefined ? 'Não informado' : coach.points;
      el.kpis.innerHTML = `
        <div class="kpi"><strong>${points}</strong><span>Pontos de técnico</span></div>
        <div class="kpi"><strong>${coach.team}</strong><span>Clube atual</span></div>
        <div class="kpi"><strong>${coach.tenure}</strong><span>Período atual</span></div>
      `;
    }

    if (el.trajectory) el.trajectory.textContent = coach.trajectory;
    if (el.additional) el.additional.textContent = coach.additional;
    if (el.narrative) {
      el.narrative.innerHTML = coach.narrative.map(item => `<p>${item}</p>`).join('');
    }

    if (el.quotes) {
      el.quotes.innerHTML = coach.quotes.map(item => `<div class="quote">“${item}”</div>`).join('');
    }

    if (el.results) {
      el.results.innerHTML = `
        <table class="timeline-table">
          <thead><tr><th>Ano</th><th>Campanha</th></tr></thead>
          <tbody>
            ${coach.results.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
    }

    if (el.related) {
      const profileRelated = coach.deepLinks || [];
      el.related.innerHTML = profileRelated.map(item => `
        <a class="mini-link" href="${item.url}">
          ${item.title}
          <span>Abra a matéria aprofundada ligada a este técnico.</span>
        </a>
      `).join('');
    }
  });
})();
