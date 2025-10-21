

// Package data
const packages = {

    
    colapinto: {
      name: "Colapinto",
      originalPrice: 15000,
      discountedPrice: 9990,
      savings: 5010,
    },
    hamilton: {
      name: "Hamilton",
      originalPrice: 28000,
      discountedPrice: 17990,
      savings: 10010,
    },
    senna: {
      name: "Ayrton Senna",
      originalPrice: 45000,
      discountedPrice: 29990,
      savings: 15010,
    },
  }
  
  // Select package from pricing cards
  function selectPackage(packageName, price, savings) {
    const packageSelect = document.getElementById("package-select")
    packageSelect.value = packageName
  
    // Smooth scroll to calculator
    document.getElementById("calculator").scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  
    // Highlight the select for a moment
    packageSelect.style.borderColor = "var(--color-accent)"
    packageSelect.style.boxShadow = "0 0 20px var(--color-accent-glow)"
  
    setTimeout(() => {
      packageSelect.style.borderColor = ""
      packageSelect.style.boxShadow = ""
    }, 1500)
  
    // Update calculator
    updateCalculator()
  }
  
  // Update calculator results
  function updateCalculator() {
    console.log("[v0] Calculator update triggered") // Added debug logging
  
    const packageSelect = document.getElementById("package-select")
    const sessionsInput = document.getElementById("sessions")
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]')
  
    const selectedPackage = packageSelect.value
    const sessions = Number.parseInt(sessionsInput.value) || 1
  
    console.log("[v0] Selected package:", selectedPackage, "Sessions:", sessions) // Added debug logging
  
    // Calculate extras
    let extrasTotal = 0
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        extrasTotal += Number.parseInt(checkbox.value)
        console.log("[v0] Extra added:", checkbox.value) // Added debug logging
      }
    })
  
    if (selectedPackage && packages[selectedPackage]) {
      const pkg = packages[selectedPackage]
  
      const originalPrice = pkg.originalPrice * sessions
      const discountedPrice = pkg.discountedPrice * sessions
      const totalSavings = pkg.savings * sessions
      const finalPrice = discountedPrice + extrasTotal // Add extras to final price only
  
      console.log("[v0] Calculations:", { originalPrice, discountedPrice, totalSavings, finalPrice, extrasTotal }) // Added debug logging
  
      // Update display with animation
      animateValue("original-price", originalPrice)
      animateValue("discounted-price", discountedPrice)
      animateValue("total-savings", totalSavings)
      animateValue("final-price", finalPrice)
    } else {
      // Reset if no package selected
      document.getElementById("original-price").textContent = "$0"
      document.getElementById("discounted-price").textContent = "$0"
      document.getElementById("total-savings").textContent = "$0"
      document.getElementById("final-price").textContent = "$0"
    }
  }
  
  // Animate number changes
  function animateValue(elementId, endValue) {
    const element = document.getElementById(elementId)
    const startValue = Number.parseInt(element.textContent.replace(/[^0-9]/g, "")) || 0
    const duration = 500
    const startTime = performance.now()
  
    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
  
      // Easing function
      const easeOutQuad = progress * (2 - progress)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuad)
  
      element.textContent = "$" + currentValue.toLocaleString("es-AR")
  
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
  
    requestAnimationFrame(update)
  }
  
  // Add smooth scroll behavior for all internal links
  document.addEventListener("DOMContentLoaded", () => {
    console.log("[v0] Page loaded, initializing calculator") // Added debug logging
  
    // Initialize calculator on page load
    updateCalculator()
  
    // Add parallax effect to video background
    let ticking = false
  
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const video = document.getElementById("bg-video")
          const scrolled = window.pageYOffset
          const rate = scrolled * 0.3
  
          if (video) {
            video.style.transform = "translate3d(0, " + rate + "px, 0)"
          }
  
          ticking = false
        })
  
        ticking = true
      }
    })
  
    // Add glow effect on pricing cards
    const pricingCards = document.querySelectorAll(".pricing-card")
  
    pricingCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        card.style.setProperty("--mouse-x", x + "px")
        card.style.setProperty("--mouse-y", y + "px")
      })
    })
  })
  
  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Reset calculator
      document.getElementById("package-select").value = ""
      document.getElementById("sessions").value = 1
      document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach((cb) => {
        cb.checked = false
      })
      updateCalculator()
    }
  })
  