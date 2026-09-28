"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "nur-saved";

// "My list" stored in the visitor's browser (localStorage).
export function useSaved() {
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
    setReady(true);
  }, []);

  const toggle = useCallback((item) => {
    setSaved((prev) => {
      const exists = prev.some((s) => s.id === item.id && s.type === item.type);
      const next = exists ? prev.filter((s) => !(s.id === item.id && s.type === item.type)) : [...prev, item];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const has = useCallback((item) => saved.some((s) => s.id === item.id && s.type === item.type), [saved]);
  return { saved, toggle, has, ready };
}
