const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const yearText = document.getElementById("year");
const statusText = document.getElementById("statusText");
const copyLocationButton = document.getElementById("copyLocationButton");
const form = document.getElementById("contactForm");
const siteHeader = document.getElementById("siteHeader");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const navLinks = document.querySelectorAll(".nav-link");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (yearText) {
  yearText.textContent = new Date().getFullYear();
}

function updateThemeIcon() {
  if (!themeIcon) return;
  themeIcon.textContent = document.documentElement.classList.contains("dark")
    ? "☀"
    : "☾";
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", theme);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", isDark ? "#111111" : "#FAF8F4");
  updateThemeIcon();
}

if (themeToggle) {
  updateThemeIcon();
  themeToggle.addEventListener("click", function () {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    setTheme(nextTheme);
  });
}

function closeMobileMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  mobileMenu.classList.add("hidden");
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileMenu.classList.toggle("hidden");
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });
}

function updateHeaderState() {
  if (!siteHeader) return;
  const isScrolled = window.scrollY > 24;
  siteHeader.classList.toggle("bg-white/90", isScrolled);
  siteHeader.classList.toggle("shadow-lg", isScrolled);
  siteHeader.classList.toggle("dark:bg-charcoal/90", isScrolled);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

function buildInquiryMessage() {
  const formData = new FormData(form);
  const name = (formData.get("name") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const service = (formData.get("service") || "").toString().trim();
  const notes = (formData.get("notes") || "").toString().trim();

  return [
    "Hello OG Signature & Fashion World,",
    "",
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Service: ${service || "-"}`,
    `Notes: ${notes || "-"}`,
    "",
    "Please contact me about my order.",
  ].join("\n");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

function setStatus(message) {
  if (!statusText) return;
  statusText.textContent = message;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(function () {
    statusText.textContent = "";
  }, 3500);
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = buildInquiryMessage();
    const whatsappUrl =
      "https://wa.me/2348159355348?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank");
    setStatus("Opening WhatsApp with your details filled in...");
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("show");
  });
}

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length > 0) {
  const navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${activeId}`,
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 },
  );

  sections.forEach(function (section) {
    navObserver.observe(section);
  });
}
