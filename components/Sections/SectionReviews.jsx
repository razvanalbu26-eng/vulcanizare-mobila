import styles from "./SectionBlock.module.css";
import { SITE } from "../../lib/config.js";

function Stars({ n = 5 }) {
  return (
    <span aria-label={`${n} din 5`}>
      {"★★★★★".slice(0, n)}
      <span style={{ opacity: 0.25 }}>{"★★★★★".slice(n)}</span>
    </span>
  );
}

export default function SectionReviews() {
  const r = SITE.reviews;
  const items = r?.items || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Recenzii</h2>
        <p className={styles.p}>
          Păreri de la clienți după intervenții pe A7 / E85 și în Buzău.
        </p>
      </div>

      <div className={styles.cardWide}>
        <div className={styles.reviewsTop}>
          <div>
            <div className={styles.reviewsScore}>
              <span className={styles.reviewsRating}>{r?.rating ?? "—"}</span>
              <span className={styles.reviewsStars}>
                <Stars n={5} />
              </span>
            </div>
            <div className={styles.reviewsMeta}>
              {r?.countText ?? "—"} · feedback real din intervenții
            </div>
          </div>

          <div className={styles.reviewsHint}>
            Tip: pentru ETA exact, trimite locația pe WhatsApp.
          </div>
        </div>

        <div className={styles.reviewsGrid}>
          {items.map((it, idx) => (
            <article key={idx} className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <div className={styles.reviewName}>
                  {it.name} <span className={styles.reviewWhere}>· {it.where}</span>
                </div>
                <div className={styles.reviewStars}>
                  <Stars n={it.stars ?? 5} />
                </div>
              </div>

              <div className={styles.reviewText}>{it.text}</div>
              <div className={styles.reviewDate}>{it.date}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
