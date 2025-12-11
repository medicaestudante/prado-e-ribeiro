const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  nav.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    nav.classList.remove("active")
  })
})

const header = document.getElementById("header")
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset
  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120
    const sectionHeight = section.offsetHeight

    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("nav-link-active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("nav-link-active")
    }
  })

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
  } else {
    header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
})

const carousel = document.getElementById("projectsCarousel")
const carouselPrev = document.getElementById("carouselPrev")
const carouselNext = document.getElementById("carouselNext")
const carouselDots = document.getElementById("carouselDots")

let currentSlide = 0
const slides = document.querySelectorAll(".project-card")
const totalSlides = Math.max(1, slides.length)

function adaptCarouselLayout() {
  if (totalSlides <= 2) {
    carousel.classList.add("grid-mode")
    carouselPrev.classList.add("hidden")
    carouselNext.classList.add("hidden")
    carouselDots.innerHTML = ""
  } else {
    carousel.classList.remove("grid-mode")
    carouselPrev.classList.remove("hidden")
    carouselNext.classList.remove("hidden")
    createCarouselDots()
  }
}

function createCarouselDots() {
  carouselDots.innerHTML = ""
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div")
    dot.classList.add("carousel-dot")
    if (i === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(i))
    carouselDots.appendChild(dot)
  }
}

function updateCarousel() {
  if (totalSlides <= 2) return

  const slideWidth = slides[0].offsetWidth + 24
  carousel.scrollTo({
    left: slideWidth * currentSlide,
    behavior: "smooth",
  })

  document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

function goToSlide(index) {
  currentSlide = index
  updateCarousel()
}

carouselPrev.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  updateCarousel()
})

carouselNext.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides
  updateCarousel()
})

let autoScrollInterval
if (window.innerWidth < 768 && totalSlides > 2) {
  autoScrollInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides
    updateCarousel()
  }, 5000)
}

adaptCarouselLayout()

window.addEventListener("resize", () => {
  adaptCarouselLayout()
})

const contactForm = document.getElementById("contactForm")
const contactSuccess = document.getElementById("contactSuccess")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  setTimeout(() => {
    contactSuccess.classList.add("show")
    contactForm.reset()

    setTimeout(() => {
      contactSuccess.classList.remove("show")
    }, 5000)
  }, 500)
})

const donationModal = document.getElementById("donationModal")

function openDonationModal(tabName) {
  donationModal.classList.add("show")
  document.body.style.overflow = "hidden"
  if (tabName) {
    // small timeout to ensure modal panels are rendered
    setTimeout(() => switchDonationTab(tabName), 40)
  }
}

function closeDonationModal() {
  donationModal.classList.remove("show")
  document.body.style.overflow = ""
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && donationModal.classList.contains("show")) {
    closeDonationModal()
  }
})

function switchDonationTab(tabName) {
  document.querySelectorAll(".donation-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName)
  })

  document.querySelectorAll(".donation-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `${tabName}-panel`)
  })
}

function selectAmount(amount) {
  document.querySelectorAll(".amount-btn").forEach((btn) => {
    btn.classList.remove("selected")
  })
  event.target.classList.add("selected")

  const customAmount = document.getElementById("customAmount")
  const cardAmount = document.getElementById("cardAmount")

  if (customAmount) customAmount.value = amount
  if (cardAmount) cardAmount.value = amount
}

function sendSponsorshipEmail() {
  const name = document.getElementById('sponsorName')?.value?.trim() || ''
  const fromEmail = document.getElementById('sponsorEmail')?.value?.trim() || ''
  const subject = document.getElementById('sponsorSubject')?.value?.trim() || 'Interesse em patrocínio - DCPR'
  const message = document.getElementById('sponsorMessage')?.value?.trim() || ''

  if (!name || !fromEmail) {
    alert('Por favor, preencha seu nome e e-mail antes de enviar.')
    return
  }

  const to = 'patrocinio@dcprsantacasa.org.br'
  const bodyLines = []
  bodyLines.push(`Nome/Empresa: ${name}`)
  bodyLines.push(`E-mail: ${fromEmail}`)
  if (message) bodyLines.push('')
  if (message) bodyLines.push(message)

  const body = encodeURIComponent(bodyLines.join('\n'))
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`

  // open user's email client
  window.location.href = mailto
  closeDonationModal()
}

function copyPixKey() {
  const pixKey = "00.000.000/0001-00"

  const tempInput = document.createElement("input")
  tempInput.value = pixKey
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand("copy")
  document.body.removeChild(tempInput)

  const btn = event.target
  const originalText = btn.textContent
  btn.textContent = "Copiado!"
  btn.style.background = "var(--color-success)"
  btn.style.color = "var(--color-white)"

  setTimeout(() => {
    btn.textContent = originalText
    btn.style.background = ""
    btn.style.color = ""
  }, 2000)
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document
  .querySelectorAll(
    ".about-card, .project-card, .event-card, .help-card, .report-card, .transparency-stat, .news-headline",
  )
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
