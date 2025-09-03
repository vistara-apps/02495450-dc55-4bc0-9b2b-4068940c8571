'use client';

interface USMapProps {
  selectedState: string;
  onStateClick: (state: string) => void;
}

export function USMap({ selectedState, onStateClick }: USMapProps) {
  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
      {/* Simplified US Map representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* California */}
          <path
            d="M 50 150 L 80 120 L 120 140 L 110 200 L 90 250 L 60 230 Z"
            fill={selectedState === 'CA' ? '#3B82F6' : '#93C5FD'}
            stroke="#1E40AF"
            strokeWidth="1"
            className="cursor-pointer hover:fill-blue-400 transition-colors"
            onClick={() => onStateClick('CA')}
          />
          
          {/* Texas */}
          <path
            d="M 250 200 L 350 190 L 360 250 L 320 300 L 270 290 L 240 260 Z"
            fill={selectedState === 'TX' ? '#3B82F6' : '#93C5FD'}
            stroke="#1E40AF"
            strokeWidth="1"
            className="cursor-pointer hover:fill-blue-400 transition-colors"
            onClick={() => onStateClick('TX')}
          />

          {/* Florida */}
          <path
            d="M 450 280 L 550 275 L 580 290 L 570 320 L 520 310 L 480 300 Z"
            fill={selectedState === 'FL' ? '#3B82F6' : '#93C5FD'}
            stroke="#1E40AF"
            strokeWidth="1"
            className="cursor-pointer hover:fill-blue-400 transition-colors"
            onClick={() => onStateClick('FL')}
          />

          {/* New York */}
          <path
            d="M 550 100 L 620 95 L 630 130 L 600 140 L 570 135 L 550 120 Z"
            fill={selectedState === 'NY' ? '#3B82F6' : '#93C5FD'}
            stroke="#1E40AF"
            strokeWidth="1"
            className="cursor-pointer hover:fill-blue-400 transition-colors"
            onClick={() => onStateClick('NY')}
          />

          {/* Illinois */}
          <path
            d="M 400 120 L 430 115 L 440 160 L 420 180 L 390 175 L 385 140 Z"
            fill={selectedState === 'IL' ? '#3B82F6' : '#93C5FD'}
            stroke="#1E40AF"
            strokeWidth="1"
            className="cursor-pointer hover:fill-blue-400 transition-colors"
            onClick={() => onStateClick('IL')}
          />
        </svg>
      </div>

      {/* Selected State Info */}
      {selectedState && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">
              {selectedState === 'CA' && 'California'}
              {selectedState === 'TX' && 'Texas'}
              {selectedState === 'FL' && 'Florida'}
              {selectedState === 'NY' && 'New York'}
              {selectedState === 'IL' && 'Illinois'}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Click to view details</p>
        </div>
      )}
    </div>
  );
}
