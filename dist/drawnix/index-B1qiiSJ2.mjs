import { jsx as a, jsxs as k, Fragment as be } from "react/jsx-runtime";
import { useBoard as J, useListRender as Qo, Wrapper as di, Board as fi } from "@plait-board/react-board";
import { getSelectedElements as Te, getHitElementByPoint as hi, toViewBoxPoint as ft, toHostPoint as ht, isSelectionMoving as mi, isDragging as Cr, toImage as ea, IS_APPLE as gi, IS_MAC as ta, ThemeColorMode as ze, DEFAULT_COLOR as Ut, BoardTransforms as te, PlaitBoard as F, PlaitPointerType as Ce, ATTACHED_ELEMENT_CLASS_NAME as Ne, toFixed as ra, isNullOrUndefined as Ir, MERGING as tn, PlaitHistoryBoard as na, Transforms as Fe, getRectangleByElements as ia, RectangleClient as tt, toScreenPointFromHostPoint as rn, toHostPointFromViewBoxPoint as nn, isMovingElements as br, duplicateElements as oa, deleteFragment as aa, rotateAntiPointsByElement as sa, isPointInPolygon as la, idCreator as ca, setStrokeLinecap as ua, ACTIVE_STROKE_WIDTH as da, distanceBetweenPointAndPoint as pi, addOrCreateClipboardContext as fa, WritableClipboardType as ha, throttleRAF as vi, PlaitElement as ma, CoreTransforms as ga, isPencilEvent as on, IS_IOS as pa, getViewportOrigination as wi, PlaitGroupElement as va, WritableClipboardOperationType as yi } from "@plait/core";
import * as U from "react";
import Ue, { forwardRef as Ci, useState as M, useRef as Oe, useEffect as ne, createContext as Fr, useMemo as wa, useContext as bt, useCallback as an, Component as ya, useDeferredValue as bi } from "react";
import { getElementOfFocusedImage as ki, isResizing as xi, setCreationMode as he, BoardCreationMode as me, PropertyTransforms as ot, StrokeStyle as Xt, getFirstTextEditor as Ca, Generator as ba, CommonElementFlavour as ka, createActiveGenerator as xa, hasResizeHandle as Ea, isDrawingMode as Ei, buildClipboardData as Oa, insertClipboardData as Sa, withGroup as Oi } from "@plait/common";
import { DrawTransforms as Pa, BasicShapes as ce, FlowchartSymbols as Si, ArrowLineShape as We, PlaitDrawElement as X, isClosedDrawElement as Pi, isClosedCustomGeometry as Nr, getFillByElement as La, getStrokeColorByElement as Li, getMemorizeKey as kt, isDrawElementsIncludeText as Ta, isRectangleHitRotatedPoints as Ma, isClosedPoints as Da, isHitPolyLine as sn, DefaultDrawStyle as _a, getStrokeWidthByElement as Ia, getHitDrawElement as Fa, WithDrawPluginKey as Na, withDraw as Ti } from "@plait/draw";
import { WithMindPluginKey as Ra, MindElement as se, MindTransforms as ln, isHitImage as Aa, MindPointerType as kr, getFillByElement as Ba, getStrokeColorByElement as Mi, withMind as Di, MindThemeColors as _i } from "@plait/mind";
import za from "mobile-detect";
import ja from "react-dom";
import T from "classnames";
import { useMergeRefs as Wt, FloatingPortal as Ii, FloatingFocusManager as Fi, useFloating as Kt, offset as Rr, flip as Ar, shift as Ha, autoUpdate as Ua, useClick as Ni, useDismiss as Ri, useRole as Ai, useInteractions as Bi, FloatingOverlay as Wa, useId as zi } from "@floating-ui/react";
import { getTextMarksByElement as Br, TextTransforms as xr, LinkEditor as Je } from "@plait/text-plugins";
import { throttle as Ka } from "lodash";
var Lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ye = {}, cn;
function qa() {
  if (cn) return Ye;
  cn = 1;
  var e = ja;
  if (process.env.NODE_ENV === "production")
    Ye.createRoot = e.createRoot, Ye.hydrateRoot = e.hydrateRoot;
  else {
    var t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Ye.createRoot = function(r, n) {
      t.usingClientEntryPoint = !0;
      try {
        return e.createRoot(r, n);
      } finally {
        t.usingClientEntryPoint = !1;
      }
    }, Ye.hydrateRoot = function(r, n, i) {
      t.usingClientEntryPoint = !0;
      try {
        return e.hydrateRoot(r, n, i);
      } finally {
        t.usingClientEntryPoint = !1;
      }
    };
  }
  return Ye;
}
var ji = qa();
const un = (e) => /* @__PURE__ */ a(
  "span",
  {
    className: "mind-node-emoji",
    style: { fontSize: `${e.fontSize}px` },
    children: e.emojiItem.name
  }
), $a = (e) => {
  const t = e;
  return e.setPluginOptions(
    Ra,
    {
      emojiPadding: 0,
      spaceBetweenEmojis: 4
    }
  ), t.renderEmoji = (r, n) => {
    const i = document.createElement("span");
    r.appendChild(i);
    const o = ji.createRoot(i);
    o.render(/* @__PURE__ */ a(un, { ...n }));
    let s = { ...n };
    return {
      destroy: () => {
        setTimeout(() => {
          o.unmount();
        }, 0);
      },
      update: (c) => {
        s = { ...s, ...c }, o.render(/* @__PURE__ */ a(un, { ...s }));
      }
    };
  }, t;
}, dn = (e) => {
  const t = {
    src: e.imageItem.url,
    draggable: !1,
    width: "100%"
  };
  return /* @__PURE__ */ a("div", { children: /* @__PURE__ */ a(
    "img",
    {
      ...t,
      className: T("image-origin", {
        "image-origin--focus": e.isFocus
      })
    }
  ) });
};
var rt = /* @__PURE__ */ ((e) => (e.COPY = "copy", e.PASTE = "paste", e.CUT = "cut", e.KEYDOWN = "keydown", e.KEYUP = "keyup", e.MOUSE_MOVE = "mousemove", e.RESIZE = "resize", e.UNLOAD = "unload", e.FOCUS = "focus", e.BLUR = "blur", e.DRAG_OVER = "dragover", e.DROP = "drop", e.GESTURE_END = "gestureend", e.BEFORE_UNLOAD = "beforeunload", e.GESTURE_START = "gesturestart", e.GESTURE_CHANGE = "gesturechange", e.POINTER_MOVE = "pointermove", e.POINTER_DOWN = "pointerdown", e.POINTER_UP = "pointerup", e.STATE_CHANGE = "statechange", e.WHEEL = "wheel", e.TOUCH_START = "touchstart", e.TOUCH_END = "touchend", e.HASHCHANGE = "hashchange", e.VISIBILITY_CHANGE = "visibilitychange", e.SCROLL = "scroll", e.MENU_ITEM_SELECT = "menu.itemSelect", e.MESSAGE = "message", e.FULLSCREENCHANGE = "fullscreenchange", e))(rt || {});
const zr = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  bmp: "image/bmp",
  ico: "image/x-icon",
  avif: "image/avif",
  jfif: "image/jfif"
}, jr = {
  json: "application/json",
  drawnix: "application/vnd.drawnix+json",
  // image
  ...zr
}, Za = {
  drawnix: 1
}, Hr = (() => {
  if (typeof self > "u") return !1;
  if ("top" in self && self !== top) try {
    top.window.document._ = 0;
  } catch {
    return !1;
  }
  return "showOpenFilePicker" in self;
})(), Ga = Hr ? Promise.resolve().then(function() {
  return es;
}) : Promise.resolve().then(function() {
  return as;
});
async function Va(...e) {
  return (await Ga).default(...e);
}
Hr ? Promise.resolve().then(function() {
  return rs;
}) : Promise.resolve().then(function() {
  return ls;
});
const Ya = Hr ? Promise.resolve().then(function() {
  return is;
}) : Promise.resolve().then(function() {
  return us;
});
async function Xa(...e) {
  return (await Ya).default(...e);
}
const Ja = async (e) => {
  const t = await e.getFile();
  return t.handle = e, t;
};
var Qa = async (e = [{}]) => {
  Array.isArray(e) || (e = [e]);
  const t = [];
  e.forEach((i, o) => {
    t[o] = { description: i.description || "Files", accept: {} }, i.mimeTypes ? i.mimeTypes.map((s) => {
      t[o].accept[s] = i.extensions || [];
    }) : t[o].accept["*/*"] = i.extensions || [];
  });
  const r = await window.showOpenFilePicker({ id: e[0].id, startIn: e[0].startIn, types: t, multiple: e[0].multiple || !1, excludeAcceptAllOption: e[0].excludeAcceptAllOption || !1 }), n = await Promise.all(r.map(Ja));
  return e[0].multiple ? n : n[0];
}, es = { __proto__: null, default: Qa };
function _t(e) {
  function t(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var n = r.done;
    return Promise.resolve(r.value).then(function(i) {
      return { value: i, done: n };
    });
  }
  return _t = function(r) {
    this.s = r, this.n = r.next;
  }, _t.prototype = { s: null, n: null, next: function() {
    return t(this.n.apply(this.s, arguments));
  }, return: function(r) {
    var n = this.s.return;
    return n === void 0 ? Promise.resolve({ value: r, done: !0 }) : t(n.apply(this.s, arguments));
  }, throw: function(r) {
    var n = this.s.return;
    return n === void 0 ? Promise.reject(r) : t(n.apply(this.s, arguments));
  } }, new _t(e);
}
const Hi = async (e, t, r = e.name, n) => {
  const i = [], o = [];
  var s, l = !1, c = !1;
  try {
    for (var u, d = function(h) {
      var f, m, w, p = 2;
      for (typeof Symbol < "u" && (m = Symbol.asyncIterator, w = Symbol.iterator); p--; ) {
        if (m && (f = h[m]) != null) return f.call(h);
        if (w && (f = h[w]) != null) return new _t(f.call(h));
        m = "@@asyncIterator", w = "@@iterator";
      }
      throw new TypeError("Object is not async iterable");
    }(e.values()); l = !(u = await d.next()).done; l = !1) {
      const h = u.value, f = `${r}/${h.name}`;
      h.kind === "file" ? o.push(h.getFile().then((m) => (m.directoryHandle = e, m.handle = h, Object.defineProperty(m, "webkitRelativePath", { configurable: !0, enumerable: !0, get: () => f })))) : h.kind !== "directory" || !t || n && n(h) || i.push(Hi(h, t, f, n));
    }
  } catch (h) {
    c = !0, s = h;
  } finally {
    try {
      l && d.return != null && await d.return();
    } finally {
      if (c) throw s;
    }
  }
  return [...(await Promise.all(i)).flat(), ...await Promise.all(o)];
};
var ts = async (e = {}) => {
  e.recursive = e.recursive || !1, e.mode = e.mode || "read";
  const t = await window.showDirectoryPicker({ id: e.id, startIn: e.startIn, mode: e.mode });
  return (await (await t.values()).next()).done ? [t] : Hi(t, e.recursive, void 0, e.skipDirectory);
}, rs = { __proto__: null, default: ts }, ns = async (e, t = [{}], r = null, n = !1, i = null) => {
  Array.isArray(t) || (t = [t]), t[0].fileName = t[0].fileName || "Untitled";
  const o = [];
  let s = null;
  if (e instanceof Blob && e.type ? s = e.type : e.headers && e.headers.get("content-type") && (s = e.headers.get("content-type")), t.forEach((u, d) => {
    o[d] = { description: u.description || "Files", accept: {} }, u.mimeTypes ? (d === 0 && s && u.mimeTypes.push(s), u.mimeTypes.map((h) => {
      o[d].accept[h] = u.extensions || [];
    })) : s ? o[d].accept[s] = u.extensions || [] : o[d].accept["*/*"] = u.extensions || [];
  }), r) try {
    await r.getFile();
  } catch (u) {
    if (r = null, n) throw u;
  }
  const l = r || await window.showSaveFilePicker({ suggestedName: t[0].fileName, id: t[0].id, startIn: t[0].startIn, types: o, excludeAcceptAllOption: t[0].excludeAcceptAllOption || !1 });
  !r && i && i(l);
  const c = await l.createWritable();
  return "stream" in e ? (await e.stream().pipeTo(c), l) : "body" in e ? (await e.body.pipeTo(c), l) : (await c.write(await e), await c.close(), l);
}, is = { __proto__: null, default: ns }, os = async (e = [{}]) => (Array.isArray(e) || (e = [e]), new Promise((t, r) => {
  const n = document.createElement("input");
  n.type = "file";
  const i = [...e.map((c) => c.mimeTypes || []), ...e.map((c) => c.extensions || [])].join();
  n.multiple = e[0].multiple || !1, n.accept = i || "", n.style.display = "none", document.body.append(n);
  const o = (c) => {
    typeof s == "function" && s(), t(c);
  }, s = e[0].legacySetup && e[0].legacySetup(o, () => s(r), n), l = () => {
    window.removeEventListener("focus", l), n.remove();
  };
  n.addEventListener("click", () => {
    window.addEventListener("focus", l);
  }), n.addEventListener("change", () => {
    window.removeEventListener("focus", l), n.remove(), o(n.multiple ? Array.from(n.files) : n.files[0]);
  }), "showPicker" in HTMLInputElement.prototype ? n.showPicker() : n.click();
})), as = { __proto__: null, default: os }, ss = async (e = [{}]) => (Array.isArray(e) || (e = [e]), e[0].recursive = e[0].recursive || !1, new Promise((t, r) => {
  const n = document.createElement("input");
  n.type = "file", n.webkitdirectory = !0;
  const i = (s) => {
    typeof o == "function" && o(), t(s);
  }, o = e[0].legacySetup && e[0].legacySetup(i, () => o(r), n);
  n.addEventListener("change", () => {
    let s = Array.from(n.files);
    e[0].recursive ? e[0].recursive && e[0].skipDirectory && (s = s.filter((l) => l.webkitRelativePath.split("/").every((c) => !e[0].skipDirectory({ name: c, kind: "directory" })))) : s = s.filter((l) => l.webkitRelativePath.split("/").length === 2), i(s);
  }), "showPicker" in HTMLInputElement.prototype ? n.showPicker() : n.click();
})), ls = { __proto__: null, default: ss }, cs = async (e, t = {}) => {
  Array.isArray(t) && (t = t[0]);
  const r = document.createElement("a");
  let n = e;
  "body" in e && (n = await async function(s, l) {
    const c = s.getReader(), u = new ReadableStream({ start: (f) => async function m() {
      return c.read().then(({ done: w, value: p }) => {
        if (!w) return f.enqueue(p), m();
        f.close();
      });
    }() }), d = new Response(u), h = await d.blob();
    return c.releaseLock(), new Blob([h], { type: l });
  }(e.body, e.headers.get("content-type"))), r.download = t.fileName || "Untitled", r.href = URL.createObjectURL(await n);
  const i = () => {
    typeof o == "function" && o();
  }, o = t.legacySetup && t.legacySetup(i, () => o(), r);
  return r.addEventListener("click", () => {
    setTimeout(() => URL.revokeObjectURL(r.href), 3e4), i();
  }), r.click(), null;
}, us = { __proto__: null, default: cs };
const Ui = (e) => {
  var n, i;
  const t = (n = e.extensions) == null ? void 0 : n.reduce((o, s) => (o.push(jr[s]), o), []), r = (i = e.extensions) == null ? void 0 : i.reduce((o, s) => s === "jpg" ? o.concat(".jpg", ".jpeg") : o.concat(`.${s}`), []);
  return Va({
    description: e.description,
    extensions: r,
    mimeTypes: t,
    multiple: e.multiple ?? !1
  });
}, ds = (e, t) => Xa(
  e,
  {
    fileName: `${t.name}.${t.extension}`,
    description: t.description,
    extensions: [`.${t.extension}`]
  },
  t.fileHandle
);
var Ur = /* @__PURE__ */ ((e) => (e.drawnix = "drawnix", e))(Ur || {});
const fs = () => (/* @__PURE__ */ new Date()).getTime().toString(), Wi = async (e, t = fs()) => {
  const r = gs(e), n = new Blob([r], {
    type: jr.drawnix
  });
  return { fileHandle: await ds(n, {
    name: t,
    extension: "drawnix",
    description: "Drawnix file"
  }) };
}, hs = async (e) => {
  const t = await Ui({
    description: "Drawnix files"
    // ToDo: Be over-permissive until https://bugs.webkit.org/show_bug.cgi?id=34442
    // gets resolved. Else, iOS users cannot open `.drawnix` files.
    // extensions: ["json", "drawnix", "png", "svg"],
  });
  return ps(e, await ys(t));
}, ms = (e) => e && e.type === Ur.drawnix && Array.isArray(e.elements) && typeof e.viewport == "object", gs = (e) => {
  const t = {
    type: Ur.drawnix,
    version: Za.drawnix,
    source: "web",
    elements: e.children,
    viewport: e.viewport
  };
  return JSON.stringify(t, null, 2);
}, ps = async (e, t) => {
  const r = await Cs(t);
  let n;
  try {
    if (n = JSON.parse(r), ms(n))
      return n;
    throw new Error("Error: invalid file");
  } catch {
    throw new Error("Error: invalid file");
  }
}, vs = (e, t, r) => new File([e], r || "", {
  type: t
}), ws = (e) => "arrayBuffer" in e ? e.arrayBuffer() : new Promise((t, r) => {
  const n = new FileReader();
  n.onload = (i) => {
    var o;
    if (!((o = i.target) != null && o.result))
      return r(new Error("Couldn't convert blob to ArrayBuffer"));
    t(i.target.result);
  }, n.readAsArrayBuffer(e);
}), ys = async (e) => {
  var t;
  return e.type || (t = e == null ? void 0 : e.name) != null && t.endsWith(".drawnix") && (e = vs(
    await ws(e),
    jr.drawnix,
    e.name
  )), e;
}, Cs = async (e) => {
  let t;
  return "text" in Blob ? t = await e.text() : t = await new Promise((r) => {
    const n = new FileReader();
    n.readAsText(e, "utf8"), n.onloadend = () => {
      n.readyState === FileReader.DONE && r(n.result);
    };
  }), t;
}, bs = async (e) => new Promise((t, r) => {
  const n = new FileReader();
  n.onload = () => {
    const i = n.result;
    t(i);
  }, n.onerror = (i) => r(i), n.readAsDataURL(e);
}), fn = (e) => !!e && Object.values(zr).includes(e), ks = (e) => new Promise((t, r) => {
  const n = new Image();
  n.onload = () => {
    t(n);
  }, n.onerror = (i) => {
    r(i);
  }, n.src = e;
}), xs = (e, t, r) => {
  const n = e.width > r ? r : e.width, i = n / e.width * e.height;
  return {
    url: t,
    width: n,
    height: i
  };
}, Nt = async (e, t, r, n) => {
  const i = Te(e)[0] || ki(e), o = i ? 240 : 400, s = await bs(t), l = await ks(s), c = xs(l, s, o), u = r && hi(e, r);
  if (n && u && se.isMindElement(e, u)) {
    ln.setImage(e, u, c);
    return;
  }
  i && se.isMindElement(e, i) && !n ? ln.setImage(e, i, c) : Pa.insertImage(e, c, r);
};
class Es {
  constructor(t = {}) {
    this.overlay = null, this.imageContainer = null, this.image = null, this.closeButton = null, this.controlsContainer = null, this.delegationHandler = null, this.dragHandler = null, this.mouseUpHandler = null, this.animationFrameId = null, this.pendingUpdate = !1, this.state = {
      zoom: 1,
      x: 0,
      y: 0,
      isDragging: !1,
      dragStartX: 0,
      dragStartY: 0,
      imageStartX: 0,
      imageStartY: 0
    }, this.styleElement = null, this.options = {
      zoomStep: t.zoomStep || 0.2,
      minZoom: t.minZoom || 0.1,
      maxZoom: t.maxZoom || 5,
      enableKeyboard: t.enableKeyboard !== !1
    }, this.addStyles(), this.bindEvents();
  }
  // 打开图片查看器
  open(t, r = "") {
    this.createOverlay(), this.createImage(t, r), this.resetState(), document.body.style.overflow = "hidden";
  }
  // 关闭图片查看器
  close() {
    this.overlay && (this.cleanupDragEvents(), document.removeEventListener("mousemove", this.delegationHandler), document.removeEventListener("mouseup", this.delegationHandler), document.removeEventListener("keydown", this.delegationHandler), document.removeEventListener("wheel", this.delegationHandler), this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), document.body.removeChild(this.overlay), this.overlay = null, this.image = null, this.imageContainer = null, this.closeButton = null, this.controlsContainer = null, this.delegationHandler = null, this.dragHandler = null, this.mouseUpHandler = null, this.pendingUpdate = !1), document.body.style.overflow = "";
  }
  // 创建遮罩层
  createOverlay() {
    this.overlay = document.createElement("div"), this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(45, 45, 45, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: grab;
    `, this.overlay.addEventListener("click", (t) => {
      t.target === this.overlay && this.close();
    }), this.createCloseButton(), this.createControls(), document.body.appendChild(this.overlay);
  }
  // 创建关闭按钮
  createCloseButton() {
    this.closeButton = document.createElement("div"), this.closeButton.innerHTML = "×", this.closeButton.className = "image-viewer-close-btn", this.closeButton.addEventListener("click", () => this.close()), this.overlay.appendChild(this.closeButton);
  }
  // 创建控制按钮
  createControls() {
    this.controlsContainer = document.createElement("div"), this.controlsContainer.style.cssText = `
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10001;
    `, this.addStyles();
    const t = document.createElement("button");
    t.innerHTML = "+", t.className = "image-viewer-control-btn", t.addEventListener("click", () => this.zoomIn());
    const r = document.createElement("button");
    r.innerHTML = "-", r.className = "image-viewer-control-btn", r.addEventListener("click", () => this.zoomOut());
    const n = document.createElement("button");
    n.innerHTML = "⌂", n.className = "image-viewer-control-btn", n.addEventListener("click", () => this.resetState()), this.controlsContainer.appendChild(r), this.controlsContainer.appendChild(n), this.controlsContainer.appendChild(t), this.overlay.appendChild(this.controlsContainer);
  }
  // 创建图片元素
  createImage(t, r) {
    this.imageContainer = document.createElement("div"), this.imageContainer.style.cssText = `
      position: relative;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: calc(100vw - 80px);
      max-height: calc(100vh - 160px);
    `, this.image = document.createElement("img"), this.image.src = t, this.image.alt = r, this.image.style.cssText = `
      max-width: calc(100vw - 80px);
      max-height: calc(100vh - 160px);
      width: auto;
      height: auto;
      display: block;
      user-select: none;
      pointer-events: none;
      object-fit: contain;
    `, this.imageContainer.appendChild(this.image), this.overlay.appendChild(this.imageContainer), this.bindDragEvents();
  }
  // 绑定拖拽事件
  bindDragEvents() {
    this.imageContainer && (this.dragHandler = (t) => {
      if (!this.state.isDragging) return;
      const r = t.clientX - this.state.dragStartX, n = t.clientY - this.state.dragStartY;
      this.state.x = this.state.imageStartX + r, this.state.y = this.state.imageStartY + n, this.pendingUpdate || (this.pendingUpdate = !0, this.animationFrameId = requestAnimationFrame(() => {
        this.updateImageTransform(), this.pendingUpdate = !1;
      }));
    }, this.mouseUpHandler = () => {
      this.state.isDragging && (this.state.isDragging = !1, this.imageContainer && (this.imageContainer.style.cursor = "grab"), this.overlay && (this.overlay.style.cursor = "grab"), this.cleanupDragEvents());
    }, this.imageContainer.addEventListener("mousedown", (t) => {
      t.preventDefault(), this.state.isDragging = !0, this.state.dragStartX = t.clientX, this.state.dragStartY = t.clientY, this.state.imageStartX = this.state.x, this.state.imageStartY = this.state.y, this.imageContainer && (this.imageContainer.style.cursor = "grabbing"), this.overlay && (this.overlay.style.cursor = "grabbing"), this.dragHandler && this.mouseUpHandler && (document.addEventListener("mousemove", this.dragHandler, { passive: !0 }), document.addEventListener("mouseup", this.mouseUpHandler, { once: !0 }));
    }));
  }
  // 清理拖动事件监听器
  cleanupDragEvents() {
    this.dragHandler && document.removeEventListener("mousemove", this.dragHandler), this.mouseUpHandler && document.removeEventListener("mouseup", this.mouseUpHandler);
  }
  // 绑定全局事件
  bindEvents() {
    this.delegationHandler = (t) => {
      if (this.overlay) {
        if (t.type === "keydown" && this.options.enableKeyboard) {
          const r = t;
          switch (r.key) {
            case "Escape":
              this.close();
              break;
            case "+":
            case "=":
              r.preventDefault(), this.zoomIn();
              break;
            case "-":
              r.preventDefault(), this.zoomOut();
              break;
            case "0":
              r.preventDefault(), this.resetState();
              break;
          }
        } else if (t.type === "wheel") {
          const r = t;
          r.preventDefault(), r.deltaY < 0 ? this.zoomIn() : this.zoomOut();
        }
      }
    }, document.addEventListener("keydown", this.delegationHandler), document.addEventListener("wheel", this.delegationHandler, {
      passive: !1
    });
  }
  // 放大
  zoomIn() {
    this.state.zoom = Math.min(
      this.state.zoom + this.options.zoomStep,
      this.options.maxZoom
    ), this.updateImageTransform();
  }
  // 缩小
  zoomOut() {
    this.state.zoom = Math.max(
      this.state.zoom - this.options.zoomStep,
      this.options.minZoom
    ), this.updateImageTransform();
  }
  // 重置状态
  resetState() {
    this.state.zoom = 1, this.state.x = 0, this.state.y = 0, this.updateImageTransform();
  }
  // 更新图片变换
  updateImageTransform() {
    this.imageContainer && (this.imageContainer.style.transform = `
      translate(${this.state.x}px, ${this.state.y}px) 
      scale(${this.state.zoom})
    `);
  }
  // 添加样式
  addStyles() {
    this.styleElement || (this.styleElement = document.createElement("style"), this.styleElement.textContent = `
        .image-viewer-control-btn {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.2s;
          user-select: none;
        }
        
        .image-viewer-control-btn:hover {
          background: rgba(0, 0, 0, 0.4);
        }
        
        .image-viewer-close-btn {
          position: absolute;
          top: 20px;
          right: 30px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          z-index: 10001;
          user-select: none;
          width: 36px;
          height: 34px;
          display: flex;
          border-radius: 50%;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          transition: all 0.2s ease;
          line-height: 34px;
          padding-bottom:2px;
        }
        
        .image-viewer-close-btn:hover {
          background: rgba(0, 0, 0, 0.4);
        }
      `, document.head.appendChild(this.styleElement));
  }
  // 移除样式
  removeStyles() {
    this.styleElement && (document.head.removeChild(this.styleElement), this.styleElement = null);
  }
  // 销毁实例
  destroy() {
    this.close(), this.removeStyles();
  }
}
const Os = (e) => {
  const t = e, { insertFragment: r, drop: n, pointerUp: i } = t, o = new Es({
    zoomStep: 0.3,
    minZoom: 0.1,
    maxZoom: 5,
    enableKeyboard: !0
  });
  return t.insertFragment = (s, l, c) => {
    var u;
    if ((u = s == null ? void 0 : s.files) != null && u.length && fn(s.files[0].type)) {
      const d = s.files[0];
      Nt(e, d, l, !1);
      return;
    }
    r(s, l, c);
  }, t.drop = (s) => {
    var l, c;
    if ((c = (l = s.dataTransfer) == null ? void 0 : l.files) != null && c.length) {
      const u = s.dataTransfer.files[0];
      if (fn(u.type)) {
        const d = ft(
          e,
          ht(e, s.x, s.y)
        );
        return Nt(e, u, d, !0), !0;
      }
    }
    return n(s);
  }, t.pointerUp = (s) => {
    const l = ki(e);
    if (l && !xi(e) && !mi(e) && !Cr(e)) {
      const c = ft(e, ht(e, s.x, s.y)), u = hi(e, c);
      u && se.isMindElement(e, u) && se.hasImage(u) && Aa(e, u, c) && l === u && o.open(u.data.image.url);
    }
    i(s);
  }, t;
}, Ki = (e) => {
  const t = e;
  return t.renderImage = (r, n) => {
    const i = ji.createRoot(r);
    i.render(/* @__PURE__ */ a(dn, { ...n }));
    let o = { ...n };
    return {
      destroy: () => {
        setTimeout(() => {
          i.unmount();
        }, 0);
      },
      update: (l) => {
        o = { ...o, ...l }, i.render(/* @__PURE__ */ a(dn, { ...o }));
      }
    };
  }, Os(t);
}, de = Ue.forwardRef(
  ({ children: e, padding: t, className: r, style: n, ...i }, o) => /* @__PURE__ */ a(
    "div",
    {
      className: T("island", r),
      style: { "--padding": t, ...n },
      ref: o,
      ...i,
      children: e
    }
  )
), Ss = Ci(
  ({ children: e, gap: t, align: r, justifyContent: n, className: i, style: o }, s) => /* @__PURE__ */ a(
    "div",
    {
      className: T("stack stack_horizontal", i),
      style: {
        "--gap": t,
        alignItems: r,
        justifyContent: n,
        ...o
      },
      ref: s,
      children: e
    }
  )
), Ps = Ci(
  ({ children: e, gap: t, align: r, justifyContent: n, className: i, style: o }, s) => /* @__PURE__ */ a(
    "div",
    {
      className: T("stack stack_vertical", i),
      style: {
        "--gap": t,
        justifyItems: r,
        justifyContent: n,
        ...o
      },
      ref: s,
      children: e
    }
  )
), ie = {
  Row: Ss,
  Col: Ps
};
class Ls extends DOMException {
  constructor(t = "Request Aborted") {
    super(t, "AbortError");
  }
}
const Ts = (e) => !!e && typeof e == "object" && "then" in e && "catch" in e && "finally" in e, Ms = (e, t, { checkForDefaultPrevented: r = !0 } = {}) => function(i) {
  if (e == null || e(i), !r || !(i != null && i.defaultPrevented))
    return t == null ? void 0 : t(i);
}, Ds = (e) => {
  const t = e.split(","), r = t[0].match(/:(.*?);/)[1], n = atob(t[1]);
  let i = n.length;
  const o = new Uint8Array(i);
  for (; i--; )
    o[i] = n.charCodeAt(i);
  return new Blob([o], {
    type: r
  });
}, _s = (e, t = {}) => ea(e, {
  fillStyle: "transparent",
  inlineStyleClassNames: ".extend,.emojis,.text",
  padding: 20,
  ratio: 4,
  ...t
});
function Is(e, t) {
  const r = document.createElement("a"), n = window.URL.createObjectURL(e);
  r.href = n, r.download = t, document.body.append(r), r.click(), window.URL.revokeObjectURL(n), r.remove();
}
const Wr = (e, t) => {
  const r = [];
  for (let n = 0; n < e.length; n += t)
    r.push(e.slice(n, n + t));
  return r;
}, hn = (e) => (e = e.replace(/\bAlt\b/i, "Alt").replace(/\bShift\b/i, "Shift").replace(/\b(Enter|Return)\b/i, "Enter"), gi || ta ? e.replace(/\bCtrlOrCmd\b/gi, "Cmd").replace(/\bAlt\b/i, "Option") : e.replace(/\bCtrlOrCmd\b/gi, "Ctrl")), I = Ue.forwardRef((e, t) => {
  const { id: r } = { id: "drawnix" }, n = Ue.useRef(null);
  Ue.useImperativeHandle(t, () => n.current);
  const i = `tool-icon_size_${e.size || "medium"}`, [o, s] = M(!1), l = Oe(!0), c = async (d) => {
    var f;
    const h = "onClick" in e && ((f = e.onClick) == null ? void 0 : f.call(e, d));
    if (Ts(h))
      try {
        s(!0), await h;
      } catch (m) {
        if (m instanceof Ls)
          console.warn(m);
        else
          throw m;
      } finally {
        l.current && s(!1);
      }
  };
  ne(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const u = Oe(null);
  if (e.type === "button" || e.type === "icon" || e.type === "submit") {
    const d = e.type === "icon" ? "button" : e.type;
    return /* @__PURE__ */ k(
      "button",
      {
        className: T(
          "tool-icon_type_button",
          i,
          e.className,
          e.visible && !e.hidden ? "tool-icon_type_button--show" : "tool-icon_type_button--hide",
          {
            "tool-icon": !e.hidden,
            "tool-icon--selected": e.selected
          }
        ),
        style: e.style,
        "data-testid": e["data-testid"],
        hidden: e.hidden,
        title: e.title,
        "aria-label": e["aria-label"],
        type: d,
        onClick: c,
        onPointerDown: (h) => {
          var f;
          (f = e.onPointerDown) == null || f.call(e, {
            pointerType: h.pointerType || null,
            event: h
          });
        },
        onPointerUp: (h) => {
          var f;
          (f = e.onPointerUp) == null || f.call(e, { pointerType: h.pointerType || null });
        },
        ref: n,
        disabled: o || !!e.disabled,
        children: [
          (e.icon || e.label) && /* @__PURE__ */ k(
            "div",
            {
              className: "tool-icon__icon",
              "aria-hidden": "true",
              "aria-disabled": !!e.disabled,
              children: [
                e.icon || e.label,
                e.keyBindingLabel && /* @__PURE__ */ a("span", { className: "tool-icon__keybinding", children: e.keyBindingLabel })
              ]
            }
          ),
          e.showAriaLabel && /* @__PURE__ */ a("div", { className: "tool-icon__label", children: e["aria-label"] }),
          e.children && /* @__PURE__ */ a("div", { className: "tool-icon__icon", children: e.children })
        ]
      }
    );
  }
  return /* @__PURE__ */ k(
    "label",
    {
      className: T("tool-icon", e.className),
      title: e.title,
      onPointerDown: (d) => {
        var h;
        u.current = d.pointerType || null, (h = e.onPointerDown) == null || h.call(e, {
          pointerType: d.pointerType || null,
          event: d
        });
      },
      onPointerUp: (d) => {
        var h;
        (h = e.onPointerUp) == null || h.call(e, { pointerType: d.pointerType || null }), requestAnimationFrame(() => {
          u.current = null;
        });
      },
      children: [
        /* @__PURE__ */ a(
          "input",
          {
            className: `tool-icon_type_radio ${i}`,
            type: "radio",
            name: e.name,
            "aria-label": e["aria-label"],
            "aria-keyshortcuts": e["aria-keyshortcuts"],
            "data-testid": e["data-testid"],
            id: `${r}-${e.id}`,
            onChange: () => {
              var d;
              (d = e.onChange) == null || d.call(e, { pointerType: u.current });
            },
            checked: e.checked,
            ref: n
          }
        ),
        /* @__PURE__ */ k("div", { className: "tool-icon__icon", children: [
          e.icon,
          e.keyBindingLabel && /* @__PURE__ */ a("span", { className: "tool-icon__keybinding", children: e.keyBindingLabel })
        ] })
      ]
    }
  );
});
I.displayName = "ToolButton";
const E = (e) => e, Fs = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "Hand", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M8.44583468,0.500225887 C9.07406934,0.510185679 9.54739531,0.839591366 9.86192311,1.34305279 C9.89696656,1.39914649 9.92878401,1.45492964 9.9576026,1.50991157 L9.9576026,1.50991157 L10.0210033,1.64201027 L10.061978,1.62350755 C10.1972891,1.56834247 10.3444107,1.53218464 10.5027907,1.51755353 L10.5027907,1.51755353 L10.6649031,1.51019133 C11.4883708,1.51019133 12.0208782,1.99343346 12.3023042,2.66393278 C12.3903714,2.87392911 12.4344191,3.10047818 12.4339446,3.3257952 L12.4339446,3.3257952 L12.4360033,3.80501027 L12.5160535,3.78341501 C12.6124478,3.76124046 12.7138812,3.74739854 12.820201,3.74250274 L12.820201,3.74250274 L12.9833264,3.74194533 C13.6121166,3.7657478 14.0645887,4.0801724 14.3087062,4.56112689 C14.4521117,4.8436609 14.4987984,5.11349437 14.4999262,5.33449618 L14.4999262,5.33449618 L14.3922653,12.049414 C14.3784752,12.909177 14.0717787,13.7360948 13.5212406,14.3825228 C13.4055676,14.5183496 13.2843697,14.643961 13.1582361,14.7596335 C12.4634771,15.3967716 11.755103,15.6538706 11.1897396,15.7000055 L11.1897396,15.7000055 L7.4723083,15.6798158 C7.14276373,15.634268 6.81580098,15.5154267 6.49455235,15.3472501 C6.25643701,15.2225944 6.06881706,15.0975452 5.88705731,14.9494308 L5.88705731,14.9494308 L2.55198782,11.500873 C2.39559475,11.3769079 2.17626793,11.1748532 1.9548636,10.9139403 C1.57867502,10.4706225 1.33501976,10.0139923 1.30330257,9.52833025 C1.28093191,9.18578476 1.37200912,8.85641102 1.5826788,8.56872564 C1.82538833,8.23725279 2.12881965,8.02107162 2.47470569,7.92957033 C2.95807982,7.80169771 3.42705723,7.92468989 3.86509644,8.18731167 C4.04431391,8.29475961 4.1816109,8.40304483 4.26225571,8.47866867 L4.26225571,8.47866867 L4.61400328,8.79701027 L4.57247249,3.59275349 L4.57628524,3.46204923 C4.5897691,3.23444442 4.64087578,2.95701848 4.75937106,2.66961597 C5.01017272,2.06131302 5.49670227,1.64692543 6.21363856,1.60818786 C6.44223508,1.59583681 6.65042099,1.62176802 6.83696985,1.68057551 L6.83696985,1.68057551 L6.86400328,1.69001027 C6.88501862,1.63593052 6.90764242,1.58175442 6.9331867,1.52672633 L6.9331867,1.52672633 L7.01883595,1.35955614 C7.31549194,0.832047939 7.79476072,0.48993549 8.44583468,0.500225887 Z M8.42684173,1.70001476 C8.26825412,1.69756905 8.16339456,1.77242008 8.06478367,1.94776814 C8.03967773,1.99241107 8.01831703,2.03811495 8.00083464,2.07855067 L8.00083464,2.07855067 L7.94879157,2.2035905 L7.94354455,2.20731401 L7.943,3.161 L7.97170661,3.16123746 L7.97170661,7.60991883 L6.77170661,7.60991883 L6.771,3.338 L6.74362358,3.33880359 C6.74284189,3.29064626 6.73014163,3.20282206 6.7002616,3.11094408 L6.66446012,3.01903385 C6.58982025,2.85766739 6.49843292,2.79455071 6.27838133,2.80644008 C6.07001018,2.81769881 5.95642108,2.91444507 5.86877664,3.12702089 C5.79792279,3.29887224 5.77228127,3.48655908 5.77246879,3.58977183 L5.77246879,3.58977183 L5.83613619,11.5252021 L3.41863956,9.33477657 L3.31637296,9.25979571 L3.24805011,9.21651224 C3.06096922,9.10434987 2.89279975,9.06024641 2.78159879,9.0896637 C2.71007735,9.10858411 2.63607367,9.1613084 2.55086305,9.27768211 C2.51020424,9.33320478 2.49638061,9.38319687 2.50075171,9.4501283 C2.51206889,9.62341997 2.64503022,9.87260054 2.86983366,10.1375191 C3.03268834,10.3294345 3.19762053,10.4813781 3.35554956,10.6131022 L3.35554956,10.6131022 L6.68454317,14.0569073 C6.71106575,14.0773808 6.74806086,14.1037158 6.79369091,14.1335929 L6.79369091,14.1335929 L6.95464838,14.2315311 L7.05111031,14.2841211 C7.25978123,14.3933622 7.46253523,14.4670573 7.55685495,14.4854708 L7.55685495,14.4854708 L11.1407985,14.5022108 C11.1503576,14.5013899 11.1627905,14.4997539 11.1779002,14.4971772 L11.1779002,14.4971772 L11.2991076,14.4694224 C11.3491682,14.4557375 11.4083624,14.437284 11.4751158,14.4130563 C11.769383,14.3062543 12.066676,14.1324596 12.3471758,13.8752234 C12.4371203,13.7927386 12.5240597,13.7026333 12.607654,13.6044743 C12.9760464,13.1719172 13.183059,12.6137678 13.1924195,12.030173 L13.1924195,12.030173 L13.3000132,5.32832551 C13.2997939,5.29016685 13.2826117,5.19085946 13.2386527,5.10425262 C13.1843838,4.99733326 13.1129774,4.94771265 12.9379578,4.94108739 C12.6814739,4.93138871 12.534132,5.11189595 12.4756792,5.39480062 L12.4768718,7.52734922 L11.2768718,7.52734922 L11.276,5.688 L11.2462883,5.6883208 L11.2339541,3.32771285 C11.2341,3.2560396 11.2209054,3.18817621 11.1957482,3.12818892 C11.0820579,2.85732094 10.9199288,2.71019133 10.6649031,2.71019133 C10.456829,2.71019133 10.3197487,2.87378067 10.2524297,3.11264939 L10.2530225,7.512783 L9.05302254,7.512783 L9.053,3.288 L9.01554331,3.28724203 L8.98800328,2.29901027 L8.9629175,2.22263368 C8.94515567,2.17417174 8.92167756,2.11937748 8.8924232,2.06330056 L8.8924232,2.06330056 L8.84420197,1.9788544 C8.72758855,1.79219249 8.59915015,1.70280728 8.42684173,1.70001476 Z" }) }) })
), Ns = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "selection", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M1.38232686,2.38218266 L5.4143451,14.2246629 L5.45540179,14.3136477 C5.6738376,14.7029541 6.25143564,14.7273637 6.49230627,14.3232393 L8.11486037,11.5990854 L10.8833927,14.4351257 C11.1162256,14.673686 11.4988798,14.6767204 11.7354668,14.4418826 L14.1933351,12.0021862 L14.263123,11.9192708 C14.4260847,11.6858139 14.4039042,11.3621027 14.1959502,11.1531274 L11.3598604,8.30408543 L14.0003903,6.44278167 C14.4042341,6.15799031 14.3099422,5.5344405 13.8399491,5.38178897 L2.13023795,1.60291226 C1.65322163,1.44797961 1.20794286,1.91192855 1.38232686,2.38218266 Z M2.93689198,3.12556703 L12.3288604,6.15308543 L10.0883903,7.73315528 L10.0121747,7.79676991 C9.78025886,8.02517222 9.77056424,8.40723513 10.0088753,8.64671667 L12.9218604,11.5730854 L11.3198604,13.1630854 L8.42938714,10.2026992 L8.35682877,10.1391916 C8.07802132,9.93187508 7.66955488,10.0042813 7.48460396,10.3145856 L6.10286037,12.6310854 L2.93689198,3.12556703 Z" }) }) })
), Rs = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "Mind", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M14.5,1.5 C15.3284271,1.5 16,2.17157288 16,3 L16,4.5 C16,5.32842712 15.3284271,6 14.5,6 L10.5,6 C9.70541385,6 9.05512881,5.38217354 9.00332687,4.60070262 L7.75,4.6 C6.70187486,4.6 5.75693372,5.0417832 5.09122946,5.7492967 L5.5,5.75 C6.32842712,5.75 7,6.42157288 7,7.25 L7,8.75 C7,9.57842712 6.32842712,10.25 5.5,10.25 L4.69703093,10.2512226 C5.3493111,11.2442937 6.47308134,11.9 7.75,11.9 L9.004,11.9 L9.00686658,11.85554 C9.07955132,11.0948881 9.72030388,10.5 10.5,10.5 L14.5,10.5 C15.3284271,10.5 16,11.1715729 16,12 L16,13.5 C16,14.3284271 15.3284271,15 14.5,15 L10.5,15 C9.67157288,15 9,14.3284271 9,13.5 L9,13.1 L7.75,13.1 C5.78479628,13.1 4.09258608,11.9311758 3.33061658,10.2507745 L1.5,10.25 C0.671572875,10.25 0,9.57842712 0,8.75 L0,7.25 C0,6.42157288 0.671572875,5.75 1.5,5.75 L3.5932906,5.74973863 C4.44206161,4.34167555 5.98606075,3.4 7.75,3.4 L9,3.4 L9,3 C9,2.17157288 9.67157288,1.5 10.5,1.5 L14.5,1.5 Z M14.5,11.7 L10.5,11.7 C10.3343146,11.7 10.2,11.8343146 10.2,12 L10.2,13.5 C10.2,13.6656854 10.3343146,13.8 10.5,13.8 L14.5,13.8 C14.6656854,13.8 14.8,13.6656854 14.8,13.5 L14.8,12 C14.8,11.8343146 14.6656854,11.7 14.5,11.7 Z M5.5,6.95 L1.5,6.95 C1.33431458,6.95 1.2,7.08431458 1.2,7.25 L1.2,8.75 C1.2,8.91568542 1.33431458,9.05 1.5,9.05 L5.5,9.05 C5.66568542,9.05 5.8,8.91568542 5.8,8.75 L5.8,7.25 C5.8,7.08431458 5.66568542,6.95 5.5,6.95 Z M14.5,2.7 L10.5,2.7 C10.3343146,2.7 10.2,2.83431458 10.2,3 L10.2,4.5 C10.2,4.66568542 10.3343146,4.8 10.5,4.8 L14.5,4.8 C14.6656854,4.8 14.8,4.66568542 14.8,4.5 L14.8,3 C14.8,2.83431458 14.6656854,2.7 14.5,2.7 Z" }) }) })
), As = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "geometry", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M9.3,6.7 L1.7,6.7 L1.7,14.3 L9.3,14.3 L9.3,6.7 Z M10.5,9.8 C12.8748244,9.8 14.8,7.87482442 14.8,5.5 C14.8,3.12517558 12.8748244,1.2 10.5,1.2 C8.12517558,1.2 6.2,3.12517558 6.2,5.5 L9.5,5.5 C10.0522847,5.5 10.5,5.94771525 10.5,6.5 L10.5,9.8 Z M10.5,14.5 C10.5,15.0522847 10.0522847,15.5 9.5,15.5 L1.5,15.5 C0.94771525,15.5 0.5,15.0522847 0.5,14.5 L0.5,6.5 C0.5,5.94771525 0.94771525,5.5 1.5,5.5 L5,5.5 C5,2.46243388 7.46243388,0 10.5,0 C13.5375661,0 16,2.46243388 16,5.5 C16,8.53756612 13.5375661,11 10.5,11 L10.5,14.5 Z" }) }) })
), Bs = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "font", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M4.75,14.5069828 C4.41862915,14.5069828 4.15,14.2383536 4.15,13.9069828 C4.15,13.5756119 4.41862915,13.3069828 4.75,13.3069828 L7.3993606,13.306 L7.3993606,2.7 L2.7113606,2.7 L2.7113606,4.10415313 C2.7113606,4.40238689 2.49377099,4.64979988 2.20868371,4.69630014 L2.1113606,4.70415313 C1.77998975,4.70415313 1.5113606,4.43552397 1.5113606,4.10415313 L1.5113606,2.1 C1.5113606,1.76862915 1.77998975,1.5 2.1113606,1.5 L13.8810378,1.5 C14.2124087,1.5 14.4810378,1.76862915 14.4810378,2.1 L14.4810378,4.10415313 C14.4810378,4.43552397 14.2124087,4.70415313 13.8810378,4.70415313 C13.549667,4.70415313 13.2810378,4.43552397 13.2810378,4.10415313 L13.2810378,2.7 L8.5993606,2.7 L8.5993606,13.306 L11.25,13.3069828 C11.5813708,13.3069828 11.85,13.5756119 11.85,13.9069828 C11.85,14.2383536 11.5813708,14.5069828 11.25,14.5069828 L4.75,14.5069828 Z" }) }) })
), zs = E(
  /* @__PURE__ */ k(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ a("path", { stroke: "none", d: "M0 0h24v24H0z" }),
        /* @__PURE__ */ a("path", { d: "M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" }),
        /* @__PURE__ */ a("path", { d: "M18 13.3l-6.3 -6.3" })
      ]
    }
  )
), js = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { id: "straight-line", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M8.55595221,-1.5261864 C8.88741773,-1.5261864 9.15621426,-1.25765205 9.15653772,-0.926186684 L9.16739175,10.3828136 L10.9946787,10.3836977 C11.2708211,10.3836977 11.4946787,10.6075553 11.4946787,10.8836977 C11.4946787,10.9607525 11.4768694,11.0367648 11.4426413,11.1058002 L8.8378495,16.3594519 C8.7642512,16.5078936 8.58425218,16.5685662 8.43581043,16.4949679 C8.37895485,16.4667786 8.33250284,16.4212859 8.30313336,16.3650308 L5.56226325,11.1150985 C5.43446412,10.8703088 5.52930372,10.5682659 5.77409341,10.4404667 C5.84552557,10.4031736 5.92491301,10.3836977 6.0054942,10.3836977 L7.96739175,10.3828136 L7.95653772,-0.926186684 C7.95621467,-1.25723416 8.22431979,-1.52586306 8.55536727,-1.52618611 Z",
      id: "",
      transform: "translate(8.500035, 7.500035) rotate(-135.000000) translate(-8.500035, -7.500035) "
    }
  ) }) })
), Hs = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M3 3h18v18H3z",
      stroke: "currentColor",
      strokeWidth: "2",
      fill: "none"
    }
  ) })
), Us = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ a("g", { id: "terminal", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M11,3 C13.7614237,3 16,5.23857625 16,8 C16,10.7614237 13.7614237,13 11,13 L5,13 C2.23857625,13 0,10.7614237 0,8 C0,5.23857625 2.23857625,3 5,3 L11,3 Z M11,4.2 L5,4.2 C2.90131795,4.2 1.2,5.90131795 1.2,8 C1.2,10.0330982 2.79664702,11.6932796 4.8044525,11.7950555 L5,11.8 L11,11.8 C13.098682,11.8 14.8,10.098682 14.8,8 C14.8,5.96690176 13.203353,4.30672042 11.1955475,4.20494454 L11,4.2 Z" }) }) })
), Ws = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { id: "ellipse", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2.2 C4.79674845,2.2 2.2,4.79674845 2.2,8 C2.2,11.2032515 4.79674845,13.8 8,13.8 C11.2032515,13.8 13.8,11.2032515 13.8,8 C13.8,4.79674845 11.2032515,2.2 8,2.2 Z" }) }) })
), Ks = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { id: "triangle", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M8.23125547,1.21366135 C8.3114266,1.25857939 8.37766784,1.32472334 8.42270367,1.40482837 L15.6471754,14.2549655 C15.7825042,14.4956743 15.6970768,14.800513 15.456368,14.9358418 C15.3815505,14.977905 15.2971646,15 15.2113335,15 L0.787227066,15 C0.511084691,15 0.287227066,14.7761424 0.287227066,14.5 C0.287227066,14.414418 0.309194147,14.3302684 0.351025556,14.2556064 L7.55066033,1.40546924 C7.6856352,1.1645618 7.99034802,1.07868648 8.23125547,1.21366135 Z M7.98695902,3.07926294 L1.98095902,13.7992629 L14.014959,13.7992629 L7.98695902,3.07926294 Z" }) }) })
), qs = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M13.7636471,2.6449804 C13.7716713,2.69552516 13.7718878,2.74700226 13.7642892,2.79761274 L12.3875778,11.9671885 C12.3550099,12.1841069 12.184864,12.3544698 11.9679874,12.3873141 L2.78433018,13.7781116 C2.511301,13.8194599 2.25644773,13.6316454 2.21509947,13.3586162 C2.20737253,13.307594 2.20759072,13.2556831 2.21574631,13.2047277 L3.67471119,4.08923146 C3.70888725,3.87570215 3.87646006,3.70834166 4.09003253,3.67443635 L13.1914362,2.22955927 C13.4641633,2.18626298 13.7203508,2.37225335 13.7636471,2.6449804 Z M12.4355704,3.5645263 L4.77957044,4.7795263 L3.55157044,12.4485263 L11.2775704,11.2775263 L12.4355704,3.5645263 Z",
      transform: "translate(7.989647, 8.003560) rotate(-315.000000) translate(-7.989647, -8.003560) "
    }
  ) }) })
), $s = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M15.3062871,3.5 C15.5824294,3.5 15.8062871,3.72385763 15.8062871,4 C15.8062871,4.05374105 15.7976231,4.10713065 15.7806287,4.15811388 L13.113962,12.1581139 C13.045905,12.362285 12.8548356,12.5 12.6396204,12.5 L0.693712943,12.5 C0.417570568,12.5 0.193712943,12.2761424 0.193712943,12 C0.193712943,11.946259 0.202376883,11.8928694 0.219371294,11.8418861 L2.88603796,3.84188612 C2.95409498,3.63771505 3.14516441,3.5 3.36037961,3.5 L15.3062871,3.5 Z M14.335,4.7 L3.864,4.7 L1.664,11.3 L12.134,11.3 L14.335,4.7 Z" }) }) })
), Zs = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M11,3 C13.7614237,3 16,5.23857625 16,8 C16,10.7614237 13.7614237,13 11,13 L5,13 C2.23857625,13 0,10.7614237 0,8 C0,5.23857625 2.23857625,3 5,3 L11,3 Z M11,4.2 L5,4.2 C2.90131795,4.2 1.2,5.90131795 1.2,8 C1.2,10.0330982 2.79664702,11.6932796 4.8044525,11.7950555 L5,11.8 L11,11.8 C13.098682,11.8 14.8,10.098682 14.8,8 C14.8,5.96690176 13.203353,4.30672042 11.1955475,4.20494454 L11,4.2 Z" }) }) })
), Gs = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M8.55595221,-1.5261864 C8.88741773,-1.5261864 9.15621426,-1.25765205 9.15653772,-0.926186684 L9.16739175,10.3828136 L10.9946787,10.3836977 C11.2708211,10.3836977 11.4946787,10.6075553 11.4946787,10.8836977 C11.4946787,10.9607525 11.4768694,11.0367648 11.4426413,11.1058002 L8.8378495,16.3594519 C8.7642512,16.5078936 8.58425218,16.5685662 8.43581043,16.4949679 C8.37895485,16.4667786 8.33250284,16.4212859 8.30313336,16.3650308 L5.56226325,11.1150985 C5.43446412,10.8703088 5.52930372,10.5682659 5.77409341,10.4404667 C5.84552557,10.4031736 5.92491301,10.3836977 6.0054942,10.3836977 L7.96739175,10.3828136 L7.95653772,-0.926186684 C7.95621467,-1.25723416 8.22431979,-1.52586306 8.55536727,-1.52618611 Z",
      transform: "translate(8.500035, 7.500035) rotate(-135.000000) translate(-8.500035, -7.500035) "
    }
  ) }) })
), Vs = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M10.0153197,2.75391207 C10.0923746,2.75391207 10.1683869,2.77172133 10.2374222,2.80594949 L15.4910739,5.41074126 C15.6395156,5.48433956 15.7001882,5.66433859 15.6265899,5.81278033 C15.5984006,5.86963592 15.5529079,5.91608792 15.4966529,5.9454574 L10.2467205,8.68632752 C10.0019308,8.81412664 9.69988791,8.71928704 9.57208878,8.47449735 C9.53479568,8.40306519 9.51531974,8.32367776 9.51531974,8.24309656 L9.51458753,6.62591207 L6.16858753,6.62651279 L6.16914066,12.0061269 C6.16914066,12.3043606 5.95155104,12.5517736 5.66646377,12.5982739 L5.56914066,12.6061269 L0.534587532,12.6061269 C0.203216682,12.6061269 -0.0654124678,12.3374977 -0.0654124678,12.0061269 C-0.0654124678,11.674756 0.203216682,11.4061269 0.534587532,11.4061269 L4.96858753,11.4055128 L4.96914066,6.02651279 C4.96914066,5.72827903 5.18673027,5.48086604 5.47181754,5.43436578 L5.56914066,5.42651279 L9.51458753,5.42591207 L9.51531974,3.25391207 C9.51531974,2.9777697 9.73917736,2.75391207 10.0153197,2.75391207 Z" }) }) })
), Ys = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M10.0153197,2.75391207 C10.0923746,2.75391207 10.1683869,2.77172133 10.2374222,2.80594949 L15.4910739,5.41074126 C15.6395156,5.48433956 15.7001882,5.66433859 15.6265899,5.81278033 C15.5984006,5.86963592 15.5529079,5.91608792 15.4966529,5.9454574 L10.2467205,8.68632752 C10.0019308,8.81412664 9.69988791,8.71928704 9.57208878,8.47449735 C9.53479568,8.40306519 9.51531974,8.32367776 9.51531974,8.24309656 L9.51423005,6.39035523 C5.97984781,6.85936966 3.21691607,9.08498364 1.18879108,13.1285821 C1.04022695,13.4247836 0.679673152,13.5444674 0.383471635,13.3959033 C0.0872701176,13.2473391 -0.0324136308,12.8867853 0.116150501,12.5905838 C2.34388813,8.14900524 5.48945543,5.65776043 9.51468497,5.18078677 L9.51531974,3.25391207 C9.51531974,2.9777697 9.73917736,2.75391207 10.0153197,2.75391207 Z" }) }) })
), qi = E(
  /* @__PURE__ */ a(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ k("g", { strokeWidth: "1.5", children: [
        /* @__PURE__ */ a("path", { stroke: "none", d: "M0 0h24v24H0z" }),
        /* @__PURE__ */ a("line", { x1: "4", y1: "6", x2: "20", y2: "6" }),
        /* @__PURE__ */ a("line", { x1: "4", y1: "12", x2: "20", y2: "12" }),
        /* @__PURE__ */ a("line", { x1: "4", y1: "18", x2: "20", y2: "18" })
      ] })
    }
  )
), Xs = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ a(
    "path",
    {
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      d: "M7.5 15.833c-3.583 1.167-3.583-2.083-5-2.5m10 4.167v-2.917c0-.833.083-1.166-.417-1.666 2.334-.25 4.584-1.167 4.584-5a3.833 3.833 0 0 0-1.084-2.667 3.5 3.5 0 0 0-.083-2.667s-.917-.25-2.917 1.084a10.25 10.25 0 0 0-5.166 0C5.417 2.333 4.5 2.583 4.5 2.583a3.5 3.5 0 0 0-.083 2.667 3.833 3.833 0 0 0-1.084 2.667c0 3.833 2.25 4.75 4.584 5-.5.5-.5 1-.417 1.666V17.5",
      strokeWidth: "1.25"
    }
  ) })
), Js = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ k(
    "g",
    {
      strokeWidth: "1.25",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      children: [
        /* @__PURE__ */ a("path", { stroke: "none", d: "M0 0h24v24H0z" }),
        /* @__PURE__ */ a("path", { d: "M15 8h.01" }),
        /* @__PURE__ */ a("path", { d: "M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5" }),
        /* @__PURE__ */ a("path", { d: "M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4" }),
        /* @__PURE__ */ a("path", { d: "M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598" }),
        /* @__PURE__ */ a("path", { d: "M19 16v6" }),
        /* @__PURE__ */ a("path", { d: "M22 19l-3 3l-3 -3" })
      ]
    }
  ) })
), Qs = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "zoom-out", stroke: "none", fill: "currentColor", strokeWidth: "1", children: /* @__PURE__ */ a(
    "path",
    {
      fillRule: "nonzero",
      d: "M6.85,2.73225886e-13 C10.6331505,2.73225886e-13 13.7,3.06684946 13.7,6.85 C13.7,8.54194045 13.0865836,10.0906098 12.0700142,11.2857448 L15.4201976,14.5717081 C15.6567367,14.8037768 15.6603607,15.1836585 15.4282919,15.4201976 C15.1962232,15.6567367 14.8163415,15.6603607 14.5798024,15.4282919 L14.5798024,15.4282919 L11.2163456,12.128262 C10.0309427,13.1099691 8.50937591,13.7 6.85,13.7 C3.06684946,13.7 4.58522109e-14,10.6331505 4.58522109e-14,6.85 C4.58522109e-14,3.06684946 3.06684946,2.73225886e-13 6.85,2.73225886e-13 Z M6.85,1.2 C3.72959116,1.2 1.2,3.72959116 1.2,6.85 C1.2,9.97040884 3.72959116,12.5 6.85,12.5 C8.31753357,12.5 9.65438791,11.9404957 10.6588859,11.0231643 C10.6855412,10.9625408 10.7245275,10.9050898 10.7743982,10.8542584 C10.8288931,10.7987137 10.8915387,10.7560124 10.9585649,10.7261903 C11.9144009,9.71595758 12.5,8.35136579 12.5,6.85 C12.5,3.72959116 9.97040884,1.2 6.85,1.2 Z M4.6,6.2 L9.12944565,6.2 C9.4608165,6.2 9.72944565,6.46862915 9.72944565,6.8 C9.72944565,7.09823376 9.51185604,7.34564675 9.22676876,7.39214701 L9.12944565,7.4 L4.6,7.4 C4.26862915,7.4 4,7.13137085 4,6.8 C4,6.50176624 4.21758961,6.25435325 4.50267688,6.20785299 L4.6,6.2 L9.12944565,6.2 Z"
    }
  ) }) })
), el = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "zoom-in", stroke: "none", fill: "currentColor", strokeWidth: "1", children: /* @__PURE__ */ a(
    "path",
    {
      fillRule: "nonzero",
      d: "M6.85,-1.81188398e-13 C10.6331505,-1.81188398e-13 13.7,3.06684946 13.7,6.85 C13.7,8.54194045 13.0865836,10.0906098 12.0700142,11.2857448 L15.4201976,14.5717081 C15.6567367,14.8037768 15.6603607,15.1836585 15.4282919,15.4201976 C15.1962232,15.6567367 14.8163415,15.6603607 14.5798024,15.4282919 L14.5798024,15.4282919 L11.2163456,12.128262 C10.0309427,13.1099691 8.50937591,13.7 6.85,13.7 C3.06684946,13.7 4.61852778e-14,10.6331505 4.61852778e-14,6.85 C4.61852778e-14,3.06684946 3.06684946,-1.81188398e-13 6.85,-1.81188398e-13 Z M6.85,1.2 C3.72959116,1.2 1.2,3.72959116 1.2,6.85 C1.2,9.97040884 3.72959116,12.5 6.85,12.5 C8.31753357,12.5 9.65438791,11.9404957 10.6588859,11.0231643 C10.6855412,10.9625408 10.7245275,10.9050898 10.7743982,10.8542584 C10.8288931,10.7987137 10.8915387,10.7560124 10.9585649,10.7261903 C11.9144009,9.71595758 12.5,8.35136579 12.5,6.85 C12.5,3.72959116 9.97040884,1.2 6.85,1.2 Z M6.86472282,3.93527718 C7.16295659,3.93527718 7.41036958,4.15286679 7.45686984,4.43795406 L7.46472282,4.53527718 L7.464,6.19927718 L9.12944565,6.2 C9.42767941,6.2 9.6750924,6.41758961 9.72159266,6.70267688 L9.72944565,6.8 C9.72944565,7.09823376 9.51185604,7.34564675 9.22676876,7.39214701 L9.12944565,7.4 L7.464,7.39927718 L7.46472282,9.06472282 C7.46472282,9.36295659 7.24713321,9.61036958 6.96204594,9.65686984 L6.86472282,9.66472282 C6.56648906,9.66472282 6.31907607,9.44713321 6.27257581,9.16204594 L6.26472282,9.06472282 L6.264,7.39927718 L4.6,7.4 C4.30176624,7.4 4.05435325,7.18241039 4.00785299,6.89732312 L4,6.8 C4,6.50176624 4.21758961,6.25435325 4.50267688,6.20785299 L4.6,6.2 L6.264,6.19927718 L6.26472282,4.53527718 C6.26472282,4.2701805 6.43664548,4.0452385 6.67507642,3.96586557 L6.76739971,3.94313016 L6.86472282,3.93527718 Z"
    }
  ) }) })
), tl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "save-file", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a(
    "path",
    {
      fillRule: "nonzero",
      d: "M11.064 9.1l2.645 2.595.03-.029.848.849-3.523 3.323-.848-.848 1.994-1.883H7.5v-1.2h4.712l-1.996-1.958.848-.849zM9.356.3L13.7 3.71V7.9h-1.2l-.001-2.633H8.5V1.5L3.1 1.5a.4.4 0 0 0-.392.32L2.7 1.9v12a.4.4 0 0 0 .32.392l.08.008h3.418v1.2H3.1a1.6 1.6 0 0 1-1.593-1.454L1.5 13.9v-12A1.6 1.6 0 0 1 2.954.307L3.1.3h6.256zM9.7 2.095v1.973l2.51-.001L9.7 2.095z"
    }
  ) }) })
), rl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "save-file", stroke: "currentColor", fill: "none", children: /* @__PURE__ */ a(
    "path",
    {
      d: "m9.257 6.351.183.183H15.819c.34 0 .727.182 1.051.506.323.323.505.708.505 1.05v5.819c0 .316-.183.7-.52 1.035-.337.338-.723.522-1.037.522H4.182c-.352 0-.74-.181-1.058-.5-.318-.318-.499-.705-.499-1.057V5.182c0-.351.181-.736.5-1.054.32-.321.71-.503 1.057-.503H6.53l2.726 2.726Z",
      strokeWidth: "1.25"
    }
  ) }) })
), nl = E(
  /* @__PURE__ */ a(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      className: "background-color-icon",
      children: /* @__PURE__ */ k("g", { transform: "translate(1 1)", fillRule: "evenodd", fill: "#000", stroke: "none", children: [
        /* @__PURE__ */ a("circle", { fillOpacity: ".04", r: "11", cy: "11", cx: "11" }),
        /* @__PURE__ */ a(
          "path",
          {
            d: "M17 20.221V17h3.221A11.06 11.06 0 0 1 17 20.221zm-12 0A11.06 11.06 0 0 1 1.779 17H5v3.221zM20.221 5H17V1.779A11.06 11.06 0 0 1 20.221 5zM9 .181V1H6.411A10.919 10.919 0 0 1 9 .181zM15.589 1H13V.181c.907.167 1.775.445 2.589.819zM13 21.819V21h2.589c-.814.374-1.682.652-2.589.819zm-4 0A10.919 10.919 0 0 1 6.411 21H9v.819zm-8-6.23A10.919 10.919 0 0 1 .181 13H1v2.589zm0-9.178V9H.181C.348 8.093.626 7.225 1 6.411zM21.819 9H21V6.411c.374.814.652 1.682.819 2.589zM21 15.589V13h.819A10.919 10.919 0 0 1 21 15.589zM5 1.779V5H1.779A11.06 11.06 0 0 1 5 1.779zM5 13h4v4H5v-4zm8 0h4v4h-4v-4zM5 5h4v4H5V5zm8 0h4v4h-4V5zm0 12v4H9v-4h4zm8-8v4h-4V9h4zm-8 0v4H9V9h4zM5 9v4H1V9h4zm8-8v4H9V1h4z",
            fillOpacity: ".12"
          }
        )
      ] })
    }
  )
), il = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 32 32", className: "no-color-icon", children: /* @__PURE__ */ k(
    "g",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fillRule: "nonzero",
      fill: "currentColor",
      stroke: "none",
      children: [
        /* @__PURE__ */ a("path", { d: "M2 16c0 7.733 6.267 14 14 14s14-6.267 14-14S23.733 2 16 2 2 8.267 2 16zm-1 0C1 7.716 7.714 1 16 1c8.284 0 15 6.714 15 15 0 8.284-6.714 15-15 15-8.284 0-15-6.714-15-15z" }),
        /* @__PURE__ */ a("path", { d: "M6.354 26.354l-.708-.708 20-20 .708.708z" })
      ]
    }
  ) })
), ol = E(
  /* @__PURE__ */ a(
    "svg",
    {
      className: "selected-icon",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ a("polyline", { points: "20 6 9 17 4 12" })
    }
  )
), al = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 24 24", className: "stroke-icon", children: /* @__PURE__ */ k(
    "g",
    {
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "none",
      fillRule: "evenodd",
      fill: "#000",
      children: [
        /* @__PURE__ */ a(
          "path",
          {
            d: "M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0-4c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1z",
            fillRule: "nonzero",
            fillOpacity: ".04"
          }
        ),
        /* @__PURE__ */ a(
          "path",
          {
            d: "M12 5V1c1.491 0 2.914.297 4.21.835L14.68 5.53A6.979 6.979 0 0 0 12 5zm4.95 2.048l2.828-2.828a11.016 11.016 0 0 1 2.388 3.568l-3.697 1.53a7.01 7.01 0 0 0-1.519-2.27zM19 12h4c0 1.491-.297 2.914-.835 4.21l-3.696-1.53c.342-.826.531-1.73.531-2.68zm-2.05 4.95l2.828 2.828a11.016 11.016 0 0 1-3.567 2.387l-1.532-3.696a7.01 7.01 0 0 0 2.27-1.52zM12 19v4c-1.491 0-2.914-.297-4.21-.835l1.53-3.696c.826.342 1.73.531 2.68.531zm-4.95-2.05l-2.828 2.828a11.016 11.016 0 0 1-2.387-3.567l3.696-1.532a7.01 7.01 0 0 0 1.52 2.27zM5 12H1c0-1.491.297-2.914.835-4.21L5.53 9.32A6.979 6.979 0 0 0 5 12zm2.05-4.95L4.222 4.222a11.016 11.016 0 0 1 3.567-2.387L9.321 5.53a7.01 7.01 0 0 0-2.27 1.52z",
            fillOpacity: ".12"
          }
        )
      ]
    }
  ) })
), sl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 24 24", children: /* @__PURE__ */ a(
    "g",
    {
      xmlns: "http://www.w3.org/2000/svg",
      id: "icon-border-white",
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      opacity: "0.1",
      children: /* @__PURE__ */ k("g", { id: "Group", children: [
        /* @__PURE__ */ a(
          "path",
          {
            d: "M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z",
            fill: "#000000",
            fillRule: "nonzero"
          }
        ),
        /* @__PURE__ */ a(
          "path",
          {
            d: "M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z",
            fill: "#000000",
            fillRule: "nonzero"
          }
        )
      ] })
    }
  ) })
), ll = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 24 32", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ k("g", { transform: "translate(0 14)", fillRule: "evenodd", fill: "none", children: [
    /* @__PURE__ */ a("path", { d: "M-18-19h60v40h-60z" }),
    /* @__PURE__ */ a("path", { d: "M0 0h24v2H0z", fill: "currentColor" })
  ] }) })
), cl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 24 32", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { transform: "translate(0 14)", fillRule: "evenodd", fill: "none", children: /* @__PURE__ */ a("g", { fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M0 0h6v2H0zM9 0h6v2H9zM18 0h6v2h-6z" }) }) }) })
), ul = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 24 32", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { transform: "translate(0 14)", fillRule: "evenodd", fill: "none", children: /* @__PURE__ */ k("g", { fill: "currentColor", children: [
    /* @__PURE__ */ a("rect", { rx: "1", height: "2", width: "2" }),
    /* @__PURE__ */ a("rect", { rx: "1", x: "4", height: "2", width: "2" }),
    /* @__PURE__ */ a("rect", { rx: "1", x: "8", height: "2", width: "2" }),
    /* @__PURE__ */ a("rect", { rx: "1", x: "12", height: "2", width: "2" }),
    /* @__PURE__ */ a("rect", { rx: "1", x: "16", height: "2", width: "2" }),
    /* @__PURE__ */ a("rect", { rx: "1", x: "20", height: "2", width: "2" })
  ] }) }) })
), dl = ({
  currentColor: e
}) => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    xmlns: "http://www.w3.org/2000/svg",
    className: "font-color-icon",
    children: /* @__PURE__ */ k(
      "g",
      {
        id: "font-color",
        strokeWidth: "1",
        fillRule: "evenodd",
        stroke: "none",
        fill: "currentColor",
        children: [
          /* @__PURE__ */ a(
            "path",
            {
              id: "secondary-color",
              d: "M1.999 15.011h11.998V13.81H1.999z",
              fill: e || "#333333"
            }
          ),
          /* @__PURE__ */ a(
            "path",
            {
              d: "M6.034 7.59h4.104L8.086 2.297 6.034 7.59zm-.465 1.2l-1.437 3.707H2.845L7.301 1h1.287l-.001.004h.286l4.454 11.492h-1.288L10.603 8.79H5.569z",
              id: "A"
            }
          )
        ]
      }
    )
  }
), fl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("g", { id: "undo-cion", transform: "translate(1 1)", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M3.84 5.825a.6.6 0 0 1 .063.774l-.064.075a.6.6 0 0 1-.774.063l-.074-.063L.176 3.859a.6.6 0 0 1-.064-.775l.064-.074L3.01.176a.6.6 0 0 1 .912.774l-.063.074-1.795 1.794h6.851a5.1 5.1 0 0 1 .216 10.196l-.216.004h-4a.6.6 0 0 1-.097-1.192l.097-.008h4a3.9 3.9 0 0 0 .201-7.795l-.2-.005H2.033l1.805 1.807z",
      id: "undo-icon-path"
    }
  ) }) }) })
), hl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("g", { id: "redo-cion", transform: "matrix(-1 0 0 1 15.015 1)", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M3.84 5.825a.6.6 0 0 1 .063.774l-.064.075a.6.6 0 0 1-.774.063l-.074-.063L.176 3.859a.6.6 0 0 1-.064-.775l.064-.074L3.01.176a.6.6 0 0 1 .912.774l-.063.074-1.795 1.794h6.851a5.1 5.1 0 0 1 .216 10.196l-.216.004h-4a.6.6 0 0 1-.097-1.192l.097-.008h4a3.9 3.9 0 0 0 .201-7.795l-.2-.005H2.033l1.805 1.807z",
      id: "redo-icon-path"
    }
  ) }) }) })
), Rt = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ a(
    "path",
    {
      strokeWidth: "1.25",
      d: "M3.333 5.833h13.334M8.333 9.167v5M11.667 9.167v5M4.167 5.833l.833 10c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.746 1.667-1.667l.833-10M7.5 5.833v-2.5c0-.46.373-.833.833-.833h3.334c.46 0 .833.373.833.833v2.5"
    }
  ) })
), ml = E(
  /* @__PURE__ */ a(
    "svg",
    {
      viewBox: "0 0 20 20",
      fill: "none",
      stroke: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ k("g", { strokeWidth: "1.25", children: [
        /* @__PURE__ */ a("path", { d: "M14.375 6.458H8.958a2.5 2.5 0 0 0-2.5 2.5v5.417a2.5 2.5 0 0 0 2.5 2.5h5.417a2.5 2.5 0 0 0 2.5-2.5V8.958a2.5 2.5 0 0 0-2.5-2.5Z" }),
        /* @__PURE__ */ a("path", { d: "M11.667 3.125c.517 0 .986.21 1.325.55.34.338.55.807.55 1.325v1.458H8.333c-.485 0-.927.185-1.26.487-.343.312-.57.75-.609 1.24l-.005 5.357H5a1.87 1.87 0 0 1-1.326-.55 1.87 1.87 0 0 1-.549-1.325V5c0-.518.21-.987.55-1.326.338-.34.807-.549 1.325-.549h6.667Z" })
      ] })
    }
  )
), Kr = E(
  /* @__PURE__ */ a(
    "svg",
    {
      viewBox: "0 0 1024 1024",
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ a("path", { d: "M170.794667 896c3.456 0 6.912-0.426667 10.325333-1.28l170.666667-42.666667c7.509333-1.877333 14.378667-5.76 19.84-11.221333L896.128 316.330667c16.128-16.128 25.002667-37.546667 25.002667-60.330667s-8.874667-44.202667-25.002667-60.330667L828.458667 128c-32.256-32.256-88.405333-32.256-120.661334 0L183.296 652.501333a42.794667 42.794667 0 0 0-11.221333 19.797334l-42.666667 170.666666A42.666667 42.666667 0 0 0 170.794667 896z m597.333333-707.669333L835.797333 256l-67.669333 67.669333L700.458667 256l67.669333-67.669333zM251.989333 704.469333l388.138667-388.138666L707.797333 384l-388.181333 388.138667-90.197333 22.528 22.570666-90.197334z" })
    }
  )
), gl = E(
  /* @__PURE__ */ a("svg", { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ a("g", { id: "image", stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M10.496 7c-.824 0-1.572-.675-1.498-1.5 0-.825.674-1.5 1.498-1.5.823 0 1.497.675 1.497 1.5S11.319 7 10.496 7zM13.8 9.476V2.2H2.2v5.432l.1-.078C3.132 6.904 4.029 6.5 5 6.5c.823 0 1.552.27 2.342.778.226.145.449.304.735.518.06.045.546.413.69.52 1.634 1.21 2.833 1.6 4.798 1.207l.235-.047zm0 1.523V10.7c-5 1-6.3-3-8.8-3-1.5 0-2.8 1.6-2.8 1.6v4.6h11.6V11zM14 1c.6 0 1 .536 1 1.071v11.784c0 .642-.4 1.071-1 1.071H2c-.6 0-1-.429-1-1.07V2.07c0-.535.4-1.07 1-1.07h12z" }) }) })
), $i = E(
  /* @__PURE__ */ a(
    "svg",
    {
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ k("g", { strokeWidth: 1.8, fill: "none", children: [
        /* @__PURE__ */ a("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ a("path", { d: "M12 3l-4 7h8z" }),
        /* @__PURE__ */ a("path", { d: "M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" }),
        /* @__PURE__ */ a("path", { d: "M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" })
      ] })
    }
  )
), pl = E(
  /* @__PURE__ */ a(
    "svg",
    {
      stroke: "currentColor",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ a(
        "path",
        {
          stroke: "none",
          fill: "currentColor",
          d: "M407.48,111.18C335.587,108.103 269.573,152.338 245.08,220C220.587,152.338 154.573,108.103 82.68,111.18C80.285,168.229 107.577,222.632 154.74,254.82C178.908,271.419 193.35,298.951 193.27,328.27L193.27,379.13L296.9,379.13L296.9,328.27C296.816,298.953 311.255,271.42 335.42,254.82C382.596,222.644 409.892,168.233 407.48,111.18Z"
        }
      )
    }
  )
), vl = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", version: "1.1", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a("path", { d: "M14.85,2.5 C15.4851275,2.5 16,3.01487254 16,3.65 L16,12.35 C16,12.9851275 15.4851275,13.5 14.85,13.5 L1.15,13.5 C0.514872538,13.5 0,12.9851275 0,12.35 L0,3.65 C0,3.01487254 0.514872538,2.5 1.15,2.5 L14.85,2.5 Z M14.85,3.7 L1.15,3.7 C1.17735931,3.7 1.2,3.72264069 1.2,3.75 L1.2,12.25 C1.2,12.2773593 1.17735931,12.3 1.15,12.3 L14.85,12.3 C14.8226407,12.3 14.8,12.2773593 14.8,12.25 L14.8,3.75 C14.8,3.72264069 14.8226407,3.7 14.85,3.7 Z M3.5,10.5 L3.5,5.5 L5.25,5.5 L7,7.8 L8.75,5.5 L10.5,5.5 L10.5,10.5 L8.75,10.5 L8.75,7.5 L7,9.8 L5.25,7.5 L5.25,10.5 L3.5,10.5 Z M12.5,10.5 L11,8.5 L12.5,8.5 L12.5,5.5 L11,5.5 L12.5,5.5 L12.5,8.5 L14,8.5 L12.5,10.5 Z" }) }) })
), wl = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ a("g", { stroke: "none", fill: "currentColor", children: /* @__PURE__ */ a(
    "path",
    {
      d: "M12.253 4.13h-1.2v-1a2.8 2.8 0 0 0-5.6 0v4a2.8 2.8 0 0 0 2.8 2.8v1.2a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v1zm-8 8h1.2v1a2.8 2.8 0 0 0 5.6 0v-4a2.8 2.8 0 0 0-2.8-2.8v-1.2a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0v-1z",
      transform: "rotate(46 8.253 8.13)"
    }
  ) }) })
), Zi = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ a("g", { stroke: "none", children: /* @__PURE__ */ a("path", { d: "M8.44521878,4.21103025 C8.58299906,3.97171622 8.8886944,3.88940684 9.12800843,4.02718711 L15.242109,7.54725833 C15.3194119,7.59176394 15.3834015,7.65613893 15.4274422,7.73370766 C15.5637831,7.97384463 15.4796398,8.27904026 15.2395028,8.41538118 L9.12748155,11.8855614 C9.0176214,11.947936 8.88822223,11.9664118 8.76529593,11.9372749 C8.4965984,11.8735862 8.33040588,11.604134 8.39409456,11.3354364 L9.018,8.69941945 L1.5,8.7 C1.22385763,8.7 1,8.47614237 1,8.2 L1,8 C1,7.72385763 1.22385763,7.5 1.5,7.5 L9.075,7.49941945 L8.39165922,4.57430951 C8.3700078,4.48168206 8.37536432,4.38547957 8.40609313,4.29679626 Z" }) }) })
), Gi = E(
  /* @__PURE__ */ a("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ a("g", { stroke: "none", children: /* @__PURE__ */ a("rect", { x: "1", y: "7.5", width: "14", height: "1.2", rx: ".5" }) }) })
), Vi = {
  [ze.default]: {
    strokeColor: Ut,
    fill: "#FFFFFF"
  },
  [ze.colorful]: {
    strokeColor: "#06ADBF",
    fill: "#CDEFF2"
  },
  [ze.soft]: {
    strokeColor: "#6D89C1",
    fill: "#DADFEB"
  },
  [ze.retro]: {
    strokeColor: "#E9C358",
    fill: "#F6EDCF"
  },
  [ze.dark]: {
    strokeColor: "#FFFFFF",
    fill: "#434343"
  },
  [ze.starry]: {
    strokeColor: "#42ABE5",
    fill: "#163F5A"
  }
};
var ge = /* @__PURE__ */ ((e) => (e.eraser = "eraser", e.nibPen = "nibPen", e.feltTipPen = "feltTipPen", e.artisticBrush = "artisticBrush", e.markerHighlight = "markerHighlight", e))(ge || {});
const Yi = "freehand", ye = {
  isFreehand: (e) => e.type === Yi
}, yl = {
  zh: {
    // Toolbar items
    "toolbar.hand": "手形工具 — H",
    "toolbar.selection": "选择 — V",
    "toolbar.mind": "思维导图 — M",
    "toolbar.text": "文本 — T",
    "toolbar.pen": "画笔 — P",
    "toolbar.eraser": "橡皮擦 — E",
    "toolbar.arrow": "箭头 — A",
    "toolbar.shape": "形状",
    "toolbar.image": "图片 — Cmd+U",
    "toolbar.extraTools": "更多工具",
    // Zoom controls
    "zoom.in": "放大 — Cmd++",
    "zoom.out": "缩小 — Cmd+-",
    "zoom.fit": "自适应",
    "zoom.100": "缩放至 100%",
    // Themes
    "theme.default": "默认",
    "theme.colorful": "缤纷",
    "theme.soft": "柔和",
    "theme.retro": "复古",
    "theme.dark": "暗夜",
    "theme.starry": "星空",
    // General
    "general.undo": "撤销",
    "general.redo": "重做",
    "general.menu": "应用菜单",
    "general.duplicate": "复制",
    "general.delete": "删除",
    // Language
    "language.switcher": "语言",
    "language.chinese": "中文",
    "language.english": "English",
    // Menu items
    "menu.open": "打开",
    "menu.saveFile": "保存文件",
    "menu.exportImage": "导出图片",
    "menu.exportImage.png": "PNG",
    "menu.exportImage.jpg": "JPG",
    "menu.cleanBoard": "清除画布",
    "menu.github": "GitHub",
    // Dialog translations
    "dialog.mermaid.title": "Mermaid 转 Drawnix",
    "dialog.mermaid.description": "目前仅支持",
    "dialog.mermaid.flowchart": "流程图",
    "dialog.mermaid.sequence": "序列图",
    "dialog.mermaid.class": "类图",
    "dialog.mermaid.otherTypes": "。其他类型在 Drawnix 中将以图片呈现。",
    "dialog.mermaid.syntax": "Mermaid 语法",
    "dialog.mermaid.placeholder": "在此处编写 Mermaid 图表定义...",
    "dialog.mermaid.preview": "预览",
    "dialog.mermaid.insert": "插入",
    "dialog.markdown.description": "支持 Markdown 语法自动转换为思维导图。",
    "dialog.markdown.syntax": "Markdown 语法",
    "dialog.markdown.placeholder": "在此处编写 Markdown 文本定义...",
    "dialog.markdown.preview": "预览",
    "dialog.markdown.insert": "插入",
    "dialog.error.loadMermaid": "加载 Mermaid 库失败",
    // Extra tools menu items
    "extraTools.mermaidToDrawnix": "Mermaid 到 Drawnix",
    "extraTools.markdownToDrawnix": "Markdown 到 Drawnix",
    // Clean confirm dialog
    "cleanConfirm.title": "清除画布",
    "cleanConfirm.description": "这将会清除整个画布。你是否要继续?",
    "cleanConfirm.cancel": "取消",
    "cleanConfirm.ok": "确认",
    // popup toolbar
    "popupToolbar.fontColor": "字体颜色",
    "popupToolbar.stroke": "边框",
    "popupToolbar.fillColor": "填充颜色",
    "popupToolbar.link": "链接",
    //
    "line.source": "起点",
    "line.target": "终点",
    "line.arrow": "箭头",
    "line.none": "无"
  },
  en: {
    // Toolbar items
    "toolbar.hand": "Hand — H",
    "toolbar.selection": "Selection — V",
    "toolbar.mind": "Mind — M",
    "toolbar.text": "Text — T",
    "toolbar.pen": "Pen — P",
    "toolbar.eraser": "Eraser — E",
    "toolbar.arrow": "Arrow — A",
    "toolbar.shape": "Shape",
    "toolbar.image": "Image — Cmd+U",
    "toolbar.extraTools": "Extra Tools",
    // Zoom controls
    "zoom.in": "Zoom In — Cmd++",
    "zoom.out": "Zoom Out — Cmd+-",
    "zoom.fit": "Fit to Screen",
    "zoom.100": "Zoom to 100%",
    // Themes
    "theme.default": "Default",
    "theme.colorful": "Colorful",
    "theme.soft": "Soft",
    "theme.retro": "Retro",
    "theme.dark": "Dark",
    "theme.starry": "Starry",
    // General
    "general.undo": "Undo",
    "general.redo": "Redo",
    "general.menu": "App Menu",
    "general.duplicate": "Duplicate",
    "general.delete": "Delete",
    // Language
    "language.switcher": "Language",
    "language.chinese": "中文",
    "language.english": "English",
    // Menu items
    "menu.open": "Open",
    "menu.saveFile": "Save File",
    "menu.exportImage": "Export Image",
    "menu.exportImage.png": "PNG",
    "menu.exportImage.jpg": "JPG",
    "menu.cleanBoard": "Clear Board",
    "menu.github": "GitHub",
    // Dialog translations
    "dialog.mermaid.title": "Mermaid to Drawnix",
    "dialog.mermaid.description": "Currently supports",
    "dialog.mermaid.flowchart": "flowcharts",
    "dialog.mermaid.sequence": "sequence diagrams",
    "dialog.mermaid.class": "class diagrams",
    "dialog.mermaid.otherTypes": ", and other diagram types (rendered as images).",
    "dialog.mermaid.syntax": "Mermaid Syntax",
    "dialog.mermaid.placeholder": "Write your Mermaid chart definition here...",
    "dialog.mermaid.preview": "Preview",
    "dialog.mermaid.insert": "Insert",
    "dialog.markdown.description": "Supports automatic conversion of Markdown syntax to mind map.",
    "dialog.markdown.syntax": "Markdown Syntax",
    "dialog.markdown.placeholder": "Write your Markdown text definition here...",
    "dialog.markdown.preview": "Preview",
    "dialog.markdown.insert": "Insert",
    "dialog.error.loadMermaid": "Failed to load Mermaid library",
    // Extra tools menu items
    "extraTools.mermaidToDrawnix": "Mermaid to Drawnix",
    "extraTools.markdownToDrawnix": "Markdown to Drawnix",
    // Clean confirm dialog
    "cleanConfirm.title": "Clear Board",
    "cleanConfirm.description": "This will clear the entire board. Do you want to continue?",
    "cleanConfirm.cancel": "Cancel",
    "cleanConfirm.ok": "OK",
    // popup toolbar
    "popupToolbar.fontColor": "Font Color",
    "popupToolbar.stroke": "Stroke",
    "popupToolbar.fillColor": "Fill Color",
    "popupToolbar.link": "Link",
    //line
    "line.source": "Start",
    "line.target": "End",
    "line.arrow": "Arrow",
    "line.none": "None"
  }
}, Xi = Fr(void 0), Cl = ({
  children: e,
  defaultLanguage: t = "zh"
}) => {
  const [r, n] = M(t), i = (s) => yl[r][s] || s, o = wa(
    () => ({
      language: r,
      setLanguage: n,
      t: i
    }),
    [r]
  );
  return /* @__PURE__ */ a(Xi.Provider, { value: o, children: e });
}, Q = () => {
  const e = bt(Xi);
  if (!e)
    throw new Error("useI18n must be used within I18nProvider");
  return e;
}, Ji = [
  {
    icon: Kr,
    pointer: ge.feltTipPen,
    titleKey: "toolbar.pen"
  },
  {
    icon: zs,
    pointer: ge.eraser,
    titleKey: "toolbar.eraser"
  }
], bl = Wr(Ji, 5), kl = ({
  onPointerUp: e
}) => {
  const { t } = Q(), r = J();
  return /* @__PURE__ */ a(de, { padding: 1, children: /* @__PURE__ */ a(ie.Col, { gap: 1, children: bl.map((n, i) => /* @__PURE__ */ a(ie.Row, { gap: 1, children: n.map((o, s) => /* @__PURE__ */ a(
    I,
    {
      className: T({ fillable: !1 }),
      selected: r.pointer === o.pointer,
      type: "icon",
      size: "small",
      visible: !0,
      icon: o.icon,
      title: t(o.titleKey),
      "aria-label": t(o.titleKey),
      onPointerDown: () => {
        he(r, me.dnd), te.updatePointerType(r, o.pointer);
      },
      onPointerUp: () => {
        he(r, me.drawing), e(o.pointer);
      }
    },
    s
  )) }, i)) }) });
}, xl = [
  {
    icon: Hs,
    title: "Rectangle — R",
    pointer: ce.rectangle
  },
  {
    icon: Ws,
    title: "Ellipse — O",
    pointer: ce.ellipse
  },
  {
    icon: Ks,
    title: "Triangle",
    pointer: ce.triangle
  },
  {
    icon: Us,
    title: "Terminal",
    pointer: Si.terminal
  },
  {
    icon: qs,
    title: "Diamond",
    pointer: ce.diamond
  },
  {
    icon: $s,
    title: "Parallelogram",
    pointer: ce.parallelogram
  },
  {
    icon: Zs,
    title: "RoundRectangle",
    pointer: ce.roundRectangle
  }
], El = Wr(xl, 5), Ol = ({
  onPointerUp: e
}) => {
  const t = J();
  return /* @__PURE__ */ a(de, { padding: 1, children: /* @__PURE__ */ a(ie.Col, { gap: 1, children: El.map((r, n) => /* @__PURE__ */ a(ie.Row, { gap: 1, children: r.map((i, o) => /* @__PURE__ */ a(
    I,
    {
      className: T({ fillable: !1 }),
      type: "icon",
      size: "small",
      visible: !0,
      icon: i.icon,
      title: i.title,
      "aria-label": i.title,
      onPointerDown: () => {
        he(t, me.dnd), te.updatePointerType(t, i.pointer);
      },
      onPointerUp: () => {
        he(t, me.drawing), e(i.pointer);
      }
    },
    o
  )) }, n)) }) });
}, Sl = [
  {
    icon: Gs,
    title: "Straight Arrow Line",
    pointer: We.straight
  },
  {
    icon: Vs,
    title: "Elbow Arrow Line",
    pointer: We.elbow
  },
  {
    icon: Ys,
    title: "Curve Arrow Line",
    pointer: We.curve
  }
], Pl = ({ onPointerUp: e }) => {
  const t = J();
  return /* @__PURE__ */ a(de, { padding: 1, children: /* @__PURE__ */ a(ie.Row, { gap: 1, children: Sl.map((r, n) => /* @__PURE__ */ a(
    I,
    {
      className: T({ fillable: !1 }),
      type: "icon",
      size: "small",
      visible: !0,
      icon: r.icon,
      title: r.title,
      "aria-label": r.title,
      onPointerDown: () => {
        he(t, me.drawing), te.updatePointerType(t, r.pointer);
      },
      onPointerUp: () => {
        e(r.pointer);
      }
    },
    n
  )) }) });
};
function Ll({
  initialOpen: e = !1,
  placement: t = "bottom",
  modal: r,
  sideOffset: n,
  open: i,
  onOpenChange: o
} = {}) {
  const [s, l] = U.useState(e), [c, u] = U.useState(), [d, h] = U.useState(), f = i ?? s, m = o ?? l, w = Kt({
    placement: t,
    open: f,
    onOpenChange: m,
    whileElementsMounted: Ua,
    middleware: [
      Rr(n || 4),
      Ar({
        crossAxis: t.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5
      }),
      Ha({ padding: 5 })
    ]
  }), p = w.context, y = Ni(p, {
    enabled: i == null
  }), g = Ri(p), b = Ai(p), C = Bi([y, g, b]);
  return U.useMemo(
    () => ({
      open: f,
      setOpen: m,
      ...C,
      ...w,
      modal: r,
      labelId: c,
      descriptionId: d,
      setLabelId: u,
      setDescriptionId: h
    }),
    [f, m, C, w, r, c, d]
  );
}
const Qi = U.createContext(null), eo = () => {
  const e = U.useContext(Qi);
  if (e == null)
    throw new Error("Popover components must be wrapped in <Popover />");
  return e;
};
function Se({
  children: e,
  modal: t = !1,
  ...r
}) {
  const n = Ll({ modal: t, ...r });
  return /* @__PURE__ */ a(Qi.Provider, { value: n, children: e });
}
const Pe = U.forwardRef(function({ children: t, asChild: r = !1, ...n }, i) {
  const o = eo(), s = t.ref, l = Wt([o.refs.setReference, i, s]);
  return r && U.isValidElement(t) ? U.cloneElement(
    t,
    o.getReferenceProps({
      ref: l,
      ...n,
      ...t.props,
      "data-state": o.open ? "open" : "closed"
    })
  ) : /* @__PURE__ */ a(
    "button",
    {
      ref: l,
      type: "button",
      "data-state": o.open ? "open" : "closed",
      ...o.getReferenceProps(n),
      children: t
    }
  );
}), Le = U.forwardRef(function({ container: t, style: r, ...n }, i) {
  const { context: o, ...s } = eo(), l = Wt([s.refs.setFloating, i]);
  return o.open ? /* @__PURE__ */ a(Ii, { root: t, children: /* @__PURE__ */ a(Fi, { context: o, modal: s.modal, children: /* @__PURE__ */ a(
    "div",
    {
      ref: l,
      style: { ...s.floatingStyles, ...r },
      "aria-labelledby": s.labelId,
      "aria-describedby": s.descriptionId,
      ...s.getFloatingProps(n),
      children: n.children
    }
  ) }) }) : null;
});
var He = /* @__PURE__ */ ((e) => (e.mermaidToDrawnix = "mermaidToDrawnix", e.markdownToDrawnix = "markdownToDrawnix", e))(He || {});
const to = Fr(null), ke = () => {
  const e = bt(to);
  if (!e)
    throw new Error(
      "The `useDrawnix` hook must be used inside the <Drawnix> component's context."
    );
  return e;
}, Tl = () => {
  const { appState: e, setAppState: t } = ke();
  return (r) => {
    t({ ...e, pointer: r });
  };
}, qt = Ue.createContext({}), Er = (e = "", t = !1) => `menu-item menu-item-base ${e} ${t ? "menu-item--active" : ""}`.trim(), ro = (e, t) => {
  const r = bt(qt);
  return Ms(e, (n) => {
    var o;
    const i = new CustomEvent(rt.MENU_ITEM_SELECT, {
      bubbles: !0,
      cancelable: !0
    });
    t == null || t(i), i.defaultPrevented || (o = r.onSelect) == null || o.call(r, i);
  });
}, at = ({
  children: e,
  className: t = "",
  onSelect: r,
  style: n
}) => {
  const i = T(`menu ${t}`).trim();
  return /* @__PURE__ */ a(qt.Provider, { value: { onSelect: r }, children: /* @__PURE__ */ a("div", { className: i, style: n, "data-testid": "menu", children: /* @__PURE__ */ a(de, { className: "menu-container", padding: 2, children: e }) }) });
};
at.displayName = "Menu";
const no = ({
  icon: e,
  shortcut: t,
  children: r
}) => /* @__PURE__ */ k(be, { children: [
  e && /* @__PURE__ */ a("div", { className: "menu-item__icon", children: e }),
  /* @__PURE__ */ a("div", { className: "menu-item__text", children: r }),
  t && /* @__PURE__ */ a("div", { className: "menu-item__shortcut", children: t })
] }), ae = ({
  icon: e,
  onSelect: t,
  children: r,
  shortcut: n,
  className: i,
  selected: o,
  submenu: s,
  ...l
}) => {
  const [c, u] = M(!1), d = Oe(), h = ro(l.onClick, t), f = /* @__PURE__ */ a(no, { icon: e, shortcut: n, children: r }), m = () => {
    d.current && window.clearTimeout(d.current), u(!0);
  }, w = () => {
    d.current = window.setTimeout(() => {
      u(!1);
    }, 100);
  };
  return s ? /* @__PURE__ */ k(
    Se,
    {
      open: c,
      onOpenChange: u,
      placement: "right-start",
      children: [
        /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
          "button",
          {
            ...l,
            type: "button",
            className: Er(i, o || c),
            title: l.title ?? l["aria-label"],
            onClick: h,
            onMouseEnter: m,
            onMouseLeave: w,
            children: f
          }
        ) }),
        /* @__PURE__ */ a(Le, { onMouseEnter: m, onMouseLeave: w, children: s })
      ]
    }
  ) : /* @__PURE__ */ a(
    "button",
    {
      ...l,
      onClick: h,
      type: "button",
      className: Er(i, o),
      title: l.title ?? l["aria-label"],
      children: f
    }
  );
};
ae.displayName = "MenuItem";
const io = ({
  children: e
}) => /* @__PURE__ */ a(
  "div",
  {
    style: {
      display: "inline-flex",
      marginLeft: "auto",
      padding: "2px 4px",
      background: "var(--color-promo)",
      color: "var(--color-surface-lowest)",
      borderRadius: 6,
      fontSize: 9,
      fontFamily: "Cascadia, monospace"
    },
    children: e
  }
);
io.displayName = "MenuItemBadge";
ae.Badge = io;
const oo = () => {
  const { appState: e, setAppState: t } = ke(), { t: r } = Q();
  return /* @__PURE__ */ a(
    ae,
    {
      "data-testid": "marmaid-to-drawnix-button",
      onSelect: () => {
        t({
          ...e,
          openDialogType: He.mermaidToDrawnix
        });
      },
      icon: pl,
      "aria-label": r("extraTools.mermaidToDrawnix"),
      children: r("extraTools.mermaidToDrawnix")
    }
  );
};
oo.displayName = "MermaidToDrawnix";
const ao = () => {
  const { appState: e, setAppState: t } = ke(), { t: r } = Q();
  return /* @__PURE__ */ a(
    ae,
    {
      "data-testid": "markdown-to-drawnix-button",
      onSelect: () => {
        t({
          ...e,
          openDialogType: He.markdownToDrawnix
        });
      },
      icon: vl,
      "aria-label": r("extraTools.markdownToDrawnix"),
      children: r("extraTools.markdownToDrawnix")
    }
  );
};
ao.displayName = "MarkdownToDrawnix";
const Ml = () => {
  const e = J(), { t } = Q(), r = F.getBoardContainer(e), [n, i] = M(!1);
  return /* @__PURE__ */ k(
    Se,
    {
      sideOffset: 12,
      open: n,
      onOpenChange: (o) => {
        i(o);
      },
      placement: "bottom-start",
      children: [
        /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
          I,
          {
            type: "icon",
            visible: !0,
            selected: n,
            icon: $i,
            title: t("toolbar.extraTools"),
            "aria-label": t("toolbar.extraTools"),
            onPointerDown: () => {
              i(!n);
            }
          }
        ) }),
        /* @__PURE__ */ a(Le, { container: r, children: /* @__PURE__ */ k(
          at,
          {
            onSelect: () => {
              i(!1);
            },
            children: [
              /* @__PURE__ */ a(oo, {}),
              /* @__PURE__ */ a(ao, {})
            ]
          }
        ) })
      ]
    },
    0
  );
}, It = (e, t) => {
  const r = Te(e);
  _s(e, {
    elements: r.length > 0 ? r : void 0,
    fillStyle: t ? "transparent" : "white"
  }).then((n) => {
    if (n) {
      const i = t ? "png" : "jpg", o = Ds(n), s = `drawnix-${(/* @__PURE__ */ new Date()).getTime()}.${i}`;
      Is(o, s);
    }
  });
}, so = async (e) => {
  const t = await Ui({
    description: "Image",
    extensions: Object.keys(
      zr
    )
  });
  Nt(e, t);
}, Jt = (e) => e === Ce.hand || e === Ce.selection, mn = [
  {
    icon: Fs,
    pointer: Ce.hand,
    titleKey: "toolbar.hand"
  },
  {
    icon: Ns,
    pointer: Ce.selection,
    titleKey: "toolbar.selection"
  },
  {
    icon: Rs,
    pointer: kr.mind,
    titleKey: "toolbar.mind"
  },
  {
    icon: Bs,
    pointer: ce.text,
    titleKey: "toolbar.text"
  },
  {
    icon: Kr,
    pointer: ge.feltTipPen,
    titleKey: "toolbar.pen",
    key: "freehand"
    /* freehand */
  },
  {
    icon: js,
    titleKey: "toolbar.arrow",
    key: "arrow",
    pointer: We.straight
  },
  {
    icon: As,
    titleKey: "toolbar.shape",
    key: "shape",
    pointer: ce.rectangle
  },
  {
    icon: gl,
    titleKey: "toolbar.image",
    key: "image"
  },
  {
    icon: $i,
    titleKey: "toolbar.extraTools",
    key: "extra-tools"
  }
], Dl = (e) => Object.keys(We).includes(e.pointer), _l = (e) => Object.keys(ce).includes(e.pointer) || Object.keys(Si).includes(e.pointer), Il = () => {
  const e = J(), { appState: t } = ke(), { t: r } = Q(), n = Tl(), i = F.getBoardContainer(e), [o, s] = M(!1), [l, c] = M(!1), [u, d] = M(!1), [h, f] = M(
    mn.find(
      (g) => g.key === "freehand"
      /* freehand */
    )
  ), m = (g) => {
    he(e, me.dnd), te.updatePointerType(e, g), n(g);
  }, w = () => {
    he(e, me.drawing);
  }, p = (g) => F.isPointer(e, g.pointer) && !l && !u && !o, y = (g) => F.isInPointer(g, [
    ge.feltTipPen,
    ge.eraser
  ]);
  return /* @__PURE__ */ a(
    de,
    {
      padding: 1,
      className: T("draw-toolbar", Ne),
      children: /* @__PURE__ */ a(ie.Row, { gap: 1, children: mn.map((g, b) => t.isMobile && g.pointer === Ce.hand ? /* @__PURE__ */ a(be, {}) : g.key === "freehand" ? /* @__PURE__ */ k(
        Se,
        {
          open: o || y(e),
          sideOffset: 12,
          onOpenChange: (C) => {
            s(C);
          },
          children: [
            /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
              I,
              {
                type: "icon",
                visible: !0,
                selected: o || y(e),
                icon: h.icon,
                title: h.titleKey ? r(h.titleKey) : "Freehand",
                "aria-label": h.titleKey ? r(h.titleKey) : "Freehand",
                onPointerDown: () => {
                  s(!o), m(h.pointer);
                },
                onPointerUp: () => {
                  w();
                }
              }
            ) }),
            /* @__PURE__ */ a(Le, { container: i, children: /* @__PURE__ */ a(
              kl,
              {
                onPointerUp: (C) => {
                  n(C), f(
                    Ji.find((x) => x.pointer === C)
                  );
                }
              }
            ) })
          ]
        },
        b
      ) : g.key === "shape" ? /* @__PURE__ */ k(
        Se,
        {
          open: u,
          sideOffset: 12,
          onOpenChange: (C) => {
            d(C);
          },
          children: [
            /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
              I,
              {
                type: "icon",
                visible: !0,
                selected: u || _l(e) && !F.isPointer(e, ce.text),
                icon: g.icon,
                title: g.titleKey ? r(g.titleKey) : "Shape",
                "aria-label": g.titleKey ? r(g.titleKey) : "Shape",
                onPointerDown: () => {
                  d(!u);
                }
              }
            ) }),
            /* @__PURE__ */ a(Le, { container: i, children: /* @__PURE__ */ a(
              Ol,
              {
                onPointerUp: (C) => {
                  d(!1), n(C);
                }
              }
            ) })
          ]
        },
        b
      ) : g.key === "arrow" ? /* @__PURE__ */ k(
        Se,
        {
          open: l,
          sideOffset: 12,
          onOpenChange: (C) => {
            c(C);
          },
          children: [
            /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
              I,
              {
                type: "icon",
                visible: !0,
                selected: l || Dl(e),
                icon: g.icon,
                title: g.titleKey ? r(g.titleKey) : "",
                "aria-label": g.titleKey ? r(g.titleKey) : "",
                onPointerDown: () => {
                  c(!l);
                }
              }
            ) }),
            /* @__PURE__ */ a(Le, { container: i, children: /* @__PURE__ */ a(
              Pl,
              {
                onPointerUp: (C) => {
                  c(!1), n(C);
                }
              }
            ) })
          ]
        },
        b
      ) : g.key === "extra-tools" ? /* @__PURE__ */ a(Ml, {}, b) : /* @__PURE__ */ a(
        I,
        {
          type: "radio",
          icon: g.icon,
          checked: p(g),
          title: g.titleKey ? r(g.titleKey) : "",
          "aria-label": g.titleKey ? r(g.titleKey) : "",
          onPointerDown: () => {
            g.pointer && !Jt(g.pointer) && m(g.pointer);
          },
          onPointerUp: () => {
            g.pointer && !Jt(g.pointer) ? w() : g.pointer && Jt(g.pointer) && (te.updatePointerType(e, g.pointer), n(g.pointer)), g.key === "image" && so(e);
          }
        },
        b
      )) })
    }
  );
}, Fl = () => {
  var o;
  const e = J(), { t } = Q(), r = F.getBoardContainer(e), [n, i] = M(!1);
  return /* @__PURE__ */ a(
    de,
    {
      padding: 1,
      className: T("zoom-toolbar", Ne),
      children: /* @__PURE__ */ k(ie.Row, { gap: 1, children: [
        /* @__PURE__ */ a(
          I,
          {
            type: "button",
            icon: Qs,
            visible: !0,
            title: t("zoom.out"),
            "aria-label": t("zoom.out"),
            onPointerUp: () => {
              te.updateZoom(e, e.viewport.zoom - 0.1);
            },
            className: "zoom-out-button"
          },
          0
        ),
        /* @__PURE__ */ k(
          Se,
          {
            sideOffset: 12,
            open: n,
            onOpenChange: (s) => {
              i(s);
            },
            placement: "bottom-end",
            children: [
              /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ k(
                "div",
                {
                  title: t("zoom.fit"),
                  "aria-label": t("zoom.fit"),
                  className: T("zoom-menu-trigger", {
                    active: n
                  }),
                  onPointerUp: () => {
                    i(!n);
                  },
                  children: [
                    Number(((((o = e == null ? void 0 : e.viewport) == null ? void 0 : o.zoom) || 1) * 100).toFixed(0)),
                    "%"
                  ]
                },
                1
              ) }),
              /* @__PURE__ */ a(Le, { container: r, children: /* @__PURE__ */ k(
                at,
                {
                  onSelect: () => {
                    i(!1);
                  },
                  children: [
                    /* @__PURE__ */ a(
                      ae,
                      {
                        "data-testid": "open-button",
                        onSelect: () => {
                          te.fitViewport(e);
                        },
                        "aria-label": t("zoom.fit"),
                        shortcut: "Cmd+Shift+=",
                        children: t("zoom.fit")
                      }
                    ),
                    /* @__PURE__ */ a(
                      ae,
                      {
                        "data-testid": "open-button",
                        onSelect: () => {
                          te.updateZoom(e, 1);
                        },
                        "aria-label": t("zoom.100"),
                        shortcut: "Cmd+0",
                        children: t("zoom.100")
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ a(
          I,
          {
            type: "button",
            icon: el,
            visible: !0,
            title: t("zoom.in"),
            "aria-label": t("zoom.in"),
            onPointerUp: () => {
              te.updateZoom(e, e.viewport.zoom + 0.1);
            },
            className: "zoom-in-button"
          },
          2
        )
      ] })
    }
  );
}, lo = "TRANSPARENT", qr = "NO_COLOR", $r = "#FFFFFF", co = [
  { name: "Topic Color", value: qr },
  { name: "Basic Black", value: Ut },
  { name: "White", value: $r },
  { name: "Gray", value: "#808080" },
  { name: "Deep Blue", value: "#1E90FF" },
  { name: "Red", value: "#FF4500" },
  { name: "Green", value: "#2ECC71" },
  { name: "Yellow", value: "#FFD700" },
  { name: "Purple", value: "#8A2BE2" },
  { name: "Orange", value: "#FFA500" },
  { name: "Pastel Pink", value: "#FFB3BA" },
  { name: "Cyan", value: "#00CED1" },
  { name: "Brown", value: "#8B4513" },
  { name: "Forest Green", value: "#228B22" },
  { name: "Light Gray", value: "#D3D3D3" }
];
function Nl(e) {
  return Math.round((100 - e) / 100 * 255);
}
function Rl(e) {
  return Math.round((1 - e / 255) * 100);
}
function st(e, t) {
  const n = Nl(100 - t).toString(16).padStart(2, "0");
  return `${e}${n}`;
}
function lt(e) {
  e = e.replace(/^#/, "");
  let t;
  if (e.length === 8)
    t = parseInt(e.slice(6, 8), 16);
  else if (e.length === 4)
    t = parseInt(e.slice(3, 4).repeat(2), 16);
  else
    return 100;
  return 100 - Rl(t);
}
function Al(e) {
  return e !== "none";
}
function Ze(e) {
  const t = e.replace(/^#/, "").toUpperCase();
  return t.length === 8 ? "#" + t.slice(0, 6) : t.length === 4 ? "#" + t.slice(0, 3) : t.length === 6 || t.length === 3 ? "#" + t : e;
}
function gu(e) {
  return e === lo;
}
function uo(e) {
  return e === $r;
}
function fo(e) {
  return e === 0;
}
function xt(e) {
  return e === 100;
}
function Qe(e) {
  return e === qr;
}
function Bl(e) {
  return !e || e === Ut;
}
const zl = ({
  min: e = 0,
  max: t = 100,
  step: r = 1,
  defaultValue: n = 100,
  disabled: i = !1,
  onChange: o,
  beforeStart: s,
  afterEnd: l
}) => {
  const [c, u] = M(!1), [d, h] = M(n), f = Oe(0), m = Oe(null), w = Oe(null);
  ne(() => {
    if (m.current && w.current) {
      const b = m.current.getBoundingClientRect(), C = w.current.getBoundingClientRect();
      f.current = ra(
        C.width / 2 / b.width * 100
      );
    }
  }, [w, m]), ne(() => {
    h(n);
  }, [n]);
  const p = an(
    Ka(
      (b) => {
        if (m.current && w.current) {
          const C = m.current.getBoundingClientRect(), x = b.clientX - C.left;
          let O = Math.min(Math.max(x / C.width, 0), 1);
          O >= (100 - f.current) / 100 ? O = 1 : O <= f.current / 100 && (O = 0);
          const D = Math.round(O * (t - e) / r) * r + e;
          h(D), o && o(D);
        }
      },
      50,
      { leading: !0, trailing: !0 }
    ),
    [e, t, r, o]
  ), y = an(() => {
    const b = (x) => {
      u(!0), p(x);
    }, C = () => {
      document.removeEventListener("pointermove", b), document.removeEventListener("pointerup", C), l && l(), setTimeout(() => {
        u(!1);
      }, 0);
    };
    document.addEventListener("pointermove", b), document.addEventListener("pointerup", C);
  }, [p]);
  let g = (d - e) / (t - e) * 100;
  return g >= 100 - f.current && (g = 100 - f.current), g <= f.current && (g = f.current), /* @__PURE__ */ a("div", { className: T("slider-container", { disabled: i }), children: /* @__PURE__ */ k(
    "div",
    {
      ref: m,
      className: "slider-track",
      onClick: (b) => {
        i || c || p(b);
      },
      onPointerDown: (b) => {
        b.preventDefault(), !i && (s && s(), y());
      },
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: "slider-range",
            style: {
              width: `${g}%`
            }
          }
        ),
        /* @__PURE__ */ a(
          "div",
          {
            ref: w,
            className: "slider-thumb",
            style: {
              left: `${g}%`
            }
          }
        )
      ]
    }
  ) });
}, gn = Wr(co, 4), Zr = Ue.forwardRef((e, t) => {
  const r = J(), { currentColor: n, onColorChange: i, onOpacityChange: o } = e, [s, l] = M(
    n && Ze(n) || gn[0][0].value
  ), [c, u] = M(() => {
    const d = n && lt(n);
    return Ir(d) ? 100 : d;
  });
  return /* @__PURE__ */ k(ie.Col, { gap: 3, children: [
    /* @__PURE__ */ a(
      zl,
      {
        step: 5,
        defaultValue: c,
        onChange: (d) => {
          u(d), o(d);
        },
        beforeStart: () => {
          tn.set(r, !0), na.setSplittingOnce(r, !0);
        },
        afterEnd: () => {
          tn.set(r, !1);
        },
        disabled: s === co[0].value
      }
    ),
    /* @__PURE__ */ a(ie.Col, { gap: 2, children: gn.map((d, h) => /* @__PURE__ */ a(ie.Row, { gap: 2, children: d.map((f) => /* @__PURE__ */ k(
      "button",
      {
        className: `color-select-item ${s === f.value ? "active" : ""} ${Qe(f.value) ? "no-color" : ""}`,
        style: {
          backgroundColor: Qe(f.value) ? lo : f.value,
          color: Bl(f.value) ? $r : Ut
        },
        onClick: () => {
          l(f.value), f.value === qr && u(100), i(f.value);
        },
        title: f.name,
        children: [
          Qe(f.value) && il,
          s === f.value && ol
        ]
      },
      f.value
    )) }, h)) })
  ] });
}), ho = (e, t) => se.isMindElement(e, t) || X.isDrawElement(t) && Pi(t) || Nr(e, t), mo = (e, t) => {
  let r = t.fill;
  return r || (se.isMindElement(e, t) && (r = Ba(e, t)), (X.isDrawElement(t) || X.isCustomGeometryElement(e, t)) && (r = La(e, t))), r;
}, go = (e, t) => {
  let r = t.strokeColor;
  return r || (se.isMindElement(e, t) && (r = Mi(e, t)), (X.isDrawElement(t) || X.isCustomGeometryElement(e, t)) && (r = Li(e, t))), r;
}, pu = (e, t) => Br(t).color, jl = (e, t) => {
  ot.setFillColor(e, null, {
    getMemorizeKey: kt,
    callback: (r, n) => {
      if (!ho(e, r))
        return;
      const i = mo(e, r);
      if (!Al(i))
        return;
      const o = Ze(i), s = xt(t) ? o : st(o, t);
      Fe.setNode(e, { fill: s }, n);
    }
  });
}, Hl = (e, t) => {
  ot.setFillColor(e, null, {
    getMemorizeKey: kt,
    callback: (r, n) => {
      if (!ho(e, r))
        return;
      const i = mo(e, r), o = lt(i);
      Qe(t) ? Fe.setNode(e, { fill: null }, n) : Ir(o) || xt(o) ? Fe.setNode(e, { fill: t }, n) : Fe.setNode(
        e,
        { fill: st(t, o) },
        n
      );
    }
  });
}, Ul = (e, t) => {
  ot.setStrokeColor(e, null, {
    getMemorizeKey: kt,
    callback: (r, n) => {
      const i = go(e, r), o = Ze(i), s = xt(t) ? o : st(o, t);
      Fe.setNode(e, { strokeColor: s }, n);
    }
  });
}, Wl = (e, t) => {
  ot.setStrokeColor(e, null, {
    getMemorizeKey: kt,
    callback: (r, n) => {
      const i = go(e, r), o = lt(i);
      Qe(t) ? Fe.setNode(e, { strokeColor: null }, n) : Ir(o) || xt(o) ? Fe.setNode(e, { strokeColor: t }, n) : Fe.setNode(
        e,
        { strokeColor: st(t, o) },
        n
      );
    }
  });
}, Kl = (e, t, r) => {
  const n = lt(t);
  Qe(r) ? xr.setTextColor(e, null) : xr.setTextColor(
    e,
    st(r, n)
  );
}, ql = (e, t, r) => {
  const n = Ze(t), i = xt(r) ? n : st(n, r);
  xr.setTextColor(e, i);
}, $l = ({
  board: e,
  currentColor: t,
  fontColorIcon: r,
  title: n
}) => {
  const [i, o] = M(!1), s = F.getBoardContainer(e);
  return /* @__PURE__ */ k(
    Se,
    {
      sideOffset: 12,
      open: i,
      onOpenChange: (l) => {
        o(l);
      },
      placement: "top",
      children: [
        /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
          I,
          {
            className: T("property-button"),
            selected: i,
            visible: !0,
            icon: r,
            type: "button",
            title: n,
            "aria-label": n,
            onPointerUp: () => {
              o(!i);
            }
          }
        ) }),
        /* @__PURE__ */ a(Le, { container: s, children: /* @__PURE__ */ a(
          de,
          {
            padding: 4,
            className: T(`${Ne}`),
            children: /* @__PURE__ */ a(
              Zr,
              {
                onColorChange: (l) => {
                  Kl(
                    e,
                    t || l,
                    l
                  );
                },
                onOpacityChange: (l) => {
                  t && ql(e, t, l);
                },
                currentColor: t
              }
            )
          }
        ) })
      ]
    }
  );
}, Zl = ({
  board: e,
  currentColor: t,
  title: r,
  hasStrokeStyle: n,
  children: i
}) => {
  const [o, s] = M(!1), l = t && Ze(t), c = t ? lt(t) : 100, u = F.getBoardContainer(e), d = fo(c) ? al : uo(l) ? sl : void 0, h = (f) => {
    ot.setStrokeStyle(e, f, { getMemorizeKey: kt });
  };
  return /* @__PURE__ */ k(
    Se,
    {
      sideOffset: 12,
      open: o,
      onOpenChange: (f) => {
        s(f);
      },
      placement: "top",
      children: [
        /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
          I,
          {
            className: T("property-button"),
            visible: !0,
            icon: d,
            type: "button",
            title: r,
            "aria-label": r,
            onPointerUp: () => {
              s(!o);
            },
            children: !d && i
          }
        ) }),
        /* @__PURE__ */ a(Le, { container: u, children: /* @__PURE__ */ a(
          de,
          {
            padding: 4,
            className: T(
              `${Ne}`,
              "stroke-setting",
              { "has-stroke-style": n }
            ),
            children: /* @__PURE__ */ k(ie.Col, { children: [
              n && /* @__PURE__ */ k(ie.Row, { className: T("stroke-style-picker"), children: [
                /* @__PURE__ */ a(
                  I,
                  {
                    visible: !0,
                    icon: ll,
                    type: "button",
                    title: r,
                    "aria-label": r,
                    onPointerUp: () => {
                      h(Xt.solid);
                    }
                  }
                ),
                /* @__PURE__ */ a(
                  I,
                  {
                    visible: !0,
                    icon: cl,
                    type: "button",
                    title: r,
                    "aria-label": r,
                    onPointerUp: () => {
                      h(Xt.dashed);
                    }
                  }
                ),
                /* @__PURE__ */ a(
                  I,
                  {
                    visible: !0,
                    icon: ul,
                    type: "button",
                    title: r,
                    "aria-label": r,
                    onPointerUp: () => {
                      h(Xt.dotted);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ a(
                Zr,
                {
                  onColorChange: (f) => {
                    Wl(e, f);
                  },
                  onOpacityChange: (f) => {
                    Ul(e, f);
                  },
                  currentColor: t
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}, Gl = ({
  board: e,
  currentColor: t,
  title: r,
  children: n
}) => {
  const [i, o] = M(!1), s = t && Ze(t), l = t ? lt(t) : 100, c = F.getBoardContainer(e), u = !s || fo(l) ? nl : void 0;
  return /* @__PURE__ */ k(
    Se,
    {
      sideOffset: 12,
      open: i,
      onOpenChange: (d) => {
        o(d);
      },
      placement: "top",
      children: [
        /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
          I,
          {
            className: T("property-button"),
            visible: !0,
            icon: u,
            type: "button",
            title: r,
            "aria-label": r,
            onPointerUp: () => {
              o(!i);
            },
            children: !u && n
          }
        ) }),
        /* @__PURE__ */ a(Le, { container: c, children: /* @__PURE__ */ a(
          de,
          {
            padding: 4,
            className: T(`${Ne}`),
            children: /* @__PURE__ */ a(
              Zr,
              {
                onColorChange: (d) => {
                  Hl(e, d);
                },
                onOpacityChange: (d) => {
                  jl(e, d);
                },
                currentColor: t
              }
            )
          }
        ) })
      ]
    }
  );
};
var Qt, pn;
function Gr() {
  if (pn) return Qt;
  pn = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return Qt = e, Qt;
}
var er, vn;
function Vl() {
  if (vn) return er;
  vn = 1;
  var e = typeof Lt == "object" && Lt && Lt.Object === Object && Lt;
  return er = e, er;
}
var tr, wn;
function po() {
  if (wn) return tr;
  wn = 1;
  var e = Vl(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return tr = r, tr;
}
var rr, yn;
function Yl() {
  if (yn) return rr;
  yn = 1;
  var e = po(), t = function() {
    return e.Date.now();
  };
  return rr = t, rr;
}
var nr, Cn;
function Xl() {
  if (Cn) return nr;
  Cn = 1;
  var e = /\s/;
  function t(r) {
    for (var n = r.length; n-- && e.test(r.charAt(n)); )
      ;
    return n;
  }
  return nr = t, nr;
}
var ir, bn;
function Jl() {
  if (bn) return ir;
  bn = 1;
  var e = Xl(), t = /^\s+/;
  function r(n) {
    return n && n.slice(0, e(n) + 1).replace(t, "");
  }
  return ir = r, ir;
}
var or, kn;
function vo() {
  if (kn) return or;
  kn = 1;
  var e = po(), t = e.Symbol;
  return or = t, or;
}
var ar, xn;
function Ql() {
  if (xn) return ar;
  xn = 1;
  var e = vo(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
  function o(s) {
    var l = r.call(s, i), c = s[i];
    try {
      s[i] = void 0;
      var u = !0;
    } catch {
    }
    var d = n.call(s);
    return u && (l ? s[i] = c : delete s[i]), d;
  }
  return ar = o, ar;
}
var sr, En;
function ec() {
  if (En) return sr;
  En = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return sr = r, sr;
}
var lr, On;
function tc() {
  if (On) return lr;
  On = 1;
  var e = vo(), t = Ql(), r = ec(), n = "[object Null]", i = "[object Undefined]", o = e ? e.toStringTag : void 0;
  function s(l) {
    return l == null ? l === void 0 ? i : n : o && o in Object(l) ? t(l) : r(l);
  }
  return lr = s, lr;
}
var cr, Sn;
function rc() {
  if (Sn) return cr;
  Sn = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return cr = e, cr;
}
var ur, Pn;
function nc() {
  if (Pn) return ur;
  Pn = 1;
  var e = tc(), t = rc(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return ur = n, ur;
}
var dr, Ln;
function ic() {
  if (Ln) return dr;
  Ln = 1;
  var e = Jl(), t = Gr(), r = nc(), n = NaN, i = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, s = /^0o[0-7]+$/i, l = parseInt;
  function c(u) {
    if (typeof u == "number")
      return u;
    if (r(u))
      return n;
    if (t(u)) {
      var d = typeof u.valueOf == "function" ? u.valueOf() : u;
      u = t(d) ? d + "" : d;
    }
    if (typeof u != "string")
      return u === 0 ? u : +u;
    u = e(u);
    var h = o.test(u);
    return h || s.test(u) ? l(u.slice(2), h ? 2 : 8) : i.test(u) ? n : +u;
  }
  return dr = c, dr;
}
var fr, Tn;
function wo() {
  if (Tn) return fr;
  Tn = 1;
  var e = Gr(), t = Yl(), r = ic(), n = "Expected a function", i = Math.max, o = Math.min;
  function s(l, c, u) {
    var d, h, f, m, w, p, y = 0, g = !1, b = !1, C = !0;
    if (typeof l != "function")
      throw new TypeError(n);
    c = r(c) || 0, e(u) && (g = !!u.leading, b = "maxWait" in u, f = b ? i(r(u.maxWait) || 0, c) : f, C = "trailing" in u ? !!u.trailing : C);
    function x(R) {
      var fe = d, we = h;
      return d = h = void 0, y = R, m = l.apply(we, fe), m;
    }
    function O(R) {
      return y = R, w = setTimeout(_, c), g ? x(R) : m;
    }
    function D(R) {
      var fe = R - p, we = R - y, Be = c - fe;
      return b ? o(Be, f - we) : Be;
    }
    function $(R) {
      var fe = R - p, we = R - y;
      return p === void 0 || fe >= c || fe < 0 || b && we >= f;
    }
    function _() {
      var R = t();
      if ($(R))
        return V(R);
      w = setTimeout(_, D(R));
    }
    function V(R) {
      return w = void 0, C && d ? x(R) : (d = h = void 0, m);
    }
    function le() {
      w !== void 0 && clearTimeout(w), y = 0, d = p = h = w = void 0;
    }
    function ee() {
      return w === void 0 ? m : V(t());
    }
    function Z() {
      var R = t(), fe = $(R);
      if (d = arguments, h = this, p = R, fe) {
        if (w === void 0)
          return O(p);
        if (b)
          return clearTimeout(w), w = setTimeout(_, c), x(p);
      }
      return w === void 0 && (w = setTimeout(_, c)), m;
    }
    return Z.cancel = le, Z.flush = ee, Z;
  }
  return fr = s, fr;
}
wo();
var hr, Mn;
function oc() {
  if (Mn) return hr;
  Mn = 1;
  var e = wo(), t = Gr(), r = "Expected a function";
  function n(i, o, s) {
    var l = !0, c = !0;
    if (typeof i != "function")
      throw new TypeError(r);
    return t(s) && (l = "leading" in s ? !!s.leading : l, c = "trailing" in s ? !!s.trailing : c), e(i, o, {
      leading: l,
      maxWait: o,
      trailing: c
    });
  }
  return hr = n, hr;
}
oc();
var yo = Symbol.for("immer-nothing"), Dn = Symbol.for("immer-draftable"), pe = Symbol.for("immer-state"), ac = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function ue(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = ac[e], n = typeof r == "function" ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var nt = Object.getPrototypeOf;
function it(e) {
  return !!e && !!e[pe];
}
function qe(e) {
  var t;
  return e ? Co(e) || Array.isArray(e) || !!e[Dn] || !!((t = e.constructor) != null && t[Dn]) || Zt(e) || Gt(e) : !1;
}
var sc = Object.prototype.constructor.toString();
function Co(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = nt(e);
  if (t === null)
    return !0;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return r === Object ? !0 : typeof r == "function" && Function.toString.call(r) === sc;
}
function At(e, t) {
  $t(e) === 0 ? Reflect.ownKeys(e).forEach((r) => {
    t(r, e[r], e);
  }) : e.forEach((r, n) => t(n, r, e));
}
function $t(e) {
  const t = e[pe];
  return t ? t.type_ : Array.isArray(e) ? 1 : Zt(e) ? 2 : Gt(e) ? 3 : 0;
}
function Or(e, t) {
  return $t(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function bo(e, t, r) {
  const n = $t(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function lc(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Zt(e) {
  return e instanceof Map;
}
function Gt(e) {
  return e instanceof Set;
}
function je(e) {
  return e.copy_ || e.base_;
}
function Sr(e, t) {
  if (Zt(e))
    return new Map(e);
  if (Gt(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = Co(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[pe];
    let i = Reflect.ownKeys(n);
    for (let o = 0; o < i.length; o++) {
      const s = i[o], l = n[s];
      l.writable === !1 && (l.writable = !0, l.configurable = !0), (l.get || l.set) && (n[s] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: l.enumerable,
        value: e[s]
      });
    }
    return Object.create(nt(e), n);
  } else {
    const n = nt(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function Vr(e, t = !1) {
  return Vt(e) || it(e) || !qe(e) || ($t(e) > 1 && (e.set = e.add = e.clear = e.delete = cc), Object.freeze(e), t && Object.entries(e).forEach(([r, n]) => Vr(n, !0))), e;
}
function cc() {
  ue(2);
}
function Vt(e) {
  return Object.isFrozen(e);
}
var uc = {};
function $e(e) {
  const t = uc[e];
  return t || ue(0, e), t;
}
var mt;
function ko() {
  return mt;
}
function dc(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function _n(e, t) {
  t && ($e("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Pr(e) {
  Lr(e), e.drafts_.forEach(fc), e.drafts_ = null;
}
function Lr(e) {
  e === mt && (mt = e.parent_);
}
function In(e) {
  return mt = dc(mt, e);
}
function fc(e) {
  const t = e[pe];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Fn(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[pe].modified_ && (Pr(t), ue(4)), qe(e) && (e = Bt(t, e), t.parent_ || zt(t, e)), t.patches_ && $e("Patches").generateReplacementPatches_(
    r[pe].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Bt(t, r, []), Pr(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== yo ? e : void 0;
}
function Bt(e, t, r) {
  if (Vt(t))
    return t;
  const n = t[pe];
  if (!n)
    return At(
      t,
      (i, o) => Nn(e, n, t, i, o, r)
    ), t;
  if (n.scope_ !== e)
    return t;
  if (!n.modified_)
    return zt(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const i = n.copy_;
    let o = i, s = !1;
    n.type_ === 3 && (o = new Set(i), i.clear(), s = !0), At(
      o,
      (l, c) => Nn(e, n, i, l, c, r, s)
    ), zt(e, i, !1), r && e.patches_ && $e("Patches").generatePatches_(
      n,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return n.copy_;
}
function Nn(e, t, r, n, i, o, s) {
  if (process.env.NODE_ENV !== "production" && i === r && ue(5), it(i)) {
    const l = o && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Or(t.assigned_, n) ? o.concat(n) : void 0, c = Bt(e, i, l);
    if (bo(r, n, c), it(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else s && r.add(i);
  if (qe(i) && !Vt(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Bt(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && Object.prototype.propertyIsEnumerable.call(r, n) && zt(e, i);
  }
}
function zt(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Vr(t, r);
}
function hc(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : ko(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let i = n, o = Yr;
  r && (i = [n], o = gt);
  const { revoke: s, proxy: l } = Proxy.revocable(i, o);
  return n.draft_ = l, n.revoke_ = s, l;
}
var Yr = {
  get(e, t) {
    if (t === pe)
      return e;
    const r = je(e);
    if (!Or(r, t))
      return mc(e, r, t);
    const n = r[t];
    return e.finalized_ || !qe(n) ? n : n === mr(e.base_, t) ? (gr(e), e.copy_[t] = Mr(n, e)) : n;
  },
  has(e, t) {
    return t in je(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(je(e));
  },
  set(e, t, r) {
    const n = xo(je(e), t);
    if (n != null && n.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = mr(je(e), t), o = i == null ? void 0 : i[pe];
      if (o && o.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (lc(r, i) && (r !== void 0 || Or(e.base_, t)))
        return !0;
      gr(e), Tr(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return mr(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, gr(e), Tr(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = je(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    ue(11);
  },
  getPrototypeOf(e) {
    return nt(e.base_);
  },
  setPrototypeOf() {
    ue(12);
  }
}, gt = {};
At(Yr, (e, t) => {
  gt[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
gt.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ue(13), gt.set.call(this, e, t, void 0);
};
gt.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && ue(14), Yr.set.call(this, e[0], t, r, e[0]);
};
function mr(e, t) {
  const r = e[pe];
  return (r ? je(r) : e)[t];
}
function mc(e, t, r) {
  var i;
  const n = xo(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = n.get) == null ? void 0 : i.call(e.draft_)
  ) : void 0;
}
function xo(e, t) {
  if (!(t in e))
    return;
  let r = nt(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = nt(r);
  }
}
function Tr(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Tr(e.parent_));
}
function gr(e) {
  e.copy_ || (e.copy_ = Sr(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var gc = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const o = r;
        r = t;
        const s = this;
        return function(c = o, ...u) {
          return s.produce(c, (d) => r.call(this, d, ...u));
        };
      }
      typeof r != "function" && ue(6), n !== void 0 && typeof n != "function" && ue(7);
      let i;
      if (qe(t)) {
        const o = In(this), s = Mr(t, void 0);
        let l = !0;
        try {
          i = r(s), l = !1;
        } finally {
          l ? Pr(o) : Lr(o);
        }
        return _n(o, n), Fn(i, o);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === yo && (i = void 0), this.autoFreeze_ && Vr(i, !0), n) {
          const o = [], s = [];
          $e("Patches").generateReplacementPatches_(t, i, o, s), n(o, s);
        }
        return i;
      } else
        ue(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (s, ...l) => this.produceWithPatches(s, (c) => t(c, ...l));
      let n, i;
      return [this.produce(t, r, (s, l) => {
        n = s, i = l;
      }), n, i];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    qe(e) || ue(8), it(e) && (e = pc(e));
    const t = In(this), r = Mr(e, void 0);
    return r[pe].isManual_ = !0, Lr(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[pe];
    (!r || !r.isManual_) && ue(9);
    const { scope_: n } = r;
    return _n(n, t), Fn(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = $e("Patches").applyPatches_;
    return it(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function Mr(e, t) {
  const r = Zt(e) ? $e("MapSet").proxyMap_(e, t) : Gt(e) ? $e("MapSet").proxySet_(e, t) : hc(e, t);
  return (t ? t.scope_ : ko()).drafts_.push(r), r;
}
function pc(e) {
  return it(e) || ue(10, e), Eo(e);
}
function Eo(e) {
  if (!qe(e) || Vt(e))
    return e;
  const t = e[pe];
  let r;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = Sr(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    r = Sr(e, !0);
  return At(r, (n, i) => {
    bo(r, n, Eo(i));
  }), t && (t.finalized_ = !1), r;
}
var ve = new gc(), vc = ve.produce;
ve.produceWithPatches.bind(
  ve
);
ve.setAutoFreeze.bind(ve);
ve.setUseStrictShallowCopy.bind(ve);
ve.applyPatches.bind(ve);
ve.createDraft.bind(ve);
ve.finishDraft.bind(ve);
var v = {
  ancestors(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, {
      reverse: r = !1
    } = t, n = v.levels(e, t);
    return r ? n = n.slice(1) : n = n.slice(0, -1), n;
  },
  common(e, t) {
    for (var r = [], n = 0; n < e.length && n < t.length; n++) {
      var i = e[n], o = t[n];
      if (i !== o)
        break;
      r.push(i);
    }
    return r;
  },
  compare(e, t) {
    for (var r = Math.min(e.length, t.length), n = 0; n < r; n++) {
      if (e[n] < t[n]) return -1;
      if (e[n] > t[n]) return 1;
    }
    return 0;
  },
  endsAfter(e, t) {
    var r = e.length - 1, n = e.slice(0, r), i = t.slice(0, r), o = e[r], s = t[r];
    return v.equals(n, i) && o > s;
  },
  endsAt(e, t) {
    var r = e.length, n = e.slice(0, r), i = t.slice(0, r);
    return v.equals(n, i);
  },
  endsBefore(e, t) {
    var r = e.length - 1, n = e.slice(0, r), i = t.slice(0, r), o = e[r], s = t[r];
    return v.equals(n, i) && o < s;
  },
  equals(e, t) {
    return e.length === t.length && e.every((r, n) => r === t[n]);
  },
  hasPrevious(e) {
    return e[e.length - 1] > 0;
  },
  isAfter(e, t) {
    return v.compare(e, t) === 1;
  },
  isAncestor(e, t) {
    return e.length < t.length && v.compare(e, t) === 0;
  },
  isBefore(e, t) {
    return v.compare(e, t) === -1;
  },
  isChild(e, t) {
    return e.length === t.length + 1 && v.compare(e, t) === 0;
  },
  isCommon(e, t) {
    return e.length <= t.length && v.compare(e, t) === 0;
  },
  isDescendant(e, t) {
    return e.length > t.length && v.compare(e, t) === 0;
  },
  isParent(e, t) {
    return e.length + 1 === t.length && v.compare(e, t) === 0;
  },
  isPath(e) {
    return Array.isArray(e) && (e.length === 0 || typeof e[0] == "number");
  },
  isSibling(e, t) {
    if (e.length !== t.length)
      return !1;
    var r = e.slice(0, -1), n = t.slice(0, -1), i = e[e.length - 1], o = t[t.length - 1];
    return i !== o && v.equals(r, n);
  },
  levels(e) {
    for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, {
      reverse: r = !1
    } = t, n = [], i = 0; i <= e.length; i++)
      n.push(e.slice(0, i));
    return r && n.reverse(), n;
  },
  next(e) {
    if (e.length === 0)
      throw new Error("Cannot get the next path of a root path [".concat(e, "], because it has no next index."));
    var t = e[e.length - 1];
    return e.slice(0, -1).concat(t + 1);
  },
  operationCanTransformPath(e) {
    switch (e.type) {
      case "insert_node":
      case "remove_node":
      case "merge_node":
      case "split_node":
      case "move_node":
        return !0;
      default:
        return !1;
    }
  },
  parent(e) {
    if (e.length === 0)
      throw new Error("Cannot get the parent path of the root path [".concat(e, "]."));
    return e.slice(0, -1);
  },
  previous(e) {
    if (e.length === 0)
      throw new Error("Cannot get the previous path of a root path [".concat(e, "], because it has no previous index."));
    var t = e[e.length - 1];
    if (t <= 0)
      throw new Error("Cannot get the previous path of a first child path [".concat(e, "] because it would result in a negative index."));
    return e.slice(0, -1).concat(t - 1);
  },
  relative(e, t) {
    if (!v.isAncestor(t, e) && !v.equals(e, t))
      throw new Error("Cannot get the relative path of [".concat(e, "] inside ancestor [").concat(t, "], because it is not above or equal to the path."));
    return e.slice(t.length);
  },
  transform(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!e) return null;
    var n = [...e], {
      affinity: i = "forward"
    } = r;
    if (e.length === 0)
      return n;
    switch (t.type) {
      case "insert_node": {
        var {
          path: o
        } = t;
        (v.equals(o, n) || v.endsBefore(o, n) || v.isAncestor(o, n)) && (n[o.length - 1] += 1);
        break;
      }
      case "remove_node": {
        var {
          path: s
        } = t;
        if (v.equals(s, n) || v.isAncestor(s, n))
          return null;
        v.endsBefore(s, n) && (n[s.length - 1] -= 1);
        break;
      }
      case "merge_node": {
        var {
          path: l,
          position: c
        } = t;
        v.equals(l, n) || v.endsBefore(l, n) ? n[l.length - 1] -= 1 : v.isAncestor(l, n) && (n[l.length - 1] -= 1, n[l.length] += c);
        break;
      }
      case "split_node": {
        var {
          path: u,
          position: d
        } = t;
        if (v.equals(u, n)) {
          if (i === "forward")
            n[n.length - 1] += 1;
          else if (i !== "backward") return null;
        } else v.endsBefore(u, n) ? n[u.length - 1] += 1 : v.isAncestor(u, n) && e[u.length] >= d && (n[u.length - 1] += 1, n[u.length] -= d);
        break;
      }
      case "move_node": {
        var {
          path: h,
          newPath: f
        } = t;
        if (v.equals(h, f))
          return n;
        if (v.isAncestor(h, n) || v.equals(h, n)) {
          var m = f.slice();
          return v.endsBefore(h, f) && h.length < f.length && (m[h.length - 1] -= 1), m.concat(n.slice(h.length));
        } else v.isSibling(h, f) && (v.isAncestor(f, n) || v.equals(f, n)) ? v.endsBefore(h, n) ? n[h.length - 1] -= 1 : n[h.length - 1] += 1 : v.endsBefore(f, n) || v.equals(f, n) || v.isAncestor(f, n) ? (v.endsBefore(h, n) && (n[h.length - 1] -= 1), n[f.length - 1] += 1) : v.endsBefore(h, n) && (v.equals(f, n) && (n[f.length - 1] += 1), n[h.length - 1] -= 1);
        break;
      }
    }
    return n;
  }
};
function pt(e) {
  "@babel/helpers - typeof";
  return pt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pt(e);
}
function wc(e, t) {
  if (pt(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (pt(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yc(e) {
  var t = wc(e, "string");
  return pt(t) === "symbol" ? t : String(t);
}
function ct(e, t, r) {
  return t = yc(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Rn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function H(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rn(Object(r), !0).forEach(function(n) {
      ct(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var An = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++)
    i[o - 2] = arguments[o];
  return [...t.slice(0, r), ...i, ...t.slice(r)];
}, vt = function(t, r, n) {
  for (var i = arguments.length, o = new Array(i > 3 ? i - 3 : 0), s = 3; s < i; s++)
    o[s - 3] = arguments[s];
  return [...t.slice(0, r), ...o, ...t.slice(r + n)];
}, Bn = vt, Xr = (e, t, r) => {
  if (t.length === 0)
    throw new Error("Cannot modify the editor");
  for (var n = L.get(e, t), i = t.slice(), o = r(n); i.length > 1; ) {
    var s = i.pop(), l = L.get(e, i);
    o = H(H({}, l), {}, {
      children: vt(l.children, s, 1, o)
    });
  }
  var c = i.pop();
  e.children = vt(e.children, c, 1, o);
}, Xe = (e, t, r) => {
  t.length === 0 ? e.children = r(e.children) : Xr(e, t, (n) => {
    if (q.isText(n))
      throw new Error("Cannot get the element at path [".concat(t, "] because it refers to a leaf node: ").concat(oe.stringify(n)));
    return H(H({}, n), {}, {
      children: r(n.children)
    });
  });
}, zn = (e, t, r) => Xr(e, t, (n) => {
  if (!q.isText(n))
    throw new Error("Cannot get the leaf node at path [".concat(t, "] because it refers to a non-leaf node: ").concat(oe.stringify(n)));
  return r(n);
}), Cc = {
  transform(e, t) {
    var r = !1;
    switch (t.type) {
      case "insert_node": {
        var {
          path: n,
          node: i
        } = t;
        Xe(e, v.parent(n), (B) => {
          var z = n[n.length - 1];
          if (z > B.length)
            throw new Error('Cannot apply an "insert_node" operation at path ['.concat(n, "] because the destination is past the end of the node."));
          return An(B, z, i);
        }), r = !0;
        break;
      }
      case "insert_text": {
        var {
          path: o,
          offset: s,
          text: l
        } = t;
        if (l.length === 0) break;
        zn(e, o, (B) => {
          var z = B.text.slice(0, s), G = B.text.slice(s);
          return H(H({}, B), {}, {
            text: z + l + G
          });
        }), r = !0;
        break;
      }
      case "merge_node": {
        var {
          path: c
        } = t, u = c[c.length - 1], d = v.previous(c), h = d[d.length - 1];
        Xe(e, v.parent(c), (B) => {
          var z = B[u], G = B[h], Me;
          if (q.isText(z) && q.isText(G))
            Me = H(H({}, G), {}, {
              text: G.text + z.text
            });
          else if (!q.isText(z) && !q.isText(G))
            Me = H(H({}, G), {}, {
              children: G.children.concat(z.children)
            });
          else
            throw new Error('Cannot apply a "merge_node" operation at path ['.concat(c, "] to nodes of different interfaces: ").concat(oe.stringify(z), " ").concat(oe.stringify(G)));
          return vt(B, h, 2, Me);
        }), r = !0;
        break;
      }
      case "move_node": {
        var {
          path: f,
          newPath: m
        } = t, w = f[f.length - 1];
        if (v.isAncestor(f, m))
          throw new Error("Cannot move a path [".concat(f, "] to new path [").concat(m, "] because the destination is inside itself."));
        var p = L.get(e, f);
        Xe(e, v.parent(f), (B) => Bn(B, w, 1));
        var y = v.transform(f, t), g = y[y.length - 1];
        Xe(e, v.parent(y), (B) => An(B, g, p)), r = !0;
        break;
      }
      case "remove_node": {
        var {
          path: b
        } = t, C = b[b.length - 1];
        if (Xe(e, v.parent(b), (B) => Bn(B, C, 1)), e.selection) {
          var x = H({}, e.selection);
          for (var [O, D] of P.points(x)) {
            var $ = Y.transform(O, t);
            if (x != null && $ != null)
              x[D] = $;
            else {
              var _ = void 0, V = void 0;
              for (var [le, ee] of L.texts(e))
                if (v.compare(ee, b) === -1)
                  _ = [le, ee];
                else {
                  V = [le, ee];
                  break;
                }
              var Z = !1;
              _ && V && (v.equals(V[1], b) ? Z = !v.hasPrevious(V[1]) : Z = v.common(_[1], b).length < v.common(V[1], b).length), _ && !Z ? x[D] = {
                path: _[1],
                offset: _[0].text.length
              } : V ? x[D] = {
                path: V[1],
                offset: 0
              } : x = null;
            }
          }
          e.selection = x;
        }
        break;
      }
      case "remove_text": {
        var {
          path: R,
          offset: fe,
          text: we
        } = t;
        if (we.length === 0) break;
        zn(e, R, (B) => {
          var z = B.text.slice(0, fe), G = B.text.slice(fe + we.length);
          return H(H({}, B), {}, {
            text: z + G
          });
        }), r = !0;
        break;
      }
      case "set_node": {
        var {
          path: Be,
          properties: Ge,
          newProperties: ut
        } = t;
        if (Be.length === 0)
          throw new Error("Cannot set properties on the root node!");
        Xr(e, Be, (B) => {
          var z = H({}, B);
          for (var G in ut) {
            if (G === "children" || G === "text")
              throw new Error('Cannot set the "'.concat(G, '" property of nodes!'));
            var Me = ut[G];
            Me == null ? delete z[G] : z[G] = Me;
          }
          for (var Pt in Ge)
            ut.hasOwnProperty(Pt) || delete z[Pt];
          return z;
        });
        break;
      }
      case "set_selection": {
        var {
          newProperties: Re
        } = t;
        if (Re == null) {
          e.selection = null;
          break;
        }
        if (e.selection == null) {
          if (!P.isRange(Re))
            throw new Error('Cannot apply an incomplete "set_selection" operation properties '.concat(oe.stringify(Re), " when there is no current selection."));
          e.selection = H({}, Re);
          break;
        }
        var Ve = H({}, e.selection);
        for (var Ae in Re) {
          var Ot = Re[Ae];
          if (Ot == null) {
            if (Ae === "anchor" || Ae === "focus")
              throw new Error('Cannot remove the "'.concat(Ae, '" selection property'));
            delete Ve[Ae];
          } else
            Ve[Ae] = Ot;
        }
        e.selection = Ve;
        break;
      }
      case "split_node": {
        var {
          path: A,
          position: St,
          properties: Qr
        } = t, en = A[A.length - 1];
        if (A.length === 0)
          throw new Error('Cannot apply a "split_node" operation at path ['.concat(A, "] because the root node cannot be split."));
        Xe(e, v.parent(A), (B) => {
          var z = B[en], G, Me;
          if (q.isText(z)) {
            var Pt = z.text.slice(0, St), Yo = z.text.slice(St);
            G = H(H({}, z), {}, {
              text: Pt
            }), Me = H(H({}, Qr), {}, {
              text: Yo
            });
          } else {
            var Xo = z.children.slice(0, St), Jo = z.children.slice(St);
            G = H(H({}, z), {}, {
              children: Xo
            }), Me = H(H({}, Qr), {}, {
              children: Jo
            });
          }
          return vt(B, en, 1, G, Me);
        }), r = !0;
        break;
      }
    }
    if (r && e.selection) {
      var Yt = H({}, e.selection);
      for (var [Go, Vo] of P.points(Yt))
        Yt[Vo] = Y.transform(Go, t);
      e.selection = Yt;
    }
  }
}, bc = {
  insertNodes(e, t, r) {
    e.insertNodes(t, r);
  },
  liftNodes(e, t) {
    e.liftNodes(t);
  },
  mergeNodes(e, t) {
    e.mergeNodes(t);
  },
  moveNodes(e, t) {
    e.moveNodes(t);
  },
  removeNodes(e, t) {
    e.removeNodes(t);
  },
  setNodes(e, t, r) {
    e.setNodes(t, r);
  },
  splitNodes(e, t) {
    e.splitNodes(t);
  },
  unsetNodes(e, t, r) {
    e.unsetNodes(t, r);
  },
  unwrapNodes(e, t) {
    e.unwrapNodes(t);
  },
  wrapNodes(e, t, r) {
    e.wrapNodes(t, r);
  }
}, kc = {
  collapse(e, t) {
    e.collapse(t);
  },
  deselect(e) {
    e.deselect();
  },
  move(e, t) {
    e.move(t);
  },
  select(e, t) {
    e.select(t);
  },
  setPoint(e, t, r) {
    e.setPoint(t, r);
  },
  setSelection(e, t) {
    e.setSelection(t);
  }
}, re = (e) => typeof e == "object" && e !== null, Oo = (e, t) => {
  for (var r in e) {
    var n = e[r], i = t[r];
    if (Array.isArray(n) && Array.isArray(i)) {
      if (n.length !== i.length) return !1;
      for (var o = 0; o < n.length; o++)
        if (n[o] !== i[o]) return !1;
    } else if (re(n) && re(i)) {
      if (!Oo(n, i)) return !1;
    } else if (n !== i)
      return !1;
  }
  for (var s in t)
    if (e[s] === void 0 && t[s] !== void 0)
      return !1;
  return !0;
};
function xc(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), i, o;
  for (o = 0; o < n.length; o++)
    i = n[o], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function wt(e, t) {
  if (e == null) return {};
  var r = xc(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      n = o[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
var Ec = ["anchor", "focus"];
function jn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jn(Object(r), !0).forEach(function(n) {
      ct(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var P = {
  edges(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, {
      reverse: r = !1
    } = t, {
      anchor: n,
      focus: i
    } = e;
    return P.isBackward(e) === r ? [n, i] : [i, n];
  },
  end(e) {
    var [, t] = P.edges(e);
    return t;
  },
  equals(e, t) {
    return Y.equals(e.anchor, t.anchor) && Y.equals(e.focus, t.focus);
  },
  surrounds(e, t) {
    var r = P.intersection(e, t);
    return r ? P.equals(r, t) : !1;
  },
  includes(e, t) {
    if (P.isRange(t)) {
      if (P.includes(e, t.anchor) || P.includes(e, t.focus))
        return !0;
      var [r, n] = P.edges(e), [i, o] = P.edges(t);
      return Y.isBefore(r, i) && Y.isAfter(n, o);
    }
    var [s, l] = P.edges(e), c = !1, u = !1;
    return Y.isPoint(t) ? (c = Y.compare(t, s) >= 0, u = Y.compare(t, l) <= 0) : (c = v.compare(t, s.path) >= 0, u = v.compare(t, l.path) <= 0), c && u;
  },
  intersection(e, t) {
    var r = wt(e, Ec), [n, i] = P.edges(e), [o, s] = P.edges(t), l = Y.isBefore(n, o) ? o : n, c = Y.isBefore(i, s) ? i : s;
    return Y.isBefore(c, l) ? null : Oc({
      anchor: l,
      focus: c
    }, r);
  },
  isBackward(e) {
    var {
      anchor: t,
      focus: r
    } = e;
    return Y.isAfter(t, r);
  },
  isCollapsed(e) {
    var {
      anchor: t,
      focus: r
    } = e;
    return Y.equals(t, r);
  },
  isExpanded(e) {
    return !P.isCollapsed(e);
  },
  isForward(e) {
    return !P.isBackward(e);
  },
  isRange(e) {
    return re(e) && Y.isPoint(e.anchor) && Y.isPoint(e.focus);
  },
  *points(e) {
    yield [e.anchor, "anchor"], yield [e.focus, "focus"];
  },
  start(e) {
    var [t] = P.edges(e);
    return t;
  },
  transform(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (e === null)
      return null;
    var {
      affinity: n = "inward"
    } = r, i, o;
    if (n === "inward") {
      var s = P.isCollapsed(e);
      P.isForward(e) ? (i = "forward", o = s ? i : "backward") : (i = "backward", o = s ? i : "forward");
    } else n === "outward" ? P.isForward(e) ? (i = "backward", o = "forward") : (i = "forward", o = "backward") : (i = n, o = n);
    var l = Y.transform(e.anchor, t, {
      affinity: i
    }), c = Y.transform(e.focus, t, {
      affinity: o
    });
    return !l || !c ? null : {
      anchor: l,
      focus: c
    };
  }
}, Hn = function(t) {
  var {
    deep: r = !1
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!re(t)) return !1;
  var n = typeof t.apply == "function";
  if (n) return !1;
  var i = r ? L.isNodeList(t.children) : Array.isArray(t.children);
  return i;
}, Ie = {
  isAncestor(e) {
    var {
      deep: t = !1
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return re(e) && L.isNodeList(e.children, {
      deep: t
    });
  },
  isElement: Hn,
  isElementList(e) {
    var {
      deep: t = !1
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Array.isArray(e) && e.every((r) => Ie.isElement(r, {
      deep: t
    }));
  },
  isElementProps(e) {
    return e.children !== void 0;
  },
  isElementType: function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "type";
    return Hn(t) && t[n] === r;
  },
  matches(e, t) {
    for (var r in t)
      if (r !== "children" && e[r] !== t[r])
        return !1;
    return !0;
  }
}, Sc = ["children"], Pc = ["text"], L = {
  ancestor(e, t) {
    var r = L.get(e, t);
    if (q.isText(r))
      throw new Error("Cannot get the ancestor node at path [".concat(t, "] because it refers to a text node instead: ").concat(oe.stringify(r)));
    return r;
  },
  ancestors(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return function* () {
      for (var n of v.ancestors(t, r)) {
        var i = L.ancestor(e, n), o = [i, n];
        yield o;
      }
    }();
  },
  child(e, t) {
    if (q.isText(e))
      throw new Error("Cannot get the child of a text node: ".concat(oe.stringify(e)));
    var r = e.children[t];
    if (r == null)
      throw new Error("Cannot get child at index `".concat(t, "` in node: ").concat(oe.stringify(e)));
    return r;
  },
  children(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return function* () {
      for (var {
        reverse: n = !1
      } = r, i = L.ancestor(e, t), {
        children: o
      } = i, s = n ? o.length - 1 : 0; n ? s >= 0 : s < o.length; ) {
        var l = L.child(i, s), c = t.concat(s);
        yield [l, c], s = n ? s - 1 : s + 1;
      }
    }();
  },
  common(e, t, r) {
    var n = v.common(t, r), i = L.get(e, n);
    return [i, n];
  },
  descendant(e, t) {
    var r = L.get(e, t);
    if (N.isEditor(r))
      throw new Error("Cannot get the descendant node at path [".concat(t, "] because it refers to the root editor node instead: ").concat(oe.stringify(r)));
    return r;
  },
  descendants(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return function* () {
      for (var [r, n] of L.nodes(e, t))
        n.length !== 0 && (yield [r, n]);
    }();
  },
  elements(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return function* () {
      for (var [r, n] of L.nodes(e, t))
        Ie.isElement(r) && (yield [r, n]);
    }();
  },
  extractProps(e) {
    if (Ie.isAncestor(e)) {
      var t = wt(e, Sc);
      return t;
    } else {
      var t = wt(e, Pc);
      return t;
    }
  },
  first(e, t) {
    for (var r = t.slice(), n = L.get(e, r); n && !(q.isText(n) || n.children.length === 0); )
      n = n.children[0], r.push(0);
    return [n, r];
  },
  fragment(e, t) {
    if (q.isText(e))
      throw new Error("Cannot get a fragment starting from a root text node: ".concat(oe.stringify(e)));
    var r = vc({
      children: e.children
    }, (n) => {
      var [i, o] = P.edges(t), s = L.nodes(n, {
        reverse: !0,
        pass: (f) => {
          var [, m] = f;
          return !P.includes(t, m);
        }
      });
      for (var [, l] of s) {
        if (!P.includes(t, l)) {
          var c = L.parent(n, l), u = l[l.length - 1];
          c.children.splice(u, 1);
        }
        if (v.equals(l, o.path)) {
          var d = L.leaf(n, l);
          d.text = d.text.slice(0, o.offset);
        }
        if (v.equals(l, i.path)) {
          var h = L.leaf(n, l);
          h.text = h.text.slice(i.offset);
        }
      }
      N.isEditor(n) && (n.selection = null);
    });
    return r.children;
  },
  get(e, t) {
    var r = L.getIf(e, t);
    if (r === void 0)
      throw new Error("Cannot find a descendant at path [".concat(t, "] in node: ").concat(oe.stringify(e)));
    return r;
  },
  getIf(e, t) {
    for (var r = e, n = 0; n < t.length; n++) {
      var i = t[n];
      if (q.isText(r) || !r.children[i])
        return;
      r = r.children[i];
    }
    return r;
  },
  has(e, t) {
    for (var r = e, n = 0; n < t.length; n++) {
      var i = t[n];
      if (q.isText(r) || !r.children[i])
        return !1;
      r = r.children[i];
    }
    return !0;
  },
  isNode(e) {
    var {
      deep: t = !1
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return q.isText(e) || Ie.isElement(e, {
      deep: t
    }) || N.isEditor(e, {
      deep: t
    });
  },
  isNodeList(e) {
    var {
      deep: t = !1
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Array.isArray(e) && e.every((r) => L.isNode(r, {
      deep: t
    }));
  },
  last(e, t) {
    for (var r = t.slice(), n = L.get(e, r); n && !(q.isText(n) || n.children.length === 0); ) {
      var i = n.children.length - 1;
      n = n.children[i], r.push(i);
    }
    return [n, r];
  },
  leaf(e, t) {
    var r = L.get(e, t);
    if (!q.isText(r))
      throw new Error("Cannot get the leaf node at path [".concat(t, "] because it refers to a non-leaf node: ").concat(oe.stringify(r)));
    return r;
  },
  levels(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return function* () {
      for (var n of v.levels(t, r)) {
        var i = L.get(e, n);
        yield [i, n];
      }
    }();
  },
  matches(e, t) {
    return Ie.isElement(e) && Ie.isElementProps(t) && Ie.matches(e, t) || q.isText(e) && q.isTextProps(t) && q.matches(e, t);
  },
  nodes(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return function* () {
      for (var {
        pass: r,
        reverse: n = !1
      } = t, {
        from: i = [],
        to: o
      } = t, s = /* @__PURE__ */ new Set(), l = [], c = e; !(o && (n ? v.isBefore(l, o) : v.isAfter(l, o))); ) {
        if (s.has(c) || (yield [c, l]), !s.has(c) && !q.isText(c) && c.children.length !== 0 && (r == null || r([c, l]) === !1)) {
          s.add(c);
          var u = n ? c.children.length - 1 : 0;
          v.isAncestor(l, i) && (u = i[l.length]), l = l.concat(u), c = L.get(e, l);
          continue;
        }
        if (l.length === 0)
          break;
        if (!n) {
          var d = v.next(l);
          if (L.has(e, d)) {
            l = d, c = L.get(e, l);
            continue;
          }
        }
        if (n && l[l.length - 1] !== 0) {
          var h = v.previous(l);
          l = h, c = L.get(e, l);
          continue;
        }
        l = v.parent(l), c = L.get(e, l), s.add(c);
      }
    }();
  },
  parent(e, t) {
    var r = v.parent(t), n = L.get(e, r);
    if (q.isText(n))
      throw new Error("Cannot get the parent of path [".concat(t, "] because it does not exist in the root."));
    return n;
  },
  string(e) {
    return q.isText(e) ? e.text : e.children.map(L.string).join("");
  },
  texts(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return function* () {
      for (var [r, n] of L.nodes(e, t))
        q.isText(r) && (yield [r, n]);
    }();
  }
};
function Un(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function W(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Un(Object(r), !0).forEach(function(n) {
      ct(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Un(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var dt = {
  isNodeOperation(e) {
    return dt.isOperation(e) && e.type.endsWith("_node");
  },
  isOperation(e) {
    if (!re(e))
      return !1;
    switch (e.type) {
      case "insert_node":
        return v.isPath(e.path) && L.isNode(e.node);
      case "insert_text":
        return typeof e.offset == "number" && typeof e.text == "string" && v.isPath(e.path);
      case "merge_node":
        return typeof e.position == "number" && v.isPath(e.path) && re(e.properties);
      case "move_node":
        return v.isPath(e.path) && v.isPath(e.newPath);
      case "remove_node":
        return v.isPath(e.path) && L.isNode(e.node);
      case "remove_text":
        return typeof e.offset == "number" && typeof e.text == "string" && v.isPath(e.path);
      case "set_node":
        return v.isPath(e.path) && re(e.properties) && re(e.newProperties);
      case "set_selection":
        return e.properties === null && P.isRange(e.newProperties) || e.newProperties === null && P.isRange(e.properties) || re(e.properties) && re(e.newProperties);
      case "split_node":
        return v.isPath(e.path) && typeof e.position == "number" && re(e.properties);
      default:
        return !1;
    }
  },
  isOperationList(e) {
    return Array.isArray(e) && e.every((t) => dt.isOperation(t));
  },
  isSelectionOperation(e) {
    return dt.isOperation(e) && e.type.endsWith("_selection");
  },
  isTextOperation(e) {
    return dt.isOperation(e) && e.type.endsWith("_text");
  },
  inverse(e) {
    switch (e.type) {
      case "insert_node":
        return W(W({}, e), {}, {
          type: "remove_node"
        });
      case "insert_text":
        return W(W({}, e), {}, {
          type: "remove_text"
        });
      case "merge_node":
        return W(W({}, e), {}, {
          type: "split_node",
          path: v.previous(e.path)
        });
      case "move_node": {
        var {
          newPath: t,
          path: r
        } = e;
        if (v.equals(t, r))
          return e;
        if (v.isSibling(r, t))
          return W(W({}, e), {}, {
            path: t,
            newPath: r
          });
        var n = v.transform(r, e), i = v.transform(v.next(r), e);
        return W(W({}, e), {}, {
          path: n,
          newPath: i
        });
      }
      case "remove_node":
        return W(W({}, e), {}, {
          type: "insert_node"
        });
      case "remove_text":
        return W(W({}, e), {}, {
          type: "insert_text"
        });
      case "set_node": {
        var {
          properties: o,
          newProperties: s
        } = e;
        return W(W({}, e), {}, {
          properties: s,
          newProperties: o
        });
      }
      case "set_selection": {
        var {
          properties: l,
          newProperties: c
        } = e;
        return l == null ? W(W({}, e), {}, {
          properties: c,
          newProperties: null
        }) : c == null ? W(W({}, e), {}, {
          properties: null,
          newProperties: l
        }) : W(W({}, e), {}, {
          properties: c,
          newProperties: l
        });
      }
      case "split_node":
        return W(W({}, e), {}, {
          type: "merge_node",
          path: v.next(e.path)
        });
    }
  }
}, Lc = function(t) {
  var {
    deep: r = !1
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!re(t))
    return !1;
  var n = typeof t.addMark == "function" && typeof t.apply == "function" && typeof t.deleteFragment == "function" && typeof t.insertBreak == "function" && typeof t.insertSoftBreak == "function" && typeof t.insertFragment == "function" && typeof t.insertNode == "function" && typeof t.insertText == "function" && typeof t.isElementReadOnly == "function" && typeof t.isInline == "function" && typeof t.isSelectable == "function" && typeof t.isVoid == "function" && typeof t.normalizeNode == "function" && typeof t.onChange == "function" && typeof t.removeMark == "function" && typeof t.getDirtyPaths == "function" && (t.marks === null || re(t.marks)) && (t.selection === null || P.isRange(t.selection)) && (!r || L.isNodeList(t.children)) && dt.isOperationList(t.operations);
  return n;
}, N = {
  above(e, t) {
    return e.above(t);
  },
  addMark(e, t, r) {
    e.addMark(t, r);
  },
  after(e, t, r) {
    return e.after(t, r);
  },
  before(e, t, r) {
    return e.before(t, r);
  },
  deleteBackward(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, {
      unit: r = "character"
    } = t;
    e.deleteBackward(r);
  },
  deleteForward(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, {
      unit: r = "character"
    } = t;
    e.deleteForward(r);
  },
  deleteFragment(e, t) {
    e.deleteFragment(t);
  },
  edges(e, t) {
    return e.edges(t);
  },
  elementReadOnly(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return e.elementReadOnly(t);
  },
  end(e, t) {
    return e.end(t);
  },
  first(e, t) {
    return e.first(t);
  },
  fragment(e, t) {
    return e.fragment(t);
  },
  hasBlocks(e, t) {
    return e.hasBlocks(t);
  },
  hasInlines(e, t) {
    return e.hasInlines(t);
  },
  hasPath(e, t) {
    return e.hasPath(t);
  },
  hasTexts(e, t) {
    return e.hasTexts(t);
  },
  insertBreak(e) {
    e.insertBreak();
  },
  insertFragment(e, t, r) {
    e.insertFragment(t, r);
  },
  insertNode(e, t) {
    e.insertNode(t);
  },
  insertSoftBreak(e) {
    e.insertSoftBreak();
  },
  insertText(e, t) {
    e.insertText(t);
  },
  isBlock(e, t) {
    return e.isBlock(t);
  },
  isEdge(e, t, r) {
    return e.isEdge(t, r);
  },
  isEditor(e) {
    return Lc(e);
  },
  isElementReadOnly(e, t) {
    return e.isElementReadOnly(t);
  },
  isEmpty(e, t) {
    return e.isEmpty(t);
  },
  isEnd(e, t, r) {
    return e.isEnd(t, r);
  },
  isInline(e, t) {
    return e.isInline(t);
  },
  isNormalizing(e) {
    return e.isNormalizing();
  },
  isSelectable(e, t) {
    return e.isSelectable(t);
  },
  isStart(e, t, r) {
    return e.isStart(t, r);
  },
  isVoid(e, t) {
    return e.isVoid(t);
  },
  last(e, t) {
    return e.last(t);
  },
  leaf(e, t, r) {
    return e.leaf(t, r);
  },
  levels(e, t) {
    return e.levels(t);
  },
  marks(e) {
    return e.getMarks();
  },
  next(e, t) {
    return e.next(t);
  },
  node(e, t, r) {
    return e.node(t, r);
  },
  nodes(e, t) {
    return e.nodes(t);
  },
  normalize(e, t) {
    e.normalize(t);
  },
  parent(e, t, r) {
    return e.parent(t, r);
  },
  path(e, t, r) {
    return e.path(t, r);
  },
  pathRef(e, t, r) {
    return e.pathRef(t, r);
  },
  pathRefs(e) {
    return e.pathRefs();
  },
  point(e, t, r) {
    return e.point(t, r);
  },
  pointRef(e, t, r) {
    return e.pointRef(t, r);
  },
  pointRefs(e) {
    return e.pointRefs();
  },
  positions(e, t) {
    return e.positions(t);
  },
  previous(e, t) {
    return e.previous(t);
  },
  range(e, t, r) {
    return e.range(t, r);
  },
  rangeRef(e, t, r) {
    return e.rangeRef(t, r);
  },
  rangeRefs(e) {
    return e.rangeRefs();
  },
  removeMark(e, t) {
    e.removeMark(t);
  },
  setNormalizing(e, t) {
    e.setNormalizing(t);
  },
  start(e, t) {
    return e.start(t);
  },
  string(e, t, r) {
    return e.string(t, r);
  },
  unhangRange(e, t, r) {
    return e.unhangRange(t, r);
  },
  void(e, t) {
    return e.void(t);
  },
  withoutNormalizing(e, t) {
    e.withoutNormalizing(t);
  },
  shouldMergeNodesRemovePrevNode: (e, t, r) => e.shouldMergeNodesRemovePrevNode(t, r)
};
function Wn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wn(Object(r), !0).forEach(function(n) {
      ct(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var Y = {
  compare(e, t) {
    var r = v.compare(e.path, t.path);
    return r === 0 ? e.offset < t.offset ? -1 : e.offset > t.offset ? 1 : 0 : r;
  },
  isAfter(e, t) {
    return Y.compare(e, t) === 1;
  },
  isBefore(e, t) {
    return Y.compare(e, t) === -1;
  },
  equals(e, t) {
    return e.offset === t.offset && v.equals(e.path, t.path);
  },
  isPoint(e) {
    return re(e) && typeof e.offset == "number" && v.isPath(e.path);
  },
  transform(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (e === null)
      return null;
    var {
      affinity: n = "forward"
    } = r, {
      path: i,
      offset: o
    } = e;
    switch (t.type) {
      case "insert_node":
      case "move_node": {
        i = v.transform(i, t, r);
        break;
      }
      case "insert_text": {
        v.equals(t.path, i) && (t.offset < o || t.offset === o && n === "forward") && (o += t.text.length);
        break;
      }
      case "merge_node": {
        v.equals(t.path, i) && (o += t.position), i = v.transform(i, t, r);
        break;
      }
      case "remove_text": {
        v.equals(t.path, i) && t.offset <= o && (o -= Math.min(o - t.offset, t.text.length));
        break;
      }
      case "remove_node": {
        if (v.equals(t.path, i) || v.isAncestor(t.path, i))
          return null;
        i = v.transform(i, t, r);
        break;
      }
      case "split_node": {
        if (v.equals(t.path, i)) {
          if (t.position === o && n == null)
            return null;
          (t.position < o || t.position === o && n === "forward") && (o -= t.position, i = v.transform(i, t, Kn(Kn({}, r), {}, {
            affinity: "forward"
          })));
        } else
          i = v.transform(i, t, r);
        break;
      }
      default:
        return e;
    }
    return {
      path: i,
      offset: o
    };
  }
}, qn = void 0, oe = {
  setScrubber(e) {
    qn = e;
  },
  stringify(e) {
    return JSON.stringify(e, qn);
  }
}, Tc = ["text"], Mc = ["anchor", "focus", "merge"];
function $n(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $n(Object(r), !0).forEach(function(n) {
      ct(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $n(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var q = {
  equals(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, {
      loose: n = !1
    } = r;
    function i(o) {
      var s = wt(o, Tc);
      return s;
    }
    return Oo(n ? i(e) : e, n ? i(t) : t);
  },
  isText(e) {
    return re(e) && typeof e.text == "string";
  },
  isTextList(e) {
    return Array.isArray(e) && e.every((t) => q.isText(t));
  },
  isTextProps(e) {
    return e.text !== void 0;
  },
  matches(e, t) {
    for (var r in t)
      if (r !== "text" && (!e.hasOwnProperty(r) || e[r] !== t[r]))
        return !1;
    return !0;
  },
  decorations(e, t) {
    var r = [{
      leaf: _e({}, e)
    }];
    for (var n of t) {
      var {
        anchor: i,
        focus: o,
        merge: s
      } = n, l = wt(n, Mc), [c, u] = P.edges(n), d = [], h = 0, f = c.offset, m = u.offset, w = s ?? Object.assign;
      for (var {
        leaf: p
      } of r) {
        var {
          length: y
        } = p.text, g = h;
        if (h += y, f <= g && h <= m) {
          w(p, l), d.push({
            leaf: p
          });
          continue;
        }
        if (f !== m && (f === h || m === g) || f > h || m < g || m === g && g !== 0) {
          d.push({
            leaf: p
          });
          continue;
        }
        var b = p, C = void 0, x = void 0;
        if (m < h) {
          var O = m - g;
          x = {
            leaf: _e(_e({}, b), {}, {
              text: b.text.slice(O)
            })
          }, b = _e(_e({}, b), {}, {
            text: b.text.slice(0, O)
          });
        }
        if (f > g) {
          var D = f - g;
          C = {
            leaf: _e(_e({}, b), {}, {
              text: b.text.slice(0, D)
            })
          }, b = _e(_e({}, b), {}, {
            text: b.text.slice(D)
          });
        }
        w(b, l), C && d.push(C), d.push({
          leaf: b
        }), x && d.push(x);
      }
      r = d;
    }
    if (r.length > 1) {
      var $ = 0;
      for (var [_, V] of r.entries()) {
        var le = $, ee = le + V.leaf.text.length, Z = {
          start: le,
          end: ee
        };
        _ === 0 && (Z.isFirst = !0), _ === r.length - 1 && (Z.isLast = !0), V.position = Z, $ = ee;
      }
    }
    return r;
  }
}, Dc = (e) => e.selection ? e.selection : e.children.length > 0 ? N.end(e, []) : [0], j;
(function(e) {
  e[e.None = 0] = "None", e[e.Extend = 1] = "Extend", e[e.ZWJ = 2] = "ZWJ", e[e.RI = 4] = "RI", e[e.Prepend = 8] = "Prepend", e[e.SpacingMark = 16] = "SpacingMark", e[e.L = 32] = "L", e[e.V = 64] = "V", e[e.T = 128] = "T", e[e.LV = 256] = "LV", e[e.LVT = 512] = "LVT", e[e.ExtPict = 1024] = "ExtPict", e[e.Any = 2048] = "Any";
})(j || (j = {}));
j.L, j.L | j.V | j.LV | j.LVT, j.LV | j.V, j.V | j.T, j.LVT | j.T, j.T, j.Any, j.Extend | j.ZWJ, j.Any, j.SpacingMark, j.Prepend, j.Any, j.ZWJ, j.ExtPict, j.RI, j.RI;
var _c = {
  delete(e, t) {
    e.delete(t);
  },
  insertFragment(e, t, r) {
    e.insertFragment(t, r);
  },
  insertText(e, t) {
    var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    N.withoutNormalizing(e, () => {
      var {
        voids: n = !1
      } = r, {
        at: i = Dc(e)
      } = r;
      if (v.isPath(i) && (i = N.range(e, i)), P.isRange(i))
        if (P.isCollapsed(i))
          i = i.anchor;
        else {
          var o = P.end(i);
          if (!n && N.void(e, {
            at: o
          }))
            return;
          var s = P.start(i), l = N.pointRef(e, s), c = N.pointRef(e, o);
          Ke.delete(e, {
            at: i,
            voids: n
          });
          var u = l.unref(), d = c.unref();
          i = u || d, Ke.setSelection(e, {
            anchor: i,
            focus: i
          });
        }
      if (!(!n && N.void(e, {
        at: i
      }) || N.elementReadOnly(e, {
        at: i
      }))) {
        var {
          path: h,
          offset: f
        } = i;
        t.length > 0 && e.apply({
          type: "insert_text",
          path: h,
          offset: f,
          text: t
        });
      }
    });
  }
};
function Zn(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Tt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zn(Object(r), !0).forEach(function(n) {
      ct(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zn(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
var Ke = Tt(Tt(Tt(Tt({}, Cc), bc), kc), _c), xe = {}, Gn;
function Ic() {
  if (Gn) return xe;
  Gn = 1, Object.defineProperty(xe, "__esModule", {
    value: !0
  });
  for (var e = typeof window < "u" && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform), t = {
    alt: "altKey",
    control: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey"
  }, r = {
    add: "+",
    break: "pause",
    cmd: "meta",
    command: "meta",
    ctl: "control",
    ctrl: "control",
    del: "delete",
    down: "arrowdown",
    esc: "escape",
    ins: "insert",
    left: "arrowleft",
    mod: e ? "meta" : "control",
    opt: "alt",
    option: "alt",
    return: "enter",
    right: "arrowright",
    space: " ",
    spacebar: " ",
    up: "arrowup",
    win: "meta",
    windows: "meta"
  }, n = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    control: 17,
    alt: 18,
    pause: 19,
    capslock: 20,
    escape: 27,
    " ": 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    arrowleft: 37,
    arrowup: 38,
    arrowright: 39,
    arrowdown: 40,
    insert: 45,
    delete: 46,
    meta: 91,
    numlock: 144,
    scrolllock: 145,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "\\": 220,
    "]": 221,
    "'": 222
  }, i = 1; i < 20; i++)
    n["f" + i] = 111 + i;
  function o(f, m, w) {
    m && !("byKey" in m) && (w = m, m = null), Array.isArray(f) || (f = [f]);
    var p = f.map(function(b) {
      return c(b, m);
    }), y = function(C) {
      return p.some(function(x) {
        return u(x, C);
      });
    }, g = w == null ? y : y(w);
    return g;
  }
  function s(f, m) {
    return o(f, m);
  }
  function l(f, m) {
    return o(f, { byKey: !0 }, m);
  }
  function c(f, m) {
    var w = m && m.byKey, p = {};
    f = f.replace("++", "+add");
    var y = f.split("+"), g = y.length;
    for (var b in t)
      p[t[b]] = !1;
    var C = !0, x = !1, O = void 0;
    try {
      for (var D = y[Symbol.iterator](), $; !(C = ($ = D.next()).done); C = !0) {
        var _ = $.value, V = _.endsWith("?") && _.length > 1;
        V && (_ = _.slice(0, -1));
        var le = h(_), ee = t[le];
        if (_.length > 1 && !ee && !r[_] && !n[le])
          throw new TypeError('Unknown modifier: "' + _ + '"');
        (g === 1 || !ee) && (w ? p.key = le : p.which = d(_)), ee && (p[ee] = V ? null : !0);
      }
    } catch (Z) {
      x = !0, O = Z;
    } finally {
      try {
        !C && D.return && D.return();
      } finally {
        if (x)
          throw O;
      }
    }
    return p;
  }
  function u(f, m) {
    for (var w in f) {
      var p = f[w], y = void 0;
      if (p != null && (w === "key" && m.key != null ? y = m.key.toLowerCase() : w === "which" ? y = p === 91 && m.which === 93 ? 91 : m.which : y = m[w], !(y == null && p === !1) && y !== p))
        return !1;
    }
    return !0;
  }
  function d(f) {
    f = h(f);
    var m = n[f] || f.toUpperCase().charCodeAt(0);
    return m;
  }
  function h(f) {
    return f = f.toLowerCase(), f = r[f] || f, f;
  }
  return xe.default = o, xe.isHotkey = o, xe.isCodeHotkey = s, xe.isKeyHotkey = l, xe.parseHotkey = c, xe.compareHotkey = u, xe.toKeyCode = d, xe.toKeyName = h, xe;
}
var Ee = Ic(), So = globalThis.Node, Fc = globalThis.Text, Po = (e) => e && e.ownerDocument && e.ownerDocument.defaultView || null, Nc = (e) => jt(e) && e.nodeType === 8, De = (e) => jt(e) && e.nodeType === 1, jt = (e) => {
  var t = Po(e);
  return !!t && e instanceof t.Node;
}, Vn = (e) => {
  var t = e && e.anchorNode && Po(e.anchorNode);
  return !!t && e instanceof t.Selection;
}, Rc = (e) => {
  var [t, r] = e;
  if (De(t) && t.childNodes.length) {
    var n = r === t.childNodes.length, i = n ? r - 1 : r;
    for ([t, i] = Lo(t, i, n ? "backward" : "forward"), n = i < r; De(t) && t.childNodes.length; ) {
      var o = n ? t.childNodes.length - 1 : 0;
      t = Bc(t, o, n ? "backward" : "forward");
    }
    r = n && t.textContent != null ? t.textContent.length : 0;
  }
  return [t, r];
}, Ac = (e) => {
  for (var t = e && e.parentNode; t; ) {
    if (t.toString() === "[object ShadowRoot]")
      return !0;
    t = t.parentNode;
  }
  return !1;
}, Lo = (e, t, r) => {
  for (var {
    childNodes: n
  } = e, i = n[t], o = t, s = !1, l = !1; (Nc(i) || De(i) && i.childNodes.length === 0 || De(i) && i.getAttribute("contenteditable") === "false") && !(s && l); ) {
    if (o >= n.length) {
      s = !0, o = t - 1, r = "backward";
      continue;
    }
    if (o < 0) {
      l = !0, o = t + 1, r = "forward";
      continue;
    }
    i = n[o], t = o, o += r === "forward" ? 1 : -1;
  }
  return [i, t];
}, Bc = (e, t, r) => {
  var [n] = Lo(e, t, r);
  return n;
}, Yn = (e) => e.getSelection != null ? e.getSelection() : document.getSelection(), To = (e, t, r) => {
  var {
    target: n
  } = t;
  if (De(n) && n.matches('[contentEditable="false"]'))
    return !1;
  var {
    document: i
  } = S.getWindow(e);
  if (i.contains(n))
    return S.hasDOMNode(e, n, {
      editable: !0
    });
  var o = r.find((s) => {
    var {
      addedNodes: l,
      removedNodes: c
    } = s;
    for (var u of l)
      if (u === n || u.contains(n))
        return !0;
    for (var d of c)
      if (d === n || d.contains(n))
        return !0;
  });
  return !o || o === t ? !1 : To(e, o, r);
}, Xn = (e, t) => !!(e.compareDocumentPosition(t) & So.DOCUMENT_POSITION_PRECEDING), zc = (e, t) => !!(e.compareDocumentPosition(t) & So.DOCUMENT_POSITION_FOLLOWING), pr, vr, Jn = typeof navigator < "u" && /Mac OS X/.test(navigator.userAgent), wr = typeof navigator < "u" && /Android/.test(navigator.userAgent), Mt = typeof navigator < "u" && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent), jc = typeof navigator < "u" && /Chrome/i.test(navigator.userAgent);
typeof navigator < "u" && /Safari/.test(navigator.userAgent) && /Version\/(\d+)/.test(navigator.userAgent) && ((pr = navigator.userAgent.match(/Version\/(\d+)/)) !== null && pr !== void 0 && pr[1] && parseInt((vr = navigator.userAgent.match(/Version\/(\d+)/)) === null || vr === void 0 ? void 0 : vr[1], 10) < 17);
function yt(e) {
  "@babel/helpers - typeof";
  return yt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, yt(e);
}
function Hc(e, t) {
  if (yt(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (yt(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Uc(e) {
  var t = Hc(e, "string");
  return yt(t) === "symbol" ? t : String(t);
}
function Wc(e, t, r) {
  return t = Uc(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var Kc = 0;
class qc {
  constructor() {
    Wc(this, "id", void 0), this.id = "".concat(Kc++);
  }
}
var $c = /* @__PURE__ */ new WeakMap(), Zc = /* @__PURE__ */ new WeakMap(), Gc = /* @__PURE__ */ new WeakMap(), Vc = /* @__PURE__ */ new WeakMap(), Yc = /* @__PURE__ */ new WeakMap(), Qn = /* @__PURE__ */ new WeakMap(), Xc = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Jc = /* @__PURE__ */ new WeakMap(), Qc = /* @__PURE__ */ new WeakMap(), e1 = /* @__PURE__ */ new WeakMap(), S = {
  androidPendingDiffs: (e) => e1.get(e),
  androidScheduleFlush: (e) => {
    var t;
    (t = Qc.get(e)) === null || t === void 0 || t();
  },
  blur: (e) => {
    var t = S.toDOMNode(e, e), r = S.findDocumentOrShadowRoot(e);
    Dt.set(e, !1), r.activeElement === t && t.blur();
  },
  deselect: (e) => {
    var {
      selection: t
    } = e, r = S.findDocumentOrShadowRoot(e), n = Yn(r);
    n && n.rangeCount > 0 && n.removeAllRanges(), t && Ke.deselect(e);
  },
  findDocumentOrShadowRoot: (e) => {
    var t = S.toDOMNode(e, e), r = t.getRootNode();
    return r instanceof Document || r instanceof ShadowRoot ? r : t.ownerDocument;
  },
  findEventRange: (e, t) => {
    "nativeEvent" in t && (t = t.nativeEvent);
    var {
      clientX: r,
      clientY: n,
      target: i
    } = t;
    if (r == null || n == null)
      throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(t));
    var o = S.toSlateNode(e, t.target), s = S.findPath(e, o);
    if (Ie.isElement(o) && N.isVoid(e, o)) {
      var l = i.getBoundingClientRect(), c = e.isInline(o) ? r - l.left < l.left + l.width - r : n - l.top < l.top + l.height - n, u = N.point(e, s, {
        edge: c ? "start" : "end"
      }), d = c ? N.before(e, u) : N.after(e, u);
      if (d) {
        var h = N.range(e, d);
        return h;
      }
    }
    var f, {
      document: m
    } = S.getWindow(e);
    if (m.caretRangeFromPoint)
      f = m.caretRangeFromPoint(r, n);
    else {
      var w = m.caretPositionFromPoint(r, n);
      w && (f = m.createRange(), f.setStart(w.offsetNode, w.offset), f.setEnd(w.offsetNode, w.offset));
    }
    if (!f)
      throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(t));
    var p = S.toSlateRange(e, f, {
      exactMatch: !1,
      suppressThrow: !1
    });
    return p;
  },
  findKey: (e, t) => {
    var r = Qn.get(t);
    return r || (r = new qc(), Qn.set(t, r)), r;
  },
  findPath: (e, t) => {
    for (var r = [], n = t; ; ) {
      var i = Zc.get(n);
      if (i == null) {
        if (N.isEditor(n))
          return r;
        break;
      }
      var o = $c.get(n);
      if (o == null)
        break;
      r.unshift(o), n = i;
    }
    throw new Error("Unable to find the path for Slate node: ".concat(oe.stringify(t)));
  },
  focus: function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      retries: 5
    };
    if (!Dt.get(t)) {
      if (r.retries <= 0)
        throw new Error("Could not set focus, editor seems stuck with pending operations");
      if (t.operations.length > 0) {
        setTimeout(() => {
          S.focus(t, {
            retries: r.retries - 1
          });
        }, 10);
        return;
      }
      var n = S.toDOMNode(t, t), i = S.findDocumentOrShadowRoot(t);
      if (i.activeElement !== n) {
        if (t.selection && i instanceof Document) {
          var o = Yn(i), s = S.toDOMRange(t, t.selection);
          o == null || o.removeAllRanges(), o == null || o.addRange(s);
        }
        t.selection || Ke.select(t, N.start(t, [])), Dt.set(t, !0), n.focus({
          preventScroll: !0
        });
      }
    }
  },
  getWindow: (e) => {
    var t = Gc.get(e);
    if (!t)
      throw new Error("Unable to find a host window element for this editor");
    return t;
  },
  hasDOMNode: function(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, {
      editable: i = !1
    } = n, o = S.toDOMNode(t, t), s;
    try {
      s = De(r) ? r : r.parentElement;
    } catch (l) {
      if (l instanceof Error && !l.message.includes('Permission denied to access property "nodeType"'))
        throw l;
    }
    return s ? s.closest("[data-slate-editor]") === o && (!i || s.isContentEditable ? !0 : typeof s.isContentEditable == "boolean" && // isContentEditable exists only on HTMLElement, and on other nodes it will be undefined
    // this is the core logic that lets you know you got the right editor.selection instead of null when editor is contenteditable="false"(readOnly)
    s.closest('[contenteditable="false"]') === o || !!s.getAttribute("data-slate-zero-width")) : !1;
  },
  hasEditableTarget: (e, t) => jt(t) && S.hasDOMNode(e, t, {
    editable: !0
  }),
  hasRange: (e, t) => {
    var {
      anchor: r,
      focus: n
    } = t;
    return N.hasPath(e, r.path) && N.hasPath(e, n.path);
  },
  hasSelectableTarget: (e, t) => S.hasEditableTarget(e, t) || S.isTargetInsideNonReadonlyVoid(e, t),
  hasTarget: (e, t) => jt(t) && S.hasDOMNode(e, t),
  insertData: (e, t) => {
    e.insertData(t);
  },
  insertFragmentData: (e, t) => e.insertFragmentData(t),
  insertTextData: (e, t) => e.insertTextData(t),
  isComposing: (e) => !!Jc.get(e),
  isFocused: (e) => !!Dt.get(e),
  isReadOnly: (e) => !!ei.get(e),
  isTargetInsideNonReadonlyVoid: (e, t) => {
    if (ei.get(e)) return !1;
    var r = S.hasTarget(e, t) && S.toSlateNode(e, t);
    return Ie.isElement(r) && N.isVoid(e, r);
  },
  setFragmentData: (e, t, r) => e.setFragmentData(t, r),
  toDOMNode: (e, t) => {
    var r = Xc.get(e), n = N.isEditor(t) ? Vc.get(e) : r == null ? void 0 : r.get(S.findKey(e, t));
    if (!n)
      throw new Error("Cannot resolve a DOM node from Slate node: ".concat(oe.stringify(t)));
    return n;
  },
  toDOMPoint: (e, t) => {
    var [r] = N.node(e, t.path), n = S.toDOMNode(e, r), i;
    N.void(e, {
      at: t
    }) && (t = {
      path: t.path,
      offset: 0
    });
    for (var o = "[data-slate-string], [data-slate-zero-width]", s = Array.from(n.querySelectorAll(o)), l = 0, c = 0; c < s.length; c++) {
      var u = s[c], d = u.childNodes[0];
      if (!(d == null || d.textContent == null)) {
        var {
          length: h
        } = d.textContent, f = u.getAttribute("data-slate-length"), m = f == null ? h : parseInt(f, 10), w = l + m, p = s[c + 1];
        if (t.offset === w && p !== null && p !== void 0 && p.hasAttribute("data-slate-mark-placeholder")) {
          var y, g = p.childNodes[0];
          i = [
            // COMPAT: If we don't explicity set the dom point to be on the actual
            // dom text element, chrome will put the selection behind the actual dom
            // text element, causing domRange.getBoundingClientRect() calls on a collapsed
            // selection to return incorrect zero values (https://bugs.chromium.org/p/chromium/issues/detail?id=435438)
            // which will cause issues when scrolling to it.
            g instanceof Fc ? g : p,
            (y = p.textContent) !== null && y !== void 0 && y.startsWith("\uFEFF") ? 1 : 0
          ];
          break;
        }
        if (t.offset <= w) {
          var b = Math.min(h, Math.max(0, t.offset - l));
          i = [d, b];
          break;
        }
        l = w;
      }
    }
    if (!i)
      throw new Error("Cannot resolve a DOM point from Slate point: ".concat(oe.stringify(t)));
    return i;
  },
  toDOMRange: (e, t) => {
    var {
      anchor: r,
      focus: n
    } = t, i = P.isBackward(t), o = S.toDOMPoint(e, r), s = P.isCollapsed(t) ? o : S.toDOMPoint(e, n), l = S.getWindow(e), c = l.document.createRange(), [u, d] = i ? s : o, [h, f] = i ? o : s, m = De(u) ? u : u.parentElement, w = !!m.getAttribute("data-slate-zero-width"), p = De(h) ? h : h.parentElement, y = !!p.getAttribute("data-slate-zero-width");
    return c.setStart(u, w ? 1 : d), c.setEnd(h, y ? 1 : f), c;
  },
  toSlateNode: (e, t) => {
    var r = De(t) ? t : t.parentElement;
    r && !r.hasAttribute("data-slate-node") && (r = r.closest("[data-slate-node]"));
    var n = r ? Yc.get(r) : null;
    if (!n)
      throw new Error("Cannot resolve a Slate node from DOM node: ".concat(r));
    return n;
  },
  toSlatePoint: (e, t, r) => {
    var {
      exactMatch: n,
      suppressThrow: i,
      searchDirection: o = "backward"
    } = r, [s, l] = n ? t : Rc(t), c = s.parentNode, u = null, d = 0;
    if (c) {
      var h, f, m = S.toDOMNode(e, e), w = c.closest('[data-slate-void="true"]'), p = w && m.contains(w) ? w : null, y = c.closest('[contenteditable="false"]'), g = y && m.contains(y) ? y : null, b = c.closest("[data-slate-leaf]"), C = null;
      if (b) {
        if (u = b.closest('[data-slate-node="text"]'), u) {
          var x = S.getWindow(e), O = x.document.createRange();
          O.setStart(u, 0), O.setEnd(s, l);
          var D = O.cloneContents(), $ = [...Array.prototype.slice.call(D.querySelectorAll("[data-slate-zero-width]")), ...Array.prototype.slice.call(D.querySelectorAll("[contenteditable=false]"))];
          $.forEach((A) => {
            if (wr && !n && A.hasAttribute("data-slate-zero-width") && A.textContent.length > 0 && A.textContext !== "\uFEFF") {
              A.textContent.startsWith("\uFEFF") && (A.textContent = A.textContent.slice(1));
              return;
            }
            A.parentNode.removeChild(A);
          }), d = D.textContent.length, C = u;
        }
      } else if (p) {
        for (var _ = p.querySelectorAll("[data-slate-leaf]"), V = 0; V < _.length; V++) {
          var le = _[V];
          if (S.hasDOMNode(e, le)) {
            b = le;
            break;
          }
        }
        b ? (u = b.closest('[data-slate-node="text"]'), C = b, d = C.textContent.length, C.querySelectorAll("[data-slate-zero-width]").forEach((A) => {
          d -= A.textContent.length;
        })) : d = 1;
      } else if (g) {
        var ee = (A) => A ? A.querySelectorAll(
          // Exclude leaf nodes in nested editors
          "[data-slate-leaf]:not(:scope [data-slate-editor] [data-slate-leaf])"
        ) : [], Z = g.closest('[data-slate-node="element"]');
        if (o === "forward") {
          var R, fe = [...ee(Z), ...ee(Z == null ? void 0 : Z.nextElementSibling)];
          b = (R = fe.find((A) => zc(g, A))) !== null && R !== void 0 ? R : null;
        } else {
          var we, Be = [...ee(Z == null ? void 0 : Z.previousElementSibling), ...ee(Z)];
          b = (we = Be.findLast((A) => Xn(g, A))) !== null && we !== void 0 ? we : null;
        }
        b && (u = b.closest('[data-slate-node="text"]'), C = b, o === "forward" ? d = 0 : (d = C.textContent.length, C.querySelectorAll("[data-slate-zero-width]").forEach((A) => {
          d -= A.textContent.length;
        })));
      }
      C && d === C.textContent.length && // COMPAT: Android IMEs might remove the zero width space while composing,
      // and we don't add it for line-breaks.
      wr && C.getAttribute("data-slate-zero-width") === "z" && (h = C.textContent) !== null && h !== void 0 && h.startsWith("\uFEFF") && // COMPAT: If the parent node is a Slate zero-width space, editor is
      // because the text node should have no characters. However, during IME
      // composition the ASCII characters will be prepended to the zero-width
      // space, so subtract 1 from the offset to account for the zero-width
      // space character.
      (c.hasAttribute("data-slate-zero-width") || // COMPAT: In Firefox, `range.cloneContents()` returns an extra trailing '\n'
      // when the document ends with a new-line character. This results in the offset
      // length being off by one, so we need to subtract one to account for this.
      Mt && (f = C.textContent) !== null && f !== void 0 && f.endsWith(`

`)) && d--;
    }
    if (wr && !u && !n) {
      var Ge = c.hasAttribute("data-slate-node") ? c : c.closest("[data-slate-node]");
      if (Ge && S.hasDOMNode(e, Ge, {
        editable: !0
      })) {
        var ut = S.toSlateNode(e, Ge), {
          path: Re,
          offset: Ve
        } = N.start(e, S.findPath(e, ut));
        return Ge.querySelector("[data-slate-leaf]") || (Ve = l), {
          path: Re,
          offset: Ve
        };
      }
    }
    if (!u) {
      if (i)
        return null;
      throw new Error("Cannot resolve a Slate point from DOM point: ".concat(t));
    }
    var Ae = S.toSlateNode(e, u), Ot = S.findPath(e, Ae);
    return {
      path: Ot,
      offset: d
    };
  },
  toSlateRange: (e, t, r) => {
    var n, {
      exactMatch: i,
      suppressThrow: o
    } = r, s = Vn(t) ? t.anchorNode : t.startContainer, l, c, u, d, h;
    if (s)
      if (Vn(t)) {
        if (Mt && t.rangeCount > 1) {
          u = t.focusNode;
          var f = t.getRangeAt(0), m = t.getRangeAt(t.rangeCount - 1);
          if (u instanceof HTMLTableRowElement && f.startContainer instanceof HTMLTableRowElement && m.startContainer instanceof HTMLTableRowElement) {
            let D = function($) {
              return $.childElementCount > 0 ? D($.children[0]) : $;
            };
            var w = f.startContainer, p = m.startContainer, y = D(w.children[f.startOffset]), g = D(p.children[m.startOffset]);
            d = 0, g.childNodes.length > 0 ? l = g.childNodes[0] : l = g, y.childNodes.length > 0 ? u = y.childNodes[0] : u = y, g instanceof HTMLElement ? c = g.innerHTML.length : c = 0;
          } else
            f.startContainer === u ? (l = m.endContainer, c = m.endOffset, d = f.startOffset) : (l = f.startContainer, c = f.endOffset, d = m.startOffset);
        } else
          l = t.anchorNode, c = t.anchorOffset, u = t.focusNode, d = t.focusOffset;
        jc && Ac(l) || Mt ? h = t.anchorNode === t.focusNode && t.anchorOffset === t.focusOffset : h = t.isCollapsed;
      } else
        l = t.startContainer, c = t.startOffset, u = t.endContainer, d = t.endOffset, h = t.collapsed;
    if (l == null || u == null || c == null || d == null)
      throw new Error("Cannot resolve a Slate range from DOM range: ".concat(t));
    Mt && (n = u.textContent) !== null && n !== void 0 && n.endsWith(`

`) && d === u.textContent.length && d--;
    var b = S.toSlatePoint(e, [l, c], {
      exactMatch: i,
      suppressThrow: o
    });
    if (!b)
      return null;
    var C = Xn(l, u) || l === u && d < c, x = h ? b : S.toSlatePoint(e, [u, d], {
      exactMatch: i,
      suppressThrow: o,
      searchDirection: C ? "forward" : "backward"
    });
    if (!x)
      return null;
    var O = {
      anchor: b,
      focus: x
    };
    return P.isExpanded(O) && P.isForward(O) && De(u) && N.void(e, {
      at: O.focus,
      mode: "highest"
    }) && (O = N.unhangRange(e, O, {
      voids: !0
    })), O;
  }
}, t1 = {
  bold: "mod+b",
  compose: ["down", "left", "right", "up", "backspace", "enter"],
  moveBackward: "left",
  moveForward: "right",
  moveWordBackward: "ctrl+left",
  moveWordForward: "ctrl+right",
  deleteBackward: "shift?+backspace",
  deleteForward: "shift?+delete",
  extendBackward: "shift+left",
  extendForward: "shift+right",
  italic: "mod+i",
  insertSoftBreak: "shift+enter",
  splitBlock: "enter",
  undo: "mod+z"
}, r1 = {
  moveLineBackward: "opt+up",
  moveLineForward: "opt+down",
  moveWordBackward: "opt+left",
  moveWordForward: "opt+right",
  deleteBackward: ["ctrl+backspace", "ctrl+h"],
  deleteForward: ["ctrl+delete", "ctrl+d"],
  deleteLineBackward: "cmd+shift?+backspace",
  deleteLineForward: ["cmd+shift?+delete", "ctrl+k"],
  deleteWordBackward: "opt+shift?+backspace",
  deleteWordForward: "opt+shift?+delete",
  extendLineBackward: "opt+shift+up",
  extendLineForward: "opt+shift+down",
  redo: "cmd+shift+z",
  transposeCharacter: "ctrl+t"
}, n1 = {
  deleteWordBackward: "ctrl+shift?+backspace",
  deleteWordForward: "ctrl+shift?+delete",
  redo: ["ctrl+y", "ctrl+shift+z"]
}, K = (e) => {
  var t = t1[e], r = r1[e], n = n1[e], i = t && Ee.isHotkey(t), o = r && Ee.isHotkey(r), s = n && Ee.isHotkey(n);
  return (l) => !!(i && i(l) || Jn && o && o(l) || !Jn && s && s(l));
};
K("bold"), K("compose"), K("moveBackward"), K("moveForward"), K("deleteBackward"), K("deleteForward"), K("deleteLineBackward"), K("deleteLineForward"), K("deleteWordBackward"), K("deleteWordForward"), K("extendBackward"), K("extendForward"), K("extendLineBackward"), K("extendLineForward"), K("italic"), K("moveLineBackward"), K("moveLineForward"), K("moveWordBackward"), K("moveWordForward"), K("redo"), K("insertSoftBreak"), K("splitBlock"), K("transposeCharacter"), K("undo");
var ti;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(ti || (ti = {}));
var Jr = function(e) {
  return Object.freeze(e);
}, i1 = /* @__PURE__ */ function() {
  function e(t, r) {
    this.inlineSize = t, this.blockSize = r, Jr(this);
  }
  return e;
}(), o1 = function() {
  function e(t, r, n, i) {
    return this.x = t, this.y = r, this.width = n, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Jr(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, r = t.x, n = t.y, i = t.top, o = t.right, s = t.bottom, l = t.left, c = t.width, u = t.height;
    return { x: r, y: n, top: i, right: o, bottom: s, left: l, width: c, height: u };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), ri = typeof window < "u" ? window : {};
/msie|trident/i.test(ri.navigator && ri.navigator.userAgent);
var yr = function(e, t, r) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = !1), new i1((r ? t : e) || 0, (r ? e : t) || 0);
};
Jr({
  devicePixelContentBoxSize: yr(),
  borderBoxSize: yr(),
  contentBoxSize: yr(),
  contentRect: new o1(0, 0, 0, 0)
});
function Ct(e) {
  "@babel/helpers - typeof";
  return Ct = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ct(e);
}
function a1(e, t) {
  if (Ct(e) !== "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Ct(n) !== "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function s1(e) {
  var t = a1(e, "string");
  return Ct(t) === "symbol" ? t : String(t);
}
function Ft(e, t, r) {
  return t = s1(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var l1 = /* @__PURE__ */ Fr(null), et = S, c1 = (e, t) => {
  var r = [], n = () => {
    r = [];
  }, i = (s) => {
    if (t.current) {
      var l = s.filter((c) => To(e, c, s));
      r.push(...l);
    }
  };
  function o() {
    r.length > 0 && (r.reverse().forEach((s) => {
      s.type !== "characterData" && (s.removedNodes.forEach((l) => {
        s.target.insertBefore(l, s.nextSibling);
      }), s.addedNodes.forEach((l) => {
        s.target.removeChild(l);
      }));
    }), n());
  }
  return {
    registerMutations: i,
    restoreDOM: o,
    clear: n
  };
}, u1 = {
  subtree: !0,
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0
};
class d1 extends ya {
  constructor() {
    super(...arguments), Ft(this, "context", null), Ft(this, "manager", null), Ft(this, "mutationObserver", null);
  }
  observe() {
    var t, {
      node: r
    } = this.props;
    if (!r.current)
      throw new Error("Failed to attach MutationObserver, `node` is undefined");
    (t = this.mutationObserver) === null || t === void 0 || t.observe(r.current, u1);
  }
  componentDidMount() {
    var {
      receivedUserInput: t
    } = this.props, r = this.context;
    this.manager = c1(r, t), this.mutationObserver = new MutationObserver(this.manager.registerMutations), this.observe();
  }
  getSnapshotBeforeUpdate() {
    var t, r, n, i = (t = this.mutationObserver) === null || t === void 0 ? void 0 : t.takeRecords();
    if (i != null && i.length) {
      var o;
      (o = this.manager) === null || o === void 0 || o.registerMutations(i);
    }
    return (r = this.mutationObserver) === null || r === void 0 || r.disconnect(), (n = this.manager) === null || n === void 0 || n.restoreDOM(), null;
  }
  componentDidUpdate() {
    var t;
    (t = this.manager) === null || t === void 0 || t.clear(), this.observe();
  }
  componentWillUnmount() {
    var t;
    (t = this.mutationObserver) === null || t === void 0 || t.disconnect();
  }
  render() {
    return this.props.children;
  }
}
Ft(d1, "contextType", l1);
parseInt(Ue.version.split(".")[0], 10);
const f1 = ({
  board: e,
  title: t
}) => {
  const { appState: r, setAppState: n } = ke();
  return /* @__PURE__ */ a(
    I,
    {
      className: T("property-button"),
      visible: !0,
      icon: wl,
      type: "button",
      title: t,
      "aria-label": t,
      onPointerUp: () => {
        const i = Te(e)[0], o = Ca(i);
        Je.getLinkElement(o) || Je.wrapLink(o, "链接", ""), setTimeout(() => {
          const c = Je.getLinkElement(o)[0], u = et.toDOMNode(o, c);
          n({
            ...r,
            linkState: {
              editor: o,
              targetDom: u,
              targetElement: c,
              isEditing: !0,
              isHovering: !1,
              isHoveringOrigin: !1
            }
          });
        }, 0);
      }
    }
  );
}, h1 = ({
  end: e,
  property: t
}) => {
  const r = J(), { marker: n } = t, { t: i } = Q(), o = (s) => {
    ot.setProperty(r, {
      [e]: {
        ...t,
        marker: s
      }
    });
  };
  return /* @__PURE__ */ a(
    de,
    {
      padding: 2,
      className: T(
        `${Ne} ${e === "source" ? "source-arrow-island" : ""} `
      ),
      children: /* @__PURE__ */ k(ie.Row, { gap: 1, children: [
        /* @__PURE__ */ a(
          I,
          {
            className: T("property-button"),
            visible: !0,
            icon: Gi,
            type: "button",
            title: i("line.none"),
            "aria-label": i("line.none"),
            selected: n === "none",
            onPointerUp: () => {
              o("none");
            }
          }
        ),
        /* @__PURE__ */ a(
          I,
          {
            className: T("property-button"),
            visible: !0,
            icon: Zi,
            type: "button",
            title: i("line.arrow"),
            "aria-label": i("line.arrow"),
            selected: n === "arrow",
            onPointerUp: () => {
              o("arrow");
            }
          }
        )
      ] })
    }
  );
}, ni = ({
  board: e,
  end: t,
  endProperty: r
}) => {
  const [n, i] = M(!1), o = r == null ? void 0 : r.marker, s = F.getBoardContainer(e), { t: l } = Q(), c = `${l(`line.${t}`)} — ${l(`line.${o}`)}`;
  return /* @__PURE__ */ k(
    Se,
    {
      sideOffset: 12,
      open: n,
      onOpenChange: (u) => {
        i(u);
      },
      placement: "top",
      children: [
        /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
          I,
          {
            className: T(
              `property-button  ${t === "source" ? "source-arrow-button" : ""}`
            ),
            visible: !0,
            icon: o === "none" ? Gi : Zi,
            type: "button",
            title: c,
            "aria-label": c,
            selected: n,
            onPointerUp: () => {
              i(!n);
            }
          }
        ) }),
        /* @__PURE__ */ a(Le, { container: s, children: /* @__PURE__ */ a(h1, { end: t, property: r }) })
      ]
    }
  );
}, m1 = () => {
  var m, w;
  const e = J(), t = Te(e), [r, n] = M(!1), i = Oe(r), o = t.length > 0 && !mi(e) && !t.some(X.isImage), { viewport: s, selection: l, children: c } = e, { refs: u, floatingStyles: d } = Kt({
    placement: "right-start",
    middleware: [Rr(32), Ar()]
  });
  let h = {
    fill: "red"
  };
  if (o && !r) {
    const p = t.some((x) => w1(e, x)) && !F.hasBeenTextEditing(e), y = t.some(
      (x) => C1(e, x)
    ), g = t.some((x) => Mo(e, x)) && !F.hasBeenTextEditing(e), b = t.some((x) => y1(e, x)) && !F.hasBeenTextEditing(e), C = t.every(
      (x) => X.isArrowLine(x)
    );
    h = {
      ...v1(e),
      hasFill: p,
      hasFontColor: y,
      hasStroke: g,
      hasStrokeStyle: b,
      hasText: y,
      isLine: C
    };
  }
  const { t: f } = Q();
  return ne(() => {
    if (o) {
      const p = t.length > 0;
      if (!r && p) {
        const y = Te(e), g = ia(e, y, !1), [b, C] = tt.getPoints(g), x = rn(
          e,
          nn(e, b)
        ), O = rn(
          e,
          nn(e, C)
        ), D = O[0] - x[0], $ = O[1] - x[1];
        u.setPositionReference({
          getBoundingClientRect() {
            return {
              width: D,
              height: $,
              x: x[0],
              y: x[1],
              top: x[1],
              left: x[0],
              right: x[0] + D,
              bottom: x[1] + $
            };
          }
        });
      }
    }
  }, [s, l, c, r]), ne(() => {
    i.current = r;
  }, [r]), ne(() => {
    const { pointerUp: p, pointerMove: y } = e;
    return e.pointerMove = (g) => {
      (br(e) || Cr(e)) && !i.current && n(!0), y(g);
    }, e.pointerUp = (g) => {
      i.current && (br(e) || Cr(e)) && n(!1), p(g);
    }, () => {
      e.pointerUp = p, e.pointerMove = y;
    };
  }, [e]), /* @__PURE__ */ a(be, { children: o && !r && /* @__PURE__ */ a(
    de,
    {
      padding: 1,
      className: T("popup-toolbar", Ne),
      ref: u.setFloating,
      style: d,
      children: /* @__PURE__ */ k(ie.Row, { gap: 1, children: [
        h.hasFontColor && /* @__PURE__ */ a(
          $l,
          {
            board: e,
            currentColor: (m = h.marks) == null ? void 0 : m.color,
            title: f("popupToolbar.fontColor"),
            fontColorIcon: /* @__PURE__ */ a(dl, { currentColor: (w = h.marks) == null ? void 0 : w.color })
          },
          0
        ),
        h.hasStroke && /* @__PURE__ */ a(
          Zl,
          {
            board: e,
            currentColor: h.strokeColor,
            title: f("popupToolbar.stroke"),
            hasStrokeStyle: h.hasStrokeStyle || !1,
            children: /* @__PURE__ */ a(
              "label",
              {
                className: T("stroke-label", "color-label"),
                style: { borderColor: h.strokeColor }
              }
            )
          },
          1
        ),
        h.hasFill && /* @__PURE__ */ a(
          Gl,
          {
            board: e,
            currentColor: h.fill,
            title: f("popupToolbar.fillColor"),
            children: /* @__PURE__ */ a(
              "label",
              {
                className: T("fill-label", "color-label", {
                  "color-white": h.fill && uo(Ze(h.fill))
                }),
                style: { backgroundColor: h.fill }
              }
            )
          },
          2
        ),
        h.hasText && /* @__PURE__ */ a(
          f1,
          {
            board: e,
            title: f("popupToolbar.link")
          },
          3
        ),
        h.isLine && /* @__PURE__ */ k(be, { children: [
          /* @__PURE__ */ a(
            ni,
            {
              board: e,
              end: "source",
              endProperty: h.source
            },
            4
          ),
          /* @__PURE__ */ a(
            ni,
            {
              board: e,
              end: "target",
              endProperty: h.target
            },
            5
          )
        ] })
      ] })
    }
  ) });
}, g1 = (e, t) => {
  const r = Br(t);
  return {
    fill: t.fill,
    strokeColor: Mi(e, t),
    marks: r
  };
}, p1 = (e, t) => {
  const r = Br(t);
  return {
    fill: t.fill,
    strokeColor: Li(e, t),
    marks: r,
    source: (t == null ? void 0 : t.source) || {},
    target: (t == null ? void 0 : t.target) || {}
  };
}, v1 = (e) => {
  const t = Te(e)[0];
  return se.isMindElement(e, t) ? g1(e, t) : p1(e, t);
}, w1 = (e, t) => se.isMindElement(e, t) || Nr(e, t) ? !0 : X.isDrawElement(t) ? X.isShapeElement(t) && !X.isImage(t) && !X.isText(t) && Pi(t) : !1, Mo = (e, t) => se.isMindElement(e, t) || ye.isFreehand(t) ? !0 : X.isDrawElement(t) ? X.isShapeElement(t) && !X.isImage(t) && !X.isText(t) || X.isArrowLine(t) || X.isVectorLine(t) || X.isTable(t) : !1, y1 = (e, t) => Mo(e, t), C1 = (e, t) => se.isMindElement(e, t) ? !0 : X.isDrawElement(t) ? Ta([t]) : !1, Do = ({
  icon: e,
  shortcut: t,
  href: r,
  children: n,
  onSelect: i,
  className: o = "",
  selected: s,
  ...l
}) => {
  const c = ro(l.onClick, i);
  return /* @__PURE__ */ a(
    "a",
    {
      ...l,
      href: r,
      target: "_blank",
      rel: "noreferrer",
      className: Er(o, s),
      title: l.title ?? l["aria-label"],
      onClick: c,
      children: /* @__PURE__ */ a(no, { icon: e, shortcut: t, children: n })
    }
  );
};
Do.displayName = "MenuItemLink";
const _o = () => {
  const e = J(), { t } = Q();
  return /* @__PURE__ */ a(
    ae,
    {
      "data-testid": "save-button",
      onSelect: () => {
        Wi(e);
      },
      icon: tl,
      "aria-label": t("menu.saveFile"),
      shortcut: "Cmd+S",
      children: t("menu.saveFile")
    }
  );
};
_o.displayName = "SaveToFile";
const Io = () => {
  const e = J(), t = Qo(), { t: r } = Q(), n = (i, o, s) => {
    e.children = i, e.viewport = o || { zoom: 1 }, e.theme = { themeColorMode: ze.default }, t.update(e.children, {
      board: e,
      parent: e,
      parentG: F.getElementHost(e)
    }), te.fitViewport(e);
  };
  return /* @__PURE__ */ a(
    ae,
    {
      "data-testid": "open-button",
      onSelect: () => {
        hs(e).then((i) => {
          n(i.elements, i.viewport);
        });
      },
      icon: rl,
      "aria-label": r("menu.open"),
      children: r("menu.open")
    }
  );
};
Io.displayName = "OpenFile";
const Fo = () => {
  const e = J(), t = bt(qt), { t: r } = Q();
  return /* @__PURE__ */ a(
    ae,
    {
      icon: Js,
      "data-testid": "image-export-button",
      onSelect: () => {
        It(e, !0);
      },
      submenu: /* @__PURE__ */ k(at, { onSelect: () => {
        var i;
        const n = new CustomEvent(rt.MENU_ITEM_SELECT, {
          bubbles: !0,
          cancelable: !0
        });
        (i = t.onSelect) == null || i.call(t, n);
      }, children: [
        /* @__PURE__ */ a(
          ae,
          {
            onSelect: () => {
              It(e, !0);
            },
            "aria-label": r("menu.exportImage.png"),
            children: r("menu.exportImage.png")
          }
        ),
        /* @__PURE__ */ a(
          ae,
          {
            onSelect: () => {
              It(e, !1);
            },
            "aria-label": r("menu.exportImage.jpg"),
            children: r("menu.exportImage.jpg")
          }
        )
      ] }),
      shortcut: "Cmd+Shift+E",
      "aria-label": r("menu.exportImage"),
      children: r("menu.exportImage")
    }
  );
};
Fo.displayName = "SaveAsImage";
const No = () => {
  const { appState: e, setAppState: t } = ke(), { t: r } = Q();
  return /* @__PURE__ */ a(
    ae,
    {
      icon: Rt,
      "data-testid": "reset-button",
      onSelect: () => {
        t({
          ...e,
          openCleanConfirm: !0
        });
      },
      shortcut: "Cmd+Backspace",
      "aria-label": r("menu.cleanBoard"),
      children: r("menu.cleanBoard")
    }
  );
};
No.displayName = "CleanBoard";
const Ro = () => /* @__PURE__ */ a(
  Do,
  {
    icon: Xs,
    href: "https://github.com/plait-board/drawnix",
    "aria-label": "GitHub",
    children: "GitHub"
  }
);
Ro.displayName = "Socials";
const Ao = () => {
  const { language: e, setLanguage: t, t: r } = Q(), n = bt(qt);
  return /* @__PURE__ */ a(
    ae,
    {
      icon: qi,
      "data-testid": "language-switcher-button",
      onSelect: () => {
      },
      submenu: /* @__PURE__ */ k(at, { onSelect: () => {
        var o;
        const i = new CustomEvent(rt.MENU_ITEM_SELECT, {
          bubbles: !0,
          cancelable: !0
        });
        (o = n.onSelect) == null || o.call(n, i);
      }, children: [
        /* @__PURE__ */ a(
          ae,
          {
            onSelect: () => {
              t("zh");
            },
            "aria-label": r("language.chinese"),
            selected: e === "zh",
            children: r("language.chinese")
          }
        ),
        /* @__PURE__ */ a(
          ae,
          {
            onSelect: () => {
              t("en");
            },
            "aria-label": r("language.english"),
            selected: e === "en",
            children: r("language.english")
          }
        )
      ] }),
      "aria-label": r("language.switcher"),
      children: r("language.switcher")
    }
  );
};
Ao.displayName = "LanguageSwitcherMenu";
const Bo = () => /* @__PURE__ */ a(
  "div",
  {
    style: {
      height: "1px",
      backgroundColor: "var(--color-gray-10)",
      margin: ".5rem 0"
    }
  }
);
Bo.displayName = "MenuSeparator";
const b1 = () => {
  const e = J(), { t } = Q(), r = F.getBoardContainer(e), n = Te(e), [i, o] = M(!1), s = e.history.undos.length <= 0, l = e.history.redos.length <= 0;
  return /* @__PURE__ */ a(
    de,
    {
      padding: 1,
      className: T("app-toolbar", Ne),
      children: /* @__PURE__ */ k(ie.Row, { gap: 1, children: [
        /* @__PURE__ */ k(
          Se,
          {
            sideOffset: 12,
            open: i,
            onOpenChange: (c) => {
              o(c);
            },
            placement: "bottom-start",
            children: [
              /* @__PURE__ */ a(Pe, { asChild: !0, children: /* @__PURE__ */ a(
                I,
                {
                  type: "icon",
                  visible: !0,
                  selected: i,
                  icon: qi,
                  title: t("general.menu"),
                  "aria-label": t("general.menu"),
                  onPointerDown: () => {
                    o(!i);
                  }
                }
              ) }),
              /* @__PURE__ */ a(Le, { container: r, children: /* @__PURE__ */ k(
                at,
                {
                  onSelect: () => {
                    o(!1);
                  },
                  children: [
                    /* @__PURE__ */ a(Io, {}),
                    /* @__PURE__ */ a(_o, {}),
                    /* @__PURE__ */ a(Fo, {}),
                    /* @__PURE__ */ a(No, {}),
                    /* @__PURE__ */ a(Bo, {}),
                    /* @__PURE__ */ a(Ao, {}),
                    /* @__PURE__ */ a(Ro, {})
                  ]
                }
              ) })
            ]
          },
          0
        ),
        /* @__PURE__ */ a(
          I,
          {
            type: "icon",
            icon: fl,
            visible: !0,
            title: t("general.undo"),
            "aria-label": t("general.undo"),
            onPointerUp: () => {
              e.undo();
            },
            disabled: s
          },
          1
        ),
        /* @__PURE__ */ a(
          I,
          {
            type: "icon",
            icon: hl,
            visible: !0,
            title: t("general.redo"),
            "aria-label": t("general.redo"),
            onPointerUp: () => {
              e.redo();
            },
            disabled: l
          },
          2
        ),
        n.length > 0 && /* @__PURE__ */ a(
          I,
          {
            className: "duplicate",
            type: "icon",
            icon: ml,
            visible: !0,
            title: t("general.duplicate"),
            "aria-label": t("general.duplicate"),
            onPointerUp: () => {
              oa(e);
            }
          },
          3
        ),
        n.length > 0 && /* @__PURE__ */ a(
          I,
          {
            className: "trash",
            type: "icon",
            icon: Rt,
            visible: !0,
            title: t("general.delete"),
            "aria-label": t("general.delete"),
            onPointerUp: () => {
              aa(e);
            }
          },
          4
        )
      ] })
    }
  );
}, k1 = (e) => (r) => {
  const { globalKeyDown: n, keyDown: i } = r;
  return r.globalKeyDown = (o) => {
    if (!(o.target instanceof HTMLInputElement || o.target instanceof HTMLTextAreaElement) && (F.getMovingPointInBoard(r) || F.isMovingPointInBoard(r)) && !F.hasBeenTextEditing(r)) {
      if (Ee.isHotkey(["mod+shift+e"], { byKey: !0 })(o)) {
        It(r, !0), o.preventDefault();
        return;
      }
      if (Ee.isHotkey(["mod+s"], { byKey: !0 })(o)) {
        Wi(r), o.preventDefault();
        return;
      }
      if (Ee.isHotkey(["mod+backspace"])(o) || Ee.isHotkey(["mod+delete"])(o)) {
        e({
          openCleanConfirm: !0
        }), o.preventDefault();
        return;
      }
      if (Ee.isHotkey(["mod+u"])(o) && so(r), !o.altKey && !o.metaKey && !o.ctrlKey) {
        if (o.key === "h" && (te.updatePointerType(r, Ce.hand), e({ pointer: Ce.hand })), o.key === "v" && (te.updatePointerType(
          r,
          Ce.selection
        ), e({ pointer: Ce.selection })), o.key === "m" && (he(r, me.dnd), te.updatePointerType(r, kr.mind), e({ pointer: kr.mind })), o.key === "e" && (he(r, me.drawing), te.updatePointerType(r, ge.eraser), e({ pointer: ge.eraser })), o.key === "p" && (he(r, me.drawing), te.updatePointerType(r, ge.feltTipPen), e({ pointer: ge.feltTipPen })), o.key === "a" && !Ee.isHotkey(["mod+a"])(o) && Te(r).length === 0 && (he(r, me.drawing), te.updatePointerType(r, We.straight), e({ pointer: We.straight })), o.key === "r" || o.key === "o" || o.key === "t") {
          const l = {
            r: ce.rectangle,
            o: ce.ellipse,
            t: ce.text
          };
          l[o.key] === ce.text ? he(r, me.dnd) : he(r, me.drawing), te.updatePointerType(r, l[o.key]), e({ pointer: l[o.key] });
        }
        o.preventDefault();
        return;
      }
    }
    n(o);
  }, r.keyDown = (o) => {
    if (Ee.isHotkey(["mod+z"], { byKey: !0 })(o)) {
      r.undo(), o.preventDefault();
      return;
    }
    if (Ee.isHotkey(["mod+shift+z"], { byKey: !0 })(o)) {
      r.redo(), o.preventDefault();
      return;
    }
    i(o);
  }, r;
};
function x1() {
  return [ge.feltTipPen, ge.eraser];
}
const ii = (e, t) => ({
  id: ca(),
  type: "freehand",
  shape: e,
  points: t
}), zo = (e, t, r) => {
  const n = sa(e, r, t) || r, i = t.points;
  return Da(t.points) ? la(n, i) || sn(i, n) : sn(i, n);
}, E1 = (e, t, r) => {
  const n = tt.getRectangleByPoints([
    r.anchor,
    r.focus
  ]);
  return Ma(
    n,
    t.points,
    t.angle
  );
}, oi = (e) => Te(e).filter((t) => ye.isFreehand(t)), O1 = (e) => Vi[e].strokeColor, S1 = (e) => Vi[e].fill, P1 = (e, t) => {
  const r = O1(
    e.theme.themeColorMode
  );
  return t.strokeColor || r;
}, L1 = (e, t) => {
  const r = ye.isFreehand(t) && Nr(e, t) ? S1(e.theme.themeColorMode) : _a.fill;
  return t.fill || r;
};
function T1(e, t) {
  return Math.exp(-(e * e) / (2 * t * t));
}
function M1(e, t, r) {
  if (e.length < 2) return e;
  const n = Math.floor(r / 2), i = [];
  function o(l) {
    if (l < 0) {
      const c = -l - 1;
      if (c < e.length)
        return [
          2 * e[0][0] - e[c][0],
          2 * e[0][1] - e[c][1]
        ];
    } else if (l >= e.length) {
      const c = 2 * e.length - l - 1;
      if (c >= 0)
        return [
          2 * e[e.length - 1][0] - e[c][0],
          2 * e[e.length - 1][1] - e[c][1]
        ];
    }
    return e[l];
  }
  function s(l) {
    const c = Math.min(l, e.length - 1 - l);
    return Math.min(n, c + Math.floor(n / 2));
  }
  for (let l = 0; l < e.length; l++) {
    let c = 0, u = 0, d = 0;
    const h = s(l);
    for (let f = -h; f <= h; f++) {
      const m = l + f, w = o(m);
      let p = T1(f, t);
      if (l < n || l >= e.length - n) {
        const y = 1 + 0.5 * (1 - Math.abs(f) / h);
        p *= f === 0 ? y : 1;
      }
      c += w[0] * p, u += w[1] * p, d += p;
    }
    l === 0 || l === e.length - 1 ? i.push([e[l][0], e[l][1]]) : i.push([c / d, u / d]);
  }
  return i;
}
class jo extends ba {
  draw(t) {
    const r = Ia(t), n = P1(this.board, t), i = L1(this.board, t), o = { strokeWidth: r, stroke: n, fill: i, fillStyle: "solid" }, s = F.getRoughSVG(this.board).curve(
      M1(t.points, 1, 3),
      o
    );
    return ua(s, "round"), s;
  }
  canDraw(t) {
    return !0;
  }
}
class D1 extends ka {
  constructor() {
    super();
  }
  initializeGenerator() {
    this.activeGenerator = xa(this.board, {
      getRectangle: (t) => tt.getRectangleByPoints(t.points),
      getStrokeWidth: () => da,
      getStrokeOpacity: () => 1,
      hasResizeHandle: () => Ea(this.board, this.element)
    }), this.generator = new jo(this.board);
  }
  initialize() {
    super.initialize(), this.initializeGenerator(), this.generator.processDrawing(this.element, this.getElementG());
  }
  onContextChanged(t, r) {
    t.element !== r.element || t.hasThemeChanged ? (this.generator.processDrawing(this.element, this.getElementG()), this.activeGenerator.processDrawing(
      this.element,
      F.getActiveHost(this.board),
      {
        selected: this.selected
      }
    )) : (t.selected !== r.selected || t.selected) && this.activeGenerator.processDrawing(
      this.element,
      F.getActiveHost(this.board),
      {
        selected: this.selected
      }
    );
  }
  destroy() {
    var t;
    super.destroy(), (t = this.activeGenerator) == null || t.destroy();
  }
}
class _1 {
  constructor(t = {}) {
    this.defaultOptions = {
      smoothing: 0.65,
      velocityWeight: 0.2,
      curvatureWeight: 0.3,
      minDistance: 0.2,
      // 降低最小距离阈值
      maxPoints: 8,
      pressureSensitivity: 0.5,
      tiltSensitivity: 0.3,
      velocityThreshold: 800,
      samplingRate: 5
      // 降低采样间隔
    }, this.points = [], this.lastProcessedTime = 0, this.movingAverageVelocity = [], this.velocityWindowSize = 3, this.options = { ...this.defaultOptions, ...t };
  }
  process(t, r = {}) {
    const n = r.timestamp ?? Date.now();
    if (this.points.length === 0) {
      const c = { point: t, timestamp: n, ...r };
      return this.points.push(c), this.lastProcessedTime = n, t;
    }
    if (n - this.lastProcessedTime < this.options.samplingRate && n - this.lastProcessedTime < 2)
      return null;
    const i = {
      point: t,
      timestamp: n,
      ...r
    };
    if (!this.checkDistance(t) && this.points.length > 1 && n - this.lastProcessedTime < 32)
      return null;
    this.updatePoints(i);
    const s = this.calculateDynamicParameters(i), l = this.smooth(t, s);
    return this.lastProcessedTime = n, l;
  }
  reset() {
    this.points = [], this.lastProcessedTime = 0, this.movingAverageVelocity = [];
  }
  updatePoints(t) {
    this.points.push(t), this.points.length > this.options.maxPoints && this.points.shift();
  }
  checkDistance(t) {
    if (this.points.length === 0) return !0;
    const r = this.points[this.points.length - 1].point, n = this.getDistance(r, t);
    let i = this.options.minDistance;
    if (this.movingAverageVelocity.length > 0) {
      const o = this.getAverageVelocity();
      i *= Math.max(0.5, Math.min(1.5, o / 200));
    }
    return n >= i;
  }
  calculateDynamicParameters(t) {
    const r = this.calculateVelocity(t);
    this.updateMovingAverage(r);
    const n = this.getAverageVelocity(), i = { ...this.options };
    if (t.pressure !== void 0) {
      const s = Math.pow(t.pressure, 1.2);
      i.smoothing *= 1 - s * i.pressureSensitivity * 0.8;
    }
    const o = Math.min(n / i.velocityThreshold, 1);
    if (i.velocityWeight = 0.2 + o * 0.3, i.smoothing *= 1 + o * 0.2, t.tiltX !== void 0 && t.tiltY !== void 0) {
      const s = Math.sqrt(t.tiltX ** 2 + t.tiltY ** 2) / 90;
      i.smoothing *= 1 + s * i.tiltSensitivity * 0.7;
    }
    return i;
  }
  smooth(t, r) {
    if (this.points.length < 2) return t;
    const n = this.calculateWeights(r), i = n.reduce((s, l) => s + l, 0);
    if (i === 0) return t;
    const o = [0, 0];
    for (let s = 0; s < this.points.length; s++) {
      const l = n[s] / i;
      o[0] += this.points[s].point[0] * l, o[1] += this.points[s].point[1] * l;
    }
    return o;
  }
  calculateWeights(t) {
    const r = [], n = this.points.length - 1;
    for (let i = 0; i < this.points.length; i++) {
      let o = Math.pow(t.smoothing, (n - i) * 0.8);
      if (i < n) {
        const s = this.getPointVelocity(i);
        o *= 1 + s * t.velocityWeight * 0.8;
      }
      if (i > 0 && i < n) {
        const s = this.getPointCurvature(i);
        o *= 1 + s * t.curvatureWeight * 0.7;
      }
      r.push(o);
    }
    return r;
  }
  // 工具方法保持不变
  getDistance(t, r) {
    return pi(t[0], t[1], r[0], r[1]);
  }
  calculateVelocity(t) {
    if (this.points.length < 2) return 0;
    const r = this.points[this.points.length - 1], n = this.getDistance(r.point, t.point), i = t.timestamp - r.timestamp;
    return i > 0 ? n / i : 0;
  }
  updateMovingAverage(t) {
    this.movingAverageVelocity.push(t), this.movingAverageVelocity.length > this.velocityWindowSize && this.movingAverageVelocity.shift();
  }
  getAverageVelocity() {
    return this.movingAverageVelocity.length === 0 ? 0 : this.movingAverageVelocity.reduce((t, r) => t + r) / this.movingAverageVelocity.length;
  }
  getPointVelocity(t) {
    if (t >= this.points.length - 1) return 0;
    const r = this.points[t], n = this.points[t + 1], i = this.getDistance(r.point, n.point), o = n.timestamp - r.timestamp;
    return o > 0 ? i / o : 0;
  }
  getPointCurvature(t) {
    if (t <= 0 || t >= this.points.length - 1) return 0;
    const r = this.points[t - 1].point, n = this.points[t].point, i = this.points[t + 1].point, o = this.getDistance(r, n), s = this.getDistance(n, i), l = this.getDistance(r, i), c = (o + s + l) / 2;
    return 4 * Math.sqrt(Math.max(0, c * (c - o) * (c - s) * (c - l))) / (o * s * l + 1e-4);
  }
}
const I1 = (e) => {
  const { pointerDown: t, pointerMove: r, pointerUp: n, globalPointerUp: i } = e;
  let o = !1, s = !1, l = [], c = null;
  const u = new jo(e), d = new _1({
    smoothing: 0.7,
    pressureSensitivity: 0.6
  });
  let h = null;
  const f = (m) => {
    if (o) {
      const w = F.getPointer(e);
      s && l.push(l[0]), h = ii(w, l);
    }
    h && !m && Fe.insertNode(e, h, [e.children.length]), u == null || u.destroy(), h = null, o = !1, l = [], d.reset();
  };
  return e.pointerDown = (m) => {
    const w = x1();
    if (F.isInPointer(e, w) && Ei(e)) {
      o = !0, c = [m.x, m.y];
      const y = d.process(c), g = ft(
        e,
        ht(e, y[0], y[1])
      );
      l.push(g);
    }
    t(m);
  }, e.pointerMove = (m) => {
    if (o) {
      const w = [m.x, m.y];
      c && pi(
        c[0],
        c[1],
        w[0],
        w[1]
      ) < 8 ? s = !0 : s = !1;
      const p = d.process(w);
      if (p) {
        u == null || u.destroy();
        const y = ft(
          e,
          ht(e, p[0], p[1])
        );
        l.push(y);
        const g = F.getPointer(e);
        h = ii(g, l), u.processDrawing(
          h,
          F.getElementTopHost(e)
        );
      }
      return;
    }
    r(m);
  }, e.pointerUp = (m) => {
    f(), n(m);
  }, e.globalPointerUp = (m) => {
    f(!0), i(m);
  }, e;
}, F1 = (e) => {
  const t = e, { getDeletedFragment: r, buildFragment: n, insertFragment: i } = t;
  return t.getDeletedFragment = (o) => {
    const s = oi(t);
    return s.length && o.push(...s), r(o);
  }, t.buildFragment = (o, s, l, c) => {
    const u = oi(t);
    if (u.length) {
      const d = Oa(
        t,
        u,
        s ? [s.x, s.y] : [0, 0]
      );
      o = fa(o, {
        text: "",
        type: ha.elements,
        elements: d
      });
    }
    return n(
      o,
      s,
      l,
      c
    );
  }, t.insertFragment = (o, s, l) => {
    var u;
    const c = (u = o == null ? void 0 : o.elements) == null ? void 0 : u.filter(
      (d) => ye.isFreehand(d)
    );
    c && c.length > 0 && Sa(t, c, s), i(o, s, l);
  }, t;
}, N1 = (e) => {
  const { pointerDown: t, pointerMove: r, pointerUp: n, globalPointerUp: i } = e;
  let o = !1;
  const s = /* @__PURE__ */ new Set(), l = (d) => {
    const h = ft(e, ht(e, d[0], d[1]));
    e.children.filter(
      (m) => ye.isFreehand(m)
    ).forEach((m) => {
      !s.has(m.id) && zo(e, m, h) && (ma.getElementG(m).style.opacity = "0.2", s.add(m.id));
    });
  }, c = () => {
    if (s.size > 0) {
      const d = e.children.filter(
        (h) => s.has(h.id)
      );
      d.length > 0 && ga.removeElements(e, d);
    }
  }, u = () => {
    o && (c(), o = !1, s.clear());
  };
  return e.pointerDown = (d) => {
    if (F.isInPointer(e, [ge.eraser]) && Ei(e)) {
      o = !0, s.clear();
      const f = [d.x, d.y];
      l(f);
      return;
    }
    t(d);
  }, e.pointerMove = (d) => {
    if (o) {
      vi(e, "with-freehand-erase", () => {
        const h = [d.x, d.y];
        l(h);
      });
      return;
    }
    r(d);
  }, e.pointerUp = (d) => {
    if (o) {
      u();
      return;
    }
    n(d);
  }, e.globalPointerUp = (d) => {
    if (o) {
      u();
      return;
    }
    i(d);
  }, e;
}, R1 = (e) => {
  const {
    getRectangle: t,
    drawElement: r,
    isHit: n,
    isRectangleHit: i,
    getOneHitElement: o,
    isMovable: s,
    isAlign: l
  } = e;
  return e.drawElement = (c) => ye.isFreehand(c.element) ? D1 : r(c), e.getRectangle = (c) => ye.isFreehand(c) ? tt.getRectangleByPoints(c.points) : t(c), e.isRectangleHit = (c, u) => ye.isFreehand(c) ? E1(e, c, u) : i(c, u), e.isHit = (c, u, d) => ye.isFreehand(c) ? zo(e, c, u) : n(c, u, d), e.getOneHitElement = (c) => c.every((d) => ye.isFreehand(d)) ? Fa(e, c) : o(c), e.isMovable = (c) => ye.isFreehand(c) ? !0 : s(c), e.isAlign = (c) => ye.isFreehand(c) ? !0 : l(c), e.setPluginOptions(
    Na,
    { customGeometryTypes: [Yi] }
  ), N1(F1(I1(e)));
}, A1 = () => {
  const e = J(), { t } = Q(), r = e.theme;
  return /* @__PURE__ */ a(
    de,
    {
      padding: 1,
      className: T("theme-toolbar", Ne),
      children: /* @__PURE__ */ k(
        "select",
        {
          onChange: (n) => {
            const i = n.target.value;
            te.updateThemeColor(e, i);
          },
          value: r.themeColorMode,
          children: [
            /* @__PURE__ */ a("option", { value: "default", children: t("theme.default") }),
            /* @__PURE__ */ a("option", { value: "colorful", children: t("theme.colorful") }),
            /* @__PURE__ */ a("option", { value: "soft", children: t("theme.soft") }),
            /* @__PURE__ */ a("option", { value: "retro", children: t("theme.retro") }),
            /* @__PURE__ */ a("option", { value: "dark", children: t("theme.dark") }),
            /* @__PURE__ */ a("option", { value: "starry", children: t("theme.starry") })
          ]
        }
      )
    }
  );
}, Ho = /* @__PURE__ */ new WeakMap(), ai = (e) => !!Ho.get(e), Uo = (e, t) => {
  Ho.set(e, t);
}, B1 = (e) => (r) => {
  const { pointerDown: n } = r;
  return r.pointerDown = (i) => {
    on(i) && !ai(r) && (Uo(r, !0), e({ isPencilMode: !0 })), !(ai(r) && !on(i)) && n(i);
  }, r;
}, z1 = () => {
  const e = J(), { appState: t, setAppState: r } = ke();
  return /* @__PURE__ */ a(be, { children: t.isPencilMode && /* @__PURE__ */ a("div", { className: "pencil-mode-toolbar", children: /* @__PURE__ */ a(
    I,
    {
      type: "button",
      visible: !0,
      title: "X Pencil",
      "aria-label": "Arrow",
      label: "Pencil X",
      onPointerDown: () => {
        r({ ...t, isPencilMode: !1 }), Uo(e, !1);
      }
    }
  ) }) });
};
function j1({
  initialOpen: e = !1,
  open: t,
  onOpenChange: r
} = {}) {
  const [n, i] = U.useState(e), [o, s] = U.useState(), [l, c] = U.useState(), u = t ?? n, d = r ?? i, h = Kt({
    open: u,
    onOpenChange: d
  }), f = h.context, m = Ni(f, {
    enabled: t == null
  }), w = Ri(f, { outsidePressEvent: "mousedown" }), p = Ai(f), y = Bi([m, w, p]);
  return U.useMemo(
    () => ({
      open: u,
      setOpen: d,
      ...y,
      ...h,
      labelId: o,
      descriptionId: l,
      setLabelId: s,
      setDescriptionId: c
    }),
    [u, d, y, h, o, l]
  );
}
const Wo = U.createContext(null), Et = () => {
  const e = U.useContext(Wo);
  if (e == null)
    throw new Error("Dialog components must be wrapped in <Dialog />");
  return e;
};
function Dr({
  children: e,
  ...t
}) {
  const r = j1(t);
  return /* @__PURE__ */ a(Wo.Provider, { value: r, children: e });
}
U.forwardRef(function({ children: t, asChild: r = !1, ...n }, i) {
  const o = Et(), s = t.ref, l = Wt([o.refs.setReference, i, s]);
  return r && U.isValidElement(t) ? U.cloneElement(
    t,
    o.getReferenceProps({
      ref: l,
      ...n,
      ...t.props,
      "data-state": o.open ? "open" : "closed"
    })
  ) : /* @__PURE__ */ a(
    "button",
    {
      ref: l,
      "data-state": o.open ? "open" : "closed",
      ...o.getReferenceProps(n),
      children: t
    }
  );
});
const _r = U.forwardRef(function(t, r) {
  const { context: n, ...i } = Et(), o = Wt([i.refs.setFloating, r]);
  return n.open ? /* @__PURE__ */ a(Ii, { root: t.container, children: /* @__PURE__ */ a(Wa, { className: "Dialog-overlay", lockScroll: !0, children: /* @__PURE__ */ a(Fi, { context: n, children: /* @__PURE__ */ a(
    "div",
    {
      ref: o,
      "aria-labelledby": i.labelId,
      "aria-describedby": i.descriptionId,
      ...i.getFloatingProps(t),
      children: t.children
    }
  ) }) }) }) : null;
});
U.forwardRef(function({ children: t, ...r }, n) {
  const { setLabelId: i } = Et(), o = zi();
  return U.useLayoutEffect(() => (i(o), () => i(void 0)), [o, i]), /* @__PURE__ */ a("h2", { ...r, ref: n, id: o, children: t });
});
U.forwardRef(function({ children: t, ...r }, n) {
  const { setDescriptionId: i } = Et(), o = zi();
  return U.useLayoutEffect(() => (i(o), () => i(void 0)), [o, i]), /* @__PURE__ */ a("p", { ...r, ref: n, id: o, children: t });
});
U.forwardRef(function(t, r) {
  const { setOpen: n } = Et();
  return /* @__PURE__ */ a("button", { type: "button", ...t, ref: r, onClick: () => n(!1) });
});
const Ko = ({ children: e }) => /* @__PURE__ */ a("div", { className: "ttd-dialog-panels", children: e }), Ht = ({
  label: e,
  children: t,
  panelAction: r,
  panelActionDisabled: n = !1,
  onTextSubmitInProgress: i,
  renderTopRight: o,
  renderSubmitShortcut: s,
  renderBottomRight: l
}) => /* @__PURE__ */ k("div", { className: "ttd-dialog-panel", children: [
  /* @__PURE__ */ k("div", { className: "ttd-dialog-panel__header", children: [
    /* @__PURE__ */ a("label", { children: e }),
    o == null ? void 0 : o()
  ] }),
  t,
  /* @__PURE__ */ k(
    "div",
    {
      className: T("ttd-dialog-panel-button-container", {
        invisible: !r
      }),
      style: { display: "flex", alignItems: "center" },
      children: [
        /* @__PURE__ */ a(
          "button",
          {
            className: "ttd-dialog-panel-button drawnix-button ",
            onClick: r && r.action,
            disabled: n || i,
            children: /* @__PURE__ */ k("div", { className: T({ invisible: i }), children: [
              r == null ? void 0 : r.label,
              (r == null ? void 0 : r.icon) && /* @__PURE__ */ a("span", { children: r.icon })
            ] })
          }
        ),
        !n && !i && (s == null ? void 0 : s()),
        l == null ? void 0 : l()
      ]
    }
  )
] }), si = {
  CTRL_OR_CMD: pa || gi ? "metaKey" : "ctrlKey",
  ENTER: "Enter"
}, qo = ({
  input: e,
  placeholder: t,
  onChange: r,
  onKeyboardSubmit: n
}) => {
  const i = Oe(null), o = Oe(n);
  return o.current = n, ne(() => {
    if (!o.current)
      return;
    const s = i.current;
    if (s) {
      const l = (c) => {
        var u;
        c[si.CTRL_OR_CMD] && c.key === si.ENTER && (c.preventDefault(), (u = o.current) == null || u.call(o));
      };
      return s.addEventListener(rt.KEYDOWN, l), () => {
        s.removeEventListener(rt.KEYDOWN, l);
      };
    }
  }, []), /* @__PURE__ */ a(
    "textarea",
    {
      className: "ttd-dialog-input",
      onChange: r,
      value: e,
      placeholder: t,
      autoFocus: !0,
      ref: i
    }
  );
}, H1 = ({ error: e }) => /* @__PURE__ */ k(
  "div",
  {
    "data-testid": "ttd-dialog-output-error",
    className: "ttd-dialog-output-error",
    children: [
      "Error! ",
      /* @__PURE__ */ a("p", { children: e })
    ]
  }
), $o = ({
  error: e,
  value: t,
  loaded: r
}) => {
  const n = [Ti, Di, Oi, Ki], i = {
    readonly: !0,
    hideScrollbar: !1,
    disabledScrollOnNonFocus: !0,
    themeColors: _i
  };
  return /* @__PURE__ */ k("div", { className: "ttd-dialog-output-wrapper", children: [
    e && /* @__PURE__ */ a(H1, { error: e.message }),
    /* @__PURE__ */ a(
      "div",
      {
        style: { opacity: e ? "0.15" : 1 },
        className: "ttd-dialog-output-canvas-container",
        children: /* @__PURE__ */ a(di, { value: t, options: i, plugins: n, children: /* @__PURE__ */ a(fi, {}) })
      }
    )
  ] });
}, Zo = () => /* @__PURE__ */ k("div", { className: "ttd-dialog-submit-shortcut", children: [
  /* @__PURE__ */ a("div", { className: "ttd-dialog-submit-shortcut__key", children: hn("CtrlOrCmd") }),
  /* @__PURE__ */ a("div", { className: "ttd-dialog-submit-shortcut__key", children: hn("Enter") })
] }), U1 = `flowchart TD
 A[Christmas] -->|Get money| B(Go shopping)
 B --> C{Let me think}
 C -->|One| D[Laptop]
 C -->|Two| E[iPhone]
 C -->|Three| F[Car]`, W1 = () => {
  const { appState: e, setAppState: t } = ke(), { t: r, language: n } = Q(), [i, o] = M({
    loaded: !1,
    api: Promise.resolve({
      parseMermaidToDrawnix: async () => ({ elements: [] })
    })
  });
  ne(() => {
    (async () => {
      try {
        const y = await import("@plait-board/mermaid-to-drawnix");
        o({
          loaded: !0,
          api: Promise.resolve(y)
        });
      } catch (y) {
        console.error("Failed to load mermaid library:", y), f(new Error(r("dialog.error.loadMermaid")));
      }
    })();
  }, []);
  const [s, l] = M(() => U1), [c, u] = M(() => []), d = bi(s.trim()), [h, f] = M(null), m = J();
  ne(() => {
    (async () => {
      try {
        const y = await i.api;
        let g;
        try {
          g = await y.parseMermaidToDrawnix(d);
        } catch {
          g = await y.parseMermaidToDrawnix(
            d.replace(/"/g, "'")
          );
        }
        const { elements: b } = g;
        u(b), f(null);
      } catch (y) {
        f(y);
      }
    })();
  }, [d, i]);
  const w = () => {
    if (!c.length)
      return;
    const p = F.getBoardContainer(m).getBoundingClientRect(), y = [
      p.width / 2,
      p.height / 2
    ], g = m.viewport.zoom, b = wi(m), C = b[0] + y[0] / g, x = b[1] + y[1] / g, O = c, D = tt.getBoundingRectangle(
      O.filter((_) => !va.isGroup(_)).map(
        (_) => tt.getRectangleByPoints(_.points)
      )
    ), $ = [
      C - D.width / 2,
      x - D.height / 2
    ];
    m.insertFragment(
      {
        elements: JSON.parse(JSON.stringify(O))
      },
      $,
      yi.paste
    ), t({ ...e, openDialogType: null });
  };
  return /* @__PURE__ */ k(be, { children: [
    /* @__PURE__ */ a("div", { className: "ttd-dialog-desc", children: n === "zh" ? /* @__PURE__ */ k(be, { children: [
      r("dialog.mermaid.description"),
      " ",
      /* @__PURE__ */ a(
        "a",
        {
          href: "https://mermaid.js.org/syntax/flowchart.html",
          target: "_blank",
          rel: "noreferrer",
          children: r("dialog.mermaid.flowchart")
        }
      ),
      "、",
      /* @__PURE__ */ a(
        "a",
        {
          href: "https://mermaid.js.org/syntax/sequenceDiagram.html",
          target: "_blank",
          rel: "noreferrer",
          children: r("dialog.mermaid.sequence")
        }
      ),
      " ",
      "和",
      " ",
      /* @__PURE__ */ a(
        "a",
        {
          href: "https://mermaid.js.org/syntax/classDiagram.html",
          target: "_blank",
          rel: "noreferrer",
          children: r("dialog.mermaid.class")
        }
      ),
      r("dialog.mermaid.otherTypes")
    ] }) : /* @__PURE__ */ k(be, { children: [
      r("dialog.mermaid.description"),
      " ",
      /* @__PURE__ */ a(
        "a",
        {
          href: "https://mermaid.js.org/syntax/flowchart.html",
          target: "_blank",
          rel: "noreferrer",
          children: r("dialog.mermaid.flowchart")
        }
      ),
      ",",
      " ",
      /* @__PURE__ */ a(
        "a",
        {
          href: "https://mermaid.js.org/syntax/sequenceDiagram.html",
          target: "_blank",
          rel: "noreferrer",
          children: r("dialog.mermaid.sequence")
        }
      ),
      ",",
      " ",
      /* @__PURE__ */ a(
        "a",
        {
          href: "https://mermaid.js.org/syntax/classDiagram.html",
          target: "_blank",
          rel: "noreferrer",
          children: r("dialog.mermaid.class")
        }
      ),
      r("dialog.mermaid.otherTypes")
    ] }) }),
    /* @__PURE__ */ k(Ko, { children: [
      /* @__PURE__ */ a(Ht, { label: r("dialog.mermaid.syntax"), children: /* @__PURE__ */ a(
        qo,
        {
          input: s,
          placeholder: r("dialog.mermaid.placeholder"),
          onChange: (p) => l(p.target.value),
          onKeyboardSubmit: () => {
            w();
          }
        }
      ) }),
      /* @__PURE__ */ a(
        Ht,
        {
          label: r("dialog.mermaid.preview"),
          panelAction: {
            action: () => {
              w();
            },
            label: r("dialog.mermaid.insert")
          },
          renderSubmitShortcut: () => /* @__PURE__ */ a(Zo, {}),
          children: /* @__PURE__ */ a(
            $o,
            {
              value: c,
              loaded: i.loaded,
              error: h
            }
          )
        }
      )
    ] })
  ] });
}, li = (e) => e === "zh" ? `# 我开始了

- 让我看看是谁搞出了这个 bug 🕵️ ♂️ 🔍
  - 😯 💣
    - 原来是我 👈 🎯 💘

- 竟然不可以运行，为什么呢 🚫 ⚙️ ❓
  - 竟然可以运行了，为什么呢？🎢 ✨
    - 🤯 ⚡ ➡️ 🎉

- 能运行起来的 🐞 🚀
  - 就不要去动它 🛑 ✋
    - 👾 💥 🏹 🎯
    
## 男孩还是女孩 👶 ❓ 🤷 ♂️ ♀️

### Hello world 👋 🌍 ✨ 💻

#### 哇 是个程序员 🤯 ⌨️ 💡 👩 💻` : `# I have started

- Let me see who made this bug 🕵️ ♂️ 🔍
  - 😯 💣
    - Turns out it was me 👈 🎯 💘

- Unexpectedly, it cannot run; why is that 🚫 ⚙️ ❓
  - Unexpectedly, it can run now; why is that? 🎢 ✨
    - 🤯 ⚡ ➡️ 🎉

- What can run 🐞 🚀
  - then do not touch it 🛑 ✋
    - 👾 💥 🏹 🎯
    
## Boy or girl 👶 ❓ 🤷 ♂️ ♀️

### Hello world 👋 🌍 ✨ 💻

#### Wow, a programmer 🤯 ⌨️ 💡 👩 💻`, K1 = () => {
  const { appState: e, setAppState: t } = ke(), { t: r, language: n } = Q(), [i, o] = M({
    loaded: !1,
    api: Promise.resolve({
      parseMarkdownToDrawnix: (p, y) => null
    })
  });
  ne(() => {
    (async () => {
      try {
        const y = await import("./index-BBoE-rOV.mjs");
        o({
          loaded: !0,
          api: Promise.resolve(y)
        });
      } catch (y) {
        console.error("Failed to load mermaid library:", y), f(new Error(r("dialog.error.loadMermaid")));
      }
    })();
  }, []);
  const [s, l] = M(() => li(n)), [c, u] = M(() => []), d = bi(s.trim()), [h, f] = M(null), m = J();
  ne(() => {
    l(li(n));
  }, [n]), ne(() => {
    (async () => {
      try {
        const y = await i.api;
        let g;
        try {
          g = await y.parseMarkdownToDrawnix(d);
        } catch {
          g = await y.parseMarkdownToDrawnix(
            d.replace(/"/g, "'")
          );
        }
        const b = g;
        b.points = [[0, 0]], b && (u([b]), f(null));
      } catch (y) {
        f(y);
      }
    })();
  }, [d, i]);
  const w = () => {
    if (!c.length)
      return;
    const p = F.getBoardContainer(m).getBoundingClientRect(), y = [
      p.width / 4,
      p.height / 2 - 20
    ], g = m.viewport.zoom, b = wi(m), C = b[0] + y[0] / g, x = b[1] + y[1] / g, O = c;
    m.insertFragment(
      {
        elements: JSON.parse(JSON.stringify(O))
      },
      [C, x],
      yi.paste
    ), t({ ...e, openDialogType: null });
  };
  return /* @__PURE__ */ k(be, { children: [
    /* @__PURE__ */ a("div", { className: "ttd-dialog-desc", children: r("dialog.markdown.description") }),
    /* @__PURE__ */ k(Ko, { children: [
      /* @__PURE__ */ a(Ht, { label: r("dialog.markdown.syntax"), children: /* @__PURE__ */ a(
        qo,
        {
          input: s,
          placeholder: r("dialog.markdown.placeholder"),
          onChange: (p) => l(p.target.value),
          onKeyboardSubmit: () => {
            w();
          }
        }
      ) }),
      /* @__PURE__ */ a(
        Ht,
        {
          label: r("dialog.markdown.preview"),
          panelAction: {
            action: () => {
              w();
            },
            label: r("dialog.markdown.insert")
          },
          renderSubmitShortcut: () => /* @__PURE__ */ a(Zo, {}),
          children: /* @__PURE__ */ a(
            $o,
            {
              value: c,
              loaded: i.loaded,
              error: h
            }
          )
        }
      )
    ] })
  ] });
}, q1 = ({ container: e }) => {
  const { appState: t, setAppState: r } = ke();
  return /* @__PURE__ */ k(be, { children: [
    /* @__PURE__ */ a(
      Dr,
      {
        open: t.openDialogType === He.mermaidToDrawnix,
        onOpenChange: (n) => {
          r({
            ...t,
            openDialogType: n ? He.mermaidToDrawnix : null
          });
        },
        children: /* @__PURE__ */ a(_r, { className: "Dialog ttd-dialog", container: e, children: /* @__PURE__ */ a(W1, {}) })
      }
    ),
    /* @__PURE__ */ a(
      Dr,
      {
        open: t.openDialogType === He.markdownToDrawnix,
        onOpenChange: (n) => {
          r({
            ...t,
            openDialogType: n ? He.markdownToDrawnix : null
          });
        },
        children: /* @__PURE__ */ a(_r, { className: "Dialog ttd-dialog", container: e, children: /* @__PURE__ */ a(K1, {}) })
      }
    )
  ] });
}, $1 = ({
  container: e
}) => {
  const { appState: t, setAppState: r } = ke(), { t: n } = Q(), i = J();
  return /* @__PURE__ */ a(
    Dr,
    {
      open: t.openCleanConfirm,
      onOpenChange: (o) => {
        r({ ...t, openCleanConfirm: o });
      },
      children: /* @__PURE__ */ k(_r, { className: "clean-confirm", container: e, children: [
        /* @__PURE__ */ a("h2", { className: "clean-confirm__title", children: n("cleanConfirm.title") }),
        /* @__PURE__ */ a("p", { className: "clean-confirm__description", children: n("cleanConfirm.description") }),
        /* @__PURE__ */ k("div", { className: "clean-confirm__actions", children: [
          /* @__PURE__ */ a(
            "button",
            {
              className: "clean-confirm__button clean-confirm__button--cancel",
              onClick: () => {
                r({ ...t, openCleanConfirm: !1 });
              },
              children: n("cleanConfirm.cancel")
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              className: "clean-confirm__button clean-confirm__button--ok",
              autoFocus: !0,
              onClick: () => {
                i.deleteFragment(i.children), r({ ...t, openCleanConfirm: !1 });
              },
              children: n("cleanConfirm.ok")
            }
          )
        ] })
      ] })
    }
  );
}, ci = (e) => {
  const { appState: t } = e;
  return t && t.linkState && t.linkState.isHovering;
}, ui = (e) => {
  const { appState: t } = e;
  return t && t.linkState && t.linkState.isEditing;
}, Z1 = (e) => (r) => {
  const { pointerMove: n } = r;
  let i = null, o = null;
  return r.pointerMove = (s) => {
    (F.isPointer(r, Ce.selection) || F.isPointer(r, Ce.hand)) && !br(r) && !xi(r) && !ci(r) && !ui(r) && vi(r, "with-text-link", () => {
      const l = s.target.closest(
        ".plait-board-link"
      );
      if (l && l !== i) {
        const c = l.closest(
          ".plait-text-container"
        ), u = et.toSlateNode(
          void 0,
          c
        ), d = et.toSlateNode(
          void 0,
          l
        );
        i = l, e({
          linkState: {
            targetDom: l,
            targetElement: d,
            editor: u,
            isEditing: !1,
            isHovering: !1,
            isHoveringOrigin: !0
          }
        }), clearTimeout(o);
      } else
        !l && i && (o = setTimeout(() => {
          !ci(r) && !ui(r) && e({
            linkState: null
          });
        }, 300), i = null);
    }), n(s);
  }, r;
}, G1 = "sk-o2VwufJTd4Un6aUgTfSwON547FA1Ztz3upNEmepySuPPRgI2", V1 = "https://api.tu-zi.com/v1";
async function Y1(e, t) {
  var r, n, i, o;
  try {
    const s = e.map((h) => ({
      type: "image_url",
      image_url: { url: h }
    })), l = await fetch(`${V1}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${G1}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: t },
              ...s
            ]
          }
        ],
        stream: !0
      })
    });
    if (!l.ok)
      throw new Error(`API调用失败: ${l.statusText}`);
    let c = "";
    const u = (r = l.body) == null ? void 0 : r.getReader();
    if (u) {
      const h = new TextDecoder();
      for (; ; ) {
        const { done: f, value: m } = await u.read();
        if (f) break;
        const p = h.decode(m).split(`
`);
        for (const y of p)
          if (y.startsWith("data: ") && y !== "data: [DONE]")
            try {
              const b = (o = (i = (n = JSON.parse(y.slice(6)).choices) == null ? void 0 : n[0]) == null ? void 0 : i.delta) == null ? void 0 : o.content;
              b && (c += b);
            } catch {
            }
      }
    }
    const d = c.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
    return d ? {
      success: !0,
      imageUrl: d[0]
    } : {
      success: !1,
      error: "未找到生成的图片"
    };
  } catch (s) {
    return {
      success: !1,
      error: s instanceof Error ? s.message : "未知错误"
    };
  }
}
const X1 = (e) => {
  const t = { ...e }, { pointerDown: r } = e;
  return t.pointerDown = (n) => {
    if (n.button === 2 && Te(e).some((s) => s.type === "image" || se.isMindElement(e, s) && se.hasImage(s)) && window.__drawnix_ai_image_handler) {
      n.preventDefault(), window.__drawnix_ai_image_handler.showMenu(e, {
        x: n.clientX,
        y: n.clientY
      });
      return;
    }
    r(n);
  }, t;
};
async function J1(e, t) {
  const r = Te(e), n = [];
  if (r.forEach((i) => {
    if (i.type === "image") {
      const o = i;
      n.push(o.url);
    } else if (se.isMindElement(e, i) && se.hasImage(i)) {
      const o = i;
      n.push(o.data.image.url);
    }
  }), n.length === 0)
    return alert("请先选择图片"), !1;
  try {
    const i = await Y1(n, t);
    if (i.success && i.imageUrl) {
      const s = await (await fetch(i.imageUrl)).blob(), l = new File([s], "ai-processed.png", { type: "image/png" });
      return await Nt(e, l), !0;
    } else
      return alert(`处理失败: ${i.error}`), !1;
  } catch (i) {
    return alert(`处理失败: ${i}`), !1;
  }
}
const Q1 = () => {
  var p, y, g, b;
  const [e, t] = M(""), { appState: r, setAppState: n } = ke(), i = J(), { refs: o, floatingStyles: s } = Kt({
    placement: "top",
    middleware: [Rr(20), Ar()]
  }), l = r.linkState, c = ((p = r.linkState) == null ? void 0 : p.targetDom) || null, u = ((y = r.linkState) == null ? void 0 : y.isEditing) || !1, d = ((g = r.linkState) == null ? void 0 : g.isHoveringOrigin) || !1, h = ((b = r.linkState) == null ? void 0 : b.isHovering) || !1, f = u || d || h, m = Oe(r.linkState);
  ne(() => {
    m.current = r.linkState, r.linkState ? t(r.linkState.targetElement.url) : t("");
  }, [r.linkState]), ne(() => {
    if (c) {
      const C = c.getBoundingClientRect();
      o.setPositionReference({
        getBoundingClientRect() {
          return {
            x: C.x,
            y: C.y,
            width: C.width,
            height: C.height,
            top: C.y,
            left: C.x,
            right: C.x + C.width,
            bottom: C.y + C.height
          };
        }
      });
    }
  }, [i.viewport, c]), ne(() => {
    const C = (x) => {
      if (o.floating.current && !o.floating.current.contains(x.target)) {
        if (m.current) {
          const O = Je.getLinkElement(
            m.current.editor
          );
          O && !O[0].url.trim() && Je.unwrapLink(m.current.editor);
        }
        n({
          ...r,
          linkState: null
        });
      }
    };
    return document.addEventListener("mousedown", C), () => {
      document.removeEventListener("mousedown", C);
    };
  }, []);
  const w = () => {
    if (e !== l.targetElement.url) {
      const x = l.editor, O = l.targetElement, D = et.findPath(x, O);
      Ke.setNodes(x, { url: e }, { at: D });
    }
    const C = Je.getLinkElement(l.editor);
    n({
      ...r,
      linkState: {
        ...r.linkState,
        targetElement: C[0],
        isEditing: !1,
        isHoveringOrigin: !0
      }
    });
  };
  return f && /* @__PURE__ */ a(
    de,
    {
      ref: o.setFloating,
      style: s,
      padding: 1,
      className: T("link-popup"),
      onPointerEnter: () => {
        h || n({
          ...r,
          linkState: {
            ...r.linkState,
            isHovering: !0
          }
        });
      },
      onPointerLeave: () => {
        u || n({
          ...r,
          linkState: {
            ...r.linkState,
            isHovering: !1
          }
        });
      },
      children: /* @__PURE__ */ a(ie.Row, { gap: 1, align: "center", children: u ? /* @__PURE__ */ k(be, { children: [
        /* @__PURE__ */ a(
          "input",
          {
            type: "text",
            value: e,
            onChange: (C) => {
              t(C.target.value);
            },
            onKeyDown: (C) => {
              C.key === "Enter" && w();
            },
            className: "link-popup__input",
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ a(
          I,
          {
            type: "icon",
            visible: !0,
            icon: Rt,
            title: "Delete link",
            "aria-label": "Delete link",
            onPointerDown: () => {
              const C = l.editor, x = l.targetElement, O = et.findPath(C, x);
              Ke.unwrapNodes(C, {
                at: O
              }), n({
                ...r,
                linkState: null
              });
            }
          }
        )
      ] }) : /* @__PURE__ */ k(be, { children: [
        /* @__PURE__ */ a(
          "a",
          {
            href: e,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "link-popup__link",
            children: e
          }
        ),
        /* @__PURE__ */ a(
          I,
          {
            className: "link-popup__edit",
            type: "icon",
            visible: !0,
            icon: Kr,
            title: "Edit link",
            "aria-label": "Edit link",
            onPointerDown: ({ event: C }) => {
              C.preventDefault(), n({
                ...r,
                linkState: {
                  ...r.linkState,
                  isEditing: !0
                }
              });
            }
          }
        ),
        /* @__PURE__ */ a(
          I,
          {
            type: "icon",
            visible: !0,
            icon: Rt,
            title: "Delete link",
            "aria-label": "Delete link",
            onPointerDown: () => {
              const C = l.editor, x = l.targetElement, O = et.findPath(C, x);
              Ke.unwrapNodes(C, {
                at: O
              }), n({
                ...r,
                linkState: null
              });
            }
          }
        )
      ] }) })
    }
  );
}, eu = ({ board: e }) => {
  const [t, r] = M(!1), [n, i] = M({ x: 0, y: 0 }), [o, s] = M(""), [l, c] = M(!1);
  ne(() => {
    if (!e) return;
    window.__drawnix_ai_image_handler = {
      showMenu: (f, m) => {
        i(m), r(!0), s("");
      }
    };
    const h = (f) => {
      const m = f.target;
      t && !m.closest("[data-ai-menu]") && r(!1);
    };
    return document.addEventListener("click", h), () => {
      delete window.__drawnix_ai_image_handler, document.removeEventListener("click", h);
    };
  }, [e, t]);
  const u = async () => {
    if (!(!e || !o.trim())) {
      c(!0);
      try {
        await J1(e, o) && r(!1);
      } finally {
        c(!1);
      }
    }
  }, d = () => {
    r(!1), s("");
  };
  return !t || !e ? null : /* @__PURE__ */ k(
    "div",
    {
      "data-ai-menu": !0,
      style: {
        position: "fixed",
        left: n.x,
        top: n.y,
        background: "white",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1e3,
        minWidth: "320px",
        maxWidth: "400px"
      },
      onClick: (h) => h.stopPropagation(),
      children: [
        /* @__PURE__ */ a("div", { style: {
          marginBottom: "12px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#2c3e50"
        }, children: "🤖 AI 图片处理" }),
        /* @__PURE__ */ a(
          "textarea",
          {
            value: o,
            onChange: (h) => s(h.target.value),
            placeholder: `输入处理指令，例如：
• 将图片转为黑白风格
• 去除背景
• 增强图片对比度`,
            style: {
              width: "100%",
              height: "80px",
              border: "1px solid #e1e5e9",
              borderRadius: "6px",
              padding: "12px",
              resize: "none",
              fontSize: "13px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: "1.4"
            },
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ k("div", { style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px",
          justifyContent: "flex-end"
        }, children: [
          /* @__PURE__ */ a(
            "button",
            {
              onClick: d,
              style: {
                background: "transparent",
                color: "#6c757d",
                border: "1px solid #e1e5e9",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500"
              },
              children: "取消"
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: u,
              disabled: l || !o.trim(),
              style: {
                background: l ? "#e9ecef" : "#007AFF",
                color: l ? "#6c757d" : "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: l ? "default" : "pointer",
                fontSize: "13px",
                fontWeight: "500"
              },
              children: l ? "🔄 处理中..." : "✨ 处理"
            }
          )
        ] })
      ]
    }
  );
}, vu = ({
  value: e,
  viewport: t,
  theme: r,
  onChange: n,
  onSelectionChange: i,
  onViewportChange: o,
  onThemeChange: s,
  onValueChange: l,
  afterInit: c
}) => {
  const u = {
    readonly: !1,
    hideScrollbar: !1,
    disabledScrollOnNonFocus: !1,
    themeColors: _i
  }, [d, h] = M(() => {
    const g = new za(window.navigator.userAgent);
    return {
      pointer: Ce.hand,
      isMobile: g.mobile() !== null,
      isPencilMode: !1,
      openDialogType: null,
      openCleanConfirm: !1
    };
  }), [f, m] = M(null);
  f && (f.appState = d);
  const w = (g) => {
    h({
      ...d,
      ...g
    });
  }, p = [
    Ti,
    Oi,
    Di,
    $a,
    Ki,
    X1,
    k1(w),
    R1,
    B1(w),
    Z1(w)
  ], y = Oe(null);
  return /* @__PURE__ */ a(Cl, { children: /* @__PURE__ */ a(to.Provider, { value: { appState: d, setAppState: h }, children: /* @__PURE__ */ a(
    "div",
    {
      className: T("drawnix", {
        "drawnix--mobile": d.isMobile
      }),
      ref: y,
      children: /* @__PURE__ */ k(
        di,
        {
          value: e,
          viewport: t,
          theme: r,
          options: u,
          plugins: p,
          onChange: (g) => {
            n && n(g);
          },
          onSelectionChange: i,
          onViewportChange: o,
          onThemeChange: s,
          onValueChange: l,
          children: [
            /* @__PURE__ */ a(
              fi,
              {
                afterInit: (g) => {
                  m(g), c && c(g);
                }
              }
            ),
            /* @__PURE__ */ a(b1, {}),
            /* @__PURE__ */ a(Il, {}),
            /* @__PURE__ */ a(Fl, {}),
            /* @__PURE__ */ a(A1, {}),
            /* @__PURE__ */ a(m1, {}),
            /* @__PURE__ */ a(Q1, {}),
            /* @__PURE__ */ a(eu, { board: f }),
            /* @__PURE__ */ a(z1, {}),
            /* @__PURE__ */ a(q1, { container: y.current }),
            /* @__PURE__ */ a($1, { container: y.current })
          ]
        }
      )
    }
  ) }) });
};
export {
  vu as D,
  Cl as I,
  st as a,
  gu as b,
  uo as c,
  fo as d,
  xt as e,
  Qe as f,
  mu as g,
  lt as h,
  Al as i,
  Bl as j,
  Ts as k,
  Ms as l,
  Ds as m,
  _s as n,
  Is as o,
  hn as p,
  It as q,
  Ze as r,
  Wr as s,
  so as t,
  ho as u,
  mo as v,
  go as w,
  pu as x,
  Q as y
};
