# Calendar App

A modern, responsive calendar application built with Next.js, React, and Tailwind CSS.

## Features

### 📅 Calendar View
- **Monthly Navigation**: Navigate between months with previous/next buttons
- **Today Button**: Quick jump to current date
- **Interactive Dates**: Click on any date to add events
- **Event Display**: Events are shown as colored blocks on calendar dates
- **Mobile Responsive**: Optimized for both desktop and mobile devices

### 📝 Event Management
- **Add Events**: Click on any date to create a new event
- **Edit Events**: Click on existing events to modify them
- **Delete Events**: Remove events you no longer need
- **Event Details**: Add title, date, time, description, and color
- **Color Coding**: Choose from 8 different colors to categorize events

### 📊 Dashboard Features
- **Calendar Stats**: View statistics for today, this month, upcoming, and total events
- **Upcoming Events**: Sidebar showing next 5 upcoming events
- **Event List**: Click on events in the sidebar to edit them
- **Local Storage**: All events are automatically saved to your browser

### 🎨 Design Features
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions for better UX
- **Accessible**: Proper contrast ratios and keyboard navigation

## How to Use

1. **Adding Events**: Click on any date in the calendar to open the event modal
2. **Editing Events**: Click on existing event blocks or use the upcoming events sidebar
3. **Navigation**: Use the arrow buttons or "Today" button to navigate months
4. **Event Colors**: Choose different colors to categorize your events (work, personal, etc.)

## Sample Events

The app comes with 3 sample events to demonstrate functionality:
- Team Meeting (today)
- Lunch with Sarah (tomorrow)  
- Project Deadline (next week)

These will be replaced once you start adding your own events.

## Technical Details

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **State Management**: React useState and useEffect
- **Data Persistence**: Browser localStorage
- **Icons**: Custom SVG icons
- **Responsive**: Mobile-first design approach

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- localStorage API
- SVG rendering

The app is fully functional offline once loaded, as all data is stored locally in your browser.
