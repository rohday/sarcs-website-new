"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ChipDie3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    // ─── Scene ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10161a, 0.08);

    // ─── Camera ───
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(3, 4, 8);
    camera.lookAt(1, 0, 0);

    // ─── Rig (holds all meshes, gets rotated) ───
    const rig = new THREE.Group();
    rig.position.set(1.5, 0, 0); // offset right-of-center
    scene.add(rig);

    // ─── Material ───
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7ec1e0,
      transparent: true,
      opacity: 0.35,
    });

    // ─── CPU Die (flattened box) ───
    const dieGeo = new THREE.BoxGeometry(3, 0.3, 3);
    const dieEdgesGeo = new THREE.EdgesGeometry(dieGeo);
    const dieWireframe = new THREE.LineSegments(dieEdgesGeo, lineMat);
    rig.add(dieWireframe);

    // ─── Floorplan Grid (lines across top face of die) ───
    const gridGroup = new THREE.Group();
    const gridY = 0.151; // just above top face
    const halfSize = 1.5;
    const gridCount = 6;

    for (let i = 0; i <= gridCount; i++) {
      const t = -halfSize + (i / gridCount) * (halfSize * 2);

      // horizontal lines
      const hPoints = [new THREE.Vector3(-halfSize, gridY, t), new THREE.Vector3(halfSize, gridY, t)];
      const hGeo = new THREE.BufferGeometry().setFromPoints(hPoints);
      gridGroup.add(new THREE.Line(hGeo, lineMat));

      // vertical lines
      const vPoints = [new THREE.Vector3(t, gridY, -halfSize), new THREE.Vector3(t, gridY, halfSize)];
      const vGeo = new THREE.BufferGeometry().setFromPoints(vPoints);
      gridGroup.add(new THREE.Line(vGeo, lineMat));
    }
    rig.add(gridGroup);

    // ─── Wafer Ring (torus behind/below the die) ───
    const torusGeo = new THREE.TorusGeometry(4, 0.08, 8, 64);
    const torusEdgesGeo = new THREE.EdgesGeometry(torusGeo);
    const torusWireframe = new THREE.LineSegments(torusEdgesGeo, lineMat);
    torusWireframe.rotation.x = Math.PI / 2 + 0.15;
    torusWireframe.position.y = -0.4;
    rig.add(torusWireframe);

    // ─── Size helper ───
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    handleResize();

    // ─── Mouse parallax state ───
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };

    if (!reducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    // ─── Animation lifecycle ───
    let animFrameId: number | null = null;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const startAnimation = () => {
      if (animFrameId !== null) return;

      const animate = () => {
        if (!isVisible || !isTabVisible) {
          animFrameId = null;
          return;
        }

        // Yaw rotation
        rig.rotation.y += 0.0025; // ~0.15 rad/s at 60fps

        // Mouse parallax
        target.x += (mouse.x * 0.3 - target.x) * 0.05;
        target.y += (mouse.y * 0.2 - target.y) * 0.05;
        rig.rotation.x = target.y * 0.15;
        rig.rotation.z = -target.x * 0.08;

        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(animate);
      };

      animFrameId = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    };

    // ─── Intersection Observer ───
    const intersectionObs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabVisible) startAnimation();
        else stopAnimation();
      },
      { threshold: 0 }
    );
    intersectionObs.observe(container);

    // ─── Visibility change ───
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isVisible && isTabVisible) startAnimation();
      else stopAnimation();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // ─── Resize observer ───
    const resizeObs = new ResizeObserver(handleResize);
    resizeObs.observe(container);

    // ─── Start ───
    if (reducedMotion) {
      // Render one static frame
      renderer.render(scene, camera);
    } else {
      startAnimation();
    }

    // ─── Cleanup ───
    return () => {
      stopAnimation();
      resizeObs.disconnect();
      intersectionObs.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);

      // Dispose geometries
      dieGeo.dispose();
      dieEdgesGeo.dispose();
      torusGeo.dispose();
      torusEdgesGeo.dispose();
      gridGroup.children.forEach((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
        }
      });

      // Dispose material
      lineMat.dispose();

      // Remove canvas
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    />
  );
}
