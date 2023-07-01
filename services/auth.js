export async function signIn({ email, password }) {
  const req = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/auth/local", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  });

  const { user, jwt } = await req.json();

  return { user, jwt };
}
