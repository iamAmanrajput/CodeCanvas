"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Loader from "./Loader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully");
            router.push("/signin");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign out");
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 relative">
        {/* LEFT → LOGO */}
        <Link
          href="/"
          className="flex gap-2 items-center hover:opacity-80 duration-200"
        >
          <Image src="/logo.svg" alt="logo" width={20} height={20} />
          <h1>
            Code <span className="text-customBlue-hover">Canvas</span>
          </h1>
        </Link>

        {/* CENTER → LINKS */}
        <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className={`${pathname === "/" && "text-white"} hover:text-white`}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={`${pathname === "/features" && "text-white"} hover:text-white`}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={`${pathname === "/pricing" && "text-white"} hover:text-white`}
          >
            Pricing
          </Link>
        </nav>

        {/* RIGHT → AVATAR + BUTTONS */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              {/* Avatar */}
              <Avatar
                onClick={() => router.push("/profile")}
                className="w-8 h-8 cursor-pointer"
              >
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Desktop Signout */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleSignOut}
                className="hidden md:flex items-center gap-1 font-outfit group transition-all duration-300"
              >
                {isLoading ? (
                  <Loader size={8} />
                ) : (
                  <>
                    Sign Out
                    <LogOut
                      size={16}
                      strokeWidth={3}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => router.push("/signin")}
                className="hidden sm:flex font-outfit group transition-all duration-300"
              >
                Sign In{" "}
                <LogIn
                  strokeWidth={3}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Button
                size={"sm"}
                onClick={() => router.push("/signup")}
                className="hidden sm:flex font-outfit group transition-all duration-300 bg-customBlue hover:bg-customBlue-hover"
              >
                Sign Up{" "}
                <UserPlus
                  strokeWidth={3}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          )}

          {/* Hamburger (Mobile only) */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/features" className="block">
            Features
          </Link>
          <Link href="/pricing" className="block">
            Pricing
          </Link>

          {session ? (
            <Button
              onClick={handleSignOut}
              size="sm"
              variant="outline"
              className="w-full"
            >
              {isLoading ? <Loader /> : "Sign Out"}
            </Button>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={() => router.push("/signin")}
                size="sm"
                variant="outline"
                className="w-full"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => router.push("/signup")}
                className="w-full bg-customBlue hover:bg-customBlue-hover"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
