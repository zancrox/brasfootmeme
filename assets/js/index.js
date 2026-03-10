(function () {
  function maybePointsLabel(points) {
    return points === null || points === undefined ? 'Pontuação não informada' : `${points} pts`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const data = window.BRASF_DATA || {};
    const images = window.BRASF_IMAGES || {};
    const hero = document.querySelector('[data-hero]');
    const ticker = document.querySelector('[data-ticker]');
    const stories = document.querySelector('[data-story-grid]');
    const specials = document.querySelector('[data-special-grid]');
    const rivalries = document.querySelector('[data-rivalries]');
    const ranking = document.querySelector('[data-ranking]');

    if (hero) {
      hero.style.backgroundImage = `url('${images.news?.breakingChaos || images.homeHero || ''}')`;
    }

    if (window.BRASF && ticker) {
      window.BRASF.cycleText(ticker, data.tickerItems || [], 10000);
    }

    if (stories && Array.isArray(data.coaches)) {
      stories.innerHTML = data.coaches.map((coach) => `
        <article class="story-card">
          <img src="${images.teams?.[coach.slug] || ''}" alt="Imagem do time ${coach.team}">
          <div class="story-body">
            <span class="badge">${coach.currentDivision}</span>
            <h3>${coach.name} em ${coach.team}</h3>
            <p>${coach.summary}</p>
            <div class="story-meta">
              <span>${maybePointsLabel(coach.points)}</span>
              <a class="story-link" href="${coach.slug}.html">Ler perfil →</a>
            </div>
          </div>
        </article>
      `).join('');
    }

    if (specials && Array.isArray(data.specialCards)) {
      specials.innerHTML = data.specialCards.map((item) => `
        <article class="story-card">
          <img src="${item.image}" alt="${item.title}">
          <div class="story-body">
            <span class="badge">${item.category}</span>
            <h3>${item.title}</h3>
            <p>${item.subtitle}</p>
            <div class="story-meta">
              <span>Reportagem especial</span>
              <a class="story-link" href="${item.url}">Abrir especial →</a>
            </div>
          </div>
        </article>
      `).join('');
    }

    if (rivalries && Array.isArray(data.familyRivalries)) {
      rivalries.innerHTML = `<ul>${data.familyRivalries.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    if (ranking && Array.isArray(data.coaches)) {
      const rankingOrder = [...data.coaches].sort((a, b) => {
        const pointsA = a.points ?? -1;
        const pointsB = b.points ?? -1;
        return pointsB - pointsA;
      });

      ranking.innerHTML = rankingOrder.map((coach, index) => `
        <div class="metric">
          <div>
            <strong>${index + 1}. ${coach.name}</strong>
            <span>${coach.team}</span>
          </div>
          <strong>${coach.points ?? 'N/I'} pts</strong>
        </div>
      `).join('');
    }
  });
})();
