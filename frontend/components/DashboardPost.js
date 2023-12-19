import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/Dashboard.module.css";

export default function DashboardPost({ post, handleDelete }) {
  return (
    <div className={styles.dashboardItem}>
      <div>{post.title}</div>
      <div className={styles.dashboardItem_actions}>
        <Link href={`/posts/edit/${post.id}`}>
          <span className={styles.dashboardItem_edit}>
            <FaPencilAlt className={styles.dashboardItem_icon} /> Edit
          </span>
        </Link>
        <span
          className={styles.dashboardItem_delete}
          onClick={() => {
            handleDelete(post.id);
          }}
        >
          <FaTimes className={styles.dashboardItem_icon} /> Delete
        </span>
      </div>
    </div>
  );
}
