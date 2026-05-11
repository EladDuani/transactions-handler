import React from 'react';
import { INITIAL_NEWS } from '../types';
import { MessageSquare, Zap, Newspaper } from 'lucide-react';

export const NewsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-widest">
          <Newspaper className="w-4 h-4 text-blue-500" />
          Live Intelligence
        </h2>
      </div>
      <div className="flex-1 overflow-hidden px-5 py-4 space-y-5">
        {INITIAL_NEWS.map((news) => (
          <article key={news.id} className="space-y-1.5 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  news.impact === 'POSITIVE' ? 'bg-emerald-50 text-emerald-600' : 
                  news.impact === 'NEGATIVE' ? 'bg-rose-50 text-rose-600' : 
                  'bg-slate-100 text-slate-500'
                }`}>
                  {news.impact === 'POSITIVE' ? 'Positive' : news.impact === 'NEGATIVE' ? 'Negative' : 'Neutral'}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.time}</span>
              </div>
            </div>
            <h3 className="font-bold text-sm leading-tight text-slate-800 group-hover:text-blue-600 transition-colors">
              {news.title}
            </h3>
            <p className={`text-xs leading-relaxed ${news.id === '4' ? 'text-white' : 'text-slate-500 line-clamp-2'}`}>
              {news.summary}
            </p>
            <div className="h-[1px] bg-slate-50 mt-4 group-last:hidden"></div>
          </article>
        ))}
      </div>
      <div className="p-4 bg-slate-900 m-4 rounded-lg flex items-center justify-between">
        <div className="text-white font-bold text-xs">Upgrade to Pro</div>
        <button className="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded hover:bg-blue-600 transition-colors">
          Get Access
        </button>
      </div>
    </div>
  );
};
