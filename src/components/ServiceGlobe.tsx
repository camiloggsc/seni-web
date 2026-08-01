"use client";

import { useEffect, useRef } from "react";

/* -------------------------------------------------------------------------
   Globo de servicios.
   Malla de meridianos y paralelos con el nucleo encendido en el degradado de
   marca y los servicios en arco alrededor.

   Interaccion: se arrastra para girarlo (queda con inercia), se inclina hacia
   el cursor, y el nucleo se corre como si el cursor fuera la fuente de luz.
   Al pasar por un servicio sale un rayo hacia el globo, que es el motivo del
   isotipo.

   WebGL 1 a proposito: cubre Safari viejo y moviles sin cambiar shaders.
   ------------------------------------------------------------------------- */

const VERT = `
precision highp float;

attribute vec3 aPos;

uniform float uYaw;
uniform float uPitch;
uniform float uAspect;

varying float vFacing;

mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,-s, 0.0,1.0,0.0, s,0.0,c); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,s, 0.0,-s,c); }

void main() {
  vec3 p = rotX(uPitch) * rotY(uYaw) * aPos;

  // Proyeccion casi ortografica: una pizca de perspectiva da volumen
  // sin deformar la silueta circular.
  float z = p.z * 0.16 + 1.0;
  vec2 proj = p.xy / z;
  proj.x /= uAspect;

  gl_Position = vec4(proj * 0.78, 0.0, 1.0);
  vFacing = p.z;
}
`;

const FRAG = `
precision mediump float;

varying float vFacing;

uniform float uBackFade;

void main() {
  // La cara de atras se atenua: da profundidad sin prueba de profundidad.
  float front = smoothstep(-1.0, 1.0, vFacing);
  float alpha = mix(uBackFade, 1.0, front);
  gl_FragColor = vec4(vec3(0.55 + front * 0.45), alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** Malla de la esfera como lista de segmentos para gl.LINES. */
function buildWireframe(parallels: number, meridians: number, segments: number) {
  const verts: number[] = [];
  const push = (lat: number, lon: number) => {
    const y = Math.cos(lat);
    const r = Math.sin(lat);
    verts.push(r * Math.cos(lon), y, r * Math.sin(lon));
  };

  // Paralelos: se saltan los polos, donde el radio tiende a cero.
  for (let i = 1; i < parallels; i += 1) {
    const lat = (i / parallels) * Math.PI;
    for (let s = 0; s < segments; s += 1) {
      push(lat, (s / segments) * Math.PI * 2);
      push(lat, ((s + 1) / segments) * Math.PI * 2);
    }
  }

  // Meridianos: de polo a polo.
  for (let m = 0; m < meridians; m += 1) {
    const lon = (m / meridians) * Math.PI * 2;
    for (let s = 0; s < segments; s += 1) {
      push((s / segments) * Math.PI, lon);
      push(((s + 1) / segments) * Math.PI, lon);
    }
  }

  return new Float32Array(verts);
}

const BASE_PITCH = -0.3;

export default function ServiceGlobe({
  services,
  label,
}: {
  services: readonly string[];
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const data = buildWireframe(14, 22, 96);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const attrib = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(attrib);
    gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uYaw = u("uYaw");
    const uPitch = u("uPitch");
    const uAspect = u("uAspect");
    gl.uniform1f(u("uBackFade"), 0.13);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const count = data.length / 3;

    // --- estado de giro -------------------------------------------------
    let yaw = 0;
    let yawVelocity = 0;
    let pitch = BASE_PITCH;
    let pitchTarget = BASE_PITCH;
    let dragging = false;
    let lastPointerX = 0;
    let lastFrame = performance.now();
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, w / Math.max(1, h));
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      if (!motionQuery.matches) {
        // Giro ambiente, salvo mientras se arrastra.
        if (!dragging) {
          yaw += dt * 0.16;
          yaw += yawVelocity;
          yawVelocity *= 0.93;
          if (Math.abs(yawVelocity) < 0.00002) yawVelocity = 0;
        }
        pitch += (pitchTarget - pitch) * 0.07;
      }

      gl.uniform1f(uYaw, yaw);
      gl.uniform1f(uPitch, pitch);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.LINES, 0, count);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = visible && !document.hidden && !motionQuery.matches;
      if (shouldRun && !raf) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        if (visible && !document.hidden) draw(performance.now());
      }
    };

    // --- puntero --------------------------------------------------------
    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // El nucleo se corre hacia el cursor: el globo se siente iluminado por el.
      wrap.style.setProperty("--mx", `${50 + nx * 16}%`);
      wrap.style.setProperty("--my", `${56 + ny * 14}%`);

      if (dragging) {
        const delta = (e.clientX - lastPointerX) * 0.006;
        yaw += delta;
        yawVelocity = delta;
        lastPointerX = e.clientX;
      } else {
        pitchTarget = BASE_PITCH + ny * 0.3;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastPointerX = e.clientX;
      yawVelocity = 0;
      wrap.dataset.dragging = "true";
      wrap.setPointerCapture(e.pointerId);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete wrap.dataset.dragging;
      if (wrap.hasPointerCapture(e.pointerId)) wrap.releasePointerCapture(e.pointerId);
    };

    const onPointerLeave = () => {
      pitchTarget = BASE_PITCH;
      wrap.style.removeProperty("--mx");
      wrap.style.removeProperty("--my");
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (!raf) draw(performance.now());
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "150px" },
    );
    io.observe(wrap);

    resize();
    draw(performance.now());
    sync();

    // Sin esto el globo queda en negro para siempre cuando el sistema
    // recupera memoria de video, que en portátiles pasa al cambiar de app.
    const onContextLost = (e: Event) => {
      e.preventDefault();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onContextRestored = () => {
      canvas.dataset.ready = "";
      window.location.reload();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    document.addEventListener("visibilitychange", sync);
    motionQuery.addEventListener("change", sync);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointerup", endDrag);
    wrap.addEventListener("pointercancel", endDrag);
    wrap.addEventListener("pointerleave", onPointerLeave);
    canvas.dataset.ready = "true";

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      document.removeEventListener("visibilitychange", sync);
      motionQuery.removeEventListener("change", sync);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointerup", endDrag);
      wrap.removeEventListener("pointercancel", endDrag);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  // Las etiquetas se reparten sobre el arco superior, de izquierda a derecha.
  // El radio (47) las deja fuera de la silueta, que mide 39.
  const RADIUS = 47;
  const positioned = services.map((name, i) => {
    const deg = 180 + ((i + 0.5) / services.length) * 180;
    const rad = (deg * Math.PI) / 180;
    return {
      name,
      deg,
      // Hueco angular aproximado que ocupa el texto, para cortar el arco ahi.
      half: 4 + name.length * 0.95,
      left: 50 + Math.cos(rad) * RADIUS,
      top: 50 + Math.sin(rad) * RADIUS,
      // El rayo apunta del rotulo hacia el centro del globo.
      ray: `${deg + 180}deg`,
    };
  });

  // El arco se dibuja por tramos entre etiqueta y etiqueta. Taparlo con un
  // fondo solido dejaba un recuadro visible sobre el degradado.
  const onCircle = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(50 + Math.cos(rad) * RADIUS).toFixed(2)} ${(50 + Math.sin(rad) * RADIUS).toFixed(2)}`;
  };
  const arcSegments: string[] = [];
  let cursor = 180;
  for (const item of positioned) {
    const from = cursor;
    const to = item.deg - item.half;
    if (to - from > 1) arcSegments.push(`M ${onCircle(from)} A ${RADIUS} ${RADIUS} 0 0 1 ${onCircle(to)}`);
    cursor = item.deg + item.half;
  }
  if (360 - cursor > 1) {
    arcSegments.push(`M ${onCircle(cursor)} A ${RADIUS} ${RADIUS} 0 0 1 ${onCircle(360)}`);
  }

  return (
    <div ref={wrapRef} className="globe">
      <div className="globe-core" aria-hidden="true" />
      <canvas ref={canvasRef} className="globe-canvas" role="img" aria-label={label} />

      {/* Arco punteado que enlaza los servicios, cortado donde va cada rotulo. */}
      <svg className="globe-arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {arcSegments.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 8"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <ul className="globe-labels">
        {positioned.map((item) => (
          <li
            key={item.name}
            style={
              {
                left: `${item.left}%`,
                top: `${item.top}%`,
                "--ray": item.ray,
              } as React.CSSProperties
            }
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
