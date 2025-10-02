async function loadProjects() {
  try {
    const res = await fetch('projects.json', {cache: 'no-store'});
    const data = await res.json();
    const grid = document.querySelector('#projects-grid');
    if (!grid) return;
    grid.innerHTML = data.map(p => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card project-card h-100">
          <img class="project-thumb" src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-2">${p.title}</h5>
            <div class="mb-2">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
            <p class="card-text flex-grow-1">${p.summary}</p>
            <div class="mt-2 d-flex gap-2 flex-wrap">
              ${p.repo ? `<a class="btn btn-sm btn-outline-dark" href="${p.repo}" target="_blank" rel="noopener">Code</a>` : ''}
              ${p.demo ? `<a class="btn btn-sm btn-dark" href="${p.demo}" target="_blank" rel="noopener">Live</a>` : ''}
              ${p.video ? `<button class="btn btn-sm btn-secondary" data-video="${p.video}" onclick="openVideo(this)">Video</button>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

function openVideo(btn){
  const url = btn.getAttribute('data-video');
  const iframe = document.querySelector('#videoModal iframe');
  iframe.src = url + '?autoplay=1';
  const modalEl = document.getElementById('videoModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
  modalEl.addEventListener('hidden.bs.modal', () => { iframe.src = ''; }, {once:true});
}

document.addEventListener('DOMContentLoaded', loadProjects);