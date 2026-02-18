'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export function GuideFlow() {
  const pathname = usePathname();
  const currentIndex = useMemo(() => resolveStepIndex(pathname), [pathname]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const points = useMemo(() => {
    const spread = 2.2;
    const offset = (guideJourney.length - 1) / 2;
    const denominator = Math.max(guideJourney.length - 1, 1);
    return guideJourney.map((step, index) => {
      const t = index / denominator;
      const x = (index - offset) * spread;
      const y = Math.sin(t * Math.PI) * 1.2 - 0.45;
      const z = Math.cos(index * 0.52) * 0.42;

      if (step.href === '/' || step.href === '/community') {
        return new THREE.Vector3(x, y + 0.2, z);
      }

      return new THREE.Vector3(x, y, z);
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current || currentIndex === -1) {
      return;
    }

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 1.8, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambient = new THREE.AmbientLight(0xffffff, 0.72);
    const key = new THREE.PointLight(0x83d4c5, 1.2, 70);
    key.position.set(-8, 8, 8);
    const fill = new THREE.PointLight(0xd7ab73, 1, 70);
    fill.position.set(8, -4, 8);
    scene.add(ambient, key, fill);

    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
    const tubeGeometry = new THREE.TubeGeometry(curve, 360, 0.06, 12, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x76c6bb,
      emissive: 0x2e5a63,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.25,
      transparent: true,
      opacity: 0.72,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);

    const targetIndex = focusIndex ?? currentIndex;
    const progress = targetIndex / Math.max(guideJourney.length - 1, 1);
    const activePoints = curve.getPoints(Math.max(2, Math.floor(progress * 360) + 1));
    const activeGeometry = new THREE.BufferGeometry().setFromPoints(activePoints);
    const activeMaterial = new THREE.LineBasicMaterial({
      color: 0xd7ab73,
      transparent: true,
      opacity: 0.94,
    });
    const activeLine = new THREE.Line(activeGeometry, activeMaterial);
    scene.add(activeLine);

    const nodes: Array<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>> = [];
    const rings: Array<THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>> = [];
    points.forEach((point, index) => {
      const done = index < currentIndex;
      const current = index === currentIndex;
      const preview = index === targetIndex;
      const color = done ? 0xd7ab73 : current ? 0xa2e6d7 : preview ? 0xe8debd : 0x5a7f8b;
      const geometry = new THREE.SphereGeometry(current ? 0.18 : 0.14, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: current ? 0.8 : done ? 0.3 : preview ? 0.42 : 0.14,
        roughness: 0.28,
        metalness: 0.2,
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.copy(point);
      scene.add(node);
      nodes.push(node);

      const ringGeometry = new THREE.TorusGeometry(current ? 0.3 : 0.26, 0.015, 10, 24);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: current ? 0xa2e6d7 : done ? 0xd7ab73 : preview ? 0xe8debd : 0x648995,
        emissive: current ? 0x86d8ca : done ? 0xd7ab73 : 0x4c6870,
        emissiveIntensity: current ? 0.65 : done ? 0.24 : preview ? 0.34 : 0.14,
        roughness: 0.3,
        metalness: 0.2,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(point);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      rings.push(ring);
    });

    const markerGeometry = new THREE.SphereGeometry(0.11, 14, 14);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe7c7,
      emissive: 0xd7ab73,
      emissiveIntensity: 0.8,
      roughness: 0.12,
      metalness: 0.18,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    scene.add(marker);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 34;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[index * 3 + 2] = -4 - Math.random() * 8;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xa7c7ce,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fromT = currentIndex / Math.max(guideJourney.length - 1, 1);
    const targetT = targetIndex / Math.max(guideJourney.length - 1, 1);
    const startT = Math.min(fromT, targetT);
    const endT = Math.max(fromT, targetT);
    const hasSpan = Math.abs(endT - startT) > 0.002;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let tick = 0;

    const animate = () => {
      tick += reducedMotion ? 0.002 : 0.008;

      const markerT = reducedMotion
        ? fromT
        : hasSpan
          ? startT + (Math.sin(tick * 2.1) * 0.5 + 0.5) * (endT - startT)
          : Math.min(0.99, fromT + (Math.sin(tick * 2.1) * 0.5 + 0.5) * 0.08);
      curve.getPointAt(Math.min(0.99, markerT), marker.position);

      camera.position.x = Math.sin(tick * 0.25) * 0.35;
      camera.position.y = 1.7 + Math.cos(tick * 0.22) * 0.12;
      camera.lookAt(0, 0.15, 0);

      nodes.forEach((node, index) => {
        const pulse = index === currentIndex ? 1 + Math.sin(tick * 4) * 0.08 : index === targetIndex ? 1.04 : 1;
        node.scale.setScalar(pulse);
      });
      rings.forEach((ring, index) => {
        const pulse = index === currentIndex ? 1 + Math.sin(tick * 3.2) * 0.08 : index === targetIndex ? 1.06 : 1;
        ring.scale.setScalar(pulse);
      });

      particles.rotation.y += reducedMotion ? 0.0001 : 0.0004;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);

      markerGeometry.dispose();
      markerMaterial.dispose();
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      activeGeometry.dispose();
      activeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      nodes.forEach((node) => {
        node.geometry.dispose();
        node.material.dispose();
      });
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });

      renderer.dispose();
    };
  }, [currentIndex, focusIndex, points]);

  if (currentIndex === -1) {
    return null;
  }

  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  return (
    <section className="relative border-t border-[#8ebec8]/28 bg-[linear-gradient(180deg,rgba(20,57,74,0.33),rgba(27,68,88,0.26))] py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-ui-mono text-[11px] uppercase tracking-[0.2em] text-white/55">Guided journey</p>
            <p className="mt-1 text-sm text-white/80">
              Step {currentIndex + 1} of {guideJourney.length}: {guideJourney[currentIndex].title}
            </p>
          </div>
          <p className="max-w-md text-xs text-white/70">{guideJourney[focusIndex ?? currentIndex].intent}</p>
        </div>

        <div className="relative h-56 overflow-hidden rounded-2xl border border-[#92c3ce]/32 bg-[linear-gradient(135deg,rgba(36,92,110,0.31),rgba(112,85,54,0.24))] sm:h-64 md:h-72">
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="pointer-events-none absolute bottom-3 right-3 text-[11px] text-white/68">
            route animation and progress gates
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/72">
          <span className="rounded-full border border-[#d7ab73]/55 bg-[#d7ab73]/15 px-2 py-1">completed</span>
          <span className="rounded-full border border-[#9ce5d7]/60 bg-[#9ce5d7]/18 px-2 py-1">current</span>
          <span className="rounded-full border border-[#e8debd]/60 bg-[#e8debd]/18 px-2 py-1">preview</span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="flex min-w-max gap-2 pb-1">
            {guideJourney.map((step, index) => {
              const isCurrent = index === currentIndex;
              const isDone = index < currentIndex;
              return (
                <Link
                  key={step.href}
                  href={step.href}
                  onMouseEnter={() => setFocusIndex(index)}
                  onMouseLeave={() => setFocusIndex(null)}
                  onFocus={() => setFocusIndex(index)}
                  onBlur={() => setFocusIndex(null)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    isCurrent && focusIndex === null
                      ? 'border-[#9ce5d7] bg-[#9ce5d7]/18 text-white'
                      : focusIndex === index
                        ? 'border-[#e8debd]/65 bg-[#e8debd]/20 text-white'
                      : isDone
                        ? 'border-[#d7ab73]/55 bg-[#d7ab73]/14 text-white/85'
                        : 'border-white/20 text-white/70 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {step.short}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {previous ? (
            <Link href={previous.href} className="text-sm text-white/78 underline underline-offset-4 hover:text-white">
              Back: {previous.title}
            </Link>
          ) : (
            <span className="text-sm text-white/45">You are at the start of the journey</span>
          )}

          {next && (
            <Link
              href={next.href}
              className="inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
            >
              Continue: {next.short}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
