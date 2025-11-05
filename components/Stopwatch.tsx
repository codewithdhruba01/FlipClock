'use client';

import { useState, useEffect } from 'react';
import { Settings, Clock } from 'lucide-react';
import Link from 'next/link';
import FlipDigit from './FlipDigit';
import SettingsDialog from './SettingsDialog';

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedFormat = localStorage.getItem('timeFormat') as TimeFormat;
    const savedSize = localStorage.getItem('clockSize');

    if (savedTheme) setTheme(savedTheme);
    if (savedFormat) setTimeFormat(savedFormat);
    if (savedSize) setClockSize(Number(savedSize));
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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
          <div className="flex items-center justify-center gap-0">
            <div className="flex gap-1 sm:gap-2">
              <FlipDigit value={hours[0]} theme={theme} />
              <FlipDigit value={hours[1]} theme={theme} />
            </div>

            <div className="flex flex-col items-center justify-center mx-2 sm:mx-4">
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}
              />
              <div
                className={`w-1 h-6 sm:h-8 my-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}
              />
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}
              />
            </div>

            <div className="flex gap-1 sm:gap-2">
              <FlipDigit value={minutes[0]} theme={theme} />
              <FlipDigit value={minutes[1]} theme={theme} />
            </div>

            <div className="flex flex-col items-center justify-center mx-2 sm:mx-4">
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}
              />
              <div
                className={`w-1 h-6 sm:h-8 my-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}
              />
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`}
              />
            </div>

            <div className="flex gap-1 sm:gap-2">
              <FlipDigit value={seconds[0]} theme={theme} />
              <FlipDigit value={seconds[1]} theme={theme} />
            </div>
          </div>

          {/* Stopwatch Controls */}
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 ${
                isRunning
                  ? theme === 'dark'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  : theme === 'dark'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setElapsed(0);
              }}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 ${
          theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        } shadow-lg z-40`}
        aria-label="Settings"
      >
        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

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
        onOpenStopwatch={() => {}} // Not needed here, just to match type
      />
    </div>
  );
}
