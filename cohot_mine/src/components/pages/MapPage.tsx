import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Compass, Layers } from 'lucide-react';

interface CampusSpot {
  id: string;
  name: string;
  category: string;
  building: string;
  floor: string;
  description: string;
  timing: string;
  amenities: string[];
  image: string;
  coord: { x: number; y: number };
}

const SPOTS: CampusSpot[] = [
  {
    id: 'spot_1',
    name: 'Central Computing Facility (CCF Labs)',
    category: 'Labs',
    building: 'Computer & IT Building',
    floor: '2nd & 3rd Floor',
    description:
      'High-performance GPU workstations with Linux & Windows environments for machine learning practicals and competitive coding.',
    timing: '8:00 AM - 8:00 PM (Mon-Sat)',
    amenities: ['Gigabit LAN', 'Air Conditioned', 'NVIDIA GPUs', 'Uninterrupted Power'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    coord: { x: 38, y: 35 },
  },
  {
    id: 'spot_2',
    name: 'Central Library & Digital Knowledge Center',
    category: 'Library',
    building: 'Main Administrative Wing',
    floor: '1st & 2nd Floor',
    description:
      'Over 50,000 reference books, IEEE / Springer journals, quiet reading zones, and digital terminal access.',
    timing: '7:30 AM - 10:00 PM',
    amenities: ['Silent Study Zone', 'IEEE Access', 'Book Lending Machine', 'Wi-Fi 6'],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
    coord: { x: 55, y: 25 },
  },
  {
    id: 'spot_3',
    name: 'Main Canteen & Nescafe Courtyard',
    category: 'Canteen',
    building: 'Campus Center Ground',
    floor: 'Ground Level',
    description:
      'Popular student hangout hub offering snacks, south indian delicacies, meals, juices, and coffee bar.',
    timing: '8:00 AM - 7:00 PM',
    amenities: ['Outdoor Seating', 'UPI Enabled', 'Fast Food & Meals', 'Clean Drinking Water'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    coord: { x: 62, y: 65 },
  },
  {
    id: 'spot_4',
    name: 'Pimpri Chinchwad Auditorium (LRDC)',
    category: 'Auditorium',
    building: 'LRDC Building',
    floor: 'Ground & 1st Floor',
    description:
      '800-seat state of the art air conditioned auditorium for guest lectures, TEDxPCCOE, cultural fests, and hackathons.',
    timing: 'Events based schedule',
    amenities: ['Dolby Surround', 'Stage Lighting Rig', 'Green Rooms', 'Dual Projectors'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    coord: { x: 22, y: 50 },
  },
];

export const MapPage: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<CampusSpot>(SPOTS[0]);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Labs', 'Library', 'Canteen', 'Auditorium'];

  const filteredSpots =
    activeFilter === 'All' ? SPOTS : SPOTS.filter((s) => s.category === activeFilter);

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">PCCOE Campus Navigation</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Find CCF labs, central library, canteens, auditoriums, and department blocks
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeFilter === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Interactive Map & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
        {/* Interactive Schematic Campus Canvas */}
        <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-sm">
          {/* Blueprint Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Campus Map Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                PCCOE Sector 26 Campus Layout
              </span>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-secondary text-muted-foreground font-mono">
              NIGDI, PUNE
            </span>
          </div>

          {/* Interactive Spot Markers */}
          <div className="relative z-10 my-12 h-64 w-full border border-dashed border-border/80 rounded-xl bg-background/50 backdrop-blur-sm p-4">
            {/* Department Buildings Blocks */}
            <div className="absolute top-4 left-4 w-36 h-20 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-500 text-center p-1">
              Computer & IT Building
            </div>
            <div className="absolute top-4 right-6 w-36 h-20 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500 text-center p-1">
              Admin & Central Library
            </div>
            <div className="absolute bottom-6 left-6 w-32 h-16 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-[10px] font-bold text-pink-500 text-center p-1">
              LRDC Auditorium
            </div>
            <div className="absolute bottom-6 right-8 w-32 h-16 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-500 text-center p-1">
              Main Canteen & Court
            </div>

            {/* Clickable Spot Pins */}
            {filteredSpots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                style={{ top: `${spot.coord.y}%`, left: `${spot.coord.x}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all cursor-pointer z-20 ${
                  selectedSpot.id === spot.id
                    ? 'bg-primary text-primary-foreground scale-125 ring-4 ring-primary/20'
                    : 'bg-card text-foreground hover:scale-110 border border-border'
                }`}
              >
                <MapPin className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Click pin to view location info
            </span>
            <span>4 Key Facilities Active</span>
          </div>
        </div>

        {/* Selected Spot Details Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="h-44 overflow-hidden relative">
            <img
              src={selectedSpot.image}
              alt={selectedSpot.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-black/60 text-white backdrop-blur-sm">
              {selectedSpot.category}
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground mb-1">{selectedSpot.name}</h2>
              <div className="text-xs text-primary font-medium mb-3">
                {selectedSpot.building} • {selectedSpot.floor}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {selectedSpot.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Clock className="w-3.5 h-3.5 text-foreground" />
                <span>{selectedSpot.timing}</span>
              </div>

              {/* Amenities */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                  Available Facilities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSpot.amenities.map((am) => (
                    <span
                      key={am}
                      className="px-2 py-0.5 rounded-md bg-secondary text-foreground text-[10px] font-medium"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Directions to ${selectedSpot.name} started!`)}
              className="w-full mt-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Start Campus Navigation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
