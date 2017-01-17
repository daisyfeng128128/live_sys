define("LIVE_IO", [], function(require, exports, module) {
    (function(global, undefined) {
        if (global.LiveIO) return !1;
        var liveIO = {
                version: "0.1.0"
            },
            util = liveIO.util = {},
            toString = util.toString;
        liveIO._MODE = "deploy";
        var _MIME_M3U8 = "application/vnd.apple.mpegurl",
            _MIME_PLUGIN = "application/youku-live_launcher",
            _STEAM_URL = "http://lapi.xiu.youku.com/v1/get_playlist",
            _SWF_VERSION = "10.0.0",
            _SWF_INSTALL = "expressInstall.swf",
            _SWF_PARAM = {
                allowFullScreen: !0,
                allowScriptAccess: "always",
                wmode: "opaque",
                bgcolor: "#000000",
                allowFullScreenInteractive: "true"
            },
            _SWF_CALL_BACK_NAMESPACE_PREFIX = "XMPlayer",
            PLUGIN_CLASS_ID = "CLSID:EC7EC8A8-D529-465A-BFD8-5D26C7244BE7",
            PLUGIN_MIME_TYPE = _MIME_PLUGIN,
            PLUGIN_INTERFACE_NAME = "XMPlugin",
            PLUGIN_PROTOCOL = liveIO.PLUGIN_PROTOCOL = {
                DEFAULT: 0,
                RTP: 1,
                RTMP: 2
            },
            CONST = {
                NaN: Number.NaN
            };
        (function(util) {
            var class2type = function(arr) {
                var res = {},
                    i = 0,
                    length = arr.length;
                for (; i < length; i++) res["[object " + arr[i] + "]"] = arr[i].toLowerCase();
                return res
            }("Boolean Number String Function Array Date RegExp Object Error".split(" "));
            util.type = function(obj) {
                return obj == null ? obj + "" : typeof obj == "object" || typeof obj == "function" ? class2type[toString.call(obj)] || "object" : typeof obj
            }, util.each = function(obj, callback) {
                var res, i = 0,
                    length = obj.length,
                    isArray = util.type(obj) == "array";
                if (isArray)
                    for (; i < length; i++) {
                        res = callback.call(obj[i], i, obj[i]);
                        if (res === !1) break
                    } else
                    for (i in obj) {
                        res = callback.call(obj[i], i, obj[i]);
                        if (res === !1) break
                    }
                return obj
            }
        })(util),
            function(util, global) {
                if (global.JSON && global.JSON.parse && global.JSON.stringify) util.parseJSON = global.JSON.parse, util.stringifyJSON = global.JSON.stringify;
                else {
                    function f(n) {
                        return n < 10 ? "0" + n : n
                    }

                    function date(d, key) {
                        return isFinite(d.valueOf()) ? d.getUTCFullYear() + "-" + f(d.getUTCMonth() + 1) + "-" + f(d.getUTCDate()) + "T" + f(d.getUTCHours()) + ":" + f(d.getUTCMinutes()) + ":" + f(d.getUTCSeconds()) + "Z" : null
                    }
                    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        gap, indent, meta = {
                            "\b": "\\b",
                            "	": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        },
                        rep;

                    function quote(string) {
                        return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                            var c = meta[a];
                            return typeof c == "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + string + '"'
                    }

                    function str(key, holder) {
                        var i, k, v, length, mind = gap,
                            partial, value = holder[key];
                        value instanceof Date && (value = date(key)), typeof rep == "function" && (value = rep.call(holder, key, value));
                        switch (typeof value) {
                            case "string":
                                return quote(value);
                            case "number":
                                return isFinite(value) ? String(value) : "null";
                            case "boolean":
                            case "null":
                                return String(value);
                            case "object":
                                if (!value) return "null";
                                gap += indent, partial = [];
                                if (Object.prototype.toString.apply(value) === "[object Array]") {
                                    length = value.length;
                                    for (i = 0; i < length; i += 1) partial[i] = str(i, value) || "null";
                                    return v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", gap = mind, v
                                }
                                if (rep && typeof rep == "object") {
                                    length = rep.length;
                                    for (i = 0; i < length; i += 1) typeof rep[i] == "string" && (k = rep[i], v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v))
                                } else
                                    for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), v && partial.push(quote(k) + (gap ? ": " : ":") + v));
                                return v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", gap = mind, v
                        }
                    }
                    util.stringifyJSON = function(value, replacer, space) {
                        var i;
                        gap = "", indent = "";
                        if (typeof space == "number")
                            for (i = 0; i < space; i += 1) indent += " ";
                        else typeof space == "string" && (indent = space);
                        rep = replacer;
                        if (!replacer || typeof replacer == "function" || typeof replacer == "object" && typeof replacer.length == "number") return str("", {
                            "": value
                        });
                        throw new Error("JSON.stringify")
                    }, util.parseJSON = function(text, reviver) {
                        var j;

                        function walk(holder, key) {
                            var k, v, value = holder[key];
                            if (value && typeof value == "object")
                                for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), v !== undefined ? value[k] = v : delete value[k]);
                            return reviver.call(holder, key, value)
                        }
                        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        }));
                        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                            "": j
                        }, "") : j;
                        throw new SyntaxError("JSON.parse")
                    }
                }
            }(util, global),
            function(util) {
                var swfobject = function() {
                    var UNDEF = "undefined",
                        OBJECT = "object",
                        SHOCKWAVE_FLASH = "Shockwave Flash",
                        SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
                        FLASH_MIME_TYPE = "application/x-shockwave-flash",
                        EXPRESS_INSTALL_ID = "SWFObjectExprInst",
                        ON_READY_STATE_CHANGE = "onreadystatechange",
                        win = window,
                        doc = document,
                        nav = navigator,
                        plugin = !1,
                        domLoadFnArr = [main],
                        regObjArr = [],
                        objIdArr = [],
                        listenersArr = [],
                        storedAltContent, storedAltContentId, storedCallbackFn, storedCallbackObj, isDomLoaded = !1,
                        isExpressInstallActive = !1,
                        dynamicStylesheet, dynamicStylesheetMedia, autoHideShow = !0,
                        ua = function() {
                            var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
                                u = nav.userAgent.toLowerCase(),
                                p = nav.platform.toLowerCase(),
                                windows = p ? /win/.test(p) : /win/.test(u),
                                mac = p ? /mac/.test(p) : /mac/.test(u),
                                webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                                ie = !1,
                                playerVersion = [0, 0, 0],
                                d = null,
                                hasFlash = !1;
                            if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) hasFlash = !0, d = nav.plugins[SHOCKWAVE_FLASH].description, d && (typeof nav.mimeTypes == UNDEF || !nav.mimeTypes[FLASH_MIME_TYPE] || !!nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin) && (plugin = !0, ie = !1, d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10), playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10), playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                            else if (typeof win.ActiveXObject != UNDEF) try {
                                var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                                a && (hasFlash = !0, d = a.GetVariable("$version"), d && (ie = !0, d = d.split(" ")[1].split(","), playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]))
                            } catch (e) {}
                            return {
                                w3: w3cdom,
                                pv: playerVersion,
                                wk: webkit,
                                ie: ie,
                                win: windows,
                                mac: mac,
                                hasFlash: hasFlash
                            }
                        }(),
                        onDomLoad = function() {
                            if (!ua.w3) return;
                            (typeof doc.readyState != UNDEF && doc.readyState == "complete" || typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body)) && callDomLoadFunctions(), isDomLoaded || (typeof doc.addEventListener != UNDEF && doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, !1), ua.ie && ua.win && (doc.attachEvent(ON_READY_STATE_CHANGE, function() {
                                doc.readyState == "complete" && (doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee), callDomLoadFunctions())
                            }), win == top && function() {
                                if (isDomLoaded) return;
                                try {
                                    doc.documentElement.doScroll("left")
                                } catch (e) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                callDomLoadFunctions()
                            }()), ua.wk && function() {
                                if (isDomLoaded) return;
                                if (!/loaded|complete/.test(doc.readyState)) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                callDomLoadFunctions()
                            }(), addLoadEvent(callDomLoadFunctions))
                        }();

                    function callDomLoadFunctions() {
                        if (isDomLoaded) return;
                        try {
                            var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
                            t.parentNode.removeChild(t)
                        } catch (e) {
                            return
                        }
                        isDomLoaded = !0;
                        var dl = domLoadFnArr.length;
                        for (var i = 0; i < dl; i++) domLoadFnArr[i]()
                    }

                    function addDomLoadEvent(fn) {
                        isDomLoaded ? fn() : domLoadFnArr[domLoadFnArr.length] = fn
                    }

                    function addLoadEvent(fn) {
                        if (typeof win.addEventListener != UNDEF) win.addEventListener("load", fn, !1);
                        else if (typeof doc.addEventListener != UNDEF) doc.addEventListener("load", fn, !1);
                        else if (typeof win.attachEvent != UNDEF) addListener(win, "onload", fn);
                        else if (typeof win.onload == "function") {
                            var fnOld = win.onload;
                            win.onload = function() {
                                fnOld(), fn()
                            }
                        } else win.onload = fn
                    }

                    function main() {
                        plugin ? testPlayerVersion() : matchVersions()
                    }

                    function testPlayerVersion() {
                        var b = doc.getElementsByTagName("body")[0],
                            o = createElement(OBJECT);
                        o.setAttribute("type", FLASH_MIME_TYPE);
                        var t = b.appendChild(o);
                        if (t) {
                            var counter = 0;
                            (function() {
                                if (typeof t.GetVariable != UNDEF) {
                                    var d = t.GetVariable("$version");
                                    d && (d = d.split(" ")[1].split(","), ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)])
                                } else if (counter < 10) {
                                    counter++, setTimeout(arguments.callee, 10);
                                    return
                                }
                                b.removeChild(o), t = null, matchVersions()
                            })()
                        } else matchVersions()
                    }

                    function matchVersions() {
                        var rl = regObjArr.length;
                        if (rl > 0)
                            for (var i = 0; i < rl; i++) {
                                var id = regObjArr[i].id,
                                    cb = regObjArr[i].callbackFn,
                                    cbObj = {
                                        success: !1,
                                        id: id
                                    };
                                if (ua.pv[0] > 0) {
                                    var obj = getElementById(id);
                                    if (obj)
                                        if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) setVisibility(id, !0), cb && (cbObj.success = !0, cbObj.ref = getObjectById(id), cb(cbObj));
                                        else if (regObjArr[i].expressInstall && canExpressInstall()) {
                                            var att = {};
                                            att.data = regObjArr[i].expressInstall, att.width = obj.getAttribute("width") || "0", att.height = obj.getAttribute("height") || "0", obj.getAttribute("class") && (att.styleclass = obj.getAttribute("class")), obj.getAttribute("align") && (att.align = obj.getAttribute("align"));
                                            var par = {},
                                                p = obj.getElementsByTagName("param"),
                                                pl = p.length;
                                            for (var j = 0; j < pl; j++) p[j].getAttribute("name").toLowerCase() != "movie" && (par[p[j].getAttribute("name")] = p[j].getAttribute("value"));
                                            showExpressInstall(att, par, id, cb)
                                        } else displayAltContent(obj), cb && cb(cbObj)
                                } else {
                                    setVisibility(id, !0);
                                    if (cb) {
                                        var o = getObjectById(id);
                                        o && typeof o.SetVariable != UNDEF && (cbObj.success = !0, cbObj.ref = o), cb(cbObj)
                                    }
                                }
                            }
                    }

                    function getObjectById(objectIdStr) {
                        var r = null,
                            o = getElementById(objectIdStr);
                        if (o && o.nodeName == "OBJECT")
                            if (typeof o.SetVariable != UNDEF) r = o;
                            else {
                                var n = o.getElementsByTagName(OBJECT)[0];
                                n && (r = n)
                            }
                        return r
                    }

                    function canExpressInstall() {
                        return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312)
                    }

                    function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
                        isExpressInstallActive = !0, storedCallbackFn = callbackFn || null, storedCallbackObj = {
                            success: !1,
                            id: replaceElemIdStr
                        };
                        var obj = getElementById(replaceElemIdStr);
                        if (obj) {
                            obj.nodeName == "OBJECT" ? (storedAltContent = abstractAltContent(obj), storedAltContentId = null) : (storedAltContent = obj, storedAltContentId = replaceElemIdStr), att.id = EXPRESS_INSTALL_ID;
                            if (typeof att.width == UNDEF || !/%$/.test(att.width) && parseInt(att.width, 10) < 310) att.width = "310";
                            if (typeof att.height == UNDEF || !/%$/.test(att.height) && parseInt(att.height, 10) < 137) att.height = "137";
                            doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
                            var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
                                fv = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g, "%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
                            typeof par.flashvars != UNDEF ? par.flashvars += "&" + fv : par.flashvars = fv;
                            if (ua.ie && ua.win && obj.readyState != 4) {
                                var newObj = createElement("div");
                                replaceElemIdStr += "SWFObjectNew", newObj.setAttribute("id", replaceElemIdStr), obj.parentNode.insertBefore(newObj, obj), obj.style.display = "none",
                                    function() {
                                        obj.readyState == 4 ? obj.parentNode.removeChild(obj) : setTimeout(arguments.callee, 10)
                                    }()
                            }
                            createSWF(att, par, replaceElemIdStr)
                        }
                    }

                    function displayAltContent(obj) {
                        if (ua.ie && ua.win && obj.readyState != 4) {
                            var el = createElement("div");
                            obj.parentNode.insertBefore(el, obj), el.parentNode.replaceChild(abstractAltContent(obj), el), obj.style.display = "none",
                                function() {
                                    obj.readyState == 4 ? obj.parentNode.removeChild(obj) : setTimeout(arguments.callee, 10)
                                }()
                        } else obj.parentNode.replaceChild(abstractAltContent(obj), obj)
                    }

                    function abstractAltContent(obj) {
                        var ac = createElement("div");
                        if (ua.win && ua.ie) ac.innerHTML = obj.innerHTML;
                        else {
                            var nestedObj = obj.getElementsByTagName(OBJECT)[0];
                            if (nestedObj) {
                                var c = nestedObj.childNodes;
                                if (c) {
                                    var cl = c.length;
                                    for (var i = 0; i < cl; i++)(c[i].nodeType != 1 || c[i].nodeName != "PARAM") && c[i].nodeType != 8 && ac.appendChild(c[i].cloneNode(!0))
                                }
                            }
                        }
                        return ac
                    }

                    function createSWF(attObj, parObj, id) {
                        var r, el = getElementById(id);
                        if (ua.wk && ua.wk < 312) return r;
                        if (el) {
                            typeof attObj.id == UNDEF && (attObj.id = id);
                            if (ua.ie && ua.win) {
                                var att = "";
                                for (var i in attObj) attObj[i] != Object.prototype[i] && (i.toLowerCase() == "data" ? parObj.movie = attObj[i] : i.toLowerCase() == "styleclass" ? att += ' class="' + attObj[i] + '"' : i.toLowerCase() != "classid" && (att += " " + i + '="' + attObj[i] + '"'));
                                var par = "";
                                for (var j in parObj) parObj[j] != Object.prototype[j] && (par += '<param name="' + j + '" value="' + parObj[j] + '" />');
                                el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + ">" + par + "</object>", objIdArr[objIdArr.length] = attObj.id, r = getElementById(attObj.id)
                            } else {
                                var o = createElement(OBJECT);
                                o.setAttribute("type", FLASH_MIME_TYPE);
                                for (var m in attObj) attObj[m] != Object.prototype[m] && (m.toLowerCase() == "styleclass" ? o.setAttribute("class", attObj[m]) : m.toLowerCase() != "classid" && o.setAttribute(m, attObj[m]));
                                for (var n in parObj) parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie" && createObjParam(o, n, parObj[n]);
                                el.parentNode.replaceChild(o, el), r = o
                            }
                        }
                        return r
                    }

                    function createObjParam(el, pName, pValue) {
                        var p = createElement("param");
                        p.setAttribute("name", pName), p.setAttribute("value", pValue), el.appendChild(p)
                    }

                    function removeSWF(id) {
                        var obj = getElementById(id);
                        obj && obj.nodeName == "OBJECT" && (ua.ie && ua.win ? (obj.style.display = "none", function() {
                            obj.readyState == 4 ? removeObjectInIE(id) : setTimeout(arguments.callee, 10)
                        }()) : obj.parentNode.removeChild(obj))
                    }

                    function removeObjectInIE(id) {
                        var obj = getElementById(id);
                        if (obj) {
                            for (var i in obj) typeof obj[i] == "function" && (obj[i] = null);
                            obj.parentNode.removeChild(obj)
                        }
                    }

                    function getElementById(id) {
                        var el = null;
                        try {
                            el = doc.getElementById(id)
                        } catch (e) {}
                        return el
                    }

                    function createElement(el) {
                        return doc.createElement(el)
                    }

                    function addListener(target, eventType, fn) {
                        target.attachEvent(eventType, fn), listenersArr[listenersArr.length] = [target, eventType, fn]
                    }

                    function hasPlayerVersion(rv) {
                        var pv = ua.pv,
                            v = rv.split(".");
                        return v[0] = parseInt(v[0], 10), v[1] = parseInt(v[1], 10) || 0, v[2] = parseInt(v[2], 10) || 0, pv[0] > v[0] || pv[0] == v[0] && pv[1] > v[1] || pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2] ? !0 : !1
                    }

                    function createCSS(sel, decl, media, newStyle) {
                        if (ua.ie && ua.mac) return;
                        var h = doc.getElementsByTagName("head")[0];
                        if (!h) return;
                        var m = media && typeof media == "string" ? media : "screen";
                        newStyle && (dynamicStylesheet = null, dynamicStylesheetMedia = null);
                        if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
                            var s = createElement("style");
                            s.setAttribute("type", "text/css"), s.setAttribute("media", m), dynamicStylesheet = h.appendChild(s), ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0 && (dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1]), dynamicStylesheetMedia = m
                        }
                        ua.ie && ua.win ? dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT && dynamicStylesheet.addRule(sel, decl) : dynamicStylesheet && typeof doc.createTextNode != UNDEF && dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"))
                    }

                    function setVisibility(id, isVisible) {
                        if (!autoHideShow) return;
                        var v = isVisible ? "visible" : "hidden";
                        isDomLoaded && getElementById(id) ? getElementById(id).style.visibility = v : createCSS("#" + id, "visibility:" + v)
                    }

                    function urlEncodeIfNecessary(s) {
                        var regex = /[\\\"<>\.;]/,
                            hasBadChars = regex.exec(s) != null;
                        return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s
                    }
                    var cleanup = function() {
                        ua.ie && ua.win && window.attachEvent("onunload", function() {
                            var ll = listenersArr.length;
                            for (var i = 0; i < ll; i++) listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
                            var il = objIdArr.length;
                            for (var j = 0; j < il; j++) removeSWF(objIdArr[j]);
                            for (var k in ua) ua[k] = null;
                            ua = null;
                            for (var l in swfobject) swfobject[l] = null;
                            swfobject = null
                        })
                    }();
                    return {
                        registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
                            if (ua.w3 && objectIdStr && swfVersionStr) {
                                var regObj = {};
                                regObj.id = objectIdStr, regObj.swfVersion = swfVersionStr, regObj.expressInstall = xiSwfUrlStr, regObj.callbackFn = callbackFn, regObjArr[regObjArr.length] = regObj, setVisibility(objectIdStr, !1)
                            } else callbackFn && callbackFn({
                                success: !1,
                                id: objectIdStr
                            })
                        },
                        getObjectById: function(objectIdStr) {
                            if (ua.w3) return getObjectById(objectIdStr)
                        },
                        embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
                            var callbackObj = {
                                success: !1,
                                id: replaceElemIdStr
                            };
                            ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr ? (setVisibility(replaceElemIdStr, !1), addDomLoadEvent(function() {
                                widthStr += "", heightStr += "";
                                var att = {};
                                if (attObj && typeof attObj === OBJECT)
                                    for (var i in attObj) att[i] = attObj[i];
                                att.data = swfUrlStr, att.width = widthStr, att.height = heightStr;
                                var par = {};
                                if (parObj && typeof parObj === OBJECT)
                                    for (var j in parObj) par[j] = parObj[j];
                                if (flashvarsObj && typeof flashvarsObj === OBJECT)
                                    for (var k in flashvarsObj) typeof par.flashvars != UNDEF ? par.flashvars += "&" + k + "=" + flashvarsObj[k] : par.flashvars = k + "=" + flashvarsObj[k];
                                if (hasPlayerVersion(swfVersionStr)) {
                                    var obj = createSWF(att, par, replaceElemIdStr);
                                    att.id == replaceElemIdStr && setVisibility(replaceElemIdStr, !0), callbackObj.success = !0, callbackObj.ref = obj
                                } else {
                                    if (xiSwfUrlStr && canExpressInstall()) {
                                        att.data = xiSwfUrlStr, showExpressInstall(att, par, replaceElemIdStr, callbackFn);
                                        return
                                    }
                                    setVisibility(replaceElemIdStr, !0)
                                }
                                callbackFn && callbackFn(callbackObj)
                            })) : callbackFn && callbackFn(callbackObj)
                        },
                        switchOffAutoHideShow: function() {
                            autoHideShow = !1
                        },
                        ua: ua,
                        getFlashPlayerVersion: function() {
                            return {
                                major: ua.pv[0],
                                minor: ua.pv[1],
                                release: ua.pv[2]
                            }
                        },
                        hasFlashPlayerVersion: hasPlayerVersion,
                        createSWF: function(attObj, parObj, replaceElemIdStr) {
                            return ua.w3 ? createSWF(attObj, parObj, replaceElemIdStr) : undefined
                        },
                        showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
                            ua.w3 && canExpressInstall() && showExpressInstall(att, par, replaceElemIdStr, callbackFn)
                        },
                        removeSWF: function(objElemIdStr) {
                            ua.w3 && removeSWF(objElemIdStr)
                        },
                        createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
                            ua.w3 && createCSS(selStr, declStr, mediaStr, newStyleBoolean)
                        },
                        addDomLoadEvent: addDomLoadEvent,
                        addLoadEvent: addLoadEvent,
                        getQueryParamValue: function(param) {
                            var q = doc.location.search || doc.location.hash;
                            if (q) {
                                /\?/.test(q) && (q = q.split("?")[1]);
                                if (param == null) return urlEncodeIfNecessary(q);
                                var pairs = q.split("&");
                                for (var i = 0; i < pairs.length; i++)
                                    if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) return urlEncodeIfNecessary(pairs[i].substring(pairs[i].indexOf("=") + 1))
                            }
                            return ""
                        },
                        expressInstallCallback: function() {
                            if (isExpressInstallActive) {
                                var obj = getElementById(EXPRESS_INSTALL_ID);
                                obj && storedAltContent && (obj.parentNode.replaceChild(storedAltContent, obj), storedAltContentId && (setVisibility(storedAltContentId, !0), ua.ie && ua.win && (storedAltContent.style.display = "block")), storedCallbackFn && storedCallbackFn(storedCallbackObj)), isExpressInstallActive = !1
                            }
                        }
                    }
                }();
                util.swf = swfobject, util.hasFlash = swfobject.ua.hasFlash
            }(util),
            function(util) {
                var Browser = {
                    OLD_IE: window.ActiveXObject ? !0 : !1,
                    NEW_IE: !window.ActiveXObject && "ActiveXObject" in window,
                    FF: window.navigator.userAgent.indexOf("Firefox") >= 0,
                    Chrome: window.navigator.userAgent.indexOf("Chrome") >= 0,
                    Ipad: window.navigator.userAgent.indexOf("iPhone") > -1 || window.navigator.userAgent.indexOf("iPad") > -1
                };
                Browser.IE = Browser.OLD_IE || Browser.NEW_IE, Browser.MOBILE_OS = function(ua) {
                    return ua.match(/(iPhone|iPod|iPad);?/i) ? "ios" : ua.match(/Android/i) ? "android" : ""
                }(window.navigator.userAgent), util.browser = Browser
            }(util),
            function(util) {
                var SCRIPT_MIME_TYPE = "text/javascript";

                function getScript(url, callback) {
                    var script = document.createElement("script"),
                        head = document.getElementsByTagName("head")[0];
                    return script.src = url, script.setAttribute("async", "async"), script.setAttribute("type", SCRIPT_MIME_TYPE), script.readyState ? script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") script.onreadystatechange = null, callback && callback.call(script, script)
                    } : script.onload = function() {
                        callback && callback.call(script, script)
                    }, head.appendChild(script), script
                }

                function getRandomFunctionName() {
                    return "_liveIOCallback" + (new Date).getTime() + parseInt(Math.random() * 1e3)
                }

                function jsonp(url, data, callback) {
                    var script = null,
                        name = getRandomFunctionName(),
                        param = "callback=" + name + "&_=" + (new Date).getTime();
                    callback || (util.type(data) == "function" ? (callback = data, data = null) : callback = function() {});
                    if (data)
                        for (var k in data) param += "&" + k + "=" + encodeURIComponent(data[k]);
                    window[name] = function(d) {
                        callback.call(d, d), script && script.parentNode.removeChild(script), delete window[name]
                    }, /\?/g.test(url) ? url += "&" + param : url += "?" + param, script = getScript(url)
                }
                util.jsonp = jsonp
            }(util),
            function(util) {
                var Base = function() {
                    return this._constructor()
                };
                Base.prototype = {
                    constructor: Base,
                    _constructor: function() {
                        return this
                    },
                    init: function() {
                        return this
                    }
                }, Base.extend = function(prop) {
                    var _super = this.prototype,
                        methodName, subClass = function() {
                            return this._constructor.apply(this, arguments)
                        },
                        _midClass = function() {};
                    _midClass.prototype = _super, subClass.prototype = new _midClass;
                    for (methodName in prop) subClass.prototype[methodName] = prop[methodName];
                    return subClass.constructor = subClass, subClass._super = _super, subClass.extend = Base.extend, subClass
                }, util.BaseClass = Base;
                var Listener = Base.extend({
                    _constructor: function() {
                        return this._EVENT_METHODS = {}, this._ERROR_FORMAT = "[LIVE.IO.LISTENER]ERROR:[%s]", this._DLOG_FORMAT = "[LIVE.IO.LISTENER]LOG:%s", this._OPEN_DEBUGG = liveIO._MODE == "develop", this
                    },
                    on: function(methodName, callback) {
                        var _this = this;
                        return this._EVENT_METHODS[methodName] || (this._EVENT_METHODS[methodName] = []), this._EVENT_METHODS[methodName].push(callback), this
                    },
                    off: function(methodName, callback) {
                        var methods = this._EVENT_METHODS[methodName],
                            res = [];
                        methods && (callback && util.each(methods, function(e, cb) {
                            cb !== callback && res.push(cb)
                        }), this._EVENT_METHODS[methodName] = res)
                    },
                    emit: function(methodName) {
                        var args = arguments,
                            _this = this,
                            methods = this._EVENT_METHODS[methodName];
                        methods && (Array.prototype.splice.call(args, 0, 1), util.each(methods, function(e) {
                            this.apply(_this, args)
                        }))
                    },
                    _dLog: function(desc, info) {
                        this._OPEN_DEBUGG && window.console && console.log(this._DLOG_FORMAT, desc, info || " ")
                    },
                    _error: function(code, desc) {
                        this._OPEN_DEBUGG && window.console && console.log(this._ERROR_FORMAT, code, desc), this.emit("error", code, desc)
                    }
                });
                util.Listener = Listener
            }(util),
            function(liveIO, util) {
                var Player = util.Listener.extend({
                    _constructor: function(appId, replaceId, option) {
                        return Player._super._constructor.call(this), this._ERROR_FORMAT = "[LIVE.IO.PLAYER]ERROR:[%s]", this._DLOG_FORMAT = "[LIVE.IO.PLAYER]LOG:%s", this._replaceId = replaceId, this._APP_ID = appId, this._flashOption = {
                            width: option.width || "100%",
                            height: option.height || "100%",
                            src: option.src,
                            roomId: option.roomId || 0,
                            allowFullScreen: option.fullScreen == undefined ? 1 : option.fullScreen ? 1 : 0,
                            ex: option.ex,
                            callbackNamespace: option.callbackNamespace || _SWF_CALL_BACK_NAMESPACE_PREFIX + (new Date).getTime()
                        }, this.setTitleList(option.titleList || ["高清", "标清", "流畅"]), this.setDefaultQuality(option.defaultQuality || 3), this.setPToPStatus(option.p2p || 0), this._player = null, this._flashParams = option.flashParams || {}, this._playerHasInit = !1, this
                    },
                    init: function() {
                        return this._initPluginInterface(), this
                    },
                    _initPluginInterface: function() {
                        var interFace = {},
                            _this = this,
                            width = _this._flashOption.width,
                            height = _this._flashOption.height;
                        return interFace.playerLoadCompleted = function() {
                            _this._dLog("初始化成功"), width == "100%" && (width = _this._player.clientWidth), height == "100%" && (height = _this._player.clientHeight), _this._player.init({
                                appId: _this._APP_ID,
                                width: width,
                                height: height,
                                roomId: _this._flashOption.roomId,
                                userAgent: window.navigator.userAgent,
                                sdkVersion: liveIO.version,
                                allowFullscreen: _this._flashOption.allowFullScreen,
                                ex: _this._flashOption.ex,
                                debug: _this._OPEN_DEBUGG ? 1 : 0
                            }), _this._playerHasInit = !0, _this.emit("launchSuccess")
                        }, interFace.stopLive = function() {
                            _this._dLog("停止"), _this.emit("stopLive")
                        }, interFace.liveStatus = function(code, desc) {
                            switch (code) {
                                case "1111":
                                    _this._dLog(desc);
                                    break;
                                case "2222":
                                    _this._dLog(desc);
                                    break;
                                case "3333":
                                    _this._dLog(desc), _this.emit("startLive");
                                    break;
                                default:
                                    _this._error(code, desc)
                            }
                        }, interFace.getParams = function() {
                            return _this._dLog("getParams", _this._flashParams), _this._flashParams
                        }, interFace.giftEffectToggle = function(state) {
                            state == 0 ? (_this._dLog("礼物特效关闭"), _this.emit("giftEffectClose")) : (_this._dLog("礼物特效打开"), _this.emit("giftEffectOpen"))
                        }, interFace.chat = function(value) {
                            _this.emit("chat", value)
                        }, interFace.horn = function(value) {
                            _this.emit("horn", value)
                        }, interFace.getJSON = function(url, flag) {
                            util.jsonp(url, {}, function(d) {
                                _this._player.getThesaurusResponse(d, flag)
                            })
                        }, interFace.videoCountDown = function() {
                            return window._flash_videoCountDown && window._flash_videoCountDown()
                        }, window[this._flashOption.callbackNamespace] = interFace, this
                    },
                    _replaceFlash: function() {
                        var _this = this,
                            o = this._flashOption;
                        return util.swf.embedSWF(o.src, this._replaceId, o.width, o.height, _SWF_VERSION, _SWF_INSTALL, {
                            callbackNamespace: _this._flashOption.callbackNamespace
                        }, _SWF_PARAM, {
                            name: this._replaceId,
                            allowFullScreenInteractive: "true"
                        }, function() {
                            _this._player = document.getElementById(_this._replaceId)
                        }), this
                    },
                    setTitleList: function(titleList) {
                        return titleList && titleList.length > 0 && (this._flashOption.titleList = titleList, this._flashOption.enableNum = titleList.length, this._flashOption.defaultQuality > this._flashOption.enableNum && (this._flashOption.defaultQuality = this._flashOption.enableNum)), this
                    },
                    setDefaultQuality: function(defaultQuality) {
                        return defaultQuality <= this._flashOption.enableNum && (this._flashOption.defaultQuality = defaultQuality), this
                    },
                    setPToPStatus: function(flag) {
                        return this._flashOption.p2p = flag, this
                    },
                    launch: function() {
                        return this._replaceFlash(), util.hasFlash || this._error(5e3, "没有安装Flash插件"), this
                    },
                    startLive: function(streamId, token, titleList, defaultQuality, p2pFlag) {
                        return titleList && this.setTitleList(titleList), defaultQuality && this.setDefaultQuality(defaultQuality), p2pFlag != undefined && this.setPToPStatus(p2pFlag), this._dLog("流ID播放，streamId:" + streamId + ",token:" + token), this._player.startLive({
                            streamId: streamId + "",
                            token: token,
                            titleList: this._flashOption.titleList,
                            enableNum: this._flashOption.enableNum,
                            defaultQuality: this._flashOption.defaultQuality,
                            p2p: this._flashOption.p2p
                        }), this
                    },
                    startLiveByAlias: function(alias, token, titleList, defaultQuality, p2pFlag) {
                        return titleList && this.setTitleList(titleList), defaultQuality && this.setDefaultQuality(defaultQuality), p2pFlag != undefined && this.setPToPStatus(p2pFlag), this._dLog("别名播放，Alias:" + alias + ",token:" + token), this._player.startLive({
                            alias: alias + "",
                            token: token,
                            titleList: this._flashOption.titleList,
                            enableNum: this._flashOption.enableNum,
                            defaultQuality: this._flashOption.defaultQuality,
                            p2p: this._flashOption.p2p
                        }), this
                    },
                    stopLive: function(type) {
                        return this._player.stopLive(type), this
                    },
                    changeVideoSize: function(width, height) {
                        return this._player && (this._dLog("改变OBJECT元素大小[" + width + "][" + height + "]"), this._player.width = width, this._player.height = height, width == "100%" && (width = this._player.clientWidth), height == "100%" && (height = this._player.clientHeight), this._flashOption.width = width, this._flashOption.height = height, this.setPlayerWH(width, height)), this
                    },
                    setPlayerWH: function(width, height) {
                        try {
                            this._dLog("改变Flash绘制窗口大小[" + width + "][" + height + "]"), this._player.exSetPlayerWH({
                                width: width,
                                height: height
                            })
                        } catch (e) {
                            this._dLog("改变Flash绘制窗口大小失败", e)
                        }
                        return this
                    },
                    mute: function(flag) {
                        flag = flag ? 1 : 0;
                        try {
                            this._player.exMute(flag)
                        } catch (e) {
                            this._dLog("静音失败", e)
                        }
                        return this
                    },
                    getVolume: function() {
                        var volume = 0;
                        try {
                            volume = this._player.getVolume()
                        } catch (e) {
                            volume = CONST.NaN, this._dLog("获取音量失败", e)
                        }
                        return volume
                    },
                    setVolume: function(volume) {
                        try {
                            this._dLog("设置音量:" + volume), this._player.exVolumeChange(volume)
                        } catch (e) {
                            this._dLog("设置音量失败", e)
                        }
                        return this
                    },
                    showCtrBar: function() {
                        return this._dLog("showCtrBar"), this._player.exShowCtrBar(1), this
                    },
                    hideCtrBar: function() {
                        return this._dLog("hideCtrBar"), this._player.exShowCtrBar(0), this
                    },
                    destroy: function() {
                        this._player && this._player.parentNode.removeChild(this._player), delete window[this._flashOption.callbackNamespace], this._player = null, this.emit("destroy"), this._dLog("destroyed")
                    },
                    setChatInfo: function(type, info, userId) {
                        this._player.setChatInfo({
                            type: type,
                            info: info,
                            meId: userId
                        })
                    },
                    setGiftInfo: function(info) {
                        this._player.setGiftInfo(info)
                    },
                    flashParam: function(key, value) {
                        return arguments.length == 2 && (this._flashParams[key] = value), this._flashParams[key]
                    },
                    sendResponse: function(type, data) {
                        type == "chat" ? this._player.sendChatRespone(data) : type == "horn" && this._player.sendHornRespone(data)
                    }
                });
                liveIO.createPlayer = function(appId, replaceId, option) {
                    return (new Player(appId, replaceId, option || {})).init()
                }
            }(liveIO, liveIO.util),
            function(liveIO, util) {
                function addEvent(elem, type, eventHandle) {
                    elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, function() {
                        eventHandle.call(this, window.event)
                    })
                }
                var LOADING_START_EVENTS = ["loadstart", "progress", "suspend", "abort", "loadedmetadata", "loadeddata", "waiting", "canplay", "canplaythrough", "seeking", "seeked", "ended", "ratechange", "durationchange", "canplaythrough", "error", "stalled"],
                    LOADING_END_EVENTS = ["playing", "pause", "timeupdate"],
                    Html5Player = util.Listener.extend({
                        _constructor: function(appId, replaceId, option) {
                            return Html5Player._super._constructor.call(this), this._ERROR_FORMAT = "[LIVE.IO.PLAYER-H5]ERROR:[%s]", this._DLOG_FORMAT = "[LIVE.IO.PLAYER-H5]LOG:%s", this._replaceId = replaceId, this._APP_ID = appId, this._player = null, this._controlBar = !0, this._playerOption = {
                                width: option.width,
                                height: option.height
                            }, this
                        },
                        init: function() {
                            return this
                        },
                        _replaceVideo: function(cb) {
                            var elem = document.getElementById(this._replaceId),
                                className = elem.className,
                                w = this._playerOption.width,
                                h = this._playerOption.height,
                                player = document.createElement("video");
                            return player.canPlayType(_MIME_M3U8) ? (player.setAttribute("width", w), player.setAttribute("height", h), this._controlBar && player.setAttribute("controls", "controls"), player.className = className, elem.parentNode.replaceChild(player, elem), player.setAttribute("id", this._replaceId), this._player = player, cb.call(this)) : (this._error(5e3, "当前浏览器不支持m3u8 MIME:application/vnd.apple.mpegurl"), player = null), this
                        },
                        _bindVideoEvent: function() {
                            var p = this._player,
                                _this = this;
                            return addEvent(p, "play", function() {
                                _this.emit("startLive"), _this._dLog("开始播放")
                            }), addEvent(p, "pause", function() {
                                _this.emit("stopLive"), _this._dLog("停止")
                            }), addEvent(p, "canplay", function() {
                                _this.emit("canplay"), _this._dLog("缓冲完毕开始播放")
                            }), util.each(LOADING_START_EVENTS, function(e) {
                                addEvent(p, LOADING_START_EVENTS[e], function() {
                                    _this.emit("loadingStart")
                                })
                            }), util.each(LOADING_END_EVENTS, function(e) {
                                addEvent(p, LOADING_END_EVENTS[e], function() {
                                    _this.emit("loadingEnd")
                                })
                            }), this
                        },
                        launch: function() {
                            var _this = this;
                            return this._replaceVideo(function() {
                                _this._bindVideoEvent(), _this.emit("launchSuccess"), _this._dLog("初始化成功")
                            }), this
                        },
                        startLive: function(streamId, token) {
                            var p = this._player,
                                _this = this;
                            return util.jsonp(_STEAM_URL, {
                                app_id: this._APP_ID,
                                player_type: "h5",
                                stream_id: streamId,
                                token: token
                            }, function(d) {
                                d.error_code == 0 ? (_this._dLog("流地址请求成功", d.url_list[0].url), p.setAttribute("src", d.url_list[0].url), p.play()) : _this._error(2002, "获取播放地址失败server_error_code" + d.error_code)
                            }), this
                        },
                        startLiveByAlias: function(alias, token) {
                            var p = this._player,
                                _this = this;
                            return util.jsonp(_STEAM_URL, {
                                app_id: this._APP_ID,
                                player_type: "h5",
                                alias: alias,
                                token: token
                            }, function(d) {
                                d.error_code == 0 ? (_this._dLog("流地址请求成功", d.url_list[0].url), p.setAttribute("src", d.url_list[0].url), p.play()) : _this._error(2002, "获取播放地址失败server_error_code" + d.error_code)
                            }), this
                        },
                        stopLive: function() {
                            return this._player.pause(), this
                        },
                        changeVideoSize: function(width, height) {
                            var p = this._player;
                            return p && (p.setAttribute("width", width), p.setAttribute("height", height), this._playerOption.width = width, this._playerOption.height = height), this
                        }
                    });
                liveIO.createHtml5Player = function(appId, replaceId, option) {
                    return (new Html5Player(appId, replaceId, option || {})).init()
                }
            }(liveIO, liveIO.util),
            function(liveIO, util) {
                function AttachIE11Event(obj, _strEventId, _functionCallback) {
                    var paramsFromToStringRegex = /\(\)|\([^\)]+\)/,
                        params = _functionCallback.toString().match(paramsFromToStringRegex)[0],
                        functionName = "window." + PLUGIN_INTERFACE_NAME + "." + _strEventId,
                        handler;
                    try {
                        handler = document.createElement("script"), handler.setAttribute("for", obj.id)
                    } catch (ex) {
                        handler = document.createElement('<script for="' + obj.id + '">')
                    }
                    handler.event = _strEventId + params, handler.appendChild(document.createTextNode(functionName + params + ";")), document.body.appendChild(handler)
                }
                var Plugin = util.Listener.extend({
                    _constructor: function(appId, replaceId, option) {
                        return Plugin._super._constructor.call(this), this._ERROR_FORMAT = "[LIVE.IO.PLUGIN]ERROR:[%s]", this._DLOG_FORMAT = "[LIVE.IO.PLUGIN]LOG:%s", this._APP_ID = appId, this._replaceId = replaceId, this._pluginOption = {
                            width: option.width || 100,
                            height: option.height || 100
                        }, this._plugin = null, this._onLive = !1, this
                    },
                    init: function() {
                        return this._plugin = this._createPluginObject(), this._initPluginInterface(), this
                    },
                    _createPluginObject: function() {
                        var elem = document.getElementById(this._replaceId),
                            className = elem.className,
                            w = this._pluginOption.width,
                            h = this._pluginOption.height,
                            plugin;
                        if (util.browser.OLD_IE) {
                            elem.outerHTML = '<object id="' + this._replaceId + '" width="' + w + '" height="' + h + '"></object>', plugin = document.getElementById(this._replaceId);
                            var ieGoDie = plugin.clientHeight;
                            plugin.setAttribute("classid", PLUGIN_CLASS_ID)
                        } else util.browser.NEW_IE ? (plugin = document.createElement("object"), plugin.setAttribute("classid", PLUGIN_CLASS_ID)) : (plugin = document.createElement("embed"), plugin.setAttribute("type", PLUGIN_MIME_TYPE)), plugin.setAttribute("id", this._replaceId), plugin.setAttribute("width", w), plugin.setAttribute("height", h), elem.parentNode.replaceChild(plugin, elem);
                        return plugin.className = className, plugin
                    },
                    _initPluginInterface: function() {
                        var _this = this,
                            plugin = this._plugin,
                            interFace = {
                                ReceiveDevices: function(videoData, audioData) {
                                    util.type(videoData) === "string" && (videoData = util.parseJSON(videoData)), util.type(audioData) === "string" && (audioData = util.parseJSON(audioData)), _this._dLog("获取设备列表成功"), _this._dLog("视频列表：", videoData), _this._dLog("音频列表：", audioData), _this.emit("launchSuccess", videoData, audioData)
                                },
                                OnSetDeviceResult: function(code, desc, res) {
                                    code == 0 ? _this._error(5002, desc) : (res = _this._ParamToJSON(res), res.volume = parseFloat(res.volume) + "", _this._dLog("设置设备成功"), _this._dLog("码率" + res.biterate), _this._dLog("设备音量" + res.volume), _this._dLog("分辨率" + res.resolution), _this.emit("setDevices", res))
                                },
                                ReceiveVolume: function(value) {
                                    _this._dLog("设置设备音量成功" + value), _this.emit("setVolume", value)
                                },
                                UploadSuccessDone: function() {
                                    _this._onLive ? (_this.emit("reConnect"), _this._dLog("重新与流媒体建立连接")) : (_this.emit("startLive"), _this._dLog("上传启动成功"), _this._onLive = !0), _this.emit("startUpload"), _this._dLog("开始上传")
                                },
                                NotifyError: function(code, desc) {
                                    code == 0 && (_this._onLive = !1), _this._error(code, desc)
                                },
                                PromptHint: function(text) {
                                    _this.emit("promptHint", text)
                                },
                                ReportStatus: function(clientInfo, dataInfo) {
                                    _this.emit("reportStatus", clientInfo, dataInfo)
                                },
                                StopDone: function() {
                                    _this._onLive = !1, _this.emit("stopLive"), _this._dLog("采集上传已关闭")
                                }
                            };
                        util.browser.IE ? util.browser.NEW_IE ? (window[PLUGIN_INTERFACE_NAME] = interFace, util.each(interFace, function(name, fun) {
                            AttachIE11Event(plugin, name, fun)
                        })) : util.each(interFace, function(name, fun) {
                            plugin.attachEvent ? plugin.attachEvent(name, fun) : plugin.addEventListener(name, fun, !1)
                        }) : window[PLUGIN_INTERFACE_NAME] = interFace
                    },
                    _ParamToJSON: function(urlParam) {
                        var res = {};
                        return urlParam ? (urlParam = urlParam.split("&"), util.each(urlParam, function() {
                            var arr = this.split("=");
                            res[arr[0]] = arr[1]
                        }), res) : null
                    },
                    getVersion: function() {
                        try {
                            return this._plugin.GetVersion()
                        } catch (e) {
                            return null
                        }
                    },
                    launch: function(config) {
                        var error = 0,
                            max = 2,
                            co = {
                                auto_sorted: !!config.videoSorted
                            };
                        co = util.stringifyJSON(co);
                        while (error <= max) try {
                            this._plugin.Launch(this._APP_ID, "0", co);
                            break
                        } catch (e) {
                            error == max && this._error(5e3, "没有安装插件或者插件初始化失败"), error += 1
                        }
                        return this
                    },
                    setDevices: function(videoId, audioId, ext) {
                        return ext ? ext.effective = !!ext.effective : ext = {
                            effective: !1
                        }, ext.equalizer = ext.equalizer || 1, ext.rate = ext.rate || 1, ext.logo = !!ext.logo, ext.gain = ext.gain || 1, ext.resolution = ext.resolution || 1, ext.protocol == undefined && (ext.protocol = PLUGIN_PROTOCOL.DEFAULT), ext = util.stringifyJSON(ext), this._dLog("设置音视频设备,视频ID[" + videoId + "],音频ID[" + audioId + "]"), this._plugin.SetDevice(parseInt(videoId), parseInt(audioId), ext), this
                    },
                    setVolume: function(volume) {
                        return this._dLog("设置设备音量[" + volume + "]"), this._plugin.SetVolume(volume), this
                    },
                    startLive: function(streamId, uploadToken) {
                        this._dLog("启动上传");
                        var param = util.stringifyJSON({
                            stream_id: streamId,
                            up_token: uploadToken,
                            app_id: this._APP_ID
                        });
                        return this._plugin.StartLive(param), this
                    },
                    startPreview: function() {
                        return this._plugin.StartPreview(1), this._dLog("打开预览"), this
                    },
                    stopPreview: function() {
                        return this._plugin.StartPreview(0), this._dLog("关闭预览"), this
                    },
                    startLiveByAlias: function(alias, uploadToken) {
                        this._dLog("启动上传");
                        var param = util.stringifyJSON({
                            alias: alias,
                            up_token: uploadToken,
                            app_id: this._APP_ID
                        });
                        return this._plugin.StartLiveByAlias(param), this
                    },
                    stopLive: function() {
                        return this._plugin.StopLive(), this
                    },
                    setGain: function(value) {
                        return this._plugin.SetGain(value), this
                    },
                    setEqualizerMode: function(value) {
                        return this._plugin.SetEqualizerMode(value), this
                    }
                });
                liveIO.createPlugin = function(appId, replaceId, option) {
                    return (new Plugin(appId, replaceId, option || {})).init()
                }
            }(liveIO, liveIO.util), module.exports = liveIO
    })(window, undefined)
}), define("VIEWS_ABOUT", ["JQ", "UTIL", "STATUS", "SCROLL", "WIDGETS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Status = require("STATUS"),
        Scroll = require("SCROLL"),
        Widgets = require("WIDGETS"),
        about = function(options) {
            var setting = $.extend({}, {
                container: null,
                isEdit: !1,
                data: null,
                anchorWeekStarGiftMedal: [],
                anchorMedal: [],
                attionTitle: "关注数：",
                radius: 78,
                is_simple: !1
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    about.prototype = {
        init: function() {
            this.panel = $('<div class="MR-about"></div>'), this.proSum = 360, this.is_simple ? this.createSimpleDom() : this.createDom()
        },
        getGender: function(gender) {
            var html = '<i class="ICON-gender ';
            return gender == 0 ? html += "ICON-gender-0" : html += "ICON-gender-1", html += '"></i>', html
        },
        setAnchorMedal: function() {
            var _this = this,
                boards = $('<div class="boards"></div>'),
                scrolls = $('<div class="scrolls"></div>'),
                cons = $('<div class="cons" style="width:1000px;"></div>'),
                medals = $('<div class="medals"></div>'),
                medalsPromises = this.getAnchorMedal();
            cons.append(medals), boards.append(cons), this.medalCon.append(boards), this.medalCon.append(scrolls), medalsPromises && $.when.apply($, medalsPromises).always(function() {
                $.each([].slice.call(arguments), function() {
                    medals.append(this)
                });
                var _width = medals.width();
                cons.css({
                    width: _width
                });
                if (_this.anchorMedal && _this.anchorMedal.length <= 1) return !1;
                var scroller = Scroll.scroll({
                    Ele_panel: cons[0],
                    Ele_scroll: scrolls[0],
                    rollerX: !0,
                    rollerY: !1
                });
                scroller.init()
            })
        },
        getAnchorMedal: function() {
            var medals = this.anchorMedal,
                promise = [];
            return $.each(medals, function(e) {
                var obj = window.DDS.medal[medals[e]];
                if (obj) {
                    var m = $('<span class="ICON-medal" title="' + obj.name + '"></span>'),
                        img = new Image,
                        defer = $.Deferred();
                    promise.push(defer.promise()), $(img).on("load", function() {
                        defer.resolve(m)
                    }), $(img).on("error", function() {
                        defer.resolve(m)
                    }), img.setAttribute("src", obj.medalUrl), m.append(img)
                }
            }), promise
        },
        editSign: function() {
            var _this = this,
                edit_toggle = $('<span class="sign-toggle">[编辑]</span>');
            this.signs_con.append(edit_toggle);
            var panel = $('<div class="sign-editor" style="display:none;"></div>'),
                maxNum = 25,
                textarea = $("<textarea></textarea>"),
                btn_save = $('<span class="save">保存</span>'),
                btn_cancel = $('<span class="cancel">取消</span>'),
                font_count = $('<cite class="count" style="display:none;">' + maxNum + "</cite>");
            panel.append(textarea).append(btn_save).append(btn_cancel).append(font_count), this.signs_con.append(panel), edit_toggle.on("click", function() {
                panel.show(), textarea.val(_this.signs.html())
            });
            var txt = Widgets.Text({
                textarea: textarea,
                tips: "最多可输入" + maxNum + "个字",
                Ele_max_font: font_count,
                maxFontNum: maxNum,
                rightTips: "",
                wrongTips: "",
                repairTips: ""
            });
            txt.init(), btn_save.on("click", function() {
                var _is = txt.verify() !== null ? !0 : !1;
                if (_is) return Status.errorBubble(txt.verify(), textarea), !1;
                var value = textarea.val();
                Util.post("/room/notify/save", {
                    content: value,
                    roomId: window.DDS.baseInfo.roomId
                }, function(data) {
                    panel.hide()
                }, function() {}, function(data) {
                    Status.ajaxError(data, textarea)
                })
            }), btn_cancel.on("click", function() {
                panel.hide()
            })
        },
        createDom: function() {
            this.container.append(this.panel);
            var dl = $('<dl class="clearfix"></dl>');
            this.panel.append(dl), this.dt = $("<dt></dt>"), dl.append(this.dt), this.photoer = $('<div class="photoer"></div>'), this.img = $('<img class="anchor-head" src="' + this.data.anchorFaceUrl + '" alt="' + this.data.anchorName + '" data-id="' + this.data.anchorId + '"/>'), this.photoer.append(this.img), this.photoer.append(this.getGender(this.data.gender)), this.dt.append(this.photoer), this.medalCon = $('<div class="medal-con"></div>'), this.dt.append(this.medalCon), this.setAnchorMedal(), this.dd = $("<dd></dd>"), dl.append(this.dd), this.name = $('<span class="name">' + this.data.anchorName + "</span>"), this.dd.append(this.name), this.level = $('<span class="level"><span class="ICON-anchor-level ICON-al-' + this.data.anchorLevel + '"></span></span>'), this.name.append(this.level), this.gradeProgress = $('<div class="dou-prog"></div>'), this.dd.append(this.gradeProgress), this.starCon = $('<div class="star-con clearfix"></div>'), this.fansNum = $('<p class="fans-num" title="粉丝数">' + this.data.anchorFansNum + "</p>"), this.starCon.append(this.fansNum), this.star = $('<p class="star" title="星星数">' + this.data.anchorStarNum + "</p>"), this.starDialog = $('<div class="stardialog"><p>星星可以兑换频道装饰, 要想了解更多详细,请点击<a href="/my/convertStar" style="color:#0085CE" target="_blank">兑换</a></p></div>'), this.star.append(this.starDialog), this.starCon.append(this.star), this.dd.append(this.starCon), this.btns = $('<div class="btns clearfix"></div>'), this.dd.append(this.btns), this.attention = $('<p class="M-attention"></p>'), this.btns.append(this.attention), this.siliao = $('<span class="M-siliao" id="DDS_siliao_enter" data-id="' + this.data.anchorId + '" data-name="' + this.data.anchorName + '" data-faceUrl="' + this.data.anchorFaceUrl + '">私聊</span>'), this.btns.append(this.siliao), this.signs_con = $('<div class="signs-con"></div>'), this.signs = $('<div class="signs">' + this.data.anchorSign + "</div>"), this.signs_con.append(this.signs), this.panel.append(this.signs_con), this.tenStarEffect = $('<div class="effect-box"></div>'), this.panel.append(this.tenStarEffect), this.isEdit && this.editSign()
        },
        createSimpleDom: function() {
            var dl = $('<dl class="clearfix"></dl>');
            this.panel.append(dl), this.dt = $("<dt></dt>"), dl.append(this.dt), this.photoer = $('<div class="photoer"><img src="' + this.data.anchorFaceUrl + '" alt="' + this.data.anchorName + '"/></div>'), this.dt.append(this.photoer), this.attention = $('<p class="M-attention"></p>'), this.dt.append(this.attention), this.dd = $("<dd></dd>"), dl.append(this.dd), this.name = $('<span class="name">' + this.data.anchorName + "</span>"), this.dd.append(this.name), this.star = $('<p class="star">' + this.data.anchorStarNum + "</p>"), this.dd.append(this.star), this.fansCon = $('<p class="fans-num">' + this.attionTitle + "</p>"), this.dd.append(this.fansCon), this.fansNum = $("<cite>" + this.data.anchorFansNum + "</cite>"), this.fansCon.append(this.fansNum), this.container.append(this.panel)
        },
        updateSign: function(msg) {
            this.is_simple || this.signs.html(msg)
        },
        updateFansTitle: function(level) {
            return
        },
        updateStarNum: function(num) {
            this.star.html(num)
        },
        updateFansNum: function(num) {
            this.fansNum.html(num)
        },
        updateLevel: function(level) {
            this.level.html('<span class="ICON-anchor-level ICON-al-' + level + '"></span>')
        },
        smallAbout: function() {
            this.panel.addClass("MR-about-small")
        },
        bigAbout: function() {
            this.panel.removeClass("MR-about-small")
        },
        showStarTip: function() {
            var _this = this,
                time = 0;
            _this.starDialog.show(), this.intervalId = setInterval(function() {
                _this.starDialog.fadeOut(1e3).fadeIn(1e3), time++, time >= 3 && (clearInterval(_this.intervalId), setTimeout(function() {
                    _this.starDialog.hide()
                }, 1e4))
            }, 2e3)
        }
    }, module.exports = about
}), define("CONTROLS_BIGGIFT", ["JQ", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        _default = {
            container: null,
            delay: 8e3,
            times: 6e4,
            isValid: !0
        },
        GiftBig = function(options) {
            var setting = $.extend({}, _default, options);
            for (var name in setting) this[name] = setting[name]
        };
    GiftBig.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.broadcastGift_Arr = [], this.broadcastGift_Temp = [], this.BCGIFT_TOGGLE = !0, this.END_TOGGLE = !1, this.BC_TIMER = null, this.panel = $('<div class="MR-big-gift"></div>'), this.container.append(this.panel)
        },
        broadcastGift: function(args, type) {
            args.type = type ? type : "gift";
            if (!this.isValid) return !1;
            this.broadcastGift_Arr.push(args), this.BCGIFT_TOGGLE && this.createBcGift()
        },
        createBcGift: function() {
            var len = this.broadcastGift_Arr.length;
            if (len == 0) return;
            len == 1 ? this.END_TOGGLE = !0 : this.END_TOGGLE = !1, this.BCGIFT_TOGGLE = !1;
            var args = this.broadcastGift_Arr[0];
            this.broadcastGift_Arr.shift(), this.BcGiftFx(args);
            var _this = this;
            setTimeout(function() {
                clearTimeout(_this.BC_TIMER), _this.END_TOGGLE && (_this.BC_TIMER = setTimeout(function() {
                    for (var i = 0; i < _this.broadcastGift_Temp.length; i++) _this.broadcastGift_Temp[i][0] && _this.broadcastGift_Temp[i].remove();
                    _this.broadcastGift_Temp = []
                }, _this.times)), _this.BCGIFT_TOGGLE = !0, _this.createBcGift()
            }, _this.delay)
        },
        BcGiftFx: function(args) {
            var _this = this,
                _temp = $('<div class="high-boxer"></div>');
            _temp.html(this.getBoardConnet(args)), this.panel.append(_temp), _temp.css({
                "margin-left": -_temp.width() / 2
            }), this.broadcastGift_Temp.push(_temp);
            var len = this.broadcastGift_Temp.length;
            len > 1 ? this.broadcastGift_Temp[0].animate({
                top: -34
            }, "300", "swing", function() {
                $(this).remove(), _this.broadcastGift_Temp.shift(), _this.broadcastGift_Temp[0].animate({
                    top: 0
                }, "300", "swing")
            }) : this.broadcastGift_Temp[0].animate({
                top: 0
            }, "300", "swing")
        },
        getBoardConnet: function(args) {
            var _html = "";
            if (args.eventInfo) return args.eventInfo;
            if (args.type == "gift") {
                var giftInfo = window.DDS.gift && window.DDS.gift[args.g] ? window.DDS.gift[args.g] : {};
                if (!giftInfo.name) return _html;
                var _classes = "name",
                    _q = args.q && args.q > 1 ? "x" + args.q : "";
                _html = '<a href="/room/' + args.rm + '" target="_blank">', _html += '<cite class="photoer"><img src="' + args.f + '"/></cite>', args.rc >= 2e4 ? (_html += '<cite class="desc"><span class="user" title="' + args.n + '">' + Util.cutZhFont(args.n, 14) + '</span>在<span class="' + _classes + '"  title="' + args.tn + '">' + Util.cutZhFont(args.tn, 14) + "</span>频道爆出 " + giftInfo.name + "</cite>", _html += '<span class="gift-pic"><img src="' + giftInfo.bigicon + '"/></span>', _html += '<cite class="desc">' + args.r + "倍奖励</cite>") : (_html += '<cite class="desc"><span class="user" title="' + args.n + '">' + args.n + '</span> 送给<span class="' + _classes + '" title="' + args.tn + '">' + args.tn + "</span>" + giftInfo.name + "</cite>", _html += '<span class="gift-pic"><img src="' + giftInfo.bigicon + '"/></span><cite class="desc">' + _q + "</cite>"), _html += "</a>"
            } else args.type == "giftLink" ? _html = this.getGiftLinkContent(args) : _html = this.getHornConnet(args);
            return _html
        },
        getHornConnet: function(args) {
            return '<div class="horn-speak"><span class="name">' + args.n + '</span>：<span class="say">' + Util.formatHTML(args.m) + '</span><a href="/room/' + args.ar + '" target="_blank">[' + args.an + "的直播频道]</a>" + "</div>"
        },
        getGiftLinkContent: function(args) {
            var _html = "",
                giftInfo = window.DDS.gift && window.DDS.gift[args.g] ? window.DDS.gift[args.g] : {};
            return giftInfo.name ? (_html = '<a href="/room/' + args.rm + '" target="_blank">', _html += '<cite class="photoer"><img src="' + args.f + '"/></cite>', _html += '<cite class="desc" style="margin-right:0;"><span class="name" title="' + args.an + '">' + args.an + "</span>", _html += "齐心协力完成" + args.q + "个", _html += "</cite>", _html += '<span class="gift-pic"><img src="' + giftInfo.bigicon + '"/></span>', _html += '<cite class="desc">接龙' + args.lc + "次</cite>", _html += "</a>", _html) : _html
        }
    }, module.exports = GiftBig
}), define("EVENTS", [], function(require, exports, module) {
    var eventSplitter = /\s+/;

    function Events() {}
    Events.prototype.on = function(events, callback, context) {
        var cache, event, list;
        if (!callback) return this;
        cache = this.__events || (this.__events = {}), events = events.split(eventSplitter);
        while (event = events.shift()) list = cache[event] || (cache[event] = []), list.push(callback, context);
        return this
    }, Events.prototype.once = function(events, callback, context) {
        var that = this,
            cb = function() {
                that.off(events, cb), callback.apply(context || that, arguments)
            };
        return this.on(events, cb, context)
    }, Events.prototype.off = function(events, callback, context) {
        var cache, event, list, i;
        if (!(cache = this.__events)) return this;
        if (!(events || callback || context)) return delete this.__events, this;
        events = events ? events.split(eventSplitter) : keys(cache);
        while (event = events.shift()) {
            list = cache[event];
            if (!list) continue;
            if (!callback && !context) {
                delete cache[event];
                continue
            }
            for (i = list.length - 2; i >= 0; i -= 2) callback && list[i] !== callback || context && list[i + 1] !== context || list.splice(i, 2)
        }
        return this
    }, Events.prototype.trigger = function(events) {
        var cache, event, all, list, i, len, rest = [],
            args, returned = !0;
        if (!(cache = this.__events)) return this;
        events = events.split(eventSplitter);
        for (i = 1, len = arguments.length; i < len; i++) rest[i - 1] = arguments[i];
        while (event = events.shift()) {
            if (all = cache.all) all = all.slice();
            if (list = cache[event]) list = list.slice();
            event !== "all" && (returned = triggerEvents(list, rest, this) && returned), returned = triggerEvents(all, [event].concat(rest), this) && returned
        }
        return returned
    }, Events.prototype.emit = Events.prototype.trigger;
    var keys = Object.keys;
    keys || (keys = function(o) {
        var result = [];
        for (var name in o) o.hasOwnProperty(name) && result.push(name);
        return result
    }), Events.mixTo = function(receiver) {
        var proto = Events.prototype;
        if (isFunction(receiver)) {
            for (var key in proto) proto.hasOwnProperty(key) && (receiver.prototype[key] = proto[key]);
            Object.keys(proto).forEach(function(key) {
                receiver.prototype[key] = proto[key]
            })
        } else {
            var event = new Events;
            for (var key in proto) proto.hasOwnProperty(key) && copyProto(key)
        }

        function copyProto(key) {
            receiver[key] = function() {
                return proto[key].apply(event, Array.prototype.slice.call(arguments)), this
            }
        }
    };

    function triggerEvents(list, args, context) {
        var pass = !0;
        if (list) {
            var i = 0,
                l = list.length,
                a1 = args[0],
                a2 = args[1],
                a3 = args[2];
            switch (args.length) {
                case 0:
                    for (; i < l; i += 2) pass = list[i].call(list[i + 1] || context) !== !1 && pass;
                    break;
                case 1:
                    for (; i < l; i += 2) pass = list[i].call(list[i + 1] || context, a1) !== !1 && pass;
                    break;
                case 2:
                    for (; i < l; i += 2) pass = list[i].call(list[i + 1] || context, a1, a2) !== !1 && pass;
                    break;
                case 3:
                    for (; i < l; i += 2) pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== !1 && pass;
                    break;
                default:
                    for (; i < l; i += 2) pass = list[i].apply(list[i + 1] || context, args) !== !1 && pass
            }
        }
        return pass
    }

    function isFunction(func) {
        return Object.prototype.toString.call(func) === "[object Function]"
    }
    Object.keys || (Object.keys = function() {
        "use strict";
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            dontEnumsLength = dontEnums.length;
        return function(obj) {
            if (typeof obj == "object" || typeof obj == "function" && obj !== null) {
                var result = [],
                    prop, i;
                for (prop in obj) hasOwnProperty.call(obj, prop) && result.push(prop);
                if (hasDontEnumBug)
                    for (i = 0; i < dontEnumsLength; i++) hasOwnProperty.call(obj, dontEnums[i]) && result.push(dontEnums[i]);
                return result
            }
            throw new TypeError("Object.keys called on non-object")
        }
    }()), module.exports = Events
}), define("EVENTBUS", ["EVENTS"], function(require, exports, module) {
    var Events = require("EVENTS"),
        instance = new Events,
        eventCache = {};
    exports.getInstance = function() {
        return instance == null && (instance = new Events), instance
    }, exports.factory = function(type) {
        return eventCache[type] || (eventCache[type] = new Events), eventCache[type]
    }
}), define("EVENTTYPE", [], function(require, exports, module) {
    var EventType = {
        moregift: {
            changeConfig: "change_config"
        },
        sofa: {
            sofaswitch: "sofa_switch",
            sofaloaded: "sofa_loaded"
        },
        packages: {
            sendgift: "send_gift"
        }
    };
    module.exports = EventType
}), define("VIEWS_GIFT", ["JQ", "UTIL", "WIDGETS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        gift = function(options) {
            var setting = $.extend({}, {
                container: null,
                data: null,
                selectedGift: null,
                hasFree: !0,
                hasApp: !0,
                isGiftValid: !0,
                widgetShowNum: 10,
                isBottom: !0,
                isSofaShow: !0,
                isLock: !0
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    gift.prototype = {
        init: function() {
            var _this = this;
            this.createDom(), this.apppendGift(), this.setVar(), this.addEvent()
        },
        createDom: function() {
            this.panel = $('<div class="MR-gift"></div>'), this.giftPanel = $('<div class="gift-panel"></div>'), this.giftTab = $('<ul class="gift-tab"></ul>'), this.giftCon = $('<div class="gift-con"></div>'), this.giftGroup = $('<div class="gift-group"></div>'), this.giftFooter = $('<div class="gift-footer clearfix"></div>'), this.giftCon.append(this.giftGroup), this.giftCon.append(this.giftFooter), this.giftPanel.append(this.giftTab), this.giftPanel.append(this.giftCon), this.isSofaShow && (this.sofaSwitchBtn = $('<div class="sofa-switch-btn"><span class="name">沙发</span> <span class="icon"></span></div>'), this.panel.append(this.sofaSwitchBtn)), this.panel.append(this.giftPanel), this.container.append(this.panel)
        },
        setVar: function() {
            this.gifts = this.panel.find(".gift"), this.tabs = this.panel.find(".gift-tab li"), this.cons = this.panel.find(".gift-wrap")
        },
        _getGiftNormalData: function() {
            return this.giftdata ? this.giftdata : this.data.config.giftNormal
        },
        apppendGift: function() {
            var data = this._getGiftNormalData(),
                len = data.length;
            for (var i = 0; i < len; i++) {
                var li = $('<li data-index="' + i + '">' + data[i].type + "</li>");
                i == 0 && li.addClass("on"), this.giftTab.append(li), data[i].hasNew && li.append('<i class="dot-new"></i>');
                var panel = $('<div class="gift-wrap"></div>');
                i != 0 && panel.css("display", "none"), this.giftGroup.append(panel), this.createScroll(panel, data[i].data)
            }
            len <= 1 && this.giftTab.hide(), this.hasFree && this.createFree(this.giftFooter), this.hasApp && this.createApp(this.giftFooter), this.createMoreGift(this.giftFooter)
        },
        createFree: function(panel) {
            this.Ele_free = $('<div class="MR-free-gift"></div>'), panel.append(this.Ele_free)
        },
        createApp: function(panel) {
            this.Ele_app = $('<div class="MR-app"></div>'), panel.append(this.Ele_app)
        },
        createMoreGift: function(panel) {
            this.Ele_moregift = $('<div class="MR-moregift"></div>'), panel.append(this.Ele_moregift)
        },
        createScroll: function(panel, arr) {
            var _str = '<ul class="clearfix">',
                ln = arr.length;
            this.isGiftValid || (_str = '<ul class="no-valid clearfix">');
            for (var j = 0; j < ln; j++) {
                var name = arr[j].id,
                    data = this.getGiftData(name),
                    locked = this.isLock ? arr[j].lock ? 1 : 0 : 0,
                    classes = this.isLock ? arr[j].lock ? "locked" : "" : "";
                _str += '<li class="gift ' + classes + '" data-locked="' + locked + '" data-title="' + data.name + '" data-name="' + data.name + '" data-id="' + data.id + '" data-price="' + data.value + '">', _str += '<div class="gift-pic"><img src="' + data.bigicon + '" />', data.isLucky && (_str += '<i class="luck-mark"></i>'), data.isJinku && (_str += '<i class="luck-mark gold-mark"></i>'), data.isTop && (_str += '<i class="is-top"></i>'), data.isTimeLimit && (_str += '<i class="is-time-limit"></i>'), data.isEvent && (_str += '<i class="is-event"></i>'), locked && (_str += '<div class="gift-lock-locked" ></div>'), _str += "</div>", _str += "</li>"
            }
            var val = 0;
            if (ln < this.widgetShowNum) {
                val = this.widgetShowNum - ln;
                for (j = 0; j < val; j++) _str += '<li class="gift-null"></li>'
            }
            _str += "</ul>", Widgets.arrowScroll({
                container: panel,
                content: _str,
                width: 54 * this.widgetShowNum,
                content_width: 54 * (ln + val)
            }).init()
        },
        getGiftData: function(id) {
            return this.data.gift[id]
        },
        addEvent: function() {
            var _this = this;
            this.tab_timer = null, this.giftTab.on("click", "li", function() {
                clearTimeout(_this.tab_timer);
                var _objs = $(this),
                    _index = _objs.attr("data-index");
                _this.toTab(_objs, _index), _this.removeTipDot(_objs)
            }), _this.tiptime = null, this.gifts.hover(function() {
                var $this = $(this);
                _this.showTip($this), _this.tiptime && clearTimeout(_this.tiptime)
            }, function() {
                _this.tiptime = setTimeout(function() {
                    _this.giftTip && _this.giftTip.hide()
                }, 50)
            }), _this.giftGroup.on("mouseover", ".MR-gift-tip", function() {
                _this.tiptime && clearTimeout(_this.tiptime)
            }), _this.giftGroup.on("mouseleave", ".MR-gift-tip", function() {
                _this.giftTip && _this.giftTip.hide()
            })
        },
        selectGiftHandle: function(callback) {
            var _this = this;
            this.gifts.on("click", function() {
                var ele = $(this);
                if (ele.hasClass("locked")) return;
                _this.panel.find(".gift").removeClass("selected"), ele.addClass("selected"), _this.selectedGift = ele, callback(ele)
            })
        },
        toTab: function(objs, i) {
            if (objs.hasClass("on")) return;
            var tabs = this.panel.find(".gift-tab li"),
                cons = this.panel.find(".gift-wrap");
            tabs.removeClass("on"), objs.addClass("on"), cons.hide(), cons.eq(i).show()
        },
        showTip: function(ele) {
            var giftid = ele.attr("data-id"),
                giftconfig = this.data.gift[giftid],
                pos = ele.position();
            this.giftTip == null && (this.giftTip = $('<div class="MR-gift-tip"></div>'), this.giftGroup.append(this.giftTip));
            var html = ['<div class="tip-content">', '<img class="tip-img" src="' + (giftconfig.type == 2 ? giftconfig.gificon : giftconfig.bigicon) + '"/>', '<div class="gift-tip-con"><span class="gift-tip-name">' + giftconfig.name + "</span>", '<span class="gift-tip-price">' + this.formateMoney(giftconfig.value) + "星币</span></div>", giftconfig.desc ? '<div class="gift-tip-desc">' + giftconfig.desc + "</div>" : "", "</div>"].join("");
            this.giftTip.html(html), this.giftTip.attr("style", "");
            var tipWidth = this.giftTip.width();
            pos.left + tipWidth > this.giftGroup.width() ? this.giftTip.css({
                right: "" + (this.giftGroup.width() - pos.left - 53) + "px"
            }) : this.giftTip.css({
                left: "" + pos.left + "px"
            }), this.giftTip.show()
        },
        formateMoney: function(val) {
            return val = "" + val, val.length > 4 ? (val /= 1e4, val + "万") : val
        },
        removeTipDot: function(obj) {
            var ele = obj.find(".dot-tip");
            ele[0] && ele.css("display") != "none" && (ele.hide(), $.ajax({
                type: "GET",
                url: "/pack/rmNewMark",
                cache: !1,
                dataType: "json",
                success: function(d) {}
            }))
        },
        judgeSofaShow: function(callback) {
            var _this = this;
            this.sofaSwitchBtn && this.sofaSwitchBtn.on("click", function() {
                var $this = $(this),
                    isOpen = !0;
                $this.hasClass("close") ? isOpen = !0 : isOpen = !1, _this.triggerSofaShow(isOpen, callback), _this.followBottom()
            });
            var val = $(window).height(),
                ldiff = val - 730;
            this.isOpen = !1, this.isSofaShow && (val <= 730 ? this.triggerSofaShow(!1, callback) : this.triggerSofaShow(!0, callback)), this.followBottom(), $(window).on("resize", function() {
                var nval = $(window).height();
                if (val == nval) return;
                val = nval;
                if (_this.isSofaShow) {
                    var ndiff = val - 730;
                    ndiff * ldiff < 0 && (ndiff < 0 ? _this.triggerSofaShow(!1, callback) : _this.triggerSofaShow(!0, callback)), ndiff * ldiff == 0 && (ndiff == 0 && _this.triggerSofaShow(!1, callback), ldiff == 0 && (ndiff > 0 && _this.triggerSofaShow(!0, callback), ndiff < 0 && _this.triggerSofaShow(!1, callback))), ldiff = ndiff
                }
                _this.followBottom()
            })
        },
        triggerSofaShow: function(isOpen, callback) {
            this.isOpen = isOpen;
            var winHeight = $(window).height();
            isOpen ? this.sofaSwitchBtn.hasClass("close") && this.sofaSwitchBtn.removeClass("close") : this.sofaSwitchBtn.hasClass("close") || this.sofaSwitchBtn.addClass("close"), callback(isOpen)
        },
        followBottom: function() {
            if (!this.isBottom) return;
            var winHeight = $(window).height(),
                topVal = 737 - this.panel.height();
            this.isOpen || (winHeight <= 737 && winHeight >= 660 && (topVal = winHeight - this.panel.height()), winHeight < 660 && (topVal = 660 - this.panel.height())), this.panel.css({
                top: "" + topVal + "px"
            })
        },
        giftTrack: function(ele, data) {
            var charm = $(".MR-gift-count .ICON-gift");
            if (charm[0]) {
                var _top = ele.offset().top,
                    _left = ele.offset().left,
                    _temp = $('<div class="MR-gift-track"><img src="' + this.getGiftData(data.giftId).smallicon + '" /></div>');
                _temp.css({
                    top: _top,
                    left: _left,
                    opacity: 1
                }), $(document.body).append(_temp), _temp.animate({
                    top: charm.offset().top,
                    left: charm.offset().left,
                    opacity: .6
                }, 800, "swing", function() {
                    _temp.remove()
                })
            }
        }
    }, module.exports = gift
}), define("COMBOMSG", ["JQ"], function(require, exports, module) {
    var $ = require("JQ"),
        ComboMsg = function(options) {
            var setting = $.extend({}, {
                container: null,
                data: null,
                giftpool: [],
                giftnewpool: [],
                isrunning: !1,
                pos: ["0", "32", "64", "96"],
                sid: null
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    ComboMsg.prototype = {
        construtor: ComboMsg,
        init: function() {
            var _this = this;
            this.createDom()
        },
        createDom: function() {
            this.panel = $('<div id="MR-brand"></div>'), this.container.append(this.panel)
        },
        pushMsg: function(data) {
            this.giftnewpool.push(data), this.sid && clearTimeout(this.sid);
            if (this.isrunning) return;
            this.animate(this.giftnewpool.shift())
        },
        animate: function(data) {
            if (!data) return;
            this.isrunning = !0;
            var _this = this,
                ele = null,
                level = 0,
                isSingle = !0;
            level = data.cl, data.gsc == 1 ? (isSingle = !0, level = 0) : isSingle = !1;
            var content = ['<div class="brand level-' + level + '">', '<img class="user-head" src="' + data.uu + '"/>', '<div class="flash-effect"><div class="effect-img"></div></div>', '<div class="msg-content"><span class="user-name">' + data.un + '</span><div class="info">送<span class="num">' + data.gn + "</span>个</div></div>", isSingle ? "" : '<div class="gift-star"></div>', '<img class="gift-img" src="' + this.getGiftImg(data.gi) + '"/>', isSingle ? "" : '<div class="gift-num len-' + this.getNumLen(data.gsc) + '"><ul class="clearfix">' + this.getNumList(data.gsc) + "</ul></div>", "</div>"].join(""),
                brandUnit = $(content);
            this.panel.append(brandUnit), this.giftpool.push(brandUnit);
            switch (this.giftpool.length) {
                case 1:
                    ele = this.giftpool[0], _this.show(ele, 2);
                    break;
                case 2:
                    ele = this.giftpool[1], _this.show(ele, 3);
                    break;
                case 3:
                    for (var i = 0; i < 3; i++) ele = this.giftpool[i], i == 0 ? _this.hide(ele) : i == 1 ? ele.animate({
                        top: this.pos[1] + "px"
                    }, 1e3) : _this.show(ele, 3)
            }
        },
        getGiftImg: function(id) {
            return this.data.gift[id] ? this.data.gift[id].smallicon : "undefined"
        },
        getNumLen: function(num) {
            return ("" + num).length
        },
        getNumList: function(num) {
            var numArr = ("" + num).split(""),
                i = 0,
                len = numArr.length,
                content = "";
            for (; i < len; i++) content += '<li class="num-' + numArr.pop() + '"></li>';
            return content
        },
        show: function(ele, pos) {
            var _this = this,
                effect = ele.find(".effect-img"),
                giftstar = ele.find(".gift-star"),
                giftimg = ele.find(".gift-img");
            ele.css({
                top: this.pos[pos] + "px"
            }), ele.animate({
                top: this.pos[pos - 1] + "px",
                opacity: 1
            }, 1e3, function() {
                effect.animate({
                    right: "0"
                }, 300, function() {
                    giftimg.animate({
                        width: "30px",
                        height: "30px",
                        bottom: "0",
                        right: "0"
                    }, 300).animate({
                        width: "26px",
                        height: "26px",
                        bottom: "2px",
                        right: "2px"
                    }, 200), giftstar && giftstar.fadeIn(200)
                }).animate({
                    right: "-159px"
                }, 200, function() {
                    _this.finishRun()
                })
            })
        },
        hide: function(ele) {
            var _this = this;
            ele.animate({
                top: this.pos[0] + "px",
                opacity: 0
            }, 1e3, function() {
                _this.giftpool.shift(), $(this).remove()
            })
        },
        finishRun: function() {
            var _this = this;
            this.isrunning = !1;
            if (this.giftnewpool.length > 0) {
                var data = this.giftnewpool.shift();
                this.animate(data)
            } else this.sid = setTimeout(function() {
                _this.clearPool()
            }, 3e3)
        },
        clearPool: function() {
            this.giftpool = [], this.giftnewpool = [], this.panel.empty()
        }
    }, module.exports = ComboMsg
}), define("CONTROLS_BERTH", ["JQ", "UTIL", "WIDGETS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        _default = {
            container: null,
            isBuy: !1,
            data: null,
            units: 70,
            maxNum: 4,
            maxWidthNum: 32
        },
        Berth = function(options) {
            var setting = $.extend({}, _default, options);
            for (var name in setting) this[name] = setting[name];
            this.userList = []
        };
    Berth.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.dom(), this.createScroller(), this.addEvent()
        },
        dom: function() {
            this.panel = $('<div class="MR-berth"></div>'), this.berthWrap = $('<div class="berth-wrap"></div>'), this.berthCon = $('<div class="berth-con"></div>'), this.h4 = $("<h4></h4>"), this.toggle = $('<div class="berth-toggle"></div>'), this.tolink = $('<div class="berth-link"></div>'), this.tolink.append('<span><a href="/mall/list/1" target="_blank">购买进场特效>></a></span>'), this.isBuy && this.tolink.append('<cite><a href="/my/pack" target="_blank">切换进场特效</a></cite>'), this.toggle_tip = $('<span class="count">' + this.setTips(0) + "</span>"), this.h4.append(this.toggle_tip), this.panel.append(this.berthWrap), this.panel.append(this.h4), this.panel.append(this.tolink), this.berthWrap.append(this.berthCon), this.h4.append(this.toggle), this.container.append(this.panel)
        },
        setTips: function(num) {
            return num + "名土豪正在围观"
        },
        createScroller: function() {
            this.scroller = $('<ul class="clearfix"></ul>'), this.berthCon.append(this.scroller), this.uper = $('<span class="uper uper-no"></span>'), this.downer = $('<span class="downer downer-no"></span>'), this.panel.append(this.uper), this.panel.append(this.downer), this.berthWrap.animate({
                scrollLeft: 0
            }, 500), this.pager = 1
        },
        addEvent: function() {
            var _this = this;
            this.uper.on("click", function() {
                if (_this.pager <= 1 || $(this).hasClass("uper-no")) return;
                _this.berthWrap.stop().animate({
                    scrollLeft: (_this.pager - 2) * _this.maxNum * _this.units
                }, 500, "swing", function() {
                    _this.pager -= 1, _this.downer.removeClass("downer-no"), _this.pager == 1 && _this.uper.addClass("uper-no")
                })
            }), this.downer.on("click", function() {
                var len = _this.userList.length,
                    sumPager = Math.ceil(len / _this.maxNum);
                if (_this.pager >= sumPager || $(this).hasClass("downer-no")) return;
                _this.berthWrap.stop().animate({
                    scrollLeft: _this.pager * _this.maxNum * _this.units
                }, 500, "swing", function() {
                    _this.pager += 1, _this.uper.removeClass("uper-no"), _this.pager == sumPager && _this.downer.addClass("downer-no")
                })
            }), this.h4.on("click", function() {
                $(this).hasClass("berth-toggle-on") ? _this.panel.animate({
                    left: -246
                }, "500", "swing", function() {
                    _this.h4.removeClass("berth-toggle-on")
                }) : _this.panel.animate({
                    left: 70
                }, "500", "swing", function() {
                    _this.h4.addClass("berth-toggle-on")
                })
            })
        },
        setPos: function(len) {
            if (len <= this.maxNum) this.uper.addClass("uper-no"), this.downer.addClass("downer-no"), this.berthWrap.scrollLeft(0), this.pager = 1;
            else {
                var sumPager = Math.ceil(len / this.maxNum);
                this.uper.removeClass("uper-no"), this.downer.removeClass("downer-no"), this.pager > sumPager && (this.pager = sumPager), this.pager == 1 && this.uper.addClass("uper-no"), this.pager == sumPager && this.downer.removeClass("downer-no")
            }
        },
        updateData: function(_arr) {
            typeof _arr == "string" && (_arr = []);
            var arr = [];
            for (var i = 0; i < _arr.length; i++) _arr[i].uid != this.data.anchorInfo.anchorId && arr.push(_arr[i]);
            Util.indexOf(arr, this.data.userInfo.userId, "uid") == -1 && this.data.userInfo.ei != 0 && arr.push({
                uid: this.data.userInfo.userId,
                nickname: this.data.userInfo.userName,
                txId: this.data.userInfo.ei,
                level: this.data.userInfo.userLevel
            }), this.userList = arr;
            var len = arr.length;
            this.updateNum(len);
            var _html = "";
            for (var i = 0; i < arr.length; i++) _html += this.OneUser(arr[i]);
            this.scroller.css({
                width: this.units * (len + len % 4)
            }), this.scroller.html(_html), this.setPos(len)
        },
        OneUser: function(data) {
            var _html = "",
                _enter = this.data.enterEffect[data.txId],
                _enter_name = _enter.name,
                is_Event = /(活动)/.test(_enter.name);
            return typeof _enter == "undefined" ? "" : (is_Event && (_enter_name = _enter_name.replace(/（(.*)）/img, "")), _html = '<li data-id="' + data.txId + '">' + '<div class="title">' + _enter_name + "</div>" + '<div class="pic"><img src="' + _enter.face + '"/></div>' + '<span class="ICON-noble-level ICON-nl-' + data.level + '"></span>' + '<div class="name" title="' + data.nickname + '">' + Util.cutZhFont(data.nickname, 6) + "</div>", data.ontype && data.ontype == 1 && (_html += '<span class="ICON-shadow" title="移动端影分身在线"></span>'), _html += function(flag) {
                var html = "";
                return flag && (html += '<cite class="event-tag">活动</cite>'), html
            }(is_Event) + "</li>", _html)
        },
        updateNum: function(len) {
            this.toggle_tip.html(this.setTips(len))
        }
    }, module.exports = Berth
}), define("CONTROLS_GIFT_LINK", ["JQ", "XM", "DIALOG", "CONTROLS_GIFT", "VIEWS_GIFT", "UTIL", "STATUS"], function(require, exports, module) {
    var $ = require("JQ"),
        X = require("XM"),
        D = require("DIALOG"),
        G_C = require("CONTROLS_GIFT"),
        G_V = require("VIEWS_GIFT"),
        U = require("UTIL"),
        Status = require("STATUS"),
        WIN_DDS = window.DDS,
        SEND_URL = "/gift/chain/send",
        OPEN_URL = "/gift/chain/open",
        ANCHOR_INFO = window.DDS.anchorInfo,
        BASE_INFO = window.DDS.baseInfo,
        GIFT_DIR = window.DDS.gift,
        BUBBLE_POS = {
            1: {
                left: 6,
                top: 0
            },
            2: {
                left: 44,
                top: 8
            },
            3: {
                left: 81,
                top: 13
            },
            4: {
                left: 118,
                top: 16
            },
            5: {
                left: 155,
                top: 19
            },
            6: {
                left: 192,
                top: 21
            },
            7: {
                left: 229,
                top: 21
            },
            8: {
                left: 266,
                top: 22
            },
            9: {
                left: 305,
                top: 21
            },
            10: {
                left: 342,
                top: 22
            },
            11: {
                left: 379,
                top: 20
            },
            12: {
                left: 416,
                top: 17
            },
            13: {
                left: 453,
                top: 14
            },
            14: {
                left: 490,
                top: 8
            },
            15: {
                left: 527,
                top: 0
            }
        },
        EMPTY_DATA = {
            start: !1,
            round: 1,
            lightIdx: 0,
            bubbleIdx: 1,
            bubblePercent: 0,
            curTotal: -1,
            countdown: 15e3,
            giftId: 0,
            giftNum: 0
        },
        LINK_GIFT = X.XM.extend({
            _constructor: function(option) {
                return this._container = option.container, this._giftView = null, this._Event_Name = "gift_link_", this._sendGiftCallback = option.sendGiftCallback || function() {}, this
            },
            init: function() {
                return this._initGift(), this
            },
            _initGift: function() {
                var _getGiftNormalData = function() {
                        var data = $.extend(!0, [], DDS.config.giftNormal),
                            res = [];
                        return $.each(data, function(e) {
                            this.type != "专属" && this.type != "特殊" && res.push(this)
                        }), res
                    },
                    giftdata = _getGiftNormalData(),
                    gift = new G_C({
                        moduleName: "giftLink",
                        views: G_V,
                        socket: this._socket,
                        container: this._container,
                        data: WIN_DDS,
                        giftdata: giftdata,
                        hasFree: !1,
                        isGiftValid: !0,
                        isLuckValid: !1,
                        isBottom: !1,
                        isSofaShow: !1,
                        isSocketSend: !1,
                        sendGiftCallback: this._sendGiftCallback,
                        evtBusName: this._Event_Name
                    });
                return gift.init(), gift.Url_send_gift = OPEN_URL, this
            }
        }),
        LINK_VIEW = X.XM.extend({
            _constructor: function(container) {
                return this.container = container, this
            },
            init: function() {
                var html = $(this._createHTML());
                return this.container.append(html), this.item = html.find(".item"), this.container = html, this
            },
            _createHTML: function() {
                var html = ['<div class="MR-gift-link-container"><span class="item"></span></div>'].join("");
                return html
            }
        }),
        LINK = X.XM.extend({
            _constructor: function(option) {
                return this.view = new LINK_VIEW(option.container), this._isAnchor = option.isAnchor, this._reduceBalance = option.reduceBalance, this._giftDialog = null, this._giftNum = 0, this._giftId = 0, this._socket = option.socket, this._timer = null, this._flashTimer = null, this._flashRrTry = 0, this
            },
            init: function() {
                return this.view.init(), this._bindEvent(), this._getInitData(function(d) {
                    this.upDate(d)
                }), this
            },
            _openGiftDialog: function() {
                this._giftDialog && this._giftDialog.destory();
                var _this = this,
                    content = '<div class="MR-gift-link-dialog"></div>',
                    title = "";
                this._isAnchor ? title = '<span class="MR-gift-link-dialog-title">选择开启接龙礼物</span>' : title = '<span class="MR-gift-link-dialog-title">送礼物给</span><span class="ICON-anchor-level MR-gift-link-dialog-title-icon ICON-al-' + ANCHOR_INFO.anchorLevel + '"></span><span class="MR-gift-link-dialog-title-name">' + ANCHOR_INFO.anchorName + "</span>";
                var dialog = D.dialog({
                    title: title,
                    content: content,
                    bgClosed: !0,
                    onOpen: function(box) {
                        var container = box.boxer.find(".MR-gift-link-dialog"),
                            gift = new LINK_GIFT({
                                container: container,
                                sendGiftCallback: function(price) {
                                    _this._isAnchor || _this._reduceBalance(price), box.destroy()
                                }
                            });
                        gift.init(), _this._isAnchor && (box.boxer.find(".send-btn").html("选择礼物开启接龙").css("width", "111px"), box.boxer.find(".num-group").css("right", "119px"))
                    },
                    onClosed: function() {
                        _this._giftDialog = null
                    }
                });
                return dialog.init(), this._giftDialog = dialog, this
            },
            upDate: function(data) {
                return this.upDateTimer(data), this.upDateItem(data), this.upDateFlash(data), this
            },
            upDateFlash: function(data) {
                var giftData = GIFT_DIR[data.giftId] || {},
                    flashParam = {
                        round: data.start ? data.round : -1,
                        lightIdx: data.lightIdx,
                        bubbleIdx: data.bubbleIdx,
                        bubblePercent: data.bubblePercent,
                        bubbleColor: this._getBubbleColor(giftData.value * data.giftNum),
                        curTotal: data.curTotal,
                        countdown: data.countdown && Math.floor(data.countdown / 1e3),
                        giftNum: data.giftNum,
                        giftImg: giftData.smallicon
                    };
                return this._flashRrTry = 0, this._flashTimer && clearTimeout(this._flashTimer), this._flashJsCallSolitaire(flashParam), this
            },
            _flashJsCallSolitaire: function(flashParam) {
                var flash = this._getFlash(),
                    _this = this;
                flash && flash.jsCallSolitaire ? (flash.jsCallSolitaire(flashParam), this._flashTimer = null) : (this._flashRrTry < 5 && (this._flashTimer = setTimeout(function() {
                    _this._flashJsCallSolitaire(flashParam)
                }, 500)), this._flashRrTry += 1)
            },
            upDateItem: function(data) {
                var item = this.view.item,
                    action = "send-gift",
                    pos = BUBBLE_POS[data.bubbleIdx];
                return this._giftNum = data.giftNum, this._giftId = data.giftId, data.start || (action = "show-select"), this._isAnchor && action == "send-gift" && (action = "anchor-disable"), item.attr("action-type", action), pos ? item.css({
                    display: "block",
                    left: BUBBLE_POS[data.bubbleIdx].left,
                    top: BUBBLE_POS[data.bubbleIdx].top
                }) : item.css("display", "none"), this
            },
            upDateTimer: function(data) {
                this._timer && (clearTimeout(this._timer), this._timer = null);
                if (data.start) {
                    var _this = this;
                    this._timer = setTimeout(function() {
                        _this.upDate(EMPTY_DATA), D.tip("接龙失败", _this.view.item, {
                            delay: 2e3
                        })
                    }, data.countdown)
                }
            },
            _getFlash: function() {
                return document.getElementById("ddshowGifter")
            },
            _getBubbleColor: function(xb) {
                var colorType = -1;
                return xb >= 1e3 && xb < 1e4 ? colorType = 1 : xb >= 1e4 && xb < 5e4 ? colorType = 2 : xb >= 5e4 && (colorType = 3), colorType
            },
            _sendGift: function() {
                var _this = this;
                U.post("/room/" + BASE_INFO.roomId + SEND_URL, {
                    giftId: _this._giftId,
                    quantity: _this._giftNum,
                    targetUserId: ANCHOR_INFO.anchorId
                }, function(d) {
                    var data = d.data,
                        giftData = GIFT_DIR[data.giftId] || {},
                        price = giftData.value * data.giftNum;
                    price && _this._reduceBalance(price)
                }, function() {}, function(e) {
                    e.code == 99 && (e.msg = "网络错误，请重试"), D.alert(e.msg)
                })
            },
            _getInitData: function(success) {
                var _this = this;
                return U.get("/room/" + BASE_INFO.roomId + "/gift/chain/init", {}, function(d) {
                    success.call(_this, d.data)
                }, function() {}, function() {}), this
            },
            socketGiftChain: function(body) {
                return this.upDate(body), this
            },
            _bindEvent: function() {
                var _this = this;
                return this.view.container.on("click", '[action-type="show-select"]', function() {
                    if (Status.noLogin()) return !1;
                    if (Status.isDisconnect()) return !1;
                    _this._openGiftDialog()
                }), this.view.container.on("click", '[action-type="send-gift"]', function() {
                    if (Status.noLogin()) return !1;
                    if (Status.isDisconnect()) return !1;
                    _this._sendGift()
                }), this.view.container.on("click", '[action-type="anchor-disable"]', function() {
                    D.alert("对不起，播客不能接龙哦")
                }), this.view.item.hover(function() {
                    var flash = _this._getFlash();
                    flash && flash.jsCallSolitaireGiftInfo && flash.jsCallSolitaireGiftInfo(!0)
                }, function() {
                    var flash = _this._getFlash();
                    flash && flash.jsCallSolitaireGiftInfo && flash.jsCallSolitaireGiftInfo(!1)
                }), this
            }
        });
    module.exports = LINK
}), define("COMMUNITY_NOTICE", ["JQ", "XM", "WIDGETS", "UTIL", "DIALOG"], function(require, exports, module) {
    var $ = require("JQ"),
        X = require("XM"),
        WIDGETS = require("WIDGETS"),
        U = require("UTIL"),
        D = require("DIALOG"),
        CommunityNoticeView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.notice = container.find(".notice"), this.noticeText = this.notice.find(".text"), this.outerContainer.append(container), this.container = container, this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-notice-container">', '<div class="notice"><p class="text"></p></div>', "</div>"].join("");
                return html
            },
            addEdit: function() {
                var _this = this,
                    html = ['<div class="edit" style="display:none;">', '<textarea class="input">请输入社团公告...</textarea>', '<span class="save btn-save"></span>', '<cite class="count"></cite>', "</div>"].join("");
                return this.notice.append('<span class="open-edit btn-edit"></span>'), html = $(html), this.editContainer = html, this.editTextarea = this.editContainer.find(".input"), this.btnSave = this.editContainer.find(".save"), this.editCount = this.editContainer.find(".count"), this.btnEdit = this.notice.find(".open-edit"), this.container.append(html), this.widgetsText = WIDGETS.Text({
                    textarea: this.editTextarea,
                    tips: "请输入社团公告...",
                    maxFontNum: 30,
                    rightTips: "",
                    wrongTips: "",
                    repairTips: "",
                    isStr: !1,
                    Ele_max_font: this.editCount
                }), this.widgetsText.init(), $("body").on("click", function(e) {
                    _this.container.find(e.target).length == 0 && _this.showNotice()
                }), this
            },
            showNotice: function() {
                return this.notice.css("display", "block"), this.editContainer && this.editContainer.css("display", "none"), this
            },
            showEdit: function() {
                return this.notice.css("display", "none"), this.editContainer && this.editContainer.css("display", "block"), this.editTextarea && this.editTextarea.focus(), this
            },
            setNoticeText: function(text) {
                return this.noticeText.html(text), this.editContainer && this.editContainer.length > 0 && this.widgetsText.setVal(text), this
            },
            setNoticeTip: function(text) {
                return this.noticeText.html('<span class="default-text">' + text + "</span>"), this
            }
        }),
        CommunityNoticeModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            getInitData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "CommunityNoticeGet",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取社团公告失败")
                    }
                })
            },
            update: function(text, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "CommunityNoticeUpdate",
                    upData: {
                        nt: text
                    },
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("更新社团公告失败")
                    }
                })
            }
        }),
        CommunityNotice = X.XM.extend({
            _constructor: function(option) {
                return this.view = new CommunityNoticeView(option.container), this.module = new CommunityNoticeModule(option.socket), this._notice = "", this
            },
            init: function() {
                var _this = this;
                return this.view.init(), this.module.init(), this.view.setNoticeTip("正在获取社团公告&nbsp;..."), this.module.getInitData(function(d) {
                    d.rs && d.rs.ise == 1 && _this.addEdit(), _this.updateNotice(d.m)
                }, function(msg) {
                    _this.view.setNoticeTip(msg)
                }), this
            },
            addEdit: function() {
                var view = this.view,
                    _this = this;
                return view.addEdit(), view.btnEdit.on("click", function() {
                    view.setNoticeText(_this._notice), view.showEdit()
                }), view.btnSave.on("click", function() {
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    var verify = view.widgetsText.verify();
                    if (verify) return D.alert(verify), !1;
                    var val = view.widgetsText.getValue();
                    val = U.formatHTML(val), _btn.addClass("disable"), _this.module.update(val, function() {
                        view.showNotice()
                    }, function() {
                        _btn.removeClass("disable")
                    }, function(msg) {
                        D.alert(msg)
                    })
                }), this
            },
            updateNotice: function(notice) {
                return this._notice = notice, this.view.setNoticeText(notice), this
            },
            socketCommunityNoticeUpdate: function(body) {
                return this.updateNotice(body.nt), this
            }
        });
    exports.communityNotice = CommunityNotice
}), define("COMMUNITY_TITLES", ["XM", "JQ", "UTIL", "WIDGETS", "DIALOG"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        WIDGETS = require("WIDGETS"),
        D = require("DIALOG"),
        INFO_TEXT = '想给小社团换个有特色的活跃头衔么？在这里，我们允许播客自定义编辑活跃头衔，快速提升活跃等级，可以体验更多个性头衔。<a class="link" href="/help/community/active" target="_blank">活跃头衔&等级对照</a>',
        CommunityTitleModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            getInitData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "ActiveStageGet",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取活跃头衔失败")
                    }
                })
            },
            update: function(rank, name, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "ActiveStageUpdate",
                    upData: {
                        sg: rank,
                        sgn: name
                    },
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("更新活跃头衔失败")
                    }
                })
            }
        }),
        TitleView = X.XM.extend({
            _constructor: function(option) {
                return this.outerContainer = option, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.name = container.find(".name"), this.container = container, this.outerContainer.append(container), this
            },
            _createHTML: function() {
                var html = ['<li class="title-item">', '<span class="name"></span>', "</li>"].join("");
                return html
            },
            addEdit: function() {
                var _this = this,
                    html = ['<span class="edit btn-edit"></span>', '<input class="input" style="display:none;"/>', '<span class="save btn-save" style="display:none;"></span>', '<cite class="count" style="display:none;"></cite>'].join("");
                return this.name.addClass("name-edit"), this.container.append(html), this.btnEdit = this.container.find(".edit"), this.input = this.container.find(".input"), this.inputCount = this.container.find(".count"), this.btnSave = this.container.find(".save"), this.widgetsText = WIDGETS.Text({
                    textarea: this.input,
                    tips: "",
                    maxFontNum: 2,
                    rightTips: "",
                    wrongTips: "",
                    repairTips: "",
                    isNull: !0,
                    isStr: !0,
                    Ele_max_font: this.inputCount
                }), this.widgetsText.init(), $("body").on("click", function(e) {
                    _this.container.find(e.target).length == 0 && _this.showName()
                }), this
            },
            showName: function() {
                return this.name.css("display", "block"), this.btnEdit && this.btnEdit.css("display", "block"), this.input && this.input.css("display", "none"), this.btnSave && this.btnSave.css("display", "none"), this.inputCount && this.inputCount.css("display", "none"), this
            },
            showEdit: function() {
                return this.name.css("display", "none"), this.btnEdit && this.btnEdit.css("display", "none"), this.input && this.input.css("display", "block"), this.btnSave && this.btnSave.css("display", "block"), this.inputCount && this.inputCount.css("display", "block"), this.input && this.input.focus(), this
            },
            setName: function(name) {
                return this.name.html(name), this.widgetsText && this.widgetsText.setVal(name), this
            }
        }),
        Title = X.XM.extend({
            _constructor: function(option) {
                return this.view = new TitleView(option.container), this.module = new CommunityTitleModule(option.socket), this.name = option.name, this.id = option.id, this.edit = option.edit, this
            },
            init: function() {
                return this.view.init(), this.module.init(), this.edit && this.addEdit(), this.update(), this
            },
            addEdit: function() {
                var view = this.view,
                    _this = this;
                return view.addEdit(), view.btnEdit.on("click", function() {
                    view.setName(_this.name), view.showEdit()
                }), view.btnSave.on("click", function() {
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    var verify = view.widgetsText.verify();
                    if (verify) return D.alert(verify), !1;
                    var val = view.widgetsText.getValue();
                    if (val == "") return D.alert("内容不能为空"), !1;
                    val = U.formatHTML(val), D.alert('确认修改成<span style="color:#f6bb41;">' + val + "</span>头衔么", function() {
                        if (val == _this.name) return view.showName(), !1;
                        _btn.addClass("disable"), _this.module.update(_this.id, val, function() {
                            view.showName()
                        }, function() {
                            _btn.removeClass("disable")
                        }, function(msg) {
                            D.alert(msg)
                        })
                    })
                }), this
            },
            update: function(name) {
                return name = name || this.name, this.name = name, this.view.setName(name), this
            }
        }),
        CommunityTitlesView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContaienr = container, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.titleList = container.find(".title-list"), this.container = container, this.outerContaienr.append(container), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-titles-container">', '<h3 class="title">', '<span class="text" title="活跃头衔">活跃头衔</span>', "</h3>", '<ul class="title-list"><li class="tips" style="margin-left:9px; color:#918e90;">活跃头衔加载中...</li></ul>', '<p class="info">' + INFO_TEXT + "</p>", "</div>"].join("");
                return html
            },
            setLoadingError: function(msg) {
                return this.titleList.find(".tips").html(msg), this
            }
        }),
        CommunityTitles = X.XM.extend({
            _constructor: function(option) {
                return this.view = new CommunityTitlesView(option.container), this.module = new CommunityTitleModule(option.socket), this._socket = option.socket, this.titles = {}, this
            },
            init: function() {
                var _this = this;
                return this.view.init(), this.module.init(), this.module.getInitData(function(d) {
                    _this.initTitles(d.rs)
                }, function(msg) {
                    _this.view.setLoadingError(msg)
                }), this
            },
            initTitles: function(data) {
                var newTitles = {},
                    _this = this;
                this.view.titleList.empty();
                var edit = !!data.ise,
                    sgs = data.sgs;
                return $.each(sgs, function() {
                    var title = new Title({
                        id: this.sg,
                        name: this.sgn,
                        edit: edit,
                        container: _this.view.titleList,
                        socket: _this._socket
                    });
                    title.init(), newTitles[this.sg] = title
                }), this.titles = newTitles, this
            },
            socketActiveStageUpdate: function(body) {
                var title = this.titles[body.sg];
                return title && title.update(body.sgn), this
            }
        });
    exports.communityTitles = CommunityTitles
}), define("COMMUNITY_MY", ["JQ", "XM", "UTIL", "DRAWPROGRESS", "LOGIN"], function(require, exports, module) {
    var $ = require("JQ"),
        X = require("XM"),
        U = require("UTIL"),
        P = require("DRAWPROGRESS"),
        L = require("LOGIN"),
        _MEDAL_DATA = window.DDS.medal,
        PayModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            getInitData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "GoldExpUser",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取消费等级失败")
                    }
                })
            }
        }),
        PayView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.levelICon = container.find(".icon"), this.rank = container.find(".rank"), this.progress = container.find(".progress"), this.subName = container.find(".sub-name"), this.outerContainer.append(container), U.browser.canvas && (this.drawProgress = new P.progress({
                    container: this.progress,
                    percent: 0
                }), this.drawProgress.init()), this
            },
            _createHTML: function() {
                var html = ['<div class="level-item">', '<span class="progress" title="消费星币点亮消费等级">', '<span class="icon"><img src="http://static.youku.com/ddshow/img/zhou/gold/gold_00.png" /></span>', '<span class="sub-name">消费</span>', "</span>", '<span class="name">消费等级</span>', '<span class="rank">获取中</span>', "</div>"].join("");
                return html
            },
            setLevel: function(medalId) {
                var data = _MEDAL_DATA[medalId];
                return data && this.levelICon.html('<img src="' + data.medalUrl + '" />'), this
            },
            setProgress: function(percent) {
                return percent > 1 && (percent = 1), this.drawProgress && this.drawProgress.drawProgress(percent), this
            },
            setTip: function(count, nextLevel, ue) {
                var tip = "";
                return count > 0 ? tip = "再消费" + count + "星币，点亮消费等级" + nextLevel : count == 0 ? ue > 0 ? tip = "已达最高等级" : tip = "消费星币点亮消费等级" : tip = "已达最高等级", L.isLogin() || (tip = "登录开启"), this.progress.attr("title", tip), this
            },
            setRank: function(rank) {
                var tip = "";
                return rank > 0 ? tip = "第" + rank + "名" : tip = "还没上榜", this.rank.html(tip), this
            }
        }),
        PayLevel = X.XM.extend({
            _constructor: function(option) {
                return this.module = new PayModule(option.socket), this.view = new PayView(option.container), this
            },
            init: function() {
                var _this = this;
                return this.module.init(), this.view.init(), this.module.getInitData(function(d) {
                    _this.update(d.rs)
                }, function(msg) {}), this
            },
            getPercent: function(curExp, levelExp, nextLevelExp) {
                return (curExp - levelExp) / (nextLevelExp - levelExp)
            },
            update: function(data) {
                var percent = 0,
                    count = 0;
                return data.ue != 0 && (percent = this.getPercent(data.ue, data.se, data.ee), count = data.ee - data.ue), this.view.setLevel(data.mi), this.view.setProgress(percent), this.view.setTip(count, data.ul + 1, data.ue), this.view.setRank(data.rk), this
            }
        }),
        ActiveModule = PayModule.extend({
            getInitData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "ActiveLevelGet",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取活跃等级失败")
                    }
                })
            }
        }),
        ActiveView = PayView.extend({
            _createHTML: function() {
                var html = ['<div class="level-item">', '<span class="progress" title="任务点亮活跃等级">', '<span class="icon"><img src="http://static.youku.com/ddshow/img/zhou/active/active_00.png" /></span>', '<span class="sub-name">普通</span>', "</span>", '<span class="name">活跃等级</span>', '<span class="rank">获取中</span>', "</div>"].join("");
                return html
            },
            setActiveName: function(name) {
                return this.subName.html(name), this
            },
            setTip: function(count, nextLevel, showFansTip, ue) {
                var tip = "";
                return count > 0 ? tip = "再累积" + count + "活跃值，点亮活跃等级" + nextLevel : count < 0 ? tip = "已达最高等级" : ue > 0 ? tip = "已达最高等级" : tip = "任务点亮活跃等级", showFansTip && (tip = "关注后累积"), L.isLogin() || (tip = "登录开启"), this.progress.attr("title", tip), this
            }
        }),
        ActiveLevel = PayLevel.extend({
            _constructor: function(option) {
                return this.module = new ActiveModule(option.socket), this.view = new ActiveView(option.container), this
            },
            update: function(data) {
                var percent = 0,
                    count = 0,
                    showFansTip = !1;
                return data.ue != 0 && (percent = this.getPercent(data.ue, data.se, data.ee), count = data.ee - data.ue), data.isF || (showFansTip = !0), this.view.setLevel(data.mi), this.view.setActiveName(data.sn), this.view.setProgress(percent), this.view.setTip(count, data.ul + 1, showFansTip, data.ue), this.view.setRank(data.rk), this
            }
        }),
        Level = X.XM.extend({
            _constructor: function(option) {
                return this.view = {
                    outerContainer: option.container
                }, this._SOCKET = option.socket, this
            },
            init: function() {
                return this._initView(), this._initPayLevel(), this._initActiveLevel(), this
            },
            _initPayLevel: function() {
                return this.payLevel = new PayLevel({
                    container: this.view.levelContainer,
                    socket: this._SOCKET
                }), this.payLevel.init(), this
            },
            _initActiveLevel: function() {
                return this.activeLevel = new ActiveLevel({
                    container: this.view.levelContainer,
                    socket: this._SOCKET
                }), this.activeLevel.init(), this
            },
            _initView: function() {
                var container = $(this._viewCreateHTML());
                return this.view.outerContainer.append(container), this.view.container = container, this.view.levelContainer = container.find(".level-container"), this
            },
            _viewCreateHTML: function() {
                var html = ['<div class="MR-community-level-container">', '<h3 class="title">', '<span class="text" title="我的社团信息">我的社团信息</span>', "</h3>", '<div class="level-container"></div>', "</div>"].join("");
                return html
            },
            socketActiveStageUpdate: function(body) {
                this.payLevel && this.payLevel.update(body)
            },
            socketActiveLevelUpdate: function(body) {
                this.activeLevel && this.activeLevel.update(body)
            }
        });
    exports.level = Level;
    var RedPack = X.XM.extend({
        _constructor: function(option) {
            return this.view = {}, this.view.outerContainer = option.container, this._SOCKET = option.socket, this.count = 0, this.price = 0, this
        },
        init: function() {
            var _this = this;
            return this._initView(), this._getInitData(function(d) {
                _this.update(d.q, d.c)
            }), this
        },
        _initView: function() {
            var html = ['<div class="MR-community-myRedPack-container">', '<h3 class="title">', '<span class="text" title="我的红包">我的红包</span>', '<span class="help" title="帮助">', '<span class="tips" style="display:none; left:-71px; bottom:auto; top:16px;"><span class="tips-inner">召唤播客和Lv.2管理员发红包咯，手疾眼快攒星币</span></span>', "</span>", "</h3>", '<p class="line">已抢到<span class="count">0</span>个红包</p>', '<p class="line">总金额：<span class="price">0星币</span></p>', "</div>"].join("");
            this.view.container = $(html), this.view.count = this.view.container.find(".count"), this.view.price = this.view.container.find(".price"), this.view.outerContainer.append(this.view.container);
            var tipsTimer = null,
                tips = this.view.container.find(".tips"),
                helpIcon = this.view.container.find(".help"),
                showTips = function() {
                    tipsTimer && (clearTimeout(tipsTimer), tipsTimer = null), tips.css("display", "block")
                },
                hideTips = function() {
                    tipsTimer = setTimeout(function() {
                        tips.css("display", "none"), tipsTimer = null
                    }, 300)
                };
            return helpIcon.hover(function() {
                showTips()
            }, function() {
                hideTips()
            }), this
        },
        _setCount: function(count) {
            return this.count = count, this.view.count.html(count), this
        },
        _setPrice: function(price) {
            return this.price = price, this.view.price.html(price + "星币"), this
        },
        update: function(count, price) {
            return this._setCount(count), this._setPrice(price), this
        },
        add: function(count, price) {
            return this.update(this.count + count, this.price + price), this
        },
        _getInitData: function(done, error) {
            done = done || function() {}, error = error || function() {}, U.socketRequest({
                socket: this._SOCKET,
                methodName: "MyRedpack",
                upData: {},
                downCallBack: function(d) {
                    d.cd == 0 ? done(d) : error(d.m)
                },
                overTimeCallBack: function() {
                    error("获取我的红包失败")
                }
            })
        }
    });
    exports.redPack = RedPack
}), define("COMMUNITY_TASK", ["XM", "JQ", "UTIL", "LOGIN", "DIALOG", "COMMUNITY_RING", "PH", "VIEWS_GIFT"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        L = require("LOGIN"),
        D = require("DIALOG"),
        RING = require("COMMUNITY_RING"),
        PH = require("PH"),
        GIFT = require("VIEWS_GIFT"),
        _TASK_STATUS_CLOSE = 0,
        _TASK_STATUS_OPEN = 1,
        _TASK_STATUS_SUCCESS = 2,
        _TASK_STATUS_FAIL = 3,
        _TASK_PID_LIMIT = 5e3;

    function popText(node, text) {
        if (!text) return !1;
        node = $(node);
        if (node.length == 0) return !1;
        var html = $('<span style="position:absolute; left:0; top:0; width:60px; height:20px; line-height:20px; font-size:10px; color:#d6417c;">' + text + "</span>");
        return node.append(html), html.animate({
            top: -21,
            fontSize: "13px",
            opacity: .5
        }, 500, function() {
            html.remove()
        }), this
    }
    var TaskView = X.XM.extend({
            setBtn: function(btn, exp, recTime, cur, max) {
                return recTime > 0 ? btn.removeClass("btn-disable") : btn.addClass("btn-disable"), cur >= max && recTime == 0 ? btn.find(".text").html("已领取") : btn.find(".text").html("活跃值+" + exp), this
            },
            setName: function(name) {
                return this.name.html(name).attr("title", name), this
            },
            remove: function() {
                return this.container.remove(), this
            }
        }),
        SimpleTaskView = TaskView.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.name = container.find(".name"), this.count = container.find(".count"), this.recBtn = container.find(".rec-btn"), this.outerContainer.append(container), this.container = container, this
            },
            _createHTML: function() {
                var html = ['<li class="item task-item">', '<span class="name" title=""></span>', '<span class="count"></span>', '<span class="rec-btn btn-red"><span class="text"></span></span>', "</li>"].join("");
                return html
            },
            setCount: function(cur, max) {
                return this.count.html("(<i>" + cur + "</i>" + "/" + max + ")"), this
            },
            setRecBtn: function(exp, recTime, cur, max) {
                var btn = this.recBtn;
                return this.setBtn(btn, exp, recTime, cur, max), this
            }
        }),
        Task_Module = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            complete: function(tid, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "DailyTaskReceive",
                    upData: {
                        tid: tid
                    },
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("请重试")
                    }
                })
            },
            open: function(tid, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "StartCollectiveTask",
                    upData: {
                        id: tid
                    },
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("任务开启失败,请重试")
                    }
                })
            },
            del: function(data, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "DelCollectiveCustomTask",
                    upData: data,
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("删除任务失败,请重试")
                    }
                })
            },
            add: function(data, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "AddCollectiveCustomTask",
                    upData: data,
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("添加任务失败,请重试")
                    }
                })
            }
        }),
        SimpleTask = X.XM.extend({
            _constructor: function(container, o, socket) {
                return this.view = new SimpleTaskView(container), this.module = new Task_Module(socket), this.id = o.id, this.pid = o.pid, this.name = o.n, this.exp = o.tc, this.currentTime = o.cur, this.maxTime = o.max, this.receiveTime = o.re, this
            },
            init: function() {
                var v = this.view;
                return this.module.init(), v.init(), v.setName(this.name), v.setCount(this.currentTime, this.maxTime), v.setRecBtn(this.exp, this.receiveTime, this.currentTime, this.maxTime), this._bindEvent(), this
            },
            update: function(data) {
                var v = this.view;
                return this.currentTime = data.cur, this.receiveChange(this.receiveTime, data.re), this.receiveTime = data.re, v.setCount(this.currentTime, this.maxTime), v.setRecBtn(this.exp, this.receiveTime, this.currentTime, this.maxTime), this
            },
            reset: function() {
                var v = this.view;
                return this.currentTime = 0, v.setCount(this.currentTime, this.maxTime), this.resetReceive(), this
            },
            resetReceive: function() {
                var v = this.view;
                this.receiveChange(this.receiveTime, -1), this.receiveTime = -1, v.setRecBtn(this.exp, this.receiveTime, this.currentTime, this.maxTime)
            },
            remove: function() {
                return this.view.remove(), this.destroy(), this
            },
            receiveChange: function(oldValue, newValue) {
                oldValue = oldValue == -1 ? 0 : oldValue, newValue = newValue == -1 ? 0 : newValue, this.onReceiveChange(oldValue, newValue)
            },
            onReceiveChange: function(oldValue, newValue) {},
            destroy: function() {},
            getReceiveTime: function() {
                var count = this.receiveTime;
                return count < 0 && (count = 0), count
            },
            _bindEvent: function() {
                var _this = this;
                this.view.recBtn.on("click", function() {
                    var _btn = $(this),
                        _text = _btn.find(".text").text();
                    if (_btn.hasClass("btn-sending") || _btn.hasClass("btn-disable")) return !1;
                    _btn.addClass("btn-sending"), _this.module.complete(_this.id, function(d) {
                        popText(_btn, _text)
                    }, function() {
                        _btn.removeClass("btn-sending")
                    }, function(msg) {
                        popText(_btn, msg)
                    })
                })
            }
        }),
        RoomTask_view = SimpleTaskView.extend({
            _constructor: function(container, mode) {
                return RoomTask_view._super._constructor.call(this, container), this.mode = mode, this
            },
            init: function() {
                return RoomTask_view._super.init.call(this), this.dsc = this.container.find(".dsc"), this.status = this.container.find(".status"), this.statusText = this.container.find(".status-text"), this.info = this.container.find(".info"), this.subCount = this.container.find(".s-count"), this.time = this.container.find(".time"), this.empty = this.container.find(".empty"), this.timer = null, this
            },
            _createHTML: function() {
                var html = ['<li class="item task-item task-item-dsc">', '<p class="title-line line">', '<span class="status">[加载中]</span>', '<span class="name" title=""></span>', '<span class="count"></span>', "</p>", '<p class="line dsc"><span class="text"></span></p>', '<p class="line info">倒计时<span class="time">00:00:00</span>，当前进度[<span class="s-count">0/0</span>]</p>',
                    function(mode) {
                        return mode != "anchor" ? '<span class="rec-btn btn-red"><span class="text"></span></span>' : ""
                    }(this.mode), '<p class="line status-text" style="color:#FFF;">未开启</p>', '<p class="line empty" style="color:#FFF;">今日已达开启上限</p>', "</li>"
                ].join("");
                return html
            },
            setDsc: function(text) {
                return this.dsc.find(".text").html(text), this
            },
            setStatus: function(status, cur, max) {
                return status != _TASK_STATUS_OPEN && cur < max && (this.mode == "admin" || this.mode == "anchor") ? (this.status.css("cursor", "pointer"), this.status.css("color", "#3b99c4"), this.status.attr("title", "开启"), this.status.html("[开启]"), this.status.css("display", "inline")) : this.status.css("display", "none"), status != _TASK_STATUS_OPEN && cur < max ? this.statusText.css("display", "block") : this.statusText.css("display", "none"), cur >= max ? this.empty.css("display", "block") : this.empty.css("display", "none"), status == _TASK_STATUS_OPEN ? this.name.css("color", "#fff") : this.name.css("color", "#999"), this
            },
            openTimer: function(lastTime) {
                var _this = this;
                return this.timer && this.closeTimer(), lastTime < 0 && (lastTime = 0), this.setTimer(lastTime), lastTime -= 1, lastTime >= 0 && (this.timer = setTimeout(function() {
                    _this.openTimer(lastTime)
                }, 1e3)), this
            },
            closeTimer: function() {
                return clearTimeout(this.timer), this.timer = null, this
            },
            setSubCount: function(cur, max) {
                return this.subCount.text(cur + "/" + max), this
            },
            showInfo: function() {
                return this.info.css("display", "block"), this
            },
            hideInfo: function() {
                return this.info.css("display", "none"), this
            },
            setTimer: function(sec) {
                var h = Math.floor(sec / 3600),
                    m = Math.floor(sec / 60) % 60,
                    s = sec % 3600 % 60;
                return h < 10 && (h = "0" + h), m < 10 && (m = "0" + m), s < 10 && (s = "0" + s), this.time.html(h + ":" + m + ":" + s), this
            }
        }),
        RoomTask = SimpleTask.extend({
            _constructor: function(container, o, socket, mode) {
                return RoomTask._super._constructor.call(this, container, o, socket), this.mode = mode || "user", this.view = new RoomTask_view(container, this.mode), this.subCurrentTime = o.c, this.subMaxTime = o.g, this.description = o.d, this.status = o.s, this.lastTime = o.t, this.resetDescription = o.rd || o.d, this
            },
            init: function() {
                RoomTask._super.init.call(this);
                var v = this.view;
                return v.setDsc(this.description), v.setStatus(this.status, this.currentTime, this.maxTime), this.status == _TASK_STATUS_OPEN ? (v.openTimer(this.lastTime), v.setSubCount(this.subCurrentTime, this.subMaxTime), this.showInfo()) : this.hideInfo(), this.resetH(), this
            },
            update: function(data) {
                var v = this.view;
                return this.receiveChange(this.receiveTime, data.re), this.receiveTime = data.re, v.setRecBtn(this.exp, this.receiveTime, this.currentTime, this.maxTime), this
            },
            reset: function() {
                var v = this.view;
                return RoomTask._super.reset.call(this), this.status != _TASK_STATUS_OPEN && (this.description = this.resetDescription, v.setDsc(this.description), this.status = _TASK_STATUS_CLOSE, v.setStatus(this.status, this.currentTime, this.maxTime)), this
            },
            recover: function() {},
            updateState: function(d) {
                return this.status = d.s, d.c >= 0 && (this.currentTime = d.c), !d.d || (this.description = d.d), d.g >= 0 && (this.subMaxTime = d.g), d.t >= 0 && (this.lastTime = d.t), (this.status == _TASK_STATUS_SUCCESS || this.status == _TASK_STATUS_FAIL) && this.currentTime == 0 && (this.status = _TASK_STATUS_CLOSE), this.subCurrentTime = 0, this.view.setSubCount(this.subCurrentTime, this.subMaxTime), this.view.setDsc(this.description), this.view.setCount(this.currentTime, this.maxTime), this.view.setStatus(this.status, this.currentTime, this.maxTime), this.status == _TASK_STATUS_OPEN ? (this.view.openTimer(this.lastTime), this.showInfo()) : (this.view.closeTimer(), this.hideInfo()), this.resetH(), this
            },
            updateCur: function(d) {
                d.c >= 0 && (this.subCurrentTime = d.c, this.view.setSubCount(this.subCurrentTime, this.subMaxTime))
            },
            showInfo: function() {
                return this.view.showInfo(), this
            },
            hideInfo: function() {
                return this.view.hideInfo(), this
            },
            resetH: function() {},
            _bindEvent: function() {
                this.mode != "anchor" && RoomTask._super._bindEvent.call(this);
                var _this = this;
                (this.mode == "anchor" || this.mode == "admin") && this.view.status.on("click", function() {
                    if (_this.status == _TASK_STATUS_OPEN) return !1;
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    _btn.addClass("disable"), _this.module.open(_this.id, function() {}, function() {
                        _btn.removeClass("disable")
                    }, function(e) {
                        D.alert(e)
                    })
                })
            }
        }),
        FHXYTask = RoomTask.extend({
            _constructor: function(container, o, socket, mode, my, isFans) {
                return FHXYTask._super._constructor.call(this, container, o, socket, mode), this._socket = socket, this._ringSender = null, this._MY = my, this._isFans = isFans, this
            },
            showInfo: function() {
                var _this = this;
                return !this._ringSender && this.mode != "anchor" && this._isFans && (this._ringSender = new RING.sender({
                    socket: this._socket,
                    container: this.view.container
                }), this._ringSender.enoughBalance = function(value) {
                    return _this._MY.enoughBalance(value)
                }, this._ringSender.reduceBalance = function(value) {
                    return _this._MY.reduceBalance(value)
                }, this._ringSender.init()), FHXYTask._super.showInfo.call(this), this._ringSender && this._ringSender.show(), this
            },
            hideInfo: function() {
                return FHXYTask._super.hideInfo.call(this), this._ringSender && this._ringSender.hide(), this
            },
            updateGift: function(body) {
                return this._ringSender && this._ringSender.socketHotCircleUpdate(body), this
            },
            resetReceive: function() {
                return FHXYTask._super.resetReceive.call(this), this._ringSender && this._ringSender.hide(), this
            },
            reset: function() {
                return FHXYTask._super.reset.call(this), this.status == _TASK_STATUS_OPEN && this.hideInfo(), this
            },
            recover: function() {
                this.status == _TASK_STATUS_OPEN && this.showInfo()
            }
        }),
        OptionTaskView = RoomTask_view.extend({
            init: function() {
                return OptionTaskView._super.init.call(this), this.mode == "anchor" && (this.delBtn = $('<span class="del-btn">[删除]</span>'), this.container.append(this.delBtn)), this.price = $('<p class="line price">用户额外奖励：暂无</p>'), this.container.append(this.price), this
            },
            setStatus: function(status, cur, max) {
                return OptionTaskView._super.setStatus.call(this, status, cur, max), this.mode == "anchor" && this.delBtn && (status == _TASK_STATUS_CLOSE ? this.delBtn.css("display", "block") : this.delBtn.css("display", "none")), this
            },
            setPrice: function(text) {
                text && this.price.text("用户额外奖励：" + text)
            }
        }),
        OptionTask = RoomTask.extend({
            _constructor: function(container, o, socket, mode) {
                return mode == "admin" && (mode = "user"), OptionTask._super._constructor.call(this, container, o, socket, mode), this.view = new OptionTaskView(container, mode), this.price = o.r, this
            },
            init: function() {
                return OptionTask._super.init.call(this), this.view.setPrice(this.price), this.resetH(), this
            },
            _bindEvent: function() {
                OptionTask._super._bindEvent.call(this);
                var v = this.view,
                    _this = this;
                return this.mode == "anchor" && v.delBtn.on("click", function() {
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    _btn.addClass("disable"), D.confirm("确定要删除" + _this.name + "任务么?<br/>删除任务有可能会造成用户无法再领取奖励", function(flag) {
                        flag ? _this.module.del({
                            taskId: _this.id
                        }, function(d) {}, function() {
                            _btn.removeClass("disable")
                        }, function(e) {
                            D.alert(e)
                        }) : _btn.removeClass("disable")
                    }, !0)
                }), this
            }
        }),
        CumulativeTaskView = TaskView.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this._percent = 0, this._barTimer = null, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.name = container.find(".name"), this.count = container.find(".count"), this.progressBar = container.find(".progress-bar"), this.progressContainer = container.find(".progress-container"), this.outerContainer.append(container), this.container = container, this
            },
            _createHTML: function() {
                var html = ['<li class="item cumulative-task-item">', '<p><span class="name"></span><span class="count">(<i>0</i>/1)</span></p>', '<span class="progress-container">', '<span class="progress"><span class="progress-bar"></span></span>', "</span>", "</li>"].join("");
                return html
            },
            _getPercent: function(cur, max) {
                return cur / max * 100
            },
            setCount: function(cur, max) {
                return cur >= max ? cur = 1 : cur = 0, max = 1, this.count.html("(<i>" + cur + "</i>" + "/" + max + ")"), this
            },
            initSubTaskItem: function(data, max) {
                var _this = this,
                    subTaskItems = {};
                return $.each(data, function(cur, d) {
                    var html = "",
                        percent = _this._getPercent(cur, max);
                    percent > 0 && (percent += "%"), html += '<span class="sub-task-item" style="left:' + percent + '">', html += '<span class="name">' + cur + "'</span>", html += '<span class="count"></span>', html += '<span class="rec-btn btn-red rec-btn-' + cur + '"><span class="text">活跃值+' + d.tc + "</span></span>", html += "</span>", subTaskItems[cur] = $(html)
                }), $.each(subTaskItems, function() {
                    _this.progressContainer.append(this)
                }), this.subTaskItem = subTaskItems, this
            },
            setProgress: function(cur, max) {
                var percent = this._getPercent(cur, max);
                return this._setProgressPercent(percent), this
            },
            startProgress: function(max) {
                this._start(this._getPercent(1, max))
            },
            stopProgress: function() {
                this._barTimer && (clearTimeout(this._barTimer), this._barTimer = null)
            },
            _setProgressPercent: function(percent) {
                this._percent = percent, percent > 0 && (percent += "%"), this.progressBar.css("width", percent)
            },
            _start: function(perMin) {
                var _this = this;
                this._barTimer && (clearTimeout(this._barTimer), _this._barTimer = null), this._barTimer = setTimeout(function() {
                    var percent = _this._percent + perMin;
                    percent > 100 ? (_this._setProgressPercent(100), _this._barTimer = null) : (_this._setProgressPercent(percent), _this._start(perMin))
                }, 6e4)
            },
            setRecBtn: function(data, cur) {
                var _this = this;
                $.each(data, function(k, v) {
                    _this.subTaskItem[k] && (cur >= k ? _this.subTaskItem[k].find(".count").addClass("complete") : _this.subTaskItem[k].find(".count").removeClass("complete"), _this.setBtn(_this.subTaskItem[k].find(".rec-btn"), v.tc, v.re, cur, k))
                })
            },
            remove: function() {
                return this._barTimer && (clearTimeout(this._barTimer), this._barTimer = null), CumulativeTaskView._super.remove.call(this), this
            }
        }),
        CumulativeTask = X.XM.extend({
            _constructor: function(container, o, socket) {
                return this.view = new CumulativeTaskView(container), this.module = new Task_Module(socket), this.pid = o.pid, this.name = o.n, this.currentTime = o.cur, this.maxTime = o.max, this.subTaskData = o.data, this
            },
            init: function() {
                var v = this.view;
                return this.module.init(), v.init(), v.initSubTaskItem(this.subTaskData, this.maxTime), v.setName(this.name), v.setRecBtn(this.subTaskData, this.currentTime), v.setProgress(this.currentTime, this.maxTime), v.setCount(this.currentTime, this.maxTime), this._bindEvent(), this
            },
            getSubTaskDataById: function(id) {
                var res = null;
                return $.each(this.subTaskData, function() {
                    if (this.id == id) return res = this, !1
                }), res
            },
            update: function(data) {
                var v = this.view,
                    d = this.getSubTaskDataById(data.id);
                return data.cur > 0 && (this.currentTime = data.cur, v.setProgress(this.currentTime, this.maxTime)), d && (this.receiveChange(d.re, data.re), d.re = data.re), v.setRecBtn(this.subTaskData, this.currentTime), v.setCount(this.currentTime, this.maxTime), this
            },
            reset: function() {
                var v = this.view,
                    _this = this;
                return this.currentTime = 0, $.each(this.subTaskData, function(k, d) {
                    _this.receiveChange(d.re, -1), d.re = -1
                }), v.setProgress(this.currentTime, this.maxTime), v.setRecBtn(this.subTaskData, this.currentTime), v.setCount(this.currentTime, this.maxTime), this
            },
            receiveChange: function(oldValue, newValue) {
                oldValue = oldValue == -1 ? 0 : oldValue, newValue = newValue == -1 ? 0 : newValue, this.onReceiveChange(oldValue, newValue)
            },
            onReceiveChange: function(oldValue, newValue) {},
            setProgressStatus: function(flag) {
                flag ? this.view.startProgress(this.maxTime) : this.view.stopProgress()
            },
            _bindEvent: function() {
                var _this = this;
                $.each(_this.view.subTaskItem, function(cur, node) {
                    node.on("click", ".rec-btn", function() {
                        var _btn = $(this),
                            id = _this.subTaskData[cur].id,
                            _text = _btn.find(".text").text();
                        if (_btn.hasClass("btn-sending") || _btn.hasClass("btn-disable") || !id) return !1;
                        _btn.addClass("btn-sending"), _this.module.complete(id, function(d) {
                            popText(_btn, _text)
                        }, function() {
                            _btn.removeClass("btn-sending")
                        }, function(msg) {
                            msg && popText(_btn, msg)
                        })
                    })
                })
            },
            remove: function() {
                return this.view.remove(), this
            },
            getReceiveTime: function() {
                var res = 0;
                return $.each(this.subTaskData, function(cur, d) {
                    d.re > 0 && (res += d.re)
                }), res
            }
        }),
        OptionTaskAddBtn = X.XM.extend({
            _constructor: function(container, socket) {
                return this.container = container, this.module = new Task_Module(socket), this.data = {}, this
            },
            init: function() {
                return this._initView(), this._bindEvent(), this
            },
            _initView: function() {
                return this.view = {}, this.view.btn = $('<span class="MR-community-task-add-btn btn-blue" style="display:none;">添加悬赏任务</span>'), this.container.append(this.view.btn), this
            },
            _openSelect: function() {
                var _this = this,
                    data = this.taskFilter(_this.data);
                if (data.length == 0) D.alert("暂时没有可添加的任务");
                else {
                    function getContent() {
                        var html = ['<ul class="MR-community-task-select">',
                            function(d) {
                                var html = "";
                                return $.each(d, function() {
                                    html += '<li class="item" data-pid="' + this.pid + '">' + this.name + "</li>"
                                }), html
                            }(data), "</ul>"
                        ].join("");
                        return html
                    }
                    var select = D.dialog({
                        title: "请选择悬赏任务类型",
                        content: getContent(),
                        onOpen: function(box) {
                            box.boxer.find(".MR-community-task-select").on("click", ".item", function() {
                                var pid = this.getAttribute("data-pid");
                                _this.openOption(pid), select.destroy(), select = null
                            })
                        }
                    });
                    select.init()
                }
            },
            openOption: function(pid) {
                var data = this._getDataByPid(pid),
                    _this = this;
                if (!data) return !1;

                function getContent(d) {
                    var html = ['<div class="MR-community-task-select-form">', '<h5 class="title">' + d.name + "</h5>", '<p class="desc">' + d.desc + "</p>",
                        function(d) {
                            var html = "";
                            return d.ty == 5 && (html += '<h6 class="gift-title">选择礼物</h6>', html += '<div class="gift-container"></div>'), html
                        }(d), '<p class="input">', '<input class="price" placeholder="填写完成任务额外奖励，如唱歌、跳舞、演奏、红包、实物奖励等(选填、限10个汉字)"/>', "</p>", '<div class="btn-area clearfix">', '<span class="btn btn-add">添加</span>', '<span class="btn btn-cancel">取消</span>', "</div>", "</div>"
                    ].join("");
                    return html
                }
                var select = D.dialog({
                    title: "",
                    content: getContent(data),
                    onOpen: function(box) {
                        var container = box.boxer.find(".MR-community-task-select-form"),
                            price = container.find(".price"),
                            gift = container.find(".gift-container"),
                            desc = container.find(".desc"),
                            data = {
                                pid: pid
                            };
                        PH.placeholderAddSpan({
                            dom: price
                        }).init();
                        if (gift && gift.length > 0) {
                            var descText = desc.html().split("指定礼物"),
                                giftView = new GIFT({
                                    container: gift,
                                    data: window.DDS,
                                    selectedGift: null,
                                    hasFree: !1,
                                    hasApp: !1,
                                    isGiftValid: !0,
                                    widgetShowNum: 10,
                                    isBottom: !1,
                                    isSofaShow: !1,
                                    isLock: !1
                                });
                            giftView.init(), giftView.selectGiftHandle(function(ele) {
                                var name = ele.attr("data-name"),
                                    id = ele.attr("data-id");
                                desc.html(descText.join(name)), data.gid = id
                            })
                        }
                        container.on("click", ".btn-cancel", function() {
                            select.destroy(), select = null
                        }), container.on("click", ".btn-add", function() {
                            var _btn = $(this);
                            if (giftView && !data.gid) return D.alert("请选择一个礼物"), !1;
                            data.ds = price.val() || "";
                            if (U.strLen(data.ds) > 20) return D.alert("奖励最多十个汉字"), !1;
                            _this.module.add(data, function(d) {
                                D.alert(d.m)
                            }, function() {}, function(e) {
                                D.alert(e)
                            }), select.destroy(), select = null
                        })
                    }
                });
                select.init()
            },
            _getDataByPid: function(pid) {
                var res = null;
                return $.each(this.data, function() {
                    if (this.pid == pid) return res = this, !1
                }), res
            },
            loadTemp: function(data) {
                return this.view.btn.css("display", "block"), this.data = data, this
            },
            _bindEvent: function() {
                var _this = this;
                this.view.btn.on("click", function() {
                    _this._openSelect()
                })
            }
        }),
        TaskPanel_Module = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            getInitData: function(ty, done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "DailyTaskInit",
                    upData: {
                        t: ty
                    },
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("初始化失败")
                    }
                })
            },
            getReceiveCount: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "TaskRedPointCount",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取失败")
                    }
                })
            }
        }),
        TaskPanel_View = X.XM.extend({
            _constructor: function(outerContainer) {
                return this.outerContainer = outerContainer, this.tipsTimer = null, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.count = container.find(".count"), this.loading = container.find(".loading"), this.error = container.find(".error"), this.container = container, this.outerContainer.append(container), this
            },
            addTask: function() {
                return this.taskList = $('<ul class="task-list"></ul>'), this.container.prepend(this.taskList), this.roomTaskList && this._initTab(), this
            },
            addRoomTask: function() {
                return this.roomTaskList = $('<ul class="task-list"></ul>'), this.container.prepend(this.roomTaskList), this.taskList && this._initTab(), this
            },
            _initTab: function() {
                var html = ['<div class="task-tab">', '<span class="item C-fl" data-tab="simple">单人任务</span>', '<span class="item C-fr" data-tab="room">多人任务</span>', "</div>"].join("");
                return this.tab = $(html), this.container.prepend(this.tab), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-task-container">', '<div class="loading" style="height:100px; display:none;"></div>', '<div class="error" style="padding:25px 0; text-align:center; display:none; line-height:28px;"></div>', "</div>"].join("");
                return html
            },
            setCount: function(cur, max) {
                return this.count.html("(<i>" + cur + "</i>" + "/" + max + ")"), this
            },
            showLoading: function() {
                return this.loading.css("display", "block"), this
            },
            hideLoading: function() {
                this.loading.css("display", "none")
            },
            showAttention: function() {
                if (!this.attentionTip) {
                    var html = ['<div class="top-tip" style="padding:0 0 10px;">', '<p class="text">先关注播客，才能做任务，涨活跃值哦~</p>', "</div>"].join("");
                    html = $(html), this.container.prepend(html), this.attentionTip = html
                }
                this.attentionTip.css("display", "block")
            },
            hideAttention: function() {
                this.attentionTip && this.attentionTip.css("display", "none")
            },
            showError: function(text) {
                this.hideLoading(), this.error.text(text).css("display", "block")
            },
            hideError: function() {
                this.error.css("display", "none")
            }
        }),
        TaskPanel = X.XM.extend({
            _constructor: function(option) {
                return this.view = new TaskPanel_View(option.container), this.module = new TaskPanel_Module(option.socket), this._socket = option.socket, this._tasks = {}, this._isFans = !1, this._isShow = !1, this._dataCache = {}, this._mode = "user", this._MY = option.my, this.addBtn = null, this._taskCount = -1, this
            },
            init: function() {
                var _this = this;
                return this._initView(), this.module.init(), this._mode == "user" || this._mode == "admin" ? (this.module.getReceiveCount(function(d) {
                    _this._taskCount = d.c, _this.onUpdate(_this._taskCount)
                }, function(e) {}), this.module.getInitData(0, function() {}, function(msg) {
                    _this.view.showError(msg)
                }), _this.view.tab.on("click.getTasks", '.item[data-tab="room"]', function() {
                    var _btn = $(this);
                    if (_btn.data("status") == "sending") return !1;
                    _btn.data("status", "sending"), _this.module.getInitData(1, function() {
                        _btn.data("status", "success"), _this.view.tab.off("click.getTasks")
                    }, function(msg) {
                        _btn.data("status", "fail"), _this.view.showError(msg)
                    })
                })) : this.module.getInitData(1, function() {}, function(msg) {
                    _this.view.showError(msg)
                }), this
            },
            _initView: function() {
                var view = this.view,
                    _this = this;
                view.init(), view.addRoomTask();
                if (this._mode == "user" || this._mode == "admin") view.addTask(), view.tab.on("click", ".item", function() {
                    var tag = $(this).attr("data-tab");
                    tag == "simple" ? (view.taskList.css("display", "block"), view.roomTaskList.css("display", "none")) : tag == "room" && (view.taskList.css("display", "none"), view.roomTaskList.css("display", "block")), $(this).addClass("item-cur").siblings().removeClass("item-cur"), _this.resetH()
                }), view.taskList.css("display", "block"), view.roomTaskList.css("display", "none"), view.tab.find('[data-tab="simple"]').addClass("item-cur").siblings().removeClass("item-cur");
                return this._mode == "anchor" && (this.view.container.css("padding", 0), this.view.roomTaskList.css("padding", 0), this.addBtn = new OptionTaskAddBtn(this.view.container, this._socket), this.addBtn.taskFilter = function(data) {
                    var pidFilter = [],
                        res = [];
                    return $.each(_this._tasks, function(k, v) {
                        k != 1 && k != 2 && k != 3 && k != 4 && $.each(v, function(id, task) {
                            pidFilter[task.pid] || (pidFilter[task.pid] = !0)
                        })
                    }), $.each(data, function(e) {
                        pidFilter[this.pid] || res.push(data[e])
                    }), res
                }, this.addBtn.init()), view.showLoading(), this
            },
            _addTask: function(d) {
                var tasks = this._tasks,
                    _this = this;
                return tasks[d.ty] || (tasks[d.ty] = {}), d.ty == 1 && tasks[d.ty][d.pid] || d.ty != 1 && tasks[d.ty][d.id] ? !1 : (d.pid < _TASK_PID_LIMIT && _this._mode != "anchor" ? d.ty == 1 ? (tasks[d.ty][d.pid] = (new CumulativeTask(_this.view.taskList, d, _this._socket)).init(), tasks[d.ty][d.pid].setProgressStatus(_this._isFans && _this._isShow), tasks[d.ty][d.pid].onReceiveChange = function(o, n) {
                    _this.onTaskReceiveChange(o, n)
                }) : d.ty == 2 && (tasks[d.ty][d.id] = (new SimpleTask(_this.view.taskList, d, _this._socket)).init(), tasks[d.ty][d.id].onReceiveChange = function(o, n) {
                    _this.onTaskReceiveChange(o, n)
                }) : d.pid >= _TASK_PID_LIMIT && _this.view.roomTaskList && (d.ty == 3 ? tasks[d.ty][d.id] = (new FHXYTask(_this.view.roomTaskList, d, _this._socket, _this._mode, _this._MY, _this._isFans)).init() : d.ty == 4 ? tasks[d.ty][d.id] = (new RoomTask(_this.view.roomTaskList, d, _this._socket, _this._mode)).init() : d.ty == 5 || d.ty == 6 || d.ty == 7 ? (tasks[d.ty][d.id] = (new OptionTask(_this.view.roomTaskList, d, _this._socket, _this._mode)).init(), tasks[d.ty][d.id].destroy = function() {
                    tasks[d.ty][d.id] = null, delete tasks[d.ty][d.id]
                }) : tasks[d.ty][d.id] = (new RoomTask(_this.view.roomTaskList, d, _this._socket, _this._mode, {
                    gift: !1
                })).init(), tasks[d.ty][d.id].onReceiveChange = function(o, n) {
                    _this.onTaskReceiveChange(o, n)
                }, tasks[d.ty][d.id].resetH = function() {
                    _this.resetH()
                }), this)
            },
            _initTaskData: function(data) {
                var _this = this;
                return this.view.hideLoading(), this.view.hideError(), $.each(this._tasks, function() {
                    $.each(this, function() {
                        this.remove()
                    })
                }), this._tasks = {}, $.each(data, function(e) {
                    var d = data[e];
                    _this._addTask(d)
                }), this._updateCount(), L.isLogin() && !this._isFans && this._mode != "anchor" ? this.view.showAttention() : this.view.hideAttention(), this.resetH(), this
            },
            _addTaskData: function(data) {
                var _this = this;
                this.view.hideLoading(), this.view.hideError(), $.each(data, function(e) {
                    var d = data[e];
                    _this._addTask(d)
                }), this._updateCount(), L.isLogin() && !this._isFans && this._mode != "anchor" ? this.view.showAttention() : this.view.hideAttention(), this.resetH()
            },
            _updateTaskData: function(data) {
                var task = null;
                return this._tasks[data.ty] ? (data.ty == 1 ? task = this._tasks[data.ty][data.pid] : data.ty == 2 ? task = this._tasks[data.ty][data.id] : task = this._tasks[data.ty][data.id], task && (task.update(data), this._updateCount()), this) : !1
            },
            _updateTaskState: function(data) {
                var task = null;
                if (data.ty == 1) return !1;
                if (!this._tasks[data.ty]) return !1;
                task = this._tasks[data.ty][data.id], task && task.updateState(data)
            },
            _updateCollectiveTask: function(data) {
                var task = null;
                if (data.ty == 1) return !1;
                if (!this._tasks[data.ty]) return !1;
                task = this._tasks[data.ty][data.id], task && task.updateCur(data)
            },
            _updateCount: function() {
                var complete = 0,
                    max = 0;
                $.each(this._tasks, function(type, v) {
                    type == 2 ? $.each(v, function() {
                        max += this.maxTime, complete += this.currentTime
                    }) : type == 1 && $.each(v, function() {
                        max += 1, this.currentTime >= this.maxTime && (complete += 1)
                    })
                }), this.view.setCount(complete, max)
            },
            _resetTask: function() {
                var tasks = this._tasks,
                    _this = this;
                return $.each(tasks, function(ty, d) {
                    $.each(d, function(k, t) {
                        t.reset(), ty == 1 && t.setProgressStatus(_this._isFans && _this._isShow)
                    })
                }), this.resetH(), this
            },
            _resetTaskByAttention: function() {
                var tasks = this._tasks,
                    _this = this;
                return $.each(tasks, function(ty, d) {
                    $.each(d, function(k, t) {
                        ty == 1 && t.setProgressStatus(_this._isFans && _this._isShow), ty != 1 && ty != 2 ? (ty == 3 && (t._isFans = !1), t.resetReceive()) : t.reset()
                    })
                }), this.resetH(), this
            },
            _recoverTaskByAttention: function() {
                var tasks = this._tasks,
                    _this = this;
                return $.each(tasks, function(ty, d) {
                    $.each(d, function(k, t) {
                        ty == 1 && t.setProgressStatus(_this._isFans && _this._isShow), ty == 3 && (t._isFans = !0, t.recover())
                    })
                }), this.resetH(), this
            },
            onTaskReceiveChange: function(o, n) {
                var count = 0;
                this._taskCount < 0 ? count = this.getCanReceiveCount() : (this._taskCount = this._taskCount + n - o, this._taskCount < 0 && (this._taskCount = 0), count = this._taskCount), this.onUpdate(count)
            },
            onUpdate: function(canReceiveCount) {},
            getCanReceiveCount: function() {
                var count = 0;
                return $.each(this._tasks, function(type, v) {
                    $.each(v, function() {
                        count += this.getReceiveTime()
                    })
                }), count
            },
            resetH: function() {},
            _setClearTimer: function(data) {
                this._dataCache.timer && (clearTimeout(this._dataCache.timer), this._dataCache.timer = null);
                var _this = this,
                    delayTime = data.toend * 1e3;
                return this._dataCache.timer = setTimeout(function() {
                    _this._resetTask(), _this._dataCache.timer = null, _this._setClearTimer({
                        toend: 86400
                    })
                }, delayTime), this
            },
            setIsShow: function(flag) {
                if (this._isShow != flag) {
                    var isFans = this._isFans;
                    this._isShow = flag, this._tasks[1] && $.each(this._tasks[1], function() {
                        this.setProgressStatus(isFans && flag)
                    })
                }
                return this
            },
            socketDailyTaskInit: function(body) {
                var _isFans = this._isFans;
                return this._isShow = !!body.iss, this._isFans = !!body.isf, body.data && body.data.length > 0 && this._addTaskData(body.data), this.addBtn && this.addBtn.loadTemp(body.tdate || []), body.toend && this._setClearTimer(body), _isFans && !this._isFans && this._resetTaskByAttention(), !_isFans && this._isFans && this._recoverTaskByAttention(), this
            },
            socketDailyTaskUpdate: function(body) {
                return this._updateTaskData(body), this
            },
            socketHotCircleUpdate: function(body) {
                this._tasks && this._tasks[3] && this._tasks[3][10001] && this._tasks[3][10001].updateGift(body)
            },
            socketCommunityCollectiveTaskStateUpdate: function(body) {
                this._updateTaskState(body)
            },
            socketCommunityCollectiveTaskUpdate: function(body) {
                this._updateCollectiveTask(body)
            },
            socketCommunityCollectiveTaskAdd: function(body) {
                this._addTask(body.data[0]), this._updateCount(), this.resetH()
            },
            socketCommunityCollectiveTaskDel: function(body) {
                this._tasks[body.ty] && this._tasks[body.ty][body.id] && this._tasks[body.ty][body.id].remove()
            }
        });
    exports.taskPanel = TaskPanel
}), define("COMMUNITY_TIP", ["JQ", "XM"], function(require, exports, module) {
    var $ = require("JQ"),
        X = require("XM"),
        RedTipView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.text = container.find(".text"), this.container = container, this.outerContainer.append(container), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-tips" style="display:none;">', '<div class="text"></div>', '<span class="arrow"></span>', "</div>"].join("");
                return html
            },
            setText: function(text) {
                return this.text.html(text), this
            },
            show: function() {
                return this.container.css("display", "block"), this
            },
            hide: function() {
                this.container.css("display", "none")
            }
        }),
        Tip = X.XM.extend({
            _constructor: function(option) {
                return this.textQueue = [], this._delaySec = 5e3, this._showTimer = null, this.view = new RedTipView(option.container), this
            },
            init: function() {
                return this.view.init(), this
            },
            show: function(text) {
                var _this = this;
                text && this.textQueue.push(text);
                if (!this._showTimer) {
                    var showText = this.textQueue.shift();
                    showText ? (this.view.setText(showText), this.view.show(), this._showTimer = setTimeout(function() {
                        _this._showTimer = null, _this.show()
                    }, this._delaySec)) : this.view.hide()
                }
            }
        });
    exports.redTip = Tip;
    var BlackTipView = RedTipView.extend({
            _createHTML: function() {
                var html = ['<div class="MR-community-black-tips" style="display:none;">', '<div class="text"></div>', '<span class="arrow"></span>', "</div>"].join("");
                return html
            }
        }),
        BlackTip = Tip.extend({
            _constructor: function(option) {
                return this.textQueue = [], this._delaySec = 3e3, this._showTimer = null, this.view = new BlackTipView(option.container), this
            }
        });
    exports.blackTip = BlackTip
}), define("COMMUNITY_REDPACK", ["JQ", "UTIL", "XM"], function(require, exports, module) {
    var $ = require("JQ"),
        U = require("UTIL"),
        X = require("XM"),
        HistoryModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            getData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "RecentRedpack",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取失败")
                    }
                })
            }
        }),
        HistoryView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this._timer = null, this._rollLength = 3, this._rollHeight = 40, this
            },
            init: function() {
                var container = $(this._createHTML());
                return this.historyList = container.find(".history-list"), this.container = container, this.outerContainer.append(container), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-redPack-history-container" style="display:none;">', '<ul class="history-list">', "</ul>", "</div>"].join("");
                return html
            },
            _createItem: function(data) {
                var html = ['<li class="item">', "<p>" + data.an + "发了" + U.toUnits(data.c) + "星币红包</p>", '<p class="info-line">' + data.t + '<i style="padding:0 5px;">/</i>' + '<span class="link" red-action="open-red-result" data-rid="' + data.r + '">查看结果</span></p>', "</li>"].join("");
                return html
            },
            appendData: function(arr) {
                var _this = this,
                    html = "";
                return this.stopRoll(), this.historyList.empty(), $.each(arr, function() {
                    html += _this._createItem(this)
                }), arr[0] && (html += _this._createItem(arr[0])), this.historyList.append(html), this.historyList.scrollTop(0), arr.length > 0 ? (this.container.css("display", "block"), arr.length > 1 && this.startRoll()) : this.container.css("display", "none"), this
            },
            rollNext: function() {
                this.historyList.stop(!0, !0);
                var stop = this.historyList.scrollTop();
                return stop >= this._rollLength * this._rollHeight ? (this.historyList.scrollTop(0), this.rollNext()) : this.historyList.animate({
                    scrollTop: stop + this._rollHeight
                }, 300), this
            },
            startRoll: function() {
                var _this = this;
                this._timer = setInterval(function() {
                    _this.rollNext()
                }, 5e3)
            },
            stopRoll: function() {
                this._timer && (clearInterval(this._timer), this._timer = null)
            }
        }),
        History = X.XM.extend({
            _constructor: function(option) {
                return this.module = new HistoryModule(option.socket), this.view = new HistoryView(option.container), this
            },
            init: function() {
                return this.module.init(), this.view.init(), this.update(), this
            },
            update: function() {
                var _this = this;
                this.module.getData(function(d) {
                    _this.view.appendData(d.rr)
                })
            }
        });
    exports.history = History;
    var Coffer = X.XM.extend({
        _constructor: function(option) {
            return this.view = {}, this.view.outerContainer = option.container, this._SOCKET = option.socket, this.price = 0, this.btnTimer = null, this._isShowing = option.show, this
        },
        init: function() {
            var _this = this;
            return this._initView(), this._getInitData(function(d) {
                !d.ap || _this._addBtn(), _this.upDatePrice(d.pc), _this.update(d.at, d.ct, d.e)
            }), this
        },
        _initView: function() {
            var html = ['<div class="MR-community-coffer-container">', '<h3 class="title">', '<span class="text" title="小金库">小金库</span>', '<span class="help" title="帮助">', '<span class="tips" style="display:none; left:-53px;"><span class="tips-inner">送金库礼物，丰富小金库，召唤播客或Lv.2管理员，发红包。<a href="/help/community/red-pack" target="_blank">[了解更多]</a></span></span>', "</span>", "</h3>", '<p class="price">0星币</p>', "</div>"].join("");
            this.view.container = $(html), this.view.price = this.view.container.find(".price"), this.view.outerContainer.append(this.view.container);
            var tipsTimer = null,
                tips = this.view.container.find(".tips"),
                helpIcon = this.view.container.find(".help"),
                showTips = function() {
                    tipsTimer && (clearTimeout(tipsTimer), tipsTimer = null), tips.css("display", "block")
                },
                hideTips = function() {
                    tipsTimer = setTimeout(function() {
                        tips.css("display", "none"), tipsTimer = null
                    }, 300)
                };
            return helpIcon.hover(function() {
                showTips()
            }, function() {
                hideTips()
            }), this
        },
        _addBtn: function() {
            var btn = $('<span class="btn-red btn">发红包</span>');
            return this.view.btn = btn, this.view.container.append(btn), this
        },
        setPrice: function(price) {
            return this.view.price.html(U.toUnits(price) + "星币").attr("title", price + "星币"), this.view.btn && this.view.btn.attr("data-price", price), this
        },
        setBtn: function(flag) {
            flag && this._isShowing ? (this.view.btn.removeClass("btn-disable"), this.view.btn.attr("red-action", "open-red-send"), this.view.btn.removeAttr("title")) : (this.view.btn.addClass("btn-disable"), this.view.btn.removeAttr("red-action"), this.view.btn.attr("title", "当前大家正在抢红包呢，别急着发新红包啦~")), this._isShowing || this.view.btn.attr("title", "直播期间，才能发红包哦~")
        },
        setIsShowing: function(flag) {
            flag = !!flag, this._isShowing = flag, this.view.btn && this.view.btn.length > 0 && (flag && !this.btnTimer ? this.setBtn(!0) : this.setBtn(!1))
        },
        upDatePrice: function(price) {
            return this.setPrice(price), this
        },
        update: function(startTime, sysTime, effectiveTime) {
            var _this = this;
            effectiveTime *= 1e3, this.btnTimer && (clearTimeout(this.btnTimer), this.btnTimer = null);
            if (this.view.btn && this.view.btn.length > 0)
                if (startTime == 0) this.setBtn(!0);
                else {
                    this.setBtn(!1);
                    var time = effectiveTime - (sysTime - startTime);
                    time > 0 ? this.btnTimer = setTimeout(function() {
                        _this.btnTimer = null, _this.setBtn(!0)
                    }, time) : this.setBtn(!0)
                }
            return this
        },
        _getInitData: function(done, error) {
            done = done || function() {}, error = error || function() {}, U.socketRequest({
                socket: this._SOCKET,
                methodName: "PondData",
                upData: {},
                downCallBack: function(d) {
                    d.cd == 0 ? done(d) : error(d.m)
                },
                overTimeCallBack: function() {
                    error("获取奖池失败")
                }
            })
        }
    });
    exports.coffer = Coffer
}), define("COMMUNITY_COLOR", ["XM", "JQ", "UTIL", "DIALOG"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        D = require("DIALOG"),
        CommunityColorModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            initData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "GroupColorInit",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取活跃头衔失败")
                    }
                })
            },
            update: function(id, done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "GroupColorUpdate",
                    upData: {
                        cur: id
                    },
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("更新活跃头衔失败")
                    }
                })
            }
        }),
        CommunityColorOptionView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                return this.container = $(this._createHTML()), this.panel = this.container.find(".color-panel"), this.outerContainer.append(this.container), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-color-container">', '<h3 class="title">', '<span class="text" title="社团色">社团色</span>', '<span class="help" title="帮助">', '<span class="tips" style="display:none; left:-53px;"><span class="tips-inner">社团色会影响多人任务完成时的动画效果</span></span>', "</h3>", '<ul class="color-panel clearfix">', '<li class="l-tips" style="text-align:center; color:#918e90;">加载中...</li>', "</ul>", "</div>"].join("");
                return html
            },
            addColor: function(colorData) {
                var html = "";
                return $.each(colorData, function() {
                    html += '<li class="color" data-cid="' + this.id + '" style="background-color:#' + this.color + '"></li>'
                }), this.panel.html(html), this
            },
            setCurrent: function(cid) {
                this.panel.children(".color").each(function() {
                    var c = $(this);
                    c.attr("data-cid") == cid ? c.addClass("color-cur") : c.removeClass("color-cur")
                })
            },
            setLoadingError: function(text) {
                return this.panel.find(".l-tips").text(text), this
            }
        }),
        CommunityColorUser = X.XM.extend({
            _constructor: function(option) {
                return this.module = new CommunityColorModule(option.socket), this.curColor = -1, this.colorData = [], this
            },
            init: function() {
                var _this = this;
                return this.module.initData(function(d) {
                    _this.colorData = d.color, _this.setCur(d.cur)
                }, function(e) {
                    _this.setCur(1)
                }), this
            },
            setCur: function(id) {
                return this.curColor = id, this
            },
            socketGroupColorChange: function(body) {
                this.setCur(body.cur)
            },
            getColorNum: function() {
                var res = null,
                    _this = this;
                return $.each(this.colorData, function() {
                    if (this.id == _this.curColor) return res = this.color, !1
                }), res && (res = "0x" + res), res
            }
        });
    exports.communityColorUser = CommunityColorUser;
    var CommunityColorAnchor = CommunityColorUser.extend({
        _constructor: function(option) {
            return CommunityColorAnchor._super._constructor.call(this, option), this.view = new CommunityColorOptionView(option.container), this.viewHasInit = !1, this.viewInitDeffer = $.Deferred(), this.dataInitDeffer = $.Deferred(), this
        },
        init: function() {
            var _this = this;
            return this.viewInitDeffer.done(function() {
                _this.viewHasInit = !0, _this.bindPickEvent()
            }), $.when(this.dataInitDeffer, this.viewInitDeffer).done(function(data) {
                _this.view.addColor(data), _this.resetH()
            }), this.module.initData(function(d) {
                _this.dataInitDeffer.resolve(d.color), _this.colorData = d.color, _this.setCur(d.cur)
            }, function(e) {
                _this.view.setLoadingError(e)
            }), this
        },
        initView: function() {
            this.view.init();
            var tipsTimer = null,
                tips = this.view.container.find(".tips"),
                helpIcon = this.view.container.find(".help"),
                showTips = function() {
                    tipsTimer && (clearTimeout(tipsTimer), tipsTimer = null), tips.css("display", "block")
                },
                hideTips = function() {
                    tipsTimer = setTimeout(function() {
                        tips.css("display", "none"), tipsTimer = null
                    }, 300)
                };
            return helpIcon.hover(function() {
                showTips()
            }, function() {
                hideTips()
            }), this.viewInitDeffer.resolve(), this
        },
        setCur: function(id) {
            var _this = this;
            return CommunityColorAnchor._super.setCur.call(this, id), $.when(this.dataInitDeffer, this.viewInitDeffer).done(function() {
                _this.view.setCurrent(id)
            }), this
        },
        resetH: function() {},
        bindPickEvent: function() {
            var panel = this.view.panel,
                _this = this;
            panel.on("click", ".color", function() {
                var _color = $(this);
                if (_color.hasClass("color-cur")) return !1;
                if (panel.hasClass("sending")) return !1;
                var id = _color.attr("data-cid");
                id && D.confirm("多人任务完成时的动画效果<br/>将使用新的社团色", function(flag) {
                    flag && (panel.addClass("sending"), _this.module.update(id, function(d) {
                        D.alert(d.m)
                    }, function() {
                        panel.removeClass("sending")
                    }, function(e) {
                        D.alert(e)
                    }))
                })
            })
        }
    });
    exports.communityColor = CommunityColorAnchor
}), define("COMMUNITY_RING", ["XM", "JQ", "UTIL", "POPTIP", "LOGIN", "DIALOG"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        POPTIP = require("POPTIP"),
        L = require("LOGIN"),
        D = require("DIALOG");

    function popText(node, text) {
        if (!text) return !1;
        node = $(node);
        if (node.length == 0) return !1;
        var html = $('<span style="position:absolute; left:0; top:10px; width:220px; text-align:center; height:20px; line-height:20px; font-size:18px; font-weight:800; color:#d6417c;">' + text + "</span>");
        return node.append(html), html.animate({
            top: -30,
            fontSize: "16px",
            opacity: .5
        }, 500, function() {
            html.remove()
        }), this
    }

    function errorText(node, text, color) {
        if (!text) return !1;
        node = $(node);
        if (node.length == 0) return !1;
        var html = $('<span style="position:absolute; left:-34px; top:10px; width:140px; text-align:center; height:20px; line-height:20px; color:#f6bb41;">' + text + "</span>");
        return node.append(html), html.animate({
            top: -30,
            fontSize: "16px",
            opacity: .5
        }, 500, function() {
            html.remove()
        }), this
    }
    var RingModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            initData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "HotCircleInit",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("获取热情环数据失败")
                    }
                })
            },
            receive: function(done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "HotCircleTake",
                    upData: {},
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("领取失败,请重试")
                    }
                })
            },
            buy: function(done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "BuyEnthusiasm",
                    upData: {},
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("购买失败,请重试")
                    }
                })
            },
            send: function(done, complete, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "HotCircleSend",
                    upData: {},
                    downCallBack: function(d) {
                        complete(), d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        complete(), error("赠送失败,请重试")
                    }
                })
            }
        }),
        RingView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                this.container = $(this._createHTML()), this.tips = this.container.find(".tips"), this.loadingTips = this.container.find(".loading-tips"), this.icon = this.container.find(".icon-img"), this.count = this.container.find(".count"), this.recBtn = this.container.find(".rec-btn"), this.outerContainer.append(this.container);
                var tipsTimer = null,
                    tips = this.container.find(".tips"),
                    helpIcon = this.container.find(".help"),
                    showTips = function() {
                        tipsTimer && (clearTimeout(tipsTimer), tipsTimer = null), tips.css("display", "block")
                    },
                    hideTips = function() {
                        tipsTimer = setTimeout(function() {
                            tips.css("display", "none"), tipsTimer = null
                        }, 300)
                    };
                return helpIcon.hover(function() {
                    showTips()
                }, function() {
                    hideTips()
                }), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-ring-container">', '<h3 class="title">', '<span class="text" title="热情环">热情环</span>', '<span class="help" title="帮助">', '<span class="tips" style="display:none; left:-54px;">', '<span class="tips-inner">活跃等级越高，每日免费领取的热情环就越多。<a href="/help/community/community-enthusiasm" class="link" target="_blank">[详细说明]</a></span>', "</span>", "</span>", "</h3>", '<p class="count" style="display:none;">我的热情环：<span class="count-num">0</span></p>', '<p class="loading-tips">正在为您努力加载</p>', '<div class="icon-img"><img src="http://static.youku.com/ddshow/img/community/ring.png" /></div>', '<span class="rec-btn btn-red btn-disable">领取<span class="rec-count">0</span>个热情环</span>', "</div>"].join("");
                return html
            },
            setCount: function(count) {
                return this.count.find(".count-num").text(count), this
            },
            recDisable: function(c, tomorrow) {
                this.recBtn.addClass("btn-disable");
                var count = this.recBtn.find(".rec-count").text();
                return c && (count = c), tomorrow ? this.recBtn.html('明日可领取<span class="rec-count">' + count + "</span>个") : this.recBtn.html('今日可领取<span class="rec-count">' + count + "</span>个"), this
            },
            recEnable: function(c) {
                this.recBtn.removeClass("btn-disable");
                var count = this.recBtn.find(".rec-count").text();
                return c && (count = c), this.recBtn.html('领取<span class="rec-count">' + count + "</span>个热情环"), this
            },
            showTip: function(text) {
                return text && this.loadingTips.text(text), this.loadingTips.css("display", "block"), this.count.css("display", "none"), this
            },
            hideTip: function() {
                return this.loadingTips.css("display", "none"), this.count.css("display", "block"), this
            }
        }),
        Ring = X.XM.extend({
            _constructor: function(o) {
                return this.module = new RingModule(o.socket), this.view = new RingView(o.container), this._timer = null, this._count = 0, this._sumCount = 0, this._canRec = !1, this
            },
            init: function() {
                var _this = this;
                return this.view.init(), this.view.showTip("正在为您努力加载..."), this.module.initData(function(d) {
                    _this.update(d), _this._openTimer(d.toend)
                }, function(e) {
                    _this.view.showTip(e)
                }), this._bindRecEvent(), this
            },
            _openTimer: function(time) {
                this._timer && (clearTimeout(this._timer), this._timer = null);
                var _this = this,
                    delayTime = time * 1e3,
                    count = _this._count;
                return this._timer = setTimeout(function() {
                    _this._canRec && _this.view.recEnable(count), _this._timer = null, _this._openTimer(86400)
                }, delayTime), this
            },
            update: function(d) {
                if (!d.a) this.view.showTip("关注主播后可领取每日免费热情环"), this.view.recDisable(d.c);
                else if (!d.l) this.view.showTip(d.msg), this.view.recDisable(d.c);
                else {
                    this.view.hideTip();
                    if (d.o == 1 && this._sumCount > d.t || d.o != 1) this._sumCount = d.t, this.view.setCount(d.t);
                    d.f ? this.view.recDisable(d.c, !0) : this.view.recEnable(d.c)
                }
                return this._count = d.c, this._canRec = d.a && d.l, this
            },
            _bindRecEvent: function() {
                var _this = this;
                return this.view.recBtn.on("click", function() {
                    var _btn = $(this),
                        pop = _this.view.icon;
                    if (_btn.hasClass("disable")) return popText(pop, "不要点太快哦"), !1;
                    if (_btn.hasClass("btn-disable")) return !1;
                    _btn.addClass("disable"), _this.module.receive(function(d) {
                        popText(pop, d.c)
                    }, function() {
                        _btn.removeClass("disable")
                    }, function(e) {
                        popText(pop, e)
                    })
                }), this
            },
            socketHotCircleUpdate: function(body) {
                return this.update(body), this
            }
        });
    exports.ring = Ring;
    var SenderView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContaier = container, this.popTip = null, this.buyTip = null, this
            },
            init: function() {
                var html = $(this._createHTML());
                return this.freeSend = html.find(".sender").eq(0), this.send = html.find(".sender").eq(1), this.container = html, this.outerContaier.append(this.container), this.popTip = (new POPTIP({
                    elem: this.freeSend,
                    autoDisplay: !1,
                    left: 44,
                    top: 0
                })).init(), this.buyTip = (new POPTIP({
                    elem: this.send,
                    autoDisplay: !1,
                    left: 44,
                    top: 0
                })).init(), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-ring-sender-container clearfix">', '<div class="sender C-fl">', '<span class="icon"><img src="http://static.youku.com/ddshow/img/community/ring.png" /></span>', '<span class="name">热情环</span>', '<span class="rec">热情度+1</span>', "</div>", '<div class="sender C-fr">', '<span class="icon"><img src="http://static.youku.com/ddshow/img/community/ring.png" /></span>', '<span class="name">500星币</span>', '<span class="rec">热情度+1</span>', "</div>", "</div>"].join("");
                return html
            },
            show: function() {
                return this.container.css("display", "block"), this
            },
            hide: function() {
                return this.container.css("display", "none"), this
            },
            setCount: function(count) {
                this.popTip && this.popTip.setNum(count), count && count > 0 ? this.freeSend.removeClass("empty").find(".icon").html('<img src="http://static.youku.com/ddshow/img/community/ring.png" />') : this.freeSend.addClass("empty").find(".icon").html('<img src="http://static.youku.com/ddshow/img/community/ring_g.png" />')
            },
            setBuyCount: function(count) {
                this.buyTip && this.buyTip.setNum(count), count && count > 0 ? this.send.removeClass("empty").find(".icon").html('<img src="http://static.youku.com/ddshow/img/community/ring.png" />') : this.send.addClass("empty").find(".icon").html('<img src="http://static.youku.com/ddshow/img/community/ring_g.png" />')
            }
        }),
        Sender = X.XM.extend({
            _constructor: function(o) {
                return this.module = new RingModule(o.socket), this.view = new SenderView(o.container), this._count = 0, this._payCount = 0, this._price = 0, this
            },
            init: function() {
                var _this = this;
                return this.module.init(), this.view.init(), this.module.initData(function(d) {
                    _this.update(d)
                }, function() {}), this._bindSenderEvent(), this
            },
            update: function(d) {
                !!d.a && !!d.l && (d.o == 1 && this._count > d.t || d.o != 1) && (this._count = d.t), d.pc > -1 && (this._payCount = d.pc), d.p > 0 && (this._price = d.p), this.view.setCount(this._count), this.view.setBuyCount(this._payCount)
            },
            show: function() {
                this.view.show()
            },
            hide: function() {
                this.view.hide()
            },
            socketHotCircleUpdate: function(body) {
                return this.update(body), this
            },
            _bindSenderEvent: function() {
                var _this = this;
                return _this.view.send.on("click", ".icon", function() {
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    if (!L.isLogin()) return L.dialogLogin(), !1;
                    if (_this._price > 0 && !_this.enoughBalance(_this._price)) return errorText(_btn, "余额不足"), !1;
                    if (!_this._payCount || _this._payCount <= 0) return !1;
                    _btn.addClass("disable"), _this.module.buy(function(d) {
                        _this.reduceBalance(_this._price), errorText(_btn, "热情度+1")
                    }, function() {
                        _btn.removeClass("disable")
                    }, function(e) {
                        errorText(_btn, e)
                    })
                }), _this.view.freeSend.on("click", ".icon", function() {
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    if (!L.isLogin()) return L.dialogLogin(), !1;
                    if (_this._count <= 0) return !1;
                    _btn.addClass("disable"), _this.module.send(function(d) {
                        errorText(_btn, "热情度+1")
                    }, function() {
                        _btn.removeClass("disable")
                    }, function(e) {
                        errorText(_btn, e)
                    })
                }), this
            },
            enoughBalance: function() {
                return !0
            },
            reduceBalance: function() {}
        });
    exports.sender = Sender
}), define("COMMUNITY_LEVEL", ["XM", "JQ", "UTIL"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        _MEDAL_DATA = window.DDS.medal,
        LevelModule = X.XM.extend({
            _constructor: function(socket) {
                return this.socket = socket, this
            },
            getInitData: function(done, error) {
                done = done || function() {}, error = error || function() {}, U.socketRequest({
                    socket: this.socket,
                    methodName: "CommunityLevelGet",
                    upData: {},
                    downCallBack: function(d) {
                        d.cd == 0 ? done(d) : error(d.m)
                    },
                    overTimeCallBack: function() {
                        error("初始化失败,请刷新重试")
                    }
                })
            }
        }),
        LevelView = X.XM.extend({
            _constructor: function(container) {
                return this.outerContainer = container, this
            },
            init: function() {
                return this.container = $(this._createHTML()), this.level = this.container.find(".level"), this.expCur = this.container.find(".exp .hl"), this.expSum = this.container.find(".exp .sum"), this.activeLevel = this.container.find(".people .icon"), this.activeCur = this.container.find(".people .hl"), this.activeSum = this.container.find(".people .sum"), this.outerContainer.append(this.container), this
            },
            _createHTML: function() {
                var html = ['<div class="MR-community-c-level-container">', '<h3 class="title">', '<span class="text" title="社团等级">社团等级</span>', '<span class="help" title="帮助">', '<span class="tips" style="display:none; left:-67px;"><span class="tips-inner">社团等级与升级需要的活跃Lv.3用户数会在第二天更新。<a href="/help/community/community-level" target="_blank">[了解更多]</a></span></span>', "</span>", "</h3>", '<p class="line level"><span class="l-icon"><img src="http://static.youku.com/ddshow/img/community/level.png" /></span>获取中...</p>', '<p class="line exp">升级需荣誉值：<span class="hl">--</span>/<span class="sum">--</span></p>', '<p class="line people">升级需', '<span class="icon">0</span>', '及以上用户：<span class="hl">--</span>/<span class="sum">--</span>人</p>', "</div>"].join("");
                return html
            },
            setLevel: function(level) {
                this.level.html('<span class="l-icon"><img src="http://static.youku.com/ddshow/img/community/level.png" /></span>Lv.' + level)
            },
            setActiveLevel: function(level, mid) {
                var data = _MEDAL_DATA[mid];
                return data ? (data = data.medalUrl, data = '<img src="' + data + '" / alt="lv' + level + '" />') : data = "Lv" + Level, this.activeLevel.html(data), this
            },
            setExpCur: function(cur) {
                this.expCur.html(cur)
            },
            setExpSum: function(sum) {
                this.expSum.html(sum)
            },
            setActiveCur: function(cur) {
                this.activeCur.html(cur)
            },
            setActiveSum: function(sum) {
                this.activeSum.html(sum)
            }
        }),
        Level = X.XM.extend({
            _constructor: function(o) {
                return this.module = new LevelModule(o.socket), this.view = new LevelView(o.container), this
            },
            init: function() {
                var _this = this,
                    v = this.view;
                return this.initView(), this.module.init(), this.module.getInitData(function(d) {
                    v.setLevel(d.l), v.setExpCur(d.exp), v.setExpSum(d.nexp), v.setActiveLevel(d.pal, d.pami), v.setActiveCur(d.p), v.setActiveSum(d.np)
                }, function(e) {
                    v.level.html(e)
                }), this
            },
            initView: function() {
                this.view.init();
                var tipsTimer = null,
                    tips = this.view.container.find(".tips"),
                    helpIcon = this.view.container.find(".help"),
                    showTips = function() {
                        tipsTimer && (clearTimeout(tipsTimer), tipsTimer = null), tips.css("display", "block")
                    },
                    hideTips = function() {
                        tipsTimer = setTimeout(function() {
                            tips.css("display", "none"), tipsTimer = null
                        }, 300)
                    };
                return helpIcon.hover(function() {
                    showTips()
                }, function() {
                    hideTips()
                }), this
            },
            socketCommunityExpUpdate: function(body) {
                return this.view.setExpCur(body.exp), this
            }
        });
    exports.level = Level
}), define("CONTROLS_COMMUNITY_PANEL", ["XM", "JQ", "LOGIN", "UTIL", "COMMUNITY_MY", "COMMUNITY_TIP", "COMMUNITY_REDPACK", "COMMUNITY_RING", "COMMUNITY_TASK", "COMMUNITY_COLOR", "COMMUNITY_NOTICE", "COMMUNITY_TITLES", "SCROLL", "COMMUNITY_LEVEL"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        L = require("LOGIN"),
        U = require("UTIL"),
        MY = require("COMMUNITY_MY"),
        TIP = require("COMMUNITY_TIP"),
        RED = require("COMMUNITY_REDPACK"),
        RING = require("COMMUNITY_RING"),
        TASK = require("COMMUNITY_TASK"),
        COLOR = require("COMMUNITY_COLOR"),
        NOTICE = require("COMMUNITY_NOTICE"),
        TITLES = require("COMMUNITY_TITLES"),
        SCROLL = require("SCROLL"),
        C_LEVEL = require("COMMUNITY_LEVEL"),
        _INNER_DDS = window.DDS,
        _MEDAL_DATA = window.DDS.medal,
        RoomPanel_View = X.XM.extend({
            _constructor: function(outerContainer) {
                return this.outerContainer = outerContainer, this._otherHeight = 494, this._maxHeight = 246, this._minHeight = 166, this
            },
            init: function(isAnchor) {
                var container = $(this._createHTML(isAnchor));
                return this.tabTitle = container.find(".tab-titles"), this.tabTitleList = container.find(".tab-titles .item"), this.tabContentContainer = container.find(".tab-content-container"), this.tabContentListContainer = container.find(".tab-content-list"), this.tabContentList = container.find(".tab-content"), this.tabScrollBar = container.find(".tab-scroll-bar"), this.container = container, this.outerContainer.append(container), this.scroll = SCROLL.scroll({
                    Ele_panel: this.tabContentListContainer,
                    Ele_scroll: this.tabScrollBar
                }), this.scroll.init(), this._bindResize(), this.scroll.setHeight(this._getHeight()), this
            },
            _createHTML: function(isAnchor) {
                var html = ['<div class="MR-community-container">', '<ul class="tab-titles clearfix">', '<li class="item">任务', isAnchor && "设置", '<i class="red-point"></i></li>', '<li class="item">社团<i class="red-point"></i></li>', '<li class="item item-last">我<i class="red-point"></i></li>', "</ul>", '<div class="tab-content-container">', '<div class="tab-content-list">', '<div class="tab-content"></div>', '<div class="tab-content"></div>', '<div class="tab-content"></div>', "</div>", "</div>", '<div class="tab-scroll-bar"></div>', "</div>"].join("");
                return html
            },
            addLogin: function() {
                var html = ['<div class="top-tip">', '<span class="btn-login btn-block btn-blue">登录，开启你的社团生活</span>', "</div>"].join("");
                return html = $(html), html.on("click", ".btn-login", function() {
                    L.dialogLogin()
                }), this.tabContentListContainer.prepend(html), this.scroll.resetH(), this
            },
            showTabByIndex: function(index) {
                return this.tabTitleList.removeClass("cur").eq(index).addClass("cur"), this.tabContentList.css("display", "none").eq(index).css("display", "block"), this.scroll.resetH(), this
            },
            showPointByTitleIndex: function(index) {
                return this.tabTitleList.eq(index).find(".red-point").css("display", "block"), this
            },
            hidePointByTitleIndex: function(index) {
                return this.tabTitleList.eq(index).find(".red-point").css("display", "none"), this
            },
            _getHeight: function() {
                var h = $(window).height();
                return h -= this._otherHeight, h >= this._maxHeight && (h = this._maxHeight), h <= this._minHeight && (h = this._minHeight), h
            },
            _bindResize: function() {
                var _this = this,
                    _timer = null;
                return $(window).on("resize", function(e) {
                    _timer && clearTimeout(_timer), _timer = setTimeout(function() {
                        _timer = null, _this.scroll.setHeight(_this._getHeight())
                    }, 100)
                }), this
            },
            resetH: function() {
                return this.scroll.resetH()
            }
        }),
        RoomPanel = X.XM.extend({
            _constructor: function(option) {
                return this.view = new RoomPanel_View(option.container), this._roomId = option.roomId, this._SOCKET = option.socket, this._isAnchor = option.isAnchor, this._isAdmin = option.manage, this._guardCookieName = "xm_room_community_guard", this._show = window.DDS.baseInfo.isShowing, this._MY = option.my, this
            },
            init: function() {
                var view = this.view.init(this._isAnchor);
                return L.isLogin() || view.addLogin(), this.TASK_INDEX = 0, this.CUMMUNITY_INDEX = 1, this.MY_INDEX = 2, this._isAnchor ? this.loadCommunityColorAnchor() : this.loadCommunityColorUser(), this.showTask(), this.loadTips(), this._bindEvent(), this
            },
            loadTips: function() {
                return this.redTip = new TIP.redTip({
                    container: this.view.tabTitleList.eq(this.CUMMUNITY_INDEX)
                }), this.redTip.init(), U.getCookie(this._guardCookieName) || (this.redTip.show('<p style="height:32px; line-height:32px"><img src="http://static.youku.com/ddshow/img/community/guard.png" /></p>'), U.setCookie(this._guardCookieName, "show", 5256e3, "/", U.hosts.shortHost)), this.blackTip = new TIP.blackTip({
                    container: this.view.tabTitleList.eq(this.MY_INDEX)
                }), this.blackTip.init(), this
            },
            loadTask: function() {
                var _this = this;
                return this.taskPanel = new TASK.taskPanel({
                    container: this.view.tabContentList.eq(this.TASK_INDEX),
                    socket: this._SOCKET,
                    my: this._MY
                }), this._isAdmin ? this.taskPanel._mode = "admin" : this._isAnchor ? this.taskPanel._mode = "anchor" : this.taskPanel._mode = "user", this.taskPanel.resetH = function() {
                    _this.view.resetH()
                }, this.taskPanel.onUpdate = function(canReceiveCount) {
                    canReceiveCount > 0 ? _this.view.showPointByTitleIndex(_this.TASK_INDEX) : _this.view.hidePointByTitleIndex(_this.TASK_INDEX)
                }, this.taskPanel.init(), this
            },
            loadCommunityNotice: function() {
                return this.communityNotice = new NOTICE.communityNotice({
                    container: this.view.tabContentList.eq(this.CUMMUNITY_INDEX),
                    socket: this._SOCKET
                }), this.communityNotice.init(), this
            },
            loadCommunityTitles: function() {
                this.communityTitles = new TITLES.communityTitles({
                    container: this.view.tabContentList.eq(this.CUMMUNITY_INDEX),
                    socket: this._SOCKET
                }), this.communityTitles.init()
            },
            loadCommunityLevel: function() {
                this.communityLevel = new C_LEVEL.level({
                    container: this.view.tabContentList.eq(this.CUMMUNITY_INDEX),
                    socket: this._SOCKET
                }), this.communityLevel.init()
            },
            loadCommunityColorAnchor: function() {
                var _this = this;
                this.communityColor = new COLOR.communityColor({
                    container: this.view.tabContentList.eq(this.CUMMUNITY_INDEX),
                    socket: this._SOCKET
                }), this.communityColor.resetH = function() {
                    _this.view.resetH()
                }, this.communityColor.init()
            },
            loadCommunityColorUser: function() {
                this.communityColor = new COLOR.communityColorUser({
                    socket: this._SOCKET
                }), this.communityColor.init()
            },
            loadCoffer: function() {
                this.coffer = new RED.coffer({
                    container: this.view.tabContentList.eq(this.CUMMUNITY_INDEX),
                    socket: this._SOCKET,
                    show: this._show
                }), this.coffer.init()
            },
            ladRedPackHistory: function() {
                this.redPackHistory = new RED.history({
                    container: this.view.tabContentList.eq(this.CUMMUNITY_INDEX),
                    socket: this._SOCKET
                }), this.redPackHistory.init()
            },
            loadMyLevel: function() {
                this.myLevel = new MY.level({
                    container: this.view.tabContentList.eq(this.MY_INDEX),
                    socket: this._SOCKET
                }), this.myLevel.init()
            },
            loadMyRing: function() {
                this.myRing = new RING.ring({
                    container: this.view.tabContentList.eq(this.MY_INDEX),
                    socket: this._SOCKET
                }), this.myRing.init()
            },
            loadMyRedPack: function() {
                this.myRedPack = new MY.redPack({
                    container: this.view.tabContentList.eq(this.MY_INDEX),
                    socket: this._SOCKET
                }), this.myRedPack.init()
            },
            showTask: function() {
                return this.taskPanel || this.loadTask(), this.view.showTabByIndex(this.TASK_INDEX), this
            },
            showCommunity: function() {
                return this.communityNotice || this.loadCommunityNotice(), this.communityLevel || this.loadCommunityLevel(), this.coffer || this.loadCoffer(), this.redPackHistory || this.ladRedPackHistory(), this.communityTitles || this.loadCommunityTitles(), this._isAnchor && !this.communityColor.viewHasInit && this.communityColor.initView(), this.view.showTabByIndex(this.CUMMUNITY_INDEX), this
            },
            showMySelf: function() {
                return !this.myLevel && !this._isAnchor && this.loadMyLevel(), !this._isAnchor && !this.myRing && this.loadMyRing(), this.myRedPack || this.loadMyRedPack(), this.view.showTabByIndex(this.MY_INDEX), this
            },
            _bindEvent: function() {
                var view = this.view,
                    _this = this;
                view.tabTitleList.each(function(e) {
                    $(this).on("click", function() {
                        e == _this.TASK_INDEX ? _this.showTask() : e == _this.CUMMUNITY_INDEX ? _this.showCommunity() : e == _this.MY_INDEX && _this.showMySelf()
                    })
                })
            },
            socketDailyTaskInit: function(body) {
                return this.taskPanel && this.taskPanel.socketDailyTaskInit(body), this
            },
            socketDailyTaskUpdate: function(body) {
                return this.taskPanel && this.taskPanel.socketDailyTaskUpdate(body), this
            },
            socketCommunityNoticeUpdate: function(body) {
                return this.communityNotice && this.communityNotice.socketCommunityNoticeUpdate(body), this
            },
            socketActiveStageUpdate: function(body) {
                return this.communityTitles && this.communityTitles.socketActiveStageUpdate(body), this
            },
            socketGoldExpUpdate: function(body) {
                this.myLevel && this.myLevel.socketActiveStageUpdate(body);
                if (body.ulb < body.ul) {
                    var medal = _MEDAL_DATA[body.mi];
                    if (this.blackTip && medal) {
                        var text = '您已升至<img class="icon" alt="' + medal.name + '" title="' + medal.name + '" src="' + medal.medalUrl + '" />';
                        this.blackTip.show(text)
                    }
                }
                return this
            },
            socketGoldRoomUpdate: function(body) {
                var medal = _MEDAL_DATA[body.mi];
                if (this.redTip && medal) {
                    var text = "恭喜！" + body.nn + ' 荣升<img class="icon" alt="' + medal.name + '" title="' + medal.name + '" src="' + medal.medalUrl + '" />';
                    this.redTip.show(text)
                }
                return this
            },
            socketActiveLevelUpdate: function(body) {
                this.myLevel && this.myLevel.socketActiveLevelUpdate(body);
                if (body.ulb < body.ul) {
                    var medal = _MEDAL_DATA[body.mi];
                    if (this.blackTip && medal) {
                        var text = '您已升至<img class="icon" alt="' + medal.name + '" title="' + medal.name + '" src="' + medal.medalUrl + '" />';
                        this.blackTip.show(text)
                    }
                }
                return this
            },
            socketGrabedRedpack: function(body) {
                return this.myRedPack && body.u == _INNER_DDS.userInfo.userId && this.myRedPack.add(1, body.c), this
            },
            socketRedpackPickedUp: function(body) {
                return this.redPackHistory && this.redPackHistory.update(), this.coffer && this.coffer.update(0, 0, 0), this
            },
            socketAssignRedpack: function(body) {
                return this.coffer && this.coffer.update(body.at, body.ct, body.e), this.coffer && this.coffer.upDatePrice(body.rc), this
            },
            socketRedpackOverdue: function(body) {
                this.coffer && this.coffer.update(0, 0, 0), this.coffer && this.coffer.upDatePrice(body.rc)
            },
            socketPondRemainChange: function(body) {
                this.coffer && this.coffer.upDatePrice(body.rc)
            },
            socketFlashInfo: function(body) {
                var flag = body.m == "start";
                this.coffer && this.coffer.setIsShowing(flag), this.taskPanel && this.taskPanel.setIsShow(flag), this._show = flag
            },
            socketGroupColorChange: function(body) {
                this.communityColor && this.communityColor.socketGroupColorChange(body)
            },
            socketHotCircleUpdate: function(body) {
                this.myRing && this.myRing.socketHotCircleUpdate(body), this.taskPanel && this.taskPanel.socketHotCircleUpdate(body)
            },
            socketCommunityCollectiveTaskStateUpdate: function(body) {
                this.taskPanel && this.taskPanel.socketCommunityCollectiveTaskStateUpdate(body), body.s == 1 && this.redTip.show(body.im.split("|")[1] + "任务开启了!");
                if (body.s == 2 && !window.CLOSE_FLASH_EFFECT && this.communityColor && this.taskPanel._tasks && this.taskPanel._tasks[body.ty] && this.taskPanel._tasks[body.ty][body.id] && $("#ddshowGifter")[0]) {
                    var color = this.communityColor.getColorNum(),
                        tName = this.taskPanel._tasks[body.ty][body.id].name,
                        users = body.u;
                    color && tName && users.length > 0 && ($("#LF-gift-container").addClass("MR-gift-flash-show"), $("#ddshowGifter")[0].jsCallTaskEffect({
                        taskColor: color,
                        taskName: tName,
                        localName: "",
                        localHeadImg: "",
                        users: users
                    }))
                }
            },
            socketCommunityExpUpdate: function(body) {
                this.communityLevel && this.communityLevel.socketCommunityExpUpdate(body), this.redTip && this.redTip.show("社团荣誉值+" + body.inc)
            },
            socketCommunityCollectiveTaskUpdate: function(body) {
                this.taskPanel && this.taskPanel.socketCommunityCollectiveTaskUpdate(body)
            },
            socketCommunityCollectiveTaskAdd: function(body) {
                this.taskPanel && this.taskPanel.socketCommunityCollectiveTaskAdd(body)
            },
            socketCommunityCollectiveTaskDel: function(body) {
                this.taskPanel && this.taskPanel.socketCommunityCollectiveTaskDel(body)
            }
        });
    module.exports = RoomPanel
}), define("CONTROLS_ABOUT", ["JQ", "UTIL", "WIDGETS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        about = function(options) {
            var setting = $.extend({}, {
                views: null,
                socket: null,
                container: null,
                anchorWeekStarGiftMedal: [],
                attionTitle: "关注数：",
                anchorMedal: [],
                data: null,
                isEdit: !1,
                starToggle: !1,
                is_simple: !1
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    about.prototype = {
        init: function() {
            this.starsNum = this.data.anchorInfo.anchorStarNum, this.dom = new this.views({
                container: this.container,
                data: this.data.anchorInfo,
                attionTitle: this.attionTitle,
                anchorWeekStarGiftMedal: this.anchorWeekStarGiftMedal,
                anchorMedal: this.anchorMedal,
                isEdit: this.isEdit,
                is_simple: this.is_simple
            }), this.dom.init(), this.createGradeProgress(), this.createAttion(), this.updateFansTitle(this.data.anchorInfo.anchorFansNum)
        },
        showStarTip: function() {
            var cookieName = DDS.userInfo.userId + "_dui_tips",
                tipNum = Util.getCookie(cookieName);
            if (tipNum == 1) return;
            this.starToggle && this.dom.showStarTip(), tipNum = 1, Util.setCookie(cookieName, tipNum)
        },
        createGradeProgress: function() {
            if (!this.dom.gradeProgress) return;
            this.douProg = Widgets.Progress({
                container: this.dom.gradeProgress
            }), this.douProg.init(), this.douProg.levelProg({
                hasbeans: this.data.anchorInfo.anchorHadBeans,
                needbeans: this.data.anchorInfo.anchorNeedBeans,
                level: this.data.anchorInfo.anchorLevel
            })
        },
        createAttion: function() {
            Widgets.Attention({
                container: this.dom.attention,
                socket: this.socket,
                defaultState: this.data.userInfo.isAttention,
                anchorId: this.data.anchorInfo.anchorId,
                model: 2
            }).init()
        },
        updateSign: function(msg) {
            this.is_simple || this.dom.updateSign(msg)
        },
        updateFansTitle: function(sum) {
            if (!this.dom.gradeProgress) return;
            var level = Util.getFansSum(sum).mark - 1;
            this.dom.updateFansTitle(level)
        },
        updateStarNum: function(num) {
            var _num = num ? num : 1;
            this.starsNum += _num, this.dom.updateStarNum(this.starsNum)
        },
        updateGradeProgress: function(args) {
            !this.is_simple && this.douProg && (this.douProg.levelProg(args), this.dom.updateLevel(args.level)), $.isFunction(this.dom.updateNeedStar) && this.dom.updateNeedStar(args)
        },
        updateFansNum: function(num) {
            this.dom.updateFansNum(num)
        },
        smallAbout: function() {
            this.dom.smallAbout()
        },
        bigAbout: function() {
            this.dom.bigAbout()
        }
    }, module.exports = about
}), define("VIEWS_MOREGIFT", ["JQ", "STATUS", "UTIL", "DIALOG"], function(require, exports, module) {
    var $ = require("JQ"),
        Status = require("STATUS"),
        Util = require("UTIL"),
        Dialog = require("DIALOG"),
        moregift = function(options) {
            var setting = $.extend({}, {
                container: null,
                data: null,
                gift_data: null,
                config: [{
                    name: "10",
                    num: 10,
                    classes: "10",
                    title: "十全十美"
                }, {
                    name: "66",
                    num: 66,
                    classes: "66",
                    title: "顺顺利利"
                }, {
                    name: "99",
                    num: 99,
                    classes: "99",
                    title: "长长久久"
                }, {
                    name: "188",
                    num: 188,
                    classes: "188",
                    title: "要抱抱"
                }, {
                    name: "520",
                    num: 520,
                    classes: "520",
                    title: "我爱你"
                }, {
                    name: "1314",
                    num: 1314,
                    classes: "1314",
                    title: "一生一世"
                }, {
                    name: "3344",
                    num: 3344,
                    classes: "3344",
                    title: "生生世世"
                }],
                isSelect: !1,
                showCustom: !1,
                roomCustomNum: null
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    moregift.prototype = {
        init: function() {
            this.createDom(), this.createSelects(), this.addEvent(), this.showCustom && this.customGift()
        },
        createDom: function() {
            var _this = this;
            this.showCustom && (this.customBtn = $('<a class="BTN-num-custom">数量定制</a>')), this.numComp = $('<div class="num-group"><span class="num-name">数量</span></div>'), this.selectGroup = $('<div class="select-group"></div>'), this.numInput = $('<input type="text" class="num-input" value="1"/>'), this.select = $('<a class="numselect-btn"></a>'), this.selectBox = $('<div class="select-box"><div class="select-list-con"><ul class="select-list"></ul></div><div class="select-tip"></div></div>'), this.sendBtn = $('<a class="send-btn">赠送</a>'), this.selectGroup.append(this.numInput), this.selectGroup.append(this.select), this.selectGroup.append(this.selectBox), this.numComp.append(this.selectGroup), this.customBtn && this.container.append(this.customBtn), this.container.append(this.numComp), this.container.append(this.sendBtn), this.selectlist = this.selectBox.find(".select-list"), this.selecttip = this.selectBox.find(".select-tip")
        },
        createSelects: function() {
            var _this = this,
                i = 0,
                len = this.config.length - 1,
                content = "",
                classes = "";
            for (; 0 <= len; len--) this.config[len].classes == "custom" && (classes = "custom-select"), content += '<li class="' + classes + '" data-num="' + this.config[len].num + '" data-classes="' + this.config[len].classes + '"><span>' + this.config[len].num + "个</span></li>";
            this.selectlist.append(content), this.selectHeight = this.selectlist.height(), this.selectlist.css("top", this.selectHeight), this.selectBox.css("display", "none"), this.selects = this.selectlist.find("li")
        },
        addEvent: function() {
            var _this = this;
            this.select.on("click", function(event) {
                event.stopPropagation();
                if (_this.selectBox.css("display") == "block") {
                    var val = "" + _this.selectHeight + "px";
                    _this.selectlist.animate({
                        top: val
                    }, 300, function() {
                        _this.selectBox.hide()
                    })
                } else _this.selectBox.show(), _this.selectlist.animate({
                    top: 0
                }, 300);
                return !1
            }), this.selectlist.on("mouseover", "li", function() {
                var $this = $(this);
                _this.selecttip.empty();
                var content = '<div class="more more-' + $this.attr("data-classes") + '"><div class="shape"></div>';
                _this.selecttip.append(content), _this.selecttip.show()
            }), this.selectlist.on("mouseout", "li", function() {
                _this.selecttip.hide()
            }), window.attachEvent ? _this.numInput.get(0).attachEvent("onpropertychange", function(o) {
                _this.validateInputLen()
            }) : _this.numInput.get(0).addEventListener("input", function(o) {
                _this.validateInputLen()
            }, !1), this.selectlist.on("click", "li", function(event) {
                event.stopPropagation(), _this.numInput.val($(this).attr("data-num")), _this.selectBox.hide()
            }), $(document).click(function(event) {
                _this.selectBox.css("display") == "block" && _this.select.trigger("click")
            })
        },
        sendGiftClickHandle: function(callback) {
            var _this = this;
            this.sendBtn.on("click", function() {
                var $this = $(this);
                if (!_this.isSelect) {
                    Status.errorBubble("请选择礼物", $this);
                    return
                }
                var val = _this.numInput.val(),
                    re = /^[1-9]\d*$/;
                if (!re.test(val)) {
                    Status.errorBubble("请输入正确的数量", $this);
                    return
                }
                var _num = parseInt(_this.numInput.val()),
                    data = {
                        giftData: _this.gift_data,
                        quantity: _num
                    };
                return callback($this, data), !1
            })
        },
        validateInputLen: function() {
            var val = "" + this.numInput.val();
            val.length > 5 && (val = val.slice(0, 5), this.numInput.val(val))
        },
        changeConfig: function(config) {
            var _this = this;
            for (var name in config) this[name] = config[name];
            this.isSelect = !0, this.numInput.val(1), _this.data.gift[_this.gift_data.id].type != 1 ? _this.select.hide() : _this.select.show()
        },
        customGift: function(callback) {
            var _this = this;
            if (this.customDialog == null) {
                var html = ['<div class="MR-custom-dialog">', '<div class="custom-content">', '<div class="dialog-title"><span>礼物数量定制</span><a class="close-btn"></a></div>', '<div class="input-group"><input class="gift-num-input" type="text"/><a class="confirm-btn">确定</a></div>', '<div class="custom-dialog-tip">专属组合数量仅能定制一次, 不可修改！</div>', '<div class="custom-dialog-desc">15级及以上的播客, 可定制直播频道专属组合数量啦~选生日或趣味数字都可以~送专属组合数量,形成女王图形。</div>', "</div>", "</div>"].join("");
                this.customDialog = $(html), this.container.append(this.customDialog)
            }
            return this.customBtn.click(function() {
                return _this.customDialog.show(), !1
            }), this.customDialog.find(".close-btn").click(function() {
                return _this.customDialog.hide(), !1
            }), this.customDialog.find(".confirm-btn").click(function() {
                var num = _this.customDialog.find(".gift-num-input").val(),
                    $this = $(this),
                    ispass = _this.validateNum(num, $this);
                if (ispass) {
                    var con = "数量只能定制一次，不可修改！您确定为" + num + "?";
                    _this.confirm(con, $this, function(result, btn, box) {
                        if (!result) {
                            box.destroy(), _this.winConfirm = null;
                            return
                        }
                        callback(num, btn, box)
                    })
                }
            }), !1
        },
        validateNum: function(val, ele) {
            var ispass = !1,
                tipCon = "定制数量必须是1000-99999数字!",
                re = /^[1-9]\d*$/;
            return re.test(val) && (val = parseInt(val), val >= 1e3 && val <= 99999 && (val == 1314 || val == 3344 ? tipCon = "不能和系统提供的组合数量重复!" : ispass = !0)), ispass || Status.errorBubble(tipCon, ele), ispass
        },
        confirm: function(con, target, callback) {
            var me = this;
            this.winConfirm && (this.winConfirm.destroy(), this.winConfirm = null), target = $(target), con = ['<div class="num-confirm-con-wrap">', '<p class="num-confirm-con">' + con + "</p>", '<p class="num-confirm-btns"><a class="num-btn-red grey-btn" action-type="ensure">确定</a><a class="num-btn-primary grey-btn" action-type="cancel">取消</a></p>', "</div>"].join(""), Dialog.tip(con, target, {
                onOpen: function(box) {
                    me.winConfirm = box;
                    var boxer = box.boxer;
                    boxer.on("click", "[action-type]", function() {
                        var $this = $(this),
                            r = $this.attr("action-type") == "ensure";
                        return callback(r, $this, box), !1
                    })
                }
            })
        }
    }, module.exports = moregift
}), define("VIEWS_FREEGIFT", ["JQ", "DIALOG", "STATUS", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Dialog = require("DIALOG"),
        Status = require("STATUS"),
        Util = require("UTIL"),
        freeGift = function(options) {
            var setting = $.extend({}, {
                moduleName: "gift",
                socket: null,
                Ele_free: null,
                Ele_charm: null,
                Url_send: "/star/send",
                Url_request: "/star",
                data: null,
                starAvail: 2,
                starTodayGain: 2,
                leftSeconds: 0,
                starTotalMax: 20,
                starTodayMax: 20,
                starGap: 120,
                isValid: !0,
                tips_txt: "今天获得星星数已达上限",
                setAll: !1,
                maxReq: 0
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    freeGift.prototype = {
        init: function() {
            this.panel = $('<div class="MR-star"><i>加载<br/>中...</i></div>'), this.Ele_free.append(this.panel), this.isValid ? this.getReq() : (this.panel.empty(), this.createDom(), this.count.css({
                display: "none"
            }), this.panel.addClass("star-no-valid")), this.targetEle = this.panel
        },
        createDom: function() {
            this.gift_img = $('<div class="gift-img"></div>'), this.progress = $('<div class="progress"></div>'), this.icon = $('<div class="icon"></div>'), this.count = $('<div class="count">' + this.starAvail + "</div>"), this.panel.append(this.progress), this.panel.append(this.icon), this.panel.append(this.count);
            if (DDS.config.roomType == null || $.trim(DDS.config.roomType).length == 0) this.freegiftmore = $('<ul class="freegift-more clrearfix"></ul>'), this.moreBtn_0 = $('<li class="more-btn star-0"><div class="icon"></div></li>'), this.moreBtn_1 = $('<li class="more-btn star-1"><div class="icon"></div></li>'), this.moreBtn_10 = $('<li class="more-btn star-10"><div class="icon"></div><div class="bg"><div class="tips ">星动</div></div></li>'), this.moreBtn_50 = $('<li class="more-btn star-50"><div class="icon"></div><div class="bg"><div class="tips ">满天星</div></div></li>'), this.freegiftmore.append(this.moreBtn_0), this.freegiftmore.append(this.moreBtn_1), this.freegiftmore.append(this.moreBtn_10), this.freegiftmore.append(this.moreBtn_50), this.Ele_free.append(this.freegiftmore)
        },
        getReq: function() {
            var _this = this;
            $.ajax({
                url: "/room/" + this.data.baseInfo.roomId + this.Url_request,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(d) {
                    var res = d.response,
                        data = res.data;
                    if (res.code != 0 || data.starAvail == -1) {
                        if (_this.maxReq > 3) return !1;
                        setTimeout(function() {
                            _this.maxReq += 1, _this.getReq()
                        }, 3e3)
                    } else {
                        for (var name in data) _this[name] = data[name];
                        _this.panel.empty(), _this.createDom(), _this.addEvent()
                    }
                }
            })
        },
        addEvent: function() {
            var _this = this;
            DDS.config.roomType == null || $.trim(DDS.config.roomType).length == 0 ? (this.is_more = !0, this.targetEle = this.Ele_free.find(".star-0"), this.openGiftSelecter(), window.INFO.isLogin == 0) : this.panel.on("click", function() {
                _this.sendFreeGift()
            });
            var _tips_timer = null;
            this.panel.hover(function() {
                _tips_timer = setTimeout(function() {
                    _this.showTip()
                }, 400)
            }, function() {
                clearTimeout(_tips_timer), _this.hideTip()
            }), this.NO_STAR = !1, this.leftSeconds = this.leftSeconds, this.starGap = this.starGap, this.proSum = this.progress.height(), this.units = this.proSum / this.starGap, this.proLen = this.units * (this.starGap - this.leftSeconds), this.pro_timer = null, this.LEFT_NUM = this.starTodayMax - this.starTodayGain;
            if (this.ifSendFree() || this.leftSeconds == -1) {
                this.draw(), this.NO_STAR = !0, setTimeout(function() {
                    _this.reLineUpdate()
                }, 9e4);
                return
            }
            this.freeGrow()
        },
        reLineUpdate: function() {
            var _this = this;
            $.ajax({
                url: "/room/" + this.data.baseInfo.roomId + this.Url_request,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(d) {
                    var res = d.response,
                        data = res.data;
                    for (var name in data) _this[name] = data[name];
                    _this.NO_STAR = !1, _this.proSum = _this.progress.height(), _this.units = _this.proSum / _this.starGap, _this.proLen = _this.units * (_this.starGap - _this.leftSeconds), _this.LEFT_NUM = _this.starTodayMax - _this.starTodayGain;
                    if (_this.ifSendFree() || _this.leftSeconds == -1) {
                        _this.draw(), _this.NO_STAR = !0;
                        return
                    }
                    _this.freeGrow()
                }
            })
        },
        openGiftSelecter: function() {
            var _this = this;
            this.panel.click(function() {
                var $this = $(this);
                $this.hide(), _this.freegiftmore.show(), _this.freegiftmore.addClass("open")
            }), this.freegiftmore.find("li").on("click", function() {
                var $this = $(this);
                if ($this.hasClass("star-0")) {
                    _this.freegiftmore.hide(), _this.panel.show(), _this.freegiftmore.removeClass("open");
                    return
                }
                $this.hasClass("star-1") ? _this.more_count = 1 : $this.hasClass("star-10") ? _this.more_count = 10 : $this.hasClass("star-50") && (_this.more_count = 50), _this.sendFreeGift()
            })
        },
        showTip: function() {
            this.Ele_tips ? this.Ele_tips.show() : (this.Ele_tips = $('<div class="MR-star-tips"><div class="tips-content"></div></div>'), this.Ele_tipsCon = this.Ele_tips.find(".tips-content"), $(document.body).append(this.Ele_tips), this.NO_STAR ? this.setText() : this.setText(this.leftSeconds)), this.Ele_tips.css({
                left: this.panel.offset().left,
                top: this.panel.offset().top
            })
        },
        hideTip: function() {
            this.Ele_tips && this.Ele_tips.hide()
        },
        setText: function(num) {
            if (!this.Ele_tips) return;
            var _text = this.tips_txt;
            num && (_text = "还剩" + num + "秒获取" + (window._EVENT_TIME ? "下颗糖果" : "下颗星星")), this.Ele_tipsCon.html(_text)
        },
        freeGrow: function() {
            var _this = this;
            this.pro_timer = setTimeout(function() {
                _this.proLen += _this.units, _this.leftSeconds -= 1, _this.leftSeconds <= 0 ? (_this.starAvail += 1, _this.count.html(_this.starAvail), _this.reGrow()) : (_this.setText(_this.leftSeconds), _this.freeGrow()), _this.draw()
            }, 1e3)
        },
        draw: function() {
            this.progress.css({
                height: this.proLen,
                visibility: "visible"
            })
        },
        reGrow: function() {
            if (this.ifSendFree()) return clearTimeout(this.pro_timer), this.setText(), !1;
            this.proLen = 0, this.leftSeconds = this.starGap, this.freeGrow()
        },
        ifSendFree: function() {
            return this.starAvail >= this.starTotalMax || this.starTodayGain >= this.starTodayMax || this.LEFT_NUM <= 0
        },
        effectXing: function(times) {
            var _this = this,
                left = this.Ele_free.offset().left,
                top = this.Ele_free.offset().top,
                toleft = this.Ele_charm.offset().left,
                totop = this.Ele_charm.offset().top;
            setTimeout(function() {
                var div = $('<div class="effect-xing"></div>');
                $(document.body).append(div);
                if (DDS.config.roomType == "livehouse") {
                    var centerX = left + (_this.Ele_free.width() - div.width()) * .5,
                        centerY = top + (_this.Ele_free.height() - div.height()) * .5,
                        targetCenterX = toleft + (_this.Ele_charm.width() - div.width()) * .5,
                        targetCenterY = totop + (_this.Ele_charm.height() - div.height()) * .5;
                    div.css({
                        left: centerX,
                        top: centerY,
                        opacity: 0
                    }), div.animate({
                        top: centerY - 150,
                        left: centerX,
                        opacity: 1
                    }, 400).animate({
                        top: targetCenterY,
                        left: targetCenterX
                    }, 1e3, function() {
                        $(div).remove()
                    })
                } else div.css({
                    left: left,
                    top: top,
                    opacity: 0
                }), div.animate({
                    top: top - 100,
                    left: left - 10 / (left - toleft + 10),
                    opacity: 1
                }, 400).animate({
                    top: totop,
                    left: toleft
                }, 1e3, function() {
                    $(div).remove()
                })
            }, times)
        },
        effectTenStar: function() {
            var effectConfig = [{
                    x: 3,
                    y: 20,
                    w: 15,
                    h: 15
                }, {
                    x: 23.35,
                    y: 40.35,
                    w: 22,
                    h: 22
                }, {
                    x: 41.35,
                    y: 17.35,
                    w: 30,
                    h: 30
                }, {
                    x: 73.35,
                    y: 22,
                    w: 14,
                    h: 14
                }, {
                    x: 88.35,
                    y: 41.35,
                    w: 22,
                    h: 22
                }, {
                    x: 114.35,
                    y: 17.35,
                    w: 28,
                    h: 28
                }, {
                    x: 138.3,
                    y: 37,
                    w: 34,
                    h: 34
                }, {
                    x: 163.35,
                    y: 18.35,
                    w: 26,
                    h: 26
                }, {
                    x: 186.3,
                    y: 37,
                    w: 26,
                    h: 26
                }, {
                    x: 209.3,
                    y: 10.35,
                    w: 28,
                    h: 28
                }],
                left = this.Ele_free.offset().left,
                top = this.Ele_free.offset().top,
                targetEle = $(".MR-about .effect-box");
            targetEle.show(), targetEle.css({
                opacity: 0
            });
            var targetLeft = targetEle.offset().left,
                targetTop = targetEle.offset().top,
                flag = 1,
                sum = 10,
                index = 0,
                effectIdx = 0,
                _this = this,
                starGroup = [],
                interId = setInterval(function() {
                    flag = -flag;
                    var div = $('<div class="effect-newxing" data-index="' + index + '"><img src="http://static.youku.com/ddshow/img/v3live/yellow-star.png"/></div>');
                    div.css({
                        left: left + 15,
                        top: top,
                        opacity: 0
                    }), $(document.body).append(div), div.animate({
                        top: top - 150,
                        opacity: 1
                    }, 400, function() {
                        var eleIndex = $(this).attr("data-index");
                        if (window.requestAnimationFrame) {
                            var instance = bezierCurve(div[0], targetEle[0], {
                                curvature: flag * Math.random() * .003,
                                rx: effectConfig[eleIndex].x,
                                ry: effectConfig[eleIndex].y,
                                complete: function() {
                                    effectIdx++, div.width(effectConfig[eleIndex].w), starGroup.push(div), effectIdx == 10 && targetEle.animate({
                                        opacity: 1
                                    }, 500)
                                }
                            });
                            instance.init()
                        } else div.animate({
                            top: targetTop + effectConfig[eleIndex].y,
                            left: targetLeft + effectConfig[eleIndex].x
                        }, 1e3, function() {
                            div.width(effectConfig[eleIndex].w), starGroup.push(div), sum == 0 && targetEle.animate({
                                opacity: 1
                            }, 200)
                        })
                    }), sum--, index++, sum == 0 && clearInterval(interId)
                }, 100),
                isEnd = !1,
                shineInterId = setInterval(function() {
                    starGroup.length == 10 && !isEnd && (isEnd = !0, setTimeout(function() {
                        clearInterval(shineInterId), targetEle.hide();
                        for (var i = 0; i < starGroup.length; i++) {
                            var ele = starGroup[i];
                            ele.remove()
                        }
                        _this.panel.removeClass("sending")
                    }, 2e3));
                    for (var i = 0; i < starGroup.length; i++) {
                        var fadeInTime = 250 * Math.random() + 100;
                        starGroup[i].fadeOut(fadeInTime).fadeIn(500 - fadeInTime)
                    }
                }, 500)
        },
        effectFiftyStar: function() {
            var left = this.Ele_free.offset().left,
                top = this.Ele_free.offset().top,
                toleft = -200,
                totop = -200,
                targetEle = $(".MR-about"),
                targetLeft = targetEle.offset().left,
                targetTop = targetEle.offset().top,
                flag = 1,
                sum = 50,
                _this = this,
                starGroup = [],
                interId = setInterval(function() {
                    var div = $('<div class="effect-newxing"><img src="http://static.youku.com/ddshow/img/v3live/yellow-star.png"/></div>');
                    div.css({
                        left: left + 15,
                        top: top,
                        opacity: 0
                    }), $(document.body).append(div), div.animate({
                        top: top - 150,
                        opacity: 1
                    }, 400, function() {
                        if (window.requestAnimationFrame) {
                            var instance = bezierCurve(div[0], targetEle[0], {
                                curvature: flag * Math.random() * .003,
                                rx: 220 * Math.random(),
                                ry: 450 * Math.random(),
                                complete: function() {
                                    div.width(15 * Math.random() + 5), starGroup.push(div)
                                }
                            });
                            instance.init()
                        } else div.animate({
                            top: targetTop + 620 * Math.random(),
                            left: targetLeft + 220 * Math.random()
                        }, 1e3, function() {
                            div.width(15 * Math.random() + 5), starGroup.push(div)
                        })
                    }), sum--, sum == 0 && clearInterval(interId)
                }, 100),
                shineInterId = setInterval(function() {
                    if (starGroup.length == 50) {
                        clearInterval(shineInterId);
                        for (var i = 0; i < starGroup.length; i++) {
                            var ele = starGroup[i];
                            ele.animate({
                                top: totop,
                                left: toleft
                            }, 100 * i, function() {
                                $(this).remove()
                            })
                        }
                        _this.panel.removeClass("sending");
                        return
                    }
                    for (var i = 0; i < starGroup.length; i++) {
                        var fadeInTime = 250 * Math.random() + 100;
                        starGroup[i].fadeOut(fadeInTime).fadeIn(500 - fadeInTime)
                    }
                }, 500)
        },
        effectUpgrade: function(times, num) {
            var cookieName = DDS.userInfo.userId + "_tips",
                tipNum = Util.getCookie(cookieName);
            tipNum = tipNum ? tipNum : 0;
            if (tipNum >= 5) return;
            setTimeout(function() {
                var div = $('<div class="effect-upgrade">经验值+' + num + '<span class="up-icon"></span></div>');
                div.css({
                    position: "fixed",
                    left: 5,
                    top: 200,
                    opacity: 0,
                    "z-index": 1e3
                }), $(document.body).append(div), div.animate({
                    top: 140,
                    opacity: 1
                }, 400).delay(1e3).animate({
                    opacity: 0
                }, 400, function() {
                    div.remove()
                })
            }, times), +(tipNum++), Util.setCookie(cookieName, tipNum)
        },
        effectAddOne: function() {
            var _this = this,
                div = $('<div class="effect-addone">+1</div>'),
                left = this.Ele_free.offset().left + 20,
                top = this.Ele_free.offset().top,
                totop = top + 60;
            div.css({
                left: left,
                top: totop
            }), $(document.body).append(div), div.animate({
                top: top - 10,
                opacity: .1
            }, 400, function() {
                div.remove()
            })
        },
        getAllStar: function() {
            var count = 1;
            return this.is_more && this.more_count && (count = this.more_count), this.setAll && (count = this.starAvail), count <= 0 ? 1 : count
        },
        socketPost: function(_num) {
            var _this = this;
            Util.socketRequest({
                socket: this.socket,
                methodName: "SendStar",
                upData: {
                    q: _num,
                    r: this.data.baseInfo.roomId
                },
                downCallBack: function(data) {
                    if (data.cd == 0) {
                        data.rs ? _this.starAvail = data.rs.leftStars : _this.starAvail >= _num && (_this.starAvail -= _num), _this.count.html(_this.starAvail), _this.effectUpgrade(150, _num * 25);
                        if (_num == 50 && DDS.config.roomType != "livehouse") _this.effectFiftyStar();
                        else if (_num == 10 && DDS.config.roomType != "livehouse") _this.effectTenStar();
                        else {
                            for (var i = 0; i < _num; i++) _this.effectXing(i * 150);
                            _this.panel.removeClass("sending")
                        }
                    } else if (data.cd == -2) Status.openLogin();
                    else if (data.cd == -13) {
                        if (data.rs.leftStars == -1) {
                            Status.errorBubble("送星星失败", _this.panel);
                            return
                        }
                        _this.starAvail = data.rs.leftStars;
                        if (_this.is_more) {
                            var tipContent = "抱歉，您的星星数不足,请等待";
                            _this.data.config.hasSpecialCard == 0 && _this.starAvail > 10 && _this.starAvail < 50 && (tipContent = "抱歉, 当前星星数量不足, 购买<a href='/mall/list/2?id=16' style='color:#0085CE' target='_blank'>特权</a>可增加星星积累上限"), _this.count.html(_this.starAvail), Status.errorBubble(tipContent, _this.targetEle, {
                                delay: 5e3
                            })
                        } else _this.count.html(_this.starAvail), Status.errorBubble("抱歉，您的星星数不足", _this.panel);
                        data.rs && data.rs.hasStars == 0 && (_this.LEFT_NUM = data.rs.hasStars)
                    } else data.cd == -20 ? Status.dialogSafeCode() : Dialog.alert(data.m);
                    data.cd != 0 && _this.panel.removeClass("sending")
                }
            })
        },
        sendFreeGift: function() {
            if (this.panel.hasClass("sending")) return !1;
            var _this = this;
            this.panel.addClass("sending");
            var _num = this.getAllStar();
            this.socket != null && this.socketPost(_num)
        }
    };
    var bezierCurve = function(element, target, options) {
        var defaults = {
                speed: 166.67,
                curvature: -0.002,
                progress: function() {},
                complete: function() {}
            },
            params = {};
        options = options || {};
        for (var key in defaults) params[key] = options[key] || defaults[key];
        var instance = {
                position: function() {
                    return this
                },
                move: function() {
                    return this
                },
                init: function() {
                    return this
                }
            },
            moveStyle = "margin",
            testDiv = document.createElement("div");
        "oninput" in testDiv && ["", "ms", "webkit"].forEach(function(prefix) {
            var transform = prefix + (prefix ? "T" : "t") + "ransform";
            transform in testDiv.style && (moveStyle = transform)
        });
        var a = params.curvature,
            b = 0,
            c = 0,
            flagMove = !0;
        if (element && target && element.nodeType == 1 && target.nodeType == 1) {
            var rectElement = {},
                rectTarget = {},
                centerElement = {},
                centerTarget = {},
                coordElement = {},
                coordTarget = {};
            instance.position = function() {
                if (flagMove == 0) return this;
                var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
                    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                return moveStyle == "margin" ? element.style.marginLeft = element.style.marginTop = "0px" : element.style[moveStyle] = "translate(0, 0)", rectElement = element.getBoundingClientRect(), rectTarget = target.getBoundingClientRect(), centerElement = {
                    x: rectElement.left + scrollLeft,
                    y: rectElement.top + scrollTop
                }, options = $.extend({}, {
                    rx: 0,
                    ry: 0
                }, options), centerTarget = {
                    x: rectTarget.left + scrollLeft + options.rx,
                    y: rectTarget.top + scrollTop + options.ry
                }, coordElement = {
                    x: 0,
                    y: 0
                }, coordTarget = {
                    x: -1 * (centerElement.x - centerTarget.x),
                    y: -1 * (centerElement.y - centerTarget.y)
                }, b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x, this
            }, instance.move = function() {
                if (flagMove == 0) return this;
                var startx = 0,
                    rate = coordTarget.x > 0 ? 1 : -1,
                    step = function() {
                        var tangent = 2 * a * startx + b;
                        startx += rate * Math.sqrt(params.speed / (tangent * tangent + 1));
                        if (rate == 1 && startx > coordTarget.x || rate == -1 && startx < coordTarget.x) startx = coordTarget.x;
                        var x = startx,
                            y = a * x * x + b * x;
                        moveStyle == "margin" ? (element.style.marginLeft = x + "px", element.style.marginTop = y + "px") : element.style[moveStyle] = "translate(" + [x + "px", y + "px"].join() + ")", startx !== coordTarget.x ? (params.progress(x, y), window.requestAnimationFrame(step)) : (params.complete(), flagMove = !0)
                    };
                return window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.requestAnimationFrame(step), flagMove = !1, this
            }, instance.init = function() {
                this.position().move()
            }
        }
        return instance
    };
    module.exports = freeGift
}), define("MODELS_GIFT", ["JQ", "STATUS", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        gift = function() {},
        Status = require("STATUS"),
        Util = require("UTIL");
    gift.prototype = {
        Url_send_gift: "/gift/send",
        Url_send_free_gift: "/star/send",
        Url_get_free_gift: "/star",
        Url_custom: "/room/customNum/save",
        more_gift_config: [{
            name: "10",
            num: 10,
            classes: "10",
            title: "十全十美"
        }, {
            name: "66",
            num: 66,
            classes: "66",
            title: "顺顺利利"
        }, {
            name: "99",
            num: 99,
            classes: "99",
            title: "长长久久"
        }, {
            name: "188",
            num: 188,
            classes: "188",
            title: "要抱抱"
        }, {
            name: "520",
            num: 520,
            classes: "520",
            title: "我爱你"
        }, {
            name: "1314",
            num: 1314,
            classes: "1314",
            title: "一生一世"
        }, {
            name: "3344",
            num: 3344,
            classes: "3344",
            title: "生生世世"
        }]
    }, gift.prototype.getOneGifter = function(ele, data) {
        return data[ele.attr("data-id")]
    }, gift.prototype.getMoreConfig = function(len) {
        var arr = this.more_gift_config.slice(0, len),
            copy = [];
        return $.extend(!0, copy, arr), copy
    }, gift.prototype.sendSocketGift = function(socket, ele, data, successCallBack, errorCallBack) {
        var _this = this;
        return Status.noLogin() ? !1 : Status.isDisconnect() ? !1 : (Util.socketRequest({
            socket: socket,
            methodName: "SendGift",
            upData: {
                g: data.giftId,
                q: data.quantity,
                ti: data.targetUserId,
                r: this.data.baseInfo.roomId
            },
            downCallBack: function(D) {
                D.cd == 0 ? successCallBack({
                    msg: D.m,
                    code: D.cd
                }) : errorCallBack({
                    msg: D.m,
                    code: D.cd
                })
            }
        }), this)
    }, gift.prototype.sendGift = function(ele, data, callback) {
        var _this = this;
        return Status.noLogin() ? !1 : Status.isDisconnect() ? !1 : (Util.post("/room/" + this.data.baseInfo.roomId + this.Url_send_gift, {
            methodName: "sendGift",
            giftId: data.giftId,
            targetUserId: data.targetUserId,
            roomId: this.data.baseInfo.roomId,
            quantity: data.quantity
        }, function(D) {
            _this.sendGiftCallback(data.price), _this.is_track && _this.dom.giftTrack(ele, data), typeof callback == "function" && callback()
        }, function() {}, function(D) {
            Status.ajaxError(D, ele)
        }), this)
    }, module.exports = gift
}), define("CONTROLS_GIFT", ["JQ", "UTIL", "VIEWS_FREEGIFT", "VIEWS_MOREGIFT", "COMBOMSG", "STATUS", "MODELS_GIFT", "EVENTBUS", "EVENTTYPE"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        freeGift = require("VIEWS_FREEGIFT"),
        MoreGift = require("VIEWS_MOREGIFT"),
        ComboMsg = require("COMBOMSG"),
        Status = require("STATUS"),
        GiftModel = require("MODELS_GIFT"),
        EventBus = require("EVENTBUS"),
        EventType = require("EVENTTYPE"),
        gift = function(options) {
            var setting = $.extend({}, {
                moduleName: "gift",
                socket: null,
                views: null,
                container: null,
                data: null,
                giftType: "normal",
                curSelectGiftId: null,
                hasFree: !0,
                isBackGift: !1,
                isFreeValid: !0,
                isLuckValid: !0,
                isGiftValid: !0,
                Ele_charm: null,
                setAll: !1,
                is_track: !1,
                isTv: !1,
                isIku: !1,
                isBottom: !0,
                isSofaShow: !0,
                isSocketSend: !0,
                evtBusName: "giftbus",
                sendGiftCallback: function() {}
            }, options);
            for (var name in setting) this[name] = setting[name];
            this.data.config.roomType == "tv" && (this.isTv = !0), this.data.config.roomType == "iku" && (this.isIku = !0), this.eventBus = EventBus.factory(this.evtBusName)
        };
    Util.mixin(gift, GiftModel), gift.prototype.init = function() {
        this.dom = this.createDom(), this.dom.init(), this.hasFree && this.createFreeGift(), this.createMoreGift(), this.addEvent()
    }, gift.prototype.createDom = function() {
        return this.views == null ? null : new this.views({
            container: this.container,
            data: this.data,
            giftdata: this.giftdata,
            hasFree: this.hasFree,
            isGiftValid: this.isGiftValid,
            isLuckValid: this.isLuckValid,
            isBottom: this.isBottom,
            isSofaShow: this.isSofaShow
        })
    }, gift.prototype.addEvent = function() {
        var _this = this;
        _this.dom.selectGiftHandle(function(ele) {
            _this.giftType = "normal";
            var data = _this.getOneGifter(ele, _this.data.gift),
                locked = ele.attr("data-locked") == 1 ? !0 : !1;
            _this.changeSelectGift(data, locked)
        }), _this.moreGift.sendGiftClickHandle(function(ele, data) {
            if (!_this.isBackGift) switch (_this.giftType) {
                case "package":
                    _this.eventBus.emit(EventType.packages.sendgift, ele, data);
                    break;
                default:
                    var rData = {
                        giftId: data.giftData.id,
                        giftName: data.giftData.name,
                        quantity: data.quantity,
                        price: data.giftData.value * data.quantity,
                        targetUserId: _this.isTv ? 0 : _this.data.anchorInfo.anchorId
                    };
                    _this.isSocketSend ? _this.sendSocketGift(_this.socket, ele, rData, function() {
                        _this.sendGiftCallback(rData.price), _this.is_track && _this.dom.giftTrack(ele, rData)
                    }, function(D) {
                        Status.ajaxError(D, ele)
                    }) : _this.sendGift(ele, rData)
            } else {
                var gdata = {
                    giftId: data.giftData.id,
                    giftName: data.giftData.name,
                    quantity: data.quantity,
                    price: data.giftData.value * data.quantity
                };
                _this.selectGift(gdata)
            }
        }), this.data.config.roomType == "" && ($(".MR-sofa").length > 0 ? _this.sofaShowHandle() : this.eventBus.on(EventType.sofa.sofaloaded, function() {
            _this.sofaShowHandle()
        })), _this.eventBus.on(EventType.moregift.changeConfig, function(config) {
            _this.giftType = config.giftype, _this.changeSelectGift(config.data, config.locked)
        }, this)
    }, gift.prototype.sofaShowHandle = function() {
        var _this = this;
        _this.dom.judgeSofaShow(function(isOpen) {
            _this.eventBus.trigger(EventType.sofa.sofaswitch, isOpen)
        })
    }, gift.prototype.changeSelectGift = function(data, locked) {
        if (this.curSelectGiftId == data.id) return;
        this.curSelectGiftId = data.id;
        var config = {
            gift_data: data,
            locked: locked,
            is_more: data.isMultipleSelect ? !0 : !1
        };
        this.moreGift.changeConfig(config)
    }, gift.prototype.createFreeGift = function() {
        var free = new freeGift({
            moduleName: this.moduleName,
            socket: this.socket,
            Ele_free: this.dom.Ele_free,
            Ele_charm: this.Ele_charm,
            data: this.data,
            isValid: this.isFreeValid,
            setAll: this.setAll
        });
        free.init()
    }, gift.prototype.createMoreGift = function() {
        var _this = this,
            showCustom = _this.isRightAnchor(),
            roomCustomNum = _this.data.config.roomCustomNum,
            giftConfig = this.more_gift_config.slice(0);
        roomCustomNum && giftConfig.unshift({
            name: "" + roomCustomNum,
            num: roomCustomNum,
            classes: "custom",
            title: "自定义数量"
        }), this.moreGift = new MoreGift({
            container: _this.dom.Ele_moregift,
            data: _this.data,
            showCustom: showCustom,
            config: giftConfig,
            roomCustomNum: roomCustomNum
        }), this.moreGift.init(), showCustom && this.moreGift.customGift(function(num, ele, box) {
            _this.customGiftNumReq(num, ele, box)
        })
    }, gift.prototype.selectGift = function(data) {
        return data
    }, gift.prototype.customGiftNumReq = function(num, ele, box) {
        var _this = this;
        return Status.noLogin() ? !1 : Status.isDisconnect() ? !1 : (Util.post(this.Url_custom, {
            customNum: num,
            roomId: this.data.baseInfo.roomId
        }, function(D) {
            _this.moreGift.roomCustomNum = num, _this.moreGift.customBtn.remove(), _this.moreGift.customDialog.remove(), box.destroy(), _this.moreGift.winConfirm = null;
            var content = '<li class="custom-select" data-num="' + num + '" data-classes="custom"><span>' + num + "个</span></li>";
            _this.moreGift.selectlist.append(content)
        }, function() {}, function(D) {
            Status.ajaxError(D, ele)
        }), this)
    }, gift.prototype.isRightAnchor = function() {
        return this.isTv || this.moduleName != "gift" ? !1 : this.data.config.roomCustomNum != null ? !1 : this.data.userInfo.userId == this.data.anchorInfo.anchorId && this.data.anchorInfo.anchorLevel >= 15 ? !0 : !1
    }, module.exports = gift
}), define("CONTROLS_VIDEO", ["XM", "LIVE_IO", "JQ", "UTIL", "HTML5-VIDEO-UI"], function(require, exports, module) {
    var X = require("XM"),
        liveIO = require("LIVE_IO"),
        $ = require("JQ"),
        U = require("UTIL"),
        UI = require("HTML5-VIDEO-UI"),
        _TYPE_REG = /^(flash|html5)(?:-?)(.*)/img,
        VIDEO = liveIO.util.Listener.extend({
            _constructor: function(option) {
                return VIDEO._super._constructor.call(this), this._ERROR_FORMAT = "[LF.PLAYER]ERROR:[%s]", this._DLOG_FORMAT = "[LF.PLAYER]LOG:%s", this._OPEN_DEBUGG = !1, this._container = $(option.container), this._id = option.id || "DDS_videoPlayer", this._isV2 = option.isV2 || !1, this._o = option, this._o.fullScreen = option.fullScreen, this._o.fullScreen == undefined && (this._o.fullScreen = 1), this._clientType = option.clientType || "auto", this._roomId = option.room_id, this.player = null, this._isFullScreen = !1, this._isTv = option.ex_roomType == 1, this._isIku = option.ex_roomType == -1 && IKU, this.playerOnPlay = !1, this
            },
            init: function() {
                var o = this._o,
                    _this = this,
                    player = null;
                this._clientType == "auto" && (U.browser.Ipad ? this._clientType = "html5-ui" : this._clientType = "flash");
                var typeArr = _TYPE_REG.exec(this._clientType);
                return _TYPE_REG.lastIndex = 0, this._clientType = typeArr[1], this._uiType = typeArr[2], o.isAnchor ? this._videoContainer = this._container.find("#live-player-window") : this._isTv || this._isV2 ? this._videoContainer = this._container : (this._videoContainer = $('<div class="MR-video"></div>'), this._container.append(this._videoContainer)), this._videoContainer.append('<div class="con" id="' + this._id + '"></div>'), this._isIku && (o.src = o.src + "?_=" + (new Date).getTime()), this.player = player = this._initPlayer(this._clientType, o), this.setChatRate("chatRate", window.DDS.baseInfo.chatRate), this._clientType == "html5" && (this.panel = this._videoContainer), player && (this._clientType == "html5" && this._uiType && (player._controlBar = !1), player.on("launchSuccess", function() {
                    _this._uiType && _this._initUI(_this._uiType), window.DDS.baseInfo.isShowing && o.initAlias && o.initToken ? _this.startLiveByAlias(o.initAlias, o.initToken) : (player._customUI && (player._customUI.controlBar.hide(), player._customUI.bigBtn.hide()), _this._isTv && o.initStopType != undefined && _this.stopLive(o.initStopType)), _this.emit("launchSuccess")
                }), player.on("startLive", function() {
                    player._customUI && (player._customUI.bigBtn.css("display", "none"), player._customUI.playBtn.html('<i class="icon-pause"></i>')), _this._onLive = !0
                }), player.on("stopLive", function() {
                    player._customUI && (_this.playerOnPlay && player._customUI.bigBtn.css("display", "block"), player._customUI.playBtn.html('<i class="icon-play"></i>')), _this._onLive = !1, !_this.playerOnPlay && _this._clientType == "html5" && player._player.setAttribute("src", "")
                }), player.on("error", function(code, dsc) {
                    if (code == 5e3) {
                        _this._clientType == "html5" && _this._videoContainer.append('<p class="no-flash">' + dsc + ", 请更换浏览器</p>");
                        if (_this._clientType == "flash") {
                            var url = "http://www.adobe.com/software/flash/about/";
                            U.browser.Android && (url = "http://static.youku.com/ddshow/img/client/flashplayer.apk"), _this._isIku ? _this._videoContainer.append('<p class="no-flash">对不起！你的浏览器上未安装flash插件，请猛击<a href="javascript:void(0);" onclick=IKU.outLink("' + url + '")>这里</a>安装！！！</p>') : _this._videoContainer.append('<p class="no-flash">对不起！你的浏览器上未安装flash插件，请猛击<a href="' + url + '" target="_blank">这里</a>安装！！！</p>')
                        }
                    } else _this._clientType == "html5" && _this._videoContainer.append('<p class="no-flash">' + dsc + ", 请刷新重试</p>"), _this.playerOnPlay = !1
                }), player.on("giftEffectClose", function() {
                    _this.emit("giftEffectClose")
                }), player.on("giftEffectOpen", function() {
                    _this.emit("giftEffectOpen")
                }), player.on("chat", function(value) {
                    _this.emit("chat", value)
                }), player.on("horn", function(value) {
                    _this.emit("horn", value)
                }), player.launch()), this
            },
            _initPlayer: function(clientType, o) {
                var player = null;
                return clientType == "flash" ? player = liveIO.createPlayer(o.appId, this._id, {
                    width: o.playerwidth,
                    height: o.playerheight,
                    src: o.src,
                    titleList: o.titles,
                    defaultQuality: o.defaultDef,
                    roomId: o.room_id,
                    p2p: o.p2p,
                    fullScreen: o.fullScreen,
                    ex: {
                        roomType: o.ex_roomType,
                        showPlugs: o.ex_showPlugs,
                        showSwitchRoom: 1
                    }
                }) : clientType == "html5" && (player = liveIO.createHtml5Player(o.appId, this._id, {
                    width: o.playerwidth,
                    height: o.playerheight
                })), player
            },
            _initUI: function(type) {
                var player = this.player,
                    _this = this;
                type == "ui" && (player._customUI = (new UI.html5UI({
                    container: this._videoContainer,
                    fullScreen: this._o.fullScreen
                })).init());
                var _end_timer = null;
                return player._customUI.container.on("touchstart", function() {
                    _this.playerOnPlay && (clearTimeout(_end_timer), player._customUI.controlBar.show().stop().animate({
                        opacity: 1
                    }, 400))
                }), player._customUI.container.on("touchend", function() {
                    _this.playerOnPlay && (_end_timer = setTimeout(function() {
                        player._customUI.controlBar.stop().animate({
                            opacity: 0
                        }, 400, function() {
                            player._customUI.controlBar.hide()
                        })
                    }, 2e3))
                }), player._customUI.bigBtn.on("click", function() {
                    player._player.play()
                }), player._customUI.playBtn.on("click", function() {
                    player._player.paused ? player._player.play() : player._player.pause()
                }), this._o.fullScreen == 1 && player._customUI.fullscreenBtn.on("click", function() {
                    _this._isFullScreen ? _this.resetScreen() : _this.fullScreen()
                }), player._customUI.controlBar.hide(), this
            },
            startLiveByAlias: function(alias, token, titleList, defaultQuality, p2pFlag) {
                try {
                    this.player && this.player.startLiveByAlias(alias, token, titleList, defaultQuality, p2pFlag), this.playerOnPlay = !0
                } catch (e) {
                    this._o.initAlias = alias, this._o.initToken = token, this.player && (titleList && this.player.setTitleList(titleList), defaultQuality != undefined && this.player.setDefaultQuality(defaultQuality), p2pFlag != undefined && this.player.setPToPStatus(p2pFlag))
                }
                return this._o.initStopType = undefined, this
            },
            stopLive: function(type) {
                try {
                    this.player && this.player.stopLive(type), this.playerOnPlay = !1
                } catch (e) {
                    this._o.initAlias = "", this._o.initToken = "", this._o.initStopType = type
                }
                return this
            },
            socketFlashInfo: function(args) {
                args.body.m == "start" ? (this.startLiveByAlias(args.body.ln, args.body.k, args.body.t, args.body.d, args.body.p), this.player && this.player._customUI && this.player._customUI.bigBtn.show()) : (this.player && this.player._customUI && (this.player._customUI.loading.css("display", "none"), this.player._customUI.controlBar.hide(), this.player._customUI.bigBtn.hide()), this.stopLive())
            },
            isSelf: function(id) {
                return window.DDS.userInfo.userId == id
            },
            socketMicChange: function(args) {
                var data = args.body.ms,
                    o = args.body.me;
                this.isSelf(data.u) ? this.stopLive(1) : data.st == 1 ? this.startLiveByAlias(data.ln, data.tk, o.t, o.d, o.p) : this.stopLive(1)
            },
            socketStreamChange: function(args) {
                args.st == 1 && this.startLiveByAlias(args.ln, args.tk)
            },
            mute: function(flag) {
                return this.player && this.player.mute(flag), this
            },
            getVolume: function() {
                return this.player && this.player.getVolume()
            },
            setVolume: function(volume) {
                return this.player && this.player.setVolume(volume), this
            },
            fullScreen: function() {
                this._isFullScreen = !0;
                var _w = $(window).width(),
                    _h = $(window).height(),
                    player = this.player;
                navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && (_h = window.innerHeight), this._videoContainer.addClass("MR-video-full"), this._videoContainer.css({
                    width: _w,
                    height: _h
                }), this.setPlayerWH(_w, _h), player._customUI && player._customUI.fullscreenBtn.html('<i class="icon-small"></i>')
            },
            resetScreen: function() {
                this._isFullScreen = !1;
                var _w = this._o.playerwidth,
                    _h = this._o.playerheight,
                    player = this.player;
                this._videoContainer.removeClass("MR-video-full"), this._videoContainer.css({
                    width: _w,
                    height: _h
                }), this.setPlayerWH(_w, _h), player._customUI && player._customUI.fullscreenBtn.html('<i class="icon-full"></i>')
            },
            changeVideoSize: function(w, h) {
                var player = this.player;
                return player.changeVideoSize(w, h), this
            },
            setPlayerWH: function(w, h) {
                this._clientType == "flash" ? this.player.setPlayerWH(w, h) : this.changeVideoSize(w, h)
            },
            showCtrBar: function() {
                return this.player._playerHasInit && this.player && this.player.showCtrBar(), this
            },
            hideCtrBar: function() {
                return this.player._playerHasInit && this.player && this.player.hideCtrBar(), this
            },
            destroy: function() {
                this.player && (this.player.destroy(), this.player = null)
            },
            setChatInfo: function(type, info, userId) {
                this.player._playerHasInit && this.player.setChatInfo(type, info, userId)
            },
            setGiftInfo: function(args) {
                this.player._playerHasInit && this.player.setGiftInfo(args)
            },
            setChatRate: function(value) {
                this._clientType == "flash" && this.player && this.player.flashParam("chatRate", value)
            },
            sendChatResponse: function(data) {
                this._clientType == "flash" && this.player && this.player.sendResponse("chat", data)
            },
            sendHornResponse: function(data) {
                this._clientType == "flash" && this.player && this.player.sendResponse("horn", data)
            }
        });
    module.exports = VIDEO
}), define("CONTROLS_EXPRESSION", ["JQ", "UTIL", "DIALOG", "STATUS"], function(require, exports, module) {
    var $ = require("JQ"),
        UTIL = require("UTIL"),
        Dialog = require("DIALOG"),
        Status = require("STATUS"),
        Expression = function(opt) {
            var options = {
                views: null,
                container: null,
                roomId: null,
                url: {
                    send: "/room/" + window.DDS.baseInfo.roomId + "/patronsaint/send_expr"
                },
                data: {},
                interval: 5e3,
                showDynamicExpression: !1,
                showGuiZuExpression: !1
            };
            this.opt = $.extend(options, opt)
        };
    Expression.prototype = {
        init: function() {
            this.serialize();
            var opt = this.opt;
            this.dom = new opt.views({
                data: opt.data,
                container: opt.container,
                controller: this,
                showDynamicExpression: opt.showDynamicExpression,
                isInputFocus: opt.isInputFocus,
                showGuiZuExpression: opt.showGuiZuExpression,
                inputBox: opt.inputBox
            }), this.dom.init()
        },
        _createAjax: function(el, callback) {
            if (el.data("status") == "post") {
                Dialog.tip("正在发送...", el, {
                    delay: 2e3
                });
                return
            }
            if (Status.noLogin()) return !1;
            if (Status.isDisconnect()) return !1;
            callback && callback()
        },
        _createPost: function(el, url, data, success) {
            el.data("status", "post"), UTIL.post(url, data, function(r) {
                success && success(r)
            }, function(res) {
                el.data("status", null)
            }, function(res) {
                Status.ajaxError(res, el)
            })
        },
        send: function(el, id, suc) {
            var me = this;
            if (!window.DDS.amISuperfans) return Dialog.tip('<p>这是守护神才有的特权哦！<p><p><a href="javascript:void(0)" class="btn btn-expression" action-type="superfans-openBuyDialog">成为TA的守护神</a></p>', el, {
                delay: 2e3
            }), !1;
            var now = +(new Date);
            return this.lastSend && now - this.lastSend < me.opt.interval ? (Dialog.tip("<p>请" + ((this.lastSend + me.opt.interval - now) / 1e3).toFixed(1) + "秒后再发。</p>", el, {
                delay: 1e3
            }), !1) : (me._createAjax(el, function() {
                me._createPost(el, me.opt.url.send, {
                    roomId: me.opt.roomId,
                    exprId: id
                }, function() {
                    me.lastSend = +(new Date), suc && suc()
                })
            }), !0)
        },
        serialize: function() {
            var data = this.opt.data.patronsaint,
                expressions = window.DDS.patronsaint = {};
            for (var i = 0; i < data.length; i++) expressions[data[i].id] = data[i]
        }
    }, module.exports = Expression
}), define("VIEWS_EXPRESSION", ["JQ", "DIALOG", "STATUS", "EMOTICON", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Dialog = require("DIALOG"),
        Status = require("STATUS"),
        Emoticon = require("EMOTICON"),
        Util = require("UTIL"),
        Expression = function(opt) {
            var options = {
                container: null,
                data: {},
                controller: null,
                showDynamicExpression: !1,
                showGuiZuExpression: !1
            };
            this.opt = $.extend(options, opt), this.controller = this.opt.controller, this.data = this.opt.data, this.dom = {}, this.modules = {}
        };
    Expression.prototype = {
        init: function() {
            var dom = this.dom,
                opt = this.opt,
                patronsaint = opt.patronsaint,
                html = "";
            dom.container = $(opt.container), dom.panel = $('<div class="expression-wrap"></div>'), dom.head = $('<ul class="expression-hd"> </ul>').appendTo(this.dom.panel), dom.head.append('<li class="cur">表情</li>'), dom.body = $('<div class="expression-bd"></div>').appendTo(dom.panel), dom.emoticonWrap = $('<div class="expression-con"></div>').appendTo(dom.body), opt.showGuiZuExpression && (dom.head.append(' <li class="guizu-tab">贵族专属</li>'), dom.guiZuWrap = $('<div class="expression-con expression-guizu-con" style="display:none;"><div class="e-container"></div><div class="e-tip">用户等级到达<span class="ICON-noble-level ICON-nl-10"></span>才可以使用专属表情!</div></div>').appendTo(dom.body), this.modules.guiZuEmoticon = Emoticon.emoticon({
                emoticonData: opt.data.guizu,
                container: dom.guiZuWrap.children().eq(0),
                inputBox: opt.inputBox,
                type: "guizu"
            })), opt.showDynamicExpression && dom.head.append(' <li class="dynamic-tab">守护神专属</li>'), opt.showDynamicExpression && (dom.patronsaintWrap = $('<div class="expression-con" style="display:none;"></div>').appendTo(dom.body)), dom.container.append(dom.panel), this.modules.emoticon = Emoticon.emoticon({
                emoticonData: opt.data.common,
                container: dom.emoticonWrap,
                inputBox: opt.inputBox,
                isInputFocus: opt.isInputFocus
            }), opt.showDynamicExpression && dom.patronsaintWrap.append(this.createExpressionList(opt.data.patronsaint)), this.bindEvent()
        },
        bindEvent: function() {
            var me = this,
                dom = this.dom;
            dom.container.on("click", "[action-type=dynamic-expression-send]", function() {
                var $this = $(this),
                    id = $this.attr("action-data");
                return me.controller.send($this, id, function() {})
            }), dom.container.on("click", ".btn", function(e) {
                dom.container.find(".expression-tips").hide()
            }), dom.container.on("click", ".dynamic-tab", function() {
                window.DDS.amISuperfans && dom.container.find(".expression-tips").hide()
            }), dom.container.on("click", ".guizu-tab", function() {
                window.DDS.userInfo.userLevel >= 10 && (dom.container.find(".guizu-tab-tips").hide(), dom.container.find(".e-tip").hide())
            }), dom.head.on("click", "li", function() {
                var $this = $(this),
                    i = $(this).index();
                $this.addClass("cur").siblings().removeClass("cur"), dom.body.find(".expression-con").hide().eq(i).show()
            })
        },
        createExpressionList: function(data) {
            var html = "";
            for (var i = 0; i < data.length; i++) html += '<li action-type="dynamic-expression-send" action-data="' + data[i].id + '"><img src="' + data[i].url + '" title="' + data[i].tag + '" alt="' + data[i].tag + '" /></li>';
            return html = '<ul class="dynamic-list clearfix">' + html + "</ul>", html
        }
    }, module.exports = Expression
}), define("VIEWS_MSG", ["JQ", "UTIL", "DRAG", "WIDGETS", "EMOTICON", "CARD"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Drag = require("DRAG"),
        Widgets = require("WIDGETS"),
        Emoticon = require("EMOTICON"),
        Card = require("CARD"),
        GuideText = function() {
            return this.cookieName = "guide_queue", this._firstDelay = 3e4, this._IntervalDelay = 12e4, this.text = ["亲，想知道播客最新消息么？请“关注”Ta。", "只想唱歌给你听！“应用”点歌帮你完成！", "本场的播客很辛苦，各位在观看期间请尊重播客，谢谢合作！", "如果您喜欢本场的播客，请不要吝啬手中的星星和礼物。", "点击“分享”可将本频道分享到微博、QQ空间，为Ta增加更多粉丝！"], this._delayTimers = new Array(this.text.length), this._msgMethod = function(html) {}, this
        };
    GuideText.prototype = {
        _constructor: GuideText,
        init: function() {
            var currentCookie = this.getCookie();
            return this._delayTimersInit(currentCookie), this
        },
        getCookie: function() {
            return Util.getCookie(this.cookieName)
        },
        setCookie: function(value) {
            var expires = 1440;
            return Util.setCookie(this.cookieName, value, expires, "/", "." + Util.hosts.shortHost)
        },
        _delayTimersInit: function(currentCookie) {
            if (currentCookie == this.text.length || this.text.length == 0) return !1;
            currentCookie || (this.setCookie(0), currentCookie = 0), currentCookie = parseInt(currentCookie);
            var _this = this,
                i, first = !0;
            for (i = currentCookie; i < this.text.length; i++) this._delayTimers[i] = setTimeout(function(i) {
                return function() {
                    if (_this.getCookie() != i) return !1;
                    _this._msgMethod(_this._createHtml(_this.text[i])), _this.setCookie(i + 1)
                }
            }(i), function(i) {
                return first ? (first = !1, _this._firstDelay) : _this._IntervalDelay * i + _this._firstDelay
            }(i))
        },
        _createHtml: function(text) {
            var html = "<li>";
            return html += '<span class="fake-name">管理小助手：</span>', html += text, html += "</li>", html
        }
    };
    var msg = function(options) {
        var setting = $.extend({}, {
            container: null,
            mode: 1,
            data: null,
            Url_gift: "/gift/record",
            if_hosData: !0,
            isGift: !0,
            mxNum: 20,
            is_height_auto: !0,
            height_dif: 190,
            gift_height: 144,
            gift_min_height: 120,
            paddHeight: 10,
            min_height: 360,
            max_height: 560,
            is_column: !0,
            chat_height: "auto",
            is_control: !0,
            is_screen_lock: !0,
            model: 0,
            isEnterMsg: !0,
            isNewIcon: !1,
            isChatEnter: !0,
            maxSoundNum: 5
        }, options);
        for (var name in setting) this[name] = setting[name]
    };
    msg.prototype = {
        init: function() {
            return this.giftCache = [], this.chatCache = [], this.SOUND_TOGGLE = !1, this.SOUND_TIP_TOGGLE = !0, this.SOUND_CLOSE_TOGGLE = !0, this.SOUND_NUM = 0, this.createDom(), this.DRAGING = !1, this.getGiftCache = [], this.is_column && (this.back_gift_height = this.gift_height, this.bar_height = this.bar.height(), this.min_chat_height = this.min_height - this.gift_min_height - this.bar_height - 2 * this.paddHeight), this.createScroll(), this.setHeight(this.getHeight()), this.addEvent(), this.is_column && this.createDrag(), this.mode != 2 && this.guideTextInit(), this
        },
        readGiftHis: function() {
            if (!this.if_hosData) return !1;
            var _this = this;
            $.ajax({
                url: this.Url_gift,
                type: "GET",
                data: {
                    roomId: this.data.baseInfo.roomId
                },
                cache: !1,
                dataType: "json",
                success: function(data) {
                    var D = data.response;
                    if (D.code == 0) {
                        var data = D.data,
                            ln = Math.min(data.length, _this.mxNum);
                        for (var i = ln - 1; i >= 0; i--) {
                            var dd = _this.giftField(data[i]);
                            _this.addGiftMsg(dd)
                        }
                    }
                }
            })
        },
        giftField: function(objects) {
            return {
                i: objects.originUserId,
                n: objects.originUserNickName,
                ti: objects.targetUserId,
                tn: objects.targetUserNickName,
                t: objects.createDateString,
                m: objects.giftName,
                g: objects.giftId,
                oms: objects.oms || [],
                l: objects.originUserLevel || 0,
                tl: objects.targetUserLevel || 0,
                al: objects.originOfficialLevel || 0,
                tal: objects.targetAnchorLevel || 0,
                tms: objects.tms || 0
            }
        },
        createDom: function() {
            this.panel = $('<div class="MR-msg"></div>'), Util.browser.Ipad && this.panel.css({
                position: "fixed"
            }), this.container.append(this.panel), this.msgTitle = $('<span class="msg-title"></span>'), this.panel.append(this.msgTitle), this.is_column && (this.giftBoard = $('<div class="msg-gift"></div>'), this.panel.append(this.giftBoard), this.bar = $('<div class="control-bar"><cite></cite><span></span></div>'), this.panel.append(this.bar), this.createSound()), this.chatBoard = $('<div class="msg-chat"></div>'), this.panel.append(this.chatBoard)
        },
        openSound: function() {
            this.soundToggle.removeClass("MR-sound-off"), this.soundToggle.html("声效开");
            if ($("#ddshowGifter")[0]) try {
                $("#ddshowGifter")[0].flashVolume(1)
            } catch (e) {}
        },
        closeSound: function() {
            this.SOUND_TOGGLE = !0, this.soundToggle.addClass("MR-sound-off"), this.soundToggle.html("声效关");
            if ($("#ddshowGifter")[0]) try {
                $("#ddshowGifter")[0].flashVolume(0)
            } catch (e) {}
        },
        createSound: function() {
            var _this = this;
            this.tipsTimer = null, this.soundToggle = $('<span class="MR-sound-toggle">声效开</span>'), this.soundToggle.css({
                display: "none"
            }), this.soundTip = $('<div class="MR-sound-tip"></div>'), this.soundTip.css({
                display: "none"
            }), this.panel.append(this.soundToggle), this.panel.append(this.soundTip), Util.getCookie("soundtoggle") == "1" && this.closeSound(), this.soundToggle.on("click", function() {
                _this.SOUND_TOGGLE = !1, _this.soundTip.stop(), clearTimeout(_this.tipsTimer), _this.soundTip.css({
                    display: "block",
                    opacity: 1
                }), $(this).hasClass("MR-sound-off") ? (_this.soundTip.html("礼物声效已开启"), _this.openSound(), _this.setCookie("2")) : (_this.setCookie("1"), _this.soundTip.html("礼物声效已关闭"), _this.closeSound()), _this.tipsTimer = setTimeout(function() {
                    _this.soundTip.animate({
                        opacity: 0
                    }, 400, function() {
                        _this.soundTip.css({
                            display: "none"
                        })
                    })
                }, 5e3)
            })
        },
        setCookie: function(num) {
            Util.setCookie("soundtoggle", num, 1440, "/", Util.hosts.shortHost)
        },
        showSoundToggle: function() {
            this.soundToggle.show()
        },
        openSoundTip: function() {
            var _this = this;
            this.SOUND_TIP_TOGGLE = !1, this.soundTip.stop(), clearTimeout(this.tipsTimer), this.soundTip.css({
                display: "block",
                opacity: 1
            }), this.soundTip.html("如果礼物声效打扰您观看，点击右侧关闭").show(), this.tipsTimer = setTimeout(function() {
                _this.soundTip.animate({
                    opacity: 0
                }, 400, function() {
                    _this.soundTip.css({
                        display: "none"
                    })
                })
            }, 5e3)
        },
        closeSoundTip: function() {
            var _this = this;
            this.SOUND_CLOSE_TOGGLE = !1, this.soundTip.stop(), clearTimeout(this.tipsTimer), this.soundTip.css({
                display: "block",
                opacity: 1
            }), this.soundTip.html("礼物声效已关闭，开启后才能听到声音哦").show(), this.tipsTimer = setTimeout(function() {
                _this.soundTip.animate({
                    opacity: 0
                }, 400, function() {
                    _this.soundTip.css({
                        display: "none"
                    })
                })
            }, 5e3)
        },
        createScroll: function() {
            this.chatScroller = Widgets.ScrollBoard({
                container: this.chatBoard,
                if_chat: this.isChatEnter,
                if_card: !0,
                isGift: this.isGift,
                lock_scroll: this.is_screen_lock,
                card: Card,
                lock_scroll: !0,
                direct: "left"
            }), this.chatScroller.init(), this.is_column && (this.giftScroller = Widgets.ScrollBoard({
                container: this.giftBoard
            }), this.giftScroller.init())
        },
        createDrag: function() {
            var _this = this;
            Drag.drag(this.bar, {
                limit: !0,
                lock: !1,
                mxtop: this.gift_min_height + this.paddHeight,
                lockX: !0,
                contrainer: this.panel,
                onStart: function() {
                    _this.DRAGING = !0
                },
                onMove: function() {
                    var _top = parseInt(this.drag.css("top")),
                        _vTop = _this.getHeight() - _top - _this.paddHeight - _this.bar_height;
                    _vTop <= _this.min_chat_height && this.drag.css({
                        top: _this.getHeight() - _this.min_chat_height - _this.bar_height - _this.paddHeight
                    })
                },
                onStop: function() {
                    var _top = Math.abs(parseInt(this.drag.css("top")));
                    _this.gift_height = _top - _this.paddHeight;
                    var _h = _this.getHeight();
                    _this.setHeight(_h), _this.DRAGING = !1
                }
            }).init()
        },
        getHeight: function() {
            if (!this.is_height_auto) return this.max_height;
            var h = $(window).height() - this.height_dif;
            return h > this.max_height && (h = this.max_height), h < this.min_height ? this.min_height : h
        },
        setHeight: function(h) {
            this.is_column && (this.giftScroller.boarder.css({
                height: this.gift_height
            }), this.giftScroller.scroller.css({
                height: this.gift_height
            }), this.giftScroller.scroll.setHeight(this.gift_height), this.giftScroller.scroll.toBottom(), h = h - this.gift_height - this.bar_height - 2 * this.paddHeight, this.container.find(".MR-online .tab")[0] && this.container.find(".MR-online .tab").css({
                height: h
            })), this.chatBoard.css({
                height: h
            }), this.chatScroller.boarder.css({
                height: h
            }), this.chatScroller.scroller.css({
                height: h
            }), this.chatScroller.scroll.setHeight(h), this.chatScroller.scroll.toBottom()
        },
        addEvent: function() {
            var _this = this;
            if (!this.is_height_auto) return !1;
            $(window).on("resize", function() {
                if (_this.DRAGING) return !1;
                var _h = _this.getHeight();
                _this.is_column && _this.gift_height > _h - _this.min_chat_height && (_this.gift_height = _this.back_gift_height, _this.bar.css({
                    top: _this.gift_height + _this.paddHeight
                })), _this.setHeight(_h)
            })
        },
        isAnchor: function(id) {
            return this.data.anchorInfo.anchorId == id
        },
        addGiftMsg: function(args, n) {
            this.getGiftType(args.g) == 3 && window.HAD_VERIFY_TOGGLE && (this.showSoundToggle(), this.SOUND_NUM += 1, !this.SOUND_TOGGLE && this.SOUND_TIP_TOGGLE && this.SOUND_NUM >= this.maxSoundNum && this.openSoundTip(), this.SOUND_CLOSE_TOGGLE && this.SOUND_TOGGLE && args.i == this.data.userInfo.userId && this.closeSoundTip()), this.addMsg(this.giftMsg(args, n))
        },
        addUserGiftMsg: function(args) {
            var _html = '<li class="guest">';
            args.gf = 0, _html += '<span class="time">' + args.t + "</span>" + Util.getUserNameHtml(args.n, args.i, args.l, args.al, args), _html += '<i class="mlr-5">送</i>' + Util.getUserNameHtml(args.tn, args.ti, args.tl, args.tal, args, "", args.tms) + "：", _html += this.getGiftInfo(args.g).name + "x" + args.q + '<img src="' + this.getGiftInfo(args.g).smallicon + '"/>', _html += "</li>", this.addMsg(_html)
        },
        addStarMsg: function(args) {
            this.addMsg(this.starMsg(args))
        },
        addChatMsg: function(args) {
            this.mode == 2 ? this.setChatMsg(this.chagMsg_MODE2(args)) : this.setChatMsg(this.chatMsg(args))
        },
        setChatMsg: function(html) {
            if (!this.chatBoard) return;
            this.data.config && this.data.config.roomType == "livehouse" ? (this.chatCache.push(html), this.chatCache.length <= 1 && this.chatQueue()) : this.chatScroller.addData(html)
        },
        chatQueue: function() {
            var _this = this;
            setTimeout(function() {
                var len = _this.chatCache.length;
                _this.chatCache.length > 0 && (_this.chatScroller.addData(_this.chatCache[0]), _this.chatCache.shift(), _this.chatQueue())
            }, 20)
        },
        addMsg: function(html) {
            if (!this.giftBoard) return;
            this.giftCache.push(html), this.giftCache.length <= 1 && this.msgQueue()
        },
        msgQueue: function() {
            var _this = this;
            setTimeout(function() {
                var len = _this.giftCache.length;
                _this.giftCache.length > 0 && (_this.giftScroller.addData(_this.giftCache[0]), _this.giftCache.shift(), _this.msgQueue())
            }, 20)
        },
        giftMsg: function(args, n) {
            var _html = "<li>";
            args.i == this.data.anchorInfo.anchorId && (_html = '<li class="anchor">');
            var _num = n ? n : "";
            return args.gf = 0, _html += '<span class="time">' + args.t + "</span>" + Util.getUserNameHtml(args.n, args.i, args.l, args.al, args, "", args.oms), args.i == this.data.anchorInfo.anchorId ? _html += '<i  class="mlr-5">送</i><span class="auser-name">' + Util.getUserNameHtml(args.tn, args.ti, args.tl, args.tal, args, "", args.tms) + "</span>" : _html += '<i  class="mlr-5">送</i>', _html += this.getGiftPic(args.g), _html + _num + "</li>"
        },
        getGiftInfo: function(id) {
            return this.data.gift[id] || {
                name: "null",
                smallicon: "null"
            }
        },
        getGiftType: function(id) {
            var data = this.data.gift;
            return data[id] && data[id].type ? data[id].type : 0
        },
        getGiftPic: function(id) {
            var _html = "",
                data = this.data.gift,
                len = data.length;
            return len === 0 || !data[id] ? _html : data[id].name + '<img src="' + data[id].smallicon + '"/>'
        },
        starMsg: function(args) {
            var _html = "<li>";
            return args.gf = 0, _html += '<span class="time">' + args.t + "</span>" + Util.getUserNameHtml(args.n, args.i, args.l, args.al, args), args.q == 1 ? _html += '<i class="mlr-5">送</i>小星星' : args.q == 10 ? _html += '<i class="mlr-5">送</i>星动 <img src="http://static.youku.com/ddshow/img/room/star_24_24.png"/> (星星*10)' : args.q == 50 ? _html += '<i class="mlr-5">送</i>满天星 <img src="http://static.youku.com/ddshow/img/room/star_24_24.png"/> (星星*50)' : _html += '<i class="mlr-5">送</i>小星星', _html + "</li>"
        },
        chatMsg: function(args) {
            var html = "<li>";
            return this.isAnchor(args.i) && (html = '<li class="anchor">'), html += '<span class="time">' + args.t + "</span>", html += this.getUserHtml(args.n, args.i, args.l, args.al, args), html += "：" + Emoticon.parseEmoticon(Util.formatHTML(args.m), {
                ol: args.l
            }), html += "</li>", html
        },
        chagMsg_MODE2: function(args) {
            var html = "<li>",
                gf = args.gf ? args.gf : 0;
            return args.gd == 1 && (html = '<li class="girl">'), this.isAnchor(args.i) && (html = '<li class="anchor">'), gf == 1 && (html = '<li class="gf">'), this.isMe(args.i) || this.isAnchor(args.i) ? html += '<div class="mr">' : html += '<div class="ml">', html += '<div class="name">' + Util.getUserNameHtml(args.n, args.i, args.l, args.al, args) + "</div>", html += '<div class="msg"><i class="arrow"></i><div class="con">' + Emoticon.parseEmoticon(Util.formatHTML(args.m), {
                ol: args.l
            }) + "</div></div>", html += "</div></li>", html
        },
        isMe: function(id) {
            return this.data.userInfo.userId == id
        },
        enterMsg: function(args) {
            var html = '<li class="enter">';
            args.gd == 1 && (html = '<li class="enter girl">'), html += "欢迎", args.s == 2 && (html += "尊贵的"), html += '<span class="all-name">', html += this.getUserHtml(args.n, args.i, args.l, args.al, args) + "</span>进入频道</li>", this.chatScroller.addData(html)
        },
        hornMsg: function(args) {
            if (this.mode == 2) return this.chagMsg_MODE2(args), !1;
            var html = '<li class="horn">';
            this.isAnchor(args.i) && (html = '<li class="anchor horn">'), html += '<span class="time">' + args.t + "</span>", html += '<span class="ICON-horn"></span>', html += this.getUserHtml(args.n, args.i, args.l, args.al, args), html += "：" + Util.formatHTML(args.m), html += "</li>", this.chatScroller.addData(html)
        },
        siteHornMsg: function(args) {
            var html = '<li class="horn"><span class="time">' + args.t + "</span>";
            html += '<span class="ICON-site-horn"></span>', html += '<span class="user-name" data-id="' + args.i + '">' + args.n + "</span>", html += "：" + Util.formatHTML(args.m) + '<a href="' + args.ar + '">[' + args.an + "的直播频道]</a>", html += "</li>", this.chatScroller.addData(html)
        },
        songMsg: function(args) {
            if (this.mode == 2) return !1;
            var html = '<li class="enter">';
            html += '<span class="time">' + args.t + "</span>", html += '<span class="anchor-user">' + this.getUserHtml(args.n, args.i, args.l, args.al, args) + "</span>", html += "&nbsp;同意演唱&nbsp;", html += Util.getUserNameHtml(args.tn, args.ti, args.tl, args.tal, args, "", args.tms), html += "&nbsp;点播的歌曲《" + args.sn + "》", html += "</li>", html = $(html), args.gd == 1 && html.find(".user-name").eq(0).addClass("user-name-girl"), args.tgd == 1 && html.find(".user-name").eq(1).addClass("user-name-girl"), this.chatScroller.addData(html)
        },
        sofaMsg: function(args) {
            if (this.mode == 2) return !1;
            var html = '<li class="enter">';
            html += '<span style="padding-right:3px;">土豪</span>', html += this.getUserHtml(args.n.n, args.n.i, args.n.l, args.n.al, args), html += "&nbsp;将&nbsp;", html += Util.getUserNameHtml(args.on.n, args.on.i, args.on.l, args.on.al, args), html += "&nbsp;请下了沙发", html += "</li>", this.chatScroller.addData(html)
        },
        kickMsg: function(args) {
            if (this.mode == 2) return !1;
            var html = '<li class="noble-opt">';
            html += this.getUserHtml(args.n, args.i, args.l, args.al, args) + "将", html += Util.getUserNameHtml(args.tn, args.ti, args.tl, args.tal, args, "", args.tms), html += "踢出频道" + args.m, html += "</li>", this.chatScroller.addData(html)
        },
        pssMsg: function(args) {
            var html = "<li>";
            args.gd == 1 && (html = '<li class="girl">'), this.isAnchor(args.i) && (html = '<li class="anchor">'), html += '<span class="time">' + args.t + "</span>", html += this.getUserHtml(args.n, args.i, args.l, args.al, args), html += '<span class="pss">', args.fi ? html += "开通了" : html += "成功续费了", args.y ? html += "年" : html += "月", html += "守护神</span>", html += "</li>", this.chatScroller.addData(html)
        },
        banspeakMsg: function(args) {
            if (this.mode == 2) return !1;
            var html = '<li class="noble-opt">';
            html += "“" + this.getUserHtml(args.n, args.i, args.l, args.al, args) + "”将", html += "“" + Util.getUserNameHtml(args.tn, args.ti, args.tl, args.tal, args, "", args.tms), html += "”禁言" + args.m, html += "</li>", this.chatScroller.addData(html)
        },
        managerMsg: function(args) {
            if (this.mode == 2) return !1;
            var html = '<li class="noble-opt">';
            html += '<span class="user-name" data-name="' + args.n + '" data-id="' + args.i + '">' + Util.formatHTML(args.n) + "</span>" + args.m, html += "</li>", this.chatScroller.addData(html)
        },
        communityMsg: function(args) {
            if (this.mode == 2 || !args.im) return !1;
            if (args.s == 1) {
                var arr = args.im.split("|");
                args.im = '<span class="user-name" data-name="' + arr[0] + '" data-id="' + arr[3] + '">' + arr[0] + "</span> " + arr[2]
            }
            var html = '<li class="enter">';
            html += args.im, html += "</li>", this.chatScroller.addData(html)
        },
        getRedPacketMsg: function(args) {
            var html = "<li>";
            html += this.getUserHtml(args.n, args.u, args.l, args.al, args), html += '<span class="pss">领取了红包，获得' + args.c + "星币</span>", html += "</li>", this.chatScroller.addData(html)
        },
        getUserHtml: function(name, id, l, al, args) {
            return args.activeBg = !0, Util.getUserNameHtml(name, id, l, al, args)
        },
        getTopIcon: function(id, args) {
            if (!this.isAnchor(id) && args.md && args.md.gws && args.md.gws.length > 0) {
                var html = "",
                    data = args.md.gws;
                for (var i = 0; i < data.length; i++)
                    if (this.data.gift[data[i]]) {
                        var icon = this.data.gift[data[i]].medalicon;
                        html += '<span class="ICON-zhou" title="上周“' + this.data.gift[data[i]].name + '”周星礼物徽章" style="background:url(' + icon + ') no-repeat;"></span>'
                    }
                return html
            }
            return ""
        },
        guideTextInit: function() {
            var guideText = new GuideText,
                _this = this;
            guideText._msgMethod = function(html) {
                return _this.chatScroller.addData(html)
            }, guideText.init()
        },
        getGiftMsg: function(args) {
            var div = $('<div class="M-get-gift-msg"></div>');
            div.html(this.getGiftHtml(args)), this.getGiftCache.push(div), this.getGiftCache.length <= 1 && this.readGetGift()
        },
        addAuthMsg: function(args) {
            if (this.mode == 2) return !1;
            var html = '<li class="noble-opt">';
            return html += this.getUserHtml(args.n, args.i, args.l, args.al, args) + " " + args.m, html += "</li>", this.chatScroller.addData(html), this
        },
        readGetGift: function() {
            var _this = this,
                div = this.getGiftCache[0];
            this.giftBoard.append(div), setTimeout(function() {
                _this.getGiftCache.shift(), div.remove();
                var len = _this.getGiftCache.length;
                _this.getGiftCache.length > 0 && _this.readGetGift()
            }, 1e4)
        },
        getGiftHtml: function(args) {
            var info = this.getGiftInfo(args.g);
            return '<span class="get-gift">' + args.n + '</span>送给<span class="get-gift">您</span>：' + info.name + "x" + args.q + '<img src="' + info.smallicon + '"/>'
        }
    }, module.exports = msg
}), define("VIEWS_TALK", ["JQ", "STATUS", "DIALOG", "CONTROLS_EXPRESSION", "VIEWS_EXPRESSION", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Status = require("STATUS"),
        Dialog = require("DIALOG"),
        Expression = require("CONTROLS_EXPRESSION"),
        ExpressionView = require("VIEWS_EXPRESSION"),
        Util = require("UTIL"),
        talk = function(options) {
            var setting = $.extend({}, {
                container: null,
                input_tips: "和播客聊会儿天？",
                maxFontNum: 30,
                data: null,
                showDynamicExpression: !1,
                showGuiZuExpression: !1
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    talk.prototype = {
        init: function() {
            this.createDom()
        },
        createDom: function() {
            this.panel = $('<div class="MR-talk"></div>'), this.send_btn = $('<span class="send-btn">发送</span>'), this.speaker = $('<div class="speaker"></div>'), this.textinput = $('<input type="text" value="' + this.input_tips + '" />'), this.ele_tip = $("<cite>" + this.maxFontNum + "</cite>"), this.emoticon_toggle_panel = $('<div class="emoticon-toggle-panel"></div>'), this.emoticon_toggle = $('<a href="javascript:void(0);" class="BTN-face-toggle"></a>'), this.emoticon_layer = $('<div class="MR-emoticon-layer"></div>'), this.emoticon_layer.css({
                display: "none"
            }), this.speaker.append(this.textinput), this.speaker.append(this.ele_tip), this.panel.append(this.send_btn), this.panel.append(this.speaker), this.emoticon_toggle_panel.append(this.emoticon_toggle), this.panel.append(this.emoticon_toggle_panel), this.container.append(this.panel), this.container.append(this.emoticon_layer), this.loadEmoticon()
        },
        clearFocus: function() {
            this.textinput[0].blur(), this.send_btn[0].blur()
        },
        unlockBtn: function() {
            this.send_btn.removeClass("saving"), this.send_btn.html("发送")
        },
        lockBtn: function() {
            this.send_btn.addClass("saving")
        },
        btnHtml: function(msg) {
            this.send_btn.html(msg + "秒")
        },
        isBtnValid: function() {
            return !this.send_btn.hasClass("saving")
        },
        getValue: function() {
            return this.textinput.val()
        },
        showEmoticon: function() {
            this.emoticon_layer.show(), this.emoticon_toggle.addClass("emoticon-closed")
        },
        hideEmoticon: function() {
            this.emoticon_layer.hide(), this.emoticon_toggle.removeClass("emoticon-closed")
        },
        upGradeTip: function(rate, level, time) {
            Status.errorBubble('<span class="upgrade-tip">升级到<span class="ICON-noble-level ICON-nl-' + level + '"></span>只用等待' + time + "秒</span>", this.textinput, {
                delay: rate * 1e3
            })
        },
        loadEmoticon: function() {
            var _this = this;
            this.emoticon_toggle.on("click", function() {
                return $(this).hasClass("emoticon-closed") ? _this.hideEmoticon() : _this.showEmoticon(), !1
            }), this.emoticon_layer.on("click", ".emoticon", function() {
                _this.emoticon_toggle.trigger("click")
            }), this.emoticon_layer.on("click", ".dynamic-list", function() {
                _this.emoticon_toggle.trigger("click")
            }), this.expression = new Expression({
                container: this.emoticon_layer,
                data: this.data.expressions,
                roomId: this.data.baseInfo.roomId,
                inputBox: this.speaker.find("input"),
                showDynamicExpression: this.showDynamicExpression,
                showGuiZuExpression: this.showGuiZuExpression,
                views: ExpressionView
            }), this.expression.init(), Util.addSubscriber(window, "superfans.firstBuy", function() {
                Dialog.tip("<p>好玩的动态表情在这里哦!</p>", _this.emoticon_toggle, {
                    delay: 5e3
                })
            }), this.emoticon_layer.on("click", function(e) {
                e.stopPropagation()
            }), $(window).on("click", function() {
                _this.hideEmoticon()
            })
        }
    }, module.exports = talk
}), define("CONTROLS_TALK", ["JQ", "UTIL", "WIDGETS", "STATUS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        Status = require("STATUS"),
        talk = function(options) {
            var setting = $.extend({}, {
                Url_speak: "/chat/save",
                input_tips: "和大家聊会儿天？",
                maxFontNum: 30,
                views: null,
                container: null,
                data: null,
                socket: null,
                showDynamicExpression: !1,
                showGuiZuExpression: !1,
                delay: parseInt(window.DDS.baseInfo.chatRate),
                chatDelay: 15
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    talk.prototype.init = function() {
        this.data.baseInfo.isSuperManager && (this.chatDelay = 0, this.maxFontNum = 60), this.delay = parseInt(this.data.baseInfo.chatRate), this.temp_delay = this.delay, this.speak_timer = null, this.chatCache = [], this.firstTip = !0, this.dom = this.createDom(), this.dom.init(), this.createText()
    }, talk.prototype.createDom = function() {
        return this.views == null ? null : new this.views({
            container: this.container,
            data: this.data,
            showDynamicExpression: this.showDynamicExpression,
            showGuiZuExpression: this.showGuiZuExpression,
            input_tips: this.input_tips,
            maxFontNum: this.maxFontNum
        })
    }, talk.prototype.createText = function() {
        var _this = this;
        this.speak_text = Widgets.Text({
            textarea: this.dom.textinput,
            tips: this.input_tips,
            Ele_max_font: this.dom.ele_tip,
            maxFontNum: this.maxFontNum,
            rightTips: "",
            wrongTips: "",
            repairTips: "",
            callback: function() {
                _this.subTxt()
            }
        }), this.speak_text.init(), this.dom.send_btn.on("click", function() {
            _this.subTxt()
        })
    }, talk.prototype.isTextValid = function() {
        var _is = this.speak_text.verify() !== null ? !0 : !1;
        if (_is) {
            var _txt = this.speak_text.verify();
            Status.errorBubble(_txt, this.speak_text.textarea)
        }
        return _is
    }, talk.prototype.subTxt = function() {
        var _this = this;
        if (!_this.dom.isBtnValid()) return !1;
        if (Status.noLogin()) return this.dom.clearFocus(), !1;
        if (Status.isDisconnect()) return !1;
        if (this.isTextValid()) return !1;
        var value = this.dom.getValue(),
            ele = this.dom.textinput;
        if (this.replayChat(value)) return Status.errorBubble(this.chatDelay + "秒内请勿重复发言", ele), !1;
        this.dom.lockBtn(), this.dataSubmit(value, function(data) {
            _this.errorTip(data)
        }), this.reTimer(), this.clearTxt(), this.upGradeTip()
    }, talk.prototype.dataSubmit = function(value, errorCallback) {
        Util.socketRequest({
            socket: this.socket,
            methodName: "Chat",
            upData: {
                m: value,
                ai: "0",
                r: this.data.baseInfo.roomId
            },
            downCallBack: function(data) {
                data.cd != 0 && typeof errorCallback == "function" && errorCallback({
                    code: data.cd,
                    msg: data.m
                })
            }
        })
    }, talk.prototype.INTERFACE_Chat = function(value, errorCallback) {
        this.dataSubmit(value, errorCallback)
    }, talk.prototype.errorTip = function(data) {
        Status.ajaxError(data, this.dom.textinput)
    }, talk.prototype.upGradeTip = function() {
        if (this.temp_delay > 1 && this.firstTip) {
            var level = parseInt(this.data.userInfo.userLevel);
            level < 1 ? this.dom.upGradeTip(this.temp_delay, 1, 3) : level >= 1 && level <= 9 && this.dom.upGradeTip(this.temp_delay, 10, 1), this.firstTip = !1
        }
    }, talk.prototype.upDelay = function(level) {
        level > 9 ? this.temp_delay = 1 : level > 0 && level <= 9 && (this.temp_delay = 3)
    }, talk.prototype.clearTxt = function() {
        this.speak_text.noText()
    }, talk.prototype.reTimer = function() {
        this.dom.btnHtml(this.delay), this.toTimer()
    }, talk.prototype.toTimer = function() {
        var _this = this;
        this.speak_timer = setTimeout(function() {
            _this.delay -= 1, _this.delay <= 0 ? (_this.dom.unlockBtn(), _this.delay = _this.temp_delay) : _this.reTimer()
        }, 1e3)
    }, talk.prototype.updateChatRate = function(rate) {
        if (this.data.userInfo.userLevel > 0) return;
        this.temp_delay = rate, this.dom.isBtnValid() || (this.delay = rate)
    }, talk.prototype.replayChat = function(value) {
        var len = this.chatCache.length,
            time = (new Date).getTime();
        if (len == 0) return this.chatCache.push({
            times: time,
            value: value
        }), !1;
        var arr = [];
        for (var i = 0; i < len; i++) this.chatCache[i].times + this.chatDelay * 1e3 > time && arr.push(this.chatCache[i]);
        this.chatCache = arr;
        for (var i = 0, len = this.chatCache.length; i < len; i++)
            if (this.chatCache[i].value == value) return !0;
        return this.chatCache.push({
            times: time,
            value: value
        }), !1
    }, module.exports = talk
}), define("CONTROLS_SHARE", ["JQ", "SHARE"], function(require, exports, module) {
    var $ = require("JQ"),
        SHARE = require("SHARE"),
        Share = function(options) {
            var setting = $.extend({}, {
                container: null,
                data: null,
                type: 0
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    Share.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.type == 0 ? this.dom() : this.dom2()
        },
        dom: function() {
            this.panel = $('<div class="MR-share"></div>'), this.panel.html('<i class="ICON-share"></i><cite>分享</cite>'), this.bubble = $('<div class="M-bubble"><div class="arrow-top"></div></div>'), this.bubble.css({
                display: "none"
            }), this.panel.append(this.bubble), this.container.append(this.panel), this.createShare();
            var temp_timer = null,
                no_show_timer = null,
                _this = this;
            this.panel.hover(function() {
                clearTimeout(no_show_timer), temp_timer = setTimeout(function() {
                    _this.bubble.show()
                }, 200)
            }, function() {
                clearTimeout(temp_timer), no_show_timer = setTimeout(function() {
                    _this.bubble.hide()
                }, 400)
            })
        },
        dom2: function() {
            this.panel = $('<div class="MR-share"></div>'), this.bubble = $('<div class="M-bubble"><div class="arrow-left"></div></div>'), this.panel.append(this.bubble), this.container.append(this.panel), this.createShare()
        },
        createShare: function() {
            var detail = $('<div class="detail"></div>');
            detail.append('<a class="weibo" href="javascript:void(0);" data-cps="' + this.data.dataCps.weibo + '"><i class="ICON-weibo"></i><label>微博</label></a>'), detail.append('<a class="qq" href="javascript:void(0);" data-cps="' + this.data.dataCps.qq + '"><i class="ICON-qq"></i><label>QQ</label></a>'), detail.append('<a class="zone" href="javascript:void(0);" data-cps="' + this.data.dataCps.zone + '"><i class="ICON-zone"></i><label>QQ空间</label></a>'), this.bubble.append(detail);
            var _INNER_DDS = $.extend({}, window.DDS),
                share = SHARE.share({
                    type: 1,
                    anchorName: _INNER_DDS.anchorInfo.anchorName,
                    sina: {
                        target: this.panel.find(".weibo"),
                        param: {
                            pic: _INNER_DDS.anchorInfo.coverUrl,
                            cps: this.data.dataCps.weibo
                        }
                    },
                    qq: {
                        target: this.panel.find(".qq"),
                        param: {
                            pics: _INNER_DDS.anchorInfo.coverUrl,
                            cps: this.data.dataCps.qq
                        }
                    },
                    qzone: {
                        target: this.panel.find(".zone"),
                        param: {
                            pics: _INNER_DDS.anchorInfo.coverUrl,
                            cps: this.data.dataCps.zone
                        }
                    }
                }).init()
        }
    }, module.exports = Share
}), define("CONTROLS_COUNT", ["JQ"], function(require, exports, module) {
    var $ = require("JQ"),
        Count = function(options) {
            var setting = $.extend({}, {
                container: null,
                isOnline: !0,
                isHot: !0,
                isMoods: !1,
                initData: {}
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    Count.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.giftNumCache = this.initData.giftNum, this.hotNumCache = this.initData.hotNum, this.dom(), this.isOnline && (this.updatePersonNum(this.initData.onlineNum), this.createTips(this.online, "本场在线人数")), this.isHot && this.createTips(this.gift, "本场热度")
        },
        dom: function() {
            this.panel = $('<div class="MR-count"></div>');
            if (this.isHot) {
                this.gift = $('<div class="gift"><i class="ICON-gift"></i></div>');
                var _con = $('<div class="info"></div>');
                this.giftnum = $("<cite>" + this.hotNumCache + "</cite>"), _con.append(this.giftnum), this.gift.append(_con), this.panel.append(this.gift)
            }
            if (this.isOnline) {
                this.online = $('<div class="online"><i class="ICON-online"></i></div>');
                var _con = $('<div class="info"></div>');
                this.onlinenum = $("<cite>" + this.initData.onlineNum + "</cite>"), _con.append(this.onlinenum), this.online.append(_con), this.panel.append(this.online)
            }
            this.isMoods && (this.moods = $('<div class="moods MR-nsns-count"></div>'), this.moodsnum = $("<cite>" + this.hotNumCache + "</cite>"), this.moods.append(this.moodsnum), this.moods.append("<i>守护神力量</i>"), this.panel.append(this.moods)), this.container.append(this.panel)
        },
        createTips: function(objs, title) {
            var tips = $('<div class="M-bubble"></div>');
            tips.css({
                display: "none"
            }), tips.html('<div class="arrow-top"></div><div class="detail">' + title + "</div>"), objs.append(tips);
            var temp_timer = null;
            objs.hover(function() {
                temp_timer = setTimeout(function() {
                    tips.show()
                }, 200)
            }, function() {
                clearTimeout(temp_timer), tips.hide()
            })
        },
        updatePersonNum: function(num) {
            if (!this.isOnline) return;
            this.onlinenum.html(num)
        },
        updateGiftNum: function(num) {
            return !1
        },
        updateHotNum: function(num) {
            num == -1 ? this.hotNumCache = 0 : this.hotNumCache += num, this.isHot && this.giftnum.html(this.hotNumCache), this.isMoods && this.updateMoodsNum()
        },
        updateMoodsNum: function() {
            this.moodsnum.html(this.hotNumCache)
        }
    }, module.exports = Count
}), define("CONTROLS_RANK", ["JQ", "SCROLL", "DIALOG", "CARD", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Scroll = require("SCROLL"),
        Dialog = require("DIALOG"),
        Card = require("CARD"),
        Util = require("UTIL"),
        Rank = function(options) {
            var setting = $.extend({}, {
                container: null,
                defaultImg: "http://static.youku.com/ddshow/img/laifeng/avatar/40_40.png",
                data: null,
                units: 28,
                no_tips: "灰常抱歉，当前还木有粉丝送礼哦！",
                allowRequest: !0,
                hasLevel: !1,
                isGift: !0,
                tab: []
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    Rank.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.dom(), this.switchTab(), this.loadRank(), this.rankEvent()
        },
        loadRank: function() {
            var _this = this;
            this.tabs.each(function(i) {
                if ($(this).data("mode") == 1) {
                    if (_this.allowRequest) {
                        var arr = _this.tab[i].top;
                        arr.faceUrl || (arr = {
                            faceUrl: _this.defaultImg,
                            nickName: "虚位以待"
                        }), _this.setFir($(this), arr)
                    }
                    var scroller = Scroll.scroll({
                        Ele_panel: _this.cons.eq(i).find(".boards ul")[0],
                        Ele_scroll: _this.cons.eq(i).find(".board-scroll")[0]
                    });
                    scroller.init(), $(this).data("scroller", scroller)
                }
            })
        },
        snsRank: function(tab, con) {
            var _this = this,
                arr = [{
                    name: "消费",
                    url: "/gold/top",
                    showType: 1
                }, {
                    name: "活跃",
                    url: "/active/top",
                    showType: 2
                }],
                tabC = con.find(".tabs"),
                conC = con.find(".boards-sns");
            for (var i = 0, len = arr.length; i < len; i++) {
                var span = $("<span>" + arr[i].name + "</span>"),
                    ul = $('<ul class="clearfix" style="display:none;"></ul>');
                span.data("url", arr[i].url), span.data("showType", arr[i].showType), tabC.append(span), conC.append(ul), i == 0 && (span.addClass("on"), ul.show())
            }
            var scroller = Scroll.scroll({
                Ele_panel: conC[0],
                Ele_scroll: con.find(".board-scroll")[0]
            });
            scroller.init(), tab.data("scroller", scroller);
            var tabBtn = tabC.find("span"),
                tabBorder = conC.find("ul");
            tabBtn.each(function(i) {
                $(this).on("click", function() {
                    var obj = $(this),
                        listObj = tabBorder.eq(i);
                    tabBtn.removeClass("on"), obj.addClass("on"), tabBorder.hide(), listObj.show(), scroller.toTop(), scroller.resetH(), _this.getSnsRankData(obj, listObj, scroller)
                })
            }), tab.on("click", function() {
                tabBtn.eq(0).trigger("click")
            })
        },
        getSnsRankData: function(obj, listObj, scroller) {
            var _this = this,
                url = obj.data("url"),
                showType = obj.data("showType");
            if (url == "") return;
            $.ajax({
                url: url,
                type: "GET",
                data: {
                    anchor: window.DDS.anchorInfo.anchorId
                },
                cache: !1,
                dataType: "json",
                success: function(data) {
                    var data = data.response,
                        h = _this.units;
                    data.code == 0 ? (listObj.empty(), data.data.length == 0 ? (listObj.html('<li class="no">' + _this.no_tips + "</li>"), h = _this.units + 20) : h = Math.min(_this.addSnsRankData(listObj, data.data, showType), 10) * _this.units) : (listObj.html('<li class="no">' + _this.no_tips + "</li>"), h = _this.units + 20), scroller.setHeight(h)
                }
            })
        },
        addSnsRankData: function(panel, arr, showType) {
            var _html = "";
            for (var i = 0, len = arr.length; i < len; i++) _html += '<li data-id="' + arr[i].userId + '" data-card="user">', i < 3 ? _html += '<label class="firs">' : _html += "<label>", _html += i + 1 + ".</label>", _html += '<span class="name">' + arr[i].un + "</span>", showType == 1 ? _html += Util.getMedalHTML([arr[i].medal], !0) : _html += Util.getMedalHTML([arr[i].medal], !0), showType == 1 ? _html += '<span class="value">' + arr[i].exp + "星币</span>" : _html += '<span class="value">' + arr[i].exp + "活跃值</span>", _html += "</li>";
            return panel.html(_html), arr.length
        },
        dom: function() {
            this.panel = $('<div class="MR-rank"></div>'), this.ul = $('<ul class="tab"></ul>'), this.con = $('<div class="con"></div>'), this.panel.append(this.ul), this.panel.append(this.con), this.container.append(this.panel);
            for (var i = 0; i < this.tab.length; i++) {
                var li = $("<li><span><cite>" + this.tab[i].name + "</cite><i></i></span></li>");
                i == this.tab.length - 1 && li.addClass("end"), li.data("url", this.tab[i].url), li.data("mode", this.tab[i].mode ? this.tab[i].mode : 1), li.data("readOne", this.tab[i].readOne), this.tab[i].card && li.data("card", this.tab[i].card);
                var tab_con = $('<div class="tab-con"></div>');
                this.hasLevel && tab_con.addClass("has-level"), this.tab[i].mode == 2 ? (li.addClass("mode-sns"), tab_con.html('<div class="tabs clearfix"></div><div class="other"><div class="boards"><div class="boards-sns"></div></div><div class="board-scroll"></div></div>')) : tab_con.html('<div class="thr"></div><div class="other"><div class="boards"><ul class="clearfix"></ul></div><div class="board-scroll"></div></div>'), this.ul.append(li), tab_con.css({
                    display: "none"
                }), this.con.append(tab_con), this.tab[i].mode == 2 && this.snsRank(li, tab_con), tab_con.append('<div class="bottom-line"></div>')
            }
            this.tabs = this.ul.find("li"), this.cons = this.con.find(".tab-con")
        },
        setThr: function(objs, arr, cardType) {
            var len = 3,
                classes = ["f", "s", "t"];
            _html = "";
            for (var i = 0; i < len; i++) {
                var _temp = {
                    faceUrl: "",
                    nickName: "",
                    coins: "",
                    userId: "",
                    level: ""
                };
                arr[i] && (_temp = arr[i]), _html += '<div class="' + classes[i] + '">' + '<div class="stage">', _temp.coins != "" && (_html += '<span class="ICON-coins">' + _temp.coins + "</span>"), _html += "</div>", _temp.faceUrl != "" && (_html += '<div class="photo"><img src="' + _temp.faceUrl + '" data-id="' + _temp.userId + '" data-card="' + cardType + '"/>' + "<cite>" + (i + 1) + '</cite><i></i></div><p class="name" title="' + _temp.nickName + '">' + Util.cutZhFont(_temp.nickName, 12) + "</p>"), this.hasLevel && _temp.level != "" && (cardType == "user" ? _html += '<span class="ICON-noble-level ICON-nl-' + _temp.level + '"></span>' : _html += '<span class="ICON-anchor-level ICON-al-' + _temp.level + '"></span>'), _html += "</div>"
            }
            objs.html(_html)
        },
        setFir: function(objs, args) {
            var photoer = objs.find(".photoer");
            _html = '<img src="' + args.faceUrl + '" title="' + args.nickName + '"/><cite>1</cite><i></i>', photoer[0] ? photoer.html(_html) : (photoer = $('<div class="photoer"></div>'), photoer.html(_html), objs.append(photoer))
        },
        setOther: function(tab, objs, arr, cardType) {
            var _html = "";
            for (var i = 0, len = arr.length; i < len; i++) _html += '<li data-id="' + arr[i].userId + '" data-card="' + cardType + '">', _html += "<label>" + (i + 4) + "</label>", this.hasLevel && arr[i].level != "" ? (cardType == "user" ? _html += '<span class="ICON-noble-level ICON-nl-' + arr[i].level + '"></span>' : _html += '<span class="ICON-anchor-level ICON-al-' + arr[i].level + '"></span>', _html += '<span title="' + arr[i].nickName + '" class="name">' + Util.cutZhFont(arr[i].nickName, 8) + "</span>") : _html += '<span title="' + arr[i].nickName + '" class="name">' + Util.cutZhFont(arr[i].nickName, 14) + "</span>", _html += '<span class="ICON-coins">' + arr[i].coins + "</span>", _html += "</li>";
            objs.html(_html);
            var _scroller = tab.data("scroller"),
                _h = Math.min(arr.length, 7) * this.units;
            _scroller.setHeight(_h)
        },
        switchTab: function() {
            var lis = this.ul.find("li"),
                lists = this.con.find(".tab-con"),
                _this = this;
            lis.each(function(i) {
                $(this).on("click", function() {
                    if ($(this).hasClass("on")) return _this.hideRank(), !1;
                    var obj = $(this),
                        listObj = lists.eq(i);
                    lis.removeClass("on"), obj.addClass("on"), lists.hide(), listObj.show(), listObj.find(".boards").scrollTop(0), $(this).data("scroller").resetH(), $(this).data("mode") == 1 && _this.getRankData(obj, listObj)
                })
            }), this.panel.on("click", function(e) {
                e.stopPropagation()
            }), $(document.body).on("click", function() {
                _this.hideRank()
            })
        },
        hideRank: function() {
            this.tabs.removeClass("on"), this.cons.hide()
        },
        getCardType: function(obj) {
            return obj.data("card") ? obj.data("card") : "user"
        },
        getRankData: function(obj, listObj) {
            var _this = this,
                url = obj.data("url");
            if (url == "") return;
            var ul = listObj.find(".other ul"),
                thr = listObj.find(".thr");
            $.ajax({
                url: url,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(data) {
                    var data = data.response;
                    data.code == 0 ? (thr.empty(), ul.empty(), data.data.length == 0 ? (thr.html('<div class="no">' + _this.no_tips + "</div>"), _this.setFir(obj, {
                        faceUrl: _this.defaultImg,
                        nickName: "虚位以待"
                    })) : _this.addData(obj, listObj, data.data)) : (thr.html('<div class="no">' + _this.no_tips + "</div>"), _this.setFir(obj, {
                        faceUrl: _this.defaultImg,
                        nickName: "虚位以待"
                    }))
                }
            })
        },
        addData: function(obj, listObj, data) {
            var cardType = this.getCardType(obj);
            this.setFir(obj, data[0]), this.setThr(listObj.find(".thr"), data.slice(0, 3), cardType), this.setOther(obj, listObj.find("ul"), data.slice(3), cardType)
        },
        isAnchor: function(id) {
            return this.data.anchorInfo.anchorId == id
        },
        cardEvent: function(_objs) {
            var _this = this;
            if (!_objs.attr("data-id")) return !1;
            var _ids = _objs.attr("data-id"),
                _cardType = _objs.attr("data-card");
            _name = "card_order_" + _ids;
            if (window[_name] && window[_name].TOGGLE) return !1;
            var _is_gift = this.data.config.roomType != "livehouse" ? !0 : !1;
            this.data.userInfo.userId == _ids && (_is_gift = !1), _this.isGift || (_is_gift = !1), window[_name] = new Card({
                Ele_source: _objs,
                userId: _ids,
                isGift: _is_gift,
                roomId: _this.data.baseInfo.roomId,
                type: _cardType
            }), window[_name].onHide = function() {
                window[_name].destroy()
            }, window[_name].create()
        },
        overEvent: function(_objs) {
            var _this = this;
            if (!_objs.attr("data-id")) return !1;
            var _ids = _objs.attr("data-id"),
                _name = "card_order_" + _ids;
            window[_name] && window[_name].TOGGLE && clearTimeout(window[_name].timer_hide)
        },
        outEvent: function(_objs) {
            var _this = this;
            if (!_objs.attr("data-id")) return !1;
            var _ids = _objs.attr("data-id"),
                _name = "card_order_" + _ids;
            window[_name] && window[_name].hide()
        },
        rankEvent: function() {
            var _this = this;
            this.panel.on("click", ".other li", function() {
                _this.cardEvent($(this))
            }), this.panel.on("click", ".thr img", function() {
                _this.cardEvent($(this))
            }), this.panel.on("mouseover", ".other li", function() {
                _this.overEvent($(this))
            }), this.panel.on("mouseout", ".other li", function() {
                _this.outEvent($(this))
            }), this.panel.on("mouseover", ".thr img", function() {
                _this.overEvent($(this))
            }), this.panel.on("mouseout", ".thr img", function() {
                _this.outEvent($(this))
            })
        }
    }, module.exports = Rank
}), define("CONTROLS_HORN", ["JQ", "UTIL", "STATUS", "WIDGETS", "MODELS_HORN", "VIEWS_HORN", "GOLD_HORN_MSG", "SITE_HORN_MSG"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Status = require("STATUS"),
        Widgets = require("WIDGETS"),
        HornModel = require("MODELS_HORN"),
        HornView = require("VIEWS_HORN"),
        GoldHornMsg = require("GOLD_HORN_MSG"),
        SiteHornMsg = require("SITE_HORN_MSG"),
        Horn = function(options) {
            this.config = $.extend({}, {
                views: null,
                socket: null,
                container: null,
                data: null,
                gold_show_con: null,
                isFlash: !1,
                site_show_con: null,
                Ele_site_con: null,
                inputTips: "请输入...",
                maxFontNum: 30,
                initData: [{
                    name: "金喇叭",
                    type: 0,
                    num: 0,
                    gid: "",
                    price: 2e3
                }, {
                    name: "全站喇叭",
                    price: 5e4,
                    num: 0,
                    gid: "",
                    type: 1
                }],
                sendHornCallback: function() {},
                packageSuccessCall: function() {},
                packageCloseCall: function() {}
            }, options), this.hornTypeIndex = 0, this.packages = {
                gid: "",
                num: 0,
                packageSuccessCall: function() {},
                packageCloseCall: function() {}
            }
        };
    Util.mixin(Horn, HornModel), Horn.prototype.init = function() {
        this.dom = new HornView({
            container: this.config.container,
            maxFontNum: this.config.maxFontNum,
            initData: this.config.initData,
            inputTips: this.config.inputTips
        }), this.dom.init(), this.msgCache = {}, this.addEvent(), this.goldMsg = new GoldHornMsg({
            container: this.config.gold_show_con
        }), this.goldMsg.init(), this.siteMsg = new SiteHornMsg({
            container: this.config.site_show_con
        }), this.siteMsg.init()
    }, Horn.prototype.showHorn = function(args) {
        this.goldMsg.showHorn(args)
    }, Horn.prototype.changeWidth = function(width) {
        this.goldMsg.changeWidth(width)
    }, Horn.prototype.showSiteHorn = function(args) {
        this.siteMsg.showHorn(args)
    }, Horn.prototype.openDialog = function(type, num, url, gid, success, closed) {
        this.openInputDialog(type, {
            num: num,
            gid: gid,
            packageSuccessCall: success,
            packageCloseCall: closed
        })
    }, Horn.prototype.openInputDialog = function(type, args) {
        this.hornTypeIndex = type, typeof args != "undefined" && (this.packages = args), type == 0 || type == 2 ? this.config.maxFontNum = 30 : this.config.maxFontNum = 15, this.speak_text.maxFontNum = this.config.maxFontNum, this.speak_text.clearText(), this.dom.openInputDialog(type, args)
    }, Horn.prototype.closeInputDialog = function() {
        this.dom.closeInputDialog(), (this.hornTypeIndex == 2 || this.hornTypeIndex == 3) && this.packages.packageCloseCall()
    }, Horn.prototype.addEvent = function() {
        var _this = this;
        this.speak_text = Widgets.Text({
            textarea: this.dom.hornTxt,
            tips: this.config.inputTips,
            Ele_max_font: this.dom.temp_span,
            maxFontNum: this.config.maxFontNum,
            callback: function() {
                _this.subTxt()
            }
        }), this.speak_text.init();
        var clickevent = Util.browser.Ipad ? "tap" : "click";
        this.dom.hornSend.on(clickevent, function() {
            _this.subTxt()
        }), this.dom.Ele_closed.on(clickevent, function() {
            _this.closeInputDialog()
        });
        var toggle = this.dom.toggle,
            _isSelector = toggle.data("hornType") ? !1 : !0;
        _isSelector ? (toggle.on(clickevent, function() {
            _this.dom.isChecked($(this)) ? (_this.dom.closeSelectorDialog(), _this.closeInputDialog()) : _this.dom.openSelectorDialog()
        }), this.dom.selector_closed.on(clickevent, function() {
            _this.dom.closeSelectorDialog()
        }), this.dom.goldBtn.on(clickevent, function() {
            var ele = $(this),
                gid = ele.attr("data-gid"),
                num = ele.attr("data-num");
            num == 0 ? _this.openInputDialog(0) : _this.openInputDialog(2, {
                gid: gid,
                num: num,
                packageSuccessCall: _this.config.packageSuccessCall,
                packageCloseCall: _this.config.packageCloseCall
            })
        }), this.dom.siteBtn.on(clickevent, function() {
            var ele = $(this),
                gid = ele.attr("data-gid"),
                num = ele.attr("data-num");
            num == 0 ? _this.openInputDialog(1) : _this.openInputDialog(3, {
                gid: gid,
                num: num,
                packageSuccessCall: _this.config.packageSuccessCall,
                packageCloseCall: _this.config.packageCloseCall
            })
        })) : toggle.on(clickevent, function() {
            _this.dom.isChecked($(this)) ? _this.closeInputDialog() : _this.openInputDialog(0)
        }), Util.browser.Ipad && (this.dom.bg.on(clickevent, function() {
            _this.closeInputDialog()
        }), $(window).on("orientationchange", function() {
            _this.closeInputDialog()
        }), this.dom.hornTxt.on("blur", function() {
            $(document.body).scrollTop(0)
        }))
    }, Horn.prototype.clearTxt = function() {
        this.speak_text.noText(), Util.browser.Ipad && this.closeInputDialog()
    }, Horn.prototype.subTxt = function() {
        var _this = this,
            ele = this.dom.hornTxt;
        if (Status.noLogin() || Status.isDisconnect()) return this.dom.hornTxt[0].blur(), this.dom.hornSend[0].blur(), !1;
        if (this.speak_text.verify() !== null) return Status.errorBubble(this.speak_text.verify(), ele), !1;
        if (this.dom.isSavingStatus()) return !1;
        this.dom.savingStatus();
        var value = $.trim(ele.val());
        this.hornTypeIndex == 1 ? this.siteHornSocket(this.config.socket, value, function(data) {
            _this.dom.normalStatus(), _this.clearTxt(), _this.config.sendHornCallback(_this.config.initData[1].price)
        }, function() {
            _this.dom.normalStatus()
        }, ele) : this.hornTypeIndex == 2 || this.hornTypeIndex == 3 ? this.packageSubmit(this.packages.gid, value, function(data) {
            _this.dom.normalStatus(), _this.clearTxt();
            var _n = parseInt(data.data);
            _this.dom.updateCountPackage(_this.hornTypeIndex, parseInt(_n)), _this.packages.packageSuccessCall(_this.packages.gid, parseInt(_n)), _n == 0 && _this.closeInputDialog()
        }, function() {
            _this.dom.normalStatus()
        }, ele) : this.goldHornSocket(this.config.socket, value, function(data) {
            _this.dom.normalStatus(), _this.clearTxt(), _this.config.sendHornCallback(_this.config.initData[0].price)
        }, function() {
            _this.dom.normalStatus()
        }, ele)
    }, Horn.prototype.INTERFACE_GoldHorn = function(value, errorCallback) {
        var _this = this;
        this.goldHornSocket(this.config.socket, value, function(data) {
            _this.config.sendHornCallback(_this.config.initData[0].price)
        }, function(data) {
            typeof errorCallback == "function" && errorCallback(data)
        })
    }, module.exports = Horn
}), define("VIEWS_HORN", ["JQ", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Horn = function(options) {
            this.config = $.extend({}, {
                container: null,
                maxFontNum: 30,
                initData: [{
                    name: "金喇叭",
                    price: 2e3,
                    num: 0,
                    gid: "",
                    type: 0
                }, {
                    name: "全站喇叭",
                    price: 5e4,
                    num: 0,
                    gid: "",
                    type: 1
                }],
                inputTips: ""
            }, options)
        };
    Horn.prototype = {
        init: function() {
            this.dom()
        },
        domBtn: function(data) {
            var _classes = data.type == 1 ? "site" : "gold",
                html = '<div class="btn ' + _classes + '" data-gid="' + data.gid + '" data-num="' + data.num + '">';
            return html += '<p class="name">' + data.name + '<span class="num">(免费<cite class="' + _classes + '-num">' + data.num + "</cite>)</span></p>", html += '<p class="price"><i class="ICON-coins">' + data.price + "</i></p>", html += "</div>", html
        },
        dom: function() {
            this.panel = $('<div class="MR-horn"></div>'), this.toggle = $('<div class="toggle"></div>'), this.panel.append(this.toggle);
            var len = this.config.initData.length;
            if (len <= 1) this.toggle.data("hornType", this.config.initData[0]), this.Ele_tips = $('<div class="tips M-bubble"><div class="arrow-bottom"></div></div>'), this.Ele_tips.append($('<div class="detail"><span class="ICON-coins">每条' + this.config.initData[0].price + "</span></div>")), this.Ele_tips.css({
                display: "none"
            }), this.panel.append(this.Ele_tips);
            else {
                this.selector = $('<div class="selector M-bubble"><div class="arrow-right"></div></div>'), this.selector.css({
                    display: "none"
                }), this.selector_closed = $('<span class="closed"></span>'), this.selector.append(this.selector_closed);
                var selector_con = $('<div class="detail"></div>');
                for (var i = 0; i < len; i++) selector_con.append(this.domBtn(this.config.initData[i]));
                this.selector.append(selector_con), this.goldBtn = this.selector.find(".gold"), this.siteBtn = this.selector.find(".site"), this.goldNum = this.selector.find(".gold-num"), this.siteNum = this.selector.find(".site-num"), this.panel.append(this.selector)
            }
            this.Ele_dialog = len <= 1 ? $('<div class="dialog M-bubble"><div class="arrow-right"></div></div>') : $('<div class="dialog"></div>'), this.Ele_dialog.css({
                display: "none"
            }), this.panel.append(this.Ele_dialog), this.Ele_title = $('<h4 class="gold"><i></i></h4>'), this.Ele_dialog.append(this.Ele_title), this.Ele_detail = $('<div class="detail"></div>'), this.Ele_dialog.append(this.Ele_detail), this.hornTxt = $("<textarea>" + this.config.inputTips + "</textarea>"), this.tips_con = $('<div class="opt clearfix"></div>'), this.Ele_detail.append(this.hornTxt), this.Ele_detail.append(this.tips_con), this.hornSend = $('<input type="button" value="发送" class="horn-send"/>'), this.temp_span = $("<span>还能输入" + this.config.maxFontNum + "字</span>"), this.num_span = $('<span class="num">，本次免费</span>'), this.num_span.css({
                display: "none"
            }), this.tips_con.append(this.temp_span), this.tips_con.append(this.num_span), this.tips_con.append(this.hornSend), this.Ele_closed = $('<span class="closed"></span>'), this.Ele_detail.append(this.Ele_closed), this.config.container.append(this.panel), len <= 1 && this.addEvent()
        },
        updateCountPackage: function(type, n) {
            type == 2 ? (this.goldBtn.attr("data-num", n), this.goldNum.html(n)) : type == 3 && (this.siteBtn.attr("data-num", n), this.siteNum.html(n))
        },
        savingStatus: function() {
            this.hornSend.addClass("sd-send-no")
        },
        isSavingStatus: function() {
            return this.hornSend.hasClass("sd-send-no")
        },
        normalStatus: function() {
            this.hornSend.removeClass("sd-send-no")
        },
        isChecked: function(obj) {
            return obj.hasClass("on")
        },
        openSelectorDialog: function() {
            this.toggle.addClass("on"), this.selector.show().addClass("selector-show")
        },
        closeSelectorDialog: function() {
            this.toggle.removeClass("on"), this.selector.hide(), this.selector.removeClass("selector-fx"), this.selector.removeClass("selector-show")
        },
        openInputDialog: function(type, args) {
            var _this = this,
                _time = 0;
            type == 0 || type == 2 ? (this.Ele_title[0].className = "gold", this.Ele_detail.removeClass("detail-site"), this.Ele_title.find("i").html("金喇叭"), this.tempAlert && setTimeout(function() {
                _this.tempAlert.hide()
            }, 0)) : (this.Ele_title[0].className = "site", this.Ele_detail.addClass("detail-site"), this.Ele_title.find("i").html("全站喇叭"), this.tempAlert && this.tempAlert.show()), typeof args != "undefined" ? (this.num_span.show(), this.updateCountPackage(type, args.num)) : this.num_span.hide(), this.toggle.addClass("on"), (type == 0 || type == 1) && this.selector && this.selector.hasClass("selector-show") && (_time = 600), this.selector && (this.selector.removeClass("selector-show"), this.selector.addClass("selector-fx"), Util.browser.IE && parseInt(Util.browser.version("IE")) < 10 && (_time = 0)), setTimeout(function() {
                _this.Ele_dialog.show().addClass("dialog-fx"), _this.selector && _this.selector.hide().removeClass("selector-fx")
            }, _time)
        },
        closeInputDialog: function() {
            this.Ele_dialog.hide(), this.toggle.removeClass("on"), this.Ele_dialog.removeClass("dialog-fx")
        },
        addEvent: function() {
            var _this = this,
                _time = null;
            this.toggle.hover(function() {
                _time = setTimeout(function() {
                    _this.toggle.hasClass("on") || _this.Ele_tips.show()
                }, 200)
            }, function() {
                clearTimeout(_time), _this.Ele_tips.hide()
            })
        }
    }, module.exports = Horn
}), define("MODELS_HORN", ["STATUS", "UTIL"], function(require, exports, module) {
    var Status = require("STATUS"),
        Util = require("UTIL"),
        _port = "/room/" + window.DDS.baseInfo.roomId,
        Horn = function() {};
    Horn.prototype.PORT_SUBMIT_PACKAGE = _port + "/pack/use", Horn.prototype.PORT_SUBMIT_GOLDHORN = _port + "/horn/save", Horn.prototype.PORT_SUBMIT_SITEHORN = _port + "/horn/global/save", Horn.prototype.packageSubmit = function(gid, value, successCallback, errorCallback, ele) {
        Util.post(this.PORT_SUBMIT_PACKAGE, {
            gid: gid,
            quantity: 1,
            content: value
        }, function(data) {
            successCallback(data)
        }, function() {}, function(data) {
            errorCallback(data), Status.ajaxError(data, ele)
        })
    }, Horn.prototype.goldHornSubmit = function(value, successCallback, errorCallback, ele) {
        Util.post(this.PORT_SUBMIT_GOLDHORN, {
            content: value
        }, function(data) {
            successCallback(data)
        }, function() {}, function(data) {
            errorCallback(data), Status.ajaxError(data, ele)
        })
    }, Horn.prototype.siteHornSubmit = function(value, successCallback, errorCallback, ele) {
        Util.post(this.PORT_SUBMIT_SITEHORN, {
            content: value
        }, function(data) {
            successCallback(data)
        }, function() {}, function(data) {
            errorCallback(data), Status.ajaxError(data, ele)
        })
    }, Horn.prototype.packageSocket = function(socket, gid, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "Package",
            upData: {
                g: gid,
                q: 1,
                m: value
            },
            downCallBack: function(data) {
                data.cd == 0 ? successCallback({
                    code: data.cd,
                    msg: data.m
                }) : (errorCallback(), ele && Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, Horn.prototype.goldHornSocket = function(socket, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "GoldHorn",
            upData: {
                m: value
            },
            downCallBack: function(data) {
                data.cd == 0 ? successCallback({
                    code: data.cd,
                    msg: data.m
                }) : (errorCallback({
                    code: data.cd,
                    msg: data.m
                }), ele && Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, Horn.prototype.siteHornSocket = function(socket, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "SiteHorn",
            upData: {
                m: value
            },
            downCallBack: function(data) {
                data.cd == 0 ? successCallback() : (errorCallback(), ele && Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, module.exports = Horn
}), define("GOLD_HORN_MSG", ["JQ", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        GoldHornMsg = function(options) {
            this.config = $.extend({}, {
                container: null,
                showHeight: 90,
                units: 10
            }, options)
        };
    GoldHornMsg.prototype = {
        init: function() {
            this.dom(), this.msgArr = [], this.TOGGLE = !0, this.beginMark = 0, this.endStat = !1, this.hideTime = null
        },
        dom: function() {
            this.hornBg = $('<div class="MR-horn-show"><div class="bg"></div></div>'), this.hornBg.css({
                display: "none"
            }), this.config.container.append(this.hornBg)
        },
        changeWidth: function(width) {},
        showHorn: function(args) {
            this.hornBg.show(), this.showWidth = this.hornBg.width();
            var div = $(this.msgHtml(args));
            this.hornBg.append(div);
            var top = Math.ceil(Math.random() * this.config.showHeight),
                _half = Math.ceil(top / 2);
            if (this.msgArr[this.msgArr.length - 1]) {
                var _temp = this.msgArr[this.msgArr.length - 1];
                _temp.top >= _half ? top = Math.ceil(Math.random() * _half) : top = Math.ceil(Math.random() * _half) + _half
            }
            div.css({
                left: this.showWidth + this.config.units,
                top: top
            }), this.msgArr.push({
                objects: div,
                width: div.width(),
                top: top
            }), this.TOGGLE ? this.fx(0) : this.endStat && this.fx(this.beginMark)
        },
        fx: function(n) {
            var _this = this;
            clearTimeout(this.hideTime);
            if (this.msgArr.length > 0 && this.msgArr[n]) {
                var args = this.msgArr[n];
                this.TOGGLE = !1;
                var _all = -args.width - this.config.units,
                    _times = (args.width + _this.showWidth) * this.config.units;
                args.objects.animate({
                    left: _all
                }, _times, "linear", function() {
                    args.objects.remove()
                }), setTimeout(function() {
                    _this.msgArr[n + 1] ? (_this.endStat = !1, _this.fx(n + 1)) : (_this.endStat = !0, _this.beginMark = n + 1, _this.hideTime = setTimeout(function() {
                        _this.msgArr = [], _this.hornBg.hide(), _this.TOGGLE = !0
                    }, _times / 2))
                }, _times / 2)
            }
        },
        msgHtml: function(args) {
            var _classes = args.gd == 1 ? "girl" : "";
            return '<div class="speak"><span class="' + _classes + '">' + Util.getUserNameHtml(args.n, args.i, args.l, args.al, args) + "</span>：" + Util.formatHTML(args.m) + "</div>"
        }
    }, module.exports = GoldHornMsg
}), define("SITE_HORN_MSG", ["JQ", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        SiteHornMsg = function(options) {
            this.config = $.extend({}, {
                container: null,
                distance: 200,
                units: 10
            }, options)
        };
    SiteHornMsg.prototype = {
        init: function() {
            this.dom(), this.msgArr = [], this.TOGGLE = !0, this.beginMark = -1, this.endStat = !1, this.hideTime = null
        },
        dom: function() {
            this.hornBg = $('<div class="MR-horn-site-show"></div>'), this.hornMark = $('<div class="mark"></div>'), this.hornBg.append(this.hornMark), this.hornCon = $('<div class="panel"></div>'), this.hornBg.append(this.hornCon), this.config.container.append(this.hornBg), this.showWidth = this.hornBg.width(), this.hornBg.css({
                display: "none"
            })
        },
        showHorn: function(args) {
            var _this = this;
            this.hornBg.show(), this.beginMark += 1;
            var div = $(this.msgHtml(args));
            this.hornCon.append(div), div.css({
                left: this.showWidth + 10
            });
            var _width = div.width(),
                _times = (_width + this.showWidth + 20) * this.config.units,
                _arr = {
                    index: this.beginMark,
                    objects: div,
                    width: _width,
                    times: _times
                };
            this.msgArr.push(_arr), this.TOGGLE ? this.fx(_arr) : this.endStat && (_this.endStat = !1, this.fx(_arr))
        },
        getNextArr: function(arr) {
            for (var i = 0; i < this.msgArr.length; i++)
                if (arr.index == this.msgArr[i].index) return this.msgArr[i + 1] ? this.msgArr[i + 1] : null
        },
        fx: function(args) {
            var _this = this;
            this.TOGGLE = !1;
            var _index = args.index;
            _left1 = this.showWidth - args.width - this.config.distance, _time1 = (args.width + this.config.distance + 10) * this.config.units, _left2 = -args.width - 10, _time2 = args.times - _time1, args.objects.animate({
                left: _left1
            }, _time1, "linear", function() {
                var _next = _this.getNextArr(args);
                _next != null ? _this.fx(_next) : _this.endStat = !0, $(this).animate({
                    left: _left2
                }, _time2, "linear", function() {
                    $(this).remove(), _this.msgArr.shift(), _this.msgArr.length == 0 && (_this.TOGGLE = !0, _this.endStat = !1, _this.hornBg.hide())
                })
            })
        },
        msgHtml: function(args) {
            var _classes = args.gd == 1 ? "girl" : "";
            return '<div class="speak"><span class="' + _classes + '">' + Util.getUserNameHtml(args.n, args.i, args.l, args.al, args) + "</span>：" + Util.formatHTML(args.m) + '<i class="pd"><a href="/room/' + args.ar + '">[' + args.an + "的直播频道]</a></i>"
        }
    }, module.exports = SiteHornMsg
}), define("CONTROLS_BONUS", ["JQ", "UTIL", "STATUS", "WIDGETS", "BONUS_SEND", "BONUS_ACCEPT"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Status = require("STATUS"),
        Widgets = require("WIDGETS"),
        BonusSend = require("BONUS_SEND"),
        BonusAccept = require("BONUS_ACCEPT"),
        Bonus = function(options) {
            this.config = $.extend({}, {
                socket: null,
                getMoneyCallback: function() {},
                views: null,
                bonus_bt: ".list-container",
                bonus_show_con: "#LF-area-video",
                bonusTypeIndex: 1,
                inputTips: "",
                maxBonusDesFontNum: 30,
                maxBonusNum: 30,
                data: null,
                initData: [{
                    name: "金喇叭",
                    type: 0,
                    num: 0,
                    gid: "",
                    price: 2e3
                }, {
                    name: "全站喇叭",
                    price: 5e4,
                    num: 0,
                    gid: "",
                    type: 1
                }],
                sendBonusSuccessCall: function() {},
                sendBonusFailCall: function() {},
                acceptBonusSuccessCall: function() {},
                acceptBonusFailCall: function() {},
                grabBonusSuccessCall: function() {},
                grabBonusFailCall: function() {}
            }, options)
        };
    Bonus.prototype.init = function() {
        this.sendBonusObj = new BonusSend({
            socket: this.config.socket,
            bonus_bt: this.config.bonus_bt,
            bonusTypeIndex: this.config.bonusTypeIndex,
            inputTips: this.config.inputTips,
            maxBonusDesFontNum: this.config.maxBonusDesFontNum,
            maxBonusNum: this.config.maxBonusNum,
            initData: this.config.initData,
            inputTips: this.config.inputTips
        }), this.acceptBonusObj = new BonusAccept({
            socket: this.config.socket,
            container: this.config.bonus_show_con,
            initData: this.config.initData,
            getMoneyCallback: this.config.getMoneyCallback
        }), this.acceptBonusObj.init(), this._addEvent()
    }, Bonus.prototype._addEvent = function() {
        var _this = this;
        $("body").on("click.bonus.send", '[red-action="open-red-send"]', function() {
            _this.price = $(this).data("price"), $(this).removeData("price"), _this.openBonusSendDialog(_this.price)
        }), $("body").on("click.bonus.result", '[red-action="open-red-result"]', function() {
            _this.rid = $(this).data("rid"), _this.acceptBonusObj.showBigBonusResult(_this.rid)
        })
    }, Bonus.prototype.openBonusSendDialog = function(price) {
        this.sendBonusObj.init(price)
    }, Bonus.prototype.closeBonusSendDialog = function() {
        this.sendBonusObj.closeBonusSendDialog(args)
    }, Bonus.prototype.showSmallBonus = function(args) {
        this.acceptBonusObj.showSmallBonus(args)
    }, Bonus.prototype.destroyAllBonus = function() {
        this.acceptBonusObj.destroyAllBonus()
    }, module.exports = Bonus
}), define("MODELS_BONUS", ["STATUS", "UTIL"], function(require, exports, module) {
    var Status = require("STATUS"),
        Util = require("UTIL"),
        Bonus = function() {};
    Bonus.prototype.initData = function(socket, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "PondData",
            upData: value,
            downCallBack: function(data) {
                data.cd == 0 ? successCallback(data) : (errorCallback(), Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, Bonus.prototype.sendOutBonusSocket = function(socket, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "AssignRedpack",
            upData: value,
            downCallBack: function(data) {
                data.cd == 0 ? successCallback({
                    code: data.cd,
                    msg: data.m
                }) : (errorCallback(), Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, Bonus.prototype.grabBonusSocket = function(socket, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "GrabRedpack",
            upData: value,
            downCallBack: function(data) {
                data.cd == 0 || data.cd == -1 ? successCallback(data) : (errorCallback(), Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, Bonus.prototype.lookLuckSocket = function(socket, value, successCallback, errorCallback, ele) {
        Util.socketRequest({
            socket: socket,
            methodName: "GrabedRedpackUserList",
            upData: value,
            downCallBack: function(data) {
                data.cd == 0 ? successCallback(data) : (errorCallback(), Status.ajaxError({
                    code: data.cd,
                    msg: data.m
                }, ele))
            },
            overTimeCallBack: function() {
                errorCallback()
            }
        })
    }, module.exports = Bonus
}), define("BONUS_SEND", ["MODELS_BONUS", "JQ", "UTIL", "DIALOG", "PH"], function(require, exports, module) {
    var BonusModel = require("MODELS_BONUS");
    BonusModel = new BonusModel;
    var $ = require("JQ"),
        Util = require("UTIL"),
        Dialog = require("DIALOG"),
        PH = require("PH"),
        BonusSend = function(options) {
            this.config = $.extend({}, {
                socket: null,
                bonus_bt: null,
                bonusTypeIndex: 1,
                maxBonusDesFontNum: 30,
                maxBonusNum: 30,
                initData: null,
                verifyFlag1: !0,
                verifyFlag2: !0,
                verifyFlag3: !0,
                verifyFlag4: !0,
                inputTips: ""
            }, options)
        };
    BonusSend.prototype = {
        init: function(price) {
            this._domBonusSettingDialog(price), this._addEvent()
        },
        _addEvent: function() {
            var _this = this,
                clickevent = Util.browser.Ipad ? "tap" : "click",
                $distributionWay = this.$random.add(this.$average),
                $input = this.$totalMoneyNum.add(this.$singleMoney).add(this.$bonusWord).add(this.$bonusNum);
            $distributionWay.on(clickevent, function() {
                var $this = $(this);
                return $this.find("span").addClass("fous-icon").removeClass("blur-icon"), $distributionWay.not(this).find("span").removeClass("fous-icon").addClass("blur-icon"), $this.index() === 0 ? (_this.config.bonusTypeIndex = 1, _this.$totalMoneyNum.parents("li").css("display", "block"), _this.$singleMoney.parents("li").css("display", "none")) : (_this.config.bonusTypeIndex = 0, _this.$totalMoneyNum.parents("li").css("display", "none"), _this.$singleMoney.parents("li").css("display", "block")), !1
            }), this.$singleMoney.add(this.$totalMoneyNum).add(this.$bonusNum).on("keyup", function() {
                var tempPrice = parseInt(_this.priceValue);
                return _this.config.bonusTypeIndex == 1 ? _this.$totalMoneyNum.val().match(/^[1-9]\d*$/) && (_this.$totalMoneyDesc.html(parseInt(_this.$totalMoneyNum.val())), tempPrice = parseInt(_this.priceValue) - parseInt(_this.$totalMoneyNum.val())) : _this.$bonusNum.val().match(/^[1-9]\d*$/) && _this.$singleMoney.val().match(/^[1-9]\d*$/) && _this.$bonusNum.val().match(/^[1-9]\d*$/) && (_this.$totalMoneyDesc.html(Util.roundOff(parseInt(_this.$bonusNum.val()) * parseInt(_this.$singleMoney.val()))), tempPrice = parseInt(_this.priceValue) - parseInt(_this.$bonusNum.val()) * parseInt(_this.$singleMoney.val())), _this.$price.html(Util.roundOff(tempPrice)), _this.$price.data("price", tempPrice), !1
            }), _this.$bonusWord.on("keyup", function() {
                var tempNum = 30 - _this.$bonusWord.val().length;
                tempNum >= 0 ? (_this.$tipNum.removeClass("strong-red"), _this.$tipNum.html("还能输入" + tempNum + "个字")) : (_this.$tipNum.html("已超过最大30个字"), _this.$tipNum.addClass("strong-red")), _this.$tipNum.html()
            }), $input.on("blur", function() {
                var $this = $(this),
                    ExpObj = {
                        ExpPositiveInteger: /^[1-9]\d*$/
                    };
                if ($this.parents("li").css("display") !== "none") switch (this.id) {
                    case "bonus-num-input":
                        $this.val().match(ExpObj.ExpPositiveInteger) === null || $this.val() > 50 || $this.val().length === 0 ? (_this.config.verifyFlag1 = !1, $this.parent(".right").css("borderColor", "#f33b39"), $this.parent(".right").find(".inputError").html("填写正整数，最多不超过50")) : (_this.config.verifyFlag1 = !0, $this.parent(".right").css("borderColor", "#4e4a4d"), $this.parent(".right").find(".inputError").empty());
                        break;
                    case "total-money-num-input":
                        $this.val().match(ExpObj.ExpPositiveInteger) !== null && parseInt($this.val()) < parseInt(_this.$bonusNum.val()) ? (_this.config.verifyFlag2 = !1, $this.parent(".right").css("borderColor", "#f33b39"), $this.parent(".right").find(".inputError").html("红包总额太少啦，不够抢啊")) : $this.val().match(ExpObj.ExpPositiveInteger) === null ? (_this.config.verifyFlag2 = !1, $this.parent(".right").css("borderColor", "#f33b39"), $this.parent(".right").find(".inputError").html("填写正整数")) : parseInt(_this.$totalMoneyNum.val()) > parseInt(_this.priceValue) ? (_this.config.verifyFlag2 = !1, $this.parent(".right").css("borderColor", "#f33b39"), $this.parent(".right").find(".inputError").html("红包总额不能超过小金库剩余星币"), _this.$totalMoneyDesc.css("color", "#f33b39"), _this.$totalMoney.css("color", "#f33b39"), _this.$totalMoney.css("color", "#f33b39"), _this.$balance.addClass("strong-red")) : (_this.config.verifyFlag2 = !0, $this.parent(".right").css("borderColor", "#4e4a4d"), $this.parent(".right").find(".inputError").empty(), _this.$totalMoneyDesc.css("color", "#ffc12e"), _this.$totalMoney.css("color", "#ffc12e"), _this.$totalMoney.css("color", "#ffc12e"), _this.$balance.removeClass("strong-red"));
                        break;
                    case "single-money-input":
                        $this.val().match(ExpObj.ExpPositiveInteger) === null ? (_this.config.verifyFlag3 = !1, $this.parent(".right").css("borderColor", "#f33b39")) : _this.$bonusNum.val() * _this.$singleMoney.val() > parseInt(_this.priceValue) ? (_this.config.verifyFlag3 = !1, $this.parent(".right").css("borderColor", "#f33b39"), $this.parent(".right").find(".inputError").html("红包总额不能超过小金库剩余星币"), _this.$totalMoneyDesc.css("color", "#f33b39"), _this.$totalMoney.css("color", "#f33b39"), _this.$totalMoney.css("color", "#f33b39"), _this.$balance.addClass("strong-red")) : (_this.config.verifyFlag3 = !0, $this.parent(".right").css("borderColor", "#4e4a4d"), $this.parent(".right").find(".inputError").empty(), _this.$totalMoneyDesc.css("color", "#ffc12e"), _this.$totalMoney.css("color", "#ffc12e"), _this.$totalMoney.css("color", "#ffc12e"), _this.$balance.removeClass("strong-red"));
                        break;
                    case "bonus-word-input":
                        $this.val().length > 30 ? (_this.config.verifyFlag4 = !1, $this.parent(".right").css("borderColor", "#f33b39")) : (_this.config.verifyFlag4 = !0, $this.parent(".right").css("borderColor", "#4e4a4d"));
                        break;
                    default:
                }
            }), this.$sendBonusActive.on(clickevent, function() {
                $input.trigger("blur");
                if (!(_this.config.verifyFlag1 && _this.config.verifyFlag2 && _this.config.verifyFlag3 && _this.config.verifyFlag4)) return !1;
                _this.$sendBonusActive.addClass("send-bonus-blur"), _this.$sendBonusActive.unbind("click"), _this.$sendBonusActive.css("cursor", "auto");
                var submitData = null;
                _this.config.bonusTypeIndex === 0 ? submitData = {
                    t: _this.config.bonusTypeIndex,
                    p: _this.$bonusNum.val(),
                    c: _this.$singleMoney.val() * _this.$bonusNum.val(),
                    s: _this.$bonusWord.val().length > 0 ? _this.$bonusWord.val() : "起来嗨~小社团发福利，抢红包咯！"
                } : submitData = {
                    t: _this.config.bonusTypeIndex,
                    p: _this.$bonusNum.val(),
                    c: _this.$totalMoneyNum.val(),
                    s: _this.$bonusWord.val().length > 0 ? _this.$bonusWord.val() : "起来嗨~小社团发福利，抢红包咯！"
                }, BonusModel.sendOutBonusSocket(_this.config.socket, submitData, function() {
                    _this._BonusSettingDialog.destroy()
                }, function() {}, _this.$sendBonusActive)
            })
        },
        _domBonusSettingDialog: function(price) {
            var _this = this;
            this.priceValue = price, _this.config.bonusTypeIndex = 1;
            var bonusSettingDialogStr = ['<div class="bonus-setting-dialog">', '    <ul class="bonus-setting-dialog-ul-form">', '        <li class="title-li">发放红包</li>', '        <li class="distribution-way-li clearfix">', '            <div class="left">分配方式：</div>', '            <div class="right" >', '                <div class="random"  onselectstart="return false;" style="-moz-user-select:none;"><span class="fous-icon"></span>随机分配</div>', '                <div class="average"  onselectstart="return false;" style="-moz-user-select:none;"><span class="blur-icon"></span>平均分配</div>', "            </div>", "        </li>", '        <li class="clearfix">', '            <div class="left">红包个数：</div>', '            <div class="right"><div class="inputError"></div><input type="text" autocomplete="off" value="" placeholder="填写整数，不超过50个"', '                                      class="bonus-input" name="bonus-num" id="bonus-num-input"><span>个</span></div>', "        </li>", '        <li class="clearfix" style="margin-bottom: 0">', '            <div class="left">总星币数：</div>', '            <div class="right"><div class="inputError"></div><input type="text" autocomplete="off" value="" placeholder="填写整数" class="bonus-input"', '                                      name="total-money-num" id="total-money-num-input"><span>星币</span></div>', "        </li>", '        <li class="clearfix single-money-li" style="margin-bottom: 0">', '            <div class="left left-two-line">单个红包星币数：', "            </div>", '            <div class="right"><div class="inputError"></div><input type="text" autocomplete="off" value="" placeholder="填写整数" class="bonus-input"', '                                      name="single-money" id="single-money-input"><span>星币</span></div>', "        </li>", '        <li class="error-tip-li clearfix">', '            <span class="tip-num">还能输入30个字</span>', "        </li>", '        <li class="clearfix">', '            <div class="left">红包口号：</div>', '            <div class="right"><input type="text" autocomplete="off" value="" placeholder="起来hig,大家积极来做任务哦~"', '                                      class="bonus-input" name="bonus-word" id="bonus-word-input"></div>', "        </li>", "    </ul>", '    <ul class="bonus-setting-dialog-ul-opear">', '        <li class="total-money"><span class="total-moeny-desc" data-totalMoenyDesc=0>0</span>星币</li>', '        <li class="surplus-money">社团小金库，<span class="balance ">财富剩余：<span class="price" data-price=' + price + ">" + Util.roundOff(price) + "</span>星币</span></li>", '        <li class=" send-bonus-active ">发红包</li>', "    </ul>", "</div>"].join(""),
                BonusSettingDialog = Dialog.dialog({
                    width: 300,
                    height: 400,
                    title: "",
                    content: bonusSettingDialogStr,
                    onOpen: function(box) {
                        var $container = box.boxer.find(".bonus-setting-dialog");
                        _this.$random = $container.find(".random"), _this.$average = $container.find(".average"), _this.$bonusNum = $container.find("#bonus-num-input"), _this.$totalMoneyNum = $container.find("#total-money-num-input"), _this.$singleMoney = $container.find("#single-money-input"), _this.$bonusWord = $container.find("#bonus-word-input"), _this.$sendBonusActive = $container.find(".send-bonus-active"), _this.$price = $container.find(".price"), _this.$totalMoneyDesc = $container.find(".total-moeny-desc"), _this.$totalMoney = $container.find(".total-money"), _this.$balance = $container.find(".balance"), _this.$tipNum = $container.find(".tip-num"), _this.phBonusNum = PH.placeholderAddSpan({
                            dom: _this.$bonusNum,
                            spanClass: "bonus-setting-dialog-ph "
                        }).init(), _this.phTotalMoneyNum = PH.placeholderAddSpan({
                            dom: _this.$totalMoneyNum,
                            spanClass: "bonus-setting-dialog-ph "
                        }).init(), _this.phSingleMoney = PH.placeholderAddSpan({
                            dom: _this.$singleMoney,
                            spanClass: "bonus-setting-dialog-ph "
                        }).init(), _this.phBonusWord = PH.placeholderAddSpan({
                            dom: _this.$bonusWord,
                            spanClass: "bonus-setting-dialog-ph "
                        }).init()
                    }
                });
            BonusSettingDialog.init(), this._BonusSettingDialog = BonusSettingDialog
        },
        openBonusSendDialog: function(data) {
            this._BonusSettingDialog.init()
        },
        verify: function(obj) {}
    }, module.exports = BonusSend
}), define("BONUS_ACCEPT", ["MODELS_BONUS", "JQ", "UTIL", "SCROLL"], function(require, exports, module) {
    var BonusModel = require("MODELS_BONUS");
    BonusModel = new BonusModel;
    var $ = require("JQ"),
        Util = require("UTIL"),
        Scroll = require("SCROLL"),
        BonusAccept = function(options) {
            this.config = $.extend({}, {
                socket: null,
                container: "#LF-area-video",
                bigContainer: "#LF-stager",
                smallBonusClickFlag: !1
            }, options)
        };
    BonusAccept.prototype = {
        init: function() {
            this.msgArr = [], this.TOGGLE = !0, this._getInitData()
        },
        _getInitData: function() {
            var _this = this;
            BonusModel.initData(_this.config.socket, {}, function(args) {
                var resultData = args;
                resultData.ca === !1 && resultData.ct - resultData.at < resultData.e * 1e3 && _this.showSmallBonus(resultData)
            }, function() {}, $("body"))
        },
        _addEventSmallBonus: function(data) {
            var _this = this,
                clickevent = Util.browser.Ipad ? "tap" : "click";
            this.$bonusSmallDialog.on(clickevent, function(e) {
                return _this.config.smallBonusClickFlag ? (_this.hideSmallBonus(), data.body.e = _this.bonusLiftTime, _this.$bonusBigDialog && _this.$bonusBigDialog.length !== 0 ? _this.reshowBigBonus(data) : _this.showBigBonus(data), !1) : !1
            }), this.$bonusSmallDialog.on("mouseover", function(e, data) {
                return _this.isStop = !0, !1
            }), this.$bonusSmallDialog.on("mouseout", function(e, data) {
                return _this.isStop = !1, !1
            })
        },
        _addEventBigBonus: function(data) {
            var upData = data,
                _this = this,
                clickevent = Util.browser.Ipad ? "tap" : "click";
            this.$bigBonusActivebtn = this.$bonusBigDialog.find(".big_bonus_active_btn"), this.$bigBonusClose = this.$bonusBigDialog.find(".dds-dialog-closed"), this.$bigBonusActivebtn.on(clickevent, function(e) {
                var imgClassArryBefore = ["_001", "_002"],
                    imgClassArryAfter = ["_001", "_002", "_003", "_004", "_005", "_006", "_007"];
                _this.$bigBonusActivebtn.css("display", "none"), _this._animateByBackgroundImg(_this.$bonusBigDialog, imgClassArryBefore, 200, "bigBonusTimerBefore", !0), BonusModel.grabBonusSocket(_this.config.socket, {
                    r: upData.body.id
                }, function(data) {
                    var resultData = data;
                    resultData.c === -2 && _this.$bigBonusActivebtn.css("display", "block"), clearInterval(_this.bigBonusTimerBefore), resultData.s !== 2 ? _this._animateByBackgroundImg(_this.$bonusBigDialog, imgClassArryAfter, 250, "bigBonusTimerSuccess", !1, _this._domAfterSucessOpenBigBonus, resultData) : (_this.$bonusBigDialog.find(".bonus-bonus-result_list_scroll") ? (_this.$bonusBigDialog.find(".bonus-title,.bonus-bonus-result_list_scroll,.bonus-bonus-result_list_scrollBar").remove(), _this.$bonusBigDialog.find(".show-out-time").css("marginTop", "154px")) : _this.$bonusBigDialog.find(".bonus-title,.send-bonus-desc,.bonus-bonus-result_list,.bonus-bonus-result_list_scrollBar").remove(), _this.$bigBonusActivebtn.addClass(" big_bonus_disable_btn"), _this.$bigBonusActivebtn.css({
                        cursor: "default",
                        display: "block",
                        opacity: 1
                    }), _this.$bigBonusActivebtn.unbind("click"), _this.$bonusBigDialog.removeClass("_002"), _this.$bonusBigDialog.addClass("_001"), _this.$bonusBigDialog.find(".show-bonus-word").length > 0 ? _this.$bonusBigDialog.find(".show-bonus-word").html('<div class="show-bonus-word-first">  升级活跃等级到 <span class="ICON-active-level ICON-acl-3"></span></div><div class="show-bonus-word-second">才能抢红包哦，快快升级吧~</div>') : _this.$bonusBigDialog.find(".panel").append('<div class="show-bonus-word"><div class="show-bonus-word-first">升级活跃等级到 <span class="ICON-active-level ICON-acl-3"></span> </div> <div class="show-bonus-word-second">才能抢红包哦，快快升级吧~</div></div>'))
                }, function() {
                    clearInterval(_this.bigBonusTimerBefore), _this.$bonusBigDialog.removeClass("_002"), _this.$bonusBigDialog.addClass("_001"), _this.$bigBonusActivebtn.css("display", "block")
                }, _this.$bigBonusActivebtn)
            }), this.$bigBonusClose.on(clickevent, function(e, data) {
                _this.hideBigBonus(), _this.reshowSamllBonus()
            }), this.lookResult.on(clickevent, function(e, isReshFlag) {
                BonusModel.lookLuckSocket(_this.config.socket, {
                    r: upData.body.id
                }, function(data) {
                    var resultData = data;
                    isReshFlag && isReshFlag.refresh ? (_this.$bonusBigDialog.find(".bonus-bonus-result_list_scrollBar,.bonus-bonus-result_list_scroll").remove(), _this._domBonusResultList(resultData), _this.$bonusBigDialog.removeClass("bonusBounceOut").addClass("bonusBounceIn"), _this.$bonusBigDialog.css("display", "block")) : (_this.$bigBonusActivebtn.addClass("big_bonus_also_active_btn"), _this.$bonusBigDialog.find(".show-bonus-word").remove(), _this.$bonusBigDialog.find(".look-result").css("display", "none"), _this.$bonusBigDialog.find(".panel").prepend('<div class="bonus-title"> 我就静静的看着你们抢！</div>'), _this.$bonusBigDialog.find(".show-out-time").css("margin-top", "102px"), _this.$bonusBigDialog.find(".panel").append('<div class="send-bonus-desc"><span class="strong-yellow">' + resultData.an + "</span> 发" + resultData.tp + '份红包，价值<span class="strong-yellow">' + resultData.tc + "</span>星币 "), _this._domBonusResultList(resultData))
                }, function() {}, _this.$bigBonusActivebtn)
            })
        },
        _domBonusResultList: function(resultData, contentEle) {
            var _this = this,
                contentWarp = null;
            contentEle ? contentWarp = contentEle : contentWarp = _this.$bonusBigDialog.find(".panel"), contentWarp.append(function() {
                var listHtml = '<div class="bonus-bonus-result_list_scroll"><ul class="bonus-bonus-result_list">';
                return resultData && $.each(resultData.l, function(i, listObj) {
                    listObj.u === parseInt(DDS.userInfo.userId) ? listHtml += '<li class="clearfix"> <div class="left strong-yellow">' + listObj.r + ".&nbsp;" + listObj.n + '</div><div class="right strong-yellow">' + listObj.c + "星币</li>" : listHtml += '<li class="clearfix"> <div class="left">' + listObj.r + ".&nbsp;" + listObj.n + '</div><div class="right strong-yellow">' + listObj.c + "星币</li>"
                }), listHtml += "</ul></div>", listHtml += '<div class="bonus-bonus-result_list_scrollBar"></div>', listHtml
            }());
            var scroller = Scroll.scroll({
                Ele_panel: contentWarp.find(".bonus-bonus-result_list")[0],
                Ele_scroll: contentWarp.find(".bonus-bonus-result_list_scrollBar")[0]
            });
            scroller.init()
        },
        _domAfterSucessOpenBigBonus: function(resultData) {
            var _this = this;
            _this.$bonusBigDialog.find(".show-bonus-word,.bonus-title,.send-bonus-desc,.bonus-bonus-result_list_scroll,.bonus-bonus-result_list_scrollBar").remove(), _this.$bonusBigDialog.find(".look-result").css("display", "none"), resultData.s === 0 ? (_this.$bonusBigDialog.find(".panel").prepend('<div class="bonus-num strong-yellow">' + resultData.c + "星币</div>"), _this.$bonusBigDialog.find(".panel").prepend('<div class="bonus-accpet-title">好人品！您获得了</div>'), _this.$bonusBigDialog.find(".show-out-time").css("margin-top", "80px"), this.config.getMoneyCallback(resultData.c)) : resultData.s === 3 ? (_this.$bonusBigDialog.find(".panel").prepend('<div class="bonus-fail-desc ">太抢手了~红包已经抢光了！</div>'), _this.$bonusBigDialog.find(".panel").prepend('<div class="bonus icon_cry"></div>'), _this.$bonusBigDialog.find(".show-out-time").css("margin-top", "70px")) : resultData.s === 4 ? (_this.$bonusBigDialog.find(".panel").prepend('<div class="bonus-fail-desc ">您已经抢过了，等待下次机会吧！</div>'), _this.$bonusBigDialog.find(".panel").prepend('<div class="bonus icon_cry"></div>'), _this.$bonusBigDialog.find(".show-out-time").css("margin-top", "70px")) : resultData.s === 5 ? (_this.$bonusBigDialog.find(".panel").prepend('<div class="bonus-fail-desc ">红包已经过期了~下回早点来！</div>'), _this.$bonusBigDialog.find(".panel").prepend('<div class="bonus icon_cry"></div>'), _this.$bonusBigDialog.find(".show-out-time").css("margin-top", "70px")) : alert(resultData.m), resultData.s !== 2 && (_this.$bonusBigDialog.find(".panel").append('<div class="send-bonus-desc"><span class="strong-yellow">' + resultData.an + "</span> 发" + resultData.tp + '份红包，价值<span class="strong-yellow">' + resultData.tc + "</span>星币 "), _this._domBonusResultList(resultData))
        },
        _domSmallBonus: function(addEventFunction, data) {
            data.body || (data.body = data, data.body.ca === !1 && (data.body.c = 5 - (data.ct - data.at) / 1e3 > 0 ? 5 - (data.ct - data.at) / 1e3 : 0, data.body.e = 600 - (data.ct - data.at) / 1e3 > 0 ? 600 - (data.ct - data.at) / 1e3 : 0));
            var _this = this;
            this.destroyAllBonus();
            var smallBonusStr = ['<div class="bonus-small-dialog bonus N01" onselectstart="return false;" style="-moz-user-select:none;">', '<div class="bonus star starShow"></div><div class="bonus middle_star starShow"></div><div  class="bonus small_star starShow"></div>    <div class="time">', "    </div>", ' <div  class="second-time-warp">   <div class="second-time">', "    </div></div>", "</div>"].join("");
            $(this.config.container).append(smallBonusStr), this.$bonusSmallDialog = $(this.config.container).find(".bonus-small-dialog"), this.$countDown = this.$bonusSmallDialog.find(".time"), this.$countDownSecond = this.$bonusSmallDialog.find(".second-time"), this._animateSmallBonus();
            var tempTime = 0;
            _this.bonusLiftTime = Math.round(data.body.e), this.bonusLiftTimer && clearInterval(this.bonusLiftTimer), this.bonusLiftTimer = function(time) {
                if (time <= 1) return;
                tempTime = time;
                var bonusLiftTimer = setInterval(function() {
                    tempTime -= 1, _this.bonusLiftTime = tempTime, tempTime <= 0 && (clearInterval(bonusLiftTimer), _this.$bonusSmallDialog && (_this.$bonusSmallDialog.remove(), clearInterval(_this.bonusSmallDialogTimer)), _this.$bonusBigDialog && _this.$bonusBigDialog.remove())
                }, 1e3);
                return bonusLiftTimer
            }(Math.round(data.body.e)), this._countdown(this.$countDown, Math.round(data.body.c), function() {
                !_this.bonusLiftTime, _this._countdown(_this.$countDownSecond, _this.bonusLiftTime, function() {}), clearInterval(this.smallBounsTimerSecond), _this.smallBounsTimerSecond = setInterval(function() {
                    _this.$bonusSmallDialog.addClass("N01"), _this.$bonusSmallDialog.removeClass("N06"), _this._animateByBackgroundImg.call(_this, _this.$bonusSmallDialog, ["N01", "N02", "N03", "N04", "N05", "N06"], 120, "bonusSmallDialogTimer", !1)
                }, 1500)
            }), addEventFunction.call(this, data)
        },
        _animateSmallBonus: function() {
            var _this = this;
            this.$bonusSmallDialog.animate({
                opacity: 1,
                height: 106
            }, 800, "swing", function() {
                _this.$bonusSmallDialog.find(".star,.middle_star,.small_star").css("display", "block"), _this._zoomWidthTransition.call(_this, _this.$bonusSmallDialog)
            })
        },
        _animateByBackgroundImg: function($element, imgClassArry, intervalTime, timername, isloop, callBack, resultData) {
            var _this = this;
            this.isStop = !1;
            var index = 0;
            this[timername] && clearInterval(this[timername]), this[timername] = setInterval(function() {
                if (_this.isStop) return;
                $element.removeClass(imgClassArry[index]);
                if (index !== imgClassArry.length - 1) $element.addClass(imgClassArry[++index]);
                else {
                    if (!isloop) {
                        clearInterval(_this[timername]), $element.addClass(imgClassArry[imgClassArry.length - 1]), typeof callBack == "function" && callBack.call(_this, resultData);
                        return
                    }
                    $element.addClass(imgClassArry[0]), index = 0
                }
            }, intervalTime)
        },
        _countdown: function($warpElement, timeLeft, countDownCallBack) {
            var _this = this,
                timeLeft = timeLeft * 1e3,
                countdownTimer = 0;
            if (Math.round(timeLeft / 1e3) === 0) {
                countdownTimer != 0 && $warpElement.html(0), this.config.smallBonusClickFlag = !0, $warpElement.remove(), this.$bonusSmallDialog.css("cursor", "pointer"), clearTimeout(countdownTimer), countDownCallBack();
                return
            }
            var startMinutes = parseInt(timeLeft / 6e4, 10),
                startSec = parseInt((timeLeft - startMinutes * 60 * 1e3) / 1e3);
            startMinutes > 0 ? $warpElement.html((startMinutes < 10 ? "0" + startMinutes : startMinutes) + ":" + (startSec < 10 ? "0" + startSec : startSec)) : $warpElement.html(startSec), timeLeft -= 1e3, _this.countdownTimer = setTimeout(function() {
                _this._countdown.call(_this, $warpElement, timeLeft / 1e3, countDownCallBack)
            }, 1e3)
        },
        cssSupports: function(prop) {
            var div = document.createElement("div"),
                vendors = "Khtml O Moz Webkit".split(" "),
                len = vendors.length;
            if (prop in div.style) return !0;
            if ("-ms-" + prop in div.style) return !0;
            prop = prop.replace(/^[a-z]/, function(val) {
                return val.toUpperCase()
            });
            while (len--)
                if (vendors[len] + prop in div.style) return !0;
            return !1
        },
        _zoomWidthTransition: function($element, classStr) {
            var _this = this;
            this.cssSupports("animation") && this.cssSupports("transition") ? $element.addClass("animated common-zoom") : this.cssSupports("transform") && this.cssSupports("transition")
        },
        _domBigBonus: function(addEventFunction, data) {
            var bigBonusStr = ['<div class="bonus-big-dialog bonus _001 animated bonusBounceIn">', '    <div class="panel" style="-moz-user-select:none;" onselectstart="return false;">', '        <span class="dds-dialog-closed"></span>', '        <span class="bonus  big_bonus_active_btn "></span>', '        <div class="show-out-time"><span class="out-time">10:00</span> 后红包过期</div>', '        <div class="show-bonus-word">', '            <div class="show-bonus-word-first">', "                起来嗨，大家做任务哦", "            </div>", '            <div class="show-bonus-word-second">' + data.body.s + "</div>", "        </div>", '        <div class="look-result">', "            <span>看看大家手气>></span>", "        </div>", "    </div>", "</div>"].join("");
            $(this.config.bigContainer).append(bigBonusStr), this.$bonusBigDialog = $(".bonus-big-dialog");
            var timeStart = data.body.e;
            this._countdown(this.$bonusBigDialog.find(".out-time"), timeStart, function() {}), this.lookResult = this.$bonusBigDialog.find(".look-result"), addEventFunction.call(this, data)
        },
        showSmallBonus: function(data) {
            this._domSmallBonus(this._addEventSmallBonus, data)
        },
        showBigBonus: function(data) {
            this._domBigBonus(this._addEventBigBonus, data)
        },
        showBigBonusResult: function(data) {
            var _this = this,
                upData = data;
            BonusModel.lookLuckSocket(_this.config.socket, {
                r: upData
            }, function(args) {
                var resultData = args,
                    DomHtml = ['<div class="bonus-big-dialog bonus _007 bonus-big-dialog-result">', '    <div class="panel" style="margin-top: 60px">', '        <span class="dds-dialog-closed"></span>', '<div class="show-out-time" style="margin-top: 134px"><span class="out-time">' + resultData.ts + "</span> </div>", '        <div class="send-bonus-desc" style="margin-top: 8px"><span class="strong-yellow">' + resultData.an + "</span> 发" + resultData.tp + '份红包，价值<span class="strong-yellow">' + resultData.tc + "</span>星币", "        </div>", "</div>", "</div>"].join("");
                _this.$bonusBigDialogResult && (_this.$bonusBigDialogResult.remove(), _this.$bonusBigDialogResult = null), $(_this.config.bigContainer).append(DomHtml), _this.$bonusBigDialogResult = $(".bonus-big-dialog-result"), _this._domBonusResultList(resultData, _this.$bonusBigDialogResult.find(".panel")), _this.$bonusBigDialogResult.fadeIn(), _this.$bonusBigDialogResult.find(" .dds-dialog-closed").on("click", function() {
                    _this.$bonusBigDialogResult.fadeOut(function() {
                        _this.$bonusBigDialogResult.remove()
                    })
                })
            }, function() {}, $(".bonus-big-dialog"))
        },
        closeBigBonus: function(args) {
            var _this = this;
            this.cssSupports("transform") && this.cssSupports("transition") ? (this.$bonusBigDialog[0].addEventListener("webkitAnimationEnd", function() {}, !1), this.$bonusBigDialog[0].addEventListener("animationEnd", function() {
                _this.$bonusBigDialog.remove()
            }, !1), this.$bonusBigDialog.removeClass("bonusBounceIn"), this.$bonusBigDialog.addClass("bonusBounceOut")) : this.$bonusBigDialog.fadeOut("slow", "swing", function() {
                $(this).remove()
            })
        },
        hideBigBonus: function(args) {
            var _this = this;
            this.cssSupports("transform") && this.cssSupports("transition") ? (this.$bonusBigDialog.removeClass("bonusBounceIn"), this.$bonusBigDialog.addClass("bonusBounceOut")) : this.$bonusBigDialog.fadeOut("slow", "swing", function() {
                _this.$bonusBigDialog.css("display", "none")
            })
        },
        reshowBigBonus: function(data) {
            var clickevent = Util.browser.Ipad ? "tap" : "click";
            this.lookResult.css("display") === "none" && this.$bonusBigDialog.find(".bonus-bonus-result_list_scrollBar,.bonus-bonus-result_list_scroll").size() > 0 ? this.lookResult.trigger(clickevent, {
                refresh: !0
            }) : (this.$bonusBigDialog.removeClass("bonusBounceOut").addClass("bonusBounceIn"), this.$bonusBigDialog.css("display", "block"))
        },
        hideSmallBonus: function() {
            this.$bonusSmallDialog.css("display", "none")
        },
        reshowSamllBonus: function() {
            this.$bonusSmallDialog.css("display", "block")
        },
        destroyAllBonus: function() {
            this.config.smallBonusClickFlag = !1, clearInterval(this.smallBounsTimerSecond), this.$bonusSmallDialog && (this.$bonusSmallDialog.remove(), this.$bonusSmallDialog = null), this.$bonusBigDialog && (this.$bonusBigDialog.remove(), this.$bonusBigDialog = null), this.$bonusBigDialogResult && (this.$bonusBigDialogResult.remove(), this.$bonusBigDialogResult = null)
        }
    }, module.exports = BonusAccept
}), define("CONTROLS_ONLINE", ["JQ", "DIALOG", "UTIL", "WIDGETS", "CARD", "STATUS"], function(require, exports, module) {
    var $ = require("JQ"),
        Dialog = require("DIALOG"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        Card = require("CARD"),
        Status = require("STATUS"),
        Online = function(options) {
            var setting = $.extend({}, {
                container: null,
                toggle: null,
                data: null,
                Url_status: "/room/" + window.DDS.baseInfo.roomId + "/get_user_status",
                Url_admin: "/room/" + window.DDS.baseInfo.roomId + "/get_manager_list",
                Url_unban: "/room/unban_speak",
                Url_unkick: "/room/unkick_out",
                Url_exc: "/room/get_unnormal_list",
                isException: !1,
                isGift: !0,
                isTv: !1,
                Url_tv: "/set/" + window.DDS.baseInfo.roomId + "/get_manager_list",
                openDialogCallback: function() {},
                closeDialogCallback: function() {},
                socket: null,
                persons: null
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    Online.prototype = {
        init: function() {
            this.users = [], this.times = 0, this.container = this.container == null ? $(document.body) : this.container, this.toggle = $(this.toggle), this.dom(), this.addEvent()
        },
        dom: function() {
            this.panel = $('<div class="MR-online"></div>'), this.container.append(this.panel)
        },
        addEvent: function() {
            var _this = this;
            this.toggle.on("click", function() {
                if ($(this).hasClass("on")) {
                    _this.closeDialogCallback();
                    return
                }
                _this.openDialogCallback($(this), _this.container), _this.openOnLine()
            }), $(window).on("resize", function() {
                _this.setUpdateHeight()
            })
        },
        isAnchor: function(ids) {
            return ids == this.data.anchorInfo.anchorId ? !0 : !1
        },
        card: function(objs) {
            var _this = this;
            objs.on("click", "li", function() {
                var _objs = $(this);
                if (!_objs.attr("data-cardid")) return !1;
                var _ids = _objs.attr("data-cardid");
                if (window["card_online_" + _ids] && window["card_online_" + _ids].TOGGLE) return !1;
                var _type = _this.isAnchor(_ids) ? "anchor" : "user",
                    _roomId = _this.isAnchor(_ids) ? "" : _this.data.baseInfo.roomId,
                    _if_chat = _this.isAnchor(_this.data.userInfo.userId) ? !1 : !0,
                    _is_gift = _this.data.config.roomType != "livehouse" && !_this.isAnchor(_this.data.userInfo.userId) && _this.data.userInfo.userId != _ids ? !0 : !1;
                _this.isGift || (_is_gift = !1), window["card_online_" + _ids] = new Card({
                    Ele_source: _objs,
                    userId: _ids,
                    direct: "top-bottom",
                    roomId: _roomId,
                    type: _type,
                    isGift: _is_gift,
                    if_chat: _if_chat,
                    if_attr: _if_chat,
                    if_kick_remove: !0
                }), window["card_online_" + _ids].onHide = function() {
                    window["card_online_" + _ids].destroy()
                }, window["card_online_" + _ids].create()
            }), objs.on("mouseover", "li", function() {
                var _objs = $(this);
                if (!_objs.attr("data-cardid")) return !1;
                var _ids = _objs.attr("data-cardid");
                window["card_online_" + _ids] && window["card_online_" + _ids].TOGGLE && clearTimeout(window["card_online_" + _ids].timer_hide)
            }), objs.on("mouseout", "li", function() {
                var _objs = $(this);
                if (!_objs.attr("data-cardid")) return !1;
                var _ids = _objs.attr("data-cardid");
                window["card_online_" + _ids] && window["card_online_" + _ids].hide()
            })
        },
        openOnLine: function() {
            this.onlineList ? this.onlineList.show() : this.createOnLine(), this.socket != null && (this.times = 0, this.socket.emit("userlist", {
                batch: this.times,
                roomid: this.data.baseInfo.roomId
            })), this.getAdminList(), this.isException && (this.panel.addClass("MR-online-exc"), this.getExcList()), this.persons != null && this.user_count.html(this.persons.html())
        },
        getUpdateHeight: function() {
            var _mh = this.isException ? 80 : 70,
                h = $(window).height() - _mh;
            return h < 440 ? 440 : h
        },
        setUpdateHeight: function() {
            var h = this.getUpdateHeight();
            this.admin_scroll && this.admin_scroll.scroll.setHeight(h), this.user_scroll && this.user_scroll.scroll.setHeight(h), this.isException && this.exc_scroll && this.exc_scroll.scroll.setHeight(h)
        },
        createExc: function() {
            var _this = this,
                _str = "<br />";
            window.DDS.config.roomType == "tv" && (_str = ""), this.exc_li = $("<li>黑名单" + _str + "(</li>"), this.exc_count = $("<cite></cite>"), this.exc_con = $('<div class="exc-con"></div>'), this.exc_con.css("display", "none"), this.exc_li.append(this.exc_count), this.exc_li.append(")"), this.online_tab.append(this.exc_li), this.online_con.append(this.exc_con), this.exc_scroll = Widgets.ScrollBoard({
                container: this.exc_con,
                skin: "dds-scroll-nav"
            }), this.exc_scroll.init(), this.exc_li.bind("click", function() {
                var ele = $(this);
                if (ele.hasClass("on")) return !1;
                _this.user_li.add(_this.admin_li).removeClass("on"), ele.addClass("on"), _this.exc_con.show(), _this.user_con.add(_this.admin_con).hide(), _this.exc_scroll.scroll.resetH(), _this.exc_scroll.scroll.toTop(), _this.getExcList()
            }), this.blacklist()
        },
        blacklist: function() {
            var _this = this;
            this.exc_con.on("click", "li", function() {
                var _obj = $(this),
                    _id = _obj.attr("data-cardid"),
                    _con = _obj.find(".desc");
                _obj.hasClass("on") ? (_con.hide(), _obj.removeClass("on")) : (_con[0] ? _con.show() : _this.requestDesc(_id, _obj), _obj.addClass("on"))
            }), this.exc_con.on("click", ".speakBtn", function() {
                _this.openSpeaker($(this))
            }), this.exc_con.on("click", ".kickBtn", function() {
                _this.openKick($(this))
            })
        },
        openSpeaker: function(obj) {
            var id = obj.attr("data-id"),
                _this = this;
            $.ajax({
                type: "POST",
                cache: !1,
                url: this.Url_unban,
                data: {
                    targetUserId: id,
                    roomId: this.data.baseInfo.roomId
                },
                dataType: "json",
                success: function(d) {
                    var res = d.response;
                    res.code == 0 ? _this.getExcList() : Status.errorBubble(res.msg, obj)
                }
            })
        },
        openKick: function(obj) {
            var id = obj.attr("data-id"),
                _this = this;
            $.ajax({
                type: "POST",
                cache: !1,
                url: this.Url_unkick,
                data: {
                    targetUserId: id,
                    roomId: this.data.baseInfo.roomId
                },
                dataType: "json",
                success: function(d) {
                    var res = d.response;
                    res.code == 0 ? _this.getExcList() : Status.errorBubble(res.msg, obj)
                }
            })
        },
        requestDesc: function(id, con) {
            var _this = this;
            $.ajax({
                type: "GET",
                cache: !1,
                url: this.Url_status,
                data: {
                    userId: id
                },
                dataType: "json",
                success: function(d) {
                    var res = d.response;
                    res.code == 0 ? _this.createStatus(id, con, res.data) : Status.errorBubble(res.msg, con)
                }
            })
        },
        createStatus: function(id, con, data) {
            var div = $('<div class="desc"></div>');
            data.speak.avail == 1 && div.append('<dl class="clearfix"><dt>' + data.speak.msg + '</dt><dd class="speakBtn" data-id="' + id + '">解禁</dd></dl>'), data.kick.avail == 1 && div.append('<dl class="clearfix"><dt>' + data.kick.msg + '</dt><dd class="kickBtn" data-id="' + id + '">解禁</dd></dl>'), con.append(div)
        },
        createOnLine: function() {
            var str = "",
                m_name = "社团管理员",
                u_name = "在线用户";
            this.isException && window.DDS.config.roomType != "tv" && (str = "<br/>"), window.DDS.config.roomType == "tv" && (m_name = "管理员", u_name = "用户"), this.onlineList = $('<div class="dialog"></div>'), this.panel.append(this.onlineList), this.online_tab = $('<ul class="nav-tab"></ul>'), this.online_con = $('<div class="nav-con"></div>'), this.onlineList.append(this.online_tab).append(this.online_con), this.admin_li = $("<li>" + m_name + str + "(</li>"), this.admin_count = $("<cite></cite>"), this.user_li = $('<li class="end">' + u_name + str + "(</li>"), this.user_count = $("<cite></cite>"), this.admin_con = $('<div class="admin-con"></div>'), this.user_con = $('<div class="user-con"></div>'), this.more_toggle = $('<div class="more-toggle"></div>'), this.admin_con.css("display", "none"), this.user_li.addClass("on"), this.admin_li.append(this.admin_count), this.admin_li.append(")"), this.user_li.append(this.user_count), this.user_li.append(")"), this.isException && this.createExc(), this.online_tab.append(this.user_li).append(this.admin_li), this.online_con.append(this.user_con).append(this.admin_con), this.onlineList.on("click", function(e) {
                e.stopPropagation()
            });
            var _this = this;
            this.admin_scroll = Widgets.ScrollBoard({
                container: this.admin_con,
                skin: "dds-scroll-nav"
            }), this.admin_scroll.init(), this.user_scroll = Widgets.ScrollBoard({
                container: this.user_con,
                skin: "dds-scroll-nav"
            }), this.user_scroll.init(), this.user_con.append(this.more_toggle), this.admin_li.bind("click", function() {
                var ele = $(this);
                if (ele.hasClass("on")) return !1;
                _this.user_li.removeClass("on"), ele.addClass("on"), _this.admin_con.show(), _this.user_con.hide(), _this.isException && (_this.exc_li.removeClass("on"), _this.exc_con.hide()), _this.admin_scroll.scroll.resetH(), _this.admin_scroll.scroll.toTop()
            }), this.user_li.bind("click", function() {
                var ele = $(this);
                if (ele.hasClass("on")) return !1;
                _this.admin_li.removeClass("on"), ele.addClass("on"), _this.admin_con.hide(), _this.user_con.show(), _this.isException && (_this.exc_li.removeClass("on"), _this.exc_con.hide()), _this.user_scroll.scroll.resetH(), _this.user_scroll.scroll.toTop()
            }), this.more_toggle.on("click", function() {
                _this.times += 1, _this.socket.emit("userlist", {
                    batch: _this.times,
                    roomid: _this.data.baseInfo.roomId
                })
            }), this.card(this.admin_con.add(this.user_con)), this.setUpdateHeight()
        },
        closeOnLine: function() {
            this.onlineList && this.onlineList.hide()
        },
        updatePerson: function(num) {
            this.user_count && this.user_count.html(num)
        },
        filterAnchor: function(args) {
            var _index = Util.indexOf(args, this.data.anchorInfo.anchorId, "uid");
            if (_index != -1) {
                var _arr = args.slice(0, _index);
                _index < args.length - 1 && (_arr = _arr.concat(args.slice(_index + 1))), args = _arr
            }
            return args
        },
        getOnLineUserList: function(arr) {
            if (this.times != 0 && arr.length == 0) {
                this.more_toggle.hide();
                return
            }
            var args = this.filterAnchor(arr),
                con = this.user_scroll.uler;
            this.times == 0 && (this.user_scroll.uler.empty(), this.users = [], typeof DDS != "undefined" && DDS.config.roomType != "tv" && con.append(this.getOneUserList({
                uid: this.data.anchorInfo.anchorId,
                avtarURL: this.data.anchorInfo.anchorFaceUrl,
                nickname: this.data.anchorInfo.anchorName,
                level: this.data.anchorInfo.anchorLevel
            }, !0)), args.length <= 10 ? this.more_toggle.hide() : this.more_toggle.show());
            for (var i = 0, len = args.length; i < len; i++) {
                if (Util.indexOf(this.users, args[i].uid, "uid") != -1) continue;
                this.user_scroll.uler.append(this.getOneUserList(args[i]))
            }
            this.users = this.users.concat(args), this.user_scroll.scroll.resetH(), this.times == 0 ? this.user_scroll.scroll.toTop() : this.user_scroll.scroll.toBottom()
        },
        getOneUserList: function(args, isAnchor) {
            var _classes = "anchor",
                level = isAnchor ? "ICON-anchor-level ICON-al-" + args.level : "ICON-noble-level ICON-nl-" + args.level;
            parseInt(args.level) <= 0 && (level = "");
            var _html = '<li data-cardid="' + args.uid + '" class="' + _classes + '">';
            return _html += '<span class="' + level + '"></span>', !isAnchor && args.medal && args.medal.length > 0 && (_html += Util.getMedalHTML(args.medal, !0)), args.ontype && args.ontype == 1 && (_html += '<span class="ICON-shadow" title="移动端影分身在线"></span>'), _html += '<span class="name" title="' + args.nickname + '">' + Util.cutZhFont(args.nickname, 16) + "</span>", _html + "</li>"
        },
        getAdminList: function() {
            var _this = this;
            $.ajax({
                type: "GET",
                cache: !1,
                url: this.Url_admin,
                data: {},
                dataType: "json",
                success: function(d) {
                    var res = d.response;
                    res.code == 0 ? _this.isTv ? _this.getTvList(res.data) : _this.addAdmin(res.data) : _this.m_Ele_ul.html("<li>" + res.msg + "</li>")
                }
            })
        },
        getTvList: function(manageData) {
            var _this = this;
            $.ajax({
                type: "GET",
                cache: !1,
                url: this.Url_tv,
                data: {},
                dataType: "json",
                success: function(d) {
                    var res = d.response;
                    res.code == 0 && _this.addTv(manageData, res.data)
                }
            })
        },
        getExcList: function() {
            var _this = this;
            $.ajax({
                type: "GET",
                cache: !1,
                url: this.Url_exc,
                data: {
                    roomId: this.data.baseInfo.roomId
                },
                dataType: "json",
                success: function(d) {
                    var res = d.response;
                    res.code == 0 ? _this.addExc(res.data) : _this.m_Ele_ul.html("<li>" + res.msg + "</li>")
                }
            })
        },
        addExc: function(args) {
            var con = this.exc_scroll.uler;
            con.empty(), this.exc_count.html(args.length), args.length == 0 && con.append('<li class="no">暂无异常用户</li>');
            for (var i = 0, len = args.length; i < len; i++) {
                var _html = this.getOneUserList(args[i]);
                con.append(_html)
            }
            this.exc_scroll.scroll.resetH()
        },
        addAdmin: function(args) {
            var con = this.admin_scroll.uler;
            con.empty(), this.admin_count.html(args.length), args.length == 0 && con.append('<li class="no">暂无管理员</li>');
            for (var i = 0, len = args.length; i < len; i++) {
                args[i].level = 0;
                var _html = this.getOneUserList(args[i]);
                con.append(_html)
            }
            this.admin_scroll.scroll.resetH()
        },
        addTv: function(manageData, tvData) {
            var con = this.admin_scroll.uler;
            con.empty();
            var tz = tvData.taizhang,
                ck = tvData.changkong;
            this.admin_count.html(manageData.length + tz.length + ck.length);
            if (manageData.length == 0 && tz.length == 0 && ck.length == 0) con.append('<li class="no">暂无管理员</li>');
            else {
                var arr = ["台长", "场控", "管理员"],
                    _html = "<li>台长</li>";
                _html += this.getOneUserList(tz[0]), _html += "<li>场控</li>";
                for (var i = 0; i < ck.length; i++) {
                    var args = ck[i];
                    _html += this.getOneUserList(args)
                }
                _html += "<li>管理员</li>";
                for (var i = 0, len = manageData.length; i < len; i++) _html += this.getOneUserList(manageData[i]);
                con.html(_html)
            }
            this.admin_scroll.scroll.resetH()
        }
    }, module.exports = Online
}), define("CONTROLS_SQUARE", ["JQ", "DIALOG", "UTIL", "WIDGETS"], function(require, exports, module) {
    var $ = require("JQ"),
        Dialog = require("DIALOG"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        Square = function(options) {
            var setting = $.extend({}, {
                container: null,
                toggle: null,
                data: null,
                URL_Square: "/room/anchor/search",
                openDialogCallback: function() {},
                closeDialogCallback: function() {}
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    Square.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.toggle = $(this.toggle), this.dom(), this.addEvent()
        },
        dom: function() {
            this.panel = $('<div class="MR-square"></div>'), this.panel.append('<h4><a href="http://www.laifeng.com/center" target="_blank" class="tolink">更多>></a>广场</h4>'), this.container.append(this.panel)
        },
        addEvent: function() {
            var _this = this;
            this.toggle.on("click", function() {
                if ($(this).hasClass("on")) {
                    _this.closeDialogCallback();
                    return
                }
                _this.openDialogCallback($(this), _this.container), _this.openSquare()
            }), $(window).on("resize", function() {
                _this.setUpdateHeight()
            })
        },
        openSquare: function() {
            this.squareList ? this.squareList.show() : this.createSquare(), this.getSquareList()
        },
        getUpdateHeight: function() {
            var h = $(window).height() - 70;
            return h < 440 ? 440 : h
        },
        setUpdateHeight: function() {
            var h = this.getUpdateHeight();
            this.square_scroll && this.square_scroll.scroll.setHeight(h)
        },
        createSquare: function() {
            this.squareList = $('<div class="dialog"></div>'), this.panel.append(this.squareList), this.square_con = $('<div class="square-con"></div>'), this.squareList.append(this.square_con), this.squareList.on("click", function(e) {
                e.stopPropagation()
            });
            var _this = this;
            this.square_scroll = Widgets.ScrollBoard({
                container: this.square_con,
                skin: "dds-scroll-nav"
            }), this.square_scroll.init(), this.setUpdateHeight()
        },
        closeSquare: function() {
            this.squareList && this.squareList.hide()
        },
        getSquareList: function() {
            var _this = this,
                con = _this.square_scroll.uler;
            con.empty(), Util.get(this.URL_Square, {}, function(data) {
                var D = data.data;
                if (D.length == 0) con.html('<li class="no">暂无数据！</li>');
                else
                    for (var i = 0; i < D.length; i++) con.append(_this.getOneUserList(D[i]));
                _this.square_scroll.scroll.resetH(), _this.square_scroll.scroll.toTop()
            }, function() {}, function(error) {
                con.html('<li class="no">' + error.msg + "</li>")
            })
        },
        getOneUserList: function(args) {
            var _html = "<li>";
            return _html += '<a class="photo" href="/room/' + args.roomId + '"><img src="' + args.coverUrl + '" alt="' + args.nickName + '"/>', args.status == "1" && (_html += '<cite class="living"></cite>'), _html += "</a>", _html += '<p title="' + args.nickName + '">' + Util.cutZhFont(args.nickName, 8), _html += '<span class="ICON-anchor-level ICON-al-' + args.anchorLevel + '"></span></p>', _html + "</li>"
        }
    }, module.exports = Square
}), define("CONTROLS_MY", ["JQ", "UTIL", "LOGIN"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Login = require("LOGIN"),
        My = function(options) {
            var setting = $.extend({}, {
                data: null,
                payUrl: window.DDS.baseInfo.payUrl,
                mode: 1,
                container: null,
                initData: {}
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    My.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.panel = $('<div class="MR-user"></div>'), this.container.append(this.panel), this.data.userInfo.identity != "0" ? (this.balances = parseInt(this.initData.coins, 10), this.mode == 1 ? this.dom() : this.modeDom2()) : this.noLogin()
        },
        setLine: function() {
            return this.mode == 1 ? "<cite>|</cite>" : ""
        },
        noLogin: function() {
            this.panel.html('<div class="no-login"><a href="javascript:void(0);"  class="login" id="LF_login">登录</a>' + this.setLine() + '<a href="javascript:void(0);"  class="reg" id="LF_reg">注册</a>' + "</div>"), Login.bindDialogLogin("#LF_login"), Login.bindDialogReg("#LF_reg")
        },
        dom: function() {
            var levelIconHtml = "";
            typeof this.initData.anchorLevel != "undefined" && (levelIconHtml += '<span class="ICON-anchor-level ICON-al-' + this.initData.anchorLevel + '"></span>'), typeof this.initData.userLevel != "undefined" && (this.initData.userLevel < 1 ? levelIconHtml += Util.noNoble() : levelIconHtml += '<span class="ICON-noble-level ICON-nl-' + this.initData.userLevel + '"></span>'), this.panel.append('<div id="M-user-msg-hook" class="dds-msg-box-area"></div><div id="M-user-name-hook" class="name dds-im-notice-area">' + levelIconHtml + '<a href="/my/profile/init" target="_blank" title="' + this.initData.userName + '" class="enter">' + Util.formatHTML(Util.cutZhFont(this.initData.userName, 10)) + "</a>" + "</div>" + '<div id="M-user-msg-btn-hook" class="msg"></div>'), this.coins = $('<span class="ICON-coins" title="' + this.balances + '星币">' + Util.roundOff(this.balances) + "</span>"), this.panel.append(this.coins), this.panel.append($('<a href="' + this.payUrl + '" class="BTN-recharge" target="_blank">充值</a>'))
        },
        modeDom2: function() {
            var login = $('<div class="login"></div>');
            login.append('<div class="photoer" id="M-user-name-hook"><a href="/my/profile/init" target="_blank"><img src="' + this.initData.faceUrl + '" /></a></div>');
            var money = $('<div class="money"><label><i class="ICON-coins"></i>星币</label></div>');
            this.coins = $('<cite title="' + this.balances + '星币">' + Util.roundOff(this.balances) + "</cite>"), money.append(this.coins), login.append(money), login.append($('<a href="' + this.payUrl + '" class="recharge" target="_blank">充值</a>')), this.panel.append(login)
        },
        updateLevel: function(level) {
            return this
        },
        enoughBalance: function(value) {
            return this.balances >= value
        },
        reduceBalance: function(value) {
            value = this.getBalance() - value, this.setBalance(value)
        },
        addBalance: function(value) {
            value = this.getBalance() + parseInt(value, 10), this.setBalance(value)
        },
        setBalance: function(value) {
            return value < 0 ? !1 : (this.balances = parseInt(value, 10), this.coins.html(Util.roundOff(value)), this.coins.attr("title", value + "星币"), value)
        },
        getBalance: function() {
            return this.balances
        },
        setUserLevel: function(level) {
            this.level[0] && (this.level[0].className = "ICON-noble-level ICON-nl-" + level)
        },
        setAchorLevel: function(level) {
            this.level[0] && (this.level[0].className = "ICON-anchor-level ICON-al-" + level)
        }
    }, module.exports = My
}), define("CONTROLS_GIFTCOUNT", ["JQ", "UTIL", "WIDGETS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        giftCount = function(options) {
            var setting = $.extend({}, {
                container: null,
                data: null,
                maxLength: 20,
                units: 54,
                differ: -112,
                Url_giftstat: "/room/" + window.DDS.baseInfo.roomId + "/giftstat",
                numData: {}
            }, options);
            for (var name in setting) this[name] = setting[name]
        };
    giftCount.prototype = {
        init: function() {
            this.container = this.container == null ? $(document.body) : this.container, this.OPENED = !1, this.GIFTMARKID = "", this.hideTimer = null, this.dom(), this.addEvent(), this.getGiftNum()
        },
        dom: function() {
            this.panel = $('<div class="MR-gift-count"><h4><i class="ICON-gift"></i>礼物积分榜</h4></div>'), this.ul = $('<ul class="lists clearfix"></ul>'), this.panel.append(this.ul), this.gift_show = $('<ul class="M-bubble gift-show"></ul>'), this.gift_show.css({
                display: "none"
            }), this.panel.append(this.gift_show), this.container.append(this.panel), this.createGift(), this.createBoard()
        },
        getGiftNum: function() {
            var _this = this;
            $.ajax({
                url: this.Url_giftstat,
                type: "GET",
                cache: !1,
                dataType: "json",
                success: function(D) {
                    if (D.response.code == 0 && D.response.data) {
                        var data = D.response.data;
                        for (var name in data) _this.numData[name] && typeof _this.numData[name].num != "undefind" && _this.setNum(name, data[name].num)
                    }
                }
            })
        },
        showGiftShow: function(args) {
            this.gift_show.html(this.getHtml(args));
            if (this.OPENED) return;
            clearTimeout(this.hideTimer), this.gift_show.show(), this.hideGiftShow()
        },
        hideGiftShow: function() {
            var _this = this;
            this.hideTimer = setTimeout(function() {
                _this.gift_show.hide()
            }, 3e3)
        },
        createGift: function() {
            var data = this.data.config.giftNormal;
            data = data[0] ? data[0].data : [];
            for (var i = 0, len = data.length; i < len; i++) {
                var li = $('<li data-id="' + data[i].id + '" data-mark="' + i + '"></li>'),
                    _data = this.getGiftInfo(data[i].id);
                _data != null && this.numData[data[i].id] && li.append('<p class="img" title="' + _data.name + '"><img src="' + _data.bigicon + '" /></p><p class="sum">' + this.numData[data[i].id].num + "</p>"), this.ul.append(li), this.numData[data[i].id] && (this.numData[data[i].id].sumObj = li.find(".sum"))
            }
        },
        createBoard: function() {
            this.board = $('<div class="M-bubble"><div class="arrow-top"></div></div>'), this.con = $('<div class="detail"></div>'), this.board.append(this.con), this.panel.append(this.board), this.scroller = Widgets.ScrollBoard({
                container: this.con
            }), this.scroller.init(), this.board.hide()
        },
        setArrowPos: function(n) {
            this.board.find(".arrow-top").css({
                "margin-left": this.differ + this.units * n
            })
        },
        getGiftInfo: function(id) {
            var data = this.data.gift;
            return data[id] ? data[id] : null
        },
        addEvent: function() {
            var _this = this,
                _all = this.ul.find("li");
            _all.on("click", function() {
                if ($(this).hasClass("on")) return;
                _this.OPENED = !0, _all.removeClass("on"), $(this).addClass("on");
                var _id = $(this).attr("data-id");
                _this.GIFTMARKID = _id, _this.board.show(), _this.setArrowPos($(this).attr("data-mark")), _this.addData(_id)
            }), this.panel.on("click", function(e) {
                e.stopPropagation()
            }), $(document.body).on("click", function() {
                _all.removeClass("on"), _this.board.hide(), _this.OPENED = !1
            })
        },
        addData: function(id) {
            this.scroller.uler.empty();
            var data = this.numData[id].data || [];
            if (data.length == 0) {
                this.scroller.addData("<li></li>");
                return
            }
            for (var i = 0, len = data.length; i < len; i++) this.addHtml(data[i])
        },
        getHtml: function(args) {
            var _html = "<li>";
            return _html += '<span class="time">' + args.t + "</span>", args.l > 0 && (_html += '<span class="ICON-noble-level ICON-nl-' + args.l + '"></span>'), _html += '<span class="user-name" data-id="' + args.i + '">' + Util.formatHTML(args.n) + "</span>", _html += "送" + this.data.anchorInfo.anchorName + "：" + this.getGiftName(args.g) + args.q + "个", _html += "</li>", _html
        },
        getGiftName: function(id) {
            var _html = "",
                data = this.data.gift,
                len = data.length;
            return len === 0 || !data[id] ? _html : data[id].name
        },
        addHtml: function(args) {
            this.scroller.addData(this.getHtml(args))
        },
        setNum: function(id, num) {
            this.numData[id].num += num, this.numData[id].sumObj.html(this.numData[id].num)
        },
        clearNum: function() {
            this.ul.find(".sum").html("0");
            for (var name in this.numData) this.numData[name].num = 0;
            this.scroller.uler.empty()
        },
        updateData: function(args) {
            var id = args.g;
            if (this.numData[id]) {
                var data = this.numData[id];
                data.data || (data.data = []), data = data.data, data.push(args), this.setNum(id, args.q), data.length >= this.maxLength && data.shift()
            }
            this.OPENED && id == this.GIFTMARKID && this.addHtml(args), this.showGiftShow(args)
        }
    }, module.exports = giftCount
}), define("CONTROLS_OSNOTICE", ["JQ", "UTIL"], function(require, exports, module) {
    var $ = require("JQ"),
        util = require("UTIL"),
        _default = {
            container: null,
            mode: 0,
            oneTime: 25e3,
            roll_notice_data: [],
            roll_max_num: 10,
            roll_unit: 1900,
            roll_toggle: !1
        },
        Roll = function(options) {
            var setting = $.extend({}, _default, options);
            for (var name in setting) this[name] = setting[name]
        };
    Roll.prototype = {
        init: function() {
            this.noticeTimer = null, this.Ele_roll_notice = $('<div class="MR-roll"></div>'), this.container.append(this.Ele_roll_notice), this.rollDom(), this.rollEvent()
        },
        rollDom: function() {
            this.roll_panel = $('<div class="roll-panel"></div>'), this.temp_panel = $("<div></div>"), this.roll_ul = $("<ul></ul>"), this.roll_ul_clone = $("<ul></ul>"), this.roll_close = $('<a href="javascript:void(0);" class="roll-close"></a>'), this.roll_panel.append(this.temp_panel), this.temp_panel.append(this.roll_ul), this.temp_panel.append(this.roll_ul_clone), this.Ele_roll_notice.append(this.roll_panel), this.Ele_roll_notice.append(this.roll_close), this.roll_panel_width = this.roll_panel.width();
            if (typeof this.roll_notice_data == "string" && this.mode == 1) {
                this.changeNotice(this.roll_notice_data);
                return
            }
            var len = this.roll_notice_data.length;
            if (len > 0) {
                this.Ele_roll_notice.show();
                for (var i = 0; i < len; i++) {
                    var temp = $("<li>" + this.roll_notice_data[i].title + "</li>");
                    this.roll_ul.append(temp), this.roll_notice_data[i].node = temp
                }
            } else this.Ele_roll_notice.hide(), this.roll_toggle = !0
        },
        changeNotice: function(msg) {
            $.trim(msg) == "" ? this.Ele_roll_notice.hide() : this.Ele_roll_notice.show(), this.li ? this.li.html(msg) : (this.li = $('<div class="room-notice">' + msg + "</div>"), this.roll_panel.append(this.li)), this.li.stop(), this.li.css({
                left: this.roll_panel_width + 20
            }), this.li_width = this.li.width(), this.LiFx()
        },
        LiFx: function() {
            var _this = this;
            clearTimeout(_this.noticeTimer), this.li.animate({
                left: -this.li_width
            }, this.oneTime, "linear", function() {
                _this.li.css({
                    left: _this.roll_panel_width + 20
                }), _this.noticeTimer = setTimeout(function() {
                    _this.LiFx()
                }, 2e3)
            })
        },
        rollEvent: function() {
            var _this = this;
            this.roll_timer = null, this.roll_close.bind("click", function() {
                return _this.roll_ul.empty(), _this.roll_ul_clone.empty(), clearTimeout(_this.roll_timer), _this.roll_notice_data = [], _this.Ele_roll_notice.hide(), _this.roll_toggle = !0, _this.scroll && _this.resetScroll(), !1
            }), this.roll_panel.bind("mouseover", function() {
                clearTimeout(_this.roll_timer)
            }).bind("mouseout", function() {
                _this.roll_ul_width && _this.roll_ul_width > _this.roll_panel_width && _this.rollTimer()
            }), this.rollCout()
        },
        changeWidth: function(width) {
            this.roll_panel_width = width, this.li.stop(), this.li.css({
                left: width + 20
            }), this.LiFx()
        },
        rollCout: function() {
            var _this = this,
                len = this.roll_notice_data.length;
            if (len <= 0) return;
            this.temp_panel.width(Math.min(len, this.roll_max_num) * this.roll_unit), this.roll_ul_width = this.roll_ul.width(), this.roll_temp_html = this.roll_ul.html(), this.roll_ul_width > this.roll_panel_width ? (this.roll_ul_clone.html(this.roll_temp_html), this.rollTimer()) : (this.roll_timer && clearTimeout(this.roll_timer), this.roll_panel[0].scrollLeft = 0, this.roll_ul_clone.html(""))
        },
        rollTimer: function() {
            var _this = this;
            this.roll_timer && clearTimeout(this.roll_timer), this.roll_timer = setTimeout(function() {
                _this.rollIng()
            }, 40)
        },
        rollIng: function() {
            var panel = this.roll_panel[0],
                left = panel.scrollLeft;
            left >= this.roll_ul_width ? panel.scrollLeft = 0 : panel.scrollLeft += 1, this.rollTimer()
        },
        getObjectById: function(id) {
            var objects = null;
            return $.each(this.roll_notice_data, function() {
                if (this.id == id) return objects = this, !1
            }), objects
        },
        rollAddNew: function(objects) {
            var object = this.getObjectById(objects.id);
            object ? (object.title = objects.title, object.node.html(objects.title)) : (objects.node = $("<li>" + objects.title + "</li>"), this.roll_ul.append(objects.node), this.roll_notice_data.push(objects)), this.roll_toggle && (this.Ele_roll_notice.show(), this.scroll && this.resetScroll(), this.roll_panel[0].scrollLeft = 0), clearTimeout(this.roll_timer), this.rollCout()
        },
        removeMsgById: function(id) {
            if (id != undefined) {
                var objects = this.getObjectById(id);
                objects && (objects.node.remove(), this.roll_notice_data.splice(util.indexOf(this.roll_notice_data, objects), 1), this.rollCout())
            }
        }
    }, module.exports = Roll
}), define("CONTROLS_APP_MANAGER", ["JQ", "XM", "DIALOG"], function(require, exports, module) {
    var $ = require("JQ"),
        X = require("XM"),
        DIA = require("DIALOG"),
        AppManager = X.XM.extend({
            _constructor: function(option) {
                return this.parent = option.container, this.parent = $(".MR-app"), this.container = null, this.sButton = null, this.list = null, this.isOpen = option.isOpen || !1, this._islistClose = !0, this
            },
            init: function() {
                var html = $(this._createHtml());
                return this.container = html, this.sButton = html.find(".MR-app-item-start"), this.cButton = html.find(".MR-app-item-close"), this.list = html.find(".MR-app-list"), this._bindEvent(), this.appTo(this.parent), this.isOpen && this.openList(), this
            },
            _createHtml: function() {
                var html = ['<div class="MR-app-content">', '<div class="MR-app-item-start">', '<div class="icon"></div>', "</div>", '<div class="MR-app-list clearfix">', '<span class="list-right-arrow"></span>', '<div class="MR-app-item MR-app-item-close">', '<span class="icon-close"></span></div>', "</div>", "</div>"].join("");
                return html
            },
            _bindEvent: function() {
                var _this = this;
                this.sButton.on("click", function() {
                    var $this = $(this);
                    $this.hide(), _this.toggleList(), _this.parent.addClass("open")
                }), this.cButton.on("click", function() {
                    _this.sButton.show(), _this.toggleList(), _this.parent.removeClass("open")
                })
            },
            openList: function() {
                this.isOpen && this.listOpen()
            },
            listOpen: function() {
                this.list.css("display", "block"), this._islistClose = !1
            },
            listClose: function() {
                this.list.css("display", "none"), this._islistClose = !0
            },
            toggleList: function() {
                this._islistClose ? this.listOpen() : this.listClose()
            },
            appTo: function(parent) {
                $(parent).append(this.container)
            },
            addApp: function(app) {
                return this._addItemToList(app), this
            },
            _addItemToList: function(app) {
                return app.appTo(this.list), this._resetListWidth(), this
            },
            _resetListWidth: function() {
                var width = 0;
                return this.list.children(".MR-app-item").each(function() {
                    width += $(this).width()
                }), this.list.css("width", width), this
            },
            buttonTip: function(text) {
                DIA.tip(text, this.sButton, {
                    delay: 3e3
                })
            }
        });
    module.exports = AppManager
}), define("CONTROLS_GUARD", ["XM", "JQ", "BUY_GUARD", "LOGIN", "DIALOG", "CARD", "UTIL", "TJ"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        BUY = require("BUY_GUARD"),
        L = require("LOGIN"),
        D = require("DIALOG"),
        CARD = require("CARD"),
        U = require("UTIL"),
        TJ = require("TJ"),
        BASE_INFO, USER_INFO, ANCHOR_INFO, enoughBalance, reduceBalance, SOCKET_OBJ;

    function openBuyDialog() {
        var p = U.getUrlParams("gb");
        return p.gb && p.gb == 1
    }
    var Guard = X.XM.extend({
        _constructor: function(option) {
            return BASE_INFO = option.baseInfo, USER_INFO = option.userInfo, ANCHOR_INFO = option.anchorInfo, enoughBalance = option.enoughBalance, reduceBalance = option.reduceBalance, SOCKET_OBJ = option.socket, this.view = new option.views(option.container), this._initData = $.extend({
                price: 588e3,
                pss: []
            }, option.initData), this._price = 0, this._buyDialog = null, this._isAnchor = ANCHOR_INFO.anchorId == USER_INFO.userId, this._discount = option.discount, this._cardCanSendGift = !0, this._timeStamp = 0, this._dialogInitBtnText = "购买", this
        },
        init: function() {
            return this.view ? (this.view.init(this._isAnchor), this._updatePrice(this._initData.price), this._loadInitData(function(d) {
                this.update(d.data)
            }), this._isAnchor || this._bindEvent(), this._bindCardEvent(), SOCKET_OBJ && SOCKET_OBJ.emit("PatronSaint", {
                rid: BASE_INFO.roomId
            }), this._discount && this._initAd(), openBuyDialog() && !this._isAnchor && L.isLogin() && this._openBuyDialog(), this) : !1
        },
        _initAd: function() {
            var _this = this;
            this.view.addAd(), this.view.adContainer && !this._isAnchor && (this.view.adContainer.css("cursor", "pointer"), this.view.adContainer.on("click", function() {
                if (!L.isLogin()) return L.dialogLogin ? L.dialogLogin() : L.login(function() {
                    window.location.reload()
                }), !1;
                _this._openBuyDialog()
            }))
        },
        _loadInitData: function(success) {
            return success.call(this, {
                data: this._initData.pss
            }), this
        },
        _formatData: function(data, userId) {
            var res = !1;
            return $.each(data, function(e) {
                this.u == userId && (this.self = !0, window.DDS && (window.DDS.amISuperfans = !0), res = !0)
            }), this._isAnchor || (res ? this._setDialogBtnText("续费") : this._setDialogBtnText("购买")), data
        },
        _updatePrice: function(price) {
            return this._price = price, this
        },
        update: function(data) {
            return data = this._formatData(data, USER_INFO.userId), this._upDateCount(data.length), this._upDateList(data), this
        },
        _upDateCount: function(count) {
            return this.view.setCount(count), this
        },
        _upDateList: function(data) {
            return this.view.setList(data), this
        },
        _setDialogBtnText: function(text) {
            return this._dialogInitBtnText = text, this._buyDialog && this._buyDialog.setBtnText(text), this
        },
        _openBuyDialog: function() {
            var _this = this;
            return this._buyDialog || (this._buyDialog = (new BUY.buyDialog({
                pricePerMonth: this._price,
                anchorId: ANCHOR_INFO.anchorId,
                discount: this._discount,
                enoughBalance: enoughBalance,
                reduceBalance: reduceBalance,
                btnText: this._dialogInitBtnText,
                onSuccess: function(d) {
                    D.alert(d.msg), _this._buyDialog.close()
                },
                onError: function(e) {
                    D.alert(e.msg), _this._buyDialog.close()
                }
            })).init()), this._buyDialog.open(), this
        },
        _bindEvent: function() {
            var _this = this;
            return this.view.buyBtn.on("click", function() {
                TJ.set("lf_web_room_buy_patron", !0);
                if (!L.isLogin()) return L.dialogLogin ? L.dialogLogin() : L.login(function() {
                    window.location.reload()
                }), !1;
                _this._openBuyDialog()
            }), $("body, .expression-wrap").on("click", "[action-type=superfans-openBuyDialog]", function() {
                if (!L.isLogin()) return L.dialogLogin ? L.dialogLogin() : L.login(function() {
                    window.location.reload()
                }), !1;
                _this._openBuyDialog()
            }), this
        },
        isAnchor: function(id) {
            return id == ANCHOR_INFO.anchorId
        },
        _bindCardEvent: function() {
            if (CARD) {
                var _this = this,
                    objs = this.view.listInner;
                objs.on("click", ".item .name", function() {
                    var _objs = $(this);
                    if (!_objs.attr("data-cardid")) return !1;
                    var _ids = _objs.attr("data-cardid");
                    if (window["card_online_" + _ids] && window["card_online_" + _ids].TOGGLE) return !1;
                    var _type = _this.isAnchor(_ids) ? "anchor" : "user",
                        _roomId = _this.isAnchor(_ids) ? "" : BASE_INFO.roomId,
                        _if_chat = _this.isAnchor(USER_INFO.userId) ? !1 : !0,
                        _is_gift;
                    _this._cardCanSendGift ? _is_gift = window.DDS.config.roomType != "livehouse" && !_this.isAnchor(USER_INFO.userId) && USER_INFO.userId != _ids : _is_gift = !1, window["card_online_" + _ids] = new CARD({
                        Ele_source: _objs,
                        userId: _ids,
                        roomId: _roomId,
                        type: _type,
                        isGift: _is_gift,
                        if_chat: _if_chat,
                        if_attr: _if_chat,
                        if_kick_remove: !0
                    }), window["card_online_" + _ids].onHide = function() {
                        window["card_online_" + _ids].destroy()
                    }, window["card_online_" + _ids].create()
                }), objs.on("mouseover", ".item .name", function() {
                    var _objs = $(this);
                    if (!_objs.attr("data-cardid")) return !1;
                    var _ids = _objs.attr("data-cardid");
                    window["card_online_" + _ids] && window["card_online_" + _ids].TOGGLE && clearTimeout(window["card_online_" + _ids].timer_hide)
                }), objs.on("mouseout", ".item .name", function() {
                    var _objs = $(this);
                    if (!_objs.attr("data-cardid")) return !1;
                    var _ids = _objs.attr("data-cardid");
                    window["card_online_" + _ids] && window["card_online_" + _ids].hide()
                })
            }
            return this
        },
        socketPsNotice: function(param) {
            return param.anchorName = ANCHOR_INFO.anchorName || "", this.view.showNotice(param), this
        },
        socketPsUpdate: function(param) {
            return param.timeStamp && param.timeStamp > this._timeStamp && this.update(param.list), this
        }
    });
    module.exports = Guard
}), define("VIEWS_GUARD", ["XM", "JQ", "UTIL", "SCROLL"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        Scroll = require("SCROLL"),
        MAX_LENGTH = 32,
        View = X.XM.extend({
            _constructor: function(container) {
                return this._container = container, this.pageCount = 0, this.currentPage = 0, this._pageWidth = 0, this._noticeTimer = null, this
            },
            init: function(isAnchor) {
                var html = $(this._createHTML(isAnchor));
                return this._container.append(html), this._container = html, this._pageWidth = html.find(".list-container").width(), this.count = html.find(".count"), this.listInner = html.find(".list-inner"), this.listContainer = html.find(".list-container"), this.notice = html.find(".notice"), isAnchor || (this.buyBtn = html.find(".buy")), this._bindEvent(), this.scroller = Scroll.scroll({
                    Ele_panel: this.listInner[0],
                    Ele_scroll: html.find(".scroller")[0]
                }), this.scroller.init(), this
            },
            _createHTML: function(isAnchor) {
                var html = ['<div class="MR-guard-container">', '<div class="top-container">', '<h6 class="title">Ta的守护</h6>', '<span class="count">0/32</span>', "</div>", '<div class="list-container"><div class="list-inner"></div></div><div class="scroller"></div>',
                    function(flag) {
                        var res = "";
                        return flag || (res = '<div class="bottom-container"><span class="buy white-btn">购买守护</span></div>'), res
                    }(isAnchor), '<div class="notice"></div>', "</div>"
                ].join("");
                return html
            },
            _createItemHTML: function(d) {
                var html = ['<li class="item',
                    function(self) {
                        var res = "";
                        return self && (res = " item-self"), res
                    }(d.self), '">', '<span class="pic"><img src="' + d.f + '" alt="' + d.n + '"/></span>', '<span class="name" title="' + d.n + '" data-cardid="' + d.u + '">' + U.cutZhFont(d.n, 6) + "</span>",
                    function(online) {
                        var res = "";
                        return online || (res = '<span class="off-line"></span>'), res
                    }(d.io), '<span class="limit">还剩<br/><i style="color:#F00;">',
                    function(hour) {
                        var res = " - ";
                        return hour != undefined && (hour == 0 ? res = "<1小时" : hour < 24 && hour > 0 ? res = hour + "小时" : res = Math.floor(hour / 24) + "天"), res
                    }(d.lh), "</i></span>",
                    function(year) {
                        var res = "";
                        return year && (res = '<span class="icon" title="年费守护"><img src="http://static.youku.com/ddshow/img/medal/year_guard_room.png"></span>'), res
                    }(d.i), "</li>"
                ].join("");
                return html
            },
            setCount: function(count) {
                return this.count.html(count + "/32"), this
            },
            setBtnText: function(text) {
                return this.buyBtn.html(text), this
            },
            setList: function(data) {
                var html = '<ul class="page clearfix">',
                    length = 0;
                data.length < 8 ? length = 8 : length = 4 * Math.ceil(data.length / 4);
                for (var i = 0, len = length; i < len; i++) data[i] ? html += this._createItemHTML(data[i]) : html += '<li class="item item-empty"></li>';
                return this.listInner.html(html), this.scroller.toTop(), this.scroller.resetH(), this
            },
            pageTo: function(pageIndex, ani) {
                if (pageIndex < 1 || pageIndex > this.pageCount) return !1;
                pageIndex == 1 ? this.leftBtn.addClass("disable-btn") : this.leftBtn.removeClass("disable-btn"), pageIndex == this.pageCount ? this.rightBtn.addClass("disable-btn") : this.rightBtn.removeClass("disable-btn"), this.pageCount < 2 ? (this.leftBtn.css("display", "none"), this.rightBtn.css("display", "none")) : (this.leftBtn.css("display", "block"), this.rightBtn.css("display", "block"));
                if (this.currentPage != pageIndex) {
                    var target = {
                        left: (pageIndex - 1) * this._pageWidth * -1
                    };
                    this.currentPage = pageIndex, ani ? this.listInner.stop(!0).animate(target, 300) : this.listInner.css(target)
                }
                return this
            },
            showNotice: function(param) {
                var notice = this.notice,
                    html = ['<p class="pic"><img src="' + param.f + '" /></p>', '<p class="name"><span class="icon ICON-noble-level ICON-nl-' + param.l + '"></span><span class="text">' + param.n + "</span></p>", '<p class="msg">为<span class="hl">' + param.anchorName + "</span>开通了<br/><b>",
                        function(y) {
                            var res = "";
                            return y && (res = "年"), res
                        }(param.y), "守护</b></p>"
                    ].join("");
                return notice.html(html), this._noticeTimer && clearTimeout(this._noticeTimer), notice.stop(!0), notice.slideDown(500), this._noticeTimer = setTimeout(function() {
                    notice.slideUp()
                }, 3e3), this
            },
            addAd: function() {
                var html = ['<div class="MR-guard-ad-container">', '<img src="http://static.youku.com/ddshow/img/channel/guard_ad_1.jpg" />', "</div>"].join("");
                return html = $(html), this.adContainer = html, this._container.after(html), this
            },
            _bindEvent: function() {
                var _this = this;
                return this.listInner.on("mouseover", ".item", function() {
                    var _item = $(this);
                    _item.hasClass("item-empty") || _item.find(".limit").stop(!0, !0).fadeIn()
                }), this.listInner.on("mouseout", ".item", function() {
                    var _item = $(this);
                    _item.hasClass("item-empty") || _item.find(".limit").stop(!0, !0).css("display", "none")
                }), this
            }
        });
    module.exports = View
}), define("BUY_GUARD", ["XM", "JQ", "UTIL", "DIALOG", "STATUS"], function(require, exports, module) {
    var X = require("XM"),
        $ = require("JQ"),
        U = require("UTIL"),
        D = require("DIALOG"),
        S = require("STATUS"),
        M_LINK = "/mall/list/sainthelp",
        Y_LINK = "/mall/list/sainthelp",
        enoughBalance, reduceBalance, BuyModule = X.XM.extend({
            buy: function(data, successCallback, completeCallback, errorCallback) {
                var url = "",
                    _this = this,
                    xhr;
                return window.DDS && window.DDS.baseInfo && window.DDS.baseInfo.roomId ? url = "/room/" + window.DDS.baseInfo.roomId + "/patronsaint/buy" : url = "/patronsaint/buy", xhr = U.post(url, data, function(d) {
                    successCallback.call(_this, d)
                }, function() {
                    completeCallback.call(_this)
                }, function(error) {
                    errorCallback.call(_this, error)
                }), xhr
            }
        }),
        SmallSelect = X.XM.extend({
            _constructor: function(container, optionArr) {
                return this.optionArr = optionArr, this.container = container, this
            },
            init: function() {
                var _this = this,
                    html = $(this._createHTML());
                return this.container.append(html), this.options = html, html.on("click", function() {
                    var _item = $(this);
                    if (!_item.hasClass("s-cur")) {
                        var _value = _item.attr("data-value");
                        _this.selectValue(_value)
                    }
                }), this
            },
            _createHTML: function() {
                var html = "";
                return $.each(this.optionArr, function() {
                    this.discount ? html += '<span class="select-option on-discount" data-value="' + this.value + '">' + this.text + '<i class="discount"></i></span>' : html += '<span class="select-option" data-value="' + this.value + '">' + this.text + "</span>"
                }), html
            },
            show: function() {
                return this.options.css("display", "block"), this
            },
            hide: function() {
                return this.options.css("display", "none"), this
            },
            selectValue: function(value) {
                var res = null;
                return this.options.each(function() {
                    var v = $(this).attr("data-value");
                    v == value && (res = $(this))
                }), res && res.length > 0 && (this.options.removeClass("s-cur"), res.addClass("s-cur"), this.onSelect(value)), this
            },
            onSelect: function(value) {}
        }),
        MonthSelect = X.XM.extend({
            _constructor: function(container, optionArr) {
                return this.container = container, this
            },
            init: function() {
                var _this = this,
                    html = $(this._createHTML());
                return this.container.append(html), this.html = html, this.valueArea = html.find(".value"), this.list = html.find(".m-options"), this.html.hover(function() {
                    _this.list.css("display", "block"), _this.valueArea.addClass("open")
                }, function() {
                    _this.list.css("display", "none"), _this.valueArea.removeClass("open")
                }), this.list.on("click", ".item", function() {
                    _this.selectValue($(this).attr("data-value"))
                }), this
            },
            _createHTML: function() {
                var html = '<div class="select-month">';
                html += '<span class="value">11个月</span><ul class="m-options clearfix">';
                for (var i = 1; i < 12; i++) html += '<li class="item" data-value="' + i + '">' + i + "</li>";
                return html += "</ul></div>", html
            },
            show: function() {
                return this.html.css("display", "block"), this
            },
            hide: function() {
                return this.html.css("display", "none"), this
            },
            selectValue: function(value) {
                return value > 0 && value < 12 && (this.valueArea.html(value + "个月"), this.list.find("li").removeClass("m-cur"), this.list.find('li[data-value="' + value + '"]').addClass("m-cur"), this.onSelect(value)), this
            },
            onSelect: function(value) {}
        }),
        BuyView = X.XM.extend({
            _constructor: function(container) {
                return this.container = container, this
            },
            init: function(discount) {
                var _this = this,
                    html = $(this._createHTML());
                return this.container.append(html), this.infoM = html.find(".info-m"), this.infoY = html.find(".info-y"), this.price = html.find(".price"), this.buyBtn = html.find(".btn-buy"), this.typeSelect = (new SmallSelect(html.find(".select-type"), [{
                    text: "按月付费",
                    value: "month"
                }, {
                    text: "按年付费",
                    value: "year",
                    discount: discount
                }])).init(), this.yearSelect = (new SmallSelect(html.find(".select-month"), [{
                    text: "1年",
                    value: 12
                }, {
                    text: "2年",
                    value: 24
                }])).init(), this.monthSelect = (new MonthSelect(html.find(".select-month"))).init(), this.typeSelect.onSelect = function(value) {
                    _this.onSelectType(value), _this.changeTypeUI(value), value == "year" ? _this.yearSelect.selectValue(12) : value == "month" && _this.monthSelect.selectValue(3)
                }, this.yearSelect.onSelect = function(value) {
                    _this.onSelectMonth(value)
                }, this.monthSelect.onSelect = function(value) {
                    _this.onSelectMonth(value)
                }, window.IKU && html.on("click", ".link", function() {
                    window.IKU.outLink($(this).attr("href"))
                }), this
            },
            _createHTML: function() {
                var html = ['<div class="top">', '<h5 class="title">守护独享特权</h5>', '<div class="info info-m">', '<span class="icon"></span>', '<h6 class="info-title">月费用户特权</h6>', '<p class="info-text">勋章、动态表情、进场特效、专属礼物、<br/>专属贵宾席、尊贵提示<a class="link" target="_blank" href="' + M_LINK + '">更多...</a></p>', "</div>", '<div class="info info-y">', '<span class="icon"></span>', '<h6 class="info-title">年费用户特权</h6>', '<p class="info-text">尊贵年费勋章、排名靠前、高级进场特效、<br/>防踢防禁言、专属贵宾席、尊贵提示<a class="link" target="_blank" href="' + Y_LINK + '">更多...</a></p>', "</div>", '<h5 class="title" style="margin-top:20px; padding-bottom:10px;">守护购买<span class="hl">开通年费守护，拥有排名靠前更多尊贵特权</span></h5>', '<div class="select-line select-type"><span class="label">购买方式</span></div>', '<div class="select-line select-month" style="z-index:1;"><span class="label">购买时常</span></div>', '<div class="select-line"><span class="label">总价格</span><span class="price"></span></div>', "</div>", '<div class="bottom"><span class="btn-buy">购买</span></div>'].join("");
                return html
            },
            onSelectMonth: function(count) {},
            onSelectType: function(type) {},
            changeTypeUI: function(type) {
                type == "year" ? (this.infoY.css("display", "block"), this.infoM.css("display", "none"), this.yearSelect.show(), this.monthSelect.hide()) : type == "month" && (this.infoY.css("display", "none"), this.infoM.css("display", "block"), this.yearSelect.hide(), this.monthSelect.show())
            },
            showType: function(type) {
                return (type == "year" || type == "month") && this.typeSelect.selectValue(type), this
            },
            setPrice: function(price, discount) {
                var text = price + "星币";
                return discount && (text += '<em style="color:#828182; padding-left:5px;">(已优惠' + discount + "星币)</em>"), this.price.html(text), this
            }
        }),
        Buy = X.XM.extend({
            _constructor: function(option) {
                return this._anchorId = option.anchorId, this.view = new BuyView(option.container), this.module = new BuyModule, this._initType = option.initType, this._pricePerMonth = option.pricePerMonth, this._monthCount = 0, this._price = 0, this._onSuccess = option.onSuccess || function() {}, this._onComplete = option.onComplete || function() {}, this._onError = option.onError || function() {}, this._btnText = option.btnText || "购买", this._discount = option.discount, this._discountPercent = .85, this._type = this._initType, this
            },
            init: function() {
                var _this = this;
                return this.view.init(this._discount), this.module.init(), this.view.onSelectMonth = function(count) {
                    _this.setMonthCount(count)
                }, this.view.onSelectType = function(type) {
                    _this._type = type
                }, this.view.showType(this._initType), this.view.buyBtn.html(this._btnText), this._bindEvent(), this
            },
            setMonthCount: function(count) {
                if (count > 0) {
                    this._monthCount = count, this._price = this._monthCount * this._pricePerMonth;
                    if (this._discount && this._type == "year") {
                        var price = this._price * this._discountPercent,
                            discount = this._price - price;
                        this._price = price, this.view.setPrice(price, discount)
                    } else this.view.setPrice(this._price)
                }
                return this
            },
            _bindEvent: function() {
                var _this = this;
                this.view.buyBtn.on("click", function() {
                    var _btn = $(this);
                    if (_btn.hasClass("disable")) return !1;
                    var price = _this._price;
                    if (enoughBalance && !enoughBalance(price)) return S.noEnoughMoney(_this.view.buyBtn), !1;
                    var data = {
                        anchorId: _this._anchorId,
                        count: _this._monthCount
                    };
                    _btn.addClass("disable"), _this.module.buy(data, function(d) {
                        reduceBalance && reduceBalance(price), _this._onSuccess.call(_this, d)
                    }, function() {
                        _btn.removeClass("disable"), _this._onComplete.call(_this)
                    }, function(e) {
                        e.code == 99 && (e.msg = "网络错误，请重试"), _this._onError.call(_this, e)
                    })
                })
            }
        }),
        BuyDialog = X.XM.extend({
            _constructor: function(option) {
                return enoughBalance = option.enoughBalance, reduceBalance = option.reduceBalance, this._anchorId = option.anchorId, this._initType = option.initType, this._pricePerMonth = option.pricePerMonth, this._onSuccess = option.onSuccess || function() {}, this._onComplete = option.onComplete || function() {}, this._onError = option.onError || function() {}, this._discount = option.discount, this._btnText = option.btnText, this
            },
            open: function(anchorId, initType, pricePerMonth, btnText) {
                initType = initType || this._initType || "month", anchorId = anchorId || this._anchorId, pricePerMonth = pricePerMonth || this._pricePerMonth, btnText = btnText || this._btnText;
                var _this = this;
                if (!anchorId) return !1;
                var dialog = D.dialog({
                    width: 370,
                    title: "",
                    content: '<div class="MR-guard-buy-dialog"></div>',
                    onOpen: function(box) {
                        var container = box.boxer.find(".MR-guard-buy-dialog"),
                            buy = new Buy({
                                container: container,
                                anchorId: anchorId,
                                initType: initType,
                                pricePerMonth: pricePerMonth,
                                discount: _this._discount,
                                onSuccess: _this._onSuccess,
                                onComplete: _this._onComplete,
                                onError: _this._onError,
                                btnText: _this._btnText
                            });
                        buy.init()
                    }
                });
                return dialog.init(), this._dialog = dialog, this
            },
            close: function() {
                return this._dialog && (this._dialog.destroy(), this._dialog = null), this
            },
            setBtnText: function(text) {
                return this._btnText = text, this
            }
        });
    exports.buyDialog = BuyDialog
}), define("CONTROLS_SINGLECHAT", ["JQ", "UTIL", "DIALOG", "STATUS"], function(require, exports, module) {
    var $ = require("JQ"),
        UTIL = require("UTIL"),
        Dialog = require("DIALOG"),
        Status = require("STATUS"),
        SingleChat = function(options) {
            this.opt = $.extend({
                sendUrl: "/room/" + window.DDS.baseInfo.roomId + "/chat/save",
                getHistoryUrl: "/room/" + window.DDS.baseInfo.roomId + "/chat/single",
                checkUrl: "/room/" + window.DDS.baseInfo.roomId + "/chat/check",
                maxUser: 30,
                views: null,
                isAnchor: !1,
                myId: null,
                roomId: window.DDS.baseInfo.roomId,
                container: "body"
            }, options), this.cache = {
                users: [],
                newMsg: {}
            }
        };
    SingleChat.prototype = {
        init: function() {
            this.view = new this.opt.views({
                controller: this,
                myId: this.opt.myId,
                isAnchor: this.opt.isAnchor,
                container: this.opt.container
            })
        },
        openWindow: function(userInfo) {
            userInfo && (this.getUserInfo(userInfo.id) || this.cache.users.push(userInfo), this.view && this.view.openWindow(userInfo.id))
        },
        checkPrivilege: function(uid, el, suc) {
            this._checkUserStatus(el) && this._createAjax("get", el, this.opt.checkUrl, {
                roomId: this.opt.roomId,
                userId: uid
            }, suc)
        },
        _checkUserStatus: function(el) {
            return el.data("status") == "post" ? (Dialog.tip("正在发送...", el, {
                delay: 2e3
            }), !1) : !Status.noLogin() && !Status.isDisconnect()
        },
        _createAjax: function(method, el, url, data, success) {
            el.data("status", "post"), method = method.toLowerCase() == "get" ? "get" : "post", UTIL[method](url, data, function(r) {
                success && success(r)
            }, function() {
                el.data("status", null)
            }, function(res) {
                var msg = res.msg;
                Status.ajaxError(res, el, function() {
                    Status.singleChatTip(msg, el)
                })
            })
        },
        getHistory: function(el, uid, suc) {
            var me = this,
                userInfo = this.getUserInfo(uid);
            if (!me._checkUserStatus(el) || !userInfo) return !1;
            me._createAjax("get", el, me.opt.getHistoryUrl, {
                roomId: me.opt.roomId,
                userId: uid,
                offset: userInfo.offset || -1
            }, function(res) {
                var chats = res.data.chats,
                    len = chats.length;
                len && me.setHistoryOffset(uid, chats[len - 1].chatId), suc && suc(res)
            })
        },
        sendMsg: function(el, d, suc) {
            if (!this._checkUserStatus(el)) return !1;
            this._createAjax("post", el, this.opt.sendUrl, {
                single: 1,
                methodName: "singleChat",
                content: d.msg,
                anchorId: d.id,
                roomId: this.opt.roomId,
                identity: window.DDS.userInfo.identity
            }, function(res) {
                suc && suc(res)
            })
        },
        getUserInfo: function(uid) {
            var users = this.cache.users;
            for (var i = 0; i < users.length; i++)
                if (users[i].id == uid) return users[i];
            return null
        },
        setHistoryOffset: function(uid, offset) {
            var users = this.cache.users;
            for (var i = 0; i < users.length; i++) users[i].id == uid && (users[i].offset = offset)
        },
        getUserCount: function() {
            return this.cache.users.length
        },
        removeUser: function(uid) {
            delete this.cache.newMsg[uid];
            var users = this.cache.users;
            for (var i = 0; i < users.length; i++)
                if (users[i].id == uid) {
                    users.splice(i, 1);
                    break
                }
        },
        getAllNewMsg: function() {
            return this.cache.newMsg
        },
        getAllNewMsgCount: function() {
            var c = 0,
                newMsg = this.cache.newMsg;
            for (var i in newMsg) c += newMsg[i].length;
            return c
        },
        getNewMsgCountById: function(uid) {
            return this.cache.newMsg[uid] ? this.cache.newMsg[uid].length : 0
        },
        clearNewMsgById: function(uid) {
            this.cache.newMsg[uid] && (this.cache.newMsg[uid].length = 0)
        },
        getNewMsgById: function(uid) {
            return this.cache.newMsg[uid] || []
        },
        socketSingleChat: function(args) {
            var dataMap = {
                    cti: "id",
                    ti: "tid",
                    i: "sid",
                    m: "msg",
                    n: "name",
                    f: "pic",
                    t: "time"
                },
                body = args.body,
                msg = {};
            for (var i in body) dataMap[i] && (msg[dataMap[i]] = body[i]);
            msg.target = msg.tid == this.opt.myId ? msg.sid : msg.tid;
            var u = this.getUserInfo(msg.target);
            if (!u) this.cache.users.push({
                id: msg.target,
                name: msg.name,
                pic: msg.pic,
                offset: msg.id
            });
            else if (!u.offset || u.offset == -1) u.offset = msg.id;
            this.cache.newMsg[msg.target] || (this.cache.newMsg[msg.target] = []), this.cache.newMsg[msg.target].push(msg), this.view.newMsg(msg)
        }
    }, module.exports = SingleChat
}), define("VIEWS_SINGLECHAT", ["JQ", "UTIL", "WIDGETS", "EMOTICON", "SCROLL", "DIALOG", "DRAG"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Widgets = require("WIDGETS"),
        Emoticon = require("EMOTICON"),
        Scroll = require("SCROLL"),
        Dialog = require("DIALOG"),
        Drag = require("DRAG"),
        inArray = Util.inArray,
        SingleChat = function(options) {
            var opt = {
                container: "body",
                controller: null,
                myId: null,
                isAnchor: !1
            };
            this.opt = $.extend(opt, options), this.controller = this.opt.controller, this.view = {
                container: $(this.opt.container)
            }, this.view.tip = $('<div class="M-chat-tips-wrap"></div>').appendTo(this.view.container), this.module = {}, this.cache = {
                cur: null,
                status: 0,
                initedUsers: []
            }, this._bindEvent()
        };
    SingleChat.prototype = {
        _createChatBox: function() {
            var view = this.view,
                t;
            view.panel = $('<div class="M-chatbox-wrap' + (this.opt.isAnchor ? " M-chatbox-anchor-wrap" : "") + '"></div>'), view.panel.css({
                top: Math.max($(window).height() - 450, 0),
                left: Math.max(($(window).width() - 1225) / 2, 0)
            }), view.bg = $('<div class="M-chatbox-bg"></div>').appendTo(view.panel), view.chatbox = $('<div class="M-chatbox clearfix"></div>').appendTo(view.panel), view.titlePanel = $('<div class="M-chatbox-title"></div>').appendTo(view.chatbox), view.avatar = $('<div class="avatar"></div>').appendTo(view.titlePanel), view.title = $('<h3 class="title"></h3>').appendTo(view.titlePanel), view.close = $('<a href="javascript:void(0)" class="close" title="关闭">关闭</a>').appendTo(view.titlePanel), view.main = $('<div class="M-chat-main clearfix"></div>').appendTo(view.chatbox), this.opt.isAnchor && (t = $('<div class="chat-users-wrap"></div>').appendTo(view.main), view.userPanel = $('<div class="chat-users-pannel"></div>').appendTo(t), view.user = $('<ul class="chat-users"></ul>').appendTo(view.userPanel), view.userScroll = $('<div class="chat-users-scroll"></div>').appendTo(t), $('<div class="chat-users-ft"></div>').appendTo(t)), view.msgWrap = $('<div class="msg-wrap"></div>').appendTo(view.main), view.msgPanel = $('<div class="msg-pannel"></div>').appendTo(view.msgWrap), view.msgScroll = $('<div class="msg-scroll"></div>').appendTo(view.main), t = $('<div class="M-chat-actions"></div>').appendTo(view.main), view.emoticonLayer = $('<div class="emoticon-layer"></div>').appendTo(t), view.emoticonToggle = $('<a class="emoticon-toggle" href="javascript:void(0)"></a>').appendTo(t), view.inputWrap = $('<div class="text-wrap"></div>').appendTo(t), view.input = $('<input type="text" class="text" />').appendTo(view.inputWrap), view.inputTip = $("<cite></cite>").appendTo(view.inputWrap), view.send = $('<a href="javascript:void(0)" class="send">发送</a>').appendTo(t), $("body").append(view.panel), this._initModule(), this._bindChatboxEvent()
        },
        _initModule: function() {
            var me = this,
                view = me.view;
            me.module.msgScroll = Scroll.scroll({
                Ele_panel: view.msgPanel[0],
                Ele_scroll: view.msgScroll[0],
                height: 245
            }), me.module.msgScroll.init(), me.opt.isAnchor && (me.module.userScroll = Scroll.scroll({
                Ele_panel: view.user[0],
                Ele_scroll: view.userScroll[0],
                height: 290
            }), me.module.userScroll.init()), me.module.text = Widgets.Text({
                textarea: view.input,
                Ele_max_font: view.inputTip,
                tips: "说点什么吗？",
                maxFontNum: 100,
                rightTips: '<i class="arrow-bottom"></i>还可以输入',
                wrongTips: '<i class="arrow-bottom"></i>已经超过',
                repairTips: "",
                callback: function() {
                    view.send.trigger("click")
                }
            }), me.module.text.init(), me.module.drag = Drag.drag(view.panel[0], {
                handle: view.titlePanel[0],
                limit: !0,
                mxright: $("body").width(),
                mxbottom: $(document).height()
            }), me.module.drag.init(), Emoticon.emoticon({
                emoticonData: window.DDS.expressions.common,
                container: view.emoticonLayer,
                inputBox: view.input
            })
        },
        openWindow: function(uid) {
            if (!uid && !this.controller.getUserCount()) return !1;
            this.view.panel || this._createChatBox(), this.view.panel.show();
            if (this.opt.isAnchor) {
                var msgs = this.controller.getAllNewMsg();
                for (var i in msgs) this.initUser(this.controller.getUserInfo(i)), msgs[i].length && i != uid && $("#js_chat_user_" + i).addClass("havemsg")
            }
            this.openChatCon(uid)
        },
        openChatCon: function(uid) {
            var user = this.controller.getUserInfo(uid);
            if (!user) return;
            uid != this.cache.cur && (this.initUser(user), this.cache.cur = uid, this.opt.isAnchor && (this.view.user.find(".cur").removeClass("cur"), $("#js_chat_user_" + uid).addClass("cur"))), this.cache.status = 1, uid == this.view.tip.data("id") && this.view.tip.removeClass("M-chat-tips-wrap-new"), this.view.title.html(user.name), this.view.avatar.empty().append('<img src="' + user.pic + '" alt="' + user.name + '" title="' + user.name + '" />');
            var msgs = this.controller.getNewMsgById(uid),
                html = "";
            for (var i = 0; i < msgs.length; i++) html += this.createMsg(msgs[i]);
            this.controller.clearNewMsgById(uid), $("#js_chat_con_" + uid).append(html).show().siblings().hide(), this.msgScrollToBottom(), this.controller.getAllNewMsgCount() == 0 && this.updateTip(uid, user.name, user.pic), this.opt.isAnchor && $("#js_chat_user_" + uid).removeClass("havemsg")
        },
        updateTip: function(sid, name, pic) {
            if (sid != this.opt.myId) {
                var html = '<span class="pic"><img src="' + pic + '" alt="' + name + '" /></span></span><span class="name" title="' + name + '">' + name + "</span>";
                this.view.tip.html(html).show().data("id", sid), (this.cache.status == 0 || this.cache.cur != sid) && this.view.tip.addClass("M-chat-tips-wrap-new")
            }
        },
        createMsg: function(msg) {
            var con = [];
            return con.push('<div class="chat-con-wrap ' + (msg.sid == this.opt.myId ? "chat-con-self" : "chat-con-other") + '">'), con.push(['<div class="chat-time">' + msg.time + "</div>", '<div class="chat-con"><i class="icon-arrow"></i>' + Emoticon.parseEmoticon(Util.formatHTML(msg.msg)) + "</div>", "</div>"].join("")), con.join("")
        },
        initUser: function(user) {
            user && inArray(this.cache.initedUsers, user.id) == -1 && (this.view.msgPanel.append('<div id="js_chat_con_' + user.id + '" class="msgs"><div class="chat-line chat-history"><em class="btn-history">查看历史记录</em></div></div>'), this.cache.initedUsers.push(user.id), this.opt.isAnchor && (this.view.user.prepend(['<li id="js_chat_user_' + user.id + '" data-id="' + user.id + '">', '<i></i><span title="' + user.name + '">' + user.name + "</span><s></s>", "</li>"].join("")), this.cache.status == 1 && this.view.userPanel.scrollTop($("#js_chat_user_" + this.cache.cur).position().top), this.module.userScroll.resetH(), this.module.userScroll.setScrollPos()))
        },
        newMsg: function(msg) {
            this.cache.status == 1 && (msg.target == this.cache.cur ? (this.controller.clearNewMsgById(msg.target), $("#js_chat_con_" + msg.target).append(this.createMsg(msg)), this.msgScrollToBottom()) : (inArray(this.cache.initedUsers, msg.target) == -1 && this.initUser(this.controller.getUserInfo(msg.target)), $("#js_chat_user_" + msg.target).addClass("havemsg"))), this.updateTip(msg.sid, msg.name, msg.pic)
        },
        msgScrollToBottom: function() {
            this.module.msgScroll.resetH(), this.module.msgScroll.toBottom(), this.view.msgPanel.scrollTop(99999)
        },
        _bindEvent: function() {
            var me = this,
                view = me.view,
                controller = me.controller;
            view.tip.on("click", function() {
                controller.openWindow(controller.getUserInfo($(this).data("id")))
            }), $("body").on("click", ".dds-card .siliao,#DDS_siliao_enter", function(e) {
                var $this = $(this),
                    targetUser = {
                        id: $this.attr("data-id"),
                        name: $this.attr("data-name"),
                        pic: $this.attr("data-faceUrl")
                    },
                    uid = me.opt.isAnchor ? targetUser.id : me.opt.myId;
                controller.checkPrivilege(uid, $this, function() {
                    controller.openWindow(targetUser)
                }), e.stopPropagation()
            })
        },
        _bindChatboxEvent: function() {
            var me = this,
                view = me.view,
                controller = me.controller;
            view.send.on("click", function() {
                var verify = me.module.text.verify(),
                    $this = $(this);
                if (verify !== null) return Dialog.tip(verify, view.input, {
                    delay: 1500
                }), view.input.focus(), !1;
                controller.sendMsg($this, {
                    msg: me.module.text.val(),
                    id: me.cache.cur
                }, function() {
                    me.module.text.noText(), view.input.focus()
                })
            }), view.close.on("click", function() {
                view.panel.hide(), me.cache.status = 0
            }), view.panel.on("click", ".btn-history", function() {
                var $this = $(this);
                controller.getHistory($this, me.cache.cur, function(res) {
                    var chats = res.data.chats,
                        len = chats.length,
                        html = "";
                    if (len) {
                        for (len--; len >= 0; len--) html += me.createMsg({
                            sid: chats[len].originUserId,
                            time: chats[len].createdate,
                            msg: chats[len].msg
                        });
                        $(html).insertAfter($this.parent()), me.module.msgScroll.resetH(), me.module.msgScroll.toTop()
                    }
                    res.data.hasMore || $this.parent().hide()
                })
            }), me.opt.isAnchor && (view.user.on("click", "li i", function() {
                var $this = $(this),
                    p = $this.parent(),
                    i = p.index(),
                    id = p.attr("data-id");
                Util.removeArrayValue(me.cache.initedUsers, id);
                if (me.cache.initedUsers.length == 0) view.close.trigger("click"), me.cache.cur = null, view.tip.data("id") == id && view.tip.hide();
                else if (id == me.cache.cur) {
                    var lis = view.user.find("li");
                    i == lis.length - 1 ? i-- : i++, lis.eq(i).trigger("click")
                }
                return p.remove(), $("#js_chat_con_" + id).remove(), me.controller.setHistoryOffset(id, -1), !1
            }), view.user.on("click", "li", function() {
                var $this = $(this),
                    id = $this.attr("data-id");
                me.openChatCon(id)
            })), view.emoticonToggle.on("click", function() {
                return view.emoticonLayer.toggle(), !1
            }), $("body").on("click", function() {
                view.emoticonLayer.hide()
            })
        }
    }, module.exports = SingleChat
}), define("CONTROLS_PACKAGES", ["JQ", "UTIL", "STATUS", "WIDGETS", "VIEWS_MOREGIFT", "DIALOG", "EVENTBUS", "EVENTTYPE"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Status = require("STATUS"),
        Widgets = require("WIDGETS"),
        MoreGift = require("VIEWS_MOREGIFT"),
        Dialog = require("DIALOG"),
        EventBus = require("EVENTBUS"),
        EventType = require("EVENTTYPE"),
        packages = function(options) {
            var setting = $.extend({}, {
                container: null,
                name: "我的包裹",
                data: null,
                depend: {},
                goods: [],
                isBuy: !1,
                newMark: !1,
                packageUrl: "/room/" + window.DDS.baseInfo.roomId + "/pack/use",
                widgetShowNum: 10,
                selectedGift: null,
                evtBusName: "giftbus"
            }, options);
            for (var name in setting) this[name] = setting[name];
            this.eventBus = EventBus.factory(this.evtBusName)
        };
    packages.prototype = {
        init: function() {
            if (this.container == null) return;
            this.dom()
        },
        dom: function() {
            var _index = this.container.find(".gift-tab li").size(),
                li = $('<li data-index="' + _index + '">' + this.name + "</li>");
            this.dotTip = $('<i class="dot-tip"></i>'), this.newMark || this.dotTip.css({
                display: "none"
            }), li.append(this.dotTip), this.container.find(".gift-tab").append(li), this.wrap = $('<div class="gift-wrap" style="display:none;"></div>'), this.container.find(".gift-group").append(this.wrap), this.createScroll(this.wrap, this.goods), this.addEvent()
        },
        addEvent: function() {
            var _this = this,
                lis = this.container.find(".goods");
            this.wrap.on("click", ".goods", function() {
                var _objs = $(this),
                    _id = _objs.attr("data-id"),
                    _title = _objs.attr("data-title"),
                    _gid = _objs.attr("data-gid"),
                    _num = parseInt(_objs.attr("data-num"));
                if (_num <= 0) {
                    _id != "ghorn" ? Status.errorBubble(_title + "免费次数用完，努力升级获得更多！", _objs) : Status.errorBubble(_title + '免费次数用完，请到 <a style="color:#2786e4"  target="_blank" href="/mall/list/2">商城购买！</a>', _objs);
                    return
                }
                _this.depend[_id] && (_objs.addClass("on"), _this["open" + _id](_objs, _id, _num, _gid))
            }), this.container.on("click", ".red-packet", function() {
                var node = $(this),
                    gid = node.attr("data-gid");
                _this.sendGift(node, {
                    quantity: 1,
                    gid: gid
                })
            }), _this.tiptime = null, lis.hover(function() {
                var $this = $(this);
                _this.showGoodsTip($this), _this.tiptime && clearTimeout(_this.tiptime)
            }, function() {
                _this.tiptime = setTimeout(function() {
                    _this.giftTip && _this.giftTip.hide()
                }, 50)
            }), this.openGiftSelecter(), _this.eventBus.on(EventType.packages.sendgift, function(ele, data) {
                var gid = _this.selectedGift.attr("data-gid");
                _this.sendGift(_this.selectedGift, ele, {
                    quantity: data.quantity,
                    gid: gid
                })
            })
        },
        openGiftSelecter: function() {
            var _this = this;
            this.giftGroup = this.container.find(".gift-group"), this.wrap.on("click", ".gift", function() {
                var ele = $(this);
                if (ele.hasClass("locked")) return;
                $(".MR-gift").find(".gift").removeClass("selected"), ele.addClass("selected"), _this.selectedGift = ele, _this.changeGiftConfig(ele)
            }), this.wrap.on("mouseover", ".gift", function() {
                var $this = $(this);
                _this.showTip($this), _this.tiptime && clearTimeout(_this.tiptime)
            }).on("mouseout", ".gift", function() {
                _this.tiptime = setTimeout(function() {
                    _this.giftTip && _this.giftTip.hide()
                }, 50)
            }), _this.giftGroup.on("mouseover", ".MR-gift-tip", function() {
                _this.tiptime && clearTimeout(_this.tiptime)
            }), _this.giftGroup.on("mouseleave", ".MR-gift-tip", function() {
                _this.giftTip && _this.giftTip.hide()
            })
        },
        changeGiftConfig: function(ele) {
            var data = this.getOneGifter(ele, this.data.gift),
                locked = ele.attr("data-locked") == 1 ? !0 : !1,
                config = {
                    data: data,
                    giftype: "package",
                    locked: locked
                };
            this.eventBus.emit(EventType.moregift.changeConfig, config)
        },
        getOneGifter: function(ele, data) {
            return data[ele.attr("data-bid")]
        },
        showTip: function(ele) {
            var _this = this,
                giftconfig = _this.getOneGifter(ele, _this.data.gift),
                pos = ele.position(),
                expire = this.getGiftExpire(ele);
            this.giftTip == null && (this.giftTip = $('<div class="MR-gift-tip"></div>'), this.giftGroup.append(this.giftTip));
            var html = ['<div class="tip-content">', '<img class="tip-img" src="' + giftconfig.bigicon + '"/>', '<div class="gift-tip-con"><span class="gift-tip-name">' + giftconfig.name + "</span>", '<span class="gift-tip-price">' + this.formateMoney(giftconfig.value) + "星币</span></div>", giftconfig.desc ? '<div class="gift-tip-desc">' + giftconfig.desc + "</div>" : "", "</div>"].join("");
            this.giftTip.html(html), this.giftTip.attr("style", "");
            var tipWidth = this.giftTip.width();
            pos.left + tipWidth > this.giftGroup.width() ? this.giftTip.css({
                right: "" + (this.giftGroup.width() - pos.left - 53) + "px"
            }) : this.giftTip.css({
                left: "" + pos.left + "px"
            }), this.giftTip.show()
        },
        formateMoney: function(val) {
            return val = "" + val, val.length > 4 ? (val /= 1e4, val + "万") : val
        },
        showGoodsTip: function(ele) {
            var _this = this,
                goodsConfig = _this.getOneGoods(ele),
                pos = ele.position(),
                expire = this.getGiftExpire(ele);
            this.giftTip == null && (this.giftTip = $('<div class="MR-gift-tip"></div>'), this.giftGroup.append(this.giftTip));
            var html = '<div class="tip-content"><img class="tip-img" src="' + goodsConfig.bigIcon + '"/>' + '<div class="gift-tip-con"><span class="gift-tip-name">' + goodsConfig.name + "</span>";
            switch (goodsConfig.typeid) {
                case "horn":
                case "ghorn":
                    html += '<a class="gift-tip-help" target="_blank" href="/help/horns">如何获得?</a>';
                    break;
                case "song":
                    html += '<a class="gift-tip-help" target="_blank" href="/help/songs">如何获得?</a>'
            }
            html += "</div>", html += goodsConfig.desc ? '<div class="gift-tip-desc">' + goodsConfig.desc + "</div>" : "", html += "</div>", this.giftTip.html(html), this.giftTip.attr("style", "");
            var tipWidth = this.giftTip.width();
            pos.left + tipWidth > this.giftGroup.width() ? this.giftTip.css({
                right: "" + (this.giftGroup.width() - pos.left - 53) + "px"
            }) : this.giftTip.css({
                left: "" + pos.left + "px"
            }), this.giftTip.show()
        },
        sendGift: function(obj, ele, data) {
            var _this = this;
            Util.post(this.packageUrl, {
                gid: data.gid,
                targetUserId: this.data.anchorInfo.anchorId,
                quantity: data.quantity
            }, function(D) {
                var _count = D.data;
                parseInt(_count) > 999 && (_count = "999+"), ele.find(".count").html(_count)
            }, function() {}, function(D) {
                Status.ajaxError(D, ele)
            })
        },
        createScroll: function(panel, arr) {
            var _str = '<ul class="clearfix">',
                ln = arr.length;
            for (var j = 0; j < ln; j++) {
                var data = arr[j];
                if (!data.product) continue;
                _str += this.createPackageHtml(data)
            }
            var val = 0;
            if (ln < this.widgetShowNum) {
                val = this.widgetShowNum - ln;
                for (j = 0; j < val; j++) _str += '<li class="gift-null"></li>'
            }
            _str += "</ul>", this.dataLen = ln + val, this.arrowScroll = Widgets.arrowScroll({
                container: panel,
                content: _str,
                width: 54 * this.widgetShowNum,
                content_width: 54 * this.dataLen
            }), this.arrowScroll.init()
        },
        createPackageHtml: function(data) {
            var _str = "",
                count = data.count > 999 ? "999+" : data.count;
            return data.product.typeid == "gift" ? _str += '<li class="gift" data-title="' + data.product.name + '" data-gid="' + data.gid + '" data-bid="' + data.product.businessId + '">' + '<div class="gift-package"><div class="gift-pic"><img src="' + data.product.middleIcon + '" /></div>' + '<div class="count">' + count + "</div>" + "</div></div>" + "</li>" : data.product.typeid == "red_packet" ? _str += '<li class="red-packet" data-title="' + data.product.name + '" data-gid="' + data.gid + '" data-bid="' + data.product.businessId + '">' + '<div class="gift-package"><div class="gift-pic"><img src="' + data.product.middleIcon + '" /></div>' + '<div class="count">' + count + "</div>" + "</div></div>" + "</li>" : _str += '<li class="goods" data-title="' + data.product.name + '" data-id="' + data.product.typeid + '" data-gid="' + data.gid + '" data-num="' + data.count + '"><div class="MR-goods">' + '<div class="goods-pic"><img src="' + data.product.middleIcon + '" /></div>' + '<div class="count">' + count + "</div>" + "</div></li>", _str
        },
        successCall: function(obj, _num) {
            var _ele = obj.find(".count"),
                _text_num = _num;
            _num <= 0 && (_num = 0), obj.attr("data-num", _num), _num > 999 && (_text_num = "999+"), _ele.html(_text_num)
        },
        closeCall: function(obj) {
            obj.removeClass("on")
        },
        openhorn: function(obj, _id, _num, _gid) {
            var _this = this;
            _this.depend[_id].openDialog(2, _num, this.packageUrl, _gid, function(gid, n) {
                _this.successCall(obj, n)
            }, function() {
                _this.closeCall(obj)
            })
        },
        openghorn: function(obj, _id, _num, _gid) {
            var _this = this;
            this.depend[_id].openDialog(3, _num, this.packageUrl, _gid, function(gid, n) {
                _this.successCall(obj, n)
            }, function() {
                _this.closeCall(obj)
            })
        },
        opensong: function(obj, _id, _num, _gid) {
            var _this = this;
            _this.depend[_id].openDialog(_num, this.packageUrl, _gid, function(n) {
                _this.successCall(obj, n)
            }, function() {
                _this.closeCall(obj)
            })
        },
        updateNum: function(num, gid, product) {
            var objs = this.wrap.find('[data-gid="' + gid + '"]');
            objs[0] ? this.successCall(objs, num) : this.addPackage(num, gid, product), this.dotTip.show()
        },
        addPackage: function(num, gid, product) {
            var data = {
                    gid: gid,
                    product: product,
                    count: num
                },
                html = this.createPackageHtml(data),
                _null_li = this.wrap.find(".gift-null");
            _null_li.size() > 0 && _null_li.eq(0).remove(), $(html).insertBefore(this.wrap.find("li").eq(0)), this.resetScroll(54 * (this.dataLen + 1))
        },
        resetScroll: function(sum) {
            this.arrowScroll.resetWidth(54 * this.widgetShowNum, sum, !0)
        },
        getGiftExpire: function(ele) {
            var gid = ele.attr("data-gid"),
                packGoods = this.data.config.packGoods,
                i = 0,
                len = packGoods.length;
            for (; i < len; i++)
                if (packGoods[i].gid == gid) return packGoods[i].product.expire;
            return 0
        },
        getOneGoods: function(ele) {
            var gid = ele.attr("data-gid"),
                packGoods = this.data.config.packGoods,
                i = 0,
                len = packGoods.length;
            for (; i < len; i++)
                if (packGoods[i].gid == gid) return packGoods[i].product
        },
        formateDate: function(time) {
            var day = Math.ceil(time / 1440),
                content = day == 0 ? "" : "" + day + "天";
            return content
        }
    }, module.exports = packages
}), define("CONTROLS_SOFA", ["JQ", "XM", "UTIL", "EMOTICON", "LOGIN", "STATUS", "EVENTBUS", "EVENTTYPE"], function(require, exports, module) {
    var $ = require("JQ"),
        X = require("XM"),
        UTIL = require("UTIL"),
        Emoticon = require("EMOTICON"),
        LOGIN = require("LOGIN"),
        STATUS = require("STATUS"),
        EventBus = require("EVENTBUS"),
        EventType = require("EVENTTYPE"),
        DsBtn = X.XM.extend({
            _constructor: function(container) {
                return this.container = $(container), this._lastTime = 0, this._timer = null, this._onCd = !1, this.text = this.container.html(), this
            },
            init: function() {},
            _setTime: function(time) {
                return this.container.html(time).attr("title", time + "秒"), this
            },
            isCd: function() {
                return this._onCd
            },
            start: function(lastTime) {
                var _this = this;
                if (lastTime <= 0) return !1;
                this.clear(), this._lastTime = lastTime, this._setTime(_this._lastTime), this._onCd = !0, this.container.addClass("sofa-ds-cd"), this._timer = setInterval(function() {
                    _this._lastTime -= 1, _this._lastTime > 0 ? _this._setTime(_this._lastTime) : _this.clear()
                }, 1e3)
            },
            clear: function() {
                this._timer && (this._onCd = !1, this.container.removeClass("sofa-ds-cd"), clearInterval(this._timer), this.container.html(this.text).attr("title", "嘚瑟一下"))
            }
        }),
        SofaView = X.XM.extend({
            _constructor: function(wrapper, isAnchor) {
                return this.wrapper = $(wrapper), this.skin = "", this._takeUiOpen = !1, this._tipTimer = null, this._TIP_LIVE = 3e3, this._isAnchor = isAnchor, this
            },
            init: function(sofaNum) {
                var html = $(this._createHTML(sofaNum));
                return this.wrapper.append(html), this.container = html, this.sofa = html.find(".sofa"), this.name = html.find(".sofa-user-name"), this.pic = html.find(".sofa-user-pic"), this.tip = html.find(".sofa-top-tip"), this.price = html.find(".sofa-price"), this.starMask = html.find(".sofa-star-mask"), this.takeMsk = html.find(".sofa-take-mask"), this.control = html.find(".sofa-control"), this.hugBtn = html.find(".sofa-hug"), this.hugPrice = html.find(".sofa-hug-price"), this.dsBtn = new DsBtn(html.find(".sofa-ds")), this.dsBtn.init(), this._bindTipEvent(), this
            },
            _createHTML: function(sofaNum) {
                var html = '<div class="MR-sofa-item ' + this.skin + '">';
                return this._isAnchor ? html += '<div class="sofa sofa-anchor">' : html += '<div class="sofa" data-sofa-action="take">', html += '<span class="sofa-num">' + sofaNum + "</span>", html += '<span class="sofa-user-name"></span>', html += '<span class="sofa-star-mask">kira</span>', html += '<span class="sofa-user-pic"></span>', html += '<span class="sofa-take-mask">抢</span>', html += "</div>", html += '<div class="sofa-tip sofa-top-tip"></div>', html += '<div class="sofa-tip sofa-price"></div>', html += '<div class="sofa-tip sofa-hug-price"><i class="ICON-coins" style="padding-right:16px;"></i><span class="price">2000</span><i class="arr arr-down"></i></div>', html += '<div class="sofa-control"><span class="btn C-fl sofa-ds" data-sofa-action="ds"><i class="icon"></i></span><span class="btn C-fr sofa-hug" data-sofa-action="hug"><i class="icon"></i></span></div>', html += "</div>", html
            },
            setName: function(name, level) {
                if (name) {
                    var text = "";
                    level > 0 && (text += '<i class="icon ICON-noble-level ICON-nl-' + level + '" ></i>'), text += UTIL.cutZhFont(name, 6), this.name.css("display", "block"), this.name.html(text), this.name.attr("title", name)
                } else this.name.css("display", "none"), this.name.attr("title", "");
                return this
            },
            setPic: function(url) {
                return url ? (this.pic.css("display", "block"), this.pic.html('<img src="' + url + '"/>')) : this.pic.css("display", "none"), this
            },
            setPrice: function(price) {
                var html = "<p class='text''><span class='width-layer'><i class='ICON-coins icon'></i>" + price + "</span></p>";
                return this.price.html(html), this._takeUiOpen && this.setPriceWidth(), this
            },
            setPriceWidth: function() {
                var max_w = 97;
                this.price.css({
                    width: max_w
                });
                var w = this.price.find(".width-layer").width();
                w < max_w && w > 0 && this.price.css({
                    width: w
                }), this.price.css({
                    top: "42px",
                    marginLeft: "-" + this.price.outerWidth() / 2 + "px"
                })
            },
            showName: function() {
                this.name.css("display", "block")
            },
            hideName: function() {
                this.name.css("display", "none")
            },
            showTakeUi: function() {
                return this.price.css("display", "block"), this._isAnchor || this.takeMsk.css("display", "block"), this.setPriceWidth(), this.price.addClass("sofa-price-ani"), this._takeUiOpen = !0, this
            },
            hideTakeUi: function() {
                return this.price.add(this.takeMsk).css("display", "none"), this.price.removeClass("sofa-price-ani"), this._takeUiOpen = !1, this
            },
            showControlUi: function() {
                return this.control.css("display", "block"), this.sofa.addClass("sofa-self"), this
            },
            hideControlUi: function() {
                return this.control.css("display", "none"), this.sofa.removeClass("sofa-self"), this
            },
            showHugPrice: function(value) {
                return this.hugPrice.find("price").html(value), this.hugPrice.css("display", "block"), this
            },
            hideHugPrice: function() {
                return this.hugPrice.css("display", "none"), this
            },
            setTip: function(mode, param) {
                var html = "",
                    _this = this,
                    max_w = 97,
                    tipLive = this._TIP_LIVE;
                mode == "error" ? html += "<p class='text'><span class='width-layer'>" + param.msg + "</span></p>" : mode == "speak" ? (html += "<p class='text'><span class='width-layer width-layer-break'>", html += Emoticon.parseEmoticon(UTIL.formatHTML(param.m), {
                    ol: param.l
                }), html += "</span></p>") : mode == "guide" ? html += "<p class='text' style='text-align:center;'><span class='width-layer'>专享贵宾权益<br/>快来抢沙发吧</span></p>" : mode == "reTake" ? (tipLive = 5e3, html += "<p class='text'><span class='width-layer width-layer-break' style='width:" + max_w + "px'>土豪<i class='user-name'>" + param.n + "</i>将您请下了沙发</span></p>", html += "<div class='btn-area clearfix'><span class='btn btn-red btn-take' data-sofa-action='take'>抢回来</span></div>") : mode == "otherTake" ? (tipLive = 5e3, html += "<p class='text'><span class='width-layer width-layer-break' style='width:" + max_w + "px'>土豪<i class='user-name'>" + param.n + "</i>将<i class='user-name'>" + param.on + "</i>请下了沙发</span></p>", this._isAnchor || (html += "<div class='btn-area clearfix'><span class='btn btn-red btn-take' data-sofa-action='take'>抢沙发</span></div>")) : mode == "dese" ? (html += "<p class='text'><span class='width-layer width-layer-break' style='width:" + max_w + "px'>土豪<i class='user-name'>" + param.n + "</i>在沙发上嘚瑟了一下</span></p>", this._isAnchor || (html += "<div class='btn-area clearfix'><span class='btn btn-red btn-take' data-sofa-action='take'>我也要</span></div>")) : html += "<p class='text'><span class='width-layer'>默认弹层</span></p>", html += '<i class="arr"></i>', this.tip.removeClass("sofa-tip-ani"), this.tip.html(html), this.tip.stop(!0, !0), this.tip.css({
                    display: "block",
                    width: max_w
                });
                var w = this.tip.find(".width-layer").width();
                return w < max_w && w != 0 && this.tip.css({
                    width: w
                }), this.tip.css({
                    top: "-" + (this.tip.outerHeight() + 6) + "px",
                    marginLeft: "-" + this.tip.outerWidth() / 2 + "px",
                    bottom: "auto"
                }), this.tip.addClass("sofa-tip-ani"), this._tipTimer && clearTimeout(this._tipTimer), this._tipTimer = setTimeout(function() {
                    _this.closeTip()
                }, tipLive), this
            },
            closeTip: function() {
                return this._tipTimer && clearTimeout(this._tipTimer), this.tip.removeClass("sofa-tip-ani"), this.tip.stop(!0, !0).fadeOut(300), this
            },
            _bindTipEvent: function() {
                var _this = this;
                this.tip.hover(function() {
                    _this._tipTimer && clearTimeout(_this._tipTimer)
                }, function() {
                    _this._tipTimer = setTimeout(function() {
                        _this.closeTip()
                    }, _this._TIP_LIVE)
                })
            }
        }),
        NbSofaView = SofaView.extend({
            _constructor: function(wrapper, isAnchor) {
                return NbSofaView._super._constructor.call(this, wrapper, isAnchor), this.skin = "MR-vip-sofa-item", this
            }
        }),
        Sofa_Module = X.XM.extend({
            take: function(roomId, pr, npr, id, success, complete, error) {
                var url = "/room/" + roomId + "/sofa/grab",
                    _this = this,
                    data = {
                        newPrice: npr,
                        oldPrice: pr,
                        sofaId: id
                    };
                UTIL.post(url, data, function(d) {
                    success.call(_this, d)
                }, function() {
                    complete.call(_this)
                }, function(e) {
                    e.code == 99 && (e.msg = "失败，请重试"), error.call(_this, e)
                })
            },
            sendGift: function(roomId, sofaId, giftId, success, complete, error) {
                var url = "/room/" + roomId + "/sofa/gift",
                    _this = this,
                    data = {
                        sofaId: sofaId,
                        giftId: giftId,
                        quantity: 1
                    };
                UTIL.post(url, data, function(d) {
                    success.call(_this, d)
                }, function() {
                    complete.call(_this)
                }, function(e) {
                    e.code == 99 && (e.msg = "失败，请重试"), error.call(_this, e)
                })
            },
            ds: function(roomId, sofaId, success, complete, error) {
                var url = "/room/" + roomId + "/sofa/dese",
                    _this = this,
                    data = {
                        sofaId: sofaId
                    };
                UTIL.post(url, data, function(d) {
                    success.call(_this, d)
                }, function() {
                    complete.call(_this)
                }, function(e) {
                    e.code == 99 && (e.msg = "失败，请重试"), error.call(_this, e)
                })
            }
        }),
        Sofa = X.XM.extend({
            _constructor: function(o) {
                return this.sofaId = o.sofaId, this._selfId = o.selfId, this._roomId = o.roomId, this._isAnchor = o.isAnchor, this._user = null, this._price = 0, this._nextPrice = 0, this._maxPrice = 1e7, this._timeStamp = 0, this._sofaHoverFlag = "out", this._HUG_GIFT = o.hugGift, this.view = new o.view(o.container, this._isAnchor), this.module = new Sofa_Module, this._MY = o.my, this
            },
            init: function() {
                return this.view.init(this.sofaId), this.module.init(), this._bindEvent(), this
            },
            upDate: function(user, price, nextPrice, timeStamp, timing, isInit) {
                if (timeStamp <= this._timeStamp) return !1;
                var oldUser = this._user,
                    selfHadOnSofa = this._selfOnSofa();
                return this.view.closeTip(), this._timeStamp = timeStamp, this.setPrice(price, nextPrice), this.setUser(user), this.setDsBtn(timing), this._openTip(oldUser, user, selfHadOnSofa, this._selfOnSofa(), this.isOnMaxPrice(), timeStamp, isInit), this
            },
            setUser: function(user) {
                var view = this.view;
                return $.isPlainObject(user) && !$.isEmptyObject(user) ? (this._user = user, view.setName(user.n, user.l), view.setPic(user.f)) : (this._user = null, view.setName(), view.setPic()), this._selfOnSofa() ? (view.hideTakeUi(), view.showName(), view.showControlUi()) : (view.hideControlUi(), this._sofaHoverFlag == "in" && (view.showTakeUi(), view.hideName())), this
            },
            setPrice: function(price, nextPrice) {
                var view = this.view,
                    p = 0;
                return nextPrice && nextPrice >= price ? (this._price = price, this._nextPrice = nextPrice, p = nextPrice) : price == this._maxPrice ? (this._price = price, this._nextPrice = price, p = "竞价已达上限") : (this._price = 0, this._nextPrice = 0, p = "免费抢"), view.setPrice(p), this
            },
            setDsBtn: function(time) {
                var btn = this.view.dsBtn;
                return btn.clear(), this._selfOnSofa() ? time <= 0 ? !1 : (btn.start(time), this) : !1
            },
            _openTip: function(oldUser, user, selfHadOnSofa, selfOnSofa, isOnMaxPrice, timeStamp, isInit) {
                return isOnMaxPrice || selfOnSofa ? !1 : ($.isPlainObject(oldUser) && !$.isEmptyObject(oldUser) && $.isPlainObject(user) && !$.isEmptyObject(user) && (selfHadOnSofa || this.sendChatMsg({
                    n: user,
                    on: oldUser,
                    ts: timeStamp
                })), this)
            },
            clear: function() {
                return this.upDate(), this
            },
            _selfOnSofa: function() {
                return this._user && this._user.i == this._selfId
            },
            isEmpty: function() {
                return !this._user
            },
            isOnMaxPrice: function() {
                return this._price >= this._maxPrice
            },
            speak: function(param) {
                return this.tip("speak", param), this
            },
            ds: function(param) {
                return this.setDsBtn(param.dt), this._dsAni(), this
            },
            _dsAni: function(stop) {
                var pic = this.view.pic,
                    _this = this,
                    _time = 20;
                return pic.stop(!0, !0), this._user && !$.isEmptyObject(this._user) && pic.animate({
                    top: "-=1",
                    left: "-=1"
                }, _time, function() {
                    $(this).animate({
                        top: "+=2",
                        left: "+=2"
                    }, _time, function() {
                        $(this).animate({
                            top: "+=1",
                            left: "+=1"
                        }, _time, function() {
                            $(this).animate({
                                top: "-=3",
                                left: "-=1"
                            }, _time, function() {
                                $(this).animate({
                                    top: "+=1",
                                    left: "-=1"
                                }, _time, function() {
                                    stop || _this._dsAni(!0)
                                })
                            })
                        })
                    })
                }), this
            },
            _bindEvent: function() {
                var _this = this,
                    view = this.view,
                    module = this.module;
                return view.container.hover(function() {
                    view.starMask.fadeIn(500)
                }, function() {
                    view.starMask.stop(!0, !0).css("display", "none")
                }), view.sofa.hover(function() {
                    _this._sofaHoverFlag = "in", _this._selfOnSofa() || (view.hideName(), view.showTakeUi())
                }, function() {
                    _this._sofaHoverFlag = "out", view.hideTakeUi(), _this._user && view.showName()
                }), view.tip.on("mouseover", '[data-sofa-action="take"]', function() {
                    _this._selfOnSofa() || (view.hideName(), view.showTakeUi())
                }), view.tip.on("mouseout", '[data-sofa-action="take"]', function() {
                    view.hideTakeUi(), _this._user && view.showName()
                }), view.container.on("click", '[data-sofa-action="take"]', function() {
                    if (!LOGIN.isLogin()) return LOGIN.dialogLogin(), !1;
                    if (_this._isAnchor) return !1;
                    if (_this._selfOnSofa()) return !1;
                    if (_this.isOnMaxPrice()) return _this.tip("error", {
                        msg: "沙发竞价已达上限"
                    }), !1;
                    if (!_this._MY.enoughBalance(_this._nextPrice)) return STATUS.noEnoughMoney(view.container), this;
                    var container = view.container;
                    if (container.hasClass("sofa-flag-taking")) return !1;
                    container.addClass("sofa-flag-taking");
                    var oldPrice = _this._nextPrice;
                    module.take(_this._roomId, _this._price, _this._nextPrice, _this.sofaId, function(d) {
                        _this._MY.reduceBalance(oldPrice)
                    }, function() {
                        container.removeClass("sofa-flag-taking")
                    }, function(e) {
                        _this.tip("error", {
                            msg: e.msg
                        })
                    })
                }), view.container.on("click", '[data-sofa-action="hug"]', function() {
                    if (!_this._selfOnSofa()) return !1;
                    if (!_this._MY.enoughBalance(_this._HUG_GIFT.value)) return STATUS.noEnoughMoney(view.container), this;
                    var container = view.container;
                    if (container.hasClass("sofa-flag-hug")) return !1;
                    container.addClass("sofa-flag-hug"), module.sendGift(_this._roomId, _this.sofaId, _this._HUG_GIFT.id, function(d) {
                        _this._MY.reduceBalance(_this._HUG_GIFT.value)
                    }, function() {
                        container.removeClass("sofa-flag-hug")
                    }, function(e) {
                        _this.tip("error", {
                            msg: e.msg
                        })
                    })
                }), view.hugBtn.hover(function() {
                    _this.view.showHugPrice(_this._HUG_GIFT.value)
                }, function() {
                    _this.view.hideHugPrice()
                }), view.container.on("click", '[data-sofa-action="ds"]', function() {
                    if (!_this._selfOnSofa()) return !1;
                    if (view.dsBtn.isCd()) return !1;
                    var container = view.container;
                    if (container.hasClass("sofa-flag-ds")) return !1;
                    container.addClass("sofa-flag-ds"), module.ds(_this._roomId, _this.sofaId, function(d) {}, function() {
                        container.removeClass("sofa-flag-ds")
                    }, function(e) {
                        _this.tip("error", {
                            msg: e.msg
                        })
                    })
                }), view.tip.on("click", ".cancel-hook", function() {
                    view.closeTip()
                }), this
            },
            tip: function(mode, param) {
                return this.view.setTip(mode, param), this
            },
            sendChatMsg: function() {}
        }),
        RoomSofa_View = X.XM.extend({
            _constructor: function(wrapper) {
                return this.wrapper = $(wrapper), this
            },
            init: function() {
                var html = $(this._createHTML());
                return this.wrapper.append(html), this.container = html, this
            },
            _createHTML: function() {
                var html = '<div class="MR-sofa">';
                return html += "</div>", html
            }
        }),
        RoomSofa_Module = X.XM.extend({
            getInitData: function(roomId, success, complete, error) {
                var url = "/room/" + roomId + "/sofa/status",
                    _this = this;
                UTIL.get(url, {}, function(d) {
                    success.call(_this, d)
                }, function() {
                    complete.call(_this)
                }, function(e) {
                    e.code == 99 && (e.msg = "网络错误，请重试"), error.call(_this)
                })
            }
        }),
        RoomSofa = X.XM.extend({
            _constructor: function(o) {
                return this.view = new RoomSofa_View(o.container), this.module = new RoomSofa_Module, this._sofas = {}, this._isAnchor = !!o.isAnchor, this._roomId = o.roomId, this._selfId = o.selfId, this._hugGift = o.giftData[window.DDS.config.sofaGift[0].data[0].id], this.sendChatMsg = o.sendChatMsg || function() {}, this._emptyMsgTimer = null, this._MY = o.my, this._isOpen = !0, this
            },
            init: function() {
                var _this = this;
                return this.view.init(), this.module.init(), this.module.getInitData(this._roomId, function(d) {
                    $.each(d.data, function() {
                        _this.updateSofa(this, !0)
                    })
                }, function() {}, function(e) {}), this.evtBusName = "giftbus", this.eventBus = EventBus.factory(this.evtBusName), this.eventBus.on(EventType.sofa.sofaswitch, function(flag) {
                    this.switchState(flag)
                }, this), this.eventBus.trigger(EventType.sofa.sofaloaded), this
            },
            updateSofa: function(sofaData, isInit) {
                var sofas = this._sofas,
                    _this = this;
                if (sofaData.tp == "stop") this.clearAllSofa();
                else {
                    var sofa = sofas[sofaData.si];
                    sofa || (sofa = this.initSofa({
                        sofaId: sofaData.si,
                        selfId: this._selfId,
                        roomId: this._roomId,
                        container: this.view.container,
                        hugGift: this._hugGift,
                        isAnchor: this._isAnchor,
                        view: sofaData.si == 1 ? NbSofaView : SofaView,
                        my: this._MY
                    }), sofas[sofaData.si] = sofa, sofa.sendChatMsg = function(arg) {
                        _this.sendChatMsg(arg)
                    }, sofa.init()), sofa.upDate(sofaData.u, sofaData.pr, sofaData.npr, sofaData.ts, sofaData.dt, isInit)
                }
                return this
            },
            _getSofaByUserId: function(id) {
                var res = null,
                    idArr = [],
                    sofas = this._sofas;
                return sofas && $.each(sofas, function() {
                    this._user && this._user.i == id && idArr.push(this.sofaId)
                }), idArr.length > 0 && (res = sofas[Math.min.apply(null, idArr)]), res
            },
            _getEmptySofa: function() {
                var res = null,
                    idArr = [],
                    sofas = this._sofas;
                return sofas && $.each(sofas, function() {
                    this.isEmpty() && idArr.push(this.sofaId)
                }), idArr.length > 0 && (res = sofas[Math.min.apply(null, idArr)]), res
            },
            initSofa: function(initParam) {
                var sofa = new Sofa(initParam);
                return sofa
            },
            clearAllSofa: function() {
                $.each(this._sofas, function() {
                    this.clear()
                })
            },
            switchState: function(flag) {
                flag ? (this._isOpen = !0, this.view.container.css("display", "block")) : (this._isOpen = !1, this.view.container.css("display", "none"))
            },
            _starEmptyMsg: function() {
                this._emptyMsgTimer && clearInterval(this._emptyMsgTimer);
                var _this = this;
                return this._emptyMsgTimer = setInterval(function() {
                    var sofa = _this._getEmptySofa();
                    sofa && sofa.tip("guide")
                }, 18e4), this
            },
            socketChange: function(body) {
                return this.updateSofa(body), this
            },
            socketChatMsg: function(body) {
                if (!this._isOpen) return !1;
                var userId = body.i,
                    sofa = this._getSofaByUserId(userId);
                return sofa ? (sofa.speak(body), this) : !1
            },
            socketDs: function(body) {
                if (!this._isOpen) return !1;
                var sofaId = body.si,
                    sofa = this._sofas[sofaId];
                return sofa ? (sofa.ds(body), this) : !1
            }
        });
    module.exports = RoomSofa
}), define("CONTROLS_SOCKET", ["JQ", "UTIL", "DIALOG", "STATUS"], function(require, exports, module) {
    var $ = require("JQ"),
        Util = require("UTIL"),
        Dialog = require("DIALOG"),
        Status = require("STATUS");
    window._flash_get_params = function() {
        return {
            chatRate: window.DDS.baseInfo.chatRate
        }
    }, window._flash_change_room = function() {
        window.location.href = "/go/" + window.DDS.baseInfo.roomId
    }, window._flash_gifter_close = function() {
        $("#LF-gift-container").removeClass("MR-gift-flash-show")
    }, window._flash_enter_fx = function() {
        $("#LF-enter-fx").removeClass("MR-enter-fx-show")
    }, window._flash_gifter_open = function() {
        $("#LF-gift-container").addClass("MR-gift-flash-show")
    }, window._flash_gifter_toggle = function(state) {
        state == 0 ? ($("#LF-gift-container").addClass("MR-gift-flash-hide"), $("#LF-enter-fx").addClass("MR-enter-fx-hide")) : ($("#LF-gift-container").removeClass("MR-gift-flash-hide"), $("#LF-enter-fx").removeClass("MR-enter-fx-hide"))
    }, window._flash_fullscreen_chat = function(value) {}, window._flash_fullscreen_horn = function(value) {}, window._flash_fullscreen_ime = function(url) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "jsonp",
            cache: !1,
            success: function(data) {
                if ($("#ddshowPlayer")[0]) try {
                    $("#ddshowPlayer")[0].getThesaurusRespone(data)
                } catch (e) {}
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {}
        })
    };
    var listener = function(options) {
        var setting = $.extend({}, {
            data: null,
            socket: null,
            is_reduce: !1,
            is_one: !1,
            models: {}
        }, options);
        for (var name in setting) this[name] = setting[name]
    };
    listener.prototype = {
        init: function() {
            this.listeners()
        },
        listeners: function() {
            var _this = this,
                _temp_notice_id = 0;
            this.my = this.defineModel("my"), this.video = this.defineModel("video"), this.talk = this.defineModel("talk"), this.msg = this.defineModel("msg"), this.comboMsg = this.defineModel("comboMsg"), this.gift = this.defineModel("gift"), this.about = this.defineModel("about"), this.horn = this.defineModel("horn"), this.bonus = this.defineModel("bonus"), this.count = this.defineModel("count"), this.giftcount = this.defineModel("giftcount"), this.osnotice = this.defineModel("osnotice"), this.roomnotice = this.defineModel("roomnotice"), this.online = this.defineModel("online"), this.biggift = this.defineModel("biggift"), this.countdown = this.defineModel("countdown"), this.appManager = this.defineModel("appManager"), this.appSong = this.defineModel("appSong"), this.appMulti = this.defineModel("appMulti"), this.appVote = this.defineModel("appVote"), this.appSetting = this.defineModel("appSetting"), this.guard = this.defineModel("guard"), this.ticket = this.defineModel("ticket"), this.singleChat = this.defineModel("singleChat"), this.packages = this.defineModel("packages"), this.berth = this.defineModel("berth"), this.sofa = this.defineModel("sofa"), this.giftLink = this.defineModel("giftLink"), this.communityPanel = this.defineModel("communityPanel"), this.tvInfo = this.defineModel("tvInfo"), this.micro = this.defineModel("micro"), this.plugin = this.defineModel("plugin"), this.anchorMicroNotice = this.defineModel("anchorMicroNotice"), this.valentine = this.defineModel("valentine"), this.countDownTimer = null, this.socket.on("flashinfo", function(args) {
                if (_this.video) {
                    var _flash = $("#ddshowPlayer")[0],
                        player = _this.video;
                    _flash ? args.body.m === "start" ? Util.browser.Ipad ? setTimeout(function() {
                        _flash && _flash.beginLive()
                    }, 1e3) : _flash && _flash.beginLive() : _flash && _flash.stopLive() : args.body.m === "start" ? Util.browser.Ipad ? setTimeout(function() {
                        player && player.socketFlashInfo(args)
                    }, 1e3) : player && player.socketFlashInfo(args) : player && player.socketFlashInfo(args), args.body.m === "start" ? (clearTimeout(_this.countDownTimer), _this.countdown != null && _this.countdown.hideCountDown && _this.countdown.hideCountDown()) : _this.countdown != null && _this.countdown.showCountDown && (_this.countDownTimer = setTimeout(function() {
                        _this.countdown.showCountDown()
                    }, 1e4))
                }
            }), window._flash_fullscreen_chat = function(value) {
                _this.talk && _this.talk.INTERFACE_Chat(value, function(data) {
                    if ($("#ddshowPlayer").length > 0) try {
                        $("#ddshowPlayer")[0] && $("#ddshowPlayer")[0].sendChatRespone(data)
                    } catch (e) {}
                    _this.video && _this.video.sendChatResponse && _this.video.sendChatResponse(data), data.code == "-2" && Status.ajaxError(data)
                })
            }, window._flash_fullscreen_horn = function(value) {
                _this.horn && _this.horn.INTERFACE_GoldHorn(value, function(data) {
                    if ($("#ddshowPlayer").length > 0) try {
                        $("#ddshowPlayer")[0] && $("#ddshowPlayer")[0].sendHornRespone(data)
                    } catch (e) {}
                    _this.video && _this.video.sendHornResponse && _this.video.sendHornResponse(data), data.code == "-2" && Status.ajaxError(data)
                })
            }, _this.video && _this.video.on && (_this.video.on("giftEffectClose", function() {
                window._flash_gifter_toggle(0)
            }), _this.video.on("giftEffectOpen", function() {
                window._flash_gifter_toggle(1)
            }), _this.video.on("chat", function(value) {
                window._flash_fullscreen_chat(value)
            }), _this.video.on("horn", function(value) {
                window._flash_fullscreen_horn(value)
            })), this.socket.on("vipuserlist", function(args) {
                _this.berth != null && _this.berth.updateData(args.data)
            }), this.socket.on("gift_reset", function() {
                _this.count != null && (_this.count.updateGiftNum(-1), _this.count.updateHotNum(-1)), _this.giftcount != null && _this.giftcount.clearNum()
            }), this.socket.on("room_hot", function(args) {
                _this.count != null && _this.count.updateHotNum(args.body.ht)
            }), this.socket.on("userlist", function(args) {
                _this.online != null && _this.online.getOnLineUserList(args.data)
            }), this.socket.on("chatRate", function(args) {
                _this.talk && _this.talk.updateChatRate(args.body.sc), _this.video && _this.video.setChatRate && _this.video.setChatRate(args.body.sc)
            }), this.socket.on("levelMsg", function(args) {
                _this.about != null && _this.about.updateGradeProgress({
                    level: args.body.cl,
                    needbeans: args.body.nb,
                    hasbeans: args.body.hb
                })
            }), this.socket.on("attention", function(args) {
                if (_this.about == null) return;
                _this.about.updateFansNum(args.body.an)
            }), this.socket.on("topNoticeMessage", function(args) {
                if (_this.about == null) return;
                _this.about.updateSign(args.body.m);
                if (_this.roomnotice == null) return;
                _this.roomnotice.changeNotice(args.body.m)
            }), this.socket.on("usercount", function(args) {
                _this.count != null && _this.count.updatePersonNum(args.usercount), _this.online && _this.online.user_count && _this.online.user_count.html(args.usercount), _this.ticket != null && _this.ticket.setOnlineCount(args.usercount)
            }), this.socket.on("systemLevelMsg", function(args) {
                _this.my != null && _this.my.updateLevel(args.body.l), _this.talk != null && _this.talk.upDelay(args.body.l), _this.data.config.roomType != "livehouse" && _this.openLevelUpDialog(args.body)
            }), this.socket.on("userRoomKickout", function(args) {
                Status.kickConnect()
            }), this.socket.on("kick", function(args) {
                Status.kickConnect()
            }), this.socket.on("chatMessage", function(args) {
                if (_this.msg == null) return;
                _this.msg.addChatMsg(args.body);
                if (!window.HAD_VERIFY_TOGGLE) return;
                var _flash = $("#ddshowPlayer")[0];
                if (_flash) try {
                    _flash.setChatInfo({
                        type: 1,
                        info: args.body,
                        meId: window.DDS.userInfo.userId
                    })
                } catch (e) {
                    typeof console != "undefined" && console.log(e)
                }
                _this.video && _this.video.setChatInfo && _this.video.setChatInfo(1, args.body, window.DDS.userInfo.userId)
            }), setTimeout(function() {
                window.INFO != "undefined" && window.INFO.isLogin && _this.enterFx({
                    i: _this.data.userInfo.userId,
                    n: _this.data.userInfo.userName,
                    gd: _this.data.userInfo.gender,
                    l: _this.data.userInfo.userLevel,
                    ei: _this.data.userInfo.ei
                })
            }, 3e3), this.socket.on("enterMessage", function(args) {
                _this.msg != null && _this.msg.isEnterMsg && _this.msg.enterMsg(args.body);
                if (!window.HAD_VERIFY_TOGGLE || args.body.i == _this.data.userInfo.userId) return;
                _this.enterFx(args.body)
            }), this.socket.on("sendStar", function(args) {
                if (_this.msg == null) return;
                _this.msg.addStarMsg(args.body), _this.about && _this.about.updateStarNum(args.body.q), _this.about && $.isFunction(_this.about.showStarTip) && _this.about.showStarTip(), _this.micro && _this.micro.socketSendStar(args)
            }), this.socket.on("sendGift2User", function(args) {
                if (args.body.ti != _this.data.anchorInfo.anchorId && args.body.i != _this.data.anchorInfo.anchorId) {
                    _this.msg.addUserGiftMsg(args.body), window.HAD_VERIFY_TOGGLE && (_this.openLuckyGiftDialog(args.body), _this.data.anchorInfo.anchorId != _this.data.userInfo.userId && _this.addEarn(args.body, !0));
                    return
                }
            }), this.socket.on("sendGiftCombo", function(args) {
                _this.comboMsg != null && _this.comboMsg.pushMsg(args.body)
            }), this.socket.on("sendGift", function(args) {
                if (!window.HAD_VERIFY_TOGGLE || _this.msg == null) {
                    _this.msg.addGiftMsg(args.body);
                    return
                }
                if (_this.giftcount != null) {
                    _this.giftcount.updateData(args.body);
                    if ($("#ddshowPlayer")[0] || _this.video && _this.video.setGiftInfo) {
                        var _lh_args = args.body,
                            _lh_g = _lh_args.g,
                            _lh_pm = _lh_args.pm;
                        _lh_args.toRoom = !1, _lh_args.ti == window.DDS.anchorInfo.anchorId && (_lh_args.toRoom = !0), window.DDS.gift[_lh_g] && (_lh_args.giftInfo = window.DDS.gift[_lh_g], window.DDS.showList[_lh_pm] && (_lh_args.giftPs = window.DDS.showList[_lh_pm])), _this.video && _this.video.setGiftInfo && _this.video.setGiftInfo(_lh_args);
                        try {
                            $("#ddshowPlayer")[0].setGiftInfo(_lh_args)
                        } catch (e) {}
                    }
                }
                if (args.body.q && parseInt(args.body.q) > 1) {
                    var _ln = parseInt(args.body.q);
                    if (_this.is_one) _this.msg.addGiftMsg(args.body, "x" + _ln);
                    else {
                        var diff = 1;
                        _ln > 150 && _ln <= 200 ? diff = 2 : _ln > 200 && _ln <= 1e3 ? diff = Math.ceil(_ln / 100) : _ln > 1e3 && _ln <= 1e4 ? diff = Math.ceil(_ln / 200) : _ln > 1e4 && (diff = Math.ceil(_ln / 300));
                        var _temp = Math.ceil(_ln / diff) - 1;
                        for (var i = 0; i < _temp; i++) _this.msg.addGiftMsg(args.body, (i + 1) * diff);
                        _this.msg.addGiftMsg(args.body, _ln)
                    }
                } else _this.msg.addGiftMsg(args.body);
                _this.openLuckyGiftDialog(args.body), _this.data.anchorInfo.anchorId != _this.data.userInfo.userId && _this.addEarn(args.body), _this.count && _this.count.updateGiftNum(parseInt(args.body.q));
                if (!args.body.pm || window.CLOSE_FLASH_EFFECT) return;
                args.body.params = _this.data.showList[args.body.pm];
                if (!args.body.params) return;
                if (args.body.params.flashUrl == "" || args.body.params.if_show == "0") return;
                args.body.q && (args.body.params.count = args.body.q);
                if ($("#ddshowGifter")[0]) {
                    args.body.params.uName = args.body.n, args.body.tn ? args.body.params.aName = args.body.tn : args.body.params.aName = "", args.body.params.aName = args.body.tn, args.body.params.level = args.body.l, args.body.params.count = args.body.q, args.body.params.swfInfo = {};
                    var _id = args.body.pm;
                    window.DDS.gift && window.DDS.gift[_id] && (args.body.params.swfInfo = window.DDS.gift[_id]), window.DDS.config.roomCustomNum && (window.DDS.config.roomCustomNum == args.body.q ? (args.body.params.giftType = "0_1", args.body.params.aName = DDS.anchorInfo.anchorName) : args.body.params.giftType = "1_0"), $("#LF-gift-container").addClass("MR-gift-flash-show");
                    try {
                        $("#ddshowGifter")[0].jsCallAs(args.body.params)
                    } catch (err) {}
                }
            }), this.socket.on("hornMessage", function(args) {
                _this.msg != null && _this.msg.hornMsg(args.body);
                if (!window.HAD_VERIFY_TOGGLE || _this.horn == null) return;
                if (_this.horn)
                    if (_this.horn.config && _this.horn.config.isFlash) {
                        var _flash = $("#ddshowPlayer")[0];
                        if (_flash) try {
                            _flash.setChatInfo({
                                type: 2,
                                info: args.body,
                                meId: window.DDS.userInfo.userId
                            })
                        } catch (e) {
                            typeof console != "undefined" && console.log(e)
                        }
                        _this.video && _this.video.setChatInfo && _this.video.setChatInfo(2, args.body, window.DDS.userInfo.userId)
                    } else _this.horn.showHorn(args.body)
            }), this.socket.on("globalHornMessage", function(args) {
                if (!window.HAD_VERIFY_TOGGLE || _this.biggift == null) return;
                _this.biggift.broadcastGift && _this.biggift.broadcastGift(args.body, "horn")
            }), this.socket.on("assign_redpack", function(args) {
                _this.bonus.showSmallBonus(args)
            }), this.socket.on("redpack_picked_up", function(args) {
                setTimeout(function() {
                    _this.bonus.destroyAllBonus()
                }, 3e3)
            }), this.socket.on("sendBigGift", function(args) {
                if (!window.HAD_VERIFY_TOGGLE || _this.biggift == null) return;
                _this.biggift.broadcastGift(args.body)
            }), this.socket.on("systemNotice", function(args) {
                if (_this.osnotice == null) return;
                if (args.body.ni == -1) {
                    _temp_notice_id -= 1;
                    var id = _temp_notice_id;
                    _this.osnotice.rollAddNew({
                        id: id,
                        title: args.body.m
                    }), setTimeout(function() {
                        _this.osnotice.removeMsgById(id)
                    }, 3e4)
                } else _this.osnotice.rollAddNew({
                    id: args.body.ni,
                    title: args.body.m
                })
            }), this.socket.on("room_theme", function(args) {
                var isEdit = $("#LF-title").find(".MR-title")[0] ? !0 : !1;
                isEdit || $("#LF-title").html(Util.formatHTML(args.body.m))
            }), this.socket.on("newOrderMenu", function(args) {
                _this.appSong && _this.appSong.socketNewOrderMenu && _this.appSong.socketNewOrderMenu(args)
            }), this.socket.on("deleteOrderMenu", function(args) {
                _this.appSong && _this.appSong.socketDeleteOrderMenu && _this.appSong.socketDeleteOrderMenu(args)
            }), this.socket.on("orderSong", function(args) {
                _this.appSong && _this.appSong.socketOrderSong && _this.appSong.socketOrderSong(args)
            }), this.socket.on("orderSuccess", function(args) {
                _this.appSong && _this.appSong.socketOrderSuccess && _this.appSong.socketOrderSuccess(args), _this.appManager && _this.appManager.buttonTip && _this.appManager.buttonTip("播客同意演唱我点的“" + (args.body.msg.songName || "歌曲") + "”")
            }), this.socket.on("songAgree", function(args) {
                _this.msg.songMsg(args.body)
            }), this.socket.on("orderFail", function(args) {
                _this.appSong && _this.appSong.socketOrderFail && _this.appSong.socketOrderFail(args), _this.appManager && _this.appManager.buttonTip && _this.appManager.buttonTip("播客拒绝了我点的“" + (args.body.msg.songName || "歌曲") + "”"), _this.packages != null && args.body.origin == 0 && _this.packages.updateNum(args.body.quantity, "song")
            }), this.socket.on("multi_mic_enable", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicEnable && _this.appMulti.socketMultiMicEnable(args)
            }), this.socket.on("multi_mic_disable", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicDisable && _this.appMulti.socketMultiMicDisable(args)
            }), this.socket.on("multi_mic_apply", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicApply && _this.appMulti.socketMultiMicApply(args)
            }), this.socket.on("multi_mic_cancel", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicCancel && _this.appMulti.socketMultiMicCancel(args)
            }), this.socket.on("multi_mic_count", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicCount && _this.appMulti.socketMultiMicCount(args)
            }), this.socket.on("multi_mic_give", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicGive && _this.appMulti.socketMultiMicGive(args)
            }), this.socket.on("multi_mic_play", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicPlay && _this.appMulti.socketMultiMicPlay(args)
            }), this.socket.on("multi_mic_take", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicTake && _this.appMulti.socketMultiMicTake(args)
            }), this.socket.on("multi_mic_end", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicEnd && _this.appMulti.socketMultiMicEnd(args)
            }), this.socket.on("multi_mic_kick", function(args) {
                _this.appMulti && _this.appMulti.socketMultiMicKick && _this.appMulti.socketMultiMicKick(args)
            }), this.socket.on("room_n_kickout", function(args) {
                _this.msg != null && _this.msg.kickMsg(args.body)
            }), this.socket.on("room_n_banspeak", function(args) {
                _this.msg != null && _this.msg.banspeakMsg(args.body)
            }), this.socket.on("userRoomPromoteManagerV2", function(args) {
                _this.msg != null && _this.msg.managerMsg(args.body)
            }), this.socket.on("userRoomDegradeManagerV2", function(args) {
                _this.msg != null && _this.msg.managerMsg(args.body)
            }), this.socket.on("userRoomKickoutV2", function(args) {
                _this.msg != null && _this.msg.managerMsg(args.body)
            }), this.socket.on("userRoomBanpeakV2", function(args) {
                _this.msg != null && _this.msg.managerMsg(args.body)
            }), this.socket.on("forceStop", function(args) {
                Dialog.alert("对不起，因发现您在本频道“" + args.body.r + "”而被踢下播，请按平台要求重新开播。")
            }), this.socket.on("voteStatus", function(args) {
                _this.appVote && _this.appVote.socketVoteStatus && _this.appVote.socketVoteStatus(args), _this.appSetting && _this.appSetting.socketVoteStatus && _this.appSetting.socketVoteStatus(args)
            }), this.socket.on("vote", function(args) {
                _this.appVote && _this.appVote.socketVote && _this.appVote.socketVote(args), _this.appSetting && _this.appSetting.socketVote && _this.appSetting.socketVote(args)
            }), this.socket.on("voteTop", function(args) {
                _this.appVote && _this.appVote.socketVoteTop && _this.appVote.socketVoteTop(args), _this.appSetting && _this.appSetting.socketVoteTop && _this.appSetting.socketVoteTop(args)
            }), this.socket.on("psNotice", function(args) {
                _this.msg && _this.msg.pssMsg(args.body), _this.guard && _this.guard.socketPsNotice(args.body)
            }), this.socket.on("psUpdate", function(args) {
                _this.guard && _this.guard.socketPsUpdate(args.body)
            });
            var exprQueue = [],
                exprLock = !1,
                left = $("#LF-stager").offset().left,
                exprData = window.DDS.patronsaint || {},
                exprAnimate = function() {
                    if (exprLock || !exprQueue.length || !exprData) return;
                    exprLock = !0;
                    var d = exprQueue.shift();
                    if (!exprData[d.ei]) {
                        exprQueue.length && exprAnimate();
                        return
                    }
                    var dom = $('<div class="dynamic-animate-panel" style="left:-480px;top:' + 240 * Math.random() + 'px;"><p class="pic"><img src="' + exprData[d.ei].url + '" alt="' + exprData[d.ei].tag + '" style="width: 480px;"/></p><p class="desc" style="display:none;"><i class="ICON-noble-level ICON-nl-' + d.l + '"></i> <span title="' + d.n + '">' + Util.cutZhFont(d.n, 8) + "</span> 送出动态表情</p></div>");
                    dom.appendTo("body"), dom.animate({
                        left: left
                    }).find("img").animate({
                        width: 240
                    }, 600, function() {
                        dom.find(".desc").fadeIn(), setTimeout(function() {
                            dom.remove(), exprLock = !1, exprQueue.length && exprAnimate()
                        }, 3e3)
                    })
                };
            this.socket.on("psExpr", function(args) {
                exprQueue.push(args.body), exprAnimate()
            }), this.socket.on("singleChat", function(args) {
                _this.singleChat && _this.singleChat.socketSingleChat(args)
            }), this.socket.on("pack_change", function(args) {
                var _args = args.body.item;
                _this.packages != null && _this.packages.updateNum(_args.count, _args.gid, _args.product)
            }), this.socket.on("sofaChange", function(args) {
                _this.sofa && _this.sofa.socketChange(args.body)
            }), this.socket.on("sofaDese", function(args) {
                _this.sofa && _this.sofa.socketDs(args.body)
            }), this.socket.on("sofaGift", function(args) {
                if (window.CLOSE_FLASH_EFFECT) return !1;
                var params = _this.data.showList[args.body.g],
                    indexArr = [3, 2, 4, 1, 5];
                if (!params || params.flashUrl == "") return;
                if ($("#ddshowGifter")[0]) {
                    if (params.imgUrl && params.imgUrl != "") return !1;
                    params.dsc = "在沙发上给播客一个熊抱", params.uName = args.body.n, params.level = args.body.l, params.sofaIndex = indexArr[args.body.si - 1] || 1, $("#LF-gift-container").addClass("MR-gift-flash-show"), $("#ddshowGifter")[0].jsCallAs(params)
                }
            }), this.socket.on("event_rank", function(args) {
                _this.valentine && _this.valentine.socketEventRank(args.body)
            }), this.socket.on("event_user_private", function(args) {
                _this.valentine && _this.valentine.socketEventUserPrivate(args.body)
            }), this.socket.on("event_box_reward", function(args) {
                if (!window.HAD_VERIFY_TOGGLE || _this.biggift == null) return !1;
                if (_this.valentine) {
                    var html = _this.valentine.socketEventBoxReward(args.body);
                    html && _this.biggift.broadcastGift({
                        eventInfo: html
                    })
                }
            }), this.socket.on("event_lottery_feedback_2", function(args) {
                _this._redPacketDialog(args.body)
            }), this.socket.on("set_conf", function(args) {
                _this.tvInfo && _this.tvInfo.socketSetConf(args.body)
            }), this.socket.on("micQueue", function(args) {
                _this.micro && _this.micro.socketMicQueue(args);
                var _args = args.body.dt.micQueue;
                _args.length && _args.length > 0 ? window.DDS.anchorInfo.anchorId = _args[0].a : window.DDS.anchorInfo.anchorId = "0"
            }), this.socket.on("setUserMicSwitch", function(args) {
                _this.micro && _this.micro.socketSetUserMicSwitch(args), _this.anchorMicroNotice && _this.anchorMicroNotice.socketSetUserMicSwitch(args)
            }), this.socket.on("adminMicSwitch", function(args) {
                _this.micro && _this.micro.socketAdminMicSwitch(args), _this.anchorMicroNotice && _this.anchorMicroNotice.socketAdminMicSwitch(args)
            }), this.socket.on("flashinfo", function(args) {
                _this.micro && _this.micro.socketFlashInfo(args), _this.plugin && _this.plugin.socketFlashInfo && _this.plugin.socketFlashInfo(args)
            }), this.socket.on("setOffPlay", function(args) {
                _this.micro && _this.micro.socketSetOffPlay(args)
            }), this.socket.on("notifyOnMic", function(args) {
                _this.anchorMicroNotice && _this.anchorMicroNotice.socketNotifyOnMic(args)
            }), this.socket.on("notifySwitchStatus", function(args) {
                _this.micro && _this.micro.socketNotifySwitchStatus(args)
            }), this.socket.on("userRoleChange", function(args) {
                _this.msg && _this.msg.addAuthMsg(args.body)
            }), this.socket.on("singleUserRoleChange", function(args) {
                _this.msg && _this.msg.addAuthMsg(args.body)
            }), this.socket.on("giftChain", function(args) {
                _this.giftLink && _this.giftLink.socketGiftChain(args.body)
            }), this.socket.on("giftChainFinish", function(args) {
                _this.biggift && _this.biggift.broadcastGift(args.body, "giftLink")
            }), this.socket.on("daily_task_init", function(args) {
                _this.communityPanel && _this.communityPanel.socketDailyTaskInit(args.body)
            }), this.socket.on("daily_task_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketDailyTaskUpdate(args.body)
            }), this.socket.on("community_notice_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketCommunityNoticeUpdate(args.body)
            }), this.socket.on("active_stage_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketActiveStageUpdate(args.body)
            }), this.socket.on("gold_exp_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketGoldExpUpdate(args.body)
            }), this.socket.on("gold_room_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketGoldRoomUpdate(args.body)
            }), this.socket.on("active_level_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketActiveLevelUpdate(args.body)
            }), this.socket.on("user_grabed_redpack", function(args) {
                _this.msg && _this.msg.getRedPacketMsg(args.body), _this.communityPanel && _this.communityPanel.socketGrabedRedpack(args.body)
            }), this.socket.on("redpack_picked_up", function(args) {
                _this.communityPanel && _this.communityPanel.socketRedpackPickedUp(args.body)
            }), this.socket.on("assign_redpack", function(args) {
                _this.communityPanel && _this.communityPanel.socketAssignRedpack(args.body)
            }), this.socket.on("redpack_overdue", function(args) {
                _this.communityPanel && _this.communityPanel.socketRedpackOverdue(args.body)
            }), this.socket.on("pond_remain_change", function(args) {
                _this.communityPanel && _this.communityPanel.socketPondRemainChange(args.body)
            }), this.socket.on("flashinfo", function(args) {
                _this.communityPanel && _this.communityPanel.socketFlashInfo(args.body)
            }), this.socket.on("group_color_change", function(args) {
                _this.communityPanel && _this.communityPanel.socketGroupColorChange(args.body)
            }), this.socket.on("hot_circle_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketHotCircleUpdate(args.body)
            }), this.socket.on("community_collective_task_state_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketCommunityCollectiveTaskStateUpdate(args.body), args.body.imt && args.body.im && _this.msg && _this.msg.communityMsg(args.body)
            }), this.socket.on("community_exp_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketCommunityExpUpdate(args.body)
            }), this.socket.on("community_collective_task_update", function(args) {
                _this.communityPanel && _this.communityPanel.socketCommunityCollectiveTaskUpdate(args.body)
            }), this.socket.on("community_collective_task_add", function(args) {
                _this.communityPanel && _this.communityPanel.socketCommunityCollectiveTaskAdd(args.body)
            }), this.socket.on("community_collective_task_del", function(args) {
                _this.communityPanel && _this.communityPanel.socketCommunityCollectiveTaskDel(args.body)
            }), this.socket.on("forceWarning", function(args) {
                Dialog.alert(args.body.r)
            })
        },
        defineModel: function(name) {
            return this.models[name] ? this.models[name] : null
        },
        enterFx: function(args) {
            if ($("#lfEnterFx")[0]) {
                var _flash = $("#lfEnterFx")[0],
                    i = args.i,
                    _ei = args.ei;
                if (_ei == 0) return;
                var level = args.l,
                    name = args.n,
                    _url = this.data.enterEffect[_ei + ""].url;
                if (!_flash._flashInStageEffect) return;
                $("#LF-enter-fx").hasClass("MR-enter-fx-hide") || $("#LF-enter-fx").addClass("MR-enter-fx-show"), _flash._flashInStageEffect({
                    url: _url,
                    uName: name,
                    level: level
                })
            }
        },
        openLuckyGiftDialog: function(body) {
            var _this = this,
                myId = this.data.userInfo.userId,
                originUserId = body.i,
                reward = body.r,
                rewardDetails = body.rd || [];
            if (!this.data.gift[body.g]) return !1;
            if (!rewardDetails[0]) return !1;
            body.lucky = this.data.gift[body.g].isLucky;
            if (myId == originUserId && body.lucky && reward > 0) {
                var originuser = body.n,
                    createdate = body.t,
                    _width = 432,
                    _height = 273,
                    _className = " lucky-gift-tips-dialog-multiple",
                    msg = rewardDetails[0].d,
                    html = '<div class="dds-notice lucky-gift-tips-dialog' + _className + '"><p>' + msg + '</p><a class="lucky-notice-btn" href="javascript:void(0)">确 定</a></div>';
                Dialog.dialog({
                    title: "",
                    skin: "dds-notice",
                    width: _width,
                    height: _height,
                    content: html,
                    onOpen: function(box) {
                        box.boxer.addClass(_className + "-wrap");
                        var btn = box.boxer.find(".lucky-notice-btn"),
                            _offset = btn.offset(),
                            _timer = setTimeout(function() {
                                btn.trigger("click")
                            }, 5e3);
                        btn.on("click", function() {
                            var div = $('<div class="lottery-star"></div>').css({
                                    left: _offset.left + 48,
                                    top: _offset.top
                                }).appendTo("body"),
                                userMoneySum = _this.my.coins.offset();
                            div.animate({
                                top: userMoneySum.top,
                                left: userMoneySum.left
                            }, 1e3, function() {
                                _this.my.addBalance(reward), div.remove()
                            }), box.destroy(), clearTimeout(_timer)
                        })
                    }
                }).init()
            }
        },
        addEarn: function(body, isMsg) {
            var myId = this.data.userInfo.userId,
                targetUserId = body.ti,
                earn = body.e;
            myId == targetUserId && earn > 0 && (this.my.addBalance(earn), this.msg && isMsg && this.msg.getGiftMsg(body))
        },
        openLevelUpDialog: function(data) {
            var html = "",
                _width = 520,
                _height = 448,
                level = data.l,
                levelName = data.n,
                rightData = data.tq,
                nextRightCount = data.q;
            html += '<div class="M-level-up-dialog">', html += '<p class="level-name"><span class="level-icon level-icon-' + level + '"></span>' + levelName + "</p>", html += '<p class="level-msg">哇！恭喜您荣升<span class="h">' + levelName + "</span></p>", html += function(rightData) {
                if (!rightData || rightData.length == 0) return "";
                var res = '<div class="right"><p class="right-inner">获得特权：';
                return $.each(rightData, function() {
                    res += '<span class="icon-area" title="' + this.n + '"><i class="ICON-right ICON-right-32-' + this.i + '"></i></span>'
                }), res += "</div>", res
            }(rightData), html += function(nextRightCount) {
                return parseInt(nextRightCount) > 0 ? '<p class="right-msg">再努力一把，下一级就可以开启' + nextRightCount + "个新特权</p>" : ""
            }(nextRightCount), html += '<span class="btn"></span>', html += "</div>", Dialog.dialog({
                title: "",
                skin: "M-level-up-dialog",
                width: _width,
                height: _height,
                content: html,
                onOpen: function(box) {
                    var btn = box.boxer.find(".btn");
                    btn.on("click", function() {
                        box.destroy()
                    })
                }
            }).init()
        },
        _redPacketDialog: function(body) {
            var coin = body.coin,
                option = {
                    big: {
                        skin: "M-spring-dialog-big",
                        w: 258,
                        h: 258
                    },
                    middle: {
                        skin: "M-spring-dialog-middle",
                        w: 209,
                        h: 209
                    },
                    small: {
                        skin: "M-spring-dialog-small",
                        w: 146,
                        h: 146
                    }
                },
                tag = "",
                html = "";
            if (coin <= 0) return !1;
            coin >= 3e4 ? tag = "big" : coin >= 3e3 ? tag = "middle" : tag = "small", html = ['<div class="M-spring-dialog-container ' + option[tag].skin + '">',
                function(tag) {
                    var html = "",
                        text = ["老子终于也是有钱人了！", "没中没关系,送你一个小农女~", "拿去买房！", "雾霾太大，毛爷爷在哪里？", "又有钱能买大肥肠吃了！欧耶！"][Math.round(Math.random() * 4)];
                    if (tag == "big" || tag == "middle") html = '<p class="text">' + text + "</p>";
                    return html
                }(tag), '<p class="coin-count">' + coin + "<small>星币</small></p>", "</div>"
            ].join(""), Dialog.dialog({
                title: "",
                skin: "M-spring-dialog",
                width: option[tag].w,
                height: option[tag].h,
                content: html,
                fx: 2,
                onOpen: function(box) {
                    setTimeout(function() {
                        box.destroy()
                    }, 3e3)
                }
            }).init(), this.my && this.my.addBalance(coin)
        }
    }, module.exports = listener
})