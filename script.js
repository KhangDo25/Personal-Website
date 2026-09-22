const loader =
  document.getElementById("loader");

const header =
  document.getElementById("siteHeader");

const spotlight =
  document.getElementById("spotlight");

const cursor =
  document.getElementById("cursor");

const cursorDot =
  document.getElementById("cursorDot");

const copyButton =
  document.getElementById("copyCommand");

const typedCommand =
  document.getElementById("typedCommand");

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        loader?.classList.add("hide");

        document.body.classList.add(
          "loaded"
        );

      },
      900
    );

  }
);

const scrollProgress =
  document.createElement("div");

scrollProgress.className =
  "scroll-progress";

document.body.appendChild(
  scrollProgress
);


const updateScrollUI = () => {

  const max =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  const progress =
    max > 0
      ? window.scrollY / max
      : 0;


  scrollProgress.style.width =
    `${progress * 100}%`;


  header.classList.toggle(
    "scrolled",
    window.scrollY > 30
  );

};


window.addEventListener(
  "scroll",
  updateScrollUI,
  {
    passive: true
  }
);


updateScrollUI();

const vignette =
  document.createElement("div");

vignette.className =
  "page-vignette";

document.body.appendChild(
  vignette
);


const hero =
  document.querySelector(".hero");


if (hero) {

  const chips = [

    ["JAVA", "a"],

    ["API / REST", "b"],

    ["git push", "c"]

  ];


  chips.forEach(
    ([text, cls]) => {

      const chip =
        document.createElement("span");

      chip.className =
        `float-chip ${cls}`;

      chip.textContent =
        text;

      hero.appendChild(
        chip
      );

    }
  );


  const status =
    document.createElement("div");


  status.className =
    "terminal-status";


  status.innerHTML =
    '<span style="color:#48e0c4">●</span> systems online';


  document
    .querySelector(
      ".hero-terminal"
    )
    ?.appendChild(
      status
    );

}

if (!prefersReducedMotion) {

  const canvas =
    document.createElement("canvas");

  canvas.id =
    "ambientCanvas";

  document.body.prepend(
    canvas
  );


  const ctx =
    canvas.getContext("2d");


  let w = 0;

  let h = 0;

  let dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  const pointer = {
    x: -1000,
    y: -1000
  };


  const particles = [];


  const resize = () => {

    w =
      window.innerWidth;

    h =
      window.innerHeight;


    dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );


    canvas.width =
      w * dpr;

    canvas.height =
      h * dpr;


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

  };


  resize();


  window.addEventListener(
    "resize",
    resize
  );


  const count =
    Math.min(
      80,
      Math.max(
        36,
        Math.floor(
          (w * h) / 26000
        )
      )
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    particles.push({

      x:
        Math.random() * w,

      y:
        Math.random() * h,

      r:
        Math.random() * 1.5 +
        .35,

      vx:
        (Math.random() - .5) *
        .08,

      vy:
        (Math.random() - .5) *
        .08,

      a:
        Math.random() * .5 +
        .1

    });

  }


  window.addEventListener(
    "mousemove",
    (e) => {

      pointer.x =
        e.clientX;

      pointer.y =
        e.clientY;

    },
    {
      passive: true
    }
  );


  const draw = () => {

    ctx.clearRect(
      0,
      0,
      w,
      h
    );


    for (const p of particles) {

      const dx =
        pointer.x -
        p.x;

      const dy =
        pointer.y -
        p.y;


      const dist =
        Math.hypot(
          dx,
          dy
        );


      if (dist < 170) {

        p.x -=
          dx * 0.0006;

        p.y -=
          dy * 0.0006;

      }


      p.x += p.vx;

      p.y += p.vy;


      if (p.x < -10)
        p.x = w + 10;

      if (p.x > w + 10)
        p.x = -10;

      if (p.y < -10)
        p.y = h + 10;

      if (p.y > h + 10)
        p.y = -10;


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(
          196,
          204,
          255,
          ${p.a}
        )`;


      ctx.fill();

    }


    requestAnimationFrame(
      draw
    );

  };


  draw();

}
if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  let cx = 0;

  let cy = 0;

  let tx = 0;

  let ty = 0;


  window.addEventListener(
    "mousemove",
    (e) => {

      tx =
        e.clientX;

      ty =
        e.clientY;


      spotlight?.style.setProperty(
        "--mx",
        `${e.clientX}px`
      );


      spotlight?.style.setProperty(
        "--my",
        `${e.clientY}px`
      );

    },
    {
      passive: true
    }
  );


  const moveCursor = () => {

    cx +=
      (tx - cx) *
      .16;


    cy +=
      (ty - cy) *
      .16;


    if (cursor) {

      cursor.style.left =
        `${cx}px`;

      cursor.style.top =
        `${cy}px`;

    }


    if (cursorDot) {

      cursorDot.style.left =
        `${tx}px`;

      cursorDot.style.top =
        `${ty}px`;

    }


    requestAnimationFrame(
      moveCursor
    );

  };


  moveCursor();

}
document
  .querySelectorAll(
    "a,button,[data-tilt],.tags span"
  )
  .forEach(
    (el) => {

      el.addEventListener(
        "mouseenter",
        () => {

          cursor?.classList.add(
            "active"
          );

        }
      );


      el.addEventListener(
        "mouseleave",
        () => {

          cursor?.classList.remove(
            "active"
          );

        }
      );

    }
  );

const revealItems =
  document.querySelectorAll(
    ".reveal"
  );


if (prefersReducedMotion) {

  revealItems.forEach(
    (el) =>
      el.classList.add("in")
  );

} else {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "in"
              );


              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: .12
      }
    );


  revealItems.forEach(
    (el) =>
      revealObserver.observe(el)
  );

}

const sections = [
  ...document.querySelectorAll(
    "main section[id]"
  )
];


const navItems = [
  ...document.querySelectorAll(
    ".nav-links a"
  )
];


const updateActiveNav = () => {

  const point =
    window.scrollY + 180;


  let current =
    "home";


  sections.forEach(
    (section) => {

      if (
        point >=
        section.offsetTop
      ) {

        current =
          section.id;

      }

    }
  );


  navItems.forEach(
    (item) => {

      item.classList.toggle(
        "active",

        item.getAttribute(
          "href"
        ) ===
        `#${current}`
      );

    }
  );

};


window.addEventListener(
  "scroll",
  updateActiveNav,
  {
    passive: true
  }
);


updateActiveNav();
if (
  typedCommand &&
  !prefersReducedMotion
) {

  const commands = [

    "npm run build",

    "git push origin main",

    "docker compose up",

    "java -jar app.jar",

    "solve(problem)"

  ];


  let commandIndex = 0;

  let charIndex = 0;

  let deleting = false;


  const typeCommand = () => {

    const current =
      commands[commandIndex];


    if (!deleting) {

      typedCommand.textContent =
        current.slice(
          0,
          charIndex + 1
        );


      charIndex += 1;


      if (
        charIndex ===
        current.length
      ) {

        deleting =
          true;

        return setTimeout(
          typeCommand,
          1200
        );

      }

    } else {

      typedCommand.textContent =
        current.slice(
          0,
          Math.max(
            0,
            charIndex - 1
          )
        );


      charIndex -= 1;


      if (
        charIndex === 0
      ) {

        deleting =
          false;


        commandIndex =
          (
            commandIndex + 1
          ) %
          commands.length;

      }

    }


    setTimeout(
      typeCommand,
      deleting
        ? 38
        : 65
    );

  };


  setTimeout(
    typeCommand,
    1350
  );

}

copyButton?.addEventListener(
  "click",
  async () => {

    try {

      await navigator.clipboard.writeText(
        "git clone https://github.com/KhangDo25"
      );


      copyButton.textContent =
        "copied";

    } catch {

      copyButton.textContent =
        "copy failed";

    }


    setTimeout(
      () => {

        copyButton.textContent =
          "copy";

      },
      1600
    );

  }
);

if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches &&
  !prefersReducedMotion
) {

  document
    .querySelectorAll(
      "[data-tilt]"
    )
    .forEach(
      (card) => {

        card.addEventListener(
          "mousemove",
          (e) => {

            const rect =
              card.getBoundingClientRect();


            const x =
              e.clientX -
              rect.left;


            const y =
              e.clientY -
              rect.top;


            const rx =
              (
                (y /
                  rect.height) -
                .5
              ) *
              -4.5;


            const ry =
              (
                (x /
                  rect.width) -
                .5
              ) *
              6.5;


            card.style.setProperty(
              "--card-x",
              `${x}px`
            );


            card.style.setProperty(
              "--card-y",
              `${y}px`
            );


            card.style.transform =
              `
                perspective(1100px)
                rotateX(${rx}deg)
                rotateY(${ry}deg)
                translateY(-5px)
              `;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

            card.style.removeProperty(
              "--card-x"
            );

            card.style.removeProperty(
              "--card-y"
            );

          }
        );

      }
    );

}

if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches &&
  !prefersReducedMotion
) {

  document
    .querySelectorAll(
      ".magnetic"
    )
    .forEach(
      (el) => {

        el.addEventListener(
          "mousemove",
          (e) => {

            const rect =
              el.getBoundingClientRect();


            const x =
              e.clientX -
              (
                rect.left +
                rect.width / 2
              );


            const y =
              e.clientY -
              (
                rect.top +
                rect.height / 2
              );


            el.style.transform =
              `
                translate(
                  ${x * .12}px,
                  ${y * .12}px
                )
              `;

          }
        );


        el.addEventListener(
          "mouseleave",
          () => {

            el.style.transform =
              "";

          }
        );

      }
    );

}

if (!prefersReducedMotion) {

  const heroCopy =
    document.querySelector(
      ".hero-copy"
    );


  const terminal =
    document.querySelector(
      ".hero-terminal"
    );


  window.addEventListener(
    "scroll",
    () => {

      const y =
        Math.min(
          window.scrollY,
          420
        );


      if (heroCopy) {

        heroCopy.style.transform =
          `
            translateY(
              ${y * -0.05}px
            )
          `;

      }


      if (terminal) {

        terminal.style.marginTop =
          `${y * 0.025}px`;

      }

    },
    {
      passive: true
    }
  );

}