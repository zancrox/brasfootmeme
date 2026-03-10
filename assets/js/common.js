(function () {
  function cycleText(container, items, interval) {
    if (!container || !items || !items.length) return;
    container.innerHTML = items.map((item, index) =>
      `<span class="ticker-item${index === 0 ? ' active' : ''}">${item}</span>`
    ).join('');
    let current = 0;
    setInterval(() => {
      const nodes = Array.from(container.querySelectorAll('.ticker-item'));
      nodes[current].classList.remove('active');
      current = (current + 1) % nodes.length;
      nodes[current].classList.add('active');
    }, interval || 10000);
  }

  window.BRASF = window.BRASF || {};
  window.BRASF.cycleText = cycleText;
})();
