import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  balance: number;
  equity: number;
  profit: number;
}

export const PortfolioStats: React.FC<Props> = ({ balance, equity, profit }) => {
  const profitPercent = (profit / (balance + equity - profit)) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Cash Balance</span>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <DollarSign className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-mono text-slate-800">
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-slate-400 text-[10px] mt-2 font-medium">AVAILABLE FOR TRADING</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Portfolio Value</span>
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-mono text-slate-800">
          ${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        <p className="text-slate-400 text-[10px] mt-2 font-medium">TOTAL MARKET POSITION</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Net Returns</span>
          <div className={`p-2 rounded-lg ${profit >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
            {profit >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-500" />
            )}
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className={`text-2xl font-bold font-mono ${profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {profit >= 0 ? '+' : ''}${Math.abs(profit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          {!isNaN(profitPercent) && isFinite(profitPercent) && (
            <span className={`text-xs font-bold ${profit >= 0 ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
              {profitPercent.toFixed(2)}%
            </span>
          )}
        </div>
        <p className="text-slate-400 text-[10px] mt-2 font-medium uppercase">ALL-TIME PERFORMANCE</p>
      </motion.div>
    </div>
  );
};
