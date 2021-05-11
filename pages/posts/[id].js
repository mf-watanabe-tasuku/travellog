import { API_URL } from "@/config/index";
import Link from "next/link";

export default function PostPage({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link href="/posts">Back To Posts</Link>
    </div>
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
