document.addEventListener('DOMContentLoaded', function(){
  // Loader control (fade + spinner)
  const overlay = document.querySelector('.page-overlay');
  if(overlay){
    setTimeout(()=>{ overlay.classList.add('hide'); setTimeout(()=>overlay.remove(),600); }, 700);
  }

  // Music handling
  const bgm = document.getElementById('bgm');
  if(bgm){
    function startMusicOnce(){
      bgm.play().catch(()=>{});
      document.removeEventListener('click', startMusicOnce);
      window.removeEventListener('scroll', startMusicOnce);
    }
    document.addEventListener('click', startMusicOnce);
    window.addEventListener('scroll', startMusicOnce);

    // Inject music button
    const btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.title = 'Play / Pause musik';
    btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    document.body.appendChild(btn);
    const icon = btn.querySelector('i');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if(bgm.paused){ bgm.play().catch(()=>{}); icon.classList.replace('fa-play','fa-pause'); }
      else { bgm.pause(); icon.classList.replace('fa-pause','fa-play'); }
    });
    bgm.addEventListener('play', ()=>{ if(icon) icon.classList.replace('fa-play','fa-pause'); });
    bgm.addEventListener('pause', ()=>{ if(icon) icon.classList.replace('fa-pause','fa-play'); });
  }

  // Fade-in on scroll
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('show'); });
  }, {threshold: 0.18});
  const toFade = document.querySelectorAll('.card, .hero, section h2, .galeri-grid img, .contact-item');
  toFade.forEach(el=>{ el.classList.add('fade-init'); observer.observe(el); });

  // Page transitions: fade out body on internal link click
  const links = Array.from(document.querySelectorAll('a[href]')).filter(a=>{
    const href = a.getAttribute('href');
    return href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#');
  });
  links.forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const dest = this.getAttribute('href');
      document.body.style.opacity = '0';
      setTimeout(()=>{ window.location.href = dest; }, 500);
    });
  });
});