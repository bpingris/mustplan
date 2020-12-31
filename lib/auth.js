import { getSession } from "next-auth/client";

export async function requiresAuth(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
