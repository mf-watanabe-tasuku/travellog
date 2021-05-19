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
      // @todo = Set Cookie
      res.status(200).json({ user: data.user });
    } else {
      // res
      //   .status(data.statusCode)
      //   .json({ message: data.message[0].messages[0].message });
      res.status(400).json({ message: "this is an error!" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
