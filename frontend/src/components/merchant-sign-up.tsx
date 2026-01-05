import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "@/api/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import type { clientData } from "./signup-form";

export function MerchantSignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState<clientData>({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
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
      const res = await createUser({ ...formData, type: "seller" });
      if (res.user) {
        navigate("/home");
      }
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="userName">Username</FieldLabel>
                  <Input
                    id="userName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field></Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="passwordConfirm">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="passwordConfirm"
                      type="password"
                      required
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button disabled={Object.keys(errors).length > 0}>
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
