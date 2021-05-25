import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const backendRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await backendRes.json();

    if (backendRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV != "development",
          maxAge: 60 * 60 * 24 + 7,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.data.user, message: data.message });
    } else {
      res.status(500).json({ message: data.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
