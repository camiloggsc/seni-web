import {
  LOCKUP_WIDTH,
  LOCKUP_HEIGHT,
  MARK_BARE,
  MARK_FRAMED,
  WORD_MARKETING,
  WORD_REG,
  WORD_SENI,
} from "./paths";

const GRADIENT_ID = "seni-brand-gradient";

/** Definicion del degradado de marca, montada una sola vez por documento. */
export function BrandGradientDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B63E2" />
          <stop offset="45%" stopColor="#4D0783" />
          <stop offset="100%" stopColor="#C31DAF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type MarkProps = {
  /** `brand` pinta el isotipo con el degradado; `mono` usa currentColor. */
  variant?: "brand" | "mono";
  framed?: boolean;
  className?: string;
};

export function Mark({ variant = "brand", framed = true, className }: MarkProps) {
  const fill = variant === "brand" ? `url(#${GRADIENT_ID})` : "currentColor";
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {framed ? (
        <path d={MARK_FRAMED} fill={fill} fillRule="nonzero" />
      ) : (
        MARK_BARE.map((d, i) => <path key={i} d={d} fill={fill} />)
      )}
    </svg>
  );
}

type LockupProps = {
  variant?: "brand" | "mono";
  className?: string;
  title?: string;
};

/**
 * Logo completo: isotipo + "SENI" + marketing.
 * Se marca como imagen con nombre accesible porque sustituye al nombre de la marca.
 */
export function Lockup({ variant = "brand", className, title = "SENI marketing" }: LockupProps) {
  const markFill = variant === "brand" ? `url(#${GRADIENT_ID})` : "currentColor";
  return (
    <svg
      viewBox={`0 0 ${LOCKUP_WIDTH} ${LOCKUP_HEIGHT}`}
      className={className}
      role="img"
      aria-label={title}
    >
      <path d={MARK_FRAMED} fill={markFill} fillRule="nonzero" />
      {WORD_SENI.map((d, i) => (
        <path key={`s${i}`} d={d} fill="currentColor" />
      ))}
      {WORD_REG.map((d, i) => (
        <path key={`r${i}`} d={d} fill="currentColor" />
      ))}
      {WORD_MARKETING.map((d, i) => (
        <path key={`m${i}`} d={d} fill="currentColor" opacity={0.72} />
      ))}
    </svg>
  );
}
