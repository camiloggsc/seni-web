import { Fragment } from "react";

/**
 * Renderiza los acentos escritos en el copy.
 *
 *   *texto*   → itálica serif (el contraste que le da alma al titular)
 *   ==texto== → resaltado con el magenta de marca
 *
 * Se escribe dentro de la frase para que quien edite el copy no tenga que
 * partirla en varios campos ni tocar componentes.
 */
const TOKEN = /(\*[^*]+\*|==[^=]+==)/g;

export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="serif">
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <mark key={i} className="mark">
              {part.slice(2, -2)}
            </mark>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
