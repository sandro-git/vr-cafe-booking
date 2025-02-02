import React, { useState } from 'react';
import { format, addDays, startOfDay } from 'date-fns';

interface BookingCalendarProps {
  onTimeSlotSelect: (date: Date, timeSlot: string) => void;
}

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00'
];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onTimeSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i));

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-7 gap-4 mb-6">
        {nextSevenDays.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className={`p-4 rounded-lg ${
              format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="text-sm">{format(date, 'EEE')}</div>
            <div className="text-lg font-bold">{format(date, 'd')}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {timeSlots.map((timeSlot) => (
          <button
            key={timeSlot}
            onClick={() => onTimeSlotSelect(selectedDate, timeSlot)}
            className="p-4 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
          >
            {timeSlot}
          </button>
        ))}
      </div>
    </div>
  );
};
