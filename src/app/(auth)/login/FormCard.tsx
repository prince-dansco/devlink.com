"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";

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
import { useUserStore } from "../../store/useUserStore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(15, "Password is too long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)/,
      "Must include an uppercase letter and a number",
    ),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { login } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Final Submit Function
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      if (result.success) {
        toast.success("Welcome back!");
        router.push("/mainLayout");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
      console.log(error, "Please check your credentials and try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="name@example.com"
                  disabled={isLoading}
                  className="pl-10"
                  aria-invalid={!!errors.email}
                />
              </div>
              {/* Error Display */}
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="234567y gvhbt •••"
                  className="pl-10"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                />
              </div>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="login-form"
          className="w-full bg-[#633CFF] cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Login"}
        </Button>

        <p className="text-sm text-center text-muted-foreground ">
          Don&apos;t have an account?{" "}
          <Link
            href="/SignUp"
            className="text-blue-600 hover:underline font-semibold"
          >
            Create account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
