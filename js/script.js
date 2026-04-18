const portfolioProjects = [
  {
    title: "To-Do List Application",
    description: "A task management application with add, delete, and complete actions to practice DOM manipulation and event handling.",
    category: "javascript",
    level: "beginner",
    year: 2024,
    image: "assets/images/project-todo.svg",
    link: "#"
  },
  {
    title: "Calculator Web App",
    description: "A calculator that performs arithmetic operations and demonstrates JavaScript logic and interactive UI behavior.",
    category: "web",
    level: "beginner",
    year: 2024,
    image: "assets/images/project-calculator.svg",
    link: "#"
  },
  {
    title: "Responsive Landing Page",
    description: "A responsive interface project focused on layout, accessibility, and clean UI structure using CSS Grid and Flexbox.",
    category: "ui",
    level: "beginner",
    year: 2023,
    image: "assets/images/project-landing.svg",
    link: "#"
  },
  {
    title: "Portfolio Dashboard",
    description: "An advanced portfolio concept with dynamic cards, filters, reusable rendering functions, and state management.",
    category: "web",
    level: "advanced",
    year: 2025,
    image: "assets/images/project-dashboard.svg",
    link: "#github"
  }
];

const state = {
  theme: localStorage.getItem("theme") || "dark",
  visitorName: localStorage.getItem("visitorName") || "",
  category: "all",
  sortBy: "newest",
  level: "all",
  visitSeconds: 0
};

// Smooth scrolling for valid anchor links only
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      document.querySelector(".nav-links")?.classList.remove("open");
      document.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
    }
  });
}

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Greeting message by time of day
const greetingEl = document.getElementById("greeting");
const hour = new Date().getHours();
let greeting = "Welcome!";

if (hour < 12) {
  greeting = "Good morning 👋";
} else if (hour < 18) {
  greeting = "Good afternoon 👋";
} else {
  greeting = "Good evening 👋";
}

if (greetingEl) {
  greetingEl.textContent = greeting;
}

// Theme toggle with localStorage
const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light", isLight);
  state.theme = theme;
  localStorage.setItem("theme", theme);

  if (themeBtn) {
    themeBtn.textContent = isLight ? "☀️" : "🌙";
  }
}

setTheme(state.theme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    setTheme(nextTheme);
  });
}

// Visitor name state
const visitorMessage = document.getElementById("visitorMessage");
const saveNameBtn = document.getElementById("saveNameBtn");

function renderVisitorMessage() {
  if (!visitorMessage) {
    return;
  }

  visitorMessage.textContent = state.visitorName
    ? `Welcome back, ${state.visitorName}! Your preferences are saved on this device.`
    : "Welcome to my portfolio.";
}

renderVisitorMessage();

if (saveNameBtn) {
  saveNameBtn.addEventListener("click", () => {
    const name = window.prompt("Enter your name so the website can remember you:");

    if (!name) {
      return;
    }

    state.visitorName = name.trim();
    localStorage.setItem("visitorName", state.visitorName);
    renderVisitorMessage();
  });
}

// Visit timer
const visitTimer = document.getElementById("visitTimer");

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function startVisitTimer() {
  if (!visitTimer) {
    return;
  }

  visitTimer.textContent = formatTime(state.visitSeconds);

  window.setInterval(() => {
    state.visitSeconds += 1;
    visitTimer.textContent = formatTime(state.visitSeconds);
  }, 1000);
}

startVisitTimer();

// Project rendering with filtering and sorting
const projectsGrid = document.getElementById("projectsGrid");
const projectCount = document.getElementById("projectCount");
const projectHighlights = document.getElementById("projectHighlights");
const categoryFilter = document.getElementById("categoryFilter");
const sortProjects = document.getElementById("sortProjects");
const levelFilter = document.getElementById("levelFilter");
const selectedLevelLabel = document.getElementById("selectedLevelLabel");

function getFilteredProjects() {
  let filteredProjects = [...portfolioProjects];

  if (state.category !== "all") {
    filteredProjects = filteredProjects.filter((project) => project.category === state.category);
  }

  if (state.level !== "all") {
    filteredProjects = filteredProjects.filter((project) => project.level === state.level);
  }

  if (state.sortBy === "newest") {
    filteredProjects.sort((a, b) => b.year - a.year);
  } else if (state.sortBy === "oldest") {
    filteredProjects.sort((a, b) => a.year - b.year);
  } else if (state.sortBy === "title") {
    filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredProjects;
}

function renderProjectHighlights(projects) {
  if (!projectHighlights || !selectedLevelLabel) {
    return;
  }

  const levelText = state.level === "all"
    ? "All Visitors"
    : state.level === "beginner"
      ? "Beginner"
      : "Advanced";

  selectedLevelLabel.textContent = levelText;

  if (state.level === "beginner") {
    projectHighlights.innerHTML = "<strong>Beginner View:</strong> Showing easier starter projects that focus on fundamentals such as layouts, DOM manipulation, and basic interactivity.";
  } else if (state.level === "advanced") {
    projectHighlights.innerHTML = "<strong>Advanced View:</strong> Showing more complex projects that include reusable logic, state management, and dynamic rendering.";
  } else {
    projectHighlights.innerHTML = `<strong>Portfolio Overview:</strong> Currently showing ${projects.length} project(s) across all levels.`;
  }
}

function renderProjects() {
  if (!projectsGrid || !projectCount) {
    return;
  }

  const projects = getFilteredProjects();
  renderProjectHighlights(projects);

  projectsGrid.innerHTML = projects.map((project) => `
    <article class="card">
      <img src="${project.image}" alt="${project.title} preview" width="600" height="360" loading="lazy" decoding="async" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Category:</strong> ${project.category} | <strong>Level:</strong> ${project.level} | <strong>Year:</strong> ${project.year}</p>
      <a href="${project.link}" class="card-link">View Project</a>
    </article>
  `).join("");

  projectCount.textContent = `Showing ${projects.length} project(s).`;
}

if (categoryFilter && sortProjects && levelFilter) {
  categoryFilter.addEventListener("change", (e) => {
    state.category = e.target.value;
    renderProjects();
  });

  sortProjects.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProjects();
  });

  levelFilter.addEventListener("change", (e) => {
    state.level = e.target.value;
    renderProjects();
  });
}

renderProjects();

// GitHub API integration
const repoGrid = document.getElementById("repoGrid");
const repoStatus = document.getElementById("repoStatus");
const reloadReposBtn = document.getElementById("reloadReposBtn");
const githubUsername = "octocat";

function setRepoStatus(message, type = "") {
  if (!repoStatus) {
    return;
  }

  repoStatus.textContent = message;
  repoStatus.className = `form-status ${type}`.trim();
}

function renderRepositories(repositories) {
  if (!repoGrid) {
    return;
  }

  repoGrid.innerHTML = repositories.map((repo) => `
    <article class="card">
      <img src="assets/images/project-github.svg" alt="GitHub repository placeholder" width="600" height="360" loading="lazy" decoding="async" />
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description available for this repository."}</p>
      <p><strong>Language:</strong> ${repo.language || "Not specified"}</p>
      <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
      <a class="card-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Open Repository</a>
    </article>
  `).join("");
}

async function fetchRepositories() {
  try {
    setRepoStatus("Loading repositories...");
    if (repoGrid) {
      repoGrid.innerHTML = "";
    }

    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`);

    if (!response.ok) {
      throw new Error("Unable to load repositories from GitHub.");
    }

    const repositories = await response.json();

    if (!Array.isArray(repositories) || repositories.length === 0) {
      setRepoStatus("No repositories were found.", "error");
      return;
    }

    renderRepositories(repositories);
    setRepoStatus("Repositories loaded successfully.", "success");
  } catch (error) {
    setRepoStatus("Sorry, the GitHub API could not be loaded right now. Please try again later.", "error");
  }
}

if (reloadReposBtn) {
  reloadReposBtn.addEventListener("click", fetchRepositories);
}

fetchRepositories();

// Contact form validation and feedback
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function validateContactForm({ name, email, subject, message }) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    return "Please fill in all fields before submitting.";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters long.";
  }

  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }

  if (subject.length < 3) {
    return "Subject must be at least 3 characters long.";
  }

  if (message.length < 10) {
    return "Message must be at least 10 characters long.";
  }

  return "";
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    const validationMessage = validateContactForm(formData);

    if (validationMessage) {
      formStatus.textContent = validationMessage;
      formStatus.className = "form-status error";
      return;
    }

    formStatus.textContent = `✅ Thanks, ${formData.name}! Your message passed all validation checks and is ready to be sent.`;
    formStatus.className = "form-status success";
    contactForm.reset();
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
