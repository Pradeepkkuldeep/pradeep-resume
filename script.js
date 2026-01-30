const skills = [
  { name: "PHP", group: "backend" },
  { name: "HTML", group: "frontend" },
  { name: "CSS", group: "frontend" },
  { name: "Tailwind CSS", group: "frontend" },
  { name: "Bootstrap", group: "frontend" },
  { name: "WordPress", group: "backend" },
  { name: "Hooks/Filters", group: "backend" },
  { name: "JavaScript", group: "frontend" },
  { name: "React JS", group: "frontend" },
  { name: "Python", group: "backend" },
  { name: "OOP", group: "backend" },
  { name: "Node.js (Learning)", group: "backend" },
  { name: "SQL", group: "backend" },
  { name: "Git", group: "tools" },
  { name: "Figma", group: "design" },
];

const skillsGrid = document.getElementById("skillsGrid");
const skillSearch = document.getElementById("skillSearch");

const renderSkills = (filter = "all", query = "") => {
  const q = query.trim().toLowerCase();

  const filtered = skills.filter(s => {
    const matchFilter = filter === "all" ? true : s.group === filter;
    const matchQuery = q ? s.name.toLowerCase().includes(q) : true;
    return matchFilter && matchQuery;
  });

  skillsGrid.innerHTML = filtered.map(s => `
    <div class="skill">
      <div class="top">
        <b>${s.name}</b>
        <small>${s.group}</small>
      </div>
    </div>
  `).join("");
};

renderSkills();

document.querySelectorAll(".tag").forEach(tag => {
  tag.addEventListener("click", () => {
    document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
    renderSkills(tag.dataset.filter, skillSearch.value);
  });
});

skillSearch.addEventListener("input", () => {
  const active = document.querySelector(".tag.active")?.dataset?.filter || "all";
  renderSkills(active, skillSearch.value);
});

/* Smooth scroll + active section highlight */
const navLinks = document.querySelectorAll(".nav-link");
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute("href")));

const setActiveNav = () => {
  const y = window.scrollY + 140;
  let current = sections[0]?.id;

  sections.forEach(sec => {
    if (sec && sec.offsetTop <= y) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", () => {
  setActiveNav();
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / docHeight) * 100;
  document.getElementById("progress").style.width = `${percent}%`;
});

/* Theme toggle */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

const updateThemeIcon = () => {
  const theme = document.documentElement.getAttribute("data-theme");
  themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
};
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon();
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();
setActiveNav();
