import Image from "next/image";
import LikeButton from "./LikeButton";
import styles from "./MediaCard.module.css";

export default function MediaCard({ media, onOpen, onLike }) {
  const { title, image, video } = media;

  return (
    <article className={styles.card}>
      <button
        className={styles.mediaButton}
        type="button"
        aria-label={`Afficher ${title} en grand`}
        onClick={(event) => onOpen(event.currentTarget)}
      >
        {image ? (
          <Image
            src={`/${image}`}
            alt={title}
            fill
            sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1100px) 50vw, 350px"
            className={styles.image}
          />
        ) : (
          <video
            src={`/${video}`}
            className={styles.video}
            muted
            preload="metadata"
            aria-hidden="true"
          />
        )}
      </button>

      <div className={styles.details}>
        <h2>{title}</h2>
        <LikeButton media={media} onLike={onLike} />
      </div>
    </article>
  );
}
