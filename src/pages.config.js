import About from './pages/About';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminReports from './pages/AdminReports';
import ApplicationStatus from './pages/ApplicationStatus';
import Contact from './pages/Contact';
import DownloadLogo from './pages/DownloadLogo';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import OrganizationOnboarding from './pages/OrganizationOnboarding';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import Pricing from './pages/Pricing';
import UserCompliance from './pages/UserCompliance';
import UserCredentials from './pages/UserCredentials';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import UserSettings from './pages/UserSettings';
import Web3Dashboard from './pages/Web3Dashboard';
import Workflows from './pages/Workflows';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAnalytics": AdminAnalytics,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "AdminReports": AdminReports,
    "ApplicationStatus": ApplicationStatus,
    "Contact": Contact,
    "DownloadLogo": DownloadLogo,
    "Home": Home,
    "Onboarding": Onboarding,
    "OrganizationOnboarding": OrganizationOnboarding,
    "PlatformAdminDashboard": PlatformAdminDashboard,
    "Pricing": Pricing,
    "UserCompliance": UserCompliance,
    "UserCredentials": UserCredentials,
    "UserDashboard": UserDashboard,
    "UserLogin": UserLogin,
    "UserSettings": UserSettings,
    "Web3Dashboard": Web3Dashboard,
    "Workflows": Workflows,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};