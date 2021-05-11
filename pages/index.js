import PostItem from "../components/PostItem";
import { API_URL } from "@/config/index";

export default function PostsPage({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/v1/posts`);
  const posts = await res.json();

  return {
    props: { posts },
  };
}
