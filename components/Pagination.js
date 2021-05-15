import Link from "next/link";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <div>
      {page > 1 && (
        <Link href={`/posts?page=${page - 1}`}>
          <a className="btn btn-secondary btn-next">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/posts?page=${page + 1}`}>
          <a className="btn btn-secondary">Next</a>
        </Link>
      )}
    </div>
  );
}
