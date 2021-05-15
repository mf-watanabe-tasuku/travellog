import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import styles from "@/styles/Post.module.css";
import { useRouter } from "next/router";

export default function PostPage({ post }) {
  const router = useRouter();

  const deletePost = async () => {
    if (confirm("Are you sure?")) {
      await fetch(`${API_URL}/posts/${post.id}`, {
        method: "DELETE",
      });
      router.push("/posts");
    }
  };

  return (
    <Layout title={post.title}>
      <div className={styles.postItem_container}>
        <div className={styles.postItem_info}>
          <div>
            <Link href={`/posts/edit/${post.id}`}>
              <span className={styles.postItem_date}>
                Updated: {new Date(post.updated_at).toLocaleDateString("en-US")}
              </span>
            </Link>
            <span className={styles.postItem_date}>
              Posted: {new Date(post.created_at).toLocaleDateString("en-US")}
            </span>
          </div>
          <div className={styles.postItem_actions}>
            <span className={styles.postItem_edit}>
              <FaPencilAlt className={styles.postItem_icon} /> Edit Post
            </span>
            <span className={styles.postItem_delete} onClick={deletePost}>
              <FaTimes className={styles.postItem_icon} /> Delete Post
            </span>
          </div>
        </div>
        <h1 className={styles.postItem_title}>{post.title}</h1>
        <ToastContainer />
        <div className={styles.postItem_eyecatch}>
          <Image
            src={`/images/sample${Math.floor(Math.random() * 10 + 1)}.jpg`}
            width={860}
            height={500}
          />
        </div>
        <div className={styles.postItem_body}>{post.body}</div>
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
