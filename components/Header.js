import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/">
          <a className={styles.header__link}>Travel Log</a>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li>
              <Link href="/posts/add">
                <a className={styles.nav__link}>Add Post</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
