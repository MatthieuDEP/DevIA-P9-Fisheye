"use client";

import { useMemo, useRef, useState } from "react";
import { addMediaLike } from "../actions/media-likes";
import Lightbox from "./Lightbox";
import MediaCard from "./MediaCard";
import PhotographerSummary from "./PhotographerSummary";
import SortMenu from "./SortMenu";
import styles from "./MediaGallery.module.css";

export default function MediaGallery({
  medias,
  photographerId,
  photographerPrice,
}) {
  const [galleryMedias, setGalleryMedias] = useState(medias);
  const [sortCriterion, setSortCriterion] = useState("popularity");
  const [activeMediaId, setActiveMediaId] = useState(null);
  const activeTriggerRef = useRef(null);

  const sortedMedias = useMemo(
    () =>
      [...galleryMedias].sort((firstMedia, secondMedia) => {
        if (sortCriterion === "popularity") {
          return secondMedia.likes - firstMedia.likes;
        }

        if (sortCriterion === "date") {
          return secondMedia.date.localeCompare(firstMedia.date);
        }

        return firstMedia.title.localeCompare(secondMedia.title, "fr", {
          sensitivity: "base",
        });
      }),
    [galleryMedias, sortCriterion],
  );

  const activeIndex = sortedMedias.findIndex(
    (media) => media.id === activeMediaId,
  );

  const openLightbox = (mediaId, trigger) => {
    activeTriggerRef.current = trigger;
    setActiveMediaId(mediaId);
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
      <SortMenu
        value={sortCriterion}
        onChange={setSortCriterion}
      />
      <p className={styles.sortStatus} aria-live="polite">
        Médias triés par{" "}
        {sortCriterion === "popularity"
          ? "popularité"
          : sortCriterion === "date"
            ? "date"
            : "titre"}
        .
      </p>

      <ul className={styles.list}>
        {sortedMedias.map((media) => (
          <li key={media.id}>
            <MediaCard
              media={media}
              onOpen={(trigger) => openLightbox(media.id, trigger)}
              onLike={handleLike}
            />
          </li>
        ))}
      </ul>

      {activeMediaId !== null && activeIndex !== -1 && (
        <Lightbox
          medias={sortedMedias}
          activeIndex={activeIndex}
          onIndexChange={(index) =>
            setActiveMediaId(sortedMedias[index].id)
          }
          onClose={() => setActiveMediaId(null)}
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
