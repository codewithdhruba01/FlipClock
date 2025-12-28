'use client';

import { Moon, Sun, Clock, ZoomIn, ZoomOut, Maximize2, Minimize2, Timer, AlarmClock, Volume2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/button/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

type TimeFormat = '12' | '24';
type Theme = 'light' | 'dark';
type AlarmTone = 'default' | 'gentle' | 'classic' | 'digital';

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
  onOpenStopwatch?: () => void;
  alarmEnabled: boolean;
  onAlarmEnabledChange: (enabled: boolean) => void;
  alarmTime: string;
  onAlarmTimeChange: (time: string) => void;
  alarmTone: AlarmTone;
  onAlarmToneChange: (tone: AlarmTone) => void;
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
  alarmEnabled,
  onAlarmEnabledChange,
  alarmTime,
  onAlarmTimeChange,
  alarmTone,
  onAlarmToneChange,
}: SettingsDialogProps) {
  const router = useRouter();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm transition-all duration-300 ease-out data-[state=closed]:duration-200 data-[state=closed]:ease-in">
        <DialogHeader className="pb-2 transition-all duration-300 delay-100 data-[state=closed]:delay-0 data-[state=closed]:duration-200">
          <DialogTitle className="text-lg font-bold transition-all duration-300 data-[state=closed]:duration-200">Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 transition-all duration-300 delay-200 data-[state=closed]:delay-0 data-[state=closed]:duration-200">
          {/*View Mode (Time / Stopwatch) */}
          <div className="space-y-1.5 transition-all duration-300 delay-300 data-[state=closed]:delay-100 data-[state=closed]:duration-200">
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

          {/* Alarm Settings */}
          <div className="space-y-2 transition-all duration-300 delay-[800ms] data-[state=closed]:delay-0 data-[state=closed]:duration-200">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlarmClock className="w-4 h-4" />
              <span>Alarm</span>
            </div>

            {/* Alarm Enabled Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Alarm</span>
              <Switch
                checked={alarmEnabled}
                onCheckedChange={onAlarmEnabledChange}
              />
            </div>

            {alarmEnabled && (
              <>
                {/* Alarm Time */}
                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground">Alarm Time</label>
                  <Input
                    type="time"
                    value={alarmTime}
                    onChange={(e) => onAlarmTimeChange(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Alarm Tone */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4" />
                    <span>Alarm Tone</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'default' as AlarmTone, label: 'Default' },
                      { value: 'gentle' as AlarmTone, label: 'Gentle' },
                      { value: 'classic' as AlarmTone, label: 'Classic' },
                      { value: 'digital' as AlarmTone, label: 'Digital' },
                    ].map((tone) => (
                      <Button
                        key={tone.value}
                        variant={alarmTone === tone.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onAlarmToneChange(tone.value)}
                      >
                        {tone.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Separator />

          {/* Theme */}
          <div className="space-y-1.5 transition-all duration-300 delay-[400ms] data-[state=closed]:delay-75 data-[state=closed]:duration-200">
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

          {/* Time Format */}
          <div className="space-y-1.5 transition-all duration-300 delay-[500ms] data-[state=closed]:delay-50 data-[state=closed]:duration-200">
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

          {/* Clock Size */}
          <div className="space-y-1.5 transition-all duration-300 delay-[600ms] data-[state=closed]:delay-25 data-[state=closed]:duration-200">
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
                onClick={() => onClockSizeChange(Math.max(30, clockSize - 10))}
                disabled={clockSize <= 30}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Slider
                value={[clockSize]}
                onValueChange={([value]) => onClockSizeChange(value)}
                min={30}
                max={250}
                step={10}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => onClockSizeChange(Math.min(250, clockSize + 10))}
                disabled={clockSize >= 250}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Fullscreen */}
          <div className="space-y-1.5 transition-all duration-300 delay-[700ms] data-[state=closed]:delay-10 data-[state=closed]:duration-200">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Maximize2 className="w-4 h-4" />
              <span>Display</span>
            </div>
            <Button variant="outline" className="w-full" onClick={onToggleFullscreen}>
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
