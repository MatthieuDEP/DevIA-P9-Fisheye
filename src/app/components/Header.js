import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="FishEye Home page" className={styles.homeLink}>
        <Image
          src="/logoFisheye.png"
          alt=""
          width={200}
          height={50}
          priority
        />
      </Link>

      <h1>Nos photographes</h1>
    </header>
  );
}
