const searchInput = document.getElementById('faq-search');
const resultsCount = document.querySelector('.search-results-count');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// Suche durchführen
function searchFAQs(query) {
  const q = query.toLowerCase().trim();

  document.querySelectorAll('.faq-card').forEach(card => {
    const title = card.dataset.title || '';
    const content = card.dataset.content || '';
    const category = card.dataset.category || '';
    
    // Prüfe ob Query in Titel/Content/Kategorie vorhanden ist
    const matches = q === '' || title.includes(q) || content.includes(q) || category.toLowerCase().includes(q);
    
    // Prüfe auch Filter
    const categoryMatches = currentFilter === 'all' || category === currentFilter;
    
    if (matches && categoryMatches) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Kategorie-Gruppen: zeige nur wenn Cards sichtbar sind
  document.querySelectorAll('.faq-category-group').forEach(group => {
    const visibleCards = group.querySelectorAll('.faq-card:not([style*="display: none"])').length;
    group.style.display = visibleCards > 0 ? 'block' : 'none';
  });

  // Results Counter
  const totalVisible = document.querySelectorAll('.faq-card:not([style*="display: none"])').length;
  if (q) {
    resultsCount.textContent = totalVisible === 0 
      ? 'Keine Ergebnisse' 
      : `${totalVisible} Ergebnis${totalVisible !== 1 ? 'se' : ''}`;
  } else {
    resultsCount.textContent = '';
  }
}

// Echtzeit-Suche beim Tippen
searchInput.addEventListener('input', (e) => {
  searchFAQs(e.target.value);
});

// Filter-Buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active-Klasse wechseln
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Neuer Filter
    currentFilter = btn.dataset.category;
    
    // Suche mit aktuellem Query + neuem Filter anwenden
    searchFAQs(searchInput.value);
  });
});
