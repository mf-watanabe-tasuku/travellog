import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/PostItem.module.css";

export default function PostItem({ post }) {
  return (
    <div className={styles.postItem}>
      <div className={styles.postItem_image}>
        <Image
          src={`/images/sample${Math.floor(Math.random() * 10 + 1)}.jpg`}
          width={500}
          height={300}
        />
      </div>
      <div className={styles.postItem_info}>
        <h2 className={styles.postItem_title}>{post.title}</h2>
        <p className={styles.postItem_excerpt}>{post.body.substring(0, 100)}</p>
        <Link href={`/posts/${post.id}`}>
          <span className={styles.postItem_read}>READ ARTICLE</span>
        </Link>
      </div>
    </div>
  );
}
