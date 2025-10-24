document.addEventListener("DOMContentLoaded", async () => {
    async function loadComponent(id, path) {
      try {
        const res = await fetch(path);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
      } catch (err) {
        console.error(`Error al cargar ${path}:`, err);
      }
    }
  
    // Cargar header y footer
    await Promise.all([
      loadComponent("header", "/componentes/header.html"),
      loadComponent("footer", "componentes/footer.html")
    ]);
  
    // Una vez que el header se haya cargado, inicializamos los eventos
    initMenu();
    initAnimations();
    initFAQ();
  });
  
  
  // === MENÚ MOBILE ===
  function initMenu() {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className =
      "fixed inset-0 bg-black/80 opacity-0 pointer-events-none transition-opacity duration-300 z-40 md:hidden";
    document.body.appendChild(overlay);
  
    const icon = document.getElementById("menu-icon");
    let isOpen = false;
  
    const openMenu = () => {
      isOpen = true;
      menu.classList.remove("translate-x-full");
      overlay.classList.remove("opacity-0", "pointer-events-none");
      overlay.classList.add("opacity-100");
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      document.body.style.overflow = "hidden";
    };
  
    const closeMenu = () => {
      isOpen = false;
      menu.classList.add("translate-x-full");
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100");
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      document.body.style.overflow = "";
    };
  
    btn.addEventListener("click", () => (isOpen ? closeMenu() : openMenu()));
    overlay.addEventListener("click", closeMenu);
  
    // Cerrar menú al hacer clic en un enlace
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }