import styles from "./SectionBlock.module.css";
import { SITE } from "../../lib/config.js";

const isVideo = (src = "") => /\.(mp4|webm|ogg)$/i.test(src);

export default function SectionGallery() {
  const items = SITE.gallery?.items || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Galerie</h2>
        <p className={styles.p}>
          Câteva imagini și clipuri din intervenții (A7 / E85 / Buzău). Fără povești — doar real.
        </p>
      </div>

      <div className={styles.cardWide}>
        {items.length === 0 ? (
          <div style={{ opacity: 0.8 }}>
            În curând adăugăm poze/clipuri. (Pune fișiere în <b>/public/gallery/</b> și completează lista din config.)
          </div>
        ) : (
          <div className={styles.galleryRail}>
            {items.map((it, idx) => {
              const video = isVideo(it.src);

              return (
                <figure key={idx} className={styles.galleryItem}>
                  <div className={styles.mediaWrap}>
                    {video ? (
                      <video
                        className={styles.galleryMedia}
                        src={it.src}
                        poster={it.poster}
                        controls
                        muted
                        preload="metadata"
                        playsInline
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={styles.galleryMedia}
                        src={it.src}
                        alt={it.alt || "Galerie"}
                        loading="lazy"
                      />
                    )}
                  </div>

                  {it.alt ? (
                    <figcaption className={styles.galleryCaption}>
                      {it.alt}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
