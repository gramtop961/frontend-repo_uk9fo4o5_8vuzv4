import React, { useMemo } from 'react';

function formatCurrency(n) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n || 0);
}

export default function StatsSummary({ trades }) {
  const stats = useMemo(() => {
    const totalTrades = trades.length;
    const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const wins = trades.filter((t) => (t.pnl || 0) > 0).length;
    const losses = trades.filter((t) => (t.pnl || 0) < 0).length;
    const winRate = totalTrades ? Math.round((wins / totalTrades) * 100) : 0;
    const avgWin = wins ? trades.filter(t => (t.pnl||0) > 0).reduce((s,t)=>s+t.pnl,0)/wins : 0;
    const avgLoss = losses ? trades.filter(t => (t.pnl||0) < 0).reduce((s,t)=>s+t.pnl,0)/losses : 0;
    const rr = avgLoss !== 0 ? Math.abs(avgWin / Math.abs(avgLoss)) : 0;

    return { totalTrades, totalPnl, wins, losses, winRate, avgWin, avgLoss, rr };
  }, [trades]);

  const cards = [
    { label: 'Total P/L', value: formatCurrency(stats.totalPnl) },
    { label: 'Win Rate', value: `${stats.winRate}%` },
    { label: 'Wins / Losses', value: `${stats.wins} / ${stats.losses}` },
    { label: 'Avg Win', value: formatCurrency(stats.avgWin) },
    { label: 'Avg Loss', value: formatCurrency(stats.avgLoss) },
    { label: 'R:R', value: stats.rr ? stats.rr.toFixed(2) : '0.00' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs text-slate-500">{c.label}</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
