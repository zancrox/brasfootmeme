(function () {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('brasf-theme');
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  function setTheme(next) {
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('brasf-theme', next);
    const btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.textContent = next === 'dark' ? '☀️ Light mode' : '🌙 Dark mode';
  }

  window.BRASF = window.BRASF || {};
  window.BRASF.setTheme = setTheme;

  document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('[data-site-header]');
    const footer = document.querySelector('[data-site-footer]');

    if (header) {
      header.innerHTML = `
        <div class="topbar">
          <div class="container topbar-inner">
            <a class="brand" href="index.html">
              <div class="brand-mark">US</div>
              <div class="brand-copy">
                <div>Padre Eloy Foot News</div>
                <small>O jornal que trata save de Brasfoot como assunto de Estado</small>
              </div>
            </a>
            <nav class="nav">
              <a class="nav-link" href="index.html#manchetes">Manchetes</a>
              <a class="nav-link" href="index.html#tecnicos">Técnicos</a>
              <a class="nav-link" href="index.html#especiais">Especiais</a>
              <a class="nav-link" href="index.html#bastidores">Bastidores</a>
            </nav>
            <button class="theme-toggle" data-theme-toggle type="button"></button>
          </div>
        </div>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <div class="container footer">
          <strong>Padre Eloy Foot News</strong>
          <small>Site fictício e satírico criado para zoeira entre amigos no universo do Brasfoot.</small>          
        </div>
      `;
    }

    const btn = document.querySelector('[data-theme-toggle]');
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    if (btn) {
      btn.textContent = current === 'dark' ? '☀️ Light mode' : '🌙 Dark mode';
      btn.addEventListener('click', function () {
        const now = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(now === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();
