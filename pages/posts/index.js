import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";
import styles from "@/styles/PostList.module.css";

export default function PostsPage({ posts, page, total }) {
  return (
    <Layout title="All Posts">
      <h1 className="page_heading">Posts {`- Page: ${page}`}</h1>

      <div className={styles.postList}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/posts/count`);
  const totalData = await totalRes.json();
  const total = totalData.data;

  const postsRes = await fetch(
    `${API_URL}/posts?limit=${PER_PAGE}&start=${start}`
  );
  const posts = await postsRes.json();

  return {
    props: {
      posts: posts.data,
      page: +page,
      total,
    },
  };
}
