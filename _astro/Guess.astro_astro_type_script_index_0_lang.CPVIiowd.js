import { g as t } from "./index.CzGW6FVa.js";
import { w as z } from "./textAnimations.CAIQTz_e.js";
import { s as D, p as F, w as R } from "./dither.BN2G_tIV.js";
import "./ScrollTrigger.DNECHiyU.js";
const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
document.addEventListener("astro:page-load", () => {
  const y = document.querySelectorAll(".guess__screen");
  if (!y.length) return;
  const s = y[Math.floor(Math.random() * y.length)],
    _ = s.querySelector("img"),
    c = document.querySelector(".guess__coin"),
    C = document.querySelector(".guess__play");
  s.hidden = !1;
  const e = D(s);
  e.canvas.classList.add("size-full!");
  const m = new Float32Array(e.columns * e.rows),
    p = e.columns * 0.06,
    k = { glint: -0.2 };
  let A = new Uint8ClampedArray(m.length * 4),
    u = [],
    L = 0,
    i = 0,
    h = !0,
    v;
  const T = t.to(k, {
    glint: 1.2,
    duration: 1.1,
    ease: "power2.inOut",
    repeat: -1,
    repeatDelay: 6,
    onUpdate: () => {
      h = !0;
    },
    scrollTrigger: {
      trigger: "[data-guess]",
      start: "top center",
      end: "bottom center",
      toggleActions: r ? "play pause play pause" : "none none none none",
    },
  });
  z(() => {
    const o = document.createElement("canvas");
    (o.width = e.columns), (o.height = e.rows);
    const n = o.getContext("2d");
    (n.font = `600 ${e.columns * 0.06}px 'Funnel Display Variable'`),
      (n.textAlign = "center"),
      (n.textBaseline = "middle"),
      n.fillText("Scratch me", e.columns / 2, e.rows / 2),
      (A = n.getImageData(0, 0, e.columns, e.rows).data),
      (h = !0);
  });
  const M = () => {
      if (!h && !u.length) return;
      const o = t.ticker.deltaRatio();
      u = u.filter((n) => n.y < e.rows);
      for (const n of u)
        (n.vy += 0.3 * o),
          (n.x += n.vx * o),
          (n.y += n.vy * o),
          (n.spin += n.turn * o);
      (h = !1), F(e, m, A, k.glint, u);
    },
    x = (o) => {
      if (i === 3) return;
      const n = e.canvas.getBoundingClientRect(),
        d = ((o.clientX - n.left) / n.width) * e.columns,
        f = ((o.clientY - n.top) / n.height) * e.rows,
        l = v ?? { x: d, y: f },
        E = Math.max(1, Math.ceil(Math.hypot(d - l.x, f - l.y) / (p / 3)));
      let w = 0;
      for (let a = 1; a <= E; a++)
        w += R(e, m, l.x + ((d - l.x) * a) / E, l.y + ((f - l.y) * a) / E, p);
      if (
        ((v = { x: d, y: f }),
        (L += w),
        (h = !0),
        o.pointerType === "mouse" &&
          (t.set(c, { x: o.clientX - n.left, y: o.clientY - n.top }),
          t.to(c, {
            rotation: t.utils.clamp(-30, 30, (d - l.x) * 4),
            duration: 0.15 * r,
            overwrite: "auto",
            onComplete: () =>
              t.to(c, {
                rotation: 0,
                duration: 0.8 * r,
                ease: "elastic.out(1, 0.4)",
              }),
          })),
        !w)
      )
        return;
      s.dispatchEvent(new CustomEvent("guess:scratch", { bubbles: !0 }));
      const q = r ? Math.min(6, Math.round(w / 120)) : 0;
      for (let a = 0; a < q; a++)
        u.push({
          x: d + t.utils.random(-p, p) / 2,
          y: f + t.utils.random(-p, p) / 2,
          vx: (d - l.x) * 0.2 + t.utils.random(-1.5, 1.5),
          vy: t.utils.random(-3, -0.5),
          size: t.utils.random(2, 4, 1),
          spin: t.utils.random(0, 6),
          turn: t.utils.random(0.2, 0.6),
        });
      const b = L / m.length;
      if (
        (i === 0 &&
          b > 0.1 &&
          ((i = 1),
          s.dispatchEvent(new CustomEvent("guess:warm", { bubbles: !0 }))),
        i === 1 &&
          b > 0.35 &&
          ((i = 2),
          s.dispatchEvent(
            new CustomEvent("guess:hunch", {
              bubbles: !0,
              detail: s.dataset.hunch,
            })
          ),
          window.dispatchEvent(
            new CustomEvent("mascot:gesture", { detail: "think" })
          )),
        i === 2 && b > 0.65)
      ) {
        i = 3;
        for (let a = 4; a < e.rows; a += 8)
          for (let g = 4; g < e.columns; g += 8) {
            const S = a * e.columns + g;
            !r ||
              m[S] > e.noise[S] ||
              u.push({
                x: g,
                y: a,
                vx: (g / e.columns - 0.5) * 8 + t.utils.random(-1, 1),
                vy: t.utils.random(-7, -2),
                size: t.utils.random(5, 10, 1),
                spin: t.utils.random(0, 6),
                turn: t.utils.random(0.1, 0.4),
              });
          }
        m.fill(2),
          T.kill(),
          s.classList.remove("pointer-fine:cursor-none"),
          t.to(c, { autoAlpha: 0, scale: 0.5, duration: 0.3 * r }),
          t.fromTo(
            _,
            { scale: 1.15 },
            { scale: 1, duration: 1.6 * r, ease: "expo.out" }
          ),
          (C.hidden = !1),
          t.from(C, { autoAlpha: 0, duration: 0.4 * r, delay: 0.4 * r }),
          s.dispatchEvent(
            new CustomEvent("guess:end", {
              bubbles: !0,
              detail: s.dataset.answer,
            })
          ),
          window.dispatchEvent(
            new CustomEvent("mascot:gesture", { detail: "cheer" })
          );
      }
    };
  t.set(c, { xPercent: -50, yPercent: -50, scale: 0.5, autoAlpha: 0 }),
    t.ticker.add(M),
    document.addEventListener("astro:before-swap", () => t.ticker.remove(M), {
      once: !0,
    }),
    s.addEventListener("pointerenter", (o) => {
      o.pointerType === "mouse" &&
        i < 3 &&
        t.to(c, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3 * r,
          ease: "back.out(2)",
        }),
        x(o);
    }),
    s.addEventListener("pointerdown", x),
    s.addEventListener("pointermove", x),
    s.addEventListener("pointerleave", () => {
      (v = void 0), t.to(c, { autoAlpha: 0, scale: 0.5, duration: 0.2 * r });
    });
});
