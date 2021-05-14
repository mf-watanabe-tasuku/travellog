import Link from "next/link";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function AddPostPage() {
  const [values, setValues] = useState({
    title: "",
    body: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.title === "") {
      alert("Please fill in Title");
      return;
    }

    if (values.title.length > 100) {
      alert("Title must be less than 100 characters");
      return;
    }

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        alert("Something went wrong");
        return;
      }
    } else {
      const post = await res.json();
      router.push(`/posts/${post.data.id}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add Post">
      <Link href="/posts">Go Back</Link>
      <h1>Add Post</h1>
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

        <input type="submit" value="Add Post" className="btn-secondary" />
      </form>
    </Layout>
  );
}
