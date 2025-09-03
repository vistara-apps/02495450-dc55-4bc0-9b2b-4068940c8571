'use client';

import { useState, useRef } from 'react';
import { Video, Square, Users, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export function Recording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        // Here you would upload to your storage service (Pinata/IPFS)
        console.log('Recording saved:', blob);
        setHasRecorded(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Optional: Send alert to trusted contacts
      // sendAlert();

    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Unable to access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendAlert = () => {
    // In a real app, this would send location and alert to trusted contacts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Alert sent with location:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toISOString()
          });
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Incident Recording & Alerts
        </h2>
        <p className="text-text-secondary">
          Document interactions and alert trusted contacts for your safety
        </p>
      </Card>

      {/* Recording Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {isRecording ? (
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Square className="w-8 h-8 text-red-600" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {isRecording ? 'Recording Active' : 'Quick Record'}
            </h3>
            
            {isRecording && (
              <div className="text-2xl font-mono text-red-600 mb-4">
                {formatTime(recordingTime)}
              </div>
            )}
            
            <p className="text-sm text-text-secondary mb-6">
              {isRecording 
                ? 'Tap to stop recording and save to secure storage'
                : 'One-tap to start recording audio and video'
              }
            </p>
          </div>

          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? 'danger' : 'primary'}
            size="lg"
            className="w-full"
          >
            {isRecording ? (
              <>
                <Square className="w-5 h-5 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Video className="w-5 h-5 mr-2" />
                Start Recording
              </>
            )}
          </Button>
        </Card>

        {/* Alert System */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-2">Emergency Alert System</h3>
              <p className="text-sm text-text-secondary">
                Automatically notify trusted contacts when recording starts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-sm">2 trusted contacts configured</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <MapPin className="w-4 h-4 text-text-secondary" />
              <span className="text-sm">Location sharing enabled</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-sm">Real-time updates</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={sendAlert}
          >
            Send Manual Alert
          </Button>
        </Card>
      </div>

      {/* Recording History */}
      {hasRecorded && (
        <Card className="p-6">
          <h3 className="font-semibold text-text-primary mb-4">Recent Recordings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Recording from {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Duration: {formatTime(recordingTime)} • Size: 2.3 MB
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Legal Notice */}
      <Card className="p-6 bg-blue-50">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Recording Rights Notice</h3>
            <p className="text-sm text-blue-700 mb-2">
              You have the right to record police interactions in public spaces. However:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Do not interfere with police duties while recording</li>
              <li>• Keep your device visible and announce you are recording</li>
              <li>• Some states require two-party consent for audio recording</li>
              <li>• Recordings may be subject to legal discovery in court proceedings</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
