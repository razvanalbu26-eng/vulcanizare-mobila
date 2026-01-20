"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BurgerMenu.module.css";
import { SITE } from "../../lib/config.js";

/**
 * Poate fi folosit în 2 moduri:
 * 1) Necontrolat (default): <BurgerMenu />
 * 2) Controlat din exterior: <BurgerMenu open={open} onOpenChange={setOpen} trigger="none" />
 */
export default function BurgerMenu({
  open: openProp,
  onOpenChange,
  trigger = "burger", // "burger" | "none"
}) {
  const [openLocal, setOpenLocal] = useState(false);
  const panelRef = useRef(null);

  const isControlled = typeof openProp === "boolean";
  const open = isControlled ? openProp : openLocal;

  const setOpen = (next) => {
    if (isControlled) onOpenChange?.(next);
    else setOpenLocal(next);
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function jump(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }

  return (
    <div className={styles.wrap} ref={panelRef}>
      {trigger === "burger" && (
        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="Meniu"
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {open && (
        <div className={styles.panel}>
          {SITE.sections.map((s) => (
            <button
              key={s.id}
              className={styles.item}
              onClick={() => jump(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
