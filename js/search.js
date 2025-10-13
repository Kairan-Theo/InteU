(function(){
  const KEY = 'recentSearches';

  function saveSearch(payload){
    try {
      const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
      arr.unshift({
        keyword: (payload.keyword||'').trim(),
        location: payload.location||'',
        industry: payload.industry||'',
        language: payload.language||'',
        nationality: payload.nationality||'',
        ts: Date.now()
      });
      localStorage.setItem(KEY, JSON.stringify(arr.slice(0, 8)));
    } catch(e){ /* noop */ }
  }

  function getRecentSearches(){
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  }

  function renderChips(el, items, onClick){
    if (!el) return;
    el.innerHTML = '';
    items.forEach((it) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      const text = [it.keyword, it.location, it.industry].filter(Boolean).join(' · ');
      chip.textContent = text || 'Any search';
      chip.addEventListener('click', () => onClick(it));
      el.appendChild(chip);
    });
  }

  function normalize(str){ return (str||'').toString().toLowerCase(); }

  window.SearchUtils = { saveSearch, getRecentSearches, renderChips, normalize };
})();