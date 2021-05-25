import { parseCookies } from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes, FaImage } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Form.module.css";

export default function EditPostPage({ post, token }) {
  const [values, setValues] = useState({
    title: post.title,
    body: post.body,
  });

  const [imagePreview, setImagePreview] = useState(post.eyecatchUrl);

  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user && user.id !== post.user_id) {
      router.push(`/posts/${post.id}`).then(() => {
        toast.error("Not authorized");
      });
    }
  }, [user]);

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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      let message = "Something went wrong";
      if (res.status === 422) {
        message = data.message;
      }
      toast.error(message);
    } else {
      router.push(`/posts/${data.data.id}`);
      toast.success(data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    setShowModal(!showModal);
    setImagePreview(post.eyecatchUrl);
    toast.success("Image uploaded");
  };

  const deleteEyecatch = async () => {
    await fetch(`${API_URL}/eyecatches/${post.eyecatchId}`, {
      method: "DELETE",
    });
    setImagePreview(null);
    toast.success("Image deleted");
  };

  return (
    <Layout title="Edit Post">
      <Link href={`/posts/${post.id}`}>Go Back</Link>
      <h1>Edit Post</h1>
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

        <input
          type="submit"
          value="Update Post"
          className="btn btn-secondary"
        />
      </form>

      <div className={styles.imagePreview}>
        <h2 className={styles.title}>Post Image</h2>
        {imagePreview ? (
          <div className={styles.eyecatchWrap}>
            <span onClick={deleteEyecatch} className={styles.eyecatchDelete}>
              <FaTimes />
            </span>
            <img src={imagePreview} height={100} width={170} />
          </div>
        ) : (
          <p>No image uploaded</p>
        )}
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-secondary"
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload post={post} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ req, params: { id } }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post: post.data,
      token,
    },
  };
}
