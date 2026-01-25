import About from './pages/About';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminCp from './pages/AdminCp';
import AdminDashboard from './pages/AdminDashboard';
import AdminDocumentation from './pages/AdminDocumentation';
import AdminReports from './pages/AdminReports';
import ApplicationStatus from './pages/ApplicationStatus';
import BillingAdmin from './pages/BillingAdmin';
import Contact from './pages/Contact';
import DownloadLogo from './pages/DownloadLogo';
import FeatureVerificationGuide from './pages/FeatureVerificationGuide';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import OrganizationOnboarding from './pages/OrganizationOnboarding';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import Pricing from './pages/Pricing';
import PublicDocumentation from './pages/PublicDocumentation';
import UserCompliance from './pages/UserCompliance';
import UserCredentials from './pages/UserCredentials';
import UserDashboard from './pages/UserDashboard';
import UserDocumentation from './pages/UserDocumentation';
import UserLogin from './pages/UserLogin';
import UserSettings from './pages/UserSettings';
import Web3Dashboard from './pages/Web3Dashboard';
import Workflows from './pages/Workflows';
import UserPortalDocumentation from './pages/UserPortalDocumentation';
import MarketingWebsiteDocumentation from './pages/MarketingWebsiteDocumentation';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAnalytics": AdminAnalytics,
    "AdminCp": AdminCp,
    "AdminDashboard": AdminDashboard,
    "AdminDocumentation": AdminDocumentation,
    "AdminReports": AdminReports,
    "ApplicationStatus": ApplicationStatus,
    "BillingAdmin": BillingAdmin,
    "Contact": Contact,
    "DownloadLogo": DownloadLogo,
    "FeatureVerificationGuide": FeatureVerificationGuide,
    "Home": Home,
    "Onboarding": Onboarding,
    "OrganizationOnboarding": OrganizationOnboarding,
    "PlatformAdminDashboard": PlatformAdminDashboard,
    "Pricing": Pricing,
    "PublicDocumentation": PublicDocumentation,
    "UserCompliance": UserCompliance,
    "UserCredentials": UserCredentials,
    "UserDashboard": UserDashboard,
    "UserDocumentation": UserDocumentation,
    "UserLogin": UserLogin,
    "UserSettings": UserSettings,
    "Web3Dashboard": Web3Dashboard,
    "Workflows": Workflows,
    "UserPortalDocumentation": UserPortalDocumentation,
    "MarketingWebsiteDocumentation": MarketingWebsiteDocumentation,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};