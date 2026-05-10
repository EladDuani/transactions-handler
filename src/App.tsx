import { useState } from 'react';
import { useTradingEngine } from './useTradingEngine';
import { PortfolioStats } from './components/PortfolioStats';
import { MarketList } from './components/MarketList';
import { StockDetail } from './components/StockDetail';
import { NewsSection } from './components/NewsSection';
import { TransactionHistory } from './components/TransactionHistory';
import { Activity, LayoutDashboard, Wallet, BarChart2, Bell, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const { 
    stocks, 
    balance, 
    portfolio, 
    transactions, 
    portfolioValue, 
    buyStock, 
    sellStock 
  } = useTradingEngine();

  const [selectedSymbol, setSelectedSymbol] = useState(stocks[0].symbol);
  
  const selectedStock = stocks.find(s => s.symbol === selectedSymbol) || stocks[0];
  const totalProfit = portfolioValue + balance - 10000;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden lg:block">PulseTrade</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: BarChart2, label: 'Portfolio', active: false },
            { icon: Wallet, label: 'Wallet', active: false },
            { icon: Bell, label: 'Alerts', active: false },
          ].map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                item.active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-semibold hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Account Balance</div>
          <div className={`text-2xl font-mono ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 uppercase">Equity: ${portfolioValue.toLocaleString()}</div>
        </div>

        <div className="p-4 space-y-1">
          <button className="w-full flex items-center gap-4 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 transition-all">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium hidden lg:block">Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium hidden lg:block">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Market Open
            </div>
            <div className="hidden md:flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span>S&P 500 <span className="text-emerald-500">+1.2%</span></span>
              <span className="w-[1px] h-3 bg-slate-200"></span>
              <span>NASDAQ <span className="text-emerald-500">+0.8%</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 rounded-full px-4 py-1.5 flex items-center gap-2 border border-slate-200/50">
              <LogOut className="w-4 h-4 text-slate-400 rotate-90" /> {/* Reusing an icon for search-like feel if needed, but let's stick to user search if I had one. Use search icon from lucide if I want to be precise */}
              <input type="text" placeholder="Search markets..." className="bg-transparent border-none text-xs outline-none w-32 lg:w-48 text-slate-600 placeholder:text-slate-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
               <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <PortfolioStats 
            balance={balance} 
            equity={portfolioValue} 
            profit={totalProfit} 
          />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Column: Charts & Analysis */}
            <div className="xl:col-span-8 flex flex-col gap-8">
              <StockDetail 
                stock={selectedStock} 
                portfolio={portfolio}
                onBuy={buyStock}
                onSell={sellStock}
              />
              
              <TransactionHistory transactions={transactions} />
            </div>

            {/* Right Column: Watchlist & News */}
            <div className="xl:col-span-4 flex flex-col gap-8">
              <MarketList 
                stocks={stocks} 
                onSelect={(s) => setSelectedSymbol(s.symbol)}
                selectedSymbol={selectedSymbol}
              />
              
              <NewsSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

