"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useUserStore } from "../../store/useUserStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

// 1. Updated Schema for Registration
const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)/,
        "Must include an uppercase letter and a number",
      ),
    confirmPassword: z
      .string()
      .min(8, "Please confirm your password.")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)/,
        "Must include an uppercase letter and a number",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { signUp } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    try {
      const result = await signUp({
        email: data.email,
        password: data.password,
      });
      if (result.success) {
        toast.success("Account created!", {
          description: "You can now log in with your credentials.",
        });
        router.push("/login");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: "Something went wrong. Please try again.",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Create account</CardTitle>
        <CardDescription>
          Lets get you started sharing your links!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="e.g. alex@email.com"
                  disabled={isLoading}
                  className="pl-10"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="password">Create password</FieldLabel>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  disabled={isLoading}
                  className="pl-10"
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            {/* Confirm Password Field */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  disabled={isLoading}
                  className="pl-10"
                  aria-invalid={!!errors.confirmPassword}
                />
              </div>
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="signup-form"
          className="w-full bg-[#633CFF] hover:bg-[#5333ee] cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Creating account..." : "Create New Accout"}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
