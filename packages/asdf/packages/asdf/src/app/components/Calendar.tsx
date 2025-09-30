'use client';

import { useState, useEffect } from 'react';

// Simple icon components
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  description?: string;
  color: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  onEventAdd: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventEdit: (event: CalendarEvent) => void;
  onEventDelete: (eventId: string) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EVENT_COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500',
  'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
];

export default function Calendar({ events, onEventAdd, onEventEdit, onEventDelete }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(day);
    setSelectedDate(dateStr);
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowEventModal(true);
  };

  return (
    <div className="w-full p-4 sm:p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
          {MONTHS[month]} {year}
        </h1>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {DAYS.map(day => (
            <div key={day} className="p-2 sm:p-4 text-center text-xs sm:text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="h-20 sm:h-32 border border-gray-200"></div>;
            }

            const dateStr = formatDate(day);
            const dayEvents = getEventsForDate(dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];

            return (
              <div
                key={day}
                className="h-20 sm:h-32 border border-gray-200 p-1 sm:p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleDateClick(day)}
              >
                <div className={`text-xs sm:text-sm font-medium mb-1 ${
                  isToday ? 'text-blue-600 font-bold' : 'text-gray-900'
                }`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 ${event.color} truncate`}
                      onClick={(e) => handleEventClick(event, e)}
                      title={event.title}
                    >
                      <span className="hidden sm:inline">
                        {event.time && <span className="font-medium">{event.time}</span>}
                        <span className={event.time ? 'ml-1' : ''}>{event.title}</span>
                      </span>
                      <span className="sm:hidden">
                        {event.title}
                      </span>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setEditingEvent(null);
            setSelectedDate(null);
          }}
          onSave={(eventData) => {
            if (editingEvent) {
              onEventEdit({ ...eventData, id: editingEvent.id });
            } else {
              onEventAdd(eventData);
            }
            setShowEventModal(false);
            setEditingEvent(null);
            setSelectedDate(null);
          }}
          onDelete={editingEvent ? () => {
            onEventDelete(editingEvent.id);
            setShowEventModal(false);
            setEditingEvent(null);
            setSelectedDate(null);
          } : undefined}
          initialData={editingEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: () => void;
  initialData?: CalendarEvent | null;
  selectedDate: string | null;
}

function EventModal({ isOpen, onClose, onSave, onDelete, initialData, selectedDate }: EventModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(EVENT_COLORS[0]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date);
      setTime(initialData.time || '');
      setDescription(initialData.description || '');
      setColor(initialData.color);
    } else if (selectedDate) {
      setTitle('');
      setDate(selectedDate);
      setTime('');
      setDescription('');
      setColor(EVENT_COLORS[0]);
    }
  }, [initialData, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onSave({
      title: title.trim(),
      date,
      time: time || undefined,
      description: description.trim() || undefined,
      color
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Event' : 'Add Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {EVENT_COLORS.map(colorClass => (
                <button
                  key={colorClass}
                  type="button"
                  onClick={() => setColor(colorClass)}
                  className={`w-8 h-8 rounded-full ${colorClass} ${
                    color === colorClass ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <div>
              {onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {initialData ? 'Update' : 'Add'} Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}










