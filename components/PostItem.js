import Link from "next/link";
import Image from "next/image";

export default function PostItem({ post }) {
  return (
    <div>
      <Image src={`/images/sample${post.id}.jpg`} width={500} height={300} />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link href={`/posts/${post.id}`}>
        <span>READ</span>
      </Link>
    </div>
  );
}
