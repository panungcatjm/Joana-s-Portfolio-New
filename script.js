/* ==========================================================
   JOANA MAY M. PANUNGCAT — INTERACTIONS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal animations. The site remains readable if the CDN is unavailable.
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 65,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }

  // Mobile navigation toggle and accessible expanded state.
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Current year in the footer.
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Smooth in-page navigation with reduced-motion support.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const selector = anchor.getAttribute("href");
      if (!selector || selector === "#") return;
      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", selector);
    });
  });

  // Clicking a section heading gently scrolls to its containing section
  // and briefly highlights the heading as a subtle visual response.
  document.querySelectorAll("[data-scroll-heading]").forEach((heading) => {
    heading.setAttribute("tabindex", "0");
    heading.setAttribute("role", "button");
    heading.setAttribute("aria-label", "Highlight this section heading");

    const activate = () => {
      heading.classList.remove("is-highlighted");
      // Force a style recalculation so the highlight can replay on repeat clicks.
      void heading.offsetWidth;
      heading.classList.add("is-highlighted");
      window.setTimeout(() => heading.classList.remove("is-highlighted"), 850);
    };

    heading.addEventListener("click", activate);
    heading.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
});
