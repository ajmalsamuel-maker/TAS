/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminCp from './pages/AdminCp';
import AdminDashboard from './pages/AdminDashboard';
import AdminDocumentation from './pages/AdminDocumentation';
import AdminReports from './pages/AdminReports';
import ApplicationStatus from './pages/ApplicationStatus';
import BillingAdmin from './pages/BillingAdmin';
import CSPSolution from './pages/CSPSolution';
import CompleteOnboarding from './pages/CompleteOnboarding';
import Contact from './pages/Contact';
import CryptoSolution from './pages/CryptoSolution';
import DownloadLogo from './pages/DownloadLogo';
import FeatureVerificationGuide from './pages/FeatureVerificationGuide';
import Home from './pages/Home';
import IntegrationsSummary from './pages/IntegrationsSummary';
import LEIVLEIAdmin from './pages/LEIVLEIAdmin';
import LegalSolution from './pages/LegalSolution';
import MarketingWebsiteDocumentation from './pages/MarketingWebsiteDocumentation';
import Onboarding from './pages/Onboarding';
import OrganizationOnboarding from './pages/OrganizationOnboarding';
import PlatformAdminDashboard from './pages/PlatformAdminDashboard';
import Pricing from './pages/Pricing';
import PublicDocumentation from './pages/PublicDocumentation';
import RemittanceSolution from './pages/RemittanceSolution';
import TradeFinanceSolution from './pages/TradeFinanceSolution';
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
import Web3Solution from './pages/Web3Solution';
import UserTMaaS from './pages/UserTMaaS';
import TMaaSSetup from './pages/TMaaSSetup';
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
    "CSPSolution": CSPSolution,
    "CompleteOnboarding": CompleteOnboarding,
    "Contact": Contact,
    "CryptoSolution": CryptoSolution,
    "DownloadLogo": DownloadLogo,
    "FeatureVerificationGuide": FeatureVerificationGuide,
    "Home": Home,
    "IntegrationsSummary": IntegrationsSummary,
    "LEIVLEIAdmin": LEIVLEIAdmin,
    "LegalSolution": LegalSolution,
    "MarketingWebsiteDocumentation": MarketingWebsiteDocumentation,
    "Onboarding": Onboarding,
    "OrganizationOnboarding": OrganizationOnboarding,
    "PlatformAdminDashboard": PlatformAdminDashboard,
    "Pricing": Pricing,
    "PublicDocumentation": PublicDocumentation,
    "RemittanceSolution": RemittanceSolution,
    "TradeFinanceSolution": TradeFinanceSolution,
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
    "Web3Solution": Web3Solution,
    "UserTMaaS": UserTMaaS,
    "TMaaSSetup": TMaaSSetup,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};