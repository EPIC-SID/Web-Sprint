// CampusMapView — PCCOE Campus Interactive Explorer
import React, { useState } from 'react';
import { MOCK_CAMPUS_SPOTS } from '../../../data/mockData';
import { CampusSpot } from '../../../types';
import {
  MapPin,
  Clock,
  Layers,
  CheckCircle,
  Navigation,
  Info
} from 'lucide-react';

export const CampusMapView: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<CampusSpot>(MOCK_CAMPUS_SPOTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Labs', 'Library', 'Canteen', 'Auditorium'];

  const filteredSpots = activeCategory === 'All'
    ? MOCK_CAMPUS_SPOTS
    : MOCK_CAMPUS_SPOTS.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">PCCOE Campus Explorer</h2>
            <span className="text-xs bg-cyan-500/20 text-cyan-300 font-semibold px-2 py-0.5 rounded-full border border-cyan-500/30">
              Interactive 2.0
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Locate high-spec compute labs, quiet library study cubicles, auditoriums, and cafeterias
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === c
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-white/[0.05]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Interactive Map Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Map Canvas / Schematic */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white/[0.08] relative min-h-[420px] flex flex-col justify-between overflow-hidden bg-radial-at-c from-zinc-900 via-[#0e0e14] to-[#0a0a0c]">
          {/* Schematic Blueprint Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/[0.1] text-[11px] text-zinc-400 backdrop-blur-md">
            <Navigation className="w-3.5 h-3.5 text-cyan-400 rotate-45" />
            <span>North Campus</span>
          </div>

          {/* Interactive Spots Overlay */}
          <div className="relative w-full h-72 sm:h-80 my-auto">
            {/* Campus Outline representation */}
            <div className="absolute inset-4 rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.02] flex items-center justify-center">
              <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">
                PCCOE Sector 26 Nigdi Pradhikaran Campus Plan
              </span>
            </div>

            {MOCK_CAMPUS_SPOTS.map((spot) => {
              const isSelected = selectedSpot.id === spot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  style={{
                    left: `${spot.coordinates.x}%`,
                    top: `${spot.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Glowing Ping */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-cyan-400/30 animate-ping" />
                    )}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 ${
                        isSelected
                          ? 'bg-cyan-500 text-black scale-110 ring-4 ring-cyan-400/40 shadow-cyan-500/50'
                          : 'bg-white/[0.08] text-white hover:bg-cyan-600/80 border border-white/[0.1]'
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 whitespace-nowrap shadow-md transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-black font-extrabold'
                          : 'bg-black/70 text-zinc-300 backdrop-blur-md group-hover:text-white'
                      }`}
                    >
                      {spot.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Click any campus marker to view wing, floor & active facilities
            </span>
          </div>
        </div>

        {/* Spot Details Drawer Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="h-44 rounded-2xl overflow-hidden mb-4 border border-white/[0.08]">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedSpot.category}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {selectedSpot.building}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
              {selectedSpot.name}
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              {selectedSpot.description}
            </p>

            <div className="space-y-2 mb-4 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Floor / Location: <strong className="text-zinc-200">{selectedSpot.floor}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Timings: <strong className="text-zinc-200">{selectedSpot.timing}</strong></span>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                Key Amenities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSpot.amenities.map((am) => (
                  <span
                    key={am}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06] flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {am}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => alert(`Directions set to ${selectedSpot.name}!`)}
            className="w-full mt-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition shadow-lg shadow-cyan-600/20"
          >
            Get Campus Navigation
          </button>
        </div>
      </div>
    </div>
  );
};
