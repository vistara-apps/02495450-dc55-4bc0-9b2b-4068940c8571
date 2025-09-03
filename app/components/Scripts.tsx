'use client';

import { useState } from 'react';
import { Copy, Volume2, Languages, FileText } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SegmentedControl } from './ui/SegmentedControl';

interface ScriptsProps {
  selectedState: string;
}

export function Scripts({ selectedState }: ScriptsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedScenario, setSelectedScenario] = useState('traffic_stop');

  const scenarios = [
    { id: 'traffic_stop', name: 'Traffic Stop' },
    { id: 'public_space', name: 'Public Space' },
    { id: 'home_visit', name: 'Home Visit' },
    { id: 'arrest', name: 'During Arrest' }
  ];

  const scripts = {
    en: {
      traffic_stop: {
        title: "Traffic Stop Script",
        scripts: [
          {
            situation: "Initial Contact",
            text: "Officer, I am exercising my right to remain silent. I do not consent to any searches of my person, belongings, or vehicle. Am I free to go?"
          },
          {
            situation: "If Asked Questions",
            text: "I respectfully invoke my Fifth Amendment right to remain silent. I would like to speak with an attorney before answering any questions."
          },
          {
            situation: "If Asked to Step Out",
            text: "I am complying with your order under protest. I do not consent to any searches. I am recording this interaction."
          }
        ]
      },
      public_space: {
        title: "Public Space Interaction",
        scripts: [
          {
            situation: "Being Approached",
            text: "Am I being detained or am I free to go? I am exercising my right to remain silent and do not wish to answer questions."
          },
          {
            situation: "Request for ID",
            text: "Am I required to provide identification? I am exercising my Fourth and Fifth Amendment rights."
          }
        ]
      }
    },
    es: {
      traffic_stop: {
        title: "Guión para Parada de Tráfico",
        scripts: [
          {
            situation: "Contacto Inicial",
            text: "Oficial, estoy ejerciendo mi derecho a permanecer en silencio. No consiento a ningún registro de mi persona, pertenencias o vehículo. ¿Soy libre de irme?"
          },
          {
            situation: "Si Me Hacen Preguntas",
            text: "Respetuosamente invoco mi derecho de la Quinta Enmienda a permanecer en silencio. Me gustaría hablar con un abogado antes de responder cualquier pregunta."
          }
        ]
      },
      public_space: {
        title: "Interacción en Espacio Público",
        scripts: [
          {
            situation: "Siendo Abordado",
            text: "¿Estoy siendo detenido o soy libre de irme? Estoy ejerciendo mi derecho a permanecer en silencio y no deseo responder preguntas."
          }
        ]
      }
    }
  };

  const currentScripts = scripts[selectedLanguage as keyof typeof scripts]?.[selectedScenario as keyof typeof scripts.en] || scripts.en.traffic_stop;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const readAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'es' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Legal Communication Scripts
            </h2>
            <p className="text-text-secondary">
              Pre-written phrases to help you communicate clearly during police interactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-text-secondary" />
            <SegmentedControl
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' }
              ]}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
            />
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="flex flex-wrap gap-2">
          {scenarios.map(scenario => (
            <Button
              key={scenario.id}
              variant={selectedScenario === scenario.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedScenario(scenario.id)}
            >
              {scenario.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Scripts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {currentScripts.title}
        </h3>
        
        {currentScripts.scripts.map((script, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-text-primary">{script.situation}</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(script.text)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => readAloud(script.text)}
                  className="flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  Read
                </Button>
              </div>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <p className="text-text-primary leading-relaxed">"{script.text}"</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-2">Using Scripts Effectively</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Speak clearly and calmly</li>
              <li>• Don't argue or become confrontational</li>
              <li>• Repeat your rights statements if necessary</li>
              <li>• Remember that anything you say can be used against you</li>
              <li>• Stay focused on asserting your rights, not explaining your situation</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
