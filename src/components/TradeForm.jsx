import React, { useState } from 'react';

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  symbol: '',
  side: 'Long',
  entry: '',
  exit: '',
  size: '',
  notes: '',
  chart: null,
};

export default function TradeForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({ ...f, chart: reader.result }));
        setUploading(false);
      };
      reader.onerror = () => setUploading(false);
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  const removeImage = () => setForm((f) => ({ ...f, chart: null }));

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
      <h2 className="text-lg font-semibold mb-3 text-slate-800">Add Crypto Trade</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Pair</label>
          <input placeholder="BTCUSDT" name="symbol" value={form.symbol} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
          <input type="number" step="0.00000001" name="entry" value={form.entry} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Exit</label>
          <input type="number" step="0.00000001" name="exit" value={form.exit} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Size</label>
          <input type="number" step="0.0001" name="size" value={form.size} onChange={handleChange} className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        {/* Chart upload */}
        <div className="md:col-span-3">
          <label className="text-sm text-slate-600 mb-1">Chart Screenshot</label>
          {form.chart ? (
            <div className="flex items-center gap-3">
              <img src={form.chart} alt="Chart preview" className="h-24 w-24 object-cover rounded-lg border border-slate-200" />
              <button type="button" onClick={removeImage} className="text-xs text-rose-600 hover:text-rose-700">Remove</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" />
              {uploading && <span className="text-xs text-slate-500">Uploading...</span>}
            </div>
          )}
        </div>

        <div className="md:col-span-3 flex flex-col">
          <label className="text-sm text-slate-600 mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Setup, reasoning, emotions, risk, etc." className="px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
