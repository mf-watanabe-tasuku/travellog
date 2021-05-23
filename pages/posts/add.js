import { parseCookies } from "@/helpers/index";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPostPage({ token }) {
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
      toast.error(post.message);
      return;
    } else {
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
      <h1 className="page_heading">Add Post</h1>
      <ToastContainer />
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
