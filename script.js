class PromptGenerator {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('promptFavorites') || '[]');
    this.usage = JSON.parse(localStorage.getItem('promptUsage') || '{}');
    this.init();
  }

  init() {
    document.getElementById('generate').addEventListener('click', () => this.generate());
    document.querySelectorAll('.tab-btn').forEach(b =>
      b.addEventListener('click', () => this.showTab(b.dataset.tab)));
    document.getElementById('export-csv').addEventListener('click', () => this.exportCSV());
    document.getElementById('export-json').addEventListener('click', () => this.exportJSON());
    this.updateFavoritesUI();
    this.checkLimit();
  }

  todayKey() {
    return new Date().toDateString();
  }

  checkLimit() {
    const key = this.todayKey();
    if (!this.usage[key]) this.usage[key] = 0;
    const reached = this.usage[key] >= 3;
    document.getElementById('freemium-notice').style.display = reached ? 'block' : 'none';
    document.getElementById('generate').disabled = reached;
  }

  generate() {
    const key = this.todayKey();
    if (!this.usage[key]) this.usage[key] = 0;
    if (this.usage[key] >= 3) {
      alert('Free limit reached for today.');
      this.checkLimit();
      return;
    }

    const config = {
      niche: document.getElementById('niche').value,
      goal: document.getElementById('goal').value,
      platform: document.getElementById('platform').value,
      tone: document.getElementById('tone').value,
      format: document.getElementById('format').value
    };

    this.usage[key]++;
    localStorage.setItem('promptUsage', JSON.stringify(this.usage));
    this.checkLimit();

    const prompts = this.buildPrompts(config);
    this.renderPrompts(prompts, config);
  }

  buildPrompts(c) {
    const base =
      `Create a ${c.format} for a ${c.niche} business focused on ${c.goal} on ${c.platform}. ` +
      `Use a ${c.tone} tone, include a strong hook, 2–3 benefits, social proof, and a clear CTA.`;

    return [
      base,
      base + ' Make it suitable for a 60‑second video.',
      base + ' Optimise for cold audiences who never heard of the brand.',
      base + ' Add scarcity and urgency in a natural way.',
      base + ' Include a variation targeted at mobile-only users.'
    ];
  }

  renderPrompts(prompts, config) {
    const box = document.getElementById('prompts-container');
    box.innerHTML = '';
    prompts.forEach(text => {
      const card = document.createElement('div');
      card.className = 'prompt-card';
      card.innerHTML = `
        <div class="prompt-text">${text}</div>
        <div class="prompt-actions">
          <button class="btn btn-copy">Copy</button>
          <button class="btn btn-favorite">Save</button>
        </div>`;
      card.querySelector('.btn-copy').onclick = () => this.copy(text);
      card.querySelector('.btn-favorite').onclick = () => this.addFavorite(text, config);
      box.appendChild(card);
    });
  }

  copy(text) {
    navigator.clipboard?.writeText(text).then(() => {
      alert('Copied to clipboard');
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('Copied to clipboard');
    });
  }

  addFavorite(prompt, config) {
    this.favorites.unshift({ id: Date.now(), prompt, config, savedAt: new Date().toISOString() });
    localStorage.setItem('promptFavorites', JSON.stringify(this.favorites));
    this.updateFavoritesUI();
  }

  removeFavorite(id) {
    this.favorites = this.favorites.filter(f => f.id !== id);
    localStorage.setItem('promptFavorites', JSON.stringify(this.favorites));
    this.updateFavoritesUI();
  }

  updateFavoritesUI() {
    document.getElementById('favorites-count').textContent = this.favorites.length;
    const list = document.getElementById('favorites-list');
    if (this.favorites.length === 0) {
      list.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">No favorites yet.</p>';
      return;
    }
    list.innerHTML = '';
    this.favorites.forEach(f => {
      const item = document.createElement('div');
      item.className = 'favorite-item';
      item.innerHTML = `
        <div>
          <strong>${f.config.niche} – ${f.config.format}</strong><br>
          <small>${new Date(f.savedAt).toLocaleString()}</small><br>
          <div style="margin-top:6px;font-size:13px;">${f.prompt}</div>
        </div>
        <div>
          <button class="btn btn-copy" style="margin-bottom:6px;">Copy</button>
          <button class="btn btn-danger">Remove</button>
        </div>`;
      item.querySelector('.btn-copy').onclick = () => this.copy(f.prompt);
      item.querySelector('.btn-danger').onclick = () => this.removeFavorite(f.id);
      list.appendChild(item);
    });
  }

  exportCSV() {
    if (!this.favorites.length) { alert('No favorites to export.'); return; }
    const header = 'niche,goal,platform,tone,format,prompt,savedAt\n';
    const rows = this.favorites.map(f => {
      const c = f.config;
      const safe = f.prompt.replace(/"/g, '""');
      return `"${c.niche}","${c.goal}","${c.platform}","${c.tone}","${c.format}","${safe}","${f.savedAt}"`;
    }).join('\n');
    this.downloadFile('favorites.csv', header + rows, 'text/csv');
  }

  exportJSON() {
    if (!this.favorites.length) { alert('No favorites to export.'); return; }
    this.downloadFile('favorites.json',
      JSON.stringify(this.favorites, null, 2),
      'application/json');
  }

  downloadFile(name, data, type) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  showTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(name).classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${name}"]`).classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.generator = new PromptGenerator();
});
