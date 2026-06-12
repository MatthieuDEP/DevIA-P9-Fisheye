import Image from "next/image";
import styles from "./PhotographerSummary.module.css";

export default function PhotographerSummary({
  totalLikes,
  price,
}) {
  return (
    <aside
      className={styles.summary}
      aria-label="Informations du photographe"
    >
      <p
        className={styles.totalLikes}
        aria-label={`${totalLikes} mentions j'aime au total`}
      >
        <span aria-live="polite">{totalLikes}</span>
        <Image
          src="/heart.png"
          alt=""
          width={21}
          height={24}
        />
      </p>
      <p>{price}€ / jour</p>
    </aside>
  );
}
