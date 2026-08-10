const teacherImage = document.getElementById('teacherImage');
const creatorImage = document.getElementById('creatorImage');

function showImage(img) {
  if (!img) return;

  const reveal = () => {
    img.removeAttribute('hidden');
    img.style.display = 'block';
    const empty = img.parentElement?.querySelector('.image-empty');
    if (empty) empty.style.display = 'none';
  };

  if (img.complete && img.naturalWidth > 0) {
    reveal();
  } else {
    img.addEventListener('load', reveal, { once: true });
  }

  img.addEventListener('error', () => {
    console.error('Gagal memuat gambar:', img.src);
  }, { once: true });
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