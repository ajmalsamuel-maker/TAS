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
          Shield, Menu, X, Settings, BarChart, Mail, FileText, BookOpen, AlertTriangle
        } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  // Determine portal context based on current page
  const adminPages = ['AdminDashboard', 'AdminCp', 'LEIVLEIAdmin', 'BillingAdmin', 'AdminDocumentation', 'AdminAnalytics', 'AdminReports', 'PlatformAdminDashboard'];
  const userPages = ['UserDashboard', 'UserMonitoring', 'UserAlerts', 'UserWorkflows', 'UserCredentials', 'UserTransactions', 'UserCases', 'UserPolicies', 'UserTeam', 'UserSettings', 'UserPortalDocumentation', 'UserTransactionMonitoring'];
  const isInAdminPortal = adminPages.includes(currentPageName);
  const isInUserPortal = userPages.includes(currentPageName);

  // Marketing Website (Public) - ONLY these pages for non-authenticated users
  const marketingPages = [
    { nameKey: 'nav.home', icon: Home, path: 'Home', tooltip: 'Return to homepage' },
    { nameKey: 'nav.solutions', icon: Shield, path: 'About', tooltip: 'Learn about our solutions' },
    { nameKey: 'nav.pricing', icon: Activity, path: 'Pricing', tooltip: 'View pricing plans' },
    { nameKey: 'nav.contact', icon: Mail, path: 'Contact', tooltip: 'Get in touch with us' },
    { name: 'Learn', icon: FileText, path: 'PublicDocumentation', tooltip: 'Browse documentation' },
  ];

  // User Portal Navigation (Authenticated Regular Users)
  const userPortalPages = [
    { nameKey: 'nav.dashboard', icon: Activity, path: 'UserDashboard', tooltip: 'View your dashboard overview' },
    { name: 'Monitoring', icon: Shield, path: 'UserMonitoring', tooltip: 'Ongoing surveillance of existing customers' },
    { name: 'Alerts', icon: AlertTriangle, path: 'UserAlerts', tooltip: 'View compliance alerts' },
    { name: 'Workflows', icon: FileText, path: 'UserPolicies', tooltip: 'Advanced: Design custom compliance workflows' },
    { nameKey: 'nav.credentials', icon: Shield, path: 'UserCredentials', tooltip: 'Manage LEI and vLEI credentials' },
    { name: 'Transactions', icon: Activity, path: 'UserTransactions', tooltip: 'Monitor transactions' },
    { name: 'Cases', icon: Shield, path: 'UserCases', tooltip: 'View assigned cases' },
    { name: 'Team', icon: Users, path: 'UserTeam', tooltip: 'Manage team members' },
    { nameKey: 'nav.settings', icon: Settings, path: 'UserSettings', tooltip: 'Configure account settings' },
    { name: 'Documentation', icon: FileText, path: 'UserPortalDocumentation', tooltip: 'Technical documentation and user manual' }
  ];

  // Admin Portal Navigation (Admins Only)
  const adminPortalPages = [
    { nameKey: 'nav.dashboard', icon: Shield, path: 'AdminDashboard', tooltip: 'Admin control panel' },
    { name: 'LEI/vLEI', icon: Activity, path: 'LEIVLEIAdmin', tooltip: 'Credential issuance management' },
    { name: 'Billing', icon: Activity, path: 'BillingAdmin', tooltip: 'Manage billing and revenue' },
    { nameKey: 'nav.settings', icon: Settings, path: 'UserSettings', tooltip: 'System and account settings' },
    { name: 'Docs', icon: FileText, path: 'AdminDocumentation', tooltip: 'Technical documentation and admin manual' }
  ];

  // CLEAR SEPARATION: Respect current portal context
  const navigationPages = !isAuthenticated 
    ? marketingPages 
    : (isInAdminPortal && isAdmin)
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
              <TASLogo size="md" showText={false} />
            </Link>

            {/* Desktop Navigation */}
            <TooltipProvider>
              <div className="hidden md:flex items-center gap-2">
                {navigationPages.map((page) => {
                  const Icon = page.icon;
                  const isActive = currentPageName === page.path;
                  return (
                    <Tooltip key={page.path}>
                      <TooltipTrigger asChild>
                        <Link to={createPageUrl(page.path)}>
                          <div className={`px-4 py-2 rounded-lg transition-all ${
                            isActive 
                              ? 'bg-white/20 text-white font-semibold' 
                              : 'text-blue-100 hover:bg-white/10 hover:text-white'
                          }`}>
                            <span>{page.name || t(page.nameKey)}</span>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{page.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
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
                </TooltipProvider>

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
            <div className="md:hidden py-4 border-t border-white/20 max-h-[calc(100vh-64px)] overflow-y-auto">
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
                      <span>{page.name || t(page.nameKey)}</span>
                    </div>
                  </Link>
                );
              })}

              {!isAuthenticated && (
                <div className="border-t border-white/20 mt-4 pt-4 px-4 space-y-2">
                  <Link
                    to={createPageUrl('UserLogin')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="ghost" className="w-full text-white hover:bg-white/10 justify-start">
                      {t('auth.signin')}
                    </Button>
                  </Link>
                  <Link
                    to={createPageUrl('UserLogin')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full bg-white text-[#0066B3] hover:bg-blue-50 font-semibold">
                      {t('auth.getstarted')}
                    </Button>
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg w-full text-left border-t border-white/20 mt-4 pt-4"
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Trust Anchor Service</h3>
              <p className="text-blue-200 text-sm">
                The global interoperability gateway for identity, compliance, and trust services
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link to={createPageUrl('CryptoSolution')} className="hover:text-white">Crypto Exchanges</Link></li>
                <li><Link to={createPageUrl('TradeFinanceSolution')} className="hover:text-white">Trade Finance</Link></li>
                <li><Link to={createPageUrl('LegalSolution')} className="hover:text-white">Law Firms</Link></li>
                <li><Link to={createPageUrl('CSPSolution')} className="hover:text-white">Corporate Services</Link></li>
                <li><Link to={createPageUrl('RemittanceSolution')} className="hover:text-white">Remittance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link to={createPageUrl('PublicDocumentation')} className="hover:text-white">Documentation</Link></li>
                <li><Link to={createPageUrl('Pricing')} className="hover:text-white">Pricing</Link></li>
                <li><Link to={createPageUrl('Contact')} className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Powered By</h4>
              <p className="text-sm text-blue-200 hover:text-white transition-colors cursor-pointer">
                FTS.Money & Certizen Technologies
              </p>
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