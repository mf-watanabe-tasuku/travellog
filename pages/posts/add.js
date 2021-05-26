import { parseCookies } from "@/helpers/index";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { toast } from "react-toastify";

export default function AddPostPage({ token }) {
  const [values, setValues] = useState({
    title: "",
    body: "",
    place: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postRes = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const post = await postRes.json();

    if (!postRes.ok) {
      toast.error(post.data);
      return;
    } else {
      router.push(`/posts/${post.data.id}`);
      toast.success(post.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add Post">
      <Link href="/posts">Go Back</Link>
      <h1 className="page_heading">Add Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_row}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="place">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={values.place}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            name="body"
            value={values.body}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Post" className="btn-secondary" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
