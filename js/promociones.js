/* =========================
   Configuración de paquetes
   ========================= */
const PACKAGES = {
  colapinto: {
    name: "Colapinto",
    pricePerPerson: 20000,
    hours: 1,
    discountRate: 0.15, // 15%
    benefits: [
      "\n - 1 hora de simulación",
      "\n - 5 circuitos disponibles",
      "\n - Equipamiento básico",
      "\n - Foto digital incluida",
    ],
  },
  hamilton: {
    name: "Hamilton",
    pricePerPerson: 28000,
    hours: 2,
    discountRate: 0.20, // 20%
    benefits: [
      "\n - 2 horas de simulación",
      "\n - Todos los circuitos (50+)",
      "\n - Equipamiento profesional",
      "\n - Traje de carrera FIA",
      "\n - Sesión fotográfica profesional",
      "\n - Análisis de telemetría",
    ],
  },
  verstappen: {
    name: "Verstappen",
    pricePerPerson: 32000,
    hours: 4,
    discountRate: 0.25, // 25%
    benefits: [
      "\n - 4 horas de simulación",
      "\n - Todos los circuitos premium",
      "\n - Simulador VIP exclusivo",
      "\n - Traje y casco personalizados",
      "\n - Video profesional 4K",
      "\n - Coaching personalizado",
      "\n - Bebidas y snacks premium",
      "\n - Certificado de participación",
    ],
  },
}

/* =========================
   Utilidades
   ========================= */
const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => document.querySelectorAll(sel)

const fmtMoney = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n)

function animateValue(el, endValue, prefix = "", formatter = (v) => v) {
  const duration = 450
  const startText = el.textContent.replace(/[^\d]/g, "")
  const startValue = startText ? parseInt(startText, 10) : 0
  const startTime = performance.now()

  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1)
    const ease = p * (2 - p)
    const val = Math.round(startValue + (endValue - startValue) * ease)
    el.textContent = prefix ? `${prefix}${formatter(val)}` : formatter(val)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function formatDateDDMMYYYY(value) {
  if (!value) return ""
  const d = new Date(value + "T00:00:00")
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

/* =========================
   DOM refs
   ========================= */
const pkgSelect = $("#pkg-select")
const pkgBenefitsWrap = $("#pkg-benefits")
const benefitHours = $("#benefit-hours")
const benefitsList = $("#benefits-list")

const eventType = $("#event-type")
const dynFields = $("#dynamic-fields")
const personasGlobal = $("#personas-global")

// Summary
const sumPkg = $("#sum-pkg")
const sumEvent = $("#sum-event")
const sumHours = $("#sum-hours")
const sumPricePerson = $("#sum-price-person")
const sumPeople = $("#sum-people")
const sumOriginal = $("#sum-original")
const sumDiscounted = $("#sum-discounted")
const sumSavings = $("#sum-savings")
const sumFinal = $("#sum-final")
const sumBenefitsList = $("#sum-benefits-list")
const reserveBtn = $("#reserve-btn")

/* =========================
   Estado
   ========================= */
const state = {
  pkgKey: "",
  event: "",
  people: 1,
}

/* =========================
   Lógica principal
   ========================= */
function renderPackage() {
  const key = state.pkgKey
  if (!key || !PACKAGES[key]) {
    pkgBenefitsWrap.classList.add("hidden")
    benefitsList.innerHTML = ""
    benefitHours.textContent = "0 h"
    sumPkg.textContent = "—"
    sumHours.textContent = "0 h"
    sumPricePerson.textContent = fmtMoney(0)
    sumBenefitsList.innerHTML = ""
    return
  }

  const pkg = PACKAGES[key]

  // UI de beneficios
  benefitsList.innerHTML = pkg.benefits.map(b => `<li>▸ ${b}</li>`).join("")
  benefitHours.textContent = `${pkg.hours} h`
  pkgBenefitsWrap.classList.remove("hidden")

  // Summary básico
  sumPkg.textContent = pkg.name
  sumHours.textContent = `${pkg.hours} h`
  sumPricePerson.textContent = fmtMoney(pkg.pricePerPerson)
  sumBenefitsList.innerHTML = pkg.benefits.map(b => `<li>▸ ${b}</li>`).join("")
}

function showEventFields() {
  const groups = $$(".dyn-group")
  groups.forEach(g => g.classList.add("hidden"))

  if (!state.event) return

  const group = $(`.dyn-group[data-event="${state.event}"]`)
  if (group) group.classList.remove("hidden")

  // Sincronizar personas con el campo correspondiente
  const map = {
    cumple: "#cumple-personas",
    corp: "#corp-personas",
    torneo: "#torneo-personas",
  }
  const field = $(map[state.event])
  if (field) {
    // inicializar con global
    field.value = personasGlobal.value
  }
}

function getPeopleCount() {
  const map = {
    cumple: "#cumple-personas",
    corp: "#corp-personas",
    torneo: "#torneo-personas",
  }
  const field = $(map[state.event])
  const val = parseInt((field && field.value) || personasGlobal.value || "1", 10)
  return Math.max(1, val || 1)
}

function updateGlobalPeopleFromEvent() {
  const ppl = getPeopleCount()
  personasGlobal.value = ppl
}

function calcAndRenderSummary() {
  const key = state.pkgKey
  const ev = state.event
  const people = getPeopleCount()
  state.people = people

  sumPeople.textContent = String(people)
  sumEvent.textContent = ev === "cumple" ? "Cumpleaños" : ev === "corp" ? "Corporativo" : ev === "torneo" ? "Torneo" : "—"

  if (!key || !PACKAGES[key] || !ev) {
    animateValue(sumOriginal, 0, "", fmtMoney)
    animateValue(sumDiscounted, 0, "", fmtMoney)
    animateValue(sumSavings, 0, "", fmtMoney)
    animateValue(sumFinal, 0, "", fmtMoney)
    reserveBtn.disabled = true
    return
  }

  const { pricePerPerson, discountRate } = PACKAGES[key]
  const original = pricePerPerson * people
  const savings = Math.round(original * discountRate)
  const discounted = original - savings
  const finalPrice = discounted // (no extras separados)

  animateValue(sumOriginal, original, "", fmtMoney)
  animateValue(sumDiscounted, discounted, "", fmtMoney)
  animateValue(sumSavings, savings, "", fmtMoney)
  animateValue(sumFinal, finalPrice, "", fmtMoney)

  // Habilitar reservar si los campos mínimos están bien
  reserveBtn.disabled = !isFormValid()
}




/* =========================
   Validación mínima
   ========================= */
function isFormValid() {
  if (!state.pkgKey || !state.event) return false
  if (getPeopleCount() < 1) return false

  const hasText = (sel) => ( $(sel)?.value?.trim().length > 0 )

  if (state.event === "cumple") {
    return hasText("#cumple-nombre") && $("#cumple-fecha")?.value
  }
  if (state.event === "corp") {
    return hasText("#corp-empresa") && $("#corp-fecha")?.value
  }
  if (state.event === "torneo") {
    return hasText("#torneo-nombre") && hasText("#torneo-organizador") && $("#torneo-fecha")?.value
  }
  return false
}

/* =========================
   Generación del mensaje
   ========================= */
function buildAutoMessage() {
  const key = state.pkgKey
  const pkg = PACKAGES[key]
  const people = state.people
  const benefits = pkg.benefits.join(", ")
  const dateByEvent = {
    cumple: formatDateDDMMYYYY($("#cumple-fecha").value),
    corp: formatDateDDMMYYYY($("#corp-fecha").value),
    torneo: formatDateDDMMYYYY($("#torneo-fecha").value),
  }
  const date = dateByEvent[state.event] || ""

  const baseIntro =
    state.event === "cumple"
      ? `Hola Racemax, mi nombre es ${$("#cumple-nombre").value.trim()} y el día ${date} quiero festejar mi cumpleaños allí.`
      : state.event === "corp"
      ? `Hola Racemax, represento a ${$("#corp-empresa").value.trim()} y el día ${date} queremos realizar un evento corporativo.`
      : `Hola Racemax, soy ${$("#torneo-organizador").value.trim()} y me gustaría organizar el torneo "${$("#torneo-nombre").value.trim()}" el día ${date}.`

  const body = `Somos ${people} personas en total. Me gustaría el paquete ${pkg.name}, 
  el cual incluye: ${benefits}.`

  // Tomamos los valores del resumen para precios:
  const priceOriginal = sumOriginal.textContent
  const priceDiscount = sumDiscounted.textContent
  const priceFinal = sumFinal.textContent

  const tail = `Precio original: ${priceOriginal} | Descuento aplicado: ${priceDiscount} | Total a pagar: ${priceFinal}.`

  return `${baseIntro} ${body} ${tail}`
}

function goToContactWithMessage() {
  const msg = buildAutoMessage()
  // Guardamos el mensaje en localStorage temporalmente
  localStorage.setItem("racemax_mensaje", msg)
  // Redirigimos limpio, sin parámetros feos
  window.location.href = "contacto.html"
}

/* =========================
   Eventos UI
   ========================= */
pkgSelect.addEventListener("change", () => {
  state.pkgKey = pkgSelect.value
  renderPackage()
  calcAndRenderSummary()
})

eventType.addEventListener("change", () => {
  state.event = eventType.value
  showEventFields()
  updateGlobalPeopleFromEvent()
  calcAndRenderSummary()
})

// Sincronización personas
personasGlobal.addEventListener("input", () => {
  const ppl = Math.max(1, parseInt(personasGlobal.value || "1", 10))
  personasGlobal.value = ppl

  const map = { cumple: "#cumple-personas", corp: "#corp-personas", torneo: "#torneo-personas" }
  const field = $(map[state.event])
  if (field) field.value = ppl

  calcAndRenderSummary()
})

// Escuchar cambios en todos los campos dinámicos para recalcular y habilitar botón
dynFields.addEventListener("input", (e) => {
  if (["INPUT", "SELECT"].includes(e.target.tagName)) {
    // Si cambió el campo personas específico, sincronizamos global
    if (e.target.id.endsWith("-personas")) {
      personasGlobal.value = Math.max(1, parseInt(e.target.value || "1", 10))
    }
    calcAndRenderSummary()
  }
})

// Reservar
reserveBtn.addEventListener("click", () => {
  if (!isFormValid()) return
  goToContactWithMessage()
})




/* =========================
   Init
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderPackage()
  showEventFields()
  calcAndRenderSummary()

  // Accesos rápidos con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Reset suave
      pkgSelect.value = ""
      state.pkgKey = ""
      eventType.value = ""
      state.event = ""
      personasGlobal.value = 1
      $$(".dyn-group input").forEach(i => (i.value = i.type === "number" ? 1 : ""))
      renderPackage()
      showEventFields()
      calcAndRenderSummary()
    }
  })
})

