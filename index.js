/* ═══════════════════════════════════════════
   Jet Blue Services — Main JS
═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // Mark body so CSS reveal transitions are activated only when JS is present
  document.body.classList.add("js-ready");

  initNavbar();
  initMobileNav();
  initScrollReveal();
  initSmoothScroll();
  initCardTilts();
});

/* ── Navbar: scroll-aware background ── */
function initNavbar() {
  const navbar = document.querySelector(".navbar-1");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── Mobile Nav: hamburger toggle ── */
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on link click
  mobileNav
    .querySelectorAll(".mobile-nav-link, .mobile-nav-btn")
    .forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
        document.body.style.overflow = "";
        hamburger.setAttribute("aria-expanded", false);
      });
    });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}

/* ── Scroll Reveal: IntersectionObserver ── */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  // If IntersectionObserver not supported, reveal all
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    // generous rootMargin so elements reveal before fully in view
    { threshold: 0.05, rootMargin: "0px 0px 60px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

/* ── Smooth Scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ── Subtle card tilt on hover (desktop only) ── */
function initCardTilts() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cards = document.querySelectorAll(
    ".card, .card2, .card4, .card6, .card10, .card12, .column4, .column7, .content43, .content45"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateY(${x * 4}deg) rotateX(${
        -y * 4
      }deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition =
        "transform 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.25s, box-shadow 0.25s";
      setTimeout(() => {
        card.style.transition = "";
      }, 420);
    });
  });
}
