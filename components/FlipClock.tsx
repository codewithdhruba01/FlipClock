'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
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
    let period = '';

    if (timeFormat === '12') {
      period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      period,
    };
  };

  const { hours, minutes, seconds, period } = getFormattedTime();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-100'
      }`}
    >
      <div
        className="flex flex-col items-center gap-8 sm:gap-12"
        style={{
          transform: `scale(${clockSize / 100})`,
          transformOrigin: 'center',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <div className="flex gap-1 sm:gap-2">
            <FlipDigit value={hours[0]} theme={theme} />
            <FlipDigit value={hours[1]} theme={theme} />
          </div>

          <div className={`text-4xl sm:text-6xl md:text-8xl font-bold ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          } mb-8 sm:mb-12`}>
            :
          </div>

          <div className="flex gap-1 sm:gap-2">
            <FlipDigit value={minutes[0]} theme={theme} />
            <FlipDigit value={minutes[1]} theme={theme} />
          </div>

          <div className={`text-4xl sm:text-6xl md:text-8xl font-bold ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          } mb-8 sm:mb-12`}>
            :
          </div>

          <div className="flex gap-1 sm:gap-2">
            <FlipDigit value={seconds[0]} theme={theme} />
            <FlipDigit value={seconds[1]} theme={theme} />
          </div>
        </div>

        {timeFormat === '12' && (
          <div
            className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
            }`}
          >
            {period}
          </div>
        )}
      </div>

      <button
        onClick={() => setSettingsOpen(true)}
        className={`fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 hover:scale-110 ${
          theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            : 'bg-white hover:bg-gray-200 text-gray-700'
        } shadow-lg`}
        aria-label="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

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
      />
    </div>
  );
}
