import React, { useState } from 'react';

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  symbol: '',
  side: 'Long',
  entry: '',
  exit: '',
  size: '',
  notes: '',
};

export default function TradeForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.symbol || !form.entry || !form.exit || !form.size) return;
    const entry = parseFloat(form.entry);
    const exit = parseFloat(form.exit);
    const size = parseFloat(form.size);
    const pnl = (exit - entry) * size * (form.side === 'Long' ? 1 : -1);

    onAdd({ ...form, entry, exit, size, pnl, id: crypto.randomUUID() });
    setForm(initialForm);
  };

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3 text-slate-800">Add Trade</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Symbol</label>
          <input placeholder="AAPL" name="symbol" value={form.symbol} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Side</label>
          <select name="side" value={form.side} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Long</option>
            <option>Short</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Entry</label>
          <input type="number" step="0.01" name="entry" value={form.entry} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Exit</label>
          <input type="number" step="0.01" name="exit" value={form.exit} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Size</label>
          <input type="number" step="1" name="size" value={form.size} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="md:col-span-3 flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition">
            Save Trade
          </button>
        </div>
      </form>
    </div>
  );
}
