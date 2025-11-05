'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import FlipDigit from './FlipDigit';
import SettingsDialog from './SettingsDialog';
import StyledButton from './button/StyledButton';
import StyledSettingsButton from './button/StyledSettingsButton';

type TimeFormat = '12' | '24';
type Theme = 'light' | 'dark';

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12');
  const [clockSize, setClockSize] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Load saved settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedFormat = localStorage.getItem('timeFormat') as TimeFormat;
    const savedSize = localStorage.getItem('clockSize');
    if (savedTheme) setTheme(savedTheme);
    if (savedFormat) setTimeFormat(savedFormat);
    if (savedSize) setClockSize(Number(savedSize));
  }, []);

  // Fullscreen check
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleTimeFormatChange = (newFormat: TimeFormat) => {
    setTimeFormat(newFormat);
    localStorage.setItem('timeFormat', newFormat);
  };

  const handleClockSizeChange = (newSize: number) => {
    setClockSize(newSize);
    localStorage.setItem('clockSize', newSize.toString());
  };

  const getFormattedTime = () => {
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = getFormattedTime();

  return (
    <div
      className={`min-h-screen w-screen flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden ${
        theme === 'dark' ? 'bg-[#111111]' : 'bg-white'
      }`}
    >
      {/* Stopwatch Display */}
      <div className="w-full h-full flex items-center justify-center px-4 py-8">
        <div
          className="flex flex-col items-center gap-8 sm:gap-12 w-full"
          style={{
            transform: `scale(${clockSize / 100})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Time Digits */}
          <div className="flex items-center justify-center gap-0">
            <div className="flex gap-1 sm:gap-2">
              <FlipDigit value={hours[0]} theme={theme} />
              <FlipDigit value={hours[1]} theme={theme} />
            </div>

            <Colon theme={theme} />

            <div className="flex gap-1 sm:gap-2">
              <FlipDigit value={minutes[0]} theme={theme} />
              <FlipDigit value={minutes[1]} theme={theme} />
            </div>

            <Colon theme={theme} />

            <div className="flex gap-1 sm:gap-2">
              <FlipDigit value={seconds[0]} theme={theme} />
              <FlipDigit value={seconds[1]} theme={theme} />
            </div>
          </div>

          {/* Stopwatch Controls */}
          <div className="flex gap-4 sm:gap-6">
            <StyledButton
              $outline={theme === 'dark' ? '#000' : '#000'}
              $color={
                isRunning
                  ? theme === 'dark'
                    ? '#ff4d4d'
                    : '#ff6666'
                  : theme === 'dark'
                  ? '#00cc66'
                  : '#00e676'
              }
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop' : 'Start'}
            </StyledButton>

            <StyledButton
              $outline={theme === 'dark' ? '#000' : '#000'}
              $color={theme === 'dark' ? '#777' : '#ddd'}
              onClick={() => {
                setIsRunning(false);
                setElapsed(0);
              }}
            >
              Reset
            </StyledButton>
          </div>
        </div>
      </div>

      {/* Settings Button */}
      <StyledSettingsButton onClick={() => setSettingsOpen(true)} theme={theme} />

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        theme={theme}
        onThemeChange={handleThemeChange}
        timeFormat={timeFormat}
        onTimeFormatChange={handleTimeFormatChange}
        clockSize={clockSize}
        onClockSizeChange={handleClockSizeChange}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenStopwatch={() => {}}
      />
    </div>
  );
}

/* Small reusable component for colons (:) */
const Colon = ({ theme }: { theme: Theme }) => (
  <div className="flex flex-col items-center justify-center mx-2 sm:mx-4">
    <div
      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'
      }`}
    />
    <div
      className={`w-1 h-6 sm:h-8 my-1 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'
      }`}
    />
    <div
      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'
      }`}
    />
  </div>
);
