var b = Object.defineProperty;
var E = (n, t, s) => t in n ? b(n, t, {enumerable: true, configurable: true, writable: true, value: s}) : n[t] = s;
var i = (n, t, s) => (E(n, typeof t != "symbol" ? t + "" : t, s), s);
function d(n, t) {
  return Math.random() * (t - n) + n;
}
function r(n, t) {
  return Math.floor(d(n, t + 1));
}
function f(n, t, s, e) {
  const o = Math.pow;
  return Math.sqrt(o(n - s, 2) + o(t - e, 2));
}
function g(n, t, s = 1) {
  if (n > 360 || n < 0)
    throw new Error(`Expected hue 0-360 range, got \`${n}\``);
  if (t > 100 || t < 0)
    throw new Error(`Expected lightness 0-100 range, got \`${t}\``);
  if (s > 1 || s < 0)
    throw new Error(`Expected alpha 0-1 range, got \`${s}\``);
  return `hsla(${n}, 100%, ${t}%, ${s})`;
}
const v = (n) => {
  if (typeof n == "object" && n !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      const t = Object.getPrototypeOf(n);
      return t === Object.prototype || t === null;
    }
    return Object.prototype.toString.call(n) === "[object Object]";
  }
  return false;
}, M = [
  "__proto__",
  "constructor",
  "prototype"
], w = (...n) => n.reduce((t, s) => (Object.keys(s).forEach((e) => {
  M.includes(e) || (Array.isArray(t[e]) && Array.isArray(s[e]) ? t[e] = s[e] : v(t[e]) && v(s[e]) ? t[e] = w(t[e], s[e]) : t[e] = s[e]);
}), t), {});
class L {
  constructor({
    x: t,
    y: s,
    ctx: e,
    hue: o,
    decay: c,
    gravity: u,
    friction: l,
    brightness: a,
    flickering: p,
    lineWidth: x,
    explosionLength: m
  }) {
    i(this, "x");
    i(this, "y");
    i(this, "ctx");
    i(this, "hue");
    i(this, "friction");
    i(this, "gravity");
    i(this, "flickering");
    i(this, "lineWidth");
    i(this, "explosionLength");
    i(this, "angle");
    i(this, "speed");
    i(this, "brightness");
    i(this, "coordinates", []);
    i(this, "decay");
    i(this, "alpha", 1);
    for (this.x = t, this.y = s, this.ctx = e, this.hue = o, this.gravity = u, this.friction = l, this.flickering = p, this.lineWidth = x, this.explosionLength = m, this.angle = d(0, Math.PI * 2), this.speed = r(1, 10), this.brightness = r(a.min, a.max), this.decay = d(c.min, c.max); this.explosionLength--; )
      this.coordinates.push([t, s]);
  }
  update(t) {
    this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.friction, this.x += Math.cos(this.angle) * this.speed, this.y += Math.sin(this.angle) * this.speed + this.gravity, this.alpha -= this.decay, this.alpha <= this.decay && t();
  }
  draw() {
    const t = this.coordinates.length - 1;
    this.ctx.beginPath(), this.ctx.lineWidth = this.lineWidth, this.ctx.fillStyle = g(this.hue, this.brightness, this.alpha), this.ctx.moveTo(this.coordinates[t][0], this.coordinates[t][1]), this.ctx.lineTo(this.x, this.y), this.ctx.strokeStyle = g(this.hue, this.flickering ? d(0, this.brightness) : this.brightness, this.alpha), this.ctx.stroke();
  }
}
class z {
  constructor() {
    i(this, "hue");
    i(this, "rocketsPoint");
    i(this, "opacity");
    i(this, "acceleration");
    i(this, "friction");
    i(this, "gravity");
    i(this, "particles");
    i(this, "trace");
    i(this, "explosion");
    i(this, "mouse");
    i(this, "boundaries");
    i(this, "sound");
    i(this, "delay");
    i(this, "brightness");
    i(this, "decay");
    i(this, "flickering");
    i(this, "intensity");
    i(this, "traceSpeed");
    i(this, "lineWidth");
    i(this, "lineStyle");
    i(this, "autoresize");
    this.autoresize = true, this.lineStyle = "round", this.flickering = 50, this.trace = 3, this.traceSpeed = 10, this.intensity = 30, this.explosion = 5, this.gravity = 1.5, this.opacity = 0.5, this.particles = 50, this.friction = 0.95, this.acceleration = 1.05, this.hue = {
      min: 0,
      max: 360
    }, this.rocketsPoint = {
      min: 50,
      max: 50
    }, this.lineWidth = {
      explosion: {
        min: 1,
        max: 3
      },
      trace: {
        min: 1,
        max: 2
      }
    }, this.mouse = {
      click: false,
      move: false,
      max: 1
    }, this.delay = {
      min: 15,
      max: 30
    }, this.brightness = {
      min: 50,
      max: 80
    }, this.decay = {
      min: 0.015,
      max: 0.03
    }, this.sound = {
      enabled: false,
      files: [
        "explosion0.mp3",
        "explosion1.mp3",
        "explosion2.mp3"
      ],
      volume: {
        min: 4,
        max: 8
      }
    }, this.boundaries = {
      height: 0,
      width: 0,
      x: 50,
      y: 50
    };
  }
  updateOptions(t) {
    Object.assign(this, w(this, t));
  }
}
const h = new z();
class O {
  constructor(t) {
    i(this, "active", false);
    i(this, "x");
    i(this, "y");
    this.canvas = t, this.mouseDown = this.mouseDown.bind(this), this.mouseUp = this.mouseUp.bind(this), this.mouseMove = this.mouseMove.bind(this);
  }
  subscribe() {
    this.canvas.addEventListener("mousedown", this.mouseDown), this.canvas.addEventListener("mouseup", this.mouseUp), this.canvas.addEventListener("mousemove", this.mouseMove);
  }
  unsubscribe() {
    this.canvas.removeEventListener("mousedown", this.mouseDown), this.canvas.removeEventListener("mouseup", this.mouseUp), this.canvas.removeEventListener("mousemove", this.mouseMove);
  }
  useMouse(t, s) {
    (h.mouse.click || h.mouse.move) && (this.x = t.pageX - this.canvas.offsetLeft, this.y = t.pageY - this.canvas.offsetTop, this.active = s);
  }
  mouseDown(t) {
    this.useMouse(t, h.mouse.click);
  }
  mouseUp(t) {
    this.useMouse(t, false);
  }
  mouseMove(t) {
    this.useMouse(t, this.active);
  }
}
class S {
  constructor(t) {
    this.fireworks = t, this.handleResize = this.handleResize.bind(this);
  }
  subscribe() {
    h.autoresize && window.addEventListener("resize", this.handleResize);
  }
  unsubscribe() {
    h.autoresize && window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.fireworks.updateSize();
  }
}
class C {
  constructor() {
    i(this, "sounds", []);
    i(this, "audioContext");
    i(this, "onInit", false);
    this.init();
  }
  init() {
    !this.onInit && h.sound.enabled && (this.onInit = true, this.audioContext = new (window.AudioContext || window.webkitAudioContext)(), this.loadSounds());
  }
  async loadSounds() {
    for (const t of h.sound.files) {
      const s = await (await fetch(t)).arrayBuffer();
      this.audioContext.decodeAudioData(s).then((e) => {
        this.sounds.push(e);
      }).catch((e) => {
        throw e;
      });
    }
  }
  play() {
    if (h.sound.enabled && this.sounds.length) {
      const t = this.audioContext.createBufferSource(), s = this.sounds[r(0, this.sounds.length - 1)], e = this.audioContext.createGain();
      t.buffer = s, e.gain.value = d(h.sound.volume.min / 100, h.sound.volume.max / 100), e.connect(this.audioContext.destination), t.connect(e), t.start(0);
    } else
      this.init();
  }
}
class k {
  constructor({
    x: t,
    y: s,
    dx: e,
    dy: o,
    ctx: c,
    hue: u,
    speed: l,
    traceLength: a,
    acceleration: p
  }) {
    i(this, "x");
    i(this, "y");
    i(this, "sx");
    i(this, "sy");
    i(this, "dx");
    i(this, "dy");
    i(this, "ctx");
    i(this, "hue");
    i(this, "speed");
    i(this, "acceleration");
    i(this, "traceLength");
    i(this, "totalDistance");
    i(this, "angle");
    i(this, "brightness");
    i(this, "coordinates", []);
    i(this, "currentDistance", 0);
    for (this.x = t, this.y = s, this.sx = t, this.sy = s, this.dx = e, this.dy = o, this.ctx = c, this.hue = u, this.speed = l, this.traceLength = a, this.acceleration = p, this.totalDistance = f(t, s, e, o), this.angle = Math.atan2(o - s, e - t), this.brightness = r(50, 70); this.traceLength--; )
      this.coordinates.push([t, s]);
  }
  update(t) {
    this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.acceleration;
    const s = Math.cos(this.angle) * this.speed, e = Math.sin(this.angle) * this.speed;
    this.currentDistance = f(this.sx, this.sy, this.x + s, this.y + e), this.currentDistance >= this.totalDistance ? t(this.dx, this.dy, this.hue) : (this.x += s, this.y += e);
  }
  draw() {
    const t = this.coordinates.length - 1;
    this.ctx.beginPath(), this.ctx.moveTo(this.coordinates[t][0], this.coordinates[t][1]), this.ctx.lineTo(this.x, this.y), this.ctx.strokeStyle = g(this.hue, this.brightness), this.ctx.stroke();
  }
}
class T {
  constructor(t, s = {}) {
    i(this, "container");
    i(this, "canvas");
    i(this, "ctx");
    i(this, "width");
    i(this, "height");
    i(this, "tick", 0);
    i(this, "timestamp", performance.now());
    i(this, "running", false);
    i(this, "sound");
    i(this, "resize");
    i(this, "mouse");
    i(this, "traces", []);
    i(this, "explosions", []);
    this.container = t, t instanceof HTMLCanvasElement ? this.canvas = t : (this.canvas = document.createElement("canvas"), this.container.appendChild(this.canvas)), this.ctx = this.canvas.getContext("2d"), this.updateOptions(s), this.updateSize(), this.sound = new C(), this.resize = new S(this), this.mouse = new O(this.canvas);
  }
  get isRunning() {
    return this.running;
  }
  get "2.0.2"() {
    return "2.0.2";
  }
  start() {
    this.running || (this.running = true, this.resize.subscribe(), this.mouse.subscribe(), this.clear(), this.render());
  }
  stop() {
    !this.running || (this.running = false, this.resize.unsubscribe(), this.mouse.unsubscribe(), this.clear());
  }
  pause() {
    this.running = !this.running, this.running && this.render();
  }
  clear() {
    !this.ctx || (this.traces = [], this.explosions = [], this.ctx.clearRect(0, 0, this.width, this.height));
  }
  updateOptions(t) {
    h.updateOptions(t);
  }
  updateSize({
    width: t = this.container instanceof HTMLCanvasElement ? this.canvas.width : this.container.clientWidth,
    height: s = this.container instanceof HTMLCanvasElement ? this.canvas.height : this.container.clientHeight
  } = {}) {
    this.width = t, this.height = s, this.canvas.width = t, this.canvas.height = s, this.updateBoundaries({
      ...h.boundaries,
      width: t,
      height: s
    });
  }
  updateBoundaries(t) {
    this.updateOptions({boundaries: t});
  }
  render(t = this.timestamp) {
    if (!this.ctx || !this.running)
      return;
    requestAnimationFrame((e) => this.render(e)), this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillStyle = `rgba(0, 0, 0, ${h.opacity})`, this.ctx.fillRect(0, 0, this.width, this.height), this.ctx.globalCompositeOperation = "lighter", this.ctx.lineCap = h.lineStyle, this.ctx.lineJoin = "round", this.initTrace(), this.drawTrace(), this.drawExplosion();
    const s = t - this.timestamp;
    this.timestamp = t, this.tick += s * (h.intensity * Math.PI) / 1e3;
  }
  initTrace() {
    const {
      hue: t,
      delay: s,
      rocketsPoint: e,
      boundaries: o,
      trace: c,
      traceSpeed: u,
      acceleration: l,
      mouse: a
    } = h;
    (this.tick > r(s.min, s.max) || this.mouse.active && a.max > this.traces.length) && (this.traces.push(new k({
      x: this.width * r(e.min, e.max) / 100,
      y: this.height,
      dx: this.mouse.x && a.move || this.mouse.active ? this.mouse.x : r(o.x, o.width - o.x * 2),
      dy: this.mouse.y && a.move || this.mouse.active ? this.mouse.y : r(o.y, o.height * 0.5),
      ctx: this.ctx,
      hue: r(t.min, t.max),
      speed: u,
      acceleration: l,
      traceLength: c
    })), this.tick = 0);
  }
  drawTrace() {
    this.ctx.lineWidth = d(h.lineWidth.trace.min, h.lineWidth.trace.max);
    let t = this.traces.length;
    for (; t--; )
      this.traces[t].draw(), this.traces[t].update((s, e, o) => {
        this.initExplosion(s, e, o), this.sound.play(), this.traces.splice(t, 1);
      });
  }
  initExplosion(t, s, e) {
    const {
      particles: o,
      flickering: c,
      lineWidth: u,
      explosion: l,
      brightness: a,
      friction: p,
      gravity: x,
      decay: m
    } = h;
    let y = o;
    for (; y--; )
      this.explosions.push(new L({
        x: t,
        y: s,
        ctx: this.ctx,
        hue: e,
        friction: p,
        gravity: x,
        flickering: r(0, 100) <= c,
        lineWidth: d(u.explosion.min, u.explosion.max),
        explosionLength: Math.round(l),
        brightness: a,
        decay: m
      }));
  }
  drawExplosion() {
    let t = this.explosions.length;
    for (; t--; )
      this.explosions[t].draw(), this.explosions[t].update(() => {
        this.explosions.splice(t, 1);
      });
  }
}
export default T;
export {T as Fireworks};
