import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Copy, 
  ExternalLink, 
  MoreVertical,
  Filter,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AffiliateLink } from '../types';

const initialLinks: AffiliateLink[] = [
  { id: '1', name: 'MacBook Air M3 Review', originalUrl: 'https://amazon.com/macbook-air', shortCode: 'aff.flow/mac-m3', clicks: 1240, conversions: 45, revenue: 890, createdAt: '2024-04-10' },
  { id: '2', name: 'Ergonomic Desk Chair', originalUrl: 'https://wayfair.com/chair', shortCode: 'aff.flow/desk-chair', clicks: 850, conversions: 12, revenue: 120, createdAt: '2024-04-12' },
  { id: '3', name: 'Wireless Noise Cancelling Headphones', originalUrl: 'https://sony.com/headphones', shortCode: 'aff.flow/sony-xm5', clicks: 2100, conversions: 88, revenue: 1540, createdAt: '2024-04-14' },
];

export default function LinkManager() {
  const [links, setLinks] = useState<AffiliateLink[]>(initialLinks);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="text" 
            placeholder="Search links..." 
            className="glass-input w-full pl-10 pr-4 py-2.5"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg shadow-accent-blue/20">
            <Plus className="w-4 h-4" />
            Create Link
          </button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden shadow-xl shadow-black/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Link Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest">Short Code</th>
                <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest text-center">Clicks</th>
                <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest text-center">Conv.</th>
                <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest text-right">Revenue</th>
                <th className="px-6 py-5 text-[10px] font-black text-white/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-white group-hover:text-accent-blue transition-colors">{link.name}</span>
                      <span className="text-xs text-white/40 truncate max-w-[200px] font-medium">{link.originalUrl}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-white/5 border border-white/5 rounded text-xs font-mono text-accent-blue">{link.shortCode}</code>
                      <button 
                        onClick={() => copyToClipboard(link.shortCode, link.id)}
                        className="p-1 text-white/30 hover:text-white transition-colors"
                      >
                        {copiedId === link.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center font-bold text-white/70">{link.clicks.toLocaleString()}</td>
                  <td className="px-6 py-5 text-center font-bold text-white/70">{link.conversions.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-black text-white">${link.revenue.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-white/30 hover:text-accent-blue hover:bg-white/5 rounded-lg transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
