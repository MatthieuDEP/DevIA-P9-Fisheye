import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header({ showTitle = true }) {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Accueil FishEye" className={styles.homeLink}>
        <Image
          src="/logoFisheye.png"
          alt=""
          width={200}
          height={50}
          priority
        />
      </Link>

      {showTitle && <h1>Nos photographes</h1>}
    </header>
  );
}
