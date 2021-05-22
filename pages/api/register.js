import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password, passwordConfirm } = req.body;

    const backendRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email,
        password,
        password_confirmation: passwordConfirm,
      }),
    });

    const data = await backendRes.json();

    if (data.status === "created") {
      // @todo = Set Cookie
      res.status(200).json({ user: data.data });
    } else {
      res.status(500).json({ message: data.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
