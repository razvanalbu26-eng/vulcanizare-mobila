"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ({ items = [] }) {
  return (
    <div className={styles.wrap}>
      {items.map((it, idx) => (
        <FAQItem
          key={idx}
          idx={idx}
          q={it.q}
          a={it.a}
          defaultOpen={idx === 0}
        />
      ))}
    </div>
  );
}

function FAQItem({ idx, q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `faq-panel-${idx}`;

  return (
    <div className={`${styles.item} ${open ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.q}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={styles.qText}>{q}</span>
        <span className={styles.icon} aria-hidden="true">
          {open ? "–" : "+"}
        </span>
      </button>

      {/* IMPORTANT: nu aria-hidden aici; folosim hidden (mai safe) */}
      <div id={panelId} className={styles.a} hidden={!open}>
        <div className={styles.aInner}>{a}</div>
      </div>
    </div>
  );
}
