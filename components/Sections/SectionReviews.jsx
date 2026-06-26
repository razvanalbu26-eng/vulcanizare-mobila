"use client";

import { useEffect, useState } from "react";
import styles from "./SectionBlock.module.css";
import { SITE } from "../../lib/config.js";

function Stars({ n = 5 }) {
  const value = Math.max(0, Math.min(5, Math.round(Number(n) || 5)));

  return (
    <span aria-label={`${value} din 5`}>
      {"★★★★★".slice(0, value)}
      <span style={{ opacity: 0.25 }}>
        {"★★★★★".slice(value)}
      </span>
    </span>
  );
}

export default function SectionReviews() {
  const [r, setR] = useState(SITE.reviews);
  const items = r?.items || [];

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setR({
          ...SITE.reviews,
          ...data,
          items: data?.items?.length ? data.items : SITE.reviews.items,
        });
      })
      .catch(() => {
        setR(SITE.reviews);
      });
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Recenzii reale Google</h2>
        <p className={styles.p}>
          Păreri de la clienți după intervenții pe A7 / E85 și în Buzău.
        </p>
      </div>

      <div className={styles.cardWide}>
        <div className={styles.reviewsTop}>
          <div>
            <div className={styles.reviewsScore}>
              <span className={styles.reviewsRating}>
                {r?.rating ?? "—"}
              </span>

              <span className={styles.reviewsStars}>
                <Stars n={r?.rating ?? 5} />
              </span>
            </div>

            <div className={styles.reviewsMeta}>
              {r?.countText ?? "—"} · feedback real din intervenții
            </div>
          </div>

          {r?.googleUrl ? (
            <a
              href={r.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reviewsHint}
            >
              ⭐ Vezi toate recenziile pe Google
            </a>
          ) : (
            <div className={styles.reviewsHint}>
              Tip: pentru ETA exact, trimite locația pe WhatsApp.
            </div>
          )}
        </div>

        <div className={styles.reviewsGrid}>
          {items.map((it, idx) => (
            <article key={idx} className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <div className={styles.reviewName}>
                  {it.name}
                  <span className={styles.reviewWhere}>
                    {" "}· {it.where}
                  </span>
                </div>

                <div className={styles.reviewStars}>
                  <Stars n={it.stars ?? 5} />
                </div>
              </div>

              <div className={styles.reviewText}>
                {it.text}
              </div>

              <div className={styles.reviewDate}>
                {it.date}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}