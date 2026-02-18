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

type StepAssist = {
  objective: string;
  actions: string[];
  checkpoint: string;
};

const assistByHref: Record<string, StepAssist> = {
  '/': {
    objective: 'Understand how the journey works and pick your first path with confidence.',
    actions: [
      'Read one current signal to anchor your risk level.',
      'Pick your entry point: threats, help, or prevention.',
      'Keep the guide rail visible to move step-by-step.',
    ],
    checkpoint: 'You know where to start in under 2 minutes.',
  },
  '/threats': {
    objective: 'Classify suspicious activity before interacting with it.',
    actions: [
      'Select the scenario closest to what you are seeing.',
      'Run Observe -> Verify -> Contain -> Report in order.',
      'Preserve evidence before deleting or blocking.',
    ],
    checkpoint: 'You can triage a suspicious message within 60 seconds.',
  },
  '/check-footprint': {
    objective: 'Reduce exposed personal data attackers can weaponize.',
    actions: [
      'Complete Discover, then Prioritize, then Remove.',
      'Focus on critical identifiers first (phone, email, address).',
      'Set a 30-day recheck cycle.',
    ],
    checkpoint: 'You can execute one full cleanup cycle end-to-end.',
  },
  '/protect': {
    objective: 'Harden your primary platform before switching context.',
    actions: [
      'Finish Step 1 essentials before touching advanced controls.',
      'Apply Step 2 hardening for your detected platform.',
      'Set Step 3 recovery readiness for lockout scenarios.',
    ],
    checkpoint: 'Your most-used device reaches baseline hardening today.',
  },
  '/learn': {
    objective: 'Turn one-time fixes into repeatable security behavior.',
    actions: [
      'Complete one module and test with the password lab.',
      'Schedule weekly and monthly cadence actions.',
      'Run one short incident drill.',
    ],
    checkpoint: 'You have a repeatable habit loop, not one-off tasks.',
  },
  '/real-stories': {
    objective: 'Learn prevention from real failure patterns.',
    actions: [
      'Review one story from trigger to preventive control.',
      'Map the missed checkpoint to your own setup.',
      'Add one prevention rule to your routine.',
    ],
    checkpoint: 'You can explain one realistic failure chain and fix.',
  },
  '/get-help': {
    objective: 'Contain incident impact quickly and in the right sequence.',
    actions: [
      'Execute 0-15 minute containment actions first.',
      'Build evidence package in the first hour.',
      'Route report using official channels only.',
    ],
    checkpoint: 'You can run first-hour response without panic.',
  },
  '/report': {
    objective: 'Route incidents to the right reporting channel with quality evidence.',
    actions: [
      'Match incident type to reporting matrix.',
      'Include timestamps, IDs, and all prior case numbers.',
      'File quickly and preserve case links for follow-up.',
    ],
    checkpoint: 'Your report is clear, complete, and agency-ready.',
  },
  '/community': {
    objective: 'Contribute improvements that increase clarity and safety.',
    actions: [
      'Propose one actionable rewrite for a confusing section.',
      'Attach one primary-source citation with date.',
      'Submit one real-world confusion point from users.',
    ],
    checkpoint: 'Your contribution improves practical usability.',
  },
};

const etaMinutes: Record<string, number> = {
  '/': 3,
  '/threats': 8,
  '/check-footprint': 12,
  '/protect': 15,
  '/learn': 10,
  '/real-stories': 8,
  '/get-help': 10,
  '/report': 8,
  '/community': 6,
};

const MINIMIZED_KEY = 'uih_journey_minimized_v2';
const DONE_KEY = 'uih_journey_done_v2';

export function JourneyDock() {
  const pathname = usePathname();
  const currentIndex = useMemo(() => resolveStepIndex(pathname), [pathname]);

  const [showGreeting, setShowGreeting] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const nodesRef = useRef<Array<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>>>([]);
  const ringsRef = useRef<Array<THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>>>([]);
  const activeIndexRef = useRef(currentIndex);
  const initialIndexRef = useRef(currentIndex);
  const previewTRef = useRef(0);
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

    const greetingKey = 'uih_greeting_seen_v4';
    if (!window.sessionStorage.getItem(greetingKey)) {
      setShowGreeting(true);
    }

    const storedMinimized = window.localStorage.getItem(MINIMIZED_KEY);
    if (storedMinimized === '1') {
      setIsMinimized(true);
    } else if (storedMinimized === '0') {
      setIsMinimized(false);
    } else if (window.matchMedia('(max-width: 768px)').matches) {
      setIsMinimized(true);
    }

    const storedDone = window.localStorage.getItem(DONE_KEY);
    if (storedDone) {
      try {
        const parsed = JSON.parse(storedDone) as Record<string, boolean>;
        setDoneMap(parsed);
      } catch {
        setDoneMap({});
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(MINIMIZED_KEY, isMinimized ? '1' : '0');
  }, [isMinimized]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(DONE_KEY, JSON.stringify(doneMap));
  }, [doneMap]);

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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.68));
    const keyLight = new THREE.PointLight(0x8ac6ff, 0.8, 40);
    keyLight.position.set(-4, 4, 6);
    const fillLight = new THREE.PointLight(0x7f8ea1, 0.6, 40);
    fillLight.position.set(4, 2, 5);
    scene.add(keyLight, fillLight);

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);

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

    const glowGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(8));
    const glowMaterial = new THREE.LineBasicMaterial({
      color: 0xf0bc7f,
      transparent: true,
      opacity: 0.95,
    });
    const glowLine = new THREE.Line(glowGeometry, glowMaterial);
    scene.add(glowLine);

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

    const flowCount = 42;
    const flowProgress = new Float32Array(flowCount);
    const flowPositions = new Float32Array(flowCount * 3);
    for (let i = 0; i < flowCount; i += 1) {
      flowProgress[i] = Math.random();
      const point = curve.getPointAt(flowProgress[i]);
      flowPositions[i * 3] = point.x;
      flowPositions[i * 3 + 1] = point.y;
      flowPositions[i * 3 + 2] = point.z;
    }
    const flowGeometry = new THREE.BufferGeometry();
    flowGeometry.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    const flowMaterial = new THREE.PointsMaterial({
      color: 0xc6d9ec,
      size: 0.045,
      transparent: true,
      opacity: 0.86,
    });
    const flowPoints = new THREE.Points(flowGeometry, flowMaterial);
    scene.add(flowPoints);

    const initialIndex = initialIndexRef.current === -1 ? 0 : initialIndexRef.current;
    activeIndexRef.current = initialIndex;
    const start = initialIndex / Math.max(guideJourney.length - 1, 1);
    const previewIndex = Math.min(initialIndex + 1, guideJourney.length - 1);
    previewTRef.current = previewIndex / Math.max(guideJourney.length - 1, 1);
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
      const fromT = Math.min(state.currentT, previewTRef.current);
      const toT = Math.max(state.currentT, previewTRef.current);
      const sweepT = fromT + (Math.sin(tick * 2.25) * 0.5 + 0.5) * Math.max(toT - fromT, 0.01);
      const markerT = Math.min(0.99, Math.max(0, sweepT));

      curve.getPointAt(markerT, marker.position);
      marker.position.y += Math.sin(tick * 2.5) * 0.01;

      const routePointCount = Math.max(8, Math.floor(markerT * 240) + 1);
      const routePoints = curve.getPoints(routePointCount);
      glowLine.geometry.dispose();
      glowLine.geometry = new THREE.BufferGeometry().setFromPoints(routePoints);

      const flowStart = Math.min(state.currentT, previewTRef.current);
      const flowEnd = Math.max(state.currentT, previewTRef.current);
      const flowSpan = Math.max(flowEnd - flowStart, 0.08);
      const positions = flowGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < flowCount; i += 1) {
        flowProgress[i] += 0.004 + (i % 5) * 0.00035;
        if (flowProgress[i] > 1) {
          flowProgress[i] -= 1;
        }
        const t = Math.min(0.99, flowStart + flowProgress[i] * flowSpan);
        const point = curve.getPointAt(t);
        positions.setXYZ(i, point.x, point.y, point.z);
      }
      positions.needsUpdate = true;

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
      flowGeometry.dispose();
      flowMaterial.dispose();

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
    };
  }, [points]);

  useEffect(() => {
    if (currentIndex === -1) {
      return;
    }
    activeIndexRef.current = currentIndex;
    animationRef.current.targetT = currentIndex / Math.max(guideJourney.length - 1, 1);
    const previewIndex = Math.min(currentIndex + 1, guideJourney.length - 1);
    previewTRef.current = previewIndex / Math.max(guideJourney.length - 1, 1);
  }, [currentIndex]);

  if (currentIndex === -1) {
    return null;
  }

  const currentStep = guideJourney[currentIndex];
  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;
  const assist = assistByHref[currentStep.href] ?? {
    objective: currentStep.intent,
    actions: ['Review this step intent and continue to next step.'],
    checkpoint: 'You can explain what to do next.',
  };

  const completedCount = guideJourney.filter((step) => doneMap[step.href]).length;
  const completionPercent = Math.round((completedCount / guideJourney.length) * 100);
  const remainingMinutes = guideJourney
    .slice(currentIndex)
    .reduce((total, step) => total + (etaMinutes[step.href] ?? 8), 0);

  const markCurrentDone = () => {
    setDoneMap((previousMap) => {
      if (previousMap[currentStep.href]) {
        return previousMap;
      }
      return { ...previousMap, [currentStep.href]: true };
    });
  };

  const toggleCurrentDone = () => {
    setDoneMap((previousMap) => ({
      ...previousMap,
      [currentStep.href]: !previousMap[currentStep.href],
    }));
  };

  const toggleMinimized = () => {
    setIsMinimized((previousValue) => !previousValue);
  };

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
              <h2 className="mt-3 text-3xl font-semibold text-white">Guided mode is active</h2>
              <p className="mt-3 text-sm text-white/75">
                This site walks you page-by-page through threats, exposure, protection, and response. You can minimize or
                expand the guide at any time.
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
        <section
          className={`pointer-events-auto mx-auto w-full max-w-6xl rounded-2xl border border-white/20 bg-[#0a0f16]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm ${
            isMinimized ? 'p-2.5 sm:p-3' : 'max-h-[68svh] overflow-y-auto p-3 sm:p-4'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-ui-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                Guided journey • step {currentIndex + 1} of {guideJourney.length}
              </p>
              <p className="text-xs text-white/74">{currentStep.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMinimized}
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/85 hover:bg-white/10"
              >
                {isMinimized ? 'Expand' : 'Minimize'}
              </button>
              {next ? (
                <Link
                  href={next.href}
                  onClick={markCurrentDone}
                  className="rounded-md bg-[#f0bc7f] px-3 py-1.5 text-xs font-medium text-[#161008]"
                >
                  Next
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#7f9ab3]" style={{ width: `${completionPercent}%` }} />
          </div>

          {isMinimized ? (
            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-white/75">
              <span>{completedCount}/{guideJourney.length} steps marked done</span>
              <span>{remainingMinutes} min remaining</span>
            </div>
          ) : (
            <>
              <div className="relative mt-3 h-24 overflow-hidden rounded-lg border border-white/15 bg-[#070c12] sm:h-28">
                <canvas ref={canvasRef} className="h-full w-full" />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
                  <div className="absolute left-[18%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/20" />
                  <div className="absolute left-[50%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/20" />
                  <div className="absolute left-[82%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/20" />
                </div>
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr,1fr]">
                <div className="rounded-xl border border-white/14 bg-[#0f1722] p-3">
                  <p className="font-ui-mono text-[11px] uppercase tracking-[0.18em] text-white/58">Current objective</p>
                  <p className="mt-2 text-sm text-white/84">{assist.objective}</p>
                  <ul className="mt-3 space-y-2">
                    {assist.actions.map((item) => (
                      <li key={item} className="rounded-md border border-white/10 bg-[#131d2a] px-3 py-2 text-sm text-white/78">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-white/14 bg-[#0f1722] p-3">
                  <p className="font-ui-mono text-[11px] uppercase tracking-[0.18em] text-white/58">Learning checkpoint</p>
                  <p className="mt-2 text-sm text-white/84">{assist.checkpoint}</p>
                  <p className="mt-3 text-xs text-white/70">Estimated remaining time: {remainingMinutes} minutes</p>
                  <button
                    type="button"
                    onClick={toggleCurrentDone}
                    className="mt-3 rounded-md border border-white/20 px-3 py-2 text-xs text-white/84 hover:bg-white/10"
                  >
                    {doneMap[currentStep.href] ? 'Mark step as not done' : 'Mark this step done'}
                  </button>
                </div>
              </div>

              <div className="mt-3 overflow-x-auto">
                <div className="flex min-w-max gap-2 pb-1">
                  {guideJourney.map((step, index) => {
                    const isCurrent = index === currentIndex;
                    const isDone = doneMap[step.href] || index < currentIndex;
                    return (
                      <Link
                        key={step.href}
                        href={step.href}
                        onClick={() => {
                          if (index > currentIndex) {
                            markCurrentDone();
                          }
                        }}
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
                  <Link href={next.href} onClick={markCurrentDone} className="rounded-md bg-[#f0bc7f] px-4 py-2 text-sm font-medium text-[#161008]">
                    Continue: {next.short}
                  </Link>
                ) : (
                  <span className="text-sm text-white/45">Final step reached</span>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
