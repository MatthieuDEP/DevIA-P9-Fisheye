"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./LikeButton.module.css";

export default function LikeButton({ media, onLike }) {
  const [isPending, setIsPending] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLike = async () => {
    if (isPending || isLiked) {
      return;
    }

    setIsPending(true);
    setHasError(false);

    try {
      await onLike(media.id);
      setIsLiked(true);
    } catch {
      setHasError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        aria-label={
          isLiked
            ? `${media.title} a reçu votre j'aime`
            : `Ajouter un j'aime à ${media.title}`
        }
        aria-pressed={isLiked}
        aria-describedby={`like-status-${media.id}`}
        disabled={isPending || isLiked}
        onClick={handleLike}
      >
        <span aria-live="polite">{media.likes}</span>
        <Image
          src="/heart.png"
          alt=""
          width={21}
          height={24}
        />
      </button>
      <span
        id={`like-status-${media.id}`}
        className={styles.status}
        role="status"
      >
        {hasError ? "Le like n'a pas pu être enregistré." : ""}
      </span>
    </div>
  );
}
