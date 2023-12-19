import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

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
          {user ? (
            // If logged in
            <>
              <li>
                <Link href="/posts/add">
                  <a>Add Post</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
