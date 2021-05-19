import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>Travel Log</a>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li>
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/posts/add">
              <a>Add Post</a>
            </Link>
          </li>
          <li>
            <Link href="/account/login">
              <a className="btn btn-secondary btn-icon">
                <FaSignInAlt /> Login
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
