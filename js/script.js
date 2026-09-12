// ==========================================================================
// Sample project data
// ==========================================================================
const projects = [
  {
    emoji: "🛒",
    title: "ShopEasy",
    description:
      "A full-featured e-commerce storefront with cart, checkout, and an admin dashboard for managing inventory.",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    emoji: "📋",
    title: "TaskFlow",
    description:
      "A drag-and-drop task board (like Trello) with real-time updates, labels, and due-date reminders.",
    tags: ["Vue", "Firebase", "Tailwind CSS"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    emoji: "🌤️",
    title: "WeatherNow",
    description:
      "A sleek weather app that shows current conditions and a 5-day forecast using a public weather API.",
    tags: ["JavaScript", "REST API", "CSS Grid"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    emoji: "📝",
    title: "DevNotes",
    description:
      "A markdown-powered note-taking app for developers, with syntax-highlighted code blocks and tagging.",
    tags: ["TypeScript", "Express", "PostgreSQL"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

// ==========================================================================
// Render project cards
// ==========================================================================
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
        <div class="project-emoji" aria-hidden="true">${project.emoji}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>
          <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer">Source Code</a>
        </div>
      </article>
    `
    )
    .join("");
}

// ==========================================================================
// Mobile navigation toggle
// ==========================================================================
function initNavToggle() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==========================================================================
// Dark / light theme toggle (persists via localStorage)
// ==========================================================================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const storedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.textContent = "🌙";
    }
  }
}

// ==========================================================================
// Contact form validation + fake submission
// ==========================================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError") },
  };
  const statusEl = document.getElementById("formStatus");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(field, message) {
    field.input.closest(".form-group").classList.toggle("invalid", Boolean(message));
    field.error.textContent = message || "";
  }

  function validate() {
    let valid = true;

    if (!fields.name.input.value.trim()) {
      setFieldError(fields.name, "Please enter your name.");
      valid = false;
    } else {
      setFieldError(fields.name, "");
    }

    if (!fields.email.input.value.trim()) {
      setFieldError(fields.email, "Please enter your email.");
      valid = false;
    } else if (!emailPattern.test(fields.email.input.value.trim())) {
      setFieldError(fields.email, "Please enter a valid email address.");
      valid = false;
    } else {
      setFieldError(fields.email, "");
    }

    if (!fields.message.input.value.trim()) {
      setFieldError(fields.message, "Please enter a message.");
      valid = false;
    } else {
      setFieldError(fields.message, "");
    }

    return valid;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validate()) {
      statusEl.textContent = "Please fix the errors above and try again.";
      statusEl.className = "form-status error";
      return;
    }

    // Simulate sending the message (no backend wired up in this demo).
    statusEl.textContent = "Sending...";
    statusEl.className = "form-status";

    setTimeout(() => {
      statusEl.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message has been sent.`;
      statusEl.className = "form-status success";
      form.reset();
    }, 600);
  });
}

// ==========================================================================
// Footer year
// ==========================================================================
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ==========================================================================
// Init
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initNavToggle();
  initThemeToggle();
  initContactForm();
  setFooterYear();
});
