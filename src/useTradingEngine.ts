import { useState, useEffect, useCallback } from 'react';
import { Stock, INITIAL_STOCKS, generateInitialHistory, PortfolioItem, Transaction } from './types';
import { format } from 'date-fns';

export function useTradingEngine() {
  const [stocks, setStocks] = useState<Stock[]>(() => 
    INITIAL_STOCKS.map(s => ({
      ...s,
      history: generateInitialHistory(s.price)
    }))
  );
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => prevStocks.map(stock => {
        const volatility = 0.002; // 0.2% max change per tick
        const change = (Math.random() - 0.49) * (stock.price * volatility);
        const newPrice = Number((stock.price + change).toFixed(2));
        const newHistory = [...stock.history.slice(1), { 
          time: format(new Date(), 'HH:mm:ss'), 
          price: newPrice 
        }];
        
        return {
          ...stock,
          price: newPrice,
          change: Number((newPrice - stock.history[0].price).toFixed(2)),
          changePercent: Number(((newPrice - stock.history[0].price) / stock.history[0].price * 100).toFixed(2)),
          history: newHistory
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const buyStock = useCallback((symbol: string, shares: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    const cost = stock.price * shares;
    setBalance(prev => prev - cost);

    setPortfolio(prev => {
      const existing = prev.find(p => p.symbol === symbol);
      if (existing) {
        return prev.map(p => p.symbol === symbol 
          ? { ...p, shares: p.shares + shares, avgPrice: (p.avgPrice * p.shares + cost) / (p.shares + shares) }
          : p
        );
      }
      return [...prev, { symbol, shares, avgPrice: stock.price }];
    });

    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      symbol,
      type: 'BUY',
      shares,
      price: stock.price,
      timestamp: new Date()
    }, ...prev]);
  }, [stocks]);

  const sellStock = useCallback((symbol: string, shares: number) => {
    const stock = stocks.find(s => s.symbol === symbol);
    const position = portfolio.find(p => p.symbol === symbol);
    if (!stock || !position || position.shares < shares) return;

    const gain = stock.price * shares;
    setBalance(prev => prev + gain);

    setPortfolio(prev => {
      return prev.map(p => p.symbol === symbol 
        ? { ...p, shares: p.shares - shares }
        : p
      ).filter(p => p.shares > 0);
    });

    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      symbol,
      type: 'SELL',
      shares,
      price: stock.price,
      timestamp: new Date()
    }, ...prev]);
  }, [stocks, portfolio]);

  const portfolioValue = portfolio.reduce((acc, item) => {
    const stock = stocks.find(s => s.symbol === item.symbol);
    return acc + (stock?.price || 0) * item.shares;
  }, 0);

  return {
    stocks,
    balance,
    portfolio,
    transactions,
    portfolioValue,
    buyStock,
    sellStock
  };
}
