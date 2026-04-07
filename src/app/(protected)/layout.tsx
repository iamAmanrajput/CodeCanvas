import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/helpers/auth-server";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/signin");
  }

  return <>{children}</>;
}
