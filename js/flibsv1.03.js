//TINYbox,Main.alert等弹框会用到
var TINY = {};

function T$(i) {
    return document.getElementById(i)
}
TINY.box = function() {
    var p, m, b, fn, ic, iu, iw, ih, ia, fun, f = 0;
    var ifm = '<iframe style="position:absolute;z-index:-1;height:100%;width:100%;border:0;background-color:transparent" ></iframe>';
    return {
        show: function(c, u, w, h, a, fun, t) {
            if (!f) {
                p = document.createElement('div');
                p.id = 'tinybox';
                m = document.createElement('div');
                m.id = 'tinymask';
                b = document.createElement('div');
                b.id = 'tinycontent';
                document.body.appendChild(m);
                document.body.appendChild(p);
                p.appendChild(b);
                m.onclick = TINY.box.hide;
                window.onresize = TINY.box.resize;
                f = 1
            }
            b.innerHTML = '';
            if (!a && !u) {
                p.style.width = w ? w + 'px' : 'auto';
                p.style.height = h ? h + 'px' : 'auto';
                p.style.backgroundImage = 'none';
                b.innerHTML = c
            } else {
                b.style.display = 'none';
                p.style.width = '210px';
                p.style.height = '15px'
            }
            this.mask();
            ic = c;
            iu = u;
            iw = w;
            ih = h;
            ia = a;
            this.alpha(m, 1, 50, 3, fun);
            if (t) {
                setTimeout(function() {
                    TINY.box.hide()
                }, 1000 * t)
            }
        },
        fill: function(c, u, w, h, a, fun) {
            if (u) {
                p.style.backgroundImage = '';
                var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                x.onreadystatechange = function() {
                    if (x.readyState == 4 && x.status == 200) {
                        b.innerHTML = x.responseText;
                        p.style.width = w + 'px';
                        p.style.height = h + 'px';
                        b.style.display = '';
                        TINY.box.pos();
                        if (fun) fun()
                    }
                };
                x.open('GET', c, 1);
                x.send(null)
            } else {
                this.psh(c, w, h, a)
            }
        },
        psh: function(c, w, h, a) {
            if (a) {
                if (!w || !h) {
                    var x = p.style.width,
                        y = p.style.height;
                    b.innerHTML = c;
                    p.style.width = w ? w + 'px' : '';
                    p.style.height = h ? h + 'px' : '';
                    b.style.display = '';
                    w = parseInt(b.offsetWidth);
                    h = parseInt(b.offsetHeight);
                    b.style.display = 'none';
                    p.style.width = x;
                    p.style.height = y
                } else {
                    b.innerHTML = c
                }
                this.size(p, w, h, 4)
            } else {
                p.style.backgroundImage = 'none'
            }
            if (fun) fun()
        },
        hide: function() {
            m.style.display = 'none';
            p.style.display = 'none'
        },
        resize: function() {
            TINY.box.pos();
            TINY.box.mask()
        },
        mask: function() {
            m.style.height = TINY.page.theight() + 'px';
            m.style.width = '';
            m.style.width = TINY.page.twidth() + 'px'
        },
        pos: function() {
            var t = (TINY.page.height() / 2) - (p.offsetHeight / 2);
            t = t < 10 ? 10 : t;
            p.style.top = (t + TINY.page.top()) + 'px';
            p.style.left = (TINY.page.width() / 2) - (p.offsetWidth / 2) + 'px'
        },
        alpha: function(e, d, a, s, fun) {
            if (d == 1) {
                e.style.opacity = 0.5;
                e.style.filter = 'alpha(opacity=50)';
                e.style.display = 'block';
                this.pos()
            }
            TINY.box.twalpha(e, a, d, s, fun)
        },
        twalpha: function(e, a, d, s, fun) {
            e.style.opacity = a / 100;
            e.style.filter = 'alpha(opacity=' + a + ')';
            if (d == -1) {
                e.style.display = 'none';
                e == p ? TINY.box.alpha(m, -1, 0, 3, fun) : b.innerHTML = p.style.backgroundImage = ''
            } else {
                e == m ? this.alpha(p, 1, 100, 1, fun) : TINY.box.fill(ic, iu, iw, ih, ia, fun)
            }
        },
        size: function(e, w, h, s) {
            e = typeof e == 'object' ? e : T$(e);
            clearInterval(e.si);
            var ow = e.offsetWidth,
                oh = e.offsetHeight,
                wo = ow - parseInt(e.style.width),
                ho = oh - parseInt(e.style.height);
            var wd = ow - wo > w ? -1 : 1,
                hd = (oh - ho > h) ? -1 : 1;
            e.si = setInterval(function() {
                TINY.box.twsize(e, w, wo, wd, h, ho, hd, s)
            }, 1)
        },
        twsize: function(e, w, wo, wd, h, ho, hd, s) {
            var ow = e.offsetWidth - wo,
                oh = e.offsetHeight - ho;
            if (ow == w && oh == h) {
                clearInterval(e.si);
                p.style.backgroundImage = 'none';
                b.style.display = 'block'
            } else {
                if (ow != w) {
                    e.style.width = ow + (Math.ceil(Math.abs(w - ow) / s) * wd) + 'px'
                }
                if (oh != h) {
                    e.style.height = oh + (Math.ceil(Math.abs(h - oh) / s) * hd) + 'px'
                }
                this.pos()
            }
        }
    }
}();
TINY.page = function() {
    return {
        top: function() {
            return document.body.scrollTop || document.documentElement.scrollTop
        },
        width: function() {
            return self.innerWidth || document.documentElement.clientWidth
        },
        height: function() {
            return self.innerHeight || document.documentElement.clientHeight
        },
        theight: function() {
            var d = document,
                b = d.body,
                e = d.documentElement;
            return Math.max(Math.max(b.scrollHeight, e.scrollHeight), Math.max(b.clientHeight, e.clientHeight))
        },
        twidth: function() {
            var d = document,
                b = d.body,
                e = d.documentElement;
            return Math.max(Math.max(b.scrollWidth, e.scrollWidth), Math.max(b.clientWidth, e.clientWidth))
        }
    }
}();
//pagination,js分页，个人中心收件箱有用
jQuery.fn.pagination = function(g, a) {
    a = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 10,
        current_page: 0,
        num_edge_entries: 0,
        link_to: "javascript:void(0)",
        prev_text: "Prev",
        next_text: "Next",
        ellipse_text: "...",
        prev_show_always: !0,
        next_show_always: !0,
        callback: function() {
            return !1
        }
    }, a || {});
    return this.each(function() {
        function j(b, c) {
            d = b;
            k();
            var f = a.callback(b, i);
            f || (c.stopPropagation ? c.stopPropagation() : c.cancelBubble = !0);
            return f
        }
        function k() {
            i.empty();
            var b;
            b = Math.ceil(a.num_display_entries / 2);
            var c = Math.ceil(g / a.items_per_page),
                f = c - a.num_display_entries,
                f = d > b ? Math.max(Math.min(d - b, f), 0) : 0;
            b = d > b ? Math.min(d + b, c) : Math.min(a.num_display_entries, c);
            b = [f, b];
            var h = Math.ceil(g / a.items_per_page),
                k = function(a) {
                    return function(b) {
                        return j(a, b)
                    }
                },
                c = function(b, c) {
                    var b = 0 > b ? 0 : b < h ? b : h - 1,
                        c = jQuery.extend({
                            text: b + 1,
                            classes: ""
                        }, c || {}),
                        e = b == d ? jQuery("<span class='current'>" + c.text + "</span>") : jQuery("<a>" + c.text + "</a>").bind("click", k(b)).attr("href", a.link_to.replace(/__id__/, b));
                    c.classes && e.addClass(c.classes);
                    i.append(e)
                };
            a.prev_text && (0 < d || a.prev_show_always) && c(d - 1, {
                text: a.prev_text,
                classes: "prev"
            });
            if (0 < b[0] && 0 < a.num_edge_entries) {
                for (var f = Math.min(a.num_edge_entries, b[0]), e = 0; e < f; e++) c(e);
                a.num_edge_entries < b[0] && a.ellipse_text && jQuery("<span>" + a.ellipse_text + "</span>").appendTo(i)
            }
            for (e = b[0]; e < b[1]; e++) c(e);
            if (b[1] < h && 0 < a.num_edge_entries) {
                h - a.num_edge_entries > b[1] && a.ellipse_text && jQuery("<span>" + a.ellipse_text + "</span>").appendTo(i);
                for (e = Math.max(h - a.num_edge_entries, b[1]); e < h; e++) c(e)
            }
            a.next_text && (d < h - 1 || a.next_show_always) && c(d + 1, {
                text: a.next_text,
                classes: "next"
            })
        }
        var d = a.current_page;
        g = !g || 0 > g ? 1 : g;
        a.items_per_page = !a.items_per_page || 0 > a.items_per_page ? 1 : a.items_per_page;
        var i = jQuery(this);
        this.selectPage = function(a) {
            j(a)
        };
        this.prevPage = function() {
            return 0 < d ? (j(d - 1), !0) : !1
        };
        this.nextPage = function() {
            return d < Math.ceil(g / a.items_per_page) - 1 ? (j(d + 1), !0) : !1
        };
        k();
        a.callback(d, this)
    })
};
//JSON
if (typeof JSON !== 'object') {
    JSON = {}
}(function() {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key)
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null'
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null'
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' '
                }
            } else if (typeof space === 'string') {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify')
            }
            return str('', {
                '': value
            })
        }
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j
            }
            throw new SyntaxError('JSON.parse')
        }
    }
}());
//SWFObject v2.2 加载swf文件
var swfobject = function() {
    var D = "undefined",
        r = "object",
        S = "Shockwave Flash",
        W = "ShockwaveFlash.ShockwaveFlash",
        q = "application/x-shockwave-flash",
        R = "SWFObjectExprInst",
        x = "onreadystatechange",
        O = window,
        j = document,
        t = navigator,
        T = false,
        U = [h],
        o = [],
        N = [],
        I = [],
        l, Q, E, B, J = false,
        a = false,
        n, G, m = true,
        M = function() {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                ah = t.userAgent.toLowerCase(),
                Y = t.platform.toLowerCase(),
                ae = Y ? /win/.test(Y) : /win/.test(ah),
                ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                X = !+"\v1",
                ag = [0, 0, 0],
                ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        }
                    } catch (Z) {}
                }
            }
            return {
                w3: aa,
                pv: ag,
                wk: af,
                ie: X,
                win: ae,
                mac: ac
            }
        }(),
        k = function() {
            if (!M.w3) {
                return
            }
            if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                f()
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false)
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, function() {
                        if (j.readyState == "complete") {
                            j.detachEvent(x, arguments.callee);
                            f()
                        }
                    });
                    if (O == top) {
                        (function() {
                            if (J) {
                                return
                            }
                            try {
                                j.documentElement.doScroll("left")
                            } catch (X) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                }
                if (M.wk) {
                    (function() {
                        if (J) {
                            return
                        }
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
                s(f)
            }
        }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }
    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }
    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function() {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }
    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }
    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function() {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }
    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }
    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }
    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }
    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function() {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }
    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function() {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }
    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }
    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }
    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }
    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function() {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }
    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }
    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {}
        return X
    }
    function C(X) {
        return j.createElement(X)
    }
    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }
    function F(Z) {
        var Y = M.pv,
            X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }
    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }
    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }
    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function() {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function() {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function(ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function(X) {
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function(ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function() {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function() {
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function() {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function(Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        },
        showExpressInstall: function(Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function(X) {
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function(aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function(aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function() {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();
//拖放程序,直播页，聊天框中的拖动条
var isIE = (document.all) ? true : false;
var isIE6 = isIE && !window.XMLHttpRequest;
var $I = function(id) {
    return "string" == typeof id ? document.getElementById(id) : id
};
var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this, arguments)
        }
    }
};
var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property]
    }
};
var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments)
    }
};
var BindAsEventListener = function(object, fun) {
    var args = Array.prototype.slice.call(arguments).slice(2);
    return function(event) {
        return fun.apply(object, [event || window.event].concat(args))
    }
};
var CurrentStyle = function(element) {
    return element.currentStyle || document.defaultView.getComputedStyle(element, null)
};

function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false)
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler)
    } else {
        oTarget["on" + sEventType] = fnHandler
    }
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false)
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler)
    } else {
        oTarget["on" + sEventType] = null
    }
};
var Drag = Class.create();
Drag.prototype = {
    initialize: function(drag, options) {
        this.Drag = $I(drag);
        this._x = this._y = 0;
        this._marginLeft = this._marginTop = 0;
        this._fM = BindAsEventListener(this, this.Move);
        this._fS = Bind(this, this.Stop);
        this.SetOptions(options);
        this.Limit = !! this.options.Limit;
        this.mxLeft = parseInt(this.options.mxLeft);
        this.mxRight = parseInt(this.options.mxRight);
        this.mxTop = parseInt(this.options.mxTop);
        this.mxBottom = parseInt(this.options.mxBottom);
        this.LockX = !! this.options.LockX;
        this.LockY = !! this.options.LockY;
        this.Lock = !! this.options.Lock;
        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;
        this._Handle = $I(this.options.Handle) || this.Drag;
        this._mxContainer = $I(this.options.mxContainer) || null;
        this.Drag.style.position = "absolute";
        if (isIE && !! this.options.Transparent) {
            with(this._Handle.appendChild(document.createElement("div")).style) {
                width = height = "100%";
                backgroundColor = "#fff";
                filter = "alpha(opacity:0)";
                fontSize = 0
            }
        }
        this.Repair();
        addEventHandler(this._Handle, "mousedown", BindAsEventListener(this, this.Start))
    },
    SetOptions: function(options) {
        this.options = {
            Handle: "",
            Limit: false,
            mxLeft: 0,
            mxRight: 9999,
            mxTop: 0,
            mxBottom: 9999,
            mxContainer: "",
            LockX: false,
            LockY: false,
            Lock: false,
            Transparent: false,
            onStart: function() {},
            onMove: function(itop) {},
            onStop: function() {}
        };
        Extend(this.options, options || {})
    },
    Start: function(oEvent) {
        if (this.Lock) {
            return
        }
        this.Repair();
        this._x = oEvent.clientX - this.Drag.offsetLeft;
        this._y = oEvent.clientY - this.Drag.offsetTop;
        this._marginLeft = parseInt(CurrentStyle(this.Drag).marginLeft) || 0;
        this._marginTop = parseInt(CurrentStyle(this.Drag).marginTop) || 0;
        addEventHandler(document, "mousemove", this._fM);
        addEventHandler(document, "mouseup", this._fS);
        if (isIE) {
            addEventHandler(this._Handle, "losecapture", this._fS);
            this._Handle.setCapture()
        } else {
            addEventHandler(window, "blur", this._fS);
            oEvent.preventDefault()
        };
        this.onStart()
    },
    Repair: function() {
        if (this.Limit) {
            this.mxRight = Math.max(this.mxRight, this.mxLeft + this.Drag.offsetWidth);
            this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.Drag.offsetHeight);
            !this._mxContainer || CurrentStyle(this._mxContainer).position == "relative" || CurrentStyle(this._mxContainer).position == "absolute" || (this._mxContainer.style.position = "relative")
        }
    },
    Move: function(oEvent) {
        if (this.Lock) {
            this.Stop();
            return
        };
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var iLeft = oEvent.clientX - this._x,
            iTop = oEvent.clientY - this._y;
        if (this.Limit) {
            var mxLeft = this.mxLeft,
                mxRight = this.mxRight,
                mxTop = this.mxTop,
                mxBottom = this.mxBottom;
            if ( !! this._mxContainer) {
                mxLeft = Math.max(mxLeft, 0);
                mxTop = Math.max(mxTop, 0);
                mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
                mxBottom = Math.min(mxBottom, this._mxContainer.clientHeight)
            };
            iLeft = Math.max(Math.min(iLeft, mxRight - this.Drag.offsetWidth), mxLeft);
            iTop = Math.max(Math.min(iTop, mxBottom - this.Drag.offsetHeight), mxTop)
        }
        if (!this.LockX) {
            this.Drag.style.left = iLeft - this._marginLeft + "px"
        }
        if (!this.LockY) {
            this.Drag.style.top = iTop - this._marginTop + "px"
        }
        this.onMove(iTop, iLeft)
    },
    Stop: function() {
        removeEventHandler(document, "mousemove", this._fM);
        removeEventHandler(document, "mouseup", this._fS);
        if (isIE) {
            removeEventHandler(this._Handle, "losecapture", this._fS);
            this._Handle.releaseCapture()
        } else {
            removeEventHandler(window, "blur", this._fS)
        };
        this.onStop()
    }
};
//鼠标移上去弹出提示,直播页的礼物要用,$("#sdf").toolTip();
(function($) {
    $.fn.extend({
        toolTip: function(options) {
            var opts = $.extend({}, $.fn.toolTip.defaults, options);
            return this.each(function() {
                $(this).mouseover(function(e) {
                    this.myTitle = opts.title || this.title;
                    this.title = '';
                    var tooltip = '';
                    if (this.myTitle == '') {
                        tooltip = ''
                    } else {
                        tooltip = "<div id='tooltip'><p>" + this.myTitle + "</p></div>"
                    }
                    $('body').append(tooltip);
                    var x, y;
                    if (opts.fixed) {
                        x = $(this).offset().left;
                        y = $(this).offset().top
                    } else {
                        x = e.pageX;
                        y = e.pageY
                    }
                    $('#tooltip').css({
                        "opacity": opts.opacity,
                        "top": (y + opts.top) + "px",
                        "left": (x + opts.left) + "px"
                    }).show('fast')
                }).mouseout(function() {
                    this.title = this.myTitle;
                    $('#tooltip').remove()
                }).mousemove(function(e) {
                    if (opts.track) {
                        $('#tooltip').css({
                            "top": (e.pageY + opts.top) + "px",
                            "left": (e.pageX + opts.left) + "px"
                        })
                    }
                })
            })
        }
    });
    $.fn.toolTip.defaults = {
        fixed: false,
        track: true,
        title: '',
        top: 0,
        left: 20,
        opacity: .9
    }
})(jQuery);
//输入框内容为空时闪烁,直播页用，$('#bcText').focusInput();
(function($) {
    $.fn.extend({
        focusInput: function() {
            return this.each(function() {
                flashing($(this), 'background-color', 'pink');
                $(this).focus()
            })
        }
    })
})(jQuery);

function flashing(o, css, cVal, oVal, f, t) {
    if (o.data('sing')) {
        return
    }
    o.data('sing', 1);
    f = f || 100;
    t = t || 800;
    oVal = o.css(css);
    var vals = [oVal, cVal],
        n = 0;
    var tmr = setInterval(function() {
        o.css(css, vals[(n++) % 2])
    }, f);
    setTimeout(function() {
        clearInterval(tmr);
        tmr = null;
        o.css(css, oVal).removeData('sing')
    }, t)
}