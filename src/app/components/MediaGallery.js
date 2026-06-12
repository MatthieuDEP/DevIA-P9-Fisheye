"use client";

import { useRef, useState } from "react";
import { addMediaLike } from "../actions/media-likes";
import Lightbox from "./Lightbox";
import MediaCard from "./MediaCard";
import PhotographerSummary from "./PhotographerSummary";
import styles from "./MediaGallery.module.css";

export default function MediaGallery({
  medias,
  photographerId,
  photographerPrice,
}) {
  const [galleryMedias, setGalleryMedias] = useState(medias);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeTriggerRef = useRef(null);

  const openLightbox = (index, trigger) => {
    activeTriggerRef.current = trigger;
    setActiveIndex(index);
  };

  const handleLike = async (mediaId) => {
    const media = galleryMedias.find((item) => item.id === mediaId);

    if (!media) {
      return;
    }

    setGalleryMedias((currentMedias) =>
      currentMedias.map((item) =>
        item.id === mediaId
          ? { ...item, likes: item.likes + 1 }
          : item,
      ),
    );

    try {
      const persistedLikes = await addMediaLike(
        mediaId,
        photographerId,
      );

      setGalleryMedias((currentMedias) =>
        currentMedias.map((item) =>
          item.id === mediaId
            ? { ...item, likes: persistedLikes }
            : item,
        ),
      );
    } catch (error) {
      setGalleryMedias((currentMedias) =>
        currentMedias.map((item) =>
          item.id === mediaId
            ? { ...item, likes: media.likes }
            : item,
        ),
      );

      throw error;
    }
  };

  const totalLikes = galleryMedias.reduce(
    (total, media) => total + media.likes,
    0,
  );

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
        {galleryMedias.map((media, index) => (
          <li key={media.id}>
            <MediaCard
              media={media}
              onOpen={(trigger) => openLightbox(index, trigger)}
              onLike={handleLike}
            />
          </li>
        ))}
      </ul>

      {activeIndex !== null && (
        <Lightbox
          medias={galleryMedias}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
          returnFocusRef={activeTriggerRef}
        />
      )}

      <PhotographerSummary
        totalLikes={totalLikes}
        price={photographerPrice}
      />
    </section>
  );
}
