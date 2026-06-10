import { notFound } from "next/navigation";
import Header from "../../components/Header";
import MediaGallery from "../../components/MediaGallery";
import PhotographerHeader from "../../components/PhotographerHeader";
import {
  getAllMediasForPhotographer,
  getPhotographer,
} from "../../lib/prisma-db";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const photographerId = Number(id);

  if (!Number.isInteger(photographerId)) {
    return {};
  }

  const photographer = await getPhotographer(photographerId);

  if (!photographer) {
    return {};
  }

  return {
    title: `${photographer.name} - FishEye`,
    description: photographer.tagline,
  };
}

export default async function PhotographerPage({ params }) {
  const { id } = await params;
  const photographerId = Number(id);

  if (!Number.isInteger(photographerId)) {
    notFound();
  }

  const [photographer, medias] = await Promise.all([
    getPhotographer(photographerId),
    getAllMediasForPhotographer(photographerId),
  ]);

  if (!photographer) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header showTitle={false} />

      <main className={styles.main}>
        <PhotographerHeader photographer={photographer} />
        <MediaGallery medias={medias} />
      </main>
    </div>
  );
}
