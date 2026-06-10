import Image from "next/image";
import styles from "./MediaCard.module.css";

export default function MediaCard({ media }) {
  const { title, image, video, likes } = media;

  return (
    <article className={styles.card}>
      {image ? (
        <div className={styles.mediaFrame}>
          <Image
            src={`/${image}`}
            alt={title}
            fill
            sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1100px) 50vw, 350px"
            className={styles.image}
          />
        </div>
      ) : (
        <video
          src={`/${video}`}
          className={styles.video}
          controls
          aria-label={title}
        >
          Votre navigateur ne prend pas en charge cette vidéo.
        </video>
      )}

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
