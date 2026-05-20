import "../styles/modern-normalise.css";
import "../styles/style.css";
import "../styles/components/success.css";
import "../styles/components/header.css";
import "../styles/components/preloader.css";
import "../styles/components/themeTransition.css"
import "../styles/components/hero.css";
import "../styles/components/about.css";
import "../styles/components/skills.css";
import "../styles/components/blogs.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/components/projects.css";
import "../styles/components/contact.css";
import "../styles/components/footer.css";
import "../styles/components/mobile-navigation.css";
import "../styles/utils.css";

import TurnLightModeOn from "./utils/light-mode";
import HandlePreloading from "./utils/preloader";
import FooterText from "./utils/footer";
import MobileNavigation from "./utils/mobile-navigation";
import HandleImageLoading from "./utils/lazy-loading";
import heroTitleTyper from "./utils/heroTitleTyper";
import { CheckCaptcha, FormSubmitButton } from "./utils/hCaptcha";
import "../src/utils/Swiping-handler";

TurnLightModeOn();
HandlePreloading();
FooterText();
MobileNavigation();
HandleImageLoading();
heroTitleTyper();
CheckCaptcha();
FormSubmitButton();
