import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Header() {
  return (
    <header className="w-full">
      {/* Hero cover with Spline 3D scene */}
      <div className="relative w-full h-[340px] md:h-[440px] overflow-hidden">
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        {/* Gradient overlays for readability (do not block interactions) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        <div className="relative z-10 mx-auto max-w-6xl h-full px-4 flex flex-col justify-end pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 text-xs font-medium">
              Crypto Trading Journal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Log your crypto trades with clarity
          </h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-200/90">
            Track entries and exits, attach chart snapshots, and analyze performance across coins and pairs.
          </p>
        </div>
      </div>

      {/* Subheader bar */}
      <div className="border-b border-slate-800/20 bg-black text-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="text-xs md:text-sm text-slate-300">
            Built for crypto: BTC, ETH, alt pairs — spot or perp.
          </div>
          <div className="hidden sm:block text-xs text-slate-400">
            Private by default — stored locally in your browser
          </div>
        </div>
      </div>
    </header>
  );
}
