'use client';

import { Shield, FileText, Video, User, Settings, Search, Wallet } from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

interface AppShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppShell({ children, activeTab, onTabChange }: AppShellProps) {
  const navItems = [
    { id: 'rights', icon: Shield, label: 'Your Rights' },
    { id: 'scripts', icon: FileText, label: 'Scripts' },
    { id: 'recording', icon: Video, label: 'Recording' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen">
      <div className="app-shell">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h1 className="text-xl font-bold text-white">Zara</h1>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <a href="#" className="nav-item">Disclaimer</a>
            <a href="#" className="nav-item">Your Story</a>
            <a href="#" className="nav-item">Purchases</a>
            <a href="#" className="nav-item">Mindfulness</a>
            <a href="#" className="nav-item">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Search className="w-4 h-4 text-white" />
            </button>
            <ConnectWallet className="bg-white/20 hover:bg-white/30 text-white border-white/30" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 space-y-2">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
            
            <div className="pt-4 border-t border-white/20">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
