import PhotographerCard from "./PhotographerCard";
import styles from "./PhotographerList.module.css";

export default function PhotographerList({ photographers }) {
  return (
    <ul className={styles.list}>
      {photographers.map((photographer) => (
        <li key={photographer.id}>
          <PhotographerCard photographer={photographer} />
        </li>
      ))}
    </ul>
  );
}
