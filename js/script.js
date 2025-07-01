//Loader
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("fade-out");
    document.body.classList.add("loaded");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600); // Wait for fade-out to finish
  }, 2000); // Minimum 2 seconds before hiding
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuLinks = mobileMenuOverlay.querySelectorAll("a");

mobileMenuToggle.addEventListener("click", function () {
  mobileMenuToggle.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
  document.body.style.overflow = mobileMenuOverlay.classList.contains("active")
    ? "hidden"
    : "";
});

// Close mobile menu when clicking on links
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenuToggle.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const isClickInsideMenu = mobileMenuOverlay.contains(e.target);
  const isClickOnToggle = mobileMenuToggle.contains(e.target);
  const isMenuActive = mobileMenuOverlay.classList.contains("active");

  if (!isClickInsideMenu && !isClickOnToggle && isMenuActive) {
    mobileMenuToggle.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
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

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "#4a5fc1";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "#7cb342";
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

// Prevent horizontal scroll on mobile
document.addEventListener(
  "touchmove",
  function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  { passive: false }
);

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

cards.forEach((card) => {
  card.addEventListener("click", () => {
    modalName.textContent = card.dataset.name;
    modalRole.textContent = `(${card.dataset.role})`;
    modalDetails.textContent = card.dataset.detail;
    modalImg.src = card.querySelector("img").src;
    modal.style.display = "flex";
  });
});

function closeModal() {
  modal.style.display = "none";
}

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
