import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  TrendingUp,
  ArrowRight,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

const products: Product[] = [
  { id: '1', name: 'Ultra-Wide Monitor 34"', description: '4K resolution, 144Hz refresh rate, perfect for productivity.', commission: 15, price: 499, category: 'Tech', imageUrl: 'https://picsum.photos/seed/monitor/400/300' },
  { id: '2', name: 'Ergonomic Standing Desk', description: 'Dual motor, memory presets, solid wood top.', commission: 12, price: 350, category: 'Furniture', imageUrl: 'https://picsum.photos/seed/desk/400/300' },
  { id: '3', name: 'Noise Cancelling Headphones', description: 'Industry leading noise cancellation, 30-hour battery life.', commission: 20, price: 299, category: 'Audio', imageUrl: 'https://picsum.photos/seed/headphones/400/300' },
  { id: '4', name: 'Mechanical Keyboard', description: 'RGB lighting, hot-swappable switches, wireless.', commission: 18, price: 129, category: 'Tech', imageUrl: 'https://picsum.photos/seed/keyboard/400/300' },
  { id: '5', name: '4K Web Camera', description: 'Auto-focus, dual microphones, privacy shutter.', commission: 10, price: 89, category: 'Tech', imageUrl: 'https://picsum.photos/seed/webcam/400/300' },
  { id: '6', name: 'Smart Fitness Watch', description: 'Heart rate monitoring, GPS, water resistant.', commission: 25, price: 199, category: 'Fitness', imageUrl: 'https://picsum.photos/seed/watch/400/300' },
];

export default function Marketplace() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="glass-input w-full pl-10 pr-4 py-2.5"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Categories
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card hover:shadow-2xl hover:shadow-accent-blue/10 transition-all group overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                {product.commission}% Commission
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-blue">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold">4.8</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-accent-blue transition-colors tracking-tight">{product.name}</h3>
              <p className="text-sm text-white/50 font-medium line-clamp-2 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Price</p>
                  <p className="text-2xl font-black text-white tracking-tighter">${product.price}</p>
                </div>
                <button className="flex items-center gap-2 bg-accent-blue text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg shadow-accent-blue/20">
                  Promote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
