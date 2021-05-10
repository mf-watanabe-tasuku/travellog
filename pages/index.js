import { API_URL } from "@/config/index";

export default function Home({ data }) {
  return <div>{data.title}</div>;
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api`);
  const data = await res.json();

  return {
    props: {
      data,
      revalidate: 1,
    },
  };
}
