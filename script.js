const teacherImage = document.getElementById('teacherImage');
const creatorImage = document.getElementById('creatorImage');

function showImage(img) {
  if (!img) return;
  const reveal = () => {
    if (img.naturalWidth > 0) {
      img.hidden = false;
      const empty = img.parentElement?.querySelector('.image-empty');
      if (empty) empty.hidden = true;
    }
  };
  if (img.complete) reveal();
  img.addEventListener('load', reveal, { once: true });
  img.addEventListener('error', () => { img.hidden = true; }, { once: true });
}

showImage(teacherImage);
showImage(creatorImage);

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});