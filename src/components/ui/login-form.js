"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"
import { Checkbox } from "./Checkbox"
import { Separator } from "./Separator"
import { FaApple, FaChrome } from "react-icons/fa"
import { PasswordInput } from "./password-input"
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginUser } from "@/DAL/user";
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";
import { BUSINESS_ID } from "@/config/config";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";


function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2 text-xs text-muted-foreground">
      <span aria-hidden className="mt-1 inline-block size-1.5 rounded-full bg-muted-foreground/60" />
      <span>{children}</span>
    </li>
  )
}

function RequirementRow({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
      {items.map((t, i) => (
        <Bullet key={i}>{t}</Bullet>
      ))}
    </ul>
  )
}

function SocialButton({ children, icon }) {
  return (
    <Button variant="outline" className="w-full rounded-full h-11 justify-start gap-2 bg-transparent" type="button">
      <span className="size-5 inline-flex items-center justify-center">{icon}</span>
      <span className="font-medium">{children}</span>
    </Button>
  )
}

export function LoginForm() {
  const { login } = useUser();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [agree, setAgree] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }} = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            "businessId": BUSINESS_ID
        },
    });

  const getValidationRules = () => {
    return {
      email: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address"
        }
      },
      password: {
        required: "Password is required",
      },
    };
  };

  const { mutate, isPending , data: loginData} = useMutation({
    mutationFn: async (data) => {
      return await loginUser(data);
    },
    onSuccess: async (result) => {
      // Check for success - API might return different response structures
      if (result.statusCode === 200 || result.status === 200 || result.success === true || !result.code) {
        enqueueSnackbar(result.message || "User account logged in successfully!", { variant: "success" });
        queryClient.invalidateQueries({
          queryKey: ["paymentMethodTypes"],
        });
        // console.log("result", result);
        if (result.data && result.data.accessToken && result.data.awcUser) {
          await login(result.data.awcUser,result.data.accessToken);
        }
        router.push(ROUTES_CONSTANTS.HOME);
      } else {
        enqueueSnackbar(result.message || "Something went wrong", {
          variant: "error",
        });
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Submission failed", {
        variant: "error",
      });
    },
  });


  // useEffect(() => {
  //   if(!loginData) return;
  //   if (loginData) {
  //     localStorage.setItem("awsAccessToken", loginData.data.accessToken);
  //     // localStorage.setItem("user", JSON.stringify(loginData.data.user));
  //     console.log("loginData", loginData);
  //   }
  // }, [loginData]);



  const onSubmit = (data) => {
    // console.log("login data", data);
    mutate(data);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" {...register("email", getValidationRules().email)} />
      </div>

      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <span className="sr-only" id="toggle-help">
            Toggle password visibility
          </span>
        </div>
        <PasswordInput id="password" name="password" aria-describedby="toggle-help" {...register("password", getValidationRules().password)} />

        <div className="mt-2 grid gap-2">
          {/* <RequirementRow items={["Use 8 or more characters", "Use upper and lower case letters (e.g. Aa)"]} />
          <RequirementRow items={["Use a number (e.g. 1234)", "Use a symbol (e.g. !@#$)"]} /> */}
        </div>
      </div>

      {/* <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="confirm">Confirm Password</Label>
          <span className="sr-only" id="toggle-help-2">
            Toggle password visibility
          </span>
        </div>
        <PasswordInput id="confirm" name="confirm" aria-describedby="toggle-help-2" />

        <div className="mt-2 grid gap-2">
          <RequirementRow items={["Use upper and lower case letters (e.g. Aa)", "Use a symbol (e.g. !@#$)"]} />
        </div>
      </div> */}

      {/* <div className="flex items-start gap-3">
        <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
        <Label htmlFor="terms" className="text-xs text-muted-foreground font-normal">
          By creating an account, I agree to our{" "}
          <Link href="#" className="underline underline-offset-4">
            Terms of use
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-4">
            Privacy Policy
          </Link>
        </Label>
      </div> */}

      <Button
        type="submit"
        disabled={isPending}
        className="rounded-full h-11 font-medium bg-amber-600 text-white hover:bg-amber-700"
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>

      <div className="grid gap-4">
        <div className="relative">
          <Separator />
          <span className="absolute inset-0 -top-3 grid place-items-center">
            <span className="px-3 text-xs text-muted-foreground bg-card">OR</span>
          </span>
        </div>

        <SocialButton icon={<FaChrome className="size-4" />}>Continue with Google</SocialButton>
        {/* <SocialButton icon={<FaApple className="size-4" />}>Continue with Apple</SocialButton> */}
      </div>
    </form>
  )
}
