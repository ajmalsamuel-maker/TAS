import About from './pages/About';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminCp from './pages/AdminCp';
import AdminDashboard from './pages/AdminDashboard';
import AdminDocumentation from './pages/AdminDocumentation';
import AdminReports from './pages/AdminReports';
import ApplicationStatus from './pages/ApplicationStatus';
import BillingAdmin from './pages/BillingAdmin';
import CompleteOnboarding from './pages/CompleteOnboarding';
import Contact from './pages/Contact';
import DownloadLogo from './pages/DownloadLogo';
import FeatureVerificationGuide from './pages/FeatureVerificationGuide';
import Home from './pages/Home';
import IntegrationsSummary from './pages/IntegrationsSummary';
import MarketingWebsiteDocumentation from './pages/MarketingWebsiteDocumentation';
import Onboarding from './pages/Onboarding';
import OrganizationOnboarding from './pages/OrganizationOnboarding';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import Pricing from './pages/Pricing';
import PublicDocumentation from './pages/PublicDocumentation';
import UserCompliance from './pages/UserCompliance';
import UserCredentials from './pages/UserCredentials';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import UserPortalDocumentation from './pages/UserPortalDocumentation';
import UserSettings from './pages/UserSettings';
import Web3Dashboard from './pages/Web3Dashboard';
import Workflows from './pages/Workflows';
import UserMonitoring from './pages/UserMonitoring';
import VLEIManagement from './pages/VLEIManagement';
import LEIVLEIAdmin from './pages/LEIVLEIAdmin';
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
    "CompleteOnboarding": CompleteOnboarding,
    "Contact": Contact,
    "DownloadLogo": DownloadLogo,
    "FeatureVerificationGuide": FeatureVerificationGuide,
    "Home": Home,
    "IntegrationsSummary": IntegrationsSummary,
    "MarketingWebsiteDocumentation": MarketingWebsiteDocumentation,
    "Onboarding": Onboarding,
    "OrganizationOnboarding": OrganizationOnboarding,
    "PlatformAdminDashboard": PlatformAdminDashboard,
    "Pricing": Pricing,
    "PublicDocumentation": PublicDocumentation,
    "UserCompliance": UserCompliance,
    "UserCredentials": UserCredentials,
    "UserDashboard": UserDashboard,
    "UserLogin": UserLogin,
    "UserPortalDocumentation": UserPortalDocumentation,
    "UserSettings": UserSettings,
    "Web3Dashboard": Web3Dashboard,
    "Workflows": Workflows,
    "UserMonitoring": UserMonitoring,
    "VLEIManagement": VLEIManagement,
    "LEIVLEIAdmin": LEIVLEIAdmin,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};