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
import LEIVLEIAdmin from './pages/LEIVLEIAdmin';
import MarketingWebsiteDocumentation from './pages/MarketingWebsiteDocumentation';
import Onboarding from './pages/Onboarding';
import OrganizationOnboarding from './pages/OrganizationOnboarding';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import Pricing from './pages/Pricing';
import PublicDocumentation from './pages/PublicDocumentation';
import UserAlerts from './pages/UserAlerts';
import UserCases from './pages/UserCases';
import UserCompliance from './pages/UserCompliance';
import UserCredentials from './pages/UserCredentials';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import UserMonitoring from './pages/UserMonitoring';
import UserPolicies from './pages/UserPolicies';
import UserPortalDocumentation from './pages/UserPortalDocumentation';
import UserSettings from './pages/UserSettings';
import UserTeam from './pages/UserTeam';
import UserTransactionMonitoring from './pages/UserTransactionMonitoring';
import UserTransactions from './pages/UserTransactions';
import UserWorkflows from './pages/UserWorkflows';
import VLEIManagement from './pages/VLEIManagement';
import Web3Dashboard from './pages/Web3Dashboard';
import Workflows from './pages/Workflows';
import CryptoSolution from './pages/CryptoSolution';
import TradeFinanceSolution from './pages/TradeFinanceSolution';
import LegalSolution from './pages/LegalSolution';
import CSPSolution from './pages/CSPSolution';
import RemittanceSolution from './pages/RemittanceSolution';
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
    "LEIVLEIAdmin": LEIVLEIAdmin,
    "MarketingWebsiteDocumentation": MarketingWebsiteDocumentation,
    "Onboarding": Onboarding,
    "OrganizationOnboarding": OrganizationOnboarding,
    "PlatformAdminDashboard": PlatformAdminDashboard,
    "Pricing": Pricing,
    "PublicDocumentation": PublicDocumentation,
    "UserAlerts": UserAlerts,
    "UserCases": UserCases,
    "UserCompliance": UserCompliance,
    "UserCredentials": UserCredentials,
    "UserDashboard": UserDashboard,
    "UserLogin": UserLogin,
    "UserMonitoring": UserMonitoring,
    "UserPolicies": UserPolicies,
    "UserPortalDocumentation": UserPortalDocumentation,
    "UserSettings": UserSettings,
    "UserTeam": UserTeam,
    "UserTransactionMonitoring": UserTransactionMonitoring,
    "UserTransactions": UserTransactions,
    "UserWorkflows": UserWorkflows,
    "VLEIManagement": VLEIManagement,
    "Web3Dashboard": Web3Dashboard,
    "Workflows": Workflows,
    "CryptoSolution": CryptoSolution,
    "TradeFinanceSolution": TradeFinanceSolution,
    "LegalSolution": LegalSolution,
    "CSPSolution": CSPSolution,
    "RemittanceSolution": RemittanceSolution,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};