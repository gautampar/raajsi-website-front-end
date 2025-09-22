const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function loginApi(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}
