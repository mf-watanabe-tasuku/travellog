import Link from "next/link";
import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import DashboardPost from "@/components/DashboardPost";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function DashboardPage({ posts, token }) {
  const router = useRouter();

  const deletePost = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <Link href="/posts">Go Back</Link>
      <h1 className="page_heading">Dashboard</h1>
      {posts.map((post) => (
        <DashboardPost post={post} handleDelete={deletePost} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/posts/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
      token,
    },
  };
}
