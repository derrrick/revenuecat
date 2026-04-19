import { useLenis } from "./motion/useLenis";
import { useRouteTheme } from "./useRouteTheme";
import { PresNav } from "./components/PresNav";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { ProcessReel } from "./sections/ProcessReel";
import { OptionCDeepDive } from "./sections/OptionCDeepDive";
import { UserFlow } from "./sections/UserFlow";
import { Tradeoffs } from "./sections/Tradeoffs";
import { Validation } from "./sections/Validation";
import { Timeline } from "./sections/Timeline";
import { Footer } from "./sections/Footer";
import "./styles/fonts.css";
import "./styles/presentation.css";

export function Presentation() {
  useRouteTheme();
  useLenis(true);

  return (
    <div className="pres">
      <PresNav />
      <main>
        <Hero />
        <Problem />
        <ProcessReel />
        <OptionCDeepDive />
        <UserFlow />
        <Tradeoffs />
        <Validation />
        <Timeline />
        <Footer />
      </main>
    </div>
  );
}
