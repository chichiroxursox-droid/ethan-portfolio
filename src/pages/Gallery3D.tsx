import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Scene3D } from '@/components/3d/Scene3D';
import { Basketball } from '@/components/3d/Basketball';
import { PianoKeys } from '@/components/3d/PianoKeys';
import { Microphone } from '@/components/3d/Microphone';
import { Button } from '@/components/ui/button';
import { Music, Trophy, Mic } from 'lucide-react';
import { useSectionTheme } from '@/hooks/use-section-theme';

type ModelType = 'basketball' | 'piano' | 'microphone' | 'all';

const Gallery3D = () => {
  useSectionTheme();
  const [activeModel, setActiveModel] = useState<ModelType>('all');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 px-6 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            3D Gallery
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Explore interactive 3D models representing different aspects of my journey
          </p>

          {/* Model Selector */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <Button
              onClick={() => setActiveModel('all')}
              variant={activeModel === 'all' ? 'default' : 'outline'}
              className="gap-2"
            >
              All Models
            </Button>
            <Button
              onClick={() => setActiveModel('basketball')}
              variant={activeModel === 'basketball' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              Basketball
            </Button>
            <Button
              onClick={() => setActiveModel('piano')}
              variant={activeModel === 'piano' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Music className="w-4 h-4" />
              Piano
            </Button>
            <Button
              onClick={() => setActiveModel('microphone')}
              variant={activeModel === 'microphone' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Mic className="w-4 h-4" />
              Microphone
            </Button>
          </div>

          {/* 3D Scene */}
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xl">
            <div className="w-full h-[600px]">
              <Scene3D className="w-full h-full">
                {activeModel === 'all' && (
                  <>
                    <group position={[-3, 0, 0]}>
                      <Basketball />
                    </group>
                    <group position={[0, 0, 0]}>
                      <PianoKeys />
                    </group>
                    <group position={[3, 0, 0]} scale={0.8}>
                      <Microphone />
                    </group>
                  </>
                )}
                {activeModel === 'basketball' && <Basketball />}
                {activeModel === 'piano' && <PianoKeys />}
                {activeModel === 'microphone' && <Microphone />}
              </Scene3D>
            </div>

            {/* Model Info */}
            <div className="p-6 bg-muted/30">
              {activeModel === 'all' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">All Models</h3>
                  <p className="text-muted-foreground">
                    A collection of 3D models representing athletics, music, and activism. Click and drag to rotate, scroll to zoom.
                  </p>
                </div>
              )}
              {activeModel === 'basketball' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-athletics">Basketball</h3>
                  <p className="text-muted-foreground">
                    Representing my passion for athletics and teamwork. The basketball symbolizes dedication, improvement, and the joy of seeing hard work pay off on the court.
                  </p>
                </div>
              )}
              {activeModel === 'piano' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-music">Piano Keys</h3>
                  <p className="text-muted-foreground">
                    A representation of my musical journey. These keys have played pieces from Nuvole Bianche to the Interstellar theme, expressing creativity and emotion through music.
                  </p>
                </div>
              )}
              {activeModel === 'microphone' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-activism">Microphone</h3>
                  <p className="text-muted-foreground">
                    Symbolizing activism and voice. From speaking at the UN on gun violence to education protests, this microphone represents using privilege responsibly to create positive change.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h4 className="font-semibold mb-2">Interactive Controls</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Click and drag to rotate the models</li>
              <li>• Scroll to zoom in and out</li>
              <li>• Use the buttons above to switch between different models</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery3D;
