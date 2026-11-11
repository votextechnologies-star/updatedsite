import { g as i } from "./index.CzGW6FVa.js";
const d = (t) => {
    if (typeof document > "u") return;
    const e = document.fonts;
    if (!e) {
      requestAnimationFrame(t);
      return;
    }
    if (e.status === "loaded") {
      t();
      return;
    }
    e.ready.then(t).catch(() => {
      t();
    });
  },
  f = (t, e, s) => {
    let o = -1;
    i.fromTo(
      t,
      { opacity: 0.12 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          ...e,
          scrub: !0,
          onUpdate: ({ progress: r, isActive: a }) => {
            const n = Math.min(Math.floor(r * t.length), t.length - 1);
            !a ||
              n === o ||
              ((o = n),
              window.dispatchEvent(
                new CustomEvent("mascot:say", { detail: s(t[n]) })
              ));
          },
        },
      }
    );
  };
export { f as s, d as w };
