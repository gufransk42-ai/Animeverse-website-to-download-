// script.js - simple loader for posts and characters

document.getElementById('year')?.textContent = new Date().getFullYear();

// Helper to fetch JSON
async function fetchJSON(path){
  try {
    const res = await fetch(path);
    if(!res.ok) throw new Error('Fetch failed');
    return await res.json();
  } catch(e) {
    console.error('Error fetching', path, e);
    return null;
  }
}

// If on characters page, load characters
if(location.pathname.endsWith('characters.html')){
  (async ()=>{
    const data = await fetchJSON('/data/characters.json');
    if(!data) return;
    const grid = document.createElement('div');
    grid.className = 'char-grid container';
    data.characters.forEach(ch => {
      const card = document.createElement('article');
      card.className = 'char-card';
      const img = document.createElement('img');
      img.src = ch.image;
      img.alt = ch.name;
      // aura classes
      if(ch.alignment && ch.alignment.toLowerCase()==='hero') img.className='hero-visual';
      else if(ch.alignment && ch.alignment.toLowerCase()==='villain') img.className='villain-visual';
      const info = document.createElement('div');
      info.className='char-info';
      info.innerHTML = `<h3 class="char-name">${ch.name}</h3>
                        <div class="char-meta">${ch.alignment ? ch.alignment + ' • ' : ''}${ch.series || ''}</div>
                        <p><strong>Power:</strong> ${ch.power || '—'}</p>
                        <p><strong>Skills:</strong> ${ch.skills ? ch.skills.join(', ') : '—'}</p>
                        <p><strong>Forms:</strong> ${ch.forms ? ch.forms.join(', ') : '—'}</p>
                        <details><summary>Full Stats & Attacks</summary><pre style="white-space:pre-wrap">${ch.details || 'No details'}</pre></details>`;
      card.appendChild(img);
      card.appendChild(info);
      grid.appendChild(card);
    });
    document.body.appendChild(grid);
  })();
}

// If on news page, load posts
if(location.pathname.endsWith('news.html')){
  (async ()=>{
    const data = await fetchJSON('/data/posts.json');
    const container = document.querySelector('.container');
    const section = document.createElement('section');
    section.innerHTML = '<h2>Latest News</h2>';
    if(!data || !data.posts || !data.posts.length){
      section.innerHTML += '<p>No posts yet.</p>';
    } else {
      const list = document.createElement('div');
      list.style.display='grid';
      list.style.gap='12px';
      data.posts.forEach(p=>{
        const el = document.createElement('article');
        el.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))';
        el.style.padding='12px'; el.style.borderRadius='8px';
        el.innerHTML = `<h3>${p.title}</h3><div style="color:var(--muted)">${p.date}</div><p>${p.excerpt}</p><a href="${p.url || '#'}">Read more</a>`;
        list.appendChild(el);
      });
      section.appendChild(list);
    }
    container.appendChild(section);
  })();
}
