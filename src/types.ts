import { format } from 'date-fns';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: { time: string; price: number }[];
  category: string;
}

export interface PortfolioItem {
  symbol: string;
  shares: number;
  avgPrice: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  shares: number;
  price: number;
  timestamp: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  time: string;
  impact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export const INITIAL_STOCKS: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.92, change: 0, changePercent: 0, history: [], category: 'Tech' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 238.45, change: 0, changePercent: 0, history: [], category: 'Auto' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 475.22, change: 0, changePercent: 0, history: [], category: 'Tech' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 145.18, change: 0, changePercent: 0, history: [], category: 'Retail' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 374.58, change: 0, changePercent: 0, history: [], category: 'Tech' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 132.88, change: 0, changePercent: 0, history: [], category: 'Tech' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', price: 312.45, change: 0, changePercent: 0, history: [], category: 'Social' },
  { symbol: 'NFLX', name: 'Netflix, Inc.', price: 468.22, change: 0, changePercent: 0, history: [], category: 'Media' },
];

export const generateInitialHistory = (basePrice: number) => {
  const history = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const randomChange = (Math.random() - 0.5) * (basePrice * 0.01);
    history.push({
      time: format(time, 'HH:mm'),
      price: Number((basePrice + randomChange).toFixed(2))
    });
  }
  return history;
};

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Announces New AI Chips',
    summary: 'The new H200 chips promise 2x performance in AI training workloads.',
    time: '2m ago',
    impact: 'POSITIVE'
  },
  {
    id: '2',
    title: 'Fed Hints at Rate Hold',
    summary: 'Central bank signals that interest rates might stay steady for the next quarter.',
    time: '15m ago',
    impact: 'NEUTRAL'
  },
  {
    id: '3',
    title: 'Apple Supply Chain Concerns',
    summary: 'Logistics issues in Southeast Asia could impact iPhone delivery times.',
    time: '1h ago',
    impact: 'NEGATIVE'
  }
];
