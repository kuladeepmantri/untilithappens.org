'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
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

type StepQuality = {
  impact: number;
  confidence: number;
  readiness: number;
};

const assistByHref: Record<string, StepAssist> = {
  '/': {
    objective: 'Understand the flow and select a starting point without guesswork.',
    actions: [
      'Scan one current threat signal before choosing a path.',
      'Pick one immediate track: triage, exposure audit, or hardening.',
      'Use the guide only when needed so the page stays clean.',
    ],
    checkpoint: 'You can explain your first action in one sentence.',
  },
  '/threats': {
    objective: 'Triage suspicious activity before any interaction happens.',
    actions: [
      'Match what you received to the closest live scenario.',
      'Run Observe, Verify, Contain, and Report in order.',
      'Collect evidence before deleting anything.',
    ],
    checkpoint: 'You can classify and contain a suspicious message quickly.',
  },
  '/check-footprint': {
    objective: 'Reduce exposed personal data used for targeting and fraud.',
    actions: [
      'Complete discovery before taking cleanup actions.',
      'Prioritize high-risk identifiers first.',
      'Set a repeat cadence so exposure does not drift back.',
    ],
    checkpoint: 'You can run one full discover-prioritize-reduce cycle.',
  },
  '/protect': {
    objective: 'Harden your primary platform in an actionable sequence.',
    actions: [
      'Apply baseline controls before optional hardening.',
      'Confirm recovery readiness and trusted backup access.',
      'Validate each control with official vendor guidance.',
    ],
    checkpoint: 'Your device and accounts are hardened and recoverable.',
  },
  '/learn': {
    objective: 'Turn one-time fixes into repeatable security behavior.',
    actions: [
      'Finish one module end-to-end before switching context.',
      'Run one lab and apply one real-world correction.',
      'Set weekly and monthly habit checkpoints.',
    ],
    checkpoint: 'You now have a routine that is practical under pressure.',
  },
  '/real-stories': {
    objective: 'Extract controls from real incidents and apply them fast.',
    actions: [
      'Map each story from trigger to missed control.',
      'Identify one similar gap in your own setup.',
      'Apply one preventive control immediately.',
    ],
    checkpoint: 'You can explain one failure chain and its prevention control.',
  },
  '/get-help': {
    objective: 'Contain active incidents with first-hour precision.',
    actions: [
      'Execute the 0-15 minute actions before deeper analysis.',
      'Build an evidence package in the first hour.',
      'Escalate through official channels only.',
    ],
    checkpoint: 'You can execute first-hour incident response without confusion.',
  },
  '/report': {
    objective: 'File complete incident reports with clean evidence context.',
    actions: [
      'Match incident type to the right reporting endpoint.',
      'Include timestamps, identifiers, and supporting artifacts.',
      'Preserve continuity for follow-up and case tracking.',
    ],
    checkpoint: 'Your report is complete and actionable for investigators.',
  },
  '/community': {
    objective: 'Contribute practical improvements backed by evidence.',
    actions: [
      'Submit one clarity improvement from actual usage.',
      'Attach one source-backed reference.',
      'Document one confusion point and proposed fix.',
    ],
    checkpoint: 'Your contribution improves guidance quality for others.',
  },
};

const qualityByHref: Record<string, StepQuality> = {
  '/': { impact: 72, confidence: 86, readiness: 64 },
  '/threats': { impact: 91, confidence: 89, readiness: 78 },
  '/check-footprint': { impact: 88, confidence: 84, readiness: 75 },
  '/protect': { impact: 93, confidence: 87, readiness: 82 },
  '/learn': { impact: 79, confidence: 83, readiness: 88 },
  '/real-stories': { impact: 81, confidence: 85, readiness: 76 },
  '/get-help': { impact: 95, confidence: 90, readiness: 80 },
  '/report': { impact: 86, confidence: 88, readiness: 79 },
  '/community': { impact: 70, confidence: 82, readiness: 74 },
};

const STEP_COLORS = [0x8db1c8, 0x7eaec9, 0x87a9c4, 0x9eb8d1, 0x86a6bd, 0x98acc3, 0xb49e86, 0xc2a07b, 0x9eb0c6];
const DONE_KEY = 'uih_journey_done_v3';

export function JourneyDock() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentIndex = useMemo(() => resolveStepIndex(pathname), [pathname]);

  const [showGreeting, setShowGreeting] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetColorRef = useRef(new THREE.Color(STEP_COLORS[0]));
  const liveColorRef = useRef(new THREE.Color(STEP_COLORS[0]));
  const animationRef = useRef({ raf: 0, tick: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const greetingKey = 'uih_greeting_seen_v5';
    if (!window.sessionStorage.getItem(greetingKey)) {
      setShowGreeting(true);
    }

    const storedDone = window.localStorage.getItem(DONE_KEY);
    if (!storedDone) {
      return;
    }

    try {
      const parsed = JSON.parse(storedDone) as Record<string, boolean>;
      setDoneMap(parsed);
    } catch {
      setDoneMap({});
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
    guideJourney.forEach((step) => {
      router.prefetch(step.href);
    });
  }, [router]);

  useEffect(() => {
    if (currentIndex === -1) {
      return;
    }
    targetColorRef.current.setHex(STEP_COLORS[currentIndex % STEP_COLORS.length]);
  }, [currentIndex]);

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
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, 0.04, 4.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    scene.add(new THREE.AmbientLight(0xffffff, 0.76));

    const keyLight = new THREE.PointLight(0x8db1c8, 1.1, 30);
    keyLight.position.set(-3, 3, 6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x7b8da3, 0.6, 26);
    fillLight.position.set(3, -1, 5);
    scene.add(fillLight);

    const coreGeometry = new THREE.IcosahedronGeometry(0.72, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x8db1c8,
      emissive: 0x35566d,
      emissiveIntensity: 0.76,
      roughness: 0.34,
      metalness: 0.2,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const shellGeometry = new THREE.IcosahedronGeometry(1.03, 1);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0x8db1c8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    scene.add(shell);

    const ringGeometry = new THREE.TorusGeometry(1.34, 0.03, 10, 84);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x8db1c8,
      emissive: 0x344f66,
      emissiveIntensity: 0.44,
      roughness: 0.42,
      metalness: 0.16,
      transparent: true,
      opacity: 0.84,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);

    for (let index = 0; index < particleCount; index += 1) {
      phases[index] = Math.random() * Math.PI * 2;
      radii[index] = 1.12 + Math.random() * 0.44;
      const angle = phases[index];
      positions[index * 3] = Math.cos(angle) * radii[index];
      positions[index * 3 + 1] = Math.sin(angle * 1.7) * 0.18;
      positions[index * 3 + 2] = Math.sin(angle) * radii[index];
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xbfd1e2,
      size: 0.032,
      transparent: true,
      opacity: 0.76,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const whiteTint = new THREE.Color(0xffffff);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    const animationState = animationRef.current;

    const animate = () => {
      animationState.tick += 0.015;
      const tick = animationState.tick;

      liveColorRef.current.lerp(targetColorRef.current, 0.05);

      coreMaterial.color.copy(liveColorRef.current);
      coreMaterial.emissive.copy(liveColorRef.current).multiplyScalar(0.42);

      shellMaterial.color.copy(liveColorRef.current);

      ringMaterial.color.copy(liveColorRef.current);
      ringMaterial.color.lerp(whiteTint, 0.2);
      ringMaterial.emissive.copy(liveColorRef.current).multiplyScalar(0.26);

      particleMaterial.color.copy(liveColorRef.current);
      particleMaterial.color.lerp(whiteTint, 0.32);

      const corePulse = 1 + Math.sin(tick * 2.5) * 0.06;
      core.scale.setScalar(corePulse);
      shell.scale.setScalar(1 + Math.sin(tick * 2.5 + 0.7) * 0.04);

      core.rotation.x += 0.005;
      core.rotation.y += 0.006;
      shell.rotation.x -= 0.0027;
      shell.rotation.y += 0.0031;

      ring.rotation.z += 0.009;
      ring.rotation.x = Math.PI / 2 + Math.sin(tick * 0.6) * 0.05;

      const positionAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let index = 0; index < particleCount; index += 1) {
        const angle = phases[index] + tick * (0.38 + (index % 6) * 0.028);
        const radius = radii[index] + Math.sin(tick * 1.2 + index * 0.07) * 0.05;
        positionAttr.setXYZ(index, Math.cos(angle) * radius, Math.sin(angle * 1.8 + tick * 0.5) * 0.16, Math.sin(angle) * radius);
      }
      positionAttr.needsUpdate = true;

      camera.position.y = Math.sin(tick * 0.45) * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationState.raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationState.raf);
      window.removeEventListener('resize', resize);

      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  if (currentIndex === -1) {
    return null;
  }

  const currentStep = guideJourney[currentIndex];
  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  const assist =
    assistByHref[currentStep.href] ?? {
      objective: currentStep.intent,
      actions: ['Review this step and continue to the next section.'],
      checkpoint: 'You can explain the next action clearly.',
    };

  const quality = qualityByHref[currentStep.href] ?? {
    impact: 75,
    confidence: 80,
    readiness: 72,
  };

  const completedCount = guideJourney.reduce((total, step) => total + (doneMap[step.href] ? 1 : 0), 0);
  const completionPercent = Math.round((completedCount / guideJourney.length) * 100);
  const isCurrentStepDone = Boolean(doneMap[currentStep.href]);

  const setGreetingSeen = () => {
    setShowGreeting(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('uih_greeting_seen_v5', '1');
    }
  };

  const navigateTo = (href: string, shouldMarkCurrentDone = false) => {
    if (isPending) {
      return;
    }

    if (shouldMarkCurrentDone) {
      setDoneMap((previousMap) => ({ ...previousMap, [currentStep.href]: true }));
    }

    setIsMinimized(true);
    startTransition(() => {
      router.push(href, { scroll: false });
    });
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
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/72 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#0a1016] p-6"
            >
              <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Welcome</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Guided mode is ready</h2>
              <p className="mt-3 text-sm text-white/75">
                You get a step-by-step path for threats, footprint, protection, and response. The guide stays minimized on
                every page until you open it.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGreetingSeen();
                    navigateTo('/threats');
                  }}
                  className="rounded-md bg-[#d9a567] px-4 py-2 text-sm font-medium text-[#12100c]"
                >
                  Start with threats
                </button>
                <button
                  type="button"
                  onClick={setGreetingSeen}
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
          className={`pointer-events-auto mx-auto w-full rounded-2xl border border-white/20 bg-[#0a1016]/95 shadow-[0_16px_34px_rgba(0,0,0,0.42)] backdrop-blur-sm ${
            isMinimized
              ? 'max-w-5xl p-2.5 sm:p-3'
              : 'max-w-5xl max-h-[72svh] overflow-y-auto p-3 sm:p-4'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#091018]">
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.26, 0.58, 0.26], scale: [1, 1.14, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0 rounded-full border border-[#8db1c8]/40"
                />
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>

              <div className="min-w-0">
                <p className="font-ui-mono text-[11px] uppercase tracking-[0.2em] text-white/58">Guided journey</p>
                <p className="truncate text-xs text-white/80">
                  Step {currentIndex + 1} of {guideJourney.length}: {currentStep.short}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMinimized((previousValue) => !previousValue)}
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/85 hover:bg-white/10"
              >
                {isMinimized ? 'Open' : 'Minimize'}
              </button>
              {!isMinimized && next && (
                <button
                  type="button"
                  onClick={() => navigateTo(next.href, true)}
                  disabled={isPending}
                  className="rounded-md bg-[#d9a567] px-3 py-1.5 text-xs font-medium text-[#12100c] disabled:opacity-60"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {!isMinimized && (
              <motion.div
                key={currentStep.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="mt-3"
              >
                <p className="text-sm leading-relaxed text-white/84">{assist.objective}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
                  <span className="rounded-full border border-white/16 px-3 py-1">Progress {completionPercent}%</span>
                  <span className="rounded-full border border-white/16 px-3 py-1">Impact {quality.impact}/100</span>
                  <span className="rounded-full border border-white/16 px-3 py-1">Signal confidence {quality.confidence}/100</span>
                  <span className="rounded-full border border-white/16 px-3 py-1">Readiness {quality.readiness}/100</span>
                  <span className={`rounded-full border px-3 py-1 ${isCurrentStepDone ? 'border-[#8f775a]/80 text-white/90' : 'border-white/16 text-white/70'}`}>
                    Current step {isCurrentStepDone ? 'done' : 'open'}
                  </span>
                </div>

                <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
                  {assist.actions.map((item, index) => (
                    <li key={item} className="flex items-start gap-3 py-2.5 text-sm text-white/80">
                      <span className="mt-[1px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] text-white/72">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-3 text-sm text-white/72">Checkpoint: {assist.checkpoint}</p>

                <div className="mt-3 overflow-x-auto">
                  <div className="flex min-w-max gap-2 pb-1">
                    {guideJourney.map((step, index) => {
                      const isCurrent = index === currentIndex;
                      const isDone = doneMap[step.href];
                      return (
                        <button
                          type="button"
                          key={step.href}
                          onClick={() => navigateTo(step.href, index > currentIndex)}
                          disabled={isPending}
                          className={`rounded-full border px-3 py-1.5 text-xs transition ${
                            isCurrent
                              ? 'border-[#8db1c8] bg-[#182432] text-white'
                              : isDone
                                ? 'border-[#8f775a]/60 text-white/72 hover:border-[#8f775a]'
                                : 'border-white/20 text-white/70 hover:border-white/35 hover:text-white'
                          }`}
                        >
                          {step.short}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {previous ? (
                      <button
                        type="button"
                        onClick={() => navigateTo(previous.href)}
                        disabled={isPending}
                        className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/84 hover:bg-white/10"
                      >
                        Back: {previous.short}
                      </button>
                    ) : (
                      <span className="text-xs text-white/45">Journey start</span>
                    )}

                    <button
                      type="button"
                      onClick={toggleCurrentDone}
                      disabled={isPending}
                      className={`rounded-md border px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-60 ${
                        isCurrentStepDone ? 'border-[#8f775a]/70 text-white' : 'border-white/20 text-white/84'
                      }`}
                    >
                      {isCurrentStepDone ? 'Mark not done' : 'Mark done'}
                    </button>

                    <button
                      type="button"
                      onClick={resetProgress}
                      disabled={isPending}
                      className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/84 hover:bg-white/10 disabled:opacity-60"
                    >
                      Reset
                    </button>
                  </div>

                  {next ? (
                    <button
                      type="button"
                      onClick={() => navigateTo(next.href, true)}
                      disabled={isPending}
                      className="rounded-md bg-[#d9a567] px-4 py-2 text-xs font-medium text-[#12100c] disabled:opacity-60"
                    >
                      {isPending ? 'Loading...' : `Continue: ${next.short}`}
                    </button>
                  ) : (
                    <span className="text-xs text-white/45">Final step reached</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}
