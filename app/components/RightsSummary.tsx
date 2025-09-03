'use client';

import { Shield, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface RightsSummaryProps {
  selectedState: string;
}

export function RightsSummary({ selectedState }: RightsSummaryProps) {
  if (!selectedState) {
    return (
      <Card className="p-8 text-center">
        <Shield className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Select a state to view your rights
        </h3>
        <p className="text-text-secondary">
          Choose your state from the map or dropdown to get personalized legal information.
        </p>
      </Card>
    );
  }

  const stateData = {
    CA: { name: 'California', color: 'blue' },
    TX: { name: 'Texas', color: 'red' },
    FL: { name: 'Florida', color: 'orange' },
    NY: { name: 'New York', color: 'purple' },
    IL: { name: 'Illinois', color: 'green' }
  };

  const currentState = stateData[selectedState as keyof typeof stateData] || { name: selectedState, color: 'blue' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Your Rights in {currentState.name}
            </h2>
            <p className="text-text-secondary">
              Know your legal protections during police interactions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Print Guide
            </Button>
            <Button size="sm">
              Share
            </Button>
          </div>
        </div>
      </Card>

      {/* Core Rights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">Right to Remain Silent</h3>
              <p className="text-sm text-text-secondary mb-3">
                You have the right to remain silent and not answer questions beyond providing basic identification.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong className="text-green-600">DO:</strong> Say "I am exercising my right to remain silent"
                </div>
                <div className="text-sm">
                  <strong className="text-red-600">DON'T:</strong> Volunteer information or try to explain
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">Right to an Attorney</h3>
              <p className="text-sm text-text-secondary mb-3">
                You have the right to have an attorney present during any questioning.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong className="text-green-600">DO:</strong> Ask for a lawyer immediately
                </div>
                <div className="text-sm">
                  <strong className="text-red-600">DON'T:</strong> Answer questions without an attorney
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">Search & Seizure Protection</h3>
              <p className="text-sm text-text-secondary mb-3">
                Police need probable cause or a warrant to search you or your property.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong className="text-green-600">DO:</strong> Say "I do not consent to any searches"
                </div>
                <div className="text-sm">
                  <strong className="text-red-600">DON'T:</strong> Physically resist, but clearly state your refusal
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Info className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">Right to Record</h3>
              <p className="text-sm text-text-secondary mb-3">
                You have the right to record police interactions in public spaces.
              </p>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong className="text-green-600">DO:</strong> Keep recording visible and announce you're recording
                </div>
                <div className="text-sm">
                  <strong className="text-red-600">DON'T:</strong> Interfere with police duties while recording
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Reference */}
      <Card className="p-6">
        <h3 className="font-semibold text-text-primary mb-4">Quick Reference - What to Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">If Stopped</h4>
            <p className="text-sm text-green-700">
              "I am exercising my right to remain silent. I want to speak to a lawyer."
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">If Asked to Search</h4>
            <p className="text-sm text-blue-700">
              "I do not consent to any searches. I am exercising my Fourth Amendment rights."
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">If Recording</h4>
            <p className="text-sm text-purple-700">
              "I am recording this interaction for my safety and yours."
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">If Detained</h4>
            <p className="text-sm text-yellow-700">
              "Am I free to go? If not, I am being detained against my will."
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
