"use client";

import { Button, Checkbox, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { signIn } from "@/lib";
import { User } from "@/types/api";

type SignInForm = Partial<User>;

const signInSchema = yup.object({
  email: yup.string().email("Invalid email address"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const [enabled, setEnabled] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignInForm) => {
    setError(null);
    try {
      if (!data?.email || !data?.password) {
        throw new Error("Missing email or password");
      }
      await signIn(data?.email, data?.password);

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            width={47}
            height={40}
            alt="Duc Nguyen Logo"
          />
          <h2 className="mt-10 text-xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-xs/6 font-medium text-gray-500">
            Not a member?
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Start a 14 day free trial
            </a>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 sm:w-96" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  required
                  {...register("email")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  {...register("password")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div>
              <div className="flex items-center justify-between">
                <Field className="flex items-center gap-x-2">
                  <Checkbox
                    id="remember_me"
                    checked={enabled}
                    onChange={setEnabled}
                    className="group size-6 border rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                  >
                    <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                  </Checkbox>
                  <Label htmlFor="remember_me" className="text-sm">
                    Remember me
                  </Label>
                </Field>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded bg-indigo-600 py-2 px-4 text-sm font-semibold text-white data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700"
              >
                Sign in
              </Button>
            </div>

            <div className="!mt-10 space-y-6">
              <p className="relative text-center text-sm text-gray-950 before:absolute before:left-0 before:top-1/2 before:w-1/3 before:h-[1px] before:bg-slate-200 after:absolute after:right-0 after:top-1/2 after:w-1/3 after:h-[1px] after:bg-slate-200">
                Or continue with
              </p>

              <div className="flex items-center justify-between gap-x-4">
                <Button className="flex w-full justify-center border rounded bg-white py-2 px-4 text-sm font-semibold text-gray-900 data-[hover]:bg-slate-100 data-[active]:bg-slate-700">
                  Google
                </Button>

                <Button className="flex w-full justify-center border rounded bg-white py-2 px-4 text-sm font-semibold text-gray-900 data-[hover]:bg-slate-100 data-[active]:bg-slate-700">
                  GitHub
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
