import Header from "./components/Header";
import PhotographerList from "./components/PhotographerList";
import { getAllPhotographers } from "./lib/prisma-db";
import styles from "./page.module.css";

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <PhotographerList photographers={photographers} />
      </main>
    </div>
  );
}
