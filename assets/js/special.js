(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const key = document.body.dataset.special;
    const data = window.BRASF_DATA || {};
    const article = data.specials?.[key];
    if (!article) return;
    document.title = `${article.title} | Padre Eloy Foot News`;

    const hero = document.querySelector('[data-special-hero]');
    const title = document.querySelector('[data-special-title]');
    const category = document.querySelector('[data-special-category]');
    const subtitle = document.querySelector('[data-special-subtitle]');
    const lede = document.querySelector('[data-special-lede]');
    const sections = document.querySelector('[data-special-sections]');
    const related = document.querySelector('[data-special-related]');

    if (hero) hero.style.backgroundImage = `url('${article.heroImage}')`;
    if (title) title.textContent = article.title;
    if (category) category.textContent = article.category;
    if (subtitle) subtitle.textContent = article.subtitle;
    if (lede) lede.textContent = article.lede;

    if (sections) {
      sections.innerHTML = article.sections.map(section => `
        <div class="section-block">
          <h3>${section.heading}</h3>
          ${section.text.map(text => `<p>${text}</p>`).join('')}
        </div>
      `).join('');
    }

    if (related) {
      related.innerHTML = article.related.map(item => `
        <a class="mini-link" href="${item.url}">
          ${item.title}
          <span>Ir para o conteúdo relacionado.</span>
        </a>
      `).join('');
    }
  });
})();
