import { jsxs as D, jsx as o } from "react/jsx-runtime";
import { createEditor as h, Range as C, Transforms as u } from "slate";
import { isKeyHotkey as m } from "is-hotkey";
import { withReact as k, Slate as w, Editable as E } from "slate-react";
import { useCallback as T, useMemo as b, useEffect as v } from "react";
import { withHistory as L } from "slate-history";
import { isUrl as p, LinkEditor as g } from "@plait/text-plugins";
const I = (t) => {
  const e = t, { insertData: r } = e;
  return e.insertBreak = () => {
    t.insertText(`
`);
  }, e.insertSoftBreak = () => {
    t.insertText(`
`);
  }, e.insertData = (s) => {
    let n = s.getData("text/plain");
    if (!s.getData("application/x-slate-fragment") && n) {
      n.endsWith(`
`) && (n = n.substring(0, n.length - 1)), n = n.trim().replace(/\t+/g, " "), e.insertText(n);
      return;
    }
    r(s);
  }, e;
}, x = () => /* @__PURE__ */ o("span", { contentEditable: !1, style: { fontSize: 0 }, children: String.fromCodePoint(160) }), S = ({
  attributes: t,
  children: e,
  element: r
}) => /* @__PURE__ */ D(
  "a",
  {
    ...t,
    style: {
      textDecoration: "none",
      cursor: "inherit"
    },
    "data-url": r.url,
    className: "plait-board-link",
    children: [
      /* @__PURE__ */ o(x, {}),
      e,
      /* @__PURE__ */ o(x, {})
    ]
  }
), B = (t) => {
  const { insertData: e, insertText: r, isInline: s } = t;
  return t.isInline = (n) => n.type && ["link"].includes(n.type) || s(n), t.insertText = (n) => {
    n && p(n) ? g.wrapLink(t, n, n) : r(n);
  }, t.insertData = (n) => {
    const l = n.getData("text/plain");
    l && p(l) ? g.wrapLink(t, l, l) : e(n);
  }, t;
}, V = (t) => {
  const { text: e, readonly: r, onChange: s, onComposition: n, afterInit: l } = t, d = T(
    (i) => /* @__PURE__ */ o(H, { ...i }),
    []
  ), y = [e], a = b(() => {
    const i = B(
      I(L(k(h())))
    );
    return l && l(i), i;
  }, []);
  return v(() => {
    e !== a.children[0] && (a.children = [e], a.onChange());
  }, [e, a]), /* @__PURE__ */ o(
    w,
    {
      editor: a,
      initialValue: y,
      onChange: (i) => {
        s && s({
          newText: a.children[0],
          operations: a.operations
        });
      },
      children: /* @__PURE__ */ o(
        E,
        {
          className: "slate-editable-container plait-text-container",
          renderElement: (i) => /* @__PURE__ */ o(K, { ...i }),
          renderLeaf: d,
          readOnly: r === void 0 ? !0 : r,
          onCompositionStart: (i) => {
            n && n(i);
          },
          onCompositionUpdate: (i) => {
            n && n(i);
          },
          onCompositionEnd: (i) => {
            n && n(i);
          },
          onKeyDown: (i) => {
            const { selection: c } = a;
            if (c && C.isCollapsed(c)) {
              const { nativeEvent: f } = i;
              if (m("left", f)) {
                i.preventDefault(), u.move(a, { unit: "offset", reverse: !0 });
                return;
              }
              if (m("right", f)) {
                i.preventDefault(), u.move(a, { unit: "offset" });
                return;
              }
            }
          }
        }
      )
    }
  );
}, K = (t) => {
  const { attributes: e, children: r, element: s } = t;
  switch (s.type) {
    case "link":
      return /* @__PURE__ */ o(S, { ...t });
    default:
      return /* @__PURE__ */ o(
        j,
        {
          ...t
        }
      );
  }
}, j = ({
  attributes: t,
  children: e,
  element: r
}) => {
  const s = { textAlign: r.align };
  return /* @__PURE__ */ o("div", { style: s, ...t, children: e });
}, H = ({ children: t, leaf: e, attributes: r }) => (e.bold && (t = /* @__PURE__ */ o("strong", { children: t })), e.code && (t = /* @__PURE__ */ o("code", { children: t })), e.italic && (t = /* @__PURE__ */ o("em", { children: t })), e.underlined && (t = /* @__PURE__ */ o("u", { children: t })), /* @__PURE__ */ o("span", { style: { color: e.color }, ...r, children: t }));
export {
  V as Text
};
