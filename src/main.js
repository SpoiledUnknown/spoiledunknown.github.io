import '../styles/modern-normalise.css'
import '../styles/style.css'
import '../styles/components/header.css'
import '../styles/components/hero.css'
import '../styles/components/about.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/components/projects.css'
import '../styles/components/contact.css'
import '../styles/components/footer.css'
import '../styles/components/mobile-navigation.css'
import '../styles/utils.css'


import FooterText from './utils/footer'
import MobileNavigation from './utils/mobile-navigation'
import TurnLightModeOn from './utils/light-mode'
import HandleImageLoading from './utils/lazy-loading'
import '../src/utils/Swiping-handler'


FooterText()
MobileNavigation()
TurnLightModeOn()
HandleImageLoading()
