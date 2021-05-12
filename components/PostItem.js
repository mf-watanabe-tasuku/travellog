import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/PostItem.module.css";

export default function PostItem({ post }) {
  return (
    <div className={styles.postItem}>
      <div className={styles.postItem_image}>
        <Image src={`/images/sample${post.id}.jpg`} width={500} height={300} />
      </div>
      <div className={styles.postItem_info}>
        <h2 className={styles.postItem_title}>{post.title}</h2>
        <p>{post.body}</p>
        <Link href={`/posts/${post.id}`}>
          <span className={styles.postItem_read}>READ ARTICLE</span>
        </Link>
      </div>
    </div>
  );
}
