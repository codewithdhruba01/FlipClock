'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings, AlarmClock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FlipDigit from './FlipDigit';
import SettingsDialog from './SettingsDialog';
import StyledSettingsButton from './button/StyledSettingsButton';
import { Button } from './button/button';

type TimeFormat = '12' | '24';
type Theme = 'light' | 'dark';
type AlarmTone = 'default' | 'gentle' | 'classic' | 'digital';

export default function FlipClock() {
  const [time, setTime] = useState(new Date());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12');
  const [clockSize, setClockSize] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmTime, setAlarmTime] = useState('07:00');
  const [alarmTone, setAlarmTone] = useState<AlarmTone>('default');
  const [alarmRinging, setAlarmRinging] = useState(false);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentAlarmAudioRef = useRef<HTMLAudioElement | null>(null);
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
    const savedAlarmEnabled = localStorage.getItem('alarmEnabled');
    const savedAlarmTime = localStorage.getItem('alarmTime');
    const savedAlarmTone = localStorage.getItem('alarmTone') as AlarmTone;
    if (savedTheme) setTheme(savedTheme);
    if (savedFormat) setTimeFormat(savedFormat);
    if (savedSize) setClockSize(Number(savedSize));
    if (savedAlarmEnabled) setAlarmEnabled(savedAlarmEnabled === 'true');
    if (savedAlarmTime) setAlarmTime(savedAlarmTime);
    if (savedAlarmTone) setAlarmTone(savedAlarmTone);

  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Alarm checking logic - runs every second
  useEffect(() => {
    if (!alarmEnabled) return;

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // Compare in the same format as the clock displays
    let displayHours = currentHours;
    if (timeFormat === '12') {
      displayHours = displayHours % 12 || 12;
    }

    const currentTime = `${displayHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
    const isAlarmTime = currentTime === alarmTime;

    if (isAlarmTime && !alarmRinging) {
      setAlarmRinging(true);
      playAlarmSound();
    }
  }, [time, alarmEnabled, alarmTime, alarmRinging, timeFormat]); // Include 'time' to run every second

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

  const handleAlarmEnabledChange = (enabled: boolean) => {
    setAlarmEnabled(enabled);
    localStorage.setItem('alarmEnabled', enabled.toString());
  };

  const handleAlarmTimeChange = (time: string) => {
    setAlarmTime(time);
    localStorage.setItem('alarmTime', time);
  };

  const handleAlarmToneChange = (tone: AlarmTone) => {
    setAlarmTone(tone);
    localStorage.setItem('alarmTone', tone);
  };

  const playAlarmSound = async () => {
    try {
      // First try to play the actual audio file
      const audioFile = `/alarms/${alarmTone}.wav`;

      const audio = new Audio(audioFile);
      currentAlarmAudioRef.current = audio;
      audio.volume = 0.7; // Set volume to 70%
      audio.loop = true; // Loop the alarm sound

      // Set up event listeners
      audio.addEventListener('canplaythrough', async () => {
        try {
          await audio.play();

          // Auto-stop after 30 seconds
          (window as any).alarmTimeoutId = setTimeout(() => {
            if (alarmRinging) {
              stopAlarm();
            }
          }, 30000);

        } catch (playError) {
          console.error('Audio play failed, using fallback');
          playFallbackBeeps();
        }
      });

      audio.addEventListener('error', () => {
        console.error('Audio file failed to load, using fallback');
        playFallbackBeeps();
      });

      // Start loading the audio
      audio.load();

    } catch (error) {
      console.error('❌ Audio setup failed, using fallback:', error);
      playFallbackBeeps();
    }
  };

  const playFallbackBeeps = () => {
    try {
      // Create a simple beep sound using Web Audio API
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.error('Web Audio API not supported');
        return;
      }

      const audioContext = new AudioContextClass();

      // Resume audio context if suspended (required by some browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          playFallbackBeepsWithContext(audioContext);
        });
      } else {
        playFallbackBeepsWithContext(audioContext);
      }
    } catch (error) {
      console.error('Fallback audio failed:', error);
    }
  };

  const playFallbackBeepsWithContext = (audioContext: AudioContext) => {

      // Different frequencies for different tones
      const frequencies = {
        default: 800,
        gentle: 600,
        classic: 1000,
        digital: 1200,
      };

      let beepCount = 0;
      const maxBeeps = Math.ceil(30 / 2); // 30 seconds with 2-second intervals

      const playBeep = () => {
        if (!alarmRinging || beepCount >= maxBeeps) {
          // Auto-stop alarm after 30 seconds
          stopAlarm();
          return;
        }

        try {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(frequencies[alarmTone], audioContext.currentTime);
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);

          beepCount++;
          setTimeout(playBeep, 2000); // Play next beep after 2 seconds
        } catch (error) {
          console.error('Error playing beep:', error);
          stopAlarm();
        }
      };

      // Start the alarm sequence
      playBeep();

      // Auto-stop after exactly 30 seconds as backup
      (window as any).alarmTimeoutId = setTimeout(() => {
        if (alarmRinging) {
          stopAlarm();
        }
      }, 30000);
  };

  const stopAlarm = () => {
    setAlarmRinging(false);

    // Stop the main audio element (fallback)
    if (alarmAudioRef.current) {
      alarmAudioRef.current.pause();
      alarmAudioRef.current.currentTime = 0;
    }

    // Stop the current alarm audio (real audio files)
    if (currentAlarmAudioRef.current) {
      try {
        currentAlarmAudioRef.current.volume = 0; // Immediately mute
        currentAlarmAudioRef.current.pause();
        currentAlarmAudioRef.current.currentTime = 0;
        currentAlarmAudioRef.current = null;
      } catch (error) {
        console.error('Error stopping alarm audio:', error);
      }
    }

    // Clear any pending timeouts/intervals
    if ((window as any).alarmIntervalId) {
      clearInterval((window as any).alarmIntervalId);
      (window as any).alarmIntervalId = null;
    }
    if ((window as any).alarmTimeoutId) {
      clearTimeout((window as any).alarmTimeoutId);
      (window as any).alarmTimeoutId = null;
    }
  };

  const getFormattedTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    if (timeFormat === '12') hours = hours % 12 || 12;
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
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

  const timeData = getFormattedTime();
  const { hours, minutes, period } = timeData;
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
            transform: `scale(${Math.max(0.3, Math.min(2.5, clockSize / 100))})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease',
          }}
        >
          {/* Alarm Display */}
          {alarmEnabled && (
            <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2">
              <AlarmClock className={`w-5 h-5 sm:w-6 sm:h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <div
                className={`text-sm sm:text-base font-medium transition-colors duration-500 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Alarm: {alarmTime}
              </div>
            </div>
          )}

          {/* Clock Digits */}
          <div className="flex items-center justify-center gap-0">
            <div className="flex gap-1 sm:gap-3">
              <FlipDigit value={hours[0]} theme={theme} />
              <FlipDigit value={hours[1]} theme={theme} />
            </div>

            <div className="flex flex-col items-center justify-center mx-2 sm:mx-4">
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'} animate-pulse`}
                style={{ animationDuration: '1s' }}
              />
              <div className={`h-8 sm:h-10 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'}`} />
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400'} animate-pulse`}
                style={{ animationDuration: '1s' }}
              />
            </div>

            <div className="flex gap-1 sm:gap-3">
              <FlipDigit value={minutes[0]} theme={theme} />
              <FlipDigit value={minutes[1]} theme={theme} />
            </div>
          </div>

          {/* Period + Date Centered */}
          <div className="flex flex-col items-center mt-3 sm:mt-2">
            <div
              className={`text-2xl sm:text-3xl font-bold tracking-wide transition-colors duration-500 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {period}
            </div>
            <div
              className={`text-sm sm:text-base font-sans font-bold mt-1 sm:mt-1 transition-colors duration-500 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              {dateStr}
            </div>
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
        onOpenStopwatch={() => router.push('/stopwatch')}
        alarmEnabled={alarmEnabled}
        onAlarmEnabledChange={handleAlarmEnabledChange}
        alarmTime={alarmTime}
        onAlarmTimeChange={handleAlarmTimeChange}
        alarmTone={alarmTone}
        onAlarmToneChange={handleAlarmToneChange}
      />

      {/* Alarm Notification */}
      {alarmRinging && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className={`rounded-2xl shadow-2xl max-w-sm mx-4 border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          }`}>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Alarm Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'
              }`}>
                <AlarmClock className="w-8 h-8 text-red-500" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">
                Alarm
              </h2>

              {/* Time */}
              <div className={`inline-block px-6 py-3 rounded-xl mb-6 font-mono text-2xl font-bold ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
                {alarmTime}
              </div>

              {/* Auto-stop message */}
              <p className={`text-sm mb-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Will stop automatically in 30 seconds
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={stopAlarm}
                  className={`flex-1 font-medium py-3 px-6 rounded-xl transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  size="lg"
                >
                  Stop Now
                </Button>
                <Button
                  onClick={stopAlarm}
                  className={`flex-1 font-medium py-3 px-6 rounded-xl border-2 transition-all duration-200 ${
                    theme === 'dark'
                      ? 'border-gray-600 hover:bg-gray-800 bg-transparent text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700 bg-transparent'
                  }`}
                  size="lg"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alarm Audio */}
      <audio
        ref={alarmAudioRef}
        loop
        preload="none"
      >
        {/* Placeholder - user will add actual alarm tone files */}
        <source src={`/alarms/${alarmTone}.mp3`} type="audio/mpeg" />
        <source src={`/alarms/${alarmTone}.wav`} type="audio/wav" />
      </audio>
    </div>
  );
}
