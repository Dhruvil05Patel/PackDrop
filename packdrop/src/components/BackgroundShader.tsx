import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = `
  uniform float uTime;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p*vec2(123.34, 456.21));
    p += dot(p, p+45.32);
    return fract(p.x*p.y);
  }

  vec3 palette(float t) {
    vec3 a = vec3(0.04, 0.04, 0.08);
    vec3 b = vec3(0.03, 0.03, 0.06);
    vec3 c = vec3(0.02, 0.06, 0.10);
    vec3 d = vec3(0.10, 0.04, 0.12);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv;
    float n = sin(uv.x * 3.0 + uTime * 0.3) * cos(uv.y * 2.5 + uTime * 0.2);
    float noise = n * 0.5 + 0.5;
    float t = noise + uTime * 0.05;
    vec3 color = palette(t);

    // Subtle vignette
    float v = smoothstep(1.1, 0.25, distance(uv, vec2(0.5)));
    color *= v;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FullscreenQuad() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={(r) => (materialRef.current = r)}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function BackgroundShader() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.55,
        background:
          "radial-gradient(ellipse at 20% 50%, #0d1520 0%, #080810 60%, #100812 100%)",
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        style={{ width: "100%", height: "100%" }}
      >
        <FullscreenQuad />
      </Canvas>
    </div>
  );
}

