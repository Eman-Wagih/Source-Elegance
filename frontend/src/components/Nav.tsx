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
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="fixed z-10 top-0 inset-x-0 bg-background/50 backdrop-blur-sm border-b dark:border-slate-700/70">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4 xs:h-20">
          <div className="flex items-center">
            <img src={logoDark} alt="logo" className="w-24 h-24" />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search Products..."
              className="w-2xl"
            />
          </div>
          <div>
            <ModeToggle />
            <Button variant="ghost">
              <Link to="/">Log In </Link>
            </Button>
            <Button>
              <Link to="/sign-up">Sign up </Link>
            </Button>
          </div>
          <div>
            <Hamburger toggled={isOpen} toggle={setOpen} />
            {isOpen && <div></div>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
