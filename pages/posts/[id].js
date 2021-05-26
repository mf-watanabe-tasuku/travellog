import Layout from "@/components/Layout";
import PostMap from "@/components/PostMap";
import Link from "next/link";
import { API_URL, DEFAULT_IMAGE_PATH } from "@/config/index";
import styles from "@/styles/Post.module.css";
import { MdPlace } from "react-icons/md";

export default function PostPage({ post }) {
  return (
    <Layout title={post.title}>
      <div className={styles.post_container}>
        <div className={styles.post_info}>
          <div className={styles.post_date}>
            <span>
              Updated: {new Date(post.updated_at).toLocaleDateString("en-US")}
            </span>
            <span>
              Posted: {new Date(post.created_at).toLocaleDateString("en-US")}
            </span>
          </div>
          {post.place && (
            <div className={styles.post_place}>
              <MdPlace className={styles.post_icon} />
              {post.place}
            </div>
          )}
        </div>
        <h1 className={styles.post_title}>{post.title}</h1>
        <div className={styles.post_eyecatch}>
          <img src={post.eyecatchUrl || DEFAULT_IMAGE_PATH} />
        </div>
        <div className={styles.post_body}>{post.body}</div>
        {post.place && <PostMap post={post} />}
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
