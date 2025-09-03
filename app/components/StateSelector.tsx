'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { USMap } from './USMap';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

const states = [
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  { code: 'TX', name: 'Texas' },
  { code: 'FL', name: 'Florida' },
  { code: 'IL', name: 'Illinois' },
  // Add more states as needed
];

export function StateSelector({ selectedState, onStateChange }: StateSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode to get the state
          // For now, we'll just select California as an example
          onStateChange('CA');
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Select Your State</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocationRequest}
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Use Location
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2"
                >
                  {selectedState || 'Choose State'}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                {showDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border z-10 min-w-40">
                    {states.map(state => (
                      <button
                        key={state.code}
                        onClick={() => {
                          onStateChange(state.code);
                          setShowDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-surface transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {state.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <USMap selectedState={selectedState} onStateClick={onStateChange} />
        </Card>
      </div>

      {/* State Info Panel */}
      <div className="space-y-4">
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-4">State Specific Legal Insights</h3>
          
          {selectedState ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Auto-generated</span>
                <span className="px-2 py-1 bg-accent text-white text-xs rounded">
                  Recommended
                </span>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-2">Personalized Rights</h4>
                <p className="text-sm text-text-secondary">
                  Based on {states.find(s => s.code === selectedState)?.name} law
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Miranda Rights Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Right to Remain Silent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Right to Attorney</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-text-secondary text-sm">
              Select a state to see personalized legal information
            </p>
          )}
        </Card>

        <Card className="p-4">
          <h4 className="font-medium text-text-primary mb-2">Quick Stats</h4>
          <div className="text-2xl font-bold text-accent">$28,105</div>
          <p className="text-xs text-text-secondary">Total Legal Costs</p>
        </Card>
      </div>
    </div>
  );
}
