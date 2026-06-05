import "../../styles/modern-normalise.css";
import "../../styles/style.css";
import "../../styles/components/header.css";
import "../../styles/components/themeTransition.css"
import "../../styles/components/footer.css";
import "../../styles/components/mobile-navigation.css";
import "../../styles/utils.css";
import "../styles/projectsPage.css";
import "../styles/projects.css";
import "../styles/animation.css";


import TurnLightModeOn from "../../src/utils/light-mode.js";
import backgroundAnimation from "../../src/utils/backgroundAnimation.js";
import FooterText from "../../src/utils/footer.js";
import MobileNavigation from "../../src/utils/mobile-navigation.js";
import HandleImageLoading from "../../src/utils/lazy-loading.js";
import {initAnimations, setupObserver, markItemsPending} from "./animation.js";
import {setupCardGlow, buildParticles, initProjects} from "./projects.js";

TurnLightModeOn();
backgroundAnimation();
FooterText();
MobileNavigation();
HandleImageLoading();

initAnimations();
markItemsPending();
setupObserver();

initProjects();
buildParticles();
setupCardGlow();