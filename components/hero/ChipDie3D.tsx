"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { buildArtyZ7Board } from "./artyZ7Board";

const CAM_Z = 9;
const NDC_TARGET = 0.6; // model projects into the right ~80% of the hero
const MIN_WIDTH = 820; // hide entirely below this (hero text owns the width)

export default function ChipDie3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    // ─── Scene + camera (framed so the model sits right of center) ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10161a, 0.06);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 3.0, CAM_Z);

    const updateFraming = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const tanHalfH = Math.tan(THREE.MathUtils.degToRad(20)) * aspect;
      camera.lookAt(-NDC_TARGET * CAM_Z * tanHalfH, 0, 0);
    };

    // ─── Model ───
    const material = new THREE.LineBasicMaterial({
      color: 0x7ec1e0,
      transparent: true,
      opacity: 0.6,
    });
    const { group: board, dispose: disposeBoard } = buildArtyZ7Board(material);

    // Spin group: yaw drift + hover parallax. Tilt group: base upright lean.
    const rig = new THREE.Group();
    rig.position.set(0, 0.2, 0);
    rig.scale.setScalar(0.4);
    scene.add(rig);

    const tilt = new THREE.Group();
    tilt.rotation.order = "YXZ";
    tilt.rotation.x = THREE.MathUtils.degToRad(-75);
    tilt.rotation.y = THREE.MathUtils.degToRad(35);
    tilt.rotation.z = THREE.MathUtils.degToRad(10);
    tilt.add(board);
    rig.add(tilt);

    updateFraming();

    // ─── Mouse state ───
    const mouse = { x: 0, y: 0, px: -9999, py: -9999 };
    const target = { x: 0, y: 0 };
    let yawSpeed = 0.004;
    const rigWorld = new THREE.Vector3();

    const resetMouse = () => {
      mouse.x = 0;
      mouse.y = 0;
      mouse.px = -9999;
      mouse.py = -9999;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
    };

    if (!reducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", resetMouse);
    }

    // ─── Animation loop (idle drift; hover slows + tilts toward cursor) ───
    let animFrameId: number | null = null;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const animate = () => {
      if (!isVisible || !isTabVisible) {
        animFrameId = null;
        return;
      }

      rig.getWorldPosition(rigWorld);
      rigWorld.project(camera);
      const inView = rigWorld.z < 1 && rigWorld.z > -1;
      const sx = (rigWorld.x * 0.5 + 0.5) * container.clientWidth;
      const sy = (-rigWorld.y * 0.5 + 0.5) * container.clientHeight;
      const hovered = inView && Math.hypot(sx - mouse.px, sy - mouse.py) < 260;

      const yawTarget = hovered ? 0.0008 : 0.004;
      yawSpeed += (yawTarget - yawSpeed) * 0.05;
      rig.rotation.y += yawSpeed;

      target.x += ((hovered ? mouse.x * 0.3 : 0) - target.x) * 0.05;
      target.y += ((hovered ? mouse.y * 0.2 : 0) - target.y) * 0.05;
      rig.rotation.x = target.y * 0.15;
      rig.rotation.z = -target.x * 0.08;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animFrameId === null) animFrameId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    };

    const syncLoop = () => {
      if (isVisible && isTabVisible) startAnimation();
      else stopAnimation();
    };

    const intersectionObs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 }
    );
    intersectionObs.observe(container);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      syncLoop();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const resizeObs = new ResizeObserver(updateFraming);
    resizeObs.observe(container);

    if (reducedMotion) renderer.render(scene, camera);
    else startAnimation();

    return () => {
      stopAnimation();
      resizeObs.disconnect();
      intersectionObs.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", resetMouse);
      disposeBoard();
      material.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    />
  );
}
