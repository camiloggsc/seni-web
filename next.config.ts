import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages solo sirve archivos, no ejecuta codigo. `next build` deja
  // el sitio listo en ./out y el workflow lo publica desde ahi.
  output: "export",

  // Pages sirve /ruta/ como /ruta/index.html.
  trailingSlash: true,

  // El optimizador de imagenes necesita servidor. Hoy no hay <Image>, pero
  // esto evita que el build truene si alguien agrega una despues.
  images: { unoptimized: true },
};

export default nextConfig;
