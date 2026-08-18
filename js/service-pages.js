(function(){
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('service-page-ready');

  function navigate(url){
    if(reduced || !document.startViewTransition){ window.location.href=url; return; }
    document.startViewTransition(()=>{ window.location.href=url; });
  }
  document.querySelectorAll('a[data-page-transition]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href=a.href;
      if(!href || a.target==='_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if(new URL(href,location.href).origin!==location.origin) return;
      e.preventDefault(); navigate(href);
    });
  });

  const els=document.querySelectorAll('[data-service-reveal]');
  if('IntersectionObserver' in window && !reduced){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); } });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>io.observe(el));
  }else els.forEach(el=>el.classList.add('is-visible'));

  const toggle=document.getElementById('navToggle');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const open=document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
      toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
    });
    document.querySelectorAll('.nav-links a,.nav-cta').forEach(a=>a.addEventListener('click',()=>{
      document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded','false');
    }));
  }
})();
