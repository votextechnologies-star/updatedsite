import { g as w } from "./index.CzGW6FVa.js";
import { S as A } from "./ScrollTrigger.DNECHiyU.js";
import { a as v, r as x, b as E, t as b } from "./dither.BN2G_tIV.js";
const h = (n) => n.pathname.match(/^\/projects\/([^/]+)/)?.[1],
  V = (n) => {
    const { top: e, bottom: t } = n.getBoundingClientRect();
    return t > 0 && e < window.innerHeight;
  },
  R = (n, e) => (
    window.dispatchEvent(new CustomEvent("mascot:look", { detail: n })),
    (n.dataset.active = ""),
    w.to(document.querySelectorAll(`[data-cover]:not([data-cover="${e}"])`), {
      opacity: 0.35,
      duration: 0.25,
    }),
    w.to(n, { scale: 1.02, duration: 0.25, ease: "power3.out" }).then()
  ),
  S = (n, e) => {
    const t = n.querySelector(`[data-cover="${e}"]`);
    t.querySelector("img").decoding = "sync";
    const o = document.importNode(t, !0);
    return (
      (o.hidden = !0),
      document.body.append(o),
      o
        .querySelector("img")
        .decode()
        .catch(() => {})
    );
  },
  N = () => {
    let n, e;
    document.addEventListener("astro:before-preparation", (t) => {
      const o = h(t.to),
        a = h(t.from);
      e = t.navigationType === "push" && t.to.pathname === "/" ? a : void 0;
      const i = o !== void 0 && (t.direction === "forward" || a === void 0),
        s = i ? o : a;
      if (
        ((n = void 0),
        !s || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      )
        return;
      const c = document.querySelector(`[data-cover="${s}"]`),
        p = c !== null && V(c),
        f = document.querySelector(".mascot-badge").getBoundingClientRect(),
        m = f.left + f.width / 2,
        y = f.top + f.height / 2;
      if (
        ((n = {
          type: i ? "open" : "close",
          name: s,
          morph: p,
          x: m,
          y,
          from: f.width / 2,
          to: Math.hypot(
            Math.max(m, window.innerWidth - m),
            Math.max(y, window.innerHeight - y)
          ),
        }),
        p && (c.style.viewTransitionName = "cover"),
        !i)
      )
        return;
      const T = t.loader;
      t.loader = async () => {
        const q = T().then(() => {
          if (!t.defaultPrevented) return S(t.newDocument, s);
        });
        await Promise.all([q, p && R(c, s)]);
      };
    }),
      document.addEventListener("astro:before-swap", (t) => {
        if (!n) return;
        const o = t.newDocument.documentElement;
        if (
          ((o.dataset.flood = n.type),
          o.style.setProperty("--flood-x", `${n.x}px`),
          o.style.setProperty("--flood-y", `${n.y}px`),
          o.style.setProperty("--flood-from", `${n.from}px`),
          o.style.setProperty("--flood-to", `${n.to}px`),
          !n.morph)
        )
          return;
        const a = t.newDocument.querySelector(`[data-cover="${n.name}"]`);
        (a.style.viewTransitionName = "cover"),
          t.viewTransition.finished.finally(() =>
            a.style.removeProperty("view-transition-name")
          );
      }),
      document.addEventListener("astro:after-swap", () => {
        e && document.getElementById(e).scrollIntoView();
      });
  },
  u = (n, e, t, o) => {
    const a = new GainNode(n.context, { gain: 0 });
    return (
      a.gain.setValueAtTime(0, e),
      a.gain.linearRampToValueAtTime(t, e + 0.008),
      a.gain.exponentialRampToValueAtTime(1e-4, e + o),
      a.connect(n),
      a
    );
  },
  r = (n, e, t, o, a, i, s) => {
    const c = new OscillatorNode(n.context, { type: t, frequency: o });
    return (
      c.frequency.setValueAtTime(o, e),
      c.frequency.exponentialRampToValueAtTime(a, e + i),
      c.connect(u(n, e, s, i)),
      c.start(e),
      c.stop(e + i),
      c
    );
  },
  l = (n, e, t, o, a) => {
    const i = new OscillatorNode(n.context, { frequency: t }),
      s = new GainNode(n.context, { gain: o });
    s.gain.setValueAtTime(o, e),
      s.gain.linearRampToValueAtTime(0, e + a),
      i.connect(s).connect(n.frequency),
      i.start(e),
      i.stop(e + a);
  },
  d = (n, e, t) => {
    const o = n.context,
      a = Math.ceil(o.sampleRate * t),
      i = new AudioBuffer({ length: a, sampleRate: o.sampleRate });
    i.getChannelData(0).set(
      Float32Array.from({ length: a }, () => Math.random() * 2 - 1)
    );
    const s = new AudioBufferSourceNode(o, { buffer: i });
    s.connect(n), s.start(e);
  },
  g = {
    blip: (n, e) => {
      const t = 392 * 2 ** ((Math.random() * 5) / 12);
      r(n, e, "triangle", t * 1.25, t, 0.07, 0.1);
    },
    pat: (n, e) => {
      r(n, e, "sine", 523, 587, 0.16, 0.13),
        r(n, e + 0.13, "sine", 659, 784, 0.3, 0.12);
    },
    surprise: (n, e) => {
      r(n, e, "triangle", 330, 990, 0.2, 0.14);
    },
    giggle: (n, e) => {
      [988, 880, 932, 784].forEach((t, o) =>
        r(n, e + o * 0.12, "triangle", t, t * 1.12, 0.1, 0.13)
      );
    },
    grab: (n, e) => {
      l(r(n, e, "triangle", 196, 523, 0.4, 0.14), e, 14, 14, 0.4);
    },
    drop: (n, e) => {
      l(r(n, e, "sine", 392, 220, 0.7, 0.15), e, 11, 80, 0.7);
    },
    sleep: (n, e) => {
      const t = new BiquadFilterNode(n.context, { type: "lowpass", Q: 6 });
      t.frequency.setValueAtTime(400, e),
        t.frequency.linearRampToValueAtTime(1100, e + 0.4),
        t.frequency.linearRampToValueAtTime(300, e + 1.1),
        t.connect(n);
      const o = new GainNode(n.context, { gain: 0 });
      o.gain.setValueAtTime(0, e),
        o.gain.linearRampToValueAtTime(0.075, e + 0.3),
        o.gain.linearRampToValueAtTime(0.06, e + 0.8),
        o.gain.linearRampToValueAtTime(0, e + 1.2),
        o.connect(t);
      const a = new OscillatorNode(n.context, { type: "sawtooth" });
      a.frequency.setValueAtTime(262, e),
        a.frequency.linearRampToValueAtTime(349, e + 0.35),
        a.frequency.linearRampToValueAtTime(175, e + 1.2),
        a.connect(o),
        a.start(e),
        a.stop(e + 1.2);
    },
    wake: (n, e) => {
      r(n, e, "triangle", 587, 880, 0.06, 0.14),
        r(n, e + 0.07, "triangle", 880, 1319, 0.12, 0.14);
    },
    dizzy: (n, e) => {
      l(r(n, e, "sine", 880, 330, 1.2, 0.13), e, 7, 70, 1.2);
    },
    laugh: (n, e) => {
      [988, 932, 880, 831, 784, 740, 698, 659].forEach((t, o) =>
        r(n, e + o * 0.13, "triangle", t, t * 1.12, 0.1, 0.13)
      );
    },
    sulk: (n, e) => {
      r(n, e, "triangle", 262, 247, 0.12, 0.12),
        r(n, e + 0.15, "triangle", 220, 165, 0.3, 0.12);
    },
    sniffle: (n, e) => {
      r(n, e, "sine", 392, 523, 0.3, 0.1),
        r(n, e + 0.6, "sine", 440, 659, 0.35, 0.1);
    },
    sneeze: (n, e) => {
      const t = new BiquadFilterNode(n.context, { type: "bandpass", Q: 1.2 });
      t.frequency.setValueAtTime(2600, e),
        t.frequency.exponentialRampToValueAtTime(700, e + 0.3),
        t.connect(u(n, e, 0.35, 0.3)),
        d(t, e, 0.3),
        r(n, e, "triangle", 880, 220, 0.25, 0.1);
    },
    dance: (n, e) => {
      [523, 659, 784, 659, 587, 740, 880, 1047].forEach((t, o) =>
        r(n, e + o * 0.2, "triangle", t, t, 0.12, 0.11)
      );
    },
    panic: (n, e) => {
      [988, 740, 988, 740, 988, 740, 988, 740].forEach((t, o) =>
        r(n, e + o * 0.1, "triangle", t, t, 0.08, 0.1)
      );
    },
    fly: (n, e) => {
      l(r(n, e, "triangle", 262, 784, 1.9, 0.12), e, 9, 20, 1.9);
    },
    hiccup: (n, e) => {
      [0.3, 1.2, 1.8].forEach((t) =>
        r(n, e + t, "triangle", 700, 1400, 0.07, 0.13)
      );
    },
    peekaboo: (n, e) => {
      r(n, e, "triangle", 392, 1175, 0.18, 0.14),
        r(n, e + 0.16, "triangle", 784, 1568, 0.14, 0.12);
    },
    selfie: (n, e) => {
      const t = new BiquadFilterNode(n.context, {
        type: "highpass",
        frequency: 2e3,
      });
      t.connect(u(n, e + 1.1, 0.25, 0.05)),
        d(t, e + 1.1, 0.05),
        r(n, e + 1.1, "square", 1800, 1200, 0.03, 0.06);
    },
    vanish: (n, e) => {
      l(r(n, e, "sine", 880, 110, 1, 0.12), e, 30, 40, 1),
        l(r(n, e + 2, "sine", 110, 880, 1, 0.12), e + 2, 30, 40, 1);
    },
    punch: (n, e) => {
      r(n, e, "sine", 160, 50, 0.18, 0.3);
      const t = new BiquadFilterNode(n.context, {
        type: "lowpass",
        frequency: 900,
      });
      t.connect(u(n, e, 0.3, 0.08)), d(t, e, 0.08);
    },
    bonk: (n, e) => {
      r(n, e, "triangle", 880, 440, 0.12, 0.2),
        r(n, e, "sine", 220, 110, 0.15, 0.2);
    },
    bell: (n, e) => {
      [0, 0.22].forEach((t) => {
        r(n, e + t, "sine", 1319, 1319, 0.6, 0.12),
          r(n, e + t, "sine", 3296, 3296, 0.3, 0.05);
      });
    },
    whoosh: (n, e) => {
      const t = new BiquadFilterNode(n.context, { type: "bandpass", Q: 0.8 });
      t.frequency.setValueAtTime(300, e),
        t.frequency.exponentialRampToValueAtTime(1800, e + 0.45),
        t.frequency.exponentialRampToValueAtTime(500, e + 0.9);
      const o = new GainNode(n.context, { gain: 0 });
      o.gain.setValueAtTime(0, e),
        o.gain.linearRampToValueAtTime(0.2, e + 0.4),
        o.gain.linearRampToValueAtTime(0, e + 0.9),
        t.connect(o).connect(n),
        d(t, e, 0.9);
    },
    scratch: (n, e) => {
      const t = new BiquadFilterNode(n.context, {
        type: "bandpass",
        frequency: 2500 + Math.random() * 2500,
        Q: 0.9,
      });
      t.connect(u(n, e, 0.08, 0.05)), d(t, e, 0.05);
    },
    shatter: (n, e) => {
      const t = new BiquadFilterNode(n.context, {
        type: "highpass",
        frequency: 1500,
      });
      t.connect(u(n, e, 0.2, 0.3)),
        d(t, e, 0.3),
        [523, 659, 784, 1047].forEach((o, a) =>
          r(n, e + 0.08 + a * 0.08, "triangle", o, o, 0.2, 0.12)
        );
    },
  },
  L = () => {
    const n = document.querySelector(".sound-toggle");
    let e = localStorage.getItem("sound") === "on",
      t,
      o = 0,
      a = 0;
    const i = () => {
        (t ??= new AudioContext()), t.resume();
      },
      s = (c) => {
        !e ||
          !navigator.userActivation.hasBeenActive ||
          (i(), t.state === "running" && c(t.destination, t.currentTime));
      };
    n.setAttribute("aria-pressed", `${e}`),
      n.addEventListener("click", () => {
        (e = !e),
          n.setAttribute("aria-pressed", `${e}`),
          localStorage.setItem("sound", e ? "on" : "off"),
          e && i();
      }),
      window.addEventListener("mascot:say", () => {
        const c = performance.now();
        c - o < 120 || ((o = c), s(g.blip));
      }),
      window.addEventListener("mascot:react", (c) => s(g[c.detail])),
      window.addEventListener("guess:scratch", () => {
        const c = performance.now();
        c - a < 60 || ((a = c), s(g.scratch));
      }),
      window.addEventListener("guess:end", () => s(g.shatter)),
      document.addEventListener("astro:after-swap", () => {
        document.documentElement.dataset.flood && s(g.whoosh);
      });
  };
N();
L();
const B = () => {
  const n = Array.from(document.querySelectorAll("main section")).find(
    (e) => e.getBoundingClientRect().bottom > 0
  );
  document.body.style.backgroundColor = getComputedStyle(n).backgroundColor;
};
w.ticker.add(B);
document.addEventListener("astro:page-load", v);
document.addEventListener("astro:page-load", x);
document.addEventListener("astro:page-load", E);
document.addEventListener("astro:before-preparation", b);
document.addEventListener("astro:before-swap", () =>
  A.getAll().forEach((n) => n.kill())
);
document.addEventListener("astro:after-swap", () =>
  document.querySelectorAll("video").forEach((n) => {
    n.src = n.src;
  })
);
