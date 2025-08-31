import { jsx as P, jsxs as q } from "react/jsx-runtime";
import he from "roughjs/bin/rough";
import { BOARD_TO_MOVING_POINT_IN_BOARD as $, PlaitBoard as l, BOARD_TO_MOVING_POINT as fe, hasInputOrTextareaTarget as me, setFragment as K, WritableClipboardOperationType as F, toViewBoxPoint as ge, toHostPoint as we, getClipboardData as Oe, deleteFragment as Ee, isFromViewportChange as Re, setIsFromViewportChange as Pe, updateViewportByScrolling as _e, BoardTransforms as L, initializeViewportContainer as se, initializeViewBox as U, updateViewportOffset as le, ZOOM_STEP as ye, BOARD_TO_ROUGH_SVG as j, BOARD_TO_HOST as J, IS_BOARD_ALIVE as Q, BOARD_TO_ELEMENT_HOST as b, PlaitBoardContext as ve, BOARD_TO_CONTEXT as ee, KEY_TO_ELEMENT_MAP as te, initializeViewportOffset as Te, BOARD_TO_AFTER_CHANGE as V, BOARD_TO_ON_CHANGE as z, HOST_CLASS_NAME as Be, IS_SAFARI as xe, IS_CHROME as Me, IS_FIREFOX as Se, getPointBetween as ne, getViewportOrigination as Ie, distanceBetweenPointAndPoint as oe, MIN_ZOOM as Ce, MAX_ZOOM as De, PlaitOperation as M, isFromScrolling as Ne, setIsFromScrolling as He, updateViewBox as Ae, getSelectedElements as Fe, PlaitElement as Ve, FLUSHING as ze, withRelatedFragment as Le, withHotkey as Ue, withHandPointer as Ge, withHistory as ke, withSelection as Xe, withMoving as Ze, withBoard as We, withI18n as Ye, withOptions as qe, createBoard as $e, ListRender as Ke } from "@plait/core";
import { useRef as R, useEffect as H, createContext as je, useContext as ce, useState as Je, useCallback as Qe } from "react";
import be from "classnames";
import { useEventListener as g } from "ahooks";
import et from "react-dom";
import { Text as ie } from "@plait-board/react-text";
import { ReactEditor as N } from "slate-react";
import { withImage as tt, withText as nt } from "@plait/common";
const ot = (e, s, f) => {
  g(
    "pointerdown",
    (t) => {
      e.pointerDown(t);
    },
    { target: f }
  ), g(
    "pointermove",
    (t) => {
      $.set(e, [t.x, t.y]), e.pointerMove(t);
    },
    { target: s }
  ), g(
    "pointerleave",
    (t) => {
      $.delete(e), e.pointerLeave(t);
    },
    { target: s }
  ), g(
    "pointerup",
    (t) => {
      e.pointerUp(t);
    },
    { target: s }
  ), g(
    "dblclick",
    (t) => {
      l.isFocus(e) && !l.hasBeenTextEditing(e) && e.dblClick(t);
    },
    { target: f }
  ), g("pointermove", (t) => {
    fe.set(e, [t.x, t.y]), e.globalPointerMove(t);
  }), g("pointerup", (t) => {
    e.globalPointerUp(t);
  }), g("keydown", (t) => {
    e.globalKeyDown(t), l.isFocus(e) && !l.hasBeenTextEditing(e) && !me(t.target) && e.keyDown(t);
  }), g("keyup", (t) => {
    l.isFocus(e) && !l.hasBeenTextEditing(e) && (e == null || e.keyUp(t));
  }), g("copy", (t) => {
    l.isFocus(e) && !l.hasBeenTextEditing(e) && (t.preventDefault(), K(
      e,
      F.copy,
      t.clipboardData
    ));
  }), g("paste", async (t) => {
    if (l.isFocus(e) && !l.isReadonly(e) && !l.hasBeenTextEditing(e)) {
      const c = l.getMovingPointInBoard(e);
      if (c) {
        const o = ge(
          e,
          we(e, c[0], c[1])
        ), h = await Oe(
          t.clipboardData
        );
        e.insertFragment(
          h,
          o,
          F.paste
        );
      }
    }
  }), g("cut", (t) => {
    l.isFocus(e) && !l.isReadonly(e) && !l.hasBeenTextEditing(e) && (t.preventDefault(), K(
      e,
      F.cut,
      t.clipboardData
    ), Ee(e));
  }), g(
    "drop",
    (t) => {
      l.isReadonly(e) || (t.preventDefault(), e.drop(t));
    },
    { target: s }
  ), g(
    "dragover",
    (t) => {
      t.preventDefault();
    },
    { target: s }
  );
}, it = (e, s) => {
  g(
    "scroll",
    (t) => {
      if (Re(e))
        Pe(e, !1);
      else {
        const { scrollLeft: c, scrollTop: o } = t.target;
        _e(e, c, o);
      }
    },
    { target: s }
  ), g(
    "touchstart",
    (t) => {
      t.preventDefault();
    },
    { target: s, passive: !1 }
  ), g(
    "wheel",
    (t) => {
      if (t.metaKey || t.ctrlKey) {
        t.preventDefault();
        const { deltaX: c, deltaY: o } = t, h = e.viewport.zoom, r = Math.sign(o), u = ye * 100, a = Math.abs(o);
        let p = o;
        a > u && (p = u * r);
        let d = h - p / 100;
        d += Math.log10(Math.max(1, h)) * -r * // reduced amplification for small deltas (small movements on a trackpad)
        Math.min(1, a / 20), L.updateZoom(
          e,
          d,
          l.getMovingPointInBoard(e)
        );
      }
    },
    { target: s, passive: !1 }
  );
  const f = R(!1);
  H(() => {
    const t = new ResizeObserver(() => {
      if (!f.current) {
        f.current = !0;
        return;
      }
      se(e), U(e), le(e);
    });
    return t.observe(l.getBoardContainer(e)), () => {
      t && t.disconnect();
    };
  }, []);
}, G = je(null), rt = () => {
  const e = ce(G);
  if (!e)
    throw new Error(
      "The `useBoard` hook must be used inside the <Plait> component's context."
    );
  const { board: s } = e;
  return s;
}, st = () => {
  const e = ce(G);
  if (!e)
    throw new Error(
      "The `useBoard` hook must be used inside the <Plait> component's context."
    );
  const { listRender: s } = e;
  return s;
}, Tt = ({
  style: e,
  className: s,
  children: f,
  afterInit: t
}) => {
  var O, T;
  const c = R(null), o = R(null), h = R(null), r = R(null), u = R(null), a = R(null), p = R(null), d = R(null), i = rt(), n = st();
  return H(() => {
    const _ = he.svg(c.current, {
      options: { roughness: 0, strokeWidth: 1 }
    });
    j.set(i, _), J.set(i, c.current), Q.set(i, !0), b.set(i, {
      lowerHost: o.current,
      host: h.current,
      upperHost: r.current,
      topHost: u.current,
      activeHost: a.current,
      container: d.current,
      viewportContainer: p.current
    });
    const y = new ve();
    return ee.set(i, y), te.set(i, /* @__PURE__ */ new Map()), n.initialized || (n.initialize(i.children, {
      board: i,
      parent: i,
      parentG: l.getElementHost(i)
    }), t && t(i)), se(i), U(i), Te(i), () => {
      ee.delete(i), V.delete(i), z.delete(i), b.delete(i), Q.delete(i), J.delete(i), j.delete(i), te.delete(i);
    };
  }, []), ot(i, p, c), it(i, p), /* @__PURE__ */ P(
    "div",
    {
      className: be(
        s,
        Be,
        `${lt()}`,
        `theme-${(O = i.theme) == null ? void 0 : O.themeColorMode}`,
        `pointer-${i.pointer}`,
        {
          focused: l.isFocus(i),
          readonly: l.isReadonly(i),
          "disabled-scroll": ((T = i.options) == null ? void 0 : T.disabledScrollOnNonFocus) && !l.isFocus(i)
        }
      ),
      ref: d,
      style: e,
      children: /* @__PURE__ */ q(
        "div",
        {
          className: "viewport-container",
          ref: p,
          style: { width: "100%", height: "100%", overflow: "auto" },
          children: [
            /* @__PURE__ */ q(
              "svg",
              {
                ref: c,
                width: "100%",
                height: "100%",
                style: { position: "relative" },
                className: "board-host-svg",
                children: [
                  /* @__PURE__ */ P("g", { className: "element-lower-host", ref: o }),
                  /* @__PURE__ */ P("g", { className: "element-host", ref: h }),
                  /* @__PURE__ */ P("g", { className: "element-upper-host", ref: r }),
                  /* @__PURE__ */ P("g", { className: "element-top-host", ref: u })
                ]
              }
            ),
            /* @__PURE__ */ P("svg", { width: "100%", height: "100%", className: "board-active-svg", children: /* @__PURE__ */ P("g", { className: "active-host-g", ref: a }) }),
            f
          ]
        }
      )
    }
  );
}, lt = () => xe ? "safari" : Me ? "chrome" : Se ? "firefox" : "";
var S = {}, re;
function ct() {
  if (re) return S;
  re = 1;
  var e = et;
  if (process.env.NODE_ENV === "production")
    S.createRoot = e.createRoot, S.hydrateRoot = e.hydrateRoot;
  else {
    var s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    S.createRoot = function(f, t) {
      s.usingClientEntryPoint = !0;
      try {
        return e.createRoot(f, t);
      } finally {
        s.usingClientEntryPoint = !1;
      }
    }, S.hydrateRoot = function(f, t, c) {
      s.usingClientEntryPoint = !0;
      try {
        return e.hydrateRoot(f, t, c);
      } finally {
        s.usingClientEntryPoint = !1;
      }
    };
  }
  return S;
}
var at = ct();
const pt = (e) => {
  const s = e;
  return s.renderText = (f, t) => {
    const c = at.createRoot(f);
    let o;
    const h = /* @__PURE__ */ P(
      ie,
      {
        ...t,
        afterInit: (a) => {
          o = a, t.afterInit && t.afterInit(a);
        }
      }
    );
    c.render(h);
    let r = { ...t };
    return {
      destroy: () => {
        setTimeout(() => {
          c.unmount();
        }, 0);
      },
      update: (a) => {
        if (!(a && r && !Object.keys(a).every(
          (i) => a[i] === r[i]
        )))
          return;
        const d = N.isReadOnly(o);
        r = { ...r, ...a }, c.render(/* @__PURE__ */ P(ie, { ...r })), d === !0 && r.readonly === !1 ? setTimeout(() => {
          N.focus(o);
        }, 0) : d === !1 && r.readonly === !0 && (N.blur(o), N.deselect(o));
      }
    };
  }, s;
}, ut = (e) => {
  const { pointerDown: s, pointerMove: f, pointerUp: t, globalPointerUp: c } = e, o = [];
  let h = !1;
  return e.pointerDown = (r) => {
    const u = [r.clientX, r.clientY];
    o.length < 2 && (e.viewport.zoom, o.push({
      pointerId: r.pointerId,
      lastPoint: u,
      currentPoint: u,
      hasMoved: !1
    })), s(r);
  }, e.pointerMove = (r) => {
    const u = [r.clientX, r.clientY];
    if (o.length >= 2) {
      const a = o.find(
        (p) => p.pointerId === r.pointerId
      );
      if (a && (a.currentPoint = u, a.hasMoved = !0, o.length === 2 && o.every((p) => p.hasMoved))) {
        const [p, d] = o, i = ne(
          ...p.lastPoint,
          ...d.lastPoint
        ), n = ne(
          ...p.currentPoint,
          ...d.currentPoint
        ), O = n[0] - i[0], T = n[1] - i[1], _ = l.getBoardContainer(e).getBoundingClientRect(), y = _.width / 2, v = _.height / 2, w = e.viewport.zoom, E = Ie(e);
        let m = E[0] + y / w - O / w, A = E[1] + v / w - T / w, I = [
          m - _.width / 2 / w,
          A - _.height / 2 / w
        ], C = w;
        const ae = oe(
          ...p.lastPoint,
          ...d.lastPoint
        ), k = oe(
          ...p.currentPoint,
          ...d.currentPoint
        ) / ae, B = [
          p.currentPoint[0] - p.lastPoint[0],
          p.currentPoint[1] - p.lastPoint[1]
        ], x = [
          d.currentPoint[0] - d.lastPoint[0],
          d.currentPoint[1] - d.lastPoint[1]
        ], pe = B[0] * x[0] + B[1] * x[1], ue = Math.sqrt(B[0] * B[0] + B[1] * B[1]), de = Math.sqrt(x[0] * x[0] + x[1] * x[1]), X = pe / (ue * de || 1);
        if (X < -0.7 || X <= 0.8 && h && k >= 0.01 ? h = !0 : h = !1, h) {
          C = Math.min(
            Math.max(e.viewport.zoom * k, Ce),
            De
          );
          const Z = l.getBoardContainer(e).getBoundingClientRect(), W = n[0] - Z.x, Y = n[1] - Z.y;
          m = I[0] + W / w, A = I[1] + Y / w, I = [
            m - W / C,
            A - Y / C
          ];
        }
        L.updateViewport(e, I, C), o.forEach((D) => {
          D.lastPoint = D.currentPoint, D.hasMoved = !1;
        });
      }
      return;
    }
    f(r);
  }, e.pointerUp = (r) => {
    const u = o.findIndex(
      (a) => a.pointerId === r.pointerId
    );
    u !== -1 && o.splice(u, 1), t(r);
  }, e.globalPointerUp = (r) => {
    const u = o.findIndex(
      (a) => a.pointerId === r.pointerId
    );
    u !== -1 && o.splice(u, 1), c(r);
  }, e;
}, Bt = ({
  value: e,
  children: s,
  options: f,
  plugins: t,
  viewport: c,
  theme: o,
  onChange: h,
  onSelectionChange: r,
  onValueChange: u,
  onViewportChange: a,
  onThemeChange: p
}) => {
  const [d, i] = Je(() => {
    const y = dt(e, f, t, c, o), v = ht(y);
    return {
      v: 0,
      board: y,
      listRender: v
    };
  }), { board: n, listRender: O } = d, T = Qe(() => {
    if (h) {
      const m = {
        children: n.children,
        operations: n.operations,
        viewport: n.viewport,
        selection: n.selection,
        theme: n.theme
      };
      h(m);
    }
    const y = n.operations.some(
      (m) => M.isSetSelectionOperation(m)
    ), v = n.operations.some(
      (m) => M.isSetViewportOperation(m)
    ), w = n.operations.some(
      (m) => M.isSetThemeOperation(m)
    ), E = n.operations.length > 0 && !n.operations.every(
      (m) => M.isSetSelectionOperation(m) || M.isSetViewportOperation(m) || M.isSetThemeOperation(m)
    );
    u && E && u(n.children), r && y && r(n.selection), a && v && a(n.viewport), p && w && p(n.theme.themeColorMode), i((m) => ({
      v: m.v + 1,
      board: n,
      listRender: O
    }));
  }, [n, h, r, u]);
  H(() => (z.set(n, () => {
    if (n.operations.length && n.operations.every((E) => E.type === "set_selection")) {
      O.update(n.children, {
        board: n,
        parent: n,
        parentG: l.getElementHost(n)
      });
      return;
    }
    const v = n.operations.length && n.operations.some((E) => E.type === "set_viewport");
    if (v && Ne(n)) {
      He(n, !1), O.update(n.children, {
        board: n,
        parent: n,
        parentG: l.getElementHost(n)
      });
      return;
    }
    O.update(n.children, {
      board: n,
      parent: n,
      parentG: l.getElementHost(n)
    }), v ? U(n) : Ae(n), le(n), Fe(n).forEach((E) => {
      Ve.getElementRef(E).updateActiveSection();
    });
  }), V.set(n, () => {
    T();
  }), () => {
    z.delete(n), V.delete(n);
  }), [n]);
  const _ = R(!0);
  return H(() => {
    if (_.current) {
      _.current = !1;
      return;
    }
    e !== d.board.children && !ze.get(n) && (n.children = e, O.update(n.children, {
      board: n,
      parent: n,
      parentG: l.getElementHost(n)
    }), L.fitViewport(n));
  }, [e]), /* @__PURE__ */ P(G.Provider, { value: d, children: s });
}, dt = (e, s, f, t, c) => {
  let o = Le(
    Ue(
      Ge(
        ke(
          Xe(
            Ze(
              We(
                Ye(
                  qe(
                    pt(tt(nt($e(e, s))))
                  )
                )
              )
            )
          )
        )
      )
    )
  );
  return f.forEach((h) => {
    o = h(o);
  }), ut(o), t && (o.viewport = t), c && (o.theme = c), o;
}, ht = (e) => new Ke(e);
export {
  Tt as Board,
  G as BoardContext,
  Bt as Wrapper,
  rt as useBoard,
  st as useListRender
};
