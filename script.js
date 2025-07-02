// ===== DOM Elements =====
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector(".contact-form");
const skillBars = document.querySelectorAll(".skill-fill");
const scrollIndicator = document.querySelector(".scroll-indicator");
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".nav-links");

// ===== Theme Toggle Functionality =====
themeToggle.addEventListener("click", toggleTheme);

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  // Update theme toggle icon
  const isLightMode = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLightMode ? "☀️" : "🌙";

  // Save preference to localStorage
  localStorage.setItem("theme", isLightMode ? "light" : "dark");
}

// Check for saved theme preference
function checkSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  }
}
checkSavedTheme();

// ===== Mobile Menu Toggle =====
hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  hamburger.textContent = mobileNav.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    hamburger.textContent = "☰"; // Reset hamburger icon
  });
});

// ===== Smooth Scrolling for Navigation Links =====
navLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetSection = document.querySelector(targetId);

  // Offset for fixed navigation bar
  const navHeight = document.querySelector(".glass-nav").offsetHeight;
  const offsetPosition = targetSection.offsetTop - navHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// ===== Project Filtering =====
filterButtons.forEach((button) => {
  button.addEventListener("click", filterProjects);
});

function filterProjects() {
  // Update active button
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");

  const filterValue = this.textContent.toLowerCase();

  // Filter projects with animation
  projectCards.forEach((card) => {
    const cardTags = card.getAttribute("data-tags").toLowerCase();

    if (filterValue === "all" || cardTags.includes(filterValue)) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50); // Small delay to allow display change before animation
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300); // Wait for fade out before hiding
    }
  });
}

// ===== Animate Skills on Scroll (Functionable) =====
function animateSkills() {
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level");
    bar.style.width = level; // This makes the skill bar fill to its data-level
  });
}

// ===== Contact Form Submission (Simulated) =====
if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const btnText = submitButton.querySelector(".btn-text");
  const loader = submitButton.querySelector(".btn-loader");

  // Show loading state
  btnText.textContent = "Sending...";
  loader.style.display = "block";
  submitButton.disabled = true; // Disable button during submission

  // Simulate form submission (replace with actual AJAX call)
  setTimeout(() => {
    loader.style.display = "none";
    btnText.textContent = "Message Sent!";

    // Reset form after 3 seconds
    setTimeout(() => {
      contactForm.reset();
      btnText.textContent = "Send Message";
      submitButton.disabled = false; // Re-enable button

      // Reset form labels positions for empty fields
      document
        .querySelectorAll(".form-group input, .form-group textarea")
        .forEach((input) => {
          const label = input.nextElementSibling; // Assuming label is sibling
          if (label && input.value === "") {
            // Only reset if input is empty
            label.style.top = "var(--space-sm)";
            label.style.left = "var(--space-sm)";
            label.style.fontSize = "var(--fs-base)";
            label.style.color = "var(--light-text)"; // Reset color if changed by focus/valid
          }
        });
    }, 3000);
  }, 2000);
}

// ===== Scroll Indicator Animation =====
function updateScrollIndicator() {
  if (!scrollIndicator) return;

  const scrollPercentage =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollIndicator.style.background = `linear-gradient(to top, var(--cyber-teal) ${scrollPercentage}%, transparent ${scrollPercentage}%)`;
}

// ===== Floating Tech Logos in About Section =====
function initTechLogos() {
  const techLogos = document.getElementById("techLogos");
  if (!techLogos) return;

  const logos = [
    {
      icon: "fab fa-html5",
      name: "HTML5",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      icon: "fab fa-css3-alt",
      name: "CSS3",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      icon: "fab fa-js",
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { icon: "fab fa-react", name: "React", url: "https://reactjs.org/docs" },
    {
      icon: "fab fa-vuejs",
      name: "Vue.js",
      url: "https://vuejs.org/v2/guide/",
    },
    {
      icon: "fab fa-node-js",
      name: "Node.js",
      url: "https://nodejs.org/en/docs/",
    },
    {
      img: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
      name: "Tailwind",
      url: "https://tailwindcss.com/docs",
    },
    {
      img: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
      name: "Firebase",
      url: "https://firebase.google.com/docs",
    },
    { icon: "fab fa-git-alt", name: "Git", url: "https://git-scm.com/doc" },
    {
      icon: "fab fa-figma",
      name: "Figma",
      url: "https://help.figma.com/hc/en-us",
    },
  ];

  // Create floating logos
  logos.forEach((logo) => {
    const logoElement = document.createElement("div");
    logoElement.className = "logo-particle";

    // Set random horizontal position
    const randomX = Math.random();
    logoElement.style.setProperty("--random-x", randomX);

    // Set random animation duration
    const duration = 15 + Math.random() * 15;
    logoElement.style.animationDuration = `${duration}s`;

    // Set random delay
    const delay = Math.random() * 15;
    logoElement.style.animationDelay = `${delay}s`;

    // Create logo content
    if (logo.icon) {
      logoElement.innerHTML = `<i class="${logo.icon}"></i>`;
    } else {
      logoElement.innerHTML = `<img src="${logo.img}" alt="${logo.name}" class="tech-logo">`;
    }

    // Add click event to open documentation
    logoElement.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(logo.url, "_blank");
    });

    // Add title tooltip
    logoElement.title = `Click to view ${logo.name} documentation`;

    techLogos.appendChild(logoElement);
  });
}

// ===== 3D Hover Effect for Profile Image =====
function initProfileHover() {
  const profileImg = document.querySelector(".profile-img");
  if (!profileImg) return;

  profileImg.addEventListener("mousemove", (e) => {
    const rect = profileImg.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; // y position within the element.

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25; // Adjust divisor for sensitivity
    const rotateY = (x - centerX) / 25; // Adjust divisor for sensitivity

    profileImg.querySelector(
      "img"
    ).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  profileImg.addEventListener("mouseleave", () => {
    profileImg.querySelector("img").style.transform =
      "rotateX(0) rotateY(0) scale(1)";
  });
}

// ===== Particle Background for Hero Section =====
function initParticleBackground() {
  const canvas = document.getElementById("particle-bg");
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 80;

  // Particle constructor
  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    // Ensure colors are within the purple-teal range for consistency
    const hue = Math.random() * 60 + 200; // Hue from 200 (teal-blue) to 260 (purple)
    this.color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.5 + 0.1})`;
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      // Draw particle
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw connections
      particles.forEach((otherParticle) => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
        );

        if (distance < 150) {
          ctx.strokeStyle = `hsla(200, 100%, 70%, ${1 - distance / 150})`; // Keep connection color consistent
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Handle window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-initialize particles on resize to adapt to new dimensions
    particles.length = 0; // Clear existing particles
    const newParticleCount = window.innerWidth < 768 ? 30 : 80;
    for (let i = 0; i < newParticleCount; i++) {
      particles.push(new Particle());
    }
  });
}

// ===== Intersection Observer for Scroll Animations =====
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -100px 0px", // Adjust root margin to trigger slightly earlier
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Special case for skills section
        if (entry.target.classList.contains("skills")) {
          animateSkills();
        }

        // Stop observing after animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with this class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// ===== Initialize Everything =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  checkSavedTheme(); // Ensure theme is loaded before content renders
  setupIntersectionObserver();
  initParticleBackground();
  initTechLogos();
  initProfileHover();

  // Set initial project filter to 'All'
  document.querySelector(".filter-btn.active")?.click();

  // Set up scroll events
  window.addEventListener("scroll", updateScrollIndicator);
  updateScrollIndicator(); // Initial call to set indicator position

  // Add data-tags to project cards if not present (Ensures filtering works even if omitted from HTML)
  projectCards.forEach((card, index) => {
    if (!card.hasAttribute("data-tags")) {
      const tags = ["web", "design"];
      if (index % 2 === 0) tags.push("mobile");
      if (index % 3 === 0) tags.push("branding");
      card.setAttribute("data-tags", tags.join(" "));
    }
  });

  // Ensure form labels are correctly positioned on page load for pre-filled fields
  document
    .querySelectorAll(".form-group input, .form-group textarea")
    .forEach((input) => {
      if (input.value !== "") {
        const label = input.nextElementSibling;
        if (label) {
          label.style.top = "-0.75rem";
          label.style.left = "0";
          label.style.fontSize = "var(--fs-small)";
          label.style.color = "var(--cyber-teal)"; // Apply focused color
        }
      }
    });

  // ===== Initialize Everything =====
  document.addEventListener("DOMContentLoaded", () => {
    // ... (existing code)

    // Set current year in footer
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }

    // ... (rest of your existing code)
  });
});

// ===== Window Resize Handler =====
window.addEventListener("resize", () => {
  // Particle canvas resize is handled within initParticleBackground's resize listener
});
