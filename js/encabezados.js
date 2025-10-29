document.addEventListener("DOMContentLoaded", async () => {
  // ====== FUNCION PARA CARGAR COMPONENTES ======
  async function loadComponent(id, path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
      console.log(`✅ ${path} cargado en #${id}`);
    } catch (err) {
      console.error(`❌ Error al cargar ${path}:`, err);
    }
  }

  // ====== DETECTA RUTA SEGÚN UBICACIÓN DEL HTML ======
  const basePath = window.location.pathname.includes("/pages/")
    ? "../componentes/"
    : "componentes/";

  // ====== CARGAR HEADER PRIMERO ======
  await loadComponent("header", `${basePath}header.html`);
  initMenu();

  // ====== LUEGO EL FOOTER ======
  await loadComponent("footer", `${basePath}footer.html`);

  // ====== INICIALIZAR OTRAS FUNCIONES SI EXISTEN ======
  if (typeof initAnimations === "function") initAnimations();
  if (typeof initFAQ === "function") initFAQ();
});


// === MENÚ MOBILE ===
function initMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");

  if (!btn || !menu || !icon) {
    console.warn("⚠️ Elementos del menú no encontrados, revisa el header.html");
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className =
    "fixed inset-0 bg-black/80 opacity-0 pointer-events-none transition-opacity duration-300 z-40 md:hidden";
  document.body.appendChild(overlay);

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
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}
