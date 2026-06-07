import {
  BufferAttribute,
  BufferGeometry,
  Float32BufferAttribute,
} from "three";

export type ParticleGeometryBuffers = {
  geometry: BufferGeometry;
  positions: Float32Array;
  randoms: Float32Array;
  sizes: Float32Array;
};

export function createParticleGeometry(count: number): ParticleGeometryBuffers {
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const radius = 1.2 + Math.random() * 1.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    randoms[i] = Math.random();
    sizes[i] = 0.35 + Math.random() * 0.65;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aRandom", new BufferAttribute(randoms, 1));
  geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));

  return { geometry, positions, randoms, sizes };
}
