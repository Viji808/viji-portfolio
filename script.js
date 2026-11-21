const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

// Keep the footer year current.
document.querySelector("#year").textContent = new Date().getFullYear();

// Prevent unfinished placeholder profile links from navigating nowhere.
document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const kind = link.dataset.placeholderLink;
    const href = link.getAttribute("href");
    if (kind !== "email" && href === "#") {
      event.preventDefault();
      alert(`Add your real ${kind} profile URL in index.html before publishing.`);
    } else if (kind === "email" && href.includes("YOUR_EMAIL")) {
      event.preventDefault();
      alert("Replace YOUR_EMAIL@example.com with your professional email address in index.html.");
    }
  });
});
