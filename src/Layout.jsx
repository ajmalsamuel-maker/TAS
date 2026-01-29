import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);

    const navigation = [
        { name: 'Home', path: 'Home' },
        { name: 'Solutions', path: 'Solutions' },
        { name: 'Industries', path: 'Industries' },
        { name: 'Pricing', path: 'Pricing' },
        { name: 'Contact', path: 'Contact' },
        { name: 'Learn', path: 'Learn' }
    ];

    return (
        <div className="min-h-screen">
            {/* Navigation Header */}
            <nav className="bg-blue-700 border-b border-blue-600 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={createPageUrl(item.path)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                        currentPageName === item.path
                                            ? 'bg-blue-800 text-white'
                                            : 'text-white hover:bg-blue-600'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setLanguageOpen(!languageOpen)}
                                    className="flex items-center gap-2 px-3 py-2 text-white hover:bg-blue-600 rounded-md text-sm"
                                >
                                    <Globe className="w-4 h-4" />
                                    English
                                </button>
                            </div>

                            <Link to={createPageUrl('SignIn')}>
                                <Button variant="ghost" className="text-white hover:bg-blue-600">
                                    Sign In
                                </Button>
                            </Link>

                            <Link to={createPageUrl('Onboarding')}>
                                <Button className="bg-white text-blue-700 hover:bg-blue-50">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-white hover:bg-blue-600"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-blue-800 border-t border-blue-600">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={createPageUrl(item.path)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        currentPageName === item.path
                                            ? 'bg-blue-900 text-white'
                                            : 'text-white hover:bg-blue-700'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-blue-700 my-2"></div>
                            <Link
                                to={createPageUrl('SignIn')}
                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to={createPageUrl('Onboarding')}
                                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-700 hover:bg-blue-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">TAS Platform</h3>
                            <p className="text-slate-400 text-sm">
                                Enterprise identity & compliance infrastructure for modern business
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link to={createPageUrl('Home')} className="hover:text-white">Features</Link></li>
                                <li><Link to={createPageUrl('Pricing')} className="hover:text-white">Pricing</Link></li>
                                <li><Link to={createPageUrl('Solutions')} className="hover:text-white">Solutions</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><Link to={createPageUrl('Contact')} className="hover:text-white">Contact</Link></li>
                                <li><Link to={createPageUrl('Learn')} className="hover:text-white">Learn</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
                        © {new Date().getFullYear()} TAS Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}