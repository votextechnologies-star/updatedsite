import { g as r } from "./index.CzGW6FVa.js";
import { S as c } from "./ScrollTrigger.DNECHiyU.js";
import { S as i } from "./SplitText.Dg80axqL.js";
import { w as l, s as g } from "./textAnimations.CAIQTz_e.js";
import "./dither.BN2G_tIV.js";
r.registerPlugin(c, i);
const t = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1,
  d = window.matchMedia("(width >= 48rem)");
document.addEventListener("astro:page-load", () => {
  if (!document.querySelector(".case-hero")) return;
  const s = document.querySelector(".case-hero__image");
  s.classList.remove("scale-[1.04]"),
    s.closest("[data-cover]").style.viewTransitionName &&
      r.fromTo(
        s,
        { scale: 1.04 },
        { scale: 1, duration: 1.6 * t, ease: "expo.out" }
      ),
    r.set(".mascot-bubble__body", { scale: 0.9 }),
    l(() => {
      const o = new i(".case-hero h1", {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });
      r.from(o.words, {
        yPercent: 110,
        duration: 1.2 * t,
        ease: "expo.out",
        stagger: 0.07 * t,
        delay: 0.4 * t,
      }),
        r.from(".case-hero dl > div", {
          y: 16,
          opacity: 0,
          duration: 0.8 * t,
          ease: "expo.out",
          stagger: 0.08 * t,
          delay: 0.6 * t,
        }),
        t &&
          document
            .querySelectorAll(".case-reveal, .case-copy p")
            .forEach((e) => {
              g(
                new i(e, { type: "words", aria: "none" }).words,
                { trigger: e, start: "top 65%", end: "bottom 65%" },
                () => {}
              );
            });
    }),
    document.querySelectorAll("main video").forEach((o) => {
      c.create({
        trigger: o,
        start: "top bottom",
        end: "bottom top",
        onToggle: ({ isActive: e }) =>
          e ? o.play().catch(() => {}) : o.pause(),
      });
    });
});
window.addEventListener("mascot:land", () => {
  if (!document.querySelector(".case-hero")) return;
  const s = r.utils.toArray(".bubble-line"),
    o = (e, a) => {
      a && s.forEach((m, n) => (m.hidden = n !== e)),
        r.to(".mascot-bubble__body", {
          opacity: a ? 1 : 0,
          scale: a ? 1 : 0.9,
          duration: 0.45 * t,
          ease: a ? "back.out(1.7)" : "power2.in",
          overwrite: !0,
        });
    };
  d.matches &&
    c.create({
      trigger: ".case-hero",
      start: "top bottom",
      end: "bottom 60%",
      onToggle: ({ isActive: e }) => o(0, e),
    }),
    r.utils.toArray(".case-clip").forEach((e, a) => {
      const m = e.querySelector("video"),
        n = () => (d.matches ? "top 25%" : "top 60%");
      c.create({
        trigger: e,
        start: n,
        end: () => (d.matches ? "bottom 75%" : "bottom 60%"),
        onToggle: ({ isActive: u }) => o(a + 2, u),
      }),
        l(() =>
          g(
            new i(s[a + 2], { type: "words", aria: "none" }).words,
            {
              trigger: e,
              start: n,
              end: () => (d.matches ? "bottom 90%" : "bottom 70%"),
            },
            () => m
          )
        );
    }),
    c.create({
      trigger: ".case-next",
      start: "top 25%",
      onToggle: ({ isActive: e }) => {
        o(1, e),
          e &&
            window.dispatchEvent(
              new CustomEvent("mascot:say", {
                detail: document.querySelector(".case-next [data-cover]"),
              })
            );
      },
    });
});
