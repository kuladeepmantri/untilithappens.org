'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { guideJourney } from '@/lib/site-data';

function normalizePath(path: string): string {
  let normalized = path || '/';
  const configuredBasePath = '/untilithappens.org';

  if (normalized.startsWith(configuredBasePath)) {
    normalized = normalized.slice(configuredBasePath.length) || '/';
  }

  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

function resolveStepIndex(pathname: string): number {
  const normalized = normalizePath(pathname);

  const exact = guideJourney.findIndex((step) => step.href === normalized);
  if (exact !== -1) {
    return exact;
  }

  return guideJourney.findIndex((step) => {
    if (step.href === '/') {
      return false;
    }
    return normalized.startsWith(`${step.href}/`);
  });
}

export function JourneyDock() {
  const pathname = usePathname();
  const currentIndex = useMemo(() => resolveStepIndex(pathname), [pathname]);
  const [showGreeting, setShowGreeting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const markerRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null>(null);
  const nodesRef = useRef<Array<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>>>([]);
  const ringsRef = useRef<Array<THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>>>([]);
  const routeGlowRef = useRef<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const activeIndexRef = useRef(currentIndex);
  const initialIndexRef = useRef(currentIndex);
  const animationRef = useRef({ currentT: 0, targetT: 0, raf: 0 });

  const points = useMemo(() => {
    const spread = 1.45;
    const offset = (guideJourney.length - 1) / 2;
    const denominator = Math.max(guideJourney.length - 1, 1);

    return guideJourney.map((_, index) => {
      const t = index / denominator;
      const x = (index - offset) * spread;
      const y = Math.sin(t * Math.PI) * 0.42;
      const z = Math.cos(index * 0.48) * 0.18;
      return new THREE.Vector3(x, y, z);
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const key = 'uih_greeting_seen_v4';
    if (!window.sessionStorage.getItem(key)) {
      setShowGreeting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
    camera.position.set(0, 1.2, 8.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.68));
    const keyLight = new THREE.PointLight(0x8ac6ff, 0.8, 40);
    keyLight.position.set(-4, 4, 6);
    const fillLight = new THREE.PointLight(0x7f8ea1, 0.6, 40);
    fillLight.position.set(4, 2, 5);
    scene.add(keyLight, fillLight);

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
    curveRef.current = curve;

    const pathGeometry = new THREE.TubeGeometry(curve, 240, 0.038, 10, false);
    const pathMaterial = new THREE.MeshStandardMaterial({
      color: 0x5e6f84,
      emissive: 0x243241,
      emissiveIntensity: 0.38,
      roughness: 0.44,
      metalness: 0.15,
      transparent: true,
      opacity: 0.9,
    });
    const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);
    scene.add(pathMesh);

    const glowGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(2));
    const glowMaterial = new THREE.LineBasicMaterial({
      color: 0xf0bc7f,
      transparent: true,
      opacity: 0.95,
    });
    const glowLine = new THREE.Line(glowGeometry, glowMaterial);
    scene.add(glowLine);
    routeGlowRef.current = glowLine;

    points.forEach((point) => {
      const nodeGeometry = new THREE.SphereGeometry(0.11, 14, 14);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: 0x78889b,
        emissive: 0x3d4959,
        emissiveIntensity: 0.18,
        roughness: 0.35,
        metalness: 0.2,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(point);
      scene.add(node);
      nodesRef.current.push(node);

      const ringGeometry = new THREE.TorusGeometry(0.19, 0.01, 9, 24);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x70839b,
        emissive: 0x25313d,
        emissiveIntensity: 0.15,
        roughness: 0.4,
        metalness: 0.2,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(point);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      ringsRef.current.push(ring);
    });

    const markerGeometry = new THREE.SphereGeometry(0.1, 14, 14);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0bc7f,
      emissive: 0xf0bc7f,
      emissiveIntensity: 0.95,
      roughness: 0.25,
      metalness: 0.14,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    scene.add(marker);
    markerRef.current = marker;

    const initialIndex = initialIndexRef.current === -1 ? 0 : initialIndexRef.current;
    activeIndexRef.current = initialIndex;
    const start = initialIndex / Math.max(guideJourney.length - 1, 1);
    animationRef.current.currentT = start;
    animationRef.current.targetT = start;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    const animationState = animationRef.current;
    let tick = 0;
    const animate = () => {
      tick += 0.012;

      const state = animationState;
      state.currentT += (state.targetT - state.currentT) * 0.08;
      const markerT = Math.min(0.99, Math.max(0, state.currentT));

      curve.getPointAt(markerT, marker.position);
      marker.position.y += Math.sin(tick * 2.5) * 0.01;

      const routePointCount = Math.max(2, Math.floor(markerT * 240) + 1);
      const routePoints = curve.getPoints(routePointCount);
      glowLine.geometry.dispose();
      glowLine.geometry = new THREE.BufferGeometry().setFromPoints(routePoints);

      camera.position.x = Math.sin(tick * 0.22) * 0.16;
      camera.position.y = 1.2 + Math.cos(tick * 0.18) * 0.08;
      camera.lookAt(0, 0, 0);

      const activeIndex = activeIndexRef.current;

      nodesRef.current.forEach((node, index) => {
        const isCurrent = index === activeIndex;
        const isPast = index < activeIndex;
        node.material.color.setHex(isCurrent ? 0xbdd7f3 : isPast ? 0xf0bc7f : 0x78889b);
        node.material.emissive.setHex(isCurrent ? 0x6b88aa : isPast ? 0x8b6842 : 0x3d4959);
        node.material.emissiveIntensity = isCurrent ? 0.68 : isPast ? 0.3 : 0.18;
        node.scale.setScalar(isCurrent ? 1 + Math.sin(tick * 4) * 0.06 : 1);
      });

      ringsRef.current.forEach((ring, index) => {
        const isCurrent = index === activeIndex;
        const isPast = index < activeIndex;
        ring.material.color.setHex(isCurrent ? 0xbdd7f3 : isPast ? 0xf0bc7f : 0x70839b);
        ring.material.emissive.setHex(isCurrent ? 0x526f93 : isPast ? 0x7c6040 : 0x25313d);
        ring.material.emissiveIntensity = isCurrent ? 0.52 : isPast ? 0.24 : 0.12;
      });

      renderer.render(scene, camera);
      animationState.raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationState.raf);
      window.removeEventListener('resize', resize);

      pathGeometry.dispose();
      pathMaterial.dispose();
      glowLine.geometry.dispose();
      glowMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      nodesRef.current.forEach((node) => {
        node.geometry.dispose();
        node.material.dispose();
      });
      ringsRef.current.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      nodesRef.current = [];
      ringsRef.current = [];

      renderer.dispose();
      curveRef.current = null;
      markerRef.current = null;
      routeGlowRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
    };
  }, [points]);

  useEffect(() => {
    if (currentIndex === -1) {
      return;
    }
    activeIndexRef.current = currentIndex;
    animationRef.current.targetT = currentIndex / Math.max(guideJourney.length - 1, 1);
  }, [currentIndex]);

  if (currentIndex === -1) {
    return null;
  }

  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  return (
    <>
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#090e14] p-6"
            >
              <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Welcome</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">You are in guided mode</h2>
              <p className="mt-3 text-sm text-white/75">
                This site walks you page-by-page through threats, exposure, protection, and response. Use the guide rail to
                move forward without getting lost.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/threats"
                  onClick={() => {
                    setShowGreeting(false);
                    window.sessionStorage.setItem('uih_greeting_seen_v4', '1');
                  }}
                  className="rounded-md bg-[#f0bc7f] px-4 py-2 text-sm font-medium text-[#161008]"
                >
                  Start with threats
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setShowGreeting(false);
                    window.sessionStorage.setItem('uih_greeting_seen_v4', '1');
                  }}
                  className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
                >
                  Continue where I am
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[110] px-2 sm:px-4">
        <section className="pointer-events-auto mx-auto w-full max-w-6xl rounded-2xl border border-white/20 bg-[#0a0f16]/95 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-ui-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              Guided journey • step {currentIndex + 1} of {guideJourney.length}
            </p>
            <p className="text-xs text-white/74">{guideJourney[currentIndex].title}</p>
          </div>

          <div className="mt-2 h-20 overflow-hidden rounded-lg border border-white/15 bg-[#070c12] sm:h-24">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          <div className="mt-3 overflow-x-auto">
            <div className="flex min-w-max gap-2 pb-1">
              {guideJourney.map((step, index) => {
                const isCurrent = index === currentIndex;
                const isDone = index < currentIndex;
                return (
                  <Link
                    key={step.href}
                    href={step.href}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      isCurrent
                        ? 'border-[#bdd7f3] bg-[#1f2f40] text-white'
                        : isDone
                          ? 'border-[#9a7650] bg-[#2a2117] text-white/85'
                          : 'border-white/20 text-white/70 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    {step.short}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            {previous ? (
              <Link href={previous.href} className="text-sm text-white/75 underline underline-offset-4 hover:text-white">
                Back: {previous.short}
              </Link>
            ) : (
              <span className="text-sm text-white/45">Journey start</span>
            )}

            {next ? (
              <Link href={next.href} className="rounded-md bg-[#f0bc7f] px-4 py-2 text-sm font-medium text-[#161008]">
                Continue: {next.short}
              </Link>
            ) : (
              <span className="text-sm text-white/45">Final step reached</span>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
