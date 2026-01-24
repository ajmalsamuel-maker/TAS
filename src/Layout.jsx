import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import TASLogo from './components/TASLogo';
import { 
  Home, Users, Activity, Globe, LogOut, 
  Shield, Menu, X, Settings, BarChart, Mail
} from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  // Marketing Website (Public)
  const marketingPages = [
    { name: 'Home', icon: Home, path: 'Home' },
    { name: 'Solutions', icon: Shield, path: 'About' },
    { name: 'Pricing', icon: Activity, path: 'Pricing' },
    { name: 'Contact', icon: Mail, path: 'Contact' },
  ];

  // User Portal (Authenticated Users)
  const userPortalPages = [
    { name: 'Dashboard', icon: Activity, path: 'UserDashboard' },
    { name: 'Workflows', icon: Activity, path: 'Workflows' },
    { name: 'Compliance', icon: Shield, path: 'UserCompliance' },
    { name: 'Credentials', icon: Shield, path: 'UserCredentials' },
    { name: 'Settings', icon: Settings, path: 'UserSettings' }
  ];

  // Admin Portal (Admins Only)
  const adminPortalPages = [
    { name: 'Admin', icon: Shield, path: 'AdminDashboard' },
    { name: 'Analytics', icon: BarChart, path: 'AdminAnalytics' }
  ];

  // Determine navigation based on auth status
  const navigationPages = !isAuthenticated 
    ? marketingPages 
    : isAdmin 
      ? [...adminPortalPages, ...userPortalPages]
      : userPortalPages;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-[#0044CC] via-[#002D66] to-[#001A40] text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl(isAuthenticated ? (isAdmin ? 'AdminDashboard' : 'UserDashboard') : 'Home')} className="flex items-center gap-2">
              <TASLogo size="md" />
              <div>
                <span className="text-xl font-bold">TAS</span>
                <p className="text-xs text-blue-200">Trust Anchor Service</p>
              </div>
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
                      <span>{page.name}</span>
                    </div>
                  </Link>
                );
              })}

              {!isAuthenticated && (
                <>
                  <Link to={createPageUrl('UserLogin')}>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      User Login
                    </Button>
                  </Link>
                  <Link to={createPageUrl('AdminLogin')}>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Admin
                    </Button>
                  </Link>
                  <Link to={createPageUrl('Onboarding')}>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
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
                      <span>{page.name}</span>
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
                  <span>Logout</span>
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
              <div className="space-y-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/4191d6eef_Untitleddesign5.png" 
                  alt="Certizen Technology" 
                  className="h-9 opacity-90 hover:opacity-100 transition-opacity"
                />
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69745611ba890597a348b91e/db0e0ce38_FTSMoney-primary-logo-RGB.png" 
                  alt="FTS.Money" 
                  className="h-9 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-sm text-blue-200">
            <p>© 2025 FTS.Money & Certizen Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}