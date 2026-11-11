import { g as t } from "./index.CzGW6FVa.js";
import { S as u } from "./ScrollTrigger.DNECHiyU.js";
import { S as f } from "./SplitText.Dg80axqL.js";
import { w as Te, s as de } from "./textAnimations.CAIQTz_e.js";
import { c as Ae } from "./dither.BN2G_tIV.js";
t.registerPlugin(u, f);
const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1,
  ue = window.matchMedia("(width >= 48rem)"),
  pe = window.matchMedia("(width >= 48rem) and (orientation: landscape)"),
  n = (p, M) => () => pe.matches ? p : M;
let z = localStorage.getItem("grabbed") === "yes";
const Ce = localStorage.getItem("visited") === "yes";
localStorage.setItem("visited", "yes");
window.addEventListener("mascot:react", (p) => {
  p.detail === "grab" && ((z = !0), localStorage.setItem("grabbed", "yes"));
});
document.addEventListener("astro:page-load", () => {
  document.querySelector(".hero") &&
    (document.querySelector(".hero .button").addEventListener("click", (p) => {
      p.preventDefault(),
        document.querySelector("#contact").scrollIntoView({ block: "end" });
    }),
    document
      .querySelector("[data-trick]")
      .addEventListener("click", () =>
        window.dispatchEvent(new Event("mascot:trick"))
      ),
    Te(() => {
      const p = document.querySelector(".hero h1"),
        M = document.querySelector(".hero__name"),
        me = new f(p, { type: "words", wordsClass: "word", mask: "words" }),
        he = new f(M, {
          type: "words",
          wordsClass: "word",
          mask: "words",
          aria: "none",
        });
      t.from([...he.words, ...me.words], {
        yPercent: 110,
        duration: 1.2 * r,
        ease: "expo.out",
        stagger: 0.07 * r,
        delay: 0.2 * r,
      }),
        t.from([".hero .button", ".sound-toggle.invisible"], {
          yPercent: 60,
          autoAlpha: 0,
          duration: 1.2 * r,
          ease: "expo.out",
          delay: 0.2 * r,
          clearProps: "translate",
        }),
        p.classList.remove("invisible"),
        M?.classList.remove("invisible"),
        document.querySelector(".sound-toggle").classList.remove("invisible"),
        document
          .querySelectorAll(".tour template")
          .forEach((e) => e.replaceWith(document.importNode(e.content, !0))),
        de(
          new f(".about__text", { type: "words", aria: "none" }).words,
          {
            trigger: ".about",
            start: () => (ue.matches ? "top top" : "top 50%"),
            end: () => (ue.matches ? "bottom bottom" : "bottom 50%"),
          },
          (e) => e
        );
      const O = document.querySelector(".mascot-bubble__body"),
        c = t.utils.toArray(".bubble-line");
      let w = -1,
        v = !1;
      t.set(c, { opacity: 0 }), t.set(O, { scale: 0.9 });
      const X = c[0].parentElement,
        g = (e, o) => {
          if (o) {
            if (w !== e) {
              const a = X.offsetHeight;
              w > -1 &&
                (c[w].classList.add("absolute"),
                t.to(c[w], {
                  opacity: 0,
                  duration: v ? 0.15 * r : 0,
                  overwrite: !0,
                })),
                c[e].classList.remove("absolute"),
                t.to(c[e], {
                  opacity: 1,
                  duration: 0.3 * r,
                  delay: v ? 0.15 * r : 0,
                  overwrite: !0,
                }),
                v &&
                  t.fromTo(
                    X,
                    { height: a },
                    {
                      height: X.offsetHeight,
                      duration: 0.45 * r,
                      ease: "power3.inOut",
                      clearProps: "height",
                    }
                  ),
                (w = e);
            }
            v ||
              t.to(O, {
                opacity: 1,
                scale: 1,
                duration: 0.5 * r,
                ease: "back.out(1.7)",
                overwrite: !0,
              }),
              (v = !0);
          } else
            w === e &&
              (t.to(O, {
                opacity: 0,
                scale: 0.9,
                duration: 0.25 * r,
                ease: "power2.in",
                overwrite: !0,
              }),
              (v = !1));
        },
        [ge, ye] = t.utils.toArray("[data-hint-line]").map((e) => c.indexOf(e)),
        T = window.matchMedia("(pointer: coarse)").matches ? ye : ge,
        F = Ce ? c.indexOf(document.querySelector("[data-returning-line]")) : 0;
      t.delayedCall(1.5 * r, () => {
        const e = u.create({
          trigger: ".hero",
          start: "top bottom",
          end: "bottom 60%",
          onToggle: ({ isActive: o }) => {
            g(F, o), o || g(T, !1);
          },
        });
        t.delayedCall(5, () => {
          r && !z && e.isActive && g(T, !0);
        }),
          t.fromTo(
            new f(c[F], { type: "words", aria: "none" }).words,
            { opacity: 0.12 },
            {
              opacity: 1,
              duration: 0.2,
              stagger: {
                each: 0.12 * r,
                onStart: () => {
                  window.dispatchEvent(new CustomEvent("mascot:say"));
                },
              },
            }
          );
      });
      const fe = t.quickSetter(".tour__bubble", "skewY", "deg"),
        A = { skew: 0 };
      u.create({
        trigger: ".tour",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          const o = t.utils.clamp(-7, 7, e.getVelocity() / -350);
          Math.abs(o) <= Math.abs(A.skew) ||
            ((A.skew = o),
            t.to(A, {
              skew: 0,
              duration: 1 * r,
              ease: "elastic.out(1, 0.35)",
              overwrite: !0,
              onUpdate: () => fe(A.skew),
            }));
        },
      });
      const C = new Map(),
        G = (e) => {
          if (pe.matches) return;
          const o = e.detail,
            a = 1 - Math.exp(-t.ticker.deltaRatio() / 3);
          C.forEach((s, i) => {
            const b = i.parentElement,
              q = b.getBoundingClientRect(),
              m = i.offsetWidth,
              h = i.offsetHeight,
              y = o.x - q.left - i.offsetLeft + b.offsetLeft,
              L = o.y - q.top - i.offsetTop + b.offsetTop,
              { x: S, y: l } = s
                ? { x: s.x + (y - s.x) * a, y: s.y + (L - s.y) * a }
                : { x: y, y: L };
            C.set(i, { x: S, y: l });
            const d = Math.min(
                m / 2 / Math.abs(S - m / 2),
                h / 2 / Math.abs(l - h / 2)
              ),
              I = m / 2 + (S - m / 2) * d,
              _ = h / 2 + (l - h / 2) * d,
              ce = t.utils.clamp(24, m - 24, I),
              ie = t.utils.clamp(24, h - 24, _),
              E = Math.atan2(_ - ie, I - ce),
              U = ce + 21 * Math.cos(E) + 32,
              B = ie + 21 * Math.sin(E) + 32,
              le = Math.atan2(l + 32 - B, S + 32 - U),
              qe = [
                [U - 12 * Math.sin(E), B + 12 * Math.cos(E)],
                [U + 12 * Math.sin(E), B - 12 * Math.cos(E)],
                [U + 19 * Math.cos(le), B + 19 * Math.sin(le)],
              ];
            i.style.setProperty(
              "--tail",
              `polygon(${qe
                .map(([Le, Me]) => `${Math.round(Le)}px ${Math.round(Me)}px`)
                .join(", ")})`
            );
          });
        };
      window.addEventListener("mascot:move", G),
        document.addEventListener(
          "astro:before-swap",
          () => window.removeEventListener("mascot:move", G),
          { once: !0 }
        );
      const J = (e, o) => {
        const a = e.querySelector(".tour__bubble"),
          s = t
            .timeline({
              scrollTrigger: {
                trigger: e,
                start: n("top 60%", "top bottom"),
                end: n("top 46%", "top 90%"),
                scrub: !0,
              },
            })
            .fromTo(
              a,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "none" }
            );
        return (
          t.fromTo(
            a,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              immediateRender: !1,
              scrollTrigger: {
                trigger: e,
                start: n("top 18%", "top 64%"),
                end: n("top 6%", "top 56%"),
                scrub: !0,
              },
            }
          ),
          de(
            new f(a.querySelector("p"), { type: "words" }).words,
            {
              trigger: e,
              start: n("top 50%", "top 92%"),
              end: n("top 24%", "top 76%"),
            },
            o
          ),
          u.create({
            trigger: e,
            start: n("top 60%", "top bottom"),
            end: n("top 6%", "top 56%"),
            onToggle: ({ isActive: i }) => {
              i ? C.set(a, void 0) : C.delete(a);
            },
          }),
          s
        );
      };
      t.utils.toArray(".tour__chapter").forEach((e) => {
        const o = e.querySelector(".tour__stage"),
          a = o.querySelector(".tour__phone"),
          s = t.utils.toArray(".tour__stack", o),
          i = [o.querySelector(".tour__screen"), s[1].parentElement],
          b = t.utils.toArray(".tour__host", o),
          q = new f(o.querySelector("h2"), {
            type: "chars",
            charsClass: "char",
            mask: "chars",
          }).chars,
          m = o.querySelector(".tour__title a"),
          h = o.querySelector("video"),
          y = { develop: 0, resolve: 0 },
          L = () =>
            s.forEach((l, d) =>
              Ae(i[d], l.querySelector("img"), 0, y.develop, y.resolve)
            ),
          S = () => {
            window.dispatchEvent(
              new CustomEvent("mascot:swipe", { detail: a })
            );
          };
        t.set([...q, ...b], { yPercent: 150 }),
          t.set([m, ...s], { autoAlpha: 0 }),
          t
            .timeline({
              scrollTrigger: {
                trigger: e,
                start: "top bottom",
                end: "top top",
                scrub: !0,
              },
            })
            .to(
              y,
              { develop: 1, duration: 0.2, ease: "none", onUpdate: L },
              0.4
            )
            .fromTo(
              b[0],
              { yPercent: 150 },
              { yPercent: 0, duration: 0.1, immediateRender: !1 },
              0.45
            )
            .set(s, { autoAlpha: 1 }, 0.6)
            .to(
              y,
              { resolve: 1, duration: 0.2, ease: "none", onUpdate: L },
              0.6
            )
            .fromTo(
              q,
              { yPercent: 150 },
              {
                yPercent: 0,
                stagger: { amount: 0.1 },
                duration: 0.25,
                ease: "power3.out",
                immediateRender: !1,
              },
              0.65
            )
            .fromTo(
              m,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.15, immediateRender: !1 },
              0.85
            ),
          t.utils.toArray("[data-line]", e).forEach((l) => {
            const d = Number(l.dataset.line),
              I = J(l, () => (l.dataset.aim ? a : void 0));
            d &&
              I.fromTo(
                s.map((_) => _.firstElementChild),
                { yPercent: -100 * (d - 1) },
                {
                  yPercent: -100 * d,
                  duration: 1,
                  ease: "power2.inOut",
                  immediateRender: !1,
                },
                0
              )
                .fromTo(
                  o,
                  { "--device": d === 1 ? 0 : 1 },
                  {
                    "--device": d === 1 ? 1 : 0,
                    duration: 1,
                    ease: "none",
                    immediateRender: !1,
                  },
                  0
                )
                .call(S, [], 0.01),
              d === 2 &&
                u.create({
                  trigger: l,
                  start: n("top 60%", "top bottom"),
                  end: "bottom top",
                  onToggle: ({ isActive: _ }) => {
                    _ ? h.play().catch(() => {}) : h.pause();
                  },
                });
          });
      });
      const W = document.querySelector(".tour [data-flip]"),
        P = W.closest(".tour__chapter").querySelector(".tour__flip"),
        we = P.querySelector(".tour__market"),
        ve = P.lastElementChild,
        x = (e) =>
          t.to(P, {
            rotationY: 180 * e,
            duration: 1.1 * r,
            ease: "back.out(1.4)",
            overwrite: !0,
            onUpdate: () => {
              const o = t.getProperty(P, "rotationY");
              we.classList.toggle("invisible", o < 270),
                ve.classList.toggle("invisible", o < 90 || o > 270);
            },
          });
      u.create({
        trigger: W,
        start: n("top 40%", "top 86%"),
        onEnter: () => x(1),
        onLeaveBack: () => x(0),
      }),
        u.create({
          trigger: W,
          start: n("top 26%", "top 78%"),
          onEnter: () => x(2),
          onLeaveBack: () => x(1),
        });
      const K = document.querySelector(".tour [data-looks]"),
        Q = K.closest(".tour__chapter"),
        $ = t.utils.toArray(".tour__host", Q),
        [be, Se] = t.utils
          .toArray(".tour__stack", Q)
          .map((e) => [
            e.querySelectorAll("img")[1],
            ...e.querySelectorAll(".tour__look"),
          ]),
        Z = be.map((e, o) => [e, Se[o]]),
        ee = [...$.keys(), 0],
        D = t.timeline({
          scrollTrigger: {
            trigger: K,
            start: n("top 46%", "top 90%"),
            end: n("top 18%", "top 64%"),
            scrub: !0,
          },
        });
      ee.slice(1).forEach((e, o) => {
        const a = ee[o],
          s = 0.25 + o * 0.3;
        D.to($[a], { yPercent: -150, duration: 0.03 }, s + 0.05).fromTo(
          $[e],
          { yPercent: 150 },
          { yPercent: 0, duration: 0.03, immediateRender: !1 },
          s + 0.06
        ),
          a && D.set(Z[a], { autoAlpha: 0 }, s + 0.05),
          e && D.set(Z[e], { autoAlpha: 1 }, s + 0.05);
      });
      const R = document.querySelector("[data-guess]"),
        N = R.closest(".tour__chapter"),
        Y = N.querySelector(".guess"),
        _e = N.querySelector(".tour__phone"),
        [Ee, ke, te, oe] = t.utils.toArray("[data-guess-line]", R);
      let re = Ee;
      const V = (e) => {
        t.to(re, { opacity: 0, duration: 0.15 * r, overwrite: !0 }),
          t.to(e, {
            opacity: 1,
            duration: 0.3 * r,
            delay: 0.15 * r,
            overwrite: !0,
          }),
          (re = e);
      };
      Y.addEventListener("guess:warm", () => V(ke)),
        Y.addEventListener("guess:hunch", (e) => {
          (te.querySelector("span").textContent = e.detail), V(te);
        }),
        Y.addEventListener("guess:end", (e) => {
          (oe.querySelector("span").textContent = e.detail), V(oe);
        }),
        J(R, () => N.querySelector(".tour__screen")),
        u.create({
          trigger: R,
          start: n("top 60%", "top bottom"),
          end: n("top 6%", "top 56%"),
          onToggle: ({ isActive: e }) => {
            t.to(Y, { autoAlpha: e ? 1 : 0, duration: 0.4 * r, overwrite: !0 }),
              t.to(_e, {
                autoAlpha: e ? 0 : 1,
                duration: 0.4 * r,
                overwrite: !0,
              });
          },
        }),
        t.utils.toArray("#work a").forEach((e) => {
          const o = () =>
            window.dispatchEvent(
              new CustomEvent("mascot:look", {
                detail: e.querySelector("[data-cover]"),
              })
            );
          e.addEventListener("pointerenter", o), e.addEventListener("focus", o);
        });
      const k = document.querySelector('#contact [href^="mailto:"]'),
        j = c.length - 2,
        se = c.length - 1;
      let ae;
      const ne = () => {
          g(j, !1), g(se, !1), g(T, !1);
        },
        H = (e, o) => {
          g(e, !0),
            o &&
              window.dispatchEvent(
                new CustomEvent("mascot:gesture", { detail: o })
              ),
            ae?.kill(),
            (ae = t.delayedCall(4, ne));
        };
      k.addEventListener("pointerenter", () => H(j, "cheer")),
        k.addEventListener("focus", () => {
          k.matches(":focus-visible") && H(j, "cheer");
        }),
        k.addEventListener("click", (e) => {
          e.preventDefault(),
            navigator.clipboard
              .writeText(k.href.replace("mailto:", ""))
              .then(() => H(se, "thumbs"));
        }),
        u.create({
          trigger: "#contact",
          start: "top center",
          onEnter: () => {
            r && !z && H(T);
          },
          onLeaveBack: ne,
        });
    }));
});