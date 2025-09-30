'use client';

import { CalendarEvent } from './Calendar';

interface CalendarStatsProps {
  events: CalendarEvent[];
}

export default function CalendarStats({ events }: CalendarStatsProps) {
  const today = new Date().toISOString().split('T')[0];
  const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

  const todayEvents = events.filter(event => event.date === today).length;
  const thisMonthEvents = events.filter(event => event.date.startsWith(thisMonth)).length;
  const upcomingEvents = events.filter(event => event.date >= today).length;
  const totalEvents = events.length;

  const stats = [
    {
      label: 'Today',
      value: todayEvents,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'This Month',
      value: thisMonthEvents,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Upcoming',
      value: upcomingEvents,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Total',
      value: totalEvents,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar Stats</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
