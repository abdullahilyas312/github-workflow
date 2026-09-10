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
import { BUSINESS_ID } from "@/config/config";
import { createUserAccount } from "@/DAL/user";
import { ROUTES_CONSTANTS } from "@/constants/routesConstants";

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

export function CreateAccountForm() {
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
            confirmPass: "",
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
        confirmPass: {
          required: "Confirm password is required",
          validate: (value, formValues) => {
            if (value !== formValues.password) {
              return "Passwords do not match";
            }
            return true;
          }
        },
      }

    };

    const { mutate, isPending } = useMutation({
      mutationFn: async (data) => {
        return await createUserAccount(data);
      },
      onSuccess: (result) => {
        // Check for success - API might return different response structures
        if (result.statusCode === 200 || result.status === 200 || result.success === true || !result.code) {
          enqueueSnackbar(result.message || "User account created successfully!", { variant: "success" });
          queryClient.invalidateQueries({
            queryKey: ["paymentMethodTypes"],
          });
          router.push(ROUTES_CONSTANTS.LOGIN);
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


    const onSubmit = (data) => {
      // console.log("data", data);
      mutate(data);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" {...register("email", getValidationRules().email)}type="email" placeholder="you@example.com" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <span className="sr-only" id="toggle-help">
            Toggle password visibility
          </span>
        </div>
        <PasswordInput id="password" name="password" {...register("password", getValidationRules().password)} aria-describedby="toggle-help" />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

        <div className="mt-2 grid gap-2">
          {/* <RequirementRow items={["Use 8 or more characters", "Use upper and lower case letters (e.g. Aa)"]} />
          <RequirementRow items={["Use a number (e.g. 1234)", "Use a symbol (e.g. !@#$)"]} /> */}
        </div>
      </div>

      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="confirm">Confirm Password</Label>
          <span className="sr-only" id="toggle-help-2">
            Toggle password visibility
          </span>
        </div>
        <PasswordInput id="confirm" name="confirm" {...register("confirmPass", getValidationRules().confirmPass)} aria-describedby="toggle-help-2" />
        {errors.confirmPass && <span className="text-red-500 text-sm">{errors.confirmPass.message}</span>}

        <div className="mt-2 grid gap-2">
          {/* <RequirementRow items={["Use upper and lower case letters (e.g. Aa)", "Use a symbol (e.g. !@#$)"]} /> */}
        </div>
      </div>

      <div className="flex items-start gap-3">
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
      </div>

      <Button
        type="submit"
        disabled={!agree || isPending}
        className="rounded-full h-11 font-medium bg-amber-600 text-white hover:bg-amber-700"
      >
        {isPending ? "Creating Account..." : "Create Account"}
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
