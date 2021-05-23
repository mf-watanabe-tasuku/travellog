import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const backendRes = await fetch(`${API_URL}/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ user: user.data });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
