import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { ModeToggle } from "./mode-toggler";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { createUser } from "@/api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface clientData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState<clientData>({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createUser(formData);
    } catch (err: any) {
      console.log(err);
      toast(err.message, { type: "error" });
    }
  }

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (formData.email) {
      const hasAt = formData.email.includes("@");
      const hasDot = formData.email.includes(".");
      if (!hasAt || !hasDot) {
        newErrors.email = "Please enter a valid email";
      }
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (
      formData.password &&
      formData.passwordConfirm &&
      formData.password !== formData.passwordConfirm
    ) {
      newErrors.passwordConfirm = "Passwords do not match.";
    }
    setErrors(newErrors);
  }, [formData]);
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
          <Input
            id="fullName"
            type="text"
            placeholder="John"
            required
            onChange={handleChange}
            value={formData.fullName}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="userName">Username</FieldLabel>
          <Input
            id="userName"
            type="text"
            placeholder="Doe"
            required
            onChange={handleChange}
            value={formData.userName}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={handleChange}
            value={formData.email}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">{errors.email}</p>
          )}
          <FieldDescription>
            We&apos;ll use this to contact you.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            onChange={handleChange}
            value={formData.password}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && (
            <p className="text-destructive text-xs mt-1">{errors.password}</p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="passwordConfirm">Confirm Password</FieldLabel>
          <Input
            id="passwordConfirm"
            type="password"
            required
            onChange={handleChange}
            value={formData.passwordConfirm}
            className={errors.passwordConfirm ? "border-destructive" : ""}
          />
        </Field>
        {errors.passwordConfirm && (
          <p className="text-destructive text-xs mt-1">
            {errors.passwordConfirm}
          </p>
        )}

        <Field>
          <Button
            type="submit"
            className="w-full"
            disabled={Object.keys(errors).length > 0}
          >
            Create Account
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to="/" className="underline">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
