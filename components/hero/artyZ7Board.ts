import * as THREE from "three";

const BOARD_TOP = 0.11;
const BOARD_SIZE = 5.0;

/**
 * Wireframe model of a Digilent Arty Z7 FPGA board.
 *
 * Returns a group containing every line/line-segment mesh, plus a dispose()
 * that releases all geometries. The caller owns the material lifecycle.
 */
export function buildArtyZ7Board(material: THREE.Material): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: { dispose(): void }[] = [];

  const line = (points: [THREE.Vector3, THREE.Vector3]) => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    disposables.push(geo);
    return new THREE.Line(geo, material);
  };

  const edges = (geo: THREE.BufferGeometry) => {
    disposables.push(geo);
    const edgesGeo = new THREE.EdgesGeometry(geo);
    disposables.push(edgesGeo);
    return new THREE.LineSegments(edgesGeo, material);
  };

  const addEdges = (
    geo: THREE.BufferGeometry,
    x: number,
    y: number,
    z: number
  ) => {
    const mesh = edges(geo);
    mesh.position.set(x, y, z);
    group.add(mesh);
  };

  const addBox = (
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number
  ) => addEdges(new THREE.BoxGeometry(w, h, d), x, y, z);

  const addCylinder = (
    r: number,
    h: number,
    x: number,
    y: number,
    z: number
  ) => addEdges(new THREE.CylinderGeometry(r, r, h, 8), x, y, z);

  // ─── Substrate base ───
  group.add(edges(new THREE.BoxGeometry(BOARD_SIZE, 0.22, BOARD_SIZE)));

  // Silkscreen margin outline
  const margin = 2.3;
  const silk = [
    new THREE.Vector3(-margin, BOARD_TOP + 0.01, -margin),
    new THREE.Vector3(margin, BOARD_TOP + 0.01, -margin),
    new THREE.Vector3(margin, BOARD_TOP + 0.01, margin),
    new THREE.Vector3(-margin, BOARD_TOP + 0.01, margin),
    new THREE.Vector3(-margin, BOARD_TOP + 0.01, -margin),
  ];
  const silkGeo = new THREE.BufferGeometry().setFromPoints(silk);
  disposables.push(silkGeo);
  group.add(new THREE.Line(silkGeo, material));

  // ─── Top edge connectors (Z ~ -2.1 to -2.3) ───
  addBox(0.7, 0.7, 0.8, -1.9, BOARD_TOP + 0.35, -2.1); // USB host
  addBox(0.6, 0.3, 0.6, -1.1, BOARD_TOP + 0.15, -2.2); // HDMI out
  addBox(0.6, 0.3, 0.6, -0.2, BOARD_TOP + 0.15, -2.2); // HDMI in
  addBox(0.75, 0.5, 0.5, 0.9, BOARD_TOP + 0.25, -2.15); // PMOD JA
  addBox(0.75, 0.5, 0.5, 1.8, BOARD_TOP + 0.25, -2.15); // PMOD JB
  addCylinder(0.08, 0.2, 2.3, BOARD_TOP + 0.1, -2.15); // PORB

  // ─── Left edge ports (X ~ -1.8 to -2.3) ───
  addBox(0.3, 0.15, 0.4, -2.25, BOARD_TOP + 0.08, -1.0); // Micro-USB
  addBox(0.8, 0.7, 1.1, -1.9, BOARD_TOP + 0.35, 0.0); // RJ45 Ethernet
  addBox(0.7, 0.3, 0.45, -1.9, BOARD_TOP + 0.15, 1.1); // Audio out
  addBox(0.75, 0.55, 0.5, -1.85, BOARD_TOP + 0.28, 1.75); // DC barrel
  addBox(0.3, 0.2, 0.3, -1.9, BOARD_TOP + 0.1, 2.2); // SRST base
  addCylinder(0.05, 0.16, -1.9, BOARD_TOP + 0.23, 2.2); // SRST plunger

  // ─── Center silicon ───
  const socY = BOARD_TOP + 0.06;
  addBox(0.9, 0.12, 0.9, 0.4, socY, 0.0); // Zynq-7000 SoC

  // 3x3 surface grid on the SoC die
  const gridTop = socY + 0.08;
  for (let i = 0; i <= 3; i++) {
    const t = -0.45 + (i / 3) * 0.9;
    group.add(
      line([
        new THREE.Vector3(0.4 - 0.45, gridTop, t),
        new THREE.Vector3(0.4 + 0.45, gridTop, t),
      ])
    );
    group.add(
      line([
        new THREE.Vector3(0.4 + t, gridTop, -0.45),
        new THREE.Vector3(0.4 + t, gridTop, 0.45),
      ])
    );
  }

  addBox(0.5, 0.08, 0.7, 1.2, BOARD_TOP + 0.04, 0.0); // DDR3
  addBox(0.3, 0.06, 0.3, -0.9, BOARD_TOP + 0.03, 0.0); // Ethernet PHY

  // Power delivery
  addBox(0.3, 0.06, 0.3, -0.6, BOARD_TOP + 0.03, 1.6); // PMIC
  const inductors: [number, number][] = [
    [-0.85, 1.35],
    [-0.35, 1.35],
    [-0.85, 1.85],
    [-0.35, 1.85],
  ];
  inductors.forEach(([ix, iz]) =>
    addCylinder(0.14, 0.18, ix, BOARD_TOP + 0.09, iz)
  );
  const smdCaps: [number, number][] = [
    [-0.85, 1.6],
    [-0.35, 1.6],
    [-0.6, 1.35],
    [-0.6, 1.85],
    [-0.78, 1.42],
    [-0.42, 1.78],
  ];
  smdCaps.forEach(([sx, sz]) => addBox(0.08, 0.05, 0.08, sx, BOARD_TOP + 0.025, sz));

  // ─── Arduino / ChipKit headers & SPI/JTAG ───
  addBox(1.1, 0.4, 0.15, 0.8, BOARD_TOP + 0.2, -1.3);
  addBox(1.2, 0.4, 0.15, 1.85, BOARD_TOP + 0.2, -1.3);
  addBox(0.9, 0.4, 0.15, 1.05, BOARD_TOP + 0.2, 1.35);
  addBox(0.8, 0.4, 0.15, 1.9, BOARD_TOP + 0.2, 1.35);
  addBox(0.3, 0.2, 0.4, 2.2, BOARD_TOP + 0.15, 0.1); // SPI
  addBox(0.15, 0.2, 0.4, 2.2, BOARD_TOP + 0.15, -0.6); // JTAG

  // ─── Bottom edge user I/O (Z ~ 1.9 to 2.2) ───
  const slideSwitches: [number, number][] = [
    [-0.1, 2.15],
    [0.2, 2.15],
  ];
  slideSwitches.forEach(([sx, sz]) => {
    addBox(0.25, 0.25, 0.4, sx, BOARD_TOP + 0.13, sz);
    addBox(0.1, 0.1, 0.2, sx, BOARD_TOP + 0.28, sz); // toggle nub
  });

  const buttonXs = [0.8, 1.2, 1.6, 2.0];
  buttonXs.forEach((bx) => {
    addBox(0.25, 0.15, 0.25, bx, BOARD_TOP + 0.075, 2.2); // button base
    addCylinder(0.05, 0.12, bx, BOARD_TOP + 0.2, 2.2); // plunger
    addBox(0.08, 0.04, 0.08, bx, BOARD_TOP + 0.02, 1.9); // LED
  });

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
