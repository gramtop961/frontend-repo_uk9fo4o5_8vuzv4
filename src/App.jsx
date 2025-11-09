import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TradeForm from './components/TradeForm.jsx';
import TradeTable from './components/TradeTable.jsx';
import StatsSummary from './components/StatsSummary.jsx';

function App() {
  const [trades, setTrades] = useState(() => {
    try {
      const saved = localStorage.getItem('trading-journal-trades');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('trading-journal-trades', JSON.stringify(trades));
  }, [trades]);

  const addTrade = (t) => setTrades((prev) => [t, ...prev]);
  const deleteTrade = (id) => setTrades((prev) => prev.filter((t) => t.id !== id));
  const clearAll = () => setTrades([]);

  const latestSymbols = useMemo(() => {
    const seen = new Set();
    const ordered = [];
    for (const t of trades) {
      const s = (t.symbol || '').toUpperCase();
      if (s && !seen.has(s)) {
        seen.add(s);
        ordered.push(s);
      }
      if (ordered.length >= 5) break;
    }
    return ordered;
  }, [trades]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Your Journal</h2>
            <p className="text-sm text-slate-500">Capture every trade with intent, review with clarity.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {latestSymbols.length > 0 && (
              <>
                <span>Recently traded:</span>
                <div className="flex items-center gap-1">
                  {latestSymbols.map((s) => (
                    <span key={s} className="px-2 py-1 rounded-full bg-slate-200/70 text-slate-700 font-medium">{s}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-6">
          <StatsSummary trades={trades} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TradeForm onAdd={addTrade} />
            {trades.length > 0 && (
              <div className="mt-3 flex justify-end">
                <button onClick={clearAll} className="text-xs text-rose-600 hover:text-rose-700">Clear all</button>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <TradeTable trades={trades} onDelete={deleteTrade} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
