export const fetchData = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object
): Promise<T> => {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();
  return data;
};

export const signIn = async (email: string, password: string) => {
  const data = await fetchData<{ token: string; user: any }>(
    "/api/auth/sign-in",
    "POST",
    { email, password }
  );
  return data;
};

export const signOut = async () => {
  const data = await fetchData<{ message: string }>(
    "/api/auth/sign-out",
    "GET"
  );
  return data;
};
