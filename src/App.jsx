/**
 * Amrita Agro Industries — Main Page
 * Uses lucide-react for all icons (no emojis in UI chrome)
 * WhatsApp forms with inline required-field validation
 * Logo & favicon from  photos/logo-main.jpeg
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import {
  Leaf, MapPin, Phone, Mail, Clock, ChevronRight,
  CheckCircle2, Factory, FlaskConical, Package, Truck,
  Wheat, Droplets, Sprout, ShieldCheck, Star, Users,
  ArrowRight, Menu, X, Images, Send, MessageCircle,
  BadgeCheck, Handshake, Award, TrendingUp, Zap,
} from "lucide-react";

/* ─── CONSTANTS ─────────────────────────────────────────────────── */
const LOGO_SRC = "photos/logo-main.jpeg";
const WHATSAPP_NO = "919991689999";
const GALLERY_PAGE = "gallery.html";   // subpage link

const SECTIONS = {
  about: "about", products: "products",
  why: "why", distributor: "distributor", contact: "contact",
};

/* ─── INJECT FAVICON ────────────────────────────────────────────── */
if (typeof document !== "undefined") {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) { link = document.createElement("link"); document.head.appendChild(link); }
  link.rel = "icon";
  link.type = "image/jpeg";
  link.href = LOGO_SRC;
  document.title = "Amrita Agro Industries";
}

/* ─── WHATSAPP ──────────────────────────────────────────────────── */
function openWhatsApp(fields) {
  const text = Object.entries(fields)
    .filter(([, v]) => String(v).trim())
    .map(([k, v]) => `*${k}:* ${v}`)
    .join("\n");
  window.open(`https://wa.me/${WHATSAPP_NO}?text=${encodeURIComponent(text)}`, "_blank");
}

/* ─── SCROLL HELPER ─────────────────────────────────────────────── */
const scrollTo = id => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ─── GLOBAL STYLES ─────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600;6..12,700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Nunito Sans',sans-serif;background:#F7F3EC;color:#2C2416;overflow-x:hidden}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#F7F3EC}
    ::-webkit-scrollbar-thumb{background:#6B8C5A;border-radius:2px}

    /* ── 3-D bag ── */
    .p3w{perspective:800px}
    .p3{transform-style:preserve-3d;transition:transform .6s ease}
    .p3:hover{transform:rotateY(14deg) rotateX(-5deg) scale(1.04)}
    .bag{width:160px;height:220px;position:relative;transform-style:preserve-3d}
    .bf{position:absolute;border-radius:12px}
    .bf-front{width:160px;height:220px;
      background:linear-gradient(160deg,#4a7c3f 0%,#2d5a27 60%,#1e3d1a 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
      box-shadow:inset -8px 0 20px rgba(0,0,0,.2),inset 8px 0 12px rgba(255,255,255,.08);
      border:1px solid rgba(255,255,255,.1)}
    .bf-side{width:30px;height:220px;background:linear-gradient(90deg,#1e3d1a,#2d5a27);
      transform:rotateY(90deg) translateZ(80px);left:130px;top:0}
    .bf-top{width:160px;height:30px;background:linear-gradient(180deg,#3d6b33,#2d5a27);
      transform:rotateX(90deg) translateZ(-15px);top:-15px;border-radius:8px 8px 0 0}
    .bf-front.ch{background:linear-gradient(160deg,#1a6644 0%,#0f3d28 60%,#0a2a1c 100%)!important}
    .bf-side.ch{background:linear-gradient(90deg,#0f3320,#1a6644)!important}
    .bf-top.ch{background:linear-gradient(180deg,#1a6644,#0f3320)!important}
    .bag-lbl{background:rgba(255,255,255,.95);border-radius:6px;padding:6px 10px;text-align:center;width:120px}
    .bag-lbl .t{font-family:'Tiro Devanagari Hindi',serif;font-size:11px;font-weight:700;color:#2d5a27;letter-spacing:1px;text-transform:uppercase}
    .bag-lbl .s{font-size:8px;color:#6B8C5A;margin-top:2px;font-weight:500}
    .bag-ring{width:40px;height:40px;border-radius:50%;border:2px solid rgba(255,255,255,.4);
      display:flex;align-items:center;justify-content:center}

    /* bottle styles replaced by Three.js OBJ viewer */

    /* ── hero bag ── */
    .hbag{width:220px;height:300px;position:relative;transform-style:preserve-3d;margin:0 auto}
    .hbag-front{width:220px;height:300px;position:absolute;border-radius:14px;
      background:linear-gradient(160deg,#4a7c3f 0%,#2d5a27 60%,#1e3d1a 100%);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
      box-shadow:inset -10px 0 24px rgba(0,0,0,.2),inset 10px 0 14px rgba(255,255,255,.08),4px 12px 32px rgba(44,90,36,.4);
      border:1px solid rgba(255,255,255,.1)}
    .hbag-side{width:40px;height:300px;position:absolute;top:0;left:216px;
      background:linear-gradient(90deg,#1e3d1a,#2d5a27);
      transform:rotateY(90deg) translateZ(110px);border-radius:0 12px 12px 0}
    .hbag-top{width:220px;height:36px;position:absolute;left:0;top:-18px;
      background:linear-gradient(180deg,#4a7c3f,#2d5a27);
      transform:rotateX(90deg) translateZ(-18px);border-radius:14px 14px 0 0}

    /* ── ticker ── */
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .tk{animation:ticker 24s linear infinite;white-space:nowrap;display:flex}
    .tk:hover{animation-play-state:paused}

    /* ── nav underline ── */
    .nav-a{position:relative}
    .nav-a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:#6B8C5A;transition:width .3s}
    .nav-a:hover::after{width:100%}

    /* ── form inputs ── */
    .fi{width:100%;padding:12px 16px;border-radius:10px;
      border:1.5px solid rgba(44,36,22,0.15);font-size:14px;
      background:#FAFAF8;font-family:'Nunito Sans',sans-serif;
      transition:border-color .2s,box-shadow .2s;outline:none}
    .fi:focus{border-color:#6B8C5A;box-shadow:0 0 0 3px rgba(107,140,90,.15)}
    .fi.err{border-color:#e74c3c!important;box-shadow:0 0 0 3px rgba(231,76,60,.1)!important}
    .err-msg{font-size:11px;color:#e74c3c;margin-top:4px;display:flex;align-items:center;gap:4px}

    /* ── why card hover ── */
    .wcard{transition:all .3s ease}
    .wcard:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(44,36,22,.12)}

    /* ── whatsapp button ── */
    .wa-btn{background:#25D366;color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:8px;
      width:100%;padding:13px;border-radius:100px;border:none;font-size:14px;font-weight:600;
      cursor:pointer;font-family:'Nunito Sans',sans-serif;transition:background .2s}
    .wa-btn:hover{background:#1da851}

    /* ── pulse dot ── */
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

    /* ══════════════════════════════════════════════════════════════════
       RESPONSIVE  —  TABLET  ≤ 900px
    ══════════════════════════════════════════════════════════════════ */
    @media(max-width:900px){

      /* hide desktop nav, show hamburger */
      .hm        { display:none!important }
      .mob-menu  { display:flex!important }

      /* hide "Become Distributor" button on tablet to save space */
      .dist-cta-btn { display:none!important }

      /* All 2-col grids → single column */
      .hg, .g2, .g2r, .gc {
        grid-template-columns:1fr!important;
        gap:40px!important;
      }

      /* hero: 3D bag goes first (top), text below */
      .hg > *:last-child { order:-1 }
      .hg { text-align:center }

      /* Products: 2 columns on tablet */
      .sg { grid-template-columns:repeat(2,1fr)!important; gap:18px!important }

      /* Footer: 2-col */
      .gd { grid-template-columns:1fr 1fr!important; gap:32px!important }

      /* Gallery grid: full-width feature + 2-col row */
      .gal-grid {
        grid-template-columns:1fr 1fr!important;
        grid-template-rows:auto auto!important;
        height:auto!important;
      }
      .gal-grid > *:first-child {
        grid-column:1 / -1!important;
        grid-row:auto!important;
        min-height:200px;
      }

      /* hero bag scale */
      .hbag       { width:180px!important; height:246px!important }
      .hbag-front { width:180px!important; height:246px!important }
      .hbag-side  { height:246px!important; left:176px!important;
                    transform:rotateY(90deg) translateZ(90px)!important }
      .hbag-top   { width:180px!important; transform:rotateX(90deg) translateZ(-15px)!important }

      /* hero buttons row — stack vertically, centered */
      .hero-btns { flex-direction:column!important; align-items:center!important }
      .hero-btns > button { width:100%!important; max-width:320px!important; justify-content:center!important }

      /* hero stats centered */
      .hero-stats { justify-content:center!important; gap:28px!important }

      /* section padding */
      section { padding-top:72px!important; padding-bottom:72px!important }

      /* shelf wrapper */
      .shelf-wrap { padding:28px 20px 24px!important }

      /* why-us feature card height auto */
      .why-feature { height:auto!important }

      /* form card padding */
      .form-card { padding:28px 24px!important }

      /* about pillars */
      .about-pillars { gap:20px!important; justify-content:center!important }
    }

    /* ══════════════════════════════════════════════════════════════════
       RESPONSIVE  —  MOBILE  ≤ 480px
    ══════════════════════════════════════════════════════════════════ */
    @media(max-width:480px){

      /* header height */
      header { height:60px!important }
      .tb-wrap { top:60px!important; }

      /* hero: tighter top padding to compensate shorter header */
      .hero-section { padding-top:84px!important; padding-bottom:48px!important }

      /* hero bag smaller for phone */
      .hbag       { width:150px!important; height:205px!important }
      .hbag-front { width:150px!important; height:205px!important }
      .hbag-side  { height:205px!important; left:146px!important;
                    transform:rotateY(90deg) translateZ(75px)!important }
      .hbag-top   { width:150px!important; transform:rotateX(90deg) translateZ(-12px)!important }

      /* bag product models smaller */
      .bag        { width:120px!important; height:165px!important }
      .bf-front   { width:120px!important; height:165px!important }
      .bf-side    { width:22px!important;  height:165px!important;
                    left:98px!important;   transform:rotateY(90deg) translateZ(60px)!important }
      .bf-top     { width:120px!important }
      .bag-lbl    { width:96px!important }

      /* product shelf → single col on phone */
      .sg { grid-template-columns:1fr!important; gap:18px!important }

      /* footer → single col */
      .gd { grid-template-columns:1fr!important; gap:22px!important }

      /* footer brand: center */
      .footer-brand { flex-direction:column!important; align-items:center!important; text-align:center!important }

      /* section padding tighter */
      section { padding-top:52px!important; padding-bottom:52px!important;
                padding-left:5%!important; padding-right:5%!important }

      /* distributor section */
      .dist-section { padding:52px 5%!important }

      /* shelf wrapper */
      .shelf-wrap { padding:20px 12px 18px!important }

      /* gallery full-width stack on phone */
      .gal-grid { grid-template-columns:1fr!important; height:auto!important }
      .gal-grid > * { min-height:130px!important }
      .gal-view-all { display:none!important }
      .gal-dots { gap:5px!important }

      /* hero stats wrap */
      .hero-stats { flex-wrap:wrap!important; gap:14px!important }
      .hero-stats > div { min-width:80px; text-align:center }

      /* about pillars: 2×2 grid */
      .about-pillars { display:grid!important; grid-template-columns:1fr 1fr!important; gap:14px!important }

      /* form card */
      .form-card { padding:22px 16px!important }

      /* ticker tighter */
      .tk-item { font-size:9px!important; padding:0 12px!important }

      /* why-us inner dark card */
      .why-feature { padding:28px 22px!important }

      /* 3-D viewer height smaller on phone */
      .obj-viewer { height:200px!important }
    }

    /* ── Minimum tap target for all interactive elements ── */
    @media(max-width:900px){
      button, a { min-height:44px }
    }

    /* ── Factory / agro animations ── */
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes spin-rev  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
    @keyframes float-up  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes grain-drift { 0%{transform:translateX(0) translateY(0)} 100%{transform:translateX(-60px) translateY(-30px)} }
    @keyframes leaf-sway  { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(6deg)} }
    @keyframes count-up   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    .spin-slow { animation: spin-slow 12s linear infinite }
    .spin-rev  { animation: spin-rev  8s linear infinite }
    .float-up  { animation: float-up 3s ease-in-out infinite }
    .leaf-sway { animation: leaf-sway 3s ease-in-out infinite; transform-origin: bottom center }
    .wcard:hover .spin-slow { animation-play-state: running }

    /* ── smooth all transitions globally ── */
    * { transition-timing-function: cubic-bezier(.22,1,.36,1) }
    a, button { transition: all .25s cubic-bezier(.22,1,.36,1) }

    /* ── video slider responsive ── */
    .vslider { height: 260px }
    @media(max-width:768px){ .vslider { height: 200px } }
    @media(max-width:480px){ .vslider { height: 150px } }
  `}</style>
);

/* ─── FADE WRAPPER ──────────────────────────────────────────────── */
const Fade = ({ children, delay = 0, style = {}, className = "" }) => {
  const ref = useRef(null);
  const ok = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 36 }}
      animate={ok ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
};

/* ─── LOGO ───────────────────────────────────────────────────────
   Fully circular frame — works at any size.
   Green ring + soft shadow halo. Graceful fallback if image missing.
─────────────────────────────────────────────────────────────────── */
const Logo = ({ size = 38 }) => {
  const [err, setErr] = useState(false);
  const ring = `0 0 0 ${Math.max(2, Math.round(size * 0.055))}px rgba(107,140,90,0.45),
                0 0 0 ${Math.max(4, Math.round(size * 0.10))}px rgba(107,140,90,0.12),
                0 ${Math.round(size * 0.06)}px ${Math.round(size * 0.28)}px rgba(44,36,22,0.18)`;

  const base = {
    width: size, height: size, borderRadius: "50%",
    flexShrink: 0, boxShadow: ring,
  };

  if (err) return (
    <div style={{
      ...base, background: "linear-gradient(135deg,#6B8C5A,#4a6b3a)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <Wheat size={size * 0.44} color="rgba(255,255,255,0.92)" strokeWidth={1.8} />
    </div>
  );

  return (
    <img src={LOGO_SRC} alt="Amrita Agro Industries"
      style={{ ...base, objectFit: "cover", objectPosition: "center", display: "block" }}
      onError={() => setErr(true)} />
  );
};

/* ─── 3-D MODELS ────────────────────────────────────────────────── */
const BagModel = ({ churi = false }) => (
  <div className="p3w"><div className="p3">
    <div className="bag" style={{ margin: "0 auto" }}>
      <div className={`bf bf-top  ${churi ? "ch" : ""}`} />
      <div className={`bf bf-side ${churi ? "ch" : ""}`} />
      <div className={`bf bf-front ${churi ? "ch" : ""}`}>
        <div className="bag-ring">
          {churi
            ? <Sprout size={20} color="rgba(255,255,255,0.8)" />
            : <Wheat size={20} color="rgba(255,255,255,0.8)" />}
        </div>
        <div className="bag-lbl">
          <div className="t">AMRITA AGRO</div>
          <div className="s">{churi ? "Churi / Mixture" : "Cattle Feed"}</div>
        </div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: "9px", letterSpacing: "2px" }}>NET WT. 50 KG</div>
      </div>
    </div>
  </div></div>
);

/* ─── MUSTARD OIL — Three.js OBJ + MTL + Texture Viewer ────────────
   npm `three` bundled by Vite.  Files served from public/photos/:
     3DModel.obj  · 3DModel.mtl  · 3DModel.jpg (texture atlas)
   Auto-centers, scales, warm lighting, auto-rotate + drag to spin.
─────────────────────────────────────────────────────────────────── */

const MustardOilModel = () => {
  const mountRef = useRef(null);
  const cleanRef = useRef(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let cancelled = false;
    let rafId;

    /* ── Renderer ── */
    const W = el.clientWidth || 240;
    const H = el.clientHeight || 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.outputEncoding = THREE.sRGBEncoding;
    el.appendChild(renderer.domElement);

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.001, 100);
    camera.position.set(0, 0, 2.6);

    /* ── Lighting ── */
    // Strong warm key — top right front
    const key = new THREE.DirectionalLight(0xfff5e0, 2.2);
    key.position.set(1.5, 2.5, 2);
    scene.add(key);
    // Soft cool fill — left
    const fill = new THREE.DirectionalLight(0xddeeff, 0.8);
    fill.position.set(-2, 0.5, 1);
    scene.add(fill);
    // Warm rim — back bottom
    const rim = new THREE.DirectionalLight(0xffcc66, 0.7);
    rim.position.set(0.5, -1.5, -2);
    scene.add(rim);
    // Ambient so dark sides aren't pitch black
    scene.add(new THREE.AmbientLight(0xfff8f0, 1.0));

    /* ── Interaction state ── */
    let autoAngle = 0;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let rotX = 0, rotY = 0;
    let velX = 0, velY = 0;
    let modelGroup = null;

    /* ── Load MTL → OBJ (texture-mapped) ── */
    const mtlLoader = new MTLLoader();
    // Tell MTLLoader the folder where 3DModel.jpg lives
    mtlLoader.setResourcePath("/photos/");
    mtlLoader.setPath("/photos/");

    mtlLoader.load(
      "3DModel.mtl",
      (materials) => {
        if (cancelled) return;
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("/photos/");

        objLoader.load(
          "3DModel.obj",
          (obj) => {
            if (cancelled) return;

            /* ensure textures render correctly */
            obj.traverse(child => {
              if (child.isMesh) {
                if (child.material) {
                  // upgrade to MeshStandardMaterial for better lighting
                  const old = child.material;
                  const tex = old.map || null;
                  child.material = new THREE.MeshStandardMaterial({
                    map: tex,
                    roughness: 0.55,
                    metalness: 0.05,
                    // keep texture sRGB correct
                    ...(tex ? { map: tex } : { color: new THREE.Color(0xd4a843) }),
                  });
                  if (tex) tex.encoding = THREE.sRGBEncoding;
                }
              }
            });

            /* ── Center + scale ── */
            const box = new THREE.Box3().setFromObject(obj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            obj.position.sub(center);

            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            obj.scale.setScalar(1.7 / maxDim);

            /* wrap in group for clean rotation */
            modelGroup = new THREE.Group();
            modelGroup.add(obj);
            // start with a slight tilt so the top of the bottle is visible
            modelGroup.rotation.x = 0.15;
            scene.add(modelGroup);
            setStatus("ready");
          },
          undefined,
          (err) => { console.warn("OBJ load error", err); setStatus("error"); }
        );
      },
      undefined,
      (err) => { console.warn("MTL load error", err); setStatus("error"); }
    );

    /* ── Drag handlers ── */
    const canvas = renderer.domElement;
    const onDown = (e) => {
      dragging = true;
      lastX = e.touches ? e.touches[0].clientX : e.clientX;
      lastY = e.touches ? e.touches[0].clientY : e.clientY;
      velX = velY = 0;
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!dragging) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      velX = (cx - lastX) * 0.014;
      velY = (cy - lastY) * 0.014;
      rotY += velX;
      rotX += velY;
      rotX = Math.max(-0.9, Math.min(0.9, rotX));
      lastX = cx; lastY = cy;
    };
    const onUp = () => { dragging = false; canvas.style.cursor = "grab"; };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    /* ── Animate loop ── */
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!dragging) {
        autoAngle += 0.005;
        velX *= 0.90; velY *= 0.90;
        rotY += velX; rotX += velY;
      }
      if (modelGroup) {
        modelGroup.rotation.y = autoAngle + rotY;
        modelGroup.rotation.x = 0.15 + rotX;
      }
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const w = el.clientWidth || 240;
      const h = el.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ── */
    cleanRef.current = () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(canvas)) el.removeChild(canvas);
    };

    return () => cleanRef.current?.();
  }, []);

  return (
    <div className="obj-viewer" style={{ position: "relative", width: "100%", height: "240px" }}>

      {/* Loading spinner */}
      {status === "loading" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "none"
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "3px solid rgba(139,101,8,0.15)",
              borderTopColor: "#b8860b"
            }}
          />
          <span style={{ fontSize: 11, color: "#8b6508", fontFamily: "'Nunito Sans',sans-serif" }}>
            Loading model…
          </span>
        </div>
      )}

      {/* Error fallback */}
      {status === "error" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 8,
          background: "rgba(245,233,192,0.5)", borderRadius: 12
        }}>
          <Droplets size={32} color="#b8860b" strokeWidth={1.2} />
          <span style={{
            fontSize: 12, color: "#8b6508", fontFamily: "'Tiro Devanagari Hindi',serif",
            fontWeight: 600, textAlign: "center"
          }}>Mustard Oil<br />Kachi Ghani</span>
        </div>
      )}

      {/* Three.js canvas mounts here */}
      <div ref={mountRef}
        style={{
          width: "100%", height: "100%", cursor: "grab",
          opacity: status === "ready" ? 1 : 0,
          transition: "opacity 0.6s ease"
        }} />

      {/* Bottom label — always visible */}
      <div style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        background: "rgba(247,243,236,0.93)", borderRadius: "100px",
        padding: "4px 14px", display: "flex", alignItems: "center", gap: 6,
        pointerEvents: "none", whiteSpace: "nowrap",
        boxShadow: "0 2px 12px rgba(44,36,22,0.12)",
      }}>
        <Droplets size={12} color="#8b6508" />
        <span style={{
          fontSize: 11, fontWeight: 600, color: "#8b6508",
          fontFamily: "'Tiro Devanagari Hindi',serif", letterSpacing: "0.5px"
        }}>
          Kachi Ghani Mustard Oil
        </span>
      </div>

      {/* Drag hint */}
      {status === "ready" && (
        <div style={{
          position: "absolute", top: 8, right: 8, fontSize: 9,
          color: "rgba(107,140,90,0.55)", letterSpacing: "0.5px",
          fontFamily: "'Nunito Sans',sans-serif", pointerEvents: "none",
        }}>
          drag to rotate
        </div>
      )}
    </div>
  );
};

/* alias so existing JSX  {p.model === "bottle" && <BottleModel />}  still works */
const BottleModel = MustardOilModel;

const HeroBag = () => (
  <div style={{ perspective: "1000px" }}>
    <motion.div
      animate={{ rotateY: [4, -4, 4], rotateX: [-2, 2, -2], y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d" }}>
      <div className="hbag">
        <div className="hbag-top" />
        <div className="hbag-side" />
        <div className="hbag-front">
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid rgba(255,255,255,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wheat size={28} color="rgba(255,255,255,0.85)" />
          </div>
          <div style={{ background: "rgba(255,255,255,.95)", borderRadius: "8px", padding: "12px 18px", width: 182, textAlign: "center" }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "15px", fontWeight: 700, color: "#2d5a27", letterSpacing: "1px", textTransform: "uppercase" }}>AMRITA AGRO</div>
            <div style={{ fontSize: "10px", color: "#6B8C5A", marginTop: "3px", fontWeight: 500 }}>Premium Cattle Feed</div>
            <div style={{ fontSize: "8px", color: "#999", marginTop: "5px" }}>High Protein · Pure Ingredients</div>
          </div>
          <div style={{ color: "rgba(255,255,255,.4)", fontSize: "10px", letterSpacing: "2.5px" }}>NET WT. 50 KG</div>
        </div>
      </div>
    </motion.div>
  </div>
);

/* ─── DATA ──────────────────────────────────────────────────────── */
const TICKER = [
  "Cattle Feed", "Pure Mustard Oil", "Churi / Mixture",
  "Quality Tested", "Rural Roots", "Bulk Supply",
  "Wholesale Pricing", "Consistent Supply",
];

const PRODUCTS = [
  {
    name: "Cattle Feed", num: "01", badge: "Bestseller", model: "bag",
    desc: "Nutrition-packed cattle feed to improve milk yield and livestock health.",
    points: ["Protein-rich formulation", "Improved milk production", "Balanced fiber & minerals", "All cattle breeds"]
  },
  {
    name: "Mustard Oil", num: "02", badge: "Cold Pressed", model: "bottle",
    desc: "Cold-pressed from Haryana mustard seeds — authentic aroma, zero additives.",
    points: ["Cold-pressed purity", "Rich natural aroma", "No additives", "Local farm sourced"]
  },
  {
    name: "Churi / Mixture", num: "03", badge: "Daily Feed", model: "churi",
    desc: "Balanced agro by-product blend for daily supplementary cattle nutrition.",
    points: ["Balanced composition", "Affordable daily use", "Better digestion", "Farmer preferred"]
  },
];

const WHY = [
  { Icon: Factory, title: "Direct from Production", desc: "No middlemen — straight from our Shekhupur Droli unit to your business." },
  { Icon: ShieldCheck, title: "Quality Tested", desc: "Every batch checked for purity, consistency and nutritional value." },
  { Icon: Leaf, title: "Pure Ingredients", desc: "Locally sourced Haryana raw materials — nothing artificial, ever." },
];

const GALLERY_SLIDES = [
  { type: "image", src: "photos/slideshow/slide1.jpeg", label: "Final Product", sub: "Shekhupur Droli, Fatehabad" },
  { type: "video", src: "photos/slideshow/video1.mp4", label: "Inside Our Factory", sub: "See us in action" },
  { type: "image", src: "photos/slideshow/slide2.jpeg", label: "Raw Materials", sub: "Pure quality inputs" },
  { type: "video", src: "photos/slideshow/video2.mp4", label: "Processing Line", sub: "Modern manufacturing" },
  { type: "icon", Icon: Droplets, bg: "#f0ddb0", label: "Cold Press Room", sub: "Authentic kachi ghani" },
];

/* ─── FORM VALIDATION HELPERS ───────────────────────────────────── */
const REQUIRED = "This field is required";

function useForm(initial) {
  const [vals, setVals] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (k, v) => {
    setVals(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };
  const validate = (rules) => {
    const errs = {};
    rules.forEach(([k, msg]) => { if (!String(vals[k] || "").trim()) errs[k] = msg || REQUIRED; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  return { vals, set, errors, validate };
}

const FieldError = ({ msg }) =>
  msg ? <div className="err-msg"><X size={11} />{msg}</div> : null;

/* ─── HEADER ────────────────────────────────────────────────────── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = [
    { label: "About", id: SECTIONS.about },
    { label: "Products", id: SECTIONS.products },
    { label: "Why Us", id: SECTIONS.why },
    { label: "Distributors", id: SECTIONS.distributor },
    { label: "Gallery", href: GALLERY_PAGE },
    { label: "Contact", id: SECTIONS.contact },
  ];

  return (
    <motion.header initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "72px",
        padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(247,243,236,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(107,140,90,0.15)" : "none",
        transition: "all .4s ease"
      }}>

      {/* Logo */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <Logo size={38} />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontWeight: 700, fontSize: 17, color: "#2C2416", lineHeight: 1 }}>Amrita Agro</div>
          <div style={{ fontSize: 9, color: "#6B8C5A", letterSpacing: "2px", textTransform: "uppercase" }}>Industries</div>
        </div>
      </button>

      {/* Desktop nav */}
      <nav className="hm" style={{ display: "flex", gap: 28 }}>
        {nav.map(({ label, id, href }) =>
          href ? (
            <a key={label} href={href} className="nav-a"
              style={{ fontSize: 13, color: "#2C2416", textDecoration: "none", fontFamily: "'Nunito Sans',sans-serif" }}>
              {label}
            </a>
          ) : (
            <button key={label} onClick={() => scrollTo(id)} className="nav-a"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#2C2416", fontFamily: "'Nunito Sans',sans-serif", padding: 0 }}>
              {label}
            </button>
          )
        )}
      </nav>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={() => scrollTo(SECTIONS.distributor)}
          className="dist-cta-btn"
          onMouseOver={e => e.currentTarget.style.background = "#4a6b3a"}
          onMouseOut={e => e.currentTarget.style.background = "#6B8C5A"}
          style={{
            background: "#6B8C5A", color: "#fff", padding: "10px 22px", borderRadius: "100px",
            fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer",
            fontFamily: "'Nunito Sans',sans-serif", transition: "background .2s"
          }}>
          Become Distributor
        </button>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}
          className="mob-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{
              position: "absolute", top: "60px", left: 0, right: 0,
              background: "#F7F3EC", borderBottom: "1px solid rgba(107,140,90,0.15)",
              padding: "8px 5% 20px", display: "flex", flexDirection: "column"
            }}>
            {nav.map(({ label, id, href }) =>
              href ? (
                <a key={label} href={href} onClick={() => setOpen(false)}
                  style={{
                    padding: "14px 0", fontSize: 16, color: "#2C2416", textDecoration: "none",
                    borderBottom: "1px solid rgba(44,36,22,.06)", display: "flex", alignItems: "center",
                    fontFamily: "'Nunito Sans',sans-serif", fontWeight: 400
                  }}>
                  {label}
                </a>
              ) : (
                <button key={label} onClick={() => { scrollTo(id); setOpen(false); }}
                  style={{
                    padding: "14px 0", fontSize: 16, color: "#2C2416", background: "none", border: "none",
                    borderBottom: "1px solid rgba(44,36,22,.06)", cursor: "pointer", textAlign: "left",
                    fontFamily: "'Nunito Sans',sans-serif", fontWeight: 400
                  }}>
                  {label}
                </button>
              )
            )}
            {/* CTA in drawer */}
            <button onClick={() => { scrollTo(SECTIONS.distributor); setOpen(false); }}
              style={{
                marginTop: 16, background: "#6B8C5A", color: "#fff", padding: "14px",
                borderRadius: "100px", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
                fontFamily: "'Nunito Sans',sans-serif", textAlign: "center"
              }}>
              Become a Distributor
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media(max-width:900px){.mob-menu{display:flex!important}}`}</style>
    </motion.header>
  );
};

/* ─── HERO ──────────────────────────────────────────────────────── */
const Hero = () => (
  <section className="hero-section" style={{
    minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5% 60px",
    background: "linear-gradient(135deg,#F7F3EC 0%,#EEE8DC 100%)", position: "relative", overflow: "hidden"
  }}>
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "radial-gradient(circle at 20% 80%,rgba(107,140,90,.08),transparent 50%),radial-gradient(circle at 80% 20%,rgba(180,130,30,.06),transparent 50%)",
      pointerEvents: "none"
    }} />
    {/* Decorative spinning gear — factory feel */}
    <div style={{ position: "absolute", bottom: -60, left: -60, opacity: 0.06, pointerEvents: "none" }}>
      <svg className="spin-slow" width="280" height="280" viewBox="0 0 100 100" fill="none">
        <path d="M50 10 L54 20 L64 18 L66 28 L76 30 L74 40 L84 46 L80 56 L88 64 L82 72 L86 82 L76 84 L72 94 L62 90 L54 96 L46 90 L38 94 L34 84 L24 82 L28 72 L22 64 L30 56 L26 46 L36 40 L34 30 L44 28 L46 18 L56 20 Z" fill="#2d5a27" />
        <circle cx="50" cy="50" r="15" fill="#F7F3EC" />
        <circle cx="50" cy="50" r="8" fill="#2d5a27" />
      </svg>
    </div>
    <div style={{ position: "absolute", top: 80, right: -40, opacity: 0.04, pointerEvents: "none" }}>
      <svg className="spin-rev" width="200" height="200" viewBox="0 0 100 100" fill="none">
        <path d="M50 10 L54 20 L64 18 L66 28 L76 30 L74 40 L84 46 L80 56 L88 64 L82 72 L86 82 L76 84 L72 94 L62 90 L54 96 L46 90 L38 94 L34 84 L24 82 L28 72 L22 64 L30 56 L26 46 L36 40 L34 30 L44 28 L46 18 L56 20 Z" fill="#c8a84b" />
        <circle cx="50" cy="50" r="15" fill="#F7F3EC" />
        <circle cx="50" cy="50" r="8" fill="#c8a84b" />
      </svg>
    </div>
    <div className="hg" style={{
      maxWidth: 1200, margin: "0 auto", width: "100%",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center"
    }}>

      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(107,140,90,.12)", border: "1px solid rgba(107,140,90,.25)",
            borderRadius: "100px", padding: "6px 14px", marginBottom: 24
          }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6B8C5A", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, color: "#6B8C5A", fontWeight: 500 }}>Shekhupur Droli, Fatehabad, Haryana</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
          style={{
            fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(40px,5vw,68px)",
            fontWeight: 600, lineHeight: 1.08, color: "#2C2416", marginBottom: 24
          }}>
          Pure by Nature.<br />
          <em style={{ fontStyle: "italic", color: "#6B8C5A" }}>Strong by</em><br />
          Tradition.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}
          style={{ fontSize: 16, lineHeight: 1.75, color: "#5a4e3a", maxWidth: 440, marginBottom: 40, fontWeight: 300 }}>
          From the golden mustard fields of Haryana to trusted retailers — we deliver quality you can taste and strength livestock can thrive on.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }}
          className="hero-btns"
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => scrollTo(SECTIONS.products)}
            style={{
              background: "#2C2416", color: "#F7F3EC", padding: "14px 32px", borderRadius: "100px",
              fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "'Nunito Sans',sans-serif",
              display: "flex", alignItems: "center", gap: 8
            }}>
            <Leaf size={16} /> View Products
          </button>
          <button onClick={() => scrollTo(SECTIONS.distributor)}
            style={{
              border: "1px solid rgba(44,36,22,.25)", color: "#2C2416", padding: "14px 28px",
              borderRadius: "100px", fontSize: 14, background: "transparent", cursor: "pointer",
              fontFamily: "'Nunito Sans',sans-serif", display: "flex", alignItems: "center", gap: 6
            }}>
            Become a Distributor <ArrowRight size={14} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .75 }}
          className="hero-stats"
          style={{ display: "flex", gap: 40, marginTop: 52 }}>
          {[["17+", "Products"], ["100%", "Pure Ingredients"], ["Bulk", "Supply Ready"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 30, fontWeight: 700, color: "#2C2416" }}>{n}</div>
              <div style={{ fontSize: 12, color: "#8a7a60", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: .4, ease: [.22, 1, .36, 1] }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <div style={{
          position: "absolute", width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(107,140,90,.14),transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)"
        }} />
        <div style={{
          position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
          width: 180, height: 28, background: "rgba(44,36,22,.1)", borderRadius: "50%", filter: "blur(14px)"
        }} />
        <HeroBag />
      </motion.div>
    </div>
  </section>
);

/* ─── TICKER ────────────────────────────────────────────────────── */
const Ticker = () => (
  <div style={{ background: "#2C2416", padding: "14px 0", overflow: "hidden" }}>
    <div className="tk">
      {[...TICKER, ...TICKER].map((item, i) => (
        <span key={i} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "0 28px", fontSize: 11, fontWeight: 500, color: "#c8b88a",
          letterSpacing: "1.5px", textTransform: "uppercase"
        }}>
          <Leaf size={10} strokeWidth={2.5} /> {item}
        </span>
      ))}
    </div>
  </div>
);

/* ─── GALLERY SLIDER ─────────────────────────────────────────────── */
const GalleryStrip = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragX = useRef(0);
  const total = GALLERY_SLIDES.length;
  const go = (i) => setActive((i + total) % total);

  /* auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(active + 1), 5000);
    return () => clearInterval(t);
  }, [active, paused]);

  /* touch / mouse swipe */
  const onPointerDown = (e) => { dragX.current = e.touches ? e.touches[0].clientX : e.clientX; setPaused(true); };
  const onPointerUp = (e) => {
    const end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const dx = end - dragX.current;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
    setPaused(false);
  };

  return (
    <section style={{ background: "#F0EBE1", padding: "80px 0 60px", overflow: "hidden" }}>
      <Fade>
        {/* ── Header ── */}
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 5%",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: 16, marginBottom: 32
        }}>
          <div>
            <p style={{ fontSize: 11, color: "#6B8C5A", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 8 }}>Our Facility</p>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 600, color: "#2C2416" }}>Inside Amrita Agro</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => go(active - 1)}
              style={{
                width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(107,140,90,.4)",
                background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
              <ChevronRight size={15} color="#6B8C5A" style={{ transform: "rotate(180deg)" }} />
            </button>
            {GALLERY_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  width: i === active ? 22 : 7, height: 7, borderRadius: 4, padding: 0,
                  background: i === active ? "#6B8C5A" : "rgba(107,140,90,.3)",
                  border: "none", cursor: "pointer", transition: "all .3s"
                }} />
            ))}
            <button onClick={() => go(active + 1)}
              style={{
                width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(107,140,90,.4)",
                background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
              <ChevronRight size={15} color="#6B8C5A" />
            </button>
            <a href={GALLERY_PAGE}
              style={{
                marginLeft: 4, display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 12, color: "#6B8C5A", textDecoration: "none", fontWeight: 500,
                border: "1px solid rgba(107,140,90,.3)", borderRadius: "100px", padding: "7px 14px"
              }}>
              <Images size={12} /> View All
            </a>
          </div>
        </div>

        {/* ── Slide track — full bleed ── */}
        <div style={{ overflow: "hidden", cursor: "grab", userSelect: "none" }}
          onMouseDown={onPointerDown} onMouseUp={onPointerUp}
          onTouchStart={onPointerDown} onTouchEnd={onPointerUp}>
          <motion.div
            animate={{ x: `${-active * 100}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 36 }}
            style={{ display: "flex" }}>
            {GALLERY_SLIDES.map((slide, i) => (
              <div key={slide.label} style={{ minWidth: "100%", padding: "0 5%" }}>
                <div style={{
                  borderRadius: 22, height: 420,
                  background: slide.type === "icon" ? slide.bg : "#111",
                  position: "relative", overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>

                  {/* ── IMAGE ── */}
                  {slide.type === "image" && (
                    <img src={slide.src} alt={slide.label}
                      style={{
                        position: "absolute", inset: 0, width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center", display: "block"
                      }} />
                  )}

                  {/* ── VIDEO ── */}
                  {slide.type === "video" && (
                    <video
                      src={slide.src}
                      autoPlay muted loop playsInline
                      style={{
                        position: "absolute", inset: 0, width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center", display: "block"
                      }}
                    />
                  )}

                  {/* ── ICON PLACEHOLDER ── */}
                  {slide.type === "icon" && (
                    <>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, zIndex: 1 }}>
                        <div style={{
                          width: 96, height: 96, borderRadius: "50%",
                          background: "rgba(255,255,255,.6)", backdropFilter: "blur(6px)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 6px 28px rgba(44,36,22,.1)"
                        }}>
                          <slide.Icon size={44} color="#6B8C5A" strokeWidth={1.2} />
                        </div>
                      </div>
                      <div style={{
                        position: "absolute", width: 300, height: 300, borderRadius: "50%",
                        border: "1px solid rgba(107,140,90,.1)", top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)", pointerEvents: "none"
                      }} />
                      <div style={{
                        position: "absolute", width: 460, height: 460, borderRadius: "50%",
                        border: "1px solid rgba(107,140,90,.06)", top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)", pointerEvents: "none"
                      }} />
                    </>
                  )}

                  {/* ── Caption overlay — always on top ── */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(20,14,6,.72) 0%, transparent 100%)",
                    padding: "40px 32px 24px", zIndex: 2,
                  }}>
                    <div style={{
                      fontFamily: "'Tiro Devanagari Hindi',serif",
                      fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 600,
                      color: slide.type === "icon" ? "#2C2416" : "#fff", marginBottom: 6
                    }}>
                      {slide.label}
                    </div>
                    <div style={{
                      fontSize: 12, color: slide.type === "icon" ? "#6B8C5A" : "rgba(255,255,255,.7)",
                      background: slide.type === "icon" ? "rgba(107,140,90,.12)" : "rgba(255,255,255,.12)",
                      display: "inline-block", padding: "4px 14px", borderRadius: "100px"
                    }}>
                      {slide.sub}
                    </div>
                  </div>

                  {/* slide counter */}
                  <div style={{
                    position: "absolute", top: 18, right: 22, zIndex: 2,
                    fontSize: 11, fontWeight: 500, letterSpacing: "1px",
                    color: slide.type === "icon" ? "rgba(44,36,22,.35)" : "rgba(255,255,255,.5)"
                  }}>
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </div>

                  {/* video badge */}
                  {slide.type === "video" && (
                    <div style={{
                      position: "absolute", top: 18, left: 22, zIndex: 2,
                      background: "rgba(255,255,255,.18)", backdropFilter: "blur(6px)",
                      borderRadius: "100px", padding: "4px 12px",
                      fontSize: 10, fontWeight: 600, color: "#fff", letterSpacing: "1px",
                      textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%", background: "#ff4444",
                        animation: "pulse 1.5s infinite"
                      }} />
                      Video
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Fade>
    </section>
  );
};

/* ─── ABOUT ─────────────────────────────────────────────────────── */
const About = () => (
  <section id={SECTIONS.about}
    style={{ padding: "100px 5%", background: "linear-gradient(135deg,#2C2416,#3d3220)", position: "relative", overflow: "hidden" }}>
    <div style={{
      position: "absolute", top: 0, right: 0, width: 500, height: 500,
      background: "radial-gradient(circle,rgba(107,140,90,.07),transparent 70%)", pointerEvents: "none"
    }} />
    <Fade>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "#6B8C5A", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>Our Story</p>
        <h2 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, color: "#F7F3EC", lineHeight: 1.2, marginBottom: 28 }}>
          Rooted in the Soil of <em style={{ color: "#c8b88a", fontStyle: "italic" }}>Haryana</em>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(247,243,236,.6)", maxWidth: 680, margin: "0 auto 18px", fontWeight: 300 }}>
          Born in the heartland of Haryana, Amrita Agro Industries began with a simple belief — that what comes from the earth, in its purest form, is what nourishes best. Our production unit in Shekhupur Droli, Fatehabad carries the spirit of generations of farming families.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(247,243,236,.6)", maxWidth: 680, margin: "0 auto 48px", fontWeight: 300 }}>
          We blend time-honored agricultural knowledge with modern manufacturing practices — strengthening the rural economy, creating local employment, and supplying reliable, high-quality agro products to distributors and retailers across the region.
        </p>
        <div className="about-pillars" style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[
            [Star, "Purity First"],
            [Handshake, "Built on Trust"],
            [Leaf, "Quality at Core"],
            [TrendingUp, "Rural Strength"],
          ].map(([Icon, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 54, height: 54, borderRadius: 14, background: "rgba(107,140,90,.15)",
                border: "1px solid rgba(107,140,90,.25)", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Icon size={24} color="#6B8C5A" strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: 12, color: "rgba(247,243,236,.45)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  </section>
);

/* ─── PRODUCTS ──────────────────────────────────────────────────── */
const Products = () => {
  const Card = ({ p }) => (
    <motion.div whileHover={{ y: -6 }} style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(255,255,255,.5)", borderRadius: 16,
      padding: "28px 20px 24px", border: "1px solid rgba(255,255,255,.75)", height: "100%",
    }}>
      <div style={{
        background: "#6B8C5A", color: "#fff", fontSize: 10, fontWeight: 600,
        letterSpacing: "1px", padding: "4px 14px", borderRadius: "100px",
        textTransform: "uppercase", marginBottom: 20
      }}>{p.badge}</div>

      <div style={{
        width: "100%", display: "flex", justifyContent: "center",
        alignItems: "flex-end", height: 240, overflow: "hidden", marginBottom: 16
      }}>
        {p.model === "bag" && <BagModel />}
        {p.model === "churi" && <BagModel churi />}
        {p.model === "bottle" && <BottleModel />}
      </div>

      <div style={{
        width: "100%", height: 8, background: "linear-gradient(180deg,#c4a876,#a88c5a)",
        borderRadius: 4, marginBottom: 20, boxShadow: "0 3px 8px rgba(44,36,22,.18)"
      }} />

      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{
          fontSize: 10, color: "#6B8C5A", letterSpacing: "2px",
          textTransform: "uppercase", marginBottom: 6, fontWeight: 500
        }}>Product {p.num}</div>
        <h3 style={{
          fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 22,
          fontWeight: 700, color: "#2C2416", marginBottom: 10
        }}>{p.name}</h3>
        <p style={{
          fontSize: 13, color: "#6a5c46", lineHeight: 1.7,
          maxWidth: 230, margin: "0 auto 14px", fontWeight: 300
        }}>{p.desc}</p>
        <ul style={{ listStyle: "none", textAlign: "left", display: "inline-block", marginBottom: 16 }}>
          {p.points.map(pt => (
            <li key={pt} style={{
              fontSize: 12, color: "#5a4e3a", marginBottom: 4,
              display: "flex", gap: 6, alignItems: "flex-start"
            }}>
              <CheckCircle2 size={13} color="#6B8C5A" style={{ flexShrink: 0, marginTop: 1 }} />{pt}
            </li>
          ))}
        </ul>
        <button onClick={() => scrollTo(SECTIONS.contact)}
          style={{
            border: "1px solid rgba(107,140,90,.4)", color: "#6B8C5A", padding: "8px 22px",
            borderRadius: "100px", fontSize: 12, background: "transparent", cursor: "pointer",
            fontWeight: 500, fontFamily: "'Nunito Sans',sans-serif",
            display: "inline-flex", alignItems: "center", gap: 4
          }}>
          Enquire <ChevronRight size={13} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id={SECTIONS.products} style={{ padding: "100px 0", background: "#F7F3EC", overflow: "hidden" }}>
      <Fade>
        {/* heading */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: "#6B8C5A", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>What We Manufacture</p>
          <h2 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 600, color: "#2C2416" }}>Our Products</h2>
          <p style={{ marginTop: 12, color: "#6a5c46", fontSize: 15, fontWeight: 300 }}>Direct from our production unit — pure, tested, and trusted by retailers and farmers across Haryana.</p>
        </div>

        {/* ── DESKTOP: 3-col shelf grid ── */}
        <div className="products-desktop" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
          <div className="shelf-wrap" style={{
            background: "linear-gradient(180deg,#EDE5D5,#E0D5C0)", borderRadius: 24,
            padding: "48px 40px 40px", boxShadow: "0 4px 32px rgba(44,36,22,.07)"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
              {PRODUCTS.map((p, i) => (
                <Fade key={p.name} delay={i * .12}><Card p={p} /></Fade>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: horizontal snap scroll ── */}
        <div className="products-mobile">
          <div style={{
            display: "flex", overflowX: "auto", gap: 14, padding: "4px 5% 16px",
            scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}>
            <style>{`.products-mobile div::-webkit-scrollbar{display:none}`}</style>
            {PRODUCTS.map((p) => (
              <div key={p.name} style={{
                minWidth: "76vw", maxWidth: 300, scrollSnapAlign: "start", flexShrink: 0,
                background: "linear-gradient(180deg,#EDE5D5,#E0D5C0)",
                borderRadius: 20, padding: "24px 16px 20px",
                boxShadow: "0 4px 20px rgba(44,36,22,.07)",
              }}>
                <Card p={p} />
              </div>
            ))}
            <div style={{ minWidth: 1, flexShrink: 0 }} />
          </div>
          {/* scroll hint */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingBottom: 8 }}>
            {PRODUCTS.map((_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(107,140,90,.4)" }} />
            ))}
          </div>
        </div>
      </Fade>

      <style>{`
        .products-desktop{display:block}
        .products-mobile{display:none}
        @media(max-width:900px){
          .products-desktop{display:none}
          .products-mobile{display:block}
        }
      `}</style>
    </section>
  );
};

/* ─── WHY US ────────────────────────────────────────────────────── */
const WhyUs = () => (
  <section id={SECTIONS.why} style={{ padding: "100px 5%", background: "#EDE5D5" }}>
    <Fade>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 11, color: "#6B8C5A", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Our Advantage</p>
          <h2 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 600, color: "#2C2416" }}>Why Retailers Trust Us</h2>
        </div>
        <div className="g2r" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {WHY.map(({ Icon, title, desc }, i) => (
              <Fade key={title} delay={i * .1}>
                <div className="wcard" style={{ background: "#F7F3EC", borderRadius: 16, padding: 26, border: "1px solid rgba(107,140,90,.1)" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 11, background: "rgba(107,140,90,.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12
                  }}>
                    <Icon size={20} color="#6B8C5A" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 20, fontWeight: 700, color: "#2C2416", marginBottom: 7 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: "#6a5c46", lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={.2}>
            <div className="why-feature" style={{
              background: "linear-gradient(135deg,#2C2416,#4a3820)", borderRadius: 20,
              padding: "44px 40px", height: "100%", display: "flex", flexDirection: "column",
              justifyContent: "space-between", position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", top: -60, right: -60, width: 240, height: 240,
                borderRadius: "50%", background: "rgba(107,140,90,.09)"
              }} />
              <div>
                <div style={{
                  width: 54, height: 54, background: "rgba(107,140,90,.18)",
                  border: "1px solid rgba(107,140,90,.28)", borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22
                }}>
                  <Award size={26} color="#6B8C5A" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 30, fontWeight: 600, color: "#F7F3EC", lineHeight: 1.2, marginBottom: 18 }}>Trusted by Local Retailers Across the Region</h3>
                <p style={{ fontSize: 15, color: "rgba(247,243,236,.5)", lineHeight: 1.8, fontWeight: 300 }}>
                  We are not just a manufacturer — we are a long-term partner. Built on lasting relationships with retailers and distributors across Fatehabad and beyond — through honest pricing, reliable product quality, and genuine commitment to rural India.
                </p>
              </div>
              <div style={{ marginTop: 36 }}>
                <div style={{ height: 1, background: "rgba(247,243,236,.08)", marginBottom: 26 }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                  {[["17+", "Products"], ["100%", "Pure Ingredients"], ["Bulk", "Supply Ready"], ["Fast", "On-Time Delivery"]].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 22, fontWeight: 700, color: "#c8b88a" }}>{n}</div>
                      <div style={{ fontSize: 11, color: "rgba(247,243,236,.35)", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  </section>
);

/* ─── DISTRIBUTOR ───────────────────────────────────────────────── */
const Distributor = () => {
  const { vals, set, errors, validate } = useForm({ Name: "", Business: "", Phone: "", Email: "", Location: "", "Product Interest": "", "Inquiry Type": "General" });

  const send = () => {
    if (!validate([["Name"], ["Phone"]])) return;
    openWhatsApp({ "Inquiry Type": "Distributor / Retailer", ...vals });
  };

  const fields = [
    { key: "Name", type: "text", required: true },
    { key: "Business", type: "text", required: false },
    { key: "Phone", type: "tel", required: true },
    { key: "Location", type: "text", required: false },
  ];

  return (
    <section id={SECTIONS.distributor} className="dist-section"
      style={{ padding: "100px 5%", background: "#6B8C5A", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 80% 50%,rgba(255,255,255,.06),transparent 60%)", pointerEvents: "none"
      }} />
      <Fade>
        <div className="gc" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-block", background: "rgba(255,255,255,.15)", borderRadius: "100px",
              padding: "6px 16px", fontSize: 11, color: "rgba(255,255,255,.8)", letterSpacing: "2px",
              textTransform: "uppercase", marginBottom: 20
            }}>Distributor & General Inquiries</div>
            <h2 style={{
              fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(30px,4vw,50px)",
              fontWeight: 600, color: "#fff", marginBottom: 20, lineHeight: 1.2
            }}>Partner With Us</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.7)", marginBottom: 36, lineHeight: 1.75, fontWeight: 300 }}>
              We are looking for motivated retailers and distributors to grow our network across Haryana and neighboring regions. Our terms are fair, our supply is consistent, and our quality speaks for itself.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                [BadgeCheck, "Competitive wholesale pricing"],
                [Truck, "Reliable & consistent supply"],
                [TrendingUp, "High-demand product categories"],
                [Wheat, "Direct partnership with production unit"],
                [Users, "Dedicated support for distributors"],
              ].map(([Icon, text]) => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,.75)" }}>
                  <Icon size={16} strokeWidth={1.8} color="rgba(255,255,255,0.6)" />{text}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="form-card" style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", boxShadow: "0 4px 40px rgba(44,36,22,.1)" }}>
            <h3 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 22, fontWeight: 700, color: "#2C2416", marginBottom: 4 }}>Send an Inquiry</h3>
            <p style={{ fontSize: 12, color: "#6B8C5A", marginBottom: 22 }}>Your message will open directly in WhatsApp.</p>

            <div style={{ display: "grid", gap: 12 }}>
              {/* Row 1: Name + Phone side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ key: "Name", type: "text", required: true }, { key: "Phone", type: "tel", required: true }].map(({ key, type, required }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#2C2416", marginBottom: 5 }}>
                      {key}<span style={{ color: "#e74c3c" }}> *</span>
                    </label>
                    <input className={`fi ${errors[key] ? "err" : ""}`} type={type}
                      value={vals[key]} onChange={e => set(key, e.target.value)} placeholder={key}
                      style={{ padding: "10px 14px", fontSize: 13 }} />
                    <FieldError msg={errors[key]} />
                  </div>
                ))}
              </div>

              {/* Row 2: Business + Location side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ key: "Business", type: "text" }, { key: "Location", type: "text" }].map(({ key, type }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#2C2416", marginBottom: 5 }}>{key}</label>
                    <input className="fi" type={type}
                      value={vals[key]} onChange={e => set(key, e.target.value)} placeholder={key}
                      style={{ padding: "10px 14px", fontSize: 13 }} />
                  </div>
                ))}
              </div>

              {/* Row 3: Email + Inquiry Type */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#2C2416", marginBottom: 5 }}>Email</label>
                  <input className="fi" type="email" value={vals.Email}
                    onChange={e => set("Email", e.target.value)} placeholder="Email (optional)"
                    style={{ padding: "10px 14px", fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#2C2416", marginBottom: 5 }}>Inquiry Type</label>
                  <select className="fi" value={vals["Inquiry Type"]} onChange={e => set("Inquiry Type", e.target.value)}
                    style={{ padding: "10px 14px", fontSize: 13 }}>
                    <option>General</option>
                    <option>Distributor / Retailer</option>
                    <option>Bulk Order</option>
                    <option>Pricing</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Product Interest full width */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#2C2416", marginBottom: 5 }}>Product Interest</label>
                <select className="fi" value={vals["Product Interest"]} onChange={e => set("Product Interest", e.target.value)}
                  style={{ padding: "10px 14px", fontSize: 13 }}>
                  <option value="">Select a product</option>
                  <option>Cattle Feed</option>
                  <option>Mustard Oil</option>
                  <option>Churi / Mixture</option>
                  <option>All Products</option>
                </select>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: .97 }}
                onClick={send} className="wa-btn" style={{ marginTop: 4 }}>
                <MessageCircle size={18} /> Send via WhatsApp
              </motion.button>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

/* ─── CONTACT — info + Google Maps embed (no duplicate form) ─────── */
const Contact = () => (
  <section id={SECTIONS.contact} style={{ padding: "90px 5%", background: "#F7F3EC" }}>
    <Fade>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 11, color: "#6B8C5A", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Find Us</p>
          <h2 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 600, color: "#2C2416" }}>Get in Touch</h2>
          <p style={{ marginTop: 12, color: "#6a5c46", fontWeight: 300, fontSize: 15 }}>We welcome retailers, distributors, and bulk buyers to reach out directly.</p>
        </div>

        <div className="gc" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }}>

          {/* ── Contact info ── */}
          <div>
            <h3 style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 22, fontWeight: 700, color: "#2C2416", marginBottom: 28 }}>Amrita Agro Industries</h3>
            {[
              [MapPin, "Location", "Shekhupur Droli, Fatehabad, Haryana, India"],
              [Phone, "Phone", "+91 9991689999"],
              [Mail, "Email", "info@amritaagro.com"],
              [Clock, "Business Hours", "Mon–Sat, 9:00 AM – 6:00 PM"],
            ].map(([Icon, label, val]) => (
              <div key={label} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, background: "rgba(107,140,90,.12)", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon size={17} color="#6B8C5A" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#6B8C5A", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, color: "#2C2416", lineHeight: 1.5 }}>{val}</div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              <a href={`https://wa.me/${WHATSAPP_NO}?text=${encodeURIComponent("Hello! I'd like to know more about Amrita Agro products.")}`}
                target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#25D366", color: "#fff", padding: "11px 20px", borderRadius: "100px",
                  fontSize: 13, fontWeight: 600, textDecoration: "none"
                }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a href="tel:+919991689999"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(107,140,90,.12)", color: "#2d5a27", padding: "11px 20px", borderRadius: "100px",
                  fontSize: 13, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(107,140,90,.25)"
                }}>
                <Phone size={15} /> Call Now
              </a>
            </div>
          </div>

          {/* ── Location preview (Google Maps embed) ── */}
          <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 40px rgba(44,36,22,.1)", border: "1px solid rgba(107,140,90,.12)" }}>
            <iframe
              title="Amrita Agro Industries Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.123456789!2d75.4567!3d29.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShekhupur+Droli%2C+Fatehabad%2C+Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="340" style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <div style={{ background: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
              <MapPin size={15} color="#6B8C5A" />
              <span style={{ fontSize: 13, color: "#2C2416", fontWeight: 400 }}>Shekhupur Droli, Fatehabad, Haryana — <a href="https://maps.google.com/?q=Shekhupur+Droli+Fatehabad+Haryana" target="_blank" rel="noreferrer" style={{ color: "#6B8C5A", fontWeight: 600, textDecoration: "none" }}>Open in Maps ↗</a></span>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  </section>
);

/* ─── FACTORY STRIP — animated agro icons row ───────────────────── */
const FactoryStrip = () => {
  const items = [
    { Icon: Factory, label: "Production Unit", desc: "Shekhupur Droli" },
    { Icon: Wheat, label: "Wheat & Mustard", desc: "Haryana Fields" },
    { Icon: Droplets, label: "Cold Press Oil", desc: "Kachi Ghani" },
    { Icon: Truck, label: "Bulk Delivery", desc: "Pan-Haryana" },
    { Icon: ShieldCheck, label: "Quality Tested", desc: "Every Batch" },
    { Icon: Sprout, label: "Pure Inputs", desc: "Farm Sourced" },
  ];
  return (
    <div style={{ background: "#1a2e15", padding: "48px 5%", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4,
          justifyContent: "space-between", flexWrap: "wrap"
        }}>
          {items.map(({ Icon, label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                minWidth: 100, flex: "1 1 100px", padding: "16px 8px", cursor: "default"
              }}>
              {/* animated gear ring around icon */}
              <div style={{ position: "relative", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg className="spin-slow" style={{ position: "absolute", inset: 0 }}
                  width="64" height="64" viewBox="0 0 64 64" fill="none">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                    <rect key={a} x="30" y="2" width="4" height="10" rx="2" fill="rgba(107,140,90,.35)"
                      transform={`rotate(${a} 32 32)`} />
                  ))}
                  <circle cx="32" cy="32" r="22" stroke="rgba(107,140,90,.2)" strokeWidth="1.5" fill="none" />
                </svg>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(107,140,90,.15)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Icon size={22} color="#8fba78" strokeWidth={1.5} />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: "rgba(247,243,236,.75)",
                  fontFamily: "'Tiro Devanagari Hindi',serif", marginBottom: 3
                }}>{label}</div>
                <div style={{ fontSize: 10, color: "rgba(247,243,236,.3)", fontFamily: "'Nunito Sans',sans-serif" }}>{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── FOOTER ────────────────────────────────────────────────────── */
const Footer = () => {
  const Q = [
    ["About Us", SECTIONS.about],
    ["Our Products", SECTIONS.products],
    ["Why Choose Us", SECTIONS.why],
    ["Become Distributor", SECTIONS.distributor],
    ["Gallery", null, GALLERY_PAGE],
    ["Contact", SECTIONS.contact],
  ];
  const P = [
    ["Cattle Feed", SECTIONS.products],
    ["Mustard Oil", SECTIONS.products],
    ["Churi / Mixture", SECTIONS.products],
  ];
  const C = [
    [Phone, "+91 9991689999", `tel:+919991689999`],
    [Mail, "info@amritaagro.com", `mailto:info@amritaagro.com`],
    [MessageCircle, "Chat on WhatsApp", `https://wa.me/${WHATSAPP_NO}`],
  ];

  const linkStyle = {
    display: "block", fontSize: 13, color: "rgba(247,243,236,.3)", marginBottom: 10,
    background: "none", border: "none", cursor: "pointer", padding: 0,
    fontFamily: "'Nunito Sans',sans-serif", textAlign: "left", textDecoration: "none",
    transition: "color .2s",
  };
  const hover = e => e.currentTarget.style.color = "rgba(247,243,236,.65)";
  const out = e => e.currentTarget.style.color = "rgba(247,243,236,.3)";

  return (
    <footer style={{ background: "#1a1208", padding: "60px 5% 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="gd" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
              <Logo size={80} />
              <div>
                <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontWeight: 700, fontSize: 24, color: "#F7F3EC", lineHeight: 1.1 }}>Amrita Agro</div>
                <div style={{ fontSize: 10, color: "#6B8C5A", letterSpacing: "3px", textTransform: "uppercase", marginTop: 6 }}>Industries</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(247,243,236,.3)", lineHeight: 1.75, maxWidth: 260, fontWeight: 300 }}>
              Pure, trusted agro products from the heart of Haryana. Manufactured with integrity, supplied with commitment.
            </p>
            <p style={{ marginTop: 16, fontSize: 12, color: "rgba(247,243,236,.2)", display: "flex", gap: 6, alignItems: "center" }}>
              <MapPin size={12} color="rgba(247,243,236,.2)" /> Shekhupur Droli, Fatehabad, Haryana
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: 11, color: "#6B8C5A", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</div>
            {Q.map(([label, id, href]) =>
              href ? (
                <a key={label} href={href} style={linkStyle} onMouseOver={hover} onMouseOut={out}>{label}</a>
              ) : (
                <button key={label} onClick={() => scrollTo(id)} style={linkStyle} onMouseOver={hover} onMouseOut={out}>{label}</button>
              )
            )}
          </div>

          {/* Products */}
          <div>
            <div style={{ fontSize: 11, color: "#6B8C5A", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Products</div>
            {P.map(([label, id]) => (
              <button key={label} onClick={() => scrollTo(id)} style={linkStyle} onMouseOver={hover} onMouseOut={out}>{label}</button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, color: "#6B8C5A", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
            {C.map(([Icon, label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ ...linkStyle, display: "flex", alignItems: "center", gap: 8 }}
                onMouseOver={hover} onMouseOut={out}>
                <Icon size={13} color="rgba(247,243,236,.3)" strokeWidth={1.5} /> {label}
              </a>
            ))}
            <div style={{ fontSize: 13, color: "rgba(247,243,236,.3)", marginTop: 4, display: "flex", gap: 8, alignItems: "center" }}>
              <Clock size={13} color="rgba(247,243,236,.3)" strokeWidth={1.5} /> Mon–Sat, 9AM–6PM
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(247,243,236,.06)", marginBottom: 22 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: "rgba(247,243,236,.18)" }}>© 2024 Amrita Agro Industries. All rights reserved.</div>
          <div style={{ fontSize: 12, color: "rgba(247,243,236,.18)" }}>Pure by Nature. Strong by Tradition.</div>
        </div>
      </div>
    </footer>
  );
};

/* ─── APP ───────────────────────────────────────────────────────── */

/* ─── VIDEO SLIDER ──────────────────────────────────────────────────
   Slim full-width video/image slider that sits between Header and Hero.
   Height: 220px desktop, 140px mobile.
   Auto-advances every 6s. Swipe/drag supported.
─────────────────────────────────────────────────────────────────── */
const VIDEO_SLIDES = [
  { type: "video", src: "photos/slideshow/video1.mp4", label: "Inside Our Factory", sub: "Shekhupur Droli, Fatehabad" },
  { type: "video", src: "photos/slideshow/video2.mp4", label: "Processing Line", sub: "Modern manufacturing" },
  { type: "image", src: "photos/slideshow/slide1.jpeg", label: "Production Unit", sub: "Shekhupur Droli, Fatehabad" },
  { type: "image", src: "photos/slideshow/slide2.jpeg", label: "Raw Materials", sub: "Pure quality inputs" },
];

/* Seamless infinite loop: we duplicate slides and reset position silently */
const VideoSlider = () => {
  const total = VIDEO_SLIDES.length;
  const [idx, setIdx] = useState(0);   // logical index (0..total-1)
  const [pos, setPos] = useState(1);   // track position (1-based; 0 & total+1 are clones)
  const [animate, setAnimate] = useState(true);
  const dragX = useRef(0);
  const timerRef = useRef(null);

  // slides: [lastClone, ...originals, firstClone]
  const slides = [VIDEO_SLIDES[total - 1], ...VIDEO_SLIDES, VIDEO_SLIDES[0]];

  const advance = (dir = 1) => {
    setAnimate(true);
    setPos(p => p + dir);
    setIdx(i => (i + dir + total) % total);
  };

  // Reset silently when we hit a clone
  useEffect(() => {
    if (!animate) return;
    if (pos === 0) {
      // jumped to last-clone — wait for transition then reset to real last
      const t = setTimeout(() => { setAnimate(false); setPos(total); }, 500);
      return () => clearTimeout(t);
    }
    if (pos === total + 1) {
      // jumped to first-clone — wait for transition then reset to real first
      const t = setTimeout(() => { setAnimate(false); setPos(1); }, 500);
      return () => clearTimeout(t);
    }
  }, [pos, animate, total]);

  // Auto-advance every 5s
  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), 5000);
    return () => clearInterval(timerRef.current);
  }, [pos]);

  // Swipe support
  const onDown = (e) => { dragX.current = e.touches ? e.touches[0].clientX : e.clientX; };
  const onUp = (e) => {
    const dx = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - dragX.current;
    if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1);
  };

  return (
    <div className="vslider" style={{ position: "relative", overflow: "hidden", cursor: "grab", userSelect: "none" }}
      onMouseDown={onDown} onMouseUp={onUp}
      onTouchStart={onDown} onTouchEnd={onUp}>

      {/* Track */}
      <div style={{
        display: "flex", height: "100%",
        transform: `translateX(${-pos * 100}%)`,
        transition: animate ? "transform 0.6s cubic-bezier(.22,1,.36,1)" : "none",
        willChange: "transform",
      }}>
        {slides.map((slide, i) => (
          <div key={i} style={{ minWidth: "100%", height: "100%", position: "relative", flexShrink: 0 }}>
            {slide.type === "video" ? (
              <video src={slide.src} autoPlay muted loop playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <img src={slide.src} alt={slide.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            )}
            {/* gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top,rgba(10,8,4,.7) 0%,rgba(0,0,0,.1) 55%,transparent 100%)",
              pointerEvents: "none",
            }} />
            {/* caption */}
            <div style={{ position: "absolute", bottom: 18, left: 24, zIndex: 2 }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: "clamp(13px,1.6vw,18px)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{slide.label}</div>
              <div style={{ fontSize: "clamp(10px,1.1vw,12px)", color: "rgba(255,255,255,.6)", marginTop: 3, fontFamily: "'Nunito Sans',sans-serif" }}>{slide.sub}</div>
            </div>
            {/* LIVE badge for videos */}
            {slide.type === "video" && (
              <div style={{
                position: "absolute", top: 12, left: 16, zIndex: 2,
                background: "rgba(0,0,0,.4)", backdropFilter: "blur(6px)", borderRadius: 100,
                padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "#fff",
                letterSpacing: "1.5px", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 5
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ff4444", animation: "pulse 1.5s infinite" }} />
                Live
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ position: "absolute", bottom: 14, right: 18, display: "flex", gap: 6, zIndex: 3 }}>
        {VIDEO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => { setAnimate(true); setPos(i + 1); setIdx(i); }}
            style={{
              width: i === idx ? 20 : 6, height: 6, borderRadius: 3, padding: 0, border: "none",
              background: i === idx ? "#fff" : "rgba(255,255,255,.4)", cursor: "pointer", transition: "all .3s"
            }} />
        ))}
      </div>

      {/* Arrows */}
      {[[-1, "left:10px", "rotate(180deg)"], [1, "right:10px", "none"]].map(([dir, pos2, rot]) => (
        <button key={dir} onClick={() => advance(dir)}
          style={{
            position: "absolute", [dir === -1 ? "left" : "right"]: 12,
            top: "50%", transform: `translateY(-50%)`,
            width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,.3)",
            background: "rgba(0,0,0,.3)", backdropFilter: "blur(4px)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3
          }}>
          <ChevronRight size={14} color="#fff" style={{ transform: `rotate(${rot})` }} />
        </button>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <>
      <Styles />
      <Header />
      <VideoSlider />
      <Hero />
      <Ticker />
      <GalleryStrip />
      <About />
      <Products />
      <WhyUs />
      <Distributor />
      <Contact />
      <FactoryStrip />
      <Footer />
    </>
  );
}
