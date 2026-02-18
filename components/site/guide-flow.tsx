'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import * as THREE from 'three';
import { guideJourney } from '@/lib/site-data';
import { cn } from '@/lib/utils';

type JourneyNodeMesh = THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshStandardMaterial
> & { userData: { href: string } };

export function GuideFlow() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = guideJourney.findIndex((step) => step.href === pathname);
  const [isOpen, setIsOpen] = useState(pathname === '/');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const progress = (currentIndex / Math.max(guideJourney.length - 1, 1)) * 100;
  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const points = useMemo(() => {
    const spread = 3;
    const offset = (guideJourney.length - 1) / 2;
    return guideJourney.map((_, index) => {
      const x = (index - offset) * spread;
      const y = Math.sin(index * 0.74) * 1.45;
      const z = Math.cos(index * 0.52) * 1.3;
      return new THREE.Vector3(x, y, z);
    });
  }, []);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || currentIndex === -1) {
      return;
    }

    const canvas = canvasRef.current;
    const container = canvas.parentElement;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 1.4, 16);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambient = new THREE.AmbientLight(0xffffff, 0.66);
    const key = new THREE.PointLight(0x76c6bb, 1.8, 80);
    key.position.set(-10, 8, 10);
    const fill = new THREE.PointLight(0xd7ab73, 1.3, 75);
    fill.position.set(10, -5, 10);
    scene.add(ambient, key, fill);

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.38);

    const pathGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(340));
    const pathMaterial = new THREE.LineBasicMaterial({
      color: 0x5f8b9a,
      transparent: true,
      opacity: 0.62,
    });
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(pathLine);

    const donePoints = curve.getPoints(Math.max(2, Math.floor((progress / 100) * 340)));
    const doneGeometry = new THREE.BufferGeometry().setFromPoints(donePoints);
    const doneMaterial = new THREE.LineBasicMaterial({
      color: 0xd7ab73,
      transparent: true,
      opacity: 0.92,
    });
    const doneLine = new THREE.Line(doneGeometry, doneMaterial);
    scene.add(doneLine);

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 120;
    const starPositions = new Float32Array(starCount * 3);

    for (let index = 0; index < starCount; index += 1) {
      starPositions[index * 3] = (Math.random() - 0.5) * 42;
      starPositions[index * 3 + 1] = (Math.random() - 0.5) * 12;
      starPositions[index * 3 + 2] = -6 - Math.random() * 10;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0x8db8c2,
      size: 0.09,
      transparent: true,
      opacity: 0.4,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const nodeMeshes: JourneyNodeMesh[] = points.map((point, index) => {
      const done = index < currentIndex;
      const current = index === currentIndex;
      const geometry = new THREE.SphereGeometry(current ? 0.26 : 0.2, 26, 26);
      const color = done ? 0xd7ab73 : current ? 0x9fe2d4 : 0x4c6370;
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: current ? 0.72 : done ? 0.38 : 0.14,
        roughness: 0.32,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material) as JourneyNodeMesh;
      mesh.position.copy(point);
      mesh.userData.href = guideJourney[index].href;
      scene.add(mesh);
      return mesh;
    });

    const pulseGeometry = new THREE.TorusGeometry(0.4, 0.02, 20, 90);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0xd7ab73,
      transparent: true,
      opacity: 0.9,
    });
    const pulseRing = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulseRing.position.copy(points[currentIndex]);
    pulseRing.rotation.x = Math.PI / 2;
    scene.add(pulseRing);

    const guideGeometry = new THREE.SphereGeometry(0.12, 18, 18);
    const guideMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe9cc,
      emissive: 0xd7ab73,
      emissiveIntensity: 0.68,
      roughness: 0.18,
      metalness: 0.15,
    });
    const guideMarker = new THREE.Mesh(guideGeometry, guideMaterial);
    scene.add(guideMarker);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasNext = currentIndex < guideJourney.length - 1;
    const fromT = currentIndex / Math.max(guideJourney.length - 1, 1);
    const toT = hasNext
      ? (currentIndex + 1) / Math.max(guideJourney.length - 1, 1)
      : Math.min(0.99, fromT + 0.08);

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
      const target = findTarget();
      canvas.style.cursor = target ? 'pointer' : 'default';
    };

    const onPointerDown = (event: PointerEvent) => {
      toLocalPointer(event);
      const target = findTarget();
      if (target?.userData.href) {
        setIsOpen(false);
        router.push(target.userData.href);
      }
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

    let raf = 0;
    let tick = 0;

    const animate = () => {
      tick += 0.009;

      if (!reducedMotion) {
        const markerT = fromT + (Math.sin(tick) * 0.5 + 0.5) * (toT - fromT);
        curve.getPointAt(Math.min(0.99, markerT), guideMarker.position);
        pulseRing.scale.setScalar(1 + Math.sin(tick * 1.7) * 0.08);
        stars.rotation.y += 0.00055;
      } else {
        curve.getPointAt(fromT, guideMarker.position);
      }

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.style.cursor = 'default';

      pathGeometry.dispose();
      pathMaterial.dispose();
      doneGeometry.dispose();
      doneMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      guideGeometry.dispose();
      guideMaterial.dispose();
      nodeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });

      renderer.dispose();
    };
  }, [currentIndex, isOpen, points, progress, router]);

  if (currentIndex === -1) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[90] px-3">
        <div className="pointer-events-auto mx-auto max-w-6xl rounded-2xl border border-white/15 bg-[#08141acc]/90 p-4 shadow-[0_18px_70px_rgba(3,12,16,0.55)] backdrop-blur-xl">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-ui-mono text-[10px] uppercase tracking-[0.22em] text-white/58">Story Navigator</p>
              <p className="text-sm text-white/84">
                Step {currentIndex + 1} of {guideJourney.length}: {guideJourney[currentIndex].title}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#76c6bb]/45 bg-[#76c6bb]/12 px-3 py-2 text-xs font-medium text-white transition hover:border-[#76c6bb]/75 hover:bg-[#76c6bb]/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Open 3D journey map
            </button>
          </div>

          <div className="relative h-[5px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#76c6bb] via-[#6ea6b5] to-[#d7ab73]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="max-w-2xl text-xs text-white/68">{guideJourney[currentIndex].intent}</p>
            <div className="flex flex-wrap gap-2">
              {previous && (
                <Link
                  href={previous.href}
                  className="inline-flex items-center gap-1 rounded-md border border-white/18 px-3 py-1.5 text-xs text-white/82 transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  {previous.short}
                </Link>
              )}
              {next && (
                <Link
                  href={next.href}
                  className="inline-flex items-center gap-1 rounded-md bg-[#d7ab73] px-3 py-1.5 text-xs font-medium text-[#11181d] transition hover:bg-[#e0ba8d]"
                >
                  {next.short}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end bg-[#03080bad]/90 px-3 py-4 backdrop-blur-md sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.985 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="journey-modal mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[#09161ce6]"
            >
              <header className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <p className="font-ui-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Interactive Story Map</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Follow the full cybersecurity learning arc</h2>
                  <p className="mt-1 text-sm text-white/67">
                    Click any milestone sphere or card to jump directly. The moving marker points to your immediate next segment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-white/20 p-2 text-white/78 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close story map"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="grid gap-4 p-4 lg:grid-cols-[1.35fr,1fr]">
                <div className="story-map-surface relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:min-h-[360px]">
                  <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" />
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-white/15 bg-black/35 px-3 py-1 text-[11px] text-white/70">
                    Tap or click a node to navigate
                  </div>
                </div>

                <div className="space-y-2 overflow-y-auto pr-1 sm:max-h-[360px]">
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
                          'w-full rounded-xl border px-4 py-3 text-left transition',
                          isCurrent && 'border-[#76c6bb]/65 bg-[#76c6bb]/12 text-white',
                          isDone && 'border-[#d7ab73]/45 bg-[#d7ab73]/10 text-white/88',
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
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
