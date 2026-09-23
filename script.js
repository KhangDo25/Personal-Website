const loader = document.getElementById("loader");
const header = document.getElementById("siteHeader");
const spotlight = document.getElementById("spotlight");
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");
const copyBtn = document.getElementById("copyCommand");
const typedCommand = document.getElementById("typedCommand");
const langToggle = document.getElementById("langToggle");

const mobile = window.matchMedia("(max-width: 650px)").matches;
const touch = "ontouchstart" in window;

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 700);
});

/* HEADER */

let lastScroll = 0;
let ticking = false;

function updateScroll() {
  const y = window.scrollY;

  if (y > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = y;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });

/* REVEAL */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

reveals.forEach(el => observer.observe(el));

/* CURSOR + SPOTLIGHT */

if (!mobile && !touch) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let running = false;

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

    spotlight.style.setProperty("--mx", mouseX + "px");
    spotlight.style.setProperty("--my", mouseY + "px");

    running = false;
  }

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!running) {
      requestAnimationFrame(animateCursor);
      running = true;
    }
  }, { passive: true });

  document.querySelectorAll("a, button, .project-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "46px";
      cursor.style.height = "46px";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.width = "32px";
      cursor.style.height = "32px";
    });
  });
}

/* TYPING */

const commands = [
  "npm run build",
  "git status",
  "java -jar app.jar",
  "docker compose up",
  "git push origin main"
];

let commandIndex = 0;
let charIndex = 0;
let deleting = false;

function typeCommand() {
  if (!typedCommand) return;

  const text = commands[commandIndex];

  if (!deleting) {
    typedCommand.textContent = text.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === text.length) {
      deleting = true;
      setTimeout(typeCommand, 1400);
      return;
    }
  } else {
    typedCommand.textContent = text.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      commandIndex = (commandIndex + 1) % commands.length;
    }
  }

  setTimeout(typeCommand, deleting ? 35 : 65);
}

setTimeout(typeCommand, 1000);

/* COPY */

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const text = "git clone https://github.com/KhangDo25";

    try {
      await navigator.clipboard.writeText(text);

      copyBtn.textContent = "copied";

      setTimeout(() => {
        copyBtn.textContent = "copy";
      }, 1200);
    } catch {
      copyBtn.textContent = "error";

      setTimeout(() => {
        copyBtn.textContent = "copy";
      }, 1200);
    }
  });
}

/* MAGNETIC */

if (!mobile && !touch) {
  document.querySelectorAll(".magnetic").forEach(el => {
    let raf = null;

    el.addEventListener("mousemove", e => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();

        const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.15;

        el.style.transform = `translate(${x}px, ${y}px)`;

        raf = null;
      });
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* TILT */

if (!mobile && !touch) {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    let raf = null;

    card.addEventListener("mousemove", e => {
      if (raf) return;

      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 5;
        const rotateX = ((y / rect.height) - 0.5) * -5;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        raf = null;
      });
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* LANGUAGE */

let english = false;

if (langToggle) {
  langToggle.addEventListener("click", () => {
    english = !english;

    langToggle.textContent = english ? "VI" : "EN";

    document.documentElement.lang = english ? "en" : "vi";

    document.querySelector(".hero-copy h1").innerHTML =
      english
        ? `Turning ideas into <span class="gradient-text">things that actually work.</span>`
        : `Biến ý tưởng thành <span class="gradient-text">những thứ thật sự hữu ích.</span>`;
  });
}