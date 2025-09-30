'use client';

import { useState, useEffect } from 'react';
import Calendar, { CalendarEvent } from './components/Calendar';
import EventList from './components/EventList';
import CalendarStats from './components/CalendarStats';

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error('Error loading events:', error);
      }
    } else {
      // Add some sample events for first-time users
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const sampleEvents: CalendarEvent[] = [
        {
          id: 'sample-1',
          title: 'Team Meeting',
          date: today.toISOString().split('T')[0],
          time: '10:00',
          description: 'Weekly team sync meeting',
          color: 'bg-blue-500'
        },
        {
          id: 'sample-2',
          title: 'Lunch with Sarah',
          date: tomorrow.toISOString().split('T')[0],
          time: '12:30',
          description: 'Catch up over lunch',
          color: 'bg-green-500'
        },
        {
          id: 'sample-3',
          title: 'Project Deadline',
          date: nextWeek.toISOString().split('T')[0],
          description: 'Final submission for Q4 project',
          color: 'bg-red-500'
        }
      ];
      setEvents(sampleEvents);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const handleEventAdd = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleEventEdit = (updatedEvent: CalendarEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleEventListClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-4 sm:py-8 px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">My Calendar</h1>
          <p className="text-sm sm:text-base text-gray-600">Click on any date to add an event, or click on existing events to edit them.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          <div className="lg:col-span-3">
            <Calendar
              events={events}
              onEventAdd={handleEventAdd}
              onEventEdit={handleEventEdit}
              onEventDelete={handleEventDelete}
            />
          </div>
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <CalendarStats events={events} />
            <EventList
              events={events}
              onEventClick={handleEventListClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}









