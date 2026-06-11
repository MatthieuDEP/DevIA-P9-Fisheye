import Image from "next/image";
import ContactDialog from "./ContactDialog";
import styles from "./PhotographerHeader.module.css";

export default function PhotographerHeader({ photographer }) {
  const { name, city, country, tagline, portrait } = photographer;

  return (
    <section
      className={styles.profile}
      aria-labelledby="photographer-name"
    >
      <div className={styles.identity}>
        <h1 id="photographer-name">{name}</h1>
        <p className={styles.location}>
          {city}, {country}
        </p>
        <p className={styles.tagline}>{tagline}</p>
      </div>

      <ContactDialog
        photographerName={name}
        buttonClassName={styles.contactButton}
      />

      <Image
        src={`/${portrait}`}
        alt={name}
        width={200}
        height={200}
        className={styles.portrait}
        priority
      />
    </section>
  );
}
