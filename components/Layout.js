import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
