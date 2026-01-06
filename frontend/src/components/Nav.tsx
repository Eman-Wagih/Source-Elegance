import { ModeToggle } from "@/components/mode-toggler";
import logoDark from "/logoDark.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Hamburger from "hamburger-react";
import { useState } from "react";

function Nav() {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="fixed z-10 top-0 inset-x-0 bg-background/50 backdrop-blur-sm border-b dark:border-slate-700/70">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 h-16">
        <img src={logoDark} alt="logo" className="w-20 h-20" />

        <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
          <Input
            type="text"
            placeholder="Search Products..."
            className="max-w-md"
          />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost">
            <Link to="/">Log In</Link>
          </Button>
          <Button>
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t px-4 py-4 space-y-3">
          <Input type="text" placeholder="Search Products..." />

          <Link
            to="/"
            className="block text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Log In
          </Link>

          <Link
            to="/sign-up"
            className="block text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Sign Up
          </Link>

          <ModeToggle />
        </div>
      )}
    </nav>
  );
}

export default Nav;
