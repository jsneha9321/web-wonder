// =========================
// Page Loader
// =========================
window.addEventListener("load", () => {
    const loader = document.getElementById("pageLoader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 900);
    }
});

// =========================
// Sticky Header
// =========================
const header = document.getElementById("siteHeader");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });
}

// =========================
// Mobile Menu
// =========================
const burger = document.getElementById("burger");
const menu = document.getElementById("mobileMenu");

if (burger && menu) {
    burger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
        });
    });
}

// =========================
// Scroll Reveal
// =========================
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealEls.forEach(el => io.observe(el));
}

// =========================
// Scroll Progress Bar
// =========================
const progress = document.getElementById("scrollProgress");

if (progress) {
    window.addEventListener("scroll", () => {
        const doc = document.documentElement;

        const total =
            doc.scrollHeight - doc.clientHeight;

        const scrolled =
            total > 0 ? (doc.scrollTop / total) * 100 : 0;

        progress.style.width = scrolled + "%";
    });
}

// =========================
// Cursor Glow
// =========================
const glow = document.getElementById("cursorGlow");

if (
    glow &&
    window.matchMedia("(pointer:fine)").matches
) {
    window.addEventListener("mousemove", e => {
        glow.style.opacity = "1";
        glow.style.transform =
            `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });

    window.addEventListener("mouseleave", () => {
        glow.style.opacity = "0";
    });
}

// =========================
// Active Navigation
// =========================
const navAnchors = document.querySelectorAll("#navLinks a");

const sections = [
    "about",
    "services",
    "process",
    "work",
    "testimonials",
    "contact"
];

if ("IntersectionObserver" in window) {
    const sectionIO = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navAnchors.forEach(a => {

                a.classList.toggle(
                    "active",
                    a.getAttribute("href") === "#" + entry.target.id
                );

            });

        });

    }, {
        threshold: 0.4
    });

    sections.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            sectionIO.observe(el);
        }

    });
}

// =========================
// Service Card Tilt
// =========================
document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
            `translateY(-6px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});
