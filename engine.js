// Party Math engine: the cups and packs a guest list takes, the tables, the trays of food, and the cost. Exact integers, half-up on display only. No named constants; every number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _G = "the guest count must be from 1 to 100000 with no decimal places";
var _CG = "the cups a guest must be from 1 to 100 with no decimal places";
var _PK = "the cups a pack must be from 1 to 10000 with no decimal places";
var _ST = "the seats a table must be from 1 to 100 with no decimal places";
var _SV = "the servings a guest must be from 1 to 100 with no decimal places";
var _TR = "the servings a tray must be from 1 to 1000 with no decimal places";
var _NP = "the pack count must be from 1 to 100000 with no decimal places";
var _NT = "the tray count must be from 1 to 100000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function cupsTruth(guests, per, pack) {
  var g = _i(guests, _G, 6, 1, 100000), c = _i(per, _CG, 3, 1, 100), p = _i(pack, _PK, 5, 1, 10000);
  var t = g * c, k = Math.floor((t + p - 1) / p), left = k * p - t;
  return "The " + _pl(g, " guest", " guests") + " at " + _pl(c, " cup", " cups") + " each need " + _pl(t, " cup", " cups") + ", in packs of " + p + " that is " + _pl(k, " pack", " packs") + ", leaving " + _pl(left, " cup", " cups") + ".";
}
function tablesTruth(guests, seats) {
  var g = _i(guests, _G, 6, 1, 100000), s = _i(seats, _ST, 3, 1, 100);
  var k = Math.floor((g + s - 1) / s), left = k * s - g;
  return "The " + _pl(g, " guest", " guests") + " at " + s + " a table take " + _pl(k, " table", " tables") + ", leaving " + _pl(left, " empty seat", " empty seats") + ".";
}
function traysTruth(guests, serv, tray) {
  var g = _i(guests, _G, 6, 1, 100000), v = _i(serv, _SV, 3, 1, 100), r = _i(tray, _TR, 4, 1, 1000);
  var t = g * v, k = Math.floor((t + r - 1) / r), left = k * r - t;
  return "The " + _pl(g, " guest", " guests") + " at " + _pl(v, " serving", " servings") + " each need " + _pl(t, " serving", " servings") + ", in trays of " + r + " that is " + _pl(k, " tray", " trays") + ", leaving " + _pl(left, " serving", " servings") + ".";
}
function costTruth(packs, pprice, trays, tprice) {
  var k = _i(packs, _NP, 6, 1, 100000), p = _p(pprice, _PRICE, 5, 2, 1, 1000000), n = _i(trays, _NT, 6, 1, 100000), q = _p(tprice, _PRICE, 5, 2, 1, 1000000);
  return "The " + _pl(k, " pack", " packs") + " at $" + _dec(p, 2) + " and " + _pl(n, " tray", " trays") + " at $" + _dec(q, 2) + " cost $" + _money(k * p + n * q) + ", packs $" + _money(k * p) + " and trays $" + _money(n * q) + ".";
}
