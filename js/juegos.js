
// Año actual
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const btn = document.getElementById('btn-mobile');
const panel = document.getElementById('mobile-panel');
btn.addEventListener('click', () => panel.classList.toggle('hidden'));

// Datos de circuitos
const circuitos = {
  f1: [
    "Mónaco - Monte Carlo",
    "Silverstone - Reino Unido",
    "Spa-Francorchamps - Bélgica",
    "Monza - Italia",
    "Suzuka - Japón",
    "Interlagos - Brasil",
    "Circuit de Catalunya - España",
    "Red Bull Ring - Austria",
    "Hungaroring - Hungría",
    "Circuit Gilles Villeneuve - Canadá",
    "Marina Bay - Singapur",
    "Yas Marina - Abu Dhabi",
    "Circuit of the Americas - Estados Unidos",
    "Autodromo Hermanos Rodríguez - México",
    "Baku City Circuit - Azerbaiyán",
    "Paul Ricard - Francia",
    "Zandvoort - Países Bajos",
    "Imola - Italia",
    "Portimão - Portugal",
    "Jeddah Corniche Circuit - Arabia Saudí"
  ],
  rally: [
    "Rally de Finlandia - Jyväskylä",
    "Rally de Argentina - Córdoba",
    "Rally de Chile - Concepción",
    "Rally de Portugal - Porto",
    "Rally de Suecia - Torsby",
    "Rally de México - León",
    "Rally de Croacia - Zagreb",
    "Rally de Estonia - Tartu",
    "Rally de Kenia - Naivasha",
    "Rally de Nueva Zelanda - Auckland",
    "Rally de Japón - Aichi",
    "Rally de Bélgica - Ypres",
    "Rally de Grecia - Lamia",
    "Rally de Turquía - Marmaris",
    "Rally de Gales - Cardiff",
    "Rally de Córcega - Ajaccio",
    "Rally de Alemania - Saarland",
    "Rally de Australia - Coffs Harbour"
  ],
  dakar: [
    "Etapa 1: Riyadh - Al Henakiyah",
    "Etapa 2: Al Henakiyah - Al Ula",
    "Etapa 3: Al Ula - Hail",
    "Etapa 4: Hail - Sakaka",
    "Etapa 5: Sakaka - Neom",
    "Etapa 6: Neom - Al Ula",
    "Etapa 7: Al Ula - Riyadh",
    "Etapa 8: Riyadh - Al Duwadimi",
    "Etapa 9: Al Duwadimi - Riyadh",
    "Etapa 10: Riyadh - Haradh",
    "Etapa 11: Haradh - Shubaytah",
    "Etapa 12: Shubaytah - Riyadh",
    "Etapa Maratón: Empty Quarter",
    "Etapa Final: Yanbu - Jeddah"
  ],
  tc2000: [
    "Autódromo Oscar Alfredo Gálvez - Buenos Aires",
    "Autódromo Juan Domingo Perón - Buenos Aires",
    "Autódromo Roberto José Mouras - La Plata",
    "Autódromo Rosamonte de Posadas - Misiones",
    "Autódromo Ciudad de Rafaela - Santa Fe",
    "Autódromo Parque Ciudad de Río Cuarto - Córdoba",
    "Autódromo de Concepción del Uruguay - Entre Ríos",
    "Autódromo Eusebio Marcilla - Junín",
    "Autódromo Ciudad de Paraná - Entre Ríos",
    "Autódromo de Olavarría - Buenos Aires",
    "Autódromo San Nicolás - Buenos Aires",
    "Autódromo de Viedma - Río Negro",
    "Autódromo de Neuquén - Neuquén",
    "Autódromo de Mendoza - Mendoza"
  ],
  legendarios: [
    "Nürburgring Nordschleife - Alemania",
    "Le Mans Circuit - Francia",
    "Laguna Seca - Estados Unidos",
    "Brands Hatch - Reino Unido",
    "Bathurst Mount Panorama - Australia",
    "Imola - San Marino",
    "Road America - Estados Unidos",
    "Watkins Glen - Estados Unidos",
    "Sebring International Raceway - Estados Unidos",
    "Daytona International Speedway - Estados Unidos",
    "Indianapolis Motor Speedway - Estados Unidos",
    "Hockenheimring - Alemania",
    "Mugello - Italia",
    "Donington Park - Reino Unido",
    "Phillip Island - Australia",
    "Fuji Speedway - Japón",
    "Motegi - Japón",
    "Jerez - España",
    "Estoril - Portugal",
    "Kyalami - Sudáfrica"
  ]
};

// Función para renderizar circuitos en una categoría
function renderCircuitos(categoria, containerId) {
  const container = document.getElementById(containerId);
  const circuitosList = container.querySelector('.space-y-2');
  circuitosList.innerHTML = '';
  
  circuitos[categoria].forEach(circuito => {
    const circuitoElement = document.createElement('div');
    circuitoElement.className = 'text-sm';
    circuitoElement.innerHTML = `<strong>${circuito}</strong>`;
    circuitosList.appendChild(circuitoElement);
  });
}

// Event listeners para botones "Ver Todos"
document.querySelectorAll('.ver-todos-btn').forEach(button => {
  button.addEventListener('click', function() {
    const categoria = this.getAttribute('data-category');
    const containerId = `circuitos-${categoria}`;
    const container = document.getElementById(containerId);
    
    // Si ya está visible, ocultarlo
    if (!container.classList.contains('hidden')) {
      container.classList.add('hidden');
      return;
    }
    
    // Ocultar todos los demás contenedores
    document.querySelectorAll('[id^="circuitos-"]').forEach(el => {
      el.classList.add('hidden');
    });
    
    // Renderizar y mostrar el contenedor seleccionado
    renderCircuitos(categoria, containerId);
    container.classList.remove('hidden');
    
    // Desplazar la vista hacia la categoría
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

// Event listeners para botones "Ocultar"
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('ocultar-btn')) {
    const container = e.target.closest('[id^="circuitos-"]');
    container.classList.add('hidden');
  }
});

// Inicializar renderizado de circuitos (ocultos inicialmente)
Object.keys(circuitos).forEach(categoria => {
  renderCircuitos(categoria, `circuitos-${categoria}`);
});