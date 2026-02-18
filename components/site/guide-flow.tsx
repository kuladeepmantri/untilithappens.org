'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, Sparkles, X } from 'lucide-react';
import * as THREE from 'three';
import { guideJourney } from '@/lib/site-data';
import { cn } from '@/lib/utils';

type JourneyNodeMesh = THREE.Mesh<
  THREE.IcosahedronGeometry,
  THREE.MeshStandardMaterial
> & { userData: { href: string } };

type HaloMesh = THREE.Mesh<
  THREE.TorusGeometry,
  THREE.MeshBasicMaterial
>;

type FlowOrb = {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  offset: number;
  speed: number;
};

export function GuideFlow() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = guideJourney.findIndex((step) => step.href === pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const progress = (currentIndex / Math.max(guideJourney.length - 1, 1)) * 100;
  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const points = useMemo(() => {
    const spread = isMobile ? 2.15 : 2.75;
    const vertical = isMobile ? 1.06 : 1.35;
    const depth = isMobile ? 0.92 : 1.18;
    const offset = (guideJourney.length - 1) / 2;

    return guideJourney.map((_, index) => {
      const x = (index - offset) * spread;
      const y = Math.sin(index * 0.73) * vertical;
      const z = Math.cos(index * 0.48) * depth;
      return new THREE.Vector3(x, y, z);
    });
  }, [isMobile]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || currentIndex === -1) {
      return;
    }

    setRenderError(false);

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050d12, 18, 56);

    const camera = new THREE.PerspectiveCamera(isMobile ? 52 : 42, 1, 0.1, 100);
    camera.position.set(0, 1.75, isMobile ? 18 : 20);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setRenderError(true);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.6 : 2));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasNext = currentIndex < guideJourney.length - 1;
    const fromT = currentIndex / Math.max(guideJourney.length - 1, 1);
    const toT = hasNext
      ? (currentIndex + 1) / Math.max(guideJourney.length - 1, 1)
      : Math.min(0.99, fromT + 0.08);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const topLight = new THREE.PointLight(0x8ec9bc, 1.45, 85);
    topLight.position.set(-10, 10, 12);
    const warmLight = new THREE.PointLight(0xd7ab73, 1.1, 90);
    warmLight.position.set(12, -4, 10);
    scene.add(ambient, topLight, warmLight);

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.38);

    const tubeGeometry = new THREE.TubeGeometry(curve, 380, isMobile ? 0.08 : 0.07, 14, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f7f8d,
      emissive: 0x264651,
      emissiveIntensity: 0.44,
      roughness: 0.44,
      metalness: 0.22,
      transparent: true,
      opacity: 0.74,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);

    const completedPoints = curve.getPoints(Math.max(2, Math.floor((progress / 100) * 380)));
    const completedGeometry = new THREE.BufferGeometry().setFromPoints(completedPoints);
    const completedMaterial = new THREE.LineBasicMaterial({
      color: 0xd7ab73,
      transparent: true,
      opacity: 0.95,
    });
    const completedLine = new THREE.Line(completedGeometry, completedMaterial);
    scene.add(completedLine);

    const knotGeometry = new THREE.TorusKnotGeometry(2.45, 0.14, 220, 20);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x284552,
      emissive: 0x1b2f38,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.46,
      roughness: 0.52,
      metalness: 0.26,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    knot.position.set(0, -3.2, -5.5);
    scene.add(knot);

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = isMobile ? 140 : 220;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      dustPositions[index * 3] = (Math.random() - 0.5) * 46;
      dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 16;
      dustPositions[index * 3 + 2] = -7 - Math.random() * 14;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x90b8c2,
      size: isMobile ? 0.06 : 0.05,
      transparent: true,
      opacity: 0.44,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const nodeMeshes: JourneyNodeMesh[] = [];
    const halos: HaloMesh[] = [];

    points.forEach((point, index) => {
      const done = index < currentIndex;
      const current = index === currentIndex;
      const color = done ? 0xd7ab73 : current ? 0x9ee0d1 : 0x5d7681;

      const nodeGeometry = new THREE.IcosahedronGeometry(current ? 0.27 : 0.22, 1);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: current ? 0.76 : done ? 0.38 : 0.16,
        roughness: 0.28,
        metalness: 0.3,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial) as JourneyNodeMesh;
      node.position.copy(point);
      node.userData.href = guideJourney[index].href;
      scene.add(node);
      nodeMeshes.push(node);

      const haloGeometry = new THREE.TorusGeometry(current ? 0.4 : 0.33, 0.012, 16, 60);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: current ? 0.95 : 0.6,
      });
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.position.copy(point);
      halo.rotation.x = Math.PI / 2;
      scene.add(halo);
      halos.push(halo);
    });

    const markerGeometry = new THREE.SphereGeometry(0.14, 18, 18);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe7c7,
      emissive: 0xd7ab73,
      emissiveIntensity: 0.82,
      roughness: 0.12,
      metalness: 0.2,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    scene.add(marker);

    const flowOrbGeometry = new THREE.SphereGeometry(0.06, 10, 10);
    const flowOrbs: FlowOrb[] = [];
    const orbCount = isMobile ? 16 : 24;

    for (let index = 0; index < orbCount; index += 1) {
      const material = new THREE.MeshStandardMaterial({
        color: index % 2 === 0 ? 0xbcefe0 : 0xd7ab73,
        emissive: index % 2 === 0 ? 0x76c6bb : 0xd7ab73,
        emissiveIntensity: 0.45,
        roughness: 0.22,
        metalness: 0.12,
      });
      const mesh = new THREE.Mesh(flowOrbGeometry, material);
      scene.add(mesh);
      flowOrbs.push({
        mesh,
        offset: index / orbCount,
        speed: 0.045 + Math.random() * 0.03,
      });
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const toLocalPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const findTarget = () => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);
      return hits[0]?.object as JourneyNodeMesh | undefined;
    };

    const onPointerMove = (event: PointerEvent) => {
      toLocalPointer(event);
      canvas.style.cursor = findTarget() ? 'pointer' : 'default';
    };

    const onPointerDown = (event: PointerEvent) => {
      toLocalPointer(event);
      const target = findTarget();
      if (target?.userData.href) {
        setIsOpen(false);
        router.push(target.userData.href);
      }
    };

    const onPointerLeave = () => {
      canvas.style.cursor = 'default';
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerleave', onPointerLeave);

    let raf = 0;
    let tick = 0;
    const tempPoint = new THREE.Vector3();

    const animate = () => {
      tick += reducedMotion ? 0.0025 : 0.0085;

      const markerT = reducedMotion
        ? fromT
        : fromT + (Math.sin(tick * 2.2) * 0.5 + 0.5) * (toT - fromT);
      curve.getPointAt(Math.min(0.99, markerT), marker.position);

      const orbitRadius = reducedMotion ? 0.2 : isMobile ? 0.9 : 1.35;
      camera.position.x = Math.sin(tick * 0.44) * orbitRadius;
      camera.position.y = 1.7 + Math.cos(tick * 0.31) * (reducedMotion ? 0.08 : 0.34);
      camera.lookAt(0, 0, 0);

      knot.rotation.x += reducedMotion ? 0.0004 : 0.0021;
      knot.rotation.y += reducedMotion ? 0.0005 : 0.0028;
      dust.rotation.y += reducedMotion ? 0.0001 : 0.00045;

      halos.forEach((halo, index) => {
        const pulse = index === currentIndex
          ? 1 + Math.sin(tick * 4.2) * 0.14
          : 1 + Math.sin(tick * 2 + index) * 0.03;
        halo.scale.setScalar(pulse);
        halo.rotation.z += reducedMotion ? 0.0015 : 0.0065;
      });

      nodeMeshes.forEach((node, index) => {
        const pulse = index === currentIndex ? 1 + Math.sin(tick * 4.2) * 0.1 : 1;
        node.scale.setScalar(pulse);
      });

      flowOrbs.forEach((orb, index) => {
        const t = (orb.offset + tick * orb.speed) % 1;
        curve.getPointAt(t, tempPoint);
        orb.mesh.position.copy(tempPoint);
        orb.mesh.material.emissiveIntensity = 0.35 + Math.sin((tick + index) * 4.8) * 0.2;
      });

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.style.cursor = 'default';

      flowOrbGeometry.dispose();
      flowOrbs.forEach((orb) => orb.mesh.material.dispose());
      markerGeometry.dispose();
      markerMaterial.dispose();
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      completedGeometry.dispose();
      completedMaterial.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();

      nodeMeshes.forEach((node) => {
        node.geometry.dispose();
        node.material.dispose();
      });

      halos.forEach((halo) => {
        halo.geometry.dispose();
        halo.material.dispose();
      });

      renderer.dispose();
    };
  }, [currentIndex, isMobile, isOpen, points, progress, router]);

  if (currentIndex === -1) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex max-w-[92vw] flex-col items-end gap-2">
        <div className="pointer-events-auto rounded-xl border border-white/15 bg-[#08131acc] px-3 py-2 text-xs text-white/75 shadow-[0_12px_45px_rgba(2,8,10,0.45)] backdrop-blur-xl">
          Step {currentIndex + 1}/{guideJourney.length}
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2">
          {previous && !isMobile && (
            <Link
              href={previous.href}
              className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-[#08131acc] px-3 py-2 text-xs text-white/80 backdrop-blur-xl transition hover:bg-white/10"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {previous.short}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#7dd2c3]/55 bg-[#0f2328e6] px-3 py-2 text-xs font-medium text-white shadow-[0_10px_35px_rgba(3,12,14,0.45)] transition hover:border-[#a4e1d6] hover:bg-[#143139]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            3D Map
          </button>

          {next && (
            <Link
              href={next.href}
              className="inline-flex items-center gap-1 rounded-lg bg-[#d7ab73] px-3 py-2 text-xs font-medium text-[#11191e] transition hover:bg-[#e2bc8f]"
            >
              {isMobile ? 'Next' : next.short}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[130] bg-[#03080be6] p-2 backdrop-blur-md sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="journey-modal mx-auto flex h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#08131af3] sm:h-[calc(100dvh-2rem)]"
            >
              <header className="shrink-0 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-ui-mono text-[10px] uppercase tracking-[0.22em] text-white/52">Interactive Journey</p>
                    <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Cinematic cybersecurity walkthrough</h2>
                    <p className="mt-1 text-xs text-white/64 sm:text-sm">
                      Navigate by tapping any node in 3D or selecting a step card. Current progress: {Math.round(progress)}%.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-white/20 p-2 text-white/78 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close journey map"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </header>

              <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 lg:grid lg:grid-cols-[1.35fr,1fr] lg:p-4">
                <div className="story-map-surface relative h-[42dvh] min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 lg:h-auto">
                  {!renderError && (
                    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />
                  )}

                  {renderError && (
                    <div className="flex h-full items-center justify-center px-5 text-center text-sm text-white/72">
                      3D acceleration is unavailable on this device. Use the step cards to continue the guided path.
                    </div>
                  )}

                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-white/15 bg-black/35 px-3 py-1 text-[11px] text-white/72">
                    Tap a node to jump to that page
                  </div>
                </div>

                <div className="min-h-0 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-2">
                  <div className="space-y-2">
                    {guideJourney.map((step, index) => {
                      const isCurrent = index === currentIndex;
                      const isDone = index < currentIndex;
                      const isNext = index === currentIndex + 1;

                      return (
                        <button
                          key={step.href}
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            router.push(step.href);
                          }}
                          className={cn(
                            'w-full rounded-xl border px-3 py-3 text-left transition',
                            isCurrent && 'border-[#86d8ca]/70 bg-[#86d8ca]/12 text-white',
                            isDone && 'border-[#d7ab73]/50 bg-[#d7ab73]/10 text-white/85',
                            !isCurrent && !isDone && 'border-white/10 bg-white/[0.03] text-white/72 hover:border-white/25 hover:text-white',
                            isNext && 'ring-1 ring-[#d7ab73]/45'
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-ui-mono text-[10px] uppercase tracking-[0.18em]">{step.short}</p>
                            <p className="text-[11px] text-white/58">Step {index + 1}</p>
                          </div>
                          <p className="mt-1 text-sm font-medium">{step.title}</p>
                          <p className="mt-1 text-xs text-white/64">{step.intent}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
