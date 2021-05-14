import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import styles from "@/styles/Post.module.css";

export default function PostPage({ post }) {
  return (
    <Layout title={post.title}>
      <div className={styles.postItem_container}>
        <div>
          <span className={styles.postItem_date}>
            Updated: {new Date(post.updated_at).toLocaleDateString("en-US")}
          </span>
          <span className={styles.postItem_date}>
            Posted: {new Date(post.created_at).toLocaleDateString("en-US")}
          </span>
        </div>
        <h1 className={styles.postItem_title}>{post.title}</h1>
        <div className={styles.postItem_eyecatch}>
          <Image
            src={`/images/sample${Math.floor(Math.random() * 10 + 1)}.jpg`}
            width={860}
            height={500}
          />
        </div>
        <div className={styles.postItem_body}>{post.body}</div>
        <Link href="/posts">Back To Posts</Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post: post.data,
    },
  };
}
