import { API_URL } from "@/config/index";

export default function PostsPage({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
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
