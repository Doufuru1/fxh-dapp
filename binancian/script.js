document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.principle-card, .token-card, .allocation-card, .roadmap-item, details').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});

const style = document.createElement('style');
style.textContent = `.reveal{opacity:0;transform:translateY(15px);transition:opacity .6s ease,transform .6s ease}.reveal.is-visible{opacity:1;transform:none}`;
document.head.appendChild(style);
