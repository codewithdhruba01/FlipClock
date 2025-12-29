# FlipClock - Aesthetic Digital Clock

![Banner](public/flipclock-cover.png)

A beautiful, minimal digital clock web application built with Next.js that helps you focus and relax with its aesthetic flip animation design.

## Features

### Clock Page
- **Real-time Clock Display**: Shows current time with smooth updates every second
- **Live Date**: Current date displayed in bottom-right corner
- **Flip Animation**: Beautiful flip card animation when digits change, mimicking a physical flip clock
- **Fully Responsive**: Works seamlessly across all devices (mobile, tablet, desktop)
- **Navigation**: Quick access to Stopwatch page with Watch icon

### Stopwatch Page
- **Precise Time Tracking**: Tracks time with seconds precision
- **Start/Stop Controls**: Easy button to start and pause stopwatch
- **Reset Function**: Reset timer back to 00:00:00
- **Same UI Design**: Matches clock page aesthetic with flip animation digits
- **Navigation**: Quick access back to Clock page

### Customization Options (Available on Both Pages)
Access all settings by clicking the settings icon at the right corner:

#### 3. Alarm System
- **Smart Alarm**: Set custom alarm times with multiple tone options
- **Audio Tones**: Choose from 4 different alarm sounds (Default, Gentle, Classic, Digital)
- **Auto-Stop**: Alarm automatically stops after 30 seconds
- **Manual Control**: Stop alarm anytime with dismiss option
- **Persistent Settings**: Alarm preferences saved locally
- **Visual Indicator**: Shows active alarm time above clock
- **Theme Aware**: Alarm modal adapts to dark/light theme

#### 4. Clock Size Control
- **Zoom In/Out**: Scale the clock from 30% to 250%
- Use slider for precise control or quick buttons for 10% increments
- Perfect for different screen sizes and viewing distances
- Size preference is saved locally

#### 5. Fullscreen Mode
- **Enter/Exit Fullscreen**: Maximize the clock to fill your entire screen
- Ideal for using as a screensaver or presentation timer
- Toggle easily from the settings panel

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Audio**: Web Audio API + WAV files for alarm system
- **Storage**: Browser LocalStorage for preferences

## Project Structure

```
flipclock/
├── app/
│   ├── page.tsx                # Clock page
│   ├── stopwatch/
│   │   └── page.tsx            # Stopwatch page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── FlipClock.tsx           # Clock page component
│   ├── Stopwatch.tsx           # Stopwatch page component
│   ├── FlipDigit.tsx           # Flip digit animation component
│   ├── SettingsDialog.tsx      # Settings panel (shared)
│   └── ui/                     # shadcn/ui components
├── public/
│   ├── alarms/                 # Alarm audio files
│   │   ├── default.wav         # Default alarm tone
│   │   ├── gentle.wav          # Gentle alarm tone
│   │   ├── classic.wav         # Classic alarm tone
│   │   └── digital.wav         # Digital alarm tone
│   └── flipclock-cover.png     # Project banner
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/codewithdhruba01/FlipClock.git
cd flipclock
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser


## Build for Production

```bash
npm run build
npm run start
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">
   
⭐ If you find this project useful, please give it a star!

**Built with ❤️ by Dhrubaraj Pati for developers**

[Website](https://codewithdhruba.vercel.app/) • [GitHub](https://github.com/codewithdhruba01) • [Twitter](https://x.com/codewithdhruba)

</div>
