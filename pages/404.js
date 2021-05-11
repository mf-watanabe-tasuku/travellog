import Link from "next/link";
import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <p>Sorry, nothing found here.</p>
      <Link href="/">Go Back Home</Link>
    </Layout>
  );
}
