'use client';

import { CalendarEvent } from './Calendar';

interface EventListProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export default function EventList({ events, onEventClick }: EventListProps) {
  // Get upcoming events (today and future)
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return (a.time || '').localeCompare(b.time || '');
    })
    .slice(0, 5); // Show only next 5 events

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateStr === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (upcomingEvents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <p className="text-gray-500 text-center py-8">No upcoming events. Click on a date to add one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
      <div className="space-y-3">
        {upcomingEvents.map(event => (
          <div
            key={event.id}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onEventClick(event)}
          >
            <div className={`w-3 h-3 rounded-full ${event.color} mr-3 flex-shrink-0`}></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </h3>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex items-center mt-1">
                {event.time && (
                  <span className="text-xs text-gray-600 mr-2">
                    {formatTime(event.time)}
                  </span>
                )}
                {event.description && (
                  <span className="text-xs text-gray-500 truncate">
                    {event.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
