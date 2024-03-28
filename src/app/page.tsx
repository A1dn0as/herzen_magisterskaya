import styles from "./page.module.css";
import ContainerFormRigth from "./components/ContainerFormRight/ContainerFormRigth";

export default function Home() {
  return (
    <main className={styles.main}>
        <ContainerFormRigth />
    </main>
  );
}
