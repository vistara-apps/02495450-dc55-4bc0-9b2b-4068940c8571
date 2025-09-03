'use client';

import { Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function Hero() {
  return (
    <div className="text-center text-white mb-12">
      <h1 className="text-4xl font-bold mb-4">
        Zara Rights Companion
      </h1>
      <p className="text-lg text-white/80 mb-2">
        Clear answers your loved ones need today.
      </p>
      <p className="text-white/60 mb-8">
        Get instant clarity about your rights and know exactly what to say to ensure your safety. Knowledge is power. Protect yourself.
      </p>

      <div className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Input 
            placeholder="Search text/scripts..." 
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-white">
          Search
        </Button>
      </div>
    </div>
  );
}
