import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import styles from "@/styles/PostItem.module.css";
import { DEFAULT_IMAGE_PATH } from "@/config/index";

export default function PostItem({ post }) {
  const postBody =
    post.body.length > 150 ? post.body.substring(0, 150) + "..." : post.body;

  return (
    <div className={styles.postItem}>
      <div className={styles.postItem_image}>
        <img
          src={post.eyecatchUrl || DEFAULT_IMAGE_PATH}
          width={500}
          height={300}
        />
      </div>
      <div className={styles.postItem_data}>
        <Link href={`/posts/${post.id}`}>
          <h2 className={styles.postItem_title}>{post.title}</h2>
        </Link>
        <div className={styles.postItem_meta}>
          <p className={styles.postItem_date}>
            <FaPencilAlt className={styles.postItem_icon} />
            {new Date(post.updated_at).toLocaleDateString("en-US")}
          </p>
          {post.place && (
            <p>
              <MdPlace className={styles.postItem_icon} />
              {post.place}
            </p>
          )}
        </div>
        <p className={styles.postItem_excerpt}>{postBody}</p>
        <Link href={`/posts/${post.id}`}>
          <span className={styles.postItem_read}>READ ARTICLE →</span>
        </Link>
      </div>
    </div>
  );
}
