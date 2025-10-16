// Actualizar el año automáticamente
document.getElementById('year').textContent = new Date().getFullYear();

// ----- Menú móvil -----
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  const icon = document.getElementById('menu-icon');
  
  if (!btn || !menu || !overlay || !icon) {
    console.error('No se encontraron elementos del menú móvil');
    return;
  }

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    menu.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100');
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    isOpen = false;
    menu.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Cerrar menú al hacer clic en enlaces
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  console.log('Menú móvil inicializado correctamente');
});

// ----- Animación scroll -----
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
});

// ----- Slider automático -----
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById('slider');
  if (slider) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % 3;
      slider.style.transform = `translateX(-${index * 100}%)`;
    }, 4000);
  }
});

// ----- FAQ Dinámico -----
document.addEventListener("DOMContentLoaded", () => {
  const faqs = [
    {
      question: "¿Necesito experiencia previa para usar los simuladores?",
      answer: "No es necesario tener experiencia previa. Nuestros instructores te guiarán desde el primer momento y adaptaremos la dificultad según tu nivel.",
    },
    {
      question: "¿Qué edad mínima se requiere?",
      answer: "La edad mínima es de 12 años. Los menores de 16 años deben estar acompañados por un adulto responsable.",
    },
    {
      question: "¿Puedo cancelar o reprogramar mi reserva?",
      answer: "Sí, puedes cancelar o reprogramar tu reserva hasta 24 horas antes de la sesión sin costo adicional.",
    },
    {
      question: "¿Qué incluye la sesión?",
      answer: "Cada sesión incluye instrucción básica, uso del simulador, análisis de rendimiento y foto de recuerdo. Los paquetes premium incluyen beneficios adicionales.",
    },
    {
      question: "¿Tienen estacionamiento disponible?",
      answer: "Sí, contamos con estacionamiento gratuito para nuestros clientes en el mismo edificio.",
    },
    {
      question: "¿Qué medidas de seguridad implementan?",
      answer: "Todos nuestros equipos se desinfectan después de cada uso. Proporcionamos cascos individuales y seguimos estrictos protocolos de higiene.",
    },
  ];

  const faqContainer = document.getElementById("faq-container");
  
  if (faqContainer) {
    faqs.forEach((faq) => {
      const details = document.createElement("details");
      details.className = "group bg-neutral-900 rounded-xl border border-neutral-800 p-5 transition-all hover:border-orange-500/60 hover:bg-neutral-800/70";

      details.innerHTML = `
        <summary class="cursor-pointer flex justify-between items-center text-lg font-semibold text-white select-none">
          <span>${faq.question}</span>
          <span class="transition-transform duration-300 text-orange-400 group-open:rotate-45">＋</span>
        </summary>
        <p class="text-gray-400 mt-3 pl-1 leading-relaxed">${faq.answer}</p>
      `;

      faqContainer.appendChild(details);
    });
  }
});

// ----- Carousel -----
(function(){
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const items = track.children;
  const total = items.length;
  let index = 0;

  const dotsContainer = document.getElementById('dots');
  for (let i = 0; i < total; i++) {
    const d = document.createElement('span');
    d.className =
      'w-2.5 h-2.5 rounded-full bg-gray-600 mx-1.5 inline-block opacity-60' +
      (i === 0
        ? ' bg-racemax-orange opacity-100 shadow-[0_0_6px_rgba(216,97,16,0.5)]'
        : '');
    d.dataset.i = i;
    dotsContainer.appendChild(d);
    d.addEventListener('click', (e) => {
      goTo(parseInt(e.target.dataset.i));
    });
  }

  function update() {
    const pct = -100 * index;
    track.style.transform = 'translateX(' + pct + '%)';
    document.querySelectorAll('#dots span').forEach((el, i) => {
      el.className =
        'w-2.5 h-2.5 rounded-full mx-1.5 inline-block ' +
        (i === index
          ? 'bg-racemax-orange opacity-100 shadow-[0_0_6px_rgba(216,97,16,0.5)]'
          : 'bg-gray-600 opacity-60');
    });
  }

  window.goTo = function (i) {
    index = (i + total) % total;
    update();
  };

  document.getElementById('prev')?.addEventListener('click', () => {
    goTo(index - 1);
  });
  document.getElementById('next')?.addEventListener('click', () => {
    goTo(index + 1);
  });

  // Autoplay
  let autoplay = setInterval(() => {
    goTo(index + 1);
  }, 4000);

  // Pausar en hover
  const carouselEl = document.getElementById('carousel');
  carouselEl?.addEventListener('mouseenter', () => clearInterval(autoplay));
  carouselEl?.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(index + 1), 4000);
  });
})();

// ----- Smooth scroll para anclas -----
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Solo aplicar smooth scroll a anclas internas (no a enlaces a otras páginas)
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

console.log('RaceMAX JavaScript cargado correctamente');