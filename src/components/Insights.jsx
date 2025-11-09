import React from 'react';

export default function Insights({ trades }) {
  const bySymbol = trades.reduce((map, t) => {
    const key = t.symbol?.toUpperCase() || 'UNKNOWN';
    map[key] = map[key] || { count: 0, pnl: 0 };
    map[key].count += 1;
    map[key].pnl += t.pnl || 0;
    return map;
  }, {});

  const symbols = Object.entries(bySymbol)
    .sort((a, b) => b[1].pnl - a[1].pnl)
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Insights</h2>
      {symbols.length === 0 ? (
        <p className="text-sm text-slate-500">Insights will appear as you add more trades.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {symbols.map(([sym, data]) => (
            <li key={sym} className="py-2 flex items-center justify-between">
              <span className="font-medium">{sym}</span>
              <span className={`text-sm font-semibold ${data.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(data.pnl)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
