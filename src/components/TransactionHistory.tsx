import React from 'react';
import { Transaction } from '../types';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, History } from 'lucide-react';

interface Props {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
          <History className="w-4 h-4 text-blue-500" />
          Execution Log
        </h2>
        <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline uppercase tracking-wide">Export CSV</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-slate-400 text-[10px] uppercase tracking-widest font-bold bg-white">
            <tr>
              <th className="px-6 py-4 border-b border-slate-50">Transaction</th>
              <th className="px-6 py-4 border-b border-slate-50">Volume</th>
              <th className="px-6 py-4 border-b border-slate-50 font-mono">Price</th>
              <th className="px-6 py-4 border-b border-slate-50 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-xs italic">
                  Waiting for market execution orders...
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
                        tx.type === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {tx.type === 'BUY' ? 'B' : 'S'}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">{tx.symbol}</div>
                        <div className="text-[10px] text-slate-400 font-bold tracking-tight">#{tx.id.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-600">
                    {tx.shares.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-900">
                    ${tx.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Settled</span>
                      <span className="text-[9px] text-slate-400 font-medium">{format(tx.timestamp, 'HH:mm:ss')}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
