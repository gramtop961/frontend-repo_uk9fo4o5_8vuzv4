import React from 'react';

function formatCurrency(n) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n || 0);
}

export default function TradeTable({ trades, onDelete }) {
  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Trades</h2>
        <span className="text-sm text-slate-500">{trades.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Pair</th>
              <th className="text-left px-4 py-3">Side</th>
              <th className="text-right px-4 py-3">Entry</th>
              <th className="text-right px-4 py-3">Exit</th>
              <th className="text-right px-4 py-3">Size</th>
              <th className="text-right px-4 py-3">P/L</th>
              <th className="text-left px-4 py-3">Chart</th>
              <th className="text-right px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-slate-500 py-8">No trades yet. Add your first one above.</td>
              </tr>
            ) : (
              trades.map((t) => (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{t.date}</td>
                  <td className="px-4 py-3 font-medium">{t.symbol}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.side === 'Long' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{t.side}</span>
                  </td>
                  <td className="px-4 py-3 text-right">{formatCurrency(t.entry)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(t.exit)}</td>
                  <td className="px-4 py-3 text-right">{t.size}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${t.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatCurrency(t.pnl)}</td>
                  <td className="px-4 py-3">
                    {t.chart ? (
                      <img src={t.chart} alt={`Chart ${t.symbol}`} className="h-10 w-16 object-cover rounded border border-slate-200" />
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onDelete(t.id)} className="text-rose-600 hover:text-rose-700 text-xs">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
