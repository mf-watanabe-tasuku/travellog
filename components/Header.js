import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.header__link}>Travel Log</a>
      </Link>
    </header>
  );
}
