# FlipClock - Aesthetic Digital Clock

A beautiful, minimal digital clock web application built with Next.js that helps you focus and relax with its aesthetic flip animation design.

## Features

### Core Functionality
- **Real-time Clock Display**: Shows current time with smooth updates every second
- **Flip Animation**: Beautiful flip card animation when digits change, mimicking a physical flip clock
- **Fully Responsive**: Works seamlessly across all devices (mobile, tablet, desktop)

### Customization Options
Access all settings by clicking the settings icon at the bottom-right corner:

#### 1. Theme Selection
- **Light Mode**: Clean, bright interface for daytime use
- **Dark Mode**: Eye-friendly dark interface for nighttime use
- Theme preference is saved locally and persists across sessions

#### 2. Time Format
- **12-Hour Format**: Traditional AM/PM display
- **24-Hour Format**: Military/international time format
- Format preference is saved locally

#### 3. Clock Size Control
- **Zoom In/Out**: Scale the clock from 50% to 150%
- Use slider for precise control or quick buttons for 10% increments
- Perfect for different screen sizes and viewing distances
- Size preference is saved locally

#### 4. Fullscreen Mode
- **Enter/Exit Fullscreen**: Maximize the clock to fill your entire screen
- Ideal for using as a screensaver or presentation timer
- Toggle easily from the settings panel

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

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

## Project Structure

```
flipclock/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── FlipClock.tsx     # Main clock component with state management
│   ├── FlipDigit.tsx     # Individual flip digit with animation
│   └── SettingsDialog.tsx # Settings panel component
└── README.md
```

## Component Details

### FlipClock Component
- Manages clock state and time updates
- Handles all user preferences (theme, format, size)
- Coordinates fullscreen functionality
- Persists settings to localStorage

### FlipDigit Component
- Renders individual digit with flip animation
- Animates when digit value changes
- Responsive sizing across breakpoints
- Theme-aware styling

### SettingsDialog Component
- Provides intuitive settings interface
- All controls in one place
- Immediate visual feedback
- Clean, organized layout

## Key Features Implementation

### Flip Animation
The flip animation uses CSS transforms and transitions to create a realistic flip effect when digits change. The animation:
- Rotates the digit card in 3D space
- Completes in 600ms for smooth visual experience
- Triggers only when the digit value changes

## Customization

### Changing Colors
Edit the color values in `FlipDigit.tsx` and `FlipClock.tsx` to customize the theme colors.

### Adjusting Animation Speed
Modify the `duration` values in the flip animation CSS to change the speed.

### Adding New Features
The modular component structure makes it easy to add new features:
- Add new settings in `SettingsDialog.tsx`
- Implement logic in `FlipClock.tsx`
- Store preferences in localStorage

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
   
⭐ If you find this project useful, please give it a star!

**Built with ❤️ by Dhrubaraj Pati for developers**

[Website](https://codewithdhruba.vercel.app/) • [GitHub](https://github.com/codewithdhruba01) • [Twitter](https://x.com/codewithdhruba)

</div>
