import { ModeToggle } from "@/components/mode-toggler";
import { SignupForm } from "../components/signup-form";
import shoppingImage from "/shopping-bags-set-credit-card-woman-s-hand.jpg";
export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-2 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block min-h-full">
        <img
          src={shoppingImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
