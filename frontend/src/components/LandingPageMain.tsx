import { Button } from "./ui/button";
import main from "/young-happy-women-with-shopping-bags-walking-street2.jpg";

function LandingPageMain() {
  return (
    <div className="relative min-h-svh w-full">
      <img
        src={main}
        alt="Landing-page-Main"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 bg-black/65 flex items-center justify-center px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center max-w-2xl">
          <h1
            className="
        text-2xl
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        font-bold
        leading-tight
        text-white
      "
          >
            Everything you need and more
          </h1>

          <Button className="px-6 py-3 text-sm sm:text-base">Shop Now</Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPageMain;
