import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Workflows from './pages/Workflows';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import About from './pages/About';
import Pricing from './pages/Pricing';
import UserCompliance from './pages/UserCompliance';
import UserCredentials from './pages/UserCredentials';
import UserSettings from './pages/UserSettings';
import AdminAnalytics from './pages/AdminAnalytics';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Onboarding": Onboarding,
    "AdminDashboard": AdminDashboard,
    "UserDashboard": UserDashboard,
    "Workflows": Workflows,
    "AdminLogin": AdminLogin,
    "UserLogin": UserLogin,
    "About": About,
    "Pricing": Pricing,
    "UserCompliance": UserCompliance,
    "UserCredentials": UserCredentials,
    "UserSettings": UserSettings,
    "AdminAnalytics": AdminAnalytics,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};