import Image from "next/image";
import Link from "next/link";
import styles from "./PhotographerCard.module.css";

export default function PhotographerCard({ photographer }) {
  const { id, name, portrait, city, country, tagline, price } = photographer;

  return (
    <article className={styles.card}>
      <Link
        href={`/photographers/${id}`}
        className={styles.profileLink}
        aria-label={name}
      >
        <Image
          src={`/${portrait}`}
          alt={name}
          width={200}
          height={200}
          className={styles.portrait}
        />
        <h2>{name}</h2>
      </Link>

      <div className={styles.details}>
        <p className={styles.location}>
          {city}, {country}
        </p>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.price}>{price}€/jour</p>
      </div>
    </article>
  );
}
