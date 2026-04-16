import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { DailyStat } from '../types';

const data: DailyStat[] = [
  { date: 'Apr 10', clicks: 450, conversions: 12, revenue: 240 },
  { date: 'Apr 11', clicks: 520, conversions: 15, revenue: 310 },
  { date: 'Apr 12', clicks: 480, conversions: 10, revenue: 190 },
  { date: 'Apr 13', clicks: 610, conversions: 22, revenue: 450 },
  { date: 'Apr 14', clicks: 750, conversions: 28, revenue: 580 },
  { date: 'Apr 15', clicks: 680, conversions: 24, revenue: 490 },
  { date: 'Apr 16', clicks: 820, conversions: 35, revenue: 720 },
];

const stats = [
  { label: 'Total Revenue', value: '$2,980.00', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Total Clicks', value: '4,310', change: '+8.2%', icon: MousePointer2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Conversions', value: '146', change: '+15.3%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Avg. EPC', value: '$0.69', change: '-2.1%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 shadow-xl shadow-black/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-white/10`}>
                <stat.icon className={`w-6 h-6 text-accent-blue`} />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/50 font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 shadow-xl shadow-black/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl tracking-tight">Revenue Performance</h3>
            <select className="text-xs bg-white/10 border-white/10 rounded-lg focus:ring-accent-blue focus:border-accent-blue text-white font-bold px-3 py-1.5 outline-none">
              <option className="bg-[#1A1A1A]">Last 7 days</option>
              <option className="bg-[#1A1A1A]">Last 30 days</option>
              <option className="bg-[#1A1A1A]">This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' 
                  }}
                  itemStyle={{ color: '#FFF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4facfe" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 shadow-xl shadow-black/10">
          <h3 className="font-bold text-xl tracking-tight mb-8">Top Campaigns</h3>
          <div className="space-y-6">
            {[
              { name: 'Summer Sale 2024', revenue: '$1,240', clicks: '1.2k', color: 'bg-accent-blue' },
              { name: 'Tech Gadgets Review', revenue: '$890', clicks: '850', color: 'bg-emerald-400' },
              { name: 'Fitness Gear Promo', revenue: '$520', clicks: '620', color: 'bg-amber-400' },
              { name: 'Home Office Setup', revenue: '$330', clicks: '410', color: 'bg-rose-400' },
            ].map((campaign) => (
              <div key={campaign.name} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-10 rounded-full ${campaign.color} shadow-lg shadow-white/5 opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-accent-blue transition-colors">{campaign.name}</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{campaign.clicks} clicks</p>
                  </div>
                </div>
                <span className="font-black text-sm tracking-tight">{campaign.revenue}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 text-xs font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            View All Campaigns
          </button>
        </div>
      </div>
    </div>
  );
}
