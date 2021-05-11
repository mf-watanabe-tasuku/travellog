import Layout from "@/components/Layout";
import PostItem from "@/components/PostItem";
import { API_URL } from "@/config/index";

export default function PostsPage({ posts }) {
  return (
    <Layout title="Posts Page">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}
