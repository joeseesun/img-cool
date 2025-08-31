import { getTopicSize as Et, createMindElement as zt } from "@plait/mind";
import { buildText as Ct } from "@plait/common";
import { g as Kn } from "./index-B1qiiSJ2.mjs";
var jt;
(function(t) {
  t.right = "right", t.left = "left", t.standard = "standard", t.upward = "upward", t.downward = "downward", t.rightBottomIndented = "right-bottom-indented", t.rightTopIndented = "right-top-indented", t.leftTopIndented = "left-top-indented", t.leftBottomIndented = "left-bottom-indented";
})(jt || (jt = {}));
var ln;
(function(t) {
  t.logic = "logic", t.indented = "indented", t.fishBone = "fish-bone";
})(ln || (ln = {}));
var an;
(function(t) {
  t.middle = "middle", t.bottom = "bottom";
})(an || (an = {}));
function sn(t) {
  if (t)
    throw t;
}
var Bt, on;
function Xn() {
  if (on) return Bt;
  on = 1;
  var t = Object.prototype.hasOwnProperty, e = Object.prototype.toString, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(s) {
    return typeof Array.isArray == "function" ? Array.isArray(s) : e.call(s) === "[object Array]";
  }, u = function(s) {
    if (!s || e.call(s) !== "[object Object]")
      return !1;
    var f = t.call(s, "constructor"), p = s.constructor && s.constructor.prototype && t.call(s.constructor.prototype, "isPrototypeOf");
    if (s.constructor && !f && !p)
      return !1;
    var g;
    for (g in s)
      ;
    return typeof g > "u" || t.call(s, g);
  }, l = function(s, f) {
    n && f.name === "__proto__" ? n(s, f.name, {
      enumerable: !0,
      configurable: !0,
      value: f.newValue,
      writable: !0
    }) : s[f.name] = f.newValue;
  }, a = function(s, f) {
    if (f === "__proto__")
      if (t.call(s, f)) {
        if (r)
          return r(s, f).value;
      } else return;
    return s[f];
  };
  return Bt = function m() {
    var s, f, p, g, c, C, E = arguments[0], S = 1, y = arguments.length, L = !1;
    for (typeof E == "boolean" && (L = E, E = arguments[1] || {}, S = 2), (E == null || typeof E != "object" && typeof E != "function") && (E = {}); S < y; ++S)
      if (s = arguments[S], s != null)
        for (f in s)
          p = a(E, f), g = a(s, f), E !== g && (L && g && (u(g) || (c = i(g))) ? (c ? (c = !1, C = p && i(p) ? p : []) : C = p && u(p) ? p : {}, l(E, { name: f, newValue: m(L, C, g) })) : typeof g < "u" && l(E, { name: f, newValue: g }));
    return E;
  }, Bt;
}
var vn = Xn();
const Lt = /* @__PURE__ */ Kn(vn);
function Qt(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function te() {
  const t = [], e = { run: n, use: r };
  return e;
  function n(...i) {
    let u = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    a(null, ...i);
    function a(m, ...s) {
      const f = t[++u];
      let p = -1;
      if (m) {
        l(m);
        return;
      }
      for (; ++p < i.length; )
        (s[p] === null || s[p] === void 0) && (s[p] = i[p]);
      i = s, f ? ne(f, a)(...s) : l(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return t.push(i), e;
  }
}
function ne(t, e) {
  let n;
  return r;
  function r(...l) {
    const a = t.length > l.length;
    let m;
    a && l.push(i);
    try {
      m = t.apply(this, l);
    } catch (s) {
      const f = (
        /** @type {Error} */
        s
      );
      if (a && n)
        throw f;
      return i(f);
    }
    a || (m && m.then && typeof m.then == "function" ? m.then(u, i) : m instanceof Error ? i(m) : u(m));
  }
  function i(l, ...a) {
    n || (n = !0, e(l, ...a));
  }
  function u(l) {
    i(null, l);
  }
}
function ee(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? cn(t.position) : "start" in t || "end" in t ? cn(t) : "line" in t || "column" in t ? Ut(t) : "";
}
function Ut(t) {
  return hn(t && t.line) + ":" + hn(t && t.column);
}
function cn(t) {
  return Ut(t && t.start) + "-" + Ut(t && t.end);
}
function hn(t) {
  return t && typeof t == "number" ? t : 1;
}
class Y extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(e, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", u = {}, l = !1;
    if (n && ("line" in n && "column" in n ? u = { place: n } : "start" in n && "end" in n ? u = { place: n } : "type" in n ? u = {
      ancestors: [n],
      place: n.position
    } : u = { ...n }), typeof e == "string" ? i = e : !u.cause && e && (l = !0, i = e.message, u.cause = e), !u.ruleId && !u.source && typeof r == "string") {
      const m = r.indexOf(":");
      m === -1 ? u.ruleId = r : (u.source = r.slice(0, m), u.ruleId = r.slice(m + 1));
    }
    if (!u.place && u.ancestors && u.ancestors) {
      const m = u.ancestors[u.ancestors.length - 1];
      m && (u.place = m.position);
    }
    const a = u.place && "start" in u.place ? u.place.start : u.place;
    this.ancestors = u.ancestors || void 0, this.cause = u.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = a ? a.line : void 0, this.name = ee(u.place) || "1:1", this.place = u.place || void 0, this.reason = this.message, this.ruleId = u.ruleId || void 0, this.source = u.source || void 0, this.stack = l && u.cause && typeof u.cause.stack == "string" ? u.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
Y.prototype.file = "";
Y.prototype.name = "";
Y.prototype.reason = "";
Y.prototype.message = "";
Y.prototype.stack = "";
Y.prototype.column = void 0;
Y.prototype.line = void 0;
Y.prototype.ancestors = void 0;
Y.prototype.cause = void 0;
Y.prototype.fatal = void 0;
Y.prototype.place = void 0;
Y.prototype.ruleId = void 0;
Y.prototype.source = void 0;
const nt = { basename: re, dirname: ie, extname: ue, join: le, sep: "/" };
function re(t, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  St(t);
  let n = 0, r = -1, i = t.length, u;
  if (e === void 0 || e.length === 0 || e.length > t.length) {
    for (; i--; )
      if (t.codePointAt(i) === 47) {
        if (u) {
          n = i + 1;
          break;
        }
      } else r < 0 && (u = !0, r = i + 1);
    return r < 0 ? "" : t.slice(n, r);
  }
  if (e === t)
    return "";
  let l = -1, a = e.length - 1;
  for (; i--; )
    if (t.codePointAt(i) === 47) {
      if (u) {
        n = i + 1;
        break;
      }
    } else
      l < 0 && (u = !0, l = i + 1), a > -1 && (t.codePointAt(i) === e.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = l));
  return n === r ? r = l : r < 0 && (r = t.length), t.slice(n, r);
}
function ie(t) {
  if (St(t), t.length === 0)
    return ".";
  let e = -1, n = t.length, r;
  for (; --n; )
    if (t.codePointAt(n) === 47) {
      if (r) {
        e = n;
        break;
      }
    } else r || (r = !0);
  return e < 0 ? t.codePointAt(0) === 47 ? "/" : "." : e === 1 && t.codePointAt(0) === 47 ? "//" : t.slice(0, e);
}
function ue(t) {
  St(t);
  let e = t.length, n = -1, r = 0, i = -1, u = 0, l;
  for (; e--; ) {
    const a = t.codePointAt(e);
    if (a === 47) {
      if (l) {
        r = e + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = !0, n = e + 1), a === 46 ? i < 0 ? i = e : u !== 1 && (u = 1) : i > -1 && (u = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  u === 0 || // The (right-most) trimmed path component is exactly `..`.
  u === 1 && i === n - 1 && i === r + 1 ? "" : t.slice(i, n);
}
function le(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    St(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : ae(n);
}
function ae(t) {
  St(t);
  const e = t.codePointAt(0) === 47;
  let n = se(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function se(t, e) {
  let n = "", r = 0, i = -1, u = 0, l = -1, a, m;
  for (; ++l <= t.length; ) {
    if (l < t.length)
      a = t.codePointAt(l);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === l - 1 || u === 1)) if (i !== l - 1 && u === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (m = n.lastIndexOf("/"), m !== n.length - 1) {
              m < 0 ? (n = "", r = 0) : (n = n.slice(0, m), r = n.length - 1 - n.lastIndexOf("/")), i = l, u = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = l, u = 0;
            continue;
          }
        }
        e && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + t.slice(i + 1, l) : n = t.slice(i + 1, l), r = l - i - 1;
      i = l, u = 0;
    } else a === 46 && u > -1 ? u++ : u = -1;
  }
  return n;
}
function St(t) {
  if (typeof t != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(t)
    );
}
const oe = { cwd: ce };
function ce() {
  return "/";
}
function $t(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function he(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!$t(t)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + t + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (t.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return fe(t);
}
function fe(t) {
  if (t.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const e = t.pathname;
  let n = -1;
  for (; ++n < e.length; )
    if (e.codePointAt(n) === 37 && e.codePointAt(n + 1) === 50) {
      const r = e.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(e);
}
const Nt = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class pe {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(e) {
    let n;
    e ? $t(e) ? n = { path: e } : typeof e == "string" || me(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : oe.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Nt.length; ) {
      const u = Nt[r];
      u in n && n[u] !== void 0 && n[u] !== null && (this[u] = u === "history" ? [...n[u]] : n[u]);
    }
    let i;
    for (i in n)
      Nt.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? nt.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(e) {
    Rt(e, "basename"), Ot(e, "basename"), this.path = nt.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? nt.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(e) {
    fn(this.basename, "dirname"), this.path = nt.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? nt.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(e) {
    if (Ot(e, "extname"), fn(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = nt.join(this.dirname, this.stem + (e || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(e) {
    $t(e) && (e = he(e)), Rt(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? nt.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(e) {
    Rt(e, "stem"), Ot(e, "stem"), this.path = nt.join(this.dirname || "", e + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(e, n, r) {
    const i = this.message(e, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(e, n, r) {
    const i = this.message(e, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(e, n, r) {
    const i = new Y(
      // @ts-expect-error: the overloads are fine.
      e,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(e) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
  }
}
function Ot(t, e) {
  if (t && t.includes(nt.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + nt.sep + "`"
    );
}
function Rt(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function fn(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function me(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const ge = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(t) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[t], u = function() {
      return i.apply(u, arguments);
    };
    return Object.setPrototypeOf(u, r), u;
  }
), de = {}.hasOwnProperty;
class Jt extends ge {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = te();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const e = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Jt()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      e.use(...r);
    }
    return e.data(Lt(!0, {}, this.namespace)), e;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(e, n) {
    return typeof e == "string" ? arguments.length === 2 ? (Vt("data", this.frozen), this.namespace[e] = n, this) : de.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Vt("data", this.frozen), this.namespace = e, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const e = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(e, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(e) {
    this.freeze();
    const n = Tt(e), r = this.parser || this.Parser;
    return Mt("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(e, n) {
    const r = this;
    return this.freeze(), Mt("process", this.parser || this.Parser), Dt("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(u, l) {
      const a = Tt(e), m = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(m, a, function(f, p, g) {
        if (f || !p || !g)
          return s(f);
        const c = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), C = r.stringify(c, g);
        ye(C) ? g.value = C : g.result = C, s(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          g
        );
      });
      function s(f, p) {
        f || !p ? l(f) : u ? u(p) : n(void 0, p);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(e) {
    let n = !1, r;
    return this.freeze(), Mt("processSync", this.parser || this.Parser), Dt("processSync", this.compiler || this.Compiler), this.process(e, i), mn("processSync", "process", n), r;
    function i(u, l) {
      n = !0, sn(u), r = l;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(e, n, r) {
    pn(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? u(void 0, r) : new Promise(u);
    function u(l, a) {
      const m = Tt(n);
      i.run(e, m, s);
      function s(f, p, g) {
        const c = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || e
        );
        f ? a(f) : l ? l(c) : r(void 0, c, g);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(e, n) {
    let r = !1, i;
    return this.run(e, n, u), mn("runSync", "run", r), i;
    function u(l, a) {
      sn(l), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(e, n) {
    this.freeze();
    const r = Tt(n), i = this.compiler || this.Compiler;
    return Dt("stringify", i), pn(e), i(e, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(e, ...n) {
    const r = this.attachers, i = this.namespace;
    if (Vt("use", this.frozen), e != null) if (typeof e == "function")
      m(e, n);
    else if (typeof e == "object")
      Array.isArray(e) ? a(e) : l(e);
    else
      throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function u(s) {
      if (typeof s == "function")
        m(s, []);
      else if (typeof s == "object")
        if (Array.isArray(s)) {
          const [f, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            s
          );
          m(f, p);
        } else
          l(s);
      else
        throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function l(s) {
      if (!("plugins" in s) && !("settings" in s))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(s.plugins), s.settings && (i.settings = Lt(!0, i.settings, s.settings));
    }
    function a(s) {
      let f = -1;
      if (s != null) if (Array.isArray(s))
        for (; ++f < s.length; ) {
          const p = s[f];
          u(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function m(s, f) {
      let p = -1, g = -1;
      for (; ++p < r.length; )
        if (r[p][0] === s) {
          g = p;
          break;
        }
      if (g === -1)
        r.push([s, ...f]);
      else if (f.length > 0) {
        let [c, ...C] = f;
        const E = r[g][1];
        Qt(E) && Qt(c) && (c = Lt(!0, E, c)), r[g] = [s, c, ...C];
      }
    }
  }
}
const xe = new Jt().freeze();
function Mt(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function Dt(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function Vt(t, e) {
  if (e)
    throw new Error(
      "Cannot call `" + t + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function pn(t) {
  if (!Qt(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function mn(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function Tt(t) {
  return ke(t) ? t : new pe(t);
}
function ke(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function ye(t) {
  return typeof t == "string" || be(t);
}
function be(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const we = {};
function Se(t, e) {
  const n = we, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Fn(t, r, i);
}
function Fn(t, e, n) {
  if (Ie(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return gn(t.children, e, n);
  }
  return Array.isArray(t) ? gn(t, e, n) : "";
}
function gn(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = Fn(t[i], e, n);
  return r.join("");
}
function Ie(t) {
  return !!(t && typeof t == "object");
}
const dn = document.createElement("i");
function Kt(t) {
  const e = "&" + t + ";";
  dn.innerHTML = e;
  const n = dn.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    n.charCodeAt(n.length - 1) === 59 && t !== "semi" || n === e ? !1 : n
  );
}
function rt(t, e, n, r) {
  const i = t.length;
  let u = 0, l;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(e, n), t.splice(...l);
  else
    for (n && t.splice(e, n); u < r.length; )
      l = r.slice(u, u + 1e4), l.unshift(e, 0), t.splice(...l), u += 1e4, e += 1e4;
}
function G(t, e) {
  return t.length > 0 ? (rt(t, t.length, 0, e), t) : e;
}
const xn = {}.hasOwnProperty;
function Ee(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    ze(e, t[n]);
  return e;
}
function ze(t, e) {
  let n;
  for (n in e) {
    const i = (xn.call(t, n) ? t[n] : void 0) || (t[n] = {}), u = e[n];
    let l;
    if (u)
      for (l in u) {
        xn.call(i, l) || (i[l] = []);
        const a = u[l];
        Ce(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Ce(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  rt(t, 0, 0, r);
}
function Pn(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function dt(t) {
  return t.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const et = ct(/[A-Za-z]/), tt = ct(/[\dA-Za-z]/), Te = ct(/[#-'*+\--9=?A-Z^-~]/);
function Wt(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < 32 || t === 127)
  );
}
const Yt = ct(/\d/), Ae = ct(/[\dA-Fa-f]/), Fe = ct(/[!-/:-@[-`{-~]/);
function z(t) {
  return t !== null && t < -2;
}
function W(t) {
  return t !== null && (t < 0 || t === 32);
}
function B(t) {
  return t === -2 || t === -1 || t === 32;
}
const Pe = ct(new RegExp("\\p{P}|\\p{S}", "u")), _e = ct(/\s/);
function ct(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function M(t, e, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return l;
  function l(m) {
    return B(m) ? (t.enter(n), a(m)) : e(m);
  }
  function a(m) {
    return B(m) && u++ < i ? (t.consume(m), a) : (t.exit(n), e(m));
  }
}
const Be = {
  tokenize: Le
};
function Le(t) {
  const e = t.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return e;
  function r(a) {
    if (a === null) {
      t.consume(a);
      return;
    }
    return t.enter("lineEnding"), t.consume(a), t.exit("lineEnding"), M(t, e, "linePrefix");
  }
  function i(a) {
    return t.enter("paragraph"), u(a);
  }
  function u(a) {
    const m = t.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = m), n = m, l(a);
  }
  function l(a) {
    if (a === null) {
      t.exit("chunkText"), t.exit("paragraph"), t.consume(a);
      return;
    }
    return z(a) ? (t.consume(a), t.exit("chunkText"), u) : (t.consume(a), l);
  }
}
const Ne = {
  tokenize: Oe
}, kn = {
  tokenize: Re
};
function Oe(t) {
  const e = this, n = [];
  let r = 0, i, u, l;
  return a;
  function a(b) {
    if (r < n.length) {
      const _ = n[r];
      return e.containerState = _[1], t.attempt(_[0].continuation, m, s)(b);
    }
    return s(b);
  }
  function m(b) {
    if (r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && L();
      const _ = e.events.length;
      let N = _, x;
      for (; N--; )
        if (e.events[N][0] === "exit" && e.events[N][1].type === "chunkFlow") {
          x = e.events[N][1].end;
          break;
        }
      y(r);
      let F = _;
      for (; F < e.events.length; )
        e.events[F][1].end = {
          ...x
        }, F++;
      return rt(e.events, N + 1, 0, e.events.slice(_)), e.events.length = F, s(b);
    }
    return a(b);
  }
  function s(b) {
    if (r === n.length) {
      if (!i)
        return g(b);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return C(b);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(kn, f, p)(b);
  }
  function f(b) {
    return i && L(), y(r), g(b);
  }
  function p(b) {
    return e.parser.lazy[e.now().line] = r !== n.length, l = e.now().offset, C(b);
  }
  function g(b) {
    return e.containerState = {}, t.attempt(kn, c, C)(b);
  }
  function c(b) {
    return r++, n.push([e.currentConstruct, e.containerState]), g(b);
  }
  function C(b) {
    if (b === null) {
      i && L(), y(0), t.consume(b);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: u
    }), E(b);
  }
  function E(b) {
    if (b === null) {
      S(t.exit("chunkFlow"), !0), y(0), t.consume(b);
      return;
    }
    return z(b) ? (t.consume(b), S(t.exit("chunkFlow")), r = 0, e.interrupt = void 0, a) : (t.consume(b), E);
  }
  function S(b, _) {
    const N = e.sliceStream(b);
    if (_ && N.push(null), b.previous = u, u && (u.next = b), u = b, i.defineSkip(b.start), i.write(N), e.parser.lazy[b.start.line]) {
      let x = i.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          i.events[x][1].start.offset < l && // …and either is not ended yet…
          (!i.events[x][1].end || // …or ends after it.
          i.events[x][1].end.offset > l)
        )
          return;
      const F = e.events.length;
      let q = F, O, D;
      for (; q--; )
        if (e.events[q][0] === "exit" && e.events[q][1].type === "chunkFlow") {
          if (O) {
            D = e.events[q][1].end;
            break;
          }
          O = !0;
        }
      for (y(r), x = F; x < e.events.length; )
        e.events[x][1].end = {
          ...D
        }, x++;
      rt(e.events, q + 1, 0, e.events.slice(F)), e.events.length = x;
    }
  }
  function y(b) {
    let _ = n.length;
    for (; _-- > b; ) {
      const N = n[_];
      e.containerState = N[1], N[0].exit.call(e, t);
    }
    n.length = b;
  }
  function L() {
    i.write([null]), u = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function Re(t, e, n) {
  return M(t, t.attempt(this.parser.constructs.document, e, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function yn(t) {
  if (t === null || W(t) || _e(t))
    return 1;
  if (Pe(t))
    return 2;
}
function Xt(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; ) {
    const u = t[i].resolveAll;
    u && !r.includes(u) && (e = u(e, n), r.push(u));
  }
  return e;
}
const Zt = {
  name: "attention",
  resolveAll: Me,
  tokenize: De
};
function Me(t, e) {
  let n = -1, r, i, u, l, a, m, s, f;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          m = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const p = {
            ...t[r][1].end
          }, g = {
            ...t[n][1].start
          };
          bn(p, -m), bn(g, m), l = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
            end: {
              ...t[r][1].end
            }
          }, a = {
            type: m > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...t[n][1].start
            },
            end: g
          }, u = {
            type: m > 1 ? "strongText" : "emphasisText",
            start: {
              ...t[r][1].end
            },
            end: {
              ...t[n][1].start
            }
          }, i = {
            type: m > 1 ? "strong" : "emphasis",
            start: {
              ...l.start
            },
            end: {
              ...a.end
            }
          }, t[r][1].end = {
            ...l.start
          }, t[n][1].start = {
            ...a.end
          }, s = [], t[r][1].end.offset - t[r][1].start.offset && (s = G(s, [["enter", t[r][1], e], ["exit", t[r][1], e]])), s = G(s, [["enter", i, e], ["enter", l, e], ["exit", l, e], ["enter", u, e]]), s = G(s, Xt(e.parser.constructs.insideSpan.null, t.slice(r + 1, n), e)), s = G(s, [["exit", u, e], ["enter", a, e], ["exit", a, e], ["exit", i, e]]), t[n][1].end.offset - t[n][1].start.offset ? (f = 2, s = G(s, [["enter", t[n][1], e], ["exit", t[n][1], e]])) : f = 0, rt(t, r - 1, n - r + 3, s), n = r + s.length - f - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function De(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = yn(r);
  let u;
  return l;
  function l(m) {
    return u = m, t.enter("attentionSequence"), a(m);
  }
  function a(m) {
    if (m === u)
      return t.consume(m), a;
    const s = t.exit("attentionSequence"), f = yn(m), p = !f || f === 2 && i || n.includes(m), g = !i || i === 2 && f || n.includes(r);
    return s._open = !!(u === 42 ? p : p && (i || !g)), s._close = !!(u === 42 ? g : g && (f || !p)), e(m);
  }
}
function bn(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const Ve = {
  name: "autolink",
  tokenize: qe
};
function qe(t, e, n) {
  let r = 0;
  return i;
  function i(c) {
    return t.enter("autolink"), t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.enter("autolinkProtocol"), u;
  }
  function u(c) {
    return et(c) ? (t.consume(c), l) : c === 64 ? n(c) : s(c);
  }
  function l(c) {
    return c === 43 || c === 45 || c === 46 || tt(c) ? (r = 1, a(c)) : s(c);
  }
  function a(c) {
    return c === 58 ? (t.consume(c), r = 0, m) : (c === 43 || c === 45 || c === 46 || tt(c)) && r++ < 32 ? (t.consume(c), a) : (r = 0, s(c));
  }
  function m(c) {
    return c === 62 ? (t.exit("autolinkProtocol"), t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.exit("autolink"), e) : c === null || c === 32 || c === 60 || Wt(c) ? n(c) : (t.consume(c), m);
  }
  function s(c) {
    return c === 64 ? (t.consume(c), f) : Te(c) ? (t.consume(c), s) : n(c);
  }
  function f(c) {
    return tt(c) ? p(c) : n(c);
  }
  function p(c) {
    return c === 46 ? (t.consume(c), r = 0, f) : c === 62 ? (t.exit("autolinkProtocol").type = "autolinkEmail", t.enter("autolinkMarker"), t.consume(c), t.exit("autolinkMarker"), t.exit("autolink"), e) : g(c);
  }
  function g(c) {
    if ((c === 45 || tt(c)) && r++ < 63) {
      const C = c === 45 ? g : p;
      return t.consume(c), C;
    }
    return n(c);
  }
}
const _t = {
  partial: !0,
  tokenize: He
};
function He(t, e, n) {
  return r;
  function r(u) {
    return B(u) ? M(t, i, "linePrefix")(u) : i(u);
  }
  function i(u) {
    return u === null || z(u) ? e(u) : n(u);
  }
}
const _n = {
  continuation: {
    tokenize: Qe
  },
  exit: Ue,
  name: "blockQuote",
  tokenize: je
};
function je(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const a = r.containerState;
      return a.open || (t.enter("blockQuote", {
        _container: !0
      }), a.open = !0), t.enter("blockQuotePrefix"), t.enter("blockQuoteMarker"), t.consume(l), t.exit("blockQuoteMarker"), u;
    }
    return n(l);
  }
  function u(l) {
    return B(l) ? (t.enter("blockQuotePrefixWhitespace"), t.consume(l), t.exit("blockQuotePrefixWhitespace"), t.exit("blockQuotePrefix"), e) : (t.exit("blockQuotePrefix"), e(l));
  }
}
function Qe(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return B(l) ? M(t, u, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : u(l);
  }
  function u(l) {
    return t.attempt(_n, e, n)(l);
  }
}
function Ue(t) {
  t.exit("blockQuote");
}
const Bn = {
  name: "characterEscape",
  tokenize: $e
};
function $e(t, e, n) {
  return r;
  function r(u) {
    return t.enter("characterEscape"), t.enter("escapeMarker"), t.consume(u), t.exit("escapeMarker"), i;
  }
  function i(u) {
    return Fe(u) ? (t.enter("characterEscapeValue"), t.consume(u), t.exit("characterEscapeValue"), t.exit("characterEscape"), e) : n(u);
  }
}
const Ln = {
  name: "characterReference",
  tokenize: We
};
function We(t, e, n) {
  const r = this;
  let i = 0, u, l;
  return a;
  function a(p) {
    return t.enter("characterReference"), t.enter("characterReferenceMarker"), t.consume(p), t.exit("characterReferenceMarker"), m;
  }
  function m(p) {
    return p === 35 ? (t.enter("characterReferenceMarkerNumeric"), t.consume(p), t.exit("characterReferenceMarkerNumeric"), s) : (t.enter("characterReferenceValue"), u = 31, l = tt, f(p));
  }
  function s(p) {
    return p === 88 || p === 120 ? (t.enter("characterReferenceMarkerHexadecimal"), t.consume(p), t.exit("characterReferenceMarkerHexadecimal"), t.enter("characterReferenceValue"), u = 6, l = Ae, f) : (t.enter("characterReferenceValue"), u = 7, l = Yt, f(p));
  }
  function f(p) {
    if (p === 59 && i) {
      const g = t.exit("characterReferenceValue");
      return l === tt && !Kt(r.sliceSerialize(g)) ? n(p) : (t.enter("characterReferenceMarker"), t.consume(p), t.exit("characterReferenceMarker"), t.exit("characterReference"), e);
    }
    return l(p) && i++ < u ? (t.consume(p), f) : n(p);
  }
}
const wn = {
  partial: !0,
  tokenize: Ze
}, Sn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Ye
};
function Ye(t, e, n) {
  const r = this, i = {
    partial: !0,
    tokenize: N
  };
  let u = 0, l = 0, a;
  return m;
  function m(x) {
    return s(x);
  }
  function s(x) {
    const F = r.events[r.events.length - 1];
    return u = F && F[1].type === "linePrefix" ? F[2].sliceSerialize(F[1], !0).length : 0, a = x, t.enter("codeFenced"), t.enter("codeFencedFence"), t.enter("codeFencedFenceSequence"), f(x);
  }
  function f(x) {
    return x === a ? (l++, t.consume(x), f) : l < 3 ? n(x) : (t.exit("codeFencedFenceSequence"), B(x) ? M(t, p, "whitespace")(x) : p(x));
  }
  function p(x) {
    return x === null || z(x) ? (t.exit("codeFencedFence"), r.interrupt ? e(x) : t.check(wn, E, _)(x)) : (t.enter("codeFencedFenceInfo"), t.enter("chunkString", {
      contentType: "string"
    }), g(x));
  }
  function g(x) {
    return x === null || z(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), p(x)) : B(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceInfo"), M(t, c, "whitespace")(x)) : x === 96 && x === a ? n(x) : (t.consume(x), g);
  }
  function c(x) {
    return x === null || z(x) ? p(x) : (t.enter("codeFencedFenceMeta"), t.enter("chunkString", {
      contentType: "string"
    }), C(x));
  }
  function C(x) {
    return x === null || z(x) ? (t.exit("chunkString"), t.exit("codeFencedFenceMeta"), p(x)) : x === 96 && x === a ? n(x) : (t.consume(x), C);
  }
  function E(x) {
    return t.attempt(i, _, S)(x);
  }
  function S(x) {
    return t.enter("lineEnding"), t.consume(x), t.exit("lineEnding"), y;
  }
  function y(x) {
    return u > 0 && B(x) ? M(t, L, "linePrefix", u + 1)(x) : L(x);
  }
  function L(x) {
    return x === null || z(x) ? t.check(wn, E, _)(x) : (t.enter("codeFlowValue"), b(x));
  }
  function b(x) {
    return x === null || z(x) ? (t.exit("codeFlowValue"), L(x)) : (t.consume(x), b);
  }
  function _(x) {
    return t.exit("codeFenced"), e(x);
  }
  function N(x, F, q) {
    let O = 0;
    return D;
    function D(P) {
      return x.enter("lineEnding"), x.consume(P), x.exit("lineEnding"), I;
    }
    function I(P) {
      return x.enter("codeFencedFence"), B(P) ? M(x, w, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(P) : w(P);
    }
    function w(P) {
      return P === a ? (x.enter("codeFencedFenceSequence"), V(P)) : q(P);
    }
    function V(P) {
      return P === a ? (O++, x.consume(P), V) : O >= l ? (x.exit("codeFencedFenceSequence"), B(P) ? M(x, H, "whitespace")(P) : H(P)) : q(P);
    }
    function H(P) {
      return P === null || z(P) ? (x.exit("codeFencedFence"), F(P)) : q(P);
    }
  }
}
function Ze(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), u);
  }
  function u(l) {
    return r.parser.lazy[r.now().line] ? n(l) : e(l);
  }
}
const qt = {
  name: "codeIndented",
  tokenize: Je
}, Ge = {
  partial: !0,
  tokenize: Ke
};
function Je(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return t.enter("codeIndented"), M(t, u, "linePrefix", 5)(s);
  }
  function u(s) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? l(s) : n(s);
  }
  function l(s) {
    return s === null ? m(s) : z(s) ? t.attempt(Ge, l, m)(s) : (t.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || z(s) ? (t.exit("codeFlowValue"), l(s)) : (t.consume(s), a);
  }
  function m(s) {
    return t.exit("codeIndented"), e(s);
  }
}
function Ke(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : z(l) ? (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), i) : M(t, u, "linePrefix", 5)(l);
  }
  function u(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(l) : z(l) ? i(l) : n(l);
  }
}
const Xe = {
  name: "codeText",
  previous: tr,
  resolve: ve,
  tokenize: nr
};
function ve(t) {
  let e = t.length - 4, n = 3, r, i;
  if ((t[n][1].type === "lineEnding" || t[n][1].type === "space") && (t[e][1].type === "lineEnding" || t[e][1].type === "space")) {
    for (r = n; ++r < e; )
      if (t[r][1].type === "codeTextData") {
        t[n][1].type = "codeTextPadding", t[e][1].type = "codeTextPadding", n += 2, e -= 2;
        break;
      }
  }
  for (r = n - 1, e++; ++r <= e; )
    i === void 0 ? r !== e && t[r][1].type !== "lineEnding" && (i = r) : (r === e || t[r][1].type === "lineEnding") && (t[i][1].type = "codeTextData", r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), e -= r - i - 2, r = i + 2), i = void 0);
  return t;
}
function tr(t) {
  return t !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function nr(t, e, n) {
  let r = 0, i, u;
  return l;
  function l(p) {
    return t.enter("codeText"), t.enter("codeTextSequence"), a(p);
  }
  function a(p) {
    return p === 96 ? (t.consume(p), r++, a) : (t.exit("codeTextSequence"), m(p));
  }
  function m(p) {
    return p === null ? n(p) : p === 32 ? (t.enter("space"), t.consume(p), t.exit("space"), m) : p === 96 ? (u = t.enter("codeTextSequence"), i = 0, f(p)) : z(p) ? (t.enter("lineEnding"), t.consume(p), t.exit("lineEnding"), m) : (t.enter("codeTextData"), s(p));
  }
  function s(p) {
    return p === null || p === 32 || p === 96 || z(p) ? (t.exit("codeTextData"), m(p)) : (t.consume(p), s);
  }
  function f(p) {
    return p === 96 ? (t.consume(p), i++, f) : i === r ? (t.exit("codeTextSequence"), t.exit("codeText"), e(p)) : (u.type = "codeTextData", s(p));
  }
}
class er {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(e) {
    this.left = e ? [...e] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(e, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(e, r) : e > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(e, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(e));
    const u = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && bt(this.left, r), u.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), bt(this.left, e);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(e) {
    this.setCursor(0), this.right.push(e);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(e) {
    this.setCursor(0), bt(this.right, e.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(e) {
    if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0))
      if (e < this.left.length) {
        const n = this.left.splice(e, Number.POSITIVE_INFINITY);
        bt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
        bt(this.left, n.reverse());
      }
  }
}
function bt(t, e) {
  let n = 0;
  if (e.length < 1e4)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(...e.slice(n, n + 1e4)), n += 1e4;
}
function Nn(t) {
  const e = {};
  let n = -1, r, i, u, l, a, m, s;
  const f = new er(t);
  for (; ++n < f.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = f.get(n), n && r[1].type === "chunkFlow" && f.get(n - 1)[1].type === "listItemPrefix" && (m = r[1]._tokenizer.events, u = 0, u < m.length && m[u][1].type === "lineEndingBlank" && (u += 2), u < m.length && m[u][1].type === "content"))
      for (; ++u < m.length && m[u][1].type !== "content"; )
        m[u][1].type === "chunkText" && (m[u][1]._isInFirstContentOfListItem = !0, u++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, rr(f, n)), n = e[n], s = !0);
    else if (r[1]._container) {
      for (u = n, i = void 0; u--; )
        if (l = f.get(u), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = u);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...f.get(i)[1].start
      }, a = f.slice(i, n), a.unshift(r), f.splice(i, n - i + 1, a));
    }
  }
  return rt(t, 0, Number.POSITIVE_INFINITY, f.slice(0)), !s;
}
function rr(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const u = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, m = [], s = {};
  let f, p, g = -1, c = n, C = 0, E = 0;
  const S = [E];
  for (; c; ) {
    for (; t.get(++i)[1] !== c; )
      ;
    u.push(i), c._tokenizer || (f = r.sliceStream(c), c.next || f.push(null), p && l.defineSkip(c.start), c._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(f), c._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), p = c, c = c.next;
  }
  for (c = n; ++g < a.length; )
    // Find a void token that includes a break.
    a[g][0] === "exit" && a[g - 1][0] === "enter" && a[g][1].type === a[g - 1][1].type && a[g][1].start.line !== a[g][1].end.line && (E = g + 1, S.push(E), c._tokenizer = void 0, c.previous = void 0, c = c.next);
  for (l.events = [], c ? (c._tokenizer = void 0, c.previous = void 0) : S.pop(), g = S.length; g--; ) {
    const y = a.slice(S[g], S[g + 1]), L = u.pop();
    m.push([L, L + y.length - 1]), t.splice(L, 2, y);
  }
  for (m.reverse(), g = -1; ++g < m.length; )
    s[C + m[g][0]] = C + m[g][1], C += m[g][1] - m[g][0] - 1;
  return s;
}
const ir = {
  resolve: lr,
  tokenize: ar
}, ur = {
  partial: !0,
  tokenize: sr
};
function lr(t) {
  return Nn(t), t;
}
function ar(t, e) {
  let n;
  return r;
  function r(a) {
    return t.enter("content"), n = t.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? u(a) : z(a) ? t.check(ur, l, u)(a) : (t.consume(a), i);
  }
  function u(a) {
    return t.exit("chunkContent"), t.exit("content"), e(a);
  }
  function l(a) {
    return t.consume(a), t.exit("chunkContent"), n.next = t.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function sr(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return t.exit("chunkContent"), t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), M(t, u, "linePrefix");
  }
  function u(l) {
    if (l === null || z(l))
      return n(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? e(l) : t.interrupt(r.parser.constructs.flow, n, e)(l);
  }
}
function On(t, e, n, r, i, u, l, a, m) {
  const s = m || Number.POSITIVE_INFINITY;
  let f = 0;
  return p;
  function p(y) {
    return y === 60 ? (t.enter(r), t.enter(i), t.enter(u), t.consume(y), t.exit(u), g) : y === null || y === 32 || y === 41 || Wt(y) ? n(y) : (t.enter(r), t.enter(l), t.enter(a), t.enter("chunkString", {
      contentType: "string"
    }), E(y));
  }
  function g(y) {
    return y === 62 ? (t.enter(u), t.consume(y), t.exit(u), t.exit(i), t.exit(r), e) : (t.enter(a), t.enter("chunkString", {
      contentType: "string"
    }), c(y));
  }
  function c(y) {
    return y === 62 ? (t.exit("chunkString"), t.exit(a), g(y)) : y === null || y === 60 || z(y) ? n(y) : (t.consume(y), y === 92 ? C : c);
  }
  function C(y) {
    return y === 60 || y === 62 || y === 92 ? (t.consume(y), c) : c(y);
  }
  function E(y) {
    return !f && (y === null || y === 41 || W(y)) ? (t.exit("chunkString"), t.exit(a), t.exit(l), t.exit(r), e(y)) : f < s && y === 40 ? (t.consume(y), f++, E) : y === 41 ? (t.consume(y), f--, E) : y === null || y === 32 || y === 40 || Wt(y) ? n(y) : (t.consume(y), y === 92 ? S : E);
  }
  function S(y) {
    return y === 40 || y === 41 || y === 92 ? (t.consume(y), E) : E(y);
  }
}
function Rn(t, e, n, r, i, u) {
  const l = this;
  let a = 0, m;
  return s;
  function s(c) {
    return t.enter(r), t.enter(i), t.consume(c), t.exit(i), t.enter(u), f;
  }
  function f(c) {
    return a > 999 || c === null || c === 91 || c === 93 && !m || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    c === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? n(c) : c === 93 ? (t.exit(u), t.enter(i), t.consume(c), t.exit(i), t.exit(r), e) : z(c) ? (t.enter("lineEnding"), t.consume(c), t.exit("lineEnding"), f) : (t.enter("chunkString", {
      contentType: "string"
    }), p(c));
  }
  function p(c) {
    return c === null || c === 91 || c === 93 || z(c) || a++ > 999 ? (t.exit("chunkString"), f(c)) : (t.consume(c), m || (m = !B(c)), c === 92 ? g : p);
  }
  function g(c) {
    return c === 91 || c === 92 || c === 93 ? (t.consume(c), a++, p) : p(c);
  }
}
function Mn(t, e, n, r, i, u) {
  let l;
  return a;
  function a(g) {
    return g === 34 || g === 39 || g === 40 ? (t.enter(r), t.enter(i), t.consume(g), t.exit(i), l = g === 40 ? 41 : g, m) : n(g);
  }
  function m(g) {
    return g === l ? (t.enter(i), t.consume(g), t.exit(i), t.exit(r), e) : (t.enter(u), s(g));
  }
  function s(g) {
    return g === l ? (t.exit(u), m(l)) : g === null ? n(g) : z(g) ? (t.enter("lineEnding"), t.consume(g), t.exit("lineEnding"), M(t, s, "linePrefix")) : (t.enter("chunkString", {
      contentType: "string"
    }), f(g));
  }
  function f(g) {
    return g === l || g === null || z(g) ? (t.exit("chunkString"), s(g)) : (t.consume(g), g === 92 ? p : f);
  }
  function p(g) {
    return g === l || g === 92 ? (t.consume(g), f) : f(g);
  }
}
function wt(t, e) {
  let n;
  return r;
  function r(i) {
    return z(i) ? (t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), n = !0, r) : B(i) ? M(t, r, n ? "linePrefix" : "lineSuffix")(i) : e(i);
  }
}
const or = {
  name: "definition",
  tokenize: hr
}, cr = {
  partial: !0,
  tokenize: fr
};
function hr(t, e, n) {
  const r = this;
  let i;
  return u;
  function u(c) {
    return t.enter("definition"), l(c);
  }
  function l(c) {
    return Rn.call(
      r,
      t,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(c);
  }
  function a(c) {
    return i = dt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (t.enter("definitionMarker"), t.consume(c), t.exit("definitionMarker"), m) : n(c);
  }
  function m(c) {
    return W(c) ? wt(t, s)(c) : s(c);
  }
  function s(c) {
    return On(
      t,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(c);
  }
  function f(c) {
    return t.attempt(cr, p, p)(c);
  }
  function p(c) {
    return B(c) ? M(t, g, "whitespace")(c) : g(c);
  }
  function g(c) {
    return c === null || z(c) ? (t.exit("definition"), r.parser.defined.push(i), e(c)) : n(c);
  }
}
function fr(t, e, n) {
  return r;
  function r(a) {
    return W(a) ? wt(t, i)(a) : n(a);
  }
  function i(a) {
    return Mn(t, u, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function u(a) {
    return B(a) ? M(t, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || z(a) ? e(a) : n(a);
  }
}
const pr = {
  name: "hardBreakEscape",
  tokenize: mr
};
function mr(t, e, n) {
  return r;
  function r(u) {
    return t.enter("hardBreakEscape"), t.consume(u), i;
  }
  function i(u) {
    return z(u) ? (t.exit("hardBreakEscape"), e(u)) : n(u);
  }
}
const gr = {
  name: "headingAtx",
  resolve: dr,
  tokenize: xr
};
function dr(t, e) {
  let n = t.length - 2, r = 3, i, u;
  return t[r][1].type === "whitespace" && (r += 2), n - 2 > r && t[n][1].type === "whitespace" && (n -= 2), t[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && t[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: t[r][1].start,
    end: t[n][1].end
  }, u = {
    type: "chunkText",
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: "text"
  }, rt(t, r, n - r + 1, [["enter", i, e], ["enter", u, e], ["exit", u, e], ["exit", i, e]])), t;
}
function xr(t, e, n) {
  let r = 0;
  return i;
  function i(f) {
    return t.enter("atxHeading"), u(f);
  }
  function u(f) {
    return t.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && r++ < 6 ? (t.consume(f), l) : f === null || W(f) ? (t.exit("atxHeadingSequence"), a(f)) : n(f);
  }
  function a(f) {
    return f === 35 ? (t.enter("atxHeadingSequence"), m(f)) : f === null || z(f) ? (t.exit("atxHeading"), e(f)) : B(f) ? M(t, a, "whitespace")(f) : (t.enter("atxHeadingText"), s(f));
  }
  function m(f) {
    return f === 35 ? (t.consume(f), m) : (t.exit("atxHeadingSequence"), a(f));
  }
  function s(f) {
    return f === null || f === 35 || W(f) ? (t.exit("atxHeadingText"), a(f)) : (t.consume(f), s);
  }
}
const kr = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], In = ["pre", "script", "style", "textarea"], yr = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Sr,
  tokenize: Ir
}, br = {
  partial: !0,
  tokenize: zr
}, wr = {
  partial: !0,
  tokenize: Er
};
function Sr(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === "htmlFlow"); )
    ;
  return e > 1 && t[e - 2][1].type === "linePrefix" && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function Ir(t, e, n) {
  const r = this;
  let i, u, l, a, m;
  return s;
  function s(h) {
    return f(h);
  }
  function f(h) {
    return t.enter("htmlFlow"), t.enter("htmlFlowData"), t.consume(h), p;
  }
  function p(h) {
    return h === 33 ? (t.consume(h), g) : h === 47 ? (t.consume(h), u = !0, E) : h === 63 ? (t.consume(h), i = 3, r.interrupt ? e : o) : et(h) ? (t.consume(h), l = String.fromCharCode(h), S) : n(h);
  }
  function g(h) {
    return h === 45 ? (t.consume(h), i = 2, c) : h === 91 ? (t.consume(h), i = 5, a = 0, C) : et(h) ? (t.consume(h), i = 4, r.interrupt ? e : o) : n(h);
  }
  function c(h) {
    return h === 45 ? (t.consume(h), r.interrupt ? e : o) : n(h);
  }
  function C(h) {
    const X = "CDATA[";
    return h === X.charCodeAt(a++) ? (t.consume(h), a === X.length ? r.interrupt ? e : w : C) : n(h);
  }
  function E(h) {
    return et(h) ? (t.consume(h), l = String.fromCharCode(h), S) : n(h);
  }
  function S(h) {
    if (h === null || h === 47 || h === 62 || W(h)) {
      const X = h === 47, ht = l.toLowerCase();
      return !X && !u && In.includes(ht) ? (i = 1, r.interrupt ? e(h) : w(h)) : kr.includes(l.toLowerCase()) ? (i = 6, X ? (t.consume(h), y) : r.interrupt ? e(h) : w(h)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(h) : u ? L(h) : b(h));
    }
    return h === 45 || tt(h) ? (t.consume(h), l += String.fromCharCode(h), S) : n(h);
  }
  function y(h) {
    return h === 62 ? (t.consume(h), r.interrupt ? e : w) : n(h);
  }
  function L(h) {
    return B(h) ? (t.consume(h), L) : D(h);
  }
  function b(h) {
    return h === 47 ? (t.consume(h), D) : h === 58 || h === 95 || et(h) ? (t.consume(h), _) : B(h) ? (t.consume(h), b) : D(h);
  }
  function _(h) {
    return h === 45 || h === 46 || h === 58 || h === 95 || tt(h) ? (t.consume(h), _) : N(h);
  }
  function N(h) {
    return h === 61 ? (t.consume(h), x) : B(h) ? (t.consume(h), N) : b(h);
  }
  function x(h) {
    return h === null || h === 60 || h === 61 || h === 62 || h === 96 ? n(h) : h === 34 || h === 39 ? (t.consume(h), m = h, F) : B(h) ? (t.consume(h), x) : q(h);
  }
  function F(h) {
    return h === m ? (t.consume(h), m = null, O) : h === null || z(h) ? n(h) : (t.consume(h), F);
  }
  function q(h) {
    return h === null || h === 34 || h === 39 || h === 47 || h === 60 || h === 61 || h === 62 || h === 96 || W(h) ? N(h) : (t.consume(h), q);
  }
  function O(h) {
    return h === 47 || h === 62 || B(h) ? b(h) : n(h);
  }
  function D(h) {
    return h === 62 ? (t.consume(h), I) : n(h);
  }
  function I(h) {
    return h === null || z(h) ? w(h) : B(h) ? (t.consume(h), I) : n(h);
  }
  function w(h) {
    return h === 45 && i === 2 ? (t.consume(h), U) : h === 60 && i === 1 ? (t.consume(h), j) : h === 62 && i === 4 ? (t.consume(h), K) : h === 63 && i === 3 ? (t.consume(h), o) : h === 93 && i === 5 ? (t.consume(h), it) : z(h) && (i === 6 || i === 7) ? (t.exit("htmlFlowData"), t.check(br, ut, V)(h)) : h === null || z(h) ? (t.exit("htmlFlowData"), V(h)) : (t.consume(h), w);
  }
  function V(h) {
    return t.check(wr, H, ut)(h);
  }
  function H(h) {
    return t.enter("lineEnding"), t.consume(h), t.exit("lineEnding"), P;
  }
  function P(h) {
    return h === null || z(h) ? V(h) : (t.enter("htmlFlowData"), w(h));
  }
  function U(h) {
    return h === 45 ? (t.consume(h), o) : w(h);
  }
  function j(h) {
    return h === 47 ? (t.consume(h), l = "", J) : w(h);
  }
  function J(h) {
    if (h === 62) {
      const X = l.toLowerCase();
      return In.includes(X) ? (t.consume(h), K) : w(h);
    }
    return et(h) && l.length < 8 ? (t.consume(h), l += String.fromCharCode(h), J) : w(h);
  }
  function it(h) {
    return h === 93 ? (t.consume(h), o) : w(h);
  }
  function o(h) {
    return h === 62 ? (t.consume(h), K) : h === 45 && i === 2 ? (t.consume(h), o) : w(h);
  }
  function K(h) {
    return h === null || z(h) ? (t.exit("htmlFlowData"), ut(h)) : (t.consume(h), K);
  }
  function ut(h) {
    return t.exit("htmlFlow"), e(h);
  }
}
function Er(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return z(l) ? (t.enter("lineEnding"), t.consume(l), t.exit("lineEnding"), u) : n(l);
  }
  function u(l) {
    return r.parser.lazy[r.now().line] ? n(l) : e(l);
  }
}
function zr(t, e, n) {
  return r;
  function r(i) {
    return t.enter("lineEnding"), t.consume(i), t.exit("lineEnding"), t.attempt(_t, e, n);
  }
}
const Cr = {
  name: "htmlText",
  tokenize: Tr
};
function Tr(t, e, n) {
  const r = this;
  let i, u, l;
  return a;
  function a(o) {
    return t.enter("htmlText"), t.enter("htmlTextData"), t.consume(o), m;
  }
  function m(o) {
    return o === 33 ? (t.consume(o), s) : o === 47 ? (t.consume(o), N) : o === 63 ? (t.consume(o), b) : et(o) ? (t.consume(o), q) : n(o);
  }
  function s(o) {
    return o === 45 ? (t.consume(o), f) : o === 91 ? (t.consume(o), u = 0, C) : et(o) ? (t.consume(o), L) : n(o);
  }
  function f(o) {
    return o === 45 ? (t.consume(o), c) : n(o);
  }
  function p(o) {
    return o === null ? n(o) : o === 45 ? (t.consume(o), g) : z(o) ? (l = p, j(o)) : (t.consume(o), p);
  }
  function g(o) {
    return o === 45 ? (t.consume(o), c) : p(o);
  }
  function c(o) {
    return o === 62 ? U(o) : o === 45 ? g(o) : p(o);
  }
  function C(o) {
    const K = "CDATA[";
    return o === K.charCodeAt(u++) ? (t.consume(o), u === K.length ? E : C) : n(o);
  }
  function E(o) {
    return o === null ? n(o) : o === 93 ? (t.consume(o), S) : z(o) ? (l = E, j(o)) : (t.consume(o), E);
  }
  function S(o) {
    return o === 93 ? (t.consume(o), y) : E(o);
  }
  function y(o) {
    return o === 62 ? U(o) : o === 93 ? (t.consume(o), y) : E(o);
  }
  function L(o) {
    return o === null || o === 62 ? U(o) : z(o) ? (l = L, j(o)) : (t.consume(o), L);
  }
  function b(o) {
    return o === null ? n(o) : o === 63 ? (t.consume(o), _) : z(o) ? (l = b, j(o)) : (t.consume(o), b);
  }
  function _(o) {
    return o === 62 ? U(o) : b(o);
  }
  function N(o) {
    return et(o) ? (t.consume(o), x) : n(o);
  }
  function x(o) {
    return o === 45 || tt(o) ? (t.consume(o), x) : F(o);
  }
  function F(o) {
    return z(o) ? (l = F, j(o)) : B(o) ? (t.consume(o), F) : U(o);
  }
  function q(o) {
    return o === 45 || tt(o) ? (t.consume(o), q) : o === 47 || o === 62 || W(o) ? O(o) : n(o);
  }
  function O(o) {
    return o === 47 ? (t.consume(o), U) : o === 58 || o === 95 || et(o) ? (t.consume(o), D) : z(o) ? (l = O, j(o)) : B(o) ? (t.consume(o), O) : U(o);
  }
  function D(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || tt(o) ? (t.consume(o), D) : I(o);
  }
  function I(o) {
    return o === 61 ? (t.consume(o), w) : z(o) ? (l = I, j(o)) : B(o) ? (t.consume(o), I) : O(o);
  }
  function w(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96 ? n(o) : o === 34 || o === 39 ? (t.consume(o), i = o, V) : z(o) ? (l = w, j(o)) : B(o) ? (t.consume(o), w) : (t.consume(o), H);
  }
  function V(o) {
    return o === i ? (t.consume(o), i = void 0, P) : o === null ? n(o) : z(o) ? (l = V, j(o)) : (t.consume(o), V);
  }
  function H(o) {
    return o === null || o === 34 || o === 39 || o === 60 || o === 61 || o === 96 ? n(o) : o === 47 || o === 62 || W(o) ? O(o) : (t.consume(o), H);
  }
  function P(o) {
    return o === 47 || o === 62 || W(o) ? O(o) : n(o);
  }
  function U(o) {
    return o === 62 ? (t.consume(o), t.exit("htmlTextData"), t.exit("htmlText"), e) : n(o);
  }
  function j(o) {
    return t.exit("htmlTextData"), t.enter("lineEnding"), t.consume(o), t.exit("lineEnding"), J;
  }
  function J(o) {
    return B(o) ? M(t, it, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : it(o);
  }
  function it(o) {
    return t.enter("htmlTextData"), l(o);
  }
}
const vt = {
  name: "labelEnd",
  resolveAll: _r,
  resolveTo: Br,
  tokenize: Lr
}, Ar = {
  tokenize: Nr
}, Fr = {
  tokenize: Or
}, Pr = {
  tokenize: Rr
};
function _r(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", e += i;
    }
  }
  return t.length !== n.length && rt(t, 0, t.length, n), t;
}
function Br(t, e) {
  let n = t.length, r = 0, i, u, l, a;
  for (; n--; )
    if (i = t[n][1], u) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      t[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (t[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (u = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = n);
  const m = {
    type: t[u][1].type === "labelLink" ? "link" : "image",
    start: {
      ...t[u][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...t[u][1].start
    },
    end: {
      ...t[l][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...t[u + r + 2][1].end
    },
    end: {
      ...t[l - 2][1].start
    }
  };
  return a = [["enter", m, e], ["enter", s, e]], a = G(a, t.slice(u + 1, u + r + 3)), a = G(a, [["enter", f, e]]), a = G(a, Xt(e.parser.constructs.insideSpan.null, t.slice(u + r + 4, l - 3), e)), a = G(a, [["exit", f, e], t[l - 2], t[l - 1], ["exit", s, e]]), a = G(a, t.slice(l + 1)), a = G(a, [["exit", m, e]]), rt(t, u, t.length, a), t;
}
function Lr(t, e, n) {
  const r = this;
  let i = r.events.length, u, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      u = r.events[i][1];
      break;
    }
  return a;
  function a(g) {
    return u ? u._inactive ? p(g) : (l = r.parser.defined.includes(dt(r.sliceSerialize({
      start: u.end,
      end: r.now()
    }))), t.enter("labelEnd"), t.enter("labelMarker"), t.consume(g), t.exit("labelMarker"), t.exit("labelEnd"), m) : n(g);
  }
  function m(g) {
    return g === 40 ? t.attempt(Ar, f, l ? f : p)(g) : g === 91 ? t.attempt(Fr, f, l ? s : p)(g) : l ? f(g) : p(g);
  }
  function s(g) {
    return t.attempt(Pr, f, p)(g);
  }
  function f(g) {
    return e(g);
  }
  function p(g) {
    return u._balanced = !0, n(g);
  }
}
function Nr(t, e, n) {
  return r;
  function r(p) {
    return t.enter("resource"), t.enter("resourceMarker"), t.consume(p), t.exit("resourceMarker"), i;
  }
  function i(p) {
    return W(p) ? wt(t, u)(p) : u(p);
  }
  function u(p) {
    return p === 41 ? f(p) : On(t, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function l(p) {
    return W(p) ? wt(t, m)(p) : f(p);
  }
  function a(p) {
    return n(p);
  }
  function m(p) {
    return p === 34 || p === 39 || p === 40 ? Mn(t, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : f(p);
  }
  function s(p) {
    return W(p) ? wt(t, f)(p) : f(p);
  }
  function f(p) {
    return p === 41 ? (t.enter("resourceMarker"), t.consume(p), t.exit("resourceMarker"), t.exit("resource"), e) : n(p);
  }
}
function Or(t, e, n) {
  const r = this;
  return i;
  function i(a) {
    return Rn.call(r, t, u, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function u(a) {
    return r.parser.defined.includes(dt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? e(a) : n(a);
  }
  function l(a) {
    return n(a);
  }
}
function Rr(t, e, n) {
  return r;
  function r(u) {
    return t.enter("reference"), t.enter("referenceMarker"), t.consume(u), t.exit("referenceMarker"), i;
  }
  function i(u) {
    return u === 93 ? (t.enter("referenceMarker"), t.consume(u), t.exit("referenceMarker"), t.exit("reference"), e) : n(u);
  }
}
const Mr = {
  name: "labelStartImage",
  resolveAll: vt.resolveAll,
  tokenize: Dr
};
function Dr(t, e, n) {
  const r = this;
  return i;
  function i(a) {
    return t.enter("labelImage"), t.enter("labelImageMarker"), t.consume(a), t.exit("labelImageMarker"), u;
  }
  function u(a) {
    return a === 91 ? (t.enter("labelMarker"), t.consume(a), t.exit("labelMarker"), t.exit("labelImage"), l) : n(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : e(a);
  }
}
const Vr = {
  name: "labelStartLink",
  resolveAll: vt.resolveAll,
  tokenize: qr
};
function qr(t, e, n) {
  const r = this;
  return i;
  function i(l) {
    return t.enter("labelLink"), t.enter("labelMarker"), t.consume(l), t.exit("labelMarker"), t.exit("labelLink"), u;
  }
  function u(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : e(l);
  }
}
const Ht = {
  name: "lineEnding",
  tokenize: Hr
};
function Hr(t, e) {
  return n;
  function n(r) {
    return t.enter("lineEnding"), t.consume(r), t.exit("lineEnding"), M(t, e, "linePrefix");
  }
}
const Ft = {
  name: "thematicBreak",
  tokenize: jr
};
function jr(t, e, n) {
  let r = 0, i;
  return u;
  function u(s) {
    return t.enter("thematicBreak"), l(s);
  }
  function l(s) {
    return i = s, a(s);
  }
  function a(s) {
    return s === i ? (t.enter("thematicBreakSequence"), m(s)) : r >= 3 && (s === null || z(s)) ? (t.exit("thematicBreak"), e(s)) : n(s);
  }
  function m(s) {
    return s === i ? (t.consume(s), r++, m) : (t.exit("thematicBreakSequence"), B(s) ? M(t, a, "whitespace")(s) : a(s));
  }
}
const $ = {
  continuation: {
    tokenize: Wr
  },
  exit: Zr,
  name: "list",
  tokenize: $r
}, Qr = {
  partial: !0,
  tokenize: Gr
}, Ur = {
  partial: !0,
  tokenize: Yr
};
function $r(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let u = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return a;
  function a(c) {
    const C = r.containerState.type || (c === 42 || c === 43 || c === 45 ? "listUnordered" : "listOrdered");
    if (C === "listUnordered" ? !r.containerState.marker || c === r.containerState.marker : Yt(c)) {
      if (r.containerState.type || (r.containerState.type = C, t.enter(C, {
        _container: !0
      })), C === "listUnordered")
        return t.enter("listItemPrefix"), c === 42 || c === 45 ? t.check(Ft, n, s)(c) : s(c);
      if (!r.interrupt || c === 49)
        return t.enter("listItemPrefix"), t.enter("listItemValue"), m(c);
    }
    return n(c);
  }
  function m(c) {
    return Yt(c) && ++l < 10 ? (t.consume(c), m) : (!r.interrupt || l < 2) && (r.containerState.marker ? c === r.containerState.marker : c === 41 || c === 46) ? (t.exit("listItemValue"), s(c)) : n(c);
  }
  function s(c) {
    return t.enter("listItemMarker"), t.consume(c), t.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || c, t.check(
      _t,
      // Can’t be empty when interrupting.
      r.interrupt ? n : f,
      t.attempt(Qr, g, p)
    );
  }
  function f(c) {
    return r.containerState.initialBlankLine = !0, u++, g(c);
  }
  function p(c) {
    return B(c) ? (t.enter("listItemPrefixWhitespace"), t.consume(c), t.exit("listItemPrefixWhitespace"), g) : n(c);
  }
  function g(c) {
    return r.containerState.size = u + r.sliceSerialize(t.exit("listItemPrefix"), !0).length, e(c);
  }
}
function Wr(t, e, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, t.check(_t, i, u);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, M(t, e, "listItemIndent", r.containerState.size + 1)(a);
  }
  function u(a) {
    return r.containerState.furtherBlankLines || !B(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(Ur, e, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, M(t, t.attempt($, e, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Yr(t, e, n) {
  const r = this;
  return M(t, i, "listItemIndent", r.containerState.size + 1);
  function i(u) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? e(u) : n(u);
  }
}
function Zr(t) {
  t.exit(this.containerState.type);
}
function Gr(t, e, n) {
  const r = this;
  return M(t, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(u) {
    const l = r.events[r.events.length - 1];
    return !B(u) && l && l[1].type === "listItemPrefixWhitespace" ? e(u) : n(u);
  }
}
const En = {
  name: "setextUnderline",
  resolveTo: Jr,
  tokenize: Kr
};
function Jr(t, e) {
  let n = t.length, r, i, u;
  for (; n--; )
    if (t[n][0] === "enter") {
      if (t[n][1].type === "content") {
        r = n;
        break;
      }
      t[n][1].type === "paragraph" && (i = n);
    } else
      t[n][1].type === "content" && t.splice(n, 1), !u && t[n][1].type === "definition" && (u = n);
  const l = {
    type: "setextHeading",
    start: {
      ...t[r][1].start
    },
    end: {
      ...t[t.length - 1][1].end
    }
  };
  return t[i][1].type = "setextHeadingText", u ? (t.splice(i, 0, ["enter", l, e]), t.splice(u + 1, 0, ["exit", t[r][1], e]), t[r][1].end = {
    ...t[u][1].end
  }) : t[r][1] = l, t.push(["exit", l, e]), t;
}
function Kr(t, e, n) {
  const r = this;
  let i;
  return u;
  function u(s) {
    let f = r.events.length, p;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        p = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || p) ? (t.enter("setextHeadingLine"), i = s, l(s)) : n(s);
  }
  function l(s) {
    return t.enter("setextHeadingLineSequence"), a(s);
  }
  function a(s) {
    return s === i ? (t.consume(s), a) : (t.exit("setextHeadingLineSequence"), B(s) ? M(t, m, "lineSuffix")(s) : m(s));
  }
  function m(s) {
    return s === null || z(s) ? (t.exit("setextHeadingLine"), e(s)) : n(s);
  }
}
const Xr = {
  tokenize: vr
};
function vr(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    _t,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(this.parser.constructs.flowInitial, i, M(t, t.attempt(this.parser.constructs.flow, i, t.attempt(ir, i)), "linePrefix"))
  );
  return n;
  function r(u) {
    if (u === null) {
      t.consume(u);
      return;
    }
    return t.enter("lineEndingBlank"), t.consume(u), t.exit("lineEndingBlank"), e.currentConstruct = void 0, n;
  }
  function i(u) {
    if (u === null) {
      t.consume(u);
      return;
    }
    return t.enter("lineEnding"), t.consume(u), t.exit("lineEnding"), e.currentConstruct = void 0, n;
  }
}
const ti = {
  resolveAll: Vn()
}, ni = Dn("string"), ei = Dn("text");
function Dn(t) {
  return {
    resolveAll: Vn(t === "text" ? ri : void 0),
    tokenize: e
  };
  function e(n) {
    const r = this, i = this.parser.constructs[t], u = n.attempt(i, l, a);
    return l;
    function l(f) {
      return s(f) ? u(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return n.enter("data"), n.consume(f), m;
    }
    function m(f) {
      return s(f) ? (n.exit("data"), u(f)) : (n.consume(f), m);
    }
    function s(f) {
      if (f === null)
        return !0;
      const p = i[f];
      let g = -1;
      if (p)
        for (; ++g < p.length; ) {
          const c = p[g];
          if (!c.previous || c.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Vn(t) {
  return e;
  function e(n, r) {
    let i = -1, u;
    for (; ++i <= n.length; )
      u === void 0 ? n[i] && n[i][1].type === "data" && (u = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== u + 2 && (n[u][1].end = n[i - 1][1].end, n.splice(u + 2, i - u - 2), i = u + 2), u = void 0);
    return t ? t(n, r) : n;
  }
}
function ri(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === "lineEnding") && t[n - 1][1].type === "data") {
      const r = t[n - 1][1], i = e.sliceStream(r);
      let u = i.length, l = -1, a = 0, m;
      for (; u--; ) {
        const s = i[u];
        if (typeof s == "string") {
          for (l = s.length; s.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
        } else if (s === -2)
          m = !0, a++;
        else if (s !== -1) {
          u++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (a = 0), a) {
        const s = {
          type: n === t.length || m || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: u ? l : r.start._bufferIndex + l,
            _index: r.start._index + u,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...s.start
        }, r.start.offset === r.end.offset ? Object.assign(r, s) : (t.splice(n, 0, ["enter", s, e], ["exit", s, e]), n += 2);
      }
      n++;
    }
  return t;
}
const ii = {
  42: $,
  43: $,
  45: $,
  48: $,
  49: $,
  50: $,
  51: $,
  52: $,
  53: $,
  54: $,
  55: $,
  56: $,
  57: $,
  62: _n
}, ui = {
  91: or
}, li = {
  [-2]: qt,
  [-1]: qt,
  32: qt
}, ai = {
  35: gr,
  42: Ft,
  45: [En, Ft],
  60: yr,
  61: En,
  95: Ft,
  96: Sn,
  126: Sn
}, si = {
  38: Ln,
  92: Bn
}, oi = {
  [-5]: Ht,
  [-4]: Ht,
  [-3]: Ht,
  33: Mr,
  38: Ln,
  42: Zt,
  60: [Ve, Cr],
  91: Vr,
  92: [pr, Bn],
  93: vt,
  95: Zt,
  96: Xe
}, ci = {
  null: [Zt, ti]
}, hi = {
  null: [42, 95]
}, fi = {
  null: []
}, pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: hi,
  contentInitial: ui,
  disable: fi,
  document: ii,
  flow: ai,
  flowInitial: li,
  insideSpan: ci,
  string: si,
  text: oi
}, Symbol.toStringTag, { value: "Module" }));
function mi(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, u = [];
  let l = [], a = [];
  const m = {
    attempt: F(N),
    check: F(x),
    consume: L,
    enter: b,
    exit: _,
    interrupt: F(x, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: E,
    events: [],
    now: C,
    parser: t,
    previous: null,
    sliceSerialize: g,
    sliceStream: c,
    write: p
  };
  let f = e.tokenize.call(s, m);
  return e.resolveAll && u.push(e), s;
  function p(I) {
    return l = G(l, I), S(), l[l.length - 1] !== null ? [] : (q(e, 0), s.events = Xt(u, s.events, s), s.events);
  }
  function g(I, w) {
    return di(c(I), w);
  }
  function c(I) {
    return gi(l, I);
  }
  function C() {
    const {
      _bufferIndex: I,
      _index: w,
      line: V,
      column: H,
      offset: P
    } = r;
    return {
      _bufferIndex: I,
      _index: w,
      line: V,
      column: H,
      offset: P
    };
  }
  function E(I) {
    i[I.line] = I.column, D();
  }
  function S() {
    let I;
    for (; r._index < l.length; ) {
      const w = l[r._index];
      if (typeof w == "string")
        for (I = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === I && r._bufferIndex < w.length; )
          y(w.charCodeAt(r._bufferIndex));
      else
        y(w);
    }
  }
  function y(I) {
    f = f(I);
  }
  function L(I) {
    z(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, D()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = I;
  }
  function b(I, w) {
    const V = w || {};
    return V.type = I, V.start = C(), s.events.push(["enter", V, s]), a.push(V), V;
  }
  function _(I) {
    const w = a.pop();
    return w.end = C(), s.events.push(["exit", w, s]), w;
  }
  function N(I, w) {
    q(I, w.from);
  }
  function x(I, w) {
    w.restore();
  }
  function F(I, w) {
    return V;
    function V(H, P, U) {
      let j, J, it, o;
      return Array.isArray(H) ? (
        /* c8 ignore next 1 */
        ut(H)
      ) : "tokenize" in H ? (
        // Looks like a construct.
        ut([
          /** @type {Construct} */
          H
        ])
      ) : K(H);
      function K(Q) {
        return xt;
        function xt(st) {
          const pt = st !== null && Q[st], mt = st !== null && Q.null, It = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(pt) ? pt : pt ? [pt] : [],
            ...Array.isArray(mt) ? mt : mt ? [mt] : []
          ];
          return ut(It)(st);
        }
      }
      function ut(Q) {
        return j = Q, J = 0, Q.length === 0 ? U : h(Q[J]);
      }
      function h(Q) {
        return xt;
        function xt(st) {
          return o = O(), it = Q, Q.partial || (s.currentConstruct = Q), Q.name && s.parser.constructs.disable.null.includes(Q.name) ? ht() : Q.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            w ? Object.assign(Object.create(s), w) : s,
            m,
            X,
            ht
          )(st);
        }
      }
      function X(Q) {
        return I(it, o), P;
      }
      function ht(Q) {
        return o.restore(), ++J < j.length ? h(j[J]) : U;
      }
    }
  }
  function q(I, w) {
    I.resolveAll && !u.includes(I) && u.push(I), I.resolve && rt(s.events, w, s.events.length - w, I.resolve(s.events.slice(w), s)), I.resolveTo && (s.events = I.resolveTo(s.events, s));
  }
  function O() {
    const I = C(), w = s.previous, V = s.currentConstruct, H = s.events.length, P = Array.from(a);
    return {
      from: H,
      restore: U
    };
    function U() {
      r = I, s.previous = w, s.currentConstruct = V, s.events.length = H, a = P, D();
    }
  }
  function D() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function gi(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, u = e.end._bufferIndex;
  let l;
  if (n === i)
    l = [t[n].slice(r, u)];
  else {
    if (l = t.slice(n, i), r > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(r) : l.shift();
    }
    u > 0 && l.push(t[i].slice(0, u));
  }
  return l;
}
function di(t, e) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < t.length; ) {
    const u = t[n];
    let l;
    if (typeof u == "string")
      l = u;
    else switch (u) {
      case -5: {
        l = "\r";
        break;
      }
      case -4: {
        l = `
`;
        break;
      }
      case -3: {
        l = `\r
`;
        break;
      }
      case -2: {
        l = e ? " " : "	";
        break;
      }
      case -1: {
        if (!e && i) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(u);
    }
    i = u === -2, r.push(l);
  }
  return r.join("");
}
function xi(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ee([pi, ...(t || {}).extensions || []])
    ),
    content: i(Be),
    defined: [],
    document: i(Ne),
    flow: i(Xr),
    lazy: {},
    string: i(ni),
    text: i(ei)
  };
  return r;
  function i(u) {
    return l;
    function l(a) {
      return mi(r, u, a);
    }
  }
}
function ki(t) {
  for (; !Nn(t); )
    ;
  return t;
}
const zn = /[\0\t\n\r]/g;
function yi() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(u, l, a) {
    const m = [];
    let s, f, p, g, c;
    for (u = e + (typeof u == "string" ? u.toString() : new TextDecoder(l || void 0).decode(u)), p = 0, e = "", n && (u.charCodeAt(0) === 65279 && p++, n = void 0); p < u.length; ) {
      if (zn.lastIndex = p, s = zn.exec(u), g = s && s.index !== void 0 ? s.index : u.length, c = u.charCodeAt(g), !s) {
        e = u.slice(p);
        break;
      }
      if (c === 10 && p === g && r)
        m.push(-3), r = void 0;
      else
        switch (r && (m.push(-5), r = void 0), p < g && (m.push(u.slice(p, g)), t += g - p), c) {
          case 0: {
            m.push(65533), t++;
            break;
          }
          case 9: {
            for (f = Math.ceil(t / 4) * 4, m.push(-2); t++ < f; ) m.push(-1);
            break;
          }
          case 10: {
            m.push(-4), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      p = g + 1;
    }
    return a && (r && m.push(-5), e && m.push(e), m.push(null)), m;
  }
}
const bi = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function wi(t) {
  return t.replace(bi, Si);
}
function Si(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), u = i === 120 || i === 88;
    return Pn(n.slice(u ? 2 : 1), u ? 16 : 10);
  }
  return Kt(n) || t;
}
function Pt(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? Cn(t.position) : "start" in t || "end" in t ? Cn(t) : "line" in t || "column" in t ? Gt(t) : "";
}
function Gt(t) {
  return Tn(t && t.line) + ":" + Tn(t && t.column);
}
function Cn(t) {
  return Gt(t && t.start) + "-" + Gt(t && t.end);
}
function Tn(t) {
  return t && typeof t == "number" ? t : 1;
}
const qn = {}.hasOwnProperty;
function Ii(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), Ei(n)(ki(xi(n).document().write(yi()(t, e, !0))));
}
function Ei(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: u(rn),
      autolinkProtocol: O,
      autolinkEmail: O,
      atxHeading: u(tn),
      blockQuote: u(mt),
      characterEscape: O,
      characterReference: O,
      codeFenced: u(It),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: u(It, l),
      codeText: u(jn, l),
      codeTextData: O,
      data: O,
      codeFlowValue: O,
      definition: u(Qn),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: u(Un),
      hardBreakEscape: u(nn),
      hardBreakTrailing: u(nn),
      htmlFlow: u(en, l),
      htmlFlowData: O,
      htmlText: u(en, l),
      htmlTextData: O,
      image: u($n),
      label: l,
      link: u(rn),
      listItem: u(Wn),
      listItemValue: g,
      listOrdered: u(un, p),
      listUnordered: u(un),
      paragraph: u(Yn),
      reference: h,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: u(tn),
      strong: u(Zn),
      thematicBreak: u(Jn)
    },
    exit: {
      atxHeading: m(),
      atxHeadingSequence: N,
      autolink: m(),
      autolinkEmail: pt,
      autolinkProtocol: st,
      blockQuote: m(),
      characterEscapeValue: D,
      characterReferenceMarkerHexadecimal: ht,
      characterReferenceMarkerNumeric: ht,
      characterReferenceValue: Q,
      characterReference: xt,
      codeFenced: m(S),
      codeFencedFence: E,
      codeFencedFenceInfo: c,
      codeFencedFenceMeta: C,
      codeFlowValue: D,
      codeIndented: m(y),
      codeText: m(P),
      codeTextData: D,
      data: D,
      definition: m(),
      definitionDestinationString: _,
      definitionLabelString: L,
      definitionTitleString: b,
      emphasis: m(),
      hardBreakEscape: m(w),
      hardBreakTrailing: m(w),
      htmlFlow: m(V),
      htmlFlowData: D,
      htmlText: m(H),
      htmlTextData: D,
      image: m(j),
      label: it,
      labelText: J,
      lineEnding: I,
      link: m(U),
      listItem: m(),
      listOrdered: m(),
      listUnordered: m(),
      paragraph: m(),
      referenceString: X,
      resourceDestinationString: o,
      resourceTitleString: K,
      resource: ut,
      setextHeading: m(q),
      setextHeadingLineSequence: F,
      setextHeadingText: x,
      strong: m(),
      thematicBreak: m()
    }
  };
  Hn(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(d) {
    let k = {
      type: "root",
      children: []
    };
    const T = {
      stack: [k],
      tokenStack: [],
      config: e,
      enter: a,
      exit: s,
      buffer: l,
      resume: f,
      data: n
    }, A = [];
    let R = -1;
    for (; ++R < d.length; )
      if (d[R][1].type === "listOrdered" || d[R][1].type === "listUnordered")
        if (d[R][0] === "enter")
          A.push(R);
        else {
          const v = A.pop();
          R = i(d, v, R);
        }
    for (R = -1; ++R < d.length; ) {
      const v = e[d[R][0]];
      qn.call(v, d[R][1].type) && v[d[R][1].type].call(Object.assign({
        sliceSerialize: d[R][2].sliceSerialize
      }, T), d[R][1]);
    }
    if (T.tokenStack.length > 0) {
      const v = T.tokenStack[T.tokenStack.length - 1];
      (v[1] || An).call(T, void 0, v[0]);
    }
    for (k.position = {
      start: ot(d.length > 0 ? d[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: ot(d.length > 0 ? d[d.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, R = -1; ++R < e.transforms.length; )
      k = e.transforms[R](k) || k;
    return k;
  }
  function i(d, k, T) {
    let A = k - 1, R = -1, v = !1, ft, lt, kt, yt;
    for (; ++A <= T; ) {
      const Z = d[A];
      switch (Z[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Z[0] === "enter" ? R++ : R--, yt = void 0;
          break;
        }
        case "lineEndingBlank": {
          Z[0] === "enter" && (ft && !yt && !R && !kt && (kt = A), yt = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          yt = void 0;
      }
      if (!R && Z[0] === "enter" && Z[1].type === "listItemPrefix" || R === -1 && Z[0] === "exit" && (Z[1].type === "listUnordered" || Z[1].type === "listOrdered")) {
        if (ft) {
          let gt = A;
          for (lt = void 0; gt--; ) {
            const at = d[gt];
            if (at[1].type === "lineEnding" || at[1].type === "lineEndingBlank") {
              if (at[0] === "exit") continue;
              lt && (d[lt][1].type = "lineEndingBlank", v = !0), at[1].type = "lineEnding", lt = gt;
            } else if (!(at[1].type === "linePrefix" || at[1].type === "blockQuotePrefix" || at[1].type === "blockQuotePrefixWhitespace" || at[1].type === "blockQuoteMarker" || at[1].type === "listItemIndent")) break;
          }
          kt && (!lt || kt < lt) && (ft._spread = !0), ft.end = Object.assign({}, lt ? d[lt][1].start : Z[1].end), d.splice(lt || A, 0, ["exit", ft, Z[2]]), A++, T++;
        }
        if (Z[1].type === "listItemPrefix") {
          const gt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Z[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          ft = gt, d.splice(A, 0, ["enter", gt, Z[2]]), A++, T++, kt = void 0, yt = !0;
        }
      }
    }
    return d[k][1]._spread = v, T;
  }
  function u(d, k) {
    return T;
    function T(A) {
      a.call(this, d(A), A), k && k.call(this, A);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(d, k, T) {
    this.stack[this.stack.length - 1].children.push(d), this.stack.push(d), this.tokenStack.push([k, T || void 0]), d.position = {
      start: ot(k.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function m(d) {
    return k;
    function k(T) {
      d && d.call(this, T), s.call(this, T);
    }
  }
  function s(d, k) {
    const T = this.stack.pop(), A = this.tokenStack.pop();
    if (A)
      A[0].type !== d.type && (k ? k.call(this, d, A[0]) : (A[1] || An).call(this, d, A[0]));
    else throw new Error("Cannot close `" + d.type + "` (" + Pt({
      start: d.start,
      end: d.end
    }) + "): it’s not open");
    T.position.end = ot(d.end);
  }
  function f() {
    return Se(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function g(d) {
    if (this.data.expectingFirstListItemValue) {
      const k = this.stack[this.stack.length - 2];
      k.start = Number.parseInt(this.sliceSerialize(d), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function c() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.lang = d;
  }
  function C() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.meta = d;
  }
  function E() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function S() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = d.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = d.replace(/(\r?\n|\r)$/g, "");
  }
  function L(d) {
    const k = this.resume(), T = this.stack[this.stack.length - 1];
    T.label = k, T.identifier = dt(this.sliceSerialize(d)).toLowerCase();
  }
  function b() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.title = d;
  }
  function _() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.url = d;
  }
  function N(d) {
    const k = this.stack[this.stack.length - 1];
    if (!k.depth) {
      const T = this.sliceSerialize(d).length;
      k.depth = T;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function F(d) {
    const k = this.stack[this.stack.length - 1];
    k.depth = this.sliceSerialize(d).codePointAt(0) === 61 ? 1 : 2;
  }
  function q() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function O(d) {
    const T = this.stack[this.stack.length - 1].children;
    let A = T[T.length - 1];
    (!A || A.type !== "text") && (A = Gn(), A.position = {
      start: ot(d.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, T.push(A)), this.stack.push(A);
  }
  function D(d) {
    const k = this.stack.pop();
    k.value += this.sliceSerialize(d), k.position.end = ot(d.end);
  }
  function I(d) {
    const k = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const T = k.children[k.children.length - 1];
      T.position.end = ot(d.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(k.type) && (O.call(this, d), D.call(this, d));
  }
  function w() {
    this.data.atHardBreak = !0;
  }
  function V() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = d;
  }
  function H() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = d;
  }
  function P() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.value = d;
  }
  function U() {
    const d = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const k = this.data.referenceType || "shortcut";
      d.type += "Reference", d.referenceType = k, delete d.url, delete d.title;
    } else
      delete d.identifier, delete d.label;
    this.data.referenceType = void 0;
  }
  function j() {
    const d = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const k = this.data.referenceType || "shortcut";
      d.type += "Reference", d.referenceType = k, delete d.url, delete d.title;
    } else
      delete d.identifier, delete d.label;
    this.data.referenceType = void 0;
  }
  function J(d) {
    const k = this.sliceSerialize(d), T = this.stack[this.stack.length - 2];
    T.label = wi(k), T.identifier = dt(k).toLowerCase();
  }
  function it() {
    const d = this.stack[this.stack.length - 1], k = this.resume(), T = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, T.type === "link") {
      const A = d.children;
      T.children = A;
    } else
      T.alt = k;
  }
  function o() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.url = d;
  }
  function K() {
    const d = this.resume(), k = this.stack[this.stack.length - 1];
    k.title = d;
  }
  function ut() {
    this.data.inReference = void 0;
  }
  function h() {
    this.data.referenceType = "collapsed";
  }
  function X(d) {
    const k = this.resume(), T = this.stack[this.stack.length - 1];
    T.label = k, T.identifier = dt(this.sliceSerialize(d)).toLowerCase(), this.data.referenceType = "full";
  }
  function ht(d) {
    this.data.characterReferenceType = d.type;
  }
  function Q(d) {
    const k = this.sliceSerialize(d), T = this.data.characterReferenceType;
    let A;
    T ? (A = Pn(k, T === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : A = Kt(k);
    const R = this.stack[this.stack.length - 1];
    R.value += A;
  }
  function xt(d) {
    const k = this.stack.pop();
    k.position.end = ot(d.end);
  }
  function st(d) {
    D.call(this, d);
    const k = this.stack[this.stack.length - 1];
    k.url = this.sliceSerialize(d);
  }
  function pt(d) {
    D.call(this, d);
    const k = this.stack[this.stack.length - 1];
    k.url = "mailto:" + this.sliceSerialize(d);
  }
  function mt() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function It() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function jn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Qn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Un() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function tn() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function nn() {
    return {
      type: "break"
    };
  }
  function en() {
    return {
      type: "html",
      value: ""
    };
  }
  function $n() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function rn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function un(d) {
    return {
      type: "list",
      ordered: d.type === "listOrdered",
      start: null,
      spread: d._spread,
      children: []
    };
  }
  function Wn(d) {
    return {
      type: "listItem",
      spread: d._spread,
      checked: null,
      children: []
    };
  }
  function Yn() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Zn() {
    return {
      type: "strong",
      children: []
    };
  }
  function Gn() {
    return {
      type: "text",
      value: ""
    };
  }
  function Jn() {
    return {
      type: "thematicBreak"
    };
  }
}
function ot(t) {
  return {
    line: t.line,
    column: t.column,
    offset: t.offset
  };
}
function Hn(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? Hn(t, r) : zi(t, r);
  }
}
function zi(t, e) {
  let n;
  for (n in e)
    if (qn.call(e, n))
      switch (n) {
        case "canContainEols": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "transforms": {
          const r = e[n];
          r && t[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = e[n];
          r && Object.assign(t[n], r);
          break;
        }
      }
}
function An(t, e) {
  throw t ? new Error("Cannot close `" + t.type + "` (" + Pt({
    start: t.start,
    end: t.end
  }) + "): a different token (`" + e.type + "`, " + Pt({
    start: e.start,
    end: e.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + e.type + "`, " + Pt({
    start: e.start,
    end: e.end
  }) + ") is still open");
}
function Ci(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return Ii(r, {
      ...e.data("settings"),
      ...t,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: e.data("micromarkExtensions") || [],
      mdastExtensions: e.data("fromMarkdownExtensions") || []
    });
  }
}
const At = (t) => {
  let e = "";
  const n = (r) => {
    if (r.type === "text" || r.type === "inlineCode" || r.type === "code") {
      e += r.value;
      return;
    }
    if (r.type === "link") {
      e += `${r.url}`;
      return;
    }
    r.children && r.children.length > 0 && r.children.forEach((i) => {
      n(i);
    });
  };
  return n(t), e;
}, Ti = (t, e) => {
  if (t.type === "heading") {
    const n = t.depth;
    for (let r = n - 1; r >= 0; r--)
      if (e[`${r}`])
        return e[`${r}`];
  }
  return e[0];
}, _i = (t, e) => {
  var c, C, E;
  const r = xe().use(Ci).parse(t);
  let i = !1;
  const u = (c = r.children) == null ? void 0 : c.find((S) => {
    if (S.type === "heading")
      return S;
  });
  u && ((C = r.children) == null ? void 0 : C.filter((S) => S.type === "heading" && u && S.depth === u.depth).length) === 1 && (i = !0);
  const l = At(u), a = e || i && l || "中心主题", m = Et(null, !0, !1, Ct(a)), s = zt(a, m.width, m.height, {
    layout: jt.right
  });
  s.isRoot = !0, s.type = "mindmap";
  const f = { 0: s };
  let p = s;
  const g = (S, y = !1) => {
    var L;
    if (!(i && !e && S === u))
      if (S.type === "heading") {
        const b = Ti(S, f), _ = At(S);
        if (!_)
          return;
        const { width: N, height: x } = Et(null, !1, !1, Ct(_)), F = zt(_, N, x, {});
        b.children.push(F), f[`${S.depth}`] = F, p = F;
      } else if (S.type === "list")
        (L = S.children) == null || L.forEach((b) => {
          g(b);
        });
      else if (S.type === "listItem") {
        if (S.children && S.children.length > 1) {
          const F = p;
          S.children.forEach((q, O) => {
            g(q, O === 0);
          }), p = F;
          return;
        }
        const b = At(S);
        if (!b)
          return;
        const { width: _, height: N } = Et(null, !1, !1, Ct(b)), x = zt(b, _, N, {});
        p.children.push(x);
      } else {
        const b = At(S);
        if (!b)
          return;
        const { width: _, height: N } = Et(null, !1, !1, Ct(b)), x = zt(b, _, N, {});
        p.children.push(x), y && (p = x);
      }
  };
  return (E = r.children) == null || E.forEach((S) => {
    g(S);
  }), s;
};
export {
  Ti as getParentMindNode,
  At as getTextFromNode,
  _i as parseMarkdownToDrawnix
};
