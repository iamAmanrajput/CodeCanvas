import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerAuthSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Auth Session Error:", error);
    return null;
  }
}
