import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL, DEFAULT_IMAGE_PATH } from "@/config/index";
import styles from "@/styles/Post.module.css";

export default function PostPage({ post }) {
  return (
    <Layout title={post.title}>
      <div className={styles.post_container}>
        <div className={styles.post_info}>
          <div>
            <Link href={`/posts/edit/${post.id}`}>
              <span className={styles.post_date}>
                Updated: {new Date(post.updated_at).toLocaleDateString("en-US")}
              </span>
            </Link>
            <span className={styles.post_date}>
              Posted: {new Date(post.created_at).toLocaleDateString("en-US")}
            </span>
          </div>
        </div>
        <h1 className={styles.post_title}>{post.title}</h1>
        <ToastContainer />
        <div className={styles.post_eyecatch}>
          <img
            src={post.eyecatchUrl || DEFAULT_IMAGE_PATH}
            width={860}
            height={500}
          />
        </div>
        <div className={styles.post_body}>{post.body}</div>
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
