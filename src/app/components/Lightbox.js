"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import Modal from "./Modal";
import styles from "./Lightbox.module.css";

export default function Lightbox({
  medias,
  activeIndex,
  onIndexChange,
  onClose,
  returnFocusRef,
}) {
  const closeButtonRef = useRef(null);
  const activeMedia = medias[activeIndex];

  const showPrevious = useCallback(() => {
    onIndexChange(
      activeIndex === 0 ? medias.length - 1 : activeIndex - 1,
    );
  }, [activeIndex, medias.length, onIndexChange]);

  const showNext = useCallback(() => {
    onIndexChange(
      activeIndex === medias.length - 1 ? 0 : activeIndex + 1,
    );
  }, [activeIndex, medias.length, onIndexChange]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    },
    [showNext, showPrevious],
  );

  return (
    <Modal
      onClose={onClose}
      ariaLabel="Vue agrandie du média"
      initialFocusRef={closeButtonRef}
      returnFocusRef={returnFocusRef}
      overlayClassName={styles.overlay}
      dialogClassName={styles.lightbox}
      closeOnBackdrop={false}
      onKeyDown={handleKeyDown}
    >
      <button
        className={`${styles.navigationButton} ${styles.previousButton}`}
        type="button"
        aria-label="Média précédent"
        onClick={showPrevious}
      >
        <Image
          src="/leftArrow.png"
          alt=""
          width={96}
          height={96}
        />
      </button>

      <figure className={styles.figure}>
        <div className={styles.mediaFrame}>
          {activeMedia.image ? (
            <Image
              src={`/${activeMedia.image}`}
              alt={activeMedia.title}
              fill
              sizes="(max-width: 700px) 80vw, 75vw"
              className={styles.image}
              priority
            />
          ) : (
            <video
              key={activeMedia.id}
              src={`/${activeMedia.video}`}
              className={styles.video}
              controls
              autoPlay
              aria-label={activeMedia.title}
            >
              Votre navigateur ne prend pas en charge cette vidéo.
            </video>
          )}
        </div>
        <figcaption aria-live="polite">{activeMedia.title}</figcaption>
      </figure>

      <button
        className={`${styles.navigationButton} ${styles.nextButton}`}
        type="button"
        aria-label="Média suivant"
        onClick={showNext}
      >
        <Image
          src="/rightArrow.png"
          alt=""
          width={96}
          height={96}
        />
      </button>

      <button
        ref={closeButtonRef}
        className={styles.closeButton}
        type="button"
        aria-label="Fermer la vue agrandie"
        onClick={onClose}
      />
    </Modal>
  );
}
