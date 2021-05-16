import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function EditPostPage({ post }) {
  const [values, setValues] = useState({
    title: post.title,
    body: post.body,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.title === "") {
      toast.error("Please fill in Title");
      return;
    }

    if (values.title.length > 100) {
      toast.error("Title must be less than 100 characters");
      return;
    }

    const res = await fetch(`${API_URL}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Something went wrong");
        return;
      }
    } else {
      const post = await res.json();
      router.push(`/posts/${post.id}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // const imageUploaded = async (e) => {
  //   const res = await fetch(`${API_URL}/posts/${post.id}`);
  //   const data = await res.json();
  //   setImagePreview(data.image[0].formats.thumbnail.url);
  //   setShowModal(false);
  // };

  return (
    <Layout title="Edit Post">
      <Link href="/posts">Go Back</Link>
      <h1>Edit Post</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            name="body"
            value={values.body}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Post" className="btn-secondary" />
      </form>
      <ImageUpload postId={post.id} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post: post.data,
    },
  };
}
