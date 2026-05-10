import React from 'react';
import { Stock } from '../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  stocks: Stock[];
  onSelect: (stock: Stock) => void;
  selectedSymbol: string;
}

export const MarketList: React.FC<Props> = ({ stocks, onSelect, selectedSymbol }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
          Watchlist
          <span className="ml-auto text-[10px] font-medium text-slate-400 capitalize whitespace-nowrap">Real-time (1m)</span>
        </h2>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
        <table className="w-full text-left">
          <thead className="text-slate-400 text-[10px] uppercase font-bold sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <tr>
              <th className="px-5 py-3 border-b border-slate-100">Symbol</th>
              <th className="px-5 py-3 text-right border-b border-slate-100 font-mono">Price</th>
              <th className="px-5 py-3 text-right border-b border-slate-100">Chg%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stocks.map((stock) => (
              <motion.tr 
                key={stock.symbol}
                onClick={() => onSelect(stock)}
                layout
                className={`cursor-pointer transition-colors group ${
                  selectedSymbol === stock.symbol ? 'bg-blue-50' : 'hover:bg-slate-50'
                }`}
              >
                <td className="px-5 py-3">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{stock.symbol}</div>
                    <div className="text-[10px] text-slate-500 font-medium truncate max-w-[100px] uppercase tracking-wide">{stock.category}</div>
                  </div>
                </td>
                <td className="px-5 py-3 text-right font-mono font-bold text-sm text-slate-700">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className={`inline-flex items-center gap-0.5 font-bold text-xs ${
                    stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {stock.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(stock.changePercent).toFixed(1)}%
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
