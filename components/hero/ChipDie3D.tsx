"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ChipDie3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide entirely below 820px — the hero text owns the width there.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 820px)");
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
    scene.fog = new THREE.FogExp2(0x10161a, 0.06);

    // ─── Camera — object projects into the right ~80% band at any aspect ───
    // Aimed LEFT of the rig (never at it) so the object renders right of center.
    const CAM_Z = 9;
    const NDC_TARGET = 0.6;
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 4.5, CAM_Z);

    const updateFraming = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const tanHalfH = Math.tan(THREE.MathUtils.degToRad(20)) * aspect;
      camera.lookAt(-NDC_TARGET * CAM_Z * tanHalfH, 0, 0);
    };
    updateFraming();

    // ─── Rig (holds all meshes) ───
    const rig = new THREE.Group();
    rig.scale.setScalar(0.5);
    rig.position.set(0, 0, 0);
    scene.add(rig);

    // ─── Shared wireframe material (kept as shipped: reads white-ish) ───
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7ec1e0,
      transparent: true,
      opacity: 0.35,
    });

    const disposables: { dispose(): void }[] = [];

    const line = (points: [THREE.Vector3, THREE.Vector3]) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      disposables.push(geo);
      return new THREE.Line(geo, lineMat);
    };

    const edges = (geo: THREE.BufferGeometry) => {
      disposables.push(geo);
      const e = new THREE.EdgesGeometry(geo);
      disposables.push(e);
      return new THREE.LineSegments(e, lineMat);
    };

    // ─── Substrate board ───
    const boardGeo = new THREE.BoxGeometry(4.8, 0.22, 4.0);
    rig.add(edges(boardGeo));

    // inner board outline
    const innerPoints = [
      new THREE.Vector3(-2.0, 0.12, -1.6),
      new THREE.Vector3(2.0, 0.12, -1.6),
      new THREE.Vector3(2.0, 0.12, 1.6),
      new THREE.Vector3(-2.0, 0.12, 1.6),
      new THREE.Vector3(-2.0, 0.12, -1.6),
    ];
    const innerGeo = new THREE.BufferGeometry().setFromPoints(innerPoints);
    disposables.push(innerGeo);
    rig.add(new THREE.Line(innerGeo, lineMat));

    const BOARD_TOP = 0.11;

    // ─── Central silicon die with floorplan grid ───
    const dieGeo = new THREE.BoxGeometry(1.7, 0.5, 1.7);
    const dieWire = edges(dieGeo);
    dieWire.position.y = BOARD_TOP + 0.25;
    rig.add(dieWire);

    const DIE_TOP = BOARD_TOP + 0.5;
    const gridHalf = 0.85;
    const gridN = 5;
    for (let i = 0; i <= gridN; i++) {
      const t = -gridHalf + (i / gridN) * gridHalf * 2;
      rig.add(
        line([
          new THREE.Vector3(-gridHalf, DIE_TOP + 0.02, t),
          new THREE.Vector3(gridHalf, DIE_TOP + 0.02, t),
        ])
      );
      rig.add(
        line([
          new THREE.Vector3(t, DIE_TOP + 0.02, -gridHalf),
          new THREE.Vector3(t, DIE_TOP + 0.02, gridHalf),
        ])
      );
    }

    // ─── HBM memory stacks (four corners) ───
    const hbmSpots: [number, number][] = [
      [2.2, 1.35],
      [-2.2, 1.35],
      [2.2, -1.35],
      [-2.2, -1.35],
    ];
    hbmSpots.forEach(([hx, hz]) => {
      const stack = edges(new THREE.BoxGeometry(0.85, 0.7, 0.85));
      stack.position.set(hx, BOARD_TOP + 0.35, hz);
      rig.add(stack);
      const lid = edges(new THREE.BoxGeometry(0.7, 0.18, 0.7));
      lid.position.set(hx, BOARD_TOP + 0.82, hz);
      rig.add(lid);
    });

    // ─── Decoupling capacitors (two rows flanking the die) ───
    const capPositions: [number, number, number][] = [];
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 6; i++) {
        const t = -1.25 + (i / 5) * 2.5;
        capPositions.push([t, 0, side * 1.55]);
      }
    }
    capPositions.forEach(([cx, , cz]) => {
      const cap = edges(new THREE.CylinderGeometry(0.11, 0.11, 0.42, 8));
      cap.position.set(cx, BOARD_TOP + 0.21, cz);
      rig.add(cap);
    });

    // ─── Circuit traces (parallel lanes + 45° routing) ───
    const TRACE_Y = BOARD_TOP + 0.015;

    // horizontal lanes, die edge to board edge
    for (let i = 0; i < 6; i++) {
      const t = -1.1 + (i / 5) * 2.2;
      rig.add(
        line([
          new THREE.Vector3(-2.15, TRACE_Y, t),
          new THREE.Vector3(-1.0, TRACE_Y, t),
        ])
      );
      rig.add(
        line([
          new THREE.Vector3(1.0, TRACE_Y, t),
          new THREE.Vector3(2.15, TRACE_Y, t),
        ])
      );
    }

    // vertical lanes, top/bottom board edges
    for (let i = 0; i < 4; i++) {
      const t = -1.5 + (i / 3) * 3;
      rig.add(
        line([
          new THREE.Vector3(t, TRACE_Y, -1.8),
          new THREE.Vector3(t, TRACE_Y, -1.35),
        ])
      );
      rig.add(
        line([
          new THREE.Vector3(t, TRACE_Y, 1.35),
          new THREE.Vector3(t, TRACE_Y, 1.8),
        ])
      );
    }

    // 45° routed corner traces
    const routes: [number, number, number, number][] = [
      [-1.0, -1.0, -1.5, -1.5],
      [1.0, -1.0, 1.5, -1.5],
      [-1.0, 1.0, -1.5, 1.5],
      [1.0, 1.0, 1.5, 1.5],
    ];
    routes.forEach(([x1, z1, x2, z2]) => {
      rig.add(
        line([
          new THREE.Vector3(x1, TRACE_Y, z1),
          new THREE.Vector3(x2, TRACE_Y, z2),
        ])
      );
    });

    // ─── Size helper (keeps the object in the right band at any aspect) ───
    const handleResize = () => {
      updateFraming();
    };
    handleResize();

    // ─── Mouse state (tilt only while hovering the element) ───
    const mouse = { x: 0, y: 0, px: -9999, py: -9999 };
    const target = { x: 0, y: 0 };
    let yawSpeed = 0.0025;
    const rigWorld = new THREE.Vector3();

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
      mouse.px = -9999;
      mouse.py = -9999;
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

        // Hover = cursor near the element's projected screen position
        rig.getWorldPosition(rigWorld);
        rigWorld.project(camera);
        const inView = rigWorld.z < 1 && rigWorld.z > -1;
        const sx = (rigWorld.x * 0.5 + 0.5) * container.clientWidth;
        const sy = (-rigWorld.y * 0.5 + 0.5) * container.clientHeight;
        const hovered =
          inView && Math.hypot(sx - mouse.px, sy - mouse.py) < 240;

        // Idle: slow drift. Hovered: drift nearly stops, rig tilts toward cursor.
        const yawTarget = hovered ? 0.0005 : 0.0025;
        yawSpeed += (yawTarget - yawSpeed) * 0.05;
        rig.rotation.y += yawSpeed;

        target.x += ((hovered ? mouse.x * 0.3 : 0) - target.x) * 0.05;
        target.y += ((hovered ? mouse.y * 0.2 : 0) - target.y) * 0.05;
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
      disposables.forEach((d) => d.dispose());
      lineMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [enabled]);

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