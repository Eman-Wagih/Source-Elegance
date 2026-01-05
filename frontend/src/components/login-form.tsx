import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "@/api/api";

export interface loginData {
  identifier: string;
  password: string;
}
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loginData, setLoginData] = useState<loginData>({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await login(loginData);
      if (response.user) {
        navigate("/home");
      }
    } catch (err: any) {
      console.log(err);
      toast(err.message, { type: "error" });
    }
  }
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => handleSubmit(e)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email or username below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email or username</FieldLabel>
          <Input
            id="identifier"
            type="text"
            placeholder="m@example.com"
            value={loginData.identifier}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={loginData.password}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Button>Login</Button>
        </Field>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
