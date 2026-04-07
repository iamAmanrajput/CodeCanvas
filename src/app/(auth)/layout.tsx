import { getServerAuthSession } from "@/helpers/auth-server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
