import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, Home, Users, Activity, Globe, LogOut, Shield, Menu, X, Settings, 
  BarChart, Mail, FileText, BookOpen, AlertTriangle, Server, Database, Lock, 
  Code, GitBranch, Zap, CheckCircle2, Clock, Calendar, ChevronRight, ChevronDown,
  Search, Filter, Bell, Plus, Minus, Edit, Trash2, Eye, EyeOff, Upload, 
  Copy, Check, RefreshCw, ArrowLeft, ArrowRight, ExternalLink, Info, HelpCircle,
  Star, Heart, Bookmark, Share2, Send, Phone, MapPin, Building, CreditCard,
  Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown, PieChart,
  BarChart2, LineChart, Briefcase, Award, Target, Flag, Tag, Folder,
  Image, Video, Music, Mic, Camera, Monitor, Smartphone, Tablet, Cpu,
  Cloud, CloudOff, Wifi, WifiOff, Bluetooth, Battery, BatteryCharging,
  Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Maximize, Minimize
} from 'lucide-react';

export default function DownloadLogo() {
  const downloadSVG = () => {
    const svg = `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0044CC" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
  </defs>
  
  <!-- Shield Shape -->
  <path
    d="M200 40 L340 100 L340 200 Q340 300 200 360 Q60 300 60 200 L60 100 Z"
    fill="url(#logoGradient)"
    stroke="white"
    stroke-width="8"
  />
  
  <!-- Network Nodes - Three circles forming triangle -->
  <circle cx="200" cy="140" r="20" fill="white" opacity="0.9" />
  <circle cx="152" cy="220" r="20" fill="white" opacity="0.9" />
  <circle cx="248" cy="220" r="20" fill="white" opacity="0.9" />
  
  <!-- Connection Lines -->
  <line x1="200" y1="140" x2="152" y2="220" stroke="white" stroke-width="8" opacity="0.7" />
  <line x1="200" y1="140" x2="248" y2="220" stroke="white" stroke-width="8" opacity="0.7" />
  <line x1="152" y1="220" x2="248" y2="220" stroke="white" stroke-width="8" opacity="0.7" />
  
  <!-- Green verification circle with checkmark - top right, not overlapping triangle -->
  <circle cx="300" cy="72" r="64" fill="#4ADE80" />
  <circle cx="300" cy="72" r="64" fill="none" stroke="white" stroke-width="9" />
  <!-- Checkmark path -->
  <path d="M272 72 L288 96 L328 48" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TAS-Logo-HighRes.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = (size) => {
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0044CC" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
  </defs>
  <path d="M200 40 L340 100 L340 200 Q340 300 200 360 Q60 300 60 200 L60 100 Z" fill="url(#logoGradient)" stroke="white" stroke-width="8"/>
  <circle cx="200" cy="140" r="20" fill="white" opacity="0.9" />
  <circle cx="152" cy="220" r="20" fill="white" opacity="0.9" />
  <circle cx="248" cy="220" r="20" fill="white" opacity="0.9" />
  <line x1="200" y1="140" x2="152" y2="220" stroke="white" stroke-width="8" opacity="0.7" />
  <line x1="200" y1="140" x2="248" y2="220" stroke="white" stroke-width="8" opacity="0.7" />
  <line x1="152" y1="220" x2="248" y2="220" stroke="white" stroke-width="8" opacity="0.7" />
  <circle cx="300" cy="72" r="64" fill="#4ADE80" />
  <circle cx="300" cy="72" r="64" fill="none" stroke="white" stroke-width="9" />
  <path d="M272 72 L288 96 L328 48" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TAS-Logo-${size}px.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Download TAS Logo</h1>
          <p className="text-gray-600">High-resolution vector and raster formats</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Logo Preview */}
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
              <CardTitle>Logo Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-white rounded-xl p-12 border-2 border-gray-200 flex items-center justify-center">
                <svg width="300" height="300" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0044CC" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M200 40 L340 100 L340 200 Q340 300 200 360 Q60 300 60 200 L60 100 Z"
                    fill="url(#logoGradient)"
                    stroke="white"
                    strokeWidth="8"
                  />
                  <circle cx="200" cy="140" r="20" fill="white" opacity="0.9" />
                  <circle cx="152" cy="220" r="20" fill="white" opacity="0.9" />
                  <circle cx="248" cy="220" r="20" fill="white" opacity="0.9" />
                  <line x1="200" y1="140" x2="152" y2="220" stroke="white" strokeWidth="8" opacity="0.7" />
                  <line x1="200" y1="140" x2="248" y2="220" stroke="white" strokeWidth="8" opacity="0.7" />
                  <line x1="152" y1="220" x2="248" y2="220" stroke="white" strokeWidth="8" opacity="0.7" />
                  <circle cx="300" cy="72" r="64" fill="#4ADE80" />
                  <circle cx="300" cy="72" r="64" fill="none" stroke="white" strokeWidth="10" />
                  <path d="M272 72 L288 96 L328 48" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-gradient-to-br from-[#0044CC] to-cyan-500 rounded" />
                  <span className="text-gray-700"><strong>Primary:</strong> Blue gradient (#0044CC → #06B6D4)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                  <span className="text-gray-700"><strong>Accent:</strong> Green Circle with Checkmark (#4ADE80)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded" />
                  <span className="text-gray-700"><strong>Nodes:</strong> White</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
              <CardTitle>Download Formats</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* SVG - Vector */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">SVG (Vector)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Best for web, print, and scalable applications. Infinite resolution.
                  </p>
                  <Button 
                    onClick={downloadSVG}
                    className="w-full bg-[#0044CC] hover:bg-[#002D66]"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download SVG
                  </Button>
                </div>

                {/* PNG Options */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">PNG (Raster)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    For presentations, social media, and general use.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => downloadPNG(512)}
                      variant="outline"
                      className="w-full border-green-300 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      512×512 (Web/Social)
                    </Button>
                    <Button 
                      onClick={() => downloadPNG(1024)}
                      variant="outline"
                      className="w-full border-green-300 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      1024×1024 (HD)
                    </Button>
                    <Button 
                      onClick={() => downloadPNG(2048)}
                      variant="outline"
                      className="w-full border-green-300 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      2048×2048 (Print)
                    </Button>
                    <Button 
                      onClick={() => downloadPNG(4096)}
                      variant="outline"
                      className="w-full border-green-300 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      4096×4096 (Ultra HD)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-[#0044CC]">
                <p className="text-xs text-gray-700">
                  <strong>Usage Guidelines:</strong> The TAS logo represents Trust Anchor Service. 
                  Use SVG for maximum quality and scalability. PNG recommended for fixed-size applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Icon Library */}
        <Card className="mt-8 border-2 border-purple-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6 text-purple-600" />
              Complete Icon Library (Lucide React)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Badge className="bg-purple-100 text-purple-800">Navigation & Actions</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 mb-6">
              {[
                { icon: Home, name: 'Home' },
                { icon: Users, name: 'Users' },
                { icon: Activity, name: 'Activity' },
                { icon: Globe, name: 'Globe' },
                { icon: LogOut, name: 'LogOut' },
                { icon: Menu, name: 'Menu' },
                { icon: X, name: 'X' },
                { icon: Settings, name: 'Settings' },
                { icon: Search, name: 'Search' },
                { icon: Filter, name: 'Filter' },
                { icon: Bell, name: 'Bell' },
                { icon: Plus, name: 'Plus' },
                { icon: Minus, name: 'Minus' },
                { icon: Edit, name: 'Edit' },
                { icon: Trash2, name: 'Trash' },
                { icon: Eye, name: 'Eye' },
                { icon: EyeOff, name: 'Hidden' },
                { icon: Upload, name: 'Upload' },
                { icon: Download, name: 'Download' },
                { icon: Copy, name: 'Copy' },
                { icon: Check, name: 'Check' },
                { icon: RefreshCw, name: 'Refresh' },
                { icon: ArrowLeft, name: 'Back' },
                { icon: ArrowRight, name: 'Forward' },
                { icon: ChevronRight, name: 'Next' },
                { icon: ChevronDown, name: 'Down' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-purple-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Badge className="bg-blue-100 text-blue-800">Security & Compliance</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 mb-6">
              {[
                { icon: Shield, name: 'Shield' },
                { icon: Lock, name: 'Lock' },
                { icon: CheckCircle2, name: 'Verified' },
                { icon: AlertTriangle, name: 'Alert' },
                { icon: Server, name: 'Server' },
                { icon: Database, name: 'Database' },
                { icon: Code, name: 'Code' },
                { icon: GitBranch, name: 'Branch' },
                { icon: Zap, name: 'Zap' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Badge className="bg-green-100 text-green-800">Communication & Info</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 mb-6">
              {[
                { icon: Mail, name: 'Mail' },
                { icon: Phone, name: 'Phone' },
                { icon: Send, name: 'Send' },
                { icon: FileText, name: 'File' },
                { icon: BookOpen, name: 'Book' },
                { icon: Info, name: 'Info' },
                { icon: HelpCircle, name: 'Help' },
                { icon: ExternalLink, name: 'Link' },
                { icon: Share2, name: 'Share' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-green-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-green-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Badge className="bg-orange-100 text-orange-800">Business & Analytics</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 mb-6">
              {[
                { icon: BarChart, name: 'BarChart' },
                { icon: BarChart2, name: 'BarChart2' },
                { icon: PieChart, name: 'PieChart' },
                { icon: LineChart, name: 'LineChart' },
                { icon: TrendingUp, name: 'Up' },
                { icon: TrendingDown, name: 'Down' },
                { icon: DollarSign, name: 'Dollar' },
                { icon: CreditCard, name: 'Card' },
                { icon: ShoppingCart, name: 'Cart' },
                { icon: Package, name: 'Package' },
                { icon: Briefcase, name: 'Briefcase' },
                { icon: Building, name: 'Building' },
                { icon: MapPin, name: 'Location' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-orange-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-orange-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Badge className="bg-pink-100 text-pink-800">Engagement & Media</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 mb-6">
              {[
                { icon: Star, name: 'Star' },
                { icon: Heart, name: 'Heart' },
                { icon: Bookmark, name: 'Bookmark' },
                { icon: Award, name: 'Award' },
                { icon: Target, name: 'Target' },
                { icon: Flag, name: 'Flag' },
                { icon: Tag, name: 'Tag' },
                { icon: Calendar, name: 'Calendar' },
                { icon: Clock, name: 'Clock' },
                { icon: Folder, name: 'Folder' },
                { icon: Image, name: 'Image' },
                { icon: Video, name: 'Video' },
                { icon: Music, name: 'Music' },
                { icon: Mic, name: 'Mic' },
                { icon: Camera, name: 'Camera' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-pink-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-pink-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Badge className="bg-cyan-100 text-cyan-800">Devices & System</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4 mb-6">
              {[
                { icon: Monitor, name: 'Monitor' },
                { icon: Smartphone, name: 'Phone' },
                { icon: Tablet, name: 'Tablet' },
                { icon: Cpu, name: 'CPU' },
                { icon: Cloud, name: 'Cloud' },
                { icon: CloudOff, name: 'Offline' },
                { icon: Wifi, name: 'Wifi' },
                { icon: WifiOff, name: 'No Wifi' },
                { icon: Bluetooth, name: 'Bluetooth' },
                { icon: Battery, name: 'Battery' },
                { icon: BatteryCharging, name: 'Charging' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-cyan-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-cyan-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <Badge className="bg-indigo-100 text-indigo-800">Media Controls</Badge>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
              {[
                { icon: Volume2, name: 'Volume' },
                { icon: VolumeX, name: 'Mute' },
                { icon: Play, name: 'Play' },
                { icon: Pause, name: 'Pause' },
                { icon: SkipBack, name: 'Previous' },
                { icon: SkipForward, name: 'Next' },
                { icon: Maximize, name: 'Maximize' },
                { icon: Minimize, name: 'Minimize' },
              ].map(({ icon: Icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-1 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Icon className="h-6 w-6 text-indigo-600" />
                  <span className="text-xs text-gray-600 text-center">{name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logo Concept */}
        <Card className="mt-8 border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
            <CardTitle>Logo Concept & Symbolism</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0044CC] to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 100 100">
                    <path d="M50 10 L85 25 L85 50 Q85 75 50 90 Q15 75 15 50 L15 25 Z" fill="white"/>
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Shield</h4>
                <p className="text-sm text-gray-600">Represents trust, security, and protection in digital identity</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="relative w-8 h-8">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Network Nodes</h4>
                <p className="text-sm text-gray-600">Three connected circles symbolize KYB, AML, and vLEI integration</p>
              </div>
              
              <div className="text-center">
               <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                 <div className="w-12 h-12 bg-green-400 rounded-full border-3 border-white flex items-center justify-center">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                     <path d="M20 6L9 17l-5-5" />
                   </svg>
                 </div>
               </div>
               <h4 className="font-bold text-gray-900 mb-2">Verification Badge</h4>
               <p className="text-sm text-gray-600">Green circle with checkmark signifies verified, trusted, and compliant status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}