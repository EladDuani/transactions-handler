import React, { useState } from 'react';
import { Stock, PortfolioItem } from '../types';
import { MarketChart } from './MarketChart';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Briefcase } from 'lucide-react';

interface Props {
  stock: Stock;
  portfolio: PortfolioItem[];
  onBuy: (symbol: string, shares: number) => void;
  onSell: (symbol: string, shares: number) => void;
}

export const StockDetail: React.FC<Props> = ({ stock, portfolio, onBuy, onSell }) => {
  const [shares, setShares] = useState(1);
  const position = portfolio.find(p => p.symbol === stock.symbol);
  
  const handleBuy = () => {
    onBuy(stock.symbol, shares);
  };

  const handleSell = () => {
    onSell(stock.symbol, shares);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col h-fit sticky top-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{stock.name}</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
            {stock.symbol} <span className="text-slate-300">•</span> {stock.category}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-slate-900 tracking-tighter">${stock.price.toFixed(2)}</div>
          <div className={`text-xs font-bold ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'} flex items-center justify-end gap-1`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-2 mb-6">
        <MarketChart stock={stock} />
      </div>

      <div className="space-y-6">
        {position && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Active Position</div>
                <div className="text-base font-bold font-mono text-slate-800">{position.shares} shares</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Avg Cost</div>
              <div className="text-base font-bold font-mono text-slate-800">${position.avgPrice.toFixed(2)}</div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button 
              onClick={() => setShares(s => Math.max(1, s - 1))}
              className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-800"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input 
              type="number" 
              value={shares}
              onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full text-center bg-transparent font-bold font-mono text-lg focus:outline-none"
            />
            <button 
              onClick={() => setShares(s => s + 1)}
              className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleBuy}
              className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-sm active:scale-[0.98] text-sm"
            >
              Buy {stock.symbol}
            </button>
            <button 
              onClick={handleSell}
              disabled={!position || position.shares < shares}
              className="py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-[0.98] text-sm"
            >
              Sell {stock.symbol}
            </button>
          </div>
          
          <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Order Total: <span className="font-mono text-slate-800 font-bold">${(stock.price * shares).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
