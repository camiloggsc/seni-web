import type { ReactNode } from "react";

/**
 * Visor de cámara.
 *
 * El isotipo de SENI es un marco con rayos saliendo, y el negocio es grabar.
 * Así que lo que hay dentro no se presenta: se encuadra. Convierte al globo
 * de "elemento decorativo de agencia" en "lo que SENI tiene en la mira".
 *
 * Todo es decorativo: no entra al árbol de accesibilidad.
 */
export default function Viewfinder({
  children,
  status,
  place,
}: {
  children: ReactNode;
  status: string;
  place: string;
}) {
  return (
    <div className="viewfinder">
      <div className="viewfinder-frame" aria-hidden="true">
        <span className="vf-corner vf-tl" />
        <span className="vf-corner vf-tr" />
        <span className="vf-corner vf-bl" />
        <span className="vf-corner vf-br" />

        {/* Retícula de tercios, el encuadre básico de cualquier cámara. */}
        <span className="vf-thirds" />

        <span className="vf-status">
          <span className="vf-rec" />
          {status}
        </span>
        <span className="vf-place">{place}</span>
      </div>

      {children}
    </div>
  );
}
