import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  RefreshCw, 
  Check,
  Facebook,
  Twitter,
  Instagram,
  Mail
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AICopywriter() {
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCopy = async () => {
    if (!productName || !productDesc) return;
    
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a high-converting affiliate marketing post for ${platform}. 
        Product: ${productName}
        Description: ${productDesc}
        The post should be engaging, include emojis, and have a clear call to action for the affiliate link.`,
      });
      setResult(response.text || '');
    } catch (error) {
      console.error("Error generating copy:", error);
      setResult("Failed to generate copy. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="glass-panel p-8 shadow-xl shadow-black/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-accent-blue/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-accent-blue" />
            </div>
            <h3 className="font-bold text-xl tracking-tight">Campaign Details</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Product Name</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Sony WH-1000XM5" 
                className="glass-input w-full px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Product Description</label>
              <textarea 
                rows={4}
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="Describe the key features and benefits..." 
                className="glass-input w-full px-4 py-3 resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Platform</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { id: 'instagram', icon: Instagram },
                  { id: 'twitter', icon: Twitter },
                  { id: 'facebook', icon: Facebook },
                  { id: 'email', icon: Mail },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      platform === p.id 
                        ? 'bg-accent-blue/20 border-accent-blue/30 text-accent-blue' 
                        : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10 hover:text-white/60'
                    }`}
                  >
                    <p.icon className="w-5 h-5 mb-1.5" />
                    <span className="text-[10px] font-black uppercase tracking-wider">{p.id}</span>
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={generateCopy}
              disabled={loading || !productName || !productDesc}
              className="w-full py-4 bg-accent-blue text-white rounded-2xl font-black uppercase tracking-widest hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent-blue/20 mt-4"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {loading ? 'Generating...' : 'Generate Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel flex flex-col min-h-[500px] shadow-xl shadow-black/10 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
          <h3 className="font-bold text-xl tracking-tight">Generated Result</h3>
          {result && (
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <div className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                  <Sparkles className="w-10 h-10 text-white/10" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-white/20">Ready to write</p>
                  <p className="text-sm text-white/20 font-medium mt-1">Fill in the details to generate copy</p>
                </div>
              </motion.div>
            ) : loading ? (
              <div className="space-y-6">
                <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
                <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
                <div className="h-4 bg-white/5 rounded-full w-4/5 animate-pulse" />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="whitespace-pre-wrap text-white/80 leading-relaxed font-sans text-lg"
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
