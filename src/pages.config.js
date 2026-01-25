import About from './pages/About';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminCp from './pages/AdminCp';
import AdminDashboard from './pages/AdminDashboard';
import AdminReports from './pages/AdminReports';
import ApplicationStatus from './pages/ApplicationStatus';
import Contact from './pages/Contact';
import DownloadLogo from './pages/DownloadLogo';
import FeatureVerificationGuide from './pages/FeatureVerificationGuide';
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
import BillingAdmin from './pages/BillingAdmin';
import AdminDocumentation from './pages/AdminDocumentation';
import UserDocumentation from './pages/UserDocumentation';
import PublicDocumentation from './pages/PublicDocumentation';
import AdminDocumentationDetailed from './pages/AdminDocumentationDetailed';
import UserDocumentationDetailed from './pages/UserDocumentationDetailed';
import PublicDocumentationDetailed from './pages/PublicDocumentationDetailed';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAnalytics": AdminAnalytics,
    "AdminCp": AdminCp,
    "AdminDashboard": AdminDashboard,
    "AdminReports": AdminReports,
    "ApplicationStatus": ApplicationStatus,
    "Contact": Contact,
    "DownloadLogo": DownloadLogo,
    "FeatureVerificationGuide": FeatureVerificationGuide,
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
    "BillingAdmin": BillingAdmin,
    "AdminDocumentation": AdminDocumentation,
    "UserDocumentation": UserDocumentation,
    "PublicDocumentation": PublicDocumentation,
    "AdminDocumentationDetailed": AdminDocumentationDetailed,
    "UserDocumentationDetailed": UserDocumentationDetailed,
    "PublicDocumentationDetailed": PublicDocumentationDetailed,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};