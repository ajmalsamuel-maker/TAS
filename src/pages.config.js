import About from './pages/About';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ApplicationStatus from './pages/ApplicationStatus';
import Contact from './pages/Contact';
import DownloadLogo from './pages/DownloadLogo';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Pricing from './pages/Pricing';
import UserCompliance from './pages/UserCompliance';
import UserCredentials from './pages/UserCredentials';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import UserSettings from './pages/UserSettings';
import Workflows from './pages/Workflows';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAnalytics": AdminAnalytics,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "ApplicationStatus": ApplicationStatus,
    "Contact": Contact,
    "DownloadLogo": DownloadLogo,
    "Home": Home,
    "Onboarding": Onboarding,
    "Pricing": Pricing,
    "UserCompliance": UserCompliance,
    "UserCredentials": UserCredentials,
    "UserDashboard": UserDashboard,
    "UserLogin": UserLogin,
    "UserSettings": UserSettings,
    "Workflows": Workflows,
    "PlatformAdminDashboard": PlatformAdminDashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};