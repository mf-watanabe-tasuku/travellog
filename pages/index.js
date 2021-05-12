import Link from "next/link";
import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import { API_URL } from "@/config/index";

export default function PostsPage({ posts }) {
  return (
    <Layout title="TOP">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      {/* <Link href="/posts">View all</Link> */}
    </Layout>
  );
}

export async function getServerSideProps() {
  // const res = await fetch(`${API_URL}/posts?limit=3`);
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}
