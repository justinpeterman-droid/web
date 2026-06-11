export const particleVertexShader = /* glsl */ `
uniform float uTime;
uniform float uPointScale;
uniform float uWarp;
uniform float uDensity;

attribute float aRandom;
attribute float aSize;

varying float vDepth;

void main() {
  vec3 pos = position;

  float wave = sin(uTime * 0.35 + aRandom * 6.28318) * uWarp;
  pos.x += wave * 0.15;
  pos.y += cos(uTime * 0.28 + aRandom * 4.0) * uWarp * 0.12;
  pos.z += sin(uTime * 0.22 + aRandom * 8.0) * uWarp * 0.1;

  pos *= mix(0.85, 1.15, uDensity);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * uPointScale * (220.0 / max(vDepth, 1.0));
}
`;

export const particleFragmentShader = /* glsl */ `
uniform vec3 uColorTeal;
uniform vec3 uColorNeutral;
uniform float uTealMix;

varying float vDepth;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.12, dist);
  float depthFactor = clamp(vDepth / 6.0, 0.0, 1.0);
  vec3 color = mix(uColorNeutral, uColorTeal, depthFactor * uTealMix);

  gl_FragColor = vec4(color, alpha * 0.85);
}
`;
