import React from 'react';

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center font-bold">TJ</div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Trading Journal</h1>
            <p className="text-xs text-slate-500">Log trades, review performance, and improve your edge.</p>
          </div>
        </div>
        <div className="hidden sm:block text-xs text-slate-400">
          Built for focus & clarity
        </div>
      </div>
    </header>
  );
}
