import Image from "next/image";
import styles from "./MediaCard.module.css";

export default function MediaCard({ media, onOpen }) {
  const { title, image, video, likes } = media;

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
        <p className={styles.likes} aria-label={`${likes} mentions j'aime`}>
          <span>{likes}</span>
          <span aria-hidden="true">&#9829;</span>
        </p>
      </div>
    </article>
  );
}
