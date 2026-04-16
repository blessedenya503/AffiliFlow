import React from 'react';
import { 
  LayoutDashboard, 
  Link2, 
  ShoppingBag, 
  PenTool, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'links', label: 'Links', icon: Link2 },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'copywriter', label: 'AI Copywriter', icon: PenTool },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen p-6 gap-6 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-panel flex flex-col p-8">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center shadow-lg shadow-accent-blue/20">
            <Link2 className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-accent-blue to-[#00f2fe] bg-clip-text text-transparent">
            AffiliFlow
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-accent-blue" : "text-white/40 group-hover:text-white/60")} />
                <span className={cn("font-semibold text-sm", activeTab === item.id ? "text-white" : "")}>{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="w-4 h-4 text-accent-blue" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-8 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-rose-400 transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
        <header className="flex items-center justify-between">
          <div className="welcome">
            <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-white/60 text-sm mt-1">Real-time performance overview</p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold">Aniema Enya</span>
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Pro Affiliate</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white text-xs font-black shadow-lg shadow-accent-blue/20">
              AE
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
