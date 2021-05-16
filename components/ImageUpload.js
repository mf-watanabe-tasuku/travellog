import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ post, hasImage, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("refId", post.id);
    formData.append("field", "image");

    const method = hasImage ? "PUT" : "POST";
    const url = hasImage
      ? `${API_URL}/eyecatches/${post.id}`
      : `${API_URL}/eyecatches/`;

    const res = await fetch(url, {
      method: method,
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.formRow}>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn btn-secondary" />
      </form>
    </div>
  );
}
