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
import AuditComplianceFeature from './pages/AuditComplianceFeature';
import BillingAdmin from './pages/BillingAdmin';
import CSPSolution from './pages/CSPSolution';
import CaseManagementFeature from './pages/CaseManagementFeature';
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
import PolicyBuilderFeature from './pages/PolicyBuilderFeature';
import Pricing from './pages/Pricing';
import PublicDocumentation from './pages/PublicDocumentation';
import RemittanceSolution from './pages/RemittanceSolution';
import TMaaSFeature from './pages/TMaaSFeature';
import TMaaSRules from './pages/TMaaSRules';
import TMaaSSetup from './pages/TMaaSSetup';
import TMaaSTransactions from './pages/TMaaSTransactions';
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
import UserTMaaS from './pages/UserTMaaS';
import UserTMaaSAnalytics from './pages/UserTMaaSAnalytics';
import UserTeam from './pages/UserTeam';
import UserTransactionMonitoring from './pages/UserTransactionMonitoring';
import UserTransactions from './pages/UserTransactions';
import UserWorkflows from './pages/UserWorkflows';
import VLEIManagement from './pages/VLEIManagement';
import Web3Dashboard from './pages/Web3Dashboard';
import Web3Solution from './pages/Web3Solution';
import Workflows from './pages/Workflows';
import MigrationGuide from './pages/MigrationGuide';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminAnalytics": AdminAnalytics,
    "AdminCp": AdminCp,
    "AdminDashboard": AdminDashboard,
    "AdminDocumentation": AdminDocumentation,
    "AdminReports": AdminReports,
    "ApplicationStatus": ApplicationStatus,
    "AuditComplianceFeature": AuditComplianceFeature,
    "BillingAdmin": BillingAdmin,
    "CSPSolution": CSPSolution,
    "CaseManagementFeature": CaseManagementFeature,
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
    "PolicyBuilderFeature": PolicyBuilderFeature,
    "Pricing": Pricing,
    "PublicDocumentation": PublicDocumentation,
    "RemittanceSolution": RemittanceSolution,
    "TMaaSFeature": TMaaSFeature,
    "TMaaSRules": TMaaSRules,
    "TMaaSSetup": TMaaSSetup,
    "TMaaSTransactions": TMaaSTransactions,
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
    "UserTMaaS": UserTMaaS,
    "UserTMaaSAnalytics": UserTMaaSAnalytics,
    "UserTeam": UserTeam,
    "UserTransactionMonitoring": UserTransactionMonitoring,
    "UserTransactions": UserTransactions,
    "UserWorkflows": UserWorkflows,
    "VLEIManagement": VLEIManagement,
    "Web3Dashboard": Web3Dashboard,
    "Web3Solution": Web3Solution,
    "Workflows": Workflows,
    "MigrationGuide": MigrationGuide,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};