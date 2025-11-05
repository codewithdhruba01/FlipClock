'use client';

import { Moon, Sun, Clock, ZoomIn, ZoomOut, Maximize2, Minimize2, Timer } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

type TimeFormat = '12' | '24';
type Theme = 'light' | 'dark';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  timeFormat: TimeFormat;
  onTimeFormatChange: (format: TimeFormat) => void;
  clockSize: number;
  onClockSizeChange: (size: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenStopwatch?: () => void; // optional for compatibility
}

export default function SettingsDialog({
  open,
  onOpenChange,
  theme,
  onThemeChange,
  timeFormat,
  onTimeFormatChange,
  clockSize,
  onClockSizeChange,
  isFullscreen,
  onToggleFullscreen,
}: SettingsDialogProps) {
  const router = useRouter();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 🔁 View Mode (Time / Stopwatch) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>View Mode</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentPath === '/' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => router.push('/')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Time
              </Button>
              <Button
                variant={currentPath === '/stopwatch' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => router.push('/stopwatch')}
              >
                <Timer className="w-4 h-4 mr-2" />
                Stopwatch
              </Button>
            </div>
          </div>

          <Separator />

          {/* 🌗 Theme */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Moon className="w-4 h-4" />
              <span>Theme</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => onThemeChange('light')}
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => onThemeChange('dark')}
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </Button>
            </div>
          </div>

          <Separator />

          {/* 🕒 Time Format */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>Time Format</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={timeFormat === '12' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => onTimeFormatChange('12')}
              >
                12 Hour
              </Button>
              <Button
                variant={timeFormat === '24' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => onTimeFormatChange('24')}
              >
                24 Hour
              </Button>
            </div>
          </div>

          <Separator />

          {/* 🔍 Clock Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ZoomIn className="w-4 h-4" />
                <span>Clock Size</span>
              </div>
              <span className="text-sm text-muted-foreground">{clockSize}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onClockSizeChange(Math.max(50, clockSize - 10))}
                disabled={clockSize <= 50}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Slider
                value={[clockSize]}
                onValueChange={([value]) => onClockSizeChange(value)}
                min={50}
                max={150}
                step={10}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => onClockSizeChange(Math.min(150, clockSize + 10))}
                disabled={clockSize >= 150}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* 🖥️ Fullscreen */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Maximize2 className="w-4 h-4" />
              <span>Display</span>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Enter Fullscreen
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
