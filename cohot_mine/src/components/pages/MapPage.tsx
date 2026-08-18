import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Navigation, Clock, X } from 'lucide-react';

interface CampusNode {
  id: string;
  name: string;
  category: 'Department' | 'Canteen' | 'Lawn' | 'Gate' | 'Transit';
  lat: number;
  lng: number;
  color: string;
  description: string;
  timing: string;
  floor: string;
  amenities: string[];
  studentsHere?: { name: string; avatar: string }[];
}

const PCCOE_NODES: CampusNode[] = [
  {
    id: 'comp_dept',
    name: 'Computer & IT Department Building',
    category: 'Department',
    lat: 18.65185,
    lng: 73.7626,
    color: '#3b82f6', // Blue
    description:
      'Houses Computer Engineering & IT classrooms, CCF server rooms, AI/ML laboratories, and student seminar halls.',
    timing: '8:00 AM - 7:30 PM',
    floor: 'Ground to 4th Floor',
    amenities: ['CCF High-Perf Labs', 'Smart Classrooms', 'Wi-Fi 6', 'Water Cooler'],
    studentsHere: [
      {
        name: 'Siddhant Verma',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      },
      {
        name: 'Shravan Kolhe',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      },
      {
        name: 'Felina Mathew',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      },
    ],
  },
  {
    id: 'canteen_hub',
    name: 'Main Canteen & Nescafe Courtyard',
    category: 'Canteen',
    lat: 18.6521,
    lng: 73.7627,
    color: '#f97316', // Orange
    description:
      'Central student dining area serving fresh meals, snacks, coffee, juices, and outdoor seating patio.',
    timing: '8:00 AM - 7:00 PM',
    floor: 'Ground Level Courtyard',
    amenities: ['Outdoor Seating', 'UPI Fast Checkout', 'Snack Bar', 'Juice Center'],
    studentsHere: [
      {
        name: 'Arnav Telangi',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      },
    ],
  },
  {
    id: 'central_lawn',
    name: 'Central Green Lawns & Open Amphitheatre',
    category: 'Lawn',
    lat: 18.65195,
    lng: 73.76275,
    color: '#10b981', // Green
    description:
      'Lush green campus quad where students gather for cultural club practices, reading, and college festivals.',
    timing: '24/7 Accessible',
    floor: 'Ground Level Quad',
    amenities: ['Shaded Gazebos', 'Solar Benches', 'Lawn Seating'],
  },
  {
    id: 'admin_library',
    name: 'Administrative Wing & Central Library',
    category: 'Department',
    lat: 18.6516,
    lng: 73.76255,
    color: '#3b82f6', // Blue
    description:
      'Principal Office, Student Section, Accounts, and Digital Knowledge Library holding 50,000+ technical volumes.',
    timing: '8:00 AM - 9:00 PM',
    floor: '1st & 2nd Floor',
    amenities: ['Digital Research Center', 'Silent Study Hall', 'Book Lending Station'],
  },
  {
    id: 'main_gate',
    name: 'PCCOE Main Entrance Gate (Sector 26)',
    category: 'Gate',
    lat: 18.6524,
    lng: 73.7629,
    color: '#a855f7', // Purple
    description:
      'Primary security gateway and campus entry on Pradhikaran Road with RFID student turnstiles.',
    timing: '6:00 AM - 10:00 PM',
    floor: 'Street Entry',
    amenities: ['Security Desk', 'Visitor Parking', 'Turnstile Gate'],
  },
  {
    id: 'bus_transit',
    name: 'PMPML College Bus Terminal',
    category: 'Transit',
    lat: 18.6527,
    lng: 73.76295,
    color: '#64748b', // Dark Slate
    description:
      'Public transport bus stop connecting Nigdi, Akurdi Station, Chinchwad, and Pune City center.',
    timing: '5:30 AM - 11:30 PM',
    floor: 'Main Road',
    amenities: ['Bus Shelter', 'Auto Rickshaw Stand'],
  },
  {
    id: 'mech_building',
    name: 'Mechanical & Civil Workshop Complex',
    category: 'Department',
    lat: 18.6514,
    lng: 73.7624,
    color: '#3b82f6', // Blue
    description:
      'CNC Machining Center, Fluid Dynamics Lab, Robotics workshop, and Formula Student fabrication bay.',
    timing: '8:00 AM - 6:00 PM',
    floor: 'Ground & 1st Floor',
    amenities: ['Industrial Lathes', '3D Printing Lab', 'Heavy Machinery'],
  },
];

export const MapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<CampusNode | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center coordinates for PCCOE Campus, Sector 26, Pradhikaran, Nigdi, Pune
    const centerLat = 18.6519;
    const centerLng = 73.7627;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 17.5,
      zoomControl: false,
      attributionControl: false,
      maxZoom: 19,
      minZoom: 16,
    });

    // CartoDB Positron high-resolution light street tiles
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 20,
      }
    ).addTo(map);

    // Zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Network connection lines between building nodes
    const connections: [number, number][][] = [
      [[18.6527, 73.76295], [18.6524, 73.7629]],
      [[18.6524, 73.7629], [18.6521, 73.7627]],
      [[18.6521, 73.7627], [18.65195, 73.76275]],
      [[18.65195, 73.76275], [18.65185, 73.7626]],
      [[18.65185, 73.7626], [18.6516, 73.76255]],
      [[18.6516, 73.76255], [18.6514, 73.7624]],
      [[18.6521, 73.7627], [18.65185, 73.7626]],
    ];

    connections.forEach((coords) => {
      L.polyline(coords, {
        color: '#3b82f6',
        weight: 2,
        opacity: 0.45,
        dashArray: '4, 6',
      }).addTo(map);
    });

    // Add interactive nodes and student avatar markers
    PCCOE_NODES.forEach((node) => {
      // Custom node HTML pin
      const iconHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <div style="width: 22px; height: 22px; border-radius: 9999px; background: ${node.color}; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center;">
            <div style="width: 6px; height: 6px; border-radius: 9999px; background: white;"></div>
          </div>
          ${
            node.studentsHere && node.studentsHere.length > 0
              ? `
            <div style="position: absolute; top: -14px; right: -16px; display: flex; align-items: center;">
              ${node.studentsHere
                .slice(0, 2)
                .map(
                  (s, i) => `
                <img src="${s.avatar}" style="width: 18px; height: 18px; border-radius: 9999px; border: 1.5px solid white; margin-left: ${
                    i > 0 ? '-6px' : '0'
                  }; box-shadow: 0 2px 6px rgba(0,0,0,0.3);" />
              `
                )
                .join('')}
            </div>
          `
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-campus-pin',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedSpot(node);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-4 animate-[fadeIn_0.2s_ease-out] text-[#e4e4e7] relative">
      {/* Header */}
      <div>
        <div className="relative inline-flex items-center">
          <h1 className="font-heading text-xl font-bold text-white tracking-tight">
            c/maps
          </h1>
          <img
            src="/assets/dark1.svg"
            alt=""
            className="absolute -top-3 left-[18px] w-6 h-6 pointer-events-none z-10"
          />
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          Interactive internal campus map for PCCOE.
        </p>
      </div>

      {/* Main Map Card */}
      <div className="relative rounded-[24px] overflow-hidden border border-white/[0.08] shadow-2xl bg-black min-h-[560px] h-[calc(100vh-210px)] w-full">
        {/* Leaflet Map Canvas */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Selected Spot Detail Floating Modal */}
        {selectedSpot && (
          <div className="absolute top-4 left-4 z-20 max-w-sm w-full bg-[#0e0e13]/95 backdrop-blur-md border border-white/[0.12] rounded-2xl p-5 shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${selectedSpot.color}20`,
                    color: selectedSpot.color,
                  }}
                >
                  {selectedSpot.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{selectedSpot.name}</h3>
                <div className="text-xs text-zinc-400 font-medium">{selectedSpot.floor}</div>
              </div>

              <button
                onClick={() => setSelectedSpot(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              {selectedSpot.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{selectedSpot.timing}</span>
            </div>

            {/* Amenities Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {selectedSpot.amenities.map((am) => (
                <span
                  key={am}
                  className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-zinc-300 font-medium"
                >
                  {am}
                </span>
              ))}
            </div>

            {/* Students Currently Here */}
            {selectedSpot.studentsHere && selectedSpot.studentsHere.length > 0 && (
              <div className="pt-2.5 border-t border-white/[0.06] mb-3">
                <div className="text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                  Checked-in Students:
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {selectedSpot.studentsHere.map((s, idx) => (
                      <img
                        key={idx}
                        src={s.avatar}
                        alt={s.name}
                        className="w-6 h-6 rounded-full ring-2 ring-[#0e0e13] object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400">
                    {selectedSpot.studentsHere.map((s) => s.name.split(' ')[0]).join(', ')}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => alert(`Navigating to ${selectedSpot.name}...`)}
              className="w-full py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-xs hover:bg-[#20c997] transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#2dd4bf]/20"
            >
              <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Navigate to Facility</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
