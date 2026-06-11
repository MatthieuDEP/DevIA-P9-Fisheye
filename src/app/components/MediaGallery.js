"use client";

import { useRef, useState } from "react";
import Lightbox from "./Lightbox";
import MediaCard from "./MediaCard";
import styles from "./MediaGallery.module.css";

export default function MediaGallery({ medias }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeTriggerRef = useRef(null);

  const openLightbox = (index, trigger) => {
    activeTriggerRef.current = trigger;
    setActiveIndex(index);
  };

  return (
    <section className={styles.gallery} aria-label="Portfolio du photographe">
      <div className={styles.sort}>
        <label htmlFor="media-sort">Trier par</label>
        <select id="media-sort" name="media-sort" defaultValue="popularity">
          <option value="popularity">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>

      <ul className={styles.list}>
        {medias.map((media, index) => (
          <li key={media.id}>
            <MediaCard
              media={media}
              onOpen={(trigger) => openLightbox(index, trigger)}
            />
          </li>
        ))}
      </ul>

      {activeIndex !== null && (
        <Lightbox
          medias={medias}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
          returnFocusRef={activeTriggerRef}
        />
      )}
    </section>
  );
}
