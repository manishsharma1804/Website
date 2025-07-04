// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
const mobileMenuLinks = mobileMenuOverlay.querySelectorAll("a");

function openMobileMenu() {
  mobileMenuOverlay.classList.add("active");
  mobileMenuBackdrop.classList.add("active");
  mobileMenuToggle.classList.add("active");
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove("active");
  mobileMenuBackdrop.classList.remove("active");
  mobileMenuToggle.classList.remove("active");
}

mobileMenuToggle.addEventListener("click", function () {
  if (mobileMenuOverlay.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on links
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    closeMobileMenu();
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Active navigation highlighting
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const mobileNavLinks = document.querySelectorAll(
    '.nav-menu-mobile a[href^="#"]'
  );

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "#323393";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "#7cb342";
    }
  });

  // Mobile sidebar active state
  mobileNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Enhanced Interactive Quote Card functionality
const quoteCard = document.querySelector(".quote-card");
let touchStarted = false;

// Handle touch events for mobile hover simulation
quoteCard.addEventListener("touchstart", function (e) {
  touchStarted = true;
  this.classList.add("touch-active");
});

quoteCard.addEventListener("touchend", function (e) {
  if (touchStarted) {
    setTimeout(() => {
      this.classList.remove("touch-active");
    }, 2000); // Keep the effect for 2 seconds on touch
  }
  touchStarted = false;
});

// Add keyboard accessibility for quote card
quoteCard.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    this.classList.add("keyboard-active");
    setTimeout(() => {
      this.classList.remove("keyboard-active");
    }, 2000);
  }
});

// Handle window resize to ensure proper scaling
window.addEventListener("resize", function () {
  // Force a repaint to ensure proper scaling
  quoteCard.style.transform = "scale(1.001)";
  setTimeout(() => {
    quoteCard.style.transform = "";
  }, 1);
});


// Handle orientation change
window.addEventListener("orientationchange", function () {
  setTimeout(function () {
    window.scrollTo(0, window.scrollY);
  }, 100);
});

//Card info Modal
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("profileModal");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalDetails = document.getElementById("modalDetails");
const modalImg = document.getElementById("modalImg");

let scrollPosition = 0;

function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
  // Restore scroll position
  document.body.style.top = "";
  window.scrollTo(0, scrollPosition);
}

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera Mini/i.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

function isMobileOrTablet() {
  const device = getDeviceType();
  // Use both user agent and width for best accuracy
  if (device === "mobile" || device === "tablet") return true;
  if (window.innerWidth <= 1024) return true;
  return false;
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.card').forEach(function(card) {
    // Fill .card-details with data-detail if not already filled
    var details = card.querySelector('.card-details');
    if (details && !details.textContent.trim()) {
      details.textContent = card.getAttribute('data-detail') || '';
    }

    // Card click handler
    card.addEventListener('click', function(e) {
      // If learn-more was clicked, let its handler run
      if (e.target.classList.contains('learn-more')) return;
      if (isMobileOrTablet()) {
        // Toggle expand/collapse
        card.classList.toggle('expanded');
      } else {
        // Desktop: open modal (simulate click on learn-more)
        var learnMore = card.querySelector('.learn-more');
        if (learnMore) learnMore.click();
      }
    });

    // Learn more click handler
    var learnMore = card.querySelector('.learn-more');
    if (learnMore) {
      learnMore.addEventListener('click', function(e) {
        e.stopPropagation();
        // Your existing modal open logic here
        // Example: openProfileModal(card)
        if (typeof openProfileModal === 'function') {
          openProfileModal(card);
        }
      });
    }
  });
});

function openProfileModal(card) {
  modalName.textContent = card.dataset.name;
  modalRole.textContent = `(${card.dataset.role})`;
  modalDetails.textContent = card.dataset.detail;
  modalImg.src = card.querySelector("img").src;
  // Set green-footer class on modal-header-text if card is founder
  const modalHeaderText = document.querySelector('.modal-header-text');
  if (card.querySelector('.card-footer').classList.contains('green-footer')) {
    modalHeaderText.classList.add('green-footer');
  } else {
    modalHeaderText.classList.remove('green-footer');
  }
  modal.style.display = "flex";
  // Save scroll position and fix body
  scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("modal-open");
}

// Hero carousel logic
const heroSlides = document.querySelectorAll('.hero-slide');
let heroIndex = 0;
const heroInterval = 8000; // 8 seconds

function showHeroSlide(idx) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
}

setInterval(() => {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(heroIndex);
}, heroInterval);

// Show the first slide on load
showHeroSlide(heroIndex);

// Loader fade-out logic
window.addEventListener("load", () => {
  const loaderOverlay = document.querySelector('.loader-overlay');
  if (loaderOverlay) {
    setTimeout(() => {
      loaderOverlay.style.transition = 'opacity 0.5s';
      loaderOverlay.style.opacity = '0';
      setTimeout(() => loaderOverlay.remove(), 500);
    }, 4000); // 4 seconds for testing
  }
});

// Swiper: 2 cards per view on mobile, 3 on tablet/PC
const teamSwiper = new Swiper('.team-swiper', {
  slidesPerView: 2,
  spaceBetween: 24,
  freeMode: true,
  breakpoints: {
    601: { slidesPerView: 3 },
    1025: { slidesPerView: 3 }
  }
});

const foundersSwiper = new Swiper('.founders-swiper', {
  slidesPerView: 2,
  spaceBetween: 24,
  freeMode: true,
  breakpoints: {
    601: { slidesPerView: 3 },
    1025: { slidesPerView: 3 }
  }
});
