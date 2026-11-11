import { g as b } from "./index.CzGW6FVa.js";
import { S as W } from "./ScrollTrigger.DNECHiyU.js";
var C = "1.3.25";
function Y(t, e, s) {
  return Math.max(t, Math.min(e, s));
}
function j(t, e, s) {
  return (1 - s) * t + s * e;
}
function G(t, e, s, i) {
  return j(t, e, 1 - Math.exp(-s * i));
}
function K(t, e) {
  return ((t % e) + e) % e;
}
var $ = class {
  isRunning = !1;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  lerp;
  duration;
  easing;
  onUpdate;
  advance(t) {
    if (!this.isRunning) return;
    let e = !1;
    if (this.duration && this.easing) {
      this.currentTime += t;
      const s = Y(0, this.currentTime / this.duration, 1);
      e = s >= 1;
      const i = e ? 1 : this.easing(s);
      this.value = this.from + (this.to - this.from) * i;
    } else
      this.lerp
        ? ((this.value = G(this.value, this.to, this.lerp * 60, t)),
          Math.round(this.value) === Math.round(this.to) &&
            ((this.value = this.to), (e = !0)))
        : ((this.value = this.to), (e = !0));
    e && this.stop(), this.onUpdate?.(this.value, e);
  }
  stop() {
    this.isRunning = !1;
  }
  fromTo(t, e, { lerp: s, duration: i, easing: o, onStart: n, onUpdate: a }) {
    (this.from = this.value = t),
      (this.to = e),
      (this.lerp = s),
      (this.duration = i),
      (this.easing = o),
      (this.currentTime = 0),
      (this.isRunning = !0),
      n?.(),
      (this.onUpdate = a);
  }
};
function Q(t, e) {
  let s;
  return function (...i) {
    clearTimeout(s),
      (s = setTimeout(() => {
        (s = void 0), t.apply(this, i);
      }, e));
  };
}
var J = class {
    width = 0;
    height = 0;
    scrollHeight = 0;
    scrollWidth = 0;
    debouncedResize;
    wrapperResizeObserver;
    contentResizeObserver;
    constructor(t, e, { autoResize: s = !0, debounce: i = 250 } = {}) {
      (this.wrapper = t),
        (this.content = e),
        s &&
          ((this.debouncedResize = Q(this.resize, i)),
          this.wrapper instanceof Window
            ? window.addEventListener("resize", this.debouncedResize)
            : ((this.wrapperResizeObserver = new ResizeObserver(
                this.debouncedResize
              )),
              this.wrapperResizeObserver.observe(this.wrapper)),
          (this.contentResizeObserver = new ResizeObserver(
            this.debouncedResize
          )),
          this.contentResizeObserver.observe(this.content)),
        this.resize();
    }
    destroy() {
      this.wrapperResizeObserver?.disconnect(),
        this.contentResizeObserver?.disconnect(),
        this.wrapper === window &&
          this.debouncedResize &&
          window.removeEventListener("resize", this.debouncedResize);
    }
    resize = () => {
      this.onWrapperResize(), this.onContentResize();
    };
    onWrapperResize = () => {
      this.wrapper instanceof Window
        ? ((this.width = window.innerWidth), (this.height = window.innerHeight))
        : ((this.width = this.wrapper.clientWidth),
          (this.height = this.wrapper.clientHeight));
    };
    onContentResize = () => {
      this.wrapper instanceof Window
        ? ((this.scrollHeight = this.content.scrollHeight),
          (this.scrollWidth = this.content.scrollWidth))
        : ((this.scrollHeight = this.wrapper.scrollHeight),
          (this.scrollWidth = this.wrapper.scrollWidth));
    };
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height,
      };
    }
  },
  X = class {
    events = {};
    emit(t, ...e) {
      const s = this.events[t] || [];
      for (let i = 0, o = s.length; i < o; i++) s[i]?.(...e);
    }
    on(t, e) {
      return (
        this.events[t] ? this.events[t].push(e) : (this.events[t] = [e]),
        () => {
          this.events[t] = this.events[t]?.filter((s) => e !== s);
        }
      );
    }
    off(t, e) {
      this.events[t] = this.events[t]?.filter((s) => e !== s);
    }
    destroy() {
      this.events = {};
    }
  };
const Z = 100 / 6,
  E = { passive: !1 };
function I(t, e) {
  return t === 1 ? Z : t === 2 ? e : 1;
}
var tt = class {
  touchStart = { x: 0, y: 0 };
  lastDelta = { x: 0, y: 0 };
  window = { width: 0, height: 0 };
  emitter = new X();
  constructor(t, e = { wheelMultiplier: 1, touchMultiplier: 1 }) {
    (this.element = t),
      (this.options = e),
      window.addEventListener("resize", this.onWindowResize),
      this.onWindowResize(),
      this.element.addEventListener("wheel", this.onWheel, E),
      this.element.addEventListener("touchstart", this.onTouchStart, E),
      this.element.addEventListener("touchmove", this.onTouchMove, E),
      this.element.addEventListener("touchend", this.onTouchEnd, E);
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  destroy() {
    this.emitter.destroy(),
      window.removeEventListener("resize", this.onWindowResize),
      this.element.removeEventListener("wheel", this.onWheel, E),
      this.element.removeEventListener("touchstart", this.onTouchStart, E),
      this.element.removeEventListener("touchmove", this.onTouchMove, E),
      this.element.removeEventListener("touchend", this.onTouchEnd, E);
  }
  onTouchStart = (t) => {
    const { clientX: e, clientY: s } = t.targetTouches ? t.targetTouches[0] : t;
    (this.touchStart.x = e),
      (this.touchStart.y = s),
      (this.lastDelta = { x: 0, y: 0 }),
      this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t });
  };
  onTouchMove = (t) => {
    const { clientX: e, clientY: s } = t.targetTouches ? t.targetTouches[0] : t,
      i = -(e - this.touchStart.x) * this.options.touchMultiplier,
      o = -(s - this.touchStart.y) * this.options.touchMultiplier;
    (this.touchStart.x = e),
      (this.touchStart.y = s),
      (this.lastDelta = { x: i, y: o }),
      this.emitter.emit("scroll", { deltaX: i, deltaY: o, event: t });
  };
  onTouchEnd = (t) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event: t,
    });
  };
  onWheel = (t) => {
    let { deltaX: e, deltaY: s, deltaMode: i } = t;
    const o = I(i, this.window.width),
      n = I(i, this.window.height);
    (e *= o),
      (s *= n),
      (e *= this.options.wheelMultiplier),
      (s *= this.options.wheelMultiplier),
      this.emitter.emit("scroll", { deltaX: e, deltaY: s, event: t });
  };
  onWindowResize = () => {
    this.window = { width: window.innerWidth, height: window.innerHeight };
  };
};
const k = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var et = class {
  _isScrolling = !1;
  _isStopped = !1;
  _isLocked = !1;
  _preventNextNativeScrollEvent = !1;
  _resetVelocityTimeout = null;
  _rafId = null;
  _isDraggingSelection = !1;
  isTouching;
  isIos;
  time = 0;
  userData = {};
  lastVelocity = 0;
  velocity = 0;
  direction = 0;
  options;
  targetScroll;
  animatedScroll;
  animate = new $();
  emitter = new X();
  dimensions;
  virtualScroll;
  constructor({
    wrapper: t = window,
    content: e = document.documentElement,
    eventsTarget: s = t,
    smoothWheel: i = !0,
    syncTouch: o = !1,
    syncTouchLerp: n = 0.075,
    touchInertiaExponent: a = 1.7,
    duration: u,
    easing: d,
    lerp: p = 0.1,
    infinite: c = !1,
    orientation: h = "vertical",
    gestureOrientation: r = h === "horizontal" ? "both" : "vertical",
    touchMultiplier: f = 1,
    wheelMultiplier: l = 1,
    autoResize: m = !0,
    prevent: v,
    virtualScroll: g,
    overscroll: S = !0,
    autoRaf: w = !1,
    anchors: y = !1,
    autoToggle: z = !1,
    allowNestedScroll: M = !1,
    __experimental__naiveDimensions: V = !1,
    naiveDimensions: B = V,
    stopInertiaOnNavigate: q = !1,
  } = {}) {
    (window.lenisVersion = C),
      window.lenis || (window.lenis = {}),
      (window.lenis.version = C),
      h === "horizontal" && (window.lenis.horizontal = !0),
      o === !0 && (window.lenis.touch = !0),
      (this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent)),
      (!t || t === document.documentElement) && (t = window),
      typeof u == "number" && typeof d != "function"
        ? (d = k)
        : typeof d == "function" && typeof u != "number" && (u = 1),
      (this.options = {
        wrapper: t,
        content: e,
        eventsTarget: s,
        smoothWheel: i,
        syncTouch: o,
        syncTouchLerp: n,
        touchInertiaExponent: a,
        duration: u,
        easing: d,
        lerp: p,
        infinite: c,
        gestureOrientation: r,
        orientation: h,
        touchMultiplier: f,
        wheelMultiplier: l,
        autoResize: m,
        prevent: v,
        virtualScroll: g,
        overscroll: S,
        autoRaf: w,
        anchors: y,
        autoToggle: z,
        allowNestedScroll: M,
        naiveDimensions: B,
        stopInertiaOnNavigate: q,
      }),
      (this.dimensions = new J(t, e, { autoResize: m })),
      this.updateClassName(),
      (this.targetScroll = this.animatedScroll = this.actualScroll),
      this.options.wrapper.addEventListener("scroll", this.onNativeScroll),
      this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
        capture: !0,
      }),
      (this.options.anchors || this.options.stopInertiaOnNavigate) &&
        this.options.wrapper.addEventListener("click", this.onClick),
      this.options.wrapper.addEventListener("pointerdown", this.onPointerDown),
      (this.virtualScroll = new tt(s, {
        touchMultiplier: f,
        wheelMultiplier: l,
      })),
      this.virtualScroll.on("scroll", this.onVirtualScroll),
      this.options.autoToggle &&
        (this.checkOverflow(),
        this.rootElement.addEventListener(
          "transitionend",
          this.onTransitionEnd
        )),
      this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  }
  destroy() {
    this.emitter.destroy(),
      this.options.wrapper.removeEventListener("scroll", this.onNativeScroll),
      this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
        capture: !0,
      }),
      this.options.wrapper.removeEventListener(
        "pointerdown",
        this.onPointerDown
      ),
      (this.options.anchors || this.options.stopInertiaOnNavigate) &&
        this.options.wrapper.removeEventListener("click", this.onClick),
      this.virtualScroll.destroy(),
      this.dimensions.destroy(),
      this.cleanUpClassName(),
      this._rafId && cancelAnimationFrame(this._rafId);
  }
  on(t, e) {
    return this.emitter.on(t, e);
  }
  off(t, e) {
    return this.emitter.off(t, e);
  }
  onScrollEnd = (t) => {
    t instanceof CustomEvent ||
      ((this.isScrolling === "smooth" || this.isScrolling === !1) &&
        t.stopPropagation());
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(
      new CustomEvent("scrollend", {
        bubbles: this.options.wrapper === window,
        detail: { lenisScrollEnd: !0 },
      })
    );
  };
  get overflow() {
    const t = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[t];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow)
      ? this.internalStop()
      : this.internalStart();
  }
  onTransitionEnd = (t) => {
    t.propertyName?.includes("overflow") &&
      t.target === this.rootElement &&
      this.checkOverflow();
  };
  setScroll(t) {
    this.isHorizontal
      ? this.options.wrapper.scrollTo({ left: t, behavior: "instant" })
      : this.options.wrapper.scrollTo({ top: t, behavior: "instant" });
  }
  onClick = (t) => {
    const e = t
        .composedPath()
        .filter((i) => i instanceof HTMLAnchorElement && i.href)
        .map((i) => new URL(i.href)),
      s = new URL(window.location.href);
    if (this.options.anchors) {
      const i = e.find(
        (o) => s.host === o.host && s.pathname === o.pathname && o.hash
      );
      if (i) {
        const o =
            typeof this.options.anchors == "object" && this.options.anchors
              ? this.options.anchors
              : void 0,
          n = decodeURIComponent(i.hash);
        this.scrollTo(n, o);
        return;
      }
    }
    if (
      this.options.stopInertiaOnNavigate &&
      e.some((i) => s.host === i.host && s.pathname !== i.pathname)
    ) {
      this.reset();
      return;
    }
  };
  onPointerDown = (t) => {
    t.button === 1 && this.reset();
  };
  isTouchOnSelectionHandle(t) {
    const e = window.getSelection();
    if (!e || e.isCollapsed || e.rangeCount === 0) return !1;
    const s = t.targetTouches[0] ?? t.changedTouches[0];
    if (!s) return !1;
    const i = e.getRangeAt(0).getClientRects();
    if (i.length === 0) return !1;
    const o = i[0],
      n = i[i.length - 1],
      a = 40,
      u = Math.hypot(s.clientX - o.left, s.clientY - o.top) <= a,
      d = Math.hypot(s.clientX - n.right, s.clientY - n.bottom) <= a;
    return u || d;
  }
  onVirtualScroll = (t) => {
    if (
      typeof this.options.virtualScroll == "function" &&
      this.options.virtualScroll(t) === !1
    )
      return;
    const { deltaX: e, deltaY: s, event: i } = t;
    if (
      (this.emitter.emit("virtual-scroll", { deltaX: e, deltaY: s, event: i }),
      i.ctrlKey || i.lenisStopPropagation)
    )
      return;
    const o = i.type.includes("touch"),
      n = i.type.includes("wheel");
    if (
      o &&
      this.isIos &&
      (i.type === "touchstart" &&
        (this._isDraggingSelection = this.isTouchOnSelectionHandle(i)),
      this._isDraggingSelection)
    ) {
      i.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = i.type === "touchstart" || i.type === "touchmove";
    const a = e === 0 && s === 0;
    if (
      this.options.syncTouch &&
      o &&
      i.type === "touchstart" &&
      a &&
      !this.isStopped &&
      !this.isLocked
    ) {
      this.reset();
      return;
    }
    const u =
      (this.options.gestureOrientation === "vertical" && s === 0) ||
      (this.options.gestureOrientation === "horizontal" && e === 0);
    if (a || u) return;
    let d = i.composedPath();
    d = d.slice(0, d.indexOf(this.rootElement));
    const p = this.options.prevent,
      c = Math.abs(e) >= Math.abs(s) ? "horizontal" : "vertical";
    if (
      d.find(
        (l) =>
          l instanceof HTMLElement &&
          ((typeof p == "function" && p?.(l)) ||
            l.hasAttribute?.("data-lenis-prevent") ||
            (c === "vertical" &&
              l.hasAttribute?.("data-lenis-prevent-vertical")) ||
            (c === "horizontal" &&
              l.hasAttribute?.("data-lenis-prevent-horizontal")) ||
            (o && l.hasAttribute?.("data-lenis-prevent-touch")) ||
            (n && l.hasAttribute?.("data-lenis-prevent-wheel")) ||
            (this.options.allowNestedScroll &&
              this.hasNestedScroll(l, { deltaX: e, deltaY: s })))
      )
    )
      return;
    if (this.isStopped || this.isLocked) {
      i.cancelable && i.preventDefault();
      return;
    }
    if (!((this.options.syncTouch && o) || (this.options.smoothWheel && n))) {
      (this.isScrolling = "native"),
        this.animate.stop(),
        (i.lenisStopPropagation = !0);
      return;
    }
    let h = s;
    this.options.gestureOrientation === "both"
      ? (h = Math.abs(s) > Math.abs(e) ? s : e)
      : this.options.gestureOrientation === "horizontal" && (h = e),
      (!this.options.overscroll ||
        this.options.infinite ||
        (this.options.wrapper !== window &&
          this.limit > 0 &&
          ((this.animatedScroll > 0 && this.animatedScroll < this.limit) ||
            (this.animatedScroll === 0 && s > 0) ||
            (this.animatedScroll === this.limit && s < 0)))) &&
        (i.lenisStopPropagation = !0),
      i.cancelable && i.preventDefault();
    const r = o && this.options.syncTouch,
      f = o && i.type === "touchend";
    f &&
      (h =
        Math.sign(h) *
        Math.abs(this.velocity) ** this.options.touchInertiaExponent),
      this.scrollTo(this.targetScroll + h, {
        programmatic: !1,
        ...(r
          ? { lerp: f ? this.options.syncTouchLerp : 1 }
          : {
              lerp: this.options.lerp,
              duration: this.options.duration,
              easing: this.options.easing,
            }),
      });
  };
  resize() {
    this.dimensions.resize(),
      (this.animatedScroll = this.targetScroll = this.actualScroll),
      this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if (
      (this._resetVelocityTimeout !== null &&
        (clearTimeout(this._resetVelocityTimeout),
        (this._resetVelocityTimeout = null)),
      this._preventNextNativeScrollEvent)
    ) {
      this._preventNextNativeScrollEvent = !1;
      return;
    }
    if (this.isScrolling === !1 || this.isScrolling === "native") {
      const t = this.animatedScroll;
      (this.animatedScroll = this.targetScroll = this.actualScroll),
        (this.lastVelocity = this.velocity),
        (this.velocity = this.animatedScroll - t),
        (this.direction = Math.sign(this.animatedScroll - t)),
        this.isStopped || (this.isScrolling = "native"),
        this.emit(),
        this.velocity !== 0 &&
          (this._resetVelocityTimeout = setTimeout(() => {
            (this.lastVelocity = this.velocity),
              (this.velocity = 0),
              (this.isScrolling = !1),
              this.emit();
          }, 400));
    }
  };
  reset() {
    (this.isLocked = !1),
      (this.isScrolling = !1),
      (this.animatedScroll = this.targetScroll = this.actualScroll),
      (this.lastVelocity = this.velocity = 0),
      this.animate.stop();
  }
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), (this.isStopped = !1), this.emit());
  }
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), (this.isStopped = !0), this.emit());
  }
  raf = (t) => {
    const e = t - (this.time || t);
    (this.time = t),
      this.animate.advance(e * 0.001),
      this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  };
  scrollTo(
    t,
    {
      offset: e = 0,
      immediate: s = !1,
      lock: i = !1,
      programmatic: o = !0,
      lerp: n = o ? this.options.lerp : void 0,
      duration: a = o ? this.options.duration : void 0,
      easing: u = o ? this.options.easing : void 0,
      onStart: d,
      onComplete: p,
      force: c = !1,
      userData: h,
    } = {}
  ) {
    if ((this.isStopped || this.isLocked) && !c) return;
    let r = t,
      f = e;
    if (typeof r == "string" && ["top", "left", "start", "#"].includes(r))
      r = 0;
    else if (typeof r == "string" && ["bottom", "right", "end"].includes(r))
      r = this.limit;
    else {
      let l = null;
      if (
        (typeof r == "string"
          ? ((l = r.startsWith("#")
              ? document.getElementById(r.slice(1))
              : document.querySelector(r)),
            l ||
              (r === "#top"
                ? (r = 0)
                : console.warn("Lenis: Target not found", r)))
          : r instanceof HTMLElement && r?.nodeType && (l = r),
        l)
      ) {
        if (this.options.wrapper !== window) {
          const y = this.rootElement.getBoundingClientRect();
          f -= this.isHorizontal ? y.left : y.top;
        }
        const m = l.getBoundingClientRect(),
          v = getComputedStyle(l),
          g = this.isHorizontal
            ? Number.parseFloat(v.scrollMarginLeft)
            : Number.parseFloat(v.scrollMarginTop),
          S = getComputedStyle(this.rootElement),
          w = this.isHorizontal
            ? Number.parseFloat(S.scrollPaddingLeft)
            : Number.parseFloat(S.scrollPaddingTop);
        r =
          (this.isHorizontal ? m.left : m.top) +
          this.animatedScroll -
          (Number.isNaN(g) ? 0 : g) -
          (Number.isNaN(w) ? 0 : w);
      }
    }
    if (typeof r == "number") {
      if (((r += f), this.options.infinite)) {
        if (o) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const l = r - this.animatedScroll;
          l > this.limit / 2
            ? (r -= this.limit)
            : l < -this.limit / 2 && (r += this.limit);
        }
      } else r = Y(0, r, this.limit);
      if (r === this.targetScroll) {
        d?.(this), p?.(this);
        return;
      }
      if (((this.userData = h ?? {}), s)) {
        (this.animatedScroll = this.targetScroll = r),
          this.setScroll(this.scroll),
          this.reset(),
          this.preventNextNativeScrollEvent(),
          this.emit(),
          p?.(this),
          (this.userData = {}),
          requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          });
        return;
      }
      o || (this.targetScroll = r),
        typeof a == "number" && typeof u != "function"
          ? (u = k)
          : typeof u == "function" && typeof a != "number" && (a = 1),
        this.animate.fromTo(this.animatedScroll, r, {
          duration: a,
          easing: u,
          lerp: n,
          onStart: () => {
            i && (this.isLocked = !0), (this.isScrolling = "smooth"), d?.(this);
          },
          onUpdate: (l, m) => {
            (this.isScrolling = "smooth"),
              (this.lastVelocity = this.velocity),
              (this.velocity = l - this.animatedScroll),
              (this.direction = Math.sign(this.velocity)),
              (this.animatedScroll = l),
              this.setScroll(this.scroll),
              o && (this.targetScroll = l),
              m || this.emit(),
              m &&
                (this.reset(),
                this.emit(),
                p?.(this),
                (this.userData = {}),
                requestAnimationFrame(() => {
                  this.dispatchScrollendEvent();
                }),
                this.preventNextNativeScrollEvent());
          },
        });
    }
  }
  preventNextNativeScrollEvent() {
    (this._preventNextNativeScrollEvent = !0),
      requestAnimationFrame(() => {
        this._preventNextNativeScrollEvent = !1;
      });
  }
  hasNestedScroll(t, { deltaX: e, deltaY: s }) {
    const i = Date.now();
    t._lenis || (t._lenis = {});
    const o = t._lenis;
    let n, a, u, d, p, c, h, r, f, l;
    if (i - (o.time ?? 0) > 2e3) {
      o.time = Date.now();
      const M = window.getComputedStyle(t);
      if (
        ((o.computedStyle = M),
        (n = ["auto", "overlay", "scroll"].includes(M.overflowX)),
        (a = ["auto", "overlay", "scroll"].includes(M.overflowY)),
        (p = ["auto"].includes(M.overscrollBehaviorX)),
        (c = ["auto"].includes(M.overscrollBehaviorY)),
        (o.hasOverflowX = n),
        (o.hasOverflowY = a),
        !(n || a))
      )
        return !1;
      (h = t.scrollWidth),
        (r = t.scrollHeight),
        (f = t.clientWidth),
        (l = t.clientHeight),
        (u = h > f),
        (d = r > l),
        (o.isScrollableX = u),
        (o.isScrollableY = d),
        (o.scrollWidth = h),
        (o.scrollHeight = r),
        (o.clientWidth = f),
        (o.clientHeight = l),
        (o.hasOverscrollBehaviorX = p),
        (o.hasOverscrollBehaviorY = c);
    } else
      (u = o.isScrollableX),
        (d = o.isScrollableY),
        (n = o.hasOverflowX),
        (a = o.hasOverflowY),
        (h = o.scrollWidth),
        (r = o.scrollHeight),
        (f = o.clientWidth),
        (l = o.clientHeight),
        (p = o.hasOverscrollBehaviorX),
        (c = o.hasOverscrollBehaviorY);
    if (!((n && u) || (a && d))) return !1;
    const m = Math.abs(e) >= Math.abs(s) ? "horizontal" : "vertical";
    let v, g, S, w, y, z;
    if (m === "horizontal")
      (v = Math.round(t.scrollLeft)),
        (g = h - f),
        (S = e),
        (w = n),
        (y = u),
        (z = p);
    else if (m === "vertical")
      (v = Math.round(t.scrollTop)),
        (g = r - l),
        (S = s),
        (w = a),
        (y = d),
        (z = c);
    else return !1;
    return !z && (v >= g || v <= 0) ? !0 : (S > 0 ? v < g : v > 0) && w && y;
  }
  get rootElement() {
    return this.options.wrapper === window
      ? document.documentElement
      : this.options.wrapper;
  }
  get limit() {
    return this.options.naiveDimensions
      ? this.isHorizontal
        ? this.rootElement.scrollWidth - this.rootElement.clientWidth
        : this.rootElement.scrollHeight - this.rootElement.clientHeight
      : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  get actualScroll() {
    const t = this.options.wrapper;
    return this.isHorizontal
      ? t.scrollX ?? t.scrollLeft
      : t.scrollY ?? t.scrollTop;
  }
  get scroll() {
    return this.options.infinite
      ? K(this.animatedScroll, this.limit)
      : this.animatedScroll;
  }
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(t) {
    this._isScrolling !== t &&
      ((this._isScrolling = t), this.updateClassName());
  }
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(t) {
    this._isStopped !== t && ((this._isStopped = t), this.updateClassName());
  }
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(t) {
    this._isLocked !== t && ((this._isLocked = t), this.updateClassName());
  }
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  get className() {
    let t = "lenis";
    return (
      this.options.autoToggle && (t += " lenis-autoToggle"),
      this.isStopped && (t += " lenis-stopped"),
      this.isLocked && (t += " lenis-locked"),
      this.isScrolling && (t += " lenis-scrolling"),
      this.isScrolling === "smooth" && (t += " lenis-smooth"),
      t
    );
  }
  updateClassName() {
    this.cleanUpClassName(),
      this.className.split(" ").forEach((t) => {
        this.rootElement.classList.add(t);
      });
  }
  cleanUpClassName() {
    for (const t of Array.from(this.rootElement.classList))
      (t === "lenis" || t.startsWith("lenis-")) &&
        this.rootElement.classList.remove(t);
  }
};
b.registerPlugin(W);
let N = null;
const U = (t) => {
    N?.raf(t * 1e3);
  },
  it = () => {
    b.ticker.remove(U), N?.destroy(), (N = null);
  },
  lt = () => {
    it();
    const t = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (N = new et({
      smoothWheel: !0,
      lerp: t ? 1 : 0.1,
      stopInertiaOnNavigate: !0,
    })),
      N.on("scroll", W.update),
      b.ticker.add(U),
      b.ticker.lagSmoothing(0);
  };
b.registerPlugin(W);
const T =
    window.innerWidth < 768
      ? Math.round((devicePixelRatio * 4) / 3) / devicePixelRatio
      : 2,
  R = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((t) => t / 16),
  L = 4278979339,
  H = 4294507515,
  O = (t) => {
    const e = parseInt(t.slice(1), 16);
    return 4278190080 | ((e & 255) << 16) | (e & 65280) | (e >> 16);
  },
  D = O("#dadad5"),
  A = O("#a9a9a3"),
  x = (t) => {
    const e = Math.ceil(t.offsetWidth / T),
      s = Math.ceil(t.offsetHeight / T),
      i = document.createElement("canvas");
    (i.width = e),
      (i.height = s),
      (i.className =
        "pointer-events-none absolute top-0 left-0 z-10 [image-rendering:pixelated]"),
      (i.style.width = `${e * T}px`),
      (i.style.height = `${s * T}px`),
      t.append(i);
    const o = i.getContext("2d");
    return {
      canvas: i,
      context: o,
      pixels: o.createImageData(e, s),
      noise: Float32Array.from({ length: e * s }, Math.random),
      columns: e,
      rows: s,
    };
  },
  st = (t, e, s, i = t) => {
    const o = document.createElement("canvas");
    (o.width = e), (o.height = s);
    const n = o.getContext("2d", { willReadFrequently: !0 });
    n.imageSmoothingQuality = "high";
    const a = Math.max(e / t.naturalWidth, s / t.naturalHeight),
      u = t.naturalWidth * a,
      d = t.naturalHeight * a,
      [p, c] = getComputedStyle(i).objectPosition.split(" ").map(parseFloat);
    return (
      n.drawImage(t, ((e - u) * p) / 100, ((s - d) * c) / 100, u, d),
      n.getImageData(0, 0, e, s).data
    );
  },
  _ = (t, e, s, i) => {
    const o = st(t, e, s, i);
    return Float32Array.from(
      { length: e * s },
      (n, a) =>
        (o[a * 4] * 0.2126 + o[a * 4 + 1] * 0.7152 + o[a * 4 + 2] * 0.0722) /
        255
    );
  },
  F = (
    { context: t, pixels: e, noise: s, columns: i, rows: o },
    n,
    a,
    u,
    d,
    p = H
  ) => {
    const c = new Uint32Array(e.data.buffer);
    for (let h = 0; h < o; h++)
      for (let r = 0; r < i; r++) {
        const f = h * i + r,
          l = R[(h % 4) * 4 + (r % 4)],
          m = (s[f] + h / o) / 2;
        c[f] = m < d ? 0 : m < u ? (n[f] > l ? p : L) : m < a ? L : 0;
      }
    t.putImageData(e, 0, 0);
  },
  ot = ({ context: t, pixels: e, noise: s, columns: i, rows: o }, n, a, u) => {
    const d = new Uint32Array(e.data.buffer),
      [p, c, h] =
        window.innerWidth >= 768
          ? [0.7 * window.innerWidth, 0.4 * window.innerHeight, 1.4]
          : [0.3 * window.innerHeight, 0.3 * window.innerHeight, 1.7],
      r = (a.left - window.innerWidth / 2) / p,
      f = (a.top - window.innerHeight / 2) / c;
    for (let l = 0; l < o; l++) {
      const m = f + (l * T) / c;
      for (let v = 0; v < i; v++) {
        const g = l * i + v,
          S = r + (v * T) / p,
          w = Math.sqrt(S * S + m * m);
        d[g] = w > u * (1 + s[g] * (h - 1)) ? n[g] : 0;
      }
    }
    t.putImageData(e, 0, 0);
  },
  at = (
    { context: t, pixels: e, noise: s, columns: i, rows: o },
    n,
    a,
    u,
    d
  ) => {
    const p = new Uint32Array(e.data.buffer);
    for (let c = 0; c < o; c++)
      for (let h = 0; h < i; h++) {
        const r = c * i + h,
          f = R[(c % 4) * 4 + (h % 4)];
        if (n[r] > s[r]) {
          const l = r - 2 * i - 2;
          p[r] = c > 1 && h > 1 && n[l] <= s[l] && (c + h) % 2 ? L : 0;
        } else if (a[r * 4 + 3] > 127) p[r] = L;
        else {
          const l = (h / i + c / o) / 2,
            m = Math.max(0, 0.3 - Math.abs(l - u) * 3);
          p[r] = 0.85 - l / 2 + m <= f ? A : m > f ? H : D;
        }
      }
    for (const { x: c, y: h, size: r, spin: f } of d) {
      const l = Math.max(1, Math.round(r * Math.abs(Math.cos(f)))),
        m = Math.round(c - l / 2),
        v = Math.round(h - r / 2),
        [g, S] = Math.cos(f) > 0 ? [H, D] : [A, L];
      for (let w = Math.max(0, v); w < Math.min(o, v + r); w++)
        for (let y = Math.max(0, m); y < Math.min(i, m + l); y++)
          p[w * i + y] = R[(w % 4) * 4 + (y % 4)] < 0.5 ? g : S;
    }
    t.putImageData(e, 0, 0);
  },
  ht = ({ noise: t, columns: e, rows: s }, i, o, n, a) => {
    let u = 0;
    for (let d = Math.max(0, Math.floor(n - a)); d < Math.min(s, n + a); d++)
      for (
        let p = Math.max(0, Math.floor(o - a));
        p < Math.min(e, o + a);
        p++
      ) {
        const c = d * e + p,
          h = 2 - (2 * ((p - o) ** 2 + (d - n) ** 2)) / a ** 2;
        h <= i[c] || (i[c] <= t[c] && h > t[c] && u++, (i[c] = h));
      }
    return u;
  },
  P = new WeakMap(),
  ct = (t, e, s, i, o) => {
    let n = P.get(t);
    n?.target.columns !== Math.ceil(t.offsetWidth / T) &&
      (n?.target.canvas.remove(),
      (n = { target: x(t), lights: new Map() }),
      P.set(t, n)),
      !n.lights.has(e) &&
        e.naturalWidth &&
        n.lights.set(e, _(e, n.target.columns, n.target.rows)),
      F(
        n.target,
        n.lights.get(e) ?? new Float32Array(n.target.columns * n.target.rows),
        s,
        i,
        o
      );
  },
  dt = () => {
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.querySelectorAll("[data-dither]").forEach((t) => {
        if (
          !t.offsetWidth ||
          t.style.viewTransitionName ||
          t.matches("a [data-cover]")
        )
          return;
        const e = t.querySelector("img, video"),
          s =
            e instanceof HTMLVideoElement
              ? Object.assign(new Image(), { src: e.poster })
              : e;
        (e.style.opacity = "0"),
          W.create({
            trigger: t,
            start: "top 88%",
            once: !0,
            onEnter: () =>
              s.decode().then(() => {
                const i = x(t),
                  o = _(s, i.columns, i.rows, e),
                  n = { develop: 0, resolve: 0 },
                  a = () => F(i, o, 0, n.develop, n.resolve);
                b.timeline({
                  delay: Number(t.dataset.dither) || 0,
                  onComplete: () => i.canvas.remove(),
                })
                  .to(n, {
                    develop: 1,
                    duration: 0.6,
                    ease: "power1.in",
                    onUpdate: a,
                  })
                  .call(() => {
                    e.style.removeProperty("opacity");
                  })
                  .to(n, {
                    resolve: 1,
                    duration: 0.7,
                    ease: "power1.out",
                    onUpdate: a,
                  });
              }),
          });
      });
  },
  pt = () => {
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.querySelectorAll("a [data-cover]").forEach((t) => {
        const e = t.closest("a"),
          s = t.querySelector("img"),
          i = t.style.viewTransitionName !== "";
        i || (s.style.opacity = "0");
        const o = () => {
          const n = x(t);
          n.canvas.classList.add(
            "transition-transform",
            "duration-700",
            "ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover:scale-[1.04]",
            "in-data-active:scale-[1.04]",
            "size-full!"
          );
          const a = O(t.dataset.tint),
            u = Uint32Array.from(_(s, n.columns, n.rows), (h, r) =>
              h > R[(Math.floor(r / n.columns) % 4) * 4 + ((r % n.columns) % 4)]
                ? a
                : L
            ),
            d = { open: i ? 2 : 1 },
            p = () => ot(n, u, t.getBoundingClientRect(), d.open),
            c = (h) =>
              b.to(d, {
                open: h ? 2 : 1,
                duration: 0.5,
                ease: "power1.out",
                overwrite: "auto",
                onUpdate: p,
              });
          b.delayedCall(i ? 1 : 0, () => {
            p(),
              s.style.removeProperty("opacity"),
              c(!1),
              e.addEventListener("focus", () => c(!0)),
              e.addEventListener("blur", () => c(!1)),
              e.addEventListener("click", () => c(!0)),
              W.create({
                trigger: t,
                start: "top bottom",
                end: "bottom top",
                onUpdate: p,
              });
          });
        };
        s.complete ? o() : s.addEventListener("load", o, { once: !0 });
      });
  };
export {
  lt as a,
  pt as b,
  ct as c,
  at as p,
  dt as r,
  x as s,
  it as t,
  ht as w,
};
