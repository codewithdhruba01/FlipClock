'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FlipDigit from './FlipDigit';
import SettingsDialog from './SettingsDialog';

type TimeFormat = '12' | '24';
type Theme = 'light' | 'dark';

export default function FlipClock() {
  const [time, setTime] = useState(new Date());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12');
  const [clockSize, setClockSize] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    if (timeFormat === '12') hours = hours % 12 || 12;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      period,
    };
  };

  const getFormattedDate = () => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(time);
  };

  const { hours, minutes, seconds, period } = getFormattedTime();
  const dateStr = getFormattedDate();

  return (
    <div
      className={`min-h-screen w-screen flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden ${
        theme === 'dark' ? 'bg-[#111111]' : 'bg-white'
      }`}
    >
      <div className="w-full h-full flex items-center justify-center px-4 py-8">
        <div
          className="flex flex-col items-center gap-4 sm:gap-6 w-full"
          style={{
            transform: `scale(${clockSize / 100})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Clock Digits */}
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

          {/* Period + Date Centered */}
          <div className="flex flex-col items-center mt-6">
            <div
              className={`text-2xl sm:text-3xl font-semibold tracking-wide ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {period}
            </div>
            <div
              className={`text-sm sm:text-base font-medium mt-2 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
              }`}
            >
              {dateStr}
            </div>
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
        onOpenStopwatch={() => router.push('/stopwatch')} // 👈 Added handler
      />
    </div>
  );
}
