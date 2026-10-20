import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { id as idTranslations, Translations } from './id';
import { en as enTranslations } from './en';
import { SITE_URL } from '../config';

export type Language = 'en' | 'id';
export type TransitionPhase = 'idle' | 'out' | 'in';

function deepMergeTranslations(fallback: Translations, override: Partial<Translations>): Translations {
  const result = { ...fallback } as any;
  for (const key of Object.keys(override) as (keyof Translations)[]) {
    const overrideVal = (override as any)[key];
    const fallbackVal = (fallback as any)[key];
    if (
      overrideVal &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = { ...fallbackVal, ...overrideVal };
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result as Translations;
}

export const enMerged: Translations = deepMergeTranslations(idTranslations, enTranslations);

interface LangContextType {
  lang: Language;
  phase: TransitionPhase;
  t: Translations;
  setLang: (lang: Language) => void;
  format: (template: string, params?: Record<string, string>) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function getLangFromPathname(pathname: string): Language {
  const normalized = pathname.toLowerCase();
  if (normalized === '/id' || normalized === '/id/' || normalized.startsWith('/id/')) {
    return 'id';
  }
  return 'en';
}

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return getLangFromPathname(window.location.pathname);
    }
    return 'en';
  });

  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const phaseRef = useRef<TransitionPhase>('idle');
  const timeoutOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutInRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollAnchorRef = useRef<{ index: number; top: number } | null>(null);

  const saveScrollAnchor = () => {
    if (typeof document === 'undefined') return;
    const headerEl = document.querySelector('header');
    const navHeight = headerEl ? headerEl.getBoundingClientRect().height : 64;
    const threshold = navHeight + 8;
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const children = Array.from(mainEl.children);
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (rect.bottom > threshold) {
        scrollAnchorRef.current = { index: i, top: rect.top };
        return;
      }
    }
  };

  const setLang = (nextLang: Language) => {
    // a) Jika bahasa tujuan sama, atau phase bukan 'idle', abaikan klik
    if (nextLang === lang || phaseRef.current !== 'idle') {
      return;
    }

    // b) Jika prefers-reduced-motion: langsung pushState dan setLangState, selesai
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targetPath = nextLang === 'id' ? '/id' : '/';

    if (prefersReducedMotion) {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', targetPath);
      }
      setLangState(nextLang);
      return;
    }

    // c) Selain itu: simpan scroll anchor, phase='out'.
    // Setelah 140ms: window.history.pushState, setLangState, phase='in'.
    // Setelah 320ms lagi: phase='idle'.
    saveScrollAnchor();
    setPhase('out');
    phaseRef.current = 'out';

    timeoutOutRef.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', targetPath);
      }
      setLangState(nextLang);
      setPhase('in');
      phaseRef.current = 'in';

      timeoutInRef.current = setTimeout(() => {
        setPhase('idle');
        phaseRef.current = 'idle';
      }, 320);
    }, 140);
  };

  // d) popstate (tombol back) tetap ganti bahasa langsung tanpa animasi
  useEffect(() => {
    const handlePopState = () => {
      if (timeoutOutRef.current) clearTimeout(timeoutOutRef.current);
      if (timeoutInRef.current) clearTimeout(timeoutInRef.current);
      phaseRef.current = 'idle';
      setPhase('idle');
      scrollAnchorRef.current = null;
      setLangState(getLangFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (timeoutOutRef.current) clearTimeout(timeoutOutRef.current);
      if (timeoutInRef.current) clearTimeout(timeoutInRef.current);
    };
  }, []);

  // Jaga posisi scroll: setelah bahasa ter-commit, hitung selisih top dan scrollBy
  useLayoutEffect(() => {
    if (scrollAnchorRef.current && scrollAnchorRef.current.index >= 0) {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        const children = Array.from(mainEl.children);
        const targetChild = children[scrollAnchorRef.current.index];
        if (targetChild) {
          const newTop = targetChild.getBoundingClientRect().top;
          const diff = newTop - scrollAnchorRef.current.top;
          if (Math.abs(diff) > 0.5) {
            window.scrollBy({ top: diff, behavior: 'instant' as ScrollBehavior });
          }
        }
      }
      scrollAnchorRef.current = null;
    }
  }, [lang]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Set document.documentElement.lang
    document.documentElement.lang = lang;

    // 2. Set <link rel="canonical">
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const baseSiteUrl = (SITE_URL || '').replace(/\/+$/, '');
    const canonicalPath = lang === 'id' ? '/id' : '/';
    const canonicalHref = baseSiteUrl ? `${baseSiteUrl}${canonicalPath}` : canonicalPath;

    if (canonical) {
      canonical.setAttribute('href', canonicalHref);
    }

    // 3. Update titles & meta tags
    const currentT = lang === 'id' ? idTranslations : enMerged;
    document.title = currentT.meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentT.meta.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentT.meta.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', currentT.meta.description);
    }
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', currentT.meta.title);
    }
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', currentT.meta.description);
    }
  }, [lang]);

  const t = useMemo(() => {
    return lang === 'id' ? idTranslations : enMerged;
  }, [lang]);

  const format = (template: string, params?: Record<string, string>): string => {
    if (!params) return template;
    let result = template;
    for (const [key, val] of Object.entries(params)) {
      result = result.replaceAll(`{${key}}`, val);
    }
    return result;
  };

  return (
    <LangContext.Provider value={{ lang, phase, t, setLang, format }}>
      {children}
    </LangContext.Provider>
  );
};

export function useT() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useT must be used within a LangProvider');
  }
  return context;
}
export { idTranslations };
