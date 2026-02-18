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

type MarkerBundle = {
  marker: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  ring: THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>;
  spoke: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
};

const assistByHref: Record<string, StepAssist> = {
  '/': {
    objective: 'Understand the flow and choose your first guided entry point.',
    actions: [
      'Scan one current signal to calibrate risk.',
      'Pick a path: threats, help, or prevention.',
      'Keep the guide minimized or expand when needed.',
    ],
    checkpoint: 'You can choose a clear starting action in under 2 minutes.',
  },
  '/threats': {
    objective: 'Triage suspicious activity before interacting with it.',
    actions: [
      'Match what you see to the closest scenario.',
      'Move through Observe -> Verify -> Contain -> Report.',
      'Preserve evidence before cleanup.',
    ],
    checkpoint: 'You can classify and respond to a suspicious message fast.',
  },
  '/check-footprint': {
    objective: 'Reduce exposed identity data that enables targeted attacks.',
    actions: [
      'Finish Discover before moving to Prioritize.',
      'Handle high-risk identifiers first.',
      'Set a repeat cleanup schedule.',
    ],
    checkpoint: 'You can run one complete exposure cleanup cycle.',
  },
  '/protect': {
    objective: 'Harden your primary platform in a complete sequence.',
    actions: [
      'Apply essentials first, then hardening controls.',
      'Validate recovery readiness before leaving this step.',
      'Use official vendor links for verification.',
    ],
    checkpoint: 'Your primary device is hardened and recoverable.',
  },
  '/learn': {
    objective: 'Turn one-time fixes into habits that survive stress.',
    actions: [
      'Complete one module fully.',
      'Run the password lab and act on gaps.',
      'Schedule weekly and monthly cadence tasks.',
    ],
    checkpoint: 'You have a practical repeatable security routine.',
  },
  '/real-stories': {
    objective: 'Extract prevention controls from real failure patterns.',
    actions: [
      'Read one story from trigger to control.',
      'Map the missed checkpoint to your setup.',
      'Adopt one control immediately.',
    ],
    checkpoint: 'You can explain one realistic failure chain and fix.',
  },
  '/get-help': {
    objective: 'Contain active incidents in the right order and timing.',
    actions: [
      'Run 0-15 minute actions first.',
      'Build evidence package in the first hour.',
      'Use official channels for escalation.',
    ],
    checkpoint: 'You can execute first-hour response without confusion.',
  },
  '/report': {
    objective: 'Submit complete, high-quality reports to the right endpoint.',
    actions: [
      'Match incident type to reporting matrix.',
      'Include timestamps, IDs, and case links.',
      'Preserve continuity for follow-up.',
    ],
    checkpoint: 'Your report is clear, complete, and actionable.',
  },
  '/community': {
    objective: 'Contribute practical improvements backed by evidence.',
    actions: [
      'Submit one clarity improvement.',
      'Attach one primary-source citation.',
      'Document one confusion point from real use.',
    ],
    checkpoint: 'Your contribution improves real user outcomes.',
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

const DONE_KEY = 'uih_journey_done_v2';

export function JourneyDock() {
  const pathname = usePathname();
  const currentIndex = useMemo(() => resolveStepIndex(pathname), [pathname]);

  const [showGreeting, setShowGreeting] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markersRef = useRef<MarkerBundle[]>([]);
  const ringGroupRef = useRef<THREE.Group | null>(null);
  const beamRef = useRef<THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> | null>(null);
  const coreRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null>(null);
  const haloRef = useRef<THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial> | null>(null);
  const orbiterPointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null>(null);
  const orbiterPhaseRef = useRef<Float32Array>(new Float32Array(0));

  const activeIndexRef = useRef(currentIndex === -1 ? 0 : currentIndex);
  const animationRef = useRef({ raf: 0, tick: 0, rotationY: 0, targetRotationY: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const greetingKey = 'uih_greeting_seen_v4';
    if (!window.sessionStorage.getItem(greetingKey)) {
      setShowGreeting(true);
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
    window.localStorage.setItem(DONE_KEY, JSON.stringify(doneMap));
  }, [doneMap]);

  useEffect(() => {
    setIsMinimized(true);
  }, [pathname]);

  useEffect(() => {
    if (isMinimized) {
      return;
    }

    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) {
      return;
    }

    const stepCount = guideJourney.length;
    const radius = 2.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 90);
    camera.position.set(0, 1.45, 6.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));

    const keyLight = new THREE.PointLight(0x8eb5d7, 0.9, 40);
    keyLight.position.set(-4, 4, 6);
    const fillLight = new THREE.PointLight(0x6e7f95, 0.7, 36);
    fillLight.position.set(4, 2, 6);
    scene.add(keyLight, fillLight);

    const ringGroup = new THREE.Group();
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;

    const outerRingGeometry = new THREE.TorusGeometry(radius, 0.04, 12, 160);
    const outerRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b5f75,
      emissive: 0x263547,
      emissiveIntensity: 0.42,
      roughness: 0.35,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    outerRing.rotation.x = Math.PI / 2;
    ringGroup.add(outerRing);

    for (let index = 0; index < stepCount; index += 1) {
      const angle = (index / stepCount) * Math.PI * 2;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 2.1) * 0.12,
        Math.sin(angle) * radius
      );

      const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const markerMaterial = new THREE.MeshStandardMaterial({
        color: 0x6f8198,
        emissive: 0x2a3442,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.2,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      ringGroup.add(marker);

      const nodeRingGeometry = new THREE.TorusGeometry(0.18, 0.01, 8, 24);
      const nodeRingMaterial = new THREE.MeshStandardMaterial({
        color: 0x5f7289,
        emissive: 0x24303f,
        emissiveIntensity: 0.16,
        roughness: 0.45,
        metalness: 0.2,
      });
      const nodeRing = new THREE.Mesh(nodeRingGeometry, nodeRingMaterial);
      nodeRing.position.copy(position);
      nodeRing.rotation.x = Math.PI / 2;
      ringGroup.add(nodeRing);

      const spokeGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), position]);
      const spokeMaterial = new THREE.LineBasicMaterial({
        color: 0x364557,
        transparent: true,
        opacity: 0.45,
      });
      const spoke = new THREE.Line(spokeGeometry, spokeMaterial);
      ringGroup.add(spoke);

      markersRef.current.push({ marker, ring: nodeRing, spoke });
    }

    const beamGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(radius, 0, 0)]);
    const beamMaterial = new THREE.LineBasicMaterial({
      color: 0xf0bc7f,
      transparent: true,
      opacity: 0.86,
    });
    const beam = new THREE.Line(beamGeometry, beamMaterial);
    ringGroup.add(beam);
    beamRef.current = beam;

    const coreGeometry = new THREE.SphereGeometry(0.22, 18, 18);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xa2bfdc,
      emissive: 0x5d7897,
      emissiveIntensity: 0.75,
      roughness: 0.25,
      metalness: 0.2,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);
    coreRef.current = core;

    const haloGeometry = new THREE.TorusGeometry(0.42, 0.015, 10, 48);
    const haloMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7d9ea,
      emissive: 0x627e99,
      emissiveIntensity: 0.48,
      roughness: 0.4,
      metalness: 0.15,
      transparent: true,
      opacity: 0.8,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2;
    scene.add(halo);
    haloRef.current = halo;

    const orbiterCount = 46;
    const orbiterPositions = new Float32Array(orbiterCount * 3);
    const orbiterPhases = new Float32Array(orbiterCount);
    for (let index = 0; index < orbiterCount; index += 1) {
      orbiterPhases[index] = Math.random();
      const angle = orbiterPhases[index] * Math.PI * 2;
      orbiterPositions[index * 3] = Math.cos(angle) * radius;
      orbiterPositions[index * 3 + 1] = 0;
      orbiterPositions[index * 3 + 2] = Math.sin(angle) * radius;
    }
    orbiterPhaseRef.current = orbiterPhases;

    const orbiterGeometry = new THREE.BufferGeometry();
    orbiterGeometry.setAttribute('position', new THREE.BufferAttribute(orbiterPositions, 3));
    const orbiterMaterial = new THREE.PointsMaterial({
      color: 0xcad8e7,
      size: 0.035,
      transparent: true,
      opacity: 0.72,
    });
    const orbiterPoints = new THREE.Points(orbiterGeometry, orbiterMaterial);
    ringGroup.add(orbiterPoints);
    orbiterPointsRef.current = orbiterPoints;

    activeIndexRef.current = currentIndex === -1 ? 0 : currentIndex;
    const stepAngle = (Math.PI * 2) / stepCount;
    animationRef.current.rotationY = 0;
    animationRef.current.targetRotationY = Math.PI / 2 - activeIndexRef.current * stepAngle;

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

    const animate = () => {
      animationState.tick += 0.012;
      const tick = animationState.tick;

      animationState.rotationY += (animationState.targetRotationY - animationState.rotationY) * 0.08;
      ringGroup.rotation.y = animationState.rotationY;
      ringGroup.rotation.x = Math.sin(tick * 0.45) * 0.04;

      const activeIndex = activeIndexRef.current;
      const nextIndex = Math.min(activeIndex + 1, stepCount - 1);

      markersRef.current.forEach((bundle, index) => {
        const isCurrent = index === activeIndex;
        const isNext = index === nextIndex && nextIndex !== activeIndex;
        const isPast = index < activeIndex;

        bundle.marker.material.color.setHex(isCurrent ? 0xbfd7f1 : isNext ? 0xf0bc7f : isPast ? 0xc38f5d : 0x6f8198);
        bundle.marker.material.emissive.setHex(isCurrent ? 0x58779a : isNext ? 0x7d6141 : isPast ? 0x654a34 : 0x2a3442);
        bundle.marker.material.emissiveIntensity = isCurrent ? 0.78 : isNext ? 0.58 : isPast ? 0.34 : 0.2;

        bundle.ring.material.color.setHex(isCurrent ? 0xcddff0 : isNext ? 0xf0bc7f : isPast ? 0xc38f5d : 0x5f7289);
        bundle.ring.material.emissive.setHex(isCurrent ? 0x4f6784 : isNext ? 0x705339 : isPast ? 0x5e432f : 0x24303f);
        bundle.ring.material.emissiveIntensity = isCurrent ? 0.5 : isNext ? 0.4 : isPast ? 0.24 : 0.16;

        const pulse = isCurrent ? 1 + Math.sin(tick * 4.2) * 0.08 : isNext ? 1 + Math.sin(tick * 3.4) * 0.05 : 1;
        bundle.marker.scale.setScalar(pulse);
        bundle.ring.scale.setScalar(pulse);

        bundle.spoke.material.color.setHex(isPast || isCurrent ? 0x70839b : 0x364557);
        bundle.spoke.material.opacity = isPast || isCurrent ? 0.72 : 0.45;
      });

      if (beamRef.current) {
        const beam = beamRef.current;
        const target = markersRef.current[nextIndex]?.marker.position ?? new THREE.Vector3(radius, 0, 0);
        const beamPositions = beam.geometry.getAttribute('position') as THREE.BufferAttribute;
        beamPositions.setXYZ(0, 0, 0, 0);
        beamPositions.setXYZ(1, target.x * 0.98, target.y * 0.98, target.z * 0.98);
        beamPositions.needsUpdate = true;
        beam.material.opacity = 0.68 + Math.sin(tick * 4.4) * 0.18;
      }

      if (coreRef.current) {
        const pulse = 1 + Math.sin(tick * 3.1) * 0.04;
        coreRef.current.scale.setScalar(pulse);
      }

      if (haloRef.current) {
        const pulse = 1 + Math.sin(tick * 2.2) * 0.09;
        haloRef.current.scale.setScalar(pulse);
        haloRef.current.material.opacity = 0.62 + Math.sin(tick * 2.8) * 0.12;
      }

      const orbiters = orbiterPointsRef.current;
      if (orbiters) {
        const positions = orbiters.geometry.getAttribute('position') as THREE.BufferAttribute;
        const phases = orbiterPhaseRef.current;
        for (let index = 0; index < phases.length; index += 1) {
          phases[index] += 0.0035 + (index % 4) * 0.0003;
          if (phases[index] > 1) {
            phases[index] -= 1;
          }
          const angle = phases[index] * Math.PI * 2;
          const localRadius = radius + Math.sin((phases[index] + tick * 0.08) * Math.PI * 4) * 0.08;
          positions.setXYZ(index, Math.cos(angle) * localRadius, Math.sin(angle * 2 + tick * 0.5) * 0.08, Math.sin(angle) * localRadius);
        }
        positions.needsUpdate = true;
      }

      camera.position.x = Math.sin(tick * 0.19) * 0.22;
      camera.position.y = 1.45 + Math.cos(tick * 0.15) * 0.09;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationState.raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationState.raf);
      window.removeEventListener('resize', resize);

      outerRingGeometry.dispose();
      outerRingMaterial.dispose();
      beamGeometry.dispose();
      beamMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      orbiterGeometry.dispose();
      orbiterMaterial.dispose();

      markersRef.current.forEach((bundle) => {
        bundle.marker.geometry.dispose();
        bundle.marker.material.dispose();
        bundle.ring.geometry.dispose();
        bundle.ring.material.dispose();
        bundle.spoke.geometry.dispose();
        bundle.spoke.material.dispose();
      });
      markersRef.current = [];

      renderer.dispose();
      ringGroupRef.current = null;
      beamRef.current = null;
      coreRef.current = null;
      haloRef.current = null;
      orbiterPointsRef.current = null;
    };
  }, [currentIndex, isMinimized]);

  useEffect(() => {
    if (currentIndex === -1) {
      return;
    }

    activeIndexRef.current = currentIndex;
    const stepAngle = (Math.PI * 2) / guideJourney.length;
    const desired = Math.PI / 2 - currentIndex * stepAngle;

    const currentRotation = animationRef.current.rotationY;
    let delta = desired - currentRotation;
    while (delta > Math.PI) {
      delta -= Math.PI * 2;
    }
    while (delta < -Math.PI) {
      delta += Math.PI * 2;
    }
    animationRef.current.targetRotationY = currentRotation + delta;
  }, [currentIndex]);

  if (currentIndex === -1) {
    return null;
  }

  const currentStep = guideJourney[currentIndex];
  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  const assist = assistByHref[currentStep.href] ?? {
    objective: currentStep.intent,
    actions: ['Review this step and continue to the next one.'],
    checkpoint: 'You can explain the immediate next action.',
  };

  const completedCount = guideJourney.reduce((total, step) => total + (doneMap[step.href] ? 1 : 0), 0);
  const completionPercent = Math.round((completedCount / guideJourney.length) * 100);
  const remainingMinutes = guideJourney
    .slice(currentIndex)
    .reduce((total, step) => total + (etaMinutes[step.href] ?? 8), 0);

  const markCurrentDone = () => {
    setDoneMap((previousMap) => ({ ...previousMap, [currentStep.href]: true }));
  };

  const toggleCurrentDone = () => {
    setDoneMap((previousMap) => ({ ...previousMap, [currentStep.href]: !previousMap[currentStep.href] }));
  };

  const resetProgress = () => {
    setDoneMap({});
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
                This site walks you page-by-page through threats, exposure, protection, and response. The guide starts
                minimized by default and expands when you need detail.
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
            isMinimized ? 'p-2.5 sm:p-3' : 'max-h-[70svh] overflow-y-auto p-3 sm:p-4'
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
                onClick={() => setIsMinimized((previousValue) => !previousValue)}
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/85 hover:bg-white/10"
              >
                {isMinimized ? 'Expand' : 'Minimize'}
              </button>
              {next && (
                <Link
                  href={next.href}
                  onClick={markCurrentDone}
                  className="rounded-md bg-[#f0bc7f] px-3 py-1.5 text-xs font-medium text-[#161008]"
                >
                  Continue
                </Link>
              )}
            </div>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#7f9ab3]" style={{ width: `${completionPercent}%` }} />
          </div>

          {isMinimized ? (
            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-white/75">
              <span>{completedCount}/{guideJourney.length} steps done</span>
              <span>{remainingMinutes} min remaining</span>
            </div>
          ) : (
            <>
              <div className="mt-3 grid gap-3 xl:grid-cols-[260px,1fr]">
                <div className="rounded-xl border border-white/14 bg-[#0f1722] p-3">
                  <p className="font-ui-mono text-[11px] uppercase tracking-[0.18em] text-white/58">3D mission compass</p>
                  <div className="mt-2 h-44 overflow-hidden rounded-lg border border-white/15 bg-[#070c12]">
                    <canvas ref={canvasRef} className="h-full w-full" />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-white/72">
                    <span className="rounded-md border border-[#c38f5d]/45 bg-[#2a2117] px-2 py-1 text-center">done</span>
                    <span className="rounded-md border border-[#bdd7f3]/45 bg-[#1f2f40] px-2 py-1 text-center">current</span>
                    <span className="rounded-md border border-[#f0bc7f]/45 bg-[#2b2014] px-2 py-1 text-center">next</span>
                  </div>
                </div>

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

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-md border border-white/10 bg-[#111a27] px-3 py-2 text-xs text-white/75">
                      Learning checkpoint: {assist.checkpoint}
                    </div>
                    <div className="rounded-md border border-white/10 bg-[#111a27] px-3 py-2 text-xs text-white/75">
                      Remaining estimate: {remainingMinutes} minutes
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={toggleCurrentDone}
                      className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/84 hover:bg-white/10"
                    >
                      {doneMap[currentStep.href] ? 'Mark as not done' : 'Mark step done'}
                    </button>
                    <button
                      type="button"
                      onClick={resetProgress}
                      className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/84 hover:bg-white/10"
                    >
                      Reset progress
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 overflow-x-auto">
                <div className="flex min-w-max gap-2 pb-1">
                  {guideJourney.map((step, index) => {
                    const isCurrent = index === currentIndex;
                    const isDone = doneMap[step.href] || index < currentIndex;
                    const isUpcoming = index === Math.min(currentIndex + 1, guideJourney.length - 1);
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
                            : isUpcoming
                              ? 'border-[#f0bc7f]/65 bg-[#2b2014] text-white/90'
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
