"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import {
  SignupErrorSchemaType,
  signupSchema,
  SignupSchemaType,
} from "@/schemas/auth.schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/custom/shared/Loader";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<SignupSchemaType>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [errors, setErrors] = useState<SignupErrorSchemaType>({});
  const [loading, setLoading] = useState({
    credential: false,
    social: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, credential: true }));

    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setLoading((prev) => ({ ...prev, credential: false }));
      return;
    } else {
      setErrors({});
    }
    try {
      const { data, error } = await authClient.signUp.email({
        email: result.data.email,
        password: result.data.password,
        name: result.data.name,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Signup failed");
      } else {
        toast.success("Welcome! Your account has been created 🎉");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, credential: false }));
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setLoading((prev) => ({ ...prev, social: true }));
    const toastId = toast.loading(`Connecting to ${provider}...`, {
      description: "Please wait while we redirect you.",
    });
    try {
      const { data, error } = await authClient.signIn.social({
        provider: provider,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error("Authentication Failed", {
          id: toastId,
          description: error.message || `Could not sign up with ${provider}`,
        });
      }
    } catch (err) {
      console.error(`${provider} sign up error:`, err);
    } finally {
      setLoading((prev) => ({ ...prev, social: false }));
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Container */}
      <div className="w-full max-w-7xl mx-auto flex min-h-screen">
        {/* Left Side */}
        <div className="hidden md:flex flex-col gap-6 flex-1 items-center justify-center bg-linear-to-br from-customTeal via-customBlack to-customTeal p-10">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
          <h1 className="text-3xl text-center font-semibold leading-tight">
            Turn ideas into websites <br /> in seconds.
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md px-6 py-10">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Create your free account</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Connect to CodeCanvas with
              </p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                disabled={loading.credential || loading.social}
                onClick={() => handleSocialSignUp("google")}
                className="flex-1 gap-2 font-bold bg-customBlue hover:bg-customBlue-hover"
              >
                <Image src="/google.svg" alt="google" width={18} height={18} />
                Google
              </Button>
              <Button
                disabled={loading.credential || loading.social}
                onClick={() => handleSocialSignUp("github")}
                className="flex-1 gap-2 font-bold bg-customBlue hover:bg-customBlue-hover"
              >
                <Image src="/github.svg" alt="github" width={18} height={18} />
                GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-8">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">
                Or continue with Email
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-customWhite" htmlFor="fullname">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-customWhite" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-customWhite" htmlFor="password">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pr-10"
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-customGray"
                      size={18}
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-customGray"
                      size={18}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password[0]}</p>
                )}
              </div>

              <Button
                disabled={loading.credential || loading.social}
                className="w-full mt-2 group transition-all duration-300 bg-customBlue hover:bg-customBlue-hover"
              >
                {loading.credential ? (
                  <Loader color="#e2e8f0" />
                ) : (
                  <>
                    Create Account{" "}
                    <ArrowRight
                      strokeWidth="3"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                href={"/signin"}
                className=" cursor-pointer text-customBlue"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
