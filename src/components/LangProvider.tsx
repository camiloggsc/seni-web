"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { copy, type Copy, type Lang } from "@/content/copy";

const STORAGE_KEY = "seni-lang";

type LangContextValue = {
  lang: Lang;
  t: Copy;
  setLang: (next: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Solo se restaura una elección explícita anterior.
  //
  // Antes también se miraba navigator.language, y eso reescribía la página
  // entera al inglés después de hidratar: el HTML servido siempre sale en
  // español, así que cualquier visitante con navegador en inglés veía el
  // texto cambiar debajo de sus ojos, con el salto de maquetación que eso
  // implica. Quien quiera inglés tiene el conmutador en el encabezado.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Modo privado o almacenamiento bloqueado: se sigue con el idioma base.
      return;
    }
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin persistencia el idioma dura la sesión, que es mejor que romper
      // toda la página con una excepción sin capturar.
    }
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({ lang, t: copy[lang] as Copy, setLang }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}
