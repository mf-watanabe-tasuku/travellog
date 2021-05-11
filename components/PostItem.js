import Link from "next/link";

export default function PostItem({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link href={`/posts/${post.id}`}>
        <span>READ</span>
      </Link>
    </div>
  );
}
