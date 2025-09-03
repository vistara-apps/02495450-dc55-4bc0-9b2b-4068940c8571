'use client';

import { AppShell } from './components/AppShell';
import { Hero } from './components/Hero';
import { StateSelector } from './components/StateSelector';
import { RightsSummary } from './components/RightsSummary';
import { Scripts } from './components/Scripts';
import { Recording } from './components/Recording';
import { useState } from 'react';

export default function Home() {
  const [selectedState, setSelectedState] = useState('');
  const [activeTab, setActiveTab] = useState('rights');

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-8">
        <Hero />
        
        <StateSelector 
          selectedState={selectedState} 
          onStateChange={setSelectedState} 
        />

        {activeTab === 'rights' && (
          <RightsSummary selectedState={selectedState} />
        )}

        {activeTab === 'scripts' && (
          <Scripts selectedState={selectedState} />
        )}

        {activeTab === 'recording' && (
          <Recording />
        )}
      </div>
    </AppShell>
  );
}
