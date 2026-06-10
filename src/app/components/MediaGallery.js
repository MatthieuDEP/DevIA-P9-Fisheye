import MediaCard from "./MediaCard";
import styles from "./MediaGallery.module.css";

export default function MediaGallery({ medias }) {
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
        {medias.map((media) => (
          <li key={media.id}>
            <MediaCard media={media} />
          </li>
        ))}
      </ul>
    </section>
  );
}
