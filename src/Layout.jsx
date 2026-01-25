import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import TASLogo from './components/TASLogo';
import { TranslationProvider, useTranslation } from './components/i18n/useTranslation';
import LanguageSelector from './components/i18n/LanguageSelector';
import NotificationBell from './components/notifications/NotificationBell';
import { 
  Home, Users, Activity, Globe, LogOut, 
  Shield, Menu, X, Settings, BarChart, Mail
} from 'lucide-react';

function LayoutContent({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isRTL } = useTranslation();

  useEffect(() => {
    base44.auth.me().then(async (userData) => {
      setUser(userData);
      
      // Check if user needs to complete organization onboarding (only after LEI application is submitted)
      if (userData?.organization_id && !userData?.is_platform_admin && currentPageName !== 'Onboarding') {
        const apps = await base44.entities.OnboardingApplication.filter({ created_by: userData.email });
        const hasSubmittedApp = apps.some(app => ['submitted', 'under_review', 'approved', 'rejected'].includes(app.status));
        
        if (hasSubmittedApp) {
          const orgs = await base44.entities.Organization.filter({ id: userData.organization_id });
          const org = orgs[0];

          if (org && !org.onboarding_completed && currentPageName !== 'OrganizationOnboarding') {
            window.location.href = createPageUrl('OrganizationOnboarding');
          }
        }
      }
    }).catch(() => {
      setUser(null);
      // Not authenticated - only redirect to AdminCp if trying to access admin pages
      if (currentPageName === 'AdminDashboard') {
        window.location.href = createPageUrl('AdminCp');
      }
    });
  }, [currentPageName]);

  const handleLogout = () => {
    base44.auth.logout(createPageUrl('Home'));
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  // Marketing Website (Public) - ONLY these pages for non-authenticated users
  const marketingPages = [
    { nameKey: 'nav.home', icon: Home, path: 'Home' },
    { nameKey: 'nav.solutions', icon: Shield, path: 'About' },
    { nameKey: 'nav.pricing', icon: Activity, path: 'Pricing' },
    { nameKey: 'nav.contact', icon: Mail, path: 'Contact' },
  ];

  // User Portal Navigation (Authenticated Regular Users)
  const userPortalPages = [
    { nameKey: 'nav.dashboard', icon: Activity, path: 'UserDashboard' },
    { nameKey: 'nav.workflows', icon: Activity, path: 'Workflows' },
    { nameKey: 'nav.web3', icon: Globe, path: 'Web3Dashboard' },
    { nameKey: 'nav.compliance', icon: Shield, path: 'UserCompliance' },
    { nameKey: 'nav.credentials', icon: Shield, path: 'UserCredentials' },
    { nameKey: 'nav.settings', icon: Settings, path: 'UserSettings' }
  ];

  // Admin Portal Navigation (Admins Only)
  const adminPortalPages = [
    { nameKey: 'nav.dashboard', icon: Shield, path: 'AdminDashboard' },
    { nameKey: 'nav.settings', icon: Settings, path: 'UserSettings' }
  ];

  // CLEAR SEPARATION: Marketing vs Portal navigation
  const navigationPages = !isAuthenticated 
    ? marketingPages 
    : isAdmin 
      ? adminPortalPages
      : userPortalPages;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-[#0044CC] via-[#002D66] to-[#001A40] text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl(isAuthenticated ? (isAdmin ? 'AdminDashboard' : 'UserDashboard') : 'Home')} className="flex items-center">
              <TASLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigationPages.map((page) => {
                const Icon = page.icon;
                const isActive = currentPageName === page.path;
                return (
                  <Link key={page.path} to={createPageUrl(page.path)}>
                    <div className={`px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white/20 text-white font-semibold' 
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}>
                      <span>{t(page.nameKey)}</span>
                    </div>
                  </Link>
                );
              })}

              {!isAuthenticated && (
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
                  <LanguageSelector variant="minimal" />
                  <Link to={createPageUrl('UserLogin')}>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      {t('auth.signin')}
                    </Button>
                  </Link>
                  <Link to={createPageUrl('UserLogin')}>
                    <Button className="bg-white text-[#0066B3] hover:bg-blue-50 font-semibold">
                      {t('auth.getstarted')}
                    </Button>
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
                  <LanguageSelector variant="minimal" />
                  <NotificationBell user={user} />
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.full_name}</p>
                    <p className="text-xs text-blue-200">{user.role}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="px-4 pb-3">
                <LanguageSelector />
              </div>
              {navigationPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.path}
                    to={createPageUrl(page.path)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg mb-1">
                      <Icon className="h-5 w-5" />
                      <span>{t(page.nameKey)}</span>
                    </div>
                  </Link>
                );
              })}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('auth.logout')}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#001A40] via-[#002D66] to-[#0044CC] text-white mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Trust Anchor Service</h3>
              <p className="text-blue-200 text-sm">
                The global interoperability gateway for identity, compliance, and trust services
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Sandbox</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Powered By</h4>
              <div className="space-y-3 text-blue-200">
                <p className="text-sm hover:text-white transition-colors cursor-pointer">
                  Certizen Technology
                </p>
                <p className="text-sm hover:text-white transition-colors cursor-pointer">
                  FTS.Money
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-sm text-blue-200">
            <p>© 2026 FTS.Money & Certizen Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout(props) {
  return (
    <TranslationProvider>
      <LayoutContent {...props} />
    </TranslationProvider>
  );
}