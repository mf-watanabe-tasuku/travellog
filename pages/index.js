import Link from "next/link";
import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import { API_URL } from "@/config/index";
import styles from "@/styles/PostList.module.css";

export default function PostsPage({ posts }) {
  return (
    <Layout title="TOP">
      <h1>Latest Posts</h1>

      <div className={styles.postList}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <Link href="/posts">
        <div className="btn btn-secondary">View all</div>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/posts?limit=3`);
  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
      revalidate: 1,
    },
  };
}
